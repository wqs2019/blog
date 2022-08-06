---
title: ES6到底有哪些特性值得我们学习
date: 2020-03-11 15:07:00
tags: [ES6,promise,proxy,解构赋值,模板字符串,变量提升]
categories: ES6
---

# ES6到底有哪些特性值得我们学习

>  业精于勤，荒于嬉

![](../common/1.gif)



## 01 前言



ES6现在已经是下一代的语言标准了，前端的学习已经来到了一个新的阶段，我们的JavaScript语言已经可以用来编写复杂的大型应用程序，成为企业级开发语言。而现在前端开发岗已经是企业中很重要的岗位之一，所以说学习新技术，以技术驱动产品是理所当然的事情。

对于ES6的学习，我们建议去看一下阮一峰老师的教程，里面详细讲述了每一个知识点，很好理解。接下来我就讲一下ES6到底新增了哪一些比较重要的特性，是可以运用到我们的项目当中，并且面试常考的题目。



## 02 新特性



ES6新增了很多新特性，这里不可能每一个都详细讲述，面试中我遇到的有以下几个，你把它们都讲述清楚就可以过关了。

- let、var、const区别
- 箭头函数
- 解构赋值
- 模板字符串
- Set、Map数据结构
- Promise对象
- Proxy

##### **let 、var、const的区别**

这几个都是用于声明变量/常量的关键字，以前我们一般都是用var来进行声明，但是有一些缺点而且还容易出错。

我们先了解一个变量提升和作用域的问题。

变量提升：是指当你用var进行声明的时候，可以不用声明就使用。比如：

```javascript
console.log(a); //undefined
```

那么函数会不会提升呢？函数和变量哪一个的优先级更高呢？

```javascript
console.log(a);  //f (a){}
var a=1;
function a(){};
```

我们得出来的结果是函数提升的优先级比变量高。那么作用域又是什么呢？

```javascript
var a=1;
function b(){
  var a=2
  console.log(a);
}
b()
```

执行这段代码我们就会得到结果为2

```javascript
var a = 1;
function b() {
    // var a = 2
    console.log(a);
}
b()
```



但是当我们把代码注释之后，我们就会发现结果变成了1。

作用域：当你在当前作业域找不到声明就会到父级的作用域去找，这样层层递进查找，最终形成了一个链，这就是作用域链。

let、var都是可用于声明变量的操作符，但是他们的区别就是var 存在作用域提升，而let仅限于当前作用域的使用，否则会报错。声明之前使用也会报错。

```javascript
console.log(a)
let a
```

就会说 a is not defined

const用于声明常量，声明之后不可改，也不存在变量提升的问题，修改或声明前使用会报错。我们还要注意一点就是let和const声明之后不会挂在到window上面。

```javascript
var a = 1
let b = 1
const c = 1
console.log(window.b) // undefined
console.log(window. c) // undefined
```

常考的面试题是，以下代码输出什么：

```javascript
for (var i =0; i <5; i++) {
    setTimeout(()=>{
        console.log(i);
    },i*1000)
}
//5 5 5 5 5
```

这就是块级作用域的问题，换成let声明就会输出0 1 2 3 4

总结一下：

- var存在变量提升，能在声明前使用。其他两个存在暂时性死区，不能声明前使用
- let 和 const基本一致，后者不能再次赋值
- 函数提升由于变量提升

##### **箭头函数**

箭头函数是ES6新增的一种函数写法，下面两种写法其实是一样的：

```javascript
setTimeout(function(){
    console.log("Hello World!");
},1000)

setTimeout(()=>{
    console.log("Hello World!");
},1000)
```

它和普通函数有什么区别呢？

- 不可用作构造函数，没有原型
- this指向继承而来且不会改变

##### **解构赋值**

解构赋值就是一种模式匹配的写法，之前我们赋值的时候一般都要分别来赋值，比如：

```javascript
let a = 1;
let b = 2;
let c = 3;
```

但是解构赋值允许我们这样赋值，左右两边都对应复制，如果解构不成功就会赋值undefined

```javascript
let [a, b, c] = [1, 2, 3];
```

```javascript
let [a, b, c] = [1, 2];
console.log(a,b,c); //1, 2, undefined
```

我们比较常用的一般有两种方面，一个是JSON字符串的解构，如：

```javascript
const {name,age,number} = {name:'rose',age:12,number:123}
console.log(name,age,number);  //rose 12 123
```

还有一种我们可以用来数据的交换操作，如：

```
let a=1;
let b=2;

[a,b]=[b,a];

console.log(a,b);  //2, 1
```

##### **模板字符串**

```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

相比于之前使用+拼接简洁许多，并且可读性比较强。语法就是使用反引号``来声明，然后变量使用${variable}。

##### **Set、Map数据结构**

Set它是一个构造函数，用来生成Set数据结构。类似于数组，但是跟数组不同的是它的每一项都不会重复。作用也可以用于数组去重的操作。

```javascript
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

数组去重，比较简单

```javascript
function unique(arr) {
    return [...new Set(arr)]
}
```

Map是一个类似于对象，是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以作为键，包括object。

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

作为构造函数，Map也可以接受一个数组作为参数，数组的成员也是一个个表示键值对的数组。

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

##### **Promise对象**

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

##### **Proxy**

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy的拦截有以下13种，具体用法可以查找我之前写的Proxy。

- get(target, propKey, receiver) 拦截对象属性读取
- set(target, propKey, value, receiver) 拦截对象的属性设置
- has(target, propKey) 拦截propkey in proxy
- deleteProperty(target, propKey) 拦截delete proxy[propKey]
- ownKeys(target)
- getOwnPropertyDescriptor(target, propKey) 返回对象属性的描述对象拦截
- defineProperty(target, propKey, propDesc)
- proventExtensions(target)
- getPrototypeOf(target)
- isExtensible(target)
- setPrototypeOf(target, proto)
- apply(target, object, args)
- construct(target, args) 拦截 proxy 实例作为构造函数调用的操作



## 03 小结



ES6的很多新特性都可以让我们的变成更加简单，但是我们需要深入理解其中的每一个细节，写法不当可能会是我们的程序产生不一样的运行效果。如果读者想了解更多的细节，推荐阅读阮一峰的ES6入门标准第三版，定会收获良多。

![](../common/2.gif)