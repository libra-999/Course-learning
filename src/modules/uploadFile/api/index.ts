import axios from 'axios'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_URL

export async function createUploadFiles(
	files: FormData,
	onProgress: (percent: number) => void,
) {
	const upload = await axios.post(`${SERVER_ADDRESS}/file/api/upload`, files, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		onUploadProgress: (event) => {
			if (!event.total) return
			const percent = Math.round((event.loaded * 100) / event.total)
			onProgress(percent)
		},
	})
	return upload.data
}
