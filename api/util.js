import fly from './http'

const paymentBaseURL = 'https://api.huaxuapp.com/'

/**
 * @description 获取验证码
 * 
 * @param {string} phone    获取验证码的手机号
 * 
 * @return {Promise} 包含请求结果的Promise，需要自行对请求结果进行处理
 */
export function getVerifyCode(phone) {
    return fly.get({
        url: 'sms/getyzm',
        params: {
            mobile: phone
        }
    })
}

/**
 * @description 验证码登录账号
 * 
 * @param {string} phone    电话号码
 * @param {string} code     验证码
 * @param {string} time     验证码获取时间
 * @param {string} userid   推荐人 ID
 * 
 * @return {Promise} 包含请求结果的Promise，需要自行对请求结果进行处理
 */
// export function loginWithCode(phone, yzm, dt, userid, pid = 0) {
// 	console.log(arguments);
//     return fly.get({
//         url: 'menber/newloginbyphone',
//         params: {
//             phone,
// 			yzm,
// 			dt,
// 			pid,
// 			userid
//         }
//     })
// }

/// 直接通过手机号登录（现）
/// <param name="phone"></param>
/// <param name="yzm"></param>
/// <param name="dt"></param>
/// <param name="pid">推荐人id</param>
/// <param name="storepid">扫店铺码推荐人id</param>
/// <param name="userid">id</param>
export function loginWithCode(phone, yzm, dt, pid, userid, storepid) {
	console.log(arguments);
	return fly.get({
		url: 'menber/newloginbyphone',
		params: {
			phone,
			yzm,
			dt,
			pid,
			userid,
			storepid
		}
	})
}

/**
 * @description 密码登录
 *  
 * @param {string} phone        电话号码
 * @param {string} pass         密码
 */
export function loginWithPass(phone, pass) {
    return fly.get({
        url: 'menber/login',
        params: {
            no: phone,
            pwd: pass
        }
    })
}

/**
 * @description 电话号码一键登录
 * 
 * @param {string} phone        电话号码
 * @param {string} entryData    加密字符串
 */
export function loginOnlyPhone(phone, entryData, pid = 0) {
    return fly.get({
        url: 'menber/newloginbytel',
        params: {
            phone: phone,
            phstr: entryData,
            userid: pid
        }
    })
}

/**
 * @description 微信登录
 * 
 * @param {stirng} nickname     微信用户昵称
 * @param {stirng} headimgurl   微信用户头像
 * @param {stirng} openid       微信用户 openid
 * @param {stirng} unionid      微信用户 unionid
 * @param {stirng} pid          推荐店铺 ID
 * @param {string} yyyid 		推荐人 ID
 */
export function loginWithWxNew(phone, openid, unionid, pid = 0, yyyid = 0) {
	console.log('登录参数', arguments)
    return fly.get({
        url: 'menber/newregisterbywx',
        params: {
			phone: phone,
            openid: unionid,
            unionid: openid,
            pid: pid,
            yyyid: yyyid,
        }
    })
}

export function loginWithWx(phone, nickname, headimgurl, openid, unionid, pid = 0, yyyid = 0, storepid) {
	console.log('登录参数', arguments)
    return fly.get({
        url: 'menber/newregisterwx',
        params: {
			phone: phone,
			nickname: nickname,
			headimgurl: headimgurl,
            openid: openid,
            unionid: unionid,
            pid: pid,
            yyyid: yyyid,
			storepid:storepid
        }
    })
}

export function loginWithWxAll(phone, unionid, openid, pid, yyyid) {
	return fly.get(
		'menber/registerwx',
		{
			phone,
			unionid,
			openid,
			pid,
			yyyid
		}
	)
}

export function getPhoneWithAli(params) {
    return fly.get({
        url: '/getopenid/getphone',
        params: params
    })
}

// #ifdef MP-WEIXIN || H5
/*
 * @param {number} mid  当前登录用户的userID
 */
