<script lang="ts" setup>
import {
  VueFlow,
  Background,
  Connection,
  Edge,
  Elements,
  FlowElement,
  FlowInstance,
  addEdge,
  isNode,
  removeElements,
  ArrowHeadType,
} from '@braks/vue-flow'

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Default Node' }, position: { x: 100, y: 150 } },
  { id: '3', data: { label: 'Default Node' }, position: { x: 400, y: 130 } },
  { id: '4', type: 'button', position: { x: 250, y: 300 }, style: { borderRadius: '50%' } },
  { id: 'e1-2', source: '1', target: '2', arrowHeadType: ArrowHeadType.Arrow },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { strokeWidth: 2, stroke: '#3b82f6' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { strokeWidth: 2, stroke: '#3b82f6' } },
  { id: 'e1-3', source: '1', target: '3', arrowHeadType: ArrowHeadType.Arrow },
])
const vueFlowInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance?.fitView({ padding: 0.3, offset: { y: 30 } })
  vueFlowInstance.value = flowInstance
}

const toggleClassnames = () => {
  elements.value = elements.value.map((el: FlowElement) => {
    if (isNode(el)) el.class = el.class === 'dark' ? 'light' : 'dark'
    return el
  })
}
</script>
<template>
  <div class="relative w-[100vw] h-[80vh] flex flex-col-reverse md:flex-row font-mono border-1 border-white bg-white">
    <div class="flex bg-light-800 flex-col justify-center gap-2 md:gap-4 p-6 w-full md:w-1/3">
      <h1 class="pointer-events-none text-xl lg:text-4xl">Easy to use</h1>
      <h2 class="pointer-events-none text-sm lg:text-xl text-black font-normal">
        Getting started is simple. All you need are some <strong>elements</strong> and you're ready to go.
        <span class="font-bold">Each element needs a unique id.</span> A node also needs a <strong>position (x and y)</strong>. An
        edge needs <strong>a source and a target</strong>.
      </h2>
      <div class="!pointer-events-auto transform scale-75 lg:scale-100 flex flex-row justify-center items-center gap-4">
        <nuxt-link class="p-4 bg-green-500 hover:bg-black rounded-xl !text-white font-semibold text-lg" to="/docs">
          Documentation
        </nuxt-link>
        <nuxt-link class="p-4 bg-white hover:bg-black rounded-xl bg-blue-500 !text-white font-semibold text-lg" to="/examples">
          Examples
        </nuxt-link>
      </div>
    </div>
    <VueFlow
      id="basic-flow"
      v-model="elements"
      class="vue-flow-basic-example"
      :node-types="['button']"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      :zoom-on-scroll="false"
      @elements-remove="onElementsRemove"
      @connect="onConnect"
      @load="onLoad"
    >
      <Background variant="dots" color="black" />
      <template #node-button>
        <slot></slot>
      </template>
      <div class="absolute right-[10px] top-[10px] z-4">
        <button class="button" @click="toggleClassnames">toggle class</button>
      </div>
    </VueFlow>
  </div>
</template>
<style>
.vue-flow__node.dark {
  @apply !bg-black;
}
</style>
