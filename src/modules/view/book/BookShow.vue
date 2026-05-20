<template>
    <Loading v-if="loading" />
    <div class="w-auto mobile" v-else>
        <div>
            <div class="m-4 flex justify-end">
                <el-input v-model="search" clearable placeholder="Search by title, author, publisher..." class="w-60!">
                </el-input>
            </div>
        </div>
        <div class="overflow-auto flex flex-wrap gap-4 p-3">
            <BookCard v-for="book in dataBook" :key="book.id" :book-data="book" />
            <div v-if="dataBook.length === 0" class="w-full h-full text-center m-auto">
                <p class="text-gray-200 font-bold italic">Empty Data Book ... </p>
            </div>
        </div>
        <div class=" flex justify-end mt-4">
            <Pagination :total="totals" :size="size" v-model="page" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { getBooks } from '../../api/book';
import { usePagination } from '@/app/utils/pagination.ts';
import Pagination from '@/app/components/pagination/Pagination.vue';
import { onMounted, ref, watch } from 'vue';
import type { Book } from '../../types/book';
import Loading from '@/app/components/Loading.vue';
import { useMessage } from '@/app/utils/message.ts'
import BookCard from '@/app/components/system/book/BookCard.vue';

const dataBook = ref<Book[]>([]);
const loading = ref(false);
const search = ref("");
const totals = ref(0);
let timeout: any;
const { page, size, startIndex } = usePagination();
const errorMessage = useMessage()

const getData = async () => {
    loading.value = true
    try {
        const resp = await getBooks(search.value || "all", startIndex.value, size.value);
        dataBook.value = resp.items || [];
        totals.value = resp.totalItems
    } catch (error) {
        throw errorMessage.messageBox(`${error}`, 'error')
    } finally {
        loading.value = false;
    }
}
/* watch data book  */
onMounted(() => {
    getData();
})
/* watch search & pagination */
watch([page, size], () => {
    getData();
})
watch(search, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        page.value = 1;
        getData();
    }, 500);
})
</script>
<style lang="scss" scoped>
.mobile{
    margin: auto;
}
</style>