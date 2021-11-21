import useMd from '~/utils/md'

const tmpl = useMd.render(`
\`\`\`markup
<!-- MultiFlowContainer.vue -->
<div class="vue-flow__example-multiflows flex-1">
  <Flow />
  <Flow />
</div>
\`\`\`
`)

const flowScript = useMd.render(`
\`\`\`typescript
// Flow.vue
import { VueFlow, Background, Connection, Elements, Edge, removeElements, addEdge } from '@braks/vue-flow'
const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
\`\`\`
`)

const flowTmpl = useMd.render(`
\`\`\`markup
<!-- Flow.vue -->
<VueFlow v-model="elements" @elements-remove="onElementsRemove" @connect="onConnect">
  <Background />
</VueFlow>
\`\`\`
`)

export { tmpl, flowScript, flowTmpl }
