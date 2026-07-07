<template>
   <div class="min-h-screen">
      <ButtonGlobal :class="['fixed mobile text-white', isMobile ?'bottom-1' : 'hidden']" style="border-radius: 50%;" value="" @click="back">
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