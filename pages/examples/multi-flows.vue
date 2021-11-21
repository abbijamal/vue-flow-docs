<script lang="ts" setup>
import Flow from '../../components/Flow.vue'
import { tmpl, flowScript, flowTmpl } from './multi-flows-example'
</script>
<template>
  <div class="flex flex-col">
    <div class="vue-flow__example-multiflows flex-1">
      <Flow />
      <Flow />
    </div>
    <div class="description">
      <div class="content">
        <h1>Multiple Flows</h1>
        <p>
          Vue Flow is not limited to a single instance on a page. You can use as many component instances as you like. In this
          example we render two Graphs side by side:
        </p>

        <div class="md">
          <div v-html="tmpl" />
          <div v-html="flowScript" />
          <div v-html="flowTmpl" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.vue-flow__example-multiflows {
  display: flex;
  height: 100%;
}

.vue-flow__example-multiflows .vue-flow {
  width: 100%;
  height: 100%;
}

.vue-flow__example-multiflows .vue-flow:first-child {
  border-right: 2px solid #333;
}
</style>
