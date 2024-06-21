---
title: Race condition 的種類、成因與解決辦法
slug: race-condition-intro
createAt: 2023-10-22T00:00:00+08:00
tags:
    - Transaction
    - Database
    - Concurrency
abstract: 當多個程序同時存取同一個資源時，很可能會發生該資源在其他程序進行期間被進行更動，導致資料與預期的結果不同的問題。
---

當多個程序同時存取同一個資源時，很可能會發生該資源在其他程序進行期間被進行更動，導致資料與預期的結果不同的問題。

造成Race condition通常要滿足以下兩點
1. 平行處理
2. 同時存取同一個資源

## Race condition 的情境與解法
Race condition 可大致上分為五個現象，包含
- Dirty Read
- Non-repeatable Read (Read Skew)
- Phantom
- Lost update
- Write Skew

## Dirty Read 髒讀
所謂髒讀就是讀到髒東西，意即讀取到另一個 Transaction 尚未 commit 的值。

### Dirty Read 的情境
假設有三個角色，資料庫、Transaction A 和 Transaction B

資料庫：在資料庫中存在一個值 X=0
Transaction A：變更數值 X 為 2 但因為某些原因需要 rollback，沒有成功更新
Transaction B：讀取數值 X

如果是正常的情況應該是 Transaction A 想將 X 變更為 2 但沒有成功，所以將 rollback 回 0 ，此時 Transaction B 讀取到的數值應該要是0，與資料庫內的數值相同。

若發生 Dirty Read 的情況時 Transaction B 讀到的數值會是2，發生競爭時的執行順序如下：

|   Transaction A    |  Transaction B   |
|:------------------:|:----------------:|
|      交易開始      |                  |
|                    |     交易開始     |
|     將X變更為2     |                  |
|                    |  讀取到X的值為2  |
| 將 X rollback 回 0 |                  |
|  交易結束，commit  |                  |

目前的狀態是資料庫中X的值依然是0，我們本來預期 Transaction B 也應該拿到 0，但 Transaction B 在 Transaction A 尚未 commit 就讀取 X 的值，拿到了錯誤的數值，我們把這個現象稱為 Dirty Read。

此現象是 Transaction A 改動的值在commit前沒有被受到保護造成的結果。

### Dirty Read 的解決辦法
將交易隔離等級設定為`READ UNCOMMITTED`即可避免 Dirty Read 的發生。
`READ UNCOMMITTED`會防止髒讀，即防止此交易讀取到其他交易尚未 commit 的資料。

## Non-repeatable Read (Read Skew)
Non-repeatable Read 的中文翻譯是「不可重複讀」，但這翻譯我認為沒有很好懂，可能意思會比較接近「無重複讀」？
用白話一點解釋就是在同一個交易中查詢相同的值兩次但得到不同的結果（在同一個交易中我們會期望如果沒有更動資料，使用相同條件進行查詢應該得到相同結果）。

舉個例子，這感覺就像我開了一團飲料訂單，我負責去問價錢是多少並回覆給要訂飲料的大家，前一秒才問店員得知一杯烏龍鮮奶茶50元，跟同事回報完價格確認金額後，正要結帳時卻跟我說抱歉剛剛價格被總公司改動了，一杯變成70元了，我想大部分人都會很傻眼。

以這個例子來說就是在同一個交易（開飲料團訂單）中，查詢相同的值（都是查詢烏龍鮮奶茶的價格）兩次，兩次的結果不相同（第一次為問店員得知的價格與第二次為結帳時得知的價格不相同）。
而不相同的原因出在另一個交易（總公司調漲價格為70元）在此交易兩次查詢的途中更改了該數值導致的現象。

### Non-repeatable Read 的情境
假設有三個角色，資料庫、Transaction A和Transaction B

資料庫：在資料庫中存在一個值X=0
Transaction A：變更數值X為2
Transaction B：讀取兩次數值X

正常情況下 Transaction B 讀兩次數值應該會都是 0 或都是 2。

若發生 Non-repeatable Read，則有可能 Transaction B 在兩次讀取的期間 X 的值被改了，發生競爭時的執行順序如下：


|  Transaction A   |                     Transaction B                     |
|:----------------:|:-----------------------------------------------------:|
|     交易開始     |                                                       |
|                  |                       交易開始                        |
|    將X變更為2    |                                                       |
|                  | 讀取到X的值為0（沒有Dirty Read的情況下讀到0是正常的） |
| 交易結束，commit |                                                       |
|                  |                    讀取到X的值為2                     |

