<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type D3Zoom = ZoomBehavior<HTMLDivElement, unknown>
type D3Selection = Selection<HTMLDivElement, unknown, any, any>
type D3ZoomHandler = (this: HTMLDivElement, event: any, d: unknown) => void

type KeyCode = number | string

enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

interface UseZoomPanHelper {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoomLevel: number) => void
  transform: (transform: FlowTransform) => void
  fitView: FitViewFunc
  setCenter: (x: number, y: number, zoom?: number) => void
  fitBounds: (bounds: Rect, padding?: number) => void
  project: (position: XYPosition) => XYPosition
}

type InitD3ZoomPayload = {
  d3Zoom: D3Zoom
  d3Selection: D3Selection
  d3ZoomHandler: D3ZoomHandler
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
    <h1>Zoom Panel</h1>
    <p>These are zoom and pan helper related types/interfaces.</p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
