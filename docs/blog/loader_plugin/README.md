---
title: 关于Webpack中Loader与Plugin的实践
date: 2020-04-12 13:59:35
tags: [webpack,loader,plugin]
categories: webpack
---

# 关于Webpack中Loader与Plugin的实践

> 最近看一下webpack相关的内容，谈一下如何编写loader和plugin

![](../common/1.gif)


## 01 前言

相信大家对webpack也有一定的了解，其实深入浅出webpack这本书也看了很多遍，每一次看都会有一些细节之前没有注意到，我觉得其实可以把它当成是一本工具书来看，之前我也是只看配置都有点让你看不过来，更别说其他的了。

所以今天我就说一下如何编写一个loader与plugin，以及它们之间有什么却别等。


   

## 02 Loader
Loader其实就是一个转换器，把你输入的内容翻译一遍，本质上是没有什么变化的，就像中文翻译成英文一样。我们其实在不知不觉当中也使用了很多的Loader，但是我们没有过多关注而已。常用的Loader有以下几类：

### 常见Loader

**语言转换类**
- `babel-loader`:把ES6转成ES5
- `ts-loader`:把TypeScript转成JavaScript
- `sass-loader`:把scss/sass转成css
- `less-loader`:把less代码转成css
- `css-loader`:加载css，文件导入等

**文件加载类**

- `raw-loader`:把文本文件加载到代码中
- `file-loader`:将文件输出到一个文件夹中，使用相对路径引用输出文件
- `source-map-loader`:加载额外的SourceMap文件，方便断点调试
- `node-loader`:加载Node.js原生模块的.node文件
- `json-loader`:加载json文件

**其他loader**

- `vue-loader`:加载.vue文件
- `ui-component-loader`:按需加载组件库
- `i18n-loader`:加载多语言版本
- `ignore-loader`:忽略部分文件

### Loader配置

```javascript
module.exports = {
  module:{
    rules:[
      {
        test:/\.scss/,
        use:[
        'style-loader',
        {
          'css-loader',
          options:{
            minimize:true
          }
        },
        'sass-loader'
        ],
      }
    ]
  }
}
```
以上的代码意思就是对.scss文件的转换过程，test的配置就是对某一类文件进行转换，use是使用的loader(转换器),它是一个数组，遵循从右往左的使用。先sass-loader再css-loader再style-loader。

### 加载本地Loaderre

我们默认的loader都是从npm上面下载的，但是假如我们要使用自己本地写的loader怎么办呢？我们在webpack里面有这样一个配置`resolveLoader`,它的意思就是说我们使用哪里的loader来加载文件，可以配置多个地方：

```javascript
module.exports = {
  resolveLoader:{
    modules:['node_modules','yourPath']
  }
}
```

意思就是说我们可以自定义loader的路径，默认就是从node_modules里面找，但是假如你的自定义loader放在本地，可以把你的路径写在yourPath里面(相对路径)。匹配规则就是从左向右查找。

### Loader编写

说了这么多，我们自己来写一个简单的loader吧，虽然是一个没有意义的loader，但是也让大家有一个简单的印象，原来写一个loader是很简单的。



- 新建一个目录，如myLoader
- 进入目录初始化package.json文件，安装webpack `npm init -y`,`npm i -D webpack webpack-cli`
- 根目录下新建文件夹src，然后创建入口文件index.js —— `src/index.js`
- 根目录下新建文件夹loaders，然后新建自定义myLoader.js—— `loaders/myloader.js`
- 根目录下新建webpack配置文件`webpack.config.js`
- 在package.json配置webpack打包build命令


