import express, { type Router } from 'express'
import { errorResp } from '@/share/utils/response.js'
import { abaService } from '@/domain/service/aba.service.js'

const router: Router = express.Router()

router.post('/api/create-payment', async (req, resp) => {
	try {
		const payment = await abaService.createPayment(req.body)
		return resp.status(200).json(payment)
	} catch (error: any) {
		return  resp.json(errorResp(error.status, error.message, error.code))
	}
})

router.post('/api/check-transaction', async (req, resp) => {
	try {
		const checkTrans = await abaService.viewTransaction(req.body)
		return resp.status(200).json(checkTrans)
	} catch (error: any) {
		return  resp.json(errorResp(error.status, error.message, error.code))
	}
})

router.post('/api/check-rate', async (req, resp) => {
	try {
		const checkRate = await abaService.viewRate(req.body)
		return resp.status(200).json(checkRate)
	} catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

router.post('/api/generate-qr', async (req, resp) => {
	try {
		const genQR = await abaService.generateQR(req.body)
		return resp.status(200).json(genQR)
	} catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

router.post('/api/link-card', async (req, resp) => {
	const payload: object =  req.body
	try {
		const link_card = await abaService.card(payload)
		return resp.status(200).json(link_card.data)
	} catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

export default router
