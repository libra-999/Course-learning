<template>
    <button :class="[
        props.styleClass ?? 
        'rounded-sm hover:bg-blue-600 transition-[0,0,-2s] bg-blue-400 w-max p-2 mx-2 cursor-pointer flex items-center text-center gap-2'
    ]">
        <slot name="icon-left"/>
            <span v-if="value" class="w-full">{{ value }}</span>
        <slot name="icon-right"/>
    </button>
</template>
<script setup lang="ts">
    const props = defineProps<{
        value: string
        styleClass?: string
    }>();
</script>
<style scoped>
</style>