const ary = {
	loginWX:{//微信登陆的接口 
		id:'menber/newregisterwx',
		name:'getRegisterwx'
	},
	isbind:{//判断微信的openID是否绑定
		id:'menber/isbind',
		name:'getIsbind'
	},
	myinfoUrl:{//刷新用户信息 
		id:'menber/myinfo',
		name:'getMyinfo'
	},      
	getyzmUrl:{//获取验证码
		id:'sms/getyzm',
		name:'getyzm'
	},
	yzmislostUrl:{//验证验证码
		id:'menber/yzmislost',
		name:'getYzmislost'
	},
	getopenid:{//微信小程序获取openid
		id:'GetOpenid/getopenid',
		name:'getopenid'
	} 
}

export default ary