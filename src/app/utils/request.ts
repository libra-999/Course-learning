import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig, } from 'axios'
import route from '@/modules/route'
import { loginStore } from '@/modules/store/auth'
import i18n from '@/modules/locales'


const SERVER_PROXY = import.meta.env.VITE_SERVER_PROXY
const SERVER_VERSION = import.meta.env.VITE_SERVER_VERSION
const SERVER_URL = import.meta.env.VITE_SERVER_URL

const BASE_URL = import.meta.env.DEV ? `${SERVER_PROXY}/${SERVER_VERSION}` : `${SERVER_URL}/${SERVER_VERSION}`
const t = i18n.global.t
const apiRequest: AxiosInstance = axios.create({
	baseURL: `${BASE_URL}`,
	timeout: 50000, // 5s
})

/* authentication */
apiRequest.interceptors.request.use (
    // attached token to sign all routes
    (config: InternalAxiosRequestConfig) => {
       const authStore = loginStore ()
       if (authStore.access_token) {
          config.headers.set ('Authorization', `Bearer ${authStore.access_token}`)
       }
       return config
    },
    (error: AxiosError) => {
       return Promise.reject (error)
    },
)

/* server error resp endpoint */
apiRequest.interceptors.response.use (
    (resp: AxiosResponse) => {
       return resp
    },
    (error: AxiosError) => {
       const status = error.response?.status // code error
       const errorType = error.code // type of error
       
       if (status === 500 || errorType === 'ERR_NETWORK') {
          route.push ('/server-error')
          return Promise.reject (t ("REQUEST_AXIOS.error.internal_server"))
       }
       if (status === 401) {
          loginStore ().logout () // no token
          route.push ('/login')
          return Promise.reject (t ("REQUEST_AXIOS.error.internal_server"))
       }
       return Promise.reject (t ("REQUEST_AXIOS.error.unauthorized"))
    },
)

export default apiRequest
