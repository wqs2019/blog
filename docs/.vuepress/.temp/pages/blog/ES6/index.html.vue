<template><div><h1 id="es6到底有哪些特性值得我们学习" tabindex="-1"><a class="header-anchor" href="#es6到底有哪些特性值得我们学习" aria-hidden="true">#</a> ES6到底有哪些特性值得我们学习</h1>
<blockquote>
<p>业精于勤，荒于嬉</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>ES6现在已经是下一代的语言标准了，前端的学习已经来到了一个新的阶段，我们的JavaScript语言已经可以用来编写复杂的大型应用程序，成为企业级开发语言。而现在前端开发岗已经是企业中很重要的岗位之一，所以说学习新技术，以技术驱动产品是理所当然的事情。</p>
<p>对于ES6的学习，我们建议去看一下阮一峰老师的教程，里面详细讲述了每一个知识点，很好理解。接下来我就讲一下ES6到底新增了哪一些比较重要的特性，是可以运用到我们的项目当中，并且面试常考的题目。</p>
<h2 id="_02-新特性" tabindex="-1"><a class="header-anchor" href="#_02-新特性" aria-hidden="true">#</a> 02 新特性</h2>
<p>ES6新增了很多新特性，这里不可能每一个都详细讲述，面试中我遇到的有以下几个，你把它们都讲述清楚就可以过关了。</p>
<ul>
<li>let、var、const区别</li>
<li>箭头函数</li>
<li>解构赋值</li>
<li>模板字符串</li>
<li>Set、Map数据结构</li>
<li>Promise对象</li>
<li>Proxy</li>
</ul>
<h5 id="let-、var、const的区别" tabindex="-1"><a class="header-anchor" href="#let-、var、const的区别" aria-hidden="true">#</a> <strong>let 、var、const的区别</strong></h5>
<p>这几个都是用于声明变量/常量的关键字，以前我们一般都是用var来进行声明，但是有一些缺点而且还容易出错。</p>
<p>我们先了解一个变量提升和作用域的问题。</p>
<p>变量提升：是指当你用var进行声明的时候，可以不用声明就使用。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么函数会不会提升呢？函数和变量哪一个的优先级更高呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//f (a){}</span>
<span class="token keyword">var</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们得出来的结果是函数提升的优先级比变量高。那么作用域又是什么呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a<span class="token operator">=</span><span class="token number">2</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行这段代码我们就会得到结果为2</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// var a = 2</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是当我们把代码注释之后，我们就会发现结果变成了1。</p>
<p>作用域：当你在当前作业域找不到声明就会到父级的作用域去找，这样层层递进查找，最终形成了一个链，这就是作用域链。</p>
<p>let、var都是可用于声明变量的操作符，但是他们的区别就是var 存在作用域提升，而let仅限于当前作用域的使用，否则会报错。声明之前使用也会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token keyword">let</span> a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>就会说 a is not defined</p>
<p>const用于声明常量，声明之后不可改，也不存在变量提升的问题，修改或声明前使用会报错。我们还要注意一点就是let和const声明之后不会挂在到window上面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token number">1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>b<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span> c<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常考的面试题是，以下代码输出什么：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>i<span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//5 5 5 5 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是块级作用域的问题，换成let声明就会输出0 1 2 3 4</p>
<p>总结一下：</p>
<ul>
<li>var存在变量提升，能在声明前使用。其他两个存在暂时性死区，不能声明前使用</li>
<li>let 和 const基本一致，后者不能再次赋值</li>
<li>函数提升由于变量提升</li>
</ul>
<h5 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> <strong>箭头函数</strong></h5>
<p>箭头函数是ES6新增的一种函数写法，下面两种写法其实是一样的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它和普通函数有什么区别呢？</p>
<ul>
<li>不可用作构造函数，没有原型</li>
<li>this指向继承而来且不会改变</li>
</ul>
<h5 id="解构赋值" tabindex="-1"><a class="header-anchor" href="#解构赋值" aria-hidden="true">#</a> <strong>解构赋值</strong></h5>
<p>解构赋值就是一种模式匹配的写法，之前我们赋值的时候一般都要分别来赋值，比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是解构赋值允许我们这样赋值，左右两边都对应复制，如果解构不成功就会赋值undefined</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1, 2, undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们比较常用的一般有两种方面，一个是JSON字符串的解构，如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>number<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'rose'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token literal-property property">number</span><span class="token operator">:</span><span class="token number">123</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//rose 12 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种我们可以用来数据的交换操作，如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>let a=1;
let b=2;

