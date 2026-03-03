export interface Payment {
	amount?: number
	currency: "USD" | "KHR"
	order_id?: string
	network?: string // blockchain network (ETH, BTC .. )
	url_return?: string
	url_success?: string
	url_callback?: string
	is_payment_multiple?: boolean
	lifetime?: number
	to_currency?: string
	subtract?: number
	accuracy_payment_percent?: number
	additional_data?: string
	course_source?: string // length (20)
	from_referral_code?: string
	discount_percent?: number // min=-99, max=100
	is_refresh?: boolean,
}

// payload must be object not md5
export interface NowpaymentModel{
	price_amount: number // maximum 2000$
	price_currency: string
	pay_currency?: string
	order_id?: string
	order_description?: string
	is_fixed_rate?:  boolean
	is_fee_paid_by_user?: boolean
	ipn_callback_url?: string
	payout_address?: string
	payout_currency?: string
	payout_extra_id?: string
}
