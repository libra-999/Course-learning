export default {
	TITLE_SYSTEM: 'មេរៀន Vue',
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
		MENU : {
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
