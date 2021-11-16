<script lang="ts" setup>
import {
  VueFlow,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  FlowInstance,
  Connection,
  Edge,
  Elements,
} from '@braks/vue-flow'
import { script, tmpl, initElements } from './edge-types-example'
import { getElements } from './edgeTypesUtils'

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  console.log(flowInstance.getElements())
}

const elements = ref<Elements>(getElements())
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
</script>
<template>
  <div>
    <VueFlow :elements="elements" :min-zoom="0.2" @load="onLoad" @elements-remove="onElementsRemove" @connect="onConnect">
      <MiniMap />
      <Controls />
    </VueFlow>
    <div class="description">
      <div class="content">
        <p>Example that shows all the different edge types of Vue Flow.</p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="initElements" />
        </div>
      </div>
    </div>
  </div>
</template>