[a,b]=[b,a];

console.log(a,b);  //2, 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串" aria-hidden="true">#</a> <strong>模板字符串</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#result'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>
  <span class="token string">'There are &lt;b>'</span> <span class="token operator">+</span> basket<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token string">'&lt;/b> '</span> <span class="token operator">+</span>
  <span class="token string">'items in your basket, '</span> <span class="token operator">+</span>
  <span class="token string">'&lt;em>'</span> <span class="token operator">+</span> basket<span class="token punctuation">.</span>onSale <span class="token operator">+</span>
  <span class="token string">'&lt;/em> are on sale!'</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#result'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  There are &lt;b></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>basket<span class="token punctuation">.</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/b> items
   in your basket, &lt;em></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>basket<span class="token punctuation">.</span>onSale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/em>
  are on sale!
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相比于之前使用+拼接简洁许多，并且可读性比较强。语法就是使用反引号``来声明，然后变量使用${variable}。</p>
<h5 id="set、map数据结构" tabindex="-1"><a class="header-anchor" href="#set、map数据结构" aria-hidden="true">#</a> <strong>Set、Map数据结构</strong></h5>
<p>Set它是一个构造函数，用来生成Set数据结构。类似于数组，但是跟数组不同的是它的每一项都不会重复。作用也可以用于数组去重的操作。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> s<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 2 3 5 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组去重，比较简单</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">unique</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Map是一个类似于对象，是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以作为键，包括object。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">p</span><span class="token operator">:</span> <span class="token string">'Hello World'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

m<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token string">'content'</span><span class="token punctuation">)</span>
m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token comment">// "content"</span>

m<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token comment">// true</span>
m<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token comment">// true</span>
m<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为构造函数，Map也可以接受一个数组作为参数，数组的成员也是一个个表示键值对的数组。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'张三'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">'title'</span><span class="token punctuation">,</span> <span class="token string">'Author'</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

map<span class="token punctuation">.</span>size <span class="token comment">// 2</span>
map<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span> <span class="token comment">// "张三"</span>
map<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">'title'</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'title'</span><span class="token punctuation">)</span> <span class="token comment">// "Author"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="promise对象" tabindex="-1"><a class="header-anchor" href="#promise对象" aria-hidden="true">#</a> <strong>Promise对象</strong></h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... some code</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token comment">/* 异步操作成功 */</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。</p>
<p>resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。</p>
<p>Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// success</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// failure</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> <strong>Proxy</strong></h5>
<p>Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy的拦截有以下13种，具体用法可以查找我之前写的Proxy。</p>
<ul>
<li>get(target, propKey, receiver) 拦截对象属性读取</li>
<li>set(target, propKey, value, receiver) 拦截对象的属性设置</li>
<li>has(target, propKey) 拦截propkey in proxy</li>
<li>deleteProperty(target, propKey) 拦截delete proxy[propKey]</li>
<li>ownKeys(target)</li>
<li>getOwnPropertyDescriptor(target, propKey) 返回对象属性的描述对象拦截</li>
<li>defineProperty(target, propKey, propDesc)</li>
<li>proventExtensions(target)</li>
<li>getPrototypeOf(target)</li>
<li>isExtensible(target)</li>
<li>setPrototypeOf(target, proto)</li>
<li>apply(target, object, args)</li>
<li>construct(target, args) 拦截 proxy 实例作为构造函数调用的操作</li>
</ul>
<h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>ES6的很多新特性都可以让我们的变成更加简单，但是我们需要深入理解其中的每一个细节，写法不当可能会是我们的程序产生不一样的运行效果。如果读者想了解更多的细节，推荐阅读阮一峰的ES6入门标准第三版，定会收获良多。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
