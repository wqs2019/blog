<template><div><h1 id="关于get-post本质区别-面试官想听什么" tabindex="-1"><a class="header-anchor" href="#关于get-post本质区别-面试官想听什么" aria-hidden="true">#</a> 关于GET/POST本质区别，面试官想听什么</h1>
<blockquote>
<p>书犹药也，善读之可以医愚</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>我们常说要注重基础知识，并不是要你把简单的用法记忆下来，而是要从基础上理解。所谓基础就是根基，诞生的地方，才是基础。比如说一些很简单的问题，我们可能会回答不好，那是因为你没有从基础原理上解释它，而是从基础用法上解释了。</p>
<p>我们都知道万变不离其宗，万千世界都是由最初的演变而来的，万物皆有联系。所以我们学习知识一定要从它的原理上面入手，对它的印象才会深刻理解。</p>
<p><img src="@source/blog/getandpost/img/1.png" alt=""></p>
<h2 id="_02-原理与使用" tabindex="-1"><a class="header-anchor" href="#_02-原理与使用" aria-hidden="true">#</a> 02 原理与使用</h2>
<p>原理和使用其实是两个截然不同的地方，所谓学习就是学习原理，使用次之。由于现在前端的业务可能会变得更加复杂，我们需要利用一些现成的框架或者组件库来开发我们的产品，难免就只关注了使用而忽略了原理。现成的轮子并不会满足日常开发的所有需要，我们有可能在原基础上再进行封装，要是不懂原理我们就很难进行二次开发。</p>
<p><strong><font color="red">原理</font></strong>：就是我们利用原生的技术来实现的组件，框架。实现和封装了一些便于操作的事件与方法，让我们的业务更加轻松。</p>
<p><strong><font color="red">使用</font></strong>：对开源的框架或者组件进行项目的嵌入，能够快速高效地开发出符合产品需求的程序，并且耦合程度低，使用方便。直接使用已经封装好的事件与方法即可。</p>
<h2 id="_03-get-post" tabindex="-1"><a class="header-anchor" href="#_03-get-post" aria-hidden="true">#</a> 03 GET/POST</h2>
<p>这是一道很简单的面试题，也可以说在面试中非常高频。但是很多时候同学们回答的所谓正确答案往往是比较表面的。网上查找一下，我们发现别人总结的主要有以下几种：</p>
<ul>
<li>GET请求在URL中传送的参数是有长度限制的，而POST没有。</li>
<li>对参数的数据类型，GET只接受ASCII字符，而POST没有限制。</li>
<li>GET比POST更不安全，因为参数直接暴露在URL上，不能用来传递敏感信息。</li>
<li>GET参数通过URL传递，POST放在Request body中。</li>
</ul>
<p><img src="@source/blog/getandpost/img/2.png" alt=""></p>
<p>我们知道，GET\POST是http协议中的两种方法，方法与数据其实是没有必然联系的，只是用法的约定而已。也就是说，你也可以使用GET方法，把数据放在body里面也是可以的。</p>
<blockquote>
<p>Both HTTP GET and HTTP POST can be used to execute search with body. Since not all clients support GET with body, POST is allowed as well.</p>
<p>https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html</p>
</blockquote>
<p>这是Elasticsearch的说明，当使用时GET时请求时是可以把数据放在body里面的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">GET</span> <span class="token operator">/</span>twitter<span class="token operator">/</span>_search
<span class="token punctuation">{</span>
    <span class="token string-property property">"query"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"term"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"user"</span> <span class="token operator">:</span> <span class="token string">"kimchy"</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么真正的区别是什么呢？</p>
<p>GET/POST的最大区别是GET请求有幂等性，但是POST请求没有。什么是幂等性呢？我们知道使用GET方法请求同样的接口，返回来的数据是不会改变的，但是对于POST请求，实现一些增删改查的操作的时候可能会发生重复提交的问题。</p>
<p>也就是说我们如果使用GET请求做增删改查的时候，遇到网络不好可能会多次操作，造成数据库的混乱，这是一个很严重的问题，但是使用POST就不会有这种情况。</p>
<p>当我们在面试中的时候我们要从原理和使用上面两个方面来进行回答。先回答使用上有哪些区别，说几种就好，但是重要的是把本质的说出来，那样就加分不少。把简单的问题回答到有深度的就不简单。</p>
<p>关于网上《99%的人都理解错了 HTTP 中 GET 与 POST 的区别》这篇文章说的“GET产生一个TCP数据包；POST产生两个TCP数据包”，其实也不是完全正确，因为数据包产生多少个完全是由浏览器等第三方工具的具体做法，与协议方法没有任何联系。</p>
<p>当用户是以POST方法来进行数据的发送的时候，可能浏览器等服务器返回100状态码之后才会进行数据的发送，相当于第一个数据包是询问服务器是否接受数据，如果不接受就不会进行发送。</p>
<blockquote>
<p>The purpose of the 100 (Continue) status (see section 10.1.1) is to allow a client that is sending a request message with a request body to determine if the origin server is willing to accept the request (based on the request headers) before the client sends the request body.</p>
<p>https://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8.2.3</p>
</blockquote>
<h2 id="_04-小结" tabindex="-1"><a class="header-anchor" href="#_04-小结" aria-hidden="true">#</a> 04 小结</h2>
<p>无论是做什么，个人的感觉就是一定要重视基础和原理，这是最简单但也是最重要的一部分。每一个知识点背后都会藏着巨大的知识，我们就做那个挖掘知识的人。作为应届生和校招生，面试过很多公司，要求并不高，但是你不一定答得出来。这就是把简单的问题回答得不简单。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
