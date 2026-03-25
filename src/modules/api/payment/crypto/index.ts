import apiRequest from '@/app/utils/request.ts'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VERSION = import.meta.env.VITE_SERVER_VERSION

export async function createInvoice(data : any) {
	const req = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/nowpayment/invoice`, data);
	return req.data;
}

export async function createPayment(data : any) {
	const req = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/nowpayment/payment`, data);
	return req.data;
}

