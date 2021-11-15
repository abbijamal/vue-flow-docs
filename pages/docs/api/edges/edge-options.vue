<script lang="ts" setup>
import useMd from '~/utils/md'

const options = useMd.render(`
\`\`\`javascript
{
  id: 'e1-2',
  type: 'straight',
  source: '1',
  target: '2',
  animated: true,
  label: 'edge label'
}
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
    <h1>Edge Options</h1>
    <p>You create edges by adding them to the elements array of the Vue Flow component.</p>
    <div class="md">
      <div v-html="options" />
    </div>
    <p>
      If you wanted to display this edge, you would need a node with id = 1 (source node) and another one with id = 2 (target
      node).
    </p>

    <h1>Options</h1>
    <ul>
      <li>id: string (required)</li>
      <li>source: string (an id of a node) (required)</li>
      <li>target: string (an id of a node) (required)</li>
      <li>sourceHandle: string (an id of a handle - you only need this when you have multiple handles)</li>
      <li>targetHandle: string (an id of a handle - you only need this when you have multiple handles)</li>
      <li>type: 'default' (bezier), 'straight', 'step' and 'smoothstep' or a custom one depending on your implementation</li>
      <li>animated: boolean</li>
      <li>label: string</li>
      <li>labelStyle: css properties for the text</li>
      <li>labelShowBg: boolean - default: true</li>
      <li>labelBgStyle: css properties for the text background</li>
      <li>labelBgPadding: [number, number] background rectangle padding - default: [2, 4]</li>
      <li>labelBgBorderRadius: number - default 2</li>
      <li>arrowHeadType: 'arrow' or 'arrowclosed' - defines the arrowhead of the edge</li>
      <li>markerEndId: custom marker end url - if this is used arrowHeadType gets ignored</li>
      <li>isHidden: if true, the edge will not be rendered</li>
      <li>data: any - you can use this to pass data to your custom edges.</li>
    </ul>
    <p>
      You can find an example with different edges in the
      <nuxt-link to="/examples/edges">edges example</nuxt-link>
      .
    </p>
  </div>
</template>
