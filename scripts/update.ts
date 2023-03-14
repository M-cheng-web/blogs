import fs from 'fs-extra'
import fg from 'fast-glob'
import Git from 'simple-git'
import matter from 'gray-matter'
import consola from 'consola'
import fileSequence from './fileSequence.json'
import { join, resolve } from 'path'
import { type DefaultTheme } from 'vitepress'

export const DOCS_URL = 'https://fastuse.github.io/morehook'
const DIR_ROOT = resolve(__dirname, '..')
const DIR_PACKAGE = resolve(DIR_ROOT, 'metadata')
const DIR_SRC = resolve(DIR_ROOT, 'docs')
const git = Git(DIR_ROOT)

/**
 * 获取 md 文件的 title属性
 */
async function getTitle(dir) {
  const mdRaw = await fs.readFile(dir, 'utf-8')
  const { data: frontmatter } = matter(mdRaw)
  return frontmatter.title
}

/**
 * 转换title
 * 此方法只转化提前定义好的二级标签的title
 * 例如 web-basis/javascript -> web-basis/JavaScript
 * 例如 web-basis/typescript -> web-basis/TypeScript
 */
function transitionTitle(title): String {
  // 需要转换的在这里定义
  const transitionMap = {
    'javascript': 'JavaScript',
    'typescript': 'TypeScript'
  }
  return transitionMap[title] || title
}

/**
 * 根据文件结构得到 router
 * 默认都会把 core 放在子类第一个
 */
async function getRouterList() {
  const routerList: any[] = []

  const categoryList = await fg('*', { cwd: DIR_SRC, onlyDirectories: true })
  for (let x = 0; x < categoryList.length; x++) {
    const categoryTitle = categoryList[x]

    // 排除掉 public 文件夹
    if (categoryTitle === 'public') continue;
    const items = await fg('*', { cwd: `${DIR_SRC}/${categoryTitle}`, onlyDirectories: true })
    const routerItem = { title: categoryTitle, link: categoryTitle, children: [] as any[] }

    for (let y = 0; y < items.length; y++) {
      const childrenLink = items[y]

      // 排除掉 encrypt 加密的文件夹
      if (childrenLink === 'encrypt') continue;
      const cwd = `${DIR_SRC}/${categoryTitle}/${childrenLink}`
      const index = routerItem.children.push({
        title: transitionTitle(childrenLink),
        link: childrenLink,
        children: []
      })

      const subChildren = await fg('*', { cwd })
      if (subChildren.length > 1) {
        for (let z = 0; z < subChildren.length; z++) {
          const link = subChildren[z].replace('.md', '')
          // core 统一放到下一步处理
          if (link === 'core') continue
          const title = await getTitle(join(cwd, subChildren[z]))
          routerItem.children[index - 1].children.push({
            title: title || link,
            link,
          })
        }
        // 将 core 文件夹总是放在第一位
        // 因为 core 那个对象总是 { title: 'core', link: 'core' } 这样的格式，所以直接添加到第一位
        routerItem.children[index - 1].children.unshift({ title: 'core', link: 'core' })
      } else {
        const title = await getTitle(join(cwd, 'core.md'))
        routerItem.children[index - 1].title = title || childrenLink
      }
    }

    routerList.push(routerItem)
  }

  return routerList
}

/**
 * router 排序
 * 将得到的路由表按照 fileSequence.json 中定义的排序,如果没有定义则按照默认
 */
function routerSequence(originList, sequenceList) {
  for (let i = sequenceList.length - 1; i >= 0; i--) {
    const { link, children } = sequenceList[i]
    const childrenIndex = originList.findIndex(item => item.link === link)
    if (childrenIndex === -1) {
      consola.error('metadata/fileSequence.json 定义了不存在的目录/文件,请检查目录结构是否和文件目录对应')
      return
    }

    const temporary = originList[childrenIndex]
    originList.splice(childrenIndex, 1)
    originList.unshift(temporary)

    if (children && children.length && temporary.children.length) {
      routerSequence(temporary.children, children)
    }
  }
}

/**
 * 获取页面顶部栏 nav
 */
function getNav(router): DefaultTheme.NavItem[] {
  return router.map(item => ({
    text: item.title,
    activeMatch: undefined,
    items: item.children.map(i => {
      const subLink = i.children.length ? i.children[0].link : 'core'
      return {
        text: i.title,
        link: `/${item.title}/${i.link}/${subLink}`
      }
    })
  }))
}

/**
 * 获取页面侧边栏 sidebar
 */
function getSidebar(router): DefaultTheme.Sidebar {
  const slidebar = {}

  for (let x = 0; x < router.length; x++) {
    const { title: category, children } = router[x]
    const links:object[] = []
    for (let y = 0; y < children.length; y++) {
      const { title, children, link } = router[x].children[y]
      const value: {
        text: string,
        items: { text: string, link: string }[],
        link: string
      } = { text: title, items: [], link: '' }

      if (children.length) {
        for (let z = 0; z < children.length; z++) {
          if (children[z].title === 'core') {
            value.items.unshift({
              text: children[z].title,
              link: `/${category}/${link}/${children[z].link}`
            })
          } else {
            value.items.push({
              text: children[z].title,
              link: `/${category}/${link}/${children[z].link}`
            })
          }
        }
      } else {
        value.items = [{
          text: 'core',
          link: `/${category}/${link}/core`
        }]
      }

      links.push(value)
    }
    slidebar[`/${category}/`] = links
  }
  return slidebar
}

async function run() {
  // 生成路由 json
  const router = await getRouterList()

  // 对生成的路由进行排序
  routerSequence(router, fileSequence)

  // 放置路由
  await fs.writeJSON(join(DIR_PACKAGE, 'index.json'), router, { spaces: 2 })

  // 根据路由生成 nav
  await fs.writeJSON(join(DIR_PACKAGE, 'nav.json'), getNav(router), { spaces: 2 })

  // 根据路由生成 sidebar
  await fs.writeJSON(join(DIR_PACKAGE, 'sidebar.json'), getSidebar(router), { spaces: 2 })
}

run()