export function getWxAppletOrderInfo(total_amount, description, openid, out_trade_no, storeid = 0, yyyid = 0, ccouponsid = 0, dkmoney, price = 0, sjprice) {
    let nowUserInfo = uni.getStorageSync('userInfo')
    let mid = nowUserInfo.ID 
	return fly.post(
        'Wechatpay/newAppletPay', {
            out_trade_no: out_trade_no,
            total_amount: total_amount * 100,
            body: description,
            userid: openid,
			mid: mid,
			storeid: storeid,
			yyyid: yyyid,
			ccouponsid: ccouponsid,
			dkmoney: dkmoney,
			price: price,
			sjprice,
        }, {
            baseURL: paymentBaseURL
        }
    )
}

/**
 * @description 							预约订单付款
 * 
 * @param {Object} out_trade_no				订单号
 * @param {Object} body						订单描述信息
 * @param {Object} userid					付款人 openid
 * @param {Object} storeid					店铺 id
 * @param {Object} Num						预约人数
 * @param {Object} YCDate					预约日期
 * @param {Object} YCTime					预约时间
 * @param {Object} Contacts					联系人
 * @param {Object} Sex						性别
 * @param {Object} Phone					电话
 * @param {Object} ConsumedWay				消费类型 【堂食， 外卖】
 * @param {Object} Info						备注信息
 */
export function getWxAppletDDOrderInfo(out_trade_no, total_amount, body, userid, SelfAddressID, ShopContent, info, DDSort = 3) {
	console.log('支付参数：', arguments);
	let nowUserInfo = uni.getStorageSync('userInfo')
	let mid = nowUserInfo.ID
	return fly.post(
		'Wechatpay/DSOrder',
		{
			out_trade_no,
			total_amount: total_amount * 100,
			body,
			userid,
			mid: mid,
			SelfAddressID,
			ShopContent,
			DDSort,
			info
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

/**
 * 					@description 含有特殊商品的创建订单
 */
export function getWxAppletSpecialOrderInfo(out_trade_no, total_amount, body, userid, SelfAddressID, ShopContent, DDSort = 3) {
	let nowUserInfo = uni.getStorageSync('userInfo')
	let mid = nowUserInfo.ID
	return fly.post(
		'Wechatpay/SpecialOrder',
		{
			out_trade_no,
			total_amount: total_amount * 100,
			body,
			userid,
			mid: mid,
			SelfAddressID,
			ShopContent,
			DDSort
		},
		{
			baseURL: paymentBaseURL
		}
	)
}
// #endif

// #ifdef MP-ALIPAY
export function getAlipayAppletOrderInfo(out_trade_no, total_amount, description, userid, buyerid, storeid = 0, yyyid = 0, ccouponsid = 0, dkmoney, price = 0) {
    return fly.post(
        'Alipay/AppletPay', {
            out_trade_no: out_trade_no,
            total_amount: total_amount,
            body: description,
            subject: description,
            userid: userid,
            buyerid: buyerid,
			storeid: storeid,
			yyyid: yyyid,
			ccouponsid: ccouponsid,
			dkmoney: dkmoney,
			price: price
        }, {
            baseURL: paymentBaseURL
        }
    )
}
// #endif

// #ifdef APP-PLUS || H5
export function getAppOrderInfo(total_amount, body, userid, out_trade_no, paymentWay = '微信', storeid = 0, yyyid = 0, ccouponsid = 0, dkmoney, price = 0, sjprice) {
	console.log('app 支付参数：', JSON.stringify(arguments));
    let uri = 'Wechatpay/AppPay', 
        data = {
            total_amount: total_amount * 100,
            body: body,
            userid: userid,
            out_trade_no: out_trade_no,
			storeid: storeid,
			yyyid: yyyid,
			ccouponsid: ccouponsid,
			dkmoney: dkmoney,
			price: price,
			sjprice
        }
        
    if (paymentWay === '支付宝') {
        uri = 'Alipay/AppPay'
        data.total_amount = total_amount
        data.subject = body
    }
    
    return fly.post(
        uri, 
        data, 
        {
            baseURL: paymentBaseURL
        }
    )
}

/* APP 充值 */
export function getAppRechargeOrderInfo(userid, out_trade_no, total_amount, body, storeid = 0, sjprice, paymentWay = '微信') {
	console.log('支付参数：', arguments);
    let uri = 'Wechatpay/ChargeAppPay', 
        data = {
            userid: userid,
            out_trade_no: out_trade_no,
            total_amount: total_amount * 100,
            body: body,
			storeid,
			sjprice
        }
        
    if (paymentWay === '支付宝') {
        uri = 'Alipay/ChargeAlipayAppPay'
        data = {
            userid: userid,
            out_trade_no: out_trade_no,
            subject: body,
            total_amount: total_amount,
        	storeid,
        	sjprice
        }
    }
    
    return fly.post(
        uri, 
        data, 
        {
            baseURL: paymentBaseURL
        }
    )
}


/**
 * @param {Object} usrid								用户 id
 * @param {Object} out_trade_no							订单编号
 * @param {Object} total_amount							订单价格
 * @param {Object} body									描述信息
 * @param {Object} storeid								店铺 id
 * @param {Object} UserAddressID						收货地址 id
 * @param {Object} ShopContent							购物列表
 * @param {Object} SalePrice							订单价格
 * @param {Object} DDSort								订单类型 【1：扫码；2：预约；3：电商；4：线上付款】
 */
export function getDDOrder(userid, out_trade_no, total_amount, body, storeid, UserAddressID, ShopContent, SalePrice, DDSort) {
	if (!out_trade_no) {
		out_trade_no = new Date().getTime()
	}
	if(!DDSort) {
		DDSort = 4
	}
	return fly.post(
		'Wechatpay/WXAPPOrder',
		{
			userid,
			out_trade_no,
			total_amount: total_amount * 100,
			body,
			storeid,
			UserAddressID,
			ShopContent,
			SalePrice,
			DDSort
		},
		{
			baseURL: paymentBaseURL
		}
	)
	
}
// #endif

/**
 * @description 通过充值卡 ID 获取推荐人 ID
 * 
 * @param {string} cardid   充值卡 ID
 */
export function getTjrByCardID(cardid){
    return fly.get(
        'newlogin/getjr',
        {
            cardid: cardid
        }
    )
}

/**
 * @description 通过公码 ID 获取对应的店铺信息
 * 
 * @param {stirng} ewmid    二维码 ID
 */
export function getStoreByEWM(ewmid) {
    return fly.get(
        'newlogin/getstore',
        {
            ewmid: ewmid
        }
    )
}

export function js(params) {
	return fly.get({
		url: 'scores/js',
		params: params
	})
}


/**
 * 
 * 获取折扣比例
 * @param {Object} params
 */
export function getZKBL() {
	return fly.get({
		url: 'mymember/dkezk',
	})
}

/**
 * 
 * 可抵扣额充值
 * @param {Object} params
 */
export function getKDKRecharge(params) {
	return fly.get({
		url: 'scores/dkecz',
		params: params
	})
}



export function getTotalnums() {
	return fly.get({
		url: 'mymember/totalnums'
	})
}

export function getAlipayPhone(encryData) {
	return fly.get({
		url: 'getopenid/getphone',
		params: {
			str: encryData
		}
	})
}


/**
 * 
 * 首页顶部轮播图
 * @param {Object} params
 */
export function getTopBanner(siteID) {
	return fly.get({
		url: 'advert/adverttoplist',
		params: {
			siteID: siteID
		}
	})
}

/**
 * 
 * 首页中部轮播图
 * @param {Object} params
 */
export function getCenterLBLlit(siteID) {
    return fly.get({
        url: 'advert/advertcentrallist',
		params: {
			siteID: siteID
		}
    })
}



export function getDefaultDiscount () {
	return fly.get({
		url: 'mymember/mrptzk'
	})
}

/**
 * @description 						根据快递单号查询快递公司
 * 
 * @param {Object} num					快递单号
 */
export function getExpress(num) {
	return fly.get(
		'autonumber/auto',
		{
			num: num,
			key: 'UCfGqYvf3596'
		},
		{
			baseURL: 'http://www.kuaidi100.com/'
		}
	)
}

import md5 from 'js-md5'
export function getLogisticsInformation (param) {
	const customer = 'DD78E4D120739EB31123116DAEBE28BF'
	const key = 'UCfGqYvf3596'
	let sign
	param = JSON.stringify(param)
	sign = md5(param + key + customer).toUpperCase()
	return fly.get(
		'poll/query.do',
		{
			customer,
			sign,
			param
		},
		{
			baseURL: 'https://poll.kuaidi100.com/'
		}
	)
}

/**
 * @description 								发送预约短信给商家和用户
 * 
 * @param {Object} userid						用户 id
 * @param {Object} storeid						店铺 id
 */
export function sendBookSMS(userid, storeid) {
	return fly.get(
		'book/bookjs',
		{
			userid,
			storeid
		}
	)
}

export function xinshou(page,pagesize) {
	return fly.get(
		'news/huaxumustsee',
		{
			page:page,
			pagesize:pagesize
		}
	)
}

export function changjian(page,pagesize) {
	return fly.get(
		'news/huaxucommonproblem',
		{
			page:page,
			pagesize:pagesize
		}
	)
}

export function gonggao(page,pagesize) {
	return fly.get(
		'news/huaxunotice',
		{
			page:page,
			pagesize:pagesize
		}
	)
}

export function ruzhu(page,pagesize) {
	return fly.get(
		'news/huaxucheckin',
		{
			page:page,
			pagesize:pagesize
		}
	)
}

export function zixun(page,pagesize) {
	return fly.get(
		'news/huaxuadvice',
		{
			page:page,
			pagesize:pagesize
		}
	)
}
export function getRecharge() {
	return fly.get(
		'mymember/isopencz'
	)
}

export function getPrepaidPhoneList() {
	return fly.get(
		'charge/getlist'
	)
}

/**
 * @description 							储蓄积分消费
 * 
 * @param {Object} userid
 * @param {Object} storeid
 * @param {Object} num
 * @param {Object} shopContent
 */
export function pointsFor(userid, storeid, shopContent) {
	return fly.get(
		'scores/chuxujs',
		{
			userid,
			storeid,
			shopContent
		}
	)
}

/**
 * @description 							推广、分润积分提现
 */
export function promotionWithdrawal(userid, num, sort = 1) {
	return fly.get(
		'scores/sppfjs',
		{
			userid,
			num,
			sort
		}
	)
}

/**
 * @description 							店铺利润提现
 * 
 * @param {Object} userid
 * @param {Object} num
 * @param {Object} storeid
 */
export function profitsWithdrawal(userid, num) {
	return fly.get(
		'scores/storejs',
		{
			userid,
			num
		}
	)
}

export function getGlobalConfig () {
	return fly.get(
		'mymember/pttotalkg'
	)
}

/**
 * @description 						查看该用户是否有优惠券
 * 
 * @param {Object} userid				用户 id
 */
export function findConpons (userid) {
	return fly.get(
		'coupons/findconponsbyuserid',
		{
			userid
		}
	)
}

/**
 * @description 						更新优惠券状态
 * 
 * @param {Object} userid				用户 id
 */
export function updateConpons (userid) {
	return fly.get(
		'coupons/updateconponsbyuserid',
		{
			userid
		}
	)
}

/**
 * @description						领优惠券
 * 
 * @param {Object} storeid			店铺 id
 * @param {Object} userid			用户 id
 */
export function getCou(userid, yhqid) {
	console.log(arguments);
	return fly.get(
		'coupons/getconponsbystoreid',
		{
			userid,
			yhqid
		}
	)
}

/**
 * 查询优惠券发放状态
 */
export function findConponsGov () {
	return fly.get('coupons/findconponsbypt')
}


export function liubaqiangquan () {
	return fly.get('coupons/findconponsbysite')
}

export function liubaqiangquanThree () {
	return fly.get('coupons/findconponsbytythr')
}

export function liubaxueshengquan () {
	return fly.get('coupons/findconponsbystu')
}

export function liubaxueshengquans () {
	return fly.get('coupons/findconponsbystutwo')
}

export function liubajiguanquan () {
	return fly.get('coupons/findconponsbyorg')
}

export function liubajiguanquans () {
	return fly.get('coupons/findconponsbyorgtwo')
}

export function lbZhguans () {
	return fly.get('coupons/findconponsbyorg')
}

export function jfskquan () {
	return fly.get('coupons/findconponsbystore')
}

export function zykb () {
	return fly.get('coupons/findconponsbystorezy')
}

export function cxcheXian () {
	return fly.get('coupons/findconponsbyhuaxu')
}
/**
 * 抢优惠券
 * 
 * @param {Object} userid
 * @param {Object} yhqid
 */
export function robCoupons (userid, yhqid) {
	return fly.get(
		'coupons/getconponsbyuserid',
		{
			userid,
			yhqid
		}
	)
}

export function lianHequan () {
	return fly.get('coupons/findconponsbypt')
}

/**
 * @description 						可抢优惠券列表
 */
export function canRobCouponsList(page = 1, pageSize = 10) {
	return fly.get(
		'coupons/StoreCouponsList',
		{
			page,
			pageSize
		}
	)
}


/**
 * @description 						领取店铺优惠券
 * 
 * @param {Object} userid				领取人的 id
 * @param {Object} yhqid				要领取的优惠券 id
 */
export function getCoupon(userid, yhqid,phone="") {
	return fly.get(
		'coupons/getconponsbystoreid',
		{
			userid,
			yhqid,
			phone
		}
	)
}

/**
 * @description 						付款时可用优惠券
 * 
 * @param {Object} userid				使用优惠券的人的 id
 * @param {Object} storeid				使用优惠券的店铺的 id
 */
export function getCouponsAvailable(userid, storeid) {
	return fly.get(
		'mymember/NewMyClipCoupons',
		{
			userid,
			storeid
		}
	)
}

/**
 * @description 						搜索优惠券
 */
export function searchCoupon(keyword, SortID, page = 1, pageSize = 10) {
	return fly.get(
		'coupons/StoreCouponsList',
		{
			keyword,
			SortID,
			page,
			pageSize
		}
	) 
}

/**
 * @description 						付款成功后发短信
 */
export function sendSMS(userid, yyyid, storeid, num) {
	return fly.get(
		'scores/newzfjs',
		{
			userid,
			yyyid,
			storeid,
			num
		}
	)
}

/**
 * @description 			国际小姐报名付款
 * 
 * @param {Object} out_trade_no
 * @param {Object} total_amount
 * @param {Object} body
 * @param {Object} openid
 * @param {Object} userid
 * @param {Object} price
 * @param {Object} Name
 * @param {Object} Birth
 * @param {Object} Phone
 * @param {Object} BigHeadPhoto
 * @param {Object} Area
 */
export function ofThe(out_trade_no, total_amount, body, openid, userid, price, Name, Birth, Phone, BigHeadPhoto, Area) {
	return fly.post(
		'Wechatpay/PointAppletPay', {
	        out_trade_no,
	        total_amount,
	        body,
	        openid,
	        userid,
	        price,
			Name,
			Phone,
			BigHeadPhoto,
			Area
	    }, {
	        baseURL: paymentBaseURL
	    }
	)
}


// 微信红包充值
export function getWxAppletRechargeOrderInfo(out_trade_no, total_amount, body, userid, mid, chargeid) {
    
	return fly.post(
        'Wechatpay/ChargeAppletPay', {
            out_trade_no,
			total_amount: total_amount,
			body,
			userid,
			mid,
			chargeid
        }, {
            baseURL: paymentBaseURL
        }
    )
}

// 支付宝小程序红包充值
export function getAppletsPays(userid, out_trade_no, subject, total_amount, body, buyerid, chargeid) {
	return fly.post(
        'Alipay/ChargeAlipayAppletPay',  {
	        userid,
			out_trade_no,
	        subject,
			total_amount,
	        body,
	        buyerid,
			chargeid
	    },
		{
			baseURL: paymentBaseURL
		}
	)
}

// 微信小程序待释放充值
export function getwxAppletsJFPay(userid,openid,out_trade_no, total_amount, body, phone) {
	return fly.post(
		'Wechatpay/PointsPay', {
	        userid,
	        openid,
	        out_trade_no,
	        total_amount,
	        body,
			phone
	    },
		{
			baseURL: paymentBaseURL
		}
	)
}

// 支付宝小程序待释放充值
export function getAppletsJFPays(userid, out_trade_no, subject, body, buyerid, total_amount, phone) {
	return fly.post(
        'Alipay/PointsPay',  {
	        userid,
			out_trade_no,
	        subject,
	        body,
	        buyerid,
			total_amount,
			phone
	    },
		{
			baseURL: paymentBaseURL
		}
	)
}

/**
 * @description 				国际小姐报名
 * 
 * @param {Object} params	
 */
export function signUp (params) {
	return fly.post(
	'signup/register',
	{
		...params
	}
	)
}

export function applicationConditions () {
	return fly.get(
		'news/missagree', 
		{
			siteid: 0
		}
	)
}


export function tiXian(userid,num,pwd,account,sort) {
	return fly.get(
		'scores/fenruntx', 
		{
			userid,
			num,
			pwd,
			account,
			sort
		}
	)
}

export function shanKa(userid) {
	return fly.get(
		'scores/delyhk', 
		{
			userid,
		}
	)
}

export function tXzd(userid) {
	return fly.get(
		'scores/fenruntxdetail', 
		{
			userid,
		}
	)
}

export function czZd(userid) {
	return fly.get(
		'scores/czdetail', 
		{
			userid,
		}
	)
}

export function zzZd(userid) {
	return fly.get(
		'scores/czjfdetail', 
		{
			userid,
		}
	)
}

export function zzKg() {
	return fly.get(
		'mymember/kqzzkg', 
		{
		}
	)
}

export function zdStore(siteid) {
	return fly.get(
		'store/liststorebyzd', 
		{
			siteid
		}
	)
}

export function hbZq(siteid,sortid,Location,page,pagesize) {
	return fly.get(
		'store/liststorebyhx', 
		{
			siteid,
			sortid,
			Location,
			page,
			pagesize
		}
	)
}

export function getCenterLBLlits(siteID) {
    return fly.get({
        url: 'advert/adverthblist',
		params: {
			siteID: siteID
		}
    })
}

// 抢券页面二级分类
export function redBao() {
	return fly.get(
		'newcoupons/gethotsearch', 
		{
		}
	)
}

// 今日新券
export function todayCou(page,pagesize,location) {
	return fly.get(
		'newcoupons/todaycoupons', 
		{
			page,
			pagesize,
			location
		}
	)
}

// 五折好券
export function fivCou(zhekou,page,pagesize,location) {
	return fly.get(
		'newcoupons/goodcoupons', 
		{
			zhekou,
			page,
			pagesize,
			location
		}
	)
}

// 大牌好券
export function bigCou(page,pagesize,location) {
	return fly.get(
		'newcoupons/bigcoupons', 
		{
			page,
			pagesize,
			location
		}
	)
}

// 商铺类型
export function storeList() {
	return fly.get(
		'newcoupons/getstoresort', 
		{
		}
	)
}

// 券站点
export function getSite() {
	return fly.get(
		'newcoupons/getstoresite', 
		{
		}
	)
}

// 抢券接口
export function qianQuan(keyword,sortid,siteId,paixu,CouponType,page,pagesize,location) {
	return fly.get(
		'newcoupons/getallstorecouponslist', 
		{
			keyword,
			sortid,
			siteId,
			paixu,
			CouponType,
			page,
			pagesize,
			location
		}
	)
}

// 抢券二级分类
export function twoQuan(sortinstoreid,page,pagesize) {
	return fly.get(
		'newcoupons/getsortinstore', 
		{
			sortinstoreid,
			page,
			pagesize
		}
	)
}

// 抢券轮播图
export function lunbBo(siteID) {
	return fly.get(
		'advert/adverqqlist', 
		{
			siteID
		}
	)
}

/// <summary>
/// 我的优惠券
/// </summary>
/// <param name="userid">用户ID</param>
/// <param name="type">1未使用 2已使用 3已过期</param>
/// <returns>CouponSort 优惠券类型   1红包专区  2站点通用 6满代 7满送</returns>

export function myCoulist(userid,type,page,pagesize) {
	return fly.get(
		'newcoupons/mycoupons', 
		{
			userid,
			type,
			page,
			pagesize
		}
	)
}

// <summary>
// 微信小程序短信在线充值
// </summary>
// <param name="userid">用户Id</param>
// <param name="openid">openid</param>
// <param name="out_trade_no">订单号</param>
// <param name="total_amount">充值金额</param>
// <param name="body">描述信息</param>
// <param name="storeid">店铺id</param>
// <param name="nums">条数</param>
export function getWxduanxin(userid, openid, out_trade_no, total_amount, body, storeid, nums) {
	
	return fly.post(
        'Wechatpay/SMSWPay', {
            userid: userid, 
			openid: openid, 
			out_trade_no: out_trade_no,
			total_amount: total_amount * 100,
			body: body, 
			storeid: storeid, 
			nums: nums
        }, {
            baseURL: paymentBaseURL
        }
    )
}

// 车险微信消费
export function getWxchexian(out_trade_no, total_amount, body, openid, userid, yhqid, phone) {
	console.log('支付参数：', arguments);
	
	return fly.post(
		'Wechatpay/CliCouponsAppletPay',
		{
			out_trade_no,
			total_amount: total_amount * 100,
			body,
			openid,
			userid,
			yhqid,
			phone
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

// 套餐支付
export function tgWxpay(orderid, openid, out_trade_no, total_amount, body) {
	console.log('支付参数：', arguments);
	
	return fly.post(
		'Wechatpay/SetMealPay',
		{
			orderid, 
			openid, 
			out_trade_no, 
			total_amount: total_amount * 100,
			body
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

/// 微信App套餐购买
/// <param name="orderid"></param>
/// <param name="out_trade_no"></param>
/// <param name="total_amount"></param>
/// <param name="body"></param>
export function tgAppWxpay(orderid, out_trade_no, total_amount, body) {
	console.log('支付参数：', arguments);
	
	return fly.post(
		'Wechatpay/SetMealAppPay',
		{
			orderid, 
			out_trade_no, 
			total_amount: total_amount * 100,
			body
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

/// 支付宝App套餐购买
/// <param name="orderid">套餐订单ID</param>
/// <param name="out_trade_no"></param>
/// <param name="subject"></param>
/// <param name="body"></param>
/// <param name="total_amount"></param>
export function tgAlipay(orderid, out_trade_no, subject, body, total_amount) {
	console.log('支付参数：', arguments);
	
	return fly.post(
		'Alipay/SteMealAppPay',
		{
			orderid, 
			out_trade_no,
			subject,
			body,
			total_amount: total_amount
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

/// 微信App充值积分
/// <param name="userid">用户Id</param>
/// <param name="out_trade_no"></param>
/// <param name="total_amount"></param>
/// <param name="body"></param>
/// <param name="phone">用户手机</param>
/// Wechatpay/PointsAppPay
export function zzhbWXpay(userid, out_trade_no, total_amount, body, phone) {
	console.log('支付参数：', arguments);
	
	return fly.post(
		'Wechatpay/PointsAppPay',
		{
			userid, 
			out_trade_no,
			total_amount,
			body,
			phone
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

/// 支付宝App充值积分（红包）
/// <param name="userid">用户ID</param>
/// <param name="out_trade_no">订单号</param>
/// <param name="subject">订单标题</param>
/// <param name="body">对交易或商品的描述</param>
/// <param name="total_amount">订单总金额，单位为元，精确到小数点后两位</param>
/// <param name="phone">推荐人电话</param>
export function zzhbZFBpay(userid, out_trade_no, subject, body, total_amount, phone) {
	console.log('支付参数：', arguments);
	
	return fly.post(
		'Alipay/PointsAppPay',
		{
			userid, 
			out_trade_no,
			subject,
			body,
			total_amount,
			phone
		},
		{
			baseURL: paymentBaseURL
		}
	)
}

// APP微信红包充值
export function getWxApplets(userid,out_trade_no, total_amount, body, chargeid) {
    
	return fly.post(
        'Wechatpay/ChargeAppPay', {
			userid,
            out_trade_no,
			total_amount,
			body,
			chargeid
        }, {
            baseURL: paymentBaseURL
        }
    )
}

// APP支付宝充值
export function czhbAppPay(userid, out_trade_no, subject, total_amount, body,chargeid) {
	return fly.post(
        'Alipay/ChargeAlipayAppPay',  {
	        userid,
			out_trade_no,
	        subject,
			total_amount,
	        body,
			chargeid
	    },
		{
			baseURL: paymentBaseURL
		}
	)
}