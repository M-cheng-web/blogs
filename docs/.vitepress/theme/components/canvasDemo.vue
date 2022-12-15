<template>
  <div v-if="showCode" class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">canvas</span>
    <pre class="shiki"><code>{{ displayCode }}</code></pre>
  </div>

  <div class='canvas-demo' id="demo">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang='ts' setup>
import { ref, withDefaults, onMounted, watch, computed } from 'vue'

interface Props {
  code: string,
  showCode?: boolean,
  width?: string,
  height?: string,
}
const props = withDefaults(defineProps<Props>(), {
  code: '',
  showCode: true,
  width: '300',
  height: '100',
})

const displayCode = computed(() => props.code.replace(/\n/, ''))

watch(() => [props.code, props.width, props.height], () => {
  init()
})

const canvasRef = ref()
onMounted(() => {
  init()
})

function init() {
  clearCanvas()
  drawCanvas()
}

function clearCanvas() {
  // 重新赋值宽高会清空，也可以当宽高发生变化时动态更改
  const canvas = canvasRef.value
  canvas.width = props.width
  canvas.height = props.height
}
function drawCanvas() {
  // 不能通过 document.getid 这种方式获取 canvas，当组件被多次使用时这种方式会使得在同一个canvas上绘制
  const code = props.code.replace(/canvas/g, "canvasRef.value")
  // const code = props.code.replace(/canvas.getContext/g, "canvasRef.value.getContext")
  eval(code)
}

</script>

<style lang='scss' scoped>
.canvas-demo {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
