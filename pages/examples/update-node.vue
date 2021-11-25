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

const opts = ref({
  bg: '#eee',
  name: 'Node 1',
  hidden: false,
})

const updateNode = () => {
  elements.value = elements.value.map((el) => {
    if (el.id === '1') {
      // it's important that you create a new object here in order to notify react flow about the change
      el.data = {
        ...el.data,
        label: opts.value.name,
      }
      el.style = { backgroundColor: opts.value.bg }
      el.isHidden = opts.value.hidden
    }

    return el
  })
}
</script>
<template>
  <div>
    <VueFlow v-model="elements" @load="updateNode" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
      <div class="updatenode__controls">
        <label>label:</label>
        <input v-model="opts.name" @input="updateNode" />

        <label class="updatenode__bglabel">background:</label>
        <input v-model="opts.bg" type="color" @input="updateNode" />

        <div class="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input v-model="opts.hidden" type="checkbox" @change="updateNode" />
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
  @apply absolute right-10 top-10 z-4 text-md bg-light-800 rounded-lg p-4;
}

.updatenode__controls label {
  @apply block;
}

.updatenode__controls input {
  @apply p-1 rounded-md;
}

.updatenode__bglabel {
  @apply mt-4;
}

.updatenode__checkboxwrapper {
  @apply mt-4 flex items-center;
}
</style>
