<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
import {
  Flow,
  isNode,
  isEdge,
  removeElements,
  addEdge,
} from '@braks/vue-flow';
\`\`\`
`)

const isEdge = useMd.render(`
\`\`\`typescript
isEdge = (element: Node | Edge): element is Edge
\`\`\`
`)

const isNode = useMd.render(`
\`\`\`typescript
isNode = (element: Node | Edge): element is Node
\`\`\`
`)

const removeElements = useMd.render(`
\`\`\`typescript
removeElements = (elementsToRemove: Elements, elements: Elements): Elements
\`\`\`
`)

const addEdge = useMd.render(`
\`\`\`typescript
addEdge = (edgeParams: Edge, elements: Elements): Elements
\`\`\`
`)

const updateEdge = useMd.render(`
\`\`\`typescript
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
  <div>
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
