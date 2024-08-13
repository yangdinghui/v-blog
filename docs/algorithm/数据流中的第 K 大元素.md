---
title: 数据流中的第 K 大元素
date: 2024-08-12
tags:
 - leetcode
---
### 1. 数据流中的第 K 大元素
#### 标签：树 设计 二叉搜索树 二叉树 数据流 堆（优先队列）

设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素.<br/>
请实现 KthLargest 类：<br/>
- KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
- int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。

示例：<br/>

输入：<br/>
["KthLargest", "add", "add", "add", "add", "add"]<br/>
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]<br/>
输出：<br/>
[null, 4, 5, 5, 8, 8]<br/>

解释：<br/>
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);<br/>
kthLargest.add(3);   // return 4<br/>
kthLargest.add(5);   // return 5<br/>
kthLargest.add(10);  // return 5<br/>
kthLargest.add(9);   // return 8<br/>
kthLargest.add(4);   // return 8<br/>
 



```java
class Solution {
    //使用优先队列：
    //使用一个最小堆（或最大堆）来存储 k 个最大的元素，这样可以在 O(log k) 的时间内找到第 k 大的元素
    private PriorityQueue<Integer> minHeap;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        minHeap = new PriorityQueue<>(k);
        for (int num : nums) {
            add(num);
        }
    }

    public int add(int val) {
         // 如果堆中还没有 k 个元素，或者新元素比堆中的最小元素大，则添加新元素
        if (minHeap.size() < k || val > minHeap.peek()) {
            minHeap.add(val);
        }
        // 如果堆中的元素数量超过了 k，移除最小的元素
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        // 堆顶元素即为第 k 大的元素
        return minHeap.peek();
    }
}
```