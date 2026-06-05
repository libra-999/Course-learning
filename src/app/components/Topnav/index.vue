<template>
    <el-menu 
        ref="menuRef" 
        class="topnav-topbar"
        :default-active="activeMenu" 
        mode="horizontal" 
        @select="handleSelect" 
        :ellipsis="false">

        <template v-for="(item, index) in topMenus">
            <el-menu-item v-if="Number(index) < visibleNumber" :key="index" :index="item.path">
                <!-- <svg-icon v-if="item.icon" :icon-class="item.icon"/>
                {{ getTitle(item) }} -->
            </el-menu-item>
        </template>

        <el-sub-menu v-if="topMenus.length > visibleNumber" index="more">
            <template #title>{{ t('MENU.TOP.more') }}</template>
            <template v-for="(item, index) in topMenus" :key="item.path">
                <el-menu-item v-if="Number(index) >= visibleNumber" :index="item.path">
                    {{ getTitle(item) }}
                </el-menu-item>
            </template>

        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>

import { splitNormalPath } from "@/app/utils/common"
import { appStore } from "@/modules/store/app"
import { permissionStore } from "@/modules/store/permission"
import type { MenuRoute } from "@/modules/types/menu"
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"

const menuRef = ref<any>(null)
const { t } = useI18n()

// declare object 
const visibleNumber = ref(6)
const useApp = appStore()
const usePermission = permissionStore()
const route = useRoute()
const router = useRouter()

// fetching data
const rawRoute = computed<MenuRoute[]>(()=> { return usePermission.topBarRoutes.length !=0 ? usePermission.topBarRoutes : []})
const topMenus = computed<any>(() => {
    return rawRoute.value.map((item)=> normalizePath(item))
})
const activeMenu = computed<any>(()=> {
    const activePath: string = route.path
    if (activePath.startsWith("/system/menu/")){
        const firstPath = activePath.replace('/system/menu/','').split('/')[0]
        return `/system/menu/${firstPath}`
    }
})

watch(activeMenu, (p)=> {activeRoutes(p)},{ immediate: true})

// action
function normalizePath(item: MenuRoute, parentPath: string = ''){
    const path = resolvePath(item.path, parentPath)
    return { ...item, path, parentPath, meta: {...item.meta, title: item.meta?.title || item.menuName, icon: item.icon} ,children: item.children?.map((i)=> {normalizePath(i, path)}) || []}

}
function getTitle(item: any){
    return item.meta?.title || item.menuName || item.path
}
function resolvePath(path: string, parentPath: string = ''){
    const normalPath = splitNormalPath(path)
    
    if (normalPath.startsWith("/system/menu")){
        return normalPath
    }
    if (normalPath.startsWith("/system/")){
        return normalPath
    }
    if (normalPath.startsWith("/menu/")){
        return `/system${normalPath}`
    }
    if (normalPath.startsWith("/")){
        return '/system'
    }

    if (parentPath){
        return `${normalPath}/${parentPath}`
    }
    return `/system/menu/${normalPath}`
}
function setVisibleNumber() {
    const width = menuRef.value?.$el?.parentElement?.getBoundingClientRect().width || document.body.getBoundingClientRect().width
    visibleNumber.value = Math.max(1, Math.floor((width - 120)/ 120))
}
function handleSelect(key:string) {
    if (key === 'more') return

    const selectedRoute = topMenus.value.find((i:any) => i.path === key)
    if (!selectedRoute) {
        return
    }

    activeRoutes(selectedRoute)
    if (selectedRoute.children?.length){
        router.push(selectedRoute.children[0].path)
        return
    }

    if(selectedRoute.redirect){
        router.push(selectedRoute.redirect)
        return
    }

    if(selectedRoute.query){
        router.push({
            path: selectedRoute.path,
            query: JSON.parse(selectedRoute.query)
        })
        return
    }
    router.push(selectedRoute.path)
}
function activeRoutes(path: string){
    const selectRoute = topMenus.value.find((item: any)=> item.path === path)

    console.log("ActiveRoutes:"  + selectRoute)
    if (selectRoute?.children?.length){
        usePermission.setSidebarRoute(selectRoute)
        useApp.toggleSideBarHide(false)
        return selectRoute.children
    }

    usePermission.setSidebarRoute([]) // no child
    useApp.toggleSideBarHide(true)
    return[]
}

onMounted(()=> {
    setVisibleNumber()
    window.addEventListener('resize',setVisibleNumber)
})
onBeforeUnmount(()=> {
    window.removeEventListener('resize',setVisibleNumber)
})
</script>

<style lang="scss" scoped>
.topnav-topbar.el-menu--horizontal {
  height: 60px;
  border-bottom: none;
  background: transparent;
}

.topnav-topbar.el-menu--horizontal > .el-menu-item {
  height: 60px !important;
  line-height: 60px !important;
  color: #999093 !important;
  padding: 0 10px !important;
}

.topnav-topbar.el-menu--horizontal > .el-menu-item.is-active,
.topnav-topbar.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom: 2px solid #999093 !important;
  color: #303133 !important;
}

.topnav-topbar.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  height: 60px !important;
  line-height: 60px !important;
  color: #999093 !important;
  padding: 0 10px !important;
}

.topnav-topbar.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.topnav-topbar.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.topnav-topbar.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
  background-color: transparent !important;
}

.topnav-topbar .el-sub-menu .el-sub-menu__icon-arrow {
  position: static;
  margin-left: 8px;
}
</style>
