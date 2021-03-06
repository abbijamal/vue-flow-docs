<script lang="ts" setup>
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  Elements,
  FlowInstance,
  FlowElement,
  removeElements,
  Connection,
  addEdge,
  ArrowHeadType,
} from '@braks/vue-flow'
import CustomEdge from '../../components/CustomEdge.vue'
import CustomEdge2 from '../../components/CustomEdge2.vue'
import CustomLabel from '../../components/CustomLabel.vue'
import { script, tmpl, initElements } from './edges-example'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Input 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
  { id: '2a', data: { label: 'Node 2a' }, position: { x: 0, y: 180 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 250, y: 200 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 300 } },
  { id: '3a', data: { label: 'Node 3a' }, position: { x: 150, y: 300 } },
  { id: '5', data: { label: 'Node 5' }, position: { x: 250, y: 400 } },
  { id: '6', type: 'output', data: { label: 'Output 6' }, position: { x: 50, y: 550 } },
  { id: '7', type: 'output', data: { label: 'Output 7' }, position: { x: 250, y: 550 } },
  { id: '8', type: 'output', data: { label: 'Output 8' }, position: { x: 525, y: 600 } },
  { id: '9', type: 'output', data: { label: 'Output 9' }, position: { x: 675, y: 500 } },
  { id: 'e1-2', source: '1', target: '2', label: 'bezier edge (default)', class: 'normal-edge' },
  { id: 'e2-2a', source: '2', target: '2a', type: 'smoothstep', label: 'smoothstep edge' },
  { id: 'e2-3', source: '2', target: '3', type: 'step', label: 'step edge' },
  { id: 'e3-4', source: '3', target: '4', type: 'straight', label: 'straight edge' },
  { id: 'e3-3a', source: '3', target: '3a', type: 'straight', label: 'label only edge', style: { stroke: 'none' } },
  { id: 'e3-5', source: '4', target: '5', animated: true, label: 'animated styled edge', style: { stroke: 'red' } },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    label: {
      component: markRaw(CustomLabel),
      props: {
        text: 'custom label text',
      },
    },
    labelStyle: { fill: 'red', fontWeight: 700 },
    arrowHeadType: ArrowHeadType.Arrow,
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    label: 'label with styled bg',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    type: 'custom',
    data: { text: 'custom edge' },
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: 'e5-9',
    source: '5',
    target: '9',
    type: 'custom2',
    data: { text: 'custom edge 2' },
  },
]

const edgeTypes = ['custom', 'custom2']

const elements = ref<Elements>(initialElements)

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onNodeDragStop = (node: Node) => console.log('drag stop', node)
const onElementClick = (element: FlowElement) => console.log('click', element)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection) => (elements.value = addEdge(params, elements.value))
</script>
<template>
  <div>
    <VueFlow
      v-model="elements"
      :snap-to-grid="true"
      :edge-types="edgeTypes"
      :zoom-on-scroll="false"
      @element-click="onElementClick"
      @elements-remove="onElementsRemove"
      @connect="onConnect"
      @node-drag-stop="onNodeDragStop"
      @load="onLoad"
    >
      <template #edge-custom="props">
        <CustomEdge v-bind="props" />
      </template>
      <template #edge-custom2="props">
        <CustomEdge2 v-bind="props" />
      </template>
      <MiniMap />
      <Controls />
      <Background />
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>(Custom) Edges</h1>
        <p>
          Besides customizing edges you can of course use the default built-in edges. Vue Flow comes with a couple of default
          edges - bezier, step and smoothstep. You can of course create your own custom edges. More on that can be found in the
          <nuxt-link to="/examples/api/edge-types">edge types documentation</nuxt-link>.
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
