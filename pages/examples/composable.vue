<script lang="ts" setup>
import {
  VueFlow,
  addEdge,
  removeElements,
  Controls,
  FlowInstance,
  FlowElement,
  Connection,
  Edge,
  Elements,
  ConnectionMode,
  useVueFlow,
} from '@braks/vue-flow'
import Sidebar from '../../components/ProviderSidebar.vue'
import { script, tmpl, sidebarScript, sidebarTmpl } from './composables-example'

const onElementClick = (element: FlowElement) => console.log('click', element)
const onLoad = (flowInstance: FlowInstance) => {
  console.log('flow loaded:', flowInstance)
  flowInstance.fitView({ padding: 0.5 })
}

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

useVueFlow()
const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <div class="flex flex-col">
    <div class="providerflow">
      <Sidebar />
      <div class="vue-flow-wrapper">
        <VueFlow
          v-model="elements"
          :connection-mode="ConnectionMode.Loose"
          :zoom-on-scroll="false"
          @element-click="onElementClick"
          @connect="onConnect"
          @elements-remove="onElementsRemove"
          @load="onLoad"
        >
          <Controls />
        </VueFlow>
      </div>
    </div>
    <div class="description">
      <div class="content">
        <h1><nuxt-link to="/docs/api/composables">UseVueFlow (Composable)</nuxt-link></h1>
        <h2>Using the state outside of Vue Flow</h2>
        <p>
          This example shows another key feature of Vue Flow. You can initialize the Flow state at any point before the Vue Flow
          is actually mounted. This can be achieved by using the
          <nuxt-link to="/docs/api/composables">useVueFlow composable</nuxt-link> which returns an instance of a FlowStore. By
          passing an id to the store you can use it across your app.
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="sidebarScript" />
          <div v-html="sidebarTmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.providerflow {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.providerflow aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.providerflow aside .description {
  margin-bottom: 10px;
}

.providerflow aside .title {
  font-weight: 700;
  margin-bottom: 5px;
}

.providerflow aside .transform {
  margin-bottom: 20px;
}

.providerflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}

.providerflow .selectall {
  margin-top: 10px;
}

@media screen and (min-width: 768px) {
  .providerflow {
    flex-direction: row;
  }

  .providerflow aside {
    max-width: 250px;
  }
}
</style>
