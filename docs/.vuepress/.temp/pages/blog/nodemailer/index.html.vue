<template><div><blockquote>
<p>相信大家都知道登录操作都会有一个接收验证码的过程,我之前一直对这个非常感兴趣,经常问同学手机验证码是怎么搞的,但是现在我们不用手机也照样可以实现这个功能。</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>其实对于手机验证码来说，一般都要收费的，免费的一般是比较少的，而且都会有数量的限制。既然我们不能使用手机验证码来发送，那么我们就以曲线救国的方式来实现这个功能吧。</p>
<p>其实很简单，我们只要安装一个第三方的npm 包就可以了，这个包可以实现邮件的发送功能。这个包就是nodemailer，下面我们就一起来测试一下到底怎么样。</p>
<h2 id="_02-安装nodemailer" tabindex="-1"><a class="header-anchor" href="#_02-安装nodemailer" aria-hidden="true">#</a> 02 安装nodemailer</h2>
<p>我们随便新建一个目录，然后在根目录下面初始化package.json文件（npm init），然后我们就直接安装nodemailer即可。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install nodemailer --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们再新建一个入口文件app.js，用于测试代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> nodemailer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"nodemailer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> transporter <span class="token operator">=</span> nodemailer<span class="token punctuation">.</span><span class="token function">createTransport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// host: 'smtp.ethereal.email',</span>
  <span class="token literal-property property">service</span><span class="token operator">:</span> <span class="token string">"qq"</span><span class="token punctuation">,</span> <span class="token comment">// 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/</span>
  <span class="token comment">//   port: 465, // SMTP 端口</span>
  <span class="token literal-property property">secureConnection</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 使用了 SSL</span>
  <span class="token literal-property property">auth</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">"alanwu.hd@qq.com"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pass</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxxx"</span><span class="token punctuation">,</span> <span class="token comment">//授权码，并非QQ密码</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> mailOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">from</span><span class="token operator">:</span> <span class="token string">'"alanwu" &lt;alanwu.hd@qq.com>'</span><span class="token punctuation">,</span> <span class="token comment">// 发送地址</span>
  <span class="token literal-property property">to</span><span class="token operator">:</span> <span class="token string">"157687xxxxx@163.com"</span><span class="token punctuation">,</span> <span class="token comment">// 接收列表（可多个）</span>
  <span class="token literal-property property">subject</span><span class="token operator">:</span> <span class="token string">"Hello,this is alan from China!"</span><span class="token punctuation">,</span> <span class="token comment">// 主题</span>
  <span class="token comment">// 发送text或者html格式（任选一个）</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Hello world！'</span><span class="token punctuation">,</span> <span class="token comment">// plain text body</span>
  <span class="token comment">//html:  fs.createReadStream(path.resolve(__dirname,'index.html'))</span>
  <span class="token literal-property property">html</span><span class="token operator">:</span> <span class="token string">'&lt;img src="cid:01">'</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">attachments</span><span class="token operator">:</span> <span class="token punctuation">[</span>                 <span class="token comment">//添加附件（可多个）</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"image"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"2.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">cid</span><span class="token operator">:</span> <span class="token string">"01"</span><span class="token punctuation">,</span><span class="token comment">//与上面的图片cid对应</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"a.txt"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">"hello world!"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"b.txt"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">"./text.txt"</span><span class="token punctuation">,</span><span class="token comment">//根目录新建即可</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 发送邮件</span>
