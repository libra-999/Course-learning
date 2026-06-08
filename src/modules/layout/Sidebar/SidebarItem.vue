<template>
   <div v-if="!item.hidden">
      <template v-if="!hasChild">
         <AppLink :to="resolvedItemPath">
            <el-menu-item :index="resolvedItemPath" :class="{ 'dashboard-menu': item.menuName === 'Dashboard' }">
               <Icon :name="item.icon"/>
               <template #title>
                        <span class="menu-title" :title="getTooltip(singleChildTitle)">
                            {{ itemTitle }}
                        </span>
               </template>
            </el-menu-item>
         </AppLink>
      </template>

      <el-sub-menu v-else :index="resolvedItemPath" teleported>
         <template #title>
            <Icon :name="item.icon"/>
            <span class="menu-title" :title="getTooltip(itemTitle)">
                    {{ itemTitle }}
                </span>
         </template>

         <SidebarItem v-for="child in visibleChildren" :key="child.path" :is-nest="true" :item="child"
                      :base-path="resolvedItemPath" class="nest-menu"/>
      </el-sub-menu>
   </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { isExternal } from '@/app/utils/common'
import AppLink from '@/modules/layout/Sidebar/Link.vue'
import Icon from '@/app/components/Card/Icon.vue'


const props = defineProps ({
   item: {
      type: Object as any,
      required: true
   },
   isNest: {
      type: Boolean,
      default: false,
   },
   basePath: {
      type: String,
      default: '',
   },
})

const onlyOneChild = ref<any> ({})

const visibleChildren = computed (() => {
   return (props.item.children || []).filter ((child: any) => !child.hidden && child.menuType !== 2)
})

const hasChild = computed (() => {
   return visibleChildren.value.length > 0
})

const resolvedItemPath = computed (() => {
   return resolvePath (props.item.path)
})

const itemTitle = computed (() => {
   return getTitle (props.item)
})

const singleChildTitle = computed (() => {
   return getTitle (onlyOneChild.value)
})

function resolvePath(routePath = '') {
   if (isExternal (routePath)) {
      return routePath
   }

   if (isExternal (props.basePath)) {
      return props.basePath
   }

   const path = String (routePath || '').replace (/^\/+/, '').replace (/\/+$/, '')

   if (!path) {
      return props.basePath
   }

   if (path.startsWith ('system/menu/')) {
      return `/${path}`
   }

   if (path.startsWith ('system/')) {
      return `/${path}`
   }

   if (routePath.startsWith ('/system/')) {
      return routePath
   }

   return `/system/menu/${path}`
}

function getTitle(route: any) {
   return route?.menuName || route.name || ''
}

function getTooltip(title: string) {
   return title && title.length > 8 ? title : ''
}
</script>

<style lang="scss" scoped>
.menu-title {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   color: $text;
   text-align: center;
}

.el-menu-item {
   background-color: $defaultSidebarChildBg !important;

   &:hover {
      background-color: $defaultSidebarChildHoverBg !important;
      color: $text !important;
   }
}

.dashboard-menu {
   background-color: $defaultSidebarItem !important;
}

:deep(.el-sub-menu__title:hover) {
   background-color: #21354778;
   color: $text !important;
}

.el-sub-menu_title.is-active,
.el-menu-item.is-active {
   background-color: $defaultSidebarChildHoverBg !important
}

:deep(.el-sub-menu__icon-arrow) {
   color: $text;
   font-size: 16px;
}
</style>