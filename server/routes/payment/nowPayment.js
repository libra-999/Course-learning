import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import { NOWPAYMENT_PATH } from '../paths.js'

dotenv.config();
const router = express.Router();
// eslint-disable-next-line no-undef
const URL_SERVER = process.env.NOWPAYMENT_URL
// eslint-disable-next-line no-undef
const SECRET_KEY = process.env.NOWPAYMENT_SECRET_API_KEY

router.post("/api/invoice", async (req , resp) => {
	const data = req.body;
	try {
		const invoiceReq = await axios.post(`${URL_SERVER}/${NOWPAYMENT_PATH.INVOICE}`, data , {
			headers: {
				'x-api-key':  SECRET_KEY
			}
		});
		if (invoiceReq.status === 200) {
			return resp.send(invoiceReq.data)
		}
	}catch (error){
		return error.response.data
	}
})
router.post("/api/payment", async (req , resp) => {
	const data = req.body;
	try {
		const paymentReq = await axios.post(`${URL_SERVER}/${NOWPAYMENT_PATH.PAYMENT}`, data , {
			headers: {
				'x-api-key':  SECRET_KEY
			}
		});
		if (paymentReq.status === 201) {
			return resp.send(paymentReq.data)
		}
	}catch (error){
		return error.response.data
	}
})
export default router;