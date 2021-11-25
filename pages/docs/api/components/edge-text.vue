<script lang="ts" setup>
import useMd from '~/utils/md'

const edgeText = useMd.render(`
\`\`\`typescript
interface EdgeTextProps {
  x: number
  y: number
  label?:
    | string
    | {
        component: Component | DefineComponent
        props?: Record<string, any>
      }
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}
\`\`\`
`)

const edgeTextTmpl = useMd.render(`
\`\`\`markup
<EdgeText
  label="a label"
  :x="100"
  :y="100"
  :label-style="{ fill: 'white' }"
  :label-show-bg="true"
  :label-bg-style="{ fill: 'red' }"
  :label-bg-padding="[2, 4]"
  :label-bg-border-radius="2"
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
    <h1>EdgeText</h1>
    <p>The built-in component that is used for displaying the edge label. You can re-use it for your own custom edges.</p>
    <div class="md">
      <div v-html="edgeText" />
      <div v-html="edgeTextTmpl" />
    </div>
  </div>
</template>
