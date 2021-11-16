<script lang="ts" setup>
import useMd from '~/utils/md'

const helper = useMd.render(`
\`\`\`typescript
type HandleType = 'source' | 'target'

interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null
  position: Position
}

type ValidConnectionFunc = (connection: Connection) => boolean
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
    <h1>Handle</h1>
    <div class="md gap-4 flex flex-col">
      <div v-html="helper" />
    </div>
  </div>
</template>
