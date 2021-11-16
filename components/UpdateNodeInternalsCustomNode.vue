<script lang="ts" setup>
import { Handle, Position, NodeProps } from '@braks/vue-flow'

interface CustomNodeProps extends NodeProps {
  data: {
    handleCount: number
    handlePosition: number
  }
}

const props = defineProps<CustomNodeProps>()
</script>
<template>
  <div class="p-4 border-1 border-solid border-black">
    <Handle type="target" :position="Position.Left" />
    <div>output handle count: {{ props.data.handleCount }}</div>
    <Handle
      v-for="i of props.data.handleCount"
      :id="`handle-${i}`"
      :key="`handle-${i}`"
      type="source"
      :position="Position.Right"
      :style="{ top: `${10 * i + props.data.handlePosition * 10}px` }"
    />
  </div>
</template>
