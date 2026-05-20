<template>
    <div class="rounded-xl overflow-hidden  py-7 px-2 min-w-75 min-h-175">
        <div v-if="form" class="text-start">
            <el-card shadow="hover" class="rounded-2xl">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-xl font-semibold">Identity Information</h2>
                        <p class="text-gray-500 text-sm">ID card <b>{{ form.id === 0 ? '' : '( ' +form.id + ' )' }}</b></p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <el-tag type="success">OCR Result</el-tag>
                        <el-tag type="warning">  Estimate time : ~ {{ estimateCounter }}s / {{ prop.ocr_job_estimate_time }}s</el-tag>    
                    </div>
                </div>
                <el-form label-position="top" class="flex flex-col gap-2">
                    <div class="mobile flex justify-between">
                        <el-form-item label="Name (English)" class="w-50">
                            <el-input disabled v-model="form.name_en" />
                        </el-form-item>
                        <el-form-item label="Name (Chinese)" class="w-50">
                            <el-input disabled v-model="form.name_ch" />
                        </el-form-item>
                    </div>
                    <div class=" mobile flex justify-between">
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
                    <div class=" mobile flex flex-col justify-between">
                        <el-form-item label="Place of Birth">
                            <el-input disabled v-model="form.place_dob" />
                        </el-form-item>
                        <div class="flex gap-2">
                            <el-form-item label="Date of Birth">
                                <el-input disabled v-model="form.dob"
                                    class="w-full" />
                            </el-form-item>
                            <el-image :src="`form:image/base64, ${form.signature}`"
                                class="h-[60px] w-[200px] my-auto"></el-image>
                        </div>
                    </div>
                    <div class="mobile flex justify-between gap-2">
                        <el-form-item label="Valid From">
                            <el-input disabled v-model="form.issued_from" 
                                class="w-full" />
                        </el-form-item>
                        <el-form-item label="Valid To">
                            <el-input disabled v-model="form.issued_to"
                                class="w-full" />
                        </el-form-item>
                    </div>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@/app/utils/message';
import { ocrData } from '@/modules/api/uploadFile';
import { onMounted, onUnmounted, ref } from 'vue';


const prop = defineProps<{
    image?: string,
    ocr_job_id: any,
    ocr_job_estimate_time:  any,
}>()
const estimateCounter = ref(0)

let checkEstimatesTime : ReturnType<typeof setInterval> 
let estimateTimer: ReturnType<typeof setInterval> | null = null

const startEstimateCounter = () => {
  estimateCounter.value = 0
  estimateTimer = setInterval(() => {
    if(estimateCounter.value >= 120) // 2mins
    {
        clearInterval(estimateTimer!)
        return boxMessage.messageBox("This process is taking long time,  please upload image again with high resolution","error")
    }
    estimateCounter.value++
  }, 1000)
}

const boxMessage = useMessage();
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
    form.value.name_en = formData.nameEN ?? ''
    form.value.name_ch = formData.nameCH ?? ''

    // custom regex gender
    form.value.gender = formData.gender?.includes('F') ? 'F' : 'M'
    // custom regex nation
    form.value.national = formData.national?.split('/')[0]
    
    form.value.dob = formData.dob 
    const [startDate , endDate] = formData.period.split(" ")
    form.value.issued_from = startDate
    form.value.issued_to = endDate

    form.value.id = formData.id
}

const getOCRData = async (ocr_job_id: any)=>{
    const res = await ocrData(ocr_job_id);
    return res.data
}

const checkStatusOCRData = async ()=>{
    const value = await getOCRData(prop.ocr_job_id)
    if(value.jobState  === "active")  return
    if(value.jobState === "failed") {
        if(checkEstimatesTime) clearInterval(checkEstimatesTime)
        return boxMessage.notificationBox("Cannot load process data","error")
    }
    if (value.jobState  === "completed"){
        if(checkEstimatesTime) clearInterval(checkEstimatesTime)
        clearInterval(estimateTimer!)
        estimateTimer = null

        const data = value.jobValue
        if(data?.status){
            return boxMessage.notificationBox(data.cause + ", Please upload image again with high resolution","error")
        }

        parseForm(value.jobValue)
    }
}
onMounted(()=> {
    if(!prop.ocr_job_id) return

    startEstimateCounter()
    checkStatusOCRData()
    checkEstimatesTime =  setInterval(checkStatusOCRData, 2000)
})

onUnmounted(()=> {
    if(checkEstimatesTime) clearInterval(checkEstimatesTime)
    if(estimateTimer) clearInterval(estimateTimer)
})


</script>

<style scoped lang="scss">
@media screen and (max-width:$screen-md) {
   .mobile {
     display: flex;
     flex-direction: column;
        ::v-deep(.el-form-item){
            width: 100%;
        }
   }
}
</style>