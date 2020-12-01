import fly from './http'

/**
 * @description 根据店铺 ID 获取店铺信息
 * 
 * @param {Object} id	店铺 ID
 */
export function getStore(id) {
    return fly.get({
        url: 'mystore/getstore',
        params: {
            storeid: id
        }
    })
}


/**
 * @description 获取花蓄存款介绍
 */
export function gethxBlanck() {
    return fly.get({
        url: 'news/huaxublank'
    })
}


/**
 * @description 花蓄头条
 */
export function getTopList() {
    return fly.get({
        url: 'news/listtttop'
    })
}

export function getTopLists(page,pagesize) {
    return fly.get({
        url: 'news/listnosort',
		params: {
		   page:page,
		   pagesize:pagesize
		}
    })
}

/**
 * @description 获取店铺分类
 */
export function getStoreSortList(siteid=0,num=0) {
    return fly.get({
        url: 'store/getstoresortlist',
		params: {
		    siteid,
			num
		}
    })
}


/*获取站点*/
export function getSite() {
    return fly.get({
        url: 'site/list'
		
    })
}

/*新的获取站点*/
export function newGetSite(data) {
    return fly.get({
        url: 'site/newlist',
		params: data
    })
}

/*获取店铺列表*/
export function getListNoSort(data) {
    return fly.get({
        url: 'store/listnosort',
		params: data
		
    })
}

/*获取抢单信息*/
export function getQD(id) {
    return fly.get({
        url: 'scores/isqd',
		params: {
		    userid: id
		}
    })
}


/*获得精选商铺列表 废除*/
export function getJXBusiness(siteid,page = 1,pagesize = 10) {
    return fly.get({
        url: 'store/listbusinessnosort',
		params: {
		    siteid: siteid,
			page:page,
			pagesize:pagesize
		}
    })
}

// export function getNewJXBusiness(siteid, Location, page = 1, pagesize = 10,getsort){
// 	return fly.get({
// 		url: 'store/newlistbusinessnosort',
// 		params: {
// 		    siteid: siteid,
// 			page:page,
// 			Location: Location,
// 			pagesize:pagesize,
// 			getsort:getsort
// 		}
// 	})
// }

export function getNewJXBusiness(siteid, Location, page = 1, pagesize = 10,getsort){
	return fly.get({
		url: 'store/mynewlistbusinessnosort',
		params: {
		   siteid: siteid,
			page:page,
			Location: Location,
			pagesize:pagesize,
			getsort:getsort
		}
	})
}


/**
 * @description 					获取商圈下的所有店铺
 * 
 * @param {Object} busid			商圈 ID
 */
export function getShopListInBusinessCircle(busid) {
	return fly.get({
		url: 'business/getbusstorelist',
		params: {
			busid: busid
		}
	})
}

/**
 * @description 					获取站点下的商圈列表
 * 
 * @param {Object} siteId			站点 ID
 */
export function getBusinessCircleList(siteId) {
	return fly.get({
		url: 'business/getbusiness',
		params: {
			siteid: siteId
		}
	})
}

/**
 * @description 						获取商圈某个分类的店铺列表
 * 
 * @param {Object} sortId				分类 ID
 * @param {Object} busId				商圈 ID
 * @param {Object} sort					排序方式: 1 | 离我最近, 2 | 大家喜欢, 3 | 热度最高, 4 | 推荐
 * @param {Object} page					页码, 默认为 1
 * @param {Object} location				当前地址, sort 为 1 时必须传入
 * @param {Object} pageSize				每页显示的数量, 默认为 10
 */
export function getBusinessListByShopSort(sortId, busId, sort, page = 1, location, pageSize = 10) {
	return fly.get({
		url: 'business/listbysort',
		params: {
			storesortid: sortId,
			busid: busId,
			getsort: sort,
			page: page,
			pagesize: pageSize,
			Location: location
		}
	})
}

