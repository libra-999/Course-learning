<script setup lang="ts">
import { decrypt } from '@/app/utils/hash.ts'
import { loginStore, type User } from '@/app/store/auth.ts'
import { ref } from 'vue'
import route from '@/route'

const checkLocalstorage = localStorage.getItem('userLogin')
const userData = ref<User>({ username: '', password: '' })
const router = route
const userStore = loginStore()
const objUserData = Object.keys(userData.value)

try {
	let data = decrypt(checkLocalstorage)
	const objData = Object.keys(data)
	if (
		objUserData.length !== objData.length &&
		!objUserData.every((key) => objUserData.includes(key))
	) {
		userStore.logout()
		router.replace({
			path: '/login',
			query: { isAuth: 'false' },
		})
	}
} catch (error) {
	console.log(error)
	userStore.logout()
	router.back()
}
</script>
<template>
	<div class="my-5 text-black mx-2">
		<p><strong>Modules</strong></p>
	</div>
	<nav>
		<RouterLink
			class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2"
			to="/test"
			>Test
		</RouterLink>
		<RouterLink
			class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2"
			to="/books"
			>Book Store
		</RouterLink>
		<RouterLink
			class="text-white border-2 rounded-sm bg-blue-400 w-max p-2 mx-2"
			to="/payment"
			>Payment
		</RouterLink>
	</nav>
	<RouterView />
</template>

<style scoped></style>
