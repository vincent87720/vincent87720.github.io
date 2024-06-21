---
title: 使用Zsh更改Ubuntu終端機樣式
slug: zsh-ubuntu-init
createAt: 2021-06-05T00:00:00+08:00
tags:
    - Tools
    - Ubuntu
abstract: 近期無意間在網路上發現Bullet Train這個theme，一下子就被燒到了，覺得非常好看，於是決定來將自己的terminal也改成那樣子，提昇工作效率
---

近期無意間在網路上發現[Bullet Train](https://github.com/caiogondim/bullet-train.zsh)這個theme，一下子就被燒到了，覺得非常好看，於是決定來將自己的terminal也改成那樣子，提昇~~爽度~~工作效率

## 環境
- Ubuntu 20.04.2LTS


## 安裝

更新套件清單
```shell
$ sudo apt-get update #更新套件清單
$ sudo apt-get upgrade #根據已經更新的套件清單，比對是否更新套件
```

安裝Zsh
```shell
$ sudo apt-get install zsh
```

查看Zsh是否成功安裝
```shell
$ cat /etc/shells
```

安裝oh-my-zsh
```shell
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

安裝完會顯示oh-my-zsh的歡迎畫面

## 修改設定
目前預設的還是Bash Shell，要將它改成Zsh
```shell
$ chsh -s /bin/zsh
```
修改完成後須重新登入

## 安裝Theme
前往[Bullet train](https://github.com/caiogondim/bullet-train.zsh)下載[主題](https://raw.githubusercontent.com/caiogondim/bullet-train-oh-my-zsh-theme/master/bullet-train.zsh-theme)

將下載好的主題**bullet-train.zsh-theme**放入`.oh-my-zsh/themes`目錄內

接著編輯`~/.zshrc`，將**ZSH_THEME**設定為"bullet-train"

## 安裝powerline

```shell
$ sudo apt-get install powerline
$ sudo apt-get install fonts-powerline
```

## 安裝Melso字型
```shell
$ git clone https://github.com/powerline/fonts.git --depth=1
$ cd fonts 
$ ./install.sh
```

右鍵點選Terminal>偏好設定>文字>自訂字型，選擇**Meslo LG S for Powerline Bold**更改字型


## 參考資料

- [在 Ubuntu 18.04 LTS / 16.04 LTS 中安裝使用 Oh-My-Zsh](https://medium.com/@wifferlin0505/%E5%9C%A8-ubuntu-16-04-lts-%E4%B8%AD%E5%AE%89%E8%A3%9D%E4%BD%BF%E7%94%A8-oh-my-zsh-cf92203ca8a2)
- [用Oh My Zsh把iTerm變美美](https://medium.com/@hazelwu/%E7%94%A8oh-my-zsh%E6%8A%8Aiterm%E8%AE%8A%E7%BE%8E%E7%BE%8E-8a18daa8eac)
- [Github - Bullet Train for oh-my-zsh](https://github.com/caiogondim/bullet-train.zsh)
- [Github - Powerline fonts](https://github.com/powerline/fonts)
- [agnoster.zsh-theme](https://github.com/agnoster/agnoster-zsh-theme)