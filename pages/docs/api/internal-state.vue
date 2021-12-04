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
      Under the hood VueFlow uses
      <a href="https://v3.vuejs.org/guide/component-provide-inject.html" target="_blank">Provide/Inject</a>
      to pass around it's state between components. If you need to access the internal state you can use the useVueFlow
      composable. The composable can be used to either create a new store and inject it into the current component tree or inject
      an existing store. Internal state can be manipulated, for example by adding new elements, nodes or edges to the state. The
      state is reactive and changes will be reflected on the graph:
    </p>

    <h2>Internal state and Store actions</h2>
    <div class="md">
      <div v-html="store" />
    </div>
  </div>
</template>
