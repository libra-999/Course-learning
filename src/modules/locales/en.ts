export default {
	TITLE_SYSTEM: 'Vue',
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
			content: "Generate text from image or card identity , easy to manage in some function that want to use user information epecially KYC's user ",
		},
		PROFILE_DD: {
			profile: 'Profile',
			logout: 'Logout',
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
					confirmed: 'Login successful, redirecting...',
					expired: 'The QR code has expired, please refresh',
					cancelled: 'Login has been cancelled, please refresh',
				},
			},
		},
		FILL: {
			title: 'WHO ARE YOU?',
			FORM_ITEM: {
				username: 'Username',
				username_placeholder: 'Input Your Name',
                username_isNull: 'Please input username',
                username_length_validate: 'Username should be 7 length at least',
                
				pwd: 'Password',
                pwd_isNull: 'Please input password',
                pwd_length_validate: 'Password should be 6 at least',
                pwd_pattern_validate: 'Incorrect format password.(ex: Sport11(0) )',
				pwd_placeholder: 'Input Your Password',
				submit: 'Submit',
			},
		},
        API: {
            success:{
                scan_polling_login: 'Scan login succeed!'
            },
            error:{
                qr_generate_display : 'Failed to display QR!',
                qr_generate_url_login: 'Invalid Image Url!',
                qr_generate_login: 'Failed to generate QR!',
                scan_polling_token_login: 'Invalid QR Token',
                wrong_login: 'Something wrong with login'      
            }
        }
	},
	REQUEST_AXIOS:{
		error: {
			internal_server: "Server Internal!",
			unauthorized: "Unauthorized!"
		}
	}
}
