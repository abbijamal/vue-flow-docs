import path from 'path'
import { defineNuxtConfig } from 'nuxt3'

const meta = {
  title: '🌊 Vue Flow - A Vue3 Flowchart library',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  img: 'https://images.prismic.io/bcakmakoglu/7cca6d1f-2d05-4ed6-a0a9-af9df54943ac_vue-flow.png',
  url: 'https://vueflow.dev/',
}
export default defineNuxtConfig({
  meta: {
    title: meta.title,
    meta: [
      {
        name: 'description',
        content: meta.description,
      },
      { hid: 'og:title', name: 'og:title', content: meta.title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: meta.description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `http://${meta.img}`,
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: `https://${meta.img}`,
      },
      {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '2428',
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '1280',
      },
      { hid: 'og:url', property: 'og:url', content: meta.url },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: meta.url,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: meta.title,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: meta.description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: meta.img,
      },
    ],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: meta.url,
      },
      {
        hid: 'image_src',
        rel: 'image_src',
        href: meta.img,
      },
    ],
  },
  ssr: true,
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
