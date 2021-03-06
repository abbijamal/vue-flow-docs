import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  FlowInstance,
  Elements,
  Connection,
  Edge,
  ElementId,
} from '@braks/vue-flow'
import Sidebar from '../../components/DnDSidebar.vue'
import { script, tmpl, sidebarScript, sidebarTmpl } from './dnd-example'

const flowInstance = ref<FlowInstance>()
const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
])

let id = 0
const getId = (): ElementId => \`dndnode_\${id++}\`

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onLoad = (instance: FlowInstance) => (flowInstance.value = instance)

const onDrop = (event: DragEvent) => {
  event.preventDefault()

  if (flowInstance.value) {
    console.log(event.dataTransfer?.getData('application/vueflow'))
    const type = event.dataTransfer?.getData('application/vueflow')
    const position = flowInstance.value.project({ x: event.clientX - 400, y: event.clientY - 40 })
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: \`\${type} node\` },
    }

    elements.value.push(newNode)
  }
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
 <div style="display: flex; flex-direction: row; width: 100%; height: 100%">
    <div style="flex: 1 1 auto; height: 100%;" @drop="onDrop">
      <VueFlow
        v-model="elements"
        @elements-remove="onElementsRemove"
        @load="onLoad"
        @connect="onConnect"
        @dragover="onDragOver"
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" :gap="8" />
      </VueFlow>
    </div>
    <Sidebar />
</div>
\`\`\`
`)

const sidebarScript = useMd.render(`
\`\`\`typescript
// Sidebar.vue
const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}
\`\`\`
`)

const sidebarTmpl = useMd.render(`
\`\`\`markup
<!-- Sidebar.vue -->
<template>
  <aside>
    <div style="margin-bottom: 12px;">You can drag these nodes to the pane on the left.</div>
    <div
      class="droppable-node vue-flow__node-input"
      :draggable="true"
      @dragstart="(event: DragEvent) => onDragStart(event, 'input')"
    >
      Input Node
    </div>
    <div
      class="droppable-node vue-flow__node-default"
      :draggable="true"
      @dragstart="(event: DragEvent) => onDragStart(event, 'default')"
    >
      Default Node
    </div>
    <div
      class="droppable-node vue-flow__node-output"
      :draggable="true"
      @dragstart="(event: DragEvent) => onDragStart(event, 'output')"
    >
      Output Node
    </div>
  </aside>
</template>
<style scoped>
aside {
  max-width: 200px;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.droppable-node {
  margin-bottom: 12px;
  cursor: grab;
}
</style>
\`\`\`
`)

export { script, tmpl, sidebarScript, sidebarTmpl }
