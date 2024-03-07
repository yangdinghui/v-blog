# 打包项目
sudo vuepress build

# 压缩文件
zip -r public.zip public

# 上传到服务器 将目录public 复制到服务器的/soft/data/vblog目录下
#scp -r ./public root@117.72.36.202:/soft/data/vblog

# 上传到服务器 将文件public.zip 复制到服务器的/soft/data/vblog目录下
scp public.zip root@117.72.36.202:/soft/data/vblog

# 通过ssh登录到服务器 执行本地的deploy.sh脚本
#ssh root@117.72.36.202 'bash -s' < /Users/tomato/IdeaProjects/learn/tmep/vuepress-blog/v-blog/test_local.sh 

# 通过ssh登录到服务器 执行服务器的deploy.sh脚本
ssh root@117.72.36.202 'bash /soft/data/vblog/deploy.sh'

# 删除本地的public.zip
rm -rf public.zip