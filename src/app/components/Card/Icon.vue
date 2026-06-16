<template>
   <el-icon v-if="props.name">
      <component :is="elementIconDynamic(props.name)"/>
   </el-icon>
</template>

<script setup lang="ts">
import { elementIconDynamic } from '@/app/utils/common';


const props = defineProps ({
   name: {
      type: String,
      required: true
   }
})
</script>

<style lang="scss" scoped>
.el-icon {
   color: $text;
}
</style>