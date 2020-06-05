import fly from './http'

export function getTxList(userid) {
    return fly.get({
        url: 'scores/mytixianlist',
        params: {
			pagesize:100,
            userid: userid
        }
    })
}

/**
 * @description 添加用户收货地址
 * 
 * @param {string} UserID	用户 ID
 * @param {Object} params	添加的收货地址对象
 */
export function addAddr(UserID, params) {
	return fly.get({
		url: 'useradress/adduseradress',
		params: {
			UserID: UserID,
			...params
		}
	})
}

/**
 * @description 获取用户收货地址列表
 * 
 * @param {string} UserID	用户 ID
 */
export function getAddrList(UserID) {
	return fly.get({
		url: 'useradress/useraddresslist',
		params: {
			UserID: UserID
		}
	})
}

/**
 * @description 删除收货地址
 * 
 * @param {stirng} UserAddressID	要删除的收货地址 id
 */
export function delAddr(UserAddressID) {
	return fly.get({
		url: 'useradress/deleteuseradress',
		params: {
			UserAddressID: UserAddressID,
		}
	})
}

/**
 * @description 设置默认收货地址
 * 
 * @param {string} UserAddressID
 */
export function setDefaultAddr(UserAddressID) {
	return fly.get({
		url: 'useradress/isdefaultadress',
		params: {
			UserAddressID: UserAddressID
		}
	})
}

/**
 * @description 		通过收货地址 ID 获取收货地址详情
 * 
 * @param {Object} UserAddressID		收货地址 ID
 */
export function getAddr(UserAddressID) {
	return fly.get({
		url: 'useradress/getuseradressbyid',
		params: {
			UserAddressID: UserAddressID
		}
	})
}

/**
 * @description 				获取用户的所有消费过的商家记录
 */
export function getConsumptionList(userid, page = 1, pageSize = 10, sort = 2) {
	return fly.get(
		'scores/mydd',
		{
			userid,
			sort,
			page,
			pageSize
		}
	)
}