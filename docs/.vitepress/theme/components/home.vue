<template>
  <div class='home' ref="homeRef">
    <canvas id="canvas" scale-50 origin-top-left />
    <div class="content">
      <img src="../../../public/sanji.png" :style="{ opacity, width }" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, computed } from 'vue'
import { useMediaQueryS } from '@morehook/core'

const query = {
  xs: '(max-width:500px)',
  sm: '(min-width:500px)',
  md: '(min-width:700px)',
  lg: '(min-width:900px)',
  xl: '(min-width:1100px)',
  xxl: '(min-width:1300px)'
}
const queryKey = useMediaQueryS(query)
const width = computed(() => {
  switch (queryKey.value) {
    case 'xs':
      return '100px'
    case 'sm':
      return '100px'
    case 'md':
      return '150px'
    case 'lg':
      return '200px'
    case 'xl':
      return '250px'
    case 'xxl':
      return '300px'
    default:
      return '500px'
  }
})

interface Point {
  x: number
  y: number
}
interface Branch {
  start: Point
  length: number
  theta: number
}

const homeRef = ref()
let ctx: CanvasRenderingContext2D
onMounted(() => {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = homeRef.value.clientWidth
  canvas.height = homeRef.value.clientHeight
  ctx = canvas.getContext('2d')!;
  init()
})

function init() {
  ctx.strokeStyle = 'rgba(99, 110, 114, 0.8)'
  step({
    start: { x: 0, y: 0 },
    length: 2,
    theta: Math.PI / 4,
  })
}

let pendingTasks: Function[] = []

function step(b: Branch, depth = 0) {
  const end = {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
  lineTo(b.start, end)

  if (depth < 20 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length + (Math.random() * 2 - 1),
      theta: b.theta - 0.2 * Math.random(),
    }, depth + 1))
  }
  if (depth < 1 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length + (Math.random() * 2 - 1),
      theta: b.theta + 0.2 * Math.random(),
    }, depth + 1))
  }
}

if (typeof window !== 'undefined') {
  startFrame()
}
let framesCount = 0
const endCount = 400
const opacity = ref(0)
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if (framesCount % 2 === 0) frame() // 控制生长速度
    if (framesCount < endCount) {
      startFrame()
      opacity.value = framesCount / endCount
    }
  })
}
function frame() {
  const tasks: Function[] = []
  pendingTasks = pendingTasks.filter((i) => {
    if (Math.random() > 0.2) {
      tasks.push(i)
      return false
    }
    return true
  })
  tasks.forEach(fn => fn())
}

function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}
</script>

<style lang='scss' scoped>
.home {
  height: calc(100vh - 72px);
  position: relative;

  #canvas {
    position: absolute;
    top: 0;
  }

  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    img {
      position: absolute;
      right: 50px;
      bottom: 50px;
    }
  }
}
</style>