export function fenLeis(storesortid,sortid,siteid,getsort=1,page = 1,pageSize = 10,Location) {
	return fly.get({
		url: 'store/listbysort',
		params: {
			storesortid:storesortid,
			sortid:sortid,
			siteid:siteid,
			getsort:getsort,
			page:page,
			pageSize:pageSize,
			Location:Location
		}
	})
}

export function fenLei(sortid) {
	return fly.get({
		url: 'store/getstoresortbysortid',
		params: {
			sortid: sortid,
		}
	})
}

export function getWmList(sortid) {
    return fly.get({
        url: 'wm/wmlist',
        params: {
            sortid: sortid
        }
    })
}

/// 编辑店铺上下班，站点，商圈
export function editStoreInfo(data) {
    return fly.get({
        url: 'store/editdescbus',
        params: data
    })
}



/**
 * @description  提交订单信息
 * 
 * @param {Object} StoreID 				店铺id
 * @param {Object} UserID				用户id
 * @param {Object} ShopContent			商品集合
 */
export function submitOrderList(data) {
    return fly.post(
       'order/createdd',
        data
    )
}

// 查询是否货物
export function isHaveGoods(storeid) {
    return fly.get({
        url: 'wm/ishaveshop',
        params: {
			storeid:storeid
		}
    })
}


export function getOrderByBookid(storeid, bookid, ddid, ddno, isspecial) {
    return fly.get({
        url: 'order/getorderbybookid',
        params: {
			storeid,
			bookid,
			ddid,
			ddno,
			isspecial
		}
    })
}

//根据WMInfoID获取商品详情
export function getDetailByid(WMInfoID) {
    return fly.get({
        url: 'wm/goodinfo',
        params: {
			WMInfoID:WMInfoID
		}
    })
}

/**
 * @description 					通过订单 id 获取订单详情
 * 
 * @param {Object} ddid				订单 id
 */
export function getOrderByid(ddid) {
    return fly.get({
        url: 'order/getorderbyid',
        params: {
			ddid:ddid
		}
    })
}

export function getxq(xfid) {
    return fly.get({
        url: 'scores/mydddetail',
		params: {
			xfid:xfid
		}
    })
}
/**
 * @description 发起预约(不点餐)
 * 
 * @param {Object} userId				发起预约的用户 id
 * @param {Object} storeId				要预约的店铺 id
 * @param {Object} number				预约的用餐人数
 * @param {Object} date					预约用餐日期
 * @param {Object} time					预约用餐时间
 * @param {Object} name					预约用餐的联系人
 * @param {Object} sex					预约用餐联系人的性别
 * @param {Object} phone				预约用餐联系人的联系电话
 * @param {Object} info					预约用餐的其他备注信息
 */
export function reservation (userId, storeId, number, date, time, name, sex, phone, info, ConsumedWay = 0) {
	return fly.post(
		'wm/bookorder',
		{
			UserID: userId,
			StoreID: storeId,
			Num: number,
			YCDate: date,
			YCTime: time,
			Contacts: name,
			Sex: sex,
			Phone: phone,
			Info: info,
			ConsumedWay: ConsumedWay
		}
	)
}

/**
 * 商品上下架
 * 
 * @param {Object} id	商品 id
 */
export function saleStatus(id) {
	return fly.get({
		url: 'wm/wmischeck',
		params: {
			id: id
		}
	})
}

export function getGoodsList(storeid) {
	return fly.get({
		url: 'wm/goodslist',
		params: {
			storeid
		}
	})
}

/**
 * @description							获取店铺所有订单
 * @param {number}  					店铺 ID
 * @param {number}  					订单类型 【0 所有订单， 1 扫码点餐订单， 2 纯预约订单， 3 预约 + 点餐订单】
 */
export function getAllOrdersList(storeid, sort = 0, page = 1, pagesize = 10) {
	return fly.get({
		url: 'order/getorderbystoreid',
		params: {
			storeid,
			sort,
			page,
			pagesize
		}
	})
}


/// <summary>
        /// 通过商家查询预约订单
        /// </summary>
        /// <param name="storeid">商家id</param>
        /// <param name="sort">订单状态（0:默认全部,1.预约订单，2.待评价，3.已取消）</param>
        /// <param name="page"></param>
        /// <param name="pagesize"></param>
        /// <returns></returns>
export function getyuyue(storeid, sort = 0, page = 1, pagesize = 10) {
	return fly.get({
		url: 'order/getbookbystoreid',
		params: {
			storeid,
			sort,
			page,
			pagesize
		}
	})
}


/**
 * @description 				订单核销
 * 
 * @param {Object} bookid		预约单号
 * @param {Object} storeid		店铺 id
 * @param {string} ddid 		订单 id
 */
export function verifyOrder(storeid, ddid, bookid = 0) {
	return fly.get({
		url: 'order/getorder',
		params: {
			storeid,
			bookid,
			ddid
		}
	})
}

/**
 * @description 					商家拒绝预约
 * 
 * @param {Object} storeid			商户 id
 * @param {Object} bookid			预约单号
 */
export function refuseBook(storeid, bookid) {
	return fly.get({
		url: 'book/refusebook',
		params: {
			storeid,
			bookid
		}
	})
}

/**
 * @description 							发货
 * 
 * @param {Object} ddid						订单编号
 * @param {Object} storeid					店铺 id
 * @param {Object} ordernumber				快递单号
 */
export function ship(ddid, storeid, ordernumber) {
	return fly.get(
		'order/sendgoods',
		{
			ddid,
			storeid,
			ordernumber
		}
	)
}

/**
 * @description 							验证交易密码
 * 
 * @param {Object} userid					用户 id
 * @param {Object} pin						交易密码
 */
export function verifyPin(userid, pin) {
	return fly.get(
		'menber/ispwdanswer',
		{
			userid,
			pwdanswer: pin
		}
	)
}

/**
 * @description 					获取距离当前位置最近的 5 个自提点
 * 
 * @param {Object} location			当前位置
 */
export function getToPoint(location) {
	return fly.get(
		'store/neareststore',
		{
			location
		}
	)
}

export function myStore(userid, storeid) {
	return fly.get(
		'mystore/mystore',
		{
			userid,
			storeid
		}
	)
}

// 商家日报
export function ribao(StoreID, yyyid, day, page = 1, pagesize = 10) {
	return fly.get(
		'mystore/xstorexxnyr',
		{
			StoreID,
			yyyid,
			day,
			page,
			pagesize
		}
	)
}

// 商家月报
export function yuebao(StoreID, day, yyyid, page = 1, pagesize = 10) {
	return fly.get(
		'mystore/xxstorexxjemon',
		{
			StoreID,
			day,
			yyyid,
			page,
			pagesize
		}
	)
}

export function shangjia(StoreID, userid) {
	return fly.get(
		'store/newdetail',
		{
			StoreID,
			userid
		}
	)
}

export function baobiao(storeid, day, sort, zfsort) {
	return fly.get(
		'mystore/toretodayjyfx',
		{
			storeid,
			day,
			sort,
			zfsort
		}
	)
}

export function shuShous(storeid, day, sort) {
	return fly.get(
		'storemoney/storetodayqbsj',
		{
			storeid,
			day,
			sort
		}
	)
}

// 满减券/团购消费记录 + 日报
export function cxRibao(StoreID, yyyid, day, sort, page, pagesize) {
	return fly.get(
		'storemoney/storexfbyday',
		{
			StoreID, 
			yyyid, 
			day, 
			sort, 
			page, 
			pagesize
		}
	)
}

// 满减券/团购消费记录 + 月报
export function cxYuebao(StoreID, day, sort, yyyid, page, pagesize) {
	return fly.get(
		'storemoney/storexxbymon',
		{
			StoreID,
			day, 
			sort, 
			yyyid, 
			page, 
			pagesize
		}
	)
}

// 消费详情
export function xfXq(XFID) {
	return fly.get(
		'storemoney/storexfxq',
		{
			XFID
		}
	)
}

export function zfbBind(userid,zfbname,phone,zfbno) {
	return fly.get(
		'scores/bdzfb',
		{
			userid,
			zfbname,
			phone,
			zfbno
		}
	)
}

