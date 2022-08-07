<template><div><h1 id="如何解决安卓-ios获取蓝牙id不一致问题" tabindex="-1"><a class="header-anchor" href="#如何解决安卓-ios获取蓝牙id不一致问题" aria-hidden="true">#</a> 如何解决安卓/IOS获取蓝牙ID不一致问题</h1>
<blockquote>
<p>不知道大家对低能蓝牙的技术应用了解的怎么样，其实这是一个比较广的应用，比如可以应用于一些信标、家庭娱乐或者医疗方面都有应用。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>因为小程序官方是支持接入低能蓝牙（BLE）的，所以在一个项目中也尝试使用如何接入蓝牙，我们从微信的官方网站就可以清楚知道如何使用，但是其中也是有很多坑的。本着学习的心态，自己也手把手带你摸坑，一起处理一些<code v-pre>平台兼容性的问题</code>以及一些<code v-pre>逻辑判断</code>问题。</p>
<h2 id="_02-问题抛出" tabindex="-1"><a class="header-anchor" href="#_02-问题抛出" aria-hidden="true">#</a> 02 问题抛出</h2>
<p>因为蓝牙在IOS客户端<code v-pre>6.5.6</code>版本开始支持，安卓<code v-pre>6.5.7</code>开始支持，所以一开始我们就应该判断版本问题，以免后面的功能不能使用。</p>
<p>我们从文档上面看到这样一段话：</p>
<blockquote>
<p>由于系统限制，Android 上获取到的 deviceId 为设备 MAC 地址，iOS 上则为设备 uuid。因此 deviceId 不能硬编码到代码中。</p>
</blockquote>
<p>看到这里我就想着，完犊子了，因为我们的手机平台有安卓和苹果，唯一标识蓝牙的就是deviceId，但是苹果搜索出来就不是这个了，而是uuid的一串字符串。因为苹果官方认为透露deviceId（MAC地址）会有安全问题，索性直接屏蔽了。</p>
<h2 id="_03-使用方法" tabindex="-1"><a class="header-anchor" href="#_03-使用方法" aria-hidden="true">#</a> 03 使用方法</h2>
<p>为了保证本文的完整性，我就大概介绍一下怎么使用在小程序接入低能蓝牙，大家也可以去官网看一下。</p>
<ul>
<li>初始化蓝牙模块</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">openBluetoothAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>wx<span class="token punctuation">.</span>openBluetoothAdapter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      wx<span class="token punctuation">.</span><span class="token function">openBluetoothAdapter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"正在获取蓝牙列表"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">"loading"</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          that<span class="token punctuation">.</span><span class="token function">getBluetoothAdapterState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          wx<span class="token punctuation">.</span><span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"提示"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">"请先打开蓝牙"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">showCancel</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          that<span class="token punctuation">.</span><span class="token function">stopBluetoothDevicesDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>获取本机蓝牙适配器状态</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
 wx<span class="token punctuation">.</span><span class="token function">getBluetoothAdapterState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
   <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     that<span class="token punctuation">.</span><span class="token function">startBluetoothDevicesDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>开始搜寻附近的蓝牙外围设备</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">startBluetoothDevicesDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"获取蓝牙设备列表"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    that<span class="token punctuation">.</span>data<span class="token punctuation">.</span>devices <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    wx<span class="token punctuation">.</span><span class="token function">startBluetoothDevicesDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        that<span class="token punctuation">.</span><span class="token function">getBluetoothDevices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>获取在蓝牙模块生效期间所有已发现的蓝牙设备</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">getBluetoothDevices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    wx<span class="token punctuation">.</span><span class="token function">getBluetoothDevices</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">services</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">allowDuplicatesKey</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        wx<span class="token punctuation">.</span><span class="token function">hideToast</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> <span class="token string">"获取蓝牙设备列表失败====="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过上面的一通操作之后我们就可以获取到蓝牙列表了，你可以查看你的低能蓝牙是否可以获取到。看到这里你就可以发现<code v-pre>安卓与苹果的搜索结果是不一样</code>的。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/fb4308d5-de80-48b7-ba7f-cd3399ff1953.png" alt="苹果获取的蓝牙"></p>
