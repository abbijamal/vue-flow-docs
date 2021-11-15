<script lang="ts" setup>
import { Handle } from '@braks/vue-flow'

const props = defineProps<{ data: { text: string } }>()
const customNodeStyles = {
  background: '#9CA8B3',
  color: '#FFF',
  padding: '10px',
}
</script>
<template>
  <div :style="customNodeStyles">
    <Handle type="target" position="left" style="border-radius: 0" />
    <div>{{ data.text }}</div>
    <Handle id="a" type="source" position="right" style="top: 30%; border-radius: 0" />
    <Handle id="b" type="source" position="right" style="top: 70%; border-radius: 0" />
  </div>
</template>
