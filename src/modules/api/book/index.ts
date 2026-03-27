import type { Book, Response } from '../../types/book'
import apiRequest from '@/app/utils/request.ts'

export async function getBooks(
	q: string,
	page: number,
	size: number,
): Promise<Response<Book>> {
	const response = await apiRequest.get('/api/books', {
		params: {
			q: q,
			page: page,
			size: size,
		},
	})
	return response.data.data
}

export async function viewBook(id: number | string) {
	const response = await apiRequest.get(`/api/books/${id}`)
	return response.data.data
}
