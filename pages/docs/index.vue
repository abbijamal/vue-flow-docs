<script>
export default {
  layout: 'docs',
}
</script>
<template>
  <div>
    <h1>Introduction</h1>
    <p>
      Vue Flow, just like React Flow, is a library for building node-based applications. These can be simple static diagrams or
      complex node-based editors. You can implement custom node types and edge types and it comes with components like a mini-map
      and graph controls. Feel free to check out the
      <nuxt-link to="/examples">examples</nuxt-link>
      .
    </p>

    <h1>Key Features</h1>
    <ul>
      <li>
        <span class="font-semibold">👶 Easy to use</span>: Seamless zooming & panning behaviour and single and multi-selections of
        elements
      </li>
      <li>
        <span class="font-semibold">🎨 Customizable</span>: Different
        <nuxt-link to="/docs/api/nodes/node-types">node</nuxt-link>
        and
        <nuxt-link to="/docs/api/edges/edge-types">edge types</nuxt-link>
        and support for custom nodes with multiple handles and custom edges
      </li>
      <li>
        <span class="font-semibold">🚀 Fast rendering</span>: Only nodes that have changed are re-rendered and only those that are
        in the viewport are displayed (optionally)
      </li>
      <li>
        <span class="font-semibold">🧲 Utils</span>: Snap-to-grid and graph
        <nuxt-link to="/docs/api/helper-functions">helper functions</nuxt-link>
      </li>
      <li>
        <span class="font-semibold">📦 Components</span>:
        <nuxt-link to="/docs/api/components/background">Background</nuxt-link>
        ,
        <nuxt-link to="/docs/api/components/minimap">Minimap</nuxt-link>
        and
        <nuxt-link to="/docs/api/components/controls">Controls</nuxt-link>
      </li>
      <li>
        <span class="font-semibold">🦾 Reliable</span>: Fully written in <a href="https://www.typescriptlang.org/">TypeScript</a>
      </li>
    </ul>

    <AttentionBox class="mt-6">
      Vue Flow is still not fully matured and ready for production use yet.
      <br />
      You can still try it out and see if it works for you or contribute in getting Vue Flow ready!
    </AttentionBox>
  </div>
</template>
