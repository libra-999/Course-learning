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
      BOT: {
         title: '机器人你',
         content: '让机器人支持或帮助客户服务责任并减少对用户的响应',
      },
      OCR_CARD: {
         title: '卡身份到文本',
         content: "从图像或卡身份生成文本, 在某些想要使用用户信息的功能尤其是KYC的用户中易于管理",
      },
      PROFILE_DD: {
         profile: '轮廓',
         logout: '退出',
      },
      MENU: {
         title: '仪表板',
         content: '构建带有子子菜单的示例侧边栏',
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
         SUCCESS:{
            add_success: "添加时间线!"
         }
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
            remember: '让我登录？'
         },
      },
      API: {
         success: {
            login_success: "登录成功!",
            scan_polling_login: '扫码登录成功！',
         },
         error: {
            qr_generate_display: '无法显示二维码！',
            qr_generate_url_login: '图片网址无效！',
            qr_generate_login: '生成二维码失败！',
            scan_polling_token_login: '二维码令牌无效',
            wrong_login: '登录有问题!',
         },
      },
   },
   TEST: {
     button_submit: '点击',
     button_reset: '重置' 
   },
   BOOK:{
      input_search: "按标题、作者、出版商搜索...",
      empty: '无数据...'
   },
   PAYMENT:{
      ABA: {
         title: '支付 ABA' ,
         merchant_id : '商户ID',
         first_name: '名',
         last_name: '姓',
         email: '邮件',
         phone: '电话号码',
         request_time:'签发日期',
         trans_no: '交易编号',
         amount:'数量',
         currency: '货币',
         BUTTON: {
            check_tran:'检查交易',
            pay:'立即付款',
            exchange: '汇率',
            generate_qr: '生成QR',
            link: '链接卡'
         }
      },
      CRYPTO: {
         buy: '立即购买'
      }
   },
   UPLOAD: {
      progress:{
         title: '上传有进度',
         q_1: '将目录拖放到此处或',
         q_2: '点击上传',
         list_current_images: '当前上传正在进行中',
         empty_image: '没有文件'
      } ,
      ocr: {
         title: 'OCR 身份证',
         q_1: '将图像拖放到此处',
         q_2: '仅支持外国人卡',
         convert: '转变'   ,
         list_images: '过程图像'      
      }
   },
   BOT: {
      robot_name: '助手',
      description: '向我询问有关我们社区的任何问题',
      online: '在线',
      offline: '离线',
      prompt: '有什么问题问我...'
   },

   REQUEST_AXIOS: {
      error: {
         internal_server: "服务器内部!",
         unauthorized: "未经授权!"
      }
   },
   MENU: {
      PARENT: {
         setting_title: "环境",
         management_title: "管理",
         children: {
            user: "用户模块",
            bot: "机器人模块",
            dashboard: "仪表板",
         }
      },
      home: "首页",
      menu: "菜单页",
      TOP: {
         more: "更多菜单"
      },
      setting: "设置模块",
      bot: "机器人",
      management: "管理模块",
      user: "用户",
      dashboard: "仪表板"
   },
   PAGINATION: {
      page: '',
      previous: '上一页',
      next: '下一页'
   }
}
