import apiRequest from '@/app/utils/request'
import type { LoginRequest } from '@/modules/types/auth'

export async function login(payload: LoginRequest): Promise<any | undefined> {
	const login = await apiRequest.post('/auth/login', payload)
	return login.data
}

export async function generateQR(): Promise<any> {
	const generate = await apiRequest.get('/auth/qr/generate')
	return generate.data
}
export async function getQR(qrToken: string): Promise<any> {
	const getQR = await apiRequest.get('/auth/qr', {
		headers: {
			qrToken: qrToken,
		},
	})
	return getQR.data
}
export async function scanQR(qrToken: string): Promise<any> {
	const scanQR = await apiRequest.post(
		'/auth/qr/scan',
		{}, // none body
		{
			headers: {
				qrToken: qrToken,
			},
		},
	)
	return scanQR.data
}
export async function confirmLogin(qrToken: string, _payload: any): Promise<any> {
	const confirm = await apiRequest.post('auth/qr/confirm',_payload, {
		headers :{
			qrToken: qrToken
		}
	})
	return confirm.data
}
export async function cancel(qrToken: string): Promise<any> {
	const cancel = await apiRequest.post('auth/qr/cancel',{}, {
		headers :{
			qrToken: qrToken
		}
	})
	return cancel.data
}