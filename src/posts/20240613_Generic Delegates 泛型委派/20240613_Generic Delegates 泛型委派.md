---
title: Generic Delegates 泛型委派
slug: generic-delegates
createAt: 2024-06-13T00:00:00+08:00
tags:
    - C#
abstract: 泛型允許我們在定義時先不決定型別，在實例化時才依照呼叫者傳入的型別決定其型別。而泛型委派就是將委派以泛型的方式實作，使得委派可以在實例化時才指定其回傳值及型別。.NET提供兩個好用的泛型委派，分別是 System.Action 和 System.Func，多數情況下不需要自定義泛型委派。
---

泛型允許我們在定義時先不決定型別，在實例化時才依照呼叫者傳入的型別決定其型別。而泛型委派就是將委派以泛型的方式實作，使得委派可以在實例化時才指定其回傳值及型別。

.NET提供兩個好用的泛型委派，分別是 System.Action 和 System.Func，多數情況下不需要自定義泛型委派。

## 泛型委派的優點
泛型委派好用的地方在於可以不用在程式內宣告任何委派，可以直接使用Action<>或Func<>作為參數在多個函式間傳遞，方便好用。

## Action<>
Action的尖括弧內可放入最多16個型別參數，若需要將參數傳入委派除了需要在呼叫時在括弧內填入參數，也必須在定義時就將參數型別放入尖括弧中定義委派的型別。

```csharp
// 定義委派
public delegate void SendDrinks(string order);

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

public static void CreateGroupBuying(string order, SendDrinks send)
{
	Console.WriteLine($"已建立訂單：{order}");
	send(order);// 呼叫委派
}

static void Main(string[] args)
{
	CreateGroupBuying("一杯鮮奶茶微微", SendFarDrinks);
}
```

以`SendDrinks`這個委派為例，我們可以將其由Action改寫。

```csharp
// 簡化定義委派，直接在CreateGroupBuying的參數中使用Action即可
// public delegate void SendDrinks(string order);

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

// 直接使用Action定義委派型態，簡化定義委派寫法
public static void CreateGroupBuying(string order, Action<string> send)
{
	Console.WriteLine($"已建立訂單：{order}");
	send(order);// 呼叫委派
}

static void Main(string[] args)
{
	CreateGroupBuying("一杯鮮奶茶微微", SendFarDrinks);
}
```

以Action定義委派使我們不需在程式中額外定義委派，顯得更為簡潔且方便。

使用Action無法定義回傳值，使用Func則可以定義回傳值。

## Func<>

```csharp
// 簡化定義委派，直接在CreateGroupBuying的參數中使用Func即可
// public delegate string SendDrinks(string order);

// 定義一個名稱為SendNearDrinks的方法，其參數及回傳值皆與委派相同
public static string SendNearDrinks(string drink)
{
	return $"您的{drink}送到囉";
}

// 定義一個名稱為SendFarDrinks的方法，其參數及回傳值皆與委派相同
public static string SendFarDrinks(string drink)
{
	return $"您的{drink}送到囉，跟您收取外送費50元";
}

// 直接使用Func定義委派型態，簡化定義委派寫法
public static void CreateGroupBuying(string order, Func<string, string> send)
{
	Console.WriteLine($"已建立訂單：{order}");
	var result = send(order);// 呼叫委派
	Console.WriteLine(result);
}

static void Main(string[] args)
{
	CreateGroupBuying("一杯鮮奶茶微微", SendFarDrinks);
}
```

`CreateGroupBuying`方法中使用到`Func<string, string> send`作為參數，`Func<string, string>`尖括弧內的最後一個`string`為回傳值，第一個`string`為傳入參數的型別。

需注意，Func會將回傳值型別參數視為必填，在Func的尖括弧內只有一個型別參數的情況下，該型別參數會視為回傳值型別參數，若需要只使用一個型別參數但該型別參數不是回傳值的情況，則必須使用Action進行定義。

###### 參考資料
- [Action]
- [Func]
- [D-21 委派 ? delegate ? Action ? Linq]
- [觀念 Generic Delegate, Action, Func]

[Action]: https://learn.microsoft.com/zh-tw/dotnet/api/system.action-1?view=net-8.0
[Func]: https://learn.microsoft.com/zh-tw/dotnet/api/system.func-2?view=net-8.0
[D-21 委派 ? delegate ? Action ? Linq]: https://ithelp.ithome.com.tw/articles/10270964
[觀念 Generic Delegate, Action, Func]: https://jeffprogrammer.wordpress.com/2015/12/30/%E8%A7%80%E5%BF%B5-generic-delegate-action-func/
