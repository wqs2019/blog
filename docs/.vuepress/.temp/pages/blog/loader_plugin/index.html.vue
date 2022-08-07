<template><div><h1 id="关于webpack中loader与plugin的实践" tabindex="-1"><a class="header-anchor" href="#关于webpack中loader与plugin的实践" aria-hidden="true">#</a> 关于Webpack中Loader与Plugin的实践</h1>
<blockquote>
<p>最近看一下webpack相关的内容，谈一下如何编写loader和plugin</p>
</blockquote>
<p><img src="@source/blog/common/1.gif" alt=""></p>
<h2 id="_01-前言" tabindex="-1"><a class="header-anchor" href="#_01-前言" aria-hidden="true">#</a> 01 前言</h2>
<p>相信大家对webpack也有一定的了解，其实深入浅出webpack这本书也看了很多遍，每一次看都会有一些细节之前没有注意到，我觉得其实可以把它当成是一本工具书来看，之前我也是只看配置都有点让你看不过来，更别说其他的了。</p>
<p>所以今天我就说一下如何编写一个loader与plugin，以及它们之间有什么却别等。</p>
<h2 id="_02-loader" tabindex="-1"><a class="header-anchor" href="#_02-loader" aria-hidden="true">#</a> 02 Loader</h2>
<p>Loader其实就是一个转换器，把你输入的内容翻译一遍，本质上是没有什么变化的，就像中文翻译成英文一样。我们其实在不知不觉当中也使用了很多的Loader，但是我们没有过多关注而已。常用的Loader有以下几类：</p>
<h3 id="常见loader" tabindex="-1"><a class="header-anchor" href="#常见loader" aria-hidden="true">#</a> 常见Loader</h3>
<p><strong>语言转换类</strong></p>
<ul>
<li><code v-pre>babel-loader</code>:把ES6转成ES5</li>
<li><code v-pre>ts-loader</code>:把TypeScript转成JavaScript</li>
<li><code v-pre>sass-loader</code>:把scss/sass转成css</li>
<li><code v-pre>less-loader</code>:把less代码转成css</li>
<li><code v-pre>css-loader</code>:加载css，文件导入等</li>
</ul>
<p><strong>文件加载类</strong></p>
<ul>
<li><code v-pre>raw-loader</code>:把文本文件加载到代码中</li>
<li><code v-pre>file-loader</code>:将文件输出到一个文件夹中，使用相对路径引用输出文件</li>
<li><code v-pre>source-map-loader</code>:加载额外的SourceMap文件，方便断点调试</li>
<li><code v-pre>node-loader</code>:加载Node.js原生模块的.node文件</li>
<li><code v-pre>json-loader</code>:加载json文件</li>
</ul>
<p><strong>其他loader</strong></p>
<ul>
<li><code v-pre>vue-loader</code>:加载.vue文件</li>
<li><code v-pre>ui-component-loader</code>:按需加载组件库</li>
<li><code v-pre>i18n-loader</code>:加载多语言版本</li>
<li><code v-pre>ignore-loader</code>:忽略部分文件</li>
</ul>
<h3 id="loader配置" tabindex="-1"><a class="header-anchor" href="#loader配置" aria-hidden="true">#</a> Loader配置</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.scss</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token string">'style-loader'</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token literal-property property">minimize</span><span class="token operator">:</span><span class="token boolean">true</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">'sass-loader'</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上的代码意思就是对.scss文件的转换过程，test的配置就是对某一类文件进行转换，use是使用的loader(转换器),它是一个数组，遵循从右往左的使用。先sass-loader再css-loader再style-loader。</p>
<h3 id="加载本地loaderre" tabindex="-1"><a class="header-anchor" href="#加载本地loaderre" aria-hidden="true">#</a> 加载本地Loaderre</h3>
<p>我们默认的loader都是从npm上面下载的，但是假如我们要使用自己本地写的loader怎么办呢？我们在webpack里面有这样一个配置<code v-pre>resolveLoader</code>,它的意思就是说我们使用哪里的loader来加载文件，可以配置多个地方：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">resolveLoader</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">modules</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'node_modules'</span><span class="token punctuation">,</span><span class="token string">'yourPath'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思就是说我们可以自定义loader的路径，默认就是从node_modules里面找，但是假如你的自定义loader放在本地，可以把你的路径写在yourPath里面(相对路径)。匹配规则就是从左向右查找。</p>
<h3 id="loader编写" tabindex="-1"><a class="header-anchor" href="#loader编写" aria-hidden="true">#</a> Loader编写</h3>
<p>说了这么多，我们自己来写一个简单的loader吧，虽然是一个没有意义的loader，但是也让大家有一个简单的印象，原来写一个loader是很简单的。</p>
<ul>
<li>新建一个目录，如myLoader</li>
<li>进入目录初始化package.json文件，安装webpack <code v-pre>npm init -y</code>,<code v-pre>npm i -D webpack webpack-cli</code></li>
<li>根目录下新建文件夹src，然后创建入口文件index.js —— <code v-pre>src/index.js</code></li>
<li>根目录下新建文件夹loaders，然后新建自定义myLoader.js—— <code v-pre>loaders/myloader.js</code></li>
<li>根目录下新建webpack配置文件<code v-pre>webpack.config.js</code></li>
<li>在package.json配置webpack打包build命令</li>
</ul>
<p><img src="https://imgkr.cn-bj.ufileos.com/92e62dae-6015-4b0d-b745-3c37016f54b5.png" alt="代码目录"></p>
<p><code v-pre>package.json</code></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"myLoader"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"webpack"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"webpack"</span><span class="token operator">:</span> <span class="token string">"^4.42.1"</span><span class="token punctuation">,</span>
    <span class="token property">"webpack-cli"</span><span class="token operator">:</span> <span class="token string">"^3.3.11"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'世界上最好的语言是PHP!'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>myLoader.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'loader-utils'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> loaderUtils<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">'PHP'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>webpack.config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token string">"./src/index.js"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"[name].js"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"dist"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"./loaders/myLoader.js"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"JavaScript"</span><span class="token punctuation">,</span><span class="token comment">//这里就是你要替换的值</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，到此为止我们已经成功地写了一个loader，接下来我们就测试一下是否真的work！运行<code v-pre>npm run build</code>之后会输出一个dist文件夹，里面有一个main.js文件，盘它。</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/0a44c4bd-b668-4744-81be-641676575ef4.png" alt="运行/dist/main.js文件"></p>
