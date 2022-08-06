---
title: LeetCode 解题方法
---

## 一、双指针法

### [26. 删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

::: tip
输入：nums = [0,0,1,1,1,2,2,3,3,4]

输出：5, nums = [0,1,2,3,4]

解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
:::

```js
var removeDuplicates = function(nums) {
    let slow = 0;

    for(let fast=1;fast<nums.length;fast++){
        if(nums[slow]!==nums[fast]){
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow+1
};
```