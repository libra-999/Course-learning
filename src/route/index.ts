import { createRouter, createWebHistory, type Router } from 'vue-router'
import PaymentLayout from '@/modules/payment/layout/PaymentLayout.vue'

const route: Router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('@/app/layout/DefaultLayout.vue'),
		},
		{
			path: '/books',
			name: 'Book Store',
			component: () => import('@/modules/book/layout/BookStoreDefault.vue'),
		},
		{
			path: '/test',
			name: 'Testing',
			component: () => import('@/modules/test/layout/TestDefault.vue'),
		},
		{
			path: '/payment',
			name: 'Crytpo',
			component: PaymentLayout,
			children: [
				{
					path: 'aba',
					component: () => import('@/modules/payment/layout/aba/Purchase.vue')
				},
				{
					path: 'strip',
					component: () => import('@/modules/payment/layout/strip/Purchase.vue')
				}
			]
		}
	],
})
export default route