這種情境下 Transaction A 改動的值有被妥善保護直到 commit，但 Transaction B 的兩次讀取分別在 Transaction A 的 commit 前和 commit 後，造成了 Non-repeatable Read 的現象。

### Non-repeatable Read 的解決辦法
將交易隔離等級設定為`READ COMMITTED`即可避免以下情況發生：
- 防止目前的交易讀取其他交易已編輯但尚未 commit 的資料
- 防止其他交易編輯目前交易會讀取到的資料

也可以將交易隔離等級設定為`READ COMMITTED SNAPSHOT`，與 READ COMMITTED 的差異在於 READ COMMITTED SNAPSHOT 使用樂觀鎖的方式處理 race condition。而 READ COMMITTED 使用悲觀鎖處理 race condition 問題。

## Phantom
在同一個交易中下達同樣的查詢式，但得到不同筆數的資料。

### Phantom 的情境
假設有三個角色，資料庫、Transaction A和Transaction B

資料庫：在資料庫中存在一筆資料
Transaction A：增加一筆資料
Transaction B：查詢所有資料兩次

正常情況下 Transaction B 的兩次查詢應該都要是相同的筆數。

假設 Transaction A 和 Transaction B 幾乎同時發生，則有可能發生在 Transaction B 分別在 Transaction A 新增資料的前與後讀取資料，導致讀到的資料筆數不一致的問題，範例如下：

|  Transaction A   |       Transaction B       |
|:----------------:|:-------------------------:|
|     交易開始     |                           |
|                  |         交易開始          |
|                  | 查詢所有資料，得到1筆資料 |
|   增加一筆資料   |                           |
| 交易結束，commit |                           |
|                  | 查詢所有資料，得到2筆資料 |
|                  |     交易結束，commit      |

這種現象為 Transaction B 的兩次讀取分別在 Transaction A 的 commit 前和 commit 後，造成取得的資料筆數不一致的問題，此現象稱為 Phantom。

## Lost update
當更新的數值在 commit 前被其他 transaction 改動時稱為 lost update。

### Lost update 的情境
假設有三個角色，資料庫、Transaction A和Transaction B

資料庫：在資料庫中存在一個值X=0
Transaction A：變更數值X，將X加上2
Transaction B：變更數值X，將X加上3

正常情況下 Transaction A 和 B 對 X 加上 2 和 3 後，X 應該要變成 5。

假設 Transaction A 和 Transaction B 幾乎同時發生，且沒有防止 race condition，則會發生以下情況：

|  Transaction A   |  Transaction B   |
|:----------------:|:----------------:|
|     交易開始     |                  |
|                  |     交易開始     |
|    讀取到X為0    |                  |
|                  |    讀取到X為0    |
| 將X增加2，X變成2 |                  |
|                  | 將X增加3，X變成3 |
| 交易結束，commit |                  |
|                  | 交易結束，commit |

結果會是 Transaction B 的更動結果覆蓋了 Transaction A 的更動結果，造成 Transaction A 的更動結果遺失了，與預期的結果不相同。

### Lost update 的解決辦法
#### 使用資料庫提供的 Atomic 的操作
```sql
UPDATE record SET x=3 WHERE uid=1
```
#### 使用 SELECT FOR UPDATE
InnoDB 可以使用 FOR UPDATE 語法解決 lost update 的問題。
FOR UPDATE 是一種行級鎖，又稱為排他鎖，屬於悲觀鎖。

#### 使用 SNAPSHOT
資料庫的 SNAPSHOT 可以自動檢查是否發生 Lost update，並終止出問題的交易。
使用 SNAPSHOT 時要記得處理被終止的交易，重新執行就可以解決此問題。

## Write Skew
當兩個交易同時讀取一個資料集，並且各自改動不同的資料時，會造成資料不一致的問題。

### Write Skew 的情境
假設有三個角色，資料庫、Transaction A和Transaction B

資料庫：在資料庫中存在二筆資料，兩筆資料的數值皆為false
Transaction A：讀取並編輯其中一筆資料
Transaction B：讀取並編輯另外一筆資料

假設我的商業邏輯是所有資料中只允許其中一筆資料的狀態為 true ，一但有其中一個為 true 之後其餘的資料都不能被變更為 true。

正常情況下第二個交易的查詢應該會基於前一個交易的結果進行查詢，所以一但 Transaction A 將第一筆資料的狀態改為true之後，Transaction B 應該不能將第二筆資料改為 true。

