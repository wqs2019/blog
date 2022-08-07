<template><div><blockquote>
<p>好久没有更新推文了，这段时间也是在做一个小项目，一开始想的是人脸识别并上传视频到七牛云的，但是后来想想好像不用这个功能，但是我实现后才知道。所以就写一下上传的功能吧。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>大家都知道七牛云就是一个线上的云存储空间，可以上传一些图片、视频等多媒体资源，对于小型项目来说是很方便的。但是好像他的存储空间1个月就会过期，你的资源可能访问不了（充钱）。</p>
<p>偶然接触这个功能是因为在做小程序的过程中，录制的视频不能转码成base64格式的（真机调试模式），开发者工具调试是正常的，真机调试就会不正常。</p>
<p>我发现在工具调试下生成的是以http开头的文件，真机的时候就会生成wxfile的文件，一度怀疑是这个问题导致我不能转base64，后来多方求证之后发现，<code v-pre>根本不用关心什么开头</code>，预览是正常的。</p>
<p><strong>这个问题仅存在真机调试的模式下面【谨记】</strong></p>
<h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2>
<p>首先我们要先去七牛云注册一个开发者账号，相信大家都会。</p>
<p>接下来我们就可以上传我们的文件了。但是官方写的太难懂了，以至于我连文档都看得不太清楚。经过自己的一番折磨着没有搞清楚这个uptoken是怎么获取的，不像其他的三方工具一样简便，直接是他们生成的。</p>
<p>没办法，我找了几篇文章讲关于上传凭证的生成方式也没有搞明白。后来我就在一个github里边找到了小程序的SDK，但是也有不少的问题。</p>
<h3 id="找对文档" tabindex="-1"><a class="header-anchor" href="#找对文档" aria-hidden="true">#</a> 找对文档</h3>
<p>我觉得这个文档隐藏的还是很不错的，找了半天没有找到。</p>
<p><a href="https://developer.qiniu.com/sdk#community-sdk" target="_blank" rel="noopener noreferrer">小程序SDK<ExternalLinkIcon/></a></p>
<p>拿到小程序的SDK之后我们就可以在用的地方进行JS文件的引入，在上面的链接里面，找到Qiniu-wxapp-SDK之后点击安装，文件就会下载到我们的本地。</p>
<p>在我们的小程序页面，你要使用的这个页面进行进入即可。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> qiniuUploader <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"../../qiniuUploader.js"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="项目配置" tabindex="-1"><a class="header-anchor" href="#项目配置" aria-hidden="true">#</a> 项目配置</h3>
<p>如果是一开始弄的时候，我相信很多人都会来到Qiniu-wxapp-SDK的<a href="https://github.com/gpake/qiniu-wxapp-sdk/blob/master/README.md" target="_blank" rel="noopener noreferrer">github文档<ExternalLinkIcon/></a>那里寻找，但是那里也没有找到关于凭证的生成方式。</p>
<p>后来我在获取凭证的详情页面找到了，但是这个凭证为了安全是由后端返回的，前端只需要调用api/uptoken的形式就可以获取。所以，唯一的办法就是我们需要把这个获取凭证的接口放上服务器，让公网是可以访问的。</p>
<p><a href="https://developer.qiniu.com/kodo/sdk/1283/javascript" target="_blank" rel="noopener noreferrer">运行实例<ExternalLinkIcon/></a></p>
<p>在上面这个运行实例下载之后，其实我们唯一要用到的就是server.js文件和一个配置文件config.json文件。</p>
<p><code v-pre>server.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> qiniu <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"qiniu"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> multiparty <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"multiparty"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> fs<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> config<span class="token operator">=</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">"config.json"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">...</span><span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看一下这个文件的关键代码，里面用到了express、qiniu、multiparty这三个依赖，那么这样一来就很简单了，初始化一个package.json文件安装依赖即可。</p>
<p><code v-pre>config.json</code></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"AccessKey"</span><span class="token operator">:</span> <span class="token string">"你的AccessKey"</span><span class="token punctuation">,</span>  
    <span class="token property">"SecretKey"</span><span class="token operator">:</span> <span class="token string">"你的SecretKey"</span><span class="token punctuation">,</span>
    <span class="token property">"Bucket"</span><span class="token operator">:</span> <span class="token string">"空间名称"</span><span class="token punctuation">,</span>
    <span class="token property">"Port"</span><span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span>
    <span class="token property">"UptokenUrl"</span><span class="token operator">:</span> <span class="token string">"uptoken"</span><span class="token punctuation">,</span>
    <span class="token property">"Domain"</span><span class="token operator">:</span> <span class="token string">"你的域名"</span> 
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件很简单，就是做一些你的七牛云空间的信息配置，为了能够上传资源到你指定的空间。</p>
<p><code v-pre>AccessKey/SecretKey</code>：在你的个人中心里面，进去密钥管理就可以看到了，但是不要泄露出去就好。把这两个信息填写到config.json里面去。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/7f413b1e-d886-4a7a-a534-9bd5f33c9def.png" alt="AccessKey/SecretKey"></p>
<p><code v-pre>Bucket</code>:就是你创建的空间名称，可以在对象存储的空间管理进行新建空间，这个名字就是Bucket。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/36493a11-67a3-4d56-a5cb-9b648fd0e894.png" alt="domain"></p>
<p>domain:你的临时测试域名</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/9ea2b6c5-3a3b-4e31-899c-8ce4eab0f04a.png" alt=""></p>
<h3 id="获取uptoken" tabindex="-1"><a class="header-anchor" href="#获取uptoken" aria-hidden="true">#</a> 获取uptoken</h3>
<p>明确了uptoken是由后端生成的之后，我们就把上面的server.js文件部署上去。这个文件其实就是接口文件，用于提供uptoken。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/0ab4275a-3132-44ae-b7db-b2226231fe5c.png" alt="目录"></p>
<p>上传服务器之后记得安装依赖，然后用pm2进行启动。这样你就可以在关闭服务器终端的时候还可以正常访问接口。用node启动你关闭终端就没用了。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/6cebef6d-1622-484e-8286-3d3620114694.png" alt="看一下是否启动成功"></p>
<p>接下来我们就开始我们的uptoken获取吧，在浏览器输入你的服务器IP：端口/api/uptoken</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/e762636e-c628-4caa-ae0f-d67507a5b625.png" alt="获取成功"></p>
<h2 id="上传文件" tabindex="-1"><a class="header-anchor" href="#上传文件" aria-hidden="true">#</a> 上传文件</h2>
<p>接下来就是视频上传的时候，在小程序onload的时候就初始化函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">var</span> qiniuUploader <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"../../qiniuUploader.js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//记得引入</span>

