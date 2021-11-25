<script lang="ts">
export default {
  layout: 'home',
}
</script>
<template>
  <div class="home-page">
    <RGBFlow />
    <GettingStarted />
    <Features />
    <Credit />
  </div>
</template>
<style scoped>
a {
  @apply text-green-500 font-semibold hover:text-green-300;
}
</style>
