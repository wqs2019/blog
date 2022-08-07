<template><div><h1 id="关于vue过滤器的原理解析" tabindex="-1"><a class="header-anchor" href="#关于vue过滤器的原理解析" aria-hidden="true">#</a> 关于vue过滤器的原理解析</h1>
<blockquote>
<p>又来学习源码系列，今天就看一下vue中的过滤器具体是怎么实现的，我觉得这是一个不常用但是很重要的知识点，开冲！</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理。我们看一下官方的定义：</p>
<blockquote>
<p>Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示:</p>
</blockquote>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 在双花括号中 --></span>
{{ message | capitalize }}

<span class="token comment">&lt;!-- 在 `v-bind` 中 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rawId | formatId<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以在一个组件的选项中定义本地的过滤器：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">capitalize</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">''</span>
    value <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> value<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者在创建 Vue 实例之前全局定义过滤器：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">'capitalize'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">''</span>
  value <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> value<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。过滤器可以串联：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{{ message | filterA | filterB }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。</p>
<p>过滤器是 JavaScript 函数，因此可以接收参数：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{{ message | filterA('arg1', arg2) }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。</p>
<h2 id="_02-过滤器原理" tabindex="-1"><a class="header-anchor" href="#_02-过滤器原理" aria-hidden="true">#</a> 02 过滤器原理</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{{ message | capitalize }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的过滤器经过一顿操作之后就会变成：<code v-pre>_s(_f(&quot;capitalize&quot;)(message))</code>。</p>
<ul>
<li>_f：该函数其实就是resolveFilter的别名，作用是从<code v-pre>_this.$options.filter</code>找到过滤器并返回</li>
<li>_s：该函数就是toString函数的别名，作用是拿到过滤之后的结果并传递给toString()函数，结果会保存到VNode中的text属性，返回结果直接渲染视图</li>
</ul>
<h3 id="串联过滤器" tabindex="-1"><a class="header-anchor" href="#串联过滤器" aria-hidden="true">#</a> 串联过滤器</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{{ message | filterA | filterB }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的串联过滤器经过一顿操作之后就会变成：</p>
<p><code v-pre>_s(_f(&quot;filterB&quot;)(_f(&quot;filterA&quot;)(message)))</code></p>
<p>这里的意思就是message作为第一个参数传进filterA当中，然后经过filterA的处理结果就传进filterB当中。<code v-pre>即filterA过滤器的结果就是filterB过滤器的输入</code>。</p>
<h3 id="过滤器参数接收" tabindex="-1"><a class="header-anchor" href="#过滤器参数接收" aria-hidden="true">#</a> 过滤器参数接收</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{{ message | filterA | filterB("param") }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上的过滤器的编译结果就是：</p>
<p><code v-pre>_s(_f(&quot;filterB&quot;)(_f(&quot;filterA&quot;)(message),&quot;param&quot;))</code></p>
<p>这里有一点注意的是：这个param参数是filterB的第二个参数，它的第一个参数是经过filterA处理的结果。</p>
<h3 id="f函数的原理" tabindex="-1"><a class="header-anchor" href="#f函数的原理" aria-hidden="true">#</a> _f函数的原理</h3>
<p>_f函数其实就是寻找过滤器的，如果找到过滤器就返回过滤器，找不到就返回与参数相同的值。它的代码其实很简单：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>identity<span class="token punctuation">,</span> resolveAssets<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core/util/index'</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveFilter</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">resolveAssets</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">,</span> <span class="token string">'filters'</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">||</span> identity
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们重点来看一下resolveAssets到底做了什么事情。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveAsset</span> <span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span> type<span class="token punctuation">,</span> id<span class="token punctuation">,</span> warnMissing</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">'string'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">const</span> assets <span class="token operator">=</span> options<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>id<span class="token punctuation">]</span>
  <span class="token keyword">const</span> camelizedId <span class="token operator">=</span> <span class="token function">camelize</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> camelizedId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>camelizedId<span class="token punctuation">]</span>
  <span class="token keyword">const</span> PascalCaseId <span class="token operator">=</span> <span class="token function">capitlize</span><span class="token punctuation">(</span>camelizedId<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> PascalCaseId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>PascalCaseId<span class="token punctuation">]</span>
  
  <span class="token comment">//检查原型链</span>
  <span class="token keyword">const</span> res assets<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">||</span> assets<span class="token punctuation">[</span>camelizedId<span class="token punctuation">]</span> <span class="token operator">||</span> PascalCaseId
  <span class="token keyword">if</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token operator">!==</span><span class="token string">'production'</span><span class="token operator">&amp;&amp;</span> warnMissing<span class="token operator">&amp;&amp;</span><span class="token operator">!</span>res<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Fail to resolve'</span> <span class="token operator">+</span> type<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">':'</span><span class="token operator">+</span>id<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实它的寻找过程也很简单，主要是做了以下的操作（id是过滤器id）：</p>
<ul>
<li>判断过滤器id是否为字符串，不是则终止</li>
<li>用assets存储过滤器</li>
<li>hasOwn函数检查assets自身是否存在id属性，存在则返回</li>
<li>hasOwn函数检查assets自身是否存在<code v-pre>驼峰化后的</code>id属性，存在则返回</li>
<li>hasOwn函数检查assets自身是否存在将<code v-pre>首字母大写后的</code>id属性，存在则返回</li>
<li>如果还是没有，就是去原型链找，找不到就会打印警告</li>
</ul>
<h3 id="过滤器解析原理" tabindex="-1"><a class="header-anchor" href="#过滤器解析原理" aria-hidden="true">#</a> 过滤器解析原理</h3>
<p>我们想一下，解析器是怎么解析过滤器的语法？其实在vue内部专门有这么一个函数用来解析过滤器语法：<code v-pre>parseFilters</code></p>
<p>它的原理就是解析过滤器列表，然后<code v-pre>循环过滤器列表</code>并<code v-pre>拼接字符串</code>。</p>
<h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>其实过滤器的作用有很多，相信大家对时间的格式化也有很多的处理方法，其中一个就是可以利用过滤器来<code v-pre>格式化时间</code>。而且我们知道，过滤器它是可以<code v-pre>支持链式的操作</code>，很方便地对变量进行多步处理，然后返回你想要的结果。</p>
<p>过滤器的原理其实很简单，无非就是<code v-pre>在编译阶段就把过滤器编译成函数进行调用</code>，串联的过滤器就是<code v-pre>嵌套调用</code>。关于编译成函数的时候就是利用vue的内部函数<code v-pre>parseFilters</code>，解析过滤器列表并进行<code v-pre>拼接字符串</code>。</p>
<p>参考文章：</p>
<ul>
<li>深入浅出vue.js</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=" "></p>
</div></template>
