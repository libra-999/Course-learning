<template>
   <div>
      <ButtonGlobal v-if="!openChat" :class="['fixed left-1 p-4 text-white', isMobile ? 'bottom-2' : 'top-2']" style="border-radius: 50%" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold/>
            </el-icon>
         </template>
      </ButtonGlobal>
      <ChatAI v-model:open-chat="openChat"/>
   </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import ChatAI from '@/modules/view/Chat/ChatAI.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@/app/utils/responsive.ts'
import { ref } from 'vue'


const route = useRouter ()
const back = () => route.back ()
const openChat  = ref(false)


</script>
<style scoped>

</style>