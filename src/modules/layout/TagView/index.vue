<template>
    <div id="tag-view-container" class="tag-view-container">
        <ScrollTagHorizontal>
            <span v-if="!isAffix('ss')" @click.prevent.stop="">
                <el-icon>
                    <CloseBold />
                </el-icon>
            </span>
        </ScrollTagHorizontal>
    </div>
</template>

<script setup lang="ts">
import ScrollTagHorizontal from '@/modules/layout/TagView/ScrollTagHorizontal.vue';
import { permissionStore } from '@/modules/store/permission';
import { tagViewStore } from '@/modules/store/tagview';
import { CloseBold } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectTag = ref<any>({})
const affixTag = ref([])
const scrollRef = ref(null)
const route = useRoute()
const router = useRouter()

const { proxy } = getCurrentInstance() as any
const visitView = computed(() => tagViewStore().visitViews)
const routeTag = computed(() => permissionStore().routes)

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
// init tag to route

function initTags() {

}
function addTags() {
    const { name } = route
    if (name) {
        tagViewStore().addView(route)
    }
}
</script>

<style lang="scss" scoped></style>