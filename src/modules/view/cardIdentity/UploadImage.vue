<template>
    <div class="border border-gray-100 rounded-xl overflow-hidden p-2 min-w-75 min-h-175">
        <el-upload class="mt-5" drag multiple :limit="1" :show-file-list="false" :on-exceed="handleExceed"
            :http-request="handleSelectFile">
            <el-icon class="el-icon--upload">
                <UploadFilled />
            </el-icon>
            <p>
                Drop image here<br/>
                <span class="text-gray-300 my-2 text-sm">SUPPORT ONLY FORIEGNER CARD , KHMER'S CARD STILL PROCESSING </span>
            </p>
        </el-upload>
        <div class="w-full h-auto my-5 overflow-hidden">
            <button
                class="py-3 h-12.5 text-center w-full bg-blue-400 rounded-sm cursor-pointer text-white disabled:opacity-70 disabled:cursor-not-allowed"
                :disabled="prop.loading" @click.prevent="handleConvert">
                <template v-if="prop.loading">
                    <div class="button-loading"></div>
                </template>
                <span v-else>Convert</span>
            </button>
        </div>
        <div class="p-2 mt-2">
            <p class="text-start text-gray-300">Process Image</p>
            <div v-for="(image, index) in imagePreviewUrls" :key="`${image}-${index}`"
                class="relative my-2 border w-full h-full border-gray-200 rounded-lg overflow-hidden">
                <img class="w-full h-37.5 object-contain" alt="preview-image" :src="image" />
                <ButtonGlobal value=""
                    class="h-1.25 w-0.5 absolute bg-white top-2 -right-3 cursor-pointer hover:bg-white"
                    @click="handleRemove(index)">
                    <template #icon-left>
                        <el-icon>
                            <Close />
                        </el-icon>
                    </template>
                </ButtonGlobal>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import { useMessage } from '@/app/utils/message';
import { Close, UploadFilled } from '@element-plus/icons-vue';
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const prop = defineProps<{
    files: File[]
    loading: boolean
}>();

const emit = defineEmits<{
    (event: 'selectFile', file: File): void
    (event: 'removeFile', index: number): void
    (event: 'convertFile'): void
}>();

const boxMessage = useMessage();
const previewUrls = ref(new Map<string, string>());
const getFileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

const imagePreviewUrls = computed(() =>
    prop.files
        .map((file) => previewUrls.value.get(getFileKey(file)))
        .filter((url): url is string => Boolean(url))
);

// uploading file
const handleSelectFile = (file: any) => {
    emit('selectFile', file.file as File);
};

const handleConvert = () => {
    emit('convertFile');
};

// just remove from ui
const handleRemove = (index: number) => {
    emit('removeFile', index);
};

// prevent have more than 2 files
const handleExceed = () => {
    boxMessage.notificationBox('You can upload a maximum of 1 files.', 'warning');
};

onBeforeUnmount(() => {
    previewUrls.value.forEach((url) => URL.revokeObjectURL(url));
    previewUrls.value.clear();
});

watch(
    () => prop.files.map(getFileKey),
    (nextKeys) => {
        const nextSet = new Set(nextKeys);
        for (const [key, url] of previewUrls.value.entries()) {
            if (!nextSet.has(key)) {
                URL.revokeObjectURL(url);
                previewUrls.value.delete(key);
            }
        }

        prop.files.forEach((file) => {
            const key = getFileKey(file);
            if (!previewUrls.value.has(key)) {
                previewUrls.value.set(key, URL.createObjectURL(file));
            }
        });
    },
    { immediate: true }
);
</script>

<style scoped>
.button-loading {
    width: 25px;
    margin: 0 auto;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid white;
    animation:
        l20-1 0.8s infinite linear alternate,
        l20-2 1.6s infinite linear;
}

@keyframes l20-1 {
    0% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)
    }

    12.5% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
    }

    62.5% {
        clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%)
    }
}

@keyframes l20-2 {
    0% {
        transform: scaleY(1) rotate(0deg)
    }

    49.99% {
        transform: scaleY(1) rotate(135deg)
    }

    50% {
        transform: scaleY(-1) rotate(0deg)
    }

    100% {
        transform: scaleY(-1) rotate(-135deg)
    }
}
</style>
