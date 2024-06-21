---
title: Webpack設定多個entry及output
slug: webpack-multiple-entry-and-output
createAt: 2023-08-11T01:00:00+08:00
tags:
    - Webpack
abstract: 預設的Webpack使用單一entry及output，若需要多個entry及output可以在webpack.config.js中加入一個函式取得目錄內的所有檔案，將所有檔案加入至entry中。
---

預設的Webpack使用單一entry及output，若需要多個entry及output可以在`webpack.config.js`中加入一個函式取得目錄內的所有檔案，將所有檔案加入至entry中。

## 安裝並載入glob
```shell
npm install glob
```

## 在webpack.config.js中加入取得檔案函式
```javascript
const glob = require("glob");

const getEntry = () => {
    const entry = {};
    glob.sync('./src/js/*.js').forEach((name) => {
        const start = name.indexOf('src/js/') + 7; //前面路徑共8個位元的字串
        const end = name.length - 3; //減去附檔名.js
        const eArr = [];
        const n = name.slice(start, end); //取得js的名稱
        eArr.push("./"+name); //push至陣列中
        entry[n] = eArr;
    });
    return entry;
};
```

## 在entry及output加入檔案資訊
```javascript
const path = require('path');

module.exports = {
    entry: getEntry(),//呼叫getEntry函式取得檔案資訊
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: './js/[name].min.js',//設定輸出檔案名稱
    },
    mode: 'development',
}
```


###### 參考資料
- [Webpack｜教學：webpack多入口/多出口配置](https://medium.com/anna-hsaio-%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E8%A8%98/webpack-%E6%95%99%E5%AD%B8-webpack%E5%A4%9A%E5%85%A5%E5%8F%A3-%E5%A4%9A%E5%87%BA%E5%8F%A3%E9%85%8D%E7%BD%AE-b15a1a2fd74a)