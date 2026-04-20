import BookStoreDefault from "@/modules/layout/book/BookStoreDefault.vue";
import TestDefault from "@/modules/layout/test/TestDefault.vue";
import PaymentLayout from "@/modules/layout/payment/PaymentLayout.vue";
import PurchaseABA from "@/modules/view/payment/aba/Purchase.vue";
import PurchaseStrip from "@/modules/view/payment/strip/Purchase.vue";
import CryptoPayment from "@/modules/view/payment/crypto/CryptoPayment.vue";
import PurchaseABACheckout from "@/modules/layout/payment/PurchaseABACheckout.vue";
import UploadProgressLayout from "@/modules/layout/uploadFile/UploadProgressLayout.vue";
import TableLayout from "@/modules/layout/table/TableLayout.vue";
import Chat from "@/modules/view/chat/Chat.vue";


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
   }

]
