<script lang="ts" setup>
import useMd from '~/utils/md'

const instanceScript = useMd.render(`
\`\`\`typescript
import { Flow } from '@braks/vue-flow'

const onLoad = (vueFlowInstance) => {
  vueFlowInstance.fitView()
}
\`\`\`
`)

const instanceTmpl = useMd.render(`
\`\`\`markup
<Flow @load="onLoad" :elements="[]" />
\`\`\`
`)

const projectType = useMd.render(`
\`\`\`typescript
project = (position: XYPosition): XYPosition
\`\`\`
`)

const project = useMd.render(`
\`\`\`typescript
vueFlowInstance.project({ x: 100, y: 100 })
\`\`\`
`)

const fitViewType = useMd.render(`
\`\`\`typescript
fitView = ({ padding, includeHiddenNodes }): void
\`\`\`
`)

const fitView = useMd.render(`
\`\`\`typescript
vueFlowInstance.fitView({ padding: 0.25, includeHiddenNodes: true })
\`\`\`
`)

const setTransformType = useMd.render(`
\`\`\`typescript
setTransform = (transform: FlowTransform): void
\`\`\`
`)

const setTransform = useMd.render(`
\`\`\`typescript
vueFlowInstance.setTransform({ x: 100, y: 100, zoom: 1.5 })
\`\`\`
`)

const zoomIn = useMd.render(`
\`\`\`typescript
vueFlowInstance.setTransform({ x: 100, y: 100, zoom: 1.5 })
\`\`\`
`)

const zoomOut = useMd.render(`
\`\`\`typescript
vueFlowInstance.setTransform({ x: 100, y: 100, zoom: 1.5 })
\`\`\`
`)

const toObject = useMd.render(`
\`\`\`typescript
toObject = (): {
  elements: Elements,
  position: [x, y],
  zoom: scale,
}
\`\`\`
`)

const getElements = useMd.render(`
\`\`\`typescript
getElements = (): Elements
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
    <h1>Instance</h1>
    <p>You can receive a vueFlowInstance by using the onLoad event:</p>
    <div class="md">
      <div v-html="instanceScript" />
      <div v-html="instanceTmpl" />
    </div>
    <p>The vueFlowInstance has the following functions:</p>

    <h2>project</h2>
    <p>
      Transforms pixel coordinates to the internal Vue Flow coordinate system. This can be used when you drag nodes (from a side
      bar for example) and need the internal position on the pane.
    </p>
    <div class="md">
      <div v-html="projectType" />
    </div>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="project" />
    </div>

    <h2>fitView</h2>
    <p>Fits the view port so that all nodes are visible. padding is 0.1 and includeHiddenNodes is false by default.</p>
    <div class="md">
      <div v-html="fitViewType" />
    </div>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="fitView" />
    </div>

    <h2>setTransform</h2>
    <p>Sets position and zoom of the pane.</p>
    <div class="md">
      <div v-html="setTransformType" />
    </div>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="setTransform" />
    </div>

    <h2>zoomIn</h2>
    <p>Zoom in</p>
    <div class="md">
      <div v-html="zoomIn" />
    </div>

    <h2>zoomOut</h2>
    <p>Zoom out</p>
    <div class="md">
      <div v-html="zoomOut" />
    </div>

    <h2>toObject</h2>
    <p>Returns elements, position and zoom of the current flow state</p>
    <div class="md">
      <div v-html="toObject" />
    </div>

    <h2>getElements</h2>
    <div class="md">
      <div v-html="getElements" />
    </div>
  </div>
</template>
