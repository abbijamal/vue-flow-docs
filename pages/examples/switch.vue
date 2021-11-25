<script lang="ts" setup>
import { VueFlow, removeElements, addEdge, Node, FlowElement, Elements, Connection, Edge } from '@braks/vue-flow'
import { script, tmpl } from './switch-example'

const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node)
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element)

const elementsA: Elements = [
  { id: '1a', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, class: 'light' },
  { id: '2a', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, class: 'light' },
  { id: '3a', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, class: 'light' },
  { id: '4a', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1a', target: '2a' },
  { id: 'e1-3', source: '1a', target: '3a' },
]

const elementsB: Elements = [
  { id: 'inputb', type: 'input', data: { label: 'Input' }, position: { x: 300, y: 5 }, class: 'light' },
  { id: '1b', data: { label: 'Node 1' }, position: { x: 0, y: 100 }, class: 'light' },
  { id: '2b', data: { label: 'Node 2' }, position: { x: 200, y: 100 }, class: 'light' },
  { id: '3b', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, class: 'light' },
  { id: '4b', data: { label: 'Node 4' }, position: { x: 600, y: 100 }, class: 'light' },

  { id: 'e1b', source: 'inputb', target: '1b' },
  { id: 'e2b', source: 'inputb', target: '2b' },
  { id: 'e3b', source: 'inputb', target: '3b' },
  { id: 'e4b', source: 'inputb', target: '4b' },
]

const elements = ref(elementsA)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onClick = (els: Elements) => (elements.value = els)
</script>
<template>
  <div class="py-4">
    <VueFlow
      v-model="elements"
      :zoom-on-double-click="false"
      :zoom-on-scroll="false"
      @element-click="onElementClick"
      @elements-remove="onElementsRemove"
      @connect="onConnect"
      @node-drag-stop="onNodeDragStop"
    >
      <div class="absolute top-10 right-10 z-4">
        <button class="button mr-4" @click="onClick(elementsA)">flow a</button>
        <button class="button" @click="onClick(elementsB)">flow b</button>
      </div>
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Switching Flows</h1>
        <p>
          Switching between different Flows is as easy as clicking a button. All you need to do is change your elements to reflect
          the graph you want to display. The code should look like this:
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
