---
title: 依賴注入 Dependency injection
slug: aspnet-core-dependency-injection
createAt: 2023-08-16T00:00:00+08:00
tags:
    - ASP.NET Core
    - C#
    - Pattern
abstract: 依賴注入 Dependency injection
---

### 為什麼要使用注入
為了把低階模組送到高階模組的內使用

### 為什麼要把低階模組往高階模組送
為了不直接在高階模組內建立低階模組物件

### 為什麼不直接在高階模組中建立物件
在高階模組中直接針對低階模組進行實作會產生高耦合，高度依賴低階模組，當想抽換低階模組、低階模組常常變動或是低階模組的設計改變時，會影響到高階模組。應統一由控制反轉中心建立物件，將物件送到高階模組內進行使用

### 為什麼是高階模組定義需求放在Interface內
高階模組依賴低階模組，當低階模組異動時高階模組會受影響，高階模組相對弱勢，故使用高階模組的需求定義介面的內容。
另外以常理來看，假設我們建立一個瀏覽清單服務，會需要用到登入功能及列表功能，我們是先知道我們要什麼功能，定義好介面後再由低階模組實作，而不是實作好登入功能及列表功能等低階模組後，我們才想說來建立一個瀏覽清單服務。
從不同角度來看都應該由高階模組定義介面內的方法。

## 控制反轉及依賴注入

以飲料店來舉例，假設我今天開了一間格雷伯爵奶茶專賣店，我向食品材料行進貨茶葉
```csharp
public class TeaShop{
    public int GetTea(){
        //建立一個供應商物件
        SupplierA supplierA = new SupplierA();
        
        //從供應商購買600g的茶葉
        int tea = supplierA.buy(600);
        
        //取得茶葉並回傳
        return tea;
    }
}
```

目前我把SupplierA寫死在飲料店裡的GetTea方法裡，TeaShop高度依賴於SupplierA。
開店一陣子後我覺得SupplierA提供的茶有怪味，想換成從SupplierB叫貨

```csharp
public class TeaShop{
    public int GetTea(){
        //建立一個供應商物件
        SupplierB supplierB = new SupplierB();
        
        //從供應商購買600g的茶葉
        int tea = supplierB.buy(600);
        
        //取得茶葉並回傳
        return tea;
    }
}
```

如果供應商一直換，我的程式豈不是要一直改？
幸好這個問題有解決的辦法，我們把SupplierA和SupplierB抽象成Supplier就皆大歡喜啦

```csharp
public interface ISupplier{
    int buy();
}

public class SupplierA : ISupplier{
    public int buy();
}

public class TeaShop{
    public int GetTea(){
        //建立一個供應商物件
        ISupplier supplier = new SupplierA();
        
        //從供應商購買600g的茶葉
        int tea = supplier.buy(600);
        
        //取得茶葉並回傳
        return tea;
    }
}
```
這顯然沒有解決我們的問題，當我要把SupplierA換成SupplierB時還是會更改到程式。
如果我讓GetTea只關心要跟廠商進貨，而不關心要跟哪間進貨，把這個煩惱交給別人好像問題就解決了

```csharp
public interface ISupplier{
    int buy();
}

public class SupplierA : ISupplier{
    public int buy();
}

public class TeaShop{
    
    private ISupplier _supplier;
    
    public TeaShop(ISupplier supplier){
        _supplier = supplier;
    }
    
    public int GetTea(){
        
        //從供應商購買600g的茶葉
        int tea = _supplier.buy(600);
        
        //取得茶葉並回傳
        return tea;
    }
}
```
這就是大家俗稱的控制反轉 (Inversion of Control, IoC)，原本高階依賴於低階（TeaShop依賴於SupplierA或SupplierB），變成高階被動接收低階模組（TeaShop被動接收被傳入的supplier）。
原本是高階模組直接建立低階模組，經過控制反轉之後變成由控制反轉中心去建立低階模組，並傳給高階模組使用。

低階模組的物件要能夠被傳入高階模組就稱為依賴注入，通常會在高階模組中使用兩者依賴的介面宣告一個變數（使用ISupplier宣告_supplier變數用於存放低階模組物件），使用建構子將該物件傳入並指定給該變數，供高階模組使用。

要用哪個廠商的問題是解決了，但也還沒解決，我們只是把問題丟給別人了，這時該由誰來建立物件傳遞物件呢？我們這時就會需要「控制反轉中心」。

## 控制反轉中心
控制反轉中心就是建立所有物件及傳遞物件的根，他會集結所有實體分配給各個物件。

## ASP.Net Core的依賴注入

在ASP.NET中使用依賴注入的方法如下
首先，在專案中加入**services**資料夾，在資料夾建立SupplierAService.cs
```csharp
public class SupplierAService{
    public int buy(int gram){
        return gram;
    }
}
```

接著將SupplierAService服務註冊到WebApplicationBuilder，註冊完之後DI容器便會知道ISupplier對應的實作是SupplierAService，當需要使用到ISupplier時便會幫我們找到SupplierAService，new出物件之後幫我們丟到高階容器中注入，超級方便！！
```csharp
public static void Main(string[] args){
    var builder = WebApplication.CreateBuilder(args);
    ...
    builder.Services.AddTransient<ISupplier,SupplierAService>();
    ...
    var app = builder.Build();
}
```

例如當TeaShopController有要用到ISupplier服務時，只需要在建構式傳入ISupplier即可使用
```csharp
public class TeaShopController{
    private ISupplier _supplier;
    
    public TeaShopController(ISupplier supplier){
        _supplier = supplier;
    }
    
    public int GetTea(){
        
        //從供應商購買600g的茶葉
        int tea = _supplier.buy(600);
        
        //取得茶葉並回傳
        return tea;
    }  
}

```


###### 參考資料
- [菜雞新訓記 (6): 使用 依賴注入 (Dependency Injection) 來解除強耦合吧](https://igouist.github.io/post/2021/11/newbie-6-dependency-injection/)
- [如何在 .NET Core 使用 DI ?](https://old-oomusou.goodjack.tw/netcore/di/)
- [Dependency Injection in .NET Core (.NET 6)](https://www.youtube.com/watch?v=Hhpq7oYcpGE)
- [淺入淺出 Dependency Injection](https://medium.com/wenchin-rolls-around/%E6%B7%BA%E5%85%A5%E6%B7%BA%E5%87%BA-dependency-injection-ea672ba033ca)
- [.NET 相依性插入](https://learn.microsoft.com/zh-tw/dotnet/core/extensions/dependency-injection)