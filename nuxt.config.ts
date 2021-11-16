import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: '🌊 Vue Flow',
    description: 'Vue Flow Documentation & Examples',
  },
  build: {
    transpile: ['@braks/vue-flow-pathfinding-edge'],
  },
  router: {
    base: '/',
  },
  buildModules: ['nuxt-windicss'],
})
