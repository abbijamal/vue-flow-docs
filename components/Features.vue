<script lang="ts" setup>
import { Elements, VueFlow, MiniMap, Controls, Background } from '@braks/vue-flow'

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

const customizableElements = ref<Elements>([
  { id: '1', type: 'text-input', data: { label: 'First Name' }, position: { x: 50, y: 25 } },
  { id: '2', type: 'text-input', data: { label: 'Last Name' }, position: { x: 400, y: 25 } },
  { id: '3', type: 'text-output', data: { label: 'Node 3' }, position: { x: 300, y: 200 } },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
])

const label = ref({
  first: '',
  last: '',
})
const onChange = ({ name, val }: { name: 'first' | 'last'; val: string }) => (label.value[name] = val)
</script>
<template>
  <div
    class="py-24 px-12 w-full min-h-[80vh] bg-gray-100 text-black normal-case flex flex-col justify-center items-center gap-48"
  >
    <div class="w-full flex flex-row gap-12 justify-center items-center">
      <div class="gap-2 flex flex-col justify-center items-center text-left w-1/3">
        <h1>Feature-rich</h1>
        <p>
          Vue Flow comes with seamless zooming & panning, different edge and node types, single and multi-selection, controls,
          several event handlers and more.
        </p>
        <nuxt-link class="text-2xl" to="/docs">Documentation</nuxt-link>
      </div>
      <div class="w-1/2 h-[300px] bg-white border-1 border-solid border-gray-300 rounded-xl">
        <VueFlow :elements="elements">
          <Controls />
          <Background color="#aaa" :gap="8" />
        </VueFlow>
      </div>
    </div>
    <div class="w-full flex flex-row gap-12 justify-center items-center">
      <div class="w-1/2 h-[300px] bg-gray-800 border-1 border-solid border-gray-300 rounded-xl">
        <VueFlow
          :snap-grid="[25, 25]"
          :snap-to-grid="true"
          :elements="customizableElements"
          :node-types="['text-input', 'text-output']"
        >
          <template #node-text-output="props">
            <TextOutputNode v-bind="props" :label="`${label.first} ${label.last}`" />
          </template>
          <template #node-text-input="props">
            <TextInputNode :label="props.data.label" @change="onChange" />
          </template>
          <MiniMap mask-color="#e5f0ef" />
          <Controls />
          <Background color="#aaa" :gap="8" />
        </VueFlow>
      </div>
      <div class="gap-2 flex flex-col justify-center items-center text-left w-1/3">
        <h1>Customizable</h1>
        <p>
          You can create your own node and edge types or just pass a custom style. You can implement custom UIs inside your nodes
          and add functionality to your edges.
        </p>
        <nuxt-link class="text-2xl" to="/docs">Documentation</nuxt-link>
      </div>
    </div>
  </div>
</template>
