<script lang="ts" setup>
import { BackgroundVariant, NodeProps, Position, Handle } from '@braks/vue-flow'

interface RBGOutputNodeProps extends NodeProps {
  red: number
  green: number
  blue: number
  size: number
  gap: number
}

const props = defineProps<RBGOutputNodeProps>()
const emit = defineEmits(['background', 'size', 'gap'])

const componentToHex = (c: number) => {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

const rgbToHex = (r, g, b) => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

const isLight = computed(() => {
  const hex = rgbToHex(props.red, props.green, props.blue).replace('#', '')
  const rgb = parseInt(hex, 16) // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >> 8) & 0xff // extract green
  const b = (rgb >> 0) & 0xff // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma > 128
})
const variant = ref(false)
const size = ref(props.size)
const gap = ref(props.gap)
const rgb = computed(() => `rgb(${props.red}, ${props.green}, ${props.blue})`)
watch(variant, (val) => {
  emit('background', val === true ? BackgroundVariant.Dots : BackgroundVariant.Lines)
  if (variant.value === true) {
    gap.value = gap.value <= 20 ? gap.value : 10
    emit('gap', gap.value)
  }
})
watch(size, (val) => emit('size', val))
watch(gap, (val) => emit('gap', val))
</script>
<template>
  <div :style="{ backgroundColor: rgb }" class="p-3 rounded-xl text-left text-white">
    <div
      class="transition-all duration-250 ease p-2 rounded-xl bg-black text-md uppercase"
      :class="isLight ? 'bg-gray-700' : 'bg-light-800'"
    >
      <div class="flex flex-col gap-2" :style="{ color: rgb }">
        <div>Color: {{ rgb }}</div>
        <!-- Toggle A -->

        <label for="bgvariant" class="flex items-center cursor-pointer">
          Background style:
          <div class="ml-3 relative">
            <input id="bgvariant" v-model="variant" type="checkbox" class="sr-only" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
          </div>
          <div class="ml-3 font-medium">{{ !variant ? 'Lines' : 'Dots' }}</div>
        </label>
        <label for="bgsize">Size</label>
        <input id="bgsize" v-model="size" class="slider nodrag" :style="{ '--color': rgb }" type="range" min="1" max="4" />
        <label for="gap">Gap</label>
        <input
          id="gap"
          v-model="gap"
          class="slider nodrag"
          :style="{ '--color': rgb }"
          type="range"
          :min="10"
          :max="variant === true ? 20 : 100"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Left" />
  </div>
</template>
<style>
input:checked ~ .dot {
  transform: translateX(100%);
}
</style>
