<script lang="ts" setup>
import { VueFlow, Elements, FlowInstance, Connection, addEdge, removeElements } from '@braks/vue-flow'
import useMd from '~/utils/md'

const elementsA: Elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: '<div>Default Node</div>' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
]

const npm = useMd.render(`
\`\`\`bash
$ npm i --save @braks/vue-flow
\`\`\`
`)

const yarn = useMd.render(`
\`\`\`bash
$ yarn add @braks/vue-flow
\`\`\`
`)

const script = useMd.render(`
\`\`\`typescript
// GettingStarted.vue
import { VueFlow, Elements } from '@braks/vue-flow'

const elements: Elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can pass a Vue component, string or html-string as a label
    data: { label: '<div>Default Node</div>' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
]
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<!-- GettingStarted.vue -->
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" />
  </div>
</template>
\`\`\`
`)

const elementsB: Elements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
]

const elements = ref<Elements>(elementsB)
const onLoad = (i: FlowInstance) => i.fitView({ padding: 0.3 })
const onConnect = (param: Connection) => addEdge(param, elements.value)
const onElementsRemove = (toRemove: Elements) => removeElements(toRemove, elements.value)
const bscript = useMd.render(`
\`\`\`typescript
import { VueFlow, Elements, FlowEvents, removeElements, addEdge } from '@braks/vue-flow'

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
]

const elements = ref<Elements>(initialElements)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: FlowEvents['connect']) => (elements.value = addEdge(params, elements.value))
\`\`\`
`)

const btmpl = useMd.render(`
\`\`\`markup
<div style="height: 300px">
  <VueFlow
     v-model="elements"
     @elements-remove="onElementsRemove"
     @connect="onConnect"
   />
</div>
\`\`\`
`)
</script>
<script lang="ts">
export default {
  layout: 'docs',
}
</script>
<template>
  <div>
    <h1>Getting started</h1>
    <p>Before you can start to use Vue Flow you need to install the library:</p>

    <h2 class="mb-2">Installation</h2>
    <div class="md">
      <div v-html="npm" />
      <div v-html="yarn" />
    </div>

    <h1>Usage</h1>
    <p>
      A flow consists of <strong>nodes</strong> and <strong>edges</strong> (or just nodes). Together we call them
      <strong>elements</strong>. You can pass a set of elements as a prop to the Flow component.
      <span class="font-bold text-yellow-600">Each element needs a unique id.</span> A node needs a position and a label and an
      edge needs a source (node id) and a target (node id). These are the most basic parameters for a flow. A simple setup could
      look like this:
    </p>

    <div class="md">
      <div v-html="script" />
      <div v-html="tmpl" />

      <div class="h-[300px] demo-flow">
        <VueFlow v-model="elementsA" @load="onLoad" :zoom-on-scroll="false" />
      </div>

      <AttentionBox>The dimensions of your Flow component depend on the parents dimensions.</AttentionBox>
    </div>

    <h1>Basic Functionality</h1>
    <p>
      We don’t do any state updates besides the positions. This means that you need to pass the functions to remove an element or
      connect nodes by yourself. You can implement your own ones or use the
      <nuxt-link to="/docs/api/helper-functions">helper functions</nuxt-link>
      that come with the library. Here you see an example of how to use the helper functions
      <strong>removeElements</strong> and <strong>addEdge</strong>.
    </p>

    <div class="md">
      <div v-html="bscript" />
      <div v-html="btmpl" />

      <p>In this example you can connect nodes and remove selected nodes and edges with the backspace key.</p>
      <div class="h-[300px] demo-flow">
        <VueFlow v-model="elements" @elements-remove="onElementsRemove" @connect="onConnect" @load="onLoad" />
      </div>
    </div>
  </div>
</template>
