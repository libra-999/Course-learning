import CryptoJS from 'crypto-js'


const SECRET = import.meta.env.VITE_SECRET_KEY

export const generateHash = (data: any): string => {
   return CryptoJS.MD5 (data).toString ()
}

export async function generateHMACBase64(payload: string, apiKey: string) {
   const encoder = new TextEncoder ()
   const data = encoder.encode (apiKey)
   const msgData = encoder.encode (payload)
   
   const cryptoKey = await crypto.subtle.importKey (
       'raw',
       data,
       {name: 'HMAC', hash: 'SHA-512'},
       false,
       ['sign'],
   )
   const signature = await crypto.subtle.sign ('HMAC', cryptoKey, msgData)
   return btoa (String.fromCharCode (...new Uint8Array (signature)))
}

export const encryptPayload = (data: object): string => {
   return CryptoJS.AES.encrypt (JSON.stringify (data), SECRET).toString ()
}

export const decryptPayload = (localItem: any): object => {
   const decpt = CryptoJS.AES.decrypt (localItem, SECRET)
   const bytp = decpt.toString (CryptoJS.enc.Utf8)
   return JSON.parse (bytp) as object
}


