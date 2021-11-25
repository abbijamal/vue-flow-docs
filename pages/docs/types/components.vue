<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type DefaultEdgeTypes = { [key in 'default' | 'straight' | 'smoothstep' | 'step']: Component<EdgeProps> }
type EdgeTypes = (keyof DefaultEdgeTypes | string)[]
type NodeComponent = Component<NodeProps> | DefineComponent<NodeProps, any, any, any, any> | string
type DefaultNodeTypes = { [key in 'input' | 'output' | 'default']: Component<NodeProps> }
type NodeTypes = (keyof DefaultNodeTypes | string)[]
type EdgeComponent = Component<EdgeProps> | DefineComponent<EdgeProps, any, any, any, any, any> | string

type HandleType = 'source' | 'target'

interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId
  position: Position
}

type ValidConnectionFunc = (connection: Connection) => boolean

interface HandleProps {
  id?: string
  type?: string
  position?: Position
  isValidConnection?: ValidConnectionFunc
  connectable?: boolean
}

interface BackgroundProps {
  variant?: BackgroundVariant
  gap?: number
  color?: string
  size?: number
}

interface ControlProps {
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
  fitViewParams?: FitViewParams
}

interface ControlEvents {
  (event: 'zoom-in'): void
  (event: 'zoom-out'): void
  (event: 'fit-view'): void
  (event: 'interaction-change', active: boolean): void
}

type StringFunc = (node: Node | GraphNode) => string
type ShapeRendering = 'inherit' | 'auto' | 'geometricPrecision' | 'optimizeSpeed' | 'crispEdges' | undefined

interface MiniMapProps {
  nodeColor?: string | StringFunc
  nodeStrokeColor?: string | StringFunc
  nodeClassName?: string | StringFunc
  nodeBorderRadius?: number
  nodeStrokeWidth?: number
  maskColor?: string
}

interface MiniMapNodeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  borderRadius?: number
  color?: string
  shapeRendering?: CSSProperties['shapeRendering']
  strokeColor?: string
  strokeWidth?: number
}

interface EdgeTextProps {
  x: number
  y: number
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}

interface CustomConnectionLineProps {
  sourceX: number
  sourceY: number
  sourcePosition: Position
  targetX: number
  targetY: number
  targetPosition: Position
  connectionLineType: ConnectionLineType
  connectionLineStyle: CSSProperties
  nodes: GraphNode[]
  sourceNode: GraphNode
  sourceHandle: HandleElement
}

interface FlowProps extends FlowOptions {
  id?: string
  modelValue?: Elements
  nodeTypes?: NodeTypes
  edgeTypes?: EdgeTypes
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  preventScrolling?: boolean
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
  storageKey?: string
  loading?: Loading
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
  <div class="py-4">
    <h1>Components</h1>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
