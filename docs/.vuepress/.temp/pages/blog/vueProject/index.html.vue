<template><div><h1 id="教你十分钟开发后台管理系统" tabindex="-1"><a class="header-anchor" href="#教你十分钟开发后台管理系统" aria-hidden="true">#</a> 教你十分钟开发后台管理系统</h1>
<blockquote>
<p>本文叫你如何轻松配置系统设计的功能架构，让开发不再困难，剩下的你就可以cv操作了。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>如无意外，大家最近也应该也是在家里学（闲）习（鱼）吧，不过我还是建议一下大家，新的风暴已经出现，怎么能够停滞不前... 似乎想起了什么。不论如何现在是大四狗最忙碌的时候了，而且大家也应该利用这段时间好好巩固自己的知识点，争取在一两个月内做出一个比较像样的项目，好给自己的大学一个交代。</p>
<p>不管怎么说，一个好的项目是可以写在自己的简历上面的，一不小心可能你就凭着这个项目拿到满意的offer。所以本文就给那些还在困惑的孩子们一个导向，希望你们也可以做出一个属于自己的项目。我深知大家的难处，因为我之前也是苦于这种设计系统的问题，找了多方资料也不怎么理想，所以我觉得分享是对我们程序员最好的回报。</p>
<p>最近我也是在弄相关的事情，奈何导师又给你一个新的需求。还能怎么办，做呗。这一次我就新增了一个后台管理系统，方便管理人员的操作，折腾了一晚上加一早上，尝试了几种方案都不太满意，现在我就把自己遇到的坑和问题都说出来，为大家填坑。我使用开源的项目vue+element-ui+mysql+node+express的组合。</p>
<p><img src="@source/blog/vueProject/img/4.png" alt=""></p>
<h2 id="_02-开源管理系统" tabindex="-1"><a class="header-anchor" href="#_02-开源管理系统" aria-hidden="true">#</a> 02 开源管理系统</h2>
<p>大家应该对现在的前端框架vue比较熟悉了，基本上如果你是从事前端行业的话是必学的框架之一。推荐这个框架是因为上手比较简单，对新手比较友好，而且生态完善，每天都有无数的程序员为你排忧解难，这就是生态好的好处。好了废话不多说，接下来就是推荐两个比较好的开源项目。</p>
<ul>
<li><a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/" target="_blank" rel="noopener noreferrer">vue-element-admin<ExternalLinkIcon/></a></li>
</ul>
<p>这是一个比较大型的后台管理系统，包含了很多的东西与功能，如果你是一个新手的话可能hold不住，毕竟他的项目是比较完善的，但好在也有完善的文档。大家自己可以自由查看，当然你也可以好好研究里面的架构层次是怎么设计的。一般来说你要学习某一项新的技术，查看别人现成的项目是很有帮助的。毕竟人家可是掉了一地的头发才开发出这么一个伟大的系统，造福大家年轻的程序员。</p>
<p><img src="@source/blog/vueProject/img/2.png" alt=""></p>
<ul>
<li><a href="https://preview.pro.ant.design/dashboard/analysis" target="_blank" rel="noopener noreferrer">Ant Design Pro<ExternalLinkIcon/></a></li>
</ul>
<p>这是一个由蚂蚁金服出品的后台管理系统，也是非常不错的模板项目，可以做到开箱即用，界面美观，文档详细，居家旅行都可以一看。跟前面的一样，这也是一个庞大的框架，因为也有很多集成的功能，但是大家也可以看一下里面的架构是怎么设计的，相信你会有一个很不错的收获。</p>
<p><img src="@source/blog/vueProject/img/3.png" alt=""></p>
<p>不过大家千万不要直接拿来当毕业设计哦，但是说一个比较实在的话，很多高校的讲师并不会关注互联网的发展，也有一些还是教你用jQuery的，想想都觉得可怕。上面提到的模板有老师不知道也是正常。所以同学们一定要关注互联网的发展，特别是前端，隔三差五更新一个新的技术出来也是正常的。</p>
<p>我相信很多高校也该没有教你这些东西和技术，也没有推荐你看一下那个开源项目很不错，基本上都是c语言、c++、java、jsp等编程语言的入门级学习，好了不扯这个了。</p>
<p>比较好的我就觉得是这两个了，有一些是结合bootstrap的，大家也可以看一下。不过现在主流的都是使用element-ui和ant-design组件库，所以我们也顺应潮流。</p>
<h2 id="_03-从零开始" tabindex="-1"><a class="header-anchor" href="#_03-从零开始" aria-hidden="true">#</a> 03 从零开始</h2>
<p>说是从零开始，但是你也必须要有js基础，有命令行的基础，你知道什么是node和npm这些东西。你可以去官网上面先安装vue，使用他们的脚手架<a href="https://cli.vuejs.org/zh/guide/installation.html" target="_blank" rel="noopener noreferrer">vue-cli<ExternalLinkIcon/></a>搭建一个项目。这个过程比较简单，你只需要几个常用的命令就可以实现了。不过这次我使用了github上面的一个开源项目，因为省去了自己配置的步骤（是因为懒）。<a href="https://github.com/luichooy/vue-admin" target="_blank" rel="noopener noreferrer">查看地址<ExternalLinkIcon/></a></p>
<p>接下来讲的就是如何自己写接口，连接mysql数据库以及通过前端的调用返回数据，这里就不是假数据了，而是真实存在的数据。</p>
<p>在开始之前，你需要把项目clone下来，执行npm i 安装一下本身的依赖。</p>
<p>假如你的网不是很好，你可以切换到淘宝的镜像源地址，只需在命令后面加上--registry= https: //registry.npm.taobao.org即可。国内的相对来说比较快，也不容易出错，假如你不加的话可能会安装失败。示例如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>registry<span class="token operator">=</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>registry<span class="token punctuation">.</span>npm<span class="token punctuation">.</span>taobao<span class="token punctuation">.</span>org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后你还要安装一下以下依赖：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> element-ui --save  （回车，这是组件库）
<span class="token function">npm</span> <span class="token function">install</span> axios --save  （回车，这是请求发送的方法）
<span class="token function">npm</span> <span class="token function">install</span> mysql --save  （回车，数据库连接）
<span class="token function">npm</span> <span class="token function">install</span> express --save  （回车，便于获取数据）
<span class="token function">npm</span> <span class="token function">install</span> body-parser --save  （回车，解析响应体）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以在main.js下面把axios添加到vue的原型上面，方便调用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span><span class="token punctuation">;</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$axios <span class="token operator">=</span> axios <span class="token comment">//全局注册，使用方法为:this.$axios</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blog/vueProject/img/7.png" alt=""></p>
<h2 id="_04-数据库" tabindex="-1"><a class="header-anchor" href="#_04-数据库" aria-hidden="true">#</a> 04 数据库</h2>
<p>数据库我们选用的是关系型数据库mysql，可视化工具是navicat。</p>
<p>首先大家可以看一下刚创建好的项目，我们可以在src目录下面创建一个文件夹server，这个文件夹用于存放数据库配置和数据库连接相关的代码。</p>
<p>文件夹里面创建几个文件，分别用于存放配置，连接等相关内容。为什么要分这么多个呢？原因就是我们之前提到的解耦问题，把耦合性降到最低。方便以后修改和更新接口等操作，不然如果你全都写在一个文件里面就会很繁琐。</p>
<ul>
<li>api.js 用于配置一些接口，就是你以后调用的接口返回相应的数据库数据</li>
<li>sqlMap.js 用于编写一些sql语句，就是上面的接口的实际实现过程</li>
<li>router.js 接口路由相关</li>
<li>index.js 这里就是总的导出文件，就是简单的http服务</li>
</ul>
<p>接下来实现每一个文件的编写</p>
<h5 id="api-js" tabindex="-1"><a class="header-anchor" href="#api-js" aria-hidden="true">#</a> <strong>api.js</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mysql <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mysql'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> sqlMap <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./sqlMap'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//创建链接对象</span>
<span class="token keyword">const</span> pool <span class="token operator">=</span> mysql<span class="token punctuation">.</span><span class="token function">createPool</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">'47.98.151.134'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3306</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">'Wqs2019..'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">'design'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">multipleStatements</span><span class="token operator">:</span> <span class="token boolean">true</span>    <span class="token comment">// 多语句查询</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      pool<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> connection</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> sql <span class="token operator">=</span> sqlMap<span class="token punctuation">.</span>getValue<span class="token punctuation">;</span>
        connection<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            connection<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="sqlmap-js" tabindex="-1"><a class="header-anchor" href="#sqlmap-js" aria-hidden="true">#</a> <strong>sqlMap.js</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sqlMap <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">getValue</span><span class="token operator">:</span> <span class="token string">'SELECT * FROM test;'</span>
