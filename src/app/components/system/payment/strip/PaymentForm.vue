<script setup lang="ts">
import {
	usePaymentIntent,
	VueStripePaymentElement,
} from '@vue-stripe/vue-stripe'
import { ref } from 'vue'
import Loading from '@/app/components/Loading.vue'
import { useMessage } from '@/app/utils/message.ts'

const { confirmPayment } = usePaymentIntent()
const paymentProp = defineProps<{
	clientSecret: string
	optionPayment: object
}>()
const loading = ref(false)
const message = useMessage()
const handleSubmit = async () => {
	loading.value = true
	try {
		const { error } = await confirmPayment({
			clientSecret: paymentProp.clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/complete`,
			},
		})
		if (error)
			return message.messageBox(
				`${error.error.message}`,
				'error'
			)
		else {
			return message.messageBox(
				'Payment successful',
				'success'
			)
		}
	} catch (err) {
		throw message.messageBox(
			`${err}`,
			'error'
		)
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<Loading v-if="loading" />
	<div v-show="!loading">
		<VueStripePaymentElement :options="paymentProp.optionPayment" />
		<button
			class="text-black bg-amber-300 rounded-sm w-full my-2 py-2 px-1 cursor-pointer"
			@click="handleSubmit()"
			type="button"
		>
			Submit
		</button>
	</div>
</template>

<style scoped></style>
