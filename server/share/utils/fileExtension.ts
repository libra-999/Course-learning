import { type DeleteObjectCommandInput, type PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { generateSign } from '@/share/utils/cryptoUtil.js'

export const s3File = () => {
	function s3Connection(endpoint: string, region: string, accessKey: string, secretKey: string) {
		return new S3Client({
			region: region,
			endpoint: endpoint,
			credentials: {
				accessKeyId: accessKey,
				secretAccessKey: secretKey,
			},
			forcePathStyle: true,
		})
	}
	function addObject(file: any, bucket: string): PutObjectCommandInput {
		return {
			Bucket: bucket,
			Key: generateSign(file.buffer),
			Body: file.buffer,
			ContentType: file.mimetype,
		}
	}
	function removeObject(fileName: string, bucket: string): DeleteObjectCommandInput {
		return {
			Bucket: bucket,
			Key: fileName,
		}
	}
	return {
		s3Connection,
		addObject,
		removeObject
	}
}
