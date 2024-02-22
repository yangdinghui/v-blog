module.exports = {
  "plugins": [
    ['@vuepress/medium-zoom', {
        selector: ".page img",
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
          { "text": "面试", "link": "/docs/interview/" },
          { "text": "刷题", "link": "/docs/algorithm/" }
        ]
      },
      {
        "text": "关于", "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/yangdinghui",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/interview/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      "/docs/algorithm/": [
        "",
        "和为K的子数组",
        "滑动窗口最大值",
        "接雨水",
        "统计「优美子数组」",
        "找到字符串中所有字母异位词",
        "最大子数组和"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    // 友链
    // "friendLink": [
    //   {
    //     "title": "午后南杂",
    //     "desc": "Enjoy when you can, and endure when you must.",
    //     "email": "1156743527@qq.com",
    //     "link": "https://www.recoluan.com"
    //   },
    //   {
    //     "title": "vuepress-theme-reco",
    //     "desc": "A simple and beautiful vuepress Blog & Doc theme.",
    //     "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //     "link": "https://vuepress-theme-reco.recoluan.com"
    //   }
    // ],
    "logo": "/logo.png",//导航栏左侧logo
    "search": true,//搜索
    "searchMaxSuggestions": 10,//搜索结果数量
    "lastUpdated": "Last Updated",//"最后更新时间"
    "author": "",//首页右侧头像下方的文字
    "authorAvatar": "/avatar.png",//首页右侧头像
    "record": "xxxx111111",//备案号
    "startYear": "2023",//开始年份
  },
  "markdown": {
    "lineNumbers": true //代码块显示行号
  },

}