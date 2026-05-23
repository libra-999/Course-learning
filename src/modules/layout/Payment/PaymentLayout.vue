<template> 
	<div class="mobile  h-full">
		<nav v-if="$route.path === '/system/payment'">
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path + '/aba'">ABA
				Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path + '/strip'">
				Strip Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2" :to="$route.path + '/crypto'">
				Crypto Payment</RouterLink>
			<RouterLink class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2"
				:to="$route.path + '/aba-checkout'">Checkout</RouterLink>
		</nav>
		<RouterView />
	</div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.mobile {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	& a {
		max-width: 50%;
	}
}
@media (max-width: $screen-sm) {
	.mobile {
		@include mobile-responsive(100%, auto 0, null, null);
		nav {
			width: 100%;
			display: flex;
			gap: .2rem;
			align-items: center;
			flex-direction: column;
			& a {
				width: 100%;
			}
		}
	}
}
</style>