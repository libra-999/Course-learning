<template>
	<div class="flex justify-center h-full flex-col">
		<!-- Switch login -->
		<div class="flex justify-between w-full mx-auto mb-1">
			<div :class="`${loginType === 'password' ? 'bg-[#acc8e5] font-bold transition-all ' : ''} cursor-pointer border py-2 px-5 w-full rounded-sm transition-all duration-150 border-gray-200`"
				@click="loginType = 'password'">By Manual</div>
			<div :class="`${loginType === 'qrcode' ? 'bg-[#acc8e5] font-bold transition-all' : ''}  cursor-pointer border py-2 px-5 w-full rounded-sm  transition-all duration-150 border-gray-200`"
				@click="loginType = 'qrcode'">By QRScan</div>
		</div>
		<div v-if="loginType === 'password'" class="container flex-col px-6 py-12 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<img src="https://cdn.dribbble.com/userupload/19964294/file/original-aa4499649e9791089dd956f98b8032d7.jpg"
					alt="Your Company" class="mx-auto object-cover h-[60px] w-auto bg-transparent" />
				<h2 class="text-center mt-3 text-2xl/9 font-bold">WHO ARE YOU?</h2>
			</div>
			<div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
				<el-form ref="userRefInstance" :rules="userRule" :model="userRef">
					<el-form-item prop="username">
						<label class="font-bold">Username</label>
						<el-input v-model="userRef.username" name="username" type="text"
							placeholder="please input your name" />
					</el-form-item>
					<el-form-item prop="password">
						<label class="font-bold">Password</label>
						<el-input v-model="userRef.password" type="password" name="password" show-password
							placeholder="please input your password" />
					</el-form-item>
					<ButtonGlobal @click.prevent="submit" value="Submit" class="text-white" />
				</el-form>
			</div>
		</div>
		<div v-if="loginType === 'qrcode'" class="container flex justify-center flex-col pt-5">
			<div v-if="qr.qrCodeStatus === 'waiting'">
				<div v-if="qr.qrCodeImageUrl" class=" my-auto">
					<img  class="w-[60%] mx-auto overflow-hidden" :src="qr.qrCodeImageUrl" alt="Empty QR" />
					<div v-if="qr.qrCountDown != null" class="mt-5 p-3">
						<span>The QR code will be expired in </span>
						<span class=" text-red-600 font-bold"> {{ minuteFormat(qr.qrCountDown) }} </span>
					</div>
				</div>
			</div>
			<div v-else-if="qr.qrCodeStatus === 'scanned'" class="qrcode-status">
				<el-icon class="status-icon scanned">
					<Check />
				</el-icon>
				<p>The QR code has been scanned, please confirm login on your mobile phone</p>
			</div>
			<div v-else-if="qr.qrCodeStatus === 'confirmed'" class=" w-[150px] h-[150px]">
				<el-icon style="width: max-content; height: max-content;">
					<Check />
				</el-icon>
				<p>Login successful, redirecting...</p>
			</div>
			<div v-else-if="qr.qrCodeStatus === 'expired'" class="qrcode-status">
				<p>The QR code has expired, please refresh</p>
				<ButtonGlobal @click="generateQRLogin" value="Refresh QRCode" class="text-white mx-auto mt-2">
					<template #icon-left>
						<el-icon>
							<Refresh />
						</el-icon>
					</template>
				</ButtonGlobal>
			</div>
			<div v-else-if="qr.qrCodeStatus === 'cancelled'" class="qrcode-status">
				<p>Login has been canceled, please refresh</p>
				<ButtonGlobal @click="generateQRLogin" value="Refresh QRCode" class="text-white  mx-auto mt-2">
					<template #icon-left>
						<el-icon>
							<Refresh />
						</el-icon>
					</template>
				</ButtonGlobal>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { loginStore } from '@/modules/store/auth.ts'
import { type FormInstance, type FormRules } from 'element-plus'
import route from '@/modules/route'
import { useMessage } from '@/app/utils/message.ts'
import type { LoginRequest, QRCode, User } from '../types/auth'
import { generateQR, getQR, login } from '../api/auth'
import { minuteFormat, remaingTime } from '@/app/utils/dateFormat'
import { Check, Refresh } from '@element-plus/icons-vue'
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'

