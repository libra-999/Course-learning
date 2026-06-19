<script setup lang="ts">
</script>
<template>
   <div class="loader"></div>
</template>
<style scoped lang="scss">
.loader {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	display: block;
	margin:15px auto;
	position: relative;
	color: var(--text-color);
	box-sizing: border-box;
	transform: translate(-50%,-50%);
	animation: animloader 1s linear infinite alternate;
}

@keyframes animloader {
	0% {
		box-shadow: -38px -6px, -14px 6px,  14px -6px;
	}
	33% {
		box-shadow: -38px 6px, -14px -6px,  14px 6px;
	}
	66% {
		box-shadow: -38px -6px, -14px 6px, 14px -6px;
	}
	100% {
		box-shadow: -38px 6px, -14px -6px, 14px 6px;
	}
}

@media screen and (max-width: $screen-md) {
	.loader {
		transform: translate(-50%,-50%) scale(0.6);
	}

}
</style>