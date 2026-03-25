import type { Book, Response } from '../../types/book'
import apiRequest from '@/app/utils/request.ts'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_URL
const VERSION = import.meta.env.VITE_SERVER_VERSION

export async function getBooks(q: string,page: number,size: number): Promise<Response<Book>> {
	const response = await apiRequest.get(`${SERVER_ADDRESS}/api/${VERSION}/books`, {
		params: {
			q: q,
			page: page,
			size: size
		}
	})
	return response.data.data
}

export async function viewBook(id: number | string) {
	const response = await apiRequest.get(`${SERVER_ADDRESS}/api/${VERSION}/books/${id}`)
	return response.data.data
}
