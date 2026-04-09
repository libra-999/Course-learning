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
