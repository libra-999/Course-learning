<template>
   <div class="w-full min-h-screen gap-1 px-3 py-5">
      <div class="w-full">
         <div
             class="mx-auto lg:w-[100%] xl:w-[80%] sm:w-[100%] md:w-[95%] py-10 border-b-[#112a46] border-2 border-r-transparent border-t-transparent border-l-transparent">
            <p class="uppercase font-bold lg:text-center text-start sm:text-start text-sm mb-3">
               {{ t ("MAIN_LAYOUT.title_1") }}
            </p>
            <p class="uppercase lg:text-center text-start sm:text-start text-5xl font-bold">
               {{ t ("MAIN_LAYOUT.title_2") }}🤔
            </p>
            <div class="flex justify-end mt-5">
               <div class="text-white flex justify-center h-10 gap-2  place-items-center">
                  <SwitchLang/>
               </div>
            </div>
         </div>
         <div
             class="lg:w-[100%] xl:w-[80%] md:w-[95%] sm:w-[100%] mx-auto mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-4 overflow-hidden">
            <!-- Test -->
            <Cardbox :title="`${t('MAIN_LAYOUT.TEST.title')}`" :content="`${t('MAIN_LAYOUT.TEST.content')}`"
                     path="/system/test" :icon="DocumentAdd">
            </Cardbox>
            <!-- Book -->
            <Cardbox :title="`${t('MAIN_LAYOUT.BOOK.title')}`" :content="`${t('MAIN_LAYOUT.BOOK.content')}`"
                     path="/system/books"/>
            <!-- Payment -->
            <Cardbox :title="`${t('MAIN_LAYOUT.PAYMENT.title')}`" :content="`${t('MAIN_LAYOUT.PAYMENT.content')}`"
                     path="/system/payment" :icon="DataLine"/>
            <!-- upload with progress -->
            <Cardbox :title="`${t('MAIN_LAYOUT.FILE.title')}`" :content="`${t('MAIN_LAYOUT.FILE.content')}`"
                     path="/system/upload" :icon="UploadFilled"/>
            <!-- Role and Permission Table -->
            <Cardbox :title="`${t('MAIN_LAYOUT.ROLE.title')}`" :content="`${t('MAIN_LAYOUT.ROLE.content')}`"
                     :icon="Avatar" path="/system/table"/>
            <!-- Chat BOT-->
            <Cardbox :title="`${t('MAIN_LAYOUT.BOT.title')}`" :content="`${t('MAIN_LAYOUT.BOT.content')}`"
                     :icon="ChatDotRound" path="/system/bot"/>
            <!-- OCR Card Identity-->
            <Cardbox :title="`${t('MAIN_LAYOUT.OCR_CARD.title')}`" :content="`${t('MAIN_LAYOUT.OCR_CARD.content')}`"
                     :icon="Postcard" path="/system/card-identity"/>
         </div>
      </div>
   </div>
   <Footer/>
</template>
<script setup lang="ts">
import { Avatar, ChatDotRound, DataLine, DocumentAdd, Postcard, UploadFilled } from '@element-plus/icons-vue'
import Cardbox from '@/app/components/Card/Cardbox.vue'
import SwitchLang from '@/app/components/Localization/SwitchLang.vue'
import Footer from '@/modules/view/Footer/index.vue'
import { useI18n } from 'vue-i18n';


const {t} = useI18n ()
</script>

<style lang="scss" scoped>
:deep(.mobile-scan) {
   display: none !important;
}

@media (max-width: 768px) {
   :deep(.mobile-scan) {
      display: block !important;
      margin: auto;
      width: 100%;
   }
}
</style>
