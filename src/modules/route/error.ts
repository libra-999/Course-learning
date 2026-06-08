import type { RouteRecordRaw } from 'vue-router'
import NotFound from '@/modules/view/Error/404.vue'
import InternalServer from '@/modules/view/Error/500.vue'
import UnAuth from '@/modules/view/Error/401.vue'


export const invalidPage: RouteRecordRaw[] = [
   {
      path: '/unauthorized',
      name: 'Invalid Token',
      meta: {requireAuth: false},
      component: UnAuth
   },
   {
      path: '/server-error',
      name: 'Internal Server',
      meta: {requireAuth: false},
      component: InternalServer
   },
   /* alway put the last */
   {
      path: '/:pathMatch(.*)*',
      name: 'Not Found Page',
      meta: {requireAuth: false},
      component: NotFound,
   },

]
