---
title: Golang channel簡介
slug: golang-channel
createAt: 2020-01-27T00:00:00+08:00
tags:
    - Golang
abstract: 在golang裡可使用channel在多個執行緒與主程式之間傳送資料，channel可設定不同型態的buffer，並指定緩衝區大小
---

在golang裡可使用channel在多個執行緒與主程式之間傳送資料，channel可設定不同型態的buffer，並指定緩衝區大小

## 建立channel
使用make配置空間，第一個參數使用chan指定為通道類型，後面接上channel的型態，第二個參數可加可不加，用來宣告buffer的大小

```go
ch := make(chan int)
ch := make(chan int,5)
```

須注意buffer的預設大小為零，若無指定buffer大小則發送方與接收方需同時準備好才可傳值，否則會造成deadlock(死結)

```go
//OK(buffer為0)
ch := make(chan int)
defer close(ch)
go func(){
    ch <- 7
}()

fmt.Println(<-ch)

//ERROR(buffer為0)
ch := make(chan int)
defer close(ch)
ch <- 7

fmt.Println(<-ch)

//OK(buffer為1)
ch := make(chan int,1)
defer close(ch)
ch <- 7

fmt.Println(<-ch)
```

## 使用channel傳遞數值

### 傳入channel
將箭頭由數值指向channel，代表將值傳入到channel內
```go
ch <- 7
```

### 傳出channel
將箭頭由channel指向目的地，代表將數值由channel傳出
```go
var result int
result <- ch
fmt.Println(result)
```

## 等待所有goroutine結束
有時會遇到明明寫好了goroutine，但在最後將要把數據輸出時卻沒出現任何數據，這時就有可能是因為執行緒尚未結束運算而已經先呼叫close(ch)導致無法使用ch，所以輸出時不會得到channel傳來的任何資訊，當然也不會輸出任何東西

```go
func foo(ch chan int, val int) {
    ch <- val
}

func main() {
    ch := make(chan int, 5)
    for i := 0; i < 5; i++ {
        foo(ch, i)
    }
    close(ch)

    for ele := range ch {
        fmt.Println(ele)
    }
}
```

我們可以使用WaitGroup控制，等到所有執行緒都結束後再繼續往下執行

```go
var wg sync.WaitGroup

func foo(ch chan int, val int) {
    defer wg.Done()
    ch <- val
}

func main() {
    ch := make(chan int, 5)
    for i := 0; i < 5; i++ {
        wg.Add(1)
        foo(ch, i)
    }
    wg.Wait()
    close(ch)

    for ele := range ch {
        fmt.Println(ele)
    }
}
```