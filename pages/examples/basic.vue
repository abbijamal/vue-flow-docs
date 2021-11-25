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

const updatePos = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
    return el
  })
}

const logToObject = () => console.log(vueFlowInstance.value?.toObject())
const resetTransform = () => vueFlowInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 })

const toggleClassnames = () => {
  elements.value = elements.value.map((el: FlowElement) => {
    if (isNode(el)) el.class = el.class === 'dark' ? 'light' : 'dark'
    return el
  })
}
</script>
<template>
  <div class="py-4">
    <VueFlow
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
      <Controls />
      <Background color="#aaa" :gap="8" />
      <div class="absolute right-[10px] top-[10px] z-4">
        <button class="button" @click="resetTransform">reset transform</button>
        <button class="button" @click="updatePos">change pos</button>
        <button class="button" @click="toggleClassnames">toggle classnames</button>
        <button class="button" @click="logToObject">toObject</button>
      </div>
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Basic Example</h1>
        <p>
          This is a very basic example of a Vue Flow graph. It passes a number of elements and uses basic event handlers to react
          to changes like adding a connection or removing elements. A flow consists of <strong>nodes</strong> and
          <strong>edges</strong> (or just nodes). Together we call them <strong>elements</strong>. You can pass a set of elements
          as a prop to the Flow component. <span class="font-bold text-yellow-600">Each element needs a unique id.</span> A node
          needs a position and an edge needs a source (node id) and a target (node id). These are the most basic parameters to
          create a graph. The example on this page looks like this:
        </p>

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
