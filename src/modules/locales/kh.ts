export default {
	TITLE_SYSTEM: 'មេរៀន Vue',
	language: 'ខ្មែរ',

	MAIN_LAYOUT: {
		title_1: 'មូលដ្ឋានគ្រឹះនៃ Vue3',
		title_2: 'ពីសូន្យដល់មួយរយ',
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
		PROFILE_DD: {
			profile: 'Profile',
			logout: 'Logout',
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
			},
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
			},
		},
		API: {
			success: {
				scan_polling_login: 'បញ្ចូលដោយ QR បានជោគជ័យ!',
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
	REQUEST_AXIOS: {
		error: {
			internal_server: 'កំហុសម៉ាស៊ីនមេ',
			unauthorized: 'មិនមានសិទ្ធិចូល',
		},
	},
}
