export interface Base {
	req_time: string
	merchant_id: string
	tran_id: string
	hash: string
}

/** Payment **/
export interface PaymentDTO extends Base {
	amount: number
	items: string
	firstname: string
	lastname: string
	email: string
	phone: string
	currency: string
	type: string,
	payment_option: string
	view_type: string
}

export interface QrDTO extends Base {
	purchase_type: number
	payment_option: string
	return_deeplink: string
	return_params: string
	payout: string
	lifetime: number
	qr_image_template: string
	amount: number
	items: string
	first_name: string
	last_name: string
	email: string
	phone: string
	currency: string
}
export interface CryptoInvoice {
	order_id : string,
	price_amount: number,
	price_currency: string,
	order_description: string,
	ipn_callback_url: string,
	pay_currency: string
}
/** Payment **/

export const TransactionDTO = (
    merchantID: string,
	reqTime: string,
	date: string,
	amount: any,
	item: string,
): PaymentDTO => {
	return {
		hash: '',
		tran_id: `TT${date}`,
		amount,
		merchant_id: merchantID,
		req_time: reqTime,
		payment_option: 'abapay',
		currency: 'USD',
		firstname: 'Libra',
		lastname: 'Libra',
		email: 'libra1@gmail.com',
		phone: '099284990',
		type: 'purchase',
		items: item,
		view_type: 'popup',
	}
}