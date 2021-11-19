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
  FlowInstance,
  Connection,
  Edge,
  Elements,
} from '@braks/vue-flow'
import { getElements } from './utils'

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  console.log(flowInstance.getElements())
}

const elements = ref<Elements>(getElements())
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements" :min-zoom="0.2" @load="onLoad" @elements-remove="onElementsRemove" @connect="onConnect">
  <MiniMap />
  <Controls />
</VueFlow>
\`\`\`
`)

const initElements = useMd.render(`
\`\`\`typescript
// utils.ts

import { ElementId, Elements, Position } from '@braks/vue-flow'

const nodeWidth = 80
const nodeGapWidth = nodeWidth * 2
const nodeStyle = { width: \`\${nodeWidth}px\`, fontSize: '11px', color: 'white' }

const sourceTargetPositions = [
  { source: Position.Bottom, target: Position.Top },
  { source: Position.Right, target: Position.Left },
]
const nodeColors = [
  ['#1e9e99', '#4cb3ac', '#6ec9c0', '#8ddfd4'],
  ['#0f4c75', '#1b5d8b', '#276fa1', '#3282b8'],
]
const edgeTypes = ['default', 'step', 'smoothstep', 'straight']
const offsets = [
  {
    x: 0,
    y: -nodeGapWidth,
  },
  {
    x: nodeGapWidth,
    y: -nodeGapWidth,
  },
  {
    x: nodeGapWidth,
    y: 0,
  },
  {
    x: nodeGapWidth,
    y: nodeGapWidth,
  },
  {
    x: 0,
    y: nodeGapWidth,
  },
  {
    x: -nodeGapWidth,
    y: nodeGapWidth,
  },
  {
    x: -nodeGapWidth,
    y: 0,
  },
  {
    x: -nodeGapWidth,
    y: -nodeGapWidth,
  },
]

let id = 0
const getNodeId = (): ElementId => (id++).toString()

export function getElements(): Elements {
  const initialElements = []

  for (let sourceTargetIndex = 0; sourceTargetIndex < sourceTargetPositions.length; sourceTargetIndex++) {
    const currSourceTargetPos = sourceTargetPositions[sourceTargetIndex]

    for (let edgeTypeIndex = 0; edgeTypeIndex < edgeTypes.length; edgeTypeIndex++) {
      const currEdgeType = edgeTypes[edgeTypeIndex]

      for (let offsetIndex = 0; offsetIndex < offsets.length; offsetIndex++) {
        const currOffset = offsets[offsetIndex]

        const style = { ...nodeStyle, background: nodeColors[sourceTargetIndex][edgeTypeIndex] }
        const sourcePosition = {
          x: offsetIndex * nodeWidth * 4,
          y: edgeTypeIndex * 300 + sourceTargetIndex * edgeTypes.length * 300,
        }
        const sourceId = getNodeId()
        const sourceData = { label: \`Source \${sourceId}\` }
        const sourceNode = {
          id: sourceId,
          style,
          data: sourceData,
          position: sourcePosition,
          sourcePosition: currSourceTargetPos.source,
          targetPosition: currSourceTargetPos.target,
        }

        const targetId = getNodeId()
        const targetData = { label: \`Target \${targetId}\` }
        const targetPosition = {
          x: sourcePosition.x + currOffset.x,
          y: sourcePosition.y + currOffset.y,
        }
        const targetNode = {
          id: targetId,
          style,
          data: targetData,
          position: targetPosition,
          sourcePosition: currSourceTargetPos.source,
          targetPosition: currSourceTargetPos.target,
        }

        initialElements.push(sourceNode)
        initialElements.push(targetNode)

        initialElements.push({ id: '\${sourceId}' + '-' + '\${targetId}', source: sourceId, target: targetId, type: currEdgeType })
      }
    }
  }

  return initialElements
}
\`\`\`
`)

export { script, tmpl, initElements }