const loginType = ref("password")
const qr = ref<QRCode>({
	qrToken: '',
	qrCodeImageUrl: '',
	qrCountDown: 120,
	qrCodeStatus: 'waiting',
	qrCodeExpired: '120'
})
const qrCodePollTimer = ref<ReturnType<typeof setInterval> | null>(null)
const qrCountDownTimer = ref<ReturnType<typeof setInterval> | null>(null)
const router = route
const errorMessage = useMessage()
const userStore = loginStore()
const userRefInstance = ref<FormInstance>()
const userRef = ref<LoginRequest>({
	username: '',
	password: '',
})
const userRule: FormRules<LoginRequest> = {
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
/** login by manual */
const submit = async () => {
	if (!userRefInstance.value) return
	userRefInstance.value.validate()

	try {
		const loginApi = await login(userRef.value);
		if (loginApi.code === 200) {
			const token = loginApi.data.access_token;
			const userDetail = loginApi.data.user
			const user: User = {
				id: userDetail.id,
				username: userDetail.username,
				email: userDetail.email,
				is_online: userDetail.is_online,
				created_at: userDetail.created_at
			}
			errorMessage.messageBox(loginApi.message, "success")
			userStore.login(user, token)
			return router.replace({ path: "/" })
		}
	} catch {
		return errorMessage.messageBox("Something wrong with login!", "error")
	}
}
/** login by QR */
function startQRCodePolling() {
	stopQRCodePolling()
	qrCodePollTimer.value = setInterval(async () => {
		if (!qr.value.qrToken) return

		try {
			const poll = await getQR(qr.value.qrToken)
			const status = poll?.data.status
			qr.value.qrCodeStatus = status

			if (poll?.code === 200 && status === "confirmed") {
				stopQRCodePolling()
				stopQRCodeCountdown()

				// sleep to loading
				await new Promise((r) => setTimeout(r,100)).then(()=> errorMessage.messageBox("Scan login succeed!","success")) // 9ms

				const token = poll.data.qrCodeToken
				const data = poll.data.user
				const userDetail: User = {
					username: data.username,
					email: data.email,
					id: data.id,
					is_online: data.is_online,
					created_at: data.createdAt
				}
				userStore.login(userDetail, token)
				return router.replace({ path: "/" })
			}

			if (status === 'expired' || status === 'canceled') {
				stopQRCodePolling()
				stopQRCodeCountdown()
			}
		} catch {
			errorMessage.notificationBox("Invalid QR Token", "error")
		}
	}, 2000);
}
function startQRCodeCountdown(expired = 120) {
	stopQRCodeCountdown()
	const tick = () => {
		qr.value.qrCountDown = remaingTime(expired)
		if (qr.value.qrCountDown <= 0) {
			qr.value.qrCodeStatus = 'expired'
			stopQRCodeCountdown()
			stopQRCodePolling()
		}
	}
	tick()
	qrCountDownTimer.value = setInterval(tick, 1000)

}
function stopQRCodePolling() {
	if (qrCodePollTimer.value) {
		clearInterval(qrCodePollTimer.value)
		qrCodePollTimer.value = null
	}
}
function stopQRCodeCountdown() {
	if (qrCountDownTimer.value) {
		clearInterval(qrCountDownTimer.value)
		qrCountDownTimer.value = null
	}
}
const generateQRLogin = async () => {
	try {
		stopQRCodePolling()
		stopQRCodeCountdown()
		const genQR = await generateQR();

		qr.value.qrToken = genQR.data.qrCodeToken
		qr.value.qrCodeStatus = genQR.data.status
		qr.value.qrCodeExpired = genQR.data.expiredTime
		qr.value.qrCountDown = remaingTime(qr.value.qrCodeExpired)
		if (genQR.code == 201) {
			/** status === waiting */
			const QRCodePlugin = await import('qrcode')
			const QRCode = QRCodePlugin.default || QRCodePlugin
			const QRDATA = JSON.stringify({
				token: qr.value.qrToken,
				type: 'login'
			})
			try {
				const imageUrl = await QRCode.toDataURL(QRDATA, {
					width: 200,
					margin: 2,
				})
				qr.value.qrCodeImageUrl = imageUrl
				startQRCodeCountdown(qr.value.qrCodeExpired)
				startQRCodePolling()
			} catch {
				errorMessage.notificationBox("Invalid Image Url!", "error")
			}
		} else {
			errorMessage.notificationBox("Failed to generate QR!", "error")
		}
	} catch {
		errorMessage.messageBox("Failed to display QR!", "error")
	}
}
/** watch generateQR */
watch(loginType, (newType) => {
	if (newType === 'qrcode') {
		generateQRLogin()
	} else {
		stopQRCodePolling()
		stopQRCodeCountdown()
	}
})
onUnmounted(() => {
	stopQRCodePolling()
	stopQRCodeCountdown()
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&family=DynaPuff:wght@400..700&display=swap');

.container {
	width: 500px;
	min-height: 400px;
	font-family: 'Cascadia Code', sans-serif;
	background: #acc8e5;
	border-radius: 0.7rem 1.2rem 0.7rem 1.2rem;
}
</style>
