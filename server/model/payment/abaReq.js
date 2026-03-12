const base = {
	request_time: String,
	merchant_id: String,
	tran_id: String,
}
const payment = {
	defaultBase: base,
	amount: Number,
	items: String,
	firstname: String,
	lastname: String,
	email: String,
	phone: String,
	currency: String,
	hash: String
}

const qr = {
	payment: payment,
	purchase_type: Number,
	payment_option: String,
	return_deeplink: String,
	return_params: String,
	payout: String,
	lifetime: Number,
	qr_image_template: String
}
