<template>
    <div v-if="!item.hidden">
        <template v-if="showSingleChild">
            <AppLink :to="singleChildPath">
                <el-menu-item :index="singleChildPath" :class="{ 'submenu-title-noDropdown': !isNest }">
                    <template #title>
                        <span class="menu-title" :title="getTooltip(singleChildTitle)">
                            {{ singleChildTitle }}
                        </span>
                    </template>
                </el-menu-item>
            </AppLink>
        </template>

        <el-sub-menu v-else :index="resolvedItemPath" teleported>
            <template #title>
                <span class="menu-title" :title="getTooltip(itemTitle)">
                    {{ itemTitle }}
                </span>
            </template>

            <SidebarItem v-for="child in visibleChildren" :key="child.path" :is-nest="true" :item="child"
                :base-path="resolvedItemPath" class="nest-menu" />
        </el-sub-menu>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { isExternal } from '@/app/utils/common'
import AppLink from '@/modules/layout/Sidebar/Link.vue'

const props = defineProps({
    item: {
        type: Object,
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

const onlyOneChild = ref<any>({})

const visibleChildren = computed(() => {
    return (props.item.children || []).filter((child: any) => !child.hidden)
})

const showSingleChild = computed(() => {
    return (
        hasOneShowingChild(props.item.children, props.item) &&
        (!onlyOneChild.value.children || onlyOneChild.value.noShowingChildren) &&
        !props.item.alwaysShow
    )
})

const resolvedItemPath = computed(() => {
    return resolvePath(props.item.path)
})

const singleChildPath = computed(() => {
    return resolvePath(onlyOneChild.value.path)
})

const itemTitle = computed(() => {
    return getTitle(props.item)
})

const singleChildTitle = computed(() => {
    return getTitle(onlyOneChild.value)
})

function hasOneShowingChild(children: any[] = [], parent: any) {
    const showingChildren = children.filter((child: any) => {
        if (child.hidden) {
            return false
        }

        onlyOneChild.value = child
        return true
    })

    if (showingChildren.length === 1) {
        return true
    }

    if (showingChildren.length === 0) {
        onlyOneChild.value = {
            ...parent,
            path: parent.path,
            noShowingChildren: true,
        }
        return true
    }

    return false
}

function resolvePath(routePath = '') {
    if (isExternal(routePath)) {
        return routePath
    }

    if (isExternal(props.basePath)) {
        return props.basePath
    }

    const path = String(routePath || '').replace(/^\/+/, '').replace(/\/+$/, '')

    if (!path) {
        return props.basePath
    }

    if (path.startsWith('system/menu/')) {
        return `/${path}`
    }

    if (path.startsWith('system/')) {
        return `/${path}`
    }

    if (routePath.startsWith('/system/')) {
        return routePath
    }

    return `/system/menu/${path}`
}

function getTitle(route: any) {
    return route?.meta?.title || route?.menuName || route?.name || route?.path || ''
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
}
</style>