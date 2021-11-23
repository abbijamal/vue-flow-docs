<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getBezierPath, GraphNode, getMarkerEnd, ArrowHeadType, EdgeProps } from '@braks/vue-flow'
import { getEdgeParams } from './floating-edge-utils'

interface FloatingEdgeProps extends EdgeProps {
  id: string
  source: string
  target: string
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  nodes: GraphNode[]
  style?: CSSProperties
}

const props = defineProps<FloatingEdgeProps>()
const markerEnd = getMarkerEnd(props.arrowHeadType, props.markerEndId)
const sourceNode = computed(() => props.nodes.find((n) => n.id === props.source))
const targetNode = computed(() => props.nodes.find((n) => n.id === props.target))
const edgeParams = computed(() => getEdgeParams(sourceNode.value, targetNode.value))

const d = computed(
  () =>
    edgeParams.value.sx &&
    getBezierPath({
      sourceX: edgeParams.value.sx,
      sourceY: edgeParams.value.sy,
      targetX: edgeParams.value.tx,
      targetY: edgeParams.value.ty,
      sourcePosition: edgeParams.value.sourcePos,
      targetPosition: edgeParams.value.targetPos,
    }),
)
</script>
<template>
  <g class="vue-flow__connection">
    <path :id="props.id" class="vue-flow__edge-path" :d="d" :marker-end="markerEnd" :style="props.style" />
  </g>
</template>
