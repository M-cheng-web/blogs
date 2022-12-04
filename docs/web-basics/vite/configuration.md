# 小配置
## 配置 css
为什么需要配置css打包,如果不用配置任何css方案会出现哪些问题?
1. 老生常谈,基础的css是不支持选择器嵌套的
2. 样式很可能会存在污染,使用心智徒增
3. 浏览器兼容问题,某些css属性为了兼容大部分浏览器需要增加前缀
4. 打包后的css代码是无删减的,不能做到抛弃无用的css

针对于以上问题,目前已有的解决方案有:
1. sass/scss 和 less
2. vue 的 style scoped
3. react 更改文件名 .module.scss
4. PostCSS (打包时自动添加浏览器前缀)
5. windicss 和 unocss 也是不错的原子化css方案

那么想用这些解决方案就需要利用这些方案提供的插件对原生css进行打包,生成最终能在生产环境使用的css,同时开发环境也能屏蔽以上那些问题
``` ts
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
  },
};
```

## 批量引入文件
比如在 Header 中分别引入 5 个 svg 文件:
``` ts
import Logo1 from '@assets/icons/logo-1.svg';
import Logo2 from '@assets/icons/logo-2.svg';
import Logo3 from '@assets/icons/logo-3.svg';
import Logo4 from '@assets/icons/logo-4.svg';
import Logo5 from '@assets/icons/logo-5.svg';
```

Vite 中提供了import.meta.glob的语法糖来解决这种批量导入的问题,如上述的 import 语句可以写成下面这样:
``` ts
const icons = import.meta.glob('../../assets/icons/logo-*.svg');
```

### alias别名
``` js
import path from 'path'

resolve: {
  alias: {
    '@': `${path.resolve(__dirname, 'src')}`,
  },
},
```

## 环境变量
1. 根目录创建 `.env.production` 和 `.env.development`
2. 分别内容填充为 `VITE_APP_CCC = 'aaa'` 和 `VITE_APP_CCC = 'bbb'` (必须要 VITE_APP 开头)
3. package.json 文件配置启动命令 `"dev": "vite"` 和 `"dev:prod": "vite --mode production"` 分别表示测试环境和生产环境
4. 在项目中通过 `import.meta.env` 进行获取变量

想要在 vite.config.ts 中拿到环境变量,需要下面配置
``` js
import { defineConfig, loadEnv } from 'vite'
export default ({ mode }) =>{
  const env=loadEnv(mode, process.cwd());  // 获取.env文件里定义的环境变量
  // console.log(12, env)
  return defineConfig({
   // ...
  })
}
```

## 本地请求代理
``` js
server:{
  proxy:{
    '/api': {
      target: 'https://live.xxx.cc',
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(/^\/api/, ''),
    }
  }
}
```