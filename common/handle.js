/* @file handle.js 
 * @description 各种辅助方法的集合
 * @author 张谦
 * @data 2019-6-18
 * @Version V0.0.1
 * @email 602894154@qq.com
 * */

// 需要用到请求
import $http from '../api'

/* 
 * @desciption 验证手机号码是否有效
 * @params string phone 电话号码
 * @params object obj vue实例对象
 * @params Boolean status[false] 电话号码不足11位时，验证失败是否需要提示
 * @return Boolean 是否有效
 * 
 * */
export function validatePhone(phone, obj) {
	let res = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9})|\d{7,8})$/;
	return res.test(phone)

	//    if (phone.length === 11) {
	//        if ((/^1[3456789]\d{9}$/.test(phone))) {
	//            return true
	//        } else {
	//            obj.$api.msg('您输入的电话号码无效')
	//            return false
	//        }
	//    }
}

/* 
 * @desc 生成验证码
 * @params num length 验证码的长度
 * @return string 验证码
 * 
 */
export function genarateCode(length = 6) {
	let code = ''
	for (let i = 0; i < length; i++) {
		let tmp = Math.floor(Math.random() * 9)
		code += tmp
	}
	return code
}

/* 
 * @desc 发送验证码
 * @params string phone 电话号码
 * @params string code 验证码
 * @params object obj vue实例
 * @return Boolean 发送是否完成
 * 
 */
export function sendCode(phone, code, obj) {
	uni.request({
		url: 'https://newsapp.huaxuapp.com/api/sms/send',
		data: {
			mobile: phone,
			content: code
		},
		success: function(res) {
			obj.$api.msg('发送验证码成功')
			return true
		},
		fail: function(res) {
			obj.$api.msg('发送验证码失败')
			console.log('发送验证码失败', res)
			return false
		}
	})
}

/* 
 * @desc 验证两次输入的密码是否一样
 * @params string pass 密码
 * @params string confirmPass 确认密码
 * @return Boolean 验证是否一样的结果
 */
export function validatePass(pass, confirmPass) {
	if (pass !== '' && pass.length === confirmPass.length) {
		if (pass.trim() === confirmPass.trim()) {
			return true
		} else {
			return false
		}
	}
}

/**
 * 曲一鸣
 *  微信分享
 * shareData ------ 分享需要的一些数据
 shareData= {
	scene:******类型，是朋友圈还是聊天
	title：******标题
	imageUrl：******图片链接
	href：******跳转链接
 }
 * 
 * **/

export function share(shareData,type=0) {
	uni.getProvider({ //取出用户信息
		service: 'share'
	}).then(data => {
		var [err, res] = data
		var shareWhat
		if (res.errMsg === 'getProvider:ok') {
			res.provider.forEach(it => { //判断是否支持微信分享
				if (it === 'weixin') {
					shareWhat = 'weixin'
				}
			})
		}
		return shareWhat //
	}).then(res => {
		var self = this
		showLoading_()
		return new Promise((resolve, rej) => { //便于链式调用
			uni.share({
				type:type,
				provider: res,
				scene: shareData.scene,
				//分享的类型 WXSceneSession 分享到聊天界面 WXSenceTimeline  分享到朋友圈 WXSceneFavorite 分享到微信收藏
				title: shareData.title, //标题
				imageUrl: shareData.imageUrl, //图片链接
				href: shareData.href,
				success: function(res) {
					resolve.call(self, res)
				},
				fail: function(err) {
					rej.call(self, err)
				}
			})
		}).then(res => {
			hidLoading_()
		}, err => {
			uni.showToast({
				title: '分享失败，请检查是否安装微信',
				duration: 2000,
				icon: 'none'
			})
		})

	})
}



/*
获取二维码图片连接
https://cli.im/api?text=1&mhid=5BPFCFu/z5khMHcoItxRP6g
text:二维码内容
mhid:样式ID(常规样式：sUPPDArtzMohMHcoItxRP6M；分享样式：skfECQjvms0hMHcoItxQMaw)
 */

