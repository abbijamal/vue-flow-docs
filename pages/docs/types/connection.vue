<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

interface Connection {
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId
  targetHandle?: ElementId
}

type ConnectionLineProps = {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  connectionLineStyle?: any
  connectionLineType: ConnectionLineType
}

type OnConnectFunc = (connection: Connection) => void
type OnConnectStartParams = {
  nodeId?: ElementId
  handleId?: ElementId
  handleType?: HandleType
}
type OnConnectStartFunc = (event: MouseEvent, params: OnConnectStartParams) => void
type OnConnectStopFunc = (event: MouseEvent) => void
type OnConnectEndFunc = (event: MouseEvent) => void

enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

type SetConnectionId = {
  connectionNodeId: ElementId | undefined
  connectionHandleId: ElementId | undefined
  connectionHandleType: HandleType | undefined
}
\`\`\`
`)
</script>
<script lang="ts">
export default {
  layout: 'docs',
}
</script>
<template>
  <div>
    <h1>Connection</h1>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
