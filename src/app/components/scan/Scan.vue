<template>
    <div class="w-full cursor-pointer" @click.stop="startScanner">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="20" height="20" fill="#070707"
            viewBox="0 0 24 24">
            <path d="M9 5V3H3v6h2V5zM21 9V3h-6v2h4v4zM19 19h-4v2h6v-6h-2zM5 15H3v6h6v-2H5zM2 11h20v2H2z" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { terminalLog } from '@/app/utils/terminalLog'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { extractQR } from '@/app/utils/authToken'

const isScanning = ref(false)
const qrToken = ref('')
const scanner = ref<Html5Qrcode | null>(null)
let readerEl: HTMLDivElement | null = null
const READER_ID = 'qr-reader'

const mountReader = () => {
    if (document.getElementById(READER_ID)) return
    readerEl = document.createElement('div')
    readerEl.id = READER_ID
    Object.assign(readerEl.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '9999',
        background: '#000',
    })
    document.body.appendChild(readerEl)
    // Tap anywhere on preview to stop scanner manually.
    readerEl.addEventListener('click', () => {
        void stopScanner()
    })
}
const unMountReader = async () => {
    const el = document.getElementById(READER_ID)
    if (el) el.remove()
    readerEl = null
}

const stopScanner = async () => {
    try {
        if (scanner.value?.isScanning) {
            await scanner.value.stop()
        }
        if (scanner.value) {
            await scanner.value.clear()
        }
    } finally {
        scanner.value = null
        isScanning.value = false
        unMountReader()
    }
}
const startScanner = async () => {
    if (isScanning.value) return

    try {
        mountReader()
        scanner.value = new Html5Qrcode(READER_ID, {
            verbose: false,
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        })

        isScanning.value = true

        await scanner.value.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 240, height: 240 } },
            async (decodedText) => {
                const token = extractQR(decodedText)
                qrToken.value = token
                terminalLog('info', 'scan', `Token: ${token}`)
                await stopScanner()
            },
            () => { }
        )
    } catch (err) {
        terminalLog(
            'error',
            'scan',
            err instanceof Error ? err.message : 'Failed to start scanner'
        )
        await stopScanner()
    }
}

onUnmounted(() => {
    stopScanner()
})


</script>

<style scoped></style>