export function getEwm(text, mhid) {
	var self = this;
	return new Promise((resolve, rej) => {
		var getData
		uni.request({
			url: "https://cli.im/api/qrcode/code",
			method: "GET",
			data: {
				text: text,
				mhid: mhid
			},
			success: (res) => {
				getData = res.data;
				getData = getData.substring(getData.indexOf('img src="') + 'img src="'.length,
					getData.indexOf(
						'" id="qrcode_plugins_img"'));
				resolve.call(self, getData);
			}
		});
	})
}

/*
	格式化金额
 */
export function formatAmount(num) {
	let numStrAry = (num + '').split('')
	let flag = numStrAry.includes('.')
	if (flag) {
		let index = numStrAry.indexOf('.')
		let one = numStrAry[index + 1]
		let two = numStrAry[index + 2]
		if (!two) {
			two = '0'
		}
		let nums = ''
		for (let it of numStrAry) {
			if (it != '.') {
				nums = nums + it
			} else {
				break
			}
		}
		return (nums + '.' + one + two)
	}
	return num + '' + '.00'
}

/*
乘法
*/
export function accMul(arg1, arg2) {
	let ml = 0
	let s1 = arg1.toString();
	let s2 = arg2.toString();
	try {
		ml += s1.split('.')[1].length
	} catch (e) {}
	try {
		ml += s2.split('.')[1].length
	} catch (e) {}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, ml)
}


export function accSub(arg1, arg2) {
	let r1, r2, ml, nl
	try {
		r1 = arg1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	ml = Math.pow(10, Math.max(r1, r2))
	nl = (r1 >= r2) ? r1 : r2
	return (((arg1 * ml - arg2 * ml) / ml).toFixed(nl)) * 1
}


export function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}




/*
加载遮罩
*/
export function showLoading_(obj) {
	// #ifdef MP-ALIPAY
	obj = obj || {
		title: '正在加载中'
	}
	// #endif
	// #ifdef APP-PLUS 
	obj = obj || {
		title: '正在加载中',
		mask: false
	}
	// #endif
	// #ifdef MP-WEIXIN
	obj = obj || {
		title: '正在加载中',
		mask: false
	}
	// #endif
	// #ifdef H5
	obj = obj || {
		title: '正在加载中',
		mask: false
	}
	// #endif
	return new Promise((resolve, rej) => {
		uni.showLoading(obj).then(data => {
			var [err, res] = data
			if (res.errMsg === 'showLoading:ok') {
				resolve(true)
			} else {
				rej(new Error(err))
			}
		})
	})
};
/*
关闭遮罩
*/
export function hidLoading_() {
	uni.hideLoading()
}


/*
  身份证验证
 */
export function isShenFenZheng(value, self) {
	var idcardReg =
		/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	var flag = idcardReg.test(value)
	if (!flag) {
		self.$api.msg('您输入的身份证有误，请重新输入', 2000)
		return flag
	} else {
		return flag
	}
}

export function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

// 微信签名算法
export function wxSign(totalFree, body) {
	let appid = 'wx109073a3df54e05b'
	let mch_id = '1515163721'
	let nonce_str = randomString(32)
	let out_trade_no = randomString(32)
	let spbill_create_ip = '1.81.191.6'
	let notify_url = 'https://newsapp.huaxuapp.com'
	let trade_type = 'APP'
	let tmp =
		`appid=${appid}&body=${body}&mch_id=${mch_id}&nonce_str=${nonce_str}&notify_url=${notify_url}&totalFree=${totalFree}&trade_type=${trade_type}&key=ssdfsddifji293902jfwk9f3ujfs92u3`
}

