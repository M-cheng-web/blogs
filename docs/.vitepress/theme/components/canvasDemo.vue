<template>
  <div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">canvas</span>
    <pre class="shiki"><code>{{ code }}</code></pre>
  </div>

  <div class='canvas-demo' id="demo">
    <canvas :width="width" :height="height" ref="canvasRef"></canvas>
  </div>
</template>

<script lang='ts' setup>
import { ref, withDefaults, onMounted, watch } from 'vue'

interface Props {
  code: string,
  width?: string,
  height?: string,
}
const props = withDefaults(defineProps<Props>(), {
  width: '300',
  height: '100',
  code: '',
})

watch(() => props.code, () => {
  clearCanvas()
  drawCanvas()
})

const canvasRef = ref()
onMounted(() => {
  drawCanvas()
})

function clearCanvas() {
  // 重新赋值宽高会清空
  const canvas = canvasRef.value
  canvas.width = props.width
  canvas.height = props.height
}
function drawCanvas() {
  // 不能通过 document.getid 这种方式获取 canvas，当组件被多次使用时这种方式会使得在同一个canvas上绘制
  const code = props.code.replace("canvas.getContext('2d')", "canvasRef.value.getContext('2d')")
  eval(code)
}

</script>

<style lang='scss' scoped>
.canvas-demo {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
