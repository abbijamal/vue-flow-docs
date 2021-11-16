<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface Node<T = any> {
  id: ElementId
  position: XYPosition
  type?: string
  __rf?:
    | {
        position?: XYPosition
        isDragging?: boolean
        width?: number
        height?: number
        handleBounds?: any
      }
    | any
  data?: T
  style?: any
  class?: string
  targetPosition?: Position
  sourcePosition?: Position
  isHidden?: boolean
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
}

type NodePosUpdate = {
  id: ElementId
  pos: XYPosition
}

type NodeDiffUpdate = {
  id?: ElementId
  diff?: XYPosition
  isDragging?: boolean
}

type TranslateExtent = [[number, number], [number, number]]
type NodeExtent = TranslateExtent

type NodeDimensionUpdate = {
  id: ElementId
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
}

interface NodeProps<T = any> {
  id?: ElementId
  type?: string
  data?: T
  selected?: boolean
  connectable?: boolean
  xPos?: number
  yPos?: number
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
}

type NodeType = DefineComponent<NodeProps, any, any, any, any> | boolean
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
    <h1>Nodes</h1>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
