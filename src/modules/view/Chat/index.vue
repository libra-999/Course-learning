<template>
   <div class="min-h-screen">
      <ButtonGlobal class=" absolute top-1 left-1 p-4 text-white" value="" @click="back">
         <template #icon-right>
            <el-icon>
               <ArrowLeftBold />
            </el-icon>
         </template>
      </ButtonGlobal>
      <ChatAI v-model:open-chat="openChat" />
   </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import ChatAI from '@/modules/view/Chat/ChatAI.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@/app/utils/responsive.ts'
import { ref } from 'vue'


const route = useRouter()
const back = () => route.back()
const openChat = ref(false)


</script>
<style scoped></style>