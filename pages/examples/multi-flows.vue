<script lang="ts" setup>
import Flow from '../../components/Flow.vue'
import { script, tmpl, flowScript, flowTmpl } from './multi-flows-example'
</script>
<template>
  <div class="flex flex-col">
    <div class="vue-flow__example-multiflows flex-1">
      <Flow />
      <Flow />
    </div>
    <div class="description">
      <div class="content">
        <p>This is example showing the use of multiple Flows on the same page.</p>

        <div class="md">
          <div v-html="script" />
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
