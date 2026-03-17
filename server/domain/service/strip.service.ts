import { env } from '@/domain/config/app.environment.js'
import Stripe from 'stripe'

const SECRET_KEY = env.STRIPE_SECRET_KEY
if (!SECRET_KEY) {
	throw new Error('Empty Secret ' + 'Strip')
}

const stripeSecret = new Stripe(SECRET_KEY)
export const stripService = {
	async payment(payload: any) {
		const transaction = await stripeSecret.paymentIntents.create({
			amount: payload.amount ,
			currency: payload.currency,
			automatic_payment_methods: { enabled: true },
		})
		return transaction.client_secret;
	},
}
