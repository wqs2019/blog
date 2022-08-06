---
title: 闲来无事，扒一下Express框架的知识
date: 2020-04-30 17:08:52
tags: [Express,Node,中间件]
categories: Node
---

# 闲来无事，扒一下Express框架的知识

> 自从Node.js出现之后，相应的web框架就出现了，而且都是比较容易上手和搭建的，框架中都有一个很重要的概念“中间件”，今天就来扒一下其中的奥妙。

![](../common/1.gif)



## 01 前言

还记得之前面试的时候，我说用过Node搭建了一个小型的后台框架，然后面试官就问了一下你用过什么常用的中间件吗？

我当时知道中间件就是一个类似插件一样，依次执行的东西。虽然我在项目当中也用到了类似body-parser、express.static()这些，奈何年少无知我不知道这就是中间件。现在想想要是再问我中间件原理就更不懂了。

现在的中间件是挺多的，可以满足我们很多的数据处理与请求，我们今天就来看一下中间件这个神奇的东西到底神在哪？


## 02 认识Express

得益于JavaScript的发展，使得Node诞生了，`能够在服务器端运行JS代码`，这无疑是令人激动的事情，Express其实就是一个`Node.js Web程序框架`，简单来说就是快速构建一个“后台”。我们用很简单的代码就可以搭建一个服务器，不用费劲心思来使用其他的语言来搭建，而且其他语言在什么也没干的情况下就出现极多的代码。

Node与其他传统的Web服务器的重大区别就是它是`单线程`的，它可以简化Web程序的编写，如果要实现多线程就启动多个Node实例即可。而且`Node是跨平台的，与平台是无关的`，我们可以在Windows或者Linux操作系统上都可运行。

### 快速开始

我们在使用Express编写应用程序的时候一般都会有固定的代码，有一定的目录结构。这中“常规”的代码就是我们所说的脚手架，让我们更方便地开发。我们随便建一个文件夹来使用Express。

- `npm init`

使用这一行命令来`初始化一个package.json文件`，但是要注意的是package.json的name不能叫express，不然会在下一句命令会报错。

- `npm install express --save`

安装express，成功之后你会在项目的根目录看到多了node_modules文件夹，这里就是第三方的应用包，我们的express也会安装在这里。

因为这个文件夹极大，甚至包含了成百上千的包，所以代码提交的时候我们肯定不会带上它的。所以我们在根目录下面就`创建一个.gitignore文件`，内容就是`node_modules`，用与忽略这个文件夹。

- `新建入口文件 app.js`

在根目录新建一个入口文件，通常叫app.js或者index.js都可以。

```javascript
var express = require("express");
var app = express();
app.set("port", process.env.PORT || 3000);
// 定制 404 页面
app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});
// 定制 500 页面
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});

```

那其实这样你就创建了小型的服务器了，接下来就直接启动一下，node app.js就会发现它已经是监听了3000端口。但是我们发现他是没有东西的，因为我们没有配置路由，默认就是返回错误页404。

我们尝试配置一个的路由，主要要在404路由之前，不然也会出现404。

上面我们看到了404和500使用的是app.use而不是路由的形式，这是一种中间件的写法，我们可以理解为没有路由匹配的时候走的方向。

```javascript
app.get("/", function (req, res) {
  res.type("text/plain");
  res.send("这是首页");
});

app.get("/about", function (req, res) {
  res.type("text/plain");
  res.send("这是关于页");
});
```

### 静态文件引入

我们开发中难免会有一些图片等资源的引入，express给我们提供了一种便于资源引入的方法，我们直接在app.js文件的路由开始之前就加入这一行代码：

```javascript
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));//需要加入的代码
```

意思就是这里的资源可以不经任何处理就直接发送给客户端，可以放置图片、CSS文件等。

### 动态渲染模板

我们可以加载静态资源文件，但是我们要使用html模板进行内容的渲染就要加入模板引擎了，但是这种模板引擎的我用的比较少，我一般都会结合vue进行渲染的。但是今天我们就来探讨一下不用vue要怎么渲染出来。

首先我们要安装一下模板殷勤express-handlebars：

```bash
npm install express-handlebars
```

