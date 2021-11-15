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
<template>
  <ExamplesSidebar :expanded="expanded || !mobile" :class="style" @click="onClick" />
  <div v-show="!expanded || !mobile" id="vue-flow-examples" class="flex-1">
    <slot />
  </div>
</template>
