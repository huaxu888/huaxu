/*必要的引入*/
import Vue from 'vue'
import App from './App'
import './api'
import { mapState } from 'vuex'

Vue.config.devtools = true;

/*全局的导航栏组件*/
import cuCustom from './colorui/components/cu-custom.vue'
import loadIng from './components/loading.vue'
import tkiQrcode  from './components/tki-qrcode/tki-qrcode.vue'
Vue.component('cu-custom', cuCustom)
Vue.component('load-ing',loadIng)
Vue.component('tki-qrcode',tkiQrcode)

/*vuex*/
import store from'./store/store.js'
Vue.prototype.$store=store

/*发送请求*/
import {HttpRequest} from './common/httpRequest'
import {HttpRequest_} from './common/httpRequest'
Vue.prototype.$Request_ = HttpRequest_//发送请求
Vue.prototype.$Request = HttpRequest//发送请求
Vue.prototype.$Sysconf = HttpRequest.config//同步config方法

/*基础路径*/
import {updateurl} from './common/base.js'

/**
 *  通用弹窗信息
 */
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	return uni.showToast({
		title,
		duration,
		mask,
		icon
	}).then(res=>{
		let [err,val] = res
		return val
	})
}
const changPath = (localPath)=>{
	return plus.io.convertAbsoluteFileSystem(localPath)
}

import {share,getEwm} from './common/handle.js';//分享的公共方法，获取二维码
import {formatAmount} from './common/handle.js';//格式化金额的方法
import {accMul} from './common/handle.js';//乘法
import {accSub} from './common/handle.js';//减法
import {accAdd} from './common/handle.js';//减法
import {openMap} from './common/openMap.js';//打开地图的公共方法
import  {showLoading_} from './common/handle.js'//遮罩加载
import {hidLoading_} from './common/handle.js'//关闭遮罩
import {isShenFenZheng} from './common/handle.js' //验证身份证
import {refreshUserInfo} from './common/handle.js'//刷新用户信息
import {showModal} from'./common/handle.js'//模态窗
import {changeAddress,beTime, getLocalTime,beTime1,phoneMosaic} from './common/handle.js'//优化修改地址,转换时间戳
Vue.use(changeAddress)
Vue.use(beTime)
Vue.use(beTime1)
Vue.use(getLocalTime)
Vue.use(phoneMosaic)
import {zipImage} from './common/handle.js'//app端压缩图片大小
Vue.prototype.$api = {beTime, accAdd,accSub, accMul,formatAmount,msg,getEwm,share,openMap,showLoading_,hidLoading_,isShenFenZheng,refreshUserInfo,showModal,changPath,zipImage};//公共方法

Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
}

Vue.config.productionTip = false
App.mpType = 'app'

Vue.mixin({
	computed:{
		...mapState({
			yyyState: state => state.YyyState,
			userInfo_ : state => state.userInfo,
			site_:state => state.site
		})
	}
})

const app = new Vue({
    ...App
})
app.$mount()

