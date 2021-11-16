<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type FlowHook<T = any> = EventHook<T>

interface FlowEvents {
  elementClick: { event: MouseEvent; element: Node | Edge }
  elementsRemove: Elements
  nodeDoubleClick: { event: MouseEvent; node: Node }
  nodeClick: { event: MouseEvent; node: Node }
  nodeMouseEnter: { event: MouseEvent; node: Node }
  nodeMouseMove: { event: MouseEvent; node: Node }
  nodeMouseLeave: { event: MouseEvent; node: Node }
  nodeContextMenu: { event: MouseEvent; node: Node }
  nodeDragStart: { event: MouseEvent; node: Node }
  nodeDrag: { event: MouseEvent; node: Node }
  nodeDragStop: { event: MouseEvent; node: Node }
  connect: Connection
  connectStart: {
    event: MouseEvent
    params: OnConnectStartParams
  }
  connectStop: MouseEvent
  connectEnd: MouseEvent
  load: FlowInstance
  move: FlowTransform | undefined
  moveStart: FlowTransform | undefined
  moveEnd: FlowTransform | undefined
  selectionChange: Elements | null
  selectionDragStart: { event: MouseEvent; nodes: Node[] }
  selectionDrag: { event: MouseEvent; nodes: Node[] }
  selectionDragStop: { event: MouseEvent; nodes: Node[] }
  selectionContextMenu: { event: MouseEvent; nodes: Node[] }
  paneScroll: WheelEvent | undefined
  paneClick: MouseEvent
  paneContextMenu: MouseEvent
  edgeUpdate: { edge: Edge; connection: Connection }
  edgeContextMenu: { event: MouseEvent; edge: Edge }
  edgeMouseEnter: { event: MouseEvent; edge: Edge }
  edgeMouseMove: { event: MouseEvent; edge: Edge }
  edgeMouseLeave: { event: MouseEvent; edge: Edge }
  edgeDoubleClick: { event: MouseEvent; edge: Edge }
  edgeClick: { event: MouseEvent; edge: Edge }
  edgeUpdateStart: { event: MouseEvent; edge: Edge }
  edgeUpdateEnd: MouseEvent
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
