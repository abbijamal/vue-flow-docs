<script lang="ts" setup>
import { VueFlow, addEdge, Connection, Elements, Edge, OnConnectStartParams, FlowInstance } from '@braks/vue-flow'
import CustomInput from '../../components/ValidationCustomInput.vue'
import CustomNode from '../../components/ValidationCustomNode.vue'
import { script, tmpl, customNodeTmpl, customNodeScript, customInputTmpl, customInputScript } from './validation-example'

const initialElements: Elements = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 }, isValidTargetPos: (connection) => connection.target === 'B' },
  {
    id: 'A',
    type: 'customnode',
    position: { x: 250, y: 0 },
    isValidSourcePos: (connection) => connection.target === 'B',
  },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 }, isValidSourcePos: (connection) => connection.target === 'B' },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 }, isValidSourcePos: (connection) => connection.target === 'B' },
]

const onLoad = (instance: FlowInstance) => instance.fitView()
const onConnectStart = ({ nodeId, handleType }: OnConnectStartParams) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: MouseEvent) => console.log('on connect stop', event)
const onConnectEnd = (event: MouseEvent) => console.log('on connect end', event)

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection) => {
  console.log('on connect', params)
  elements.value = addEdge(params, elements.value)
}
const nodeTypes = ['custominput', 'customnode']
</script>
<template>
  <div class="py-4">
    <VueFlow
      v-model="elements"
      :select-nodes-on-drag="false"
      class="validationflow"
      :node-types="nodeTypes"
      :zoom-on-scroll="false"
      @connect="onConnect"
      @load="onLoad"
      @connect-start="onConnectStart"
      @connect-stop="onConnectStop"
      @connect-end="onConnectEnd"
    >
      <template #node-custominput="props">
        <CustomInput v-bind="props" />
      </template>
      <template #node-customnode="props">
        <CustomNode v-bind="props" />
      </template>
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Validating connections</h1>
        <p>
          Connections can be validated before edges are created and nodes are finally connected. This example shows how to use
          validators for handles so only valid connections are actually connected.
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="customNodeScript" />
          <div v-html="customNodeTmpl" />
          <div v-html="customInputScript" />
          <div v-html="customInputTmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.validationflow .vue-flow__node {
  width: 150px;
  border-radius: 5px;
  padding: 10px;
  color: #555;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 12px;
}

.validationflow .vue-flow__node-customnode {
  background: #e6e6e9;
  border: 1px solid #ddd;
}

.vue-flow__node-custominput .vue-flow__handle {
  background: #e6e6e9;
}

.validationflow .vue-flow__node-custominput {
  background: #fff;
}

.validationflow .vue-flow__handle-connecting {
  background: #ff6060;
}

.validationflow .vue-flow__handle-valid {
  background: #55dd99;
}
</style>
