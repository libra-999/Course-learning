import apiRequest from '@/app/utils/request.ts'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
export async function stripPayment(){
	const req = await apiRequest.post(`${SERVER_URL}/stripe/api/strip/payment`)
	return req.data
}

