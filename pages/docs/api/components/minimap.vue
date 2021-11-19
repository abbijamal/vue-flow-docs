<script lang="ts" setup>
import useMd from '~/utils/md'

const minimapScript = useMd.render(`
\`\`\`typescript
import { VueFlow, Minimap } from '@braks/vue-flow'
\`\`\`
`)
const minimapTmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements">
  <MiniMap
      :node-color="(node) => {
        switch (node.type) {
          case 'input':
            return 'red';
          case 'default':
            return '#00ff00';
          case 'output':
            return 'rgb(0,0,255)';
          default:
            return '#eee';
        }
      }"
      :nodeStrokeWidth="3"
    />
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
    <h1>Minimap</h1>
    <p>You can use the mini map plugin by passing it as a child to the VueFlow component:</p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="minimapScript" />
      <div v-html="minimapTmpl" />
    </div>

    <h2>Prop Types</h2>
    <ul>
      <li>
        nodeColor: string or function - If you pass a color as a string all nodes will get that color. If you pass a function you
        can return a color depending on the passed node.
      </li>
      <li>nodeBorderRadius: number</li>
      <li>nodeStrokeWidth: number</li>
      <li>nodeClassName: string or function for adding an additional class to the nodes inside the mini map</li>
      <li>maskColor: string</li>
    </ul>
  </div>
</template>
