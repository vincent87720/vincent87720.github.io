---
title: Vue3錯誤訊息 Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
slug: vue3-webpack-import-vue-esm-bundler
createAt: 2023-08-11T00:00:00+08:00
tags:
    - Vue
    - Webpack
abstract: 從原本用CDN載入Vue，轉換為用npm載入並用webpack打包的過程中發生了錯誤，原因與Vue的使用環境有關。
---

從原本用CDN載入Vue，轉換為用npm載入並用webpack打包的過程中發生了錯誤，原因與Vue的使用環境有關。

## 原因
Vue依據不同的環境會需要使用不同的Vue檔案，以`vue.esm-bundler`為例，esm代表的是在程式碼中有使用ESModule，而bundler代表的是給webpack等打包工具使用的。

## 解決方式
在webpack的webpack.config.js中，使用下列程式碼將`vue.esm-bundler`指定別名為vue即可解決該問題

```javascript
module.exports = {
    ...
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    }
    ...
}
```

###### 參考資料
- [vue3 使用第三方插件问题 bundler to alias “vue“ to “vue/dist/vue.esm-bundler.js](https://developer.aliyun.com/article/1138888)