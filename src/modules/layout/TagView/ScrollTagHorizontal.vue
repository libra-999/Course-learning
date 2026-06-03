<template>
    <el-scrollbar class="scrollRef" :vertical="false" ref="scrollRef" @wheel.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>

<script setup lang="ts">
import { tagViewStore } from '@/modules/store/tagview';
import { computed, onBeforeMount, onMounted, ref } from 'vue';


const tagStore = tagViewStore()
const tagSpacing = ref(4)// 4 px
const emit = defineEmits(['scroll'])
const scrollRef = ref<any>(null)
const visitView = computed(() => tagStore.visitViews)

const scrollWrapper = computed<HTMLElement | undefined>(() => {
    return scrollRef.value?.wrapRef
})
const emitScroll = () => emit('scroll')
const handleScroll = (e: WheelEvent) => {
    const wrapper = scrollWrapper.value
    if (!wrapper) return

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    wrapper.scrollLeft += delta
}

onMounted(() => {
    scrollWrapper.value?.addEventListener('scroll', emitScroll, true)
})
onBeforeMount(() => {
    scrollWrapper.value?.removeEventListener('scroll', emitScroll)
})


const moveToTarget = (currentTags: any) => {
    const container = scrollRef.value?.$el as HTMLElement | undefined
    const wrapper = scrollWrapper.value

    if (!wrapper || !container) return // wrapper is null

    const containerWidth = container.offsetWidth
    let firstTag = null
    let lastTag = null

    // set tag index into varibal
    if (visitView.value.length > 0) {
        firstTag = visitView.value[0]
        lastTag = visitView.value[visitView.value.length - 1]
    }

    if (firstTag === currentTags) {
        wrapper.scrollLeft = 0
    } else if (lastTag === currentTags) {
        wrapper.scrollLeft = wrapper.scrollWidth - containerWidth
    } else {
        const tagList = document.getElementsByClassName('tag-view-item')
        const currentIndex = visitView.value.findIndex(item => item === currentTags)
        let preTag: any = null
        let nextTag: any = null

        for (const k in tagList) {
            if (k !== 'length' && Object.hasOwnProperty.call(tagList, k)) {
                const tagElement = tagList[k] as HTMLElement
                if (tagElement.dataset.path === visitView.value[currentIndex - 1]?.path) {
                    preTag = tagElement
                }
                if (tagElement.dataset.path === visitView.value[currentIndex + 1]?.path) {
                    nextTag = tagElement
                }
            }
        }

        if (!preTag || !nextTag) return // only one tag
        const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagSpacing
        const beforePreTagOffsetLeft = preTag.offsetLeft - tagSpacing.value

        if (afterNextTagOffsetLeft > wrapper.scrollLeft + containerWidth) {
            wrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
        } else if (beforePreTagOffsetLeft < wrapper.scrollLeft) {
            wrapper.scrollLeft = beforePreTagOffsetLeft
        }
    }
}

defineExpose({
    moveToTarget
})

</script>

<style lang="scss" scoped>
.scroll {
    white-space: nowrap;
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 40px;


    :deep(.el-scrollbar_bar) {
        bottom: 0px;
    }

    :deep(.el-scrollbar_wrap) {
        height: 20px;
    }

    .scroll-slot {
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
}
</style>