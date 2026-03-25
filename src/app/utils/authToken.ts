export const isTokenValid = (token: string): boolean => {
	if (!token) return false
	return token.split('.').length === 3
}

export const isLogout = () => {
	sessionStorage.removeItem('userLogin')
	document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}
