---
title: HTTP header Content-Disposition
slug: http-header-content-disposition
createAt: 2023-08-18T00:00:00+08:00
tags:
    - HTTP
    - Network
abstract: Content-Disposition包含兩種類型，分別是inline 和 attachment，用於指定下載的行為
---

Content-Disposition包含兩種類型，分別是inline 和 attachment，用於指定下載的行為

### inline
使用inline會直接將檔案顯示在瀏覽器中，預設行為也是inline

```
Content-Disposition: inline
```

### attachment
若將Content-Disposition設為attachment會彈出視窗讓使用者下載檔案

Content-Disposition除了指定顯示行為外，還可以指定預設下載名稱，使用filename可以指定檔案名稱，例如：

```
Content-Disposition: attachment; filename=test.zip
```

使用此Header便可以讓使用者端跳出另存視窗，並在預設檔名中顯示filename的字串

###### 參考資料
- [header中Content-Disposition的作用与使用方法](https://www.cnblogs.com/Lambquan/p/12980088.html)
- [Day20-內容要如何處置-Content-Disposition](https://ithelp.ithome.com.tw/articles/10186863)
- [Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition)