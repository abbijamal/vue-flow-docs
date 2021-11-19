import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from '@braks/vue-flow'

import initialElements from './initial-elements'

const vueFlowInstance = ref<FlowInstance | null>(null)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: FlowEvents['connect']) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance?.fitView({ padding: 0.1 })
  vueFlowInstance.value = flowInstance
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
    v-model="elements"
    :snap-to-grid="true"
    :snap-grid="[15, 15]"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @load="onLoad"
  >
    <MiniMap
      :node-stroke-color="(n) => {
        if (n.style?.background) return n.style.background;
        if (n.type === 'input') return '#0041d0';
        if (n.type === 'output') return '#ff0072';
        if (n.type === 'default') return '#1a192b';

        return '#eee';
      }"
      :node-color="(n) => {
        if (n.style?.background) return n.style.background;

        return '#fff';
      }"
      :node-border-radius="2"
    />
    <Controls />
    <Background color="#aaa" :gap="16" />
</VueFlow>
\`\`\`
`)

const initElements = useMd.render(`
\`\`\`typescript
// initial-elements.ts

export default [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Welcome to <strong>Vue Flow!</strong>',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'This is a <strong>default node</strong>',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'This one has a <strong>custom style</strong>',
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: 'Another default node',
    },
  },
  {
    id: '5',
    data: {
      label: 'Node id: 5',
    },
    position: { x: 250, y: 325 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: 'An <strong>output node</strong>',
    },
    position: { x: 100, y: 480 },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Another output node' },
    position: { x: 400, y: 450 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'animated edge',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    arrowHeadType: 'arrowclosed',
    label: 'edge with arrow head',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: 'smooth step edge',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
];
\`\`\`
`)

export { script, tmpl, initElements }