/*
刷新用户
*/
import {
	qymState
} from '../store/qym/qymStore.js'
import {
	HttpRequest
} from './httpRequest.js'
export const refreshUserInfo = (userid, self) => {
	return HttpRequest.get(qymState.myinfoUrl, {
		userid
	}, false).then(res => {
		if (res.IsSuccess) {
			self.$store.commit('refresh', res.User)
			return res.User
		}
	})
}

/*
模态封装


*/
export function showModal(obj) {
	obj = obj || {
		title: '您确定要离开嘛？',
		content: '退出当前页面内容不会被保存'
	}
	return uni.showModal(obj).then(data => {
		console.log({
			data
		})
		var [err, res] = data
		if (res.errMsg === 'showModal:ok') {
			if (res.confirm) {
				return true
			} else if (res.cancel) {
				return false
			}
		} else {
			// rej(err)
		}
	})

}


function changeAddress_(Address) {
	return Address.split(';')[1] || Address
}

export const changeAddress = {
	install: function(Vue) {
		Vue.prototype.changeAddress = function(Address) {
			return changeAddress_(Address)
		}
	}
}






/*********辅助函数***************/
const dateFormatter = (nows) => {
	if (!nows) return ''
	var now = new Date(nows)
	var year = now.getFullYear()

	var month = now.getMonth() + 1
	month = checkAddZone(month)

	var date = now.getDate()
	date = checkAddZone(date)
	return year + '-' + month + '-' + date
}

function checkAddZone(num) {
	return num < 10 ? '0' + num.toString() : num
}

function dateTimeFormatter(t) {
	if (!t) return ''
	t = new Date(t).getTime()
	t = new Date(t)
	var year = t.getFullYear()
	var month = (t.getMonth() + 1)
	month = checkAddZone(month)

	var date = t.getDate()
	date = checkAddZone(date)

	var hour = t.getHours()
	hour = checkAddZone(hour)

	var min = t.getMinutes()
	min = checkAddZone(min)

	var se = t.getSeconds()
	se = checkAddZone(se)

	return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + se
}
/******************/


//时间转换成年月日时
function beTime_(time) {
	let date = (time.split('(')[1].split(")")[0]) * 1
	return dateTimeFormatter(date)
}

export const beTime = {
	install: function(Vue) {
		Vue.prototype.beTime = function(time) {
			//时间转换成年月日时
			return beTime_(time)
		}
	}
}
//时间转换成年月日
function beTime_1(time) {
	let date = (time.split('(')[1].split(")")[0]) * 1
	return dateFormatter(date)
}

export const beTime1 = {
	install: function(Vue) {
		Vue.prototype.beTime_ = function(time) {
			//时间转换成年月日
			return beTime_1(time)
		}
	}
}




/****************电话号码打马赛克*******************/
function phoneMosaic_(phone) {
	phone = phone + ''
	let phoneAry = phone.split('')
	phone = ''
	phoneAry.forEach((it, i) => {
		if (i <= 2 || i >= 7) {
			phone = phone + it
		} else {
			phone = phone + '*'
		}
	})
	return phone
}
export const phoneMosaic = {
	install: function(Vue) {
		Vue.prototype.phoneMosaic = function(phone) {
			//时间转换成年月日
			return phoneMosaic_(phone)
		}
	}
}

/*************************************************/















/*
压缩图片（app/微信小程序端）
src：图片路径
*/

export function zipImage(src) {
	// #ifdef APP-PLUS
	let index = src.lastIndexOf(".")
	let img_yuanshi = src.substring(0, index)
	let d2 = new Date().getTime();
	let img_type = src.substring(index + 1, src.length);
	return new Promise((resolve, rej) => {
		plus.zip.compressImage({
			src,
			dst: img_yuanshi + d2 + '.' + img_type,
			quality: 30,
		}, res => {
			resolve(res.target)
		}, err => {
			console.log(err);
			rej(err)
		});
	})
	// #endif
	// #ifdef MP-WEIXIN
	return new Promise((resolve, rej) => {
		uni.compressImage({
			src,
			success: (res) => {
				console.log(res, 1)
				let path = res.tempFilePath
				resolve(path)
				// this.imgList.push(path)
				// this.imgList.push
			},
			fail: (e) => {
				uni.showToast({
					title: '上传失败，请重新上传',
					duration: 2000
				})
			},
			complete: (val) => {
				console.log(val, 3)
			}
		})
	})
	// #endif
	// #ifdef H5
	return Promise.resolve(src)
	// #endif

}

