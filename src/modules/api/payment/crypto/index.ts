import apiRequest from '@/app/utils/request.ts'

export async function createInvoice(data: any) {
	const req = await apiRequest.post('/api/nowpayment/invoice', data)
	return req.data
}

export async function createPayment(data: any) {
	const req = await apiRequest.post('/api/nowpayment/payment', data)
	return req.data
}
