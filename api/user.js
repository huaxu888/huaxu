import fly from './http'

export function getOpenid(js_code) {
    return fly.get({
        url: 'GetOpenid/getopenid',
        params: {
            js_code: js_code
        }
    })
}

export function getAliUserInfo (authCode){
    return fly.get({
        url: 'getopenid/getuserid',
		params: {
			authCode: authCode
		}
    })
}

export function getUserBalance(userid, page = 1, pageSize = 10) {
    return fly.get({
        url: 'scores/newmyrest',
        params: {
            userid: userid,
			page: page,
			pageSize: pageSize
        }
    })
}

export function getDiscount(userID, storeID) {
	return fly.get({
		url: 'mymember/Myzk',
		params: {
			userid: userID,
			storeid: storeID
		}
	})
}

export function getProfit(userid, sort = 0, page = 1 , pageSize = 10) {
	return fly.get({
		url: 'scores/myprofit',
		params: {
			userid: userid,
			page: page,
			pageSize: pageSize,
			sort: sort
		}
	})
}

/**
 * @description 							充值个人代理
 * 
 * @param {Object} userid					用户 ID
 * @param {Object} sort						充值方式，1 - 支付宝，2 - 微信
 * @param {Object} tag						个人代理类型
 * @param {Object} name						用户姓名
 * @param {Object} phone					用户电话
 */
export function getProxy(userid, sort, tag, name) {
	return fly.get({
		url: 'scores/czdl',
		params: {
			userid: userid,
			sort: sort,
			tag: tag,
			name: name
		}
	})
}


/**
 * @description 				是否有登录红包
 */
export function isMrhb(userid) {
	return fly.get({
		url: 'scores/ismrhb',
		params: {
			userid: userid,
		}
	})
}


/**
 * @description 				一进入系统就调用该方法(花蓄登录红包)
 */
export function toQD(userid) {
	return fly.get({
		url: 'scores/dengluhb',
		params: {
			userid: userid,
		}
	})
}


/**
 * @description 				获取未读信息数量
 */
export function getMsgCount(userid) {
	return fly.get({
		url: 'message/msgwd',
		params: {
			userid: userid,
		}
	})
}

/**
 * @description 				获取用户预约列表
 * 
 * @param {Object} userid		用户 id
 */
export function getReservitionList(userid,sort) {
	return fly.get({
		url: 'book/booklist',
		params: {
			userid: userid,
			sort: sort,
		}
	})
}

/**
 * @description 				取消当前预约
 * 
 * @param {Object} userid		用户 id
 * @param {Object} bookid		预约订单 id
 */
export function cancleReservition(userid, bookid) {
	return fly.get({
		url: 'book/cancelbook',
		params: {
			userid: userid,
			bookid: bookid
		}
	})
}

/**
 * @description 				获取用户信息
 * 
 * @param {Object} userId
 */
export function getUserInfo(userId) {
	return fly.get(
		'menber/myinfo',
		{
			userId
		}
	)
}

/**
 * @description 			积分提现
 * 
 * @param {Object} userid
 * @param {Object} num
 * @param {Object} sort
 */
export function withdrawalIntegral(userid, num, sort) {
	return fly.get(
		'scores/sppfjs',
		{
			userid,
			num,
			sort
		}
	)
}