<script lang="ts" setup>
import { Elements, FlowInstance, VueFlow, Background, Controls, MiniMap, useVueFlow, BackgroundVariant } from '@braks/vue-flow'
import { templateRef, useBreakpoints, useElementBounding, whenever } from '@vueuse/core'
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
  { id: '1', type: 'rgb', data: { color: 'g' }, position: { x: -25, y: 50 } },
  { id: '2', type: 'rgb', data: { color: 'r' }, position: { x: 50, y: -100 } },
  { id: '3', type: 'rgb', data: { color: 'b' }, position: { x: 0, y: 200 } },
  { id: '4', type: 'rgb-output', data: { label: 'RGB' }, position: { x: 400, y: 0 } },
  { id: 'e1-4', type: 'rgb-line', data: { color: 'green' }, source: '1', target: '4', animated: true },
  { id: 'e2-4', type: 'rgb-line', data: { color: 'red' }, source: '2', target: '4', animated: true },
  { id: 'e3-4', type: 'rgb-line', data: { color: 'blue' }, source: '3', target: '4', animated: true },
])
const instance = ref<FlowInstance>()

const el = templateRef<HTMLDivElement>('page', null)

const bounds = useElementBounding(el)
const onLoad = (flowInstance: FlowInstance) => {
  instance.value = flowInstance
  if (breakpoints.greater('tablet').value) flowInstance.fitView({ padding: 0.5, offset: { x: bounds.width.value / 6 } })
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
const store = useVueFlow(
  {
    edgeTypes: ['rgb-line'],
    nodeTypes: ['rgb', 'rgb-output'],
  },
  true,
)
const bg = ref(BackgroundVariant.Lines)
const bgSize = ref(1)
const bgGap = ref(48)
const backgroundChange = (variant: BackgroundVariant) => (bg.value = variant)
const sizeChange = (size: number) => (bgSize.value = size)
const gapChange = (gap: number) => (bgGap.value = gap)
</script>
<template>
  <div ref="page" class="flex bg-white w-[100vw] h-[80vh]" :style="{ borderRadius: 0 }">
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
        class="
          z-99
          flex
          bg-light-800
          rounded-xl
          flex-col
          gap-4
          p-6
          max-w-full
          md:(bg-none
          w-1/3
          top-1/3
          left-15)
          absolute
          top-[50%]
        "
      >
        <h1
          class="pointer-events-none text-2xl lg:text-4xl"
          :style="{ color: `rgb(${color.red}, ${color.green}, ${color.blue})` }"
        >
          Highly customizable
        </h1>
        <h2 class="pointer-events-none text-lg lg:text-xl text-black font-normal">
          With Vue Flow you can create the most beautiful diagrams and flowcharts. Thanks to a lot of handy utilities that come
          out of the box, it's very easy to get started and customize Vue Flow to your hearts desire.
        </h2>
        <div class="transform scale-75 lg:scale-100 flex flex-row justify-center items-center gap-4 mt-6">
          <nuxt-link class="p-4 bg-green-500 hover:bg-black rounded-xl !text-white font-semibold text-lg" to="/docs">
            Documentation
          </nuxt-link>
          <nuxt-link class="p-4 bg-white hover:bg-black rounded-xl bg-blue-500 !text-white font-semibold text-lg" to="/examples">
            Examples
          </nuxt-link>
        </div>
      </div>
    </VueFlow>
  </div>
</template>
