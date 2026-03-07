<script setup lang="ts">
import { decrypt } from '@/app/utils/hash.ts'
import { loginStore, type User } from '@/app/store/auth.ts'
import { onMounted, ref } from 'vue'
import route from '@/app/route'
import Cardbox from '@/app/components/card/Cardbox.vue'
import { DataLine, DocumentAdd, UploadFilled } from '@element-plus/icons-vue'
import Timeline, { type Activities } from '@/app/components/card/Timeline.vue'
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'
import { timelineStore } from '@/app/store/line.ts'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const checkLocalstorage = localStorage.getItem('userLogin')
const userData = ref<User>({ username: '', password: '' })
const router = route
const userStore = loginStore()
const objUserData = Object.keys(userData.value)

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
	userStore.logout()
	router.back()
}
// timeline activity
const isTimelineShow = ref(false)
const timelineInstance = ref<FormInstance>()
const timelineRule: FormRules<Activities> = {
	content: [
		{ required: true, message: 'Please input content', trigger: 'blur' },
	],
	color: [{ required: true, message: 'Please pick a color', trigger: 'blur' }],
	timestamp: [
		{ required: true, message: 'Please select date', trigger: 'blur' },
	],
}
const timeStore = timelineStore()
const timelineModel = ref<Activities>({
	content: '',
	color: '',
	timestamp: '',
})
const addTimeline = async () => {
	timeStore.isSave({ ...timelineModel.value })
	ElMessage({
		message: 'Add Successfully!',
		type: 'success',
	})
}

// load timeline
onMounted(() => timeStore.load())
</script>
<template>
	<div class="w-[100%] flex gap-1 px-3 py-5 text-[#112a46]">
		<!--	implement timeline studied-->
		<div
			class="w-0 2xl:w-[20%] max-h-[90vh] bg-gray-100 rounded-b-2xl px-2 py-5 hidden 2xl:flex flex-col items-end justify-start overflow-y-auto"
		>
			<ButtonGlobal
				@click="isTimelineShow = true"
				value="Input now"
				class="bg-gray-800 text-white z-100 top-15 hover:bg-gray-600"
			/>
			<Timeline class="w-full" :activity="timeStore.activities" />
		</div>
		<div class="2xl:w-[80%] w-[100%]">
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
				<!-- upload with progress -->
				<Cardbox
					title="Upload Files"
					content="Build a view to upload files with multiple types and loading progress base image uploaded"
					path="/upload"
					:icon="UploadFilled"
				/>
			</div>
		</div>
	</div>
	<!-- Timeline form-->
	<el-dialog width="500" v-model="isTimelineShow" :show-close="true">
		<p class="text-2xl font-bold">Timeline Add</p>
		<el-form
			class="mt-6 font-bold w-full"
			:model="timelineModel"
			:rules="timelineRule"
			:ref="timelineInstance"
		>
			<div class="flex justify-between">
				<el-form-item
					style="
						display: flex;
						justify-content: space-between;
						align-content: center;
					"
					prop="timestamp"
				>
					<div class="w-max">
						<span class="mr-4">Date Timeline</span>
						<el-date-picker
							name="timestamp"
							v-model="timelineModel.timestamp"
							type="date"
							placeholder="Select date"
						/>
					</div>
				</el-form-item>
				<el-form-item prop="color">
					<div class="w-[15%]">
						<el-color-picker name="color" v-model="timelineModel.color" />
					</div>
				</el-form-item>
			</div>

			<el-form-item prop="content">
				<span class="mr-4">Content Timeline</span>
				<el-input
					name="content"
					v-model="timelineModel.content"
					placeholder="Please input title"
					class="w-[100px]"
					type="textarea"
					style="width: 240px"
				/>
			</el-form-item>
			<ButtonGlobal
				@click.prevent="addTimeline"
				class="bg-gray-800 text-white hover:bg-gray-600"
				value="Add"
			/>
		</el-form>
	</el-dialog>
	<RouterView />
</template>

<style scoped></style>
