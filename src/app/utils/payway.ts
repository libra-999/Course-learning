export function loadPayway() {
	return new Promise((resolve, reject) => {
		if (window.AbaPayway) return resolve(window.AbaPayway)
		const script = document.createElement('script')
		script.src = 'https://checkout.payway.com.kh/plugins/checkout2-0.js' // issue 
		script.onload = () => {
			if (window.AbaPayway) resolve(window.AbaPayway)
			else reject(new Error('Payway plugin did not initialize'))
		}
		script.onerror = () => reject(new Error('Failed to load Payway plugin'))
		document.body.appendChild(script)
	})
}
