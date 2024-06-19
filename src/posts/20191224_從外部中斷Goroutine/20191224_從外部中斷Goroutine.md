---
title: 從外部中斷Goroutine
slug: golang-kill-goroutine
createAt: 2019-12-24T00:00:00+08:00
tags:
    - Golang
abstract: 想要從外部終止一個正在執行中或無限迴圈的goroutine，必須使用channel將中斷訊息傳入使之中斷
---

想要從外部終止一個正在執行中或無限迴圈的goroutine，必須使用channel將中斷訊息傳入使之中斷

## 建立Channel

使用chan關鍵字宣告為channel，並指定通道類型

```go
ch := make(chan struct{})
```

若要傳入channel多個值，則必須指定buffer的大小，否則會造成deadlock

```go
ch := make(chan struct{},10)//buffer大小為10
```

設定目標函式的參數

```go
func main(){
    ch := make(chan struct{})
    go spinner(80*time.Millisecond, ch)
}

func spinner(delay time.Duration, ch chan struct{}) {

}
```

## 使用select case控制流程

select case只能用在有關channel的操作上，若多個case都符合，則會隨機挑選一個執行，若都不符合則執行default

```go
func main(){
    ch := make(chan struct{})
    go spinner(80*time.Millisecond, ch)
}

func spinner(delay time.Duration, ch chan struct{}) {
    for {
        select {
        case <-ch:
            return
        default:
            for _, r := range `-\|/` {
                fmt.Printf("\r%c", r)
                time.Sleep(delay)
            }
        }
    }
}
```

## 結束goroutine

在要中斷的地方插入close(ch)以關閉channel

```go
func main(){
    ch := make(chan struct{})
    go spinner(80*time.Millisecond, ch)
    close(ch)
}

func spinner(delay time.Duration, ch chan struct{}) {
    for {
        select {
        case <-ch:
            return
        default:
            for _, r := range `-\|/` {
                fmt.Printf("\r%c", r)
                time.Sleep(delay)
            }
        }
    }
}
```