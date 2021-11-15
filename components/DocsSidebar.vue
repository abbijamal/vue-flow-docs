<script lang="ts" setup>
const props = withDefaults(defineProps<{ expanded: boolean }>(), {
  expanded: false,
})

const examples = [
  {
    path: '/',
    label: 'Introduction',
  },
]
</script>
<template>
  <aside :class="[{ 'cursor-pointer': !expanded, 'hover:w-[50px]': !expanded }]">
    <div class="flex flex-col text-left items-start">
      <router-link v-for="(e, i) of examples" :key="`docs-link-${i}`" class="docs-link" :to="`/docs${e.path}`">
        {{ e.label }}
      </router-link>
    </div>
  </aside>
</template>
<style scoped>
.docs-link {
  @apply w-full text-lg text-white hover:text-yellow-500 px-3 py-2 leading-tight;
}

.router-link-active {
  @apply rounded-lg bg-white font-semibold text-yellow-500 shadow-lg;
}

aside {
  @apply relative w-[0px] lg:w-[280px] h-full px-[10px] py-[15px] transition-all ease duration-500;
  background: rgba(0, 0, 0, 0.25) !important;
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>
