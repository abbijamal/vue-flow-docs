<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, Connection, Edge, Elements, addEdge } from '@braks/vue-flow'
import { script, tmpl } from './hidden-example'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
]

const elements = ref<Elements>(initialElements)
const isHidden = ref<boolean>(false)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

watchEffect(() => {
  elements.value = elements.value.map((e) => {
    e.isHidden = isHidden.value
    return e
  })
})
</script>
<template>
  <div>
    <VueFlow v-model="elements" :zoom-on-scroll="false" @connect="onConnect">
      <MiniMap />
      <Controls />

      <div class="absolute left-[10px] top-[10px] z-4">
        <div class="button">
          <label for="ishidden">
            Hidden
            <input id="ishidden" v-model="isHidden" type="checkbox" class="vue-flow__ishidden" />
          </label>
        </div>
      </div>
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Toggle Visibility</h1>
        <p>This example shows how to toggle the whole graph on a click. The code looks like this:</p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
