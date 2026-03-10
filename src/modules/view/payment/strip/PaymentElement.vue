<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { stripPayment } from '@/modules/api/payment/strip'
import { VueStripeElements, VueStripeProvider } from '@vue-stripe/vue-stripe'
import PaymentForm from '@/app/components/payment/strip/PaymentForm.vue'

// env and custom element in stripe
const PUBLISH_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const clientSecret = ref('')
const optionStripeElement = {
	appearance: {
		theme: 'stripe',
		variables: {
			colorPrimary: '#0570de',
			colorBackground: '#ffffff',
			colorText: '#30313d',
			colorDanger: '#df1b41',
			fontFamily: 'Ideal Sans, system-ui, sans-serif',
			spacingUnit: '4px',
			borderRadius: '4px',
		},
		rules: {
			'.Input': {
				border: '1px solid #e6e6e6',
			},
			'.Input:focus': {
				border: '1px solid #0570de',
				boxShadow: '0 0 0 1px #0570de',
			},
		},
	},
}
const optionPaymentElement = {
	defaultValues: {
		billingDetails: {
			name: 'Libra',
			email: 'Libra111@gmail.com',
			phone: '099288900',
			address: {
				line1: 'Toul kok',
				city: 'Phnom Penh',
				state: 'Phnom Penh',
				postal_code: '121204',
				country: 'cambodia',
			},
		},
	},
}

// fetch stripeSecret and env key
onMounted(async () => {
	const resp = await stripPayment()
	clientSecret.value = resp.clientSecret
})
</script>
<template>
	<VueStripeProvider :publishable-key="PUBLISH_KEY">
		<VueStripeElements
			v-if="clientSecret"
			:client-secret="clientSecret"
			:options="optionStripeElement"
		>
			<PaymentForm
				:client-secret="clientSecret"
				:option-payment="optionPaymentElement"
			/>
		</VueStripeElements>
	</VueStripeProvider>
</template>

<style scoped></style>
