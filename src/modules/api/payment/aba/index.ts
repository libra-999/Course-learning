import apiRequest from '@/app/utils/request.ts'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VERSION = import.meta.env.VITE_SERVER_VERSION

export async function createPayment(data: object) {
	const response =  await apiRequest.post(`${SERVER_URL}/api/${VERSION}/aba/create-payment`, data);
	return response.data
}
export async function getTransaction(data: object) {
	const resp = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/aba/check-transaction`, data)
	return resp.data
}
export async function getRate(data: object) {
	const resp = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/aba/check-rate`, data)
	return resp.data
}
export async function generateQRImage(data: object) {
	const resp = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/aba/generate-qr`, data)
	return resp.data
}
export async function manageCard(data: object) {
	const resp = await apiRequest.post(`${SERVER_URL}/api/${VERSION}/aba/link-card`, data)
	return resp.data
}
