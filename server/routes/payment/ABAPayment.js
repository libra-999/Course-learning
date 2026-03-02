import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import { ABA_PATH as ABA_PAYWAY_PATHS } from '../paths.js'
import { generateHmac } from '../../utils/cryptoUtil.js'

dotenv.config()
const router = express.Router()
// eslint-disable-next-line no-undef
const API_URL = process.env.ABA_URL
// eslint-disable-next-line no-undef
const API_KEY = process.env.ABA_API_KEY

// static path payway of aba
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
	data.hash = generateHmac(dataToHash, API_KEY)
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
	data.hash = generateHmac(dataToHash, API_KEY)
	try {
		const checkTrans = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.TRANSACTION}`,
			data,
		)
		resp.status(200).json(checkTrans.data)
	} catch (error) {
		resp.status(200).json(error)
	}
})

router.post('/api/check-rate', async (req, resp) => {
	const data = req.body
	const dataToHash = data.req_time + data.merchant_id
	data.hash = generateHmac(dataToHash, API_KEY)
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
	data.hash = generateHmac(dataToHash, API_KEY)
	try {
		const genQR = await axios.post(
			`${API_URL}/${ABA_PAYWAY_PATHS.QR_IMAGE}`,
			data,
		)
		resp.status(200).json(genQR.data)
	} catch (error) {
		resp.status(200).json(error)
	}
})

router.post('/api/link-card', async (req, resp) => {
	const data = req.body
	const dataToHash = data.merchant_id + data.ctid + data.return_param
	data.hash = generateHmac(dataToHash, API_KEY)
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

export default router
