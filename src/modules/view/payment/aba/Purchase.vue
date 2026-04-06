<template>
	<div class="aba-wrapper">
		<!-- Background decoration -->
		<div class="bg-orb bg-orb-1" />
		<div class="bg-orb bg-orb-2" />

		<el-form
			id="el-form"
			ref="ruleFormRef"
			:model="ruleForm"
			status-icon
			label-width="auto"
			class="aba-form"
		>
			<!-- Header -->
			<div class="form-header">
				<div class="aba-logo">
					<span class="aba-title">ABA Payment</span>
				</div>
				<span class="aba-badge">
					<span class="badge-dot" />
					Secure
				</span>
			</div>

			<!-- Form Grid -->
			<div class="form-grid">
				<!-- Merchant ID -->
				<div class="field-group col-span-2">
					<label class="field-label">Merchant ID</label>
					<el-input
						v-model="ruleForm.merchant_id"
						class="aba-input"
						placeholder="e.g. MID-000123"
					/>
				</div>

				<!-- First & Last Name -->
				<div class="field-group">
					<label class="field-label">First Name</label>
					<el-input
						v-model="ruleForm.firstname"
						type="text"
						autocomplete="off"
						class="aba-input"
						placeholder="John"
					/>
				</div>
				<div class="field-group">
					<label class="field-label">Last Name</label>
					<el-input
						v-model="ruleForm.lastname"
						type="text"
						autocomplete="off"
						class="aba-input"
						placeholder="Doe"
					/>
				</div>

				<!-- Email -->
				<div class="field-group col-span-2">
					<label class="field-label">Email</label>
					<el-input
						v-model="ruleForm.email"
						type="text"
						autocomplete="off"
						class="aba-input"
						placeholder="john@example.com"
					>
						<template #prefix>
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<rect x="2" y="4" width="20" height="16" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						</template>
					</el-input>
				</div>

				<!-- Phone -->
				<div class="field-group">
					<label class="field-label">Phone</label>
					<el-input
						v-model="ruleForm.phone"
						type="text"
						autocomplete="off"
						class="aba-input"
						placeholder="+855 xx xxx xxx"
					>
						<template #prefix>
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
								/>
							</svg>
						</template>
					</el-input>
				</div>

				<!-- Request Time -->
				<div class="field-group">
					<label class="field-label">Request Time</label>
					<el-input
						v-model="ruleForm.req_time"
						type="text"
						autocomplete="off"
						class="aba-input"
						placeholder="20240101120000"
					/>
				</div>

				<!-- Transaction No -->
				<div class="field-group col-span-2">
					<label class="field-label">Transaction No</label>
					<el-input
						v-model="ruleForm.tran_id"
						type="text"
						autocomplete="off"
						class="aba-input"
						placeholder="TXN-XXXXXXXXXX"
					/>
				</div>

				<!-- Amount & Currency -->
				<div class="field-group">
					<label class="field-label">Amount</label>
					<el-input
						v-model="ruleForm.amount"
						type="number"
						autocomplete="off"
						class="aba-input"
						placeholder="0.00"
					/>
				</div>
				<div class="field-group">
					<label class="field-label">Currency</label>
					<el-select
						v-model="ruleForm.currency"
						placeholder="Select"
						class="aba-select w-full"
					>
						<el-option label="🇺🇸  US Dollar (USD)" value="USD" />
						<el-option label="🇰🇭  Khmer Riel (KHR)" value="KHR" />
					</el-select>
				</div>
			</div>

			<input v-model="hash" hidden readonly />

			<!-- Divider -->
			<div class="form-divider" />

			<!-- Actions -->
			<div class="action-grid">
				<button
					class="aba-btn btn-secondary"
					type="button"
					@click="getTrans()"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
						<path d="M3 3v5h5" />
					</svg>
					Check Transaction
				</button>
				<button
					class="aba-btn btn-primary"
					type="button"
					@click="submitForm()"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					</svg>
					Pay Now
				</button>
				<button
					class="aba-btn btn-secondary"
					type="button"
					@click="getExchangeRate()"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<line x1="12" y1="1" x2="12" y2="23" />
						<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
					</svg>
					Exchange Rate
				</button>
				<button
					class="aba-btn btn-secondary"
					type="button"
					@click="createQR()"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<rect x="3" y="3" width="7" height="7" />
						<rect x="14" y="3" width="7" height="7" />
						<rect x="3" y="14" width="7" height="7" />
						<path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
					</svg>
					Generate QR
				</button>
				<button
					class="aba-btn btn-ghost col-span-2"
					type="button"
					@click="linkCard()"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
						<line x1="1" y1="10" x2="23" y2="10" />
					</svg>
					Link Card
				</button>
			</div>
		</el-form>

		<!-- Response Panel -->
		<transition name="slide-up">
			<div v-if="dataResp" class="response-panel">
				<div class="response-header">
					<span class="response-title">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<polyline points="9 11 12 14 22 4" />
							<path
								d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
							/>
						</svg>
						Response
					</span>
					<span class="response-tag">JSON</span>
				</div>
				<pre class="text-left overflow-y-auto text-white">{{
					JSON.stringify(dataResp, null, 2)
				}}</pre>
			</div>
		</transition>
	</div>
	<!-- QR Dialog -->
	<el-dialog
		v-if="openDialog && qrImage"
		v-model="openDialog"
		width="350"
		align-center
	>
		<div class="w-full px-1.5">
			<img :src="qrImage" class="object-contain w-full" alt="QR Code" />
		</div>
	</el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { PaywayABA, Transaction } from '@/modules/types/payment/aba'
