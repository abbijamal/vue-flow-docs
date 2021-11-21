<script lang="ts" setup>
import { VueFlow, Elements } from '@braks/vue-flow'
import { script, tmpl } from './update-node-example'

const initialElements: Elements = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref<Elements>(initialElements)
const nodeName = ref<string>('Node 1')
const nodeBg = ref<string>('#eee')
const nodeHidden = ref<boolean>(false)

const updateNode = () => {
  elements.value = elements.value.map((el) => {
    if (el.id === '1') {
      // it's important that you create a new object here in order to notify react flow about the change
      el.data = {
        ...el.data,
        label: nodeName.value,
      }
      el.style = { backgroundColor: nodeBg.value }
      el.isHidden = nodeHidden.value
    }

    return el
  })
}

watchEffect(() => {
  updateNode()
})
</script>
<template>
  <div>
    <VueFlow v-model="elements" :zoom-on-scroll="false" @load="(vf) => vf.fitView({ padding: 0.5 })">
      <div class="updatenode__controls p-4 bg-gray-300 rounded-xl">
        <label>label:</label>
        <input v-model="nodeName" />

        <label class="updatenode__bglabel">background:</label>
        <input v-model="nodeBg" type="color" />

        <div class="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input v-model="nodeHidden" placeholder="Enter a label" type="checkbox" />
        </div>
      </div>
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Updating Nodes</h1>
        <p>You can update internal node data anytime you want. This example shows how to achieve that:</p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.updatenode__controls {
  @apply absolute right-10 top-10 z-4 text-md;
}

.updatenode__controls label {
  @apply block;
}

.updatenode__bglabel {
  @apply mt-4;
}

.updatenode__checkboxwrapper {
  @apply mt-4 flex items-center;
}
</style>
