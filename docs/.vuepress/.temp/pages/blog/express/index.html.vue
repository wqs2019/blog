<template><div><h1 id="闲来无事-扒一下express框架的知识" tabindex="-1"><a class="header-anchor" href="#闲来无事-扒一下express框架的知识" aria-hidden="true">#</a> 闲来无事，扒一下Express框架的知识</h1>
<blockquote>
<p>自从Node.js出现之后，相应的web框架就出现了，而且都是比较容易上手和搭建的，框架中都有一个很重要的概念“中间件”，今天就来扒一下其中的奥妙。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>还记得之前面试的时候，我说用过Node搭建了一个小型的后台框架，然后面试官就问了一下你用过什么常用的中间件吗？</p>
<p>我当时知道中间件就是一个类似插件一样，依次执行的东西。虽然我在项目当中也用到了类似body-parser、express.static()这些，奈何年少无知我不知道这就是中间件。现在想想要是再问我中间件原理就更不懂了。</p>
<p>现在的中间件是挺多的，可以满足我们很多的数据处理与请求，我们今天就来看一下中间件这个神奇的东西到底神在哪？</p>
<h2 id="_02-认识express" tabindex="-1"><a class="header-anchor" href="#_02-认识express" aria-hidden="true">#</a> 02 认识Express</h2>
<p>得益于JavaScript的发展，使得Node诞生了，<code v-pre>能够在服务器端运行JS代码</code>，这无疑是令人激动的事情，Express其实就是一个<code v-pre>Node.js Web程序框架</code>，简单来说就是快速构建一个“后台”。我们用很简单的代码就可以搭建一个服务器，不用费劲心思来使用其他的语言来搭建，而且其他语言在什么也没干的情况下就出现极多的代码。</p>
<p>Node与其他传统的Web服务器的重大区别就是它是<code v-pre>单线程</code>的，它可以简化Web程序的编写，如果要实现多线程就启动多个Node实例即可。而且<code v-pre>Node是跨平台的，与平台是无关的</code>，我们可以在Windows或者Linux操作系统上都可运行。</p>
<h3 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h3>
<p>我们在使用Express编写应用程序的时候一般都会有固定的代码，有一定的目录结构。这中“常规”的代码就是我们所说的脚手架，让我们更方便地开发。我们随便建一个文件夹来使用Express。</p>
<ul>
<li><code v-pre>npm init</code></li>
</ul>
<p>使用这一行命令来<code v-pre>初始化一个package.json文件</code>，但是要注意的是package.json的name不能叫express，不然会在下一句命令会报错。</p>
<ul>
<li><code v-pre>npm install express --save</code></li>
</ul>
<p>安装express，成功之后你会在项目的根目录看到多了node_modules文件夹，这里就是第三方的应用包，我们的express也会安装在这里。</p>
<p>因为这个文件夹极大，甚至包含了成百上千的包，所以代码提交的时候我们肯定不会带上它的。所以我们在根目录下面就<code v-pre>创建一个.gitignore文件</code>，内容就是<code v-pre>node_modules</code>，用与忽略这个文件夹。</p>
<ul>
<li><code v-pre>新建入口文件 app.js</code></li>
</ul>
<p>在根目录新建一个入口文件，通常叫app.js或者index.js都可以。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"port"</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PORT</span> <span class="token operator">||</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 定制 404 页面</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"404 - Not Found"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 定制 500 页面</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"500 - Server Error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"port"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token string">"Express started on http://localhost:"</span> <span class="token operator">+</span>
      app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"port"</span><span class="token punctuation">)</span> <span class="token operator">+</span>
      <span class="token string">"; press Ctrl-C to terminate."</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那其实这样你就创建了小型的服务器了，接下来就直接启动一下，node app.js就会发现它已经是监听了3000端口。但是我们发现他是没有东西的，因为我们没有配置路由，默认就是返回错误页404。</p>
