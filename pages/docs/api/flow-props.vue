<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
interface FlowProps {
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

const props = withDefaults(defineProps<FlowProps>(), {
  modelValue: () => [],
  connectionMode: ConnectionMode.Loose,
  connectionLineType: ConnectionLineType.Bezier,
  selectionKeyCode: 'Shift',
  multiSelectionKeyCode: 'Meta',
  zoomActivationKeyCode: 'Meta',
  deleteKeyCode: 'Backspace',
  snapToGrid: false,
  snapGrid: () => [15, 15],
  onlyRenderVisibleElements: false,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  minZoom: 0.5,
  maxZoom: 2,
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  translateExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  nodeExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  arrowHeadColor: '#b1b1b7',
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,
  loading: false,
})
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
    <h1>VueFlow Props</h1>
    <p>This is a list of props you can pass to the VueFlow component.</p>

    <h2>TypeScript</h2>
    <p>The interface of the VueFlow props are exported as VueFlowProps, similar to EdgeProps or NodeProps.</p>

    <h2>Basic Props</h2>
    <ul>
      <li>v-model: array of nodes and edges (preferred over elements prop)</li>
      <li>elements: array of nodes and edges (deprecated use v-model instead)</li>
      <li>id: string - assign an id to the flow, it will be used as the store id</li>
      <li>style: css properties</li>
      <li>class: additional class names</li>
    </ul>

    <h2>Flow View</h2>
    <ul>
      <li>minZoom: default: 0.5</li>
      <li>maxZoom: default: 2</li>
      <li>defaultZoom: default: 1</li>
      <li>defaultPosition: default: [0, 0]</li>
      <li>snapToGrid: default: false</li>
      <li>snapGrid: [x, y] array - default: [15, 15]</li>
      <li>onlyRenderVisibleElements: default: false</li>
      <li>translateExtent: default [[-∞, -∞], [+∞, +∞]]</li>
      <li>nodeExtent: default [[-∞, -∞], [+∞, +∞]] defines the extent for the node positions</li>
      <li>preventScrolling: default true if true default browser scroll behaviour is prevented</li>
      <li>loading: default undefined a string to display while elements are processed, you can also use a slot</li>
      <li>nodesDraggable: set nodes draggable globally, default true</li>
      <li>nodesConnectable: set nodes connectable globally, default true</li>
      <li>edgesUpdatable: set edges updatable globally, default true</li>
      <li>elementsSelectable: set elements selectable globally, default true</li>
    </ul>

    <h2>Events</h2>
    <p class="text-gray-400">Use event handlers like @element-click="handleElementClick"</p>
    <ul>
      <li>onElementClick({ event, element }): called when user clicks node or edge</li>
      <li>onElementsRemove(elements): called when user removes node or edge</li>
      <li>onNodeDragStart({ event, node }): node drag start</li>
      <li>onNodeDrag({ event, node }): node drag</li>
      <li>onNodeDragStop({ event, node }): node drag stop</li>
      <li>onNodeMouseEnter({ event, node }): node mouse enter</li>
      <li>onNodeMouseMove({ event, node }): node mouse move</li>
      <li>onNodeMouseLeave({ event, node }): node mouse leave</li>
      <li>onNodeContextMenu({ event, node }): node context menu</li>
      <li>onNodeDoubleClick({ event, node }): node double click</li>
      <li>onConnect({ source, target }): called when user connects two nodes</li>
      <li>onConnectStart({ event, nodeId, handleType }): called when user starts to drag connection line</li>
      <li>onConnectStop(event): called when user stops to drag connection line</li>
      <li>onConnectEnd(event): called after user stops or connects nodes</li>
      <li>onEdgeUpdate({ oldEdge, newConnection }): called when the end of an edge gets dragged to another source or target</li>
      <li>onEdgeMouseEnter({ event, edge }): edge mouse enter</li>
      <li>onEdgeMouseMove({ event, edge }): edge mouse move</li>
      <li>onEdgeMouseLeave({ event, edge }): edge mouse leave</li>
      <li>onEdgeContextMenu({ event, edge }): called when user does a right-click on an edge</li>
      <li>onEdgeUpdateStart({ event, edge }): called when user starts to update an edge</li>
      <li>onEdgeUpdateEnd({ event, edge }): called when user ends an edge update</li>
      <li>onLoad(vueFlowInstance): called after flow is initialized</li>
      <li>onMove(flowTransform): called when user is panning or zooming</li>
      <li>onMoveStart(flowTransform): called when user starts panning or zooming</li>
      <li>onMoveEnd(flowTransform): called when user ends panning or zooming</li>
      <li>onSelectionChange(elements): called when user selects one or multiple elements</li>
      <li>onSelectionDragStart({ event, nodes }): called when user starts to drag a selection</li>
      <li>onSelectionDrag({ event, nodes }): called when user drags a selection</li>
      <li>onSelectionDragStop({ event, nodes }): called when user stops to drag a selection</li>
      <li>onSelectionContextMenu({ event, nodes }): called when user does a right-click on a selection</li>
      <li>onPaneClick(event): called when user clicks directly on the canvas</li>
      <li>onPaneContextMenu(event): called when user does a right-click on the canvas</li>
      <li>onPaneScroll(event): called when user scrolls pane (only works when zoomOnScroll is set to false)</li>
    </ul>

    <h2>Element Customization</h2>
    <ul>
      <li>nodeTypes: object with <nuxt-link to="/docs/api/nodes/node-types">node types</nuxt-link></li>
      <li>edgeTypes: object with <nuxt-link to="/docs/api/nodes/edge-types">edge types</nuxt-link></li>
      <li>arrowHeadColor: default: #b1b1b7</li>
      <li>markerEndId: Gets used as the marker-end attribute of the edges</li>
    </ul>

    <h2>Connection Line Options</h2>
    <ul>
      <li>connectionLineType: connection line type = default (bezier), straight, step, smoothstep</li>
      <li>connectionLineStyle: connection style as svg attributes</li>
      <li>connectionLineComponent: custom connection line component</li>
    </ul>

    <h2>Keys</h2>
    <ul>
      <li>deleteKeyCode: number | string default: Backspace</li>
      <li>
        selectionKeyCode: number | string default: Shift - While pressing the selectionKeyCode and dragging the mouse you can
        create a selection for multiple nodes and edges
      </li>
      <li>
        multiSelectionKeyCode: number | string default Meta - While pressing the multiSelectionKeyCode you can select multiple
        nodes and edges with a click
      </li>
      <li>
        zoomActivationKeyCode: number | string default Meta - While pressing the zoomActivationKeyCode you can zoom even if
        panOnScroll=true or zoomOnScroll=false
      </li>
    </ul>

    <h2>Storage</h2>
    <ul>
      <li>
        <strong>storageKey</strong>: string default: undefined - If you pass a storage key it will be used to save your flow
        exports object to the localstorage
      </li>
    </ul>

    <h2>TypeScript Definition</h2>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
