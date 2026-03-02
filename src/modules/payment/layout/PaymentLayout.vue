<script setup lang="ts">
</script>
<template>
	<nav v-if="$route.path === '/payment' ">
		<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment/aba">ABA Payment</RouterLink>
		<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment/strip">Strip Payment</RouterLink>
	</nav>
	<RouterView/>
</template>

<style scoped>

</style>