// #ifdef MP-WEIXIN || H5
/**
 * @description 微信小程序获取 openid ，同时获取的还有 session_key , 如果 unionid 存在的话，还拿到了 unionid
 */
export function getWxAppletsOpenid() {
	return new Promise((resovle, reject) => {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				$http.getOpenid(res.code).
				then(res => {
						try {
							let d = JSON.parse(res.Data)
							resovle({
								status: true,
								data: d,
								Msg: '获取 openid 成功'
							})
						} catch (e) {
							console.log('解析 openid 失败', e)
							reject({
								status: false,
								Msg: '解析 openid 失败',
								err: e
							})
						}
					})
					.catch(err => {
						console.log('获取 openid 失败', err)
						reject({
							status: false,
							Msg: '获取 openid 失败',
							err: err
						})
					})
			},
			fail: (err) => {
				console.log('获取 openid 时，获取 js_code 失败', err)
				reject({
					status: false,
					Msg: '获取 openid 时，获取 js_code 失败',
					err: err
				})
			}
		})
	})
}

/**
 * @description 微信小程序付款
 * 
 * @param {number} total_amount 订单金额
 * @param {string} description  订单描述
 * @param {string} out_trade_no 订单号，不传则使用当前时间戳
 * 
 * @return {Promise} 支付结果
 */
export function wxAppletsPay(total_amount, description, out_trade_no, storeid = 0, yyyid = 0, ccouponsid = 0, dkmoney = 0, price = 0, sjprice = 0) {
	console.log('支付参数 handle.js：', arguments);
	console.log("total_amount: " + total_amount);
	console.log("price: " + price);
	if ( !description.includes('代理')) {
		if ( (total_amount == price && ccouponsid != 0) || price == '0.00') {
			// uni.showModal({
			// 	title: '支付出错',
			// 	content: '请检查您的付款金额和优惠券，确认无误后再试',
			// 	showCancel: false
			// })
			// return
			return Promise.reject({status: false, Msg: '请检查您的付款金额和优惠券，确认无误后再试'})
		}
	}
	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})
	// 处理订单编号，未传参时使用当前时间戳
	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}
	// 获取 openid
	return new Promise((resovle, reject) => {
		getWxAppletsOpenid()
			.then(res => {
				$http.getWxAppletOrderInfo(total_amount, description, res.data.openid, out_trade_no, storeid, yyyid, ccouponsid, dkmoney, price, sjprice)
					.then(res => {
						let data
						try {
							data = JSON.parse(res.OrderInfo)
							data.timeStamp = data.timeStamp.toString()
							uni.hideLoading()
						} catch (e) {
							console.log('解析订单失败：', e);
							reject({
								status: false,
								msg: '解析订单失败',
								err: e
							})
						}
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: res.OrderInfo,
							...data,
							success: async (res) => {
								resovle({
									status: true,
									msg: '支付成功',
									data: res
								})
							},
							fail: async (err) => {
								if (err.errMsg.includes('cancel')) {
									uni.showModal({
										title: '支付失败',
										content: '用户取消支付',
										showCancel: false
									})
								} else {
									reject({
										status: false,
										msg: '支付失败',
										err: err
									})
								}
							}
						})
					})
					.catch(err => {
						reject({
							status: false,
							msg: '创建订单失败',
							err: err
						})
					})
			})
			.catch(err => {
				reject({
					status: false,
					msg: '获取 openid 失败',
					err: err
				})
			})
	})
}

