<script setup lang="ts">

import Product from '@/modules/payment/component/crypto/Product.vue'
import { ref } from 'vue'
import type { NowpaymentModel } from '@/modules/payment/types/crypto'
import { createInvoice } from '@/modules/payment/api/crypto'
import { ElMessage } from 'element-plus'
import Loading from '@/app/components/Loading.vue'

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
		const link = req?.invoice_url;
		if (link && link.trim() !== '') {
			ElMessage({
				message: 'You paid successfully , please scan this QR in your wallet crypto .',
				type: 'success',
			});
			window.location.href = link
		} else {
			ElMessage({
				message: 'Invalid Payment',
				type: 'error',
			});
		}
	}catch (error: any){
		throw ElMessage({
			message: error.response?.message ,
			type: 'error',
		})
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