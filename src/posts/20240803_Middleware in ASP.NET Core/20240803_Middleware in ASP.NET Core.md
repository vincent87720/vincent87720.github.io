---
title: Middleware in ASP.NET Core
slug: middleware-in-asp-net-core
createAt: 2024-08-03T19:25:00+08:00
tags:
  - asp-net-core
  - csharp
abstract: ASP.NET Core中，請求與回應會經過一連串的Middleware（中介軟體），每個Middleware都有各自的職責，例如用於驗證、授權或是錯誤處理等。當請求或回應流經Middleware時，Middleware會處理並選擇是否將請求傳遞到下一個Middleware，或者是將其短路。
---

ASP.NET Core中，請求與回應會經過一連串的Middleware（中介軟體），每個Middleware都有各自的職責，例如用於驗證、授權或是錯誤處理等。當請求或回應流經Middleware時，Middleware會處理並選擇是否將請求傳遞到下一個Middleware，或者是將其短路。

## 管線

Middleware的組成方式就像管線一樣，會一段接著一段。

可以把每個Middleware都想像成一個函式，在每個Middleware中都可以呼叫函式連到下一個Middleware，或是選擇不連到下一個函式直接短路。

除了單一管線之外，管線也可以有分支，可以依照不同的路徑執行不同條管線。而管線也不可能一直延伸下去，最終都會遇到盡頭。

## 串接

```csharp
namespace Foo;

public class Program
{
    public static void Main(string[] args)
    {
        // 回傳一個類別為WebApplicationBuilder的物件，名稱為builder
        var builder = WebApplication.CreateBuilder(args);

        // 建置WebApplication，回傳WebApplication的物件
        var app = builder.Build();

        app.MapGet("/", () => "Hello World!");

        // 執行應用程式
        app.Run();
    }
}
```

在範例程式碼中，我們對WebApplicationBuilder的物件（builder）呼叫`Build()`方法後，會回傳一個WebApplication的物件（app），WebApplication類別提供`Use()`方法讓我們可以把Middleware加入到管線中。ASP.NET Core提供了許多現成的Middleware擴充函式（Extensions），我們可以找到需要的功能直接加入到管線中。

```csharp
namespace Foo;

public class Program
{
    public static void Main(string[] args)
    {
        // 回傳一個類別為WebApplicationBuilder的物件，名稱為builder
        var builder = WebApplication.CreateBuilder(args);

        // 建置WebApplication，回傳WebApplication的物件
        var app = builder.Build();

        // 各種內建的Middleware Extension
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapRazorPages();
        app.MapControllers();

        // 執行應用程式
        app.Run();
    }
}
```

除了現成的Middleware可以使用外，我們也可以使用`Use()`方法自訂Middleware，事實上ASP.NET Core提供的現成Middleware也是使用相同的方法，只是被包裝為Extensions讓使用者可以方便使用。

```csharp
namespace Foo;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        app.Use(async (context, next) =>
        {
            await context.Response.WriteAsync("middleware 1 in \r\n");
            await next.Invoke();
            await context.Response.WriteAsync("middleware 1 out \r\n");
        });
        app.Use(async (context, next) =>
        {
            await context.Response.WriteAsync("middleware 2 in \r\n");
            await next.Invoke();
            await context.Response.WriteAsync("middleware 2 out \r\n");
        });
        app.Run(async (context) =>
        {
            await context.Response.WriteAsync("terminal middleware \r\n");
        });
        app.Run();
    }
}
```

```
middleware 1 in
middleware 2 in
terminal middleware
middleware 2 out
middleware 1 out
```

從輸出的結果可以觀察到Middleware的執行順序是由最前方的Middleware依序執行，直到terminal middleware（終端中介軟體）也就是`Run()`被執行為止。Middleware的執行順序是非常重要的，若Middleware之間有先後順序的話必須非常注意Middleware擺放順序是否正確。

## 分支

除了單一管線的Middleware之外，Middleware還可以將不同的路徑對應到不同的Middleware管線，讓Middleware形成分支。WebApplication類別提供的`Map()`方法就可以指定哪個路徑要對應到哪一組Middleware管線，當收到指定路徑的請求時會執行對應管線中的Middleware。

```csharp
namespace Foo;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        app.Map("/map1", HandleMapTest1);
        app.Map("/map2", HandleMapTest2);
        app.Run();

        static void HandleMapTest1(IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("map1 middleware 1 in \r\n");
                await next.Invoke();
                await context.Response.WriteAsync("map1 middleware 1 out \r\n");
            });
        }
        static void HandleMapTest2(IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("map2 middleware 1 in \r\n");
                await next.Invoke();
                await context.Response.WriteAsync("map2 middleware 1 out \r\n");
            });
        }
    }
}
```

## 盡頭

只要是管線必定會有盡頭，一般的管線盡頭有兩種，一種是WebApplication類別提供的`Run()`方法，作為終端Middleware，它的委派不具有next參數，所以無法使用`next.Invoke()`呼叫下一個Middleware。另一種盡頭是在一般的Middleware中不呼叫`next.Invoke()`，同樣也使得管線無法繼續下去，我們將這種盡頭稱之為「短路」。

###### 參考資料

- [ASP.NET Core 中介軟體]
- [WebApplication 類別]
- [ASP.NET Core 2 系列 - Middleware]
- [Day03 Middleware]
- [.NET Core第4天_middleware是捨麼?]
- [.Net Core Project 從零開始 — Middleware的概念與應用]
- [ASP.NET Core 基礎 - Middleware]
- [ASP.NET Core端点路由 作用原理]

[ASP.NET Core 中介軟體]: https://learn.microsoft.com/zh-tw/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0
[WebApplication 類別]: https://learn.microsoft.com/zh-tw/dotnet/api/microsoft.aspnetcore.builder.webapplication?view=aspnetcore-8.0
[ASP.NET Core 2 系列 - Middleware]: https://blog.johnwu.cc/article/ironman-day03-asp-net-core-middleware.html
[Day03 Middleware]: https://medium.com/@atailin.work/%E9%90%B5%E4%BA%BA%E8%B3%BD-asp-net-core-3-day03-middleware-1f726c90f6e8
[.NET Core第4天_middleware是捨麼?]: https://ithelp.ithome.com.tw/articles/10259251
[.Net Core Project 從零開始 — Middleware的概念與應用]: https://medium.com/@WilliamWhetstone/net-core-project-%E5%BE%9E%E9%9B%B6%E9%96%8B%E5%A7%8B-middleware%E7%9A%84%E6%A6%82%E5%BF%B5%E8%88%87%E6%87%89%E7%94%A8-cb426045050e
[ASP.NET Core 基礎 - Middleware]: https://blog.darkthread.net/blog/aspnetcore-middleware-lab/
[ASP.NET Core端点路由 作用原理]: https://www.cnblogs.com/JulianHuang/p/13286139.html
