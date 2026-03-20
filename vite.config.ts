import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const pathSrc = path.resolve(__dirname, "src");
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  test: {
    globals: true ,
  },
  resolve: {
    alias: {
      '@': pathSrc,
    }
  }
})
