<template>
	<div class="w-full flex gap-1 px-3 py-5">
		<!--implement timeline studied-->
		<div
			:class="`${themeStore.settings.themeSchema !== 'dark' ? ' bg-gray-100 ' : 'bg-gray-800'} w-0 2xl:w-[20%] max-h-[90vh] rounded-b-2xl px-2 py-5 hidden 2xl:flex flex-col items-end justify-start overflow-y-auto`">
			<ButtonGlobal @click="isTimelineShow = true" value="Input now"
				:class="`${themeStore.settings.themeSchema !== 'dark' ? 'bg-gray-800 hover:bg-gray-600' : ''} text-white z-100 top-15 `" />
			<Timeline class="w-full" :activity="timeStore.activities" />
		</div>
		<div class="2xl:w-[80%] w-[100%]">
			<div
				class="mx-auto lg:w-[100%] xl:w-[80%] sm:w-[100%] md:w-[95%] py-10 border-b-[#112a46] border-2 border-r-transparent border-t-transparent border-l-transparent">
				<p class="uppercase font-bold lg:text-center text-start sm:text-start text-sm mb-3">
					Vue 3 Learning Tutorial
				</p>
				<p class="uppercase lg:text-center text-start sm:text-start text-5xl font-bold">
					From Zero to Zero 🤔
				</p>
				<div class="flex justify-between mt-5">
					<ThemeSwitch :theme-schema="themeStore.settings.themeSchema" :is-dark="themeStore.darkMode"
						@switch="themeStore.toggleThemeSchema" />
					<div class="text-white">
						<el-dropdown trigger="click" :hide-on-click="false"
							style="padding: 0.5rem; color: var(--text-color); cursor: pointer;overflow: hidden; background-color: var(--bg-color) ; border: 1px solid rgba(0, 0, 0, 0.11); border-radius: 0.2rem;">
							<div class="flex justify-center place-items-center gap-2.5">
								<div class=" w-9 h-9">
									<img alt="Empty" src="../../app/assets/image/learn.jpg"
										class="w-full h-full object-cover rounded-[50%]" />
								</div>
								<span class="md:block sm:block xl:block hidden ">{{ authStore.user?.username || 'Test'
									}}</span>
							</div>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item disabled>
										Profile
									</el-dropdown-item>
									<el-dropdown-item divided @click="onLogout">
										Logout
									</el-dropdown-item>
									<el-dropdown-item class="mobile-scan">
										<ScanQR />
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</div>
			</div>
			<div
				class="lg:w-[100%] xl:w-[80%] md:w-[95%] sm:w-[100%] mx-auto mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-4 overflow-hidden">
				<!-- Test -->
				<Cardbox title="Test" content="Just a normal click box with auto created box number " path="/test"
					:icon="DocumentAdd">
				</Cardbox>
				<!-- Book -->
				<Cardbox title="Book API"
					content="Google book API with  , list product book as list and view detail of book "
					path="/books" />
				<!-- Payment -->
				<Cardbox title="Payment Type"
					content="Learned the structure and fields should be have when implement payment feature into project"
					path="/payment" :icon="DataLine" />
				<!-- upload with progress -->
				<Cardbox title="Upload Files"
					content="Build a view to upload files with multiple types and loading progress base image uploaded"
					path="/upload" :icon="UploadFilled" />
				<!-- Role and Permission Table -->
				<Cardbox title="Table Tree" content="Build a nest tables row with data role and permission"
					:icon="Avatar" path="/table" />
			</div>
		</div>
	</div>
	<!-- Timeline form-->
	<el-dialog width="500" v-model="isTimelineShow" :show-close="true">
		<p
			:class="`${themeStore.settings.themeSchema == 'dark' ? 'text-white text-2xl font-bold' : ''}text-2xl font-bold`">
			Timeline</p>
		<el-form class="mt-6 font-bold w-full"
			:class="`${themeStore.settings.themeSchema != 'dark' ? '' : 'text-white'}`" :model="timelineModel"
			:rules="timelineRule" :ref="timelineInstance">
			<div class="flex justify-between">
				<el-form-item style="
						display: flex;
						justify-content: space-between;
						align-content: center;
					" prop="timestamp">
					<div class="w-max">
						<span class="mr-4">Date Timeline</span>
						<el-date-picker name="timestamp" v-model="timelineModel.timestamp" type="date"
							placeholder="Select date" />
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
				<el-input name="content" v-model="timelineModel.content" placeholder="Please input title"
					type="textarea" style="width: 240px" />
			</el-form-item>
			<ButtonGlobal @click.prevent="addTimeline"
				:class="`${themeStore.settings.themeSchema != 'dark' ? 'bg-gray-800 text-white hover:bg-gray-600' : 'text-white'}`"
				value="Add" />
		</el-form>
	</el-dialog>
	<RouterView />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Avatar, DataLine, DocumentAdd, UploadFilled } from '@element-plus/icons-vue'
import Timeline, { type Activities } from '@/app/components/card/Timeline.vue'
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'
import { timelineStore } from '@/modules/store/line.ts'
import { type FormInstance, type FormRules } from 'element-plus'
import { useMessage } from '@/app/utils/message.ts'
import ThemeSwitch from '@/app/components/theme/ThemeSwitch.vue'
import { useTheme } from '@/modules/store/theme.ts'
import Cardbox from '@/app/components/card/Cardbox.vue'
import { loginStore } from '@/modules/store/auth'
import route from '@/modules/route'
import ScanQR from '@/app/components/scan/ScanQR.vue'

const message = useMessage()

/* timeline activity*/
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
	message.messageBox('Add Successfully', 'success')
}

/* load timeline */
onMounted(() => timeStore.load())

/* Theme & Auth */
const themeStore = useTheme()
const authStore = loginStore()
const onLogout = () => {
	authStore.logout()
	route.replace('/login')
}
</script>
<style scoped>
:deep(.mobile-scan) {
	display: none !important;
}

@media (max-width: 768px) {
	:deep(.mobile-scan) {
		display: block !important;
		margin: auto;
		width: 100%;
	}
}
</style>
