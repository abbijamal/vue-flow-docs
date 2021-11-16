import path from 'path'
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: '🌊 Vue Flow',
    description: 'Vue Flow Documentation & Examples',
  },
  build: {
    transpile: ['@braks/vue-flow-pathfinding-edge'],
  },
  alias: {
    // remove this for local development
    dagre: path.resolve(__dirname, 'node_modules/dagre/dist/dagre.js'),
  },

  router: {
    base: '/',
  },
  buildModules: ['nuxt-windicss'],
})
