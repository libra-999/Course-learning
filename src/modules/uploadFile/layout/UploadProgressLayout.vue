<script setup lang="ts">
import ProgressUpload from '@/modules/uploadFile/component/ProgressUpload.vue'
import UploadWithoutProgress from '@/modules/uploadFile/component/UploadWithoutProgress.vue'
</script>

<template>
	<div class="text-black w-full">

		<!-- upload with progressing -->
		<div class="m-auto">
			<ProgressUpload />
		</div>
		<!-- upload without progressing -->
		<div class="m-auto">
			<UploadWithoutProgress/>
		</div>

	</div>
</template>

<style scoped></style>
