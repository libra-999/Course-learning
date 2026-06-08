<template>
   <div
       class="w-full h-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col justify-between place-items-center gap-1 sm:gap-3">
      <div class="xl:w-[80%] 2xl:w-[80%] h-50% w-full">
         <img class="bg-none w-full xl:h-full 2xl:w-full h-full" :src="img" alt="Empty Image"/>
      </div>
      <div class="text-start flex flex-col gap-2 xl:w-[35%] 2xl:w[35%] w-full">
         <p class="text-6xl">
            Oops,<em class="text-[#747bff] font-extrabold">Please login first ... </em>
         </p>
         <p class="text-black/20 text-shadow-2xs">
            Sorry, you must login first before accessing to our product. ThankYOU :>>
         </p>
         <ButtonGlobal class="text-white" value="Back" @click="back"/>
      </div>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue'
import { useRouter } from 'vue-router'
import img401 from '@/app/assets/image/401.jpg'


const img = ref (img401)
const router = useRouter ()
const back = () => {
   router.back ()
}
</script>

<style lang="scss" scoped>
</style>
