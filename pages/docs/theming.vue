<script lang="ts" setup>
import useMd from '~/utils/md'

const importex = useMd.render(`
\`\`\`css
/* these are necessary styles for vue flow */
@import 'node_modules/@braks/vue-flow/dist/style.css';

/* this contains the default theme, you can skip it if you want to */
@import 'node_modules/@braks/vue-flow/dist/theme-default.css';
\`\`\`
`)

const cssex = useMd.render(`
\`\`\`css
.vue-flow {
  background: red;
}
\`\`\`
`)

const stylignex = useMd.render(`
\`\`\`markup
<VueFlow
  v-model="elements"
  :style="{ background: 'red', width: '100%', height: '300px' }"
/>
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
    <h1>Theming</h1>
    <p>
      VueFlow comes without any pre-injected stylings. Some necessary stylings have to be imported, though optional styles (i.e.
      the default theme) can be skipped.
    </p>
    <div class="md">
      <div v-html="importex" />
    </div>

    <h1>Overwrite Default Styles</h1>
    <p>
      When you are using the default styles there are two ways how you can style the graph pane and the elements. You can create
      your own CSS rules or pass style properties to the components.
    </p>

    <h1>Using Class Names</h1>
    <p>
      Since we are rendering DOM nodes you can simply overwrite the styles with your own CSS rules. The VueFlow wrapper has the
      class vue-flow. If you want to change the graph background for example you can do:
    </p>
    <div class="md">
      <div v-html="cssex" />
    </div>

    <h2>VueFlow Class Names</h2>

    <ul>
      <li><strong>.vue-flow</strong> - Outer container</li>
      <li><strong>.vue-flow__renderer</strong> - Inner container</li>
      <li><strong>.vue-flow__zoompane</strong> - Zoom & pan pane</li>
      <li><strong>.vue-flow__selectionpane</strong> - Selection pane</li>
      <li><strong>.vue-flow__selection</strong> - User selection</li>
      <li><strong>.vue-flow__edges</strong> - Edges wrapper</li>
      <li>
        <strong>.vue-flow__edge</strong> - Edge element
        <ul>
          <li><strong>.selected</strong> is added when edge is selected</li>
          <li><strong>.animated</strong> is added when edge is animated</li>
        </ul>
      </li>
      <li><strong>.vue-flow__edge-path</strong> - Edge element path</li>
      <li><strong>.vue-flow__edge-text</strong> - Edge text</li>
      <li><strong>.vue-flow__edge-textbg</strong> - Edge text background</li>
      <li><strong>.vue-flow__connection</strong> - Connection line</li>
      <li><strong>.vue-flow__connection-path</strong> - Connection line path</li>
      <li><strong>.vue-flow__nodes</strong> - Nodes wrapper</li>
      <li>
        <strong>.vue-flow__node</strong> - Node element
        <ul>
          <li><strong>.selected</strong> is added when edge is selected</li>
          <li><strong>-${type}</strong> is added (.vue-flow__node-default, .vue-flow__node-input, .vue-flow__node-output)</li>
        </ul>
      </li>
      <li><strong>.vue-flow__nodesselection</strong> - Nodes selection</li>
      <li><strong>.vue-flow__nodesselection-rect</strong> - Nodes selection rect</li>
      <li>
        <strong>.vue-flow__handle</strong> - Handle component
        <ul>
          <li><strong>.vue-flow__handle-bottom</strong> is added when position = 'bottom'</li>
          <li><strong>.vue-flow__handle-top</strong> is added when position = 'top'</li>
          <li><strong>.vue-flow__handle-left</strong> is added when position = 'left'</li>
          <li><strong>.vue-flow__handle-right</strong> is added when position = 'right'</li>
          <li><strong>.vue-flow__handle-connecting</strong> is added when connection line is above a handle</li>
          <li>
            <strong>.vue-flow__handle-valid</strong> is added when connection line is above a handle and the connection is valid
          </li>
        </ul>
      </li>
      <li><strong>.vue-flow__background</strong> - Background component</li>
      <li><strong>.vue-flow__minimap</strong> - Mini map component</li>
      <li><strong>.vue-flow__controls</strong> - Controls component</li>
      <li><strong>.vue-flow__loading-indicator</strong> - Loading Indicator component</li>
    </ul>

    <h1>Using Properties</h1>
    <p>You could achieve the same effect by passing a style prop to the Flow component:</p>
    <div class="md">
      <div v-html="stylignex" />
    </div>
  </div>
</template>
