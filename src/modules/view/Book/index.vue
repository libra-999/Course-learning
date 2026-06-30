<template>
   <div class="book-layout h-full flex place-items-center px-2 py-4">
      <ButtonGlobal :class="[' fixed z-10 left-1 p-4 text-white', isMobile ? 'bottom-2': 'top-2']" style="border-radius: 50%" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold/>
            </el-icon>
         </template>
      </ButtonGlobal>
      <BookShow/>
   </div>
</template>
<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import BookShow from '@/modules/view/Book/BookShow.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@/app/utils/responsive.ts'


const router = useRouter ()
const back = () => {
   router.back ()
}
</script>
<style lang="scss" scoped>
.book-layout {
   color: var(--text-color);
   overflow: hidden;
}
</style>