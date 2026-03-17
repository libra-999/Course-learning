import express, { type Router } from 'express'
import { errorResp } from '@/share/utils/response.js'
import { cryptoService } from '@/domain/service/crypto.service.js'

const router: Router = express.Router();
router.post("/api/invoice", async (req , resp) => {
	try {
		const invoiceReq = await cryptoService.createInvoice(req.body);
		return resp.send(invoiceReq)
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})
router.post("/api/payment", async (req , resp) => {
	try {
		const paymentReq = await cryptoService.createPayment(req.body)
		return resp.send(paymentReq)
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})
export default router;