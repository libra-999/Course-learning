<template>
    <div class="rounded-xl overflow-hidden  py-7 px-2 min-w-125 min-h-175">
        <div v-if="prop.cardData && prop.cardData" class="text-start">
            <el-card shadow="hover" class="rounded-2xl">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-xl font-semibold">Identity Information</h2>
                        <p class="text-gray-500 text-sm">Extracted from ID card <b>{{ form.id === 0 ? '' : '( ' +form.id + ' )' }}</b></p>
                    </div>
                    <el-tag type="success">OCR Result</el-tag>
                </div>
                <el-form label-position="top" class="flex flex-col gap-2">
                    <div class="flex justify-between">
                        <el-form-item label="Name (English)" class="w-50">
                            <el-input disabled v-model="form.name_en" />
                        </el-form-item>
                        <el-form-item label="Name (Chinese)" class="w-50">
                            <el-input disabled v-model="form.name_ch" />
                        </el-form-item>
                    </div>
                    <div class="flex justify-between">
                        <el-form-item label="Gender" class="w-25">
                            <el-select disabled v-model="form.gender">
                                <el-option label="Male" value="M" />
                                <el-option label="Female" value="F" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Nationality" class="w-25">
                            <el-input disabled v-model="form.national" />
                        </el-form-item>
                        <el-form-item label="Heigth (cm)">
                            <el-input disabled v-model="form.height" />
                        </el-form-item>
                    </div>
                    <div class="flex flex-col justify-between">
                        <el-form-item label="Place of Birth">
                            <el-input disabled v-model="form.height" />
                        </el-form-item>
                        <div class="flex gap-2">
                            <el-form-item label="Date of Birth">
                                <el-date-picker disabled v-model="form.dob" type="date" value-format="YYYY-MM-DD"
                                    class="w-full" />
                            </el-form-item>
                            <el-image :src="`form:image/base64, ${form.signature}`"
                                class="h-[60px] w-[200px] my-auto"></el-image>
                        </div>
                    </div>
                    <div class="flex justify-between gap-2">
                        <el-form-item label="Valid From">
                            <el-date-picker disabled v-model="form.issued_from" type="date" value-format="YYYY-MM-DD"
                                class="w-full" />
                        </el-form-item>
                        <el-form-item label="Valid To">
                            <el-date-picker disabled v-model="form.issued_to" type="date" value-format="YYYY-MM-DD"
                                class="w-full" />
                        </el-form-item>
                    </div>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CardIdentity } from '@/modules/types/ocr';
import { ref, watch } from 'vue';


const prop = defineProps<{
    image?: string,
    cardData: CardIdentity
}>()
const form = ref<any>({
    id: '',
    name_en: '',
    name_ch: '',
    dob: '',
    gender: '',
    national: '',
    issued_to: '',
    issued_from: '',
    specification: '',
    height: 0,
    address: '',
    place_dob: '',
    signature: ''
})

const parseForm = (formData: any) => {

    // custom regex name
    const nameRegex = formData.name.match(/(.*?)\((.*?)\)/)
    form.value.name_en = nameRegex?.[1]?.trim()
    form.value.name_ch = nameRegex?.[2]?.trim()

    // custom regex gender
    form.value.gender = formData.gender?.includes('F') ? 'F' : 'M'
    // custom regex nation
    form.value.national = formData.national?.split('/')[0]
    // custom regex dob
    form.value.dob = formData.dob?.replace(/\./g, '-')
    // custom regex issuedData
    const issued = formData.issuedAt?.split('-')
    form.value.issued_from = issued?.[0]?.replace(/\./g, '-')
    form.value.issued_to = issued?.[1]?.replace(/\./g, '-')
}

watch(
    () => prop.cardData,
    (i) => {
        if (i != null) {
            parseForm(i)
        }
    },
    { immediate: true }
)
</script>

<style scoped></style>