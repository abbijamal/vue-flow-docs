<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface Edge<T = any> {
  id: ElementId
  type?: string
  source: ElementId
  target: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourceHandle?: ElementId | null
  targetHandle?: ElementId | null
  selected?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
  class?: string
  isHidden?: boolean
}

interface EdgeProps<T = any> extends Edge<T> {
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

type EdgeType = DefineComponent<EdgeSmoothStepProps, any, any, any, any, any> | boolean

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
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
