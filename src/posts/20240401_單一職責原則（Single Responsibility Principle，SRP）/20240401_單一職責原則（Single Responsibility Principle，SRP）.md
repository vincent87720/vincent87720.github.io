---
title: 單一職責原則（Single Responsibility Principle，SRP）
slug: solid-srp
createAt: 2024-04-01T00:00:00+08:00
tags:
    - SOLID
abstract: 在CleanArchitecture中提到了SRP的定義：A module should have one, and only one, reason to change.書中的定義是「一個模組應該只有一個被改變的原因」。當某個模組會因為多個角色而改變，換句話說就是某個模組有多個「reason to change」時，則違反SRP。
---

在CleanArchitecture中提到了SRP的定義：
> A module should have one, and only one, reason to change.

書中的定義是「一個模組應該只有一個被改變的原因」。

這句話裡面有幾個重要元素，分別是「模組（module）」和「被改變的原因（reason to change）」。

軟體系統會因為使用者或相關利益者而改變，使用者和相關利益者也可以抽象化為「角色」，這些「角色」就是軟體系統改變的「原因」。

而「模組」則可以定義為一群被聚集起來的函式或是資料結構。
SRP中的模組粒度可大可小，從方法、類別、資料表到軟體架構都可以把它當成模組來思考。

當某個模組會因為多個角色而改變，換句話說就是某個模組有多個「reason to change」時，則違反SRP。

更白話一點講就是如果業務需求改變了，我想去改某個模組，結果影響到了其他業務需求，就違反了SRP。

# SRP想要解決的問題

隨著系統成長，業務需求改變是必然的，當業務需求改動時就需要改動某個模組。

當模組之間耦合過高時可能會發生改動某個模組連帶影響到其他模組，造成可維護性問題。

SRP想要解決的就是系統的可維護性問題。

而模組之間的耦合又可分為軟體組件之間的耦合和業務耦合。

SRP中的「一個模組只能因為一個原因而改變」，其「原因」指的就是**業務需求來源**，也就是可能會對這個模組提出修改的「人」或「人們」的需求。

為了讓這個模組便於維護，該模組應該盡可能的減少其職責。

# SRP如何解決問題
SRP透過將模組拆分解決其中的業務耦合問題，可以透過判斷該模組是否違反SRP而考慮是否拆分。

# 如何判斷是否符合或違反SRP
要識別某個模組是否有符合SRP，可以先問問「這個模組是做什麼用的？」，如果答案包含一個以上的話就代表這個模組可能不符合SRP。

# 遵循SRP的好處

### 降低相依性、耦合性
遵循SRP之後可以減少程式碼之間的依賴，該模組的變更將會來自同一個業務需求，因業務耦合造成的問題將減少，進而減少某個業務需求改動而影響到另一個業務需求的情況。
### 提高內聚力
程式中每個部分都與自己實作的功能相關，提高內聚力。
### 提高可讀性、可維護性及降低複雜性
一個模組只包含與自身相關的邏輯，降低程式複雜性
### 提高可重用性
相同的程式邏輯只會出現在同個模組，不會分散在世界各地，提高可重用性

###### 參考資料
- Robert C. Martin, "Clean Architecture: A Craftsman's Guide to Software Structure and Design," Pearson, 2018
- [再談物件導向設計原則: 單一職責原則，定義、解析與實踐]
- [深入淺出單一職責原則 Single Responsibility Principle]
- [菜雞與物件導向 (10): 單一職責原則]
- [Fred聊聊SOLID設計原則]

[再談物件導向設計原則: 單一職責原則，定義、解析與實踐]: https://wadehuanglearning.blogspot.com/2019/12/blog-post.html
[深入淺出單一職責原則 Single Responsibility Principle]: https://www.jyt0532.com/2020/03/18/srp/
[菜雞與物件導向 (10): 單一職責原則]: https://igouist.github.io/post/2020/10/oo-10-single-responsibility-principle/
[Fred聊聊SOLID設計原則]: https://www.youtube.com/live/e0UOuQ_lCUY?si=8nGdbLvSZyjKyWDs
