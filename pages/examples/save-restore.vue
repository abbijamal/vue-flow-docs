<script lang="ts" setup>
import { VueFlow, addEdge, Connection, Node, Edge, Elements, FlowInstance, removeElements } from '@braks/vue-flow'
import Controls from '../../components/SaveControls.vue'
import { script, tmpl, controlsScript, controlsTmpl } from './save-and-restore-example'

const initialElements: Elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref(initialElements)
const flowInstance = ref<FlowInstance>()

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onLoad = (instance: FlowInstance) => (flowInstance.value = instance)
const onRestore = (els: Elements) => (elements.value = els)
const onAdd = (el: Node) => (elements.value = elements.value.concat(el))
</script>
<template>
  <div>
    <VueFlow v-model="elements" :zoom-on-scroll="false" @elements-remove="onElementsRemove" @connect="onConnect" @load="onLoad">
      <Controls :flow-instance="flowInstance" @restore="onRestore" @add="onAdd" />
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Save & Restore - Built-in Storage</h1>
        <p>
          To store nodes you can use the built-in storage feature. Pass a storage-key prop to Vue Flow and flow will attempt to
          store every change to the graph in the localstorage (as a FlowExportsObject, i.e. elements, position and zoom are
          saved). You are free to implement your own storage solution though. The FlowInstance can export a FlowExportsObject at
          any point, which can be used to save and restore the state.
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="controlsScript" />
          <div v-html="controlsTmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.save__controls {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 4;
  font-size: 12px;
}

.save__controls button {
  margin-left: 5px;
}
</style>
