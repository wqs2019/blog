<template><div><h1 id="一次读懂flex布局" tabindex="-1"><a class="header-anchor" href="#一次读懂flex布局" aria-hidden="true">#</a> 一次读懂flex布局</h1>
<blockquote>
<p>千里之行，始于足下。——老子</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>前端的页面布局，在之前那是颇为头疼，一个简单的水平垂直居中可能要写上不少代码，但是现在利用一种新的布局方式，三行代码就可以实现。可以说，flex布局是未来布局的首选方案，且兼容性对各大浏览器都良好。</p>
<h2 id="_02-主轴属性" tabindex="-1"><a class="header-anchor" href="#_02-主轴属性" aria-hidden="true">#</a> 02 主轴属性</h2>
<p>当容器设置为flex布局之后，可以对里面的各个元素采用不同的排列方式。对于采用flex布局的容器，可以使用以下属性。</p>
<ul>
<li>flex-direction</li>
<li>flex-wrap</li>
<li>flex-flow</li>
<li>justify-content</li>
<li>align-items</li>
<li>align-content</li>
</ul>
<p><img src="@source/blog/flexLayout/img/1.png" alt=""></p>
<p>一个容器默认会存在主轴（main axis）和交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。</p>
<p>基本节点结构</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>A<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>B<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>C<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>D<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item5<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>E<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="flex-direction" tabindex="-1"><a class="header-anchor" href="#flex-direction" aria-hidden="true">#</a> <strong>flex-direction</strong></h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span><span class="token punctuation">{</span>
   <span class="token property">flex-direction</span><span class="token punctuation">:</span> row | row-reverse | column | column-reverse<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，我们的属性值是row，按行排列。</p>
