---
title: Interprocess Communication (IPC)
slug: interprocess-communication
createAt: 2022-10-29T02:00:00+08:00
tags:
    - OperatingSystem
abstract: 行程間通訊有兩種方式，分別是Shared Memory Method和Message passing
---

行程間通訊有兩種方式，分別是Shared Memory Method和Message passing

> 不要通過共享記憶體来通信，而應該通過通信来共享記憶體

## Shared Memory Method
- 為兩個行程之間透過一塊共同的記憶體傳遞訊息資料
- 分為有限制大小的buffer及無限制大小的buffer
- 若開始及結束都指向同一個標籤則為無大小限制buffer

## Message Passing
- 為兩個行程之間透過kernel傳遞訊訊息資料
- 訊息可以分為header和body兩個部分，header用來儲存訊息種類、目標ID、訊息長度和控制資訊，控制資訊包含像是當超過buffer該如何處理的資訊、序號及優先順序，且一般來說使用FIFO
- 訊息傳送有分為同步及非同步，可以有多種排列組合
    - Blocking send and blocking receive
    - Non-blocking send and Non-blocking receive
    - Non-blocking send and Blocking receive (Mostly used)