我们现在跟目录之下建立一个views文件夹，然后再建立一个index.html文件用于渲染。

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    <h1>首页</h1>
    <img src="/express.png" alt="" style="width: 200px;height: 100px;">
    {{#each list}}
    <h2>昵称:{{this.name}}</h2>
    <h2>年龄:{{this.age}}</h2>
    <hr>
    {{/each}}
</body>
</html>
```

`app.js`

```javascript
var express = require("express");
var app = express();
const exphbs = require("express-handlebars");//引入模板
app.engine(//设置模板
  "html",
  exphbs({
    layoutsDir: "views",
    defaultLayout: "layout",
    extname: ".html",
  })
);
```

然后我们修改一下之前的请求根路径的路由，修改成：

```javascript
app.get("/", function (req, res) {
  res.render("index", {
    layout: false,
    title: "首页",
    list: [
      {
        name: "张三",
        age: 20,
      },
      {
        name: "李四",
        age: 15,
      },
    ],
  });
});
```

![](https://imgkr.cn-bj.ufileos.com/d4e3418b-2d39-45c4-a4a1-a0d890d9fbf2.png)

以上改好之后重启运行，打开`localhost:3000`你就可以看到你的页面渲染出来了。如果你的网站是比较小型的，一般使用这样的轻量级框架就可以完成了，但是模板语法自己也要了解一下。


## 03 中间件解析

其实中间件很好理解，想象一下有一个长的管道，中间可以加入很多东西，这些东西就是我们所说的中间件。


![](https://imgkr.cn-bj.ufileos.com/edc42400-8017-479b-9d30-0960be15e4ea.png)

### 中间件类型

express的中间件可以分成几种：

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

**应用级中间件**

我们使用的`app.use('/',(req,res)={})`这种就是，直接挂载到app下面的。

```javascript

app.use((req,res,next) => {
    //这个中间件是所有都执行的，没有挂载到具体的路径
    next(); // 控制权下一个中间件
})

app.get("/about", function (req, res) {
    res.type("text/plain");
    res.send("这是关于页");
});
```

**路由级中间件**

路由级中间件和上面应用级中间件类似，但是它绑定对象不是app而是为express.Router()对象。

```javascript
router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});
```

**错误处理中间件**

错误处理中间件有四个参数,定义错误处理中间件必须使用这四个参数。即使不需要next对象，也必须在参数中声明它，否者中间件会识别为一个常规中间件，不能处理错误。

```javascript
// 定制 500 页面
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});
```

**内置中间件**

express.static是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。

![](https://imgkr.cn-bj.ufileos.com/16272cdc-ef92-4bf9-b757-dec27a4744db.png)

```javascript
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```

**第三方中间件**

这个其实有很多，我们使用的body-parser这种就是属于第三方的中间件。这里常用的有：

- body-parser:用于处理body数据
- cookie-session：处理session数据
- cookie-parser：用来操作cookie

其实我们很多的功能都可以通过第三方的中间件来完成，前端真的不简单，有很多大佬在为了前段的发展尽心尽力，我只会CV。

### 中间件实现原理

好了，说了这么多，我们就来分析一些这个中间件是怎么实现的，如何才可以使得管道平稳运行。我们可以发现中间件都是有执行顺序的，前后的执行结果是不一样的。有点类似我们队列的样子。

接下来就参照这种思想来实现一下这中间件的核心代码。

```javascript
var http = require('http');
function express() {
    var funcs = []; // 待执行的函数数组
    var app = function (req, res) {
        var i = 0;
        function next() {
            var task = funcs[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }
        next();
    }
    app.use = function (task) {
        funcs.push(task);
    }
    return app;    // 返回实例
}
```

这里就是核心代码了，精髓都在这里，接下来我们就写一些自己的中间件，来测试一下是否可行。

```javascript
var app = express();
function middlewareA(req, res, next) {
    console.log('中间件1开始...');
    next();
    console.log('中间件1结束...');
}
function middlewareB(req, res, next) {
    console.log('中间件2开始...');
    next();
    console.log('中间件2结束...');
}
function middlewareC(req, res, next) {
    console.log('中间件3开始...');
    next();
    console.log('中间件3结束...');
}
app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);
http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});
```
运行这一段js代码的时候，控制台就出现了中间件的执行过程。它有一种类似于先进后出的“栈结构”。


![](https://imgkr.cn-bj.ufileos.com/ac8a68b1-3640-4e0a-949b-5f72c5ddec51.png)


## 04、小结

以上就是本文的所有内容了，主要介绍了Web框架Express的使用方法，以及使用模板引擎进行数据渲染的具体操作。我们还重点了解了Express的中间件实现原理与过程，了解其中的思想。大家也可以去了解一下常见的中间件，试着去使用它们，你会发现开发竟是如此简单。

我们也知道除了Express框架之外还有Koa框架，它也是由Express的原班人员打造出来的，我认为只要是用的舒服就好，没有必要说哪个好哪个不好。

![](../common/2.gif)

参考文章：

- [Express中间件，看这篇文章就够了(#^.^#)](https://www.cnblogs.com/okaychen/p/8057204.html#_label1)
- [Node与Express开发](https://item.jd.com/11644104.html)



