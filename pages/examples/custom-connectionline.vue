<script lang="ts" setup>
import { VueFlow, removeElements, addEdge, Background, BackgroundVariant, Elements, Connection, Edge } from '@braks/vue-flow'
import CustomConnectionLine from '../../components/CustomConnectionLine.vue'
import { script, tmpl, customScript, customTmpl } from './custom-connectionline-example'

const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
])
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
</script>
<template>
  <div class="py-4">
    <VueFlow v-model="elements" :zoom-on-scroll="false" @elements-remove="onElementsRemove" @connect="onConnect">
      <template #custom-connection-line="props">
        <CustomConnectionLine v-bind="props" />
      </template>
      <Background :variant="BackgroundVariant.Lines" />
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Custom Connection Line</h1>
        <p>
          This example shows the implementation and usage of a custom connection line. Pass the connection line component into the
          template slot. You can even use a dynamic component to change the connection line whenever and however you want. It
          should look like this:
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="customScript" />
          <div v-html="customTmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
