import express, { type Router } from 'express'
import axios from 'axios'
import { env } from '@/domain/config/app.environment.js'
import { NOWPAYMENT_PATH } from '@/application/routes/paths.js'
import { errorResp } from '@/share/utils/response.js'

const router: Router = express.Router();
const URL_SERVER = env.NOWPAYMENT_URL
const SECRET_KEY = env.NOWPAYMENT_SECRET_API_KEY

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
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
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
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})
export default router;