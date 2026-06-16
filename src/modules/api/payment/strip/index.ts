import apiRequest from '@/app/utils/request.ts'

export async function stripPayment() : Promise<any>{
	const req = await apiRequest.post('/api/strip/payment')
	return req.data
}
