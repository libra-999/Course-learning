<template>
   <div class="flex flex-col mx-auto h-full xl:max-w-[50%]  py-5 mobile">
      <ButtonGlobal class=" absolute top-1 left-1 p-4 text-white" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold/>
            </el-icon>
         </template>
      </ButtonGlobal>
      <article class=" font-bold text-5xl mb-5">{{ t('UPLOAD.ocr.title') }}</article>
      <div class="flex justify-between h-[50%] gap-3 rounded-xl mobile__object">
         <UploadImage :files="files" :loading="loading" @select-file="selectFile" @remove-file="removeFile"
                      @convert-file="handleConvert" :country="country" @select-country="selectCountry"/>
         <TextShow v-if="toText.ocr_job_id" :image="toText?.image"
                   :ocr_job_estimate_time="toText?.ocr_job_estimate_time" :ocr_job_id="toText?.ocr_job_id"/>
      </div>
   </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import { useMessage } from '@/app/utils/message';
import { UploadRuleForm } from '@/app/utils/mimeType';
import { uploadCard } from '@/modules/api/uploadFile';
import TextShow from '@/modules/view/CardIdentity/TextShow.vue';
import UploadImage from '@/modules/view/CardIdentity/UploadImage.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';


const { t } = useI18n()
const route = useRouter ()
const country = ref ("CN")
const files = ref<File[]> ([]);
const boxMessage = useMessage ();
const loading = ref (false);
const toText = ref<{ image: string, ocr_job_id: string, ocr_job_estimate_time: any }> ({
   ocr_job_id: '',
   ocr_job_estimate_time: 0,
   image: '',
});

const back = () => route.back ()

const selectFile = async (file: File) => {
   // check type file
   const checkType = UploadRuleForm[0];
   if (!checkType?.types.includes (file.type) || checkType.maxSize < file.size) {
      boxMessage.notificationBox ('You cannot upload file from other image and make sure image must be below 5MB', 'warning');
      return;
   }
   files.value.push (file);
};

const selectCountry = (value: string) => {
   country.value = value
}
const handleConvert = async () => {
   if (!files.value.length) {
      boxMessage.notificationBox ('Please upload at least one image before converting.', 'warning');
      return;
   }

   loading.value = true;
   try {
      for (const file of files.value) {
         const form = new FormData ();
         form.append ('country', country.value)
         form.append ('file', file);
         const res = await uploadCard (form);
         if (res.code === 200) {
            const data = res.data
            toText.value.ocr_job_id = data.jobId
            toText.value.ocr_job_estimate_time = data.secondEstimateTime
            boxMessage.messageBox ('Succeed', 'success');
            return;
         }
      }
   } catch (err: any) {
      boxMessage.messageBox (err.message, 'error');
   } finally {
      loading.value = false;
   }
};

const removeFile = (index: number) => {
   files.value.splice (index, 1);
   // reset new ocr_job_id
   toText.value = {
      ocr_job_id: '',
      ocr_job_estimate_time: 0,
      image: ''
   }
};
</script>

<style lang="scss" scoped>

@media (max-width: $screen-sm) {
   .mobile {
      width: 100%;
      height: auto;

      &__object {
         gap: .2rem;
         display: flex;
         flex-direction: column;
      }
   }
}

@media (min-width: $screen-sm) and (max-width: $screen-lg) {
   .mobile {
      width: 100%;
      height: auto;

      &__object {
         gap: .2rem;
         display: flex;
         flex-direction: column;
      }
   }
}
</style>
