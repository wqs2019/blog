---
title: 总结ES6中Set和Map数据结构的区别
date: 2020-04-08 21:20:14
tags: [ES6,JavaScript,数据结构,Set,map]
categories: ES6
---

# 总结ES6中Set和Map数据结构的区别

> 面试官：你说一下ES6中的数据结构set和map吧！除了这个你还知道WeakSet和WeakMap吗？

![ ](../common/1.gif)

## 01 前言

我们刚开始学习ES6的时候肯定会对这两种数据结构感到奇怪，甚至想着这两种数据结构有什么用呀？难道我们平时的栈和队列不够用吗？

处于一开始没法理解的我们肯定是先背为敬。当我们逐渐接触的多了，想着数组去重的简便写法的时候这个Set又重新出现在我们的面前。原来这个Set是一个集合，高中我们就学过，集合具有唯一性的特点，这才明白了Set的用意。而Map表面上是地图的意思，地图本就有一一对应的特点，就如我们的字典一样，就是字典的数据结构。

## 02 Set

Set数据结构是一个类似于数组，但是与数组不同的是它具有唯一性，里面的元素都是不重复的，而且他本身也是一个构造函数。

```javascript
const SetArr = new Set();

[1,1,2,2,3,3].forEach(item=>SetArr.add(item));
console.log(SetArr);

=>
0: 1
1: 2
2: 3
size: 3
__proto__: Set
```

我们可以看到，打印出来的SetArr就变成了唯一的元素了，而且它也具有长度且还有原型，出于好奇我们就打开原型看一下：

