<template><div><h1 id="入门基于node的web框架——koa" tabindex="-1"><a class="header-anchor" href="#入门基于node的web框架——koa" aria-hidden="true">#</a> 入门基于Node的Web框架——Koa</h1>
<blockquote>
<p>&quot;Koa是基于Node.js的web框架，由Express原班人马打造，有健壮、轻量的特点&quot;</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>之前介绍过Node.js的特点就是基于事件还有回掉函数的，由于这个特点，Node适合于高密度IO的场景。传统的数据操作是直接在数据库上面进行数据的增删改查，是精确到数据源本身，这种情况有可能导致性能问题。因为当遇到高并发的场景，数据库可能查询不过来而且还有锁的存在来防止数据冲突。</p>
<p>但是Node是基于事件与回调函数的，Node可以对应用的操作以事件的队列形式，每一次事件都准确记录下来，依次执行。这种方法不会对数据的直接操作，也不会数据产生冲突。</p>
<p><img src="@source/blog/koa-framework/img/1.jpg" alt=""></p>
<h2 id="_02-koa介绍" tabindex="-1"><a class="header-anchor" href="#_02-koa介绍" aria-hidden="true">#</a> 02 Koa介绍</h2>
<h5 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> <strong>安装</strong></h5>
<p>首先我们在本地新建一个文件夹用来存放项目的代码。然后再文件夹里面新建app.js文件，这里我们简单地在app.js文件里面写上：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"http service is running at port 3000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'&lt;h1>Hello Koa!&lt;/h1>'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后安装koa，只需要一句命令即可。在终端输入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i koa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在运行app.js文件之后，输出上面的那句话就证明我们成功创建了一个http服务器，当你打开localhost:3000你就会看到hello koa了。怎么样，是不是非常简单？</p>
<h5 id="context对象" tabindex="-1"><a class="header-anchor" href="#context对象" aria-hidden="true">#</a> <strong>context对象</strong></h5>
<p>大家可以看到上面app.use函数使用了一个ctx的参数，其实就是context对象，这个对象包含了request和response对象的封装。我们可以在控制台打印出来这两个对象到底是什么。</p>
<p><img src="@source/blog/koa-framework/img/1.png" alt=""></p>
<p>可以看到包含了http请求头和响应头的相关信息。其实这是一个上下文的对象，我们在JavaScript中也知道有上下文的概念，就是一个环境。这里的上下文指的就是某次请求包含用户的环境是什么，包括你的状态、Token或者参数等等，来确定你当前所处的请求环境。</p>
<h6 id="request" tabindex="-1"><a class="header-anchor" href="#request" aria-hidden="true">#</a> <strong>request</strong></h6>
<p>我们再来看一下context里面的request对象有哪些属性，我们把上面的代码改一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"http service is running at port 3000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span>ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>url<span class="token punctuation">,</span>
        <span class="token literal-property property">query</span><span class="token operator">:</span>ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>query<span class="token punctuation">,</span>
        <span class="token literal-property property">querystring</span><span class="token operator">:</span>ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>querystring
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后启动代码，在浏览器输入http 😕/localhost:3000/?search=koa&amp;keyword=context，你就会看到相关的属性和属性值。这样一来，我们就可以轻松获取请求参数和请求地址，在以后的接口编写会很有帮助。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"/?search=koa&amp;keyword=context"</span><span class="token punctuation">,</span>
    <span class="token property">"query"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"search"</span><span class="token operator">:</span> <span class="token string">"koa"</span><span class="token punctuation">,</span>
        <span class="token property">"keyword"</span><span class="token operator">:</span> <span class="token string">"context"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"querystring"</span><span class="token operator">:</span> <span class="token string">"search=koa&amp;keyword=context"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="response" tabindex="-1"><a class="header-anchor" href="#response" aria-hidden="true">#</a> <strong>response</strong></h6>
