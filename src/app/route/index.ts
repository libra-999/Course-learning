import { createRouter, createWebHistory, type Router } from 'vue-router'
import PaymentLayout from '@/modules/payment/layout/PaymentLayout.vue'
import CryptoPayment from '@/modules/payment/layout/crypto/CryptoPayment.vue'
import DefaultLayout from '@/app/layout/DefaultLayout.vue'
import BookStoreDefault from '@/modules/book/layout/BookStoreDefault.vue'
import TestDefault from '@/modules/test/layout/TestDefault.vue'
import Login from '@/app/view/Login.vue'
import { ElMessage } from 'element-plus'
import PurchaseStrip from '@/modules/payment/layout/strip/Purchase.vue'
import PurchaseABA from '@/modules/payment/layout/aba/Purchase.vue'

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
		{
			path: '/books',
			name: 'Book Store',
			meta: { requireAuth: true },
			component: BookStoreDefault,
		},
		{
			path: '/test',
			name: 'Testing',
			meta: { requireAuth: true },
			component: TestDefault,
		},
		{
			path: '/payment',
			name: 'Payment',
			meta: { requireAuth: true },
			component: PaymentLayout,
			children: [
				{
					path: 'aba',
					component: () => PurchaseABA,
				},
				{
					path: 'strip',
					component: () => PurchaseStrip,
				},
				{
					path: 'crypto',
					component: CryptoPayment,
				},
			],
		},
	],
})

route.beforeEach((to, _from, next) => {
	const isAuth = !!localStorage.getItem('userLogin')
	// no auth is required
	if (to.meta.requireAuth && !isAuth) {
		next({
			path: '/login',
		})
		// return to route
		ElMessage({
			message: '未经授权，请重新登录',
			type: 'error',
		})
		return
	}
	next()
})
export default route