import {
	createPayment,
	generateQRImage,
	getRate,
	getTransaction,
	manageCard,
} from '@/modules/api/payment/aba'
import { useMessage } from '@/app/utils/message.ts'

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
const errorMessage = useMessage()

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
				errorMessage.messageBox('Generate QR Error', 'error')
			}
		} else {
			errorMessage.messageBox('error sign payload', 'error')
		}
	} catch (error) {
		throw errorMessage.messageBox(`Error or validation failed ${error}`,'error')
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
		}
	} catch (error) {
		throw errorMessage.messageBox(`${error}`,'error')
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
			parser.parseFromString(rateXML.value, 'text/xml')
			dataResp.value = req
		}
	} catch (err) {
		throw errorMessage.messageBox(`${err}`,'error')
	}
}

// generate QR
const createQR = async () => {
	const base64 = btoa(JSON.stringify(itemsStatic))
	qrForm.value.items = base64
	try {
		const req = await generateQRImage(qrForm.value)
		if (req.code === 200) {
			qrImage.value = req.data.qrImage
			openDialog.value = true
		}
		return
	} catch (error) {
		throw errorMessage.messageBox(`${error}`,'error')
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
		throw errorMessage.messageBox(`${error}`,'error')
	}
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@400;600;700&display=swap');

.aba-wrapper {
	position: relative;
	background: #0d0d0f;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 40px 16px 60px;
	font-family: 'Syne', sans-serif;
	overflow: hidden;
	border-radius: 0.4rem 1.2rem 0.4rem 1.2rem;
}

/* Ambient orbs */
.bg-orb {
	position: fixed;
	border-radius: 50%;
	filter: blur(80px);
	pointer-events: none;
	z-index: 0;
}

.bg-orb-1 {
	width: 400px;
	height: 400px;
	top: -100px;
	left: -80px;
}

.bg-orb-2 {
	width: 350px;
	height: 350px;
	background: radial-gradient(
		circle,
		rgba(200, 22, 29, 0.1) 0%,
		transparent 70%
	);
	bottom: -80px;
	right: -60px;
}

/* Form Card */
.aba-form {
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: 560px;
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid rgba(255, 255, 255, 0.09);
	border-radius: 20px;
	padding: 32px;
	backdrop-filter: blur(20px);
	box-shadow:
		0 0 0 1px rgba(0, 0, 0, 0.4),
		0 32px 64px rgba(0, 0, 0, 0.5);
}

/* Header */
.form-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 28px;
}

.aba-logo {
	display: flex;
	align-items: center;
	gap: 10px;
}

.aba-title {
	font-size: 18px;
	font-weight: 700;
	color: #fff;
	letter-spacing: -0.3px;
}

