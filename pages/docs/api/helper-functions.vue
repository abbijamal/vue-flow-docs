<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  isNode,
  isEdge,
  removeElements,
  addEdge,
} from '@braks/vue-flow'
\`\`\`
`)

const isEdge = useMd.render(`
\`\`\`typescript
const isEdge = (element: Node | Edge | Connection): element is Edge =>
  'id' in element && 'source' in element && 'target' in element
\`\`\`
`)

const isNode = useMd.render(`
\`\`\`typescript
const isNode = (element: Node | Edge | Connection): element is Node =>
  'id' in element && !('source' in element) && !('target' in element)
\`\`\`
`)

const removeElements = useMd.render(`
\`\`\`typescript
// mutates original elements and returns a copy
removeElements = (elementsToRemove: Elements, elements: Elements): Elements
\`\`\`
`)

const addEdge = useMd.render(`
\`\`\`typescript
// mutates original elements and returns a copy
addEdge = (edgeParams: Edge, elements: Elements): Elements
\`\`\`
`)

const updateEdge = useMd.render(`
\`\`\`typescript
// mutates original elements and returns a copy
updateEdge = (oldEdge: Edge, newConnection: Connection, elements: Elements)
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
    <h1>Helper Functions</h1>
    <p>
      If you want to remove a node or connect two nodes with each other you need to pass a function to onElementsRemove and
      onConnect. In order to simplify this process there are some helper functions you can use:
    </p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>

    <h2>isEdge</h2>
    <p>Returns true if the passed element is an edge.</p>
    <span v-html="isEdge" />

    <h2>isNode</h2>
    <p>Returns true if the passed element is a node.</p>
    <span v-html="isNode" />

    <h2>removeElements</h2>
    <p>
      Returns an array of elements without the ones from elementsToRemove. It also removes all incoming/outgoing edges if you just
      pass one or multiple nodes.
    </p>
    <span v-html="removeElements" />

    <h2>addEdge</h2>
    <p>Returns an array with elements with the added edge.</p>
    <span v-html="isNode" />

    <h2>updateEdge</h2>
    <p>Can be used as a helper for onEdgeUpdate. Returns the elements with the updated edge.</p>
    <span v-html="updateEdge" />
  </div>
</template>
