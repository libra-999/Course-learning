<template>
   <div class="w-full cursor-pointer" @click.stop="openScanner">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="20" height="20" fill="#070707"
           viewBox="0 0 24 24">
         <path d="M9 5V3H3v6h2V5zM21 9V3h-6v2h4v4zM19 19h-4v2h6v-6h-2zM5 15H3v6h6v-2H5zM2 11h20v2H2z"/>
      </svg>
   </div>
   <Teleport to="body">
      <div v-if="isScannerVisible" class="scan-overlay" @click.self="stopScanner">
         <div class="scan-overlay-toolbar">
            <p class="scan-overlay-toolbar-title">Scan QR</p>
            <button type="button" class="scan-overlay-toolbar-close-btn" @click.stop="stopScanner">Close</button>
         </div>

         <div class="scan-overlay-reader-wrap">
            <div :id="READER_ID" class="scan-overlay-reader-wrap-reader"></div>
            <div class="scan-overlay-reader-wrap-frame" :style="scanFrameStyle" aria-hidden="true"></div>
            <p class="scan-overlay-reader-wrap-tip">Align QR code inside the frame</p>
         </div>
      </div>
   </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from 'vue'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { extractQR } from '@/app/utils/authToken'
import { allowCamera } from '@/app/utils/deviceParty.ts'
import { useMessage } from '@/app/utils/message'
import { confirmLogin, scanQR } from '@/modules/api/auth'
import useSocket, { type SocketAck } from '@/app/utils/si'
import { QR_KEY } from '@/modules/config/socket.config'


const isScanning = ref (false)
const isScannerVisible = ref (false)
const isStarting = ref (false)
const scanner = ref<Html5Qrcode | null> (null)
const message = useMessage ()
const {initSocket, sendMessage} = useSocket<any> ({})

/* KEY allow  */
const READER_ID = 'qr-reader'
const BACK_CAMERA_REGEX = /back|rear|environment|traseira|trasera/i
const EMPTY_SCAN_ERROR_CALLBACK = () => {
}

/* style scan  */
const SCAN_BOX_WIDTH = 260
const SCAN_BOX_HEIGHT = 260
const SCAN_BOX_MIN_SIZE = 180
const SCAN_BOX_VIEWPORT_RATIO = 0.78
const frameWidth = ref (SCAN_BOX_WIDTH)
const frameHeight = ref (SCAN_BOX_HEIGHT)

/* camera allowing */
const errorCameraSupport = () => {
   // allow only mobile device
   if (!allowCamera ()) {
      return message.messageBox ("Scanner is available on mobile device only.", "warning")
   }
   // make sure is https
   if (!window.isSecureContext) {
      return message.messageBox ("Camera access requires HTTPS. Please open this page in a secure context.", "warning")
   }
}

/* crop as box to scan */
const generateQRBox = (viewfinderWidth: number, viewfinderHeight: number) => {
   const maxWidth = Math.floor (viewfinderWidth * SCAN_BOX_VIEWPORT_RATIO)
   const maxHeight = Math.floor (viewfinderHeight * SCAN_BOX_VIEWPORT_RATIO)
   const safeWidth = Math.max (SCAN_BOX_MIN_SIZE, Math.min (SCAN_BOX_WIDTH, maxWidth))
   const safeHeight = Math.max (SCAN_BOX_MIN_SIZE, Math.min (SCAN_BOX_HEIGHT, maxHeight))

   frameWidth.value = safeWidth
   frameHeight.value = safeHeight

   return {
      width: safeWidth,
      height: safeHeight,
   }
}

const scanFrameStyle = computed (() => ({
   width: `${frameWidth.value}px`,
   height: `${frameHeight.value}px`,
}))

/* config camera  */
const scanConfig = {
   fps: 20,
   qrbox: generateQRBox,
}

/* handle api request to scan plugin */
const onScanSuccess = async (qr: string) => {
   if (!qr) message.notificationBox ("QR must be provide", "warning")
   const token = extractQR (qr)

   //** pust message to server */
   sendMessage<SocketAck> (QR_KEY.QR_JOIN_ROOM, {qrToken: token}, (ack) => {
      if (!ack?.status) {
         message.notificationBox (ack?.message || 'Unable to join QR room', "error")
      }
   })

   try {
      const scanAPI = await scanQR (token)
      if (scanAPI.code !== 200) {
         return message.messageBox (scanAPI.message, "error")
      }
      await onConfirmed (token) // then it will told login.vue to check statusQR , then you can login
      await stopScanner () // if token got so close camera imediately
      return message.messageBox ("Scanning succeed", "success")
   } catch {
      message.messageBox ("QR scan failed!", "error")
      return
   } finally {
      //** leave room after success */
      sendMessage<SocketAck> (QR_KEY.QR_LEAVE_ROOM, {qrToken: token})
   }
}

