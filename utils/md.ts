import MD from 'markdown-it'
import Prism from 'markdown-it-prism'
// @ts-ignore
import LinkAttributes from 'markdown-it-link-attributes'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'

const md = new MD()
md.use(Prism)
md.use(LinkAttributes, {
  pattern: /^https?:\/\//,
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
})

export default md
