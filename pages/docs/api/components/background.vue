<script lang="ts" setup>
import useMd from '~/utils/md'

const backgroundScript = useMd.render(`
\`\`\`typescript
import { VueFlow, Background } from '@braks/vue-flow'
\`\`\`
`)
const backgroundTmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements">
  <Background
    variant="dots"
    :gap="12"
    :size="4"
  />
</VueFlow>
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
    <h1>Background</h1>
    <p>
      VueFlow comes with two background variants: dots and lines. You can use it by passing it as a child to the Vue VueFlow
      component:
    </p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="backgroundScript" />
      <div v-html="backgroundTmpl" />
    </div>

    <h2>Prop Types</h2>
    <ul>
      <li><strong>variant</strong>: string - has to be 'dots' or 'lines' - default: dots</li>
      <li><strong>gap</strong>: number - the gap between the dots or lines - default: 16</li>
      <li><strong>size</strong>: number - the radius of the dots or the stroke width of the lines - default: 0.5</li>
      <li><strong>color</strong>: string - the color of the dots or lines - default: #81818a for dots, #eee for lines</li>
    </ul>
  </div>
</template>
