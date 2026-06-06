<template>
    <div :class="{ 'has-logo': showLogo }" class="sidebar-container">
        <Logo v-show="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true"
                :collapse-transition="false" mode="vertical">
                <SidebarItem v-for="item in sidebarRouters" :key="item.path" :item="item" :base-path="item.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>

import Logo from '@/modules/layout/Sidebar/Logo.vue'
import SidebarItem from '@/modules/layout/Sidebar/SidebarItem.vue'
import { appStore } from '@/modules/store/app'
import { permissionStore } from '@/modules/store/permission'
import { settingStore } from '@/modules/store/setting'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const useApp = appStore()
const useSetting = settingStore()
const usePermission = permissionStore()

const sidebarRouters: any = computed(() => usePermission.sidebarRoutes)
const isCollapse = computed(() => !useApp.sidebar.opened)
const showLogo = computed(() => useSetting.sideBarLogo)

const activeMenu = computed(() => {
    const { meta, path } = route
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return path
})
</script>

<style lang="scss" scoped>
.sidebar-container {
    background-color: $defaultSidebarItem;
    color: $surface;


    .scrollbar-wrapper {
        background-color: $default;
    }

    .el-menu {
        background-color: $defaultSidebarItem;
        border: none;
        height: 100%;
        width: 100% !important;

        .el-menu-item,
        .el-sub-menu__title {
            &:hover {
                background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
            }
        }

        .el-menu-item {
            color: $text;
            background-color: $default;

            &.is-active {
                color: $primary;
                background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
            }
        }

        .el-sub-menu__title {
            color: $text;
        }
    }
}

</style>
