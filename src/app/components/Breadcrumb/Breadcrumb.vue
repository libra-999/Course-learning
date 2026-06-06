<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span v-if="index === levelList.length - 1" class="no-redirect">
                    {{ item.title }}
                </span>
                <a v-else @click.prevent="handleLink(item)">
                    {{ item.title }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

type BreadcrumbItem = {
    path: string
    title: string
    redirect?: string
}

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const levelList = computed<BreadcrumbItem[]>(() => {
    if (route.path.startsWith('/redirect/')) {
        return []
    }

    const matched = route.matched
        .filter((item) => item.path !== '/system')
        .filter((item) => item.meta?.breadcrumb !== false)
        .map((item) => ({
            path: item.path,
            title: getRouteTitle(item),
            redirect: item.redirect as string | undefined,
        }))
        .filter((item) => item.title)
    return [
        {
            path: '/system',
            title: t('MENU.home'),
        },
        ...matched,
    ]
})

function getRouteTitle(item: any) {
    const title = item.meta?.title || item.name || item.menuName || ''
    const changeLng = t("MENU." + title.toLowerCase())
    return changeLng
}

function handleLink(item: BreadcrumbItem) {
    if (item.redirect) {
        router.push(item.redirect)
        return
    }

    router.push(item.path)
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 8px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
    a {
        color: $default;
        cursor: pointer;
        font-weight: 500;
        &:hover {
            color: $gray;
        }
    }
}
</style>