import apiRequest from '@/app/utils/request'
import axios from 'axios'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_URL
const VERSION = import.meta.env.VITE_SERVER_VERSION

export async function createUploadFiles(
	files: FormData,
	onProgress: (percent: number) => void,
) {
	const upload = await apiRequest.post(`${SERVER_ADDRESS}/api/${VERSION}/file/upload`, files, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		onUploadProgress: (event) => {
			if (!event.total) return
			const percent = Math.round((event.loaded * 100) / event.total) // decimal output
			onProgress(percent)
		},
	})
	return upload.data.data
}

export async function removeFile(fileName: string) {
	const remove = await apiRequest.post(`${SERVER_ADDRESS}/api/${VERSION}/file/delete`, {
		fileName: fileName, // no object container , so it is raw body
	})
	return remove.data.data
}
