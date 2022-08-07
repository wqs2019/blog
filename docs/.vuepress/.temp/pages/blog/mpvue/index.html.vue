<template><div><h1 id="你还在使用原生开发小程序吗" tabindex="-1"><a class="header-anchor" href="#你还在使用原生开发小程序吗" aria-hidden="true">#</a> 你还在使用原生开发小程序吗</h1>
<blockquote>
<p>最近帮别人在做一个小程序,因为官方的支持不够好,组件库也不够多,所以就没有使用官方的操作。网上查找了一番，觉得mpvue还不错（之前也没玩过），索性拿来用吧！</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>小程序的做法也是比较简单的，假如你是老手的话基本上开箱即用，但是奈何自己技术不够，那就手把手教你踩坑吧。</p>
<p>之前也做过几个小程序，我用过<code v-pre>官方的</code>、<code v-pre>uni-app</code>开发，效果还行。然后现在是想尝试一下<code v-pre>mpvue</code>，生态还可以，组件库也多。拿到设计图的时候觉得还可以，但是一看好像还是有点东西的。</p>
<h2 id="_02-自定义tabbar" tabindex="-1"><a class="header-anchor" href="#_02-自定义tabbar" aria-hidden="true">#</a> 02 自定义tabbar</h2>
<p>我看到了页面是有一个自定义tabbar的，自己之前没有做做过这种，都是直接在app.json文件里面配置的，简单高效不带坑。虽然说官方支持<code v-pre>自定义tabbar</code>的功能，但是我和官方的意思就不是同一个频道的。这是我拿到的<code v-pre>原型图</code>：</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/04476daa-209b-4a1c-a21b-686ad3a103fe.png" alt="原型图"></p>
<p>一开始好像是有点蒙，但是谷歌了一下其实还有救。思想就是把原生的tabbar隐藏，然后把你自定义的tabbar放上去即可。</p>
<ul>
<li>在app.json配置tabbar，因为后面要跳转（不配置报错）</li>
<li>新建一个mytabbar.vue文件，写自己的tabbar</li>
<li>在app.vue的onShow的时候隐藏原生的tabbar,<code v-pre>wx.hideTabBar();</code></li>
</ul>
<p>这样其实就好了，但是需要tabbar的页面都要引入自己的组件，talk is cheap，接下来就开始实现自己的组件吧。</p>
<h3 id="自定义组件" tabindex="-1"><a class="header-anchor" href="#自定义组件" aria-hidden="true">#</a> 自定义组件</h3>
<p><strong>模板部分</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tabBar-wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>article</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tabBar-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tabBar-nav<span class="token punctuation">"</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navList.length > 0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span>
          <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in navList<span class="token punctuation">"</span></span>
          <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectNavItem(index,item.pagePath)<span class="token punctuation">"</span></span>
          <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-images<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
              <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectNavIndex === index ? item.selectedIconPath : item.iconPath<span class="token punctuation">"</span></span>
              <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>iconPath<span class="token punctuation">"</span></span>
            <span class="token punctuation">/></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span>
            <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectNavIndex === index ? <span class="token punctuation">'</span>item-text item-text-active<span class="token punctuation">'</span> : <span class="token punctuation">'</span>item-text<span class="token punctuation">'</span> <span class="token punctuation">"</span></span>
          <span class="token punctuation">></span></span>{{item.text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>needButton<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">flex</span><span class="token punctuation">:</span> 2</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
              <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btnText===<span class="token punctuation">'</span>抽大礼<span class="token punctuation">'</span><span class="token punctuation">"</span></span>
              <span class="token attr-name">:disabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>!handButton<span class="token punctuation">"</span></span>
              <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bindNavigateTo(<span class="token punctuation">'</span>../game/main<span class="token punctuation">'</span>)<span class="token punctuation">"</span></span>
              <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handButton ? <span class="token punctuation">'</span>submit-box-btn submit-box-btn-active<span class="token punctuation">'</span> : <span class="token punctuation">'</span>submit-box-btn<span class="token punctuation">'</span> <span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>{{ btnText }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>article</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>逻辑部分</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"selectNavIndex"</span><span class="token punctuation">,</span> <span class="token string">"needButton"</span><span class="token punctuation">,</span> <span class="token string">"handButton"</span><span class="token punctuation">,</span> <span class="token string">"btnText"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">navList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">pagePath</span><span class="token operator">:</span> <span class="token string">"../index/main"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">iconPath</span><span class="token operator">:</span> <span class="token string">"../../static/tabs/home.png"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">selectedIconPath</span><span class="token operator">:</span> <span class="token string">"../../static/tabs/home-active.png"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"首页"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">pagePath</span><span class="token operator">:</span> <span class="token string">"../share/main"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">iconPath</span><span class="token operator">:</span> <span class="token string">"../../static/tabs/home.png"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">selectedIconPath</span><span class="token operator">:</span> <span class="token string">"../../static/tabs/home-active.png"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"分享"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">pagePath</span><span class="token operator">:</span> <span class="token string">"../center/main"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">iconPath</span><span class="token operator">:</span> <span class="token string">"../../static/tabs/home.png"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">selectedIconPath</span><span class="token operator">:</span> <span class="token string">"../../static/tabs/home-active.png"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"我的"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">selectNavItem</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> pagePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>selectNavIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">bindViewTap</span><span class="token punctuation">(</span>pagePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">bindNavigateTo</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//不是tabbar的页面跳转方式</span>
      wx<span class="token punctuation">.</span><span class="token function">navigateTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        url
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">bindViewTap</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//tabbar页面的跳转方式</span>
      wx<span class="token punctuation">.</span><span class="token function">switchTab</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        url
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>样式部分</strong></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.tabBar-box</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 0<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid #eee<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #eb8c2b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.tabBar-nav</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> baseline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item-text</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #666<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 0.24s linear<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item-text-active</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fec754<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item-images</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 0.24s linear<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 60rpx<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 60rpx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.submit-box-btn</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 999<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 70%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 80rpx<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 80rpx<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 50rpx<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #404040<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #eee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.submit-box-btn-active</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #fca542<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fca542<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">button</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式</h3>
<p>使用方式也很简单，直接把它引入进来，然后注册一下就可以了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> mytabbar <span class="token keyword">from</span> <span class="token string">"@/components/mytabbar"</span><span class="token punctuation">;</span>

<span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    mytabbar
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在你的页面里面放上组件：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mytabbar</span>
      <span class="token attr-name">:needButton</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>needButton<span class="token punctuation">"</span></span> 
      <span class="token attr-name">:btnText</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btnText<span class="token punctuation">"</span></span>
      <span class="token attr-name">:handButton</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handButton<span class="token punctuation">"</span></span>
      <span class="token attr-name">:selectNavIndex</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectNavIndex<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mytabbar</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>needButton:是否需要一个button，就像我这里就需要了</li>
<li>btnText：button里面的文字显示，因为可能另一个页面显示不一样</li>
<li>handButton：点击button的逻辑</li>
<li>selectNavIndex：需要高亮的下标，每个页面的高亮不一样</li>
</ul>
<p><img src="https://imgkr.cn-bj.ufileos.com/66f1a5dc-90e1-4aa9-bfd2-f6b7215b3056.png" alt="最后实现"></p>
<h2 id="_03-组合使用vant" tabindex="-1"><a class="header-anchor" href="#_03-组合使用vant" aria-hidden="true">#</a> 03 组合使用Vant</h2>
<p>自己造轮子很麻烦，就用别人的组件库好了。看了一下Vant还不错，而且别人也尝试过使用vant+mpvue的开发模式，坑还是自己踩一边的好。</p>
<p>首先我遇到的第一个问题就是如何引入组件库，虽然官方的做法是直接安装，但是我安装之后发现老是找不到路径，没办法只好放弃。我现在采用的是<code v-pre>直接引入本地的</code>方式进行，虽然每一次编译都要一点时间，但是还好。以后上线的时候把没用的组件删除就好，保留你需要使用的组件（按需引入）</p>
<p>下载整个仓库之后把里面的<code v-pre>dist文件夹</code>下面的所有文件复制到你的项目，<code v-pre>static/vant</code>当中，以后使用就从这里引入好了，使用的时候还是在app.json里面配置(<code v-pre>与pages同级</code>)：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"usingComponents"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"van-button"</span><span class="token operator">:</span> <span class="token string">"/static/vant/button/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-tab"</span><span class="token operator">:</span> <span class="token string">"/static/vant/tab/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-tabs"</span><span class="token operator">:</span> <span class="token string">"/static/vant/tabs/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-nav-bar"</span><span class="token operator">:</span> <span class="token string">"/static/vant/nav-bar/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-icon"</span><span class="token operator">:</span> <span class="token string">"/static/vant/icon/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-row"</span><span class="token operator">:</span> <span class="token string">"/static/vant/row/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-col"</span><span class="token operator">:</span> <span class="token string">"/static/vant/col/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-dialog"</span><span class="token operator">:</span> <span class="token string">"/static/vant/dialog/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-field"</span><span class="token operator">:</span> <span class="token string">"/static/vant/field/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-area"</span><span class="token operator">:</span> <span class="token string">"/static/vant/area/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-popup"</span><span class="token operator">:</span> <span class="token string">"/static/vant/popup/index"</span><span class="token punctuation">,</span>
    <span class="token property">"van-picker"</span><span class="token operator">:</span> <span class="token string">"/static/vant/picker/index"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样其实就可以了，写页面的时候直接按照它的文档写就好了。</p>
<h2 id="_04-遇到的小坑" tabindex="-1"><a class="header-anchor" href="#_04-遇到的小坑" aria-hidden="true">#</a> 04 遇到的小坑</h2>
<p><strong>自定义NavBar</strong></p>
<p>因为UI图上面的导航有自定义的样式，没办法只好使用vant的<code v-pre>van-nav-bar</code>，但是我使用slot的时候发现左边的图标点击不了。</p>
<p>文档上面是使用<code v-pre>bind:click-left</code>的方式，但是没用，其实正确的写法应该是：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>van-nav-bar</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>我的<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>van-icon</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wap-home<span class="token punctuation">"</span></span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toHome<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>van-nav-bar</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>图片背景</strong></p>
<p>使用图片背景的时候，发现报错说不可以引用本地的图片，使用base64或者网络图片。但是我使用网络图片发现报了403错误，没有权限。索性就使用了base64的方式。虽然不太接受这种方式，因为转出来的字符串很长。</p>
<p><strong>获取定位</strong></p>
<p>首页需要有一个获取定位的功能。但是看了一下小程序的官方文档只能获取到经纬度。这里我就使用了第三方的接口，去腾讯位置服务平台注册一下，可以使用经纬度逆向解析地址的功能。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/6be46cf5-4cdf-47a7-a575-34bcb446ba25.png" alt=""></p>
<p>然后里面有一个逆地址解析的功能，使用经纬度作为参数就可以获取了。但是开始你要去app.json配置：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//在app.json中配置权限</span>
<span class="token string-property property">"permission"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"scope.userLocation"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"desc"</span><span class="token operator">:</span> <span class="token string">"您的位置信息将用于搜索银行信息,以帮助您填写正确的支行信息"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgkr.cn-bj.ufileos.com/0c65e9b8-5cde-43ca-8694-8559c40174c8.png" alt=""></p>
<p>实例代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx<span class="token punctuation">.</span><span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"wgs84"</span><span class="token punctuation">,</span> <span class="token comment">// 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"定位成功"</span><span class="token punctuation">,</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> locationString <span class="token operator">=</span> res<span class="token punctuation">.</span>latitude <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> res<span class="token punctuation">.</span>longitude<span class="token punctuation">;</span>
        wx<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"http://apis.map.qq.com/ws/geocoder/v1/?l&amp;get_poi=1"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"xxxxx-xxxxx-xxxxx-xxxx-xxxxx-xxxxx"</span><span class="token punctuation">,</span><span class="token comment">//你自己的key,页面上有</span>
            <span class="token literal-property property">location</span><span class="token operator">:</span> locationString
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">"GET"</span><span class="token punctuation">,</span>
          <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"请求成功"</span><span class="token punctuation">,</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这里就可以获取你的地址了</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"请求失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">complete</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"请求完成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"定位失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">complete</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"定位完成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是你会发现也有一些小问题，比如一开始说你的合法域名问题。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/a19b7e1e-b053-45b1-8c96-517408a792e1.png" alt="">
然后你就可以去你的项目配置那里勾上<code v-pre>不检验合法域名</code>。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/7a16cb6b-b678-495f-a625-e5ef1b58d1c3.png" alt="">
然后重新试一下，发现还是不行。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/a07d938c-c7d8-4201-82b8-f9d5247a1091.png" alt="请求源未授权"></p>
<p>这里其实就要你去微信小程序的后台加入请求源了，因为我现在是测试号没有后台弄不了。注意的是：</p>
<ul>
<li>微信小程序使用的时候，WebServiceAPI 域名白名单<code v-pre>不能配置</code>，否则会报错</li>
<li>request合法域名<code v-pre>要配置</code></li>
</ul>
<h2 id="_05-小结" tabindex="-1"><a class="header-anchor" href="#_05-小结" aria-hidden="true">#</a> 05 小结</h2>
<p>一顿操作下来发现自己还是可以接受，但是应该说还有很多坑没有亲自踩，都是在前人的路上走，谷歌一搜mpvue的，为什么一堆都是踩坑记录？？？</p>
<p>其实还好，mpvue对vue的语法支持还不错，因为现在自己对vue的语法比较熟悉，写起来是没有毛病的，但是主要是一些细节上可能会难以把控。</p>
<p>特此记录一下，也是对自己的记录。发现其实学会了vue真的是很好，不仅可以开发web界面还可以把小程序也一起搞了。</p>
<p>参考文章：</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000015027980" target="_blank" rel="noopener noreferrer">mpvue 小程序如何自定义tabBar，不使用navigateTo跳转，模拟redirectTo跳转<ExternalLinkIcon/></a></li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=" "></p>
</div></template>
