<template>
	<div class="flex place-items-center h-full">
		<nav v-if="$route.path === '/system/payment' ">
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path+'/aba'">ABA Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path+'/strip'">Strip Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path+'/crypto'">Crypto Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path+'/aba-checkout'">Checkout</RouterLink>
		</nav>
		<RouterView/>
	</div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>

</style>