假設 Transaction A 和 B 同時讀取到一樣的狀態，兩個都各自進行編輯並 commit，雖然改動不同筆資料所以不會將另一個交易的結果覆蓋掉，但是可能會導致商業邏輯上的錯誤，範例如下：

|                            Transaction A                             |                            Transaction B                             |
|:--------------------------------------------------------------------:|:--------------------------------------------------------------------:|
|                               交易開始                               |                                                                      |
|                                                                      |                               交易開始                               |
| 查詢所有資料<br/>第一筆資料的狀態為false<br/>第二筆資料的狀態為false |                                                                      |
|                                                                      | 查詢所有資料<br/>第一筆資料的狀態為false<br/>第二筆資料的狀態為false |
|             將第一筆資料的狀態改為true，沒有違反商業邏輯             |                                                                      |
|                                                                      |             將第二筆資料的狀態改為true，沒有違反商業邏輯             |
|                           交易結束，commit                           |                                                                      |
|                                                                      |                           交易結束，commit                           |

結果會是兩筆資料都被變更為 true 了，與商業邏輯相抵觸。

### Write Skew 的解決辦法

#### 將交易隔離等級設為 SERIALIZABLE
SERIALIZABLE 等級的交易會序列化執行，就像併發不存在一樣，可避免 Write Skew 的問題，但缺點就是效率極差。

#### 使用兩階段鎖定 (2PL，two-phase locking)
一種序列化演算法，屬於悲觀的併發控制機制

#### 使用可序列化快照隔離（SSI, serializable snapshot isolation）
一種序列化演算法，屬於樂觀的併發控制機制


## 各情境之間的差異

### Non-repeatable Read 和 Phantom 的差異
Non-repeatable Read 是在同一個交易中的兩次查詢之間有其他交易 commit，其中有數值被改動了，導致多次查詢同一筆資料的結果是不同的。
Phantom 是在同一個交易中的兩次查詢之間有其他交易 commit，其中資料筆數有被變動，導致多次查詢的回傳資料筆數不同。

### Lost update 與 dirty write 的差異
Dirty write 是在 commit 前就被覆蓋掉，lost update 則是已經 commit 後才被蓋掉。

### Lost update 與 Write Skew 的差異
Lost update 是共同編輯同一筆資料且編輯到了過時的資料，導致編輯的值被後續 commit 的值覆蓋掉導致的問題。
Write Skew 是編輯到了過時的資料導致商業邏輯錯誤的問題。
Lost update 可以算是 Write Skew 的一種 special case。

###### 參考資料
- [[PostgreSQL] 資料庫的Race Condition問題與交易隔離等級](https://ajing-notebook.blogspot.com/2021/12/postgresql-transaction.html)
- [SET TRANSACTION ISOLATION LEVEL (Transact-SQL)](https://learn.microsoft.com/zh-tw/sql/t-sql/statements/set-transaction-isolation-level-transact-sql?view=sql-server-ver16)
- [資料庫 Isolation Levels](https://totoroliu.medium.com/%E8%B3%87%E6%96%99%E5%BA%AB-isolation-levels-c587d3103ba4)
- [資料庫交易的 Isolation](https://blog.amis.com/database-transaction-isolation-a1e448a7736e)
- [後端工程師面試考什麼 - Race Condition 篇](https://myapollo.com.tw/blog/interview-question-race-condition/)
- [Why write skew can happen in Repeatable reads?](https://stackoverflow.com/a/52245852)
- [What is the difference between Non-Repeatable Read and Phantom Read?](https://stackoverflow.com/questions/11043712/what-is-the-difference-between-non-repeatable-read-and-phantom-read)
- [写偏斜（Write Skew）和丢失更新（Lost Updates）区别](https://blog.csdn.net/u013288190/article/details/119773584)
- [幾種方式避免取號功能取到重複的值](https://blog.ite2.com/repeating-number/)
- [[ASP.NET] 使用Lock鎖定 在多使用者或多執行緒下新增編號確保編號不重複](https://dotblogs.com.tw/joysdw12/2012/06/07/72668)
- [DDIA 第七章：事務](http://ddia.vonng.com/#/zh-tw/ch7?id=%e7%ac%ac%e4%b8%83%e7%ab%a0%ef%bc%9a%e4%ba%8b%e5%8b%99)
- [数据库-MySQL中for update的作用和用法](https://segmentfault.com/a/1190000023045909)