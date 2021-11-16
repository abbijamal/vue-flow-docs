<script lang="ts" setup>
import { Handle, NodeProps, Position } from '@braks/vue-flow'

interface TextOutputProps extends NodeProps {
  label: string
}

const props = defineProps<TextOutputProps>()
</script>
<template>
  <div class="p-4 bg-gray-200 border-1 border-solid border-white p-3 rounded-xl text-left text-black">
    <div class="text-md">{{ (props.label ?? `Enter a name`).toUpperCase() }}</div>
    <Handle type="source" :position="Position.Top" />
  </div>
</template>
