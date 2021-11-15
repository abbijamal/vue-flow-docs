<script lang="ts" setup>
import { Elements, FlowInstance, VueFlow, Background, Controls, MiniMap } from '@braks/vue-flow'
import { templateRef } from '@vueuse/core'

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Welcome to Vue Flow!' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

const el = templateRef('page', null)

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.setTransform({ x: el.value?.clientWidth / 3, y: el.value?.clientHeight / 3, zoom: 1 })
}
</script>
<script lang="ts">
export default {
  layout: 'home',
}
</script>
<template>
  <div ref="page" class="flex demo-flow justify-center items-center h-full w-full gap-4">
    <VueFlow class="relative" :elements="elements" @load="onLoad">
      <Controls />
      <Background :gap="20" :size="0.7" />
      <MiniMap />
      <div class="z-99 flex flex-col gap-4 w-1/3 absolute top-50 left-15">
        <h1 class="text-2xl lg:text-5xl font-bold leading-tight">Visualize your ideas with VueFlow</h1>
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
