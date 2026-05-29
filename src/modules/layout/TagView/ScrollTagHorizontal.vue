<template>
    <el-scrollbar 
        class="scroll" 
        :vertical="false" 
        ref="scrollWrapper"
        @wheel.prevent="handleScroll"
        >
        <slot/>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { tagViewStore } from '@/modules/store/tagview';
import { computed, getCurrentInstance, onBeforeMount, onMounted, ref } from 'vue';


const tagStore = tagViewStore()
const tagSpacing = ref(4)// 4 px
const { proxy } = getCurrentInstance() as any
const emit = defineEmits(['scroll'])

const scrollWrapper = computed(()=> proxy.$refs.scrollContainer.$refs.wrapRef)
const emitScroll = () => emit('scroll')

onMounted(()=> {
    scrollWrapper.value?.addEventListener('scroll',emitScroll,true)
})
onBeforeMount(()=> {
    scrollWrapper.value?.removeEventListener('scroll',emitScroll)
})

const handleScroll = (e: WheelEvent)=> {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40
    const wrapper = scrollWrapper.value

    if (!wrapper) return
    wrapper.scrollLeft = wrapper.scrollLeft + eventDelta / 4
}

const visitView = computed(()=> tagStore.visitViews)
const moveToTarget = (currentTags: any) =>{
    const container = proxy.$refs.scrollContainer.$el
    const containerWidth = container.offsetWidth
    const wrapper = scrollWrapper.value

    if (!wrapper) return // wrapper is null

    let firstTag = null
    let lastTag =null

    // set tag index into varibal
    if (visitView.value.length > 0) {
        firstTag = visitView.value[0]
        lastTag = visitView.value[visitView.value.length - 1]
    }

    if (firstTag === currentTags){
        wrapper.scrollLeft = 0
    }else if (lastTag === currentTags){
        wrapper.scrollLeft = wrapper.scrollWidth - containerWidth
    }else{
        const tagList = document.getElementsByClassName('tag-view-item')
        const currentIndex = visitView.value.findIndex(item => item === currentTags)
        let preTag : any = null
        let nextTag: any = null

        for (const k in tagList){
            if (k !== 'length' && Object.hasOwnProperty.call(tagList, k)){
                const tagElement = tagList[k] as HTMLElement
                if (tagElement.dataset.path === visitView.value[currentIndex - 1]?.path){
                    preTag = tagElement
                }
                if(tagElement.dataset.path === visitView.value[currentIndex + 1]?.path){
                    nextTag = tagElement
                }
            }
        }

        if (!preTag || !nextTag) return // only one tag
        const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagSpacing
        const beforePreTagOffsetLeft = preTag.offsetLeft - tagSpacing.value

        if (afterNextTagOffsetLeft > wrapper.scrollLeft + containerWidth){
            wrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
        }else if(beforePreTagOffsetLeft < wrapper.scrollLeft){
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

    .scroll-slot{
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
}

</style>