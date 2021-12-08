<script lang="ts" setup>
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowElement,
  FlowInstance,
  addEdge,
  isNode,
  removeElements,
  GraphNode,
} from '@braks/vue-flow'
import { script, tmpl, initElements } from './basic-example'
import * as img from 'html-to-image'
import { templateRef, unrefElement } from '@vueuse/core'

const el = templateRef('vue-flow', null)
const onNodeDragStop = ({ node }: { node: GraphNode }) => console.log('drag stop', node)
const onElementClick = ({ node }: { node: GraphNode }) => console.log('click', node)
const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
const vueFlowInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance?.fitView({ padding: 0.75 })
  vueFlowInstance.value = flowInstance
}

const screenshot = () =>
  img
    .toJpeg(<HTMLElement>unrefElement(el), { quality: 0.95 })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'vue-flow-screenshot.jpeg'
      link.href = dataUrl
      link.click()
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error)
    })

const toggleClassnames = () => {
  elements.value = elements.value.map((el: FlowElement) => {
    if (isNode(el)) el.class = el.class === 'dark' ? 'light' : 'dark'
    return el
  })
}
</script>
<template>
  <div>
    <VueFlow
      ref="vue-flow"
      v-model="elements"
      class="vue-flow-basic-example"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      :zoom-on-scroll="false"
      @elements-remove="onElementsRemove"
      @connect="onConnect"
      @node-drag-stop="onNodeDragStop"
      @node-click="onElementClick"
      @elementClick="onElementClick"
      @load="onLoad"
    >
      <MiniMap />
      <Controls />
      <Background color="#aaa" :gap="8" />
      <div class="absolute right-[10px] top-[10px] z-4">
        <button class="button" @click="screenshot">screenshot</button>
      </div>
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Screenshot Example</h1>
        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="initElements" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.vue-flow--node .light {
  @apply bg-white;
}

.vue-flow--node .dark {
  @apply bg-black;
}
</style>
