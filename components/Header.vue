<script setup>
import { useVueFlow } from '@braks/vue-flow'
const store = useVueFlow()
</script>
<template>
  <header class="flex border-b-1 border-black border-solid items-center py-4 px-8 font-semibold text-white">
    <div class="flex flex-col">
      <nuxt-link to="/" class="logo text-xl">
        Vue Flow <span class="text-xs">v{{ store.vueFlowVersion }}</span>
      </nuxt-link>
      <span class="text-xs mt-2 hidden md:block"
        >An open source library by <a href="https://github.com/bcakmakoglu/bcakmakoglu">Braks</a> <br />
        Based on <a href="https://reactflow.dev">React Flow</a>
      </span>
    </div>
    <div class="flex-1 flex justify-evenly gap-2 transform scale-85 md:scale-100">
      <nuxt-link class="link" to="/docs">Documentation</nuxt-link>
      <nuxt-link class="link" to="/examples">Examples</nuxt-link>
      <a class="link" href="https://github.com/bcakmakoglu/vue-flow">Github</a>
    </div>
  </header>
</template>
<style scoped>
a {
  @apply hover:text-gray-300;
}

.logo {
  text-decoration: none;
  display: block;
  line-height: 1;
}
.link {
  @apply bg-gray-200 rounded-lg px-4 py-2 !hover:text-yellow-500 text-black;
}
</style>
