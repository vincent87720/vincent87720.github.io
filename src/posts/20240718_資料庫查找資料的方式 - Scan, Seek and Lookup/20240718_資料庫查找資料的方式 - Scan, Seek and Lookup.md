---
title: 資料庫查找資料的方式 - Scan, Seek and Lookup
slug: database-scan-seek-lookup
createAt: 2024-07-18T13:09:00+08:00
tags:
    - Database
abstract: 資料庫查找資料的方式大致上可以分為掃描（Scan）及搜尋（Seek）兩種，資料庫會根據索引建立的情況使用不同的Scan或Seek方法查找資料。
---

資料庫查找資料的方式大致上可以分為掃描（Scan）及搜尋（Seek）兩種：
- 掃描（Scan）：對整個資料表或索引逐筆掃描，取出條件相符的資料。
- 搜尋（Seek）：從 B-tree 中取得條件相符的資料，僅有資料表已建立索引的情況下才有機會被使用。

資料庫會根據索引建立的情況使用不同的Scan或Seek方法查找資料。

## Full table scan 全表掃描
當資料表沒有建立任何索引時，資料的順序是沒有被排序過的，所以無法透過索引得知使用者所需的資料在哪個區段中，此時會依據使用者的查詢條件掃描整個資料表來取得符合條件的結果集。

## Clustered index scan 叢集索引掃描
Clustered index scan會從第一筆到最後一筆歷遍整個叢集索引來查找符合條件的資料，不管最後實際取得幾筆都需要讀完整個索引，並從中挑選所有相符的資料，成本將會與總資料筆數成正比。若查詢條件有使用到叢集索引設定的欄位時，資料庫可能會採用叢集索引掃描來取得條件相符的資料。
當符合條件的資料筆數在全部資料中佔有很大的比例時，使用 Clustered index scan 可能會比其他查找方式來得有效率。

## Index scan 非叢集索引掃描
Index scan 同樣會歷遍整個索引來查找符合條件的資料，與 clustered index scan 不同之處在於非叢集索引不像叢集索引直接就是實際資料的排序，必須透過指標才能找到實際的資料列。

## Clustered index seek 叢集索引搜尋
若查詢條件中的欄位剛好是某個索引的第一個欄位時，資料庫引擎可透過B Tree查找第一筆相符的資料，逐筆讀取直到不相符為止。由於叢集索引的順序與資料實際的排序相同，可透過索引直接找到資料列。

## Index seek 非叢集索引搜尋
Index seek 與 clustered index seek 的搜尋方式大同小異，差別在於非叢集索引的排序與實際的排序不同，必須透過指標才能找到實際的資料列。

## Key lookup 索引鍵查閱
當查詢式中所需的欄位沒有被索引涵蓋到時，資料庫引擎會使用 Clustered Index 到來源Table取得索引中未涵蓋的資料。

###### 參考資料
https://sqlworker.blogspot.com/2016/12/sql-serverkey-lookup.html
https://sunnote.xyz/zh-tw/tutorials/database-optimization-clustered-index-nonclustered-index
https://dotblogs.com.tw/EganBlog/2017/04/13/SQL_Clustered_Index#google_vignette
https://jackyshih.pixnet.net/blog/post/5938123
https://technet239.rssing.com/chan-4753999/article14783.html
https://techcommunity.microsoft.com/t5/sql-server-blog/scans-vs-seeks/ba-p/383115