<script lang="ts" setup>
import useMd from '~/utils/md'

const controlsScript = useMd.render(`
\`\`\`typescript
import { VueFlow, Controls } from '@braks/vue-flow'
\`\`\`
`)
const controlsTmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements">
  <Controls />
</VueFlow>
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
      children to the VueFlow component:
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
      <li><strong>onZoomIn</strong>: callback function that gets triggered when the zoom in button is pressed</li>
      <li><strong>onZoomOut</strong>: callback function that gets triggered when the zoom out button is pressed</li>
      <li><strong>onFitView</strong>: callback function that gets triggered when the fit-to-view button is pressed</li>
      <li>
        <strong>onInteractiveChange</strong>: callback function that gets triggered when the lock button is pressed - passes the
        new value
      </li>
    </ul>
  </div>
</template>
