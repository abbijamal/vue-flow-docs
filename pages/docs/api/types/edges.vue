<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface Edge<T = any> {
  id: ElementId
  type?: EdgeTypes[number]
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId
  targetHandle?: ElementId
  selected?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  label?:
    | string
    | {
        component: any
        props?: Record<string, any> & Partial<EdgeTextProps>
      }
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties | unknown
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
  class?: string
  isHidden?: boolean
}

interface GraphEdge<T = any> extends Edge<T> {
  sourceNode: GraphNode
  targetNode: GraphNode
}

interface EdgeProps<T = any> extends GraphEdge<T> {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  sourcePosition: Position
  targetPosition: Position
  markerEndId?: string
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

interface EdgeSmoothStepProps<T = any> extends EdgeProps<T> {
  borderRadius?: number
}

interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
\`\`\`
`)
</script>
<script lang="ts">
export default {
  layout: 'docs',
}
</script>
<template>
  <div>
    <h1>Edges</h1>
    <div class="md">
      <div v-html="helper" />
    </div>
  </div>
</template>
