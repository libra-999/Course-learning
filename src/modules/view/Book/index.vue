<template>
   <div class="book-layout flex place-items-center px-2 py-4">
      <ButtonGlobal class=" absolute top-1 left-1 p-4 text-white" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold />
            </el-icon>
         </template>
      </ButtonGlobal>
      <BookShow />
   </div>
</template>
<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import BookShow from '@/modules/view/Book/BookShow.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@/app/utils/responsive.ts'


const router = useRouter()
const back = () => {
   router.back()
}
</script>
<style lang="scss" scoped>
.book-layout {
   color: var(--text-color);
   overflow: hidden;
   min-height: 100vh;
}
</style>