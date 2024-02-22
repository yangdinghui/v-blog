---
title: 和为K的子数组
date: 2024-02-22
---

#### 1. 和为 K 的子数组
##### 标签：数组 哈希表 前缀和
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
子数组是数组中元素的连续非空序列。
示例 1：
输入：nums = [1,1,1], k = 2
输出：2

示例 2：
输入：nums = [1,2,3], k = 3
输出：2

思路：
使用前缀和的方法可以解决这个问题，因为我们需要找到和为k的连续子数组的个数。通过计算前缀和，我们可以将问题转化为求解两个前缀和之差等于k的情况。
假设数组的前缀和数组为prefixSum，其中prefixSum[i]表示从数组起始位置到第i个位置的元素之和。那么对于任意的两个下标i和j（i < j），如果prefixSum[j] - prefixSum[i] = k，即从第i个位置到第j个位置的元素之和等于k，那么说明从第i+1个位置到第j个位置的连续子数组的和为k。

通过遍历数组，计算每个位置的前缀和，并使用一个哈希表来存储每个前缀和出现的次数。在遍历的过程中，我们检查是否存在prefixSum[j] - k的前缀和，如果存在，说明从某个位置到当前位置的连续子数组的和为k，我们将对应的次数累加到结果中。
这样，通过遍历一次数组，我们可以统计出和为k的连续子数组的个数，并且时间复杂度为O(n)，其中n为数组的长度。

```java
class Solution {
    //前缀和解法
    //在数列中，Sn-1 + nums[n] = Sn
    //即我们可以将前缀和解决为求解两个前缀和之差等于k的情况
    //S[j] - S[i] = k   
    //即从第i个位置到第j个位置的元素之和等于k   
    public static int subarraySum(int[] nums, int k) {
        int count = 0;
        int sum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // 初始化前缀和为0的次数为1
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }

        return count;
    }
    //暴力解法
    public int subarraySum2(int[] nums, int k) {
        int len = nums.length;
        int sum = 0;
        int count = 0;
        //双重循环
        for (int i = 0; i < len; ++i) {
            for (int j = i; j < len; ++j) {
                sum += nums[j];
                //发现符合条件的区间
                if (sum == k) {
                    count++;
                }
            }
            //记得归零，重新遍历
            sum = 0;
        }
        return count;
    }
}
```

#### 2. 寻找数组的中心索引
给定一个整数类型的数组 nums，请编写一个能够返回数组 “中心索引” 的方法。
我们是这样定义数组 中心索引 的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。
如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

示例 1：
输入：
nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：索引 3 (nums[3] = 6) 的左侧数之和 (1 + 7 + 3 = 11)，与右侧数之和 (5 + 6 = 11) 相等。同时, 3 也是第一个符合要求的中心索引。

示例 2：
输入：
nums = [1, 2, 3]
输出：-1
解释：数组中不存在满足此条件的中心索引。

```java
class Solution {


    public int pivotIndex(int[] nums) {
        int presum = 0;
        //数组的和
        for (int x : nums) {
           presum += x;
        }      
        int leftsum = 0;
        for (int i = 0; i < nums.length; ++i) {
            //发现相同情况
            if (leftsum == presum - nums[i] - leftsum) {
                return i;
            }
            leftsum += nums[i];          
        }
        return -1;
    }


    //暴力解法
    public int pivotIndex2(int[] nums) {
        int index = -1;
        if(nums == null || nums.length == 0) return index;
        for(int i = 1; i < nums.length-1; i++){
            if(sumBefore(nums, i) == sumAfter(nums, i)){
                index = i;
            }
        }
        return index;
    }

    public int sumBefore(int[] nums, int i){
        if(i == 0) return 0;
        int sum = 0;    
        for(int j = 0; j < i; j++){
            sum += nums[j];
        }
        return sum;
    }

    public int sumAfter(int[] nums, int i){
        int sum = 0;    
        for(int j = i + 1; j < nums.length; j++){
            sum += nums[j];
        }
        return sum;
    }


}    
```
#### 3. 和可被 K 整除的子数组
给定一个整数数组 A，返回其中元素之和可被 K 整除的（连续、非空）子数组的数目。

示例：
输入：A = [4,5,0,-2,-3,1], K = 5
输出：7

解释：
有 7 个子数组满足其元素之和可被 K = 5 整除：
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

```java
class Solution {

    public int subarraysDivByK(int[] A, int K) {
        int count = 0;
        int[] presum = new int[A.length + 1];
        for (int i = 0; i < A.length; i++) {
            presum[i + 1] = presum[i] + A[i];
        }
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);  
        for (int i = 0; i < presum.length; i++) {
            //该取模写法等价于 a % K ，为了处理对负数取模后得到正数
            //( a % K + K ) % K
            int mod = (presum[i] % K + K) % K;
            if (map.containsKey(mod)) {
                count += map.get(mod);
            }
            map.put(mod, map.getOrDefault(mod, 0) + 1);
        }    
        return count;
   
    }
}
```
