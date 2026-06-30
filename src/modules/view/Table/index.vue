<template>
   <div>
      <ButtonGlobal :class="['fixed z-10 text-white', isMobile ? 'bottom-2 left-1': 'top-2  right-1']" style="border-radius: 50%" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold/>
            </el-icon>
         </template>
      </ButtonGlobal>
      <Role/>
   </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import Role from '@/modules/view/Table/Role/Role.vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@/app/utils/responsive.ts'
import { ArrowLeftBold } from '@element-plus/icons-vue'


const route = useRouter ()
const back = () => route.back()
</script>

<style lang="scss" scoped>
</style>