/**
 * @description 					国际小姐报名
 * 
 * @param {Object} userid
 * @param {Object} Name
 * @param {Object} Birth
 * @param {Object} Phone
 * @param {Object} BigHeadPhoto
 */
export async function registrationPayment(userid, Name, Birth, Phone, BigHeadPhoto, Area) {
	let out_trade_no = (new Date()).getTime(),
		price = 99,
		total_amount = 100 * price,
		body = '国际小姐报名费',
		openid = ''
		
	let {Msg, data} = await getWxAppletsOpenid()
	if (Msg.includes('成功')) {
		openid =  data.openid
	}
	
	return new Promise( (resolve, reject) => {
		$http.ofThe(out_trade_no, total_amount, body, openid, userid, price, Name, Birth, Phone, BigHeadPhoto, Area)
			.then(res => {
				let d
				try{
					d = JSON.parse(res.OrderInfo)
					d.timeStamp = d.timeStamp.toString()
				}catch(err){
					//TODO handle the exception
					console.log(err, '报名支付订单解析出错');
					uni.showToast({
						title: '支付订单解析出错~',
						icon: 'none'
					})
				}
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: res.OrderInfo,
					...d,
					success: res => {
						console.log(res, '报名支付成功');
						resolve({msg: '支付成功'})
					},
					fail: err => {
						console.log(err, '报名支付出错');
						if (err.errMsg.includes('cancel')) {
							uni.showModal({
								content: '取消支付',
								showCancel: false
							})
						} else {
							uni.showToast({
								title: '支付出现问题~',
								icon: 'none'
							})
						}
					}
				})
			})
			.catch(err => {
				console.log(err, '唤起报名支付出错');
				uni.showToast({
					title: '支付出现问题~',
					icon: 'none'
				})
			})
	})
}

export function wxAppletsRechargePay(out_trade_no, total_amount, body, userid, storeid, sjprice) {
	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})
	// 处理订单编号，未传参时使用当前时间戳
	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}
	// 获取 openid
	return new Promise((resovle, reject) => {
		getWxAppletsOpenid()
			.then(res => {
				$http.getWxAppletRechargeOrderInfo(out_trade_no, total_amount, body, userid, storeid, sjprice)
					.then(res => {
						let data
						try {
							data = JSON.parse(res.OrderInfo)
							data.timeStamp = data.timeStamp.toString()
							uni.hideLoading()
						} catch (e) {
							console.log('解析订单失败：', e);
							reject({
								status: false,
								msg: '解析订单失败',
								err: e
							})
						}
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: res.OrderInfo,
							...data,
							success: async (res) => {
								resovle({
									status: true,
									msg: '支付成功',
									data: res
								})
							},
							fail: async (err) => {
								if (err.errMsg.includes('cancel')) {
									uni.showModal({
										title: '支付失败',
										content: '用户取消支付',
										showCancel: false
									})
								} else {
									reject({
										status: false,
										msg: '支付失败',
										err: err
									})
								}
							}
						})
					})
					.catch(err => {
						reject({
							status: false,
							msg: '创建订单失败',
							err: err
						})
					})
			})
			.catch(err => {
				reject({
					status: false,
					msg: '获取 openid 失败',
					err: err
				})
			})
	})
}

