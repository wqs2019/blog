---
title: 你不知道的Nginx服务器的一些知识
date: 2020-04-09 16:10:50
tags: [nginx,反向代理,负载均衡]
categories: nginx
---

# 你不知道的Nginx服务器的一些知识

> Nginx服务器是一款高性能的服务器，之前部署网站就使用了它进行反向代理，这次就好好总结Nginx相关的特性与使用。

![](../common/1.gif)

## 01 前言

Nginx服务器是Web服务器，也就是我们平时用来提供Web服务的。我们之前可能听过Apache、Tomcat、IIS等的服务器，其实Nginx和它们都是一样的，都可以通过HTTP为浏览器等客户端提供各种服务。

Nginx服务器是一个跨平台的服务器，可以运行在Window和Linux以及Mac OS等操作系统，它的特点就是可以处理大规模的并发连接。接下来就具体介绍一下。

   

## 02 正向代理与反向代理

- 正向代理，`代理客户端`，服务端不知道实际发起请求的客户端；
- 反向代理，`代理服务端`，客户端不知道实际提供服务的服务端；

比如我们访问google.com的时候，是通过正向代理的方式，`谷歌服务器是不知道是哪个用户对它进行访问`，这就是正向代理；但是假如谷歌服务器压力大，承受不了这么多人访问，用户的请求就会分发到不同的谷歌服务器，`用户不知道自己请求的具体是哪一台服务器`，这就是反向代理。

**正向代理**

![](https://imgkr.cn-bj.ufileos.com/614c2cdf-58ec-41cd-96e5-c758848bca10.png)


**反向代理**


![](https://imgkr.cn-bj.ufileos.com/00240d45-5d32-49e9-982b-0acbe9d8f14d.png)

 

## 03 Nginx

**Nginx特点**

- 响应快
- 扩展性强
- 可靠性高
- 内存消耗少
- 支持高并发
- 热部署
- 免费开源

**Nginx的使用**

我们要为了能够方便地使用Nginx，一般我们都会将它安装在Linux系统上面。所以我们现在服务器上面安装Nginx，只需一行代码就搞定。默认情况之下，nginx会安装在 /etc/nginx目录之下，其中nginx.conf是它的配置文件。

```bash
yum install  nginx
```
我们有必要了解一下nginx相关的命令，我们经常会使用，比如启动停止、查看状态等。
- 启动

```
systemctl start nginx
```
- 停止

```
systemctl stop nginx
```

- 重启

```
systemctl restart nginx 
```

- 状态

```
systemctl status nginx 
```

- 版本

```
nginx -v
```

- 测试

```
nginx -t
```


**Nginx进程**

Nginx服务器一般都是使用一个master主进程管理多个worker进程的，而worker进程一般与服务器CPU的核数相等。

master进程是不提供服务的，真正提供服务的是worker进程，worker进程之间通过进程间通信机制实现通信，如负载均衡等。假如worker某进程出错，其余进程将不受影响继续提供服务，master进程也会启动一个新的进程。

---

**nginx.conf**

nginx的默认配置文件一共有以下几块，分别配置不同的信息。

```bash
user nginx;  #配置用户或者组，默认为nginx。
worker_processes 2;  #允许生成的进程数，默认为1
pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。级别可为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       80;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
```

- `全局块`：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。
- `events块`：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
- `http块`：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。
- `server块`：配置虚拟主机的相关参数，一个http中可以有多个server。
- `location块`：配置请求的路由，以及各种页面的处理情况。

---

**反向代理**

反向代理用于接收网络上的请求，然后将请求转发到目标服务器，然后目标服务器返回给代理服务器，最后返回给用户。此方法延长了请求时间，但是降低了目标服务器的压力。

反向代理的基本配置：

- `proxy_pass`:将请求代理到当前的服务器，可以是主机名/IP地址+端口形式
- `proxy_methods`:表示转发时的协议方法名，如get/post等
- `proxy_hide_header`:指定目标服务器返回给代理服务器的响应中，代理决定哪些头不转发给客户端,值为响应头
- `proxy_pass_header`:与上面相反，表示哪些头允许转发给客户端
- `proxy_pass_request_body`:是否向目标服务器发送HTTP包实体部分，值为on/off
- `proxy_pass_request_headers`:是否向目标服务器发送HTTP头，值为on/off
- `proxy_redirect`：如目标服务器返回301/302重定向，那么就会重设location或者refresh字段
```
proxy_redirect http://localhost:8000/two/
      http://frontend;
```
如果请求`http://localhost:8000/two/uri/`在返回重定向的情况下，实际上转发给客户端的就是`http://frontend/uri`,值为off则将使location或者refresh字段维持不变

- `proxy_next_upstream`：表示目标服务器转发请求发生错误，换一台目标服务器处理这个请求


---
**负载均衡**

实现负载均衡最关键的模块就是upstream模块，服务器就写在里面的server字段，对应着不同的服务器。

```bash
http {
    upstream test {
        server xx.xxx.xxx.xx   weight:5;
        server xx.xx.xx.xx   max_fails=3 fail_timeout=30s;
    }
    server {
        listen 8080;
        location / {
            proxy_pass http://test;
        }
    }
}

```

这里的意思就是当你请求根路径的时候就会代理到upstream里面的两个服务器，以此来实现负载均衡的功能。

**server**配置选项：

- `weight`:向这台服务器转发的权重，默认是1
- `max_fails`:与fail_timeout配合使用，如果在fail_timeout时间内的转发次数超过max_fails的数量，代表该服务器不可用。max_fails默认是1，设为0则不检查次数
- `dowm`:服务器下线，只会在ip_hash配置项时才有用
- `backup`:表示该服务器只是备份的，当其他的服务器失效之后才转发给它,有ip_hash配置项时无效

**upstream**配置选项：

- `ip_hash`:解决同一用户在不同的服务器中缓存相同的信息，与weight不可同时使用

```bash
http {
    upstream test {
        ip_hash;
        server xx1.xxx.xxx.xx;
        server xx2.xx.xx.xx;
        server xx3.xx.xx.xx;
    }
    server {
        listen 8080;
        location / {
            proxy_pass http://test;
        }
    }
}

```

## 04 小结

通过对Nginx服务器的一些理解，会让我们知道一些网络上的知识，如正向代理与反向代理的区别、负载均衡的实现等。

大家也可以尝试着使用nginx服务器进行一些配置，上面只是一些简单的配置模块，如果想要详情的理解去官网看一下。对于前端来说，懂基本的就可以，不用像运维那样精通所有的配置，当然学有余力最好不过了，奈何自己学习能力有限，以后再详解其中的一二。


![](../common/2.gif)