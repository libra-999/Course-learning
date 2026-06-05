<template>
    <div class="sidebar-logo" :class="{ 'collapse': prop.collapse }">
        <Transition name="sidebarLogoFade">
            <router-link v-if="prop.collapse" key="collapse" class="sidebar-logo-link" to="/system/menu">
                <img :src="logo" class="sidebar-logo-link-img" alt="Null">
                <h1 class="sidebar-logo-link-title">{{ t('TITLE_SYSTEM') }}</h1>
            </router-link>
            <router-link v-else class="sidebar-logo-link" key="expand" to="/system/menu">
                <img :src="logo" class="sidebar-logo-link-img" alt="Null">
                <h1 class="sidebar-logo-link-title">{{ t('TITLE_SYSTEM') }}</h1>
            </router-link>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const prop = defineProps({
    collapse: {
        type: Boolean,
        required: true
    }
})

const logo = ref("../../../app/assets/image/learn.jpg")
const { t } = useI18n()


</script>

<style  lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo{
    width: 100%;
    height: 60px;
    overflow: hidden;
    
    &-link {
        width: 100%;
        height: 100%;
        &-img{
            width: 35px;
            height: 35px;
            vertical-align: middle;
        }    
        &-title{
            font-weight: bold;
        }
    }    
}
</style>