export function wxAppletsDDPay(out_trade_no, total_amount, body, userid, SelfAddressID, ShopContent, info) {
	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})
	// 处理订单编号，未传参时使用当前时间戳
	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}
	// 获取 openid
	return new Promise((resovle, reject) => {
		getWxAppletsOpenid()
			.then(res => {
				$http.getWxAppletDDOrderInfo(out_trade_no, total_amount, body, userid, SelfAddressID, ShopContent, info)
					.then(res => {
						let data
						try {
							data = JSON.parse(res.OrderInfo)
							data.timeStamp = data.timeStamp.toString()
							uni.hideLoading()
						} catch (e) {
							console.log('解析订单失败：', e);
							reject({
								status: false,
								msg: '解析订单失败',
								err: e
							})
						}
						console.log('所有参数', arguments);
						console.log('订单信息', res.OrderInfo);
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: res.OrderInfo,
							...data,
							success: async (res) => {
								resovle({
									status: true,
									msg: '支付成功',
									data: res
								})
							},
							fail: async (err) => {
								if (err.errMsg.includes('cancel')) {
									uni.showModal({
										title: '支付失败',
										content: '用户取消支付',
										showCancel: false
									})
								} else {
									reject({
										status: false,
										msg: '支付失败',
										err: err
									})
								}
							}
						})
					})
					.catch(err => {
						reject({
							status: false,
							msg: '创建订单失败',
							err: err
						})
					})
			})
			.catch(err => {
				reject({
					status: false,
					msg: '获取 openid 失败',
					err: err
				})
			})
	})
}

/**
 * @@description 						特殊商品的支付
 * 
 * @param {Object} out_trade_no
 * @param {Object} total_amount
 * @param {Object} body
 * @param {Object} userid
 * @param {Object} SelfAddressID
 * @param {Object} ShopContent
 */
export function wxAppletsSpecialOrderPay(out_trade_no, total_amount, body, userid, SelfAddressID, ShopContent) {
	console.log('支付的参数列表', arguments);
	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})
	// 处理订单编号，未传参时使用当前时间戳
	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}
	// 获取 openid
	return new Promise((resovle, reject) => {
		getWxAppletsOpenid()
			.then(res => {
				$http.getWxAppletSpecialOrderInfo(out_trade_no, total_amount, body, userid, SelfAddressID, ShopContent)
					.then(res => {
						let data
						try {
							data = JSON.parse(res.OrderInfo)
							data.timeStamp = data.timeStamp.toString()
							uni.hideLoading()
						} catch (e) {
							console.log('解析订单失败：', e);
							reject({
								status: false,
								msg: '解析订单失败',
								err: e
							})
						}
						console.log('所有参数', arguments);
						console.log('订单信息', res.OrderInfo);
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: res.OrderInfo,
							...data,
							success: async (res) => {
								resovle({
									status: true,
									msg: '支付成功',
									data: res
								})
							},
							fail: async (err) => {
								if (err.errMsg.includes('cancel')) {
									uni.showModal({
										title: '支付失败',
										content: '用户取消支付',
										showCancel: false
									})
								} else {
									reject({
										status: false,
										msg: '支付失败',
										err: err
									})
								}
							}
						})
					})
					.catch(err => {
						reject({
							status: false,
							msg: '创建订单失败',
							err: err
						})
					})
			})
			.catch(err => {
				reject({
					status: false,
					msg: '获取 openid 失败',
					err: err
				})
			})
	})
}
// #endif

// #ifdef MP-ALIPAY
/**
 * @description 支付宝小程序获取用户的 userid，该参数支付的时候需要用到
 */
export function getAlipayAppletsUserid() {
	return new Promise((resolve, reject) => {
		my.getAuthCode({
			scopes: 'auth_user',
			success: res => {
				$http.getAliUserInfo(res.authCode)
					.then(res => {
						resolve({
							status: true,
							data: JSON.parse(res.Data).alipay_system_oauth_token_response,
							msg: '获取用户 userid 成功'
						})
					})
					.catch(err => {
						reject({
							status: false,
							err: err,
							msg: '获取用户 userid 失败'
						})
					})
			},
			fail: err => {
				reject({
					status: false,
					err: err,
					msg: '获取用户授权信息失败'
				})
			}
		})
	})
}

/**
 * @description 支付宝小程序支付
 * 
 * @param {number} total_amount     订单金额
 * @param {string} description      订单描述
 * @param {string} userid           发起支付的商户内部用户编号
 * @param {string} out_trade_no     订单编号，不传则默认为当前时间戳
 * 
 * @return {Promise} 支付结果
 */
