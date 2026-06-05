<template>
  <div :class="classObj" class="sn-container">
    <div v-if="device === 'mobile' && sidebar.opened" class="sn-container-draw-bg" @click="handleClickDevice" />
    <Sidebar v-if="!sidebar.hide" class="sn-container-sidebarHide" />
    <div :class="{ hasTagsView: needTagViews, sidebarHide: sidebar.hide }" class="sn-container-main">
      <div :class="{ 'fixed-header': fixHeaders }">
        <Navbar />
        <Tagview v-if="needTagViews" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/modules/layout/Sidebar/index.vue'
import Navbar from '@/modules/layout/Navbar.vue';
import Tagview from '@/modules/layout/TagView/index.vue'
import { appStore } from '@/modules/store/app';
import { settingStore } from '@/modules/store/setting';
import { useWindowSize } from '@vueuse/core';
import { computed, watch, watchEffect } from 'vue';

const useSetting = settingStore()
const useApp = appStore()
const { width } = useWindowSize()
const WIDTH = 992

const sidebar = computed(() => useApp.sidebar)
const device = computed(() => useApp.device)
const needTagViews = computed(() => useSetting.tagViews)
const fixHeaders = computed(() => useSetting.fixedHeader)

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}))

watch(() => device.value, () => {
  if (device.value === 'mobile' && sidebar.value.opened) {
    useApp.closeSideBar({ withoutAnimation: false })
  }
})

watchEffect(() => {
  if (width.value - 1 < WIDTH) {
    useApp.toggleDevice('mobile')
    useApp.closeSideBar({ withoutAnimation: true })
  } else {
    useApp.toggleDevice('desktop')
  }
})

function handleClickDevice() {
  useApp.closeSideBar({ withoutAnimation: false })
}

</script>

<style lang="scss" scoped>
.sn-container {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  &-drawer-ng {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  &-fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
  }

  &-hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  &-sidebarHide .fixed-header {
    width: 100%;
  }
}
</style>