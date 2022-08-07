<template><div><h2 id="web前端安全知多少" tabindex="-1"><a class="header-anchor" href="#web前端安全知多少" aria-hidden="true">#</a> Web前端安全知多少</h2>
<blockquote>
<p><strong>“</strong>  绳锯木断，水滴石穿**”**</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>近年来前端的功能再也不是简单的页面开发这么简单，前端难免会和浏览器打交道，大多数人们都会通过浏览器进行网上的业务办理，信息查找等。但是这意味着我们会泄露自身的隐私，如手机号、身份证号等。</p>
<p>早期没有任何防护措施的浏览器发生了很多诈骗事件，随着浏览器的不断更新换代，安全系数也越来越高，接下来我将通过几种常见的前端安全策略，阐述一下我们的隐私如何被保障。</p>
<h2 id="_02-前端安全分类" tabindex="-1"><a class="header-anchor" href="#_02-前端安全分类" aria-hidden="true">#</a> 02 前端安全分类</h2>
<p>前端主要通过浏览器进行交互操作，涉及到浏览器安全的主要有以下5种。</p>
<ul>
<li>浏览器安全</li>
<li>跨站脚本攻击(XSS)</li>
<li>跨站请求伪造(CSRF)</li>
<li>点击劫持(ClickJacking)</li>
</ul>
<h5 id="浏览器安全" tabindex="-1"><a class="header-anchor" href="#浏览器安全" aria-hidden="true">#</a> <strong>浏览器安全</strong></h5>
<p>浏览器拥有同源策略，它可以说是浏览器的核心功能，如果没有同源策略的保护，浏览器的正常功能将受到很大的影响。那么什么是同源策略呢？</p>
<p><strong>浏览器的同源策略，限制来自不同源的脚本对当前域的调用和访问。</strong></p>
<p>听起来很抽象，举个例子，小明正在浏览 a.com，如果没有同源策略，那么a.com的网站可能会执行来自b.com的一段脚本数据，从而纂改a.com的内容，造成混乱。所以为了不让a.com调用其它页面的脚本或者数据，限制在同一个源内。那么如何才是同一个源呢？</p>
<p><img src="@source/blog/webSecurity/img/4.png" alt=" "></p>
<p>想要满足同源策略，必须满足以下3个条件，才会被视为同源。</p>
<ul>
<li>协议相同</li>
<li>域名相同</li>
<li>端口相同</li>
</ul>
<p>以上条件缺一不可，首先是协议方面，网站有http协议和https协议之分，https比http更安全，原因是https通过（SSL/TSL）来加密数据，防止数据被窃听和修改。SSL是安全套接层，TSL是传输层安全协议。</p>
<p>然后是域名相同，如 www .a.com , www .b.com就是不同的域名，域名不一样也是不满足策略。最后是端口相同，www .a.com:3000 , www .b.com:5000就是端口不同，也不满足条件。</p>
<p><img src="@source/blog/webSecurity/img/1.png" alt=" "></p>
<h5 id="跨站脚本攻击-xss" tabindex="-1"><a class="header-anchor" href="#跨站脚本攻击-xss" aria-hidden="true">#</a> <strong>跨站脚本攻击(XSS)</strong></h5>
<p>XSS攻击，通常是通过“HTML”注入修改网页，当浏览器执行恶意脚本时可能会被他人控制。XSS攻击危害极大，如果网页开发者不注意防范XSS攻击，可能会对用户产生危害。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token operator">&lt;</span>script<span class="token operator">></span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"XSS攻击！"</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/blog/webSecurity/img/2.png" alt=" "></p>
<p>XSS攻击可以分为两种：</p>
<ul>
<li>持久型</li>
<li>非持久型</li>
</ul>
<p>①持久型：代码被写进数据库，比如在评论界面的输入框注入恶意代码，那么每一个用户访问帖子的时候都会执行恶意代码。这种类型的攻击影响最大，特别是对于那种日访问量以千万计算的网站。</p>
<p>②非持久型：一般是通过修改URL的参数方式加入攻击代码，利用某种方式诱导用户进行点击，从而实施攻击。比如以下的代码不加过滤处理就会发生攻击。谷歌浏览器是可以防御此类攻击的。</p>
<div class="language-php+HTML ext-php+HTML line-numbers-mode"><pre v-pre class="language-php+HTML"><code>&lt;!-- http://www.domain.com?name=&lt;script&gt;alert(1)&lt;/script&gt; --&gt;
&lt;div&gt;{{name}}&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blog/webSecurity/img/5.png" alt=" "></p>
<p>那么既然危害如此之大，该如何防御呢？主要有以下方法：</p>
<ul>
<li>转义字符</li>
<li>CSP</li>
<li>HtppOnly</li>
</ul>
<p>①转义字符：因为一般恶意代码都会是脚本语言，由<script></script>包含，所以我们的思想就是把&lt;，&gt;等转义就可以高效防御。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">escape</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&amp;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;amp;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;lt;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;gt;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">"</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;quto;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">'</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;#39;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">`</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;#96;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\/</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;#x2F;'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> str
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是对于富文本那样的编辑器，通过过滤转义等方式可能加大任务量，所以另外一种就是通过CSP的方式，也就是建立白名单的方式进行防御。</p>
<p>②CSP：建立白名单，明确告诉浏览器哪些外部资源可以被加载并执行。通过前端配置规则，浏览器则会自动拦截。</p>
<ul>
<li>通过设置HTTP Header中的 Content-Security-Policy</li>
<li>设置meta标签的方式 <meta http-equiv="Content-Security-Policy"></li>
</ul>
<p>比如：</p>
<ul>
<li>只允许加载本站资源</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Content<span class="token operator">-</span>Security<span class="token operator">-</span>Policy<span class="token operator">:</span> <span class="token keyword">default</span><span class="token operator">-</span>src <span class="token string">'self'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>只允许加载https协议的照片</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Content<span class="token operator">-</span>Security<span class="token operator">-</span>Policy<span class="token operator">:</span> img<span class="token operator">-</span>src https<span class="token operator">:</span><span class="token operator">/</span><span class="token comment">/*
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>允许加载任何来源框架</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Content<span class="token operator">-</span>Security<span class="token operator">-</span>Policy<span class="token operator">:</span> child<span class="token operator">-</span>src <span class="token string">'none'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只有当前端配置好之后，剩下的就交给浏览器处理。</p>
<p>③HttpOnly：浏览器将禁止页面的JavaScript访问带有HttpOnly属性的Cookie。实际上HttpOnly并非是为了防御XSS攻击，而是XSS攻击之后的Cookie劫持。</p>
<p>首先解释一下Cookie的产生过程：</p>
<ol>
<li>浏览器向服务器发送请求，这时还没有Cookie</li>
<li>服务器返回时带有 Set-Cookie 头，向浏览器写入Cookie</li>
<li>Cookie会有一个过期时间，在到期之前，浏览器访问该域名下的页面都会带上Cookie</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">"Set-Cookie: name=zhangsan"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">header</span><span class="token punctuation">(</span><span class="token string">"Set-Cookie: age=12; HttpOnly"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="csrf攻击" tabindex="-1"><a class="header-anchor" href="#csrf攻击" aria-hidden="true">#</a> <strong>CSRF</strong>攻击</h5>
<p>CSRF 中文名为跨站请求伪造。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。</p>
<p>我们来看一下典型的CSRF攻击（假设）：</p>
<ol>
<li>A用户登陆某银行账号，本地留有登陆信息cookie</li>
<li>A突然收到黑客B发来的诱导链接，A在登陆状态下打开链接</li>
</ol>
<p>其实这就产生攻击。</p>
<p>我们在这里假设A，B都有银行账户，链接就是一个转账申请（按照银行的转账申请格式手动构造请求），然后提交申请后银行服务器误以为是A在操作，所以转账就会成功，此时就产生了攻击。</p>
<p><img src="@source/blog/webSecurity/img/1.jpg" alt=" "></p>
<p>那么如何预防CSRF攻击呢？</p>
<p>我们知道一般这个攻击都是第三方网站发起的，被攻击的网站无法阻止攻击的发生。所以我们只能增强自己的网站来提升安全性。</p>
<p>通常我们根据CSRF的攻击的特点来进行防御：</p>
<ul>
<li>同源检测</li>
<li>Samesite Cookie</li>
<li>CSRF Token</li>
<li>双重cookie验证</li>
</ul>
<p>①同源策略：在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：</p>
<ul>
<li>Origin Header</li>
<li>Referer Header</li>
</ul>
<p>这两个Header在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。服务器可以通过解析这两个Header中的域名，确定请求的来源域。若不是来自同一个域的HTTP请求则不会生效。</p>
<p>②Samesite Cookie：HTTP响应头中有Set-Cookie属性，属性有两个值，Strict 和 Lax。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Set<span class="token operator">-</span>Cookie<span class="token operator">:</span> foo<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> Samesite<span class="token operator">=</span>Strict
Set<span class="token operator">-</span>Cookie<span class="token operator">:</span> bar<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span> Samesite<span class="token operator">=</span>Lax
Set<span class="token operator">-</span>Cookie<span class="token operator">:</span> baz<span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当设置为Strict的时候，伪造的请求是不会带上本地的cookie进行请求，所以这时候CSRF攻击不会生效。当设置为Lax的时候，在同源内发送请求是可以带上的。</p>
<p>③CSRF Token：用户打开页面的时候服务器下发一个Token，值为通过加密算法进行加密。每次请求都要加上这个Token值，服务端验证是否有效，无效则拒绝。</p>
<p>④双重Cookie验证：用户在发送请求的时候生成一个Cookie值，内容为随机字符串，前端向后端发送请求时取出Cookie值与服务端进行比较，若一致则有效，不一致则拒绝。</p>
<h5 id="点击劫持" tabindex="-1"><a class="header-anchor" href="#点击劫持" aria-hidden="true">#</a> <strong>点击劫持</strong></h5>
<p>点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。</p>
<p><img src="@source/blog/webSecurity/img/3.png" alt=" "></p>
<p>防御方法：</p>
<ul>
<li>X-FRAME-OPTIONS</li>
<li>JS防御</li>
</ul>
<p>①X-FRAME-OPTIONS：X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。该响应头有三个属性可选：</p>
<ul>
<li>DENY，表示页面不允许通过 iframe 的方式展示</li>
<li>SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示</li>
<li>ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示</li>
</ul>
<p>②JS防御：对于某些远古浏览器来说，并不能支持上面的这种方式，那我们只有通过 JS 的方式来防御点击劫持了。</p>
<div class="language-php+HTML ext-php+HTML line-numbers-mode"><pre v-pre class="language-php+HTML"><code>//作用就是当通过 iframe 的方式加载页面时，
//攻击者的网页直接不显示所有内容了
&lt;head&gt;
  &lt;style id=&quot;click-jack&quot;&gt;
    html {
      display: none !important;
    }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script&gt;
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
&lt;/script&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>前端安全已经成为了面试必问的知识点，前端的发展离不开浏览器的更新换代，互联网人数的激增始终会有一些不法分子利用安全漏洞进行网络诈骗，我们作为离用户最近的开发人员，有义务去保护我们的用户的隐私安全，给用户一个良好的体验和信任。</p>
<p><img src="@source/blog/common/2.gif" alt=" "></p>
</div></template>
