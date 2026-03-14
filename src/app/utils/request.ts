import axios, {
	AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios'

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
		if (resp.status === 200 || resp.status === 201) {
			return resp
		} else {
			return resp
		}
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	},
)

export default apiRequest;
