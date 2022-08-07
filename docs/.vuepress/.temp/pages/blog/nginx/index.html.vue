<template><div><h1 id="你不知道的nginx服务器的一些知识" tabindex="-1"><a class="header-anchor" href="#你不知道的nginx服务器的一些知识" aria-hidden="true">#</a> 你不知道的Nginx服务器的一些知识</h1>
<blockquote>
<p>Nginx服务器是一款高性能的服务器，之前部署网站就使用了它进行反向代理，这次就好好总结Nginx相关的特性与使用。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>Nginx服务器是Web服务器，也就是我们平时用来提供Web服务的。我们之前可能听过Apache、Tomcat、IIS等的服务器，其实Nginx和它们都是一样的，都可以通过HTTP为浏览器等客户端提供各种服务。</p>
<p>Nginx服务器是一个跨平台的服务器，可以运行在Window和Linux以及Mac OS等操作系统，它的特点就是可以处理大规模的并发连接。接下来就具体介绍一下。</p>
<h2 id="_02-正向代理与反向代理" tabindex="-1"><a class="header-anchor" href="#_02-正向代理与反向代理" aria-hidden="true">#</a> 02 正向代理与反向代理</h2>
<ul>
<li>正向代理，<code v-pre>代理客户端</code>，服务端不知道实际发起请求的客户端；</li>
<li>反向代理，<code v-pre>代理服务端</code>，客户端不知道实际提供服务的服务端；</li>
</ul>
<p>比如我们访问google.com的时候，是通过正向代理的方式，<code v-pre>谷歌服务器是不知道是哪个用户对它进行访问</code>，这就是正向代理；但是假如谷歌服务器压力大，承受不了这么多人访问，用户的请求就会分发到不同的谷歌服务器，<code v-pre>用户不知道自己请求的具体是哪一台服务器</code>，这就是反向代理。</p>
<p><strong>正向代理</strong></p>
<p><img src="https://imgkr.cn-bj.ufileos.com/614c2cdf-58ec-41cd-96e5-c758848bca10.png" alt=""></p>
<p><strong>反向代理</strong></p>
<p><img src="https://imgkr.cn-bj.ufileos.com/00240d45-5d32-49e9-982b-0acbe9d8f14d.png" alt=""></p>
<h2 id="_03-nginx" tabindex="-1"><a class="header-anchor" href="#_03-nginx" aria-hidden="true">#</a> 03 Nginx</h2>
<p><strong>Nginx特点</strong></p>
<ul>
<li>响应快</li>
<li>扩展性强</li>
<li>可靠性高</li>
<li>内存消耗少</li>
<li>支持高并发</li>
<li>热部署</li>
<li>免费开源</li>
</ul>
<p><strong>Nginx的使用</strong></p>
<p>我们要为了能够方便地使用Nginx，一般我们都会将它安装在Linux系统上面。所以我们现在服务器上面安装Nginx，只需一行代码就搞定。默认情况之下，nginx会安装在 /etc/nginx目录之下，其中nginx.conf是它的配置文件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span>  nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们有必要了解一下nginx相关的命令，我们经常会使用，比如启动停止、查看状态等。</p>
<ul>
<li>启动</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>停止</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl stop nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>重启</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl restart nginx 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>状态</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl status nginx 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>版本</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>测试</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Nginx进程</strong></p>
<p>Nginx服务器一般都是使用一个master主进程管理多个worker进程的，而worker进程一般与服务器CPU的核数相等。</p>
<p>master进程是不提供服务的，真正提供服务的是worker进程，worker进程之间通过进程间通信机制实现通信，如负载均衡等。假如worker某进程出错，其余进程将不受影响继续提供服务，master进程也会启动一个新的进程。</p>
<hr>
<p><strong>nginx.conf</strong></p>
<p>nginx的默认配置文件一共有以下几块，分别配置不同的信息。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>user nginx<span class="token punctuation">;</span>  <span class="token comment">#配置用户或者组，默认为nginx。</span>
worker_processes <span class="token number">2</span><span class="token punctuation">;</span>  <span class="token comment">#允许生成的进程数，默认为1</span>
pid /nginx/pid/nginx.pid<span class="token punctuation">;</span>   <span class="token comment">#指定nginx进程运行文件存放地址</span>
error_log log/error.log debug<span class="token punctuation">;</span>  <span class="token comment">#制定日志路径，级别。级别可为：debug|info|notice|warn|error|crit|alert|emerg</span>
events <span class="token punctuation">{</span>
    accept_mutex on<span class="token punctuation">;</span>   <span class="token comment">#设置网路连接序列化，防止惊群现象发生，默认为on</span>
    multi_accept on<span class="token punctuation">;</span>  <span class="token comment">#设置一个进程是否同时接受多个网络连接，默认为off</span>
    use epoll<span class="token punctuation">;</span>      <span class="token comment">#事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>    <span class="token comment">#最大连接数，默认为512</span>
<span class="token punctuation">}</span>
http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>   <span class="token comment">#文件扩展名与文件类型映射表</span>
    default_type  application/octet-stream<span class="token punctuation">;</span> <span class="token comment">#默认文件类型，默认为text/plain</span>
    <span class="token comment">#access_log off; #取消服务日志    </span>
    log_format myFormat <span class="token string">'$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'</span><span class="token punctuation">;</span> <span class="token comment">#自定义格式</span>
    access_log log/access.log myFormat<span class="token punctuation">;</span>  <span class="token comment">#combined为日志格式的默认值</span>
    sendfile on<span class="token punctuation">;</span>   <span class="token comment">#允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。</span>
    sendfile_max_chunk 100k<span class="token punctuation">;</span>  <span class="token comment">#每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。</span>
    keepalive_timeout <span class="token number">65</span><span class="token punctuation">;</span>  <span class="token comment">#连接超时时间，默认为75s，可以在http，server，location块。</span>

    upstream mysvr <span class="token punctuation">{</span>   
      server <span class="token number">127.0</span>.0.1:7878<span class="token punctuation">;</span>
      server <span class="token number">192.168</span>.10.121:3333 backup<span class="token punctuation">;</span>  <span class="token comment">#热备</span>
    <span class="token punctuation">}</span>
    error_page <span class="token number">404</span> https://www.baidu.com<span class="token punctuation">;</span> <span class="token comment">#错误页</span>
    server <span class="token punctuation">{</span>
        keepalive_requests <span class="token number">120</span><span class="token punctuation">;</span> <span class="token comment">#单连接请求上限次数。</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>   <span class="token comment">#监听端口</span>
        server_name  <span class="token number">127.0</span>.0.1<span class="token punctuation">;</span>   <span class="token comment">#监听地址       </span>
        location  ~*^.+$ <span class="token punctuation">{</span>       <span class="token comment">#请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。</span>
           <span class="token comment">#root path;  #根目录</span>
           <span class="token comment">#index vv.txt;  #设置默认页</span>
           proxy_pass  http://mysvr<span class="token punctuation">;</span>  <span class="token comment">#请求转向mysvr 定义的服务器列表</span>
           deny <span class="token number">127.0</span>.0.1<span class="token punctuation">;</span>  <span class="token comment">#拒绝的ip</span>
           allow <span class="token number">172.18</span>.5.54<span class="token punctuation">;</span> <span class="token comment">#允许的ip           </span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>全局块</code>：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。</li>
<li><code v-pre>events块</code>：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。</li>
<li><code v-pre>http块</code>：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。</li>
<li><code v-pre>server块</code>：配置虚拟主机的相关参数，一个http中可以有多个server。</li>
<li><code v-pre>location块</code>：配置请求的路由，以及各种页面的处理情况。</li>
</ul>
<hr>
<p><strong>反向代理</strong></p>
<p>反向代理用于接收网络上的请求，然后将请求转发到目标服务器，然后目标服务器返回给代理服务器，最后返回给用户。此方法延长了请求时间，但是降低了目标服务器的压力。</p>
<p>反向代理的基本配置：</p>
<ul>
<li><code v-pre>proxy_pass</code>:将请求代理到当前的服务器，可以是主机名/IP地址+端口形式</li>
<li><code v-pre>proxy_methods</code>:表示转发时的协议方法名，如get/post等</li>
<li><code v-pre>proxy_hide_header</code>:指定目标服务器返回给代理服务器的响应中，代理决定哪些头不转发给客户端,值为响应头</li>
<li><code v-pre>proxy_pass_header</code>:与上面相反，表示哪些头允许转发给客户端</li>
<li><code v-pre>proxy_pass_request_body</code>:是否向目标服务器发送HTTP包实体部分，值为on/off</li>
<li><code v-pre>proxy_pass_request_headers</code>:是否向目标服务器发送HTTP头，值为on/off</li>
<li><code v-pre>proxy_redirect</code>：如目标服务器返回301/302重定向，那么就会重设location或者refresh字段</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>proxy_redirect http://localhost:8000/two/
      http://frontend;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果请求<code v-pre>http://localhost:8000/two/uri/</code>在返回重定向的情况下，实际上转发给客户端的就是<code v-pre>http://frontend/uri</code>,值为off则将使location或者refresh字段维持不变</p>
<ul>
<li><code v-pre>proxy_next_upstream</code>：表示目标服务器转发请求发生错误，换一台目标服务器处理这个请求</li>
</ul>
<hr>
<p><strong>负载均衡</strong></p>
<p>实现负载均衡最关键的模块就是upstream模块，服务器就写在里面的server字段，对应着不同的服务器。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http <span class="token punctuation">{</span>
    upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
        server xx.xxx.xxx.xx   weight:5<span class="token punctuation">;</span>
        server xx.xx.xx.xx   <span class="token assign-left variable">max_fails</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span>30s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    server <span class="token punctuation">{</span>
        listen <span class="token number">8080</span><span class="token punctuation">;</span>
        location / <span class="token punctuation">{</span>
            proxy_pass http://test<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的意思就是当你请求根路径的时候就会代理到upstream里面的两个服务器，以此来实现负载均衡的功能。</p>
<p><strong>server</strong>配置选项：</p>
<ul>
<li><code v-pre>weight</code>:向这台服务器转发的权重，默认是1</li>
<li><code v-pre>max_fails</code>:与fail_timeout配合使用，如果在fail_timeout时间内的转发次数超过max_fails的数量，代表该服务器不可用。max_fails默认是1，设为0则不检查次数</li>
<li><code v-pre>dowm</code>:服务器下线，只会在ip_hash配置项时才有用</li>
<li><code v-pre>backup</code>:表示该服务器只是备份的，当其他的服务器失效之后才转发给它,有ip_hash配置项时无效</li>
</ul>
<p><strong>upstream</strong>配置选项：</p>
<ul>
<li><code v-pre>ip_hash</code>:解决同一用户在不同的服务器中缓存相同的信息，与weight不可同时使用</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http <span class="token punctuation">{</span>
    upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
        ip_hash<span class="token punctuation">;</span>
        server xx1.xxx.xxx.xx<span class="token punctuation">;</span>
        server xx2.xx.xx.xx<span class="token punctuation">;</span>
        server xx3.xx.xx.xx<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    server <span class="token punctuation">{</span>
        listen <span class="token number">8080</span><span class="token punctuation">;</span>
        location / <span class="token punctuation">{</span>
            proxy_pass http://test<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_04-小结" tabindex="-1"><a class="header-anchor" href="#_04-小结" aria-hidden="true">#</a> 04 小结</h2>
<p>通过对Nginx服务器的一些理解，会让我们知道一些网络上的知识，如正向代理与反向代理的区别、负载均衡的实现等。</p>
<p>大家也可以尝试着使用nginx服务器进行一些配置，上面只是一些简单的配置模块，如果想要详情的理解去官网看一下。对于前端来说，懂基本的就可以，不用像运维那样精通所有的配置，当然学有余力最好不过了，奈何自己学习能力有限，以后再详解其中的一二。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