export function alipayAppletsPay(total_amount, description, userid, out_trade_no, storeid = 0, yyyid = 0, ccouponsid = 0, dkmoney = 0, price = 0) {
	console.log('支付参数 handle.js：', arguments);
	if ( total_amount == price && ccouponsid != 0) {
		uni.showModal({
			title: '支付出错',
			content: '请检查您的付款金额和优惠券，确认无误后再试',
			showCancel: false
		})
		return
	}
	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})
	// 处理订单编号，未传参时使用当前时间戳
	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}

	return new Promise((resolve, reject) => {
		getAlipayAppletsUserid()
			.then(res => {
				$http.getAlipayAppletOrderInfo(out_trade_no, total_amount, description, userid, res.data.user_id, storeid, yyyid, ccouponsid, dkmoney, price)
					.then(res => {
						uni.hideLoading()
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.TradeNo,
							success: res => {
								if (res.resultCode.includes('6001')) {
									uni.showModal({
										title: '支付失败',
										content: '用户取消支付',
										showCancel: false
									})
								} else {
									resolve({
										status: true,
										msg: '支付成功',
										data: res
									})
								}
							},
							fail: err => {
								reject({
									status: false,
									msg: '支付失败',
									err: err
								})
							}
						})
					})
					.catch(err => {
						reject({
							status: false,
							msg: '获取订单信息出错',
							err: err
						})
					})
			})
			.catch(err => {
				reject({
					status: false,
					err: err,
					msg: '获取 userid 出错'
				})
			})
	})

}
// #endif

// #ifdef APP-PLUS || H5
/**
 * @description 微信和支付宝的 APP 支付
 * 
 * @param {number} total_amount     订单金额
 * @param {string}  body            订单描述信息，支付宝独有的订单简介信息和此信息相同
 * @param {string}  userid          支付商户内部的用户编号
 * @param {string}  paymentWay      支付方式，可选值为 微信 和 支付宝，默认为 微信
 * @param {string}  out_trade_no    订单编号，不传参数则默认为当前时间戳
 * 
 * @return {Promise} 支付结果
 */
export function appPayment(total_amount, body, userid, paymentWay = '微信', out_trade_no, storeid = 0, yyyid = 0, ccouponsid = 0, dkmoney = 0, price = 0, sjprice = 0) {

	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})

	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}

	return new Promise((resolve, reject) => {
		$http.getAppOrderInfo(total_amount, body, userid, out_trade_no, paymentWay, storeid, yyyid, ccouponsid, dkmoney, price, sjprice)
			.then(res => {
				uni.hideLoading()
				let provider
				if (paymentWay === '微信') {
					provider = 'wxpay'
				} else {
					provider = 'alipay'
				}

				uni.requestPayment({
					provider: provider,
					orderInfo: res.OrderInfo,
					success: res => {
						resolve({
							status: true,
							data: res,
							msg: '支付成功'
						})
					},
					fail: err => {
						if (err.errMsg.includes('canceled') || err.errMsg.includes('取消')) {
							uni.showModal({
								title: '支付失败',
								content: '用户取消支付',
								showCancel: false
							})
						} else {
							reject({
								status: false,
								err: err,
								msg: '支付失败'
							})
						}
					}
				})

			})
			.catch(err => {
				reject({
					status: false,
					err: err,
					msg: '获取订单信息失败'
				})
			})
	})
}

