---
title: Delegates 委派
slug: csharp-delegates
createAt: 2024-02-20T00:00:00+08:00
tags:
    - C#
abstract: 我們可以把委派想像成是一個沒有內容的函式，可以被用來當作是某個函式的臨時替身，當我們決定好要用哪個函式時再將真正的函式變成委派實體，並呼叫委派實體以執行該函式。
---

我們可以把委派想像成是一個沒有內容的函式，可以被用來當作是某個函式的臨時替身，當我們決定好要用哪個函式時再將真正的函式變成委派實體，並呼叫委派實體以執行該函式。

## 委派的特性
- 委派是一個類別
- 委派可以將方法當作參數來參考
- 委派可以將方法當作參數來傳遞
- 委派可以用來定義回呼函式（Callback function）

## 委派的用處
- 可以把一個函式當成參數傳遞到另一個函式去執行
- 可以用來處理事件
- 可以用在回呼函式
	- 當某段程式需要在特定時間或是特定條件下執行時很好用
- 可以用在函式的多播

## 名詞定義
- 委派（Delegates）：是一種類別，也是一種有特定參數和回傳值的參考，定義委派時有點像是為某些方法定義介面。
- 委派實體（Delegate Instance）：委派實例化後會產生委派執行個體，委派執行個體可以被呼叫也可以被當作參數傳遞。

## 順序
1. 定義委派
2. 定義一個方法，其參數及回傳值必須與委派相同
3. 定義實際執行該委派的函式
4. 建立、傳遞及呼叫委派實體

### 定義委派

定義委派會使用到`delegate`關鍵字，必須定義其名稱、參數以及回傳值。
```csharp
public delegate void SendDrinks(string order);
```

### 定義與委派結構相同的函式

將函式的參數及回傳值設定為與委派相同時，即可被指定給委派實體，當作委派實體來進行傳遞或呼叫。
```csharp
// 定義一個名稱為SendNearDrinks的方法，其參數及回傳值皆與委派相同
public static void SendNearDrinks(string drink)
{
	Console.WriteLine($"您的{drink}送到囉");
}

// 定義一個名稱為SendFarDrinks的方法，其參數及回傳值皆與委派相同
public static void SendFarDrinks(string drink)
{
	Console.WriteLine($"您的{drink}送到囉，跟您收取外送費50元");
}
```
範例中`SendNearDrinks`與`SendFarDrinks`的參數皆為一個字串，回傳值皆為`void`，與委派相同，可被指定給委派實體。

### 定義實際執行該委派的函式

在[[#定義委派]]中我們定義了名稱為`SendDrinks`的委派，我們可以將該委派作為某個函式（CreateGroupBuying）的參數。該參數（send）是一個委派實體，可以在函式內被調用，使用委派變數名稱加上參數即可執行該委派。
```csharp
public static void CreateGroupBuying(string order, SendDrinks send)
{
	Console.WriteLine($"已建立訂單：{order}");
	send(order);
}
```

### 建立、傳遞及呼叫委派實體

當我們將與委派結構相同的函式（SendFarDrinks）傳遞給實際執行該委派的函式（CreateGroupBuying）時，會自動建立委派實體，並且該委派實體可以在實際執行該委派的函式內被調用。
```csharp
static void Main(string[] args)
{
	CreateGroupBuying("一杯鮮奶茶微微", SendFarDrinks);
}
```

###### 參考資料
- [如何宣告、具現化和使用委派 (C# 程式設計指南)]
- [抽象、介面、委派、事件]
- [.Net委派(delegate)的簡易解說與用法]
- [(C#) 委派(Delegate)基本應用篇]
- [C# Delegates: Definition, Types & Examples]
- [C# Delegates are Just Interfaces with one method]



[如何宣告、具現化和使用委派 (C# 程式設計指南)]: https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/delegates/how-to-declare-instantiate-and-use-a-delegate
[抽象、介面、委派、事件]: https://vito-note.blogspot.com/2014/08/blog-post_65.html
[.Net委派(delegate)的簡易解說與用法]: https://eric0806.blogspot.com/2015/01/dotnet-delegate-usage.html
[(C#) 委派(Delegate)基本應用篇]: https://medium.com/@jason8410271027/c-%E5%A7%94%E6%B4%BE-delegate-%E5%9F%BA%E6%9C%AC%E6%87%89%E7%94%A8%E7%AF%87-5b0b4d448ca3
[C# Delegates: Definition, Types & Examples]: https://stackify.com/c-delegates-definition-types-examples/
[C# Delegates are Just Interfaces with one method]: https://functionalprogramming.medium.com/c-delegates-are-just-interfaces-with-one-method-88474ca97149