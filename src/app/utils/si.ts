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

export interface SocketAck {
   status: boolean
   message: string
}

export default function useSocket<T>({
   options = {},
   message,
   messageKey = '',
}: QueryType<T>) {
   const _options = {...defaultOptions, ...options}
   const authLogin = loginStore ()
   let socket: Socket | null = null
   const SOCKET_URL = import.meta.env.VITE_SERVER_SOCKET_URL
   const ENV = import.meta.env.MODE

   function onConneted() {
      if (ENV === 'prod'){
         console.log('Socket Connected')
      }else{
         console.log ('ConnectID: ' + socket?.id)

      }
   }
   
   function onError(err: any) {
      console.log ('Connecting Error : ' + err.message)
   }
   
   function onDisconnect(rs?: string) {
      console.log ('Disconnect :', rs)
   }
   
   function onMessage(_payload: T) {
      message?. (_payload)
   }
   
   function initSocket() {
      const accessToken = authLogin.access_token?.trim ()
      if (socket) {
         socket.auth = accessToken ? {token: accessToken} : {}
         if (!socket.connected) socket.connect ()
         return
      }
      socket = io (SOCKET_URL, {
         path: "/socket.io",
         auth: accessToken ? {token: accessToken} : {},
         extraHeaders: {
            authorization: accessToken ? accessToken : '',
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
      
      socket.on ('connect', onConneted)
      socket.on ('disconnect', onDisconnect)
      socket.on ('connect_error', onError)
      if (messageKey) {
         socket.off (messageKey, onMessage) // prevent duplicate event
         socket.on (messageKey, onMessage)
      }
   }
   
   function sendMessage<TAck = unknown>(
       event: string,
       payload?: unknown,
       ack?: (response: TAck) => void,
   ) {
      if (!socket) return false
      if (ack) {
         socket.emit (event, payload, ack)
         return true
      }
      socket.emit (event, payload)
      return true
   }
   
   function onEvent<TPayload = unknown>(
       event: string,
       handler: (payload: TPayload) => void,
   ) {
      if (!socket) return false
      socket.on (event, handler as (...args: any[]) => void)
      return true
   }
   
   function offEvent<TPayload = unknown>(
       event: string,
       handler: (payload: TPayload) => void,
   ) {
      if (!socket) return false
      socket.off (event, handler as (...args: any[]) => void)
      return true
   }
   
   function destroySocket() {
      if (!socket) return false
      socket.off ('connect', onConneted)
      socket.off ('disconnect', onDisconnect)
      socket.off ('connect_error', onError)
      if (messageKey) {
         socket.off (messageKey, onMessage)
      }
      
      socket.disconnect ()
      socket = null
      return true
   }
   
   onUnmounted (() => {
      destroySocket ()
   })
   
   return {
      initSocket,
      destroySocket,
      sendMessage,
      onEvent,
      offEvent,
      getSocket: () => socket,
   }
}
