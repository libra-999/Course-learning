import { createRouter, createWebHistory, type Router } from 'vue-router'
import DefaultLayout from '@/modules/layout/DefaultLayout.vue'
import Login from '@/modules/view/Login.vue'
import { invalidPage } from '@/modules/route/error.ts'
import { ElMessage } from 'element-plus'
import { loginStore } from '@/modules/store/auth'
import { isTokenValid } from '@/app/utils/authToken'
import { module } from '@/modules/route/module.ts'

const route: Router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'login',
			path: '/login',
			meta: { requireAuth: false },
			component: Login,
		},
		{
			name: 'home',
			path: '/',
			meta: { requireAuth: true },
			component: DefaultLayout,
		},
		...module,
		...invalidPage,
	],
})

route.beforeEach((to) => {
	if (!to.meta.requireAuth) return true // without required token

	// assign token to
	const authStore = loginStore()
	if (isTokenValid(authStore.access_token)) return true

	// handle invalid token or missing token
	ElMessage({
		message: '未经授权，请重新登录',
		type: 'error',
	})
	return {
		path: '/login',
		query: { redirect: to.fullPath },
	}
})
export default route
