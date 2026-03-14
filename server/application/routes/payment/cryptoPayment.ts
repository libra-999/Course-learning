import express, { type Router } from 'express'
import axios from 'axios'
import { generateSign } from '@/share/utils/cryptoUtil.js'
import { env } from '@/domain/config/app.environment.js'
import { errorResp } from '@/share/utils/response.js'


const router: Router = express.Router();
const SERVER_URL = env.CRYPTO_URL;
const MERCHANT_ID= env.CRYPTO_MERCHANT_UUID;

/* create payment */
router.post("/api/payment", async (req, resp) => {
	const sign = generateSign(req.body)
	try {
		const createPayment = await axios.post(`${SERVER_URL}/payment`, req.body ,{
			headers: {
				'merchant': MERCHANT_ID,
				'sign': sign
			}
		});
		if (createPayment.data.state === 0){
			return resp.send(createPayment.data)
		}
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})
/* get payment info */
router.post("/api/payment", async (req, resp) => {
	const sign = generateSign(req.body)
	try {
		const getPaymentInfo = await axios.post(`${SERVER_URL}/payment/info`, req.body, {
			headers: {
				'merchant': MERCHANT_ID,
				'sign': sign
			}
		})
		if (getPaymentInfo.data){
			return resp.send(getPaymentInfo.data)
		}
	}catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

/* payment failed resent */
router.post("/api/payment/callback", async (req , resp )=> {
	const sign = generateSign(req.body);
	try {
		const paymentCallback = await axios.post("https://api.cryptomus.com/v2/payment/resend", req.body , {
			headers: {
				'merchant': MERCHANT_ID,
				'sign': sign
			}
		});
		if (paymentCallback.data.state === 0){
			return resp.send(paymentCallback.data)
		}
	}catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

/* wallet QR */
router.post("/api/wallet/qr", async (req , resp) => {
	const sign  = generateSign(req.body);
	try {
		const generateWalletQR = await  axios.post(`${SERVER_URL}/wallet/qr`, req.body , {
			headers: {
				'merchant': MERCHANT_ID,
				'sign': sign
			}
		})
		if (generateWalletQR.data.state === 0){
			return resp.send(generateWalletQR.data)
		}
	}catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

/* payment QR */
router.post("/api/payment/qr" , async (req , resp) => {
	const sign  = generateSign(req.body);
	try {
		const generatePaymentQR = await axios.post(`${SERVER_URL}/payment/qr`, req.body, {
			headers: {
				'merchant': MERCHANT_ID,
				'sign': sign
			}
		})
		if (generatePaymentQR.data.state === 0){
			return resp.send(generatePaymentQR.data)
		}
	}catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

export default router;