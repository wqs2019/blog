---
title: 关于vue过滤器的原理解析
date: 2020-04-15 22:19:07
tags: [vue,过滤器,前端框架,前端]
categories: 前端框架
---

# 关于vue过滤器的原理解析

> 又来学习源码系列，今天就看一下vue中的过滤器具体是怎么实现的，我觉得这是一个不常用但是很重要的知识点，开冲！

![ ](../common/1.gif)


## 01 前言

过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理。我们看一下官方的定义：
> Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示:

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

你可以在一个组件的选项中定义本地的过滤器：

```javascript
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```javascript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。过滤器可以串联：

```
{{ message | filterA | filterB }}
```

在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。

过滤器是 JavaScript 函数，因此可以接收参数：
```
{{ message | filterA('arg1', arg2) }}
```

这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。

## 02 过滤器原理
```
{{ message | capitalize }}
```
上面的过滤器经过一顿操作之后就会变成：`_s(_f("capitalize")(message))`。

- _f：该函数其实就是resolveFilter的别名，作用是从`_this.$options.filter`找到过滤器并返回
- _s：该函数就是toString函数的别名，作用是拿到过滤之后的结果并传递给toString()函数，结果会保存到VNode中的text属性，返回结果直接渲染视图

### 串联过滤器

```
{{ message | filterA | filterB }}
```
上面的串联过滤器经过一顿操作之后就会变成：

`_s(_f("filterB")(_f("filterA")(message)))`

这里的意思就是message作为第一个参数传进filterA当中，然后经过filterA的处理结果就传进filterB当中。`即filterA过滤器的结果就是filterB过滤器的输入`。

### 过滤器参数接收
```
{{ message | filterA | filterB("param") }}
```
以上的过滤器的编译结果就是：

`_s(_f("filterB")(_f("filterA")(message),"param"))`

这里有一点注意的是：这个param参数是filterB的第二个参数，它的第一个参数是经过filterA处理的结果。

### _f函数的原理

_f函数其实就是寻找过滤器的，如果找到过滤器就返回过滤器，找不到就返回与参数相同的值。它的代码其实很简单：

```javascript
import {identity, resolveAssets} from 'core/util/index'

export function resolveFilter(id){
  return resolveAssets(this.$options, 'filters', id, true) || identity
}
```

我们重点来看一下resolveAssets到底做了什么事情。

```javascript
export function resolveAsset (options, type, id, warnMissing){
  if(typeof(id) !== 'string'){
    return
  }
  
  const assets = options[type]
  if(hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if(hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitlize(camelizedId)
  if(hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
  
  //检查原型链
  const res assets[id] || assets[camelizedId] || PascalCaseId
  if(process.env.NODE_ENV!=='production'&& warnMissing&&!res){
    warn('Fail to resolve' + type.slice(0,-1)+':'+id, options)
  }
  return res
}
```

其实它的寻找过程也很简单，主要是做了以下的操作（id是过滤器id）：

- 判断过滤器id是否为字符串，不是则终止
- 用assets存储过滤器
- hasOwn函数检查assets自身是否存在id属性，存在则返回
- hasOwn函数检查assets自身是否存在`驼峰化后的`id属性，存在则返回
- hasOwn函数检查assets自身是否存在将`首字母大写后的`id属性，存在则返回
- 如果还是没有，就是去原型链找，找不到就会打印警告

### 过滤器解析原理

我们想一下，解析器是怎么解析过滤器的语法？其实在vue内部专门有这么一个函数用来解析过滤器语法：`parseFilters`

它的原理就是解析过滤器列表，然后`循环过滤器列表`并`拼接字符串`。

## 03 小结

其实过滤器的作用有很多，相信大家对时间的格式化也有很多的处理方法，其中一个就是可以利用过滤器来`格式化时间`。而且我们知道，过滤器它是可以`支持链式的操作`，很方便地对变量进行多步处理，然后返回你想要的结果。

过滤器的原理其实很简单，无非就是`在编译阶段就把过滤器编译成函数进行调用`，串联的过滤器就是`嵌套调用`。关于编译成函数的时候就是利用vue的内部函数`parseFilters`，解析过滤器列表并进行`拼接字符串`。

参考文章：

- 深入浅出vue.js 

![ ](../common/2.gif)