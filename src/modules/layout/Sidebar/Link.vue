<template>
   <component :is="linkComponent" v-bind="linkProp">
      <slot/>
   </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/app/utils/common';
import { computed } from 'vue';


const prop = defineProps<{
   to: string
}> ()

const linkComponent = computed (() => {
   return isExternalPath.value ? 'a' : 'router-link'
})
const isExternalPath = computed (() => {
   return isExternal (prop.to)
})
const linkProp = computed (() => {
   if (isExternalPath.value) {
      return {
         href: prop.to,
         target: '_blank',
         rel: 'noopener noreferrer'
      }
   }
   return {to: prop.to}
})

</script>

<style scoped></style>