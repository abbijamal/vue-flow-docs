<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface FlowState extends Omit<FlowOptions, 'elements'> {
  hooks: FlowHooks
  instance?: FlowInstance

  elements: FlowElements

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent
  dimensions: Dimensions
  transform: Transform

  selectedElements?: FlowElements
  selectedNodesBbox?: Rect
  nodesSelectionActive: boolean
  selectionActive: boolean
  userSelectionRect: SelectionRect
  multiSelectionActive: boolean

  connectionNodeId?: ElementId
  connectionHandleId?: ElementId
  connectionHandleType?: HandleType
  connectionPosition: XYPosition
  connectionMode: ConnectionMode

  snapToGrid: boolean
  snapGrid: SnapGrid

  edgesUpdatable: boolean
  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean

  onConnect?: OnConnectFunc
  onConnectStart?: OnConnectStartFunc
  onConnectStop?: OnConnectStopFunc
  onConnectEnd?: OnConnectEndFunc

  isReady: boolean

  vueFlowVersion: string
}

interface FlowActions {
  setElements: (elements: Elements) => void
  setUserSelection: (mousePos: XYPosition) => void
  updateUserSelection: (mousePos: XYPosition) => void
  unsetUserSelection: () => void
  addSelectedElements: (elements: FlowElements) => void
  initD3Zoom: (payload: InitD3ZoomPayload) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: TranslateExtent) => void
  setNodeExtent: (nodeExtent: NodeExtent) => void
  resetSelectedElements: () => void
  unsetNodesSelection: () => void
  updateSize: (size: Dimensions) => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
  addElements: (elements: Elements) => void
  setState: (state: FlowOptions) => void
}

interface FlowGetters {
  getEdgeTypes: () => Record<string, EdgeComponent>
  getNodeTypes: () => Record<string, NodeComponent>
  getNodes: () => GraphNode[]
  getEdges: () => GraphEdge[]
  getSelectedNodes: () => GraphNode[]
}

type FlowStore = Store<string, FlowState, FlowGetters, FlowActions>
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
    <h1>FlowStore</h1>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
