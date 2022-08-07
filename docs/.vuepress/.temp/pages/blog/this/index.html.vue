<template><div><h1 id="函数作用域、闭包与this指向问题" tabindex="-1"><a class="header-anchor" href="#函数作用域、闭包与this指向问题" aria-hidden="true">#</a> 函数作用域、闭包与this指向问题</h1>
<blockquote>
<p>纸上得来终觉浅，绝知此事要躬行</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>之前学习C语言的时候基本语法还好理解，但是后来出了一个this的东西，然后我的脑子就卡壳了，总觉得指针这东西让人琢磨不透，心想以后肯定不搞这个。现在学习了JavaScript之后发现原来也有this这玩意，想着这次逃不过了，那就好好总结一下吧，彻底把它弄懂就好。</p>
<p><img src="@source/blog/this/img/2.png" alt=" "></p>
<h2 id="_02-作用域" tabindex="-1"><a class="header-anchor" href="#_02-作用域" aria-hidden="true">#</a> 02 作用域</h2>
<p>作用域是可访问变量的集合，在JavaScript中对象和函数同样是变量，作用域为可访问变量，对象，函数的集合。作用域可以分为全局作用域和局部作用域。</p>
<p><strong><font color="orange">全局作用域</font></strong>： 变量在函数外定义，即为全局变量，全局变量有全局作用域，网页中所有脚本和函数都可以使用。如果变量在函数内没有声明，也是全局变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">"hello World"</span><span class="token punctuation">;</span>
<span class="token comment">// 此处可调用 name 变量</span>
<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 函数内可调用 name 变量</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 此处可调用 name 变量</span>
<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    name <span class="token operator">=</span> <span class="token string">"hello World"</span><span class="token punctuation">;</span>
    <span class="token comment">// 此处可调用 name 变量</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><font color="orange">局部作用域</font></strong>：变量在函数内声明，变量为局部作用域，只能在函数内部访问。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 此处不能调用 name 变量</span>
<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">"hello World"</span><span class="token punctuation">;</span>
    <span class="token comment">// 函数内可调用 name 变量</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>局部变量只作用于函数内，所以不同的函数可以使用相同名称的变量。局部变量在函数执行时创建，函数执行完毕后局部变量就会自动销毁。</p>
<p>JavaScript变量生命周期，局部变量函数执行完毕后销毁，全局变量在页面关闭后销毁。函数参数只在函数内起作用，属于局部变量。</p>
<h2 id="_03-闭包" tabindex="-1"><a class="header-anchor" href="#_03-闭包" aria-hidden="true">#</a> 03 闭包</h2>
<p><strong><font color="orange">闭包</font></strong>：函数A内部有函数B，函数B可以访问函数A的变量，那么函数B就是闭包。本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">//123</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><font color="orange">闭包有3大特性：</font></strong></p>
<ul>
<li>函数嵌套函数</li>
<li>函数内部可以引用函数外部的参数和变量</li>
<li>参数和变量不会被垃圾回收机制回收</li>
</ul>
<p><strong><font color="orange">闭包优点：</font></strong></p>
<ol>
<li>可读取函数内部的变量</li>
<li>局部变量可以保存在内存中，实现数据共享</li>
<li>执行过程所有变量都匿名在函数内部</li>
</ol>
<p><strong><font color="orange">闭包缺点：</font></strong></p>
<ol>
<li>使函数内部变量存在内存中，内存消耗大</li>
<li>滥用闭包可能会导致内存泄漏</li>
<li>闭包可以在父函数外部改变父函数内部的值，慎操作</li>
</ol>
<p><strong><font color="orange">使用场景：</font></strong></p>
<ol>
<li>模拟私有方法</li>
<li>setTimeout的循环</li>
<li>匿名自执行函数</li>
<li>结果要缓存场景</li>
<li>实现类和继承</li>
</ol>
<h2 id="_04-this指向" tabindex="-1"><a class="header-anchor" href="#_04-this指向" aria-hidden="true">#</a> 04 this指向</h2>
<p>this是在函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用。通过捣鼓这么多代码，无非就是几种情况，在不同的环境下会有不同的值。发现网上很多关于this的文章都会让人觉得很难以理解，讲解一大堆例子但是没有讲到点上。</p>
<p>首先我们来看一下代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
 <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>对于直接调用函数来说，不管foo函数被放在了什么地方，this的指向一定是window</li>
<li>对于obj.foo()来说，谁调用了函数那么谁就是this</li>
<li>对于new操作实例化来说，this就会绑定在实例化对象上面且不会被改变</li>
<li>箭头函数this只取决于包裹箭头函数的第一个普通函数的this</li>
</ul>
<p><strong><font color="orange">PS</font></strong>：箭头函数是没有this的，只会从自己的作用域链的上一层继承this。箭头函数的this在它被定义的时候就确定了，之后永远不会改变。</p>
<p><img src="@source/blog/this/img/1.png" alt=""></p>
<h2 id="_05-小结" tabindex="-1"><a class="header-anchor" href="#_05-小结" aria-hidden="true">#</a> 05 小结</h2>
<p>函数作用域和闭包等知识点都是一些很基础的，只不过我们经常会忽略了最基础的内容，忙着去学习前端框架等其他技术。所以我们一定要重视起来，这也是面试基础，但很多人也答不出来。</p>
<p><strong><font color="green">参考文章</font></strong></p>
<ul>
<li>阮一峰 JavaScript 的this 用法</li>
<li>菜鸟教程 JavaScript函数作用域</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
