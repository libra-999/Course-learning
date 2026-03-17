import express, { type Router } from 'express'
import { errorResp } from '@/share/utils/response.js'
import { stripService } from '@/domain/service/strip.service.js'

const router: Router = express.Router();
router.post('/api/strip/payment', async  (req, resp) => {
	const data : object = {
		amount: 43.2,
		currency: "usd"
	}
	try {
		const createPayment = await stripService.payment(data)
		return resp.send({clientSecret: createPayment})
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

export default router;