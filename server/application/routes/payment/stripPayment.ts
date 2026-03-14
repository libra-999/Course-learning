import express, { type Router } from 'express'
import Stripe from 'stripe'
import { env } from '@/domain/config/app.environment.js'
import { errorResp } from '@/share/utils/response.js'

const router: Router = express.Router();
const SECRET_KEY = env.STRIPE_SECRET_KEY
if (!SECRET_KEY){
	throw new Error("Empty Secret Strip")
}
const stripeSecret = new Stripe(SECRET_KEY)

router.post('/api/strip/payment', async  (req, resp) => {
	try {
		const createPayment = await stripeSecret.paymentIntents.create({
			amount: 99,
			currency: 'usd',
			automatic_payment_methods: {enabled: true}
		})
		return resp.send({clientSecret: createPayment.client_secret})
	}catch (error: any){
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

export default router;