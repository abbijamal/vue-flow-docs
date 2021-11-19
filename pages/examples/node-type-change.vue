<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { VueFlow, addEdge, Connection, Edge, Elements, isEdge, FlowInstance, Position } from '@braks/vue-flow'
import { script, tmpl } from './node-type-change-example'

const initialElements: Elements = [
  {
    id: '1',
    sourcePosition: Position.Right,
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  {
    id: '2',
    type: 'output',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
  { id: 'e1-2', source: '1', type: 'smoothstep', target: '2', animated: true },
]

const buttonStyle: CSSProperties = { position: 'absolute', right: 10, top: 30, zIndex: 4 }

const elements = ref<Elements>(initialElements)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()

const changeType = () => {
  elements.value = elements.value.map((el) => {
    if (isEdge(el) || el.type === 'input') return el

    return {
      ...el,
      type: el.type === 'default' ? 'output' : 'default',
    }
  })
}
</script>
<template>
  <div>
    <VueFlow v-model="elements" :zoom-on-scroll="false" @connect="onConnect" @load="onLoad">
      <button class="button mt-2" :style="buttonStyle" @click="changeType">change type</button>
    </VueFlow>
    <div class="description">
      <div class="content">
        <p>In this example you can try out switching a node's type on button press.</p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
