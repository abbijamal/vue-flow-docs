<script lang="ts" setup>
import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { Handle } from '@braks/vue-flow';
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<template>
  <Handle
    type="target"
    position="left"
    :is-valid-connection="(connection) => connection.source === 'some-id'"
    @connect="(params) => console.log('handle onConnect', params)"
    style="background: #fff"
  />
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
    <h1>Handle Component</h1>
    <p>We export a Handle component as a helper for your custom nodes:</p>
    <div class="md">
      <div v-html="script" />
      <div v-html="tmpl" />
    </div>

    <h2>Prop Types</h2>
    <ul>
      <li>type: 'source' or 'target'</li>
      <li>id: string - you only need this when you have multiple source or target handles (otherwise the node id is used)</li>
      <li>
        position: 'left', 'right', 'top' or 'bottom' handle position - default: 'top' for type target, 'bottom' for type source
      </li>
      <li>
        isValidConnection: function receives a connection { target: 'some-id', source: 'another-id', sourceHandle: 'source handle
        id or null', targetHandle: 'target handle id or null' } as param, returns a boolean - default: true.
      </li>
      <li>isConnectable boolean (this prop gets passed to your custom node component)</li>
    </ul>

    <h2>Events</h2>
    <ul>
      <li>onConnect: event that gets triggered on connect. This event only gets executed on source handles.</li>
    </ul>

    <h2>Validation</h2>
    <p>
      The handle receives the additional class names connecting when the connection line is above the handle and valid if the
      connection is valid. You can find an example which uses these classes
      <nuxt-link to="/examples/validation">here</nuxt-link>.
    </p>

    <h2>Multiple Handles</h2>
    <p>
      If you need multiple source or target handles you can achieve this by creating a custom node. Normally you just use the id
      of a node for the source or target of an edge. If you have multiple source or target handles you need to pass an id to these
      handles. These ids can be used by an edge with the sourceHandle and targetHandle options, so that you can connect a specific
      handle. If you have a node with an id = 1 and a handle with an id = a you can connect this handle by using the node source=1
      and the sourceHandle=a. You can find an example of how to implement a custom node with multiple handles in the
      <nuxt-link to="/examples/custom-node">custom node example</nuxt-link>.
    </p>
  </div>
</template>