<p><img src="https://imgkr.cn-bj.ufileos.com/01c1c9be-3a26-4bcd-8200-ac2423f9c575.png" alt="安卓获取的蓝牙"></p>
<h2 id="_04-解决途径" tabindex="-1"><a class="header-anchor" href="#_04-解决途径" aria-hidden="true">#</a> 04 解决途径</h2>
<p><strong>版本问题</strong></p>
<p>首先就是版本的问题，我们要判断写一个版本的判断函数用来判别用户的版本：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">versionCompare</span><span class="token punctuation">(</span><span class="token parameter">ver1<span class="token punctuation">,</span> ver2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">var</span> version1pre <span class="token operator">=</span> <span class="token function">parseFloat</span><span class="token punctuation">(</span>ver1<span class="token punctuation">)</span>
    <span class="token keyword">var</span> version2pre <span class="token operator">=</span> <span class="token function">parseFloat</span><span class="token punctuation">(</span>ver2<span class="token punctuation">)</span>
    <span class="token keyword">var</span> version1next <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>ver1<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>version1pre <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> version2next <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>ver2<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>version2pre <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>version1pre <span class="token operator">></span> version2pre<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>version1pre <span class="token operator">&lt;</span> version2pre<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>version1next <span class="token operator">></span> version2next<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token keyword">else</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后调用微信的官方接口来获取手机版本：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx<span class="token punctuation">.</span><span class="token function">getSystemInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> currVersion <span class="token operator">=</span> res<span class="token punctuation">.</span>system<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">'android'</span> <span class="token operator">&amp;&amp;</span> util<span class="token punctuation">.</span><span class="token function">versionCompare</span><span class="token punctuation">(</span><span class="token string">'6.5.7'</span><span class="token punctuation">,</span> currVersion<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          wx<span class="token punctuation">.</span><span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'提示'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'当前android版本过低，暂不支持'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">showCancel</span><span class="token operator">:</span> <span class="token boolean">false</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">'ios'</span> <span class="token operator">&amp;&amp;</span> util<span class="token punctuation">.</span><span class="token function">versionCompare</span><span class="token punctuation">(</span><span class="token string">'6.5.6'</span><span class="token punctuation">,</span> currVersion<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          wx<span class="token punctuation">.</span><span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'提示'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'当前ios版本过低，暂不支持'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">showCancel</span><span class="token operator">:</span> <span class="token boolean">false</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>跨平台方案</strong></p>
<p>我们必须<code v-pre>保证设备的标识唯一</code>，两种平台获取的数据是一样的，那么我们既然不能联系苹果叫他开放，我们就采用一个<code v-pre>折中</code>的方法。</p>
<p>我一开始网上查找了很多资料，其中有说道蓝牙的<code v-pre>advertisData</code>当中是含有MAC地址的数据包，你只要解析一下就可以获取了，但是我按照他的方法操作一番发现安卓的deviceId和我获取的是不一样的值。所以就放弃这个方法了。</p>
<p>这时我就想着既然苹果可以通过这个字段获取到一个唯一值，那么安卓同样也可以呀。所以安卓端我也同样使用这个方法获取，不出所料果然可以。</p>
<p>我把这个方法称之为<code v-pre>适配器方法</code>，因为和设计模式的适配器模式思想一样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getUniqueId</span><span class="token punctuation">(</span><span class="token parameter">bf</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> buffer <span class="token operator">=</span> bf<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> mac <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token parameter">x</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token string">'00'</span> <span class="token operator">+</span> x<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> mac<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单介绍一下，这是一个处理buffer的函数，因为我们展开advertisData字段看到是buffer类型的，只要我们把它当作参数传进去就可以获取到16进制的值，我就把这个值当作蓝牙的唯一标识。例如<code v-pre>F3C85DF5EFFB</code>的这种标识。</p>
<h2 id="_05-小结" tabindex="-1"><a class="header-anchor" href="#_05-小结" aria-hidden="true">#</a> 05 小结</h2>
<p>期间也用过尝试很多种的方式来解决这个顽固的问题，但是都没有成功。心里就只有一个想法就是如何把这两者通过中间方法获取都是一样的值。</p>
<p>这个项目我觉得最大的坑就是这个了，曾经研究了好多天的时间都不曾解决，一开始我也不知道有这个限制，我还问过淘宝的蓝牙生产商能不能在蓝牙上面多加一个广播字段与deviceId一样，加入可以的话就直接获取了，也没有这么多事情了。奈何不行。</p>
<p>所以希望大家做这一块的话可以留意一下这个问题，但是我还发现有一些蓝牙的广播字段没有这个advertisData这个字段，那么我的方法也就不管用了，我还在想着怎么解决这个问题，后面有进展再更新吧。</p>
<p><img src="@source/blog/common/2.gif" alt=" "></p>
</div></template>