const onConfirmed = async (qrToken: string) => {
   if (!qrToken) return message.notificationBox ("Token must be required", "error")
   try {
      await confirmLogin (qrToken)
   } catch {
      return message.messageBox ("Something wrong with scanning", "error")
   }
}

/* Hmlt5Qrcode setup */
const startByFacingMode = async (instance: Html5Qrcode) => {
   await instance.start (
       {facingMode: 'environment'},
       scanConfig,
       onScanSuccess,
       EMPTY_SCAN_ERROR_CALLBACK
   )
}

const startByAvailableCamera = async (instance: Html5Qrcode) => {
   const cameras = await Html5Qrcode.getCameras ()
   const firstCamera = cameras[0]
   if (!firstCamera) {
      message.notificationBox ("No camera was found on this device.", "warning")
      return
   }

   const preferredCamera =
       cameras.find ((camera) => BACK_CAMERA_REGEX.test (camera.label)) ?? firstCamera

   await instance.start (
       preferredCamera.id,
       scanConfig,
       onScanSuccess,
       EMPTY_SCAN_ERROR_CALLBACK
   )
}
const createScanner = () =>
    new Html5Qrcode (READER_ID, {
       verbose: false,
       formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    })

/* listen from Hmlt5Qrcode is correct or error */
const stopScanner = async () => {
   const instance = scanner.value
   scanner.value = null

   isScanning.value = false
   isStarting.value = false
   isScannerVisible.value = false

   if (!instance) return
   try {
      if (instance.isScanning) {
         await instance.stop ()
      }
   } finally {
      instance.clear ()
   }
}

const startScanner = async () => {
   if (isScanning.value || isStarting.value) return
   isStarting.value = true
   initSocket ()
   errorCameraSupport ()  // exception camera

   try {
      isScannerVisible.value = true
      await nextTick ()  // check scan QR , make it is QRCODE
      const instance = createScanner ()
      scanner.value = instance
      try {
         await startByFacingMode (instance)
      } catch {
         await startByAvailableCamera (instance)
      }
      isScanning.value = true // keep scaning
   } catch {
      message.notificationBox ("Failed to start scanner", "error")
      await stopScanner ()
   } finally {
      isStarting.value = false
   }
}

/* toggle camera */
const openScanner = () => startScanner ()
onUnmounted (() => {
   stopScanner ()
})

</script>

<style lang="scss" scoped>
.scan-overlay {
   position: fixed;
   inset: 0;
   z-index: 9999;
   background: $scan_overlay;
   display: flex;
   flex-direction: column;
   &-toolbar{
      height: 56px;
      min-height: 56px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.72);
      &-title{
         color: $white;
         font-size: 14px;
         font-weight: 700;
         letter-spacing: 0.2px;
      }
      &-close-btn{
         border: 0;
         color: $scan_close_btn;
         background: $white;
         border-radius: 8px;
         padding: 6px 10px;
         font-size: 12px;
         font-weight: 700;
         cursor: pointer;
      }
   }
   &-reader-wrap{
      position: relative;
      flex: 1;
      overflow: hidden;
      &-reader{
         width: 100%;
         height: 100%;
      }
      &-frame{
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         border: 2px solid rgba(255, 255, 255, 0.9);
         border-radius: 12px;
         pointer-events: none;
         box-shadow: 0 0 0 200vmax rgba(0, 0, 0, 0.44);
      }
      &-tip{
         position: absolute;
         left: 50%;
         bottom: max(44px, env(safe-area-inset-bottom));
         transform: translateX(-50%);
         color: rgba(255, 255, 255, 0.9);
         font-size: 13px;
         letter-spacing: 0.2px;
      }
   }
}


:deep(#qr-reader) {
   border: 0 !important;
   background: $scan_overlay !important;
}

:deep(#qr-reader video) {
   width: 100% !important;
   height: 100% !important;
   object-fit: cover !important;
}
</style>
