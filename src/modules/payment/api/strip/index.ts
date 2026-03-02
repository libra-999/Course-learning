import axios from 'axios'

export async function stripPayment(){
	const req = await axios.post('http://localhost:8900/stripe/api/strip/payment')
	return req.data
}