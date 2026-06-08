export interface LoginRequest {
   username: string
   password: string
   isRemember: any
}

export interface User {
   id?: string
   email: string
   username: string
   is_online: boolean
   created_at: string
}

export interface QRCodeData {
   qrCountDown?: any
   qrCodeExpired?: any
   qrToken: string
   qrCodeImageUrl?: string
   qrCodeStatus?: string
   qrInfoUser?: any
}
