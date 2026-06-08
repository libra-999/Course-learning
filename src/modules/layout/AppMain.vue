<template>
   <section class="app-main">
      <router-view v-slot="{ Component, route }">
         <transition name="fade-transform" mode="out-in">
            <keep-alive :include="useTag.cacheViews">
               <component v-if="!route.meta.link" :is="Component" :key="route.path"/>
            </keep-alive>
         </transition>
      </router-view>
   </section>
</template>

<script setup lang="ts">
import { tagViewStore } from '@/modules/store/tagview';
import { onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';


const useTag = tagViewStore ()
const route = useRoute ()

onMounted (() => {
   addIframe ()
})
watchEffect (() => {
   addIframe ()
})

function addIframe() {
   if (route.meta.link) {
      useTag.addIframeView (route)
   }
}
</script>

<style lang="scss" scoped>

.app-main {
   min-height: calc(100vh - 50px);
   width: 100%;
   position: relative;
   overflow: hidden;
}

.fixed-header + .app-main {
   padding-top: 50px;
}

.hasTagsView {
   .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 84px);
   }

   .fixed-header + .app-main {
      padding-top: 84px;
   }
}

::-webkit-scrollbar {
   width: 6px;
   height: 6px;
}

::-webkit-scrollbar-track {
   background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
   background-color: #c0c0c0;
   border-radius: 3px;
}
</style>