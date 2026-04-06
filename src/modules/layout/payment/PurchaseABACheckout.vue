<template>
	<form 
		class="text-white"
		:id="config.id"  
		:method="config.method" 
		:target="config.target_name"
		:action="config.URL"
		@submit.prevent="openCheckout">
		<!-- Get key and data from server side -->
		<input v-for="(value, key) in checkoutPayload" :key="key" type="hidden" :name="key" :value="value" /> 
		<!-- Get key and data from server side -->
		<div
			:class="`${themeStore.settings.themeSchema != 'dark' ? 'text-black border-blue-100' : 'text-white bg-gray-800 border-[0.3px] border-solid border-[rgba(255,255,255,0.18)]'} w-full max-w-sm bg-neutral-primary-soft p-6 border-2  rounded-l shadow-xs text-black`">
			<a href="#">
				<img class="rounded-base mb-6" :src="image" alt="product image" />
			</a>
			<div>
				<div class="flex items-center space-x-3 mb-6">
					<div class="flex items-center space-x-1 rtl:space-x-reverse">
						<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
							height="24" viewBox="0 0 24 24" v-for="index in stars" :key="index">
							<path fill="#facc15"
								d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
						</svg>
					</div>
					<span
						class="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">5
						out of 5</span>
				</div>
				<a href="#">
					<h5 class="text-xl text-heading font-semibold tracking-tight">
						Apple MacBook Pro M5 16-inch 32GB 1TB - Best Price
					</h5>
				</a>
				<div class="flex items-center justify-between mt-6">
					<span class="text-3xl font-extrabold text-heading">$ 2892.4</span>
					<button @click.prevent="openCheckout" type="submit"
						class="inline-flex hover:bg-blue-600 transition-shadow items-center bg-brand text-white bg-blue-400 border focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-sm text-sm px-3 cursor-pointer py-2 focus:outline-none">
						<svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
							height="24" fill="white" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
						</svg>
						Buy now
					</button>
				</div>
			</div>
		</div>
	</form>
	<iframe name="aba_webservice" class="hidden"></iframe>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from '@/app/utils/message.ts'
import { useTheme } from '@/modules/store/theme.ts'
import { createPayment } from '@/modules/api/payment/aba'

const errorMessage = useMessage()
const image = ref('https://www.techpowerup.com/img/QJEgChoZgK9jRxJG.jpg')
const stars = ref(5)
const themeStore = useTheme()
const checkoutPayload = ref<Record<string, string | number>>({})

const config = ref({
	URL : "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase",
	target_name : "aba_webservice", // default name
	method: "POST", 
	id: "aba_merchant_request" // default ID from plugin
})
const item = ref({
	name: 'Apple MacBook Pro M5',
	quantity: 1,
	price: 2503,
})

const submit = async () => {
	try {
		const req = await createPayment({data: item.value})
		checkoutPayload.value = req.data.checkout // set value from server side to checkoutPayload
	} catch (error: any) {
		throw errorMessage.messageBox(error, 'error')
	}
}
const openCheckout = async () => {
	// if payload is empty
	if (!Object.keys(checkoutPayload.value).length) {
		await submit()
	}
	// eslint-disable-next-line no-undef
	AbaPayway.checkout()
	
}
</script>
<style scoped></style>
