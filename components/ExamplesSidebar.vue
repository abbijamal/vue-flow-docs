<script lang="ts" setup>
const props = withDefaults(defineProps<{ expanded: boolean }>(), {
  expanded: false,
})

const examples = [
  {
    path: '',
    label: 'Overview',
  },
  {
    path: 'basic',
    label: 'Basic',
  },
  {
    path: 'custom-connectionline',
    label: 'Custom Connectionline',
  },
  {
    path: 'custom-node',
    label: 'Custom Node',
  },
  {
    path: 'edges',
    label: '(Custom) Edges',
  },
  {
    path: 'updatable-edge',
    label: 'Updatable Edge',
  },
  {
    path: 'update-node',
    label: 'Update Node',
  },
  {
    path: 'composable',
    label: 'Composable',
  },
  {
    path: 'validation',
    label: 'Validation',
  },
  {
    path: 'floating-edges',
    label: '(Custom) Floating Edge',
  },
  {
    path: 'empty',
    label: 'Empty',
  },
  {
    path: 'hidden',
    label: 'Hidden',
  },
  {
    path: 'interaction',
    label: 'Interaction',
  },
  {
    path: 'drag-n-drop',
    label: 'Drag and Drop',
  },
  {
    path: 'layouting',
    label: 'Layouting',
  },
  {
    path: 'multi-flows',
    label: 'Multi Flows',
  },
  {
    path: 'node-type-change',
    label: 'Node Type Change',
  },
  {
    path: 'save-restore',
    label: 'Save and Restore',
  },
  {
    path: 'stress',
    label: 'Stress',
  },
  {
    path: 'switch',
    label: 'Switch',
  },
  {
    path: 'unidirectional',
    label: 'Unidirectional',
  },
]
</script>
<template>
  <aside :class="[{ 'cursor-pointer': !expanded, 'hover:w-[50px]': !expanded }]">
    <div v-if="expanded" class="flex flex-col text-left items-start">
      <nuxt-link v-for="(e, i) of examples" :key="`example-link-${i}`" class="example-link" :to="`/examples/${e.path}`">
        {{ e.label }}
      </nuxt-link>
    </div>
  </aside>
</template>
<style scoped>
.example-link {
  @apply w-full text-lg text-white hover:text-yellow-500 px-3 py-2 leading-tight;
}

.router-link-active {
  @apply rounded-lg bg-white font-semibold text-yellow-500 shadow-lg;
}

aside {
  @apply relative w-[0px] lg:min-w-[280px] px-[10px] py-[15px] transition-all ease duration-500;
  background: rgba(0, 0, 0, 0.25) !important;
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>
