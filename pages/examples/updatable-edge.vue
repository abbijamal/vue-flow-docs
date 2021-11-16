<script lang="ts" setup>
import {
  VueFlow,
  Controls,
  updateEdge,
  addEdge,
  Elements,
  FlowInstance,
  Connection,
  Edge,
  removeElements,
  FlowEvents,
  ConnectionMode,
} from '@braks/vue-flow'
import { script, tmpl } from './updatable-edge-example'

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Node <strong>A</strong>',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Node <strong>B</strong>',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'Node <strong>C</strong>',
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Updateable edge' },
]

const elements = ref(initialElements)
const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onEdgeUpdateStart = (edge: Edge) => console.log('start update', edge)
const onEdgeUpdateEnd = (edge: Edge) => console.log('end update', edge)
const onEdgeUpdate = ({ edge, connection }: FlowEvents['edgeUpdate']) =>
  (elements.value = updateEdge(edge, connection, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <div>
    <VueFlow
      :elements="elements"
      :snap-to-grid="true"
      :connection-mode="ConnectionMode.Loose"
      :zoom-on-scroll="false"
      @load="onLoad"
      @edge-update="onEdgeUpdate"
      @connect="onConnect"
      @edge-update-start="onEdgeUpdateStart"
      @elements-remove="onElementsRemove"
      @edge-update-end="onEdgeUpdateEnd"
    >
      <Controls />
    </VueFlow>
    <div class="description">
      <div class="content">
        <p>
          This example shows how you can update an edge by dragging it from one node to another and thus creating a new connection
          (and removing the old one).
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.updatenode__controls {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 4;
  font-size: 12px;
}

.updatenode__controls label {
  display: block;
}

.updatenode__bglabel {
  margin-top: 10px;
}

.updatenode__checkboxwrapper {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
</style>
