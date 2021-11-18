<script lang="ts" setup>
import {
  getEdgeCenter,
  getBezierPath,
  getMarkerEnd,
  ArrowHeadType,
  EdgeProps,
  ElementId,
  Position,
  useVueFlow,
} from '@braks/vue-flow'

interface CustomEdgeProps<T = any> extends EdgeProps<T> {
  id: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
}

const props = defineProps<CustomEdgeProps>()
const { store, hooks } = useVueFlow()
const onEdgeClick = (evt: Event, id: string) => {
  const edge = store.edges.find((edge) => edge.id === id)
  if (edge) {
    hooks.elementsRemove.trigger([edge])
  }
  evt.stopPropagation()
  alert(`remove ${id}`)
}

const foreignObjectSize = 40

const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  }),
)
const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  }),
)
</script>
<template>
  <path :id="props.id" :style="props.style" class="vue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <foreignObject
    :width="foreignObjectSize"
    :height="foreignObjectSize"
    :x="center[0] - foreignObjectSize / 2"
    :y="center[1] - foreignObjectSize / 2"
    class="edgebutton-foreignobject"
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <body class="p-1">
      <button
        class="edgebutton bg-gray-800 text-white hover:(bg-gray-500 text-red-700) p-[4px] rounded-full h-full w-full"
        @click="(event) => onEdgeClick(event, props.id)"
      >
        ×
      </button>
    </body>
  </foreignObject>
</template>
<style scoped>
body {
  background: unset;
}
.edgebutton {
  cursor: pointer;
}
.edgebutton:hover {
  box-shadow: 0 0 0 2px pink, 0 0 0 4px #f05f75;
}
</style>
