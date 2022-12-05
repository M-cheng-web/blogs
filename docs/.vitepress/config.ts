import { defineConfig } from 'vitepress'
import nav from '../../metadata/nav.json'
import sidebar from '../../metadata/sidebar.json'

export default defineConfig({
  lang: 'zh-CN',
  title: 'M-cheng-Blog',
  description: '个人博客',

  lastUpdated: true,
  base: '/blogs',
  cleanUrls: 'without-subfolders',

  themeConfig: {
    logo: 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/icon.3so9gi79i940.webp',
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/M-cheng-web/blogs' }
    ],
  },
  head: [
    ['link', { rel: 'icon', href: 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/icon.3so9gi79i940.webp' }],
  ]
})