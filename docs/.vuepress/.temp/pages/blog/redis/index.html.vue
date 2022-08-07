<template><div><blockquote>
<p>Redis的知识其实已经是后端要掌握的技术，但是之前笔者使用过Redis做一些缓存，主要是存储用户的登录信息seesion，我觉得这个东西其实是很有用的，所以今天就深入一点看一下具体的用法。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>目前自己能想到的Redis的作用很局限，毕竟自己也没有用过其他的高级特性，其实不仅可以用于缓存，还可以用于做一些排行榜/计数、session共享、消息队列以及发布订阅等。</p>
<p>Redis的应用场景非常广泛，虽然Redis是一个key-value的内存数据库，但在实际场景中，简单key-value就非常有用，如面对数据高并发的读写、海量数据的读写等这些其实都是网站的简单但是非常重要的功能，我觉得还是有必要了解一些关于redis的事情和相关知识点。</p>
<h2 id="_02-redis数据类型" tabindex="-1"><a class="header-anchor" href="#_02-redis数据类型" aria-hidden="true">#</a> 02 redis数据类型</h2>
<p>redis是一种支持Key-Value等多种数据结构的存储系统，可用于多种业务场景。提供字符串、哈希、列表、队列、集合结构直接存取。</p>
<p><strong>数据类型</strong></p>
<ul>
<li>string(字符串)</li>
<li>list(列表)</li>
<li>hash(散列)</li>
<li>set(集合)</li>
<li>zset(有序集合)</li>
</ul>
<p><code v-pre>string</code></p>
<p>Redis所有的数据结构都是以唯一的key字符串作为名称，通过key来获取相应数据。Redis 的字符串是动态字符串，是可以修改的字符串，内部为当前字符串实际分配的空间 capacity 一般要高于实际字符串长度 len。常见命令：</p>
<ul>
<li>set:设置一个键值对，如 set name alan</li>
<li>get:获取键值，如get name</li>
<li>exists:是否存在键名，如exists name</li>
<li>del:删除键名，如del name</li>
<li>expire:设置过期时间，如expire name 5，5s后过期</li>
</ul>
<p><code v-pre>list</code></p>
<p>list是一个列表，它可以提供常见的栈和队列的形式，不同的是你操作的方法。当元素操作之后便会弹出且会自动删除，内存就会被回收，常用与异步队列的使用。常见命令：</p>
<ul>
<li>rpush:从右边进入，如rpush subject Chinese Math English</li>
<li>llen:查看长度，如llen subject</li>
<li>lpop:左边弹出，如lpop subject,就会弹出Chinese</li>
<li>rpop:右边弹出，如rpop subject,就会弹出English</li>
</ul>
<p><code v-pre>hash</code></p>
<p>Redis 的字典相当于 Java 语言里面的 HashMap，它是无序字典。内部实现结构上同Java 的 HashMap 也是一致的，同样的数组 + 链表二维结构。常见命令：</p>
<ul>
<li>hset:用于为哈希表中的字段赋值，如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作，如果字段已经存在于哈希表中，旧值将被覆盖，如hset myhash field1 &quot;foo&quot;</li>
<li>hget:用于返回哈希表中指定字段的值，如hget myhash field1</li>
<li>hexists:用于查看哈希表的指定字段是否存在，如hexists myhash field1</li>
<li>hdel:用于删除哈希表 key 中的一个或多个指定字段，不存在的字段将被忽略，如hdel myhash field1</li>
<li>hgetall:用于返回哈希表中，所有的字段和值,返回值里，紧跟每个字段名之后是字段的值</li>
</ul>
<p><code v-pre>set</code></p>
<p>set是String类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。</p>
<ul>
<li>sadd:将一个或多个成员元素加入到集合中，已经存在于集合的成员元素将被忽略</li>
<li>sinter:返回给定所有给定集合的交集</li>
<li>sunion:返回给定集合的并集</li>
<li>smembers:返回集合中的所有的成员</li>
<li>sdiff:返回给定集合之间的差集，差集的结果来自前面的KEY ,而不是后面的KEY</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>key1 = {a,b,c,d}
key2 = {c}
key3 = {a,c,e}
SDIFF key1 key2 key3 = {b,d}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>zset</code></p>
<p>Redis 有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。常见方法：</p>
<ul>
<li>zadd:用于将一个或多个成员元素及其分数值加入到有序集当中</li>
<li>zrange:返回有序集中，指定区间内的成员，其中成员的位置按分数值递增(从小到大)来排序</li>
<li>zrevrange:返回有序集中，指定区间内的成员，其中成员的位置按分数值递减(从大到小)来排列</li>
<li>zcard:用于计算集合中元素的数量</li>
<li>zrem:用于移除有序集中的一个或多个成员，不存在的成员将被忽略</li>
</ul>
<h2 id="_03-发布订阅模式" tabindex="-1"><a class="header-anchor" href="#_03-发布订阅模式" aria-hidden="true">#</a> 03 发布订阅模式</h2>
<p><strong>安装及启动redis</strong></p>
<p>安装redis的步骤很简单，去官网安装，直接下一步即可。安装完成之后我们进到redis的目录，启动redis服务就可以了。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-server.exe redis.windows.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://imgkr.cn-bj.ufileos.com/be9f4cd4-a6f5-4e94-93ee-fb33a633fb03.png" alt="redis服务已经启动且监听6379端口"></p>
<p><strong>开启redis客户端</strong></p>
<p>我们在该目录下再起两个窗口，一个用来发布消息，一个用来订阅消息。输入<code v-pre>redis-cli.exe -h 127.0.0.1 -p 6379</code>就可以进入redis客户端了。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/b9f77123-b3bc-4fa3-8d42-f7e815b59f20.gif" alt="左边进行订阅，右边进行发布"></p>
<h2 id="_04-小结" tabindex="-1"><a class="header-anchor" href="#_04-小结" aria-hidden="true">#</a> 04 小结</h2>
<p>关于redis的基础知识其实还有很多，这里就不多介绍了。大家平时可以去官网或者菜鸟看一下。最近心生倦意，行文比较匆忙，当品茶一杯以清静心灵，就此落笔。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
