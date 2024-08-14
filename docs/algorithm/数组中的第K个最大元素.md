---
title: 数组中的第K个最大元素
date: 2024-08-14
tags:
 - leetcode
---
### 1. 数组中的第K个最大元素
#### 标签：数组 分治 快速选择 排序 堆（优先队列）

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。<br/>
请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。<br/>
你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。<br/>

示例 1:<br/>
  输入: [3,2,1,5,6,4], k = 2<br/>
  输出: 5<br/>

示例 2:<br/>
  输入: [3,2,3,1,2,4,5,5,6], k = 4<br/>
  输出: 4<br/>
 
```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
        for (int i = 0; i < len; i++) {
            if (i == 0) {
                minHeap.add(nums[i]);
                continue;
            }
            if (nums[i] > minHeap.peek() || minHeap.size() < k) {
                minHeap.add(nums[i]);
            }
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}
```