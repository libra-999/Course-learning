import axios from 'axios'
import type { Book, Response } from '../types'

const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyB1X4uXFIal2Z5NrCaehGOBXR19rUZqJAw'

export async function getBooks(
	q: string,
	page: number,
	size: number,
): Promise<Response<Book>> {
	const response = await axios.get(
		`${API_URL}?q=${q}&key=${API_KEY}&startIndex=${page}&maxResults=${size}`,
	)
	return response.data
}
export async function viewBook(id: number | string){
	const response = await axios.get(`${API_URL}/${id}`, {
		params: {
			key : API_KEY
		}
	})
	return response.data
}
