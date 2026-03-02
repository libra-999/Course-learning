<script setup lang="ts">
</script>
<template>
    <div class="my-5 text-black mx-2">
        <p> <strong>Modules</strong></p>
    </div>
    <nav>
        <RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/test">Test</RouterLink>
        <RouterLink class=" text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/books">Book Store</RouterLink>
        <RouterLink class=" text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment">Crypto</RouterLink>
    </nav>
    <RouterView />
</template>

<style scoped></style>