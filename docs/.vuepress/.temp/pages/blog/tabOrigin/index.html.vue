<template><div><h2 id="如何实现浏览器不同tab页面通信" tabindex="-1"><a class="header-anchor" href="#如何实现浏览器不同tab页面通信" aria-hidden="true">#</a> 如何实现浏览器不同Tab页面通信</h2>
<blockquote>
<p>闻道有先后，术业有专攻</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>我们知道，浏览器打开一个Tab页面就会打开一个进程，同时会开启若干个线程，这就涉及到进程之间通信的问题。一般来说单纯使用HTML5的相关特性是无法完成的，我们需要其他的方法来实现。</p>
<p><img src="@source/blog/tabOrigin/img/2.png" alt=""></p>
<h2 id="_02-通信方法" tabindex="-1"><a class="header-anchor" href="#_02-通信方法" aria-hidden="true">#</a> 02 通信方法</h2>
<p>我们可以分几种情况来讨论这个问题。</p>
<p><strong>1、postMessage</strong></p>
<p>页面A通过window.open方法打开另一个页面B，或者B页面通过iframe的形式嵌入A页面，这种情况比较简单，可以使用HTML5的API来完成通信。我们知道window是一个全局对象，前提是页面A或者页面B可以获取另一个页面的window对象，完成单向通信。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//B页面</span>
window<span class="token punctuation">.</span><span class="token function">addEventListner</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>data<span class="token punctuation">,</span>source<span class="token punctuation">,</span>origin<span class="token punctuation">}</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>
    source<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'message echo'</span><span class="token punctuation">,</span><span class="token string">'/'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>postMessage的第一个参数为消息实体，它是一个结构化对象，即可以通过“JSON.stringify和JSON.parse”函数还原的对象；第二个参数为消息发送范围选择器，设置为“/”意味着只发送消息给同源的页面，设置为“*”则发送全部页面。</p>
<p><img src="@source/blog/tabOrigin/img/1.png" alt=""></p>
<p><strong>2、localStorage</strong></p>
<p>此方法适用于同源范围的通信，因此可以通过共享localStorage的方式进行通信，通过约定localStorage的某一个名，然后共享方式通信。通过window对象侦听storage事件，会侦听localStorage对象的变化事件（包括item的添加、修改和删除）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//A 页面</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"storage"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ev<span class="token punctuation">.</span>key <span class="token operator">==</span> <span class="token string">'message'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// removeItem同样触发storage事件，此时ev.newValue为空</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>ev<span class="token punctuation">.</span>newValue<span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>ev<span class="token punctuation">.</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 发送消息给B页面</span>
<span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'this is message from A'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//B 页面</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"storage"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ev<span class="token punctuation">.</span>key <span class="token operator">==</span> <span class="token string">'message'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// removeItem同样触发storage事件，此时ev.newValue为空</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>ev<span class="token punctuation">.</span>newValue<span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>ev<span class="token punctuation">.</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发送消息给A页面</span>
        <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'message echo from B'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blog/tabOrigin/img/3.png" alt=""></p>
<p><strong>3、BroadcastChannel</strong></p>
<p>这种方法与localStorage的思想一样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// A.html</span>
<span class="token keyword">const</span> channel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BroadcastChannel</span><span class="token punctuation">(</span><span class="token string">'tabs'</span><span class="token punctuation">)</span>
channel<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// evt.data</span>
<span class="token punctuation">}</span>

<span class="token comment">// B.html</span>
<span class="token keyword">const</span> channel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BroadcastChannel</span><span class="token punctuation">(</span><span class="token string">'tabs'</span><span class="token punctuation">)</span>
channel<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4、WebSocket</strong></p>
<p>WebSocket可以实现全双工通信，自然可以实现多个标签页之间的通信的问题。</p>
<p>WebSocket连接必须由浏览器发起，特点：</p>
<p>（1）建立在 TCP 协议之上，服务器端的实现比较容易。</p>
<p>（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。</p>
<p>（3）数据格式比较轻量，性能开销小，通信高效。</p>
<p>（4）可以发送文本，也可以发送二进制数据。</p>
<p>（5）没有同源限制，客户端可以与任意服务器通信。</p>
<p>（6）协议标识符是<code v-pre>ws</code>（如果加密，则为<code v-pre>wss</code>），服务器网址就是 URL。</p>
<p><strong>5、cookie+setInterval</strong></p>
<p>在页面A设置一个使用 setInterval 定时器不断刷新，检查 Cookies 的值是否发生变化，如果变化就进行刷新的操作。</p>
<p>由于 Cookies 是在同域可读的，所以在页面 B 审核的时候改变 Cookies 的值，页面 A 自然是可以拿到的。这样做确实可以实现我想要的功能，但是这样的方法相当浪费资源。虽然在这个性能过盛的时代，浪费不浪费也感觉不出来，但是这种实现方案，确实不够优雅。</p>
<p><strong>6、sharedWorker</strong></p>
<p>SharedWorker本身并不是为了解决通讯需求的，它的设计初衷应该是类似总控，将一些通用逻辑放在SharedWorker中处理，不过因为也能实现通讯。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// A.html</span>
<span class="token keyword">var</span> sharedworker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedWorker</span><span class="token punctuation">(</span><span class="token string">'worker.js'</span><span class="token punctuation">)</span>
sharedworker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
sharedworker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// evt.data</span>
<span class="token punctuation">}</span>

<span class="token comment">// B.html</span>
<span class="token keyword">var</span> sharedworker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedWorker</span><span class="token punctuation">(</span><span class="token string">'worker.js'</span><span class="token punctuation">)</span>
sharedworker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
sharedworker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">)</span>

<span class="token comment">// worker.js</span>
<span class="token keyword">const</span> ports <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token function-variable function">onconnect</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> port <span class="token operator">=</span> e<span class="token punctuation">.</span>ports<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  ports<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span>
  port<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    ports<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token operator">!==</span> port<span class="token punctuation">)</span> <span class="token comment">// 此处为了贴近其他方案的实现，剔除自己</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">p</span> <span class="token operator">=></span> p<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>evt<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>其实页面之间的通信用的不是很多，但是在技术发展的同时我们都要关注一下，特别是为什么能够进行通信，每一个Tab背后都是由什么组成的，这些了解清楚最好。还有关于进程和线程的区别，知道这些才会更好的理解。</p>
<p><strong><font color="green">参考文章</font></strong>：</p>
<ul>
<li>Communication between tabs or windows</li>
<li>跨浏览器tab页面的通信解决方案尝试</li>
<li>浏览器多个标签页之间的通信</li>
<li>跨页面通信的各种姿势</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
