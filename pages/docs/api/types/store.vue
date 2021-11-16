<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface FlowState {
  dimensions: Dimensions
  transform: Transform
  elements: Elements
  nodes: Node[]
  edges: Edge[]
  selectedElements?: Elements
  selectedNodesBbox: Rect

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  translateExtent: TranslateExtent
  nodeExtent: NodeExtent

  nodesSelectionActive: boolean
  selectionActive: boolean

  userSelectionRect: SelectionRect

  connectionNodeId?: ElementId
  connectionHandleId?: ElementId
  connectionHandleType?: HandleType
  connectionPosition: XYPosition
  connectionMode: ConnectionMode

  snapToGrid: boolean
  snapGrid: SnapGrid

  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean

  multiSelectionActive: boolean

  vueFlowVersion: string

  onConnect?: OnConnectFunc
  onConnectStart?: OnConnectStartFunc
  onConnectStop?: OnConnectStopFunc
  onConnectEnd?: OnConnectEndFunc
}

interface FlowActions {
  setElements: (elements: Elements) => void
  updateNodeDimensions: (update: NodeDimensionUpdate) => void
  updateNodePos: (payload: NodePosUpdate) => void
  updateNodePosDiff: (payload: NodeDiffUpdate) => void
  setUserSelection: (mousePos: XYPosition) => void
  updateUserSelection: (mousePos: XYPosition) => void
  unsetUserSelection: () => void
  addSelectedElements: (elements: Elements) => void
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
}

type FlowStore = Store<string, FlowState, any, FlowActions>
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
    <h1>FlowStore</h1>
    <p>FlowActions is the interface for the Vue Flow store actions that can be used to manipulate internal data.</p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
