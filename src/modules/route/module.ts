import BookStoreDefault from "@/modules/layout/Book/BookStoreDefault.vue";
import TestDefault from "@/modules/layout/Test/TestDefault.vue";
import PaymentLayout from "@/modules/layout/Payment/PaymentLayout.vue";
import PurchaseABA from "@/modules/view/Payment/aba/Purchase.vue";
import PurchaseStrip from "@/modules/view/Payment/strip/Purchase.vue";
import CryptoPayment from "@/modules/view/Payment/crypto/CryptoPayment.vue";
import PurchaseABACheckout from "@/modules/layout/Payment/PurchaseABACheckout.vue";
import UploadProgressLayout from "@/modules/layout/UploadFile/UploadProgressLayout.vue";
import TableLayout from "@/modules/layout/Table/TableLayout.vue";
import Chat from "@/modules/view/Chat/Chat.vue";
import Preview from "@/modules/view/CardIdentity/Preview.vue";


export const module = [
   {
      path: '/system/books',
      name: 'Book Store',
      meta: { requireAuth: true },
      component: BookStoreDefault,
   },
   {
      path: '/system/test',
      name: 'Testing',
      meta: { requireAuth: true },
      component: TestDefault,
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
            component: PurchaseStrip,
         },
         {
            path: 'crypto',
            component: CryptoPayment,
         },{
            path: 'aba-checkout',
            component: PurchaseABACheckout
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
      meta: {requiredAuth: true},
      component: Chat
   },{
      path: '/system/card-identity',
      name: 'Card to Text',
      meta: { requried: true},
      component: Preview
   }

]
