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
    <p>You create edges by adding them to the elements array of the VueFlow component.</p>
    <div class="md">
      <div v-html="options" />
    </div>
    <p>
      If you wanted to display this edge, you would need a node with id = 1 (source node) and another one with id = 2 (target
      node).
    </p>

    <h1>Options</h1>
    <ul>
      <li><strong>id</strong>: string (required)</li>
      <li><strong>source</strong>: string (an id of a node) (required)</li>
      <li><strong>target</strong>: string (an id of a node) (required)</li>
      <li><strong>sourceHandle</strong>: string (an id of a handle - you only need this when you have multiple handles)</li>
      <li><strong>targetHandle</strong>: string (an id of a handle - you only need this when you have multiple handles)</li>
      <li>
        <strong>type</strong>: 'default' (bezier), 'straight', 'step' and 'smoothstep' or a custom one depending on your
        implementation
      </li>
      <li><strong>animated</strong>: boolean</li>
      <li><strong>label</strong>: string</li>
      <li><strong>labelStyle</strong>: css properties for the text</li>
      <li><strong>labelShowBg</strong>: boolean - default: true</li>
      <li><strong>labelBgStyle</strong>: css properties for the text background</li>
      <li><strong>labelBgPadding</strong>: [number, number] background rectangle padding - default: [2, 4]</li>
      <li><strong>labelBgBorderRadius</strong>: number - default 2</li>
      <li><strong>arrowHeadType</strong>: 'arrow' or 'arrowclosed' - defines the arrowhead of the edge</li>
      <li><strong>markerEndId</strong>: custom marker end url - if this is used arrowHeadType gets ignored</li>
      <li><strong>isHidden</strong>: if true, the edge will not be rendered</li>
      <li><strong>data</strong>: any - you can use this to pass data to your custom edges.</li>
    </ul>
    <p class="mt-4">
      You can find an example with different edges in the
      <nuxt-link to="/examples/edges">edges example</nuxt-link>
      .
    </p>
  </div>
</template>
