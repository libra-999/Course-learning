import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const pathSrc = path.resolve(__dirname, "src");
// const clientLogPlugin = () => ({
//   name: 'client-log-plugin',
//   configureServer(server: any) {
//     server.middlewares.use('/__client-log', (req: any, res: any, next: any) => {
//       if (req.method !== 'POST') {
//         next()
//         return
//       }

//       let rawBody = ''
//       req.on('data', (chunk: Buffer | string) => {
//         rawBody += chunk.toString()
//       })

//       req.on('end', () => {
//         try {
//           const payload = JSON.parse(rawBody || '{}') as {
//             level?: 'log' | 'info' | 'warn' | 'error'
//             message?: string
//             source?: string
//           }

//           const level = payload.level ?? 'log'
//           const source = payload.source ?? 'client'
//           const message = payload.message ?? '(empty)'

//           const allowedLevel = ['log', 'info', 'warn', 'error'].includes(level) ? level : 'log'
//           ;(console as any)[allowedLevel](`[client:${source}] ${message}`)
//         } catch {
//           console.warn(`[client] invalid log payload: ${rawBody}`)
//         }

//         res.statusCode = 204
//         res.end()
//       })
//     })
//   },
// })

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  plugins: [
    // clientLogPlugin(),
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
