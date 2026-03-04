import apiRequest from '@/app/utils/request.ts'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export async function createInvoice(data : any) {
	const req = await apiRequest.post(`${SERVER_URL}/nowpay/api/invoice`, data);
	return req.data;
}

export async function createPayment(data : any) {
	const req = await apiRequest.post(`${SERVER_URL}/nowpay/api/payment`, data);
	return req.data;
}