transporter<span class="token punctuation">.</span><span class="token function">sendMail</span><span class="token punctuation">(</span>mailOptions<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先来看一下service这个字段，如果写了这个就不用写host和端口。大家可以看一下官方的介绍，<a href="https://nodemailer.com/smtp/well-known/" target="_blank" rel="noopener noreferrer">详情戳此<ExternalLinkIcon/></a>。它其实已经帮你封装好了，非常方便。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/0a28719d-4ef0-4e4a-93b0-7fc261f14fa7.png" alt="一部分服务"></p>
<h3 id="发送纯文本text" tabindex="-1"><a class="header-anchor" href="#发送纯文本text" aria-hidden="true">#</a> 发送纯文本text</h3>
<p>这个就比较简单了，我们直接在mailOptions 下面的text写上我们要发送的文本即可，其他的html和attachments都不用配置了。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/29d5a5b2-140d-4298-917c-c784950ba9a3.png" alt=""></p>
<h3 id="html模板发送" tabindex="-1"><a class="header-anchor" href="#html模板发送" aria-hidden="true">#</a> HTML模板发送</h3>
<p>有同学可能觉得这个text文本太low了，我们应该写一些比较华丽的网页发送。没问题，其实我们还可以自定义html网页的，我们不要使用text字段就好，改用html字段而且我们要进行html文件的引入。</p>
<p>我们在根目录新建index.html文件，用于发送此html文件给对方，这里我就随便拿了一个网页。我们要使用 <code v-pre>fs.createReadStream(path.resolve(__dirname,'index.html'))</code>的方式进行引入即可。重新运行我们就会接收到邮件了。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/89cc7c40-5152-437a-90b6-8f6bfde5d621.png" alt=""></p>
<h3 id="发送图片" tabindex="-1"><a class="header-anchor" href="#发送图片" aria-hidden="true">#</a> 发送图片</h3>
<p>除了网页之外我们还可以使用图片的形式发送，我们在html字段里不要发送html文件，写上<code v-pre>html: '&lt;img src=&quot;cid:01&quot;&gt;'</code>之后，我们在attachments里面也写上附件的地址，我这里就直接在根目录之下放置了一张图片，cid要对应上。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/bdb7a4ab-2c86-443e-ad6d-e0365d4e9604.png" alt="本人公众号，在线求关注！"></p>
<h3 id="添加附件" tabindex="-1"><a class="header-anchor" href="#添加附件" aria-hidden="true">#</a> 添加附件</h3>
<p>这里我们就可以添加一些文件了，比如这里我添加了txt文件、docx文件、pdf文件、zip文件都可以。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/0eb958cb-e697-4008-af54-a856e25b736f.png" alt=""></p>
<h2 id="_03-验证码功能" tabindex="-1"><a class="header-anchor" href="#_03-验证码功能" aria-hidden="true">#</a> 03 验证码功能</h2>
<p>我们其实感兴趣只是验证码部分，别急这就安排一下到底是怎么回事。我们首先要想办法生成一个验证码，一般4-6位都是可以的，下面就介绍一种简单的方法来生成一个吧。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> code <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token comment">//从第二位开始截取，截取4位（当然也可以6位）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们就直接使用text这个字段进行发送就好了。code可以在一开始生成一下就好。这样其实我们就可以有一个验证的功能了，让用户输入的验证码与你生成对比的是否一致。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">您的验证码是</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,验证码在10分钟内有效</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://imgkr.cn-bj.ufileos.com/b9a958b9-303d-4961-94f7-b0c366c7d090.png" alt=""></p>
<h2 id="_04-一些小问题" tabindex="-1"><a class="header-anchor" href="#_04-一些小问题" aria-hidden="true">#</a> 04 一些小问题</h2>
<p>我在测试的时候其实有一些小问题，但是我也不知道是什么原因。</p>
<ul>
<li><code v-pre>Error: Message failed: 554 DT:SPM 163</code></li>
</ul>
<p>我去163的官网查了一下，得出的结论是:</p>
<p><strong>DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。请检查是否有用户发送病毒或者垃圾邮件</strong>。</p>
<p>这是我在发送图片的时候，就是我的二维码图片不行，但是我换一张普通的照片就可以，无解。</p>
<ul>
<li><code v-pre>发送给多名用户失败</code></li>
</ul>
<p>当我尝试在to字段那里写两个用户的时候，发现只有一个是成功的，另一个却被退回了，我也不知道是怎么回事。</p>
<h2 id="_05-小结" tabindex="-1"><a class="header-anchor" href="#_05-小结" aria-hidden="true">#</a> 05 小结</h2>
<p>好了，以上就是本文的全部内容，想想其实好像也没什么东西，之前觉得是非常牛的事情原来可以使用很简单的代码就可以实现了。</p>
<p>其实关于nodemailer还有很多属性没有说到，我只讲关于邮件发送的核心部分，其实这在我们的日常生活中也够用了，特别是做一些登录验证操作的时候有用有效。</p>
<p>文章代码：<a href="https://github.com/wqs2019/nodemailer-demo" target="_blank" rel="noopener noreferrer">github地址<ExternalLinkIcon/></a></p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
