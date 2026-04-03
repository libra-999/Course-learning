<script setup lang="ts">

import { ref } from 'vue'
import type { NowpaymentModel } from '@/modules/types/payment/crypto'
import { createInvoice } from '@/modules/api/payment/crypto'
import Loading from '@/app/components/Loading.vue'
import { useMessage } from '@/app/utils/message.ts'
import Product from '@/app/components/system/payment/crypto/Product.vue'

const errorMessage = useMessage()
const loading = ref(false)
const data = ref<NowpaymentModel>({
	order_id: `PDO-${Math.floor(Math.random() * 1000)}`,
	price_amount: 0.2,
	price_currency: 'usd',
	order_description: 'Apple MacBook Pro M5 16-inch 32GB 1TB – Best Price',
	ipn_callback_url: 'https://nowpayments.io',
	pay_currency: 'btc',
})

const submit = async ()=> {
	loading.value = true
	try {
		const req = await createInvoice(data.value);
		const link = req?.data.invoice_url;
		if (link && link.trim() !== '') {
			errorMessage.messageBox('You paid successfully , please scan this QR in your wallet crypto', 'success')
			window.location.href = link
		} else {
			errorMessage.messageBox(
				req.message,
				'error'
			)
		}
	}catch (error: any){
		throw errorMessage.messageBox(
			error.response?.message,
			'error'
		)
	}finally {
		loading.value = false
	}
}
</script>

<template>
	<Loading v-if="loading"/>
	<Product v-else :payload="data" :submit="submit"/>
</template>

<style scoped>

</style>