.aba-badge {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 11px;
	font-weight: 600;
	color: #4ade80;
	background: rgba(74, 222, 128, 0.1);
	border: 1px solid rgba(74, 222, 128, 0.2);
	padding: 4px 10px;
	border-radius: 20px;
	letter-spacing: 0.5px;
	text-transform: uppercase;
}

.badge-dot {
	width: 6px;
	height: 6px;
	background: #4ade80;
	border-radius: 50%;
	animation: pulse 2s ease infinite;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.5;
		transform: scale(0.8);
	}
}

/* Grid */
.form-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
}

.col-span-2 {
	grid-column: span 2;
}

/* Field */
.field-group {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.field-label {
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.8px;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.45);
}

/* ElementPlus input overrides */
.aba-input :deep(.el-input__wrapper),
.aba-select :deep(.el-select__wrapper) {
	background: rgba(255, 255, 255, 0.05) !important;
	border: 1px solid rgba(255, 255, 255, 0.1) !important;
	border-radius: 10px !important;
	box-shadow: none !important;
	transition:
		border-color 0.2s,
		background 0.2s;
}

.aba-input :deep(.el-input__wrapper:hover),
.aba-select :deep(.el-select__wrapper:hover) {
	border-color: rgba(200, 22, 29, 0.5) !important;
	background: rgba(255, 255, 255, 0.07) !important;
}

.aba-input :deep(.el-input__wrapper.is-focus),
.aba-select :deep(.el-select__wrapper.is-focused) {
	border-color: #c8161d !important;
	background: rgba(200, 22, 29, 0.06) !important;
}

.aba-input :deep(.el-input__inner),
.aba-select :deep(.el-select__placeholder),
.aba-select :deep(.el-select__selected-item) {
	color: rgba(255, 255, 255, 0.85) !important;
	font-family: 'IBM Plex Mono', monospace !important;
	font-size: 13px !important;
}

.aba-input :deep(.el-input__prefix) {
	color: rgba(255, 255, 255, 0.3);
}

.aba-input :deep(input::placeholder) {
	color: rgba(255, 255, 255, 0.2) !important;
}

/* Divider */
.form-divider {
	margin: 24px 0;
	border: none;
	border-top: 1px solid rgba(255, 255, 255, 0.07);
}

/* Action Buttons */
.action-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}

.aba-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	padding: 11px 16px;
	border-radius: 10px;
	font-family: 'Syne', sans-serif;
	font-size: 13px;
	font-weight: 600;
	cursor: pointer;
	border: none;
	transition: all 0.18s ease;
	letter-spacing: 0.2px;
}

.btn-primary {
	background: #c8161d;
	color: #fff;
	box-shadow: 0 4px 20px rgba(200, 22, 29, 0.35);
}

.btn-primary:hover {
	background: #e01920;
	transform: translateY(-1px);
	box-shadow: 0 6px 24px rgba(200, 22, 29, 0.5);
}

.btn-secondary {
	background: rgba(255, 255, 255, 0.06);
	color: rgba(255, 255, 255, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.2);
	color: #fff;
}

.btn-ghost {
	background: transparent;
	color: rgba(255, 255, 255, 0.5);
	border: 1px dashed rgba(255, 255, 255, 0.15);
}

.btn-ghost:hover {
	background: rgba(255, 255, 255, 0.04);
	color: rgba(255, 255, 255, 0.75);
	border-color: rgba(255, 255, 255, 0.25);
}

.col-span-2 {
	grid-column: span 2;
}

/* Response Panel */
.response-panel {
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: 560px;
	margin-top: 16px;
	background: rgba(255, 255, 255, 0.03);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 16px;
	overflow: hidden;
}

.response-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.response-title {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.5);
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.response-tag {
	font-size: 10px;
	font-family: 'IBM Plex Mono', monospace;
	background: rgba(200, 22, 29, 0.15);
	color: #ff6b6b;
	padding: 2px 8px;
	border-radius: 4px;
	border: 1px solid rgba(200, 22, 29, 0.25);
}
@media (max-width: 480px) {
	.aba-form {
		padding: 20px 16px;
	}

	.form-grid {
		grid-template-columns: 1fr;
	}

	.col-span-2 {
		grid-column: span 1;
	}

	.action-grid {
		grid-template-columns: 1fr;
	}

	.btn-ghost.col-span-2 {
		grid-column: span 1;
	}
}
</style>
