<template>
   <div class="mb-5 color-text-theme ">
      <span class="text-5xl font-bold font-mono"> Upload With Progress</span>
      <el-upload
          class="mt-5 custom-upload"
          drag
          multiple
          :show-file-list="false"
          :http-request="handleEmit"
      >
         <el-icon class="el-icon--upload">
            <UploadFilled/>
         </el-icon>
         <p>
            Drop directory here or
            <em class="font-bold">click to upload</em>
         </p>
      </el-upload>
   </div>
   <div class="font-sans border color-text-theme  border-t-gray-200 border-l-0 border-r-0 border-b-0">
      <p class="font-bold text-xl text-start mt-2 py-5">
         Current upload in progress
      </p>
      <div
          v-if="!prop.pictures?.length"
          class="text-gray-300 duration-200 flex flex-col justify-center italic font-normal rounded-sm py-3 px-3 w-full bg-gray-100 text-center"
          style="background: var(--bg-color-blue-2)"
      >
			<span>
				<el-icon size="40">
					<Folder/>
				</el-icon>
			</span>
         <span>Empty Files</span>
      </div>
      <div v-else class="w-full">
         <!-- Progress Bar -->
         <div
             class="w-full justify-center gap-x-3 whitespace-nowrap my-5"
             v-for="file in prop.pictures"
             :key="file.id"
         >
            <p class="text-start italic overflow-hidden w-full">
               {{ file.name }}
            </p>
            <!-- progress -->
            <div class="flex justify-between items-center gap-1 w-full">
               <div
                   class="bg-gray-300 w-[90%] duration-200 transition-all h-2 rounded-2xl"
               >
                  <div
                      class="bg-green-500 duration-200 transition-all h-2 rounded-2xl"
                      :style="{ width: file.percent + '%' }"
                  />
               </div>
               <span
                   class="cursor-pointer w-[5%] duration-200 transition-all text-center"
                   @click="handleDeleteImage(file.name, file.id)"
               >
						<el-icon size="15" style="font-weight: bolder"
                  ><Close/> </el-icon
                  ></span>
            </div>
            <p class="text-end w-full">{{ file.percent }}%</p>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { Close, Folder, UploadFilled } from '@element-plus/icons-vue'
import type { UploadItem } from '@/modules/types/uploadFile'


const prop = defineProps<{
   pictures: UploadItem[]
}> ()
const emit = defineEmits (['uploadSubmit', 'removeImage'])
const handleEmit = (file: any) => {
   emit ('uploadSubmit', file.file)
}
const handleDeleteImage = (fileName: string, index: string) => {
   emit ('removeImage', fileName, index)
}
</script>
<style scoped>
:deep(.custom-upload .el-upload-dragger) {
   border: 1px dashed #213547;
   background: var(--bg-color-blue-2);
}

.color-text-theme {
   color: var(--text-color);
}
</style>
