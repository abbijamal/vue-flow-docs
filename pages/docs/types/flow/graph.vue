<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type FlowElement<T = any> = GraphNode<T> | GraphEdge<T>
type FlowElements<T = any> = FlowElement<T>[]

type Transform = [number, number, number]

enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

interface XYPosition {
  x: number
  y: number
}

interface Dimensions {
  width: number
  height: number
}

interface Box extends XYPosition {
  x2: number
  y2: number
}

interface Rect extends Dimensions, XYPosition {}

interface SelectionRect extends Rect {
  startX: number
  startY: number
  draw: boolean
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
    <h1>Graph</h1>
    <p>
      These types are graph related. They are either used to determine positions or calculate dimensions. You will usually not use
      these types directly, nontheless they are available.
    </p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
