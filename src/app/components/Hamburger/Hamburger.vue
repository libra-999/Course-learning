<template>
   <div class="px-2 cursor-pointer h-full w-max" @click="toggleHamburger">
      <el-icon class="hamburger-icon" v-if="!prop.isActive">
         <Expand/>
      </el-icon>
      <el-icon class="hamburger-icon" v-else>
         <Fold/>
      </el-icon>
   </div>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue';


const prop = defineProps ({
   isActive: Boolean
})

const hamburgerEmit = defineEmits (['toggleClick'])
const toggleHamburger = () => {
   hamburgerEmit ('toggleClick')
}

</script>

<style lang="scss" scoped>
.hamburger-icon {
   font-size: 1.3rem;
   vertical-align: middle;
   color: $default;
   height: 100%;
}
</style>