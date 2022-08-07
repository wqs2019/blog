<template><div><h1 id="总结es6中set和map数据结构的区别" tabindex="-1"><a class="header-anchor" href="#总结es6中set和map数据结构的区别" aria-hidden="true">#</a> 总结ES6中Set和Map数据结构的区别</h1>
<blockquote>
<p>面试官：你说一下ES6中的数据结构set和map吧！除了这个你还知道WeakSet和WeakMap吗？</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>我们刚开始学习ES6的时候肯定会对这两种数据结构感到奇怪，甚至想着这两种数据结构有什么用呀？难道我们平时的栈和队列不够用吗？</p>
<p>处于一开始没法理解的我们肯定是先背为敬。当我们逐渐接触的多了，想着数组去重的简便写法的时候这个Set又重新出现在我们的面前。原来这个Set是一个集合，高中我们就学过，集合具有唯一性的特点，这才明白了Set的用意。而Map表面上是地图的意思，地图本就有一一对应的特点，就如我们的字典一样，就是字典的数据结构。</p>
<h2 id="_02-set" tabindex="-1"><a class="header-anchor" href="#_02-set" aria-hidden="true">#</a> 02 Set</h2>
<p>Set数据结构是一个类似于数组，但是与数组不同的是它具有唯一性，里面的元素都是不重复的，而且他本身也是一个构造函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> SetArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span>SetArr<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>SetArr<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">=></span>
<span class="token number">0</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token number">1</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token number">2</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token literal-property property">__proto__</span><span class="token operator">:</span> Set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，打印出来的SetArr就变成了唯一的元素了，而且它也具有长度且还有原型，出于好奇我们就打开原型看一下：</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/1b0f852d-9afa-496f-8044-898d27846620.png" alt=""></p>
<p>不出我们所料，它具有一系列的方法，比如我们刚刚使用的add方法都在里面。我们具体来解释一下每个属性和方法：</p>
<p><strong>实例属性</strong></p>
<ul>
<li>constructor：构造函数，就是Set函数</li>
<li>size：返回的是set实例的长度</li>
</ul>
<p><strong>实例方法</strong></p>
<ul>
<li>add(value):往Set里面添加值，返回Set本身</li>
<li>delete(value)：删除某个值，返回布尔值判断是否成功</li>
<li>has(value):判断是否含有value值，返回布尔值</li>
<li>clear():清除Set里面的所有值，无返回值</li>
</ul>
<p><strong>遍历方法</strong></p>
<p>Set数据结构也提供了4个遍历方法，可用于遍历里面的成员</p>
<ul>
<li>forEach():使用回调函数遍历元素</li>
<li>entries():返回键值对的遍历器,用于遍历[键名，键值]组成的数组</li>
<li>values():返回键值遍历器,用于遍历所有键值</li>
<li>keys():返回键名遍历器,用于遍历所有键名</li>
</ul>
<p>看一下我们好像找不出他们的却别，接下来举一个小例子，大家就会明白的。由于Set结构是只有键值的结构，所有keys方法与values方法返回一致。</p>
<p><code v-pre>forEach</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
s<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span><span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//2 3 4 5 6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>entries</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">,</span><span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> s<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">]</span>
<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">]</span>
<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>values</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">,</span><span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> s<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
a
b
c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>keys</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">,</span><span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> s<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
a
b
c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用Set结构实现交并差</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//交集</span>
<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span>b<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//并</span>
<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token operator">...</span>b<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">//差</span>
<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span>！b<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_03-weakset" tabindex="-1"><a class="header-anchor" href="#_03-weakset" aria-hidden="true">#</a> 03 WeakSet</h2>
<p>从字面上的意思看来，它是一个弱的Set结构，具体的弱体现在WeakSet的成员只能是对象，还有一个就是WeakSet的对象都是弱引用，即<code v-pre>垃圾回收机制不考虑WeakSet对该对象的引用</code>。也就是说WeakSet里面的引用都不计入垃圾回收机制。</p>
<p>除了定义不同之外，WeakSet<code v-pre>没有size属性</code>，也<code v-pre>不可以进行遍历操作</code>，因为它随时会消失，成员不适合引用。如果垃圾回收机制运行过后，成员个数可能不一样。</p>
<p><strong>方法</strong>
由于它不可以进行遍历操作，所以遍历的方法都没有了，只有实例方法。</p>
<ul>
<li>add():向WeakSet添加新成员</li>
<li>delete():删除WeakSet的成员</li>
<li>has():判断WeakSet是否含有某个元素</li>
</ul>
<h2 id="_04-map" tabindex="-1"><a class="header-anchor" href="#_04-map" aria-hidden="true">#</a> 04 Map</h2>
<p>上面我们讲到的Set结构是没有键的只有值，而Map结构是键值的组合，这里就解决了我们以往只能使用字符串作为键的限制。也就是说我们可以使用各种的数据类型（或者对象）作为键。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'alan'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">'这是一些描述'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们同样也可以打印一下map里面到底有什么内容，除了与Set一样的方法之外，我们可以看到多了get和set方法。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/383ffce0-fe1a-4fb5-9896-7b2f45d6e7aa.png" alt=""></p>
<p><strong>属性</strong></p>
<ul>
<li>constructor：Map构造函数</li>
<li>size：Map元素长度</li>
</ul>
<p><strong>实例方法</strong></p>
<ul>
<li>set(key, value):设置key所对应的value值</li>
<li>get(key):获取key所对应的value值，若无则undefined</li>
<li>has(key)：是否含有某个键</li>
<li>delete(key):删除某个键，如删除失败返回false</li>
<li>clear():清除所有成员</li>
</ul>
<p><strong>遍历方法</strong></p>
<ul>
<li>forEach():使用回调函数遍历成员</li>
<li>entries():返回所有成员遍历器</li>
<li>keys():返回键名遍历器</li>
<li>values():返回键值遍历器</li>
</ul>
<p><code v-pre>entries</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'alan'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> person<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgkr.cn-bj.ufileos.com/7a22019c-3a0e-4fdf-9980-04f7e394b6c1.png" alt=""></p>
<p><code v-pre>keys</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'alan'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> person<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//name</span>
<span class="token comment">//age</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>values</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'alan'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> person<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//alan</span>
<span class="token comment">//20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>与其他数据结构转换</code></p>
<ul>
<li>Map转数组</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'alan'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">...</span>person<span class="token punctuation">)</span>
<span class="token comment">//[['name','alan'],['age','20']]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>数组转Map</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'alan'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//Map(2) {"name" => "alan", "age" => "20"}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Map转对象</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token string">'alan'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token parameter">map</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span>value<span class="token punctuation">]</span> <span class="token keyword">of</span> map<span class="token punctuation">)</span><span class="token punctuation">{</span>
    obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token operator">=</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> obj
