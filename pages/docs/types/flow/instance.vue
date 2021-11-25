<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type FlowInstance<T = any> = {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoomLevel: number) => void
  fitView: FitViewFunc
  project: ProjectFunc
  getElements: () => FlowElements<T>
  setTransform: (transform: FlowTransform) => void
  toObject: ToObjectFunc<T>
}

type FitViewParams = {
  padding?: number
  includeHiddenNodes?: boolean
  minZoom?: number
  maxZoom?: number
  offset?: {
    x?: number
    y?: number
  }
}

type FlowExportObject<T = any> = {
  elements: FlowElements<T>
  position: [number, number]
  zoom: number
}

type FlowTransform = {
  x: number
  y: number
  zoom: number
}

type FitViewFunc = (fitViewOptions?: FitViewParams) => void
type ProjectFunc = (position: XYPosition) => XYPosition
type ToObjectFunc<T = any> = () => FlowExportObject<T>
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
    <h1>FlowInstance</h1>
    <p>
      A FlowInstance is always returned at the <strong>onLoad</strong> event. You can use the FlowInstance to fit the elements to
      the view or do other basic operations with the graph. The flow instance is always stored in the current store state of Vue
      Flow.
    </p>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
