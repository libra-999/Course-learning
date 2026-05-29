<template>
    <div>
    </div>
</template>

<script setup lang="ts">
import { permissionStore } from '@/modules/store/permission';


const permission = permissionStore()
const route = permission.generateRoutes()
</script>

<style scoped>

</style>