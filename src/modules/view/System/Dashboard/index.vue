<template>
   <Loading v-if="loading" />
   <div v-else>
      Dashboard Layout
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Loading from '@/app/components/Loading/Loading.vue';


const loading = ref(false)
</script>


<style scoped lang="scss"></style>