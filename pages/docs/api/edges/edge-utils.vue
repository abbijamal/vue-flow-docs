<script lang="ts" setup>
import useMd from '~/utils/md'

const getBezierPath = useMd.render(`
\`\`\`typescript
import { getBezierPath } from '@braks/vue-flow'

getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom, // optional
  targetX,
  targetY,
  targetPosition = Position.Top, // optional
  centerX, // optional
  centerY, // optional
}): string
\`\`\`
`)

const getSmoothStepPath = useMd.render(`
\`\`\`typescript
import { getSmoothStepPath } from '@braks/vue-flow'

getSmoothStepPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom, // optional
  targetX,
  targetY,
  targetPosition = Position.Top, // optional
  borderRadius = 5, // optional
  centerX, // optional
  centerY, // optional
}): string
\`\`\`
`)

const getEdgeCenter = useMd.render(`
\`\`\`typescript
import { getEdgeCenter } from '@braks/vue-flow'

getEdgeCenter({
  sourceX,
  sourceY,
  targetX,
  targetY
}): [number, number, number, number]
\`\`\`
`)

const getMarkerEnd = useMd.render(`
\`\`\`typescript
import { getMarkerEnd, ArrowHeadType } from '@braks/vue-flow'

getMarkerEnd(arrowHeadType?: ArrowHeadType, markerEndId?: string): string
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
    <h1>Edge Utils</h1>
    <p>
      There are several utils that help you to create a custom edge. Some are used in the
      <nuxt-link to="/examples/edges">edges example</nuxt-link>. Vue Flow exports utilities to calculate edge paths and center
      edge labels. Here's a list of the exported utils:
    </p>

    <h2>getBezierPath</h2>
    <p>Returns the path of a bezier edge.</p>
    <div class="md">
      <div v-html="getBezierPath" />
    </div>

    <h2>getSmoothStepPath</h2>
    <p>Returns the path of a smooth step edge. You can set borderRadius = 0 to get a step edge path.</p>
    <div class="md">
      <div v-html="getSmoothStepPath" />
    </div>

    <h2>getEdgeCenter</h2>
    <p>Returns the center position and offset [centerX, centerY, offsetX, offsetY] of the edge.</p>
    <div class="md">
      <div v-html="getEdgeCenter" />
    </div>

    <h2>getMarkerEnd</h2>
    <p>Returns the marker end url for displaying the arrow head.</p>
    <div class="md">
      <div v-html="getMarkerEnd" />
    </div>
  </div>
</template>
