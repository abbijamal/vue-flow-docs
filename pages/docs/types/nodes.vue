<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface VFInternals {
  isDragging?: boolean
  width: number
  height: number
  handleBounds: {
    source?: HandleElement[]
    target?: HandleElement[]
  }
}

type Draggable = Omit<DraggableOptions, 'scale' | 'grid' | 'enableUserSelectHack' | 'enableTransformFix'> | boolean

interface Node<T = any> {
  id: ElementId
  position: XYPosition
  type?: NodeTypes[number]
  class?: string
  style?: CSSProperties
  data?: T
  targetPosition?: Position
  sourcePosition?: Position
  isHidden?: boolean
  draggable?: Draggable
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
  snapGrid?: SnapGrid
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
}

interface GraphNode<T = any> extends Node<T> {
  __vf: VFInternals
}

interface NodeProps<T = any> extends GraphNode {
  id: ElementId
  type?: string
  data?: T
  selected?: boolean
  connectable?: boolean
  xPos?: number
  yPos?: number
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
  __vf: VFInternals
}

type TranslateExtent = [[number, number], [number, number]]
type NodeExtent = TranslateExtent

type NodeDimensionUpdate = {
  id: ElementId
  nodeElement: HTMLDivElement
  forceUpdate?: boolean
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
    <h1>Nodes</h1>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
