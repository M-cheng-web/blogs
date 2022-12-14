<template>
  <div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">canvas</span><pre class="shiki"><code>{{code}}</code></pre></div>

  <div class='canvas-demo' id="demo">
    <canvas :width="width" :height="height" ref="canvasRef"></canvas>
  </div>
</template>

<script lang='ts' setup>
import { ref, withDefaults, onMounted } from 'vue'

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

const canvasRef = ref()
onMounted(() => {
  const canvas = canvasRef.value
  eval(props.code)
})

</script>

<style lang='scss' scoped>
.canvas-demo {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: rgba(255, 255, 255, 0.2);

  canvas {}
}
</style>
