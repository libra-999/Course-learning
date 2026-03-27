export interface LoginRequest {
    username: string,
    password: string,
    // is_remember: boolean
}
export interface User {
    id?: string,
    email: string,
    username: string,
    is_online: boolean,
    created_at: string
}

