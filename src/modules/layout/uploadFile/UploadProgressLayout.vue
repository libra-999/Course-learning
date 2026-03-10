<script setup lang="ts">
import ProgressUpload from '@/app/components/uploadFile/ProgressUpload.vue'
import { ref } from 'vue'
import type { UploadItem } from '@/modules/types/uploadFile'
import { createUploadFiles, removeFile } from '@/modules/api/uploadFile'
import { ElMessage } from 'element-plus'
import { v4 as uuidV4 } from 'uuid'
import { FileRuleResp } from '@/app/utils/mimeType.ts'

const pictures = ref<UploadItem[]>([])
// validation file type
const validateFile = (file: File) => {
	const getFile = FileRuleResp(file)
	if (getFile.error) {
		ElMessage({
			message: getFile.error,
			type: 'error',
		})
		throw new Error(getFile.error)
	}
}
// upload file
const progressSubmit = async (file: File) => {
	validateFile(file) // check condition before upload
	// create object upload
	const uploadItem: UploadItem = {
		id: uuidV4(),
		name: file.name,
		size: file.size,
		percent: 0,
	}
	pictures.value.push(uploadItem)

	// get item by id
	const getItems = () => pictures.value.find((id) => id.id === uploadItem.id)
	// create fake time loading
	const timer = setInterval(() => {
		const item = getItems()
		if (!item) return
		const current = item.percent
		if (current < 90) {
			const increment = (90 - current) * 0.08
			item.percent = Math.min(90, item.percent + increment)
		}
	}, 50)

	// assign formData to api
	const form = new FormData()
	form.append('file', file) // assign into file
	try {
		const data = await createUploadFiles(form, (percent: number) => {
			const item = getItems()
			if (!item) return
			if (percent > item.percent) item.percent = percent
		})

		clearInterval(timer) // time reset
		const item = getItems()
		if (data && item) {
			item.percent = 100
			ElMessage({
				message: 'Uploaded Successfully',
				type: 'success',
			})
		}else {
			ElMessage({
				message: 'Upload Service have something wrong',
				type: 'error',
			})
			return
		}
	} catch (e) {
		clearInterval(timer)
		const item = getItems()
		if (item) {
			item.percent = 0
		}
		console.log(e)
	}
}
// remove file
const progressRemoveFile = async (fileName: string, id: string) => {
	const actualIndex = pictures.value.findIndex((item) => item.id === id)
	if (actualIndex === -1) return
	try {
		await removeFile(fileName)
		pictures.value.splice(actualIndex, 1) // remove UI
		ElMessage({
			message: 'Deleted',
			type: 'success',
		})
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<div class="text-black w-full">
		<!-- upload with progressing -->
		<div class="m-auto">
			<ProgressUpload
				:pictures="pictures"
				@upload-submit="progressSubmit"
				@remove-image="progressRemoveFile"
			/>
		</div>
	</div>
</template>

<style scoped></style>
