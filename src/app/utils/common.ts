import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function toggleHTMLClass(name: string) {
	function add() {
		document.documentElement.classList.add(name)
	}
	function remove() {
		document.documentElement.classList.remove(name)
	}
	return {
		add,
		remove,
	}
}

export const isMobile = () => {
	const userAgent = navigator.userAgent
	const modelPhone =
		/Android|iPhone|iPad|iPod|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent,
		)

	const eventTouch = navigator.maxTouchPoints > 0
	const screenDevice = window.matchMedia('(max-width: 1024px)').matches
	return modelPhone || (eventTouch && screenDevice)
}

export const allowCamera = () => {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}

export const renderRawText = (text: string) => {
	if (text === null && text === '') return ''
	const md = new MarkdownIt({
		highlight: (str: any, lang: any) => {
			if (lang && hljs.getLanguage(lang)) {
				return `<pre class="hljs"><code>${
					hljs.highlight(str, { language: lang }).value
				}</code></pre>`
			}
			return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
		},
	})

	return md.render(text)
}

export const splitNormalPath = (path: string )=>{
	if (path.length === 0 || !path || path === "undefined"){
		return path
	}
	return path.replace('/\/+/g','/').replace(/\/$/, '')
}

export const getNormalPath = (path:string) => {
	if (path.length === 0 || !path || path === "undefined") return path 
	let res = splitNormalPath(path).replace('/system','/').replace('/system/menu/','/')

	if(res[res.length - 1] === '/') {
		res.slice(0,res.length - 1)
	}
	return res
}

export const rewriteMenuPath = (parentPath?: string, childPath?: string) => {
	if (childPath) return `/system/menu/${childPath}`
	return `/system/menu/${parentPath}`
}

export const isExternal = (path: string) => {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export const getIcon = (icon: string) => {
	return ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue]
}