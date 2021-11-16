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
  useStore,
} from '@braks/vue-flow'
import { PathFindingEdge } from '@braks/vue-flow-pathfinding-edge'
import initialElements from './elements'
import useMd from '~/utils/md'

const store = useStore()
const elements = ref<Elements>(initialElements)
const rfInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.3 })
  rfInstance.value = flowInstance
}

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
} from '@braks/vue-flow'
import { PathFindingEdge } from '@braks/vue-flow-pathfinding-edge'
import initialElements from './elements'

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
  :elements="elements"
  :edge-types="{ pathFinding: PathFindingEdge }"
  @elements-remove="onElementsRemove"
  @connect="onConnect"
  @load="onLoad"
>
  <Controls />
  <MiniMap />
  <Background color="#aaa" :gap="8" />
</VueFlow>
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
    <h1>Smart Edge that never crosses other nodes</h1>
    <p>You can add this custom edge to Vue Flow by simply installing the package and importing the component.</p>
    <div class="md">
      <div v-html="script" />
      <div v-html="tmpl" />
    </div>

    <div class="h-[300px] demo-flow shadow-xl mt-6">
      <VueFlow
        :elements="elements"
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
