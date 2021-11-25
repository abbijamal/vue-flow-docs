<script lang="ts" setup>
import useMd from '~/utils/md'

const store = useMd.render(`
\`\`\`typescript
import { useVueFlow } from '@braks/vue-flow'

const store = useVueFlow()
store.setMaxZoom(3)
watch(store.nodes, (nodes) => console.log('nodes changed', nodes))
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
    <h1>Internal State</h1>
    <p>
      Under the hood VueFlow uses <a href="https://pinia.esm.dev/">Pinia</a> for state handling. If you need to access the
      internal state you can use the useVueFlow composable inside either a parent (this will create a new flow context) or a child
      component of VueFlow. Internal state can be manipulated, for example by adding new elements, nodes or edges to the state.
      The state is reactive and changes will be reflected on the graph:
    </p>

    <h2>Internal state and Store actions</h2>
    <div class="md">
      <div v-html="store" />
    </div>

    <AttentionBox>The store is always used in it's current context as it's provided to Vue Flow via Vue.inject.</AttentionBox>
  </div>
</template>
