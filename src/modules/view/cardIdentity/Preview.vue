<template>
    <div class="max-w-[50%] mx-auto h-full py-5">
        <article class=" font-bold text-5xl mb-5">OCR CARD IDENTITY</article>
        <div class="flex justify-between h-[50%] gap-3 rounded-xl">
            <UploadImage :files="files" :loading="loading" @select-file="selectFile" @remove-file="removeFile"
                @convert-file="handleConvert" />
            <TextShow :image="toText?.image" :card-data="toText.cardInfo" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@/app/utils/message';
import { UploadRuleForm } from '@/app/utils/mimeType';
import { uploadCard } from '@/modules/api/uploadFile';
import type { CardIdentity } from '@/modules/types/ocr';
import TextShow from '@/modules/view/cardIdentity/TextShow.vue';
import UploadImage from '@/modules/view/cardIdentity/UploadImage.vue';
import { ref } from 'vue';

const files = ref<File[]>([]);
const boxMessage = useMessage();
const loading = ref(false);
const toText = ref<{
    image: string
    cardInfo: CardIdentity
}>({
    image: '',
    cardInfo: {
        name: '',
        id: 0,
        gender: '',
        national: '',
        issuedAt: '',
        dob: '',
        signature: ''
    },
});

const selectFile = async (file: File) => {
    // check type file
    const checkType = UploadRuleForm[0];
    if (!checkType?.types.includes(file.type) || checkType.maxSize < file.size) {
        boxMessage.notificationBox('You cannot upload file from other image and make sure image must be below 5MB', 'warning');
        return;
    }
    files.value.push(file);
};

const handleConvert = async () => {
    if (!files.value.length) {
        boxMessage.notificationBox('Please upload at least one image before converting.', 'warning');
        return;
    }

    loading.value = true;
    try {
        for (const file of files.value) {
            const form = new FormData();
            form.append('file', file);

            const res = await uploadCard(form);
            if (res.code === 200) {
                const data = res.data
                toText.value.cardInfo = {
                    name: data.name,
                    gender: data.gender,
                    national: data.national,
                    dob: data.dob,
                    id: data.id,
                    issuedAt: data.period,
                    signature: data.signature
                }
                boxMessage.messageBox('Succeed', 'success');
                return;
            }
        }
    } catch (err: any) {
        boxMessage.messageBox(err.message, 'error');
    } finally {
        loading.value = false;
    }
};

const removeFile = (index: number) => {
    files.value.splice(index, 1);
};
</script>

<style scoped></style>
