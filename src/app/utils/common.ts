import MarkdownIT from 'markdown-it'
import hljs from 'highlight.js'


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
	const md = new MarkdownIT({
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
