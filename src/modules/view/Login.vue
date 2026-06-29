<template>
   <div
       :class="`login-container flex justify-center h-full flex-col ${currentValue === 'kh' ? 'login-container-font-khmer' : ''}`">
      <!-- Switch login -->
      <div class="flex justify-between w-full mx-auto mb-1 hidden lg:flex xl:flex 2xl:flex sm:flex">
         <div
             :class="`${loginType === 'password' ? 'bg-[#acc8e5] font-bold transition-all ' : ''} cursor-pointer border py-2 px-5 w-full rounded-sm transition-all duration-150 border-gray-200`"
             @click="loginType = 'password'">
            {{ t ("LOGIN.option_1") }}
         </div>
         <div
             :class="`${loginType === 'qrcode' ? 'bg-[#acc8e5] font-bold transition-all' : ''}  cursor-pointer border py-2 px-5 w-full rounded-sm  transition-all duration-150 border-gray-200`"
             @click="loginType = 'qrcode'">
            {{ t ("LOGIN.option_2") }}
         </div>
      </div>
      <div v-if="loginType === 'password'" class="container flex-col px-6 py-12 lg:px-8">
         <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="https://cdn.dribbble.com/userupload/19964294/file/original-aa4499649e9791089dd956f98b8032d7.jpg"
                 alt="Your Company" class="mx-auto object-cover h-[60px] w-auto bg-transparent"/>
            <h2 class="text-center mt-3 text-2xl/9 font-bold">{{ t ("LOGIN.FILL.title") }}</h2>
         </div>
         <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <el-form ref="userRefInstance" :rules="userRule" :model="userRef">
               <el-form-item prop="username">
                  <label class="font-bold">{{ t ("LOGIN.FILL.FORM_ITEM.username") }}</label>
                  <el-input v-model="userRef.username" name="username" type="text"
                            :placeholder="`${t('LOGIN.FILL.FORM_ITEM.username_placeholder')}`"/>
               </el-form-item>
               <el-form-item prop="password">
                  <label class="font-bold">{{ t ("LOGIN.FILL.FORM_ITEM.pwd") }}</label>
                  <el-input v-model="userRef.password" type="password" name="password" show-password
                            :placeholder="`${t('LOGIN.FILL.FORM_ITEM.pwd_placeholder')}`"/>
               </el-form-item>
               <el-form-item prop="isRemember">
                  <el-checkbox v-model="userRef.isRemember" name="isRemember">{{
                        t ('LOGIN.FILL.FORM_ITEM.remember')
                     }}
                  </el-checkbox>
               </el-form-item>
               <ButtonGlobal @click.prevent="submit" :value="`${t('LOGIN.FILL.FORM_ITEM.submit')}`"
                             class="text-white text-center container-button"/>
            </el-form>
         </div>
      </div>
      <div v-if="loginType === 'qrcode'" class="container flex justify-center flex-col pt-5">
         <div v-if="qr.qrCodeStatus === 'waiting'">
            <div v-if="qr.qrCodeImageUrl" class="my-auto">
               <img class="w-[60%] mx-auto overflow-hidden" :src="qr.qrCodeImageUrl" alt="Empty QR"/>
               <div v-if="qr.qrCountDown != null" class="mt-5 p-3">
                  <span>{{ t (`LOGIN.SCAN.POLLING.status.${qr.qrCodeStatus}`) }} </span>
                  <span class="text-red-600 font-bold">
							{{ minuteFormat (qr.qrCountDown) }}
						</span>
               </div>
            </div>
         </div>
         <div v-else-if="qr.qrCodeStatus === 'scanned'" class="text-center">
            <el-icon class="status-icon scanned">
               <Select/>
            </el-icon>
            <p>
               {{ t (`LOGIN.SCAN.POLLING.status.${qr.qrCodeStatus}`) }}
            </p>
         </div>
         <div v-else-if="qr.qrCodeStatus === 'confirmed'" class="text-center">
            <img class="w-[40%] mx-auto overflow-hidden" :src="qr.qrCodeImageUrl" alt="Empty QR"/>
            <p>{{ t (`LOGIN.SCAN.POLLING.status.${qr.qrCodeStatus}`) }} </p>
         </div>
         <div v-else-if="qr.qrCodeStatus === 'expired'" class="text-center">
            <img class="w-[40%] mx-auto overflow-hidden" :src="qr.qrCodeImageUrl" alt="Empty QR"/>
            <p>{{ t (`LOGIN.SCAN.POLLING.status.${qr.qrCodeStatus}`) }} </p>
            <ButtonGlobal @click="generateQRLogin" :value="`${t('LOGIN.SCAN.POLLING.button_refresh')}`"
                          class="text-white mx-auto mt-2">
               <template #icon-left>
                  <el-icon>
                     <Refresh/>
                  </el-icon>
               </template>
            </ButtonGlobal>
         </div>
         <div v-else-if="qr.qrCodeStatus === 'cancelled'" class="text-center">
            <p>{{ t (`LOGIN.SCAN.POLLING.status.${qr.qrCodeStatus}`) }} </p>
            <ButtonGlobal @click="generateQRLogin" :value="`${t('LOGIN.SCAN.POLLING.button_refresh')}`"
                          class="text-white mx-auto mt-2">
               <template #icon-left>
                  <el-icon>
                     <Refresh/>
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
import type { LoginRequest, QRCodeData, User } from '../types/auth'
import { generateQR, getQR, login } from '../api/auth'
import { minuteFormat, remainingTime } from '@/app/utils/dateFormat'
import { Refresh, Select } from '@element-plus/icons-vue'
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue'
import scanTick from '@/app/assets/image/scan_tick.png'
import { useI18n } from 'vue-i18n'
import useSocket from '@/app/utils/si'
import { QR_KEY } from '@/modules/config/socket.config'
import { useLocale } from '@/modules/locales'
import Cookies from "js-cookie"
import { generateHash } from '@/app/utils/crypto'


