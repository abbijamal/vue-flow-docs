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
  <div>
    <h1>Node Options</h1>
    <p>You create nodes by adding them to the elements array of the Vue Flow component.</p>
    <div class="md">
      <div v-html="options" />
    </div>

    <h1>Options</h1>
    <ul>
      <li>id: string (required)</li>
      <li>position: { x: number, y: number } (required)</li>
      <li>data: {} (required if you are using a standard type, otherwise depends on your implementation)</li>
      <li>type: 'input' | 'output' | 'default' or a custom one you implemented</li>
      <li>style: css properties</li>
      <li>className: additional class name</li>
      <li>targetPosition: 'left' | 'right' | 'top' | 'bottom' handle position - default: 'top'</li>
      <li>sourcePosition: 'left' | 'right' | 'top' | 'bottom' handle position - default: 'bottom'</li>
      <li>isHidden: if true, the node will not be rendered</li>
      <li>draggable: boolean - if option is not set, the node is draggable (overwrites general nodesDraggable option)</li>
      <li>connectable: boolean - if option is not set, the node is connectable (overwrites general nodesConnectable option)</li>
      <li>selectable: boolean - if option is not set, the node is selectable (overwrites general elementsSelectable option)</li>
      <li>dragHandle: string - selector for specifying an element as a drag handle</li>
    </ul>
  </div>
</template>
