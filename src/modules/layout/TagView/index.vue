<template>
    <div id="tag-view-container" class="tag-view-container">
        <ScrollTagHorizontal ref="scrollRef" @scroll="()=> closeMenu()">
            <router-link 
                v-for="tag in visitView"
                :key="tag.path"
                :data-path="tag.path"
                :to="{path: tag.path, query: tag.query}"
                @contextmenu.prevent="openMenu(tag, $event)"
                @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                >
                {{ tag.menuName }}
                <span v-if="!isAffix(tag)" @click.prevent.stop="">
                    <el-icon>
                        <CloseBold />
                    </el-icon>
                </span>
            </router-link>
        </ScrollTagHorizontal>

        <ul v-show="visible">
            <li @click="refreshSelectedTag(selectTag)">
                <el-icon>
                    <RefreshRight/>
                </el-icon>
            </li>
            <li @click="closeAllTags(selectTag)" ></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { getNormalPath } from '@/app/utils/common';
import ScrollTagHorizontal from '@/modules/layout/TagView/ScrollTagHorizontal.vue';
import { permissionStore } from '@/modules/store/permission';
import { tagViewStore } from '@/modules/store/tagview';
import { CloseBold, RefreshRight } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectTag = ref<any>({})
const affixTag = ref([])
const scrollRef = ref<any>(null)
const route = useRoute()
const router = useRouter()

const { proxy } = getCurrentInstance() as any
const visitView = computed(() => tagViewStore().visitViews)
const routeTag = computed(() => permissionStore().routes)

const tagStore = tagViewStore()

function isAffix(tag: any) {
    return tag.meta && tag.meta.affix
}

// active tag
function isCurrentActive(rt: any) {
    return rt.path === route.path
}
// first tag
function firstTag() {
    try {
        return selectTag.value.fullPath === '/menu' || selectTag.value.fullPath === visitView.value[1].fullPath
    } catch {
        return false
    }
}
// last tag
function lastTag() {
    try {
        return selectTag.value.fullPath === visitView.value[visitView.value.length - 1].fullPath
    } catch {
        return false
    }
}
function addTags() {
    const { name } = route
    if (name) {
        tagStore.addView(route)
    }
}

// init tag to route
function filterAffixTag(routes: any, basePath: string = '') {
    let tags: any = []
    routes.forEach((route: any) => {
        if (route.meta && route.meta.affix) {
            const tagPath = getNormalPath(basePath + '/' + route.path)
            tags.push({
                fullpPath: tagPath,
                path: tagPath,
                name: route.menuName,
                meta: { ...route.meta }
            })
        }
        if (route.children) {
            const tempTags: any = filterAffixTag(route.children, route.path)
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags]
            }
        }
    })
    return tags
}
function initTags() {
    const res = filterAffixTag(routeTag.value)
    affixTag.value = res
    for (const tag of res) {
        if (tag.name) {
            tagStore.addVisitView(tag)
        }
    }
}
function moveToCurrentTag() {
    nextTick(() => {
        for (const res of visitView.value) {
            if (res.path === route.path) {
                scrollRef.value.moveToTarget(res)
                if (res.fullPath !== route.fullPath) {
                    tagStore.updateVisitView(route)
                }

            }
        }
    })
}
function refreshSelectedTag(view: any) {
    proxy.$tab.refreshPage(view)
    if (route.meta.link) {
        tagStore.deleteIframeView(view)
    }
}
function toLastView(visitView: any, view?: any) {
    const latestView = visitView.slice(-1)[0]
    if (latestView) {
        router.push(latestView.fullPath)
    } else {
        if (view.menuName === 'Dashboard') {
            router.replace({ path: '/redirect' + view.fullPath })
        } else {
            router.push('/')
        }
    }
}


function closeSelectedTag(view: any) {
    proxy.$tab.closePage(view).then(({ }) => {
        if (isCurrentActive(view)) {
            toLastView(visitView, view)
        }
    })
}
function closeRightTags() {
    proxy.$tab.closeRightPage(selectTag.value).then((v: any) => {
        if (!v.find((i: any) => i.fullPath === route.fullPath)) {
            toLastView(v)
        }
    })
}
function closeLeftTags() {
    proxy.$tab.closeLeftPage(selectTag.value).then((v: any) => {
        if (!v.find((i: any) => i.fullPath === route.fullPath)) {
            toLastView(v)
        }
    })
}
function closeOtherTags() {
    router.push(selectTag.value).catch(() => { })
    proxy.$tab.closeOtherPage(selectTag.value).then(() => {
        moveToCurrentTag()
    })
}
function closeAllTags(view: any) {
    proxy.$tab.closeAllPage().then((v: any) => {
        if (affixTag.value.some((tag: any) => tag.path === route.path)) {
            return
        }

        toLastView(v, view)
    })
}
function closeMenu() {
    visible.value = false
}
function openMenu(tag: any, e: any) {
    const menuMinWidth = 105
    const offsetLeft = proxy.$el.getBoundingClientRect().left
    const offsetWidth = proxy.$el.offsetWidth
    const maxLeft = offsetWidth - menuMinWidth
    const l = e.clientX - offsetLeft + 15

    if (l > maxLeft) {
        left.value = maxLeft
    } else {
        left.value = l
    }

    top.value = e.clientY
    visible.value = true
    selectTag.value = tag
}

watch([route, visible], (value) => {
    addTags(),
        moveToCurrentTag()

    if (value) {
        document.body.addEventListener('click', closeMenu)
    } else {
        document.body.removeEventListener('click', closeMenu)
    }
})
onMounted(() => {
    initTags()
    addTags()
})

</script>

<style lang="scss" scoped></style>