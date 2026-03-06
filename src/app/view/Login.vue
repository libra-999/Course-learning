<script setup lang="ts">
import { ref } from 'vue'
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'
import { loginStore, type User } from '@/app/store/auth.ts'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { createHash } from '@/app/utils/hash.ts'
import route from '@/route'

// dump data
const dumpData = ref<User>({
	username: 'admin666',
	password: 'b8b5e195e89d7e4921ef6cf2936d07f3', //Admin<>2094
})

const router = route
const userStore = loginStore()
const userRefInstance = ref<FormInstance>()
const userRef = ref<any>({
	username: '',
	password: '',
	isRemember: false, // empty checkbox
})
const userRule: FormRules<User> = {
	username: [
		{ required: true, message: 'Please input username', trigger: 'blur' },
		{
			min: 7,
			max: 40,
			message: 'Username should be 7 length at least',
			trigger: 'blur',
		},
	],
	password: [
		{ required: true, message: 'Please input password', trigger: 'blur' },
		// length of password
		{
			min: 6,
			max: 18,
			message: 'Password should be 6 at least',
			trigger: 'blur',
		},
		// format of password
		{
			pattern: /^(?=[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
			message: 'Incorrect format password.(ex: Sport11(0) )',
			trigger: 'blur',
		},
	],
}

const submit = () => {
	if (!userRefInstance.value) return
	userRefInstance.value.validate()
	const hash = createHash(userRef.value.password)
	if (
		dumpData.value.password === hash &&
		dumpData.value.username === userRef.value.username
	) {
		userStore.login(userRef.value, userRef.value.isRemember)
		ElMessage({
			message: '厉害，请进',
			type: 'success',
		})
		router.replace({
			path: '/',
		})
	} else {
		userStore.logout()
		ElMessage({
			message: '无效账户，您目前是匿名用户',
			type: 'error',
		})
	}
}
</script>

<template>
	<div class="flex place-items-center h-full">
		<div class="container flex-col w-[400px] px-6 py-12 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					src="https://cdn.dribbble.com/userupload/19964294/file/original-aa4499649e9791089dd956f98b8032d7.jpg"
					alt="Your Company"
					class="mx-auto object-cover h-[60px] w-auto bg-transparent"
				/>
				<h2 class="text-center mt-3 text-2xl/9 font-bold">WHO ARE YOU?</h2>
			</div>
			<div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
				<el-form ref="userRefInstance" :rules="userRule" :model="userRef">
					<el-form-item prop="username">
						<label class="font-bold">Username</label>
						<el-input
							v-model="userRef.username"
							name="username"
							type="text"
							placeholder="please input your name"
						/>
					</el-form-item>
					<el-form-item prop="password">
						<label class="font-bold">Password</label>
						<el-input
							v-model="userRef.password"
							type="password"
							name="password"
							show-password
							placeholder="please input your password"
						/>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="userRef.isRemember"
							>Remember user?
						</el-checkbox>
					</el-form-item>
					<ButtonGlobal @click.prevent="submit" value="Submit" />
				</el-form>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&family=DynaPuff:wght@400..700&display=swap');

.container {
	font-family: 'Cascadia Code', sans-serif;
	color: #112a46;
	background: #acc8e5;
	border-radius: 0.7rem 1.2rem 0.7rem 1.2rem;
}
</style>
