import PaymentLayout from "@/modules/layout/Payment/PaymentLayout.vue";
import PurchaseABA from "@/modules/view/Payment/ABA/Purchase.vue";
import PurchaseLayout from "@/modules/view/Payment/Strip/index.vue";
import CryptoPayment from "@/modules/view/Payment/Crypto/CryptoPayment.vue";
import UploadProgressLayout from "@/modules/layout/UploadFile/UploadProgressLayout.vue";
import TableLayout from "@/modules/view/Table/index.vue";
import Chat from "@/modules/view/Chat/index.vue";
import Preview from "@/modules/view/CardIdentity/Preview.vue";
import Test from "@/app/components/Test/Test.vue";
import PaymentABA from "@/modules/view/Payment/PaymentABA.vue";
import BookLayout from "@/modules/view/Book/index.vue";
import Dashboard from "@/modules/view/System/Dashboard/index.vue";
import Bot from "@/modules/view/System/Setting/Bot/index.vue";
import Setting from "@/modules/view/System/Setting/index.vue";
import Mng from "@/modules/view/System/Mng/index.vue";
import User from "@/modules/view/System/Mng/User/index.vue";
import FullSideNav from "@/modules/layout/FullSideNav.vue";


export const menuRouteConstant = [
   {
      path: 'dashboard',
      name: 'Dashboard',
      meta: { requiredAuth: true },
      component: Dashboard
   },
   {
      path: 'setting',
      name: 'Setting',
      meta: { requiredAuth: true },
      component: Setting,
      children: [
         {
            path: 'bot/index',
            name: 'Bot',
            meta: { requiredAuth: true },
            component: Bot
         }
      ]
   },
   {
      path: 'mng',
      name: 'Management',
      meta: { requiredAuth: true },
      component: Mng,
      children: [
         {
            path: 'user/index',
            name: 'User',
            meta: { requiredAuth: true },
            component: User
         }
      ]
   }
]

export const module = [
   {
      path: '/system/books',
      name: 'Book Store',
      meta: { requireAuth: true },
      component: BookLayout,
   },
   {
      path: '/system/test',
      name: 'Testing',
      meta: { requireAuth: true },
      component: Test,
   },
   {
      path: '/system/payment',
      name: 'Payment',
      meta: { requireAuth: true },
      component: PaymentLayout,
      children: [
         {
            path: 'aba',
            component: PurchaseABA,
         },
         {
            path: 'strip',
            component: PurchaseLayout,
         },
         {
            path: 'crypto',
            component: CryptoPayment,
         }, {
            path: 'aba-checkout',
            component: PaymentABA
         }
      ],
   },
   {
      path: '/system/upload',
      name: 'Upload',
      meta: { requireAuth: true },
      component: UploadProgressLayout,
   },
   {
      path: "/system/table",
      name: "Table Role and Permission",
      meta: { requireAuth: true },
      component: TableLayout
   },
   {
      path: '/system/bot',
      name: 'Chat',
      meta: { requiredAuth: true },
      component: Chat
   }, {
      path: '/system/card-identity',
      name: 'Card to Text',
      meta: { requiredAuth: true },
      component: Preview
   }, {
      path: '/system/menu',
      name: 'Menu',
      meta: { requiredAuth: true },
      component: FullSideNav,
      children: [...menuRouteConstant]
   },

]
