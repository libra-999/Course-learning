import express from 'express'
import dotenv from 'dotenv'
import crypto from 'crypto'
import axios from 'axios'

dotenv.config()
const router = express.Router();
// eslint-disable-next-line no-undef
const API_URL = process.env.ABA_URL;
// eslint-disable-next-line no-undef
const API_KEY = process.env.ABA_API_KEY


// static path payway of aba
export const ABA_PAYWAY_PATHS = {
	TRANSACTION: 'payments/check-transaction-2',
	PURCHASE: 'payments/purchase',
	DETAIL_TRANSACTION: 'payments/transaction-detail',
	EXCHANGE_RATE: 'exchange-rate',
	QR_IMAGE: 'payments/generate-qr',
	LINK_CARD: 'cof/initial'
}

router.post('/api/create-payment', async (req, resp) => {
	const data = req.body
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
	data.hash = crypto
		.createHmac('sha512', API_KEY)
		.update(dataToHash)
		.digest('base64')
	// resp.send(data)
	try {
		const payment = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.PURCHASE}`,
			data,
		)
		resp.status(200).json(payment.data)
	} catch (error) {
		resp.status(200).json(error)
	}
})

router.post('/api/check-transaction', async (req, resp) => {
	const data = req.body
	const dataToHash = data.req_time + data.merchant_id + data.tran_id
	data.hash = crypto
		.createHmac('sha512', API_KEY)
		.update(dataToHash)
		.digest('base64')
	try {
		const checkTrans = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.TRANSACTION}`,
			data,
		)
		resp.status(200).json(checkTrans.data);
	} catch (error) {
		resp.status(200).json(error)
	}
})

router.post('/api/check-rate', async (req, resp) => {
	const data = req.body
	const dataToHash = data.req_time + data.merchant_id
	data.hash = crypto
		.createHmac('sha512', API_KEY)
		.update(dataToHash)
		.digest('base64')
	try {
		const checkRate = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.EXCHANGE_RATE}`,
			data,
		)
		resp.status(200).json(checkRate.data)
	} catch (error) {
		resp.status(200).json(error)
	}
})

router.post('/api/generate-qr', async (req, resp) => {
	const data = req.body
	const dataToHash =
		data.req_time +
		data.merchant_id +
		data.tran_id +
		data.amount +
		data.items +
		data.first_name +
		data.last_name +
		data.email +
		data.phone +
		data.purchase_type +
		data.payment_option +
		data.return_deeplink +
		data.currency +
		data.return_params +
		data.payout +
		data.lifetime +
		data.qr_image_template
	data.hash = crypto
		.createHmac('sha512', API_KEY)
		.update(dataToHash)
		.digest('base64')

	// console.log(data.hash)
	try {
		const genQR = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.QR_IMAGE}`,
			data,
		)
		resp.status(200).json(genQR.data)
	}catch (error){
		resp.status(200).json(error)
	}

})

router.post('/api/link-card', async (req, resp) => {
	const data = req.body
	const dataToHash =  data.merchant_id + data.ctid + data.return_param
	data.hash = crypto
		.createHmac('sha512', API_KEY)
		.update(dataToHash)
		.digest('base64')
	try {
		const link_card = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.LINK_CARD}`,
			data,
		)
		resp.status(200).json(link_card.data)
	} catch (error) {
		resp.status(200).json(error)
	}
})

export default router;
