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

export function getTopLists(data) {
    return fly.get({
        url: 'news/listnosort'
    })
}

/**
 * @description 获取店铺分类
 */
export function getStoreSortList() {
    return fly.get({
        url: 'store/getstoresortlist'
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

export function getNewJXBusiness(siteid, Location, page = 1, pagesize = 10,getsort){
	return fly.get({
		url: 'store/newlistbusinessnosort',
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

export function baobiao(storeid, day, sort) {
	return fly.get(
		'mystore/toretodayjyfx',
		{
			storeid,
			day,
			sort
		}
	)
}
