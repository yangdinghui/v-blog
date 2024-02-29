---
title: rocketmq源码学习
date: 2024-02-28
tags:
 - rocketmq
 - 源码 
categories:
 - rocketmq
---
### 1. 四大组件
- NameSerer
- Broker
- Producer
- Consumer
### 2. 注册机制
- Broker消息服务器在启动时向所有NameServer注册
- NameServer与每台Broker服务器保持长连接
