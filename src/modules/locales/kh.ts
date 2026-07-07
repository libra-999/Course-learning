export default {
   TITLE_SYSTEM: 'សិក្សា',
   language: 'ខ្មែរ',

   MAIN_LAYOUT: {
      title_1: 'មូលដ្ឋានគ្រឹះនៃ Vue3',
      title_2: 'ពីសូន្យដល់មួយរយ',
      TEST: {
         title: 'Test',
         content: 'គ្រាន់តែជាប្រអប់ជ្រើសរើសធម្មតា ដែលបង្កើតលេខប្រអប់ដោយស្វ័យប្រវត្តិ',
      },
      BOOK: {
         title: 'Book API',
         content:
            'ភ្ជាប់ Google Book API ដើម្បីទាញយកបញ្ជីសៀវភៅ និងបង្ហាញជាបញ្ជី ហើយអនុញ្ញាតឱ្យមើលព័ត៌មានលម្អិតរបស់សៀវភៅ',
      },
      PAYMENT: {
         title: 'Payment Type',
         content:
            'សិក្សាអំពីរចនាសម្ព័ន្ធ និងទិន្នន័យដែលត្រូវមាននៅពេលអនុវត្តមុខងារទូទាត់ប្រាក់ទៅក្នុងគម្រោង',
      },
      FILE: {
         title: 'Upload Files',
         content:
            'បង្កើត Template សម្រាប់ផ្ទុកឯកសារ ដែលគាំទ្រប្រភេទឯកសារច្រើន និងបង្ហាញដំណើរការផ្ទុក (Loading Progress) ដោយផ្អែកលើការផ្ទុករូបភាព',
      },
      ROLE: {
         title: 'Nest Table',
         content: 'បង្កើតតារាងដែលមានជួរទិន្នន័យជាន់ក្នុង ដើម្បីបង្ហាញព័ត៌មាន Role និង Permission',
      },
      BOT: {
         title: 'BOT AI',
         content: 'បង្កើត Bot សម្រាប់ជំនួយផ្នែកសេវាកម្មអតិថិជន ដើម្បីបង្កើនប្រសិទ្ធភាពការគាំទ្រ និងកាត់បន្ថយរយៈពេលឆ្លើយតបចំពោះអ្នកប្រើប្រាស់',
      },
      PROFILE_DD: {
         profile: 'ប្រវិត្តរូប',
         logout: 'ចាកចេញ',
      },
      MENU: {
         title: 'Dashboard',
         content: 'បង្កើត Sidebar គំរូដែលមាន Child Submenu',
      },
      TIMELINE: {
         title: 'ប្រវត្តិការសិក្សា',
         button_input: 'បញ្ចូលប្រវត្តិសិក្សា',
         FORM_ITEM: {
            date: 'កាលបរិច្ឆេទ',
            date_placeholder: 'ជ្រើសរើសកាលបរិច្ឆេទ',
            content: 'មាតិកា',
            content_placeholder: 'បញ្ចូលមាតិកា',
            add: 'បន្ថែម',
            remember: 'ចងចាំ?'
         },
         SUCCESS: {
            add_success: "បញ្ចូលប្រវត្តិការសិក្សាបានជោគជ័យ!"
         }
      },
   },
   LOGIN: {
      option_1: 'បញ្ជូលតាមរយះ password',
      option_2: 'ScanQR ដើម្បីចូល',
      SCAN: {
         POLLING: {
            button_refresh: 'បង្កើនូវ QR ថ្មី',
            status: {
               waiting: 'កំពុងរង់ចាំ',
               scanned: 'បានស្កេន',
               confirmed: 'បានបញ្ជាក់',
               expired: 'បានផុតកំណត់',
               cancelled: 'បានបោះបង់',
            },
         },
      },
      FILL: {
         title: 'WHO ARE YOU?',
         FORM_ITEM: {
            username: 'ឈ្មោះអ្នកប្រើ',
            username_placeholder: 'បញ្ចូលឈ្មោះអ្នកប្រើ',
            username_isNull: 'ឈ្មោះអ្នកប្រើមិនអាចទទេបានទេ',
            username_length_validate: 'ឈ្មោះអ្នកប្រើត្រូវមានពី 7 ទៅ 16 តួអក្សរ',

            pwd: 'ពាក្យសម្ងាត់',
            pwd_isNull: 'ពាក្យសម្ងាត់មិនអាចទទេបានទេ',
            pwd_length_validate: 'ពាក្យសម្ងាត់ត្រូវមានពី 6 ទៅ 20 តួអក្សរ',
            pwd_pattern_validate: 'ពាក្យសម្ងាត់ត្រូវមានតួអក្សរធំ តួអក្សរតូច និងលេខ',
            pwd_placeholder: 'បញ្ចូលពាក្យសម្ងាត់',
            submit: 'បញ្ជូន',
            remember: 'រក្សាការចូលគណនីរបស់ខ្ញុំ?'
         },
      },
      API: {
         success: {
            login_success: "ប្រតិបត្តិបានជោគជ័យ!",
            scan_polling_login: 'ស្កេន​​ QR បានជោគជ័យ!',
         },
         error: {
            qr_generate_display: 'បង្ហាញ QR បានបរាជ័យ!',
            qr_generate_url_login: 'បង្កើតរូបភាព QR បានបរាជ័យ!',
            qr_generate_login: 'បង្កើត QR បានបរាជ័យ!',
            scan_polling_token_login: 'TokenQR បរាជ័យ!',
            wrong_login: 'ឈ្មោះអ្នកប្រើ ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ!',
         },
      },
   },
   TEST: {
      button_submit: 'ចុចទីនេះ',
      button_reset: 'ត្រលប់ទៅដើម'
   },
   BOOK: {
      input_search: "ស្វែងរកតាមចំណងជើង អ្នកនិពន្ធ អ្នកបោះពុម្ព...",
      empty: 'សៀវភៅទិន្នន័យទទេ...'
   },
   PAYMENT: {
      ABA: {
         title: 'ការទូទាត់ ABA',
         merchant_id: 'លេខសម្គាល់ពាណិជ្ជករ',
         first_name: 'នាមខ្លួន',
         last_name: 'នាមត្រកូល',
         email: 'អ៊ីមែល',
         phone: 'លេខទូរស័ព្ទ',
         request_time: 'កាលបរិច្ឆេទចេញ',
         trans_no: 'លេខប្រតិបត្តិការ',
         amount: 'ចំនួនទឹកប្រាក់',
         currency: 'រូបិយប័ណ្ណ',
         BUTTON: {
            check_tran: 'ពិនិត្យប្រតិបត្តិការ',
            pay: 'ទូទាត់ឥឡូវនេះ',
            exchange: 'អត្រាប្តូរប្រាក់',
            generate_qr: 'បង្កើត QR Code',
            link: 'ភ្ជាប់កាត'
         }
      },
      CRYPTO: {
         buy: 'ទិញឥឡូវនេះ'
      }
   },
   UPLOAD: {
      progress: {
         title: 'ផ្ទុកឯកសារ',
         q_1: 'ទម្លាក់ថតឯកសារនៅទីនេះ ឬ',
         q_2: 'ចុចដើម្បីផ្ទុកឡើង',
         list_current_images: 'ឯកសារដែលកំពុងផ្ទុកឡើង',
         empty_image: 'មិនមានឯកសារ'
      },
      ocr: {
         title: 'ស្កេនប័ណ្ណអត្តសញ្ញាណ',
         q_1: 'អូសរូបភាពមកទីនេះ',
         q_2: 'គាំទ្រសម្រាប់តែប័ណ្ណអត្តសញ្ញាណជនបរទេស',
         convert: 'ស្កេន',
         list_images: 'រូបភាពកំពុងដំណើរការ'
      }
   },
   BOT: {
      robot_name: 'ជំនួយការ',
      description: 'សួរខ្ញុំអំពីសហគមន៍របស់យើងបានគ្រប់ពេល',
      online: 'អនឡាញ',
      offline: 'ក្រៅបណ្ដាញ',
      prompt: 'សួរខ្ញុំអ្វីក៏បាន...'
   },


   REQUEST_AXIOS: {
      error: {
         internal_server: 'កំហុសម៉ាស៊ីនមេ',
         unauthorized: 'មិនមានសិទ្ធិចូល',
      },
   },
   MENU: {
      PARENT: {
         setting_title: "ការកំណត់",
         management_title: "ការគ្រប់គ្រង",
         children: {
            user: "អ្នកប្រើប្រាស់",
            dashboard: "ផ្ទាំងគ្រប់គ្រង",
            bot: "ជំនួយការ"
         }
      },
      home: "ទំព័រដើម",
      menu: "តារាងទំព័រ",
      TOP: {
         more: "មានទំព័រទៀត"
      },
      setting: "ប្រព័ន្ធកំណត់",
      bot: "ជំនូួយសប្បនិមន្ត",
      management: "ប្រព័ន្ធទិន្នន័យ",
      user: "អ្នកប្រើប្រាស់",
      dashboard: "ប្រព័ន្ធវិភាគទិន្នន័យ"
   },
   PAGINATION: {
      page: '',
      previous: 'ទំព័រមុន',
      next: 'ទំព័របន្ទាប់'
   }
}