// 解绑支付宝
export function jbZfb(userid,zfbno) {
	return fly.get(
		'storemoney/jbzfb',
		{
			userid,
			zfbno
		}
	)
}

// 账户资金
export function ziJin(userid,storeid) {
	return fly.get(
		'storemoney/storecapital',
		{
			userid,
			storeid
		}
	)
}

// 提现明细
export function txMx(storeid,day,sort,page,pagesize) {
	return fly.get(
		'storemoney/getshoptxlist',
		{
			storeid,
			day,
			sort,
			page,
			pagesize
		}
	)
}


// 自发券提现
export function zfTix(StoreID,num,userid,pwd,sort) {
	return fly.get(
		'storemoney/CouponsCashOut',
		{
			StoreID,
			num,
			userid,
			pwd,
			sort
		}
	)
}

// 团购提现
export function tgTix(StoreID,num,userid,pwd,sort) {
	return fly.get(
		'storemoney/TGCashOut',
		{
			StoreID,
			num,
			userid,
			pwd,
			sort
		}
	)
}

// 我的会员消费详情
export function hyXq(StoreID,userid,page,pagesize) {
	return fly.get(
		'mystore/mynewmemberdetail',
		{
			StoreID,
			userid,
			page,
			pagesize
		}
	)
}

// 提现详情
export function txXQ(userid,storeid,sort) {
	return fly.get(
		'storemoney/storetxjlxq',
		{
			userid,
			storeid,
			sort
		}
	)
}

// 短信充值记录
export function cxDxjl(userid,storeid,page,pagesize) {
	return fly.get(
		'SmsManage/smsczlist',
		{
			userid,
			storeid,
			page,
			pagesize
		}
	)
}

// 短信消费记录
export function xfDxjl(userid,storeid,page,pagesize) {
	return fly.get(
		'SmsManage/smsxflist',
		{
			userid,
			storeid,
			page,
			pagesize
		}
	)
}

// 短信信息列表
export function cxDlist() {
	return fly.get(
		'SmsManage/smslist',
		{
			
		}
	)
}

// 已发短信信息列表
export function yfDlist(StoreID,page = 1,pagesize = 10) {
	return fly.get(
		'SmsManage/sendsmslist',
		{
			StoreID:StoreID,
			page:page,
			pagesize:pagesize
		}
	)
}

// 商家后台发送短信前置接口
export function qzDuan(StoreID,userID) {
	return fly.get(
		'storemoney/StoreMessageSendPre',
		{
			StoreID:StoreID,
			userID:userID
		}
	)
}

// 查询单店铺下的优惠券
export function cxDandian(storeid,page,pagesize=10) {
	return fly.get(
		'newcoupons/storecoupons',
		{
			storeid:storeid,
			page:page,
			pagesize:pagesize
		}
	)
}

// 根据套餐ID获取套餐详情
export function tcXq(setMealId) {
	return fly.get(
		'setmeal/setmealinfo',
		{
			setMealId:setMealId,
		}
	)
}

// 根据商铺ID获取店铺下的套餐列表
export function tcList(storeid,page,pagesize=10) {
	return fly.get(
		'setmeal/setmeallist',
		{
			storeid:storeid,
			page:page,
			pagesize:pagesize
		}
	)
}

// 喜欢+1
export function xhAdd(userId,setMealId) {
	return fly.get(
		'setmeal/setmeallike',
		{
			userId:userId,
			setMealId:setMealId,
		}
	)
}

// 访问者接口
export function fwJkou(storeid) {
	return fly.get(
		'visit/getlist',
		{
			storeid:storeid
		}
	)
}

// 访问者接口2
export function shopDetils(setMealId) {
	return fly.get(
		'setmeal/getvisitlist',
		{
			setMealId:setMealId
		}
	)
}

// 店铺轮播图
export function dpSwiper(siteID) {
	return fly.get(
		'advert/setmealpics',
		{
			siteID:siteID
		}
	)
}

