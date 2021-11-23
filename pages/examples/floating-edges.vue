<script lang="ts" setup>
import {
  FlowInstance,
  VueFlow,
  Elements,
  removeElements,
  Connection,
  Edge,
  ArrowHeadType,
  addEdge,
  useVueFlow,
} from '@braks/vue-flow'
import FloatingEdge from '../../components/FloatingEdge.vue'
import FloatingConnectionLine from '../../components/FloatingConnectionLine.vue'
import { createElements } from '../../components/floating-edge-utils'

const elements = ref(createElements())
const onLoad = (instance: FlowInstance) => instance.fitView()
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))

const onConnect = (params: Connection | Edge) =>
  (elements.value = addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, elements.value))
const store = useVueFlow({
  edgeTypes: ['floating'],
})
</script>
<template>
  <div class="floatingedges">
    <VueFlow v-model="elements" @load="onLoad">
      <template #custom-connection-line="props">
        <FloatingConnectionLine v-bind="props" />
      </template>
      <template #edge-floating="props">
        <FloatingEdge v-bind="props" :nodes="store.getNodes" />
      </template>
    </VueFlow>
  </div>
</template>
<style>
.floatingedges {
  flex-direction: column;
  display: flex;
  height: 100%;
}

.floatingedges .vue-flow__handle {
  opacity: 0;
}
</style>
