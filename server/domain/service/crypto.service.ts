import type { CryptoInvoice } from '@/domain/model/payment/index.js'
import axios from 'axios'
import { env } from '@/domain/config/app.environment.js'
import { NOWPAYMENT_PATH } from '@/presentation/routes/paths.js'
import { errorResp } from '@/share/utils/response.js'

const URL_SERVER = env.NOWPAYMENT_URL
const SECRET_KEY = env.NOWPAYMENT_SECRET_API_KEY

export const cryptoService = {
	async createInvoice(payload: CryptoInvoice) {
		const invoice = await axios.post(
			`${URL_SERVER}/${NOWPAYMENT_PATH.INVOICE}`,
			payload,
			{
				headers: {
					'x-api-key': SECRET_KEY,
				},
			},
		)
		if (invoice.status === 200) {
			return invoice.data
		} else {
			return invoice
		}
	},
	async createPayment(payload: CryptoInvoice) {
		const invoice = await axios.post(
			`${URL_SERVER}/${NOWPAYMENT_PATH.PAYMENT}`,
			payload,
			{
				headers: {
					'x-api-key': SECRET_KEY,
				},
			},
		)
		if (invoice.status === 201) {
			return invoice.data
		} else {
			return errorResp(invoice.status,"Payment Failed", "PAYMENT_INEFFICIENT")
		}
	},
}
