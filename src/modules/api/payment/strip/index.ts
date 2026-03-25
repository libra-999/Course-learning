import apiRequest from '@/app/utils/request.ts'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VERSION = import.meta.env.VITE_SERVER_VERSION

export async function stripPayment(){
	const req = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/strip/payment`)
	return req.data
}

