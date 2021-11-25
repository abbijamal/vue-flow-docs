<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type FlowHook<T = any> = EventHook<T>

interface FlowEvents {
  elementClick: { event: MouseEvent; element: GraphNode | GraphEdge }
  elementsRemove: FlowElements
  nodeDoubleClick: { event: MouseEvent; node: GraphNode }
  nodeClick: { event: MouseEvent; node: GraphNode }
  nodeMouseEnter: { event: MouseEvent; node: GraphNode }
  nodeMouseMove: { event: MouseEvent; node: GraphNode }
  nodeMouseLeave: { event: MouseEvent; node: GraphNode }
  nodeContextMenu: { event: MouseEvent; node: GraphNode }
  nodeDragStart: { event: MouseEvent; node: GraphNode }
  nodeDrag: { event: MouseEvent; node: GraphNode }
  nodeDragStop: { event: MouseEvent; node: GraphNode }
  connect: Connection
  connectStart: {
    event: MouseEvent
  } & { [key in keyof OnConnectStartParams]: OnConnectStartParams[key] }
  connectStop: MouseEvent
  connectEnd: MouseEvent
  load: FlowInstance
  move: FlowTransform | undefined
  moveStart: FlowTransform | undefined
  moveEnd: FlowTransform | undefined
  selectionChange: FlowElements | null
  selectionDragStart: { event: MouseEvent; nodes: GraphNode[] }
  selectionDrag: { event: MouseEvent; nodes: GraphNode[] }
  selectionDragStop: { event: MouseEvent; nodes: GraphNode[] }
  selectionContextMenu: { event: MouseEvent; nodes: GraphNode[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  edgeUpdate: { edge: GraphEdge; connection: Connection }
  edgeContextMenu: { event: MouseEvent; edge: GraphEdge }
  edgeMouseEnter: { event: MouseEvent; edge: GraphEdge }
  edgeMouseMove: { event: MouseEvent; edge: GraphEdge }
  edgeMouseLeave: { event: MouseEvent; edge: GraphEdge }
  edgeDoubleClick: { event: MouseEvent; edge: GraphEdge }
  edgeClick: { event: MouseEvent; edge: GraphEdge }
  edgeUpdateStart: { event: MouseEvent; edge: GraphEdge }
  edgeUpdateEnd: { event: MouseEvent; edge: GraphEdge }
}

type FlowHooks = { [key in keyof FlowEvents]: FlowHook<FlowEvents[key]> }

type EmitFunc<T extends FlowHooks = FlowHooks> = (name: keyof T, ...args: any[]) => void
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
    <h1>Hooks</h1>
    <p>
      (Event-)Hooks can be used to listen to any Vue Flow related event. Either directly from the component or from outside the
      component.
    </p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
