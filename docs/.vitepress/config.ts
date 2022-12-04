import { defineConfig, DefaultTheme } from 'vitepress'
import router from '../../metadata/index.json'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Blog',
  description: '个人博客',

  lastUpdated: true,
  base: '/blog',
  cleanUrls: 'without-subfolders',

  themeConfig: {
    logo: 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/logo.ocqmygd2csw.webp',
    nav: nav(),
    sidebar: getSideBar(),
    editLink: {
      pattern: 'https://github.com/FastUse/morehook/tree/main/packages/:path',
      text: 'Suggest changes to this page'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/FastUse/morehook' }
    ],
  },
  head: [
    ['link', { rel: 'icon', href: 'logo.svg' }],
  ]
})

// 顶部栏
function nav(): DefaultTheme.NavItem[] {
  return router.map(item => {
    return {
      text: item.title,
      activeMatch: undefined,
      items: item.children.map(i => {
        const subLink = i.children.length ? i.children[0].link : 'index'
        return {
          text: i.title,
          link: `/${item.title}/${i.link}/${subLink}`
        }
      })
    }
  })
}

// 侧边栏
function getSideBar(): DefaultTheme.Sidebar {
  // 生成数据 demo
  // '/web-basics/javascript/': [
  //   {
  //     text: 'JavaScript',
  //     items: [
  //       {
  //         text: 'Array',
  //         link: '/web-basics/javascript/array'
  //       },
  //       {
  //         text: 'Promise',
  //         link: '/web-basics/javascript/promise'
  //       },
  //     ]
  //   }
  // ],
  const links = {}

  for (let x = 0; x < router.length; x++) {
    const { title: category, children } = router[x]
    for (let y = 0; y < children.length; y++) {
      const { title, children, link } = router[x].children[y]
      const key = `/${category}/${link}/`
      const value = { text: title, items: [], link: '' }

      if (children.length) {
        value.items = children.map(i => ({
          text: i.title,
          link: `/${category}/${link}/${i.link}`
        })) as never[]
      } else {
        value.link = `/${category}/${link}/index`
      }

      links[key] = [value]
    }
  }

  return links
}