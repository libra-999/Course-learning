import type { Base, PaymentDTO, QrDTO } from '@/domain/model/payment/index.js'
import { generateHmac } from '@/share/utils/cryptoUtil.js'
import { env } from '@/domain/config/app.environment.js'
import axios from 'axios'
import { ABA_PATH } from '@/presentation/routes/paths.js'

const API_URL = env.ABA_URL
const API_KEY = env.ABA_API_KEY

export const abaService = {
	async createPayment(payload: PaymentDTO) {
		const dataToHash =
			payload.req_time +
			payload.merchant_id +
			payload.tran_id +
			payload.amount +
			payload.items +
			payload.firstname +
			payload.lastname +
			payload.email +
			payload.phone +
			payload.currency

		payload.hash = generateHmac(dataToHash, API_KEY)
		const payment = await axios.post(
			`${API_URL}/${ABA_PATH.PURCHASE}`,
			payload,
		)
		return payment.data
	},
	async viewTransaction(payload: Base) {
		const dataToHash =
			payload.req_time + payload.merchant_id + payload.tran_id
		payload.hash = generateHmac(dataToHash, API_KEY)
		const transaction = await axios.post(
			`${API_URL}/${ABA_PATH.TRANSACTION}`,
			payload,
		)
		return transaction.data
	},
	async viewRate(payload: Base) {
		const dataToHash =
			payload.req_time + payload.merchant_id
		payload.hash = generateHmac(dataToHash, API_KEY)
		const rate = await axios.post(
			`${API_URL}/${ABA_PATH.EXCHANGE_RATE}`,
			payload,
		)
		return rate.data
	},
	async generateQR(payload: QrDTO) {
		const dataToHash =
			payload.req_time +
			payload.merchant_id +
			payload.tran_id +
			payload.amount +
			payload.items +
			payload.first_name +
			payload.last_name +
			payload.email +
			payload.phone +
			payload.purchase_type +
			payload.payment_option +
			payload.return_deeplink +
			payload.currency +
			payload.return_params +
			payload.payout +
			payload.lifetime +
			payload.qr_image_template
		payload.hash = generateHmac(dataToHash, API_KEY)
		const qr = await axios.post(
			`${API_URL}/${ABA_PATH.QR_IMAGE}`,
			payload,
		)
		return qr.data
	},
	async card(payload: any){
		const dataToHash =
			payload.merchant_id + payload.ctid + payload.return_param
		payload.hash = generateHmac(dataToHash, API_KEY)
		const linkCard = await axios.post(
			`${API_URL}/${ABA_PATH.LINK_CARD}`,
			payload,
		)
		return linkCard.data;
	}
}
