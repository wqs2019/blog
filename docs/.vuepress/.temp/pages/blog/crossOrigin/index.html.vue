<template><div><h1 id="一次看懂如何解决跨域" tabindex="-1"><a class="header-anchor" href="#一次看懂如何解决跨域" aria-hidden="true">#</a> 一次看懂如何解决跨域</h1>
<blockquote>
<p>人生如逆旅，我亦是行人</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>前端在调试的过程中，难免会出现跨域的问题，由于前后端分离的开发模式，前端开发部署的代码与服务器后端代码有可能不在同一个域上，不同域之间访问是会被浏览器拦截的。我们要明白一个点就是，浏览器是可以发起请求，但是结果被浏览器拦截，此谓跨域。接下来我就总结一下如何解决这一问题。</p>
<p><img src="@source/blog/crossOrigin/img/1.png" alt=""></p>
<h2 id="_02-跨域方法" tabindex="-1"><a class="header-anchor" href="#_02-跨域方法" aria-hidden="true">#</a> 02 跨域方法</h2>
<p>了解了跨域的产生情况之后，我们就可以联合客户端和服务端来进行解决。跨域解决主要有以下几种：</p>
<ul>
<li>JSONP</li>
<li>CORS</li>
<li>Nginx代理</li>
<li>document.domain</li>
<li>window.name</li>
<li>postMessage+iframe</li>
</ul>
<p><strong>1、JSONP</strong></p>
<p>我们知道写HTML代码的时候，加入图片链接就不会有获取不到图片的问题。这是因为图片资源并没有进行ajax请求，而且script标签是没有同源策略的，可以进行资源请求，可以说是一个前端设计的漏洞。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1.回调函数</span>
<span class="token keyword">function</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 2.动态创建 script </span>
<span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'http://test.com/json?callback=handleResponse'</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>script<span class="token punctuation">,</span>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>firstChild<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用script标签立即下载并执行的特性，我们就可以在回调函数中拿到返回来的数据。那么是不是所有的情况都可以呢？显然不是的。虽然实现是比较简单的操作，但是有缺点：</p>
<ol>
<li>仅限于GET请求</li>
<li>有安全问题，万一有恶意代码返回，前端无法阻止</li>
<li>无法检测请求是否成功</li>
</ol>
<p><strong>2、CORS</strong></p>
<p>CORS是跨域资源共享(Cross-origin resource sharing)</p>
<p>要想利用这个技术关键是在于服务端，设置返回的Access-Control-Allow-Origin响应头允许跨域操作，发送请求时有两种情况：</p>
<ul>
<li>简单请求</li>
<li>复杂请求</li>
</ul>
<p>①简单请求</p>
<p>当使用以下方法之一：</p>
<ul>
<li>GET</li>
<li>HEAD</li>
<li>POST</li>
</ul>
<p>Content-Type的值为以下之一：</p>
<ul>
<li>text/plain</li>
<li>multipart/form-data</li>
<li>application/x-www-form-urlencoded</li>
</ul>
<p>才会发起简单请求，浏览器判断是简单请求的话就会在请求头添加origin字段，值是发起请求的所在的源。服务端收到请求后会判断origin是否在自己的许可范围，如果不在就拒绝，如果在就会有以下的响应头添加：</p>
<ul>
<li>Access-Control-Allow-Origin（必选）：告诉客户端我接受请求，值为origin的值，若允许所有源请求就会返回 *。</li>
<li>Access-Control-Allow-Credentials（可选）：告诉浏览器发送请求时携带Cookie，true表示允许false表示禁止。</li>
<li>Access-Control-Expose-Headers（可选）：额外给客户端返回的头部字段。</li>
</ul>
<p>②复杂请求</p>
<p>复杂请求会有两次，第一次是发送一个预检请求，使用的方法是options，询问服务器是否允许我进行跨域请求资源。并且允许客户端自定义请求头的类型，询问服务器是否允许。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">OPTIONS</span> <span class="token operator">/</span>cors <span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span>
<span class="token literal-property property">Origin</span><span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>test<span class="token punctuation">.</span>com
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Request<span class="token operator">-</span>Method<span class="token operator">:</span> <span class="token constant">PUT</span>
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Request<span class="token operator">-</span>Headers<span class="token operator">:</span> Custom<span class="token operator">-</span>Header1<span class="token punctuation">,</span>Custom<span class="token operator">-</span>Header2
<span class="token literal-property property">Host</span><span class="token operator">:</span> target<span class="token punctuation">.</span>com
Accept<span class="token operator">-</span>Language<span class="token operator">:</span> en<span class="token operator">-</span><span class="token constant">US</span>
<span class="token literal-property property">Connection</span><span class="token operator">:</span> keep<span class="token operator">-</span>alive
User<span class="token operator">-</span>Agent<span class="token operator">:</span> Mozilla<span class="token operator">/</span><span class="token number">5.0</span><span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后服务器会进行验证，还会在响应头进行说明允许你的请求。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span> <span class="token number">200</span> <span class="token constant">OK</span>
<span class="token literal-property property">Date</span><span class="token operator">:</span> Mon<span class="token punctuation">,</span> <span class="token number">01</span> Dec <span class="token number">2008</span> <span class="token number">01</span><span class="token operator">:</span><span class="token number">15</span><span class="token operator">:</span><span class="token number">39</span> <span class="token constant">GMT</span>
<span class="token literal-property property">Server</span><span class="token operator">:</span> Apache<span class="token operator">/</span><span class="token number">2.0</span><span class="token number">.61</span>（Unix）
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Origin<span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>test<span class="token punctuation">.</span>com
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Methods<span class="token operator">:</span> <span class="token constant">GET</span><span class="token punctuation">,</span> <span class="token constant">POST</span><span class="token punctuation">,</span> <span class="token constant">PUT</span>
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Headers<span class="token operator">:</span> Custom<span class="token operator">-</span>Header1<span class="token punctuation">,</span>Custom<span class="token operator">-</span>Header2
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Max<span class="token operator">-</span>Age<span class="token operator">:</span> <span class="token number">1728000</span>
Content<span class="token operator">-</span>type<span class="token operator">:</span> text<span class="token operator">/</span>html<span class="token punctuation">;</span> charset<span class="token operator">=</span>utf<span class="token operator">-</span><span class="token number">8</span>
Content<span class="token operator">-</span>Encoding<span class="token operator">:</span> gzip
Content<span class="token operator">-</span>Length<span class="token operator">:</span> <span class="token number">0</span>
Keep<span class="token operator">-</span>Alive<span class="token operator">:</span> timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> max<span class="token operator">=</span><span class="token number">100</span>
<span class="token literal-property property">Connection</span><span class="token operator">:</span> Keep<span class="token operator">-</span>Alive
Content<span class="token operator">-</span>Type<span class="token operator">:</span> text<span class="token operator">/</span>plain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Access-Control-Allow-Origin：告诉客户端，允许你这个源的请求</li>
<li>Access-Control-Allow-Methods：告诉客户端，服务端允许的跨域 AJAX 请求的类型，也可进行 GET 或者 POST 请求</li>
<li>Access-Control-Allow-Headers：告诉客户端，服务端允许的发送请求时的自定义请求头</li>
<li>Access-Control-Max-Age: 告诉客户端预检请求的有效期，省去了多次的预检请求。也就是说，1728000 秒内你可以直接发送真正的 AJAX 请求，不用每次询问</li>
</ul>
<p><strong>3、Nginx代理</strong></p>
<p>将nginx目录下的nginx.conf修改，通过反向代理的方式来实现跨域请求。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code># <span class="token operator">/</span>所有以apis开头发起的请求会被分发到myserver
location <span class="token operator">^</span><span class="token operator">~</span> <span class="token operator">/</span>apis<span class="token operator">/</span> <span class="token punctuation">{</span>
     proxy_pass http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>myserver<span class="token punctuation">;</span> # 负载均衡名，写你请求的服务器地址
     proxy_set_header <span class="token constant">X</span><span class="token operator">-</span>real<span class="token operator">-</span>ip $remote_addr<span class="token punctuation">;</span>
     proxy_set_header Host $http_host<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4、document.domain</strong></p>
<p>该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。</p>
<p>只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域</p>
<p><strong>5、window.name</strong></p>
<p>window.name有一个奇妙的性质，页面如果设置了window.name，那么在不关闭页面的情况下，即使进行了页面跳转location.href=...，这个window.name还是会保留。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 打开必应 https://www.bing.com/</span>
<span class="token comment">// 打开控制台</span>
<span class="token operator">></span> window<span class="token punctuation">.</span>name
<span class="token string">""</span>
<span class="token operator">></span> window<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">'test'</span><span class="token punctuation">;</span>
<span class="token string">"test"</span>
<span class="token operator">></span> location<span class="token punctuation">.</span>href<span class="token operator">=</span><span class="token string">'http://www.google.com'</span><span class="token punctuation">;</span>
<span class="token string">"http://www.google.com"</span>
Navigated to https<span class="token operator">:</span><span class="token operator">/</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">www.google.com</span><span class="token regex-delimiter">/</span></span>
<span class="token operator">></span> window<span class="token punctuation">.</span>name
<span class="token string">"test"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>6、postMessage+iframe</strong></p>
<p>这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 发送消息端</span>
<span class="token operator">&lt;</span>div<span class="token operator">></span>
   <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"color"</span><span class="token operator">></span>Frame Color<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>div<span class="token operator">></span>
   <span class="token operator">&lt;</span>iframe id<span class="token operator">=</span><span class="token string">"child"</span> src<span class="token operator">=</span><span class="token string">"http://b.com/b.html"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>iframe<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

window<span class="token punctuation">.</span><span class="token function-variable function">onload</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   window<span class="token punctuation">.</span>frames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'getcolor'</span><span class="token punctuation">,</span><span class="token string">'http://b.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 接收消息端</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>postMessage(data,origin)方法接受两个参数：</p>
<ul>
<li>data:要传递的数据，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，然而并不是所有浏览器都做到了这点儿，部分浏览器只能处理字符串参数，所以我们在传递参数的时候需要使用JSON.stringify()方法对对象参数序列化</li>
<li>origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以把参数设置为&quot;*&quot;，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为&quot;/&quot;。</li>
</ul>
<h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>前端跨域方法其实还有很多种，但是常用的就这么一两种，个人觉得Nginx代理还很不错，配置简单还不用考虑很多事情。能够总结多种方法，遇到问题就可以考虑多一种解决方法，可能在面试中就可以多一次机会，懂得多没有什么不好，共勉。</p>
<p><strong><font color="green">参考文章</font></strong>：</p>
<ul>
<li>掘金小册前端面试之道</li>
<li>知乎《JSONP的工作原理》</li>
<li>AJAX与跨域通信</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
