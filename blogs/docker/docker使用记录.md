---
title: docker使用记录
date: 2024-02-26
tags:
 - docker
categories:
 -  docker
---
## 镜像（Image）：Docker 镜像可以被视为一个轻量级、可执行的独立软件包，它包含运行应用程序所需要的所有内容：代码、运行时环境、库、环境变量和配置文件。镜像是不可变的，也就是说，一旦创建，其内容不能被改变。

## 容器（Container）：如果说镜像是软件的“编译版本”，那么容器就是这个镜像的一个运行实例。可以通过镜像创建一个或多个容器。每个容器都是一个隔离的运行环境，它有自己的文件系统、网络接口和进程空间，但可以（按需）和其他容器或宿主机共享资源。
```bash
#docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
docker run 
-d：以后台模式运行容器。
-i：以交互模式运行容器，通常与 -t 一起使用。
-t：为容器重新分配一个伪输入终端，通常与 -i 一起使用。
--name：为容器指定一个名称。
-p：指定端口映射，格式为 <宿主机端口>:<容器内部端口>。
-v：挂载宿主机的目录或文件到容器中，格式为 <宿主机路径>:<容器内部路径>。
-e：设置环境变量，格式为 <变量名>=<值>。

docker stop

#Docker 容器操作：
docker run IMAGE：根据镜像启动一个容器.
docker start CONTAINER_ID/NAME：启动已经停止运行的容器.
docker stop CONTAINER_ID/NAME：停止运行中的容器.
docker restart CONTAINER_ID/NAME：重启容器.
docker rm CONTAINER_ID/NAME：删除一个已经停止的容器.
docker ps -a：列出系统中所有的容器，包括正在运行的和已经停止的.
docker logs CONTAINER_ID/NAME：查看容器的日志.
#Docker 镜像操作：
docker images：列出本地主机上的所有镜像.
docker rmi IMAGE_ID/NAME：删除一个镜像.
docker pull IMAGE:TAG：从镜像仓库中拉取或者更新指定镜像.
docker build -t IMAGE:TAG .：根据 Dockerfile 创建一个新的镜像.
docker save IMAGE > /path/to/tar/file：将镜像保存为 tar 归档文件.
docker load < /path/to/tar/file：从 tar 归档文件加载镜像.
#Docker 网络操作：
docker network ls：列出所有 Docker 网络.
docker network create NETWORK_NAME：创建一个新的网络.
docker network rm NETWORK_NAME：删除一个网络.
docker network connect NETWORK_NAME CONTAINER_ID/NAME：将一个正在运行的容器连接到网络.
docker network disconnect NETWORK_NAME CONTAINER_ID/NAME：从网络中断开一个正在运行的容器.
#Docker 其他操作：
docker version：查看 Docker 版本信息.
docker info：查看 Docker 的总体信息.
docker login：登录 Docker Hub.
docker logout：注销 Docker Hub.


docker run -d \
  --name copilot-gpt4-service \
  --restart always \
  -p 8080:8080 \
  -e HOST=0.0.0.0 \
  aaamoon/copilot-gpt4-service:latest
   
docker run -d -p 4000:3000 \
   -e BASE_URL=http://127.0.0.1:8080 \
   -e OPENAI_API_KEY=ghu_xxxxx \
   -e CODE=88488848 \
   yidadaa/chatgpt-next-web

docker run -d -p 4000:3000 \
   -e BASE_URL=http://127.0.0.1:8080 \
   -e OPENAI_API_KEY=ghu_xxxxx \
   -e CODE=88488848 \
   halodocker007/gpt 



#构建打包镜像
docker build -t chatgpt-next-web-halo .
#将镜像添加标签
docker tag chat-web halodocker007/gpt:latest
#将镜像push到远端仓库
docker push halodocker007/gpt:latest
#拉取镜像
docker pull halodocker007/gpt:latest


#将本地镜像打包为本地文件
docker save -o /Users/tomato/Desktop/tmp/docker chat-web
#将本地镜像打包的文件加载为本地镜像
docker load -i /Users/tomato/Desktop/tmp/docker
#拉取镜像
docker pull yidadaa/chatgpt-next-web:latest

#外网 http://117.72.36.202:8080
#内网 http://172.16.0.3:8080
#本地 http://127.0.0.1:8080
docker run -d -p 4000:3002 \
    -e OPENAI_API_BASE_URL=http://172.16.0.3:8080 \
    -e OPENAI_API_KEY=ghu_xxxxxxxxx \
    -e OPENAI_API_MODEL=gpt-4 \
    -e AUTH_SECRET_KEY=8848 \
    chenzhaoyu94/chatgpt-web

#安装redis，外部使用端口63799访问，并设置密码
docker run --name some-redis -d -p 63799:6379 -e REDIS_PASSWORD=xxxxxx redis

#停止运行中的容器
docker stop 55c1c9c80b7c
#删除停止运行的镜像
docker rm c7374698cc -f
#运行新版本镜像 aaamoon/copilot-gpt4-service:latest 
docker run -d \
  --name copilot-gpt4-service \
  --restart always \
  -p 8080:8080 \
  aaamoon/copilot-gpt4-service:latest   
```

