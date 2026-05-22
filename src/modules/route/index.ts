import { createRouter, createWebHistory, type Router } from 'vue-router'
import DefaultLayout from '@/modules/layout/DefaultLayout.vue'
import Login from '@/modules/view/Login.vue'
import { invalidPage } from '@/modules/route/error.ts'
import { ElMessage } from 'element-plus'
import { loginStore } from '@/modules/store/auth'
import { isTokenValid } from '@/app/utils/authToken'
import { module } from '@/modules/route/module.ts'
import GuestLayout from '@/modules/layout/GuestLayout.vue'
import i18n from '@/modules/locales'

const t = i18n.global.t
const route: Router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/guest',
		},
		{
			name: 'login',
			path: '/login',
			component: Login,
		},
		{
			path: '/guest',
			component: GuestLayout,
			meta: { isFree: true },
		},
		{
			path: '/system',
			component: DefaultLayout,
			name: 'home',
			meta: { requireAuth: true },
			children: [...module],
		},
		...invalidPage,
	],
})

route.beforeEach((to) => {
	const authStore = loginStore()
	const isAuth = isTokenValid(authStore.access_token)

	// Route protected
	if (to.meta.requireAuth && !isAuth) {
		ElMessage({
			message: t('REQUEST_AXIOS.error.unauthorized'),
			type: 'error',
		})
		return {
			path: '/login',
			query: { redirect: to.fullPath },
		}
	}

	// Guest
	if (to.meta.isFree && isAuth) {
		return (to.query.redirect as string) || '/system'
	}
	return true
})
export default route