<span class="token function">initQiniu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">region</span><span class="token operator">:</span> <span class="token string">'NCN'</span><span class="token punctuation">,</span> <span class="token comment">// 华北区(看你空间的地区)</span>
    <span class="token literal-property property">uptokenURL</span><span class="token operator">:</span> <span class="token string">'https://yourserver.com/api/uptoken'</span><span class="token punctuation">,</span><span class="token comment">//上面的获取uptoken链接</span>
    <span class="token literal-property property">uploadURL</span><span class="token operator">:</span><span class="token string">'https://up-z2.qbox.me'</span><span class="token punctuation">,</span><span class="token comment">//上传的地址</span>
    <span class="token literal-property property">domain</span><span class="token operator">:</span> <span class="token string">'测试域名/'</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  qiniuUploader<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于uploadURL的地址：其实运行实例的文件（demo01）是没有这一项的配置的，但是我运行就会说uploadURL没有配置，那我只好写上去了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">case</span> <span class="token string">'ECN'</span><span class="token operator">:</span> uploadURL <span class="token operator">=</span> <span class="token string">'https://up.qbox.me'</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token keyword">case</span> <span class="token string">'NCN'</span><span class="token operator">:</span> uploadURL <span class="token operator">=</span> <span class="token string">'https://up-z1.qbox.me'</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token keyword">case</span> <span class="token string">'SCN'</span><span class="token operator">:</span> uploadURL <span class="token operator">=</span> <span class="token string">'https://up-z2.qbox.me'</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token keyword">case</span> <span class="token string">'NA'</span><span class="token operator">:</span> uploadURL <span class="token operator">=</span> <span class="token string">'https://up-na0.qbox.me'</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看自己的地区来写。</p>
<hr>
<p>最后就是上传了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 交给七牛上传</span>
qiniuUploader<span class="token punctuation">.</span><span class="token function">upload</span><span class="token punctuation">(</span>filePath<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//它会返回一个在线地址，打开浏览器就可以访问你的视频、音频/图片</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'error: '</span> <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的filePath就是你录制视频、音频/图片的地址，如果是手机的话是wxfile开头，电脑调试就是http开头，不过没关系，都可以上传到七牛云。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<p>经过一番的折腾，其实一开始我们的思路应该是比较多的，网上的文章也是很多。但是不幸的是都没有解决我的问题。</p>
<p>在这里我就想说一句话，假如你在开发微信小程序，<code v-pre>任何时候你都要以你预览的时候为准</code>。因为很多时候不是你的项目代码写得有问题，而是开发者工具的问题，一个是电脑的路径一个是手机的路径，它们是不一样的。</p>
<p>在我真机调试的时候，怎么也不能执行wx.getFileSystemManager()里面的函数。在真机调试的时候页面右方一直报警告和错误，然后自动恢复调试然后又错误，它确实也不是报错信息。</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
