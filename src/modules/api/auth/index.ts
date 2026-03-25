import apiRequest from '@/app/utils/request'
import type { LoginRequest } from '@/modules/types/auth'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_URL
const VERSION = import.meta.env.VITE_SERVER_VERSION

export async function login(payload: LoginRequest): Promise<any | undefined> {
	const login = await apiRequest.post(
		`${SERVER_ADDRESS}/auth/${VERSION}/login`,
		payload,
	)
	return login.data
}
