---
title: 比較JavaScript中assign與replace的差異
slug: difference-between-assign-and-replace-in-javascript
createAt: 2023-08-08T00:00:00+08:00
tags:
    - JavaScript
abstract: 比較JavaScript中assign與replace的差異
---

## assign
### 功能
assign可以讓window載入並顯示URL指定的文件

### 語法
```javascript
window.location.assign("http://test.com");
```

### 與assign相同功用的用法
```javascript
window.location="http://test.com"
window.location.href="http://test.com"
location="http://test.com"
location.href="http://test.com"
```

### 使用時機
- 希望在跳轉頁面後可以返回上一頁

## replace
### 功能
replace會使用URL指定的文件置換掉目前的頁面

### 語法
```javascript
window.location.replace("http://test.com");
```

### 使用時機
- 希望頁面重新載入而不是重新提交一次
- 不應該重複觸發的頁面，例如：
    - 金流付錢頁面，付款後replace回原本的頁面，減少使用者返回上一頁造成錯誤的機會

## 差異
replace和assign的差異在於replace不會在session history中紀錄目前的頁面，replace後將無法回到上一頁，若在replace過後按下上一頁則會回到上上個瀏覽的頁面


###### 參考資料
- [Javascript 頁面跳轉、刷新、重定向的幾種方式](https://ithelp.ithome.com.tw/articles/10190062)
- [location: assign() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location/assign)
- [location: replace() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location/replace)
