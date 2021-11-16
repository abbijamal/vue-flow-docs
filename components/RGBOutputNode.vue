<script lang="ts" setup>
import { Handle, NodeProps, Position } from '@braks/vue-flow'

interface RBGOutputNodeProps extends NodeProps {
  color: {
    red: number
    green: number
    blue: number
  }
}

const props = defineProps<RBGOutputNodeProps>()
const color = computed(() => `rgb(${props.color.red}, ${props.color.green}, ${props.color.blue})`)
</script>
<template>
  <div :style="{ backgroundColor: color }" class="p-3 rounded-xl text-left text-white">
    <div class="text-md">{{ color.toUpperCase() }}</div>
    <Handle type="source" :position="Position.Left" />
  </div>
</template>
