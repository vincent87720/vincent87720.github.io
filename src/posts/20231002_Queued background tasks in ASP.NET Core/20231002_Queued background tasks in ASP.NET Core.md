---
title: Queued background tasks in ASP.NET Core
slug: queued-background-tasks-in-asp-net-core
createAt: 2023-10-02T00:00:00+08:00
tags:
    - ASP.NET Core
    - C#
abstract: 在實務上有時候會遇到某些需要花費大量時間執行的任務，像我就是在寫公司專案時遇到需要產生縮圖和轉檔的需求，若不想讓使用者一直轉圈圈等待的話，我們必須採用一些方法讓我們可以先回覆使用者，之後再來慢慢處理這些需求，在背景中讓這些任務排隊執行就是其中一個方法。
---

在實務上有時候會遇到某些需要花費大量時間執行的任務，像我就是在寫公司專案時遇到需要產生縮圖和轉檔的需求，若不想讓使用者一直轉圈圈等待的話，我們必須採用一些方法讓我們可以先回覆使用者，之後再來慢慢處理這些需求，在背景中讓這些任務排隊執行就是其中一個方法。

## 環境
- macOS Ventura 13.0(Apple M1 Pro)
- .NET 6.0
- Visual Studio Community 2022 for Mac 17.6.1

## 建立佇列服務
在`Services`目錄下建立`BackgroundTaskQueue.cs`檔案。

在這個檔案中放入一個interface及一個類別，分別是`IBackgroundTaskQueue`及`BackgroundTaskQueue`。

`IBackgroundTaskQueue`定義Queue的interface，包含將任務加入Queue以及從Queue中取出服務的兩個方法。

`BackgroundTaskQueue`是`IBackgroundTaskQueue`的實作類別，提供資料儲存及實作介面定義的方法。

### 定義IBackgroundTaskQueue介面

首先是`IBackgroundTaskQueue`，interface中定義了`QueueBackgroundWorkItem`和`DequeueAsync`兩個方法。

```csharp
// BackgroundTaskQueue.cs

public interface IBackgroundTaskQueue
{
    void QueueBackgroundWorkItem(Func<CancellationToken, Task> workItem);

    Task<Func<CancellationToken, Task>> DequeueAsync(CancellationToken cancellationToken);
}
```

`QueueBackgroundWorkItem`用於將任務加入到Queue中，此方法傳入一個函式作為參數。
這個作為參數傳入的函式也有參數及回傳值，參數是`CancellationToken`，回傳則是`Task`。
意即必須將一個型別為`Func<CancellationToken, Task>`的函式傳入到`QueueBackgroundWorkItem`函式中，被傳入的函式便是我們要排隊執行的任務。

`DequeueAsync`用於將任務從Queue中取出，此方法傳入`CancellationToken`作為參數，回傳值是`Func<CancellationToken, Task>`，與先前加入Queue的任務的型別相同。


### 實作BackgroundTaskQueue類別

定義好`IBackgroundTaskQueue`介面後，以`BackgroundTaskQueue`實作該介面，此類別除了`QueueBackgroundWorkItem`和`DequeueAsync`兩個方法以外還增加了`_workItems`及`_signal`兩個屬性。

```csharp
// BackgroundTaskQueue.cs

public class BackgroundTaskQueue : IBackgroundTaskQueue
{
    // ConcurrentQueue是執行序安全的集合類型，用來存放任務
    private ConcurrentQueue<Func<CancellationToken, Task>> _workItems =
        new ConcurrentQueue<Func<CancellationToken, Task>>();

    // 號誌
    private SemaphoreSlim _signal = new SemaphoreSlim(0);

    // 將任務加入佇列
    public void QueueBackgroundWorkItem(
        Func<CancellationToken, Task> workItem)
    {
        if (workItem == null)
        {
            throw new ArgumentNullException(nameof(workItem));
        }

        _workItems.Enqueue(workItem);
        _signal.Release();
    }

    // 將任務從佇列取出
    public async Task<Func<CancellationToken, Task>> DequeueAsync(CancellationToken cancellationToken)
    {
        await _signal.WaitAsync(cancellationToken);
        _workItems.TryDequeue(out var workItem);

        return workItem;
    }
}
```

`_workItems`的型別是`ConcurrentQueue<Func<CancellationToken, Task>>`，ConcurrentQueue是執行序安全的Queue，用來存放型別為`Func<CancellationToken, Task>`的任務。
`_signal`的型別是`SemaphoreSlim`，用於管制目前可存取`_workItems`任務的數量。我們會在將任務加入佇列時使用`_signal`的`Release()`方法，讓`_signal`的可同時存取數量加1。在將任務從佇列取出時呼叫`WaitAsync()`方法，若`_signal`的可用數量足夠時則將任務從佇列取出，若`_signal`的可用數量不足時則讓呼叫者等待。

`QueueBackgroundWorkItem`方法傳入要被加入到`_workItems`的任務，此方法首先檢查傳入的`workItem`是否為null，若不是null則將任務加入到`_workItems`裡頭排隊，並將`_signal`的可用數量加1。

`DequeueAsync`方法傳入`cancellationToken`，進入方法後持續等待直到可用數量足夠且被`_signal`放行為止，被放行後就可以從`_workItems`將任務Dequeue出來並回傳。

