<script lang="ts" setup>
import useMd from '~/utils/md'

const store = useMd.render(`
\`\`\`typescript
import { useStore } from '@braks/vue-flow';

const store = useStore()
store.setMaxZoom(3)
watch(store.nodes, (val) => console.log(val))
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
    <h1>Internal State</h1>
    <p>
      Under the hood VueFlow uses <a href="https://pinia.esm.dev/">Pinia</a> for state handling. If you need to access the
      internal state you can use the useStore hook inside either a parent (this will trigger an instanciation of the store for the
      current Flow instance) or a child component of VueFlow:
    </p>

    <h2>Internal state and Store actions</h2>
    <div class="md">
      <div v-html="store" />
    </div>

    <AttentionBox>The store is always used in it's current context.</AttentionBox>
  </div>
</template>
