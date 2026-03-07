<script setup lang="ts">
import ProgressUpload from '@/modules/uploadFile/component/ProgressUpload.vue'
import { ref } from 'vue'
import type { UploadItem } from '@/modules/uploadFile/types'
// import UploadWithoutProgress from '@/modules/uploadFile/component/UploadWithoutProgress.vue'

const pictures = ref<UploadItem[]>()
const progressSubmit = async (file: File) => {
	// create object upload
	const uploadItem: UploadItem = {
		name: file.name,
		size: file.size,
		percent: 0,
	}

	pictures.value?.push(uploadItem)
	console.log(pictures)

	const form = new FormData()
	form.append('file', file)
	console.log(form)
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
