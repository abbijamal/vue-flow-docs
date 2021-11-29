<script lang="ts" setup>
import { VueFlow, MiniMap, Background, Controls, Elements, ArrowHeadType } from '@braks/vue-flow'

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 150 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 130 } },
  { id: 'e1-2', source: '1', target: '2', arrowHeadType: ArrowHeadType.Arrow },
  { id: 'e1-3', source: '1', target: '3', arrowHeadType: ArrowHeadType.Arrow },
])

const onLoad = (i) => i.fitView()
</script>
<template>
  <div
    ref="page"
    class="!pointer-events-auto font-mono flex flex flex-col md:flex-row bg-white w-[100vw] h-[80vh]"
    :style="{ borderRadius: 0 }"
  >
    <VueFlow id="features-flow" v-model="elements" class="relative font-mono" :pane-moveable="true" @load="onLoad">
      <Controls />
      <Background />
      <MiniMap />
    </VueFlow>
    <div class="flex bg-light-800 flex-col justify-center gap-2 md:gap-4 p-6 w-full md:w-1/3">
      <h1 class="pointer-events-none text-xl lg:text-4xl">Everything you need</h1>
      <h2 class="pointer-events-none text-sm lg:text-xl text-black font-normal">
        Vue Flow ships with a <strong>Minimap-, Background- and Controls-Component</strong>. On top of that we add
        <strong>Zoom & Pan utilities</strong> with which you can create the exact same transitions that are used on this site!
      </h2>
      <div class="!pointer-events-auto transform scale-75 lg:scale-100 flex flex-row justify-center items-center gap-4">
        <nuxt-link class="p-4 bg-green-500 hover:bg-black rounded-xl !text-white font-semibold text-lg" to="/docs">
          Documentation
        </nuxt-link>
        <nuxt-link
          class="!pointer-events-auto p-4 bg-white hover:bg-black rounded-xl bg-blue-500 !text-white font-semibold text-lg"
          to="/examples"
        >
          Examples
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
