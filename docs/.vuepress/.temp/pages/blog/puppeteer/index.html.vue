<template><div><h1 id="如何结合node和puppeteer做网络爬虫" tabindex="-1"><a class="header-anchor" href="#如何结合node和puppeteer做网络爬虫" aria-hidden="true">#</a> 如何结合Node和Puppeteer做网络爬虫</h1>
<blockquote>
<p>相信大家都听说过爬虫，我们也听说过Python是可以很方便地爬取网络上的图片，但是奈何本人不会Python，就只有通过Node来实践一下了。</p>
</blockquote>
<p><img src="https://imgkr.cn-bj.ufileos.com/03fb95a7-8bc3-4d74-9b4f-34d443662d14.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<h3 id="何谓爬虫" tabindex="-1"><a class="header-anchor" href="#何谓爬虫" aria-hidden="true">#</a> 何谓爬虫</h3>
<p>其实爬虫用很官方的语言来描述就是“自动化浏览网络程序”，我们不用手动去点击、去下载一些文章或者图片。大家或许用过抢票软件，其实就是不断地通过软件访问铁路官方的接口，达到抢票的效果。但是，这类抢票软件是违法的。</p>
<p>那么怎么判断爬虫是不是违法呢？关于爬虫是否非法其实没有很明确的说法，一直都是中立的态度。爬虫是一种技术，技术本身没有违法的。但是你使用这种技术去爬取不正当的信息、有版权的图片等用于商用，那么你就是违法了。其实我们只要在使用爬虫技术的时候不要去爬个人隐私信息，不要爬取有版权的图片，最重要的是信息不要用于商业化的行为，爬虫不得干扰网站的正常运行等。</p>
<p>说了这么多其实就是要大家谨慎使用这一项技术。</p>
<h3 id="怎么爬" tabindex="-1"><a class="header-anchor" href="#怎么爬" aria-hidden="true">#</a> 怎么爬</h3>
<p>我查了一下资料，使用Node做爬虫的话其实有很多的途径，很多人比较喜欢的就是使用cheerio以及request来爬取。但是我也发现了一个比较好用的工具就是puppeteer，这一项技术是谷歌官方提供的一款工具。<code v-pre>它其实就是把人来做的事情变成了调用接口来实现</code>。看了一下官方的文档，主要可以实现以下的功能：<a href="https://github.com/puppeteer/puppeteer" target="_blank" rel="noopener noreferrer">puppeteer官方文档<ExternalLinkIcon/></a></p>
<ul>
<li>生成页面的屏幕截图和PDF。</li>
<li>爬取SPA（单页应用程序）并生成预渲染的内容（即“ SSR”（服务器端渲染））。</li>
<li>自动执行表单提交，UI测试，键盘输入等。</li>
<li>创建最新的自动化测试环境。使用最新的JavaScript和浏览器功能，直接在最新版本的Chrome中运行测试。</li>
<li>捕获站点的时间线跟踪以帮助诊断性能问题。</li>
<li>测试Chrome扩展程序。</li>
</ul>
<p>同时也看了一些同学的评价，觉得这个东西是非常的amazing啊！虽然我还没有深入去了解全部的API，但是也算是懂得大概的流程。大家如果官方的文档看不懂的话可以去B站看一下基本的介绍，<a href="https://space.bilibili.com/306107070/channel/detail?cid=79090" target="_blank" rel="noopener noreferrer">puppeteer系列教程<ExternalLinkIcon/></a>。</p>
<h2 id="_02-安装过程" tabindex="-1"><a class="header-anchor" href="#_02-安装过程" aria-hidden="true">#</a> 02 安装过程</h2>
<h3 id="puppeteer安装" tabindex="-1"><a class="header-anchor" href="#puppeteer安装" aria-hidden="true">#</a> puppeteer安装</h3>
<p>关于这个安装的事情真的是非常的头疼，搞了许久才安装成功。原因就是高高的围墙使得城内的人出不去。所以我们只有换另外一种方法来安装了。</p>
<p>我们直接npm安装的过程<code v-pre>默认是要下载浏览器的</code>，我就是在这里一直卡住然后报错，试了好几次都是这样。经过网友们的介绍我们是可以不用在安装puppeteer的时候下载浏览器的，我们可以<code v-pre>事后才去下载</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm i puppeteer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们这样就可以成功安装puppeteer了，接下来我们就要去手动安装浏览器了。那么我们要去哪里下载呢？<a href="https://npm.taobao.org/mirrors/chromium-browser-snapshots/Win_x64/" target="_blank" rel="noopener noreferrer">我要手动下载<ExternalLinkIcon/></a></p>
<p>这里面非常多的版本号，看了网上的教程我们要选择合适的版本号（不知道随便下载一个可不可以），我们回到项目的根目录下面<code v-pre>node_modules/puppeteer/package.json</code>这个目录，查看一下我们的浏览器版本是多少。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/6334b651-dd9c-4a5b-bc3b-fe3ac83e4ef5.png" alt=""></p>
<p><img src="https://imgkr.cn-bj.ufileos.com/342bed6b-f1af-4a27-8ca9-6466290ee7bb.png" alt=""></p>
<p>我这里就是现实737027的版本号，我们就去手动下载这个浏览器就可以了。大家可以根据自己的版本进行下载。</p>
<h3 id="浏览器引用" tabindex="-1"><a class="header-anchor" href="#浏览器引用" aria-hidden="true">#</a> 浏览器引用</h3>
<p>我们光安装了之后还不行，还要进行<code v-pre>浏览器的引入</code>。这个也是非常的头疼，看了好多的教程都不可以。可能是他们的系统不一样，在这里折腾很久都想放弃了。还好有<a href="https://blog.csdn.net/qq799028706/article/details/88602254" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a>解决了我的问题，我知道是路径有误但我不知道怎么写。</p>
<p>浏览器下载之后我们就解压放到根目录下面，与package.json同级。然后我们在根目录下新建一个index.js文件。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> puppeteer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"puppeteer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"request"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//配置路径，关键！</span>
<span class="token keyword">const</span> pathToExtension <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>
    __dirname<span class="token punctuation">,</span>
    <span class="token string">"./chrome-win/chrome.exe"</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我的项目目录：</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/05e9a136-74cc-4bc2-adc4-c386bb77f0e2.png" alt=""></p>
