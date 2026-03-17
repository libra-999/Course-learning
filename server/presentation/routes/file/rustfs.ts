import express, { type Router } from 'express'
import multer from 'multer'
import { errorResp } from '@/share/utils/response.js'
import { fileService } from '@/domain/service/file.service.js'

const router: Router = express.Router()
const mulUpload = multer()


router.post('/api/upload', mulUpload.single('file'), async (req, resp) => {
	const file = req.file
	try {
		const upload = await fileService.uploadMultipleFiles(file)
		return resp.json(upload)
	} catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

router.post('/api/delete', async (req, resp) => {
	const file = req.body
	try {
		const remove = await fileService.deleteFile(file.fileName)
		return resp.json(remove)
	} catch (error: any) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})
export default router
