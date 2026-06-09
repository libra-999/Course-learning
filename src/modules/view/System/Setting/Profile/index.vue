<template>
    <Loading v-if="loading"/>
    <div v-else>
        Profile layout
    </div>
</template>

<script setup lang="ts">
import Loading from '@/app/components/Loading/Loading.vue';
import { ref } from 'vue';

const loading = ref(false)
</script>

<style scoped>

</style>