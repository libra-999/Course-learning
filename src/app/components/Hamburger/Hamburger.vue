<template>
    <div class="px-2 py-1 cursor-pointer w-max "  @click="toggleHamburger">
        <el-icon class="hamburger-icon" v-if="!prop.isActive">
            <Expand />
        </el-icon>
        <el-icon class="hamburger-icon" v-else>
            <Fold />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue';

const prop = defineProps({
    isActive: Boolean
})

const hamburgerEmit = defineEmits(['toggleClick'])
const toggleHamburger = () => { hamburgerEmit('toggleClick') }

</script>

<style lang="scss" scoped>
.hamburger-icon {
    display: inline;
    font-size: 1.3rem;
    vertical-align: middle;
    color: $default;
}
</style>