<script lang="ts" setup>
const props = withDefaults(defineProps<{ expanded: boolean }>(), {
  expanded: false,
})

const examples = [
  {
    path: '',
    label: 'Introduction',
  },
  {
    path: 'getting-started',
    label: 'Getting Started',
  },
  {
    path: 'theming',
    label: 'Theming',
  },
  {
    path: 'addons',
    label: 'Addons',
    children: [
      {
        path: 'pathfinding',
        label: 'Smart Edge',
      },
    ],
  },
  {
    label: 'API Reference',
    path: 'api',
    children: [
      {
        path: 'nodes',
        label: 'Nodes',
        children: [
          {
            path: 'node-options',
            label: 'Node Options',
          },
          {
            path: 'node-types',
            label: 'Types & Custom Nodes',
          },
          {
            path: 'handle-component',
            label: 'Handle Component',
          },
        ],
      },
      {
        path: 'edges',
        label: 'Edges',
        children: [
          {
            path: 'edge-options',
            label: 'Edge Options',
          },
          {
            path: 'edge-types',
            label: 'Types & Custom Edges',
          },
          {
            path: 'edge-utils',
            label: 'Edge Utils',
          },
        ],
      },
      {
        path: 'flow-props',
        label: 'Vue Flow Props',
      },
      {
        path: 'helper-functions',
        label: 'Helper Functions',
      },
      {
        path: 'instance',
        label: 'Instance',
      },
      {
        path: 'internal-state',
        label: 'Internal State',
      },
      {
        path: 'composables',
        label: 'Composables',
      },
      {
        path: 'components',
        label: 'Components',
        children: [
          {
            path: 'background',
            label: 'Background',
          },
          {
            path: 'minimap',
            label: 'Minimap',
          },
          {
            path: 'controls',
            label: 'Controls',
          },
          {
            path: 'edge-text',
            label: 'Edge Text',
          },
        ],
      },
    ],
  },
  {
    path: 'types',
    label: 'TypeScript Definitions',
    children: [
      {
        path: 'flow',
        label: 'Flow & Graph',
        children: [
          {
            path: 'options',
            label: 'Options',
          },
          {
            path: 'instance',
            label: 'Instance',
          },
          {
            path: 'graph',
            label: 'Graph',
          },
        ],
      },
      {
        path: 'hooks',
        label: 'Events',
      },
      {
        path: 'store',
        label: 'Store',
      },
      {
        path: 'connection',
        label: 'Connection',
      },
      {
        path: 'edges',
        label: 'Edges',
      },
      {
        path: 'nodes',
        label: 'Nodes',
      },
      {
        path: 'components',
        label: 'Components',
      },
      {
        path: 'zoom-panel',
        label: 'Zoom & Pan',
      },
    ],
  },
]
</script>
<template>
  <aside :class="[{ 'cursor-pointer': !expanded, 'hover:w-[50px]': !expanded }]">
    <div v-if="expanded" class="flex flex-col text-left items-start">
      <template v-for="(e, i) of examples" :key="`docs-link-${i}`">
        <nuxt-link v-if="!e.children" class="docs-link" :to="`/docs/${e.path}`">
          {{ e.label }}
        </nuxt-link>
        <template v-else>
          <div class="p-2 leading-tight font-bold text-lg text-gray-300">{{ e.label }}</div>
          <template v-for="(c, y) of e.children" :key="`docs-child-link-${y}`">
            <nuxt-link v-if="!c.children" class="docs-link ml-2" :to="`/docs/${e.path}/${c.path}`">
              {{ c.label }}
            </nuxt-link>
            <template v-else>
              <div class="ml-2 p-2 leading-tight font-bold text-gray-300">{{ c.label }}</div>
              <template v-for="(d, n) of c.children" :key="`docs-child-child-link-${n}`">
                <nuxt-link v-if="!d.children" class="docs-link ml-4" :to="`/docs/${e.path}/${c.path}/${d.path}`">
                  {{ d.label }}
                </nuxt-link>
              </template>
            </template>
          </template>
        </template>
      </template>
    </div>
  </aside>
</template>
<style scoped>
.docs-link {
  @apply w-full text-lg text-white hover:text-yellow-500 p-2 leading-tight;
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