// VIP商家专区
/// <param name="storesortid">店铺分类的ID</param>
/// <param name="sortid">点选分类ID</param>
/// <param name="siteid">站点ID，默认为0所有站点</param>
/// <param name="getsort">1：离我最近 2:销量最高</param>
/// <param name="select">0全部，1：星级 2:人气</param>
/// <param name="page">分页显示,默认第一页</param>
/// <param name="pagesize">每页显示的条数,默认10条</param>
/// <param name="Location">请传入当前地址</param>
export function getVip(storesortid,sortid,siteid,getsort,select,page,pagesize,Location) {
	return fly.get(
		'store/getviplistbysort',
		{
			storesortid,
			sortid,
			siteid,
			getsort,
			select,
			page,
			pagesize,
			Location
		}
	)
}

// 热卖爆品首页6个
export function hotSalethings() {
	return fly.get(
		'mysetmeal/getmealpre',
		{
			
		}
	)
}

/// 热卖爆品更多
/// <param name="sort">分类1:推荐,2:附近 3:最新（默认为1）</param>
/// <param name="keyword">套餐搜索关键字(默认为空)</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function hotSalelist(sort,keyword,Location,page,pagesize = 10) {
	return fly.get(
		'mysetmeal/getmeallist',
		{
			sort,
			keyword,
			Location,
			page,
			pagesize
		}
	)
}

// 大家都在买首页10个
export function userAllsale() {
	return fly.get(
		'mysetmeal/gethotmealpre',
		{
			
		}
	)
}

/// 大家都在买更多
/// </summary>
/// <param name="sort">1:推荐 2:人气 3:价格 4:附近活动</param>
/// <param name="Location">默认为 0，0</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function userBuy(sort,Location,page,pagesize) {
	return fly.get(
		'mysetmeal/gethotmeallist',
		{
			sort,
			Location,
			page,
			pagesize
		}
	)
}

/// <summary>
/// 最新活动首页12个
/// </summary>
/// <param name="sort">1:推荐 2:附近</param>
/// <param name="Location">默认（0，0）</param>
export function newAct(sort,Location) {
	return fly.get(
		'mysetmeal/getnewmeallist',
		{
			sort,
			Location
		}
	)
}

/// 获取首页商家专区
/// <param name="storesortid">自定义大类选择1:商家 2:超值套餐 3:优惠买单 4:抢代金券</param>
/// <param name="sortid">点选分类ID</param>
/// <param name="siteid">站点ID，默认为0所有站点</param>
/// <param name="getsort">1：离我最近 2:销量最高</param>
/// <param name="select">0全部，1：星级 2:人气</param>
/// <param name="page">分页显示,默认第一页</param>
/// <param name="pagesize">每页显示的条数,默认10条</param>
/// <param name="Location">请传入当前地址</param>
export function gethomePage(storesortid,sortid,siteid,getsort,select,page,pagesize,Location) {
	return fly.get(
		'mysetmeal/getstorelistbysort',
		{
			storesortid,
			sortid,
			siteid,
			getsort,
			select,
			page,
			pagesize,
			Location
		}
	)
}

/// 提交订单
/// <param name="userid">用户Id</param>
/// <param name="setmealid">套餐Id</param>
/// <param name="num">商品数量</param>
/// <param name="totalprice">订单总价</param>
/// <param name="phone">用户手机</param>
export function giveOrder(userid,setmealid,num,totalprice,phone) {
	return fly.get(
		'buylist/submitorder',
		{
			userid,
			setmealid,
			num,
			totalprice,
			phone
		}
	)
}

/// 取消订单
/// <param name="buylistid"></param>
export function detailOrder(buylistid) {
	return fly.get(
		'buylist/cancelorder',
		{
			buylistid
		}
	)
}

/// 查询用户订单列表
/// <param name="userid">用户ID</param>
/// <param name="sort">默认为0:全部 1:待支付  2:支付超时 3:已取消  4:已删除 5:待使用 6:已完成 7:退款中 8:已退款</param>
export function selectOrder(userid,sort,page,pagesize) {
	return fly.get(
	'buylist/showorderlist',
		{
			userid,
			sort,
			page,
			pagesize
		}
	)
}

