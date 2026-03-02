import axios from 'axios'

export async function createPayment(data: object) {
	const response = await axios.post("http://localhost:8900/aba/api/create-payment", data)
	return response.data
}
export async function getTransaction(data: object) {
	const resp = await axios.post("http://localhost:8900/aba/api/check-transaction", data)
	return resp.data
}
export async function getRate(data: object) {
	const resp = await axios.post("http://localhost:8900/aba/api/check-rate", data)
	return resp.data
}
export async function generateQRImage(data: object) {
	const resp = await axios.post("http://localhost:8900/aba/api/generate-qr", data)
	return resp.data
}
export async function manageCard(data: object) {
	const resp = await axios.post("http://localhost:8900/aba/api/link-card", data)
	return resp.data
}
