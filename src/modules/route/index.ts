import { createRouter, createWebHistory, type Router } from 'vue-router'
import PaymentLayout from '@/modules/layout/payment/PaymentLayout.vue'
import CryptoPayment from '@/modules/view/payment/crypto/CryptoPayment.vue'
import DefaultLayout from '@/modules/layout/DefaultLayout.vue'
import BookStoreDefault from '@/modules/layout/book/BookStoreDefault.vue'
import TestDefault from '@/modules/layout/test/TestDefault.vue'
import Login from '@/modules/view/Login.vue'
import { ElMessage } from 'element-plus'
import PurchaseStrip from '@/modules/view/payment/strip/Purchase.vue'
import PurchaseABA from '@/modules/view/payment/aba/Purchase.vue'
import UploadProgressLayout from '@/modules/layout/uploadFile/UploadProgressLayout.vue'
import { invalidPage } from '@/modules/route/error.ts'
import PurchaseABACheckout from '@/modules/layout/payment/PurchaseABACheckout.vue'

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
				},{
					path: 'checkout-aba',
					component: PurchaseABACheckout
				}
			],
		},
		{
			path: '/upload',
			name: 'Upload',
			meta: { requireAuth: true },
			component: UploadProgressLayout,
		},
		... invalidPage
	],
})

route.beforeEach((to, _from, next) => {
	const isAuth = !!localStorage.getItem('userLogin')
	/* no auth is required */
	if (to.meta.requireAuth && !isAuth) {
		next({
			path: '/login',
		})
		/* return to route */
		ElMessage({
			message: '未经授权，请重新登录',
			type: 'error',
		})
		return
	}
	next()
})
export default route
