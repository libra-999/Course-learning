import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useTheme } from '@/modules/store/theme.ts'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import route from './modules/route'
import ElementPlus from 'element-plus'
import i18n from "@/modules/locales";
import 'element-plus/dist/index.css'
import "highlight.js/styles/github-dark.css" // full color text in chat
import '@/app/assets/style/style.css'

const app = createApp(App);
const pinia = createPinia();
const router = route;

pinia.use(piniaPluginPersistedstate)
app.use(i18n)
app.use(pinia);
app.use(router);
app.use(ElementPlus);
useTheme()
app.mount('#app');
