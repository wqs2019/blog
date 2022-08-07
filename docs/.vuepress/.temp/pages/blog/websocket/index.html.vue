<template><div><h1 id="websocket-协议系统解析" tabindex="-1"><a class="header-anchor" href="#websocket-协议系统解析" aria-hidden="true">#</a> WebSocket 协议系统解析</h1>
<blockquote>
<p>读书之法, 在循序而渐进, 熟读而精思</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>早期的网站使用的是轮询技术，用来实现定时请求资源，由客户端发送HTTP请求。但是这种请求可能存在很长的http请求头，真正的数据可能很少，这就造成了带宽的消耗。现在比较新的技术是Comet，可以实现全双工通信，但也需要反复发出请求，而且HTTP长连接在Comet中是普遍使用的，也会消耗服务器资源。</p>
<p>所以为了解决上面的情况，HTML5定义了WebSocket协议，能够更好地节约服务器资源和带宽，并且能够实现实时通讯。</p>
<p><img src="@source/blog/websocket/img/1.png" alt=" "></p>
<h2 id="_02-websocket" tabindex="-1"><a class="header-anchor" href="#_02-websocket" aria-hidden="true">#</a> 02 webSocket</h2>
<p>WebSocket与HTTP和HTTPS使用的是相同的TCP端口，由于这个的原因，可以绕过大多数的防火墙限制。默认是使用80端口，但是在TLS协议的时候会使用443端口。具体实现上是通过http协议建立通道，然后在此基础上用真正的WebSocket协议进行通信，所以WebSocket协议和http协议是有一定的交叉关系的。</p>
<p><img src="@source/blog/websocket/img/2.png" alt=" "></p>
<p>该协议最大的特点是实现了服务端推送，以往获取资源只能由客户端发起，现在服务端可以主动发起了。实现了真正的全双工通信。它有以下的优点：</p>
<ul>
<li>较少的控制开销</li>
<li>更强的实时性</li>
<li>能够保持长连接</li>
<li>更好的二进制支持</li>
<li>可以支持扩展</li>
<li>能够压缩数据提高效率</li>
<li>没有同源限制</li>
</ul>
<h2 id="_03-通信原理" tabindex="-1"><a class="header-anchor" href="#_03-通信原理" aria-hidden="true">#</a> 03 通信原理</h2>
<p>当客户端与服务端建立WebSocket连接，在客户端与服务端的握手过程中，客户端会先发送一个HTTP请求，包含一个Upgrade请求头来告诉服务端要升级为WebSocket协议。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">'ws://localhost:9000'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//建立连接</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>发送请求头：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">Host</span><span class="token operator">:</span> localhost<span class="token operator">:</span><span class="token number">9000</span>
<span class="token literal-property property">Origin</span><span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9000</span>
<span class="token literal-property property">Pragma</span><span class="token operator">:</span> no<span class="token operator">-</span>cache
Sec<span class="token operator">-</span>WebSocket<span class="token operator">-</span>Extensions<span class="token operator">:</span> permessage<span class="token operator">-</span>deflate<span class="token punctuation">;</span> client_max_window_bits
Sec<span class="token operator">-</span>WebSocket<span class="token operator">-</span>Key<span class="token operator">:</span> 5fTJ1LTuh3RKjSJxydyifQ<span class="token operator">==</span> <span class="token comment">// 与响应头 Sec-WebSocket-Accept 相对应</span>
Sec<span class="token operator">-</span>WebSocket<span class="token operator">-</span>Version<span class="token operator">:</span> <span class="token number">13</span>    <span class="token comment">// 表示 websocket 协议的版本</span>
<span class="token literal-property property">Upgrade</span><span class="token operator">:</span> websocket    <span class="token comment">// 表示要升级到 websocket 协议</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应头：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">Connection</span><span class="token operator">:</span> Upgrade
Sec<span class="token operator">-</span>WebSocket<span class="token operator">-</span>Accept<span class="token operator">:</span> ZUip34t<span class="token operator">+</span>bCjhkvxxwhmdEOyx9hE<span class="token operator">=</span>
<span class="token literal-property property">Upgrade</span><span class="token operator">:</span> websocket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时如果正常，服务器就会返回101状态码并切换为WebSocket协议建立全双工连接，后续信息将会通过这个协议进行传输。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">GUID</span> <span class="token operator">=</span> <span class="token string">"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"</span><span class="token punctuation">;</span> <span class="token comment">//  一个固定的字符串</span>
accept <span class="token operator">=</span> <span class="token function">base64</span><span class="token punctuation">(</span><span class="token function">sha1</span><span class="token punctuation">(</span>key <span class="token operator">+</span> <span class="token constant">GUID</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
<span class="token comment">// key 就是 Sec-WebSocket-Key 值，</span>
<span class="token comment">//accept 就是 Sec-WebSocket-Accept 值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sec-WebSocket-Key：客户端随机生成的一个base64编码</p>
<p>Sec-WebSocket-Accept：服务端经过算法处理后回传给客户端</p>
<p>Connection和Upgrade字段告诉服务器，客户端发起的是WebSocket协议请求</p>
<p>最后一步客户端拿到服务端的值之后使用相同算法进行解码之后，跟服务端的进行对比，如果一致则成功连接。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">connectWebsocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">'ws://localhost:9000'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 监听连接成功</span>
    ws<span class="token punctuation">.</span><span class="token function-variable function">onopen</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'连接服务端WebSocket成功'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// send 方法给服务端发送消息</span>
        ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>msgData<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听服务端消息(接收消息)</span>
    ws<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'收到的消息：'</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span>
        elUl<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;li class="b">小秋：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>message<span class="token punctuation">.</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/li></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听连接失败</span>
    ws<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'连接失败，正在重连...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">connectWebsocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听连接关闭</span>
    ws<span class="token punctuation">.</span><span class="token function-variable function">onclose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'连接关闭'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">connectWebsocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_04-心跳包" tabindex="-1"><a class="header-anchor" href="#_04-心跳包" aria-hidden="true">#</a> 04 心跳包</h2>
<p>当连接后长时间不进行通信就可能会出现连接不稳定的情况，那么就会影响数据的传输，比如在聊天室的信息可能出现不同步的情况。所以客户端会定时发送一个包告诉服务器我连接正常，服务器也会回应正常。称之为心跳包。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>    ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'这是一条心跳包消息'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">60000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_05-应用场景" tabindex="-1"><a class="header-anchor" href="#_05-应用场景" aria-hidden="true">#</a> 05 应用场景</h2>
<p>WebSocket协议多用于实时通讯方面的场景，对实时数据要求比较高的，可以应用于以下的场景：</p>
<ul>
<li>即时聊天通信</li>
<li>多玩家游戏</li>
<li>在线协同编辑/编辑</li>
<li>实时数据流的拉取与推送</li>
<li>体育/游戏实况</li>
<li>实时地图位置</li>
</ul>
<h2 id="_06-与http的异同" tabindex="-1"><a class="header-anchor" href="#_06-与http的异同" aria-hidden="true">#</a> 06 与HTTP的异同</h2>
<h5 id="相同点" tabindex="-1"><a class="header-anchor" href="#相同点" aria-hidden="true">#</a> <strong>相同点</strong></h5>
<ul>
<li>都是基于TCP的应用层协议；</li>
<li>都使用Request/Response模型进行连接的建立；</li>
<li>在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码；</li>
<li>都可以在网络中传输数据。</li>
</ul>
<h5 id="不同点" tabindex="-1"><a class="header-anchor" href="#不同点" aria-hidden="true">#</a> <strong>不同点</strong></h5>
<ul>
<li>WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用；</li>
<li>WS的连接不能通过中间人来转发，它必须是一个直接连接；</li>
<li>WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据；</li>
<li>WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息；</li>
<li>WS的数据帧有序。</li>
</ul>
<h2 id="_07-小结" tabindex="-1"><a class="header-anchor" href="#_07-小结" aria-hidden="true">#</a> 07 小结</h2>
<p>WebSocket可写的东西还挺多，比如WebSocket扩展。客户端、服务端之间是如何协商、使用扩展的。WebSocket扩展可以给协议本身增加很多能力和想象空间，比如数据的压缩、加密，以及多路复用等。理论还是要联系实际才可以。</p>
<p><strong><font color="green">参考文章</font></strong></p>
<ul>
<li>WebSocket教程 阮一峰博客</li>
<li>深入剖析WebSocket的原理</li>
<li>WebSocket详解（四）：刨根问底HTTP与WebSocket的关系</li>
<li>维基百科 WebSocket</li>
<li>WebSocket 原理浅析与实现简单聊</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
