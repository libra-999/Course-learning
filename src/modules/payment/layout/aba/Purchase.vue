<script setup lang="ts">
import {  ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { PaywayABA, Transaction } from '@/modules/payment/types/aba'
import {
	createPayment,
	generateQRImage,
	getRate,
	getTransaction,
	manageCard,
} from '@/modules/payment/api/aba'

const buildReqTime = () => {
	const now = new Date()
	const year = now.getFullYear().toString()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDay()).padStart(2, '0')
	const hour = String(now.getHours()).padStart(2, '0')
	const minute = String(now.getMinutes()).padStart(2, '0')
	const second = String(now.getSeconds()).padStart(2, '0')
	return year + month + day + hour + minute + second
}
const itemsStatic = [
	{
		id: 1,
		name: 'watch',
		price: 300,
	},
	{
		id: 254,
		name: 'ipad',
		price: 505,
	},
]
const ruleForm = ref<PaywayABA>({
	firstname: 'li',
	lastname: 'bra',
	req_time: buildReqTime(),
	tran_id: `Tx-${Date.now()}`,
	merchant_id: 'ec463980',
	email: 'libra1@gmail.com',
	phone: '099284990',
	amount: 22.2,
	currency: 'USD',
	hash: '',
	items: '',
	// skip_success_page:  0,
	view_type: 'popup',
	// payment_option: 'abapay_khqr'
})
const qrForm = ref<any>({
	req_time: '20250222152210',
	merchant_id: 'ec463980',
	tran_id:
		'T-' +
		`${Date.now().toString().slice(-10)}` +
		`${Math.floor(Math.random() * 1000)}`,
	amount: 554,
	first_name: 'bimo',
	last_name: 'bimo',
	email: 'bimo11@gmail.com',
	phone: '092990239',
	purchase_type: 'purchase',
	payment_option: 'abapay_khqr',
	currency: 'USD',
	lifetime: 10,
	qr_image_template: 'template3_color',
	items: '',
	return_deeplink: '',
	return_params: '',
	payout: '',
	callback_url: '',
	hash: '',
})

const ruleFormRef = ref<FormInstance>()
const hash = ref('')
const qrImage = ref()
const dataResp = ref<object>()
const rateXML = ref()
const openDialog = ref(false)

const submitForm = async () => {
	if (!ruleFormRef.value) return
	try {
		await ruleFormRef.value.validate()
		ruleForm.value.req_time = buildReqTime()
		ruleForm.value.tran_id = `Tx-${Date.now()}`
		ruleForm.value.items = btoa(JSON.stringify(itemsStatic))
		const signedPayload = await createPayment(ruleForm.value)
		// submitToABA(signedPayload)
		if (signedPayload.status.code === '00') {
			dataResp.value = signedPayload

			qrForm.value.amount = ruleForm.value.amount
			qrForm.value.first_name = ruleForm.value.firstname
			qrForm.value.last_name = ruleForm.value.lastname
			qrForm.value.email = ruleForm.value.email
			qrForm.value.phone = ruleForm.value.phone
			const generateKHQR = await generateQRImage(qrForm.value)
			if (generateKHQR.status.code === '0') {
				// Check multiple possible field names for the QR image
				qrImage.value =
					generateKHQR.qrImage ||
					generateKHQR.qr_image ||
					generateKHQR.image ||
					generateKHQR.data
				openDialog.value = true
			} else {
				console.log('Generate QR failed')
			}
			// qrImage.value = signedPayload.qrImage
		} else {
			console.log('error sign payload')
		}
	} catch (error) {
		console.log('Error or validation failed:', error)
	}
}

// get transaction
const getTrans = async () => {
	const transaction = ref<Transaction>({
		tran_id: 'e10992',
		req_time: '20250222152210',
		merchant_id: 'ec463980',
	})
	try {
		const req = await getTransaction(transaction.value)
		if (req.status.code === '00') {
			dataResp.value = req.data
			// console.log(req.data)
		}
	} catch (error) {
		console.log(error)
	}
}

// get exchangeRate
const getExchangeRate = async () => {
	const exchange = ref<object>({
		req_time: '20250222152210',
		merchant_id: 'ec463980',
		hash: '',
	})
	try {
		const req = await getRate(exchange.value)
		if (req.status.code === '00') {
			rateXML.value = req.exchange_rates.OclResposne.io_rates
			const parser = new DOMParser()
			const newDocRate = parser.parseFromString(rateXML.value, 'text/xml')
			console.log(newDocRate)
			dataResp.value = req
		}
	} catch (err) {
		console.log(err)
	}
}

// generate QR
const createQR = async () => {
	const base64 = btoa(JSON.stringify(itemsStatic))
	qrForm.value.items = base64
	try {
		const req = await generateQRImage(qrForm.value)
		if (req.status.code === '0') {
			qrImage.value = req.qrImage
			openDialog.value = true
		}
	} catch (error) {
		console.log(error)
	}
}

// link card
const linkCard = async () => {
	const card = ref<object>({
		merchant_id: 'ec463980',
		ctid: 'ct122049925',
		return_param:
			'https://checkout-sandbox.payway.com.kh/checkout-popup.html?file=js',
	})
	try {
		const req = await manageCard(card.value)
		const newWindow = window.open()
		newWindow?.document.write(req)
		newWindow?.document.close()
	} catch (error) {
		console.log(error)
	}
}
</script>
<template>
	<el-form
		id="el-form"
		ref="ruleFormRef"
		:model="ruleForm"
		status-icon
		label-width="auto"
		class="flex flex-col place-items-center"
	>
		<div>
			<el-form-item label="MerchantID" prop="age">
				<el-input v-model="ruleForm.merchant_id" />
			</el-form-item>
			<el-form-item label="Firstname">
				<el-input
					v-model="ruleForm.firstname"
					type="text"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item label="Lastname">
				<el-input
					v-model="ruleForm.lastname"
					type="text"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item label="Request Time">
				<el-input
					v-model="ruleForm.req_time"
					type="text"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item label="Transaction No">
				<el-input
					v-model="ruleForm.tran_id"
					type="text"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item label="Email">
				<el-input v-model="ruleForm.email" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Phone">
				<el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Amount">
				<el-input
					v-model="ruleForm.amount"
					type="number"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item label="Currency" prop="currency">
				<el-select v-model="ruleForm.currency" placeholder="Currency">
					<el-option label="US Dollar" value="USD" />
					<el-option label="KHR Khmer" value="KHR" />
				</el-select>
			</el-form-item>
			<input v-model="hash" hidden readonly />
		</div>
		<div class="my-2 flex gap-2">
			<el-form-item>
				<el-button type="primary" @click="getTrans()">
					Check Transition
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()"> Paid</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getExchangeRate()">
					Exchange Rate
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="createQR()">
					Generate QR
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="linkCard()">
					Link Card
				</el-button>
			</el-form-item>
		</div>
	</el-form>
	<div v-if="dataResp" class="text-black text-left overflow-y-auto w-100">
		<pre class="rounded text-sm overflow-auto">{{
			JSON.stringify(dataResp, null, 2)
		}}</pre>
	</div>

	<!-- DialogQR-->
	<el-dialog
		v-if="openDialog && qrImage"
		class="p-5 rounded-xl"
		width="320"
		align-center
		v-model="openDialog"
	>
		<div class="text-center">
			<img :src="qrImage" class="w-full h-max" alt="QR Code" />
		</div>
	</el-dialog>
</template>
<style scoped>
.qr-container {
	margin-top: 20px;
	text-align: center;
}

.qr-container img {
	width: max-content;
	height: max-content;
}
</style>
