export default {
   TITLE_SYSTEM: 'Vue 3 Tutorial',
   language: 'English',

   MAIN_LAYOUT: {
      title_1: 'Vue 3 Learning Tutorial',
      title_2: 'From Zero to Zero ',
      TEST: {
         title: 'Test',
         content: 'Just a normal click box with auto created box number',
      },
      BOOK: {
         title: 'Book API',
         content:
            'Google book API with  , list product book as list and view detail of book ',
      },
      PAYMENT: {
         title: 'Payment Type',
         content:
            'Learned the structure and fields should be have when implement payment feature into project',
      },
      FILE: {
         title: 'Upload Files',
         content:
            'Build a view to upload files with multiple types and loading progress base image uploaded',
      },
      ROLE: {
         title: 'Nest Table',
         content: 'Build a nest tables row with data role and permission',
      },
      BOT: {
         title: 'BOT AI',
         content: 'Make a bot support or help customer service responsibility and reducing respond for user ',
      },
      OCR_CARD: {
         title: 'Card Identity To Text',
         content: "Generate text from image or card identity , easy to manage in some function that want to use user information especially KYC's user ",
      },
      PROFILE_DD: {
         profile: 'Profile',
         logout: 'Logout',
      },
      MENU: {
         title: 'Dashboard',
         content: 'Build a sample sidebar with child submenu',
      },

      TIMELINE: {
         title: 'TimeLine',
         button_input: 'Input',
         FORM_ITEM: {
            date: 'Date Timeline',
            date_placeholder: 'Select Date',
            content: 'Content Timeline',
            content_placeholder: 'Please input title',
            add: 'Add',
         },
         SUCCESS: {
            add_success: "Added Timeline!"
         }
      },
   },
   LOGIN: {
      option_1: 'By Manual',
      option_2: 'By QRScan',
      SCAN: {
         POLLING: {
            button_refresh: 'Refresh QR',
            status: {
               waiting: 'The QR code will be expired in ',
               scanned:
                  'The QR code has been scanned, please confirm login on your mobilephone',
               confirmed: 'Login Successfully, redirecting...',
               expired: 'The QR code has been expired!',
               cancelled: 'Login has been cancelled!',
            },
         },
      },
      FILL: {
         title: 'WHO ARE YOU?',
         FORM_ITEM: {
            username: 'Username',
            username_placeholder: 'Input Your Name',
            username_isNull: 'Username is null!',
            username_length_validate: 'Invalid format username!',

            pwd: 'Password',
            pwd_isNull: 'Password is null!',
            pwd_length_validate: 'Password should be 6 characters at least!',
            pwd_pattern_validate: 'Invalid password format!',
            pwd_placeholder: 'Input Your Password',
            submit: 'Submit',
            remember: 'Keep me sign in?'
         },
      },
      API: {
         success: {
            login_success: "Login Successfully!",
            scan_polling_login: 'Scan Successfully!'
         },
         error: {
            qr_generate_display: 'Error to display QR!',
            qr_generate_url_login: 'Invalid Image!',
            qr_generate_login: 'Generating QR Failed!',
            scan_polling_token_login: 'Invalid QR Token!',
            wrong_login: 'Error login!'
         }
      }
   },
   TEST: {
      button_submit: 'Click',
      button_reset: 'Reset'
   },
   BOOK: {
      input_search: "Search by title, author, publisher...",
      empty: 'No Data'
   },
   PAYMENT: {
      ABA: {
         title: 'ABA Payment',
         merchant_id: 'Merchant ID',
         first_name: 'First Name',
         last_name: 'Last Name',
         email: 'Email',
         phone: 'Phone Number',
         request_time: 'Issued Date',
         trans_no: 'Transaction No',
         amount: 'Amount',
         currency: 'Currency',
         BUTTON: {
            check_tran: 'Check Transaction',
            pay: 'Pay Now',
            exchange: 'Exchange Rate',
            generate_qr: 'Generated QR',
            link: 'Link Card'
         }
      },
      CRYPTO: {
         buy: 'Buy now'
      }
   },
   UPLOAD: {
      progress: {
         title: 'Upload With Progress',
         q_1: 'Drop directory here or',
         q_2: 'click to upload',
         list_current_images: 'Current upload in progress',
         empty_image: 'No Files'
      },
      ocr: {
         title: 'OCR Identity card',
         q_1: 'Drop image here',
         q_2: 'SUPPORT ONLY FORIEGNER CARD',
         convert: 'Convert',
         list_images: 'Process Image'
      }
   },
   BOT: {
      robot_name: 'Assistant',
      description: 'Ask me anything about our community',
      online: 'Online',
      offline: 'Offline',
      prompt: 'Ask me anything...'
   },

   REQUEST_AXIOS: {
      error: {
         internal_server: "Server Internal!",
         unauthorized: "Unauthorized!"
      }
   },
   MENU: {
      PARENT: {
         setting_title: "Setting",
         management_title: "Management",
         children: {
            user: "User",
            dashboard: "Dashboard",
            bot: "Bot"
         }
      },
      home: "Home",
      menu: "Menu",
      TOP: {
         more: "More menus"
      },
      setting: "Setting",
      bot: "Bot",
      management: "Management",
      user: "User",
      dashboard: "Dashboard"
   },
   PAGINATION: {
      page: '',
      previous: 'Previous',
      next: 'Next'
   }


}
