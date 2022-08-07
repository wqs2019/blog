<template><div><h1 id="proxy-对象拦截器" tabindex="-1"><a class="header-anchor" href="#proxy-对象拦截器" aria-hidden="true">#</a> Proxy 对象拦截器</h1>
<blockquote>
<p>ES6的对象拦截器，可以拦截哪些情况呢</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>自从ES6诞生以来，各种新特性也逐渐显现出来，比如ES6中的Proxy对象，是一个重要的技术。之前Vue的数据双向数据绑定是使用Object.defineProperty()来做的，而现在vue3.0使用的是代理Proxy来编写。原因是前者有一些对象或者数组的变化是监听不了的，但是Proxy可以监听整个对象。</p>
<p>Proxy可以理解为，当你试图访问一个对象的时候必须先经过一个拦截或者代理，你才可以进行对对象的操作。这种机制的好处就是可以对外界的访问进行过滤和改写。</p>
<h2 id="_02-proxy实例的方法" tabindex="-1"><a class="header-anchor" href="#_02-proxy实例的方法" aria-hidden="true">#</a> 02 Proxy实例的方法</h2>
<h5 id="proxy实例的构造" tabindex="-1"><a class="header-anchor" href="#proxy实例的构造" aria-hidden="true">#</a> <strong><font color="red">proxy实例的构造</font></strong></h5>
<p>ES6提供一个原生的Proxy构造函数，用于生成Proxy实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span> <span class="token punctuation">(</span> target<span class="token punctuation">,</span> handler <span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数解析：</p>
<ul>
<li>target：所要拦截（代理）的对象</li>
<li>处理函数，拦截对应的操作</li>
</ul>
<p>利用Proxy对象可以拦截的方法有一下13种，下面一一来介绍一下。</p>
<h5 id="_1、get" tabindex="-1"><a class="header-anchor" href="#_1、get" aria-hidden="true">#</a> <strong>1、get()</strong></h5>
<p>get方法是意思是读取对象，那么相应的拦截就是在读取对象的时候进行拦截。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'alanwu'</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> property</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>property <span class="token keyword">in</span> target<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> target<span class="token punctuation">[</span>property<span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'对象属性不存在'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
proxy<span class="token punctuation">.</span>name  <span class="token comment">//'alanwu'</span>
proxy<span class="token punctuation">.</span>age   <span class="token comment">//错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假如上述代码访问不存在的属性的时候，没有抛出错误的话就会返回undefined。</p>
<h5 id="_2、set" tabindex="-1"><a class="header-anchor" href="#_2、set" aria-hidden="true">#</a> <strong>2、set()</strong></h5>
<p>set拦截操作用于拦截对对象赋值的操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">101</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">46</span><span class="token punctuation">,</span>
    <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">200</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">值不能小于100</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> 
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3、apply" tabindex="-1"><a class="header-anchor" href="#_3、apply" aria-hidden="true">#</a> <strong>3、apply()</strong></h5>
<p>apply方法用于拦截函数的调用、call、apply操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num1<span class="token punctuation">,</span> num2</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> num1 <span class="token operator">+</span> num2
<span class="token punctuation">}</span>
<span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>sum<span class="token punctuation">,</span> <span class="token punctuation">{</span>
	<span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> context<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 我们可以通过 Reflect.apply()来调用目标函数</span>
		<span class="token keyword">return</span> <span class="token function">Reflect</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token operator">...</span>arguments<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">proxy</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span>  <span class="token comment">// 14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4、has" tabindex="-1"><a class="header-anchor" href="#_4、has" aria-hidden="true">#</a> <strong>4、has()</strong></h5>
<p>has方法用于拦截hasProperty操作，即判断对象是否具有某个属性时，该方法有效。值得注意的是，对for...in循环是没有效果的。has方法可以判断该属性来自继承的属性，不只是自身的属性。下面是拦截访问私有属性“_prop”</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>key<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">===</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> key <span class="token keyword">in</span> target
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">_prop</span><span class="token operator">:</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token literal-property property">prop</span><span class="token operator">:</span><span class="token string">'foo'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token string">'_prop'</span> <span class="token keyword">in</span> proxy  <span class="token comment">//false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_5、construct" tabindex="-1"><a class="header-anchor" href="#_5、construct" aria-hidden="true">#</a> <strong>5、construct</strong></h5>
<p>该方法的本意是构造，所以会拦截 new 操作符命令。该方法接受两个参数：</p>
<ul>
<li>target：目标对象</li>
<li>args：构造函数的参数对象</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function">construct</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> args<span class="token punctuation">,</span> newTarget</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">target</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">construct</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> argumentsList<span class="token punctuation">,</span> newTarget</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'called: '</span> <span class="token operator">+</span> argumentsList<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">', '</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> argumentsList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">p</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "called: 1"</span>
                               <span class="token comment">// 10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6、deleteproperty" tabindex="-1"><a class="header-anchor" href="#_6、deleteproperty" aria-hidden="true">#</a> <strong>6、deleteProperty()</strong></h5>
<p>deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。值得注意的是，目标对象自身的不可配置（configurable）的属性不能被deleteProperty方法删除，否则会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function">deleteProperty</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token function">invariant</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">'delete'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">invariant</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>key<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">===</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Invalid attemp to </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>action<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> private "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" property</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">_prop</span><span class="token operator">:</span><span class="token string">'foo'</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">delete</span> proxy<span class="token punctuation">.</span>_prop  <span class="token comment">//Error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_7、defineproperty" tabindex="-1"><a class="header-anchor" href="#_7、defineproperty" aria-hidden="true">#</a> <strong>7、defineProperty</strong></h5>
<p>该方法用于拦截Object.defineProperty操作。下面操作添加新的属性会触发defineProperty函数，所以会报错。如果目标对象不可扩展（extensible）或不可写（writable）或不可配置（configurable），也不可添加新属性，否则也会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> descriptor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> target <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
proxy<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'bar'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_8、getownpropertydescriptor" tabindex="-1"><a class="header-anchor" href="#_8、getownpropertydescriptor" aria-hidden="true">#</a> <strong>8、getOwnPropertyDescriptor</strong></h5>
<p>该方法用于拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>key<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">===</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">_foo</span><span class="token operator">:</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token literal-property property">baz</span><span class="token operator">:</span><span class="token string">'tar'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>proxy<span class="token punctuation">,</span> <span class="token string">'wat'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//undefined</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>proxy<span class="token punctuation">,</span> <span class="token string">'_foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//undefined</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>proxy<span class="token punctuation">,</span> <span class="token string">'baz'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{value:'tar', writable:true,enumerable:true,configurable:true}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_9、getprototypeof" tabindex="-1"><a class="header-anchor" href="#_9、getprototypeof" aria-hidden="true">#</a> <strong>9、getPrototypeOf()</strong></h5>
<p>该方法用于拦截获取对象的原型。有如下几种情况：</p>
<ul>
<li>Object.prototype. __ proto __</li>
<li>Object.prototype.isPrototypeOf()</li>
<li>Object.getPrototypeOf()</li>
<li>Reflect.getPrototypeOf()</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> proto <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">getPrototypeOf</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> proto
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">===</span> proto <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是getPrototype方法返回值必须是对象或者null，否则会报错。目标对象不可扩展（extensible），那么该方法必须返回对象的原型对象。</p>
<h5 id="_10、isextensible" tabindex="-1"><a class="header-anchor" href="#_10、isextensible" aria-hidden="true">#</a> <strong>10、isExtensible()</strong></h5>
<p>该方法用于拦截Object.isExtensible()操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function-variable function">isExtensible</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法返回值必须是布尔值，否则会转成布尔值。如果返回值与目标对象的IsExtensible(target)不一致，也会抛出错误。</p>
<h5 id="_11、ownkeys" tabindex="-1"><a class="header-anchor" href="#_11、ownkeys" aria-hidden="true">#</a> <strong>11、ownKeys()</strong></h5>
<p>该方法用于拦截对象自身属性的读取操作。可以拦截以下操作：</p>
<ul>
<li>Object.getOwnPropertyNames ()</li>
<li>Object.getOwnPropertySymbols ()</li>
<li>Object.keys ()</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> target <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">c</span><span class="token operator">:</span><span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">ownKeys</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>proxy<span class="token punctuation">)</span> <span class="token comment">//['a']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_12、preventextensions" tabindex="-1"><a class="header-anchor" href="#_12、preventextensions" aria-hidden="true">#</a> <strong>12、preventExtensions()</strong></h5>
<p>该方法拦截 Object.preventExtensions () ，该方法必须返回个布尔值，否则会被自动转为布尔值。只有目标对象不可扩展时，即 Object.isExtensible(proxy)为false， proxy.preventExtensions 才能返回 true ，否则会报错。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var p =new Proxy({}, { 
	preventExtensions: function(target) { 
		return true; 
    }
}) 
Object.preventExtensions(p) //报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_13、setprototypeof" tabindex="-1"><a class="header-anchor" href="#_13、setprototypeof" aria-hidden="true">#</a> <strong>13、setPrototypeOf()</strong></h5>
<p>该方法主要用于拦截 Object.setPrototypeOf 方法。下面的代码中，只要修改 target 的原型对象就会错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span> 
	<span class="token function">setPrototypeOf</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> proto</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
		<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span> <span class="token punctuation">(</span><span class="token string">'Changing the prototype is forbidden'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> proto <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">;</span> 
<span class="token keyword">var</span> <span class="token function-variable function">target</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token keyword">var</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target <span class="token punctuation">,</span> handler<span class="token punctuation">)</span> <span class="token punctuation">;</span> 
Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span>proxy<span class="token punctuation">,</span> proto <span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//Error : Changing the prototype is forbidden </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_14、proxy-revocable" tabindex="-1"><a class="header-anchor" href="#_14、proxy-revocable" aria-hidden="true">#</a> <strong>14、Proxy.revocable()</strong></h5>
<p>Proxy.revocable 方法返回 一个可取消 Proxy实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> proxy<span class="token punctuation">,</span> revoke <span class="token punctuation">}</span> <span class="token operator">=</span> Proxy<span class="token punctuation">.</span><span class="token function">revocable</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
proxy<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
proxy<span class="token punctuation">.</span>foo <span class="token comment">//123</span>
<span class="token function">revoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
proxy<span class="token punctuation">.</span>foo <span class="token comment">//TypeError: Revoked</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Proxy.revocable 方法返回一个对象，其 proxy 属性是 Proxy 实例， revoke 属性是一个函数，可以取消 Proxy 实例。上面的代码中，当执行 revoke 函数后再访问 Proxy 实例，就会抛出一个错误。</p>
<p>Proxy.revocable 个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。</p>
<h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>上述的实例方法在很多地方都有很大的作用，特别是对对象进行拦截的场景的时候。ES6语法在近年来已经很多使用，特别是vue3.0会使用proxy作为数据的响应式写法。</p>
<p>一般面试还都会问你Object.defineProperty有什么缺点，然后问你有没有关注vue3.0，知道3.0中的响应式使用什么写法。还有Proxy有什么方法之类的。</p>
<font color="#32CD32">参考文章</font>
<ul>
<li>阮一峰 ES6入门标准 ——Proxy</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
