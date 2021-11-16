<script lang="ts" setup>
import { Handle, NodeProps, Position } from '@braks/vue-flow'

interface TextInputNodeProps extends NodeProps {
  label: string
}

const props = withDefaults(defineProps<TextInputNodeProps>(), {
  label: 'Enter a name',
})
const emit = defineEmits(['change'])
const onChange = (e: any) => emit('change', { name: props.label === 'First Name' ? 'first' : 'last', val: e.target.value })
</script>
<template>
  <div class="p-4 bg-gray-200 border-1 border-solid border-white p-3 rounded-xl text-left text-black">
    <div class="text-md">{{ props.label?.toUpperCase() }}</div>
    <input type="text" @input="onChange" />
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
