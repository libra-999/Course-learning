export function useHmac() {
	async function hmacBase64(value: string, apiKey: string) {
		const encoder = new TextEncoder()
		const data = encoder.encode(apiKey)
		const msgData = encoder.encode(value)

		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			data,
			{ name: 'HMAC', hash: 'SHA-512' },
			false,
			['sign'],
		)
		const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
		return btoa(String.fromCharCode(...new Uint8Array(signature)))
	}

	return {
		hmacBase64,
	}
}
