<script setup lang="ts">
import { Delete, UploadFilled } from '@element-plus/icons-vue'

defineProps<{
	fileName?: string
	fileSize?: number
	uploadItem?: number
	fileType?: string
}>()
</script>

<template>
	<div class="mb-5">
		<span class="text-5xl font-bold font-mono"> Upload With Progress</span>
		<el-upload class="mt-5" drag directory multiple>
			<el-icon class="el-icon--upload">
				<UploadFilled />
			</el-icon>
			<p>
				Drop directory here or
				<em class="text-blue-700">click to upload</em>
			</p>
		</el-upload>
	</div>
	<div
		class="font-bold font-sans border border-t-gray-200 border-l-0 border-r-0 border-b-0"
	>
		<p class="font-bold text-xl text-start mt-2 py-5">
			Current upload in progress
		</p>
		<div class="w-full">
			<!-- Uploading File Content -->
			<div class="mb-2 flex justify-between items-center">
				<div class="flex items-center text-start gap-x-3">
					<div>
						<p class="text-sm font-medium text-foreground">
							preline-ui.xls
						</p>
						<p class="text-xs text-muted-foreground-1">7 KB</p>
					</div>
				</div>
				<div class="inline-flex items-center gap-x-2">
					<button type="button" class="relative text-muted-foreground-1 hover:text-foreground focus:outline-hidden focus:text-foreground disabled:opacity-50 disabled:pointer-events-none">
						<el-icon>
							<Delete />
						</el-icon>
						<span class="sr-only">Delete</span>
					</button>
				</div>
			</div>

			<!-- Progress Bar -->
			<div class="flex items-center gap-x-3 whitespace-nowrap">
				<div
					class="flex w-full h-2 bg-gray-300 rounded-full overflow-hidden"
					role="progressbar"
					aria-valuenow="10"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<div
						class="flex flex-col justify-center rounded-full overflow-hidden bg-green-600 text-xs text-primary-foreground text-center whitespace-nowrap transition duration-500"
						style="width: 25%"
					></div>
				</div>
				<div class="w-10 text-end">
					<span class="text-sm text-foreground">25%</span>
				</div>
			</div>

		</div>
	</div>
</template>

<style scoped></style>
