import type { RouteRecordRaw } from 'vue-router'
import NotFound from '@/modules/view/error/404.vue'
import InternalServer from '@/modules/view/error/500.vue'

export const invalidPage: RouteRecordRaw[] = [
	{
		path: '/server-error',
		name: 'Internal Server',
		meta: { requireAuth:  false},
		component: InternalServer
	},
	/* alway put the last */
	{
		path: '/:pathMatch(.*)*',
		name: 'Not Found Page',
		meta: { requireAuth: false },
		component: NotFound,
	},

]
