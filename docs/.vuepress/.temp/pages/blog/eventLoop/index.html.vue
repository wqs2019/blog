<template><div><h1 id="javascript事件循环机制" tabindex="-1"><a class="header-anchor" href="#javascript事件循环机制" aria-hidden="true">#</a> JavaScript事件循环机制</h1>
<blockquote>
<p>菩提本无树，明镜亦非台</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>事件循环机制在前端的面试中可谓是必问的一道题目，这道题目涉及JS的执行顺序问题，可能有些同学执行JS代码的时候老是会出错，执行顺序不对的情况。所以我就借这一篇文章好好深入了解一下。</p>
<p><img src="@source/blog/eventLoop/img/4.png" alt=""></p>
<h2 id="_02-事件循环" tabindex="-1"><a class="header-anchor" href="#_02-事件循环" aria-hidden="true">#</a> 02 事件循环</h2>
<p>我们知道JavaScript是单线程的，意思就是一个时间只能做一件事情。就比如车站过安检一样，都会一个个通过，这就是单线程。那么这样问题就来了，假如程序中有一个很慢的http请求，用户必须要等待响应才可以继续后续的操作，这样就不妥了。所以我们就让长时间请求的程序代码挂起，让用户先操作其他事情。</p>
<p>在JavaScript中，我们把任务分为同步任务和异步任务。首先我们看一段代码的执行顺序。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//执行结果：script start=>script end=>promise1 =>promise2=>setTimeout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么会是这样的结果，因为任务进入执行栈之后会判断一下是否是同步任务，若是同步任务就会进入主线程执行；异步任务就会到事件表里面注册回调函数到事件队列。</p>
<ul>
<li>
<p>同步和异步任务分别进入不同的执行&quot;场所&quot;，同步的进入主线程，异步的进入Event Table并注册函数</p>
</li>
<li>
<p>当指定的事情完成时，Event Table会将这个函数移入Event Queue</p>
</li>
<li>
<p>主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。</p>
</li>
<li>
<p>上述过程会不断重复，也就是常说的Event Loop(事件循环)</p>
</li>
</ul>
<p><img src="@source/blog/eventLoop/img/1.jpg" alt=""></p>
<h2 id="_03-宏任务和微任务" tabindex="-1"><a class="header-anchor" href="#_03-宏任务和微任务" aria-hidden="true">#</a> 03 宏任务和微任务</h2>
<p>上面我们知道有同步任务和异步任务，那么异步任务里面到底是如何分类呢？其实异步任务是包含宏任务和微任务，他们会加在同一个队列里面，只是执行顺序不一样而已。</p>
<p><img src="@source/blog/eventLoop/img/2.jpg" alt=""></p>
<p><strong><font color="orange">宏任务</font></strong>：整体代码script、setTimeout、setInterval、setImmediate</p>
<p><strong><font color="orange">微任务</font></strong>：原生Promise中then方法、process.nextTick、MutationObserver</p>
<p>对于宏任务和微任务我们只要记住以上几种就好。</p>
<p>我们重点来了解一下setTimeout的执行过程：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'执行console'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据事件循环的过程我们知道程序先执行打印操作然后再执行定时器，但是我们稍微修改一下函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">task</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span>
<span class="token comment">//假设此处同步任务执行时间10秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们就发现并不会在3秒后执行task()回调函数，而是会等待10秒时间执行完毕后再执行task()任务。我们来分析一下：</p>
<ul>
<li>task()异步任务进入到 <strong><font color="orange">Event Table</font></strong> 并注册回调事件，开始计时</li>
<li>执行同步任务</li>
<li>经过3秒，task()进入事件队列（此时task并不能立刻执行）</li>
<li>经过10秒后，task()从事件队列中取出放到主线程执行</li>
</ul>
<p>关于setTimeout要补充的是，即便主线程为空，<strong><font color="orange">setTimeout(fn,0)</font></strong>，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。关于setInterval( fn , ms )来说并不是每隔ms就会执行一遍，而是经过ms后**<font color="orange">回调函数</font>**加入事件队列，所以setInterval未必准确。</p>
<p>最后放一道综合的题目：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'3'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'4'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'5'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'6'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'7'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'8'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'9'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'11'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'12'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>整体以script1作为宏任务进入主线程，输出1</li>
<li>遇到setTimeout，回调函数分到**<font color="orange">宏任务队列</font>**中，记为s1</li>
<li>遇到process.nextTick()，回调函数分到**<font color="orange">微任务队列</font>**中，记为p1</li>
<li>遇到promise，直接输出7，then回调函数放置到**<font color="orange">微任务队列</font>**，记为t1</li>
<li>遇到setTimeout，回调函数分配到**<font color="orange">宏任务队列</font>**，记为s2</li>
<li>结束第一轮事件循环</li>
</ul>
<p><img src="@source/blog/eventLoop/img/1.png" alt=""></p>
<p>由于微任务先于宏任务执行，此时输出 1 7 6 8，然后开启第二轮事件循环。从setTimeout1开始。</p>
<ul>
<li>遇到同步任务，打印 2</li>
<li>遇到process，放到**<font color="orange">微任务队列</font>**，记为p2</li>
<li>遇到promise，打印同步任务输出 4</li>
<li>遇到then任务，放到**<font color="orange">微任务队列</font>**，记为t2</li>
</ul>
<p><img src="@source/blog/eventLoop/img/2.png" alt=""></p>
<p>第二轮宏任务结束，执行微任务p2，t2。输出 3 、5。然后开启第三轮事件循环，从setTimeout2开始。</p>
<ul>
<li>遇到同步任务，打印 9</li>
<li>遇到process，放到微任务队列，记为 p3</li>
<li>遇到promise，打印同步任务输出 11</li>
<li>遇到then任务，放到**<font color="orange">微任务队列</font>**，记为 t3</li>
</ul>
<p><img src="@source/blog/eventLoop/img/3.png" alt=""></p>
<p>第三轮宏任务结束，执行微任务p3，t3，输出 10 、12。到此，三轮事件循环结束。输出顺序为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1，7，6，8，2，4，3，5，9，11，10，12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_04-node中的事件循环" tabindex="-1"><a class="header-anchor" href="#_04-node中的事件循环" aria-hidden="true">#</a> 04 Node中的事件循环</h2>
<p><img src="@source/blog/eventLoop/img/node.png" alt=""></p>
<p>不过，在外部输入数据到来时，是从poll阶段开始的，即：</p>
<blockquote>
<p>外部数据 -&gt; poll -&gt; check -&gt; close callbacks -&gt; timer -&gt; I/O callbacks
-&gt; idle,prepare -&gt; poll ...</p>
</blockquote>
<p>而这些阶段的功能大致如下：</p>
<ul>
<li>timer：执行定时器队列中的回调（如setTimeout、setInterval）</li>
<li>I/O callbacks：执行除了close事件、定时器、setImmediate之外的所有的回调</li>
<li>idel,prepare：仅内部使用，无需理会</li>
<li>poll：等待新的I/O事件，在一些特殊情况下，会阻塞在这里</li>
<li>check：专门执行setImmediate中的回调</li>
<li>close callbacks：执行close事件的回调，如socket.on('close', ...)</li>
</ul>
<h5 id="_1、各个阶段详解" tabindex="-1"><a class="header-anchor" href="#_1、各个阶段详解" aria-hidden="true">#</a> <strong>1、各个阶段详解</strong></h5>
<p><strong><font color="orange">timer阶段</font></strong>
这个阶段会以先进先出的顺序执行所有到期后加入到timer queue里的回调（这些回调是通过setTimeout或者setInterval设置的）</p>
<p><strong><font color="orange">I/O callback阶段</font></strong>
这个阶段主要执行大部分的I/O事件回调，包括为操作系统执行的一些回调（如TCP连接出错时，通过callback拿到错误信息）</p>
<p><strong><font color="orange">poll阶段</font></strong>
V8引擎将JS代码解析后传入libuv，循环首先进入poll阶段，此后：</p>
<ul>
<li>检查poll queue中是否有事件，有任务就按先进先出的顺序依次执行回调</li>
<li>poll queue为空时，检查是否有setImmediate的callback，有则进入check阶段执行setImmediate的回调</li>
<li>检查是否有到期的timer，如果有，按timer的到期顺序放到timer queue中，此后进入到timer阶段时，执行timer queue中的回调</li>
<li>如果setImmediate和timer的队列都是空的，则事件循环停留在poll阶段，直到有I/O事件返回，事件循环才立即进入I/O callbacks阶段，并且立即执行回调</li>
</ul>
<p><strong><font color="orange">check阶段</font></strong>
本阶段专门用来执行setImmediate()的回调，当poll进入空闲状态，且setImmediate queue不为空时，事件循环会进入该阶段</p>
<p><strong><font color="orange">close阶段</font></strong>
当一个socket连接或一个handle被突然关闭时（如调用了socket.destroy()），close事件会被发送到这个阶段执行回调，否则事件会用process.nextTick()方法发送出去</p>
<h5 id="_2、process-nexttick" tabindex="-1"><a class="header-anchor" href="#_2、process-nexttick" aria-hidden="true">#</a> <strong>2、process.nextTick</strong></h5>
<p>虽然没有专门一个阶段来执行nextTick，但是存在一个nextTick queue，在事件循环 准备进入下一个阶段 前会先检查nextTick queue是否为空，不为空则需要等执行清空。
所以，如果错误地使用process.nextTick，会导致node进入死循环</p>
<h2 id="_05-小结" tabindex="-1"><a class="header-anchor" href="#_05-小结" aria-hidden="true">#</a> 05 小结</h2>
<p>在Node方面可能会有一些情况与JavaScript中不同，我们要注意区分这些情况。通过总结这一次的事件循环，我们应该会彻底了解事件的执行顺序，下次遇到这一类的题目就会迎刃而解。</p>
<p><strong><font color="green">参考文章</font></strong></p>
<ul>
<li>
<p>JS事件循环机制（Event loop）之宏任务/微任务</p>
</li>
<li>
<p>彻底理解JavaScript中的Event loop</p>
</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
