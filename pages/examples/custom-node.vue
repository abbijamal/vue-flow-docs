<script lang="ts" setup>
import {
  VueFlow,
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowInstance,
  Elements,
  SnapGrid,
  Connection,
  ConnectionMode,
  Edge,
  Position,
} from '@braks/vue-flow'
import ColorPickerNode from '../../components/ColorPickerNode.vue'
import { script, tmpl } from './custom-node-example'

const elements = ref<Elements>([])
const bgColor = ref('#1A192B')
const connectionLineStyle = { stroke: '#fff' }
const snapGrid: SnapGrid = [16, 16]

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  console.log('flow loaded:', flowInstance)
}
const onNodeDragStop = ({ node }) => console.log('drag stop', node)
const onElementClick = ({ element }) => console.log('click', element)
const nodeStroke = (n: Node): string => {
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'selectorNode') return bgColor.value
  if (n.type === 'output') return '#ff0072'
  return '#eee'
}
const nodeColor = (n: Node): string => {
  if (n.type === 'selectorNode') return bgColor.value
  return '#fff'
}

const onChange = (event: Event) => {
  elements.value = elements.value.map((e) => {
    if (isEdge(e) || e.id !== '2') {
      return e
    }
    const color = (event.target as HTMLInputElement).value
    bgColor.value = color

    return {
      ...e,
      data: {
        ...e.data,
        color,
      },
    }
  })
}

elements.value = [
  {
    id: '1',
    type: 'input',
    data: { label: 'An input node' },
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { onChange, color: bgColor.value },
    style: { border: '1px solid #777', padding: '10px' },
    position: { x: 250, y: 50 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output A' },
    position: { x: 650, y: 25 },
    targetPosition: Position.Left,
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Output B' },
    position: { x: 650, y: 100 },
    targetPosition: Position.Left,
  },

  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fff' } },
  { id: 'e2a-3', source: '2', sourceHandle: 'a', target: '3', animated: true, style: { stroke: '#fff' } },
  { id: 'e2b-4', source: '2', sourceHandle: 'b', target: '4', animated: true, style: { stroke: '#fff' } },
]

const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))

const onConnect = (params: Connection | Edge) =>
  (elements.value = addEdge(
    {
      ...params,
      animated: true,
      style: { stroke: '#fff' },
    } as Edge,
    elements.value,
  ))
</script>
<template>
  <div>
    <VueFlow
      v-model="elements"
      :style="`background: ${bgColor}`"
      :node-types="['selectorNode']"
      :connection-mode="ConnectionMode.Loose"
      :connection-line-style="connectionLineStyle"
      :snap-to-grid="true"
      :snap-grid="snapGrid"
      :default-zoom="1.5"
      :zoom-on-scroll="false"
      @element-click="onElementClick"
      @elements-remove="onElementsRemove"
      @connect="onConnect"
      @node-drag-stop="onNodeDragStop"
      @load="onLoad"
    >
      <template #node-selectorNode="props">
        <ColorPickerNode v-bind="props" />
      </template>
      <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
      <Controls />
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Custom Node</h1>
        <p>
          One of the key features is implementing custom elements (nodes / edges). This is an example of a basic custom node
          implementation. You can display any content and functionality inside a custom node. More documentation about how to set
          up a custom node can be found on the
          <nuxt-link to="/docs/api/node-types">custom nodes doc page</nuxt-link>. The example on this page looks like this:
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