/// 扫码
/// <param name="orderid">订单号</param>
/// <param name="id">扫码者的Id(不是消费者的ID)</param>
export function scanId(orderid,id) {
	return fly.get(
	'buylist/scancode',
		{
			orderid,
			id
		}
	)
}

/// 首页VIP一个商家
export function homeVip() {
	return fly.get(
	'mysetmeal/getfirstvipmeal',
		{
		}
	)
}


/// 获取限时套餐顶部轮播图
/// <param name="siteID">站点id</param>
export function timeSwipper(siteID) {
	return fly.get(
	'advert/adverxslist',
		{
			siteID
		}
	)
}

/// 套餐关键字热搜
export function tcHot() {
	return fly.get(
	'mysetmeal/gethotksetmeal',
		{
			
		}
	)
}

/// 读取套餐分类列表
/// <param name="num">读取前几条数据,默认0读取三条数据</param>
export function tcSort(num) {
	return fly.get(
	'setmealsort/getsetmealsortlist',
		{
			num
		}
	)
}

/// 获取分类搜索查询专区
/// <param name="storesortid">品类ID</param>
/// <param name="getsort">1：离我最近 2:销量最高</param>
/// <param name="siteid">站点ID，默认为0所有站点</param>
/// <param name="select">0全部，1：星级 2:人气</param>
/// <param name="keyword">搜索关键字</param>
/// <param name="page">分页显示,默认第一页</param>
/// <param name="pagesize">每页显示的条数,默认10条</param>
/// <param name="Location">请传入当前地址</param>
export function timeLast(storesortid,getsort,siteid,select,keyword,page,pagesize,Location) {
	return fly.get(
	'mysetmeal/getsetmeallistbysort',
		{
			storesortid,
			getsort,
			siteid,
			select,
			keyword,
			page,
			pagesize,
			Location
		}
	)
}

/// 获取限时套餐（自定义分类以及套餐分类搜索）
/// <param name="getsort">1：最新活动 2:人气精选 3:玩乐精选 4:精致生活 5:约会聚餐</param>
/// <param name="siteid">站点ID，默认为0所有站点</param>
/// <param name="page">分页显示,默认第一页</param>
/// <param name="pagesize">每页显示的条数,默认10条</param>
export function myselfTimelist(getsort,siteid,page,pagesize,Location) {
	return fly.get(
	'mysetmeal/getxssetmeal',
		{
			getsort,
			siteid,
			page,
			pagesize,
			Location
		}
	)
}


/// 套餐核销
/// <param name="orderid">订单Id</param>
/// <param name="code">核销码,多个用逗号隔开</param>
/// <param name="id">扫码者Id</param>
export function tcApplied(orderid,code,id) {
	return fly.get(
	'buylist/setmealhx',
		{
			orderid,
			code,
			id
		}
	)
}

/// 商品收藏列表
/// <param name="userid">用户id</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function shoppingLove(userid,page,pagesize) {
	return fly.get(
	'setmeal/Collectedlist',
		{
			userid,
			page,
			pagesize
		}
	)
}

/// 推荐套餐列表
/// <param name="sort">1,限时套餐推荐  2,牛皮癣套餐推荐</param>
export function tjtcList(sort) {
	return fly.get(
	'setmeal/tuijianlist',
		{
			sort
		}
	)
}

/// 推荐活动3个
/// <param name="siteid">站点ID，默认为0所有站点</param>
/// <param name="Location">请传入当前地址</param>
export function tjList(siteid,Location) {
	return fly.get(
	'mysetmeal/getxstjsetmeal',
		{
			siteid,
			Location
		}
	)
}

/// 查看收藏状态
/// <param name="userid">用户id</param>
/// <param name="setmealid">商品id</param>
export function cxShoucang(userid,setmealid) {
	return fly.get(
	'setmeal/checkcollected',
		{
			userid,
			setmealid
		}
	)
}

/// 个人中心精选推荐套餐
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function personTj(page,pagesize) {
	return fly.get(
	'mymember/getallmeal',
		{
			page,
			pagesize
		}
	)
}

