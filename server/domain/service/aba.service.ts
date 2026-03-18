import type { Base, QrDTO } from '@/domain/model/payment/index.js'
import { generateHmac } from '@/share/utils/cryptoUtil.js'
import { env } from '@/domain/config/app.environment.js'
import axios from 'axios'
import { ABA_PATH } from '@/presentation/routes/paths.js'

const API_URL = env.ABA_URL
const API_KEY = env.ABA_API_KEY

export const abaService = {
	async createPayment(payload: any) {
		const item = [
			{
				name: "Apple MacBook Pro M5",
				quantity: 1,
				price: 22.2
			}
		]
		const data = {
			firstname: 'li',
			lastname: 'bra',
			req_time: new Date("yyyyMMddHHmmss"),
			tran_id: `TT-2201`,
			merchant_id: 'ec463980',
			email: 'libra1@gmail.com',
			phone: '099284990',
			amount: 22.2,
			currency: 'USD',
			hash: '',
			items: '',
			type: 'purchase',
			payment_option: 'abapay_khqr',
			view_type: 'popup',
		}
		data.items = Buffer.from(JSON.stringify(item)).toString("base64")
		const dataToHash =
			data.req_time +
			data.merchant_id +
			data.tran_id +
			data.amount +
			data.items +
			data.firstname +
			data.lastname +
			data.email +
			data.phone +
			data.currency

		data.hash = generateHmac(dataToHash, API_KEY)
		// await axios.post(`${API_URL}/${ABA_PATH.PURCHASE}`, payload)
		return {data: data, hash: data.hash}
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
