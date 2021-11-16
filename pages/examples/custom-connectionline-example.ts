import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { VueFlow, removeElements, addEdge, Background, BackgroundVariant, Elements, Connection, Edge } from '@braks/vue-flow'
import CustomConnectionLine from '../../components/CustomConnectionLine.vue'

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
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
  <VueFlow :elements="elements" @elements-remove="onElementsRemove" @connect="onConnect">
    <template #custom-connection-line="props">
      <CustomConnectionLine v-bind="props" />
    </template>
    <Background :variant="BackgroundVariant.Lines" />
  </VueFlow>
\`\`\`
`)

export { script, tmpl }
