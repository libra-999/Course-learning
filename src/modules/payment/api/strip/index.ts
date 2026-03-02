import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
export async function stripPayment(){
	const req = await axios.post(`${SERVER_URL}/stripe/api/strip/payment`)
	return req.data
}

