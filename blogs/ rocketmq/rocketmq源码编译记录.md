---
title: rocketmq源码编译记录
date: 2024-02-27
tags:
 - rocketmq
 - 源码 
categories:
 - rocketmq
---
### 前置准备工具
- JDK1.8+
- Maven 3.2+
- 编译工具idea
### 1.获取源码并导入idea
``` bash
git clone https://github.com/apache/rocketmq.git
```
### 2.文件修改
#### 2.1.在根目录下创建目录conf
#### 2.2.将项目中distribution工程中的conf目录下的文件broker.conf复制到根目录下conf中
#### 2.3.修改内容，如
``` bash
brokerClusterName = DefaultCluster
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH

# 自动创建Topic
autoCreateTopicEnable=true
# nameServ地址
namesrvAddr=localhost:9876
# 存储路径
storePathRootDir=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq/store
#CommitLog存储路径
storePathCommitLog=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq/store/commitlog
# 消费队列存储路径
storePathConsumeQueue=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq/store/consumequeue
# 消息索引存储路径
storePathIndex=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq/store/index
#checkpoint文件存储路径
storeCheckpoint/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq/store/checkpoint
#abort文件存储路径
abortFile=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq/store/abort
```
### 3.编译,运行以下命令
``` bash
mvn clean install -Dmaven.test.skip=true
```
等待命令执行完成。
### 4.编译安装完成后，观察项目各种jar包是否正确导入
若有包未正确导入，可从本地删掉该jar，刷新maven重新下载

### 5.执行org.apache.rocketmq.namesrv.NamesrvStartup
#### 5.1增加启动配置
![NamesrvStartup启动配置](/images/nameserver启动配置.jpg)
``` bash
ROCKETMQ_HOME=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq
```
若还报错
``` bash
Please set the ROCKETMQ_HOME variable in your environment to match the location of the RocketMQ installation
```
则在NamesrvStartup.java中main方法第一行增加
``` java
System.setProperty("rocketmq.home.dir", "/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq");
```
#### 5.2执行成功
``` bash
The Name Server boot success. serializeType=JSON, address 0.0.0.0:9876
```
### 6.执行org.apache.rocketmq.broker.BrokerStartup
#### 6.1增加启动配置
![BrokerStartup启动配置](/images/BrokerStartup启动配置.jpg)
``` bash
ROCKETMQ_HOME=/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq
```
若还报错
``` bash
Please set the ROCKETMQ_HOME variable in your environment to match the location of the RocketMQ installation
```
则在BrokerStartup.java中main方法第一行增加
``` java
System.setProperty("rocketmq.home.dir", "/Users/tomato/IdeaProjects/learn/sourcecode/rocketmq");
```
#### 6.2执行成功
``` bash
The broker[broker-a, 172.17.54.155:10911] boot success. serializeType=JSON and name server is localhost:9876
```
### 7.执行org.apache.rocketmq.example.quickstart.Producer
#### 7.1 先修改Producer前将该注释打开
``` java
producer.setNamesrvAddr(DEFAULT_NAMESRVADDR);
```
#### 7.2 运行main方法,执行成功会有以下输出
```bash
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398C803DE, offsetMsgId=AC11369B00002A9F00000000000B0752, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=0], queueOffset=746]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398C903DF, offsetMsgId=AC11369B00002A9F00000000000B0844, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=1], queueOffset=747]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398C903E0, offsetMsgId=AC11369B00002A9F00000000000B0936, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=2], queueOffset=748]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398C903E1, offsetMsgId=AC11369B00002A9F00000000000B0A28, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=3], queueOffset=747]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398CA03E2, offsetMsgId=AC11369B00002A9F00000000000B0B1A, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=0], queueOffset=747]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398CA03E3, offsetMsgId=AC11369B00002A9F00000000000B0C0C, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=1], queueOffset=748]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398CA03E4, offsetMsgId=AC11369B00002A9F00000000000B0CFE, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=2], queueOffset=749]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398CB03E5, offsetMsgId=AC11369B00002A9F00000000000B0DF0, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=3], queueOffset=748]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398CB03E6, offsetMsgId=AC11369B00002A9F00000000000B0EE2, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=0], queueOffset=748]
SendResult [sendStatus=SEND_OK, msgId=AC1FD12A13DE18B4AAC289B398CC03E7, offsetMsgId=AC11369B00002A9F00000000000B0FD4, messageQueue=MessageQueue [topic=TopicTest, brokerName=broker-a, queueId=1], queueOffset=749]
```

### 8.执行org.apache.rocketmq.example.quickstart.Consumer
#### 8.1 先修改Consumer类前将该注释打开
``` java
consumer.setNamesrvAddr(DEFAULT_NAMESRVADDR);
```
#### 8.2 运行main方法,执行成功会有以下输出
```bash
ConsumeMessageThread_please_rename_unique_group_name_4_16 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=490, sysFlag=0, bornTimestamp=1709025389853, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389853, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F0000000000073BF8, commitLogOffset=474104, bodyCRC=910391900, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A491D03C0, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 54, 50], transactionId='null'}]] 
ConsumeMessageThread_please_rename_unique_group_name_4_13 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=485, sysFlag=0, bornTimestamp=1709025389842, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389842, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F0000000000072910, commitLogOffset=469264, bodyCRC=74782942, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A491203AC, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 52, 50], transactionId='null'}]] 
ConsumeMessageThread_please_rename_unique_group_name_4_3 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=481, sysFlag=0, bornTimestamp=1709025389831, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389832, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F00000000000719F0, commitLogOffset=465392, bodyCRC=1430420289, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A4907039C, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 50, 54], transactionId='null'}]] 
ConsumeMessageThread_please_rename_unique_group_name_4_20 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=480, sysFlag=0, bornTimestamp=1709025389825, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389825, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F0000000000071628, commitLogOffset=464424, bodyCRC=1378860888, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A49010398, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 50, 50], transactionId='null'}]] 
ConsumeMessageThread_please_rename_unique_group_name_4_15 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=476, sysFlag=0, bornTimestamp=1709025389807, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389807, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F0000000000070708, commitLogOffset=460552, bodyCRC=1735662019, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A48EF0388, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 48, 54], transactionId='null'}]] 
ConsumeMessageThread_please_rename_unique_group_name_4_14 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=475, sysFlag=0, bornTimestamp=1709025389803, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389803, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F0000000000070340, commitLogOffset=459584, bodyCRC=1612307930, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A48EB0384, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 57, 48, 50], transactionId='null'}]] 
ConsumeMessageThread_please_rename_unique_group_name_4_6 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=1, storeSize=242, queueOffset=474, sysFlag=0, bornTimestamp=1709025389775, bornHost=/172.17.54.155:56940, storeTimestamp=1709025389780, storeHost=/172.17.54.155:10911, msgId=AC11369B00002A9F000000000006FF78, commitLogOffset=458616, bodyCRC=1355605434, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={CONSUME_START_TIME=1709025398791, MSG_REGION=DefaultRegion, UNIQ_KEY=AC1FD12AC78018B4AAC2899A48CF0380, CLUSTER=DefaultCluster, MIN_OFFSET=0, TAGS=TagA, WAIT=true, TRACE_ON=true, MAX_OFFSET=500}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 56, 57, 56], transactionId='null'}]] 
```
### 9.编译完成，接下来就可以愉快的调试源码了！
### 注：上面提到的目录需要根据本地环境调整！！！