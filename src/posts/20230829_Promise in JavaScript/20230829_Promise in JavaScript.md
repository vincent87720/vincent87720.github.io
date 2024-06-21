---
title: Promise in JavaScript
slug: promise-in-javascript
createAt: 2023-08-29T00:00:00+08:00
tags:
    - JavaScript
abstract: Promise是Javascript提供的建構函式，用於建構Promise物件，該物件會存放非同步事件的結果。
---

Promise是Javascript提供的建構函式，用於建構Promise物件，該物件會存放非同步事件的結果。

## Promise的狀態
Promise包含三個狀態，`pending`、`fulfilled`及`rejected`，每個Promise物件僅能保存一種狀態，在結果尚未出爐時都是`pending`狀態，ˊ一旦變為`fulfilled`或`rejected`其中一個之後便無法再更改狀態。

## Promise物件可以使用的方法
Promise物件可以使用的方法包括`then`、`catch`和`finally`

## 建立Promise
Promise在建立時會需要帶入一個函式，函式需要帶入兩個參數，分別是`resolve`和`reject`
```javascript
const p = new Promise(function(resolve, reject) { 
    if(...){
        resolve();//當事件已經執行完畢且成功操作時，呼叫此函式
    }
    ...
	reject();//當事件已經執行完畢但操作失敗時，呼叫此函式
});
```

## 讀取Promise

### 方法一
在then中傳入兩個callback function，分別接收成功與失敗的結果
```javascript
p.then((success) => {
    console.log(success);
}, (fail) => {
    console.log(fail);
})
```

### 方法二
使用then取得成功的結果，使用catch取得失敗的結果，大部分開發者習慣使用此種方式處理結果
```javascript
p.then(success => {
    console.log(success);
})
// 失敗的行為一律交給了 catch
.catch(fail => {
    console.log(fail);
});
```

## 鏈
Promise可以使用鏈的機制串連多個Promise，此方法可以有效避免Callback Hell

```javascript
p.then(success => {
        ...
    })
    .then(success => {
        ...
    })
    .then(success => {
        ...
    })
    .catch(fail => {
        ...
        console.log(fail);
    })
```

## Promise的靜態方法


### Promise.all
Promise.all可以傳入多個promise做為參數，這個方法會等待所有promise都被完成後才繼續執行。
在實作某功能需要多個API的資料都拿到才能執行時很實用。
```javascript
Promise.all([promise(test1), promise(test2), promise(test3)])
.then(res => {
    console.log(res);
});
```

### Promise.race
Promise.race可以傳入多個promise作為參數，此方法只會回傳第一個執行完成的promise

###### 參考資料
- [JavaScript 中的 Promise 是什麼？以及為什麼你要懂 Promise](https://israynotarray.com/javascript/20211128/2950137358/)
- [JavaScript Promise 全介紹](https://www.casper.tw/development/2020/02/16/all-new-promise/)
- [[week 13] Fetch & Promise 補充](https://hackmd.io/@Heidi-Liu/note-fetch-and-promise)