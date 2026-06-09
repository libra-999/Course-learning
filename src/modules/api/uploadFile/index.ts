import apiRequest from '@/app/utils/request'

export async function createUploadFiles(
	files: FormData,
	onProgress: (percent: number) => void,
) {
	const upload = await apiRequest.post('/api/file/upload', files, {
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

export async function removeFile(fileName: string): Promise<any> {
	const remove = await apiRequest.post('/api/file/delete', {
		fileName: fileName, // no object container , so it is raw body
	})
	return remove.data.data
}

export async function uploadCard(files: FormData): Promise<any> {
	const upload = await apiRequest.post('/api/ocr/card',files, {
		headers: {
			'Content-Type': 'multipart/form-data',
		}
	})
	return upload.data
}

export async function ocrData (ocr_id_uuid: string) : Promise<any> {
	const ocrData = await apiRequest.get(`/api/ocr/card/${ocr_id_uuid}`)
	return ocrData.data
}