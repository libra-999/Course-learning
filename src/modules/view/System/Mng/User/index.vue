<template>
   <Loading v-if="loading" />
   <div v-else>
      User layout
   </div>
</template>

<script setup lang="ts">
import Loading from '@/app/components/Loading/Loading.vue';
import { ref } from 'vue';


const loading = ref(false)

</script>

<style scoped lang="scss"></style>