![](https://imgkr.cn-bj.ufileos.com/1b0f852d-9afa-496f-8044-898d27846620.png)

不出我们所料，它具有一系列的方法，比如我们刚刚使用的add方法都在里面。我们具体来解释一下每个属性和方法：

**实例属性**

- constructor：构造函数，就是Set函数
- size：返回的是set实例的长度

**实例方法**

- add(value):往Set里面添加值，返回Set本身
- delete(value)：删除某个值，返回布尔值判断是否成功
- has(value):判断是否含有value值，返回布尔值
- clear():清除Set里面的所有值，无返回值

**遍历方法**

Set数据结构也提供了4个遍历方法，可用于遍历里面的成员

- forEach():使用回调函数遍历元素
- entries():返回键值对的遍历器,用于遍历[键名，键值]组成的数组
- values():返回键值遍历器,用于遍历所有键值
- keys():返回键名遍历器,用于遍历所有键名

看一下我们好像找不出他们的却别，接下来举一个小例子，大家就会明白的。由于Set结构是只有键值的结构，所有keys方法与values方法返回一致。

`forEach`

```javascript
let s = new Set([1,2,3,4,5]);
s.forEach(item=>{console.log(item+1)})
//2 3 4 5 6
```

`entries`
```javascript
let s =new Set(['a','b','c'])
for(let item of s.entries()){
  console.log(item)
}
(2) ["a", "a"]
(2) ["b", "b"]
(2) ["c", "c"]
```

`values`
```javascript
let s =new Set(['a','b','c'])
for(let item of s.values()){
  console.log(item)
}
a
b
c
```

`keys`
```javascript
let s =new Set(['a','b','c'])
for(let item of s.keys()){
  console.log(item)
}
a
b
c
```

**使用Set结构实现交并差**

```javascript
let a = new Set([1,2,3]);
let b = new Sect([3,4,5]);
//交集
let value = new Set([...a].filter(item=>b.has(item)));
//并
let value = new Set([...a],[...b])
//差
let value = new Set([...a].filter(item=>！b.has(item)));

```

## 03 WeakSet

从字面上的意思看来，它是一个弱的Set结构，具体的弱体现在WeakSet的成员只能是对象，还有一个就是WeakSet的对象都是弱引用，即`垃圾回收机制不考虑WeakSet对该对象的引用`。也就是说WeakSet里面的引用都不计入垃圾回收机制。

除了定义不同之外，WeakSet`没有size属性`，也`不可以进行遍历操作`，因为它随时会消失，成员不适合引用。如果垃圾回收机制运行过后，成员个数可能不一样。

**方法**
由于它不可以进行遍历操作，所以遍历的方法都没有了，只有实例方法。

- add():向WeakSet添加新成员
- delete():删除WeakSet的成员
- has():判断WeakSet是否含有某个元素

## 04 Map

上面我们讲到的Set结构是没有键的只有值，而Map结构是键值的组合，这里就解决了我们以往只能使用字符串作为键的限制。也就是说我们可以使用各种的数据类型（或者对象）作为键。

```javascript
let map = new Map();
let obj = {name:'alan',age:20};
map.set(obj,'这是一些描述');
map.get(obj);
console.log(map);
```
我们同样也可以打印一下map里面到底有什么内容，除了与Set一样的方法之外，我们可以看到多了get和set方法。

![](https://imgkr.cn-bj.ufileos.com/383ffce0-fe1a-4fb5-9896-7b2f45d6e7aa.png)

**属性**

- constructor：Map构造函数
- size：Map元素长度

**实例方法**

- set(key, value):设置key所对应的value值
- get(key):获取key所对应的value值，若无则undefined
- has(key)：是否含有某个键
- delete(key):删除某个键，如删除失败返回false
- clear():清除所有成员

**遍历方法**

- forEach():使用回调函数遍历成员
- entries():返回所有成员遍历器
- keys():返回键名遍历器
- values():返回键值遍历器

`entries`

```javascript
let person = new Map([['name','alan'],['age','20']]);
for(let item of person.entries()){
  console.log(item)
}
```

![](https://imgkr.cn-bj.ufileos.com/7a22019c-3a0e-4fdf-9980-04f7e394b6c1.png)

`keys`

```javascript
let person = new Map([['name','alan'],['age','20']]);
for(let item of person.keys()){
  console.log(item)
}
//name
//age
```

`values`
```javascript
let person = new Map([['name','alan'],['age','20']]);
for(let item of person.keys()){
  console.log(item)
}
//alan
//20
```

`与其他数据结构转换`

- Map转数组

```javascript
let person = new Map([['name','alan'],['age','20']]);
console.log(...person)
//[['name','alan'],['age','20']]

```

- 数组转Map

```javascript
let arr = [['name','alan'],['age','20']];
let m = new Map(arr);
//Map(2) {"name" => "alan", "age" => "20"}

```

- Map转对象

```javascript
let person = new Map([['name','alan'],['age','20']]);

function swap(map){
  let obj = Object.create(null);
  for(let [key,value] of map){
    obj[key]=value;
  }
  return obj
}
swap(person);
//{name: "alan", age: "20"}
```

- 对象转Map

```javascript
let person ={'name':'alan','age':'20'};

function swap(obj){
  let map = new Map();
  for(let key of Object.keys(obj)){
    map.set(key,obj[key]);
  }
  return map
}
swap(person);

```

![](https://imgkr.cn-bj.ufileos.com/5204fd4d-e664-4aa7-9d4e-a89a3dbe1a54.png)

## 05 WeakMap

WeakMap与Map一样可以生成键值对的集合，但是也有不同的地方，主要是有以下的两点：

- WeakMap只接受对象作为键名（不包括null）
- 键名所指向的对象不计入垃圾回收机制

与WeakSet相似，WeakMap也是没有遍历的操作，也没有size属性，没有办法列出所有键名（由于垃圾回收机制的运行），也不能清空。

**实例方法**


- get()
- set()
- has()
- delete()


## 06 小结

通过这一次的总结，大家应该对这几种数据结构有了大概的认识，也知道他们之间的不同。之前我们学习的时候往往会忽略WeakSet和WeakMap的理解，也不知道它们与垃圾回收机制的关系。正是以你为弱引用的关系，使得这两个数据的结构可以用于避免内存泄露的情况。

![ ](../common/2.gif)



