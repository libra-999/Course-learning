<template>
   <div
       class="w-full max-w-full p-1 md:max-w-xs border-card relative hover:translate-y-0.5 transition-transform duration-300"
   >
      <!-- Info author -->
      <div class="pt-5 px-3">
         <div class="flex items-center gap-3">
            <img
                class="w-[35px] h-[35px] object-cover rounded-full border-2 border-gray-300"
                :src="`${props.bookData.volumeInfo.imageLinks?.thumbnail}`"
                alt="empty image"
            />
            <div class="border-l-2 border-gray-300 pl-3 flex flex-col gap-1">
               <h3
                   class="text-base font-semibold text-title-50 leading-5 line-clamp-1 text-left"
               >
                  {{ props.bookData.volumeInfo.authors?.[0] }}
               </h3>
               <p class="text-sm opacity-50 leading-5 text-left">
                  {{ props.bookData.volumeInfo.maturityRating }}
               </p>
               <small
                   class="text-[11px] w-max text-left text-white bg-emerald-600 py-0.5 px-2 rounded-[5px] leading-5"
               >
                  {{ props.bookData.volumeInfo.publishedDate }}</small
               >
            </div>
         </div>
      </div>
      <!-- Thumbnail -->
      <div
          class="w-full h-40.75 mx-auto overflow-hidden px-4 mt-5 cursor-pointer rounded-lg"
          @click="getBook(bookData.id)"
      >
         <!-- <a :href="props.bookData.selfLink" target="_blank" rel="noreferrer"> -->
         <img
             :src="`${props.bookData.volumeInfo.imageLinks?.smallThumbnail}`"
             class="w-full h-full object-cover rounded-lg"
             alt="empty image"
         />
         <!-- </a> -->
      </div>
      <!-- Title book -->
      <div class="p-5 mb-2">
         <h3 class="text-lg mt-2 leading-6 text-left italic line-clamp-3">
            {{ props.bookData.volumeInfo.title }}
         </h3>
      </div>
      <!-- Etag book -->
      <div class="absolute right-1 top-0 etag">
         <el-tag class="text-[10px]! opacity-60 text-emerald-600!">{{
               props.bookData.etag
            }}
         </el-tag>
      </div>
      <!-- Rating book -->
      <div class="absolute bottom-0 left-5 my-2 flex gap-2 items-center">
         <Rating :star="Number(rating) || 0"/>
         <span> {{ rating || 0 }} points </span>
      </div>
      <small class="absolute right-2.5 bottom-3 text-gray-300"
      >{{ props.bookData.volumeInfo.pageCount }} pages</small
      >
   </div>
   <!-- Detail Book-->
   <el-dialog v-model="dialogDetail" width="auto" align-center>
      <Loading v-if="loading"/>
      <div v-else>
         <strong> {{ props.bookData.id }}</strong>
      </div>
   </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Loading from "@/app/components/Loading/Loading.vue";
import type { Book } from "@/modules/types/book";
import { viewBook } from "@/modules/api/book";
import Rating from "@/app/components/Button/Rating.vue";


const props = defineProps<{
   bookData: Book;
}> ();

const data = ref<object> ();
const dialogDetail = ref (false);
const loading = ref (false);
const rating = ref (props.bookData.volumeInfo.averageRating);
const getBook = async (id: string) => {
   loading.value = true;
   dialogDetail.value = true;
   try {
      data.value = await viewBook (id);
   } catch (error) {
      console.log (error);
   } finally {
      loading.value = false;
   }
};
</script>
<style scoped>
.border-card {
   border: 0.8px solid rgba(224, 224, 224, 0.3);
   border-radius: 14px;
   font-family: Courier;
   overflow: hidden;
   color: var(--text-color);

   & .etag {
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      transform: rotate(45deg) translateX(30%) translateY(-70%);
   }
}
</style>
