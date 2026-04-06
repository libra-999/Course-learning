<template>
	<div class="flex place-items-center h-full">
		<nav v-if="$route.path === '/payment' ">
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment/aba">ABA Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment/strip">Strip Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment/crypto">Crypto Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" to="/payment/aba-checkout">Checkout</RouterLink>
		</nav>
		<RouterView/>
	</div>
</template>
<script setup lang="ts">
</script>
<style scoped>

</style>