<template>
  <div class='home' ref="homeRef">
    <canvas id="canvas" scale-50 origin-top-left />
    <!-- <div class="content">
      <div>期待每一天的清晨</div>
      <div>让我们开始吧！</div>
      <div>
      程序员，就像诗人一样，几乎仅仅工作在单纯的思考中。
      程序员凭空地运用自己的想象，来建造自己的“城堡”。很少有这样的介质 —— 创造的方式如此得灵活，
      如此得易于精炼和重建，如此得容易实现概念上的设想。"
      —— 《人月神话》
      </div>
    </div> -->
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'

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

  if (depth < 24 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length + (Math.random() * 2 - 1),
      theta: b.theta - 0.2 * Math.random(),
    }, depth + 1))
  }
  if (depth < 2 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length + (Math.random() * 2 - 1),
      theta: b.theta + 0.2 * Math.random(),
    }, depth + 1))
  }
}

startFrame()
let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if (framesCount % 1 === 0) frame() // 控制生长速度
    if (framesCount < 300) startFrame()
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
    border: 1px solid red;
    width: 800px;
    margin: 0 auto;
  }
}
</style>
