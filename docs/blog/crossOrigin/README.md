---
title: 一次看懂如何解决跨域
date: 2020-03-06 14:13:36
tags: [跨域,JavaScript,前端,通信]
categories: JavaScript
---

# 一次看懂如何解决跨域

>  人生如逆旅，我亦是行人

![](../common/1.gif)



## 01 前言



前端在调试的过程中，难免会出现跨域的问题，由于前后端分离的开发模式，前端开发部署的代码与服务器后端代码有可能不在同一个域上，不同域之间访问是会被浏览器拦截的。我们要明白一个点就是，浏览器是可以发起请求，但是结果被浏览器拦截，此谓跨域。接下来我就总结一下如何解决这一问题。

![](./img/1.png)



## 02 跨域方法



了解了跨域的产生情况之后，我们就可以联合客户端和服务端来进行解决。跨域解决主要有以下几种：

- JSONP
- CORS
- Nginx代理
- document.domain
- window.name
- postMessage+iframe



**1、JSONP**

我们知道写HTML代码的时候，加入图片链接就不会有获取不到图片的问题。这是因为图片资源并没有进行ajax请求，而且script标签是没有同源策略的，可以进行资源请求，可以说是一个前端设计的漏洞。

```javascript
// 1.回调函数
function handleResponse(data){
    console.log(data);
}
// 2.动态创建 script 
var script = document.createElement('script');
script.src = 'http://test.com/json?callback=handleResponse';
document.body.insertBefore(script,document.body.firstChild);
```

利用script标签立即下载并执行的特性，我们就可以在回调函数中拿到返回来的数据。那么是不是所有的情况都可以呢？显然不是的。虽然实现是比较简单的操作，但是有缺点：

1. 仅限于GET请求
2. 有安全问题，万一有恶意代码返回，前端无法阻止
3. 无法检测请求是否成功



**2、CORS**

CORS是跨域资源共享(Cross-origin resource sharing)

要想利用这个技术关键是在于服务端，设置返回的Access-Control-Allow-Origin响应头允许跨域操作，发送请求时有两种情况：

- 简单请求
- 复杂请求

①简单请求

当使用以下方法之一：

- GET
- HEAD
- POST

Content-Type的值为以下之一：

- text/plain
- multipart/form-data
- application/x-www-form-urlencoded

才会发起简单请求，浏览器判断是简单请求的话就会在请求头添加origin字段，值是发起请求的所在的源。服务端收到请求后会判断origin是否在自己的许可范围，如果不在就拒绝，如果在就会有以下的响应头添加：

- Access-Control-Allow-Origin（必选）：告诉客户端我接受请求，值为origin的值，若允许所有源请求就会返回 *。
- Access-Control-Allow-Credentials（可选）：告诉浏览器发送请求时携带Cookie，true表示允许false表示禁止。
- Access-Control-Expose-Headers（可选）：额外给客户端返回的头部字段。



②复杂请求

复杂请求会有两次，第一次是发送一个预检请求，使用的方法是options，询问服务器是否允许我进行跨域请求资源。并且允许客户端自定义请求头的类型，询问服务器是否允许。

```javascript
OPTIONS /cors HTTP/1.1
Origin: http://test.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Custom-Header1,Custom-Header2
Host: target.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

然后服务器会进行验证，还会在响应头进行说明允许你的请求。

 

```javascript
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61（Unix）
Access-Control-Allow-Origin: http://test.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Custom-Header1,Custom-Header2
Access-Control-Max-Age: 1728000
Content-type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

- Access-Control-Allow-Origin：告诉客户端，允许你这个源的请求
- Access-Control-Allow-Methods：告诉客户端，服务端允许的跨域 AJAX 请求的类型，也可进行 GET 或者 POST 请求
- Access-Control-Allow-Headers：告诉客户端，服务端允许的发送请求时的自定义请求头
- Access-Control-Max-Age: 告诉客户端预检请求的有效期，省去了多次的预检请求。也就是说，1728000 秒内你可以直接发送真正的 AJAX 请求，不用每次询问



**3、Nginx代理**

将nginx目录下的nginx.conf修改，通过反向代理的方式来实现跨域请求。

```javascript
# /所有以apis开头发起的请求会被分发到myserver
location ^~ /apis/ {
     proxy_pass http://myserver; # 负载均衡名，写你请求的服务器地址
     proxy_set_header X-real-ip $remote_addr;
     proxy_set_header Host $http_host;
}
```



**4、document.domain**

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域



**5、window.name**

window.name有一个奇妙的性质，页面如果设置了window.name，那么在不关闭页面的情况下，即使进行了页面跳转location.href=...，这个window.name还是会保留。

```javascript
// 打开必应 https://www.bing.com/
// 打开控制台
> window.name
""
> window.name='test';
"test"
> location.href='http://www.google.com';
"http://www.google.com"
Navigated to https://www.google.com/
> window.name
"test"
```



**6、postMessage+iframe**

这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

```javascript
// 发送消息端
<div>
   <div id="color">Frame Color</div>
</div>
<div>
   <iframe id="child" src="http://b.com/b.html"></iframe>
</div>

window.onload=function(){
   window.frames[0].postMessage('getcolor','http://b.com');
}
// 接收消息端
window.addEventListener('message',function(e){
      console.log(e)
},false);
```



postMessage(data,origin)方法接受两个参数：

- data:要传递的数据，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，然而并不是所有浏览器都做到了这点儿，部分浏览器只能处理字符串参数，所以我们在传递参数的时候需要使用JSON.stringify()方法对对象参数序列化
- origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以把参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。



## 03 小结



前端跨域方法其实还有很多种，但是常用的就这么一两种，个人觉得Nginx代理还很不错，配置简单还不用考虑很多事情。能够总结多种方法，遇到问题就可以考虑多一种解决方法，可能在面试中就可以多一次机会，懂得多没有什么不好，共勉。



**<font color="green">参考文章</font>**：

- 掘金小册前端面试之道
- 知乎《JSONP的工作原理》
- AJAX与跨域通信



![](../common/2.gif)