<p><strong>row</strong></p>
<p><img src="@source/blog/flexLayout/img/row.png" alt=""></p>
<p><strong>row-reverse</strong></p>
<p><img src="@source/blog/flexLayout/img/rowreverse.png" alt=""></p>
<p><strong>column / column-reverse</strong></p>
<p><img src="@source/blog/flexLayout/img/col.png" alt=""></p>
<h5 id="flex-wrap" tabindex="-1"><a class="header-anchor" href="#flex-wrap" aria-hidden="true">#</a> <strong>flex-wrap</strong></h5>
<p>默认情况下，容器内部的item都排在主轴上。该属性定义如果轴线排不下的时候该如何换行。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span><span class="token punctuation">{</span>
  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> nowrap | wrap | wrap-reverse<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下是不换行，nowrap。下面展示换行wrap和反向换行的情况。</p>
<p>wrap</p>
<p><img src="@source/blog/flexLayout/img/wrap.png" alt=""></p>
<p>wrap-reverse</p>
<p><img src="@source/blog/flexLayout/img/wrapre.png" alt=""></p>
<h5 id="flex-flow" tabindex="-1"><a class="header-anchor" href="#flex-flow" aria-hidden="true">#</a> <strong>flex-flow</strong></h5>
<p>该属性是flex-direction和flex-wrap的简写方式（一般不用关注）</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">//默认 flex-flow: row nowrap
.box</span> <span class="token punctuation">{</span>
   <span class="token property">flex-flow</span><span class="token punctuation">:</span> flex-direction flex-wrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="justify-content" tabindex="-1"><a class="header-anchor" href="#justify-content" aria-hidden="true">#</a> <strong>justify-content</strong></h5>
<p>该属性定义了item是如何在主轴上排列</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-start | flex-end | center | space-between | space-around<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下是flex-start</p>
<p>flex-start</p>
<p><img src="@source/blog/flexLayout/img/flexstart.png" alt=""></p>
<p>flex-end</p>
<p><img src="@source/blog/flexLayout/img/flexend.png" alt=""></p>
<p>space-between</p>
<p><img src="@source/blog/flexLayout/img/spaceb.png" alt=""></p>
<p>space-around</p>
<p><img src="@source/blog/flexLayout/img/spacearound.png" alt=""></p>
<p>center</p>
<p><img src="@source/blog/flexLayout/img/center.png" alt=""></p>
<h5 id="align-items" tabindex="-1"><a class="header-anchor" href="#align-items" aria-hidden="true">#</a> <strong>align-items</strong></h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> flex-start | flex-end | center | baseline | stretch<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>flex-start / stretch / baseline</p>
<p><img src="@source/blog/flexLayout/img/baseline.png" alt=""></p>
<p>center</p>
<p><img src="@source/blog/flexLayout/img/center2.png" alt=""></p>
<p>flex-end</p>
<p><img src="@source/blog/flexLayout/img/flexend2.png" alt=""></p>
<h5 id="align-content" tabindex="-1"><a class="header-anchor" href="#align-content" aria-hidden="true">#</a> <strong>align-content</strong></h5>
<p><img src="@source/blog/flexLayout/img/640.gif" alt=""></p>
<p>由于自己写出来的效果不直观，所以就使用官网的例子来进行演示。注意此属性对于单行的弹性盒子模型无效，即 flex-wrap : nowrap</p>
<h2 id="_03-交叉轴属性" tabindex="-1"><a class="header-anchor" href="#_03-交叉轴属性" aria-hidden="true">#</a> 03 交叉轴属性</h2>
<p>交叉轴上面可以运用的属性有以下6种：</p>
<ul>
<li>order</li>
<li>flex-grow</li>
<li>flex-shrink</li>
<li>flex-basis</li>
<li>flex</li>
<li>align-self</li>
</ul>
<h5 id="order" tabindex="-1"><a class="header-anchor" href="#order" aria-hidden="true">#</a> <strong>order</strong></h5>
<p>order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">order</span><span class="token punctuation">:</span> &lt;integer><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给H添加 order : -1</p>
<p><img src="@source/blog/flexLayout/img/H.png" alt=""></p>
<h5 id="flex-grow" tabindex="-1"><a class="header-anchor" href="#flex-grow" aria-hidden="true">#</a> <strong>flex-grow</strong></h5>
<p>该属性是指当子元素总宽度和比盒子宽度小的时候，子元素该如何瓜分父元素剩余宽度。下面是分别给ABCD四个元素的flex-grow设置为1，2，3，3</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">flex-grow</span><span class="token punctuation">:</span> &lt;number><span class="token punctuation">;</span> <span class="token comment">/* default 0 */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blog/flexLayout/img/flexgrow.png" alt=""></p>
<p>那么元素是如何获得占比值呢？元素实际宽度又是多少呢？</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>子容器宽度总和为1800（500+400+300+800），（盒子宽度2100）剩余空间为100
A元素的占比：1/(1+2+3+3) = 0.111
A元素的占比值：100*0.111=11.1
A的实际宽度：500 + 11.1 = 511.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="flex-shrink" tabindex="-1"><a class="header-anchor" href="#flex-shrink" aria-hidden="true">#</a> <strong>flex-shrink</strong></h5>
<p>该属性是指当子元素总宽度和比盒子宽度大的时候，子元素该如何压缩自己适应父元素宽度。下面是分别给ABCD四个元素的flex-shrink设置为1，2，3，2</p>
<p>计算结果如下：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>子容器宽度总和为1800，溢出空间为200
总压缩：500 * 1 + 400 * 2 + 300 * 3 +800 * 2= 3800
A的压缩率：500*1 / 3800 = 0.132
A的压缩值：200 * 0.132 = 26.4
A的实际宽度：500 - 26.4 = 473.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blog/flexLayout/img/flexs.png" alt=""></p>
<h5 id="flex-basis" tabindex="-1"><a class="header-anchor" href="#flex-basis" aria-hidden="true">#</a> <strong>flex-basis</strong></h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>MDN定义：指定了 flex 元素在主轴方向上的初始大小
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>项目（item）放进盒子之前，给出一个初始宽度，默认值为auto，即项目本身的实际宽度，浏览器会根据 flex-basis 计算主轴是否有剩余空间。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">flex-basis</span><span class="token punctuation">:</span> &lt;length> | auto<span class="token punctuation">;</span> <span class="token comment">/* default auto */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的值可以与项目的width一样，项目会按此宽度占据。通过设置with和max-width以及flex-basis，他们是有优先级关系的，我把A的width设置为400，flex-basis设置为500，max-width设置为600，通过浏览器依次去掉宽度属性值，得出一下结论：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>max-width/min-width > flex-basis > width > box
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/blog/flexLayout/img/640(1).gif" alt=""></p>
<h5 id="flex" tabindex="-1"><a class="header-anchor" href="#flex" aria-hidden="true">#</a> <strong>flex</strong></h5>
<p>flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> none | [ &lt;<span class="token string">'flex-grow'</span>> &lt;<span class="token string">'flex-shrink'</span>> &lt;<span class="token string">'flex-basis'</span>> ]
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>平时写代码直接可以把属性分开来就好，一般不用记住简写方式。但面试可能会考到是哪几种属性简写，还是记下来的好。</p>
<h5 id="align-self" tabindex="-1"><a class="header-anchor" href="#align-self" aria-hidden="true">#</a> <strong>align-self</strong></h5>
<p>align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">align-self</span><span class="token punctuation">:</span> auto | flex-start | flex-end | center | baseline | stretch<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处我给项目B单独设置align-self属性</p>
<p>auto | flex-start | flex-end | baseline</p>
<p><img src="@source/blog/flexLayout/img/self.png" alt=""></p>
<p>center</p>
<p><img src="@source/blog/flexLayout/img/center3.png" alt=""></p>
<p>flex-end</p>
<p><img src="@source/blog/flexLayout/img/end.png" alt=""></p>
<h2 id="_04-小结" tabindex="-1"><a class="header-anchor" href="#_04-小结" aria-hidden="true">#</a> 04 小结</h2>
<p>flex布局属性可以快速满足我们日常开发的常见布局需要，解决使用定位、浮动等影响其他元素的属性。目前该属性可以支持主流的浏览器，可放心使用。</p>
<p><img src="@source/blog/flexLayout/img/bro.png" alt=""></p>
<p>比如面试官会问你如何实现水平垂直居中的时候你就可以使用flex布局，简单快速：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item1</span> <span class="token punctuation">{</span>
     <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
     <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
     <span class="token property">background-color</span><span class="token punctuation">:</span> orange<span class="token punctuation">;</span>
     <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
     <span class="token property">line-height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
     <span class="token property">font-size</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
     <span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
     <span class="token property">height</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
     <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
     <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
     <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
     <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blog/flexLayout/img/mi.png" alt=""></p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
