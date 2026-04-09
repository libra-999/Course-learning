import { computed, ref } from "vue"

export function usePagination() {
	const page = ref(1)
	const size = ref(20)
	const startIndex = computed(() => {
		return (page.value - 1) * size.value
	})

	return {
		page,
		size,
		startIndex,
	}
}
