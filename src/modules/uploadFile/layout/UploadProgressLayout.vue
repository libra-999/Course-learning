<script setup lang="ts">
import ProgressUpload from '@/modules/uploadFile/component/ProgressUpload.vue'
import {  ref } from 'vue'
import type { UploadItem } from '@/modules/uploadFile/types'
import { createUploadFiles } from '@/modules/uploadFile/api'
import { ElMessage } from 'element-plus'

const pictures = ref<UploadItem[]>([])
const progressSubmit = async (file: File) => {
	// create object upload
	const uploadItem: UploadItem = {
		name: file.name,
		size: file.size,
		percent: 0,
	}
	pictures.value.push(uploadItem)
	const index = pictures.value.length - 1 // matuate through reactive arr

	const timer = setInterval(() => {
		const current = pictures.value[index]?.percent ?? 0
		if (current < 90) {
			const increment = (90 - current) * 0.08
			if (pictures.value[index]) {
				pictures.value[index].percent = Math.min(90, current + increment)
			}
		}
	}, 50)

	const form = new FormData()
	form.append('file', file) // assign into file

	try {
		const data = await createUploadFiles(form, (percent: number) => {
			if (percent > (pictures.value[index]?.percent ?? 0)) {
				if (pictures.value[index]) {
					pictures.value[index].percent = percent
				}
			}
		})
		clearInterval(timer)
		if (data && pictures.value[index]) {
			pictures.value[index].percent = 100
			ElMessage({
				message: 'upload successfully',
				type: 'success',
			})
		}

	}catch (e){
		clearInterval(timer)
		if (pictures.value[index]) {
			pictures.value[index].percent = 0
		}
		console.log(e)
	}
}
</script>

<template>
	<div class="text-black w-full">
		<!-- upload with progressing -->
		<div class="m-auto">
			<ProgressUpload :pictures="pictures" @upload-submit="progressSubmit" />
		</div>
	</div>
</template>

<style scoped></style>
