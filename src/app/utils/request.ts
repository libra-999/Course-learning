import axios, {
	AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios'
import route from '@/modules/route'
import { loginStore } from '@/modules/store/auth'

const apiRequest: AxiosInstance = axios.create({
	timeout: 10000,
})
apiRequest.interceptors.request.use(
	// attached token to sign all routes
	(config: InternalAxiosRequestConfig) => {
		const authStore = loginStore()
		if (authStore.access_token) {
			config.headers.set('Authorization', `Bearer ${authStore.access_token}`)
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	},
)

apiRequest.interceptors.response.use(
	(resp: AxiosResponse) => {
		return resp
	},
	(error: AxiosError) => {
		const status = error.response?.status // code error
		const errorType = error.code // type of error

		if (status === 500 || errorType === "ERR_NETWORK" ) {
			route.push("/server-error")
			return Promise.reject(error)
		}
		if (status === 401) {
			loginStore().logout() // no token
			route.push('/login')
			return Promise.reject(error)
		}
		return Promise.reject(error)
	}
)

export default apiRequest
