export default {
	TITLE_SYSTEM: 'Vue实践',
	language: '中文',

	MAIN_LAYOUT: {
		title_1: 'Vue 3 学习教程',
		title_2: '从零到零 ',
		TEST: {
			title: '测试',
			content: '只是一个带有自动创建的框编号的普通点击框',
		},
		BOOK: {
			title: '图书接口',
			content: 'Google 图书 API, 将产品图书列为列表并查看图书的详细信息 ',
		},
		PAYMENT: {
			title: '付款方式',
			content: '学习了在项目中实现支付功能时应具备的结构和字段',
		},
		FILE: {
			title: '上传文件',
			content: '构建一个视图来上传多种类型的文件并加载上传的进度底图',
		},
		ROLE: {
			title: '巢桌',
			content: '构建具有数据角色和权限的嵌套表行',
		},
		PROFILE_DD: {
			profile: '轮廓',
			logout: '退出',
		},
		TIMELINE: {
			title: '时间线',
			button_input: '输入',
			FORM_ITEM: {
				date: '日期时间轴',
				date_placeholder: '选择日期',
				content: '内容时间表',
				content_placeholder: '请输入标题',
				add: '添加',
			},
		},
	},
	LOGIN: {
		option_1: '手动操作',
		option_2: '通过二维码扫描',
		SCAN: {
			POLLING: {
				button_refresh: '刷新 QR',
				status: {
					waiting: '二维码将于',
					scanned: '二维码已扫描，请确认手机登录',
					confirmed: '登录成功，正在重定向...',
					expired: '二维码已过期，请刷新',
					cancelled: '登录已取消，请刷新',
				},
			},
		},
		FILL: {
			title: '你是谁?',
			FORM_ITEM: {
				username: '用户名',
				username_placeholder: '输入您的名字',
				username_isNull: '请输入用户名',
				username_length_validate: '用户名长度至少为7',

				pwd: '密码',
				pwd_isNull: '请输入密码',
				pwd_length_validate: '密码至少应为 6',
				pwd_pattern_validate: '密码格式不正确。 ( 例如: Sport11(0) )',
				pwd_placeholder: '输入您的密码',
				submit: '提交',
			},
		},
		API: {
			success: {
				scan_polling_login: '扫码登录成功！',
			},
			error: {
				qr_generate_display: '无法显示二维码！',
				qr_generate_url_login: '图片网址无效！',
				qr_generate_login: '生成二维码失败！',
				scan_polling_token_login: '二维码令牌无效',
				wrong_login: '登录有问题',
			},
		},
	},
}
