<template><div><h1 id="object-create-函数浅析" tabindex="-1"><a class="header-anchor" href="#object-create-函数浅析" aria-hidden="true">#</a> Object.create()函数浅析</h1>
<blockquote>
<p>创建对象的方式，里面的窍门你知道吗</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=" "></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>不知道大家是否知道创建对象有多少种方法呢？我们通常创建对象都是以字面量的形式，以 var o = { } 的方式创建的对象是会连接到Object的原型上面，但是我们要是想创建一个我们自定义的对象怎么办呢？这就要使用到我们接下来讲解的 Object.create()方法了。</p>
<p><img src="@source/blog/createNull/img/1.jpg" alt=" "></p>
<h2 id="_02-object-create" tabindex="-1"><a class="header-anchor" href="#_02-object-create" aria-hidden="true">#</a> 02 Object.create()</h2>
<p>在MDN上面的定义是：</p>
<blockquote>
<p>Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__ proto __</p>
</blockquote>
<p>该方法可以接收两个参数：</p>
<ul>
<li>
<p>proto：新创建对象的原型对象</p>
</li>
<li>
<p>propertiesObject：自身定义的属性，具体如下</p>
<ol>
<li>
<p><code v-pre>configurable</code></p>
<p><code v-pre>true</code> 当且仅当该属性描述符的类型可以被改变并且该属性可以从对应对象中删除。 <strong>默认为 <code v-pre>false</code></strong></p>
</li>
<li>
<p><code v-pre>enumerable</code></p>
<p><code v-pre>true</code> 当且仅当在枚举相应对象上的属性时该属性显现。 <strong>默认为 <code v-pre>false</code></strong></p>
</li>
</ol>
<ul>
<li>
<p><code v-pre>value</code></p>
<p>与属性关联的值。可以是任何有效的JavaScript值（数字，对象，函数等）。 <strong>默认为 <a href=""><code v-pre>undefined</code></a>.</strong></p>
</li>
<li>
<p><code v-pre>writable</code></p>
<p><code v-pre>true</code>当且仅当与该属性相关联的值可以用<a href="">赋值运算符</a>改变时。 <strong>默认为 <code v-pre>false</code></strong></p>
</li>
<li>
<p><code v-pre>get</code></p>
<p>作为该属性的 getter 函数，如果没有 getter 则为<a href=""><code v-pre>undefined</code></a>。函数返回值将被用作属性的值。 <strong>默认为 <a href=""><code v-pre>undefined</code></a></strong></p>
</li>
<li>
<p><code v-pre>set</code></p>
<p>作为属性的 setter 函数，如果没有 setter 则为<a href=""><code v-pre>undefined</code></a>。函数将仅接受参数赋值给该属性的新值。 <strong>默认为 <a href=""><code v-pre>undefined</code></a></strong></p>
</li>
</ul>
</li>
</ul>
<p>我们通过使用对象字面量和Object.create()方法看一下有什么区别，下面是普通字面量的形式创建的空对象，可见对象本身是继承了Object的，可以调用类似 toString()等相关方法。</p>
<p><img src="@source/blog/createNull/img/2.png" alt=" "></p>
<p>那么如果我们创建的对象不去继承属性怎么办呢？当我们创建的时候发现对象显示 No properties ，也就是说这是一个什么也没有的干净对象，我们是可以自定义toString等相关方法的。</p>
<p><img src="@source/blog/createNull/img/3.png" alt=" "></p>
<p>使用null作为参数就等于切断了与Object的原型链了，这样创建出来的对象是没有继承关系的。我们都知道Object的原型最终是指向 Null 的，所以一开始创建的原型就直接指向 null ，没有经过层层的原型链。我们来看一下原型与原型链的关系就知道了。</p>
<p><img src="@source/blog/createNull/img/4.png" alt=" "></p>
<h2 id="_03-小结" tabindex="-1"><a class="header-anchor" href="#_03-小结" aria-hidden="true">#</a> 03 小结</h2>
<p>所以我们知道这是一个高度可定制的对象，你可以用它来做数据字典，但是如果是对对象本身没有什么要求的话就使用普通字面量的形式创建即可。从一个小的知识点可以引申出JavaScript庞大的知识体系，不论是什么都要好好总结基础的东西。</p>
<p><strong><font color="green">参考文章</font></strong>：</p>
<ul>
<li>详解Object.create(null)</li>
<li>MDN Object.create()</li>
</ul>
<p><img src="@source/blog/common/2.gif" alt=" "></p>
</div></template>
