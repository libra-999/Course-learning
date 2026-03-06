<script setup lang="ts">
import { decrypt } from '@/app/utils/hash.ts'
import { loginStore, type User } from '@/app/store/auth.ts'
import { ref } from 'vue'
import route from '@/route'
import Cardbox from '@/app/components/card/Cardbox.vue'
import { DataLine, DocumentAdd } from '@element-plus/icons-vue'

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
	<div class="w-[100%] px-3 py-5  text-[#112a46]">
		<div
			class="mx-auto lg:w-[85%] xl:w-[70%]  sm:w-[100%]  md:w-[95%] py-10 border-b-[#112a46] border-2 border-r-transparent border-t-transparent border-l-transparent">
			<p class="uppercase font-bold lg:text-center  text-start sm:text-start text-sm mb-3">
				Vue 3 Learning Tutorial
			</p>
			<p class="uppercase lg:text-center text-start sm:text-start text-5xl font-bold">
				From Zero to Expert
			</p>
		</div>
		<div class="lg:w-[85%] xl:w-[70%] md:w-[95%] sm:w-[100%] mx-auto mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-4 overflow-hidden">
			<!-- Test -->
			<Cardbox
				title="Test"
				content="Just a normal click box with auto created box number "
				path="/test"
				:icon="DocumentAdd"
			>
			</Cardbox>
			<!-- Book -->
			<Cardbox
				title="Book API"
				content="Google book API with  , list product book as list and view detail of book "
				path="/books"
			/>
			<!-- Payment -->
			<Cardbox
				title="Payment Type"
				content="Learned the structure and fields should be have when implement payment feature into project"
				path="/payment"
				:icon="DataLine"
			/>
		</div>
	</div>
	<RouterView />
</template>

<style scoped>
</style>
