---
title: Memory management
slug: memory-management
createAt: 2022-10-29T01:00:00+08:00
tags:
    - OperatingSystem
abstract: Stack, Heap & GC
---

## Stack
- 在往stack儲存資料時不需查找，僅需儲存在最上面的區塊即可，非常快速
- 任何要存在stack的資料必須有限且靜態（資料大小必須在編譯時就知道）
- 函式的執行資料儲存在stack frames（actual execution stack），每個函式會有自己的frame區塊，當函式內宣告新變數時會將資料推到最上面的區塊。當每個函式結束時，會清除最上面的區塊，所有被推送到該區塊的變數將被清除。
- 每個thread可以有自己的一個stack
- 儲存在stack上的資料由OS操作，非常簡單明瞭
- 儲存在stack上的資料為區域變數（資料型態、primitives或primitive constants）、指標及function frames
- 當stack的size太大時會遇到stack overflow errors
- 大多數的語言對於可以儲存在stack的資料是有限制的

## Heap
- 與stack不一樣，Heap需要使用指標尋找資料
- 比起stack，尋找資料的速度稍慢，但可以存放更大量的資料
- 動態大小的資料可以存放在Heap
- 在同個APP中Heap共享於threads之間
- 因為其動態的特性使得比較難維護和管理，這也是為什麼會有些語言會有自動記憶體管理的功能
- 儲存在Heap中的有全域變數、reference types（objects, strings, maps和其他較複雜的資料結構）
- 如果APP使用比被分配還要多的記憶體就會發生out of memory errors
- 通常沒有限制可以存在Heap的大小，不過也是要看該應用程式被分配到多少記憶體

## Garbage Collection（GC）
有分兩種
- Mark & Sweep GC
- Reference counting GC