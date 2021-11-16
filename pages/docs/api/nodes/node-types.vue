<script lang="ts" setup>
import { VueFlow, Elements, Background, BackgroundVariant } from '@braks/vue-flow'
import CustomNodeComponent from '../../../../components/CustomNodeTypesExample.vue'
import useMd from '~/utils/md'

const elements: Elements = [
  {
    id: '2',
    type: 'special',
    position: { x: 100, y: 100 },
    data: { text: 'A custom node' },
  },
]

const types = {
  special: CustomNodeComponent,
}

const nodeTypes = useMd.render(`
\`\`\`javascript
{
  input: InputNode,
  default: DefaultNode,
  output: OutputNode
}
\`\`\`
`)

const nodeTypesOpt = useMd.render(`
\`\`\`markup
<!-- passing an object -->
<VueFlow :nodeTypes="{ special: CustomNodeComponent }" :elements="elements" />

<!-- or an array -->
<VueFlow :nodeTypes="['special']" :elements="elements" />
\`\`\`
`)

const nodeTypesSlot = useMd.render(`
\`\`\`markup
<VueFlow :elements="elements">
  <template #node-special>
      <CustomNodeComponent style="background: red" />
  </template>
</VueFlow>
\`\`\`
`)

const customNode = useMd.render(`
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

const customNodeTmpl = useMd.render(`
\`\`\`markup
<div :style="customNodeStyles">
    <Handle type="target" position="left" style="border-radius: 0" />
    <div>{{ data.text }}</div>
    <Handle
      type="source"
      position="right"
      id="a"
      style="top: 30%; border-radius: 0"
    />
    <Handle
      type="source"
      position="right"
      id="b"
      style="top: 70%; border-radius: 0"
    />
</div>
\`\`\`
`)

const customNodeFlow = useMd.render(`
\`\`\`markup

const nodeTypes = {
  special: CustomNodeComponent,
};
// ...
<template>
  <div style="height: 300px">
    <VueFlow :elements="elements" :nodeTypes="nodeTypes" />
  </div>
</template>
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
    <h1>Node Types</h1>
    <p>
      There are three different node types (default, input, output) you can use. The node types differ in the number and types of
      handles. An input node has only a source handle, a default node has a source and a target and an output node has only a
      target handle. The default node types object looks like this:
    </p>
    <div class="md">
      <div v-html="nodeTypes" />
    </div>
    <p>The keys represent the type names and the values are the components that get rendered.</p>

    <h1>Custom Nodes</h1>
    <p>
      If you want to introduce new node types you can pass a custom nodeTypes object or a string[] containing the node type name
      to resolve to:
    </p>
    <div class="md">
      <div v-html="nodeTypesOpt" />
    </div>
    <p>
      If no component can be found in the nodeTypes object (i.e. you passed a string[]), the graph will try to use a slot instead,
      otherwise nothing is rendered.
    </p>
    <div class="md">
      <div v-html="nodeTypesSlot" />
    </div>
    <p>
      You can now use the type special for a node. The default, input and output types would still be available except you
      overwrote one of them. There is more advanced example of a custom node implementation in the
      <nuxt-link to="/examples/custom-node">custom node example</nuxt-link>
      .
    </p>

    <h1>Prop Types</h1>
    <p>
      Your custom nodes are wrapped so that the basic functions like dragging or selecting work. Custom nodes receive the
      following props:
    </p>
    <ul>
      <li><strong>id</strong>: string</li>
      <li><strong>data</strong>: object</li>
      <li><strong>type</strong>: string</li>
      <li><strong>selected</strong>: boolean</li>
      <li><strong>sourcePosition</strong>: string</li>
      <li><strong>targetPosition</strong>: string</li>
      <li><strong>style</strong>: object containing custom styles</li>
      <li><strong>class</strong>: additional class names</li>
    </ul>

    <h2>Styling</h2>
    <p>When you create a new node type you also need to implement some styling. Your custom node has no default styles.</p>

    <h2>Prevent dragging & selecting</h2>
    <p>
      If you have controls or other elements inside your custom node that should not drag the node you can add the class name
      nodrag. This also prevents the selection of a node.
    </p>

    <h2>Allow scrolling inside a node</h2>
    <p>
      If you want to allow scrolling inside a node or inside an element of a node you can add the class name nowheel to the node
      or the element.
    </p>

    <h1>Basic Implementation</h1>
    <p>A basic implementation of a custom node could look like this:</p>
    <div class="md">
      <div v-html="customNode" />
      <div v-html="customNodeTmpl" />
      <div v-html="customNodeFlow" />
    </div>

    <div class="h-[300px] demo-flow shadow-xl mt-4">
      <VueFlow :elements="elements" :node-types="types">
        <Background :variant="BackgroundVariant.Lines" color="#aaa" :gap="20" :size="0.7" />
      </VueFlow>
    </div>
  </div>
</template>
