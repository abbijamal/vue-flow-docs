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
<VueFlow :elements="elements" :style="{ background: 'red', width: '100%', height: '300px' }" />
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
      <li>.vue-flow - Outer container</li>
      <li>.vue-flow__renderer - Inner container</li>
      <li>.vue-flow__zoompane - Zoom & pan pane</li>
      <li>.vue-flow__selectionpane - Selection pane</li>
      <li>.vue-flow__selection - User selection</li>
      <li>.vue-flow__edges - Edges wrapper</li>
      <li>
        .vue-flow__edge - Edge element
        <ul>
          <li>.selected is added when edge is selected</li>
          <li>.animated is added when edge is animated</li>
        </ul>
      </li>
      <li>.vue-flow__edge-path - Edge element path</li>
      <li>.vue-flow__edge-text - Edge text</li>
      <li>.vue-flow__edge-textbg - Edge text background</li>
      <li>.vue-flow__connection - Connection line</li>
      <li>.vue-flow__connection-path - Connection line path</li>
      <li>.vue-flow__nodes - Nodes wrapper</li>
      <li>
        .vue-flow__node - Node element
        <ul>
          <li>.selected is added when edge is selected</li>
          <li>-${type} is added (.vue-flow__node-default, .vue-flow__node-input, .vue-flow__node-output)</li>
        </ul>
      </li>
      <li>.vue-flow__nodesselection - Nodes selection</li>
      <li>.vue-flow__nodesselection-rect - Nodes selection rect</li>
      <li>
        .vue-flow__handle - Handle component
        <ul>
          <li>.vue-flow__handle-bottom is added when position = 'bottom'</li>
          <li>.vue-flow__handle-top is added when position = 'top'</li>
          <li>.vue-flow__handle-left is added when position = 'left'</li>
          <li>.vue-flow__handle-right is added when position = 'right'</li>
          <li>.vue-flow__handle-connecting is added when connection line is above a handle</li>
          <li>.vue-flow__handle-valid is added when connection line is above a handle and the connection is valid</li>
        </ul>
      </li>
      <li>.vue-flow__background - Background component</li>
      <li>.vue-flow__minimap - Mini map component</li>
      <li>.vue-flow__controls - Controls component</li>
    </ul>

    <h1>Using Properties</h1>
    <p>You could achieve the same effect by passing a style prop to the Flow component:</p>
    <div class="md">
      <div v-html="stylignex" />
    </div>
  </div>
</template>
