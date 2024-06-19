---
title: Golang中Excel的讀寫與操作
slug: golang-package-excelize
createAt: 2020-01-26T00:00:00+08:00
tags:
    - Golang
abstract: excelize是一個能夠讀寫excel的package，可讀入或寫入指定位置的資料及更改樣式，適用於批量產生excel檔案及資料處理，須注意的是該package只支援.xlsx的檔案格式，尚不支援.xls的檔案處理
---

excelize是一個能夠讀寫excel的package，可讀入或寫入指定位置的資料及更改樣式，適用於批量產生excel檔案及資料處理，須注意的是該package只支援.xlsx的檔案格式，尚不支援.xls的檔案處理

## 安裝

使用指令安裝package

```go
go get github.com/Luxurioust/excelize
```

## 檔案操作

### 創建新檔
```go
xlsx := excelize.NewFile()
```

### 開啟舊檔
```go
inputFilePath := "D:\Project"
xlsx, err := excelize.OpenFile(inputFilePath)
if err != nil {
	fmt.Println("\rERROR:", err)
}
```

### 讀取內容
將檔案內的資料讀入一個二維的字串slice
```go
sheetName := "Sheet1"//指定要讀取的工作表名稱
xlsxRows, err = xlsx.GetRows(sheetName)
if err != nil {
	fmt.Println("\rERROR:",err)
}
```

### 變更工作表名稱
```go
oldSheetName := "Sheet1"//指定目前工作表名稱
newSheetName := "工作表"//指定新的工作表名稱
xlsx.SetSheetName(oldSheetName, newSheetName)
```

### 設定樣式
建立樣式
呼叫函式時使用JSON格式填入所需的樣式參數

fill：設定儲存格網底

| fill     	| 使用單一顏色填充                                                                                                                                                                                                                                                                                                   	| 使用漸層填充                                                                       	|
|----------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|------------------------------------------------------------------------------------	|
| typr     	| pattern                                                                                                                                                                                                                                                                                                            	| gradient                                                                           	|
| color    	| ["#FFFFFF"]                                                                                                                                                                                                                                                                                                        	| ["#FFFFFF","#E0EBF5"]                                                              	|
| gradient 	|                                                                                                                                                          X                                                                                                                                                         	| 0:橫向<br>1:縱向<br>2:對角線向上<br>3:對角線向下<br>4:由對角線向內<br>5:由中心向外 	|
| pattern  	| 0:無<br>1:實心<br>2:75%灰色<br>3:50%灰色<br>4:25%灰色<br>5:水平條紋<br>6:垂直條紋<br>7:反對角線條紋<br>8:對角線條紋<br>9:對角線斜紋<br>10:粗線對角線斜紋<br>11:細線水平條紋<br>12:細線垂直條紋<br>13:細線反對角線條紋<br>14:細線對角線條紋<br>15:細線水平斜紋<br>16:細線對角線斜紋<br>17:12.5%灰色<br>18:6.25%灰色 	|                                          X                                         	|

```go
//單一顏色填充
patternStyle, err := xlsx.NewStyle(`{"fill":{"type":"pattern","color":["#EBF0F3"],"pattern":1}}`)
if err != nil {
    fmt.Println("\rERROR:",err)
}

//漸層填充
gradientStyle, err := f.NewStyle(`{"fill":{"type":"gradient","color":["#FFFFFF","#E0EBF5"],"shading":1}}`)
if err != nil {
    fmt.Println(err)
}
    
```

font：設定儲存格字體

|  font  	|             	|
|:------:	|:-----------:	|
|  bold  	|  true/false 	|
| italic 	|  true/false 	|
| family 	|   字型名稱  	|
|  size  	|   字體大小  	|
|  color 	| ["#FFFFFF"] 	|

```go
fontStyle, err := f.NewStyle(`{"font":{"bold":true,"italic":false,"size":12,"color":"#FFFFFF"}}`)
if err != nil {
    fmt.Println(err)
}
```

使用樣式

```go
//使用樣式設定column
err := xlsx.SetColStyle(sheetName, "A1", patternStyle)

//使用樣式設定cell
err := xlsx.SetCellStyle(sheetName, "A1", "A1", gradientStyle)
```