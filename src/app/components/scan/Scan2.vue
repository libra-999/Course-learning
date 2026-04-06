<template>
  <div class="w-full cursor-pointer" @click.stop="openCamera">
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="20" height="20" fill="#070707" viewBox="0 0 24 24">
      <path d="M9 5V3H3v6h2V5zM21 9V3h-6v2h4v4zM19 19h-4v2h6v-6h-2zM5 15H3v6h6v-2H5zM2 11h20v2H2z" />
    </svg>
  </div>
  <input ref="captureInput" type="file" accept="image/*" capture="environment" class="hidden" @change="onCaptured" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { terminalLog } from '@/app/utils/terminalLog'
import { extractQR } from '@/app/utils/authToken'

type QRCodeDetector = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>
}
type QRCodeDetectorCtor = new (options?: { formats?: string[] }) => QRCodeDetector

const captureInput = ref<HTMLInputElement | null>(null)
const qrToken = ref('')
const statusMessage = ref('')

const openCamera = () => {
  if (!captureInput.value) {
    statusMessage.value = 'Camera input is not ready.'
    return
  }
  captureInput.value.value = ''
  captureInput.value.click()
}

const onCaptured = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    statusMessage.value = 'No image captured.'
    return
  }

  try {
    statusMessage.value = 'Reading QR...'

    const Detector = (window as Window & { BarcodeDetector?: QRCodeDetectorCtor }).BarcodeDetector
    if (!Detector) throw new Error('BarcodeDetector is not supported on this browser.')

    const detector = new Detector({ formats: ['qr_code'] })
    const bitmap = await createImageBitmap(file)

    try {
      const results = await detector.detect(bitmap)
      const raw = results?.[0]?.rawValue
      if (!raw) throw new Error('No QR code found.')

      const token = extractQR(raw)
      qrToken.value = token
      statusMessage.value = 'QR read successfully.'
      terminalLog('info', 'scan', `Token: ${token}`)
    } finally {
      bitmap.close()
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to decode QR.'
    statusMessage.value = message
    terminalLog('error', 'scan', message)
  }
}

</script>

<style scoped></style>
