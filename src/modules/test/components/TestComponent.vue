<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'
import { ref } from 'vue'

const boxValue = ref<number[]>([0])
const count = ref<number>(0)

const handleReset = () => {
	count.value = 0
	boxValue.value = [0]
}

const handleClickAdd = () => {
	if (boxValue.value.length > 20) {
		boxValue.value = []
	}
	count.value++
	boxValue.value.push(count.value)
}
</script>

<template>
	<div class="flex flex-col items-center">
		<div class="flex justify-center align-middle">
			<KeepAlive>
				<span
					v-for="(key, index) in boxValue"
					:key="index"
					class="bg-center bg-blue-500 w-8 p-2 mx-2 rounded-xl"
				>
					{{ key }}</span
				>
			</KeepAlive>
		</div>
		<br />
		<ButtonGlobal
			value="Reset"
			v-if="count == 20"
			class="border-2 rounded-md"
			@click="handleReset"
		/>
		<ButtonGlobal
			value="Click"
			v-else
			class="border-2 rounded-md"
			@click="handleClickAdd"
		/>
	</div>
</template>
<style scoped></style>
