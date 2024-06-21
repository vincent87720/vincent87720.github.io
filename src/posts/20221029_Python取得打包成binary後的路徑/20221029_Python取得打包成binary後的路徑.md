---
title: Python取得打包成binary後的路徑
slug: python-get-binary-path
createAt: 2022-10-29T04:00:00+08:00
tags:
    - Python
abstract: 使用pyinstaller打包後的執行檔在執行時有可能會發生實際執行的檔案位於Temporary內的情況，這時就必須用以下方法取得實際exe檔案所在的路徑
---

使用pyinstaller打包後的執行檔在執行時有可能會發生實際執行的檔案位於Temporary內的情況，這時就必須用以下方法取得實際exe檔案所在的路徑

## 解決方法
```python
import sys
import os

path_current_dir = os.path.dirname(sys.argv[0])

print(sys.argv[0]) 
print(path_current_dir)
```

## 參考資料
[Pythonをexeした際にスクリプト実行パスを取得する方法](https://syachiku.net/python%E3%82%92exe%E3%81%97%E3%81%9F%E9%9A%9B%E3%81%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E5%AE%9F%E8%A1%8C%E3%83%91%E3%82%B9%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/)