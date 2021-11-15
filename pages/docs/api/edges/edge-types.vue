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
    <p>If you want to introduce a new edge type you can pass an edgeTypes object to the VueFlow component:</p>
    <div class="md">
      <div v-html="edgeTypesOpt" />
    </div>
    <p>You can access your Edges from slot templates as well.</p>
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
      <li>source: string (node id)</li>
      <li>target: string (node id)</li>
      <li>selected: boolean</li>
      <li>animated: boolean</li>
      <li>label: string</li>
      <li>labelStyle: svg attributes</li>
      <li>labelShowBg: boolean</li>
      <li>labelBgStyle: svg attributes</li>
      <li>labelBgPadding: number</li>
      <li>labelBgBorderRadius: number</li>
      <li>data: any object</li>
      <li>style: svg attributes</li>
      <li>arrowHeadType: 'arrow' | 'arrowclosed'</li>
      <li>sourceX: number</li>
      <li>sourceY: number</li>
      <li>targetX: number</li>
      <li>targetY: number</li>
      <li>sourcePosition: 'left' | 'top' | 'right' | 'bottom'</li>
      <li>targetPosition: 'left' | 'top' | 'right' | 'bottom'</li>
      <li>markerEndId: string</li>
    </ul>
  </div>
</template>
