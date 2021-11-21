<script setup>
import useMd from '~/utils/md'

const npm = useMd.render(`
\`\`\`bash
$ npm i --save @braks/vue-flow
\`\`\`
`)

const yarn = useMd.render(`
\`\`\`bash
$ yarn add @braks/vue-flow
\`\`\`
`)

const script = useMd.render(`
\`\`\`typescript
// setup function
import { VueFlow, Elements } from '@braks/vue-flow'

const elements: Elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can pass a Vue component, string or html-string as a label
    data: { label: '<div>Default Node</div>' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
]
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" />
  </div>
</template>
\`\`\`
`)
</script>
<template>
  <div class="p-4 md:p-6 lg:p-24 w-full text-white normal-case flex flex-col justify-center items-center backround-img">
    <div class="max-w-full md:w-1/2 gap-2 flex flex-col justify-center items-center overflow-hidden">
      <h1>Getting Started</h1>
      <p>
        With Vue Flow you can build your own, customized node-based applications like static diagrams or even more complex and
        interactive editors!
      </p>

      <h2 class="mb-2">Installation</h2>
      <div class="md">
        <div v-html="npm" />
        <div v-html="yarn" />
      </div>

      <p class="mt-4">
        A flow consists of <strong>nodes</strong> and <strong>edges</strong> (or just nodes). Together we call them
        <strong>elements</strong>. You can pass a set of elements as a prop to the Flow component.
        <span class="font-bold">Each element needs a unique id.</span> A node needs a position and a label and an edge needs a
        source (node id) and a target (node id). These are the most basic parameters for a flow. A simple setup could look like
        this:
      </p>
      <div class="md">
        <div v-html="script" />
        <div v-html="tmpl" />
      </div>

      <p>
        You can find a detailed explanation on how to get started in the <nuxt-link to="/docs">documentation</nuxt-link> or check
        the <nuxt-link to="/examples">examples</nuxt-link>.
      </p>
    </div>
  </div>
</template>