<h2 id="_03-plugin" tabindex="-1"><a class="header-anchor" href="#_03-plugin" aria-hidden="true">#</a> 03 Plugin</h2>
<p>相对于Loader来说，其实plugin的机制更加灵活，它可以在webpack的运行过程中改变输出结果。简单来说就是为输出添砖加瓦。</p>
<h3 id="常见plugin" tabindex="-1"><a class="header-anchor" href="#常见plugin" aria-hidden="true">#</a> 常见Plugin</h3>
<ul>
<li><code v-pre>extract-text-webpack-plugin</code>:把JS中的css代码提到单独文件中</li>
<li><code v-pre>webpack-parallel-uglify-plugin</code>:多进程代码压缩</li>
<li><code v-pre>html-webpack-plugin</code>:简化HTML文件创建</li>
<li><code v-pre>dll-plugin</code>:提高webpack构建速度</li>
<li><code v-pre>ignore-plugin</code>：忽略部分文件</li>
</ul>
<h3 id="plugin的工作原理" tabindex="-1"><a class="header-anchor" href="#plugin的工作原理" aria-hidden="true">#</a> Plugin的工作原理</h3>
<p>我们先来看一下简单的插件是怎么编写出来的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">myPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">complier</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    complier<span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">'compilation'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//导出</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> myPlugin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>工作流程</strong>：</p>
<ul>
<li>webpack启动，执行new myPlugin(options)，初始化插件并获取实例</li>
<li>初始化complier对象，调用myPlugin.apply(complier)给插件传入complier对象</li>
<li>插件实例获取complier，通过complier.plugin监听webpack广播的事件，通过complier对象操作webpack</li>
</ul>
<h3 id="plugin编写" tabindex="-1"><a class="header-anchor" href="#plugin编写" aria-hidden="true">#</a> Plugin编写</h3>
<p>俗话说，<code v-pre>talk is cheap,show me the code</code></p>
<p>还是沿用上面的代码结构,在根目录下面建一个myPlugins文件夹，里面建一个myPlugin.js文件，我们就自定义一个plugin：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">class</span> <span class="token class-name">myPlugin</span> <span class="token punctuation">{</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">doneCallback<span class="token punctuation">,</span> failCallback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>doneCallback <span class="token operator">=</span> doneCallback<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>failCallback <span class="token operator">=</span> failCallback<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>done<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">'myPlugin'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">stats</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">doneCallback</span><span class="token punctuation">(</span>stats<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>failed<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">'myPlugin'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">failCallback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> myPlugin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们在<code v-pre>webpack.config.js</code>文件里面先<code v-pre>引入插件</code>，然后<code v-pre>配置插件</code>即可。</p>
<p>还是先打包一下，你会发现在打包过程中，webpack会广播默认的事件，这里我就监听了webpack的<code v-pre>done事件</code>(webpack构建成功，即将退出)和<code v-pre>fail事件</code>(webpack构建失败，即将退出)。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> myPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./plugins/myPlugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">myPlugin</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">//throw new Error('Error!')</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"成功监听到结束事件，可以执行你想要的函数！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们运行之后发现是可以监听的，这里我把两种情况都试一下。首先正常构建，然后手动抛出错误，结果如下：</p>
<p><img src="https://imgkr.cn-bj.ufileos.com/bb906ef1-501e-4de4-a076-6065b0f18d6d.png" alt="成功构建"></p>
<p><img src="https://imgkr.cn-bj.ufileos.com/1afc4540-f45a-4fcf-9e0f-524755483d17.png" alt="失败构建"></p>
<h2 id="_04-小结" tabindex="-1"><a class="header-anchor" href="#_04-小结" aria-hidden="true">#</a> 04 小结</h2>
<p>今天没事就折腾一下看似简单的东西，比如想看一下一些经典loader和plugin的源代码，自信的我还想看一下webpack的源代码，发现看不懂，就此打住了。</p>
<p>不过其实plugin和loader的区别也是面试常问的，也会问你知道怎么写loader和plugin的问题，虽然自己实现的很简单甚至有点幼稚，自己感觉还好。</p>
<p>相信大家读了之后应该有自己的理解，以后遇到这个问题也会有自己的想法，大家实践一下就知道其中的奥秘了。</p>
<p>参考文章：深入浅出Webpack</p>
<p><img src="@source/blog/common/2.gif" alt=""></p>
</div></template>
