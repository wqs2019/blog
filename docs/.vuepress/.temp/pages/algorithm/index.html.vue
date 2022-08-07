<template><div><h2 id="一、双指针法" tabindex="-1"><a class="header-anchor" href="#一、双指针法" aria-hidden="true">#</a> 一、双指针法</h2>
<h3 id="_26-删除有序数组中的重复项" tabindex="-1"><a class="header-anchor" href="#_26-删除有序数组中的重复项" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/" target="_blank" rel="noopener noreferrer">26. 删除有序数组中的重复项<ExternalLinkIcon/></a></h3>
<p>给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。</p>
<p>不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>输入：nums = [0,0,1,1,1,2,2,3,3,4]</p>
<p>输出：5, nums = [0,1,2,3,4]</p>
<p>解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。</p>
</div>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">removeDuplicates</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> slow <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> fast<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>fast<span class="token operator">&lt;</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>fast<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>slow<span class="token punctuation">]</span><span class="token operator">!==</span>nums<span class="token punctuation">[</span>fast<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            slow<span class="token operator">++</span>
            nums<span class="token punctuation">[</span>slow<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>fast<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> slow<span class="token operator">+</span><span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
