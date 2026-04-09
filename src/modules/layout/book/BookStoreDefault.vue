<template>
    <div class="book-layout h-full flex place-items-center">
        <BookShow/>
    </div>
</template>
<script setup lang="ts">
import BookShow from '../../view/book/BookShow.vue';

</script>
<style lang="scss" scoped>
.book-layout{
    color: var(--text-color);
    overflow: hidden;
}
</style>