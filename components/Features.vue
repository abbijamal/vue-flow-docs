<script lang="ts" setup>
import { Elements, VueFlow, MiniMap, Controls, Background, FlowInstance, Position } from '@braks/vue-flow'

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'input' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'default' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'default' }, position: { x: 400, y: 100 } },
  { id: '4', type: 'output', data: { label: 'output' }, position: { x: 250, y: 225 } },
  { id: 'e1-2', source: '1', label: 'animated edge', target: '2', animated: true },
  { id: 'e1-3', source: '1', label: 'default edge', target: '3' },
  { id: 'e2-4', source: '2', type: 'smoothstep', target: '4' },
  { id: 'e3-4', source: '3', type: 'smoothstep', target: '4' },
])

const customizableElements = ref<Elements>([
  { id: '1', type: 'text-input', data: { label: 'First Name' }, position: { x: 50, y: 25 } },
  { id: '2', type: 'text-input', data: { label: 'Last Name' }, position: { x: 400, y: 25 } },
  { id: '3', type: 'text-output', data: { label: 'Node 3' }, position: { x: 300, y: 200 } },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
])

const additionalElements = ref<Elements>([
  {
    id: '1',
    style: { width: '75px' },
    type: 'input',
    sourcePosition: Position.Right,
    data: { label: 'input' },
    position: { x: 25, y: 120 },
  },
  {
    id: '2',
    data: { label: 'A' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 150, y: 25 },
    style: { width: '75px' },
  },
  {
    id: '3',
    data: { label: 'B' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 250, y: 25 },
    style: { width: '75px' },
  },
  {
    id: '4',
    data: { label: 'C' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 350, y: 25 },
    style: { width: '75px' },
  },
  {
    id: '5',
    data: { label: 'D' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 150, y: 220 },
    style: { width: '75px' },
  },
  {
    id: '6',
    data: { label: 'E' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 250, y: 220 },
    style: { width: '75px' },
  },
  {
    id: '7',
    data: { label: 'F' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 350, y: 220 },
    style: { width: '75px' },
  },
  {
    id: '8',
    type: 'output',
    data: { label: 'Output' },
    targetPosition: Position.Left,
    position: { x: 500, y: 120 },
    style: { width: '75px' },
  },
  { id: 'e1-2', type: 'step', source: '1', target: '2' },
  { id: 'e2-3', type: 'step', source: '2', target: '3' },
  { id: 'e3-4', type: 'step', source: '3', target: '4' },
  { id: 'e4-8', type: 'step', source: '4', target: '8' },
  { id: 'e1-5', type: 'step', source: '1', target: '5', animated: true },
  { id: 'e5-6', type: 'step', source: '5', target: '6', animated: true },
  { id: 'e6-7', type: 'step', source: '6', target: '7', animated: true },
  { id: 'e6-8', type: 'step', source: '7', target: '8', animated: true },
])

const label = ref({
  first: '',
  last: '',
})
const onChange = ({ name, val }: { name: 'first' | 'last'; val: string }) => (label.value[name] = val)
const onLoad = (vf: FlowInstance) => {
  vf.fitView({ padding: 0.2 })
}
</script>
<template>
  <div class="p-24 w-full min-h-[80vh] bg-gray-100 text-black normal-case flex flex-col justify-center items-center gap-48">
    <div class="w-full flex flex-row gap-12 justify-center items-center">
      <div class="flex-1 gap-2 flex flex-col justify-center items-center w-1/3">
        <h1>Feature-rich</h1>
        <p class="w-2/3">
          Vue Flow comes with seamless zooming & panning, different edge and node types, single and multi-selection, controls,
          several event handlers and more.
        </p>
        <nuxt-link class="text-xl mt-4" to="/docs">Documentation</nuxt-link>
      </div>
      <div class="flex-1 h-[300px] shadow-xl bg-white border-1 border-solid border-gray-300 rounded-xl font-mono uppercase">
        <VueFlow :elements="elements" @load="onLoad">
          <Controls />
          <Background color="#aaa" :gap="8" />
        </VueFlow>
      </div>
    </div>
    <div class="w-full flex flex-row gap-12 justify-center items-center">
      <div class="flex-1 h-[300px] shadow-xl bg-gray-800 border-1 border-solid border-gray-300 rounded-xl">
        <VueFlow
          :snap-grid="[25, 25]"
          :snap-to-grid="true"
          :zoom-on-scroll="false"
          :pane-moveable="false"
          :elements="customizableElements"
          :node-types="{ 'text-input': true, 'text-output': true }"
        >
          <template #node-text-output="props">
            <TextOutputNode v-bind="props" :label="`${label.first} ${label.last}`" />
          </template>
          <template #node-text-input="props">
            <TextInputNode :label="props.data.label" @change="onChange" />
          </template>
          <Background variant="lines" color="#aaa" :gap="46" />
        </VueFlow>
      </div>
      <div class="flex-1 gap-2 flex flex-col justify-center items-center w-1/3">
        <h1>Customizable</h1>
        <p class="w-2/3">
          You can create your own node and edge types or just pass a custom style. You can implement custom UIs inside your nodes
          and add functionality to your edges.
        </p>
        <nuxt-link class="text-xl mt-4" to="/docs">Documentation</nuxt-link>
      </div>
    </div>
    <div class="w-full flex flex-row gap-12 justify-center items-center">
      <div class="flex-1 gap-2 flex flex-col justify-center items-center w-1/3">
        <h1>Additional Components</h1>
        <p class="w-2/3">
          Vue Flow includes a MiniMap, Controls and Background, as well as a ton of utilities to control the internal state
          outside the Vue Flow component.
        </p>
        <nuxt-link class="text-xl mt-4" to="/docs">Documentation</nuxt-link>
      </div>
      <div class="flex-1 h-[300px] shadow-xl bg-white border-1 border-solid border-gray-300 rounded-xl font-mono uppercase">
        <VueFlow :zoom-on-scroll="false" :pane-moveable="false" :elements="additionalElements">
          <Controls :show-interactive="false" />
          <MiniMap class="transform scale-75" />
          <Background variant="lines" color="#aaa" :gap="46" />
        </VueFlow>
      </div>
    </div>
  </div>
</template>
