<template>
    <div class="border border-gray-100  rounded-xl overflow-hidden  py-5 px-2 min-w-[500px] min-h-[700px]">
        <p class="font-bold text-2xl uppercase">ITT</p>
        <div v-if="prop.cardData && prop.cardData.id" class="text-start">
            <p>ID: <b>{{ prop.cardData.id }}</b></p>
            <p>Name: <b>{{ prop.cardData.name }}</b></p>
            <p>Gender: <b>{{ prop.cardData.gender }}</b></p>
            <p>National: <b>{{ prop.cardData.national }}</b></p>
            <p>Date of Birth: <b>{{ prop.cardData.dob }}</b></p>
            <p>Issued At: <b>{{ prop.cardData.issuedAt }}</b></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CardIdentity } from '@/modules/types/ocr';


const prop = defineProps<{
    image?: string,
    cardData: CardIdentity
}>()
</script>

<style scoped></style>