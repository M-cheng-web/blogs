import DefaultTheme from 'vitepress/theme'
import Home from './components/home.vue'
import CanvasDemo from './components/canvasDemo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Home', Home)
    app.component('CanvasDemo', CanvasDemo)
  }
}