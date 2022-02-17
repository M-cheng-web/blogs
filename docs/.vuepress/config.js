module.exports = {
  title: '个人博客', // 标题
  description: '记录知识,记录生活',
  base: '/blogs/', // github项目名
  theme: 'reco', // 主题
  plugins: [['vuepress-plugin-code-copy', true]], // 复制代码块插件
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
          { title: "待分配", path: '/a-un-allot/core' },
        ]
      },
      {
        title: "工具类",
        path: '/tools/rollup',
        collapsable: false,
        children: [
          // { title: "介绍", path: "/tools/core" },
          { title: "Rollup", path: "/tools/rollup" },
          { title: "Lerna", path: "/tools/lerna" },
          { title: "Git", path: "/tools/git" },
          { title: "Webpack", path: "/tools/webpack" },
          { title: "Vite", path: "/tools/vite" },
          // { title: "EsBuild", path: "/tools/esbuild" },
          // { title: "Node", path: "/tools/node" },
          { title: "Vuepress", path: "/tools/vuepress" },
          { title: "Npm", path: "/tools/npm" },
          { title: "Commit规范化", path: "/tools/commit" },
          { title: "Vscode", path: "/tools/vscode" },
        ],
      },
      {
        title: "JavaScript",
        path: '/javascript/skill',
        collapsable: false,
        children: [
          // { title: "介绍", path: "/javascript/core" },
          { title: "小技巧", path: "/javascript/skill" },
          { title: "数组方法总结", path: "/javascript/array" },
          { title: "正则", path: "/javascript/regular" },
          { title: "设计模式", path: "/javascript/design-mode" },
        ],
      },
      {
        title: "Typescript",
        path: '/typescript/core',
        collapsable: false,
        children: [
          { title: "介绍", path: "/typescript/core" },
        ],
      },
      {
        title: "手写",
        path: '/writingcode/core',
        collapsable: false,
        children: [
          { title: "介绍", path: "/writingcode/core" },
          { title: "Promise", path: "/writingcode/promise" },
        ],
      },
    ]
  }
}