<span class="token punctuation">}</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> sqlMap<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="router-js" tabindex="-1"><a class="header-anchor" href="#router-js" aria-hidden="true">#</a> <strong>router.js</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> express<span class="token punctuation">.</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> api <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./api'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/getValue'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  api<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="index-js" tabindex="-1"><a class="header-anchor" href="#index-js" aria-hidden="true">#</a> <strong>index.js</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> routerApi <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./router'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bodyParser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'body-parser'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// post 数据是需要</span>
<span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>bodyParser<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 后端api路由</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/api'</span><span class="token punctuation">,</span> routerApi<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 监听端口</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success listen at port:3000......'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码完善之后你就可以在server的目录下面执行，node index.js开启服务，它会监听3000端口的内容。</p>
<p><img src="@source/blog/vueProject/img/5.png" alt=""></p>
<h2 id="_05-前端文件" tabindex="-1"><a class="header-anchor" href="#_05-前端文件" aria-hidden="true">#</a> 05 前端文件</h2>
<p>接下来我们就随便找一个文件测试一下，我们可以选择刚刚创建好的helloworld.vue文件测试一下，写一个点击事件，然后在methods里面实现请求。</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>home<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>go<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>$axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/getValue'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'res'</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如无意外，当你运行vue项目的时候，这是会报错的。</p>
<p>因为我们刚刚说到你的服务器是监听3000端口，但是你的vue项目是监听8080端口，是不通的。所以我们想一下在项目的config目录下面的index.js文件，里面是可以设置跨域相关的配置，我们只需要把dev下面的proxyTable写成：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">dev</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dev.env'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PORT</span> <span class="token operator">||</span> <span class="token number">8080</span><span class="token punctuation">,</span>
    <span class="token literal-property property">autoOpenBrowser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">assetsSubDirectory</span><span class="token operator">:</span> <span class="token string">'static'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">assetsPublicPath</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">proxyTable</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://localhost:3000/api'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">'^/api'</span><span class="token operator">:</span> <span class="token string">''</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的意思就是把任何以api开头的请求都定向到target这个地址下面。所以配置完成之后重新编译一下，应该就没有问题了，能够正确返回数据。我点击首页的时候就会发送请求并顺利返回数据。</p>
<p><img src="@source/blog/vueProject/img/3.gif" alt=""></p>
<p>另外注意的是：</p>
<p>假如你想要请求本地的json数据数据，我发现一定要放在static的目录下才可以，不然是无法获取的。不过我们一般也要或者线上的数据，或者连接你本地的数据库。</p>
<p><img src="@source/blog/vueProject/img/8.png" alt=""></p>
<h2 id="_06-小结" tabindex="-1"><a class="header-anchor" href="#_06-小结" aria-hidden="true">#</a> 06 小结</h2>
<p>不得不说，代码是要经常打的，不然时间久了你就会忘记很多事情，也忘记很多配置啥的。一开始我遇到的坑就是直接调用mysql的时候，发现Net.createConnection is not a function的问题，困扰许久，后来才知道不是mysql的锅而是在于node本身。你需要起服务才可以访问数据相关的内容。</p>
<p>在此也推荐大家去看一下node相关的技术，以及express和koa2等，可以方便地搭建后台以及编写接口，这些都是web框架，详情大家也可以去官网看一下，也有很多入门级别的教程，值得一学。毕竟现在node已经走进了大家的视野，就像之前那句话说的，是业务成就了人，驱动了你的成长。</p>
<p>好了，本文就说到这里，文章同步发送到微信公众号《前端小时》，欢迎大家关注，觉得不错可以点赞收藏转发。大家加油！</p>
<p>参考文章</p>
<ul>
<li>segmentfault  vue+node+mysql搭建个人博客（一） https://segmentfault.com/a/1190000012186439#item-1</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
