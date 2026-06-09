import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export function toggleHTMLClass(name: string) {
   function add() {
      document.documentElement.classList.add (name)
   }
   function remove() {
      document.documentElement.classList.remove (name)
   }
   return {
      add,
      remove,
   }
}

export const renderRawText = (text: string) => {
   if (text === null && text === '') return ''
   const md = new MarkdownIt ({
      highlight: (str: any, lang: any) => {
         if (lang && hljs.getLanguage (lang)) {
            return `<pre class="hljs"><code>${
                hljs.highlight (str, {language: lang}).value
            }</code></pre>`
         }
         return `<pre class="hljs"><code>${md.utils.escapeHtml (str)}</code></pre>`
      },
   })
   
   return md.render (text)
}

export const splitNormalPath = (path: string) => {
   if (path.length === 0 || !path || path === "undefined") {
      return path
   }
   return path.replace ('/\/+/g', '/').replace (/\/$/, '')
}

export const getNormalPath = (path: string) => {
   if (path.length === 0 || !path || path === "undefined") return path
   let res = splitNormalPath (path).replace ('/system', '/').replace ('/system/menu/', '/')
   
   if (res[res.length - 1] === '/') {
      res.slice (0, res.length - 1)
   }
   return res
}

export const isExternal = (path: string) => {
   return /^(https?:|mailto:|tel:)/.test (path)
}

export const elementIconDynamic = (icon: string) => {
   return ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue]
}

export const strToDate = (date: any) => {
   if (date == "" || date == null) {
      return ""
   }
   date = date.trim ().replace (/[./]/g, "-")
   const parts = date.split ("-")
   if (parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart (2, "0")}-${parts[0].padStart (2, "0")}`
   }
   return ""
}