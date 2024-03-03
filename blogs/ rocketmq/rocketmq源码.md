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
### 2. 消息客户端与NameServer、Broker的交互设计要点
- Broker每隔30s向NameServer集群的每一台机器发送心跳包，包含自身创建的topic路由等信息。 
- 消息客户端每隔30s向NameServer更新对应topic的路由信息。 
- NameServer收到Broker发送的心跳包时会记录时间戳。 
- NameServer每隔10s会扫描一次brokerLiveTable（存放心跳包的时间戳信息），如果在120s内没有收到心跳包，则认为Broker失效，更新topic的路由信息，将失效的Broker信息移除

提供的代码是Apache RocketMQ项目中的`NamesrvStartup`类的一部分。这个类负责启动Name Server，这是RocketMQ消息系统的关键组件。

`main`方法是应用程序的入口点。它调用了两个方法：`main0(args)`和`controllerManagerMain()`。`main0(args)`方法负责设置Name Server，而`controllerManagerMain()`用于设置Controller Manager（如果在Name Server配置中启用了它）。

在`main0(args)`中调用了`parseCommandlineAndConfigFile(args)`方法。这个方法负责解析命令行参数并从文件加载配置属性。命令行参数使用Apache Commons CLI库进行解析。如果使用`-c`选项指定了配置文件，它将被读取，其属性将被加载到`namesrvConfig`、`nettyServerConfig`、`nettyClientConfig`和`controllerConfig`对象中。如果指定了`-p`选项，这些对象的属性将被打印出来，程序将退出。

```java
if (commandLine.hasOption('c')) {
    // 从文件加载属性
}
if (commandLine.hasOption('p')) {
    // 打印属性并退出
}
```

接下来在`main0(args)`中调用了`createAndStartNamesrvController()`方法。这个方法创建一个`NamesrvController`对象，初始化它，并启动它。如果初始化失败，程序将退出。添加了一个关闭钩子，以确保在JVM退出时`NamesrvController`被正确关闭。

```java
boolean initResult = controller.initialize();
if (!initResult) {
    controller.shutdown();
    System.exit(-3);
}
```

`controllerManagerMain()`方法与`main0(args)`类似，但它处理的是`ControllerManager`而不是`NamesrvController`。它检查Name Server配置中是否启用了Controller Manager，如果启用了，它将创建、初始化并启动一个`ControllerManager`对象。

```java
if (namesrvConfig.isEnableControllerInNamesrv()) {
    // 创建、初始化和启动ControllerManager
}
```

总的来说，`NamesrvStartup`类负责启动Apache RocketMQ系统中的Name Server和可选的Controller Manager。它解析命令行参数，加载配置属性，并管理`NamesrvController`和`ControllerManager`对象的生命周期。