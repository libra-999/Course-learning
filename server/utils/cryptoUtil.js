import crypto from 'crypto'

export function generateSign(payload){
	// eslint-disable-next-line no-undef
	const data = Buffer.from(JSON.stringify(payload),'utf-8').toString('base64');
	return crypto.createHash('md5').update(data).digest('hex'); // hash the payload
}
export function generateHmac(payload, apiKey){
	// const data = Buffer.from(JSON.stringify(payload),'utf-8').toString('base64');
	return crypto.createHmac('sha512',apiKey).update(payload).digest('base64')
}
