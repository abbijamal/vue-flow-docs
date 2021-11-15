<script lang="ts" setup>
import useMd from '~/utils/md'

const controlsScript = useMd.render(`
\`\`\`typescript
import { Flow, Controls } from '@braks/vue-flow'
\`\`\`
`)
const controlsTmpl = useMd.render(`
\`\`\`markup
<Flow :elements="elements">
  <Controls />
</Flow>
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
    <h1>Controls</h1>
    <p>
      The control panel contains a zoom-in, zoom-out, fit-view and a lock/unlock button. You can use it by passing it as a
      children to the ReactFlow component:
    </p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="controlsScript" />
      <div v-html="controlsTmpl" />
    </div>

    <h2>Prop Types</h2>
    <ul>
      <li>showZoom: boolean - default: true</li>
      <li>showFitView: boolean - default: true</li>
      <li>showInteractive: boolean - default: true</li>
    </ul>

    <h2>Events</h2>
    <ul>
      <li>onZoomIn: callback function that gets triggered when the zoom in button is pressed</li>
      <li>onZoomOut: callback function that gets triggered when the zoom out button is pressed</li>
      <li>onFitView: callback function that gets triggered when the fit-to-view button is pressed</li>
      <li>onInteractiveChange: callback function that gets triggered when the lock button is pressed - passes the new value</li>
    </ul>
  </div>
</template>
