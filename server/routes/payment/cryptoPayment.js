import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import { generateSign } from '../../utils/cryptoUtil.js'

// step of payment crypto
// 1. webhook (done)
// 2. create-payment (done)
// 3. plugin sdk with woocommerce or other service

dotenv.config()
const router = express.Router();
// eslint-disable-next-line no-undef
const SERVER_URL = process.env.CRYPTO_URL;
// eslint-disable-next-line no-undef
const MERCHATN_ID= process.env.CRYPTO_MERCHANT_UUID;


// create payment
router.post("/api/payment", async (req, resp) => {
	const sign = generateSign(req.body)
	try {
		const createPayment = await axios.post(`${SERVER_URL}/payment`, req.body ,{
			headers: {
				'merchant': MERCHATN_ID,
				'sign': sign
			}
		});
		if (createPayment.data.state === 0){
			return resp.send(createPayment.data)
		}
	}catch (error){
		return resp.send(error.response.data)
	}
})
// get payment info
router.post("/api/payment", async (req, resp) => {
	const sign = generateSign(req.body)
	try {
		const getPaymentInfo = await axios.post(`${SERVER_URL}/payment/info`, req.body, {
			headers: {
				'merchant': MERCHATN_ID,
				'sign': sign
			}
		})
		if (getPaymentInfo.data){
			return resp.send(getPaymentInfo.data)
		}
	}catch (error) {
		return error.response.data()
	}
})

// payment failed resent
router.post("/api/payment/callback", async (req , resp )=> {
	const sign = generateSign(req.body);
	try {
		const paymentCallback = await axios.post("https://api.cryptomus.com/v2/payment/resend", req.body , {
			headers: {
				'merchant': MERCHATN_ID,
				'sign': sign
			}
		});
		if (paymentCallback.data.state === 0){
			return resp.send(paymentCallback.data)
		}
	}catch (error) {
		return error.response.data;
	}
})

// wallet QR
router.post("/api/wallet/qr", async (req , resp) => {
	const sign  = generateSign(req.body);
	try {
		const generateWalletQR = await  axios.post(`${SERVER_URL}/wallet/qr`, req.body , {
			headers: {
				'merchant': MERCHATN_ID,
				'sign': sign
			}
		})
		if (generateWalletQR.data.state === 0){
			return resp.send(generateWalletQR.data)
		}
	}catch (error) {
		return error.response.data()
	}
})

// payment QR
router.post("/api/payment/qr" , async (req , resp) => {
	const sign  = generateSign(req.body);
	try {
		const generatePaymentQR = await axios.post(`${SERVER_URL}/payment/qr`, req.body, {
			headers: {
				'merchant': MERCHATN_ID,
				'sign': sign
			}
		})
		if (generatePaymentQR.data.state === 0){
			return resp.send(generatePaymentQR.data)
		}
	}catch (error) {
		return error.response.data
	}
})

export default router;