import Vue from 'vue';
import Vuex from 'vuex';
import {qymState,qymMutations} from './qym/qymStore'
import {shoppingCart, shoppingCartMutations} from './Takeaway/takeaway.js'
import {setting, settingMutations} from './Takeaway/setting.js'
	
	

Vue.use(Vuex);
export default new Vuex.Store({
	state:{ 
		...shoppingCart,
		...qymState,
		hasLogin: false,//是否登录
		cacheSize: 0,
        entryKey: 'wkbdyQt3RalomySd',
		timer: '',
		userInfo: uni.getStorageSync('userInfo'),//用户信息
		latitude:0,//纬度
		longitude:0,//经度
		PageCur: 'home',
		lazyLoadImgUrl:'https://img.huaxuapp.com/花蓄logo(2).png',
		QDList:[],//抢单的list
		QDindex:0,//抢单指针
		HBlist:[],
		orderList:[], //订单的数组
		currentDetails:{}, //进入详情页面存储的详情对象
		orderObj:0, //订单的金额
		reservationObj:{},
		HBindex:0,
		imageUrl:'https://img.huaxuapp.com/小程序.jpg',//小程序分享时的图片
        isScan: false,
		sumMoney:0,            //订单的总金额，优化性能改用传参
		tagsum:0,            //订单的总个数，优化性能改用传参
        // #ifdef MP-ALIPAY
        qrQuery: '',
        // #endif
        // #ifdef MP-WEIXIN
        tjrid: 0,
        // #endif
		showGL: true,
		...setting,
		toPoint: {}
	},
	mutations: {
		...shoppingCartMutations,
		...qymMutations,
		...settingMutations,
		login(state, provider) {//登录
			//console.log(provider);
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		refresh(state, provider) {//刷新
            state.hasLogin = true
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {//退出登录
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setCache(state, size) {
			state.cacheSize = size
			uni.setStorage({
				key: 'cache',
				data: {
					size: size
				}
			})
		},
		setTimer(state, timer) {
			state.timer = timer
		},
		setStatus(state,status){
			state.PageCur=status
		},
		setSubNVue(state,setSubNVue){
			state.setSubNVue=setSubNVue
		},
		setQDList(state,QDList){
			state.QDList=QDList
		},
		setQDindex(state,QDindex){
			state.QDindex=QDindex
		},
		setHBList(state,HBList){
			state.HBList=HBList
		},
		setHBindex(state,HBindex){
			state.HBindex=HBindex
		},
		setScan(state, isScan){
            state.isScan = isScan
        },
		setCurrentDetails(state, currentDetails){
		    state.currentDetails = currentDetails
		},
		setLocation(state, location){
			state.longitude = location.longitude
			state.latitude = location.latitude
		},
		setOrderList(state, orderList){
			let has = false
			has = state.orderList.some (item => {
				if (item.storeId == orderList.storeId) {
					item = orderList
					return true
				}
			})
		    if(!has) {
				state.orderList.push(orderList) 
			}
		},
		clearOrderList(state) {
			state.orderList = []
		},
		setOrderObj(state, orderObj){
		    state.orderObj = orderObj
		},
		setToPoint(state, point) {
			state.toPoint = point
		},
		clearPoint(state) {
			state.toPoint = {}
		},
		setReservationObj(state, reservationObj){
		    state.reservationObj = reservationObj
		},
		setShowGL(state, showGL) {
			state.showGL = showGL
		},
		setSumMoney(state, sumMoney) {
			state.sumMoney = sumMoney
		},
		setTagsum(state, tagsum) {
			state.tagsum = tagsum   
		},
        // #ifdef MP-ALIPAY
        setQrQuery(state, qrQuery) {
            state.qrQuery = qrQuery
        },
        // #endif
        // #ifdef MP-WEIXIN
        setTjrid(state, tjrid) {
            state.tjrid = tjrid
        }
        // #endif
	},
	actions: {
	
	}
})