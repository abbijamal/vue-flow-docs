<script lang="ts" setup>
import {
  VueFlow,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  FlowInstance,
  Elements,
  Connection,
  Edge,
  ElementId,
} from '@braks/vue-flow'
import Sidebar from '../../components/DnDSidebar.vue'
import { script, tmpl, sidebarScript, sidebarTmpl } from './dnd-example'

const flowInstance = ref<FlowInstance>()
const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
])

let id = 0
const getId = (): ElementId => `dndnode_${id++}`

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onConnect = (params: Connection | Edge) => addEdge(params, elements.value)
const onElementsRemove = (elementsToRemove: Elements) => removeElements(elementsToRemove, elements.value)
const onLoad = (instance: FlowInstance) => (flowInstance.value = instance)

const onDrop = (event: DragEvent) => {
  event.preventDefault()

  if (flowInstance.value) {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect()
    const type = event.dataTransfer?.getData('application/vueflow')
    const position = flowInstance.value.project({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    }

    elements.value.push(newNode)
  }
}
</script>
<template>
  <div class="flex flex-col">
    <div class="flex flex-col md:flex-row w-full h-full">
      <div class="flex-1 h-full" @drop="onDrop">
        <VueFlow
          v-model="elements"
          :zoom-on-scroll="false"
          @elements-remove="onElementsRemove"
          @load="onLoad"
          @connect="onConnect"
          @dragover="onDragOver"
        >
          <Controls />
          <MiniMap />
          <Background color="#aaa" :gap="8" />
        </VueFlow>
      </div>
      <Sidebar />
    </div>
    <div class="description">
      <div class="content">
        <h1>Drag and Drop</h1>
        <p>
          Drag and Drop Sidebar handling is not built in but can be implemented with the native HTML Drag and Drop API, as this
          example shows.
        </p>
        <h2>Using the state outside of Vue Flow</h2>
        <p>
          This example shows another key feature of Vue Flow. You can initialize the Flow state at any point before the Vue Flow
          is actually mounted. This can be achieved by using the
          <nuxt-link to="/docs/api/composables">useVueFlow composable</nuxt-link> which returns an instance of a FlowStore. By
          passing an id to the store you can use it across your app.
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="sidebarScript" />
          <div v-html="sidebarTmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
