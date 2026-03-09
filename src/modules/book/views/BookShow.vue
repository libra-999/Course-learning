<script setup lang="ts">
import BookCard from '../components/BookCard.vue';
import { getBooks } from '../api';
import { usePagination } from '../composable/pagination';
import Pagination from '@/app/components/pagination/Pagination.vue';
import { onMounted, ref, watch } from 'vue';
import type { Book } from '../types';
import Loading from '@/app/components/Loading.vue';

const dataBook = ref<Book[]>([]);
const loading = ref(false);
const search = ref("");
const totals = ref(0);
let timeout: number;
const { page, size, startIndex } = usePagination();

const getData = async () => {
    loading.value = true
    try {
        const resp = await getBooks(search.value || "all", startIndex.value, size.value);
        dataBook.value = resp.items || [];
        totals.value = resp.totalItems 
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false;
    }
}
// watch data book 
onMounted(() => {
    getData();
})
// watch searcn & pagination
watch([page ,size], ()=> {
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
<template>
    <Loading v-if="loading" />
    <div class="w-auto" v-else>
        <div>
            <div class="m-4 flex justify-end">
                <el-input
                    v-model="search"
                    clearable
                    placeholder="Search by title, author, publisher..."
                    class="w-60!">
                </el-input>
            </div>
        </div>
        <div class="overflow-auto flex flex-wrap gap-4 p-3">
            <BookCard v-for="book in dataBook" :key="book.id" :book-data="book" />
			  <div v-if="dataBook.length === 0" class="w-full h-full text-center"><p class="text-gray-200 font-bold italic">Empty Data Book ... </p></div>
        </div>
        <div class=" flex justify-end mt-4">
            <Pagination :total="totals" :size="size" v-model="page" />
        </div>
    </div>
   
</template>
<style scoped></style>