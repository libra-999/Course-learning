<script setup lang="ts">
import { ref } from 'vue'
import internalError from '@/app/assets/image/500.jpg'
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'
import { useRouter } from 'vue-router'

const image = ref(internalError)
const router = useRouter()
const back = () => {
	router.back()
}
</script>

<template>
	<div class="w-full h-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col justify-between place-items-center gap-1 sm:gap-3">
		<div class="xl:w-[60%] border-0 2xl:w-[60%] overflow-hidden h-50% w-full">
			<img
				class="w-full xl:h-[25%] object-cover 2xl:h-[25%] h-full"
				:src="image"
				alt="Empty Image"
			/>
		</div>
		<div class="text-start flex flex-col gap-2 xl:w-[35%] 2xl:w[35%] w-full">
			<p class="text-6xl">
				Oops,<em class="text-[#747bff] font-extrabold"> something went wrong...</em>
			</p>
			<p class="text-black/20 text-shadow-2xs">
				Try refreshing the page, or going back and attempting the action again.
			</p>
			<ButtonGlobal class="text-white" value="Back" @click="back" />
		</div>
	</div>
</template>

<style scoped></style>
