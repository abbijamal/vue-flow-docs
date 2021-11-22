<script lang="ts" setup>
import { Elements, FlowInstance, VueFlow, Background, Controls, MiniMap, useVueFlow, BackgroundVariant } from '@braks/vue-flow'
import { templateRef, useBreakpoints, whenever } from '@vueuse/core'
import CustomEdge from './CustomEdge.vue'

type Colors = {
  red: number
  green: number
  blue: number
}

const breakpoints = useBreakpoints({
  mobile: 360,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const elements = ref<Elements>([
  { id: '1', type: 'rgb', data: { color: 'r' }, position: { x: -25, y: 50 } },
  { id: '2', type: 'rgb', data: { color: 'g' }, position: { x: 50, y: -100 } },
  { id: '3', type: 'rgb', data: { color: 'b' }, position: { x: 0, y: 200 } },
  { id: '4', type: 'rgb-output', data: { label: 'RGB' }, position: { x: 400, y: 0 } },
  { id: 'e1-4', type: 'rgb-line', data: { color: 'red' }, source: '1', target: '4', animated: true },
  { id: 'e2-4', type: 'rgb-line', data: { color: 'green' }, source: '2', target: '4', animated: true },
  { id: 'e3-4', type: 'rgb-line', data: { color: 'blue' }, source: '3', target: '4', animated: true },
])
const instance = ref<FlowInstance>()

const el = templateRef<HTMLDivElement>('page', null)

const onLoad = (flowInstance: FlowInstance) => {
  instance.value = flowInstance
  if (breakpoints.greater('tablet').value)
    flowInstance.setTransform({ x: el.value?.clientWidth / 2.2, y: el.value?.clientHeight / 3, zoom: 1.25 })
  else flowInstance.setTransform({ x: 100, y: 150, zoom: 0.5 })
}
whenever(breakpoints.greater('tablet'), () => onLoad(instance.value))
whenever(breakpoints.smaller('tablet'), () => onLoad(instance.value))

const color = ref<Colors>({
  red: 100,
  green: 150,
  blue: 100,
})
const onChange = ({ color: c, val }: { color: keyof Colors; val: number }) => (color.value[c] = Number(val))
const store = useVueFlow({
  edgeTypes: ['rgb-line', 'pathfinding'],
  nodeTypes: ['rgb', 'rgb-output'],
})
const bg = ref(BackgroundVariant.Lines)
const bgSize = ref(1)
const bgGap = ref(48)
const backgroundChange = (variant: BackgroundVariant) => (bg.value = variant)
const sizeChange = (size: number) => (bgSize.value = size)
const gapChange = (gap: number) => (bgGap.value = gap)
</script>
<template>
  <div ref="page" class="flex demo-flow justify-center items-center h-[80vh] w-full gap-4" style="border-radius: 0">
    <VueFlow v-model="elements" class="relative font-mono" :zoom-on-scroll="false" @load="onLoad">
      <template #edge-rgb-line="props">
        <CustomEdge v-bind="{ ...props, data: { text: color[props.data.color], ...props.data } }" />
      </template>
      <template #node-rgb="props">
        <RGBNode v-bind="props" :amount="color" @change="onChange" />
      </template>
      <template #node-rgb-output="props">
        <RGBOutputNode
          v-bind="props"
          :size="bgSize"
          :gap="bgGap"
          :red="color.red"
          :green="color.green"
          :blue="color.blue"
          @size="sizeChange"
          @gap="gapChange"
          @background="backgroundChange"
        />
      </template>
      <Controls />
      <Background :variant="bg" :color="`rgb(${color.red}, ${color.green}, ${color.blue})`" :gap="bgGap" :size="bgSize" />
      <MiniMap v-show="breakpoints.greater('tablet').value" />
      <div
        class="z-99 pointer-events-none flex flex-col gap-4 p-4 max-w-full md:(bg-none w-1/3 top-1/3 left-15) absolute top-[50%]"
      >
        <h1 class="text-2xl lg:text-4xl" :style="{ color: `rgb(${color.red}, ${color.green}, ${color.blue})` }">
          Visualize your ideas with Vue Flow
        </h1>
        <h2 class="text-lg lg:text-xl text-black font-normal">
          A customizable Vue.js library for building node-based editors and diagrams.
        </h2>
        <div class="transform scale-75 lg:scale-100 flex flex-row justify-center items-center gap-4 mt-6">
          <nuxt-link class="p-4 bg-green-500 hover:bg-black rounded-full !text-white font-semibold text-lg" to="/docs">
            Documentation
          </nuxt-link>
          <nuxt-link
            class="p-4 bg-white hover:bg-black rounded-full bg-blue-500 !text-white font-semibold text-lg"
            to="/examples"
          >
            Examples
          </nuxt-link>
        </div>
      </div>
      <div class="z-99 absolute top-10 right-10">
        <a
          class="p-4 bg-black rounded-full !text-white hover:( bg-white border-1 border-black !text-black) text-lg"
          href="https://github.com/bcakmakoglu/vue-flow"
          target="_blank"
        >
          Github
        </a>
      </div>
    </VueFlow>
  </div>
</template>