<span class="token punctuation">}</span>
<span class="token function">swap</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//{name: "alan", age: "20"}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>对象转Map</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span><span class="token punctuation">{</span><span class="token string-property property">'name'</span><span class="token operator">:</span><span class="token string">'alan'</span><span class="token punctuation">,</span><span class="token string-property property">'age'</span><span class="token operator">:</span><span class="token string">'20'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> map
<span class="token punctuation">}</span>
<span class="token function">swap</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgkr.cn-bj.ufileos.com/5204fd4d-e664-4aa7-9d4e-a89a3dbe1a54.png" alt=""></p>
<h2 id="_05-weakmap" tabindex="-1"><a class="header-anchor" href="#_05-weakmap" aria-hidden="true">#</a> 05 WeakMap</h2>
<p>WeakMap与Map一样可以生成键值对的集合，但是也有不同的地方，主要是有以下的两点：</p>
<ul>
<li>WeakMap只接受对象作为键名（不包括null）</li>
<li>键名所指向的对象不计入垃圾回收机制</li>
</ul>
<p>与WeakSet相似，WeakMap也是没有遍历的操作，也没有size属性，没有办法列出所有键名（由于垃圾回收机制的运行），也不能清空。</p>
<p><strong>实例方法</strong></p>
<ul>
<li>get()</li>
<li>set()</li>
<li>has()</li>
<li>delete()</li>
</ul>
<h2 id="_06-小结" tabindex="-1"><a class="header-anchor" href="#_06-小结" aria-hidden="true">#</a> 06 小结</h2>
<p>通过这一次的总结，大家应该对这几种数据结构有了大概的认识，也知道他们之间的不同。之前我们学习的时候往往会忽略WeakSet和WeakMap的理解，也不知道它们与垃圾回收机制的关系。正是以你为弱引用的关系，使得这两个数据的结构可以用于避免内存泄露的情况。</p>
<p><img src="@source/blog/common/2.gif" alt=" "></p>
</div></template>
