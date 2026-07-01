<template>
   <div class="min-h-screen">
      <ButtonGlobal class=" absolute top-2 mobile right-1 text-white" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold />
            </el-icon>
         </template>
      </ButtonGlobal>
      <Role />
   </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import Role from '@/modules/view/Table/Role/Role.vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@/app/utils/responsive.ts'
import { ArrowLeftBold } from '@element-plus/icons-vue'


const route = useRouter()
const back = () => route.back()
</script>

<style lang="scss" scoped></style>