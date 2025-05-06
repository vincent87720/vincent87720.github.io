---
title: Index fragmentation 索引碎片化
slug: index-fragmentation
createAt: 2025-05-06T23:32:00+08:00
tags:
  - SQLServer
  - Database
abstract: 在對資料庫進行異動時，資料庫會將資料寫入 Page、在 Page 之間移動或是從 Page 中移除，資料庫會決定資料要放在既有的 Page 或是多開一個新的 Page 儲存，在資料異動的過程中會有 Page 沒有被放滿的情況出現，在 Page 裡面留有空白的地方即稱之為 Internal fragmentation。
---

# Page
在介紹 Index fragmentation 之前必須先提到 Page。  
Page 是 SQL Server 中最基礎的單位，其大小為8192 bytes，使用者可用大小為8060bytes。  
資料存在Page中沒什麼問題，有問題的是資料在異動時可能會造成碎片化的程度提高，進而影響效能。碎片化又可以分為 Internal fragmentation（內部碎片化）及 External fragmentation（外部碎片化）兩種。

# Internal fragmentation 內部碎片化
在對資料庫進行異動時，資料庫會將資料寫入 Page、在 Page 之間移動或是從 Page 中移除，資料庫會決定資料要放在既有的 Page 或是多開一個新的 Page 儲存，在資料異動的過程中會有 Page 沒有被放滿的情況出現，在 Page 裡面留有空白的地方即稱之為 Internal fragmentation。

當 Internal fragmentation 的程度過高時，會因為 Page 變多無法有效利用所有空間而讓資料庫變得龐大，亦會讓查詢時間變長，需使用索引的重建或重組解決 Internal fragmentation 程度過高的問題。

## 索引重組
索引重組會需要一個 Page 用來暫存資料，重組時會嘗試補滿未被使用的空間，並調整 Page 的順序，並釋放掉多餘的 Page。  
索引重組的時間與碎片化程度有關，碎片化程度越高需要越久的時間。

## 索引重建
索引重建是把舊的索引刪掉後建立新的索引，重建時會掃過所有 Page 並依照順序建立新的索引。  
索引重建的時間與索引的大小有關，索引越大需要越久的時間。

# External fragmentation 外部碎片化
我們可以想像 Page 在資料庫中是以Page陣列的型式儲存在硬碟中，但是不一定會同個表的 Page 擺在附近，所以各 Page 之間會有雙向鏈結標記上一個 Page 和下一個 Page 的頁碼，在讀取同一個表時才會知道接下來該讀哪個 Page。這種讀取 Page 的順序不是按照磁碟中 Page 的順序，會跳來跳去的現象稱之為 External fragementation。

External fragmentation 不像 Internal fragmentation 需要特別處理。  
一來是就算把 Page 照順序排好，原本得掃描三個 Page 的資料表還是得掃描三個 Page，不會因為照順序排好而減少 Page 的數量。  
二來是 Page 的數量也不會因為照順序排好而減少，Page 的數量在排序前後不會有差異。  
而且如果是從 RAM 中存取，其本身就是隨機的，有沒有按照順序排列的影響不大。

###### 參考資料
- [Fragmentation Explained in 20 Minutes - SQLBits](https://youtu.be/Oj9Vx6FjoIc?si=rdaTwZN7kdHAuKC6)
- [What is Index Fragmentation in SQL Server? - solarwinds](https://www.solarwinds.com/resources/it-glossary/index-fragmentation)
- [讓 SQL Server 告訴你有哪些索引應該被重建或重組 - The Will Will Web](https://blog.miniasp.com/post/2009/01/18/Let-SQL-Server-Tell-You-Which-Indexes-to-Rebuild-or-Reorganize)
- [(SQL Server) Index Fragmentation 產生原因，該如何做對應的調整?! - Jerry Wu](https://jerrywu-3165.medium.com/sql-server-index-fragmentation-%E7%94%A2%E7%94%9F%E5%8E%9F%E5%9B%A0-%E8%A9%B2%E5%A6%82%E4%BD%95%E5%81%9A%E5%B0%8D%E6%87%89%E7%9A%84%E8%AA%BF%E6%95%B4-f26e01e7c86c)