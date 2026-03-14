import express, { type Router } from 'express'
import multer from 'multer'
import { generateSign } from '@/share/utils/cryptoUtil.js'
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '@/domain/config/app.environment.js'
import { errorResp } from '@/share/utils/response.js'
import { httpConstant } from '@/domain/constant/httpConstant.js'

const router: Router = express.Router()
const mulUpload = multer()
const ACCESS_KEY = env.RUSTFS_API_KEY
const SECRET_KEY = env.RUSTFS_SECRET_KEY
const ENDPOINT = env.RUST_ENDPOINT

const s3Client = new S3Client({
	region: 'us-east-1',
	endpoint: ENDPOINT,
	credentials: {
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_KEY
	},
	forcePathStyle: true,
})


router.post('/api/upload', mulUpload.single('file'), async (req, resp) => {
	const file = req.file
	if(!file){
		return resp.json(errorResp(httpConstant.ERROR_BAD_REQUEST.code, "Invalid File", null))
	}
	const fileNameHash = generateSign(file.buffer) // even same file name but different content
	const bucketFile = {
		Bucket: 'hrbucket',
		Key: fileNameHash,
		Body: file.buffer,
		ContentType: file.mimetype,
	}

	try {
		const uploadObject = new PutObjectCommand(bucketFile)
		const upload = await s3Client.send(uploadObject)
		return resp.status(200).json(upload)
	} catch (error) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})

router.post('/api/delete', async (req, resp) => {
	const removeObject = new DeleteObjectCommand({
		Bucket: 'hrbucket',
		Key: req.body.fileName,
	})
	try {
		const remove = await s3Client.send(removeObject)
		return resp.status(200).json(remove)
	} catch (error) {
		return resp.json(errorResp(error.status, error.message, error.code))
	}
})
export default router