![代码目录](https://imgkr.cn-bj.ufileos.com/92e62dae-6015-4b0d-b745-3c37016f54b5.png)

`package.json`

```json
{
  "name": "myLoader",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11"
  }
}

```

`index.js`

```javascript
console.log('世界上最好的语言是PHP!')
```

`myLoader.js`

```javascript
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('PHP', options.name);
  return result;
}
```

`webpack.config.js`

```javascript
const path = require("path");

module.exports = {
  mode: "development", 
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, "./loaders/myLoader.js"),
          options: {
            name: "JavaScript",//这里就是你要替换的值
          },
        },
      },
    ],
  },
};

```
好了，到此为止我们已经成功地写了一个loader，接下来我们就测试一下是否真的work！运行`npm run build`之后会输出一个dist文件夹，里面有一个main.js文件，盘它。

![运行/dist/main.js文件](https://imgkr.cn-bj.ufileos.com/0a44c4bd-b668-4744-81be-641676575ef4.png)


## 03 Plugin
相对于Loader来说，其实plugin的机制更加灵活，它可以在webpack的运行过程中改变输出结果。简单来说就是为输出添砖加瓦。

### 常见Plugin
- `extract-text-webpack-plugin`:把JS中的css代码提到单独文件中
- `webpack-parallel-uglify-plugin`:多进程代码压缩
- `html-webpack-plugin`:简化HTML文件创建
- `dll-plugin`:提高webpack构建速度
- `ignore-plugin`：忽略部分文件

### Plugin的工作原理

我们先来看一下简单的插件是怎么编写出来的：
```javascript
class myPlugin {
  constructor(options){
    
  }
  apply(complier){
    complier.plugin('compilation',function(compilation){
      
    })
  }
}

//导出
module.exports = myPlugin;
```

**工作流程**：

- webpack启动，执行new myPlugin(options)，初始化插件并获取实例
- 初始化complier对象，调用myPlugin.apply(complier)给插件传入complier对象
- 插件实例获取complier，通过complier.plugin监听webpack广播的事件，通过complier对象操作webpack

### Plugin编写

俗话说，`talk is cheap,show me the code`

还是沿用上面的代码结构,在根目录下面建一个myPlugins文件夹，里面建一个myPlugin.js文件，我们就自定义一个plugin：
```javascript

class myPlugin {

    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    apply(compiler) {
        compiler.hooks.done.tap('myPlugin', (stats) => {
            this.doneCallback(stats);
        });
        compiler.hooks.failed.tap('myPlugin', (err) => {
            this.failCallback(err);
        });
    }
}

module.exports = myPlugin;
```

然后我们在`webpack.config.js`文件里面先`引入插件`，然后`配置插件`即可。

还是先打包一下，你会发现在打包过程中，webpack会广播默认的事件，这里我就监听了webpack的`done事件`(webpack构建成功，即将退出)和`fail事件`(webpack构建失败，即将退出)。

```javascript
const myPlugin = require("./plugins/myPlugin");
module.exports = {
  plugins: [
    new myPlugin(
      () => {
        //throw new Error('Error!')
        console.log("成功监听到结束事件，可以执行你想要的函数！");
      },
      (error) => {
        console.log(error);
      }
    ),
  ],
}

```
我们运行之后发现是可以监听的，这里我把两种情况都试一下。首先正常构建，然后手动抛出错误，结果如下：

![成功构建](https://imgkr.cn-bj.ufileos.com/bb906ef1-501e-4de4-a076-6065b0f18d6d.png)

![失败构建](https://imgkr.cn-bj.ufileos.com/1afc4540-f45a-4fcf-9e0f-524755483d17.png)


## 04 小结

今天没事就折腾一下看似简单的东西，比如想看一下一些经典loader和plugin的源代码，自信的我还想看一下webpack的源代码，发现看不懂，就此打住了。

不过其实plugin和loader的区别也是面试常问的，也会问你知道怎么写loader和plugin的问题，虽然自己实现的很简单甚至有点幼稚，自己感觉还好。

相信大家读了之后应该有自己的理解，以后遇到这个问题也会有自己的想法，大家实践一下就知道其中的奥秘了。

参考文章：深入浅出Webpack


![](../common/2.gif)