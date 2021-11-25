<script lang="ts" setup>
import { Position, Handle, ValidConnectionFunc } from '@braks/vue-flow'

interface CustomInputProps {
  isValidTargetPos: ValidConnectionFunc
}
const props = defineProps<CustomInputProps>()
</script>
<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="props.isValidTargetPos" />
</template>
