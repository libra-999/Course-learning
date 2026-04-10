import { onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { loginStore } from '@/modules/store/auth'

interface OptionsType {
	maxReconnect?: number
	timeout?: number
	reconnectDelay?: number
}

interface QueryType<T> {
	options?: OptionsType
	message?: (_payload: T) => void // payload or data
	messageKey?: string
}

const defaultOptions: Required<OptionsType> = {
	maxReconnect: 5, // retried 5 time
	timeout: 10 * 1000, // timeout 10s
	reconnectDelay: 13 * 3000, // 3s
}

export default function useSocket<T>({
	options = {},
	message,
	messageKey = '',
}: QueryType<T>) {
	const _options = { ...defaultOptions, ...options }
	const authLogin = loginStore()
	let socket: Socket | null = null
	const SOCKET_URL = import.meta.env.VITE_SERVER_SOCKET_URL

	function onConneted() {
		console.log('ConnectID: ' + socket?.id)
	}
	function onError(err: any) {
		console.log('Connecting Error : ' + err.message)
	}
	function onDisconnect(rs?: string) {
		console.log('Disconnect :', rs)
	}
	function onMessage(_payload: T) {
		message?.(_payload)
	}

	function initSocket() {
		socket = io(SOCKET_URL, {
			extraHeaders: {
				authorization: authLogin.access_token
			},
			autoConnect: true,
			reconnection: true,
			timeout: _options.timeout,
			reconnectionDelayMax: _options.reconnectDelay,
			reconnectionAttempts:
				_options.maxReconnect === -1
					? Number.MAX_SAFE_INTEGER
					: _options.maxReconnect,
		})

		socket.on('connect', onConneted)
		socket.on('disconnected', onDisconnect)
		socket.on('connect_error', onError)
		socket.off(messageKey, onMessage) // prevent duplicate event
		socket.on(messageKey, onMessage)
	}

	function sendMessage(event: string, payload: any | undefined) {
		if (!socket) return false
		socket.emit(event, payload)
		return true
	}

	function destroySocket() {
		if (!socket) return false
		socket.off('connect', onConneted)
		socket.off('disconnected', onDisconnect)
		socket.off('connect_error', onError)
		socket.off(messageKey, onMessage)

		socket.disconnect()
		socket = null
	}

	onUnmounted(() => {
		destroySocket()
	})

	return { initSocket, destroySocket, sendMessage, getSocket: () => Socket }
}