/// 用户浏览足迹列表
/// <param name="userid">用户id</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function userSlot(userid,page,pagesize) {
	return fly.get(
	'setmeal/getfootmarks',
		{
			userid,
			page,
			pagesize
		}
	)
}

/// 用户浏览足迹删除
/// <param name="userid">用户id</param>
/// <param name="id">足迹ID</param>
export function userSlotDetil(userid,id) {
	return fly.get(
	'setmeal/delfootmarks',
		{
			userid,
			id
		}
	)
}

/// 商家团购(套餐)订单
/// <param name="storeid">店铺id</param>
/// <param name="type">type=0全部   1今日  2昨日  3本周</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function storeTg(storeid,type,page,pagesize) {
return fly.get(
	'buylist/storesetmealorderinfo',
		{
			storeid,
			type,
			page,
			pagesize
		}
	)
}
  
/// 我的团队
/// <param name = "userid" > 用户ID </ param >
export function wdTeam(userid,page,pagesize) {
	return fly.get(
	'menber/newmyteam',
		{
			userid,
			page,
			pagesize
		}
	)
}

/// 店铺付款订单
/// <param name="storeid">店铺id</param>
/// <param name="type">type
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function payOrder(storeid,type,page,pagesize) {
	return fly.get(
	'buylist/storepayorderlist',
		{
			storeid,
			type,
			page,
			pagesize
		}
	)
}

/// 查询商家单个套餐订单详情
/// <param name="orderid">订单详情id (不是订单id)</param>
export function tcDetails(orderid) {
	return fly.get(
	'buylist/storesetmealinfo',
		{
			orderid
		}
	)
}

/// 查询商家单个付款订单详情
/// <param name="orderid">订单id</param>
export function payOrderDetail(orderid) {
	return fly.get(
	'buylist/storebuyinfo',
		{
			orderid
		}
	)
}

/// 核销成功后界面
/// <param name="orderid">订单id</param>
/// <param name="code">核销码,多个用逗号隔开</param>
export function successVer(orderid,code) {
	return fly.get(
	'buylist/setmealhxsuccess',
		{
			orderid,
			code
		}
	)
}

/// 进入退款页面
/// <param name="orderid">订单id</param>
export function refundPage(orderid) {
	return fly.get(
	'buylist/orderrefund',
		{
			orderid
		}
	)
}

/// 确认订单退款
/// <param name="orderid">订单id</param>
/// <param name="num">退款数量</param> 
export function refundSure(orderid,num) {
	return fly.get(
	'buylist/sureorderrefund',
		{
			orderid,
			num
		}
	)
}

/// 取消订单退款                                               
/// <param name="orderid">订单id</param>
export function refundCancel(orderid) {
	return fly.get(
	'buylist/cancelorderrefund',
		{
			orderid
		}
	)
}

/// 查看退款详情
/// <param name="orderid"></param>
export function refundDetail(orderid) {
	return fly.get(
	'buylist/orderrefundinfo',
		{
			orderid
		}
	)
}

/// 推荐活动（支付完成之后）
/// <param name="siteid">站点ID，默认为0所有站点</param>
/// <param name="Location">请传入当前地址</param>
export function paySuccess(siteid,Location) {
	return fly.get(
	'mysetmeal/gettjsetmealaction',
		{
			siteid,
			Location
		}
	)
}


/// 商家在售套餐列表
/// <param name="storeid">店铺id</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function onSale(storeid,page,pagesize) {
	return fly.get(
	'buylist/storesetmeallist',
		{
			storeid,
			page,
			pagesize
		}
	)
}

/// 商家端单套餐核销订单列表
/// <param name="setmealid">套餐id</param>
/// <param name="page"></param>
/// <param name="pagesize"></param>
export function onSaleVer(setmealid,keyword,page,pagesize) {
	return fly.get(
	'buylist/onesetmealbuylistinfolist',
		{
			setmealid,
			keyword,
			page,
			pagesize
		}
	)
}