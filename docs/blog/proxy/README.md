---
title: Proxy 对象拦截器
date: 2020-03-04 12:17:59
tags: [proxy,ES6,拦截器]
categories: ES6
---
# Proxy 对象拦截器

> ES6的对象拦截器，可以拦截哪些情况呢

![ ](../common/1.gif)



## 01 前言



自从ES6诞生以来，各种新特性也逐渐显现出来，比如ES6中的Proxy对象，是一个重要的技术。之前Vue的数据双向数据绑定是使用Object.defineProperty()来做的，而现在vue3.0使用的是代理Proxy来编写。原因是前者有一些对象或者数组的变化是监听不了的，但是Proxy可以监听整个对象。

Proxy可以理解为，当你试图访问一个对象的时候必须先经过一个拦截或者代理，你才可以进行对对象的操作。这种机制的好处就是可以对外界的访问进行过滤和改写。



## 02 Proxy实例的方法



##### **<font color="red">proxy实例的构造</font>**

ES6提供一个原生的Proxy构造函数，用于生成Proxy实例。

```javascript
var proxy = new Proxy ( target, handler ) ;
```

参数解析：

- target：所要拦截（代理）的对象
- 处理函数，拦截对应的操作

利用Proxy对象可以拦截的方法有一下13种，下面一一来介绍一下。

##### **1、get()**

get方法是意思是读取对象，那么相应的拦截就是在读取对象的时候进行拦截。

```javascript
var person = {
    name:'alanwu'
}
var proxy = new Proxy(person, {
    get:function(target, property){
        if(property in target){
            return target[property]
        }else{
            throw new Error('对象属性不存在')
        }
    }
})
proxy.name  //'alanwu'
proxy.age   //错误
```

假如上述代码访问不存在的属性的时候，没有抛出错误的话就会返回undefined。



##### **2、set()**

set拦截操作用于拦截对对象赋值的操作。

```javascript
const obj = {
    a: 101,
    b: 46,
    c: 200
}
var proxy = new Proxy(obj, {
    set(target, key, value) {
        if (value < 100) {
           throw Error(`${value}值不能小于100`)
        } 
        target[key] = value
    }
})
```



##### **3、apply()**

apply方法用于拦截函数的调用、call、apply操作。

```javascript
const sum = (num1, num2) => {
	return num1 + num2
}
const proxy = new Proxy(sum, {
	apply(target, context, args) {
	// 我们可以通过 Reflect.apply()来调用目标函数
		return Reflect.apply(...arguments) * 2
	}
})
proxy(3,4)  // 14
```



##### **4、has()**

has方法用于拦截hasProperty操作，即判断对象是否具有某个属性时，该方法有效。值得注意的是，对for...in循环是没有效果的。has方法可以判断该属性来自继承的属性，不只是自身的属性。下面是拦截访问私有属性“_prop”

```javascript
var handler = {
	has(target, key){
		if(key[0]==='_'){
			return false
		}
		return key in target
	}
}
var target = {_prop:'foo', prop:'foo'};
var proxy = new Proxy(target, handler)
'_prop' in proxy  //false
```



##### **5、construct**

该方法的本意是构造，所以会拦截 new 操作符命令。该方法接受两个参数：

- target：目标对象
- args：构造函数的参数对象

```javascript
var handler = {
	construct (target, args, newTarget){
		return new target(...args);
	}
}
```

例子：

```javascript
var p = new Proxy(function() {}, {
    construct: function(target, argumentsList, newTarget) {
      console.log('called: ' + argumentsList.join(', '));
      return { value: argumentsList[0] * 10 };
    }
  });
  
  console.log(new p(1).value); // "called: 1"
                               // 10
```



##### **6、deleteProperty()**

deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。值得注意的是，目标对象自身的不可配置（configurable）的属性不能被deleteProperty方法删除，否则会报错。

```javascript
var handler = {
	deleteProperty(target, key){
		invariant(key, 'delete');
		return true
	}
}
function invariant(key, action){
    if(key[0]==='_'){
        throw new Error(`Invalid attemp to ${action} private "${key}" property`)
    }
}
var target = {_prop:'foo'}
var proxy = new Proxy(target, handler);
delete proxy._prop  //Error
```



##### **7、defineProperty**

