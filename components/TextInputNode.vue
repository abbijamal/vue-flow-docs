<script lang="ts" setup>
import { Handle, NodeProps, Position } from '@braks/vue-flow'

interface TextInputNodeProps extends NodeProps {
  label: string
}

const props = withDefaults(defineProps<TextInputNodeProps>(), {
  label: '',
})
const emit = defineEmits(['change'])
const input = ref('')
</script>
<template>
  <div class="p-4 bg-gray-200 border-1 border-solid border-white p-3 rounded-xl text-left text-black">
    <div class="text-md mb-1 font-semibold">{{ props.label?.toUpperCase() }}</div>
    <input v-model="input" type="text" :placeholder="`Enter ${props.label}`" />
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
<style scoped>
input {
  outline: none;
}
</style>
