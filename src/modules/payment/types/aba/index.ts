export interface PaywayABA {
    merchant_id: string,
    req_time: string,
    tran_id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    type?: string,
    payment_option?: string,
    items: string | [],
    shipping?: number,
    amount: number,
    currency: currencyType,
    return_url?: string,
    cancel_url?: string,
    skip_success_page?: number,
    continue_success_url?: string,
    return_deeplink?: string,
    custom_feilds?: string,
    return_params?: string,
    view_type?: string,
    payment_gate?: number,
    payout?: string,
    additional_params?: string,
    lifetime?: number,
    google_pay_token?: string,
		purchase_type?: string
    hash: string,
	qr_image_template?: string
}

export interface Transaction {
    merchant_id: string,
    req_time: string,
    tran_id: string ,
}

export type currencyType= "USD" | "KHR"
export type paywayType= "pre-auth" | "purchase"
export type paymentOption = "cards" | "abapay_khqr" | "abapay_khqr_deeplink" | "alipay" | "wechat" | "google_pay"

