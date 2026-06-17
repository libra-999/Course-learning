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

// const app = createApp(App);
const pinia = createPinia();
const router = route;

pinia.use(piniaPluginPersistedstate)
// app.use(i18n)
// app.use(pinia);
// app.use(router);
// app.use(ElementPlus);
// useTheme()
// app.mount('#app');

console.log("1. main.ts started");

const app = createApp(App);

console.log("2. createApp OK");

app.use(i18n);
console.log("3. i18n OK");

app.use(pinia);
console.log("4. pinia OK");

app.use(router);
console.log("5. router OK");

app.use(ElementPlus);
console.log("6. element-plus OK");

useTheme();
console.log("7. theme OK");

app.mount("#app");
console.log("8. mounted");