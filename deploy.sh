# rm -rf public
# unzip public.zip
# rm -rf public.zip
#!/bin/bash

# 打包项目
vuepress build

# 上传到服务器 将目录public 复制到服务器的/soft/data/vblog目录下
scp -r ./public root@117.72.36.202:/soft/data/vblog
