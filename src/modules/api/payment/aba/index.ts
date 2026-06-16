import apiRequest from '@/app/utils/request.ts'

export async function createPayment(data: object): Promise<any> {
	const response = await apiRequest.post('/api/aba/create-payment', data)
	return response.data
}

export async function getTransaction(data: object): Promise<any> {
	const resp = await apiRequest.post('/api/aba/check-transaction', data)
	return resp.data
}

export async function getRate(data: object) : Promise<any>{
	const resp = await apiRequest.post('/api/aba/check-rate', data)
	return resp.data
}

export async function generateQRImage(data: object): Promise<any> {
	const resp = await apiRequest.post('/api/aba/generate-qr', data)
	return resp.data
}

export async function manageCard(data: object): Promise<any> {
	const resp = await apiRequest.post('/api/aba/link-card', data)
	return resp.data
}
