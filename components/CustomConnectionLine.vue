<script lang="ts" setup>
import { ConnectionLineProps } from '@braks/vue-flow'

interface CustomConnectionLineProps extends ConnectionLineProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
const props = defineProps<CustomConnectionLineProps>()

const path = computed(
  () =>
    `M${props.sourceX},${props.sourceY} C ${props.sourceX} ${props.targetY} ${props.sourceX} ${props.targetY} ${props.targetX},${props.targetY}`,
)
</script>
<template>
  <g>
    <path class="animated" fill="none" stroke="#222" :stroke-width="1.5" :d="path" />
    <circle :cx="props.targetX" :cy="props.targetY" fill="#fff" :r="3" stroke="#222" :stroke-width="1.5" />
  </g>
</template>
