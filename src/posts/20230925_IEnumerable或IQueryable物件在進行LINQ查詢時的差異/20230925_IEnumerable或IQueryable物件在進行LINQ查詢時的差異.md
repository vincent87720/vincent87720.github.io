---
title: IEnumerable或IQueryable物件在進行LINQ查詢時的差異
slug: difference-between-ienumerable-iqueryable-linq
createAt: 2023-09-25T00:00:00+08:00
tags:
    - LINQ
    - C#
abstract: 當使用LINQ查詢時，執行對象是IEnumerable或是IQueryable有很大的差異。
---

當使用LINQ查詢時，執行對象是IEnumerable或是IQueryable有很大的差異。

## 對IQueryable物件或IEnumerable物件使用LINQ查詢的差異
針對IQueryable實作的LINQ查詢方法用於幫助DataProvider生成SQL語法。
針對IEnumerable實作的LINQ查詢方法是直接對記憶體中的資料進行過濾。

```csharp
IEnumerable<Record> records = _dbContext.Record.Where(r => r.Uid == uid).ToList();
IEnumerable<Record> records = _dbContext.Record.ToList().Where(r => r.Uid == uid);
```
這兩行的差異在於`.ToList()`及`.Where()`的位置不同，僅僅是位置不同就會產生不同的SQL語句和行為。

第一行的`.Where()`是針對IQueryable實作的方法，使用這種方法會產生包含Where語法的SQL語句，並在`.ToList()`方法被呼叫時執行，資料庫會依照where的條件過濾後回傳過濾後的資料。

第二行的`.ToList()`在`.Where()`之前被呼叫，此時會送出完全沒有過濾條件的SQL到資料庫，並返回所有資料，這些資料再經由針對IEnumerable實作的`.Where()`方法過濾，此時過濾便不是在資料庫而是在記憶體。

由此可知，在資料被列舉前的LINQ查詢方法的類別會是IQueryable，允許被調整為各式各樣的SQL語句。
而在資料被列舉後的LINQ查詢方法的類別會是IEnumerable，此時資料已存放在記憶體，不會再拼湊任何SQL語句。

總的來說兩者的差異在於：
針對IQueryable實作的LINQ查詢會將條件都串好去query資料，資料會在資料庫中被篩選
而針對IEnumerable實作的LINQ查詢是針對已存在記憶體的資料進行篩選

###### 參考資料
- [[筆記] IEnumerable v.s IQueryable](https://dotblogs.com.tw/UgiYo/2019/08/10/001704)
- [關於IQueryable<T\>特性的小實驗](https://blog.darkthread.net/blog/iqueryable-experiment/)
- [C#中的IQueryable vs IEnumerable](https://blog.csdn.net/weixin_43263355/article/details/121680150)
- [[Entity Framework][LINQ] IEnumerable與IQueryable差異比較](https://dotblogs.com.tw/wasichris/2015/03/04/150633)