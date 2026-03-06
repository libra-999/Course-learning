import { encrypt } from '@/app/utils/hash.ts'

export const isLogin = (isRemember: boolean, data: any) => {
	const expireDateSession = new Date()
	let cookie = 'auth=true; path=/'
	if (isRemember) {
		// expire auth in 30days
		expireDateSession.setDate(expireDateSession.getDate() + 30)
		cookie += `; expires=${expireDateSession.toUTCString()}`

		// plugin to cookie
		document.cookie = cookie
		localStorage.setItem('userLogin', encrypt(data))
		return
	} else {
		document.cookie = cookie
		localStorage.setItem('userLogin', encrypt(data))
		return
	}
}

export const isLogout = () => {
	const now = new Date()
	localStorage.removeItem('userLogin')
	document.cookie = `auth=; expires=\`${now.toString()}\`; path=/`
}
