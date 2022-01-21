module.exports = {
  title: '个人博客', // 标题
  description: '记录知识,记录生活',
  base: '/blogs/', // github项目名
  theme: 'reco', // 主题
  locales: {
    '/': {
      lang: 'zh-CN' // 时间格式转换 1/1/2022 => 2022/1/1
    }
  },
  themeConfig: {
    subSidebar: 'auto', // 右侧导航
    nav: [ // 导航栏
      { text: '首页', link: '/' },
    ],
    sidebar: [ // 标签页
      {
        title: '关于作者',
        path: '/',
        collapsable: false, // 不折叠
        children: [
          { title: "介绍", path: "/" },
        ]
      },
      {
        title: "待分配",
        path: '/a-un-allot/core',
      },
      {
        title: "工具类",
        path: '/tools/core',
        collapsable: false,
        children: [
          { title: "关于", path: "/tools/core" },
          { title: "Rollup", path: "/tools/rollup" },
          { title: "Lerna", path: "/tools/lerna" },
          { title: "Git", path: "/tools/git" },
          { title: "Webpack", path: "/tools/webpack" },
          { title: "Vite", path: "/tools/vite" },
          { title: "EsBuild", path: "/tools/esbuild" },
          { title: "Node", path: "/tools/node" },
          { title: "Vuepress", path: "/tools/vuepress" },
          { title: "发布npm插件", path: "/tools/npm-publish" },
        ],
      },
    ]
  }
}