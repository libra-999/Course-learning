import crypto from 'crypto'

export function generateSign(payload: any){
	const data = Buffer.from(JSON.stringify(payload),'utf-8').toString('base64');
	return crypto.createHash('md5').update(data).digest('hex'); // hash the payload
}
export function generateHmac(payload: any, apiKey: any){
	return crypto.createHmac('sha512',apiKey).update(payload).digest('base64')
}
export function convertToBase64Arr(items: any){
	return Buffer.from(JSON.stringify(items)).toString('base64')
}