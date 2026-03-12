<script setup lang="ts">
import BookShow from '../../view/book/BookShow.vue';

</script>
<template>
    <div class="book-layout h-full flex place-items-center">
        <BookShow/>
    </div>
</template>
<style scoped>
.book-layout{
    color: var(--text-color);
    overflow: hidden;
}
</style>