import { createApp } from 'vue'
import '@/app/assets/style/style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import route from './modules/route'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useTheme } from '@/modules/store/theme.ts'


const app = createApp(App);
const pinia = createPinia();
const router = route;

pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);
app.use(ElementPlus);
useTheme()
app.mount('#app');
