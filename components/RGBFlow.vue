<script lang="ts" setup>
import { Elements, FlowInstance, VueFlow, Background, Controls, MiniMap, BackgroundVariant } from '@braks/vue-flow'
import { templateRef, useBreakpoints, useElementBounding, whenever } from '@vueuse/core'
import CustomEdge from './CustomEdge.vue'

type Colors = {
  red: number
  green: number
  blue: number
}

interface Props {
  next: (node: string[]) => void
}
const props = defineProps<Props>()

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
  { id: '4', type: 'rgb-output', data: { label: 'RGB' }, position: { x: 400, y: 50 } },
  { id: 'e1-4', type: 'rgb-line', data: { color: 'green' }, source: '1', target: '4', animated: true },
  { id: 'e2-4', type: 'rgb-line', data: { color: 'red' }, source: '2', target: '4', animated: true },
  { id: 'e3-4', type: 'rgb-line', data: { color: 'blue' }, source: '3', target: '4', animated: true },
])
const instance = ref<FlowInstance>()

const el = templateRef<HTMLDivElement>('page', null)

const bounds = useElementBounding(el)
const onLoad = (flowInstance: FlowInstance) => {
  instance.value = flowInstance
  if (breakpoints.greater('tablet').value) flowInstance.fitView({ padding: 0.5 })
  else flowInstance.fitView()
}
whenever(breakpoints.greater('tablet'), () => onLoad(instance.value))
whenever(breakpoints.smaller('tablet'), () => onLoad(instance.value))

const color = ref<Colors>({
  red: 100,
  green: 150,
  blue: 100,
})
const onChange = ({ color: c, val }: { color: keyof Colors; val: number }) => (color.value[c] = Number(val))
const bg = ref(BackgroundVariant.Lines)
const bgSize = ref(1)
const bgGap = ref(48)
const backgroundChange = (variant: BackgroundVariant) => (bg.value = variant)
const sizeChange = (size: number) => (bgSize.value = size)
</script>
<template>
  <div ref="page" class="font-mono flex flex flex-col md:flex-row bg-white w-[100vw] h-[80vh]" :style="{ borderRadius: 0 }">
    <VueFlow
      id="rgb-flow"
      v-model="elements"
      class="relative font-mono"
      :edge-types="['rgb-line']"
      :node-types="['rgb', 'rgb-output']"
      :zoom-on-scroll="false"
      @load="onLoad"
    >
      <template #edge-rgb-line="rgbLineProps">
        <CustomEdge v-bind="{ ...rgbLineProps, data: { text: color[rgbLineProps.data.color], ...rgbLineProps.data } }" />
      </template>
      <template #node-rgb="rgbProps">
        <RGBNode v-bind="rgbProps" :amount="color" @change="onChange" />
      </template>
      <template #node-rgb-output="rgbOutputProps">
        <RGBOutputNode
          :v-bind="rgbOutputProps"
          :rgb="`rgb(${color.red}, ${color.green}, ${color.blue})`"
          @next="props.next(['features'], 3500)"
        />
      </template>
      <Controls />
      <Background :variant="bg" :color="`rgb(${color.red}, ${color.green}, ${color.blue})`" :gap="bgGap" :size="bgSize" />
      <MiniMap v-show="breakpoints.greater('tablet').value" />
    </VueFlow>
    <div class="flex bg-light-800 flex-col justify-center gap-2 md:gap-4 p-6 w-full md:w-1/3">
      <h1 class="pointer-events-none text-xl lg:text-4xl" :style="{ color: `rgb(${color.red}, ${color.green}, ${color.blue})` }">
        Highly customizable
      </h1>
      <h2 class="pointer-events-none text-sm lg:text-xl text-black font-normal">
        With Vue Flow you can create the most beautiful <strong>static diagrams</strong> or even <strong>custom editors</strong>.
        Thanks to a lot of handy utilities that come out of the box, you jump right into <strong>customizing</strong> Vue Flow to
        your hearts desire and utilize the <strong>seamless zoom & panning</strong> feature.
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
