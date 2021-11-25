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

const useVueFlowScript = useMd.render(`
\`\`\`typescript
import { useVueFlow } from '@braks/vue-flow'
import SuperEdgeComponent from './SuperEdgeComponent.vue'

// creates a new store in the current context, you can pass any prop as an option - it will be saved to the store
const store = useVueFlow({
   edgeTypes: ['superEdge']
})

// hook into any flow event
store.hooks.load.on((instance) => (instance.fitView({ padding: 0.5 })))

// check the flow state or manipulate it
watch(store.elements, (val) => console.log(val))
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
    <h1>Composables</h1>
    <p>
      Vue Flow comes with a variety of composables that are designed to help you gain as much control as you like over the flow,
      it's state & events and zoom behavior.
    </p>

    <h2>useVueFlow</h2>
    <p>
      useVueFlow is your main composable in the library. It provides you with a way to manually create a new flow context with a
      store and event hooks. You can then use the store to watch the flow state, manipulate it or save it somewhere for later use.
      With the hooks you can listen to any of the flow events, even outside the component tree of vue flow.
    </p>
    <AttentionBox class="my-4">
      If possible do not mix props and useVueFlow options to prevent unexpected behavior. Vue Flow will try to merge the values
      but this can result in a state that's not as desired.
    </AttentionBox>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="useVueFlowScript" />
    </div>

    <h2>useZoomPanHelper</h2>
    <p>It can be used to modify the viewport of the VueFlow graph.</p>
    <p><strong>example:</strong></p>
    <div class="md">
      <div v-html="useZoomPanHelperScript" />
      <div v-html="useZoomPanHelperTmpl" />
    </div>
    <AttentionBox class="mt-2">
      useZoomPanHelper functions can only be used if the component that uses it is in the context of a VueFlow store or if a valid
      store is passed to the helper function.
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
        project: (position: XYPosition) => XYPosition: Transforms pixel coordinates to the internal VueFlow coordinate system.
        This can be used when you drag nodes (from a side bar for example) and need the internal position on the pane.
      </li>
    </ul>

    <h2>useHandle</h2>
    <p>
      Instead of using the Handle component you can use the useHandle composable to create your own custom nodes. useHandle
      provides you with a mouseDown-Handler function that you can apply to the element you want to use as a handle.
    </p>
  </div>
</template>