### 註冊BackgroundTaskQueue服務
在使用BackgroundTaskQueue服務前，我們需要在`Program.cs`檔案中註冊BackgroundTaskQueue服務。由於BackgroundTaskQueue在整個程式中只能存在一個實體，必須使用AddSingleton方法將BackgroundTaskQueue註冊為Singleton的服務。
```csharp
// Program.cs

...
    
var builder = WebApplication.CreateBuilder(args);

...

// 將BackgroundTaskQueue註冊為Singleton服務
builder.Services.AddSingleton<IBackgroundTaskQueue, BackgroundTaskQueue>();

...
    
var app = builder.Build();

...
    
app.Run();
```

## 建立背景服務
有了排隊的機制之後，我們需要讓程式有空閒時自動在背景中執行這些任務，這時候就需要用到`BackgroundService`類別來幫助我們達成這個機制。

### 實作QueuedHostedService類別

在`Services`目錄下建立`QueuedHostedService.cs`檔案。

在這個檔案中建立一個`QueuedHostedService`類別，此類別繼承`BackgroundService`類別並實作其`ExecuteAsync`方法。

```csharp
public class QueuedHostedService : BackgroundService
{
    private readonly ILogger _logger;
    private readonly IBackgroundTaskQueue _taskQueue;

    public QueuedHostedService(
        IBackgroundTaskQueue taskQueue,
        ILoggerFactory loggerFactory)
    {
        _taskQueue = taskQueue;
        _logger = loggerFactory.CreateLogger<QueuedHostedService>();
    }

    protected async override Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Queued Hosted Service is starting.");

        while (!cancellationToken.IsCancellationRequested)
        {
            // 從佇列中取得workItem
            var workItem = await _taskQueue.DequeueAsync(cancellationToken);

            try
            {
                // 執行從佇列取得的函式
                await workItem(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                   $"Error occurred executing {nameof(workItem)}.");
            }
        }

        _logger.LogInformation("Queued Hosted Service is stopping.");
    }
}
```

`ExecuteAsync`方法裡的while迴圈會不停的執行，當有任務需要被執行時會從_taskQueue.DequeueAsync取得任務，並在try區塊內被執行，若發生錯誤也會在此被捕捉到。

總的來說，QueuedHostedService就是負責不斷的在背景中從Queue取得任務並執行。

### 註冊QueuedHostedService服務
與其他服務一樣，我們需要在`Program.cs`檔案中註冊QueuedHostedService服務。不過因為QueuedHostedService要提供的是背景服務，必須使用AddHostedService方法將QueuedHostedService註冊為HostedService。
```csharp
// Program.cs

...
    
var builder = WebApplication.CreateBuilder(args);

...

// 將QueuedHostedService註冊為HostedService
builder.Services.AddHostedService<QueuedHostedService>();

...
    
var app = builder.Build();

...
    
app.Run();
```

到這邊我們已經可以讓服務在Queue中排隊，並且可以使用背景服務將在排隊的服務取出執行，接著我們只要把我們的任務加入到Queue中讓他們排隊就行了。

## 讓任務加入到隊伍中

在`Services`目錄下建立`RecordService.cs`檔案，此檔案只是為了展示如何將任務加入到Queue中，不一定要建立這個檔案，可以在任何需要讓任務排隊的地方加入排隊的程式碼。

```csharp
public class RecordService
{
    private readonly IBackgroundTaskQueue _taskQueue;

    public RecordService(IBackgroundTaskQueue taskQueue)
    {
        _taskQueue = taskQueue;
    }

    public void ShowText(int from, int to)
    {
        Console.WriteLine("1");
        _taskQueue.QueueBackgroundWorkItem(async cancellationToken =>
        {
            for(int i= from; i< to; i++)
            {
                Console.WriteLine(i);
            }
        });
        Console.WriteLine("2");
    }
}
```

在建構子中，我們使用DI注入`IBackgroundTaskQueue`服務，將服務存放在`_taskQueue`中。
在`ShowText`中，我們使用`_taskQueue.QueueBackgroundWorkItem`方法將一個會從from輸出到to的迴圈作為任務加入到`_taskQueue`去排隊，這個任務會在`QueuedHostedService`裡的`ExecuteAsync`被排隊執行。

### 註冊RecordService服務
記得將RecordService也註冊到`Program.cs`檔案中，可以使用自己需要的生命週期註冊服務，這裡使用AddTransient進行示範。
```csharp
// Program.cs

...
    
var builder = WebApplication.CreateBuilder(args);

...

// 將RecordService註冊為Transient的服務
builder.Services.AddTransient<RecordService>();

...
    
var app = builder.Build();

...
    
app.Run();
```

將上面的所有服務都建立好之後我們就可以讓會花費很多時間的任務通通去排隊了(ﾉ>ω<)ﾉ

###### 參考資料
- [dotnet core系列之Background tasks with hosted services (后台任务)](https://www.cnblogs.com/Vincent-yuan/p/11048748.html)
- [Background tasks with hosted services in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-7.0&amp%3Btabs=visual-studio&tabs=visual-studio-mac%2Cvisual-studio#queued-background-tasks)