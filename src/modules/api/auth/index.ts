import apiRequest from '@/app/utils/request'
import type { LoginRequest } from '@/modules/types/auth'

export async function login(payload: LoginRequest): Promise<any | undefined> {
	const login = await apiRequest.post("/auth/login", payload)
	return login.data
}
