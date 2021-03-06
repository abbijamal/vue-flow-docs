import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { VueFlow, MiniMap, Controls, Connection, Edge, Elements, addEdge } from '@braks/vue-flow'

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
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements" @connect="onConnect">
    <MiniMap />
    <Controls />

    <div :style="{ position: 'absolute', left: '10px', top: '10px', zIndex: 4 }">
      <div>
        <label for="ishidden">
          isHidden
          <input id="ishidden" v-model="isHidden" type="checkbox" class="vue-flow__ishidden" />
        </label>
      </div>
    </div>
</VueFlow>
\`\`\`
`)

export { script, tmpl }
