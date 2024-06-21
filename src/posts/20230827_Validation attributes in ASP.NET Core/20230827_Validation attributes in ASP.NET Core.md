---
title: Validation attributes in ASP.NET Core
slug: validation-attributes-in-asp-net-core
createAt: 2023-08-27T00:00:00+08:00
tags:
    - ASP.NET Core
    - C#
abstract: ASP.NET Core 裡的 Validation attributes 用於設定欄位的規則，當收到 HTTP 請求時依照規則檢查請求的資料是否符合 Validation attributes 設定的規則，以此過濾掉不符合規則的請求。
---

ASP.NET Core 裡的 Validation attributes 用於設定欄位的規則，當收到 HTTP 請求時依照規則檢查請求的資料是否符合 Validation attributes 設定的規則，以此過濾掉不符合規則的請求。

## 自動回覆錯誤訊息
在 Web API controllers 中加入`[ApiController]`屬性可以讓我們免去設定`ModelState.IsValid`的步驟

```csharp
using Microsoft.AspNetCore.Mvc;

namespace todoAPP.Controllers
{
    [ApiController]
    public class TodoListController : Controller
    {
        ...
    }
}
```

## 內建的Validation attributes
`[ValidateNever]`：不驗證該類別屬性
`[CreditCard]`：驗證是否符合信用卡卡號規則
`[Compare]`：驗證兩個欄位是否相符

```csharp
using System.ComponentModel.DataAnnotations;

public class RegisterRequestModel
{
    public string Password { get; set; }

    //與Password欄位比對，若不相符則回覆錯誤
    [Compare("Password")]
    public string ConfirmPassword { get; set; }
}
```

`[EmailAddress]`：驗證是否符合E-mail格式
`[Phone]`：驗證是否符合電話號碼格式
`[Range]`: 驗證是否在數值區間內
`[RegularExpression]`: 驗證是否符合正規表達式
`[Required]`: 驗證欄位有值且不是null
`[StringLength]`: 驗證字串長度不超過指定字數
`[MaxLength]`：驗證字串長度不可超過指定字數

```csharp
using System.ComponentModel.DataAnnotations;

public class RegisterRequestModel
{
    [MaxLength(50)]
    public string Username { get; set; }
}
```

`[Url]`: 驗證是否符合URL格式
`[Remote]`: 從client呼叫server的方法驗證使用者輸入


更多驗證屬性請參考微軟的[DataAnnotations](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-6.0)

###### 參考資料

- [Model validation in ASP.NET Core MVC and Razor Pages](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-6.0)
- [ApiController attribute](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0#apicontroller-attribute-1)
- [System.ComponentModel.DataAnnotations Namespace](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-6.0)