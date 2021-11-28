<script lang="ts" setup>
import { VueFlow, Handle, Position, Elements, FlowInstance } from '@braks/vue-flow'
import BoxNode from '../components/BoxNode.vue'
import RGBFlow from '../components/RGBFlow.vue'
import BasicFlow from '../components/BasicFlow.vue'

const elements: Elements = [
  { id: 'intro', type: 'box', position: { x: 800, y: 50 }, draggable: true },
  { id: 'examples', type: 'box', position: { x: 1250, y: 400 } },
  { id: 'tour', type: 'box', position: { x: 950, y: 510 } },
  { id: 'documentation', type: 'box', position: { x: 600, y: 460 } },
  { id: 'github', type: 'box', position: { x: 1500, y: 250 } },
  { id: 'rgb', type: 'rgb', position: { x: 3000, y: 2500 }, selectable: false, draggable: false },
  { id: 'basic', type: 'basic', position: { x: 250, y: 2500 }, selectable: false, draggable: false },
  {
    id: 'eintro-examples',
    sourceHandle: 'a',
    source: 'intro',
    target: 'examples',
    animated: true,
    style: { strokeWidth: 2, stroke: '#8b5cf6' },
  },
  {
    id: 'eintro-tour',
    sourceHandle: 'a',
    source: 'intro',
    target: 'tour',
    animated: true,
    style: { strokeWidth: 3, stroke: '#3b82f6' },
  },
  {
    id: 'eintro-documentation',
    sourceHandle: 'a',
    source: 'intro',
    target: 'documentation',
    animated: true,
    style: { strokeWidth: 2, stroke: '#f97316' },
  },
  { id: 'eintro-github', sourceHandle: 'b', source: 'intro', target: 'github', animated: true, style: { strokeWidth: 2 } },
  {
    id: 'etour-basic',
    targetHandle: 'basic-b',
    source: 'tour',
    target: 'basic',
    animated: true,
    style: { strokeWidth: 3, stroke: '#3b82f6' },
  },
  {
    id: 'ebasic-rgb',
    targetHandle: 'rgb-a',
    sourceHandle: 'basic-a',
    source: 'basic',
    target: 'rgb',
    animated: true,
    style: { strokeWidth: 3, stroke: '#3b82f6' },
  },
]
const instance = ref<FlowInstance>()
const interactive = ref(true)
const onLoad = (i) => {
  instance.value = i
  setTimeout(() => {
    i.fitView({ nodes: ['intro', 'examples', 'tour', 'documentation'], padding: 0.2, transitionDuration: 500 })
  }, 0)
}
const nextNode = (id: string[]) => {
  instance.value.fitView({ padding: 0, nodes: id, transitionDuration: 2000 })
  interactive.value = !(id.includes('rgb') || id.includes('basic'))
}
</script>
<script lang="ts">
export default {
  layout: 'home',
}
</script>
<template>
  <div class="home-page">
    <div class="flex h-[80vh] w-full gap-4" style="border-radius: 0">
      <VueFlow
        v-model="elements"
        :node-types="['box', 'rgb', 'basic']"
        :elements-selectable="true"
        :nodes-draggable="false"
        :pane-moveable="interactive"
        :zoom-on-scroll="false"
        @load="onLoad"
      >
        <template #node-basic>
          <BasicFlow>
            <button
              class="
                flex flex-row
                gap-3
                items-center
                p-4
                shadow-lg
                hover:bg-black
                bg-blue-500
                rounded-xl
                !text-white
                font-semibold
                text-lg
              "
              @click="nextNode(['rgb'])"
            >
              <i class="icon-sm icon-heart !text-red-300" />Continue Demo
            </button>
            <Handle type="target" :position="Position.Top" />
          </BasicFlow>
          <Handle id="basic-a" type="source" :position="Position.Right" />
          <Handle id="basic-b" type="target" :position="Position.Top" />
        </template>
        <template #node-rgb>
          <RGBFlow />
          <Handle id="rgb-a" type="target" :position="Position.Left" />
        </template>
        <template #node-box="props">
          <template v-if="props.id === 'intro'">
            <div class="max-w-[500px]">
              <BoxNode>
                <div class="font-mono flex flex-col gap-4 p-4 items-center">
                  <h1 class="pointer-events-none text-2xl lg:text-4xl">Visualize your ideas with Vue Flow</h1>
                  <h2 class="pointer-events-none text-lg lg:text-xl text-black font-normal">
                    A customizable Vue.js library for building node-based editors and diagrams.
                  </h2>
                </div>
              </BoxNode>
            </div>
          </template>
          <template v-else-if="props.id === 'documentation'">
            <div class="flex">
              <nuxt-link
                class="
                  flex flex-row
                  gap-3
                  items-center
                  p-4
                  shadow-lg
                  bg-orange-500
                  hover:bg-black
                  rounded-xl
                  !text-white
                  font-semibold
                  text-lg
                "
                to="/docs"
              >
                <i class="icon-sm icon-file-document !text-blue-700" />Read The Documentation
              </nuxt-link>
            </div>
            <Handle type="target" :position="Position.Top" />
          </template>
          <template v-else-if="props.id === 'tour'">
            <button
              class="
                flex flex-row
                gap-3
                items-center
                p-4
                shadow-lg
                hover:bg-black
                bg-blue-500
                rounded-xl
                !text-white
                font-semibold
                text-lg
              "
              @click="nextNode(['basic'])"
            >
              <i class="icon-sm icon-heart !text-red-300" />Start The Demo
            </button>
            <Handle type="target" :position="Position.Top" />
            <Handle type="source" :position="Position.Bottom" />
          </template>
          <template v-else-if="props.id === 'examples'">
            <div class="flex">
              <nuxt-link
                class="
                  flex flex-row
                  gap-3
                  items-center
                  p-4
                  shadow-lg
                  hover:bg-black
                  bg-purple-500
                  rounded-xl
                  !text-white
                  font-semibold
                  text-lg
                "
                to="/examples"
              >
                <i class="icon-sun icon-sm !text-yellow-300" />Check The Examples
              </nuxt-link>
            </div>
            <Handle type="target" :position="Position.Top" />
          </template>
          <template v-else-if="props.id === 'github'">
            <div class="flex">
              <a
                class="
                  flex flex-row
                  items-center
                  gap-3
                  p-4
                  bg-black
                  rounded-xl
                  !text-white
                  hover:(bg-white
                  border-1 border-black
                  !text-black)
                  text-lg
                "
                href="https://github.com/bcakmakoglu/vue-flow"
                target="_blank"
              >
                <i class="icon-sm icon-git-branch"> </i>Github
              </a>
            </div>
            <Handle type="target" :position="Position.Left" />
          </template>
        </template>
      </VueFlow>
    </div>
    <GettingStarted />
    <Features />
    <Credit />
  </div>
</template>
<style scoped>
a {
  @apply text-green-500 font-semibold hover:text-green-300;
}
button:focus {
  outline: none;
}
</style>
