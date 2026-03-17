import { env } from '@/domain/config/app.environment.js'
import { errorResp } from '@/share/utils/response.js'
import { httpConstant } from '@/domain/constant/httpConstant.js'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { s3File } from '@/share/utils/fileExtension.js'

const ACCESS_KEY = env.RUSTFS_API_KEY ?? ''
const SECRET_KEY = env.RUSTFS_SECRET_KEY ?? ''
const ENDPOINT = env.RUST_ENDPOINT ?? ''
const BUCKET = env.RUST_BUCKET_NAME ?? ''
const s3Connection = s3File();
const client = s3Connection.s3Connection(ENDPOINT,'us-east-1',ACCESS_KEY,SECRET_KEY)

export const fileService = {
	async uploadMultipleFiles(payload: any) {
		if (payload === null) {
			return errorResp(httpConstant.ERROR_BAD_REQUEST.code, "Invalid File", '')
		}
		const uploadToObject = new PutObjectCommand(s3Connection.addObject(payload, BUCKET));
		return await client.send(uploadToObject);
	},
	async deleteFile(fileName: string) {
		if (fileName === null){
			return errorResp(httpConstant.ERROR_BAD_REQUEST.code, "Remove File Failed",'');
		}
		const removeFile = new DeleteObjectCommand(s3Connection.removeObject(fileName,BUCKET));
		return await client.send(removeFile);
	}
}
