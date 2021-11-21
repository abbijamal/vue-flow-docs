import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { VueFlow, ElementId, Elements, Node } from '@braks/vue-flow'

const elements = ref<Elements>([])
const addRandomNode = () => {
  const nodeId: ElementId = (elements.value.length + 1).toString()
  const newNode: Node = {
    id: nodeId,
    data: { label: \`Node: \${nodeId}\` },
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  } as Node
  elements.value = [...elements.value, newNode]
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
  v-model="elements"
  @load="onLoad"
  @element-click="onElementClick"
  @elements-remove="onElementsRemove"
  @connect="(p) => onConnect(p)"
  @node-drag-stop="onNodeDragStop"
>
  <button
    class="button"
    type="button"
    :style="{ position: 'absolute', left: '10px', top: '10px', zIndex: 4 }"
    @click="addRandomNode"
    >
      add node
    </button>
</VueFlow>
\`\`\`
`)

export { script, tmpl }
