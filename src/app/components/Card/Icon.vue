<template>
   <el-icon v-if="props.name">
      <component :is="getIcon(props.name)"/>
   </el-icon>
</template>

<script setup lang="ts">
import { getIcon } from '@/app/utils/common';


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