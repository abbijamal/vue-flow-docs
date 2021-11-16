<script lang="ts" setup>
import useMd from '~/utils/md'

const edgeTypes = useMd.render(`
\`\`\`javascript
{
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge
}
\`\`\`
`)

const edgeTypesOpt = useMd.render(`
\`\`\`markup
<VueFlow :edgeTypes="{ special: CustomEdgeComponent }" :elements="elements" />
\`\`\`
`)

const edgeTypesSlot = useMd.render(`
\`\`\`markup
<VueFlow :elements="elements">
  <template #edge-special>
      <CustomEdgeComponent style="background: red" />
  </template>
</VueFlow>
\`\`\`
`)

const customEdge = useMd.render(`
\`\`\`typescript
import { VueFlow, Elements, Handle } from '@braks/vue-flow';

const elements: Elements = [
  {
    id: '2',
    type: 'special',
    position: { x: 100, y: 100 },
    data: { text: 'A custom node' },
  },
];

const customNodeStyles = {
  background: '#9CA8B3',
  color: '#FFF',
  padding: 10,
};
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
    <h1>Edge Types</h1>
    <p>
      VueFlow comes with four edge types (default, straight, step, smoothstep). As the names indicate, the edges differ in the
      representation. The default type is a bezier edge. The basic edge types are default (bezier), straight, step and smoothstep.
      The default edgeTypes object looks like this:
    </p>
    <div class="md">
      <div v-html="edgeTypes" />
    </div>
    <p>The keys represent the type names and the values are the components that get rendered.</p>

    <h1>Custom Edges</h1>
    <p>
      If you want to introduce new edge types you can pass a custom edgeTypes object or a string[] containing the edge type name
      to resolve to:
    </p>
    <div class="md">
      <div v-html="edgeTypesOpt" />
    </div>
    <p>
      If no component can be found in the edgeTypes object (i.e. you passed a string[]), the graph will try to use a slot instead,
      otherwise nothing is rendered.
    </p>
    <div class="md">
      <div v-html="edgeTypesSlot" />
    </div>
    <p>
      Now you could use the new type special for an edge. The straight, default and step types would still be available unless you
      overwrote one of them. There is an implementation of a custom edge in the
      <nuxt-link to="/examples/edges">edges example</nuxt-link>.
    </p>

    <h1>Prop Types</h1>
    <p>Custom edges are wrapped. They receive the following props:</p>
    <ul>
      <li><strong>source</strong>: string (node id)</li>
      <li><strong>target</strong>: string (node id)</li>
      <li><strong>selected</strong>: boolean</li>
      <li><strong>animated</strong>: boolean</li>
      <li><strong>label</strong>: string</li>
      <li><strong>labelStyle</strong>: svg attributes</li>
      <li><strong>labelShowBg</strong>: boolean</li>
      <li><strong>labelBgStyle</strong>: svg attributes</li>
      <li><strong>labelBgPadding</strong>: number</li>
      <li><strong>labelBgBorderRadius</strong>: number</li>
      <li><strong>data</strong>: any object</li>
      <li><strong>style</strong>: svg attributes</li>
      <li><strong>arrowHeadType</strong>: 'arrow' | 'arrowclosed'</li>
      <li><strong>sourceX</strong>: number</li>
      <li><strong>sourceY</strong>: number</li>
      <li><strong>targetX</strong>: number</li>
      <li><strong>targetY</strong>: number</li>
      <li><strong>sourcePosition</strong>: 'left' | 'top' | 'right' | 'bottom'</li>
      <li><strong>targetPosition</strong>: 'left' | 'top' | 'right' | 'bottom'</li>
      <li><strong>markerEndId</strong>: string</li>
    </ul>
  </div>
</template>
