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
