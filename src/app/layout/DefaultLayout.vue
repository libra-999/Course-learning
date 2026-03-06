<script setup lang="ts">
import { decrypt } from '@/app/utils/hash.ts'
import { loginStore, type User } from '@/app/store/auth.ts'
import { ref } from 'vue'
import route from '@/route'
import Cardbox from '@/app/components/card/Cardbox.vue'
import { DataLine, DocumentAdd } from '@element-plus/icons-vue'
import Timeline, { type Activities } from '@/app/components/card/Timeline.vue'
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'

const checkLocalstorage = localStorage.getItem('userLogin')
const userData = ref<User>({ username: '', password: '' })
const router = route
const userStore = loginStore()
const objUserData = Object.keys(userData.value)
const isTimelineShow = ref(false)

//  manage key user with exact the value in localstorage
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
// timeline activity
const activities: Activities[] = [
	{
		content: 'Learn pattern code',
		timestamp: new Date(2026, 1, 20).toDateString(),
		color: 'green',
	},
	{
		content: 'Creating component and call to use ',
		timestamp: new Date(2026, 1, 23).toDateString(),
		color: 'blue',
	},
]

</script>
<template>
	<div class="w-[100%] flex gap-1 place-items-center px-3 py-5 text-[#112a46]">
		<!--	implement timeline studied-->
		<div class="w-[20%] hidden 2xl:flex 2xl:flex-col 2xl:items-end 2xl:justify-center">
			<ButtonGlobal @click="isTimelineShow = true" value="Input Timeline" class="bg-gray-800 text-white hover:bg-gray-600" />
			<Timeline :activity="activities" />
		</div>
		<div class="w-[80%]">
			<div
				class="mx-auto lg:w-[100%] xl:w-[80%] sm:w-[100%] md:w-[95%] py-10 border-b-[#112a46] border-2 border-r-transparent border-t-transparent border-l-transparent"
			>
				<p
					class="uppercase font-bold lg:text-center text-start sm:text-start text-sm mb-3"
				>
					Vue 3 Learning Tutorial
				</p>
				<p
					class="uppercase lg:text-center text-start sm:text-start text-5xl font-bold"
				>
					From Zero to Expert
				</p>
			</div>
			<div
				class="lg:w-[100%] xl:w-[80%] md:w-[95%] sm:w-[100%] mx-auto mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-4 overflow-hidden"
			>
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
	</div>

	<!-- Timeline form-->
	<el-dialog width="500" v-model="isTimelineShow" :show-close="true">
		<p class="text-2xl font-bold">Timeline Add</p>
		<el-form class="mt-6 font-bold w-full">
			<el-form-item >
				<span class="mr-4">Date Timeline</span>
				<el-date-picker type="date" placeholder="Select date"/>
			</el-form-item>
			<el-form-item  >
				<span class="mr-4">Color</span>
				<el-color-picker/>
			</el-form-item>
			<el-form-item>
				<span class="mr-4">Content Timeline</span>
				<el-input placeholder="Please input title" class="w-[100px]" type="textarea" style="width: 240px"/>
			</el-form-item>
		</el-form>
	</el-dialog>

	<RouterView />
</template>

<style scoped></style>