<h2 id="_03-选择网站" tabindex="-1"><a class="header-anchor" href="#_03-选择网站" aria-hidden="true">#</a> 03 选择网站</h2>
<p>我们都设置好了之后我们就开始选取一个网站进行测试了，我这里就选择了<a href="http://pic.netbian.com/4kfengjing/" target="_blank" rel="noopener noreferrer">这个<ExternalLinkIcon/></a>来爬取图片。</p>
<p>其实我们知道万物皆可爬，只要分析对了就好。前端最熟悉不过的F12走一波就好。看了一下大概结构是长这样的，准备好了之后开始撸码。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/ea8e77e6-aa62-49fe-97f8-32b43abc8393.png" alt=""></p>
<p>反手一写（CV）就出来这样的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> puppeteer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"puppeteer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"request"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span><span class="token comment">//页数</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">netbian</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> pathToExtension <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>
    __dirname<span class="token punctuation">,</span>
    <span class="token string">"./chrome-win/chrome.exe"</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> browser <span class="token operator">=</span> <span class="token keyword">await</span> puppeteer<span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">headless</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">executablePath</span><span class="token operator">:</span> pathToExtension<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token keyword">await</span> browser<span class="token punctuation">.</span><span class="token function">newPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">goto</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">http://pic.netbian.com/4kfengjing/index_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.html</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//为了方便从第二页开始</span>
  <span class="token keyword">let</span> images <span class="token operator">=</span> <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">$$eval</span><span class="token punctuation">(</span><span class="token string">"ul>li>a>img"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token comment">//图片节点，API可查看官方介绍</span>
    el<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">"http://pic.netbian.com"</span> <span class="token operator">+</span> x<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"src"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//获取图片的src地址</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">mkdirSync</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./images</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 存放目录</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>m <span class="token keyword">of</span> images<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">downloadImg</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> <span class="token string">"./images/"</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".jpg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">netbian</span><span class="token punctuation">(</span><span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//下一页，具体结束页可以自己限制</span>
  <span class="token comment">// 关闭</span>
  <span class="token keyword">await</span> browser<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">netbian</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这里执行</span>

<span class="token comment">// 同步创建目录</span>
<span class="token keyword">function</span> <span class="token function">mkdirSync</span><span class="token punctuation">(</span><span class="token parameter">dirname</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">existsSync</span><span class="token punctuation">(</span>dirname<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">mkdirSync</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">dirname</span><span class="token punctuation">(</span>dirname<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fs<span class="token punctuation">.</span><span class="token function">mkdirSync</span><span class="token punctuation">(</span>dirname<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 下载文件 保存图片</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">downloadImg</span><span class="token punctuation">(</span><span class="token parameter">src<span class="token punctuation">,</span> path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> writeStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> readStream <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">request</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> readStream<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>writeStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    readStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"end"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文件下载成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    readStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"错误信息:"</span> <span class="token operator">+</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    writeStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"finish"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文件写入成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      writeStream<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_03-开始爬取" tabindex="-1"><a class="header-anchor" href="#_03-开始爬取" aria-hidden="true">#</a> 03 开始爬取</h2>
<p>我们直接在根目录运行node index.js就可以了。执行之后我们发现多了一个images目录，里面就是我们的图片了。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/45ac33e4-786b-435e-a6f3-2a9c97529b88.png" alt=""></p>
<h2 id="_04-小结" tabindex="-1"><a class="header-anchor" href="#_04-小结" aria-hidden="true">#</a> 04 小结</h2>
<p>其实关于puppeteer的使用还有很多，这里我只是介绍了爬虫是怎么用的而已。正如我们操作浏览器一样，我们也可以使用对应的API来实现，本人也是刚开始，后面还要慢慢去探讨这一项技术。我们其实不能保证网站的结构不改变，其实改变了我们就跟着变就好。</p>
<p>项目代码：<a href="https://github.com/wqs2019/Node-puppeteer" target="_blank" rel="noopener noreferrer">github仓库<ExternalLinkIcon/></a></p>
<p><img src="https://imgkr.cn-bj.ufileos.com/ee148a1a-465e-41db-8e79-fbe672a8eaef.gif" alt=""></p>
</div></template>
