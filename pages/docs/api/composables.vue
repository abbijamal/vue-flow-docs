<script lang="ts" setup>
import useMd from '~/utils/md'

const useZoomPanHelperScript = useMd.render(`
\`\`\`typescript
import { useZoomPanHelper } from '@braks/vue-flow'

const { fitView } = useZoomPanHelper()
\`\`\`
`)

const useZoomPanHelperTmpl = useMd.render(`
\`\`\`markup
<button @click="fitView({ padding: 0.2, includeHiddenNodes: true })"></button>
\`\`\`
`)

const useUpdateNodeInternalsScript = useMd.render(`
\`\`\`typescript
import { useUpdateNodeInternals } from '@braks/vue-flow'
\`\`\`
`)

const useUpdateNodeInternalsTmpl = useMd.render(`
\`\`\`markup
<button @click="() => updateNodeInternals('node-id')"></button>
\`\`\`
`)

const useHooksScript = useMd.render(`
\`\`\`typescript
import { useHooks } from '@braks/vue-flow'

const hooks = useHooks()
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
    <h1>Composables</h1>
    <p>The following composables are available.</p>

    <h2>useZoomPanHelper</h2>
    <p>It can be used to modify the viewport of the Vue Flow graph.</p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="useZoomPanHelperScript" />
      <div v-html="useZoomPanHelperTmpl" />
    </div>
    <AttentionBox class="mt-2">
      useZoomPanHelper functions can only be used if the component that uses it is in the context of a Vue Flow Store or if a
      valid store is passed to the helper function.
    </AttentionBox>

    <p>The useZoomPanHelper hook returns an object containing the following functions:</p>
    <ul>
      <li>
        fitView = ({ padding: number, includeHiddenNodes: boolean }): void - fits the view to the nodes on the pane. padding is
        0.1 and includeHiddenNodes is false by defaultzoomIn = (): void - zooms in
      </li>
      <li>zoomOut = (): void - zooms out</li>
      <li>zoomTo = (zoomLevel: number): void - zooms to passed zoom level</li>
      <li>transform: (transform: FlowTransform): void - sets the transform of the pane</li>
      <li>
        setCenter: (x: number, y: number, zoom?: number): void - sets the center to the passed params. If no zoom is passed the
        maxZoom is used
      </li>
      <li>
        fitBounds: (bounds: Rect, padding?: number): void - fits the pane to the passed bounds (object with width x, y, width and
        height: { x: 0, y: 0, width: 100, height: 100 })
      </li>
      <li>
        project: (position: XYPosition) => XYPosition: Transforms pixel coordinates to the internal Vue Flow coordinate system.
        This can be used when you drag nodes (from a side bar for example) and need the internal position on the pane.
      </li>
    </ul>

    <h2>useUpdateNodeInternals</h2>
    <p>
      When you are programatically changing the number or the position of handles inside a custom node you need to notify Vue Flow
      about it with the useUpdateNodeInternals hook. It also updates the internal size. Usage:
    </p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="useUpdateNodeInternalsScript" />
      <div v-html="useUpdateNodeInternalsTmpl" />
    </div>

    <h2>useStore</h2>
    <p>
      If used outside the Vue Flow component useStore will create a new store context to be used by a Vue Flow instance, otherwise
      if used inside the Vue Flow component tree (i.e. a child-component) it will return the current store of the Vue Flow
      instance. The store can be used to manipulate or watch the internal state. Check the
      <nuxt-link to="/docs/api/internal-state">internal-state api</nuxt-link> for more information.
    </p>

    <h2>useHooks</h2>
    <p>
      Similar to the useStore function, useHooks will either create a new EventHook-Context or will return the currently existing
      one. The context can be used to listen to any available Vue Flow Event.
    </p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="useHooksScript" />
    </div>
  </div>
</template>
