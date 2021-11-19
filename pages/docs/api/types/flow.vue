<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type ElementId = string

type FlowElement<T = any> = Node<T> | Edge<T>

type Elements<T = any> = FlowElement<T>[]

// x-position, y-position, zoom
type Transform = [number, number, number]

enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

interface XYPosition {
  x: number
  y: number
}

interface Dimensions {
  width: number
  height: number
}

interface Box extends XYPosition {
  x2: number
  y2: number
}

interface Rect extends Dimensions, XYPosition {}

type SnapGrid = [number, number]

enum ArrowHeadType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
}

interface SelectionRect extends Rect {
  startX: number
  startY: number
  draw: boolean
}

type FitViewParams = {
  padding?: number
  includeHiddenNodes?: boolean
  minZoom?: number
  maxZoom?: number
}

type FlowExportObject<T = any> = {
  elements: Elements<T>
  position: [number, number]
  zoom: number
}

type FlowTransform = {
  x: number
  y: number
  zoom: number
}

type FitViewFunc = (fitViewOptions?: FitViewParams) => void
type ProjectFunc = (position: XYPosition) => XYPosition
type ToObjectFunc<T = any> = () => FlowExportObject<T>

type FlowInstance<T = any> = {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoomLevel: number) => void
  fitView: FitViewFunc
  project: ProjectFunc
  getElements: () => Elements<T>
  setTransform: (transform: FlowTransform) => void
  toObject: ToObjectFunc<T>

interface FlowOptions extends Omit<HTMLAttributes, 'onLoad'> {
  modelValue?: Elements
  elements?: Elements
  nodeTypes?: Record<string, NodeType> | string[]
  edgeTypes?: Record<string, EdgeType> | string[]
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: TranslateExtent
  nodeExtent?: NodeExtent
  arrowHeadColor?: string
  markerEndId?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  edgeUpdaterRadius?: number
  edgeTypesId?: string
  nodeTypesId?: string
  storageKey?: string
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
    <h1>FlowOptions</h1>
    <p>FlowOptions are the base type of the Vue Flow component props.</p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