export function appRechargePayment(userid, out_trade_no, total_amount, body, storeid, sjprice, paymentWay = '微信') {

	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})

	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}

	return new Promise((resolve, reject) => {
		$http.getAppRechargeOrderInfo(userid, out_trade_no, total_amount, body, storeid, sjprice, paymentWay)
			.then(res => {
				uni.hideLoading()
				let provider
				if (paymentWay === '微信') {
					provider = 'wxpay'
				} else {
					provider = 'alipay'
				}

				uni.requestPayment({
					provider: provider,
					orderInfo: res.OrderInfo,
					success: res => {
						resolve({
							status: true,
							data: res,
							msg: '支付成功'
						})
					},
					fail: err => {
						console.log(err);
						if (err.errMsg.includes('canceled') || err.errMsg.includes('取消')) {
							uni.showModal({
								title: '支付失败',
								content: '用户取消支付',
								showCancel: false
							})
						} else {
							reject({
								status: false,
								err: err,
								msg: '支付失败'
							})
						}
					}
				})
			})
			.catch(err => {
				reject({
					status: false,
					err: err,
					msg: '获取订单信息失败'
				})
			})
	})
}

/**
 * 
 */
export function appDDPay(userid, out_trade_no, total_amount, body, storeid, UserAddressID, ShopContent, SalePrice, DDSort) {

	uni.showLoading({
		title: '加载中',
		// #ifndef MP-ALIPAY
		mask: true
		// #endif
	})

	if (!out_trade_no) {
		out_trade_no = (new Date()).getTime()
	}

	return new Promise((resolve, reject) => {
		$http.getDDOrder(userid, out_trade_no, total_amount, body, storeid, UserAddressID, ShopContent, SalePrice, DDSort)
			.then(res => {
				uni.hideLoading()

				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: res.OrderInfo,
					success: res => {
						resolve({
							status: true,
							data: res,
							msg: '支付成功'
						})
					},
					fail: err => {
						if (err.errMsg.includes('canceled') || err.errMsg.includes('取消')) {
							uni.showModal({
								title: '支付失败',
								content: '用户取消支付',
								showCancel: false
							})
						} else {
							reject({
								status: false,
								err: err,
								msg: '支付失败'
							})
						}
					}
				})

			})
			.catch(err => {
				reject({
					status: false,
					err: err,
					msg: '获取订单信息失败'
				})
			})
	})
}
// #endif

/**
 * @description 解码微信的加密信息，获取用户 unionid 和电话号码
 * 
 * @param {object} encrypted 加密数据
 * 
 * @return {Promise} 解密结果
 */
// #ifdef MP-WEIXIN
let WXBizDataCrypt = require('common/WXBizDataCrypt.js')
const appletsAppid = 'wx23eb62a318e72148'
export function decrypt(encrypted) {
	if (encrypted.hasOwnProperty('detail')) {
		encrypted = encrypted.detail
	}
	let {
		encryptedData,
		iv,
		errMsg
	} = encrypted
	if (errMsg.includes('deny')) {
		uni.showModal({
			title: '获取权限失败',
			content: '用户拒绝授权',
			showCancel: false
		})
		return Promise.reject({
			status: false,
			msg: '用户拒绝授权',
			err: errMsg
		})
	}
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
			// #ifndef MP-ALIPAY
			mask: true
			// #endif
		})
		getWxAppletsOpenid()
			.then(res => {
				let handle = new WXBizDataCrypt(appletsAppid, res.data.session_key)
				let data = handle.decryptData(encryptedData, iv)
				uni.hideLoading()
				resolve({
					status: true,
					msg: '解码成功',
					data: data
				})
			})
			.catch(err => {
				uni.hideLoading()
				reject({
					status: false,
					msg: '解码失败',
					err: err
				})
			})
	})
}
// #endif

/**
 * @description 格式化时间
 * 
 * @param {Object} nS	时间戳
 */
function _getLocalTime(nS = '') {
	let date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours()
	let minutes = date.getMinutes()
	let seconds = date.getSeconds()
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? '0' + hour : hour
	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds
	date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
	return date;
}

export const getLocalTime = {
	install: function(Vue) {
		Vue.prototype.getLocalTime = function(nS) {
			return _getLocalTime(nS)
		}
	}
}