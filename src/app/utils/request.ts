import axios, {
	AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios'
import route from '@/modules/route'

const apiRequest: AxiosInstance = axios.create({
	timeout: 10000,
})
apiRequest.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
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
		const status = error.status // code error
		const errorType = error.code // type of error

		if (status === 500 || errorType === "ERR_NETWORK" ) {
			route.push("/server-error")
			return Promise.reject(error)
		}
		if (status === 401) {
			route.push('/login')
			return Promise.reject(error)
		}
		return Promise.reject(error)
	}
)

export default apiRequest