该方法用于拦截Object.defineProperty操作。下面操作添加新的属性会触发defineProperty函数，所以会报错。如果目标对象不可扩展（extensible）或不可写（writable）或不可配置（configurable），也不可添加新属性，否则也会报错。

```javascript
var handler = {
	defineProperty(target, key, descriptor){
		return false
	}
}
var target {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar'
```



##### **8、getOwnPropertyDescriptor**

该方法用于拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。

```javascript
var handler = {
    getOwnPropertyDescriptor(target, key){
        if(key[0]==='_'){
            return
        }
        return Object.getOwnPropertyDescriptor(target, key)
    }
}
var target = {_foo:'bar', baz:'tar'};
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat'); //undefined
Object.getOwnPropertyDescriptor(proxy, '_foo'); //undefined
Object.getOwnPropertyDescriptor(proxy, 'baz'); //{value:'tar', writable:true,enumerable:true,configurable:true}
```



##### **9、getPrototypeOf()**

该方法用于拦截获取对象的原型。有如下几种情况：

- Object.prototype. __ proto __
- Object.prototype.isPrototypeOf()
- Object.getPrototypeOf()
- Reflect.getPrototypeOf()

```javascript
var proto = {}
var p = new Proxy({}, {
    getPrototypeOf(target){
        return proto
    }
})
Object.getPrototypeOf(p) === proto //true
```

值得注意的是getPrototype方法返回值必须是对象或者null，否则会报错。目标对象不可扩展（extensible），那么该方法必须返回对象的原型对象。



##### **10、isExtensible()**

该方法用于拦截Object.isExtensible()操作。

```javascript
var p = new Proxy({},{
    isExtensible: function(target){
        return true
    }
})
```

该方法返回值必须是布尔值，否则会转成布尔值。如果返回值与目标对象的IsExtensible(target)不一致，也会抛出错误。



##### **11、ownKeys()**

该方法用于拦截对象自身属性的读取操作。可以拦截以下操作：

- Object.getOwnPropertyNames () 
- Object.getOwnPropertySymbols () 
- Object.keys () 

```javascript
let target = {
    a:1,
    b:2,
    c:3
}
let handler = {
    ownKeys(target){
        return ['a']
    }
}
let proxy = new Proxy(target,handler);
Object.keys(proxy) //['a']
```



##### **12、preventExtensions()**

该方法拦截 Object.preventExtensions () ，该方法必须返回个布尔值，否则会被自动转为布尔值。只有目标对象不可扩展时，即 Object.isExtensible(proxy)为false， proxy.preventExtensions 才能返回 true ，否则会报错。

```
var p =new Proxy({}, { 
	preventExtensions: function(target) { 
		return true; 
    }
}) 
Object.preventExtensions(p) //报错
```



##### **13、setPrototypeOf()**

该方法主要用于拦截 Object.setPrototypeOf 方法。下面的代码中，只要修改 target 的原型对象就会错。

```javascript
var handler = { 
	setPrototypeOf (target, proto) { 
		throw new Error ('Changing the prototype is forbidden'); 
	}
}
var proto = {} ; 
var target = function () {}; 
var proxy = new Proxy(target , handler) ; 
Object.setPrototypeOf(proxy, proto );  //Error : Changing the prototype is forbidden 
```



##### **14、Proxy.revocable()**

Proxy.revocable 方法返回 一个可取消 Proxy实例。

```javascript
let target = {};
let handler = {};
let { proxy, revoke } = Proxy.revocable(target, handler);
proxy.foo = 123;
proxy.foo //123
revoke();
proxy.foo //TypeError: Revoked
```

Proxy.revocable 方法返回一个对象，其 proxy 属性是 Proxy 实例， revoke 属性是一个函数，可以取消 Proxy 实例。上面的代码中，当执行 revoke 函数后再访问 Proxy 实例，就会抛出一个错误。

Proxy.revocable 个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## 03 小结



上述的实例方法在很多地方都有很大的作用，特别是对对象进行拦截的场景的时候。ES6语法在近年来已经很多使用，特别是vue3.0会使用proxy作为数据的响应式写法。

一般面试还都会问你Object.defineProperty有什么缺点，然后问你有没有关注vue3.0，知道3.0中的响应式使用什么写法。还有Proxy有什么方法之类的。

<font color="#32CD32">参考文章</font>

- 阮一峰 ES6入门标准 ——Proxy


![](../common/2.gif)