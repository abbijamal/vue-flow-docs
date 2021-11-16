<script lang="ts" setup>
import { Elements, FlowInstance, VueFlow, Background, Controls, MiniMap } from '@braks/vue-flow'
import { templateRef } from '@vueuse/core'

const elements = ref<Elements>([
  { id: '1', type: 'rgb', data: { color: 'r' }, position: { x: -25, y: 50 } },
  { id: '2', type: 'rgb', data: { color: 'g' }, position: { x: 50, y: -100 } },
  { id: '3', type: 'rgb', data: { color: 'b' }, position: { x: 0, y: 200 } },
  { id: '4', type: 'rgb-output', data: { label: 'RGB' }, position: { x: 400, y: 50 } },
  { id: 'e1-4', type: 'rgb-line', data: { color: 'red' }, source: '1', target: '4', animated: true },
  { id: 'e2-4', type: 'rgb-line', data: { color: 'green' }, source: '2', target: '4', animated: true },
  { id: 'e3-4', type: 'rgb-line', data: { color: 'blue' }, source: '3', target: '4', animated: true },
])

const el = templateRef<HTMLDivElement>('page', null)

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.setTransform({ x: el.value?.clientWidth / 2.5, y: el.value?.clientHeight / 3, zoom: 1.3 })
}
const color = ref({
  red: 100,
  green: 150,
  blue: 100,
})
const onChange = ({ color: c, val }: { color: string; val: number }) => (color.value[c] = Number(val))
</script>
<script lang="ts">
export default {
  layout: 'home',
}
</script>
<template>
  <div ref="page" class="flex demo-flow justify-center items-center h-full w-full gap-4">
    <VueFlow
      class="relative font-mono"
      :elements="elements"
      :node-types="['rgb', 'rgb-output']"
      :edge-types="['rgb-line']"
      @load="onLoad"
    >
      <template #edge-rgb-line="props">
        <CustomEdge v-bind="{ ...props, data: { text: color[props.data.color], color: props.data.color } }" />
      </template>
      <template #node-rgb="props">
        <RGBNode v-bind="props" :amount="color" @change="onChange" />
      </template>
      <template #node-rgb-output="props">
        <RGBOutputNode :v-bind="props" :color="color" />
      </template>
      <Controls />
      <Background color="#aaa" :gap="20" :size="0.7" />
      <MiniMap />
      <div class="z-99 flex flex-col gap-4 w-1/3 absolute top-50 left-15">
        <h1 class="text-2xl lg:text-5xl font-bold leading-tight">Visualize your ideas with Vue Flow</h1>
        <h2 class="text-lg lg:text-2xl text-gray-400 leading-tight">
          A customizable Vue.js library for building node-based editors and diagrams.
        </h2>
        <div class="transform scale-75 lg:scale-100 flex flex-row justify-center items-center gap-4 mt-6">
          <nuxt-link class="p-4 bg-green-500 rounded-full text-white hover:text-gray-200 font-semibold text-lg" to="/docs">
            Documentation
          </nuxt-link>
          <nuxt-link
            class="p-4 bg-white rounded-full bg-blue-500 text-white hover:text-gray-200 font-semibold text-lg"
            to="/examples"
          >
            Examples
          </nuxt-link>
        </div>
      </div>
    </VueFlow>
  </div>
</template>
