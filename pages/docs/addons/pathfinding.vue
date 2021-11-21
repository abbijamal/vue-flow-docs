<script lang="ts" setup>
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowInstance,
  addEdge,
  removeElements,
  useVueFlow,
} from '@braks/vue-flow'
import PathFindingEdge from '@braks/vue-flow-pathfinding-edge'
import initialElements from './elements'
import useMd from '~/utils/md'

const store = useVueFlow()
const elements = ref<Elements>(initialElements)
const rfInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.3 })
  rfInstance.value = flowInstance
}

const npm = useMd.render(`
\`\`\`bash
$ npm i --save @braks/vue-flow-pathfinding-edge
\`\`\`
`)

const yarn = useMd.render(`
\`\`\`bash
$ yarn add @braks/vue-flow-pathfinding-edge
\`\`\`
`)

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowInstance,
  addEdge,
  removeElements,
  useVueFlow,
} from '@braks/vue-flow'
import PathFindingEdge from '@braks/vue-flow-pathfinding-edge'
import initialElements from './elements'

const store = useVueFlow()
const elements = ref<Elements>(initialElements)
const rfInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 1 })
  rfInstance.value = flowInstance
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
  v-model="elements"
  :edge-types="['pathFinding']"
  @elements-remove="onElementsRemove"
  @connect="onConnect"
  @load="onLoad"
>
  <template #edge-pathFinding="props">
    <PathFindingEdge v-bind="props" :nodes="store.nodes" />
  </template>
  <Controls />
  <MiniMap />
  <Background color="#aaa" :gap="8" />
</VueFlow>
\`\`\`
`)

const nuxtConf = useMd.render(`
\`\`\`typescript
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  build: {
    transpile: ['@braks/vue-flow-pathfinding-edge'],
  },
})

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
    <h1>Pathfinding Edge</h1>
    <p>
      The pathfinding edge is a custom edge that you can install separately. This custom edge will try to create a path without
      crossing any nodes in it's path, if at all possible.
    </p>

    <h2>Install</h2>
    <div class="md">
      <div v-html="npm" />
      <div v-html="yarn" />
    </div>

    <AttentionBox class="mt-6">
      <p class="font-semibold">Using Nuxt(3) you have to transpile the smart edge for ssr.</p>
      <div class="md">
        <div v-html="nuxtConf" />
      </div>
    </AttentionBox>

    <h1>Demo</h1>
    <div class="h-[300px] demo-flow shadow-xl mt-6">
      <VueFlow
        v-model="elements"
        :edge-types="['pathFinding']"
        @elements-remove="onElementsRemove"
        @connect="onConnect"
        @load="onLoad"
      >
        <template #edge-pathFinding="props">
          <PathFindingEdge v-bind="props" :nodes="store.nodes" />
        </template>
        <Background color="#aaa" :gap="8" />
      </VueFlow>
    </div>
  </div>
</template>
