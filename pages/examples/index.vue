<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {
  VueFlow,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  Node,
  Elements,
  FlowInstance,
  FlowTransform,
  SnapGrid,
  FlowEvents,
} from '@braks/vue-flow'
import { script, tmpl, initElements, initialElements } from './overview-example'

const elements = ref<Elements>(initialElements)

const onNodeDragStart = (e: FlowEvents['nodeDragStart']) => console.log('drag start', e)
const onNodeDrag = (e: FlowEvents['nodeDrag']) => console.log('drag', e)
const onNodeDragStop = (e: FlowEvents['nodeDragStop']) => console.log('drag stop', e)
const onNodeDoubleClick = (e: FlowEvents['nodeDoubleClick']) => console.log('node double click', e)
const onPaneClick = (e: FlowEvents['paneClick']) => console.log('pane click', e)
const onPaneScroll = (e: FlowEvents['paneScroll']) => console.log('pane scroll', e)
const onPaneContextMenu = (e: FlowEvents['paneContextMenu']) => console.log('pane context menu', e)
const onSelectionDrag = (e: FlowEvents['selectionDrag']) => console.log('selection drag', e)
const onSelectionDragStart = (e: FlowEvents['selectionDragStart']) => console.log('selection drag start', e)
const onSelectionDragStop = (e: FlowEvents['selectionDragStop']) => console.log('selection drag stop', e)
const onSelectionContextMenu = (e: FlowEvents['selectionContextMenu']) => console.log('selection context menu', e)
const onElementClick = ({ element }: FlowEvents['elementClick']) =>
  console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element)
const onSelectionChange = (elements: FlowEvents['selectionChange']) => console.log('selection change', elements)
const onLoad = (flowInstance: FlowInstance) => {
  console.log('flow loaded:', flowInstance)
  flowInstance.fitView()
}

const onMoveEnd = (transform?: FlowTransform) => console.log('zoom/move end', transform)
const onEdgeContextMenu = (e: FlowEvents['edgeContextMenu']) => console.log('edge context menu', e)
const onEdgeMouseEnter = (e: FlowEvents['edgeMouseEnter']) => console.log('edge mouse enter', e)
const onEdgeMouseMove = (e: FlowEvents['edgeMouseMove']) => console.log('edge mouse move', e)
const onEdgeMouseLeave = (e: FlowEvents['edgeMouseLeave']) => console.log('edge mouse leave', e)
const onEdgeDoubleClick = (e: FlowEvents['edgeDoubleClick']) => console.log('edge double click', e)
const onConnect = (params: FlowEvents['connect']) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: FlowEvents['elementsRemove']) =>
  (elements.value = removeElements(elementsToRemove, elements.value))

const connectionLineStyle: CSSProperties = { stroke: '#ddd' }
const snapGrid: SnapGrid = [16, 16]

const nodeStrokeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'output') return '#ff0072'
  if (n.type === 'default') return '#1a192b'

  return '#eee'
}

const nodeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string

  return '#fff'
}
</script>
<template>
  <div class="py-4">
    <VueFlow
      v-model="elements"
      :connection-line-style="connectionLineStyle"
      :snap-to-grid="true"
      :snap-grid="snapGrid"
      :zoom-on-scroll="false"
      @element-click="onElementClick"
      @elements-remove="onElementsRemove"
      @connect="onConnect"
      @pane-click="onPaneClick"
      @pane-scroll="onPaneScroll"
      @pane-contex-menu="onPaneContextMenu"
      @node-drag-start="onNodeDragStart"
      @node-drag="onNodeDrag"
      @node-drag-stop="onNodeDragStop"
      @node-double-click="onNodeDoubleClick"
      @selection-drag-start="onSelectionDragStart"
      @selection-drag="onSelectionDrag"
      @selection-drag-stop="onSelectionDragStop"
      @selection-context-menu="onSelectionContextMenu"
      @selection-change="onSelectionChange"
      @move-end="onMoveEnd"
      @load="onLoad"
      @edge-context-menu="onEdgeContextMenu"
      @edge-mouse-enter="onEdgeMouseEnter"
      @edge-mouse-move="onEdgeMouseMove"
      @edge-mouse-leave="onEdgeMouseLeave"
      @edge-double-click="onEdgeDoubleClick"
    >
      <MiniMap :node-stroke-color="nodeStrokeColor" :node-color="nodeColor" :node-border-radius="2" />
      <Controls />
      <Background color="#aaa" gap="20" />
    </VueFlow>
    <div class="description">
      <div class="content">
        <h1>Overview</h1>
        <p>
          This example demonstrates a number of different event handlers for Vue Flow (check your console), as well as some basic
          setup. On the bottom left you see the Controls and on the bottom right the MiniMap component. You can see different node
          types (input, default, output), edge types (bezier, step and smoothstep), edge labels and custom styled edge labels. The
          code looks like this:
        </p>

        <div class="md">
          <div v-html="script" />
          <div v-html="tmpl" />
          <div v-html="initElements" />
        </div>
      </div>
    </div>
  </div>
</template>