<p>response对象是用于设置一些响应信息给客户端，这些和http请求的响应字段是一样的。比如说可以设置状态码、响应格式等相关信息。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>status<span class="token operator">=</span><span class="token number">200</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">accepts</span><span class="token punctuation">(</span><span class="token string">'json'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>body<span class="token operator">=</span><span class="token string">'&lt;h1>Hello json&lt;/h1>'</span>
        ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">'json'</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">accepts</span><span class="token punctuation">(</span><span class="token string">'html'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>type<span class="token operator">=</span><span class="token string">'html'</span>
        ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>body<span class="token operator">=</span><span class="token string">'&lt;h1>Hello html!&lt;/h1>'</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>type<span class="token operator">=</span><span class="token string">'text'</span>
        ctx<span class="token punctuation">.</span>response<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'hello text!'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> <strong>state</strong></h6>
<blockquote>
<p>The recommended namespace for passing information through middleware and to your frontend views.</p>
</blockquote>
<p>引用<a href="https://koajs.com/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a>的一句话，state是一个命名空间，用于通过中间件传递信息和前端视图。比如以下的代码可以把user放在state里面，传递给另一个中间件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ctx<span class="token punctuation">.</span>state<span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">yield</span> User<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="cookies" tabindex="-1"><a class="header-anchor" href="#cookies" aria-hidden="true">#</a> <strong>cookies</strong></h6>
<p>ctx.cookies用于获取和设置cookie。</p>
<ul>
<li>
<p>设置：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ctx<span class="token punctuation">.</span>cookies<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>获取</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ctx<span class="token punctuation">.</span>cookies<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>其中options就是一些cookie的相关属性，如设置过期时间、路径等。具体如下：</p>
<p>| key       | value                                |
| --- |  |
| maxAge    | cookie过期时间                       |
| signed    | cookie签名值                         |
| expires   | 过期日期                             |
| path      | 存储路径                             |
| domain    | 域名                                 |
| secure    | 只允许https访问                      |
| httpOnly  | 如果是true，则js无法访问             |
| overwrite | 布尔值，是否允许覆盖以前的同名cookie |</p>
<h6 id="throw" tabindex="-1"><a class="header-anchor" href="#throw" aria-hidden="true">#</a> <strong>throw</strong></h6>
<p>用于抛出错误，返回错误信息给用户。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
	ctx<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_03-koa中间件" tabindex="-1"><a class="header-anchor" href="#_03-koa中间件" aria-hidden="true">#</a> 03 Koa中间件</h2>
<p>中间件其实可以理解成一个执行函数，函数就是实现某一种功能的方法。可能这么说不太明白。举个例子：比如你购买商品，添加购物是要在登录状态的，下单也是要在登录状态的。这里每进行一次操作都应该判断一下用户是否是登录状态，我们可以把判断是否登录状态的函数抽离出来，形成一个中间件，可以在任何地方进行复用。</p>
<p>中间件有两个参数，第一个就是我们上面提到的ctx，还有一个就是next参数，下面就讲一下next参数到底是怎么用的，我们先来了解一下“洋葱模型”。</p>
<p><img src="@source/blog/koa-framework/img/2.png" alt=""></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/new'</span><span class="token punctuation">,</span> loginCheck<span class="token punctuation">,</span> otherMiddleWare<span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> body <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body
    body<span class="token punctuation">.</span>author <span class="token operator">=</span> ctx<span class="token punctuation">.</span>session<span class="token punctuation">.</span>username
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">newBlog</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SuccessModel</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这段代码的意思就是新建文章的接口，新建之前就使用了loginCheck（验证是否登录）的中间件，如果还有其他也可以写在otherMiddleWare这里。</p>
<p>所以next的作用就是把中间件的执行权交给下一个中间件，如果没有next的话，otherMiddleWare就不会执行。洋葱模型类似于一种栈的数据结构，遵循先进后出的原则。</p>
<p><img src="@source/blog/koa-framework/img/3.png" alt=""></p>
<p>我们也可以一次性引入，把中间件都以函数的形式定义，然后使用koa-compose引入，效果一样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> compose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-compose'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//增加</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">middleWare1</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"first"</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"first end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">middleWare2</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"second"</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"second end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">middleWare3</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"third"</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"third end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> all <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token punctuation">[</span>middleWare1<span class="token punctuation">,</span>middleWare2<span class="token punctuation">,</span>middleWare3<span class="token punctuation">]</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>all<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_04-常用中间件" tabindex="-1"><a class="header-anchor" href="#_04-常用中间件" aria-hidden="true">#</a> 04 常用中间件</h2>
<h5 id="koa-bodyparser" tabindex="-1"><a class="header-anchor" href="#koa-bodyparser" aria-hidden="true">#</a> <strong>koa-bodyparser</strong></h5>
<p>koa-bodyparser这个中间件可以用于解析post方法传递过来的参数，常用于表单的提交信息获取，以一个JSON对象的形式返回，可以很方便地获取数据。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> bodyparser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-bodyparser'</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">bodyparser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">'GET'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
        &lt;h1>登录&lt;/h1>
        &lt;form method="POST" action="/">
        &lt;p>用户名&lt;/p>&lt;input name="username">
        &lt;p>密码&lt;/p>&lt;input name="password">
        &lt;button type="submit">提交&lt;/button>
    </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">'POST'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> postData <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>postData<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{ username: '123', password: '456' }</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="koa-router" tabindex="-1"><a class="header-anchor" href="#koa-router" aria-hidden="true">#</a> <strong>koa-router</strong></h5>
<p>上面介绍next的时候，代码里面有router的出现，这就是koa-router。使用这个方便获取你是使用哪一种方法，相应的逻辑也可以写在这个router里面。使用之前先安装，<code v-pre>npm i koa-router</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>router.get('/',(ctx, next)=>{
	//
})

router.post('/',(ctx, next)=>{
	//获取json数据
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="koa-compose" tabindex="-1"><a class="header-anchor" href="#koa-compose" aria-hidden="true">#</a> <strong>koa-compose</strong></h5>
<p>上面我们已经介绍了，使用这个中间件可以把所有的中间件一次性引入，能够提高代码的可读性，中间件也可以单独写在一个js文件里面进行引入。这样就可以使页面更加简洁，耦合性更低，符合软件开发的要求。</p>
<h5 id="koa-jwt" tabindex="-1"><a class="header-anchor" href="#koa-jwt" aria-hidden="true">#</a> <strong>koa-jwt</strong></h5>
<p>随着网站前后端分离方案的流行，越来越多的网站从Session Base转为使用Token Base，JWT(Json Web Tokens)作为一个开放的标准被很多网站采用，koa-jwt这个中间件使用JWT认证HTTP请求。</p>
<h5 id="koa-compress" tabindex="-1"><a class="header-anchor" href="#koa-compress" aria-hidden="true">#</a> <strong>koa-compress</strong></h5>
<p>当响应体比较大时，我们一般会启用类似Gzip的压缩技术减少传输内容，koa-compress提供了这样的功能，可根据需要进行灵活的配置。</p>
<h5 id="koa-logger" tabindex="-1"><a class="header-anchor" href="#koa-logger" aria-hidden="true">#</a> <strong>koa-logger</strong></h5>
<p>koa-logger提供了输出请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息，对于调试和跟踪应用程序特别有帮助，koa-bunyan-logger提供了更丰富的功能。</p>
<h5 id="koa-session" tabindex="-1"><a class="header-anchor" href="#koa-session" aria-hidden="true">#</a> <strong>koa-session</strong></h5>
<p>HTTP是无状态协议，为了保持用户状态，我们一般使用Session会话，koa-session提供了这样的功能，既支持将会话信息存储在本地Cookie，也支持存储在如Redis, MongoDB这样的外部存储设备。</p>
<h5 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> <strong>mysql</strong></h5>
<p>可以使用mysql中间件更方便地连接数据库，提供了很多数据库相关的操作方法，也可以手动进行配置。而且还有防止数据库注入的预防。</p>
<h2 id="_05-小结" tabindex="-1"><a class="header-anchor" href="#_05-小结" aria-hidden="true">#</a> 05 小结</h2>
<p>上面主要介绍了koa的用法以及常用的中间件的作用，koa是一个web框架，依靠强大的中间件可以很方便地实现一些Node.js应用。koa是基于Node的框架，大家学习之前应该先看一下Node的基本语法。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
