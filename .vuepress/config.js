const buildSidebarConfig = require('./buildSidebarConfig.js');
const sidebars = buildSidebarConfig('./docs');
module.exports = {
  "locales": {
    '/': {
      lang: 'zh-CN'
    }
  },
  "plugins": [
    ['@vuepress/medium-zoom', {
      // selector: ".page img",
      options: {
        margin: 16,
        background: "#616161",
        scrollOffset: 0
      }
    }]
  ],//图片放大
  "title": "良月无序",//网站标题
  "description": "",//网站描述
  "dest": "public",//打包输出目录
  "head": [
    ['script', {}, `
    var _hmt = _hmt || [];
     (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?07959de8c6b3024b34096b9dc88e9396";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
      })();`],
    ["link", { "rel": "icon", "href": "/icon/icons-cat.gif" }],//网页图标
    ["meta", { "name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no" }],//移动端适配
    ["meta", { "name": "keywords", "content": "vuepress,reco,vuepress-reco,halo" }]//关键字
  ],
  "theme": "reco",
  "themeConfig": {
    //404 腾讯公益
    "noFoundPageByTencent": false, //是否开启腾讯公益404页面
    // "type": 'blog',
    // 设置单个密码
    "password": '123456',//设置密码
    "nav": [
      { "text": "主页", "link": "/", "icon": "reco-home" },
      { "text": "时间线", "link": "/timeline/", "icon": "reco-date" },
      {
        "text": "文档", "icon": "reco-message",
        "items": [
          { "text": "面试问题", "link": "/docs/interview/" },
          { "text": "刷题记录", "link": "/docs/algorithm/" },
          { "text": "生活笔迹", "link": "/docs/idea/" },
        ]
      },
      {
        "text": "关于", "icon": "reco-message",
        "items": [
          { "text": "GitHub", "link": "https://github.com/yangdinghui", "icon": "reco-github" },
          { "text": "bilibili", "link": "https://space.bilibili.com/21283231", "icon": "reco-bilibili" },
          { "text": "weibo", "link": "https://weibo.com/u/2284904283", "icon": "reco-weibo" },
        ]
      }
    ],
    "sidebar": sidebars,
    // {
    //   "/docs/interview/": [
    //     "",
    //     "theme",
    //     "plugin",
    //     "api"
    //   ],
    //   "/docs/algorithm/": [
    //     "",
    //     "和为K的子数组",
    //     "滑动窗口最大值",
    //     "接雨水",
    //     "统计「优美子数组」",
    //     "找到字符串中所有字母异位词",
    //     "最大子数组和"
    //   ],
    //   "/docs/idea/": [
    //     "",
    //     "长相思云一涡"
    //   ]
    // },
    'type': "blog",
    "blogConfig": {
      "category": {
        "location": 4,
        "text": "分类"
      },
      "tag": {
        "location": 5,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "GPT聊天",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1004329447@qq.com",
        "link": "http://chat.nikankan.top"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",//导航栏左侧logo
    "search": true,//搜索
    "searchMaxSuggestions": 10,//搜索结果数量
    "lastUpdated": "Last Updated",//"最后更新时间"
    "author": "halo",//首页右侧头像下方的文字
    "authorAvatar": "/avatar.png",//首页右侧头像
     // 备案
     record: '豫ICP备2021030666号',
     recordLink: 'https://beian.miit.gov.cn',
    //  cyberSecurityRecord: '公安部备案文案',
    //  cyberSecurityLink: '公安部备案指向链接',
    "startYear": "2023",//开始年份
  },
  "markdown": {
    "lineNumbers": true //代码块显示行号
  },

}