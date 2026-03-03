import { createRouter, createWebHistory, type Router } from 'vue-router'
import PaymentLayout from '@/modules/payment/layout/PaymentLayout.vue'
import CryptoPayment from '@/modules/payment/layout/crypto/CryptoPayment.vue'
import DefaultLayout from '@/app/layout/DefaultLayout.vue'
import BookStoreDefault from '@/modules/book/layout/BookStoreDefault.vue'
import TestDefault from '@/modules/test/layout/TestDefault.vue'

const route: Router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'home',
			path: '/',
			component: DefaultLayout,
		},
		{
			path: '/books',
			name: 'Book Store',
			component: BookStoreDefault
		},
		{
			path: '/test',
			name: 'Testing',
			component: TestDefault
		},
		{
			path: '/payment',
			name: 'Payment',
			component: PaymentLayout,
			children: [
				{
					path: 'aba',
					component: () => import('@/modules/payment/layout/aba/Purchase.vue')
				},
				{
					path: 'strip',
					component: () => import('@/modules/payment/layout/strip/Purchase.vue')
				},
				{
					path: 'crypto',
					component: CryptoPayment
				}
			]
		}
	],
})
export default route