<p>我们尝试配置一个的路由，主要要在404路由之前，不然也会出现404。</p>
<p>上面我们看到了404和500使用的是app.use而不是路由的形式，这是一种中间件的写法，我们可以理解为没有路由匹配的时候走的方向。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"这是首页"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/about"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"这是关于页"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="静态文件引入" tabindex="-1"><a class="header-anchor" href="#静态文件引入" aria-hidden="true">#</a> 静态文件引入</h3>
<p>我们开发中难免会有一些图片等资源的引入，express给我们提供了一种便于资源引入的方法，我们直接在app.js文件的路由开始之前就加入这一行代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//需要加入的代码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思就是这里的资源可以不经任何处理就直接发送给客户端，可以放置图片、CSS文件等。</p>
<h3 id="动态渲染模板" tabindex="-1"><a class="header-anchor" href="#动态渲染模板" aria-hidden="true">#</a> 动态渲染模板</h3>
<p>我们可以加载静态资源文件，但是我们要使用html模板进行内容的渲染就要加入模板引擎了，但是这种模板引擎的我用的比较少，我一般都会结合vue进行渲染的。但是今天我们就来探讨一下不用vue要怎么渲染出来。</p>
<p>首先我们要安装一下模板殷勤express-handlebars：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> express-handlebars
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在跟目录之下建立一个views文件夹，然后再建立一个index.html文件用于渲染。</p>
<p><code v-pre>index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>{{title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/express.png<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    {{#each list}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>昵称:{{this.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>年龄:{{this.age}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>hr</span><span class="token punctuation">></span></span>
    {{/each}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>app.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> exphbs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express-handlebars"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//引入模板</span>
app<span class="token punctuation">.</span><span class="token function">engine</span><span class="token punctuation">(</span><span class="token comment">//设置模板</span>
  <span class="token string">"html"</span><span class="token punctuation">,</span>
  <span class="token function">exphbs</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">layoutsDir</span><span class="token operator">:</span> <span class="token string">"views"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">defaultLayout</span><span class="token operator">:</span> <span class="token string">"layout"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">extname</span><span class="token operator">:</span> <span class="token string">".html"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们修改一下之前的请求根路径的路由，修改成：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token string">"index"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"首页"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"李四"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgkr.cn-bj.ufileos.com/d4e3418b-2d39-45c4-a4a1-a0d890d9fbf2.png" alt=""></p>
<p>以上改好之后重启运行，打开<code v-pre>localhost:3000</code>你就可以看到你的页面渲染出来了。如果你的网站是比较小型的，一般使用这样的轻量级框架就可以完成了，但是模板语法自己也要了解一下。</p>
<h2 id="_03-中间件解析" tabindex="-1"><a class="header-anchor" href="#_03-中间件解析" aria-hidden="true">#</a> 03 中间件解析</h2>
<p>其实中间件很好理解，想象一下有一个长的管道，中间可以加入很多东西，这些东西就是我们所说的中间件。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/edc42400-8017-479b-9d30-0960be15e4ea.png" alt=""></p>
<h3 id="中间件类型" tabindex="-1"><a class="header-anchor" href="#中间件类型" aria-hidden="true">#</a> 中间件类型</h3>
<p>express的中间件可以分成几种：</p>
<ul>
<li>应用级中间件</li>
<li>路由级中间件</li>
<li>错误处理中间件</li>
<li>内置中间件</li>
<li>第三方中间件</li>
</ul>
<p><strong>应用级中间件</strong></p>
<p>我们使用的<code v-pre>app.use('/',(req,res)={})</code>这种就是，直接挂载到app下面的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//这个中间件是所有都执行的，没有挂载到具体的路径</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 控制权下一个中间件</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/about"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"这是关于页"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>路由级中间件</strong></p>
<p>路由级中间件和上面应用级中间件类似，但是它绑定对象不是app而是为express.Router()对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/getValue'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  api<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/setValue'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  api<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>错误处理中间件</strong></p>
<p>错误处理中间件有四个参数,定义错误处理中间件必须使用这四个参数。即使不需要next对象，也必须在参数中声明它，否者中间件会识别为一个常规中间件，不能处理错误。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定制 500 页面</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"text/plain"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"500 - Server Error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>内置中间件</strong></p>
<p>express.static是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/16272cdc-ef92-4bf9-b757-dec27a4744db.png" alt=""></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">dotfiles</span><span class="token operator">:</span> <span class="token string">'ignore'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">etag</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'htm'</span><span class="token punctuation">,</span> <span class="token string">'html'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">maxAge</span><span class="token operator">:</span> <span class="token string">'1d'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token function-variable function">setHeaders</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res<span class="token punctuation">,</span> path<span class="token punctuation">,</span> stat</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'x-timestamp'</span><span class="token punctuation">,</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三方中间件</strong></p>
<p>这个其实有很多，我们使用的body-parser这种就是属于第三方的中间件。这里常用的有：</p>
<ul>
<li>body-parser:用于处理body数据</li>
<li>cookie-session：处理session数据</li>
<li>cookie-parser：用来操作cookie</li>
</ul>
<p>其实我们很多的功能都可以通过第三方的中间件来完成，前端真的不简单，有很多大佬在为了前段的发展尽心尽力，我只会CV。</p>
<h3 id="中间件实现原理" tabindex="-1"><a class="header-anchor" href="#中间件实现原理" aria-hidden="true">#</a> 中间件实现原理</h3>
<p>好了，说了这么多，我们就来分析一些这个中间件是怎么实现的，如何才可以使得管道平稳运行。我们可以发现中间件都是有执行顺序的，前后的执行结果是不一样的。有点类似我们队列的样子。</p>
<p>接下来就参照这种思想来实现一下这中间件的核心代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> funcs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 待执行的函数数组</span>
    <span class="token keyword">var</span> <span class="token function-variable function">app</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">function</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> task <span class="token operator">=</span> funcs<span class="token punctuation">[</span>i<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// 取出函数数组里的下一个函数</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>task<span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// 如果函数不存在,return</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">task</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 否则,执行下一个函数</span>
        <span class="token punctuation">}</span>
        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    app<span class="token punctuation">.</span><span class="token function-variable function">use</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">task</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        funcs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> app<span class="token punctuation">;</span>    <span class="token comment">// 返回实例</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就是核心代码了，精髓都在这里，接下来我们就写一些自己的中间件，来测试一下是否可行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">middlewareA</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中间件1开始...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中间件1结束...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">middlewareB</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中间件2开始...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中间件2结束...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">middlewareC</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中间件3开始...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中间件3结束...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middlewareA<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middlewareB<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middlewareC<span class="token punctuation">)</span><span class="token punctuation">;</span>
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token string">'3000'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'listening 3000....'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行这一段js代码的时候，控制台就出现了中间件的执行过程。它有一种类似于先进后出的“栈结构”。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/ac8a68b1-3640-4e0a-949b-5f72c5ddec51.png" alt=""></p>
<h2 id="_04、小结" tabindex="-1"><a class="header-anchor" href="#_04、小结" aria-hidden="true">#</a> 04、小结</h2>
<p>以上就是本文的所有内容了，主要介绍了Web框架Express的使用方法，以及使用模板引擎进行数据渲染的具体操作。我们还重点了解了Express的中间件实现原理与过程，了解其中的思想。大家也可以去了解一下常见的中间件，试着去使用它们，你会发现开发竟是如此简单。</p>
<p>我们也知道除了Express框架之外还有Koa框架，它也是由Express的原班人员打造出来的，我认为只要是用的舒服就好，没有必要说哪个好哪个不好。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
<p>参考文章：</p>
<ul>
<li><a href="https://www.cnblogs.com/okaychen/p/8057204.html#_label1" target="_blank" rel="noopener noreferrer">Express中间件，看这篇文章就够了(#^.^#)<ExternalLinkIcon/></a></li>
<li><a href="https://item.jd.com/11644104.html" target="_blank" rel="noopener noreferrer">Node与Express开发<ExternalLinkIcon/></a></li>
</ul>
</div></template>
