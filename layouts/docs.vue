<template>
  <Header />
  <div id="app" class="w-full flex">
    <DocsSidebar :expanded="expanded || !mobile" :class="style" @click="onClick" />
    <div v-show="!expanded || !mobile" id="vue-flow-docs" class="flex-1 flex justify-center items-center">
      <div class="p-6 text-left gap-2 w-full md:w-2/3 h-full flex flex-col leading-tight md:leading-normal">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})
const mobile = computed(() => breakpoints.smaller('laptop').value)
const expanded = ref(false)
const onClick = () => {
  if (mobile.value) {
    expanded.value = !expanded.value
  }
}
const style = computed(() => {
  if (mobile.value && expanded.value) {
    return '!w-full'
  }
  return ''
})
</script>
<style>
html,
body,
#__nuxt {
  overflow: hidden !important;
}
</style>
