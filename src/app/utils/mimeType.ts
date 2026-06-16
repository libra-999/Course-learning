/* file validation */
import type { UploadRule } from '@/modules/types/uploadFile'

export type UploadErrorResp = {
	error?: string // easy to apply with ElMessage
}

export const UploadRuleForm: UploadRule[] = [
	{
		label: 'image',
		types: [
			'image/png',
			'image/jpg',
			'image/jpeg',
			'image/svg+xml',
			'image/webp',
		],
		minSize: 10 * 1024,
		maxSize: 5 * 1024 * 1024,
	},
	{
		label: 'document',
		minSize: 5 * 1024,
		maxSize: 100 * 1024 * 1024,
		types: [
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.ms-wpl',
			'application/msword',
			'text/rtf',
		],
	},
	{
		label: 'pdf',
		minSize: 10 * 1024,
		maxSize: 70 * 1024 * 1024,
		types: ['application/pdf'],
	},
	{
		label: 'zip',
		minSize: 10 * 1024,
		maxSize: 30 * 1024 * 1024,
		types: ['application/gzip'],
	},
]

export const FileRuleResp = (file: File): UploadErrorResp => {
	const checkFileType = UploadRuleForm.find((item) =>
		item.types.includes(file.type.toLowerCase()),
	)
	/* condition type of mime */
	if (!checkFileType) {
		return {
			error: 'Unsupported type of files!',
		}
	}
	/* condition filesize minimum */
	if (checkFileType.minSize && file.size < checkFileType.minSize) {
		return {
			error: `File is too small, Please upload at least ${Math.round(checkFileType.minSize / 1024)}KB`,
		}
	}
	/* condition filesize maximum */
	if (checkFileType.maxSize < file.size) {
		return {
			error: `File is too large , Please upload with below ${Math.round(checkFileType.maxSize) / (1024 * 1024)}MB`,
		}
	}
	return { error: '' }
}
