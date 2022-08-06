---
title: 你知道如何使用Node.js做邮箱验证吗
date: 2020-05-01 10:46:21
tags: [Node,Nodemailer]
categories: Node
---



> 相信大家都知道登录操作都会有一个接收验证码的过程,我之前一直对这个非常感兴趣,经常问同学手机验证码是怎么搞的,但是现在我们不用手机也照样可以实现这个功能。

![](../common/1.gif)



## 01 前言

其实对于手机验证码来说，一般都要收费的，免费的一般是比较少的，而且都会有数量的限制。既然我们不能使用手机验证码来发送，那么我们就以曲线救国的方式来实现这个功能吧。

其实很简单，我们只要安装一个第三方的npm 包就可以了，这个包可以实现邮件的发送功能。这个包就是nodemailer，下面我们就一起来测试一下到底怎么样。


## 02 安装nodemailer

我们随便新建一个目录，然后在根目录下面初始化package.json文件（npm init），然后我们就直接安装nodemailer即可。

```
npm install nodemailer --save
```

然后我们再新建一个入口文件app.js，用于测试代码。

```javascript
"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  //   port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: "alanwu.hd@qq.com",
    pass: "xxxxxxxxxxx", //授权码，并非QQ密码
  },
});
let mailOptions = {
  from: '"alanwu" <alanwu.hd@qq.com>', // 发送地址
  to: "157687xxxxx@163.com", // 接收列表（可多个）
  subject: "Hello,this is alan from China!", // 主题
  // 发送text或者html格式（任选一个）
  text: 'Hello world！', // plain text body
  //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
  html: '<img src="cid:01">', 
  attachments: [                 //添加附件（可多个）
    {
      filename: "image",
      path: path.resolve(__dirname, "2.jpg"),
      cid: "01",//与上面的图片cid对应
    },
    {
      filename: "a.txt",
      content: "hello world!",
    },
    {
      filename: "b.txt",
      path: "./text.txt",//根目录新建即可
    },
  ],
};

// 发送邮件
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log(info);
});

```

我们先来看一下service这个字段，如果写了这个就不用写host和端口。大家可以看一下官方的介绍，[详情戳此](https://nodemailer.com/smtp/well-known/)。它其实已经帮你封装好了，非常方便。


![一部分服务](https://imgkr.cn-bj.ufileos.com/0a28719d-4ef0-4e4a-93b0-7fc261f14fa7.png)


### 发送纯文本text

这个就比较简单了，我们直接在mailOptions 下面的text写上我们要发送的文本即可，其他的html和attachments都不用配置了。


![](https://imgkr.cn-bj.ufileos.com/29d5a5b2-140d-4298-917c-c784950ba9a3.png)

### HTML模板发送

有同学可能觉得这个text文本太low了，我们应该写一些比较华丽的网页发送。没问题，其实我们还可以自定义html网页的，我们不要使用text字段就好，改用html字段而且我们要进行html文件的引入。

我们在根目录新建index.html文件，用于发送此html文件给对方，这里我就随便拿了一个网页。我们要使用 `fs.createReadStream(path.resolve(__dirname,'index.html'))`的方式进行引入即可。重新运行我们就会接收到邮件了。


![](https://imgkr.cn-bj.ufileos.com/89cc7c40-5152-437a-90b6-8f6bfde5d621.png)


### 发送图片

除了网页之外我们还可以使用图片的形式发送，我们在html字段里不要发送html文件，写上`html: '<img src="cid:01">'`之后，我们在attachments里面也写上附件的地址，我这里就直接在根目录之下放置了一张图片，cid要对应上。


![本人公众号，在线求关注！](https://imgkr.cn-bj.ufileos.com/bdb7a4ab-2c86-443e-ad6d-e0365d4e9604.png)


### 添加附件

这里我们就可以添加一些文件了，比如这里我添加了txt文件、docx文件、pdf文件、zip文件都可以。

![](https://imgkr.cn-bj.ufileos.com/0eb958cb-e697-4008-af54-a856e25b736f.png)



## 03 验证码功能

我们其实感兴趣只是验证码部分，别急这就安排一下到底是怎么回事。我们首先要想办法生成一个验证码，一般4-6位都是可以的，下面就介绍一种简单的方法来生成一个吧。

```javascript
let code = Math.random().toString().substr(2, 4)//从第二位开始截取，截取4位（当然也可以6位）
```
我们就直接使用text这个字段进行发送就好了。code可以在一开始生成一下就好。这样其实我们就可以有一个验证的功能了，让用户输入的验证码与你生成对比的是否一致。

```javascript
text: `您的验证码是${code},验证码在10分钟内有效`
```

![](https://imgkr.cn-bj.ufileos.com/b9a958b9-303d-4961-94f7-b0c366c7d090.png)


## 04 一些小问题

我在测试的时候其实有一些小问题，但是我也不知道是什么原因。

- `Error: Message failed: 554 DT:SPM 163`

我去163的官网查了一下，得出的结论是:

**DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。请检查是否有用户发送病毒或者垃圾邮件**。

这是我在发送图片的时候，就是我的二维码图片不行，但是我换一张普通的照片就可以，无解。

- `发送给多名用户失败`

当我尝试在to字段那里写两个用户的时候，发现只有一个是成功的，另一个却被退回了，我也不知道是怎么回事。


## 05 小结

好了，以上就是本文的全部内容，想想其实好像也没什么东西，之前觉得是非常牛的事情原来可以使用很简单的代码就可以实现了。

其实关于nodemailer还有很多属性没有说到，我只讲关于邮件发送的核心部分，其实这在我们的日常生活中也够用了，特别是做一些登录验证操作的时候有用有效。

文章代码：[github地址](https://github.com/wqs2019/nodemailer-demo)

![](../common/2.gif)




