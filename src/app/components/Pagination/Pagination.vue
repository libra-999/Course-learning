<template>
  <!-- Prev -->
  <ButtonGlobal @click="nextPage(modelValue - 1)" :disabled="modelValue === 1" style="color: white;" value="Previous">
    <template #icon-left>
      <el-icon>
        <Back style="color: aliceblue;" />
      </el-icon>
    </template>
  </ButtonGlobal>
  <!-- Page Numbers -->
  <button v-for="p in visiblePages" :key="p" :disabled="p === '...'" @click="nextPage(p)" :class="[
    'px-3 py-1 border rounded mx-1 cursor-pointer',
    p === modelValue
      ? 'bg-blue-500 text-white'
      : ' bg-gray-100 border-none text-[#213547]',
    p === '...' ? 'cursor-default border-none bg-transparent' : ''
  ]">
    {{ p }}
  </button>
  <!-- Next -->
  <ButtonGlobal value="Next" style="color: white;" @click="nextPage(modelValue + 1)" :disabled="modelValue === totals">
    <template #icon-right>
      <el-icon>
        <Right />
      </el-icon>
    </template>
  </ButtonGlobal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Back, Right } from '@element-plus/icons-vue';
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';

// create a fields     
const props = defineProps<{
  total: number,
  modelValue: number,
  size: number
}>();

// event child 
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): number
}>();
//  total object record
const totals = computed(() => {
  return Math.ceil(props.total / props.size);
})
// visiblePage
const visiblePages = computed(() => {
  const total = totals.value
  const currentPage = props.modelValue;
  const pages: (number | string)[] = []

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  pages.push(1);

  // start pagination
  if (currentPage <= 4) {
    for (let i = 2; i <= 4; i++) {
      pages.push(i)
    }
    pages.push("...")
    pages.push(total)
    return pages;
  }
  // end pagination
  if (currentPage >= total - 3) {
    pages.push("...")
    for (let i = total - 4; i < total; i++) {
      pages.push(i)
    }
    pages.push(total)
    return pages
  }
  // middle pagination
  pages.push("...")
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    pages.push(i);
  }
  pages.push("...")
  pages.push(total)
  return pages
})
//  next page
const nextPage = (page: number | string) => {
  if (typeof page !== 'number') return // if page value is boolean it will not return 
  if (page < 1 || page > totals.value) return // never happen
  emit('update:modelValue', page) // open next button
}
</script>
<style scoped></style>