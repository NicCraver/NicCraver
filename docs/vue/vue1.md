# Vuepress 快速部署到 GitHub 即刻访问

## 环境

### vuepress <Badge text="1.0.0"/>

## 准备我们的 vuepress 网站

### 首先你应该先创建一个 Vuepress 项目

### 第一步我们需要创建一个文件夹

![文件夹.png](https://upload-images.jianshu.io/upload_images/15562516-34f7c4646bc9956d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 在文件夹内，打开 cmd 或 PowerShell

```json
//会在文件夹内构建vuepress的整体结构
yarn create vuepress
```

![vuepress提供两种模板.png](https://upload-images.jianshu.io/upload_images/15562516-0909dc38fe946810.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 这里我们以 docs 为例

![构建vuepress成功.png](https://upload-images.jianshu.io/upload_images/15562516-0bcd84c683598c88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 会让我们填一些信息，邮件、名字、描述什么的，这里我什么都不填

![vuepress为我们创建的目录.png](https://upload-images.jianshu.io/upload_images/15562516-b8b6c818b6361d79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 执行

```json
//安装所需依赖
yarn
```

## 在 GitHub 创建一个仓库

::: tip

### 仓库名必须是你的 GitHub 名

### 仓库名必须以.github.io 结尾

:::

![GitHub昵称.png](https://upload-images.jianshu.io/upload_images/15562516-16c438cb9cb90bc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![创建一个git仓库.png](https://upload-images.jianshu.io/upload_images/15562516-67aac6f7cab28ec2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![创建成功.png](https://upload-images.jianshu.io/upload_images/15562516-089ab7bd5f86c879.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 回到 vuepress 来，在 package.json 中增加以下代码

```json
"scripts": {
    "docs:build": "vuepress build docs",//新增
    "deploy": "bash deploy.sh"//新增
  }
```

### 与 package.json 同级新建一个 deploy.sh 文件

### 在文件中写下面这段代码

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  填写你刚刚创建的仓库地址
git push -f https://github.com/NicCraver/niccraver.github.io.git master

cd -
```

![package.json.png](https://upload-images.jianshu.io/upload_images/15562516-eb5cf5544f2bff48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![deploy.sh.png](https://upload-images.jianshu.io/upload_images/15562516-babe24840f0613a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 最后我们通过 gitbash 执行

```
yarn deploy
```

![gitbash.png](https://upload-images.jianshu.io/upload_images/15562516-698dec745c548cae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![gitbash2.png](https://upload-images.jianshu.io/upload_images/15562516-669585f611293943.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 打包后的文件会自动上传到 GitHub 上

打开[https://niccraver.github.io/](https://niccraver.github.io)

### 项目就部署到 GitHub 上了

![部署成功.png](https://upload-images.jianshu.io/upload_images/15562516-600d8b594f050d59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
