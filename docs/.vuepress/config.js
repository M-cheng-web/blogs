module.exports = {
  title: '个人博客', // 标题
  description: '记录知识,记录生活',
  base: '/blogs/', // github项目名
  theme: 'reco', // 主题
  // plugins: [['vuepress-plugin-code-copy', true]], // 复制代码块插件
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
        title: '前置',
        path: '/',
        collapsable: false, // 不折叠
        children: [
          { title: "介绍", path: "/" },
          { title: "灵感", path: '/first/core' },
          { title: "小知识点", path: '/first/tips' },
        ]
      },
      {
        title: '加密信息',
        path: '/encrypt/every.encrypt',
        collapsable: false, // 不折叠
        children: [
          { title: "每日记录", path: '/encrypt/every.encrypt' },
        ]
      },
      {
        title: '算法',
        path: '/arithmetic/core',
        collapsable: false,
        children: [
          { title: "每日算法", path: '/arithmetic/core' },
          { title: "进制", path: '/arithmetic/system' },
          { title: "位运算", path: '/arithmetic/bit-operation' },
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
          // { title: "EsBuild", path: "/tools/esbuild" },
          // { title: "Node", path: "/tools/node" },
          { title: "Vuepress", path: "/tools/vuepress" },
          { title: "Npm", path: "/tools/npm" },
          { title: "Commit规范化", path: "/tools/commit" },
          { title: "Vscode", path: "/tools/vscode" },
          { title: "Axios配置模板", path: "/tools/axios" },
          { title: "脚本加密", path: "/tools/encrypt" },
        ],
      },
      {
        title: "JavaScript",
        path: '/javascript/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/javascript/core" },
          { title: "小技巧", path: "/javascript/skill" },
          { title: "数组方法总结", path: "/javascript/array" },
          { title: "Map/Set/WeakMap", path: "/javascript/map" },
          { title: "promise", path: "/javascript/promise" },
          { title: "prototype", path: "/javascript/prototype" },
          { title: "变量提升", path: "/javascript/var-top" },
          { title: "函数式编程", path: "/javascript/function-pro" },
          { title: "正则", path: "/javascript/regular" },
          { title: "设计模式", path: "/javascript/design-mode" },
        ],
      },
      {
        title: "Typescript",
        path: '/typescript/core',
        collapsable: false,
        children: [
          { title: "开始", path: "/typescript/start" },
          { title: "基础", path: "/typescript/core" },
        ],
      },
      {
        title: "Vite",
        path: '/vite/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/vite/core" },
          { title: "预构建", path: "/vite/prebuild" },
          { title: "esbuild", path: "/vite/esbuild" },
          { title: "基础配置", path: "/vite/configuration" },
        ],
      },
      {
        title: "Css",
        path: '/css/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/css/core" },
          { title: "flex", path: "/css/flex" },
        ],
      },
      {
        title: "Vue",
        path: '/vue/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/vue/core" },
          { title: "渲染", path: "/vue/render" },
          { title: "MVVM", path: "/vue/mvvm" },
        ],
      },
      {
        title: "Canvas",
        path: '/canvas/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/canvas/core" },
        ],
      },
      {
        title: "React",
        path: '/react/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/react/core" },
          { title: "react-router", path: "/react/react-router" },
        ],
      },
      {
        title: "手写",
        path: '/writingcode/core',
        collapsable: false,
        children: [
          { title: "介绍", path: "/writingcode/core" },
          { title: "算法", path: "/writingcode/roth" },
          { title: "Promise", path: "/writingcode/promise" },
          { title: "call/apply/bind", path: "/writingcode/call-apply-bind" },
          { title: "深浅拷贝", path: "/writingcode/copy" },
          { title: "节流防抖", path: "/writingcode/throttle" },
        ],
      },
      {
        title: "网络",
        path: '/network/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/network/core" },
          { title: "TCP", path: "/network/tcp" },
        ],
      },
      {
        title: "性能优化",
        path: '/optimize/core',
        collapsable: false,
        children: [
          { title: "基础", path: "/optimize/core" },
        ],
      },
      {
        title: "面筋",
        path: '/interview/core',
        collapsable: false,
        children: [
          { title: "筋道", path: "/interview/core" },
        ],
      },
    ]
  }
}