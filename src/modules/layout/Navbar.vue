<template>
  <div class="navbar">
    <Hamburger :is-active="useApp.sidebar.opened" @click="toggleSideBar" class="navbar-hbg" />
    <Breadcrumb v-if="!useSetting.topNav" class="navbar-bdc" />
    <Topnav v-if="useSetting.topNav"  class="navbar-topnav"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb.vue';
import Hamburger from '@/app/components/Hamburger/Hamburger.vue';
import { appStore } from '@/modules/store/app';
import Topnav from '@/app/components/Topnav/index.vue'
import { settingStore } from '@/modules/store/setting';


const useApp = appStore()
const useSetting = settingStore()


// action 
function toggleSideBar() {
  useApp.toggleSideBar()
}

</script>

<style scoped lang="scss">
.navbar {
  top: 0;
  overflow: hidden;
  height: 60px;
  position: relative;
  background: $default;
  box-shadow: 0 1px 4px $text;

  &-hbg {
    float: left;
    height: 100%;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
  }

  &-bdc {
    float: left;
    height: max-content;
  }

  &-topnav{
    position: absolute;
    top: 0;
    color: $text;
    left: 50px;
  }


}
</style>