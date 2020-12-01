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

export function getQb(userid) {
    return fly.get({
        url: 'menber/mywallet',
        params: {
            userid: userid,
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
export function getReservitionList(userid, sort = 0, page = 1 , pageSize = 10) {
	return fly.get({
		url: 'book/booklist',
		params: {
			userid: userid,
			sort: sort,
			page: page,
			pageSize: pageSize,
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

// 分享车险优惠券领取
export function fxChexian(parentid, yhqid, userid) {
	return fly.get(
		'coupons/getconponsbyparentid',
		{
			parentid,
			yhqid,
			userid
		}
	)
}

/// 查询套餐详情
/// <param name="userid">用户ID</param>
/// <param name="orderid">套餐ID</param>
export function cxuserTc(userid, orderid) {
	return fly.get(
		'buylist/buyinfo',
		{
			userid,
			orderid
		}
	)
}

/// 检测是否有未支付订单
/// <param name="userid">用户ID</param>
/// <param name="setmealid">套餐ID</param>
export function cxWzf(userid, setmealid) {
	return fly.get(
		'buylist/checktorder',
		{
			userid,
			setmealid
		}
	)
}

/// 收藏/取消
/// <param name="userid"></param>
/// <param name="setmealid"></param>
export function userLove(userid, setmealid) {
	return fly.get(
		'buylist/collected',
		{
			userid,
			setmealid
		}
	)
}

/// 购买套餐二维码
/// <param name="userid">用户id</param>
/// <param name="orderid">订单ID</param>
export function tcScan(userid, orderid) {
	return fly.get(
		'scores/storesetmealewm',
		{
			userid,
			orderid
		}
	)
}

/// 个人代理（高级代理）详情(新版2020-11-9)
/// <param name="userid"></param>
export function personAgency(userid) {
	return fly.get(
	'agent/getnewsagentperson',
		{
			userid
		}
	)
}

/// 个人代理提现(新版2020-11-9)
/// <param name="userid"></param>
/// <param name="num">提现金额</param>
export function personAgencyTixian(userid,num) {
	return fly.get(
	'agent/getnewagentpout',
		{
			userid,
			num
		}
	)
}

/// 个人代理提现明细
/// <param name="userid"></param>
/// <param name="day">时间段（2019-07）</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function personTixianList(userid,day,page,pagesize) {
	return fly.get(
	'agent/agentpoutdetail',
		{
			userid,
			day,
			page,
			pagesize
		}
	)
}

/// 个人代理团队列表(新版2020-11-9)
/// <param name="userid"></param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function personTeam(userid,page,pagesize) {
	return fly.get(
	'agent/getnewagentpoutmember',
		{
			userid,
			page,
			pagesize
		}
	)
}

/// 个人代理团队详情(新版2020-11-9)
/// <param name="userid">当前代理用户</param>
/// <param name="storeid">商家店铺ID</param>
export function personShopTeamDetail(userid,storeid) {
	return fly.get(
	'agent/getnewagentpmemberdetail',
		{
			userid,
			storeid
		}
	)
} 
		
/// 个人代理商户明细(新版2020-11-9)
/// <param name="userid"></param>
/// <param name="day"></param>
/// <param name="ckday"></param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function personShopTeam(userid,day,ckday,page,pagesize) {
	return fly.get(
	'agent/getnewagentshopdetail',
		{
			userid,
			day,
			ckday,
			page,
			pagesize
		}
	)
}

/// 区域代理提现(新版2020-11-9)
/// <param name="userid"></param>
/// <param name="num">提现金额</param>
export function areaTixian(userid,num) {
	return fly.get(
	'agent/getnewagentareaout',
		{
			userid,
			num
		}
	)
}

/// 区域代理团队详情(新版2020-11-9)
/// <param name="userid">当前代理用户</param>
/// <param name="storeid">商家店铺ID</param>
export function areaTeamDetail(userid,storeid) {
	return fly.get(
	'agent/getnewagentareashopdetail',
		{
			userid,
			storeid
		}
	)
}

/// 区域代理提现明细(新版2020-11-9)
/// <param name="userid"></param>
/// <param name="day">时间段（2019-07）</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function areaTixianList(userid,day,page,pagesize) {
	return fly.get(
	'agent/getnewagentareaoutdetail',
		{
			userid,
			day,
			page,
			pagesize
		}
	)
}

/// 区域代理商家队伍
/// <param name="userid"></param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function areaTeam(userid,page,pagesize) {
	return fly.get(
	'agent/newgetagentareamember',
		{
			userid,
			page,
			pagesize
		}
	)
}

/// 区域代理商家商户明细(新版2020-11-9)
/// <param name="userid"></param>
/// <param name="day"></param>
/// <param name="ckday"></param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function areaShopTeam(userid,day,ckday,page,pagesize) {
	return fly.get(
	'agent/getnewagentareamember',
		{
			userid,
			day,
			ckday,
			page,
			pagesize
		}
	)
}

/// 判断代理类型（个人还是区域）
/// <param name="userid"></param>
export function puanDuan(userid) {
	return fly.get(
	'agent/isagenttype',
		{
			userid
		}
	)
}

/// 区域代理详情(新版2020-11-9)
/// <param name="userid"></param>
export function  areaDetail(userid) {
	return fly.get(
	'agent/getnewagentareaes',
		{
			userid
		}
	)
}


/// 花蓄增值服务协议
/// <param name="">站点ID,默认为0站点通用</param>
export function  huaXuzzxy(siteid) {
	return fly.get(
	'news/hxaddagree',
		{
			siteid
		}
	)
}

/// 余额使用规则
/// <param name="siteid">站点ID,默认为0站点通用</param>
export function yuExy(siteid) {
	return fly.get(
	'news/usescoreagree',
		{
			siteid
		}
	)
}


/// 套餐海报接口
/// <param name="stroreid">店铺id</param>
/// <param name="userid">用户id</param>
/// <param name="setmealid">套餐ID</param>
export function tchaiBao(stroreid,userid,setmealid) {
	return fly.get(
	'hb/setmealposter',
		{
			stroreid,
			userid,
			setmealid
		}
	)
}

/// 个人中心账单
/// <param name="userid">用户ID</param>
/// <param name="day">如：2020-10</param>
/// <param name="ckday">筛选（yyyy-MM-dd）</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function personTransaction(userid,day,ckday,page,pagesize) {
	return fly.get(
	'myscores/getshopdetail',
		{
			userid,
			day,
			ckday,
			page,
			pagesize
		}
	)
}

/// 账单详情
/// <param name="id">账单ID</param>
/// <param name="sort">账单类型</param>
export function personTransactionDetail(id,sort) {
	return fly.get(
	'myscores/getuserxfdetail',
		{
			id,
			sort
		}
	)
}

/// 套餐分享
/// <param name="userid">分享人id  A分享B  此处为A的ID</param>
/// <param name="sourctuserid">A分享B  此处为B的ID</param>
/// <param name="setmealid">套餐ID</param>
export function tcShare(userid,sourctuserid,setmealid) {
	return fly.get(
	'setmeal/setmealshare',
		{
			userid,
			sourctuserid,
			setmealid
		}
	)
}

/// 扫码支付前置接口(开启使用余额的情况)
/// <param name="userid">用户ID</param>
/// <param name="score">订单金额</param>
export function scanPayafter(userid,score) {
	return fly.get(
	'scores/myscorerest',
		{
			userid,
			score
		}
	)
}

/// 增值收益记录
/// <param name="userid"></param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function zzhbRecord(userid,day,page,pagesize) {
	return fly.get(
	'menber/myzzhbrestlist',
		{
			userid,
			day,
			page,
			pagesize
		}
	)
}

/// 订单转增,待确认页面
/// <param name="olduserid">转增人id</param>
/// <param name="buylistid">订单id</param>
export function sureOrder(olduserid,buylistid) {
	return fly.get(
	'buylist/turnbuylist',
		{
			olduserid,
			buylistid
		}
	)
}
  
/// 我的转增套餐列表
/// <param name="userid">用户id</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function giveOrderList(userid,page,pagesize) {
	return fly.get(
	'buylist/myturnbuylist',
		{
			userid,
			page,
			pagesize
		}
	)
}

/// 确认订单转正接口 (转增后不可退款,所以用订单中RefundSubmitDate字段作为转增时间)
/// <param name="newuserid">新用户id</param>
/// <param name="olduserid">老用户id</param>
/// <param name="buylistid">套餐订单id</param>
export function sureOrderchange(newuserid,olduserid,buylistid) {
	return fly.get(
	'buylist/sureturnbuylist',
		{
			newuserid,
			olduserid,
			buylistid
		}
	)
}