---
title: Model Binding in ASP.NET Core
slug: model-binding-in-asp-net-core
createAt: 2023-08-25T00:00:00+08:00
tags:
    - ASP.NET Core
    - C#
abstract: controller會處理來自用戶端的HTTP Request，請求中會有一些資訊來往，這些資料會需要經過型別轉換、檢查必填、最大長度及正確性等步驟後我們才能使用，若手動處理這些步驟將會非常繁瑣。ASP.NET提供Model Binding的功能，可以處理來自使用者請求中的資料，將其綁定到指定型態的資料上，省去繁複的處理程序並提高正確性。
---
controller會處理來自用戶端的HTTP Request，請求中會有一些資訊來往，這些資料會需要經過型別轉換、檢查必填、最大長度及正確性等步驟後我們才能使用，若手動處理這些步驟將會非常繁瑣。
ASP.NET提供Model Binding的功能，可以處理來自使用者請求中的資料，將其綁定到指定型態的資料上，省去繁複的處理程序並提高正確性。

Model Binding可以將HTTP requests的資料轉為指定的資料型態
- 轉換多個來源的資料，例如route data、form fields或query strings等
- 將字串轉為.NET的類別

## ApiController屬性
在開始介紹綁定前先介紹ApiController這個屬性

若在Controller中套用[ApiController]這個屬性後會帶來以下影響，其中有一個與綁定有關
- 必須要使用屬性路由(Attribute Routing)
- 自動回應HTTP 400
- 自動套用Model Binding的預設規則，預設規則包含：
    - 若HTTP是Request複雜模型，則預設會自動套用[FromBody]屬性
    - 若HTTP是Request簡單模型，則預設會自動套用[FromQuery]屬性
    - 若參數包含IFormFile或IFormFileCollection會自動推斷content-type為`multipart/form-data`，並自動套用[FromForm]屬性

## 預設綁定來源及順序
1. Form fields
2. Request body
3. Route data
4. Query string parameters
5. Uploaded files（僅會綁定到IFormFile或IEnumerable\<IFormFile\>類別的實體）


## 指定綁定來源
- [FromBody]：Requet body取值並套用在複雜模型上
- [FromRoute]：從路由資料取值
- [FromQuery]：從Query string中取值
- [FromHeader]：從HTTP標頭取得值
- [FromForm]：從Request body取值，只會套用在IFormFile 或 IFormFileCollection 上

## 綁定方式

### 綁定至參數
```csharp
public Task<IActionResult> Create([FromBody]CreateTodoRequestModel request)
```
```csharp
public class CreateTodoRequestModel
{
    public string Text { get; set; }
}
```

### 綁定至類別屬性
```csharp
public Task<IActionResult> Create(CreateTodoRequestModel request)
```
```csharp
public class CreateTodoRequestModel
{
    [FromBody]
    public string Text { get; set; }
}
```


###### 參考資料
- [ASP.NET Core 中的資料繫結](https://learn.microsoft.com/zh-tw/aspnet/core/mvc/models/model-binding?view=aspnetcore-3.1)
- [[Day12] 模型繫結與驗證 - 我與 ASP.NET Core 3 的 30天](https://ithelp.ithome.com.tw/articles/10244545)
- [ASP.NET Core Model Binding 死活綁不上 - 1](https://www.gss.com.tw/blog/asp-net-core-model-binding-1)
- [ApiController 屬性](https://learn.microsoft.com/zh-tw/aspnet/core/web-api/?view=aspnetcore-3.1#apicontroller-attribute-2)