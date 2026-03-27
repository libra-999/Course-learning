import apiRequest from '@/app/utils/request.ts'

export async function stripPayment() {
	const req = await apiRequest.post('/api/strip/payment')
	return req.data
}
