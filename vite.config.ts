import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { clientLogPlugin } from './src/app/utils/terminalLog'
import PostCssPxToRem from 'postcss-pxtorem'
import { loadEnv } from 'vite'


const pathSrc = path.resolve (__dirname, 'src')

export default defineConfig (({mode}) => {
   const env = loadEnv (mode, process.cwd (), '')
   return {
      server: {
         host: '0.0.0.0', // allow anywhere
         port: 7001, // port access
         proxy: {
            [env.VITE_SERVER_PROXY]: {
               target: env.VITE_SERVER_URL,
               changeOrigin: true,
               rewrite: (p) => p.replace (new RegExp (`^${env.VITE_SERVER_PROXY}`), '')
            },
            '/socket.io': {
               target: env.VITE_SERVER_SOCKET_URL,
               changeOrigin: true,
               ws: true,
            }
         },
      },
      // basicSsl() = testing for handling in secure
      plugins: [vue (), tailwindcss (), clientLogPlugin ()],
      test: {
         globals: true,
      },
      resolve: {
         alias: {
            '@': pathSrc,
         },
      },
      css: {
         postcss: {
            plugins: [
               PostCssPxToRem ({
                  rootValue: 16, // change px to rem
                  propList: ['*'], // default '*'
                  exclude: '/node_modules/i', // which directory that should not be applied , i= case-insensitives for 'node_modules'
               }),
            ],
         },
         preprocessorOptions: {
            scss: {
               additionalData: `@use "@/app/assets/style/variable.scss" as *;` // global var
            }
         }
      },
      
   }
})
