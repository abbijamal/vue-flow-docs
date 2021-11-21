import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
// Flow.vue
import { VueFlow, removeElements, addEdge, Background, BackgroundVariant, Elements, Connection, Edge } from '@braks/vue-flow'
import CustomConnectionLine from './CustomConnectionLine.vue'

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
<!-- Flow.vue template -->
<VueFlow v-model="elements" @elements-remove="onElementsRemove" @connect="onConnect">
  <template #custom-connection-line="{
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      connectionLineType,
      connectionLineStyle
      }"
  >
    <CustomConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
  </template>
  <Background :variant="BackgroundVariant.Lines" />
</VueFlow>
\`\`\`
`)

const customScript = useMd.render(`
\`\`\`typescript
// CustomConnectionLine.vue
import { ConnectionLineProps } from '@braks/vue-flow'

interface ConnectionLineProps extends ConnectionLineProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
const props = defineProps<CustomConnectionLineProps>()

const path = computed(
  () =>
    \`M\${props.sourceX},\${props.sourceY} C \${props.sourceX} \${props.targetY} \${props.sourceX} \${props.targetY} \${props.targetX},\${props.targetY}\`,
)
\`\`\`
`)

const customTmpl = useMd.render(`
\`\`\`markup
<!-- CustomConnectionLine.vue template -->
<g>
  <path
    class="animated"
    fill="none"
    stroke="#222"
    :stroke-width="1.5"
    :d="path"
  />
  <circle :cx="props.targetX" :cy="props.targetY" fill="#fff" :r="3" stroke="#222" :stroke-width="1.5" />
</g>
\`\`\`
`)

export { script, tmpl, customScript, customTmpl }
