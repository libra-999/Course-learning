# 📱 QR Scanner Function

## 📖 Introduction

This project implements a **QR Code Scanner component** using Vue 3 and TypeScript. It leverages the `html5-qrcode` library to scan QR codes via a device camera (optimized for mobile devices) and processes authentication tokens through an API.

The component includes:

* Camera permission handling
* Dynamic scan box sizing
* QR parsing and API validation
* Fallback camera selection

---

## 📚 Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Dependencies](#dependencies)
* [Configuration](#configuration)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)

---

## ⚙️ Installation

```bash
npm install html5-qrcode
```

Make sure your Vue project is already set up with:

* Vue 3
* TypeScript

---

## 🚀 Usage

Import and integrate the scanner logic inside your Vue component:

```ts
import { Html5Qrcode } from 'html5-qrcode'
```

Trigger scanner:

```ts
openScanner()
```

The scanner will:

1. Request camera access
2. Start scanning QR codes
3. Extract token from QR
4. Send token to API
5. Stop scanner on success

---

## ✨ Features

* 📷 **Camera-based QR scanning**
* 📱 **Mobile-optimized (back camera detection)**
* 🔒 **HTTPS enforcement for security**
* 🔄 **Automatic fallback to available cameras**
* 🎯 **Dynamic scan box resizing**
* ⚡ **Real-time QR detection (20 FPS)**
* 🔗 **API integration for token validation**
* 🧼 **Auto cleanup on component unmount**

---

## 📦 Dependencies

* [`html5-qrcode`](https://www.npmjs.com/package/html5-qrcode)
* Vue 3 Composition API
* TypeScript

Internal utilities used:

* `terminalLog`
* `extractQR`
* `allowCamera`
* `useMessage`
* `scanQR (Server API)`

---

## ⚙️ Configuration

### Scanner Settings

```ts
const scanConfig = {
  fps: 20,
  qrbox: generateQRBox,
}
```

### Scan Box Settings

```ts
SCAN_BOX_WIDTH = 260
SCAN_BOX_HEIGHT = 260
SCAN_BOX_MIN_SIZE = 180
SCAN_BOX_VIEWPORT_RATIO = 0.78
```

### Camera Selection

* Primary: `facingMode: environment` (rear camera)
* Fallback: First available or labeled rear camera

---

## 🧪 Examples

### Start Scanner

```ts
const openScanner = () => startScanner()
```

### Stop Scanner

```ts
await stopScanner()
```

### Handle Scan Success

```ts
const onScanSuccess = async (qr: string) => {
  const token = extractQR(qr)
  const response = await scanQR(token)
}
```

---

## ⚠️ Troubleshooting

### Camera Not Working

* Ensure the app runs on **HTTPS**
* Confirm device supports camera access
* Use **mobile device** (desktop may fail)

### Scanner Not Starting

* Check browser permissions
* Ensure no other app is using the camera

### QR Not Detected

* Improve lighting conditions
* Adjust distance from QR code
* Ensure QR is not blurry

--- 
## 📌 Notes

* This scanner is **optimized for mobile devices only**
* Requires **secure context (HTTPS)**
* Automatically stops scanning after successful API validation