const {t} = useI18n ()
const {currentValue} = useLocale ()
const loginType = ref ('password')
const qrCountDownTimer = ref<ReturnType<typeof setInterval> | null> (null)
const errorMessage = useMessage ()
const userStore = loginStore ()
const userRefInstance = ref<FormInstance> ()
const {initSocket, sendMessage, onEvent, offEvent} = useSocket<any> ({})
const qr = ref<QRCodeData> ({
   qrToken: '',
   qrCodeImageUrl: '',
   qrCountDown: 120,
   qrCodeStatus: 'waiting',
   qrCodeExpired: '120',
})
const userRef = ref<LoginRequest> ({
   username: 'test',
   password: 'Test88888$',
   isRemember: false

})
const userRule: FormRules<LoginRequest> = {
   username: [
      {required: true, message: t ("LOGIN.FILL.FORM_ITEM.username_isNull"), trigger: 'blur'},
      {
         min: 3,
         max: 40,
         message: t ("LOGIN.FILL.FORM_ITEM.username_length_validate"),
         trigger: 'blur',
      },
   ],
   password: [
      {required: true, message: t ("LOGIN.FILL.FORM_ITEM.pwd_isNull"), trigger: 'blur'},
      // length of password
      {
         min: 6,
         max: 18,
         message: t ("LOGIN.FILL.FORM_ITEM.pwd_isNull"),
         trigger: 'blur',
      },
      // format of password
      {
         pattern: /^(?=[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
         message: t ("LOGIN.FILL.FORM_ITEM.pwd_pattern_validate"),
         trigger: 'blur',
      },
   ],
}

/** manage room */
initSocket ()

function leaveQRRoom() {
   if (!qr.value.qrToken) return
   sendMessage (QR_KEY.QR_LEAVE_ROOM, {qrToken: qr.value.qrToken})
}

/** login by manual */
async function submit() {
   if (!userRefInstance.value) return
   userRefInstance.value.validate ()
   try {
      const payload = {
         username: userRef.value.username,
         password: userRef.value.password
      }
      const loginApi = await login (payload)
      if (userRef.value.isRemember) {
         Cookies.set ("username", userRef.value.username, {expires: 30}) // expired in a month
         Cookies.set ("password", generateHash (userRef.value.password), {expires: 30})
         Cookies.set ("isRemember", userRef.value.isRemember, {expires: 30})
      } else {
         Cookies.remove ("username")
         Cookies.remove ("password")
         Cookies.remove ("isRemember")
      }
      if (loginApi.code === 200) {

         const token = loginApi.data.access_token
         const userDetail = loginApi.data.user
         const user: User = {
            id: userDetail.id,
            username: userDetail.username,
            email: userDetail.email,
            is_online: userDetail.is_online,
            created_at: userDetail.created_at,
         }
         errorMessage.messageBox (t('LOGIN.API.success.login_success'), 'success')
         userStore.login (user, token)
         return route.replace ({path: '/system'})
      }
   } catch {
      return errorMessage.messageBox (t ("LOGIN.API.error.wrong_login"), 'error')
   }
}

/** Countdown event */
function startQRCodeCountdown(expired = 120) {
   stopQRCodeCountdown ()
   const tick = () => {
      qr.value.qrCountDown = remainingTime (expired)
      if (qr.value.qrCountDown <= 0) { // expired countdown time
         qr.value.qrCodeStatus = 'expired'
         leaveQRRoom () // leave roome when QR code expired
         stopQRCodeCountdown ()
      }
   }
   tick ()
   qrCountDownTimer.value = setInterval (tick, 1000)
}

function stopQRCodeCountdown() {
   if (qrCountDownTimer.value) {
      clearInterval (qrCountDownTimer.value)
      qrCountDownTimer.value = null
   }
}

/** login by qrcode */
async function generateQRLogin() {
   try {
      leaveQRRoom ()
      stopQRCodeCountdown ()
      const genQR = await generateQR ()

      qr.value.qrToken = genQR.data.qrCodeToken
      qr.value.qrCodeStatus = genQR.data.status
      qr.value.qrCodeExpired = genQR.data.expiredTime
      qr.value.qrCountDown = remainingTime (qr.value.qrCodeExpired)
      if (genQR.code == 201) {

         /** join room */
         sendMessage (QR_KEY.QR_JOIN_ROOM, {qrToken: qr.value.qrToken})
         /** status === waiting */
         const QRCodePlugin = await import('qrcode')
         const QRCode = QRCodePlugin.default || QRCodePlugin
         const QRDATA = JSON.stringify ({
            token: qr.value.qrToken,
            type: 'login',
         })
         try {
            const imageUrl = await QRCode.toDataURL (QRDATA, {
               width: 200,
               margin: 2,
            })
            qr.value.qrCodeImageUrl = imageUrl
            startQRCodeCountdown (qr.value.qrCodeExpired)
         } catch {
            errorMessage.notificationBox (t ("LOGIN.API.error.qr_generate_url_login"), 'error')
         }
      } else {
         errorMessage.notificationBox (t ("LOGIN.API.error.qr_generate_login"), 'error')
      }
   } catch {
      errorMessage.messageBox (t ("LOGIN.API.error.qr_generate_display"), 'error')
   }
}

async function qrRouteToLogin(data: any) {
   // prevent null user & token
   if (!data?.user || !data?.accessToken) return
   stopQRCodeCountdown ()
   leaveQRRoom ()

   qr.value.qrCodeStatus = 'confirmed'
   qr.value.qrCodeImageUrl = scanTick
   // await new Promise((r) => setTimeout(r, 150))
   errorMessage.messageBox (t ("LOGIN.API.success.scan_polling_login"), 'success')

   const token = data.accessToken
   const userData = data.user
   const userDetail: User = {
      username: userData.username,
      email: userData.email,
      id: userData.id,
      is_online: userData.is_online,
      created_at: userData.createdAt ?? userData.created_at,
   }
   userStore.login (userDetail, token)
   await route.replace ({path: '/system'})
}

async function fetchQrStateByStatus() {
   if (!qr.value.qrToken) return
   try {
      const poll = await getQR (qr.value.qrToken)
      const status = poll?.data?.status
      if (status) {
         qr.value.qrCodeStatus = status
      }
      if (poll?.code === 200 && status === 'confirmed') {
         await qrRouteToLogin (poll.data)
         return
      }
      if (status === 'expired' || status === 'cancelled') {
         leaveQRRoom ()
         stopQRCodeCountdown ()
      }
   } catch {
      errorMessage.notificationBox (t ("LOGIN.API.error.scan_polling_token_login"), 'error')
   }
}

//** QR status from socket */
async function listenRoomQRByStatus(payload: any) {

   // payload from server side socket
   if (!payload) return errorMessage.notificationBox (t ("LOGIN.API.error.qr_generate_display"), 'error')
   if (!payload.qrToken && !payload.status) return errorMessage.notificationBox (t ("LOGIN.API.error.qr_generate_display"), 'error')
   if (payload.qrToken !== qr.value.qrToken) return // if the qrToken is not same as current qrToken, ignore the status update

   const status = payload.status
   if (!status) return
   qr.value.qrCodeStatus = status

   if (status === 'confirmed') {
      await qrRouteToLogin (payload)
      return
   }
   if (status === 'expired' || status === 'cancelled') {
      leaveQRRoom ()
      stopQRCodeCountdown ()
   }
   await fetchQrStateByStatus ()
   return
}

async function onSocketConnected() {
   if (loginType.value !== 'qrcode' || !qr.value.qrToken) return
   sendMessage (QR_KEY.QR_JOIN_ROOM, {qrToken: qr.value.qrToken})
   await fetchQrStateByStatus ()
}

onEvent (QR_KEY.QR_STATUS, listenRoomQRByStatus)
onEvent ('connect', onSocketConnected)


/** fetching request */
watch (loginType, (newType) => {
   if (newType === 'qrcode') {
      generateQRLogin ()
   } else {
      leaveQRRoom ()
      stopQRCodeCountdown ()
   }
})

onUnmounted (() => {
   offEvent (QR_KEY.QR_STATUS, listenRoomQRByStatus)
   offEvent ('connect', onSocketConnected)
   leaveQRRoom ()
   stopQRCodeCountdown ()
})
</script>
<style scoped lang="scss">
.login-container {
   width: 20%;
   margin: 0 auto;

   & .container {
      width: 100%;
      min-height: 400px;
      font-family: 'Cascadia Code', sans-serif;
      background: #acc8e5;
      border-radius: 0.7rem 1.2rem 0.7rem 1.2rem;
   }

   & .login-container-font-khmer {
      font-family: "Nokora", sans-serif;
      font-optical-sizing: auto;
      font-style: normal;
      font-weight: 400;
   }
}

@media (min-width: $screen-lg) and (max-width: $screen-xxl) {
   .login-container{
      width: 80%;
      margin: 0 auto;
      &.container{
         width: 100%;
      }
   }
}

@media (min-width: $screen-md) and (max-width: $screen-lg) {
   .login-container{
      width: 80%;
      margin: 0 auto;
   }
}

@media (max-width: $screen-md) {

   .login-container {
      width: 100%;
      padding: 0.2rem;
      & .container {
         height: 100%;
         display: flex;
         justify-content: center;
         border-radius: 0;
         margin: 0 auto;

         & :deep(.el-input__wrapper) {
            min-height: 60px;
         }

         & .container-button {
            width: 100%;
            height: 70px;
            margin-left: 0;
         }
      }
   }
}
</style>
