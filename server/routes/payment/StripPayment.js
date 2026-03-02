import express from 'express'
import dotenv from 'dotenv'
import { Stripe } from 'stripe'

dotenv.config()
const router = express.Router();
// eslint-disable-next-line no-undef
const stripeSecret = Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/api/strip/payment', async  (req, resp) => {
	try {
		const createPayment = await stripeSecret.paymentIntents.create({
			amount: 99,
			currency: 'usd',
			automatic_payment_methods: {enabled: true}
		})
		resp.send({clientSecret: createPayment.client_secret})
	}catch (error){
		resp.status(500).json({error: error.message})
	}
})

export default router;