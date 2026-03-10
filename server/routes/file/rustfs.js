import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import {  DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { generateSign } from '../../utils/cryptoUtil.js'

dotenv.config()
const router = express.Router()
const mulUpload = multer()
const s3Client = new S3Client({
	region: "us-east-1",
	endpoint: "http://192.168.15.50:9000",
	credentials: {
		// eslint-disable-next-line no-undef
		accessKeyId: process.env.RUSTFS_API_KEY,
		// eslint-disable-next-line no-undef
		secretAccessKey: process.env.RUSTFS_SECRET_KEY,
	},
	forcePathStyle: true
})


router.post("/api/upload", mulUpload.single("file"), async (req , resp) => {
	const file = req.file
	const fileNameHash = generateSign(file.originalname)
	const bucketFile = {
		Bucket: 'hrbucket',
		Key: fileNameHash ,
		Body: file.buffer,
		ContentType: file.mimetype
	}

	try {
		const uploadObject = new PutObjectCommand(bucketFile);
		const upload = await s3Client.send(uploadObject)
		resp.status(200).json(upload)
	}catch (error) {
		resp.status(500).json(error)
	}
})

router.post("/api/delete", async (req , resp) => {
	const removeObject = new DeleteObjectCommand({
		Bucket: 'hrbucket',
		Key: req.body.fileName
	});
	try {
		const remove = await s3Client.send(removeObject)
		resp.status(200).json(remove)
	}catch (error){
		resp.status(500).json(error)
	}
})
export default router;