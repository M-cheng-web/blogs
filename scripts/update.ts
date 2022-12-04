import fs from 'fs-extra'
import fg from 'fast-glob'
import Git from 'simple-git'
import matter from 'gray-matter'
import { join, resolve } from 'path'
import consola from 'consola'
import fileSequence from './fileSequence.json'

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
 */
function transitionTitle(title): String {
  // 需要转换的在这里定义
  const transitionMap = {
    'javascript': 'JavaScript'
  }
  return transitionMap[title] || title
}

/**
 * 根据文件结构得到 router
 */
async function getRouterList() {
  const routerList: any[] = []

  const categoryList = await fg('*', { cwd: DIR_SRC, onlyDirectories: true })
  for (let x = 0; x < categoryList.length; x++) {
    const categoryTitle = categoryList[x]
    const items = await fg('*', { cwd: `${DIR_SRC}/${categoryTitle}`, onlyDirectories: true })
    const routerItem = { title: categoryTitle, link: categoryTitle, children: [] as any[] }

    for (let y = 0; y < items.length; y++) {
      const childrenLink = items[y]
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
          const title = await getTitle(join(cwd, subChildren[z]))
          routerItem.children[index - 1].children.push({
            title: title || link,
            link,
          })
        }
      } else {
        const title = await getTitle(join(cwd, 'index.md'))
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
  for (let i = sequenceList.length - 1; i >= 0 ; i--) {
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

async function run() {
  const router = await getRouterList()
  routerSequence(router, fileSequence)
  await fs.writeJSON(join(DIR_PACKAGE, 'index.json'), router, { spaces: 2 })
}

run()
