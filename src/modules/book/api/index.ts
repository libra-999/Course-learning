import type { Book, Response } from '../types'
import apiRequest from '@/app/utils/request.ts'

const SERVER_ADDRESS = import.meta.env.VITE_BOOK_SERVER_ADDRESS
const API_KEY = import.meta.env.VITE_BOOK_API_KEY

export async function getBooks(
	q: string,
	page: number,
	size: number,
): Promise<Response<Book>> {
	const response = await apiRequest.get(
		`${SERVER_ADDRESS}?q=${q}&key=${API_KEY}&startIndex=${page}&maxResults=${size}`,
	)
	return response.data
}

export async function viewBook(id: number | string) {
	const response = await apiRequest.get(`${SERVER_ADDRESS}/${id}`, {
		params: {
			key: API_KEY,
		},
	})
	return response.data
}
