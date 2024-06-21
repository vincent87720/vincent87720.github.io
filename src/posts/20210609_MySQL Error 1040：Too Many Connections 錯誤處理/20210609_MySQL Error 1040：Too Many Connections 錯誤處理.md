---
title: MySQL Error 1040：Too Many Connections 錯誤處理
slug: golang-mysql-error-1040
createAt: 2021-06-09T00:00:00+08:00
tags:
    - Golang
    - MySQL
abstract: 前陣子寫了一個golang程式用來上傳資料到MySQL，起初程式運作都非常良好，過了一陣子開始出現代號為1040的Too Many Connections錯誤，我們一起來看看發生了甚麼事。
---

前陣子寫了一個golang程式用來上傳資料到MySQL，起初程式運作都非常良好，過了一陣子開始出現代號為1040的Too Many Connections錯誤，我們一起來看看發生了甚麼事。

## 查看MySQL的連線數量
在MySQL下SQL查詢

```sql
SHOW STATUS LIKE '%connected';
```
查詢結果如下
| Variable_name     | Value |
| ----------------- |:----- |
| Slaves_connected  | 0     |
| Threads_connected | 151   |

我們可以發現到Threads_connected已經到達151了，MySQL預設的最大允許連線數量為151，可以使用以下指令查詢最大允許連線數量
```sql
SHOW VARIABLES LIKE 'max_connections';
```

## 檢查程式碼

後來檢查程式碼發現在database/sql這個package有兩個struct，一個是DB，另一個是Conn，我將DB物件的連線關掉而沒有關閉Conn物件的，導致連線數一直增加，造成1040錯誤。

### 錯誤程式碼範例
```go
db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1)/testdb?charset=utf8")
if err != nil {
    fmt.Println(err)
}
defer db.Close()

_, err = db.Query("call SP(?,?,?,?)", "A", "B", "C", "D")
if err != nil {
    fmt.Println(err)
}
```

我們可以看到上面關閉的是db.Close()，這樣並不能正確關閉連線，必須關閉db.Query的連線才能正確的降低連線卡住的數量

### 修正程式碼範例
```go
db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1)/testdb?charset=utf8")
if err != nil {
    fmt.Println(err)
}
defer db.Close()

conn, err := db.Query("call SP(?,?,?,?)", "A", "B", "C", "D")
if err != nil {
    fmt.Println(err)
}
defer conn.Close()

```

## 參考資料
- [stackoverflow - Is it normal to have these many connections in MySQL?](https://stackoverflow.com/questions/39452555/is-it-normal-to-have-these-many-connections-in-mysql)