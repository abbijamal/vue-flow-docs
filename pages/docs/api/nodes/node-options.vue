<script lang="ts" setup>
import useMd from '~/utils/md'

const options = useMd.render(`
\`\`\`javascript
{
  id: '1',
  type: 'input',
  data: { label: 'Node 1' },
  position: { x: 250, y: 5 }
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
  <div class="py-4">
    <h1>Node Options</h1>
    <p>
      You create nodes by adding them to the v-model of the Vue Flow component. If you have a FlowStore instance present you can
      use the store directly to add (and parse) elements into the graph.
    </p>
    <div class="md">
      <div v-html="options" />
    </div>

    <h1>Options</h1>
    <ul>
      <li><strong>id</strong>: string (required)</li>
      <li><strong>position</strong>: { x: number, y: number } (required)</li>
      <li>
        <strong>data</strong>: any object (not required if you are using a standard type, otherwise depends on your
        implementation)
      </li>
      <li><strong>type</strong>: 'input' | 'output' | 'default' or a custom one you implemented</li>
      <li><strong>style</strong>: css properties</li>
      <li><strong>class</strong>: additional class names</li>
      <li><strong>targetPosition</strong>: 'left' | 'right' | 'top' | 'bottom' handle position - default: 'top'</li>
      <li><strong>sourcePosition</strong>: 'left' | 'right' | 'top' | 'bottom' handle position - default: 'bottom'</li>
      <li><strong>isHidden</strong>: if true, the node will not be rendered</li>
      <li>
        <strong>draggable</strong>: boolean - if option is not set, the node is draggable (overwrites general nodesDraggable
        option)
      </li>
      <li>
        <strong>connectable</strong>: boolean - if option is not set, the node is connectable (overwrites general nodesConnectable
        option)
      </li>
      <li>
        <strong>selectable</strong>: boolean - if option is not set, the node is selectable (overwrites general elementsSelectable
        option)
      </li>
      <li><strong>dragHandle</strong>: string - selector for specifying an element as a drag handle</li>
      <li>
        <strong>snapGrid</strong>: [number, number] - move nodes in grid-fashion, if specified overrides global snapGrid config
      </li>
      <li>
        <strong>isValidTargetPos</strong>: function returning boolean if connection is valid (triggered by target handle) -
        default: () => true
      </li>
      <li>
        <strong>isValidSourcePos</strong>: function returning boolean if connection is valid (triggered by source handle) -
        default: () => true
      </li>
    </ul>
  </div>
</template>
