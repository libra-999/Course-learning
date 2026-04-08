import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import {clientLogPlugin} from './src/app/utils/terminalLog'
import basicSsl from '@vitejs/plugin-basic-ssl'

const pathSrc = path.resolve(__dirname, 'src');
export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 7001,
		// proxy: {
		// 	'/v1': {
		// 		target: "http://172.20.10.7:7005",
		// 		secure: false,
		// 	}
		// }
	},
	// basicSsl() = testing for handling in secure 
	plugins: [vue(), tailwindcss(), clientLogPlugin()],
	test: {
		globals: true,
	},
	resolve: {
		alias: {
			'@': pathSrc,
		},
	},
})
