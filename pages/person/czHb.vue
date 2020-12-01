<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">充值</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">充值</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="background-color: #FFFFFF;margin-top: 20upx;text-align: center;padding-top: 30upx;margin-left: 30upx;margin-right: 30upx;border-radius:8upx;padding-bottom: 20upx;">
			<view >
				<text style="font-size: 28upx;" @click="showTips">余额(元)</text><text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;" @click="showTips"></text>
			</view>
			<view style="margin-top: 30upx;">
				<text style="font-size: 64upx;font-weight: 600;">{{KeTiXian}}</text>
			</view>
			<view style="height: 40upx;line-height: 40upx;" @tap="czZd()">
				<text style="font-size: 24upx;color: #999999;">账单 <text class="hxIcon-rightArrow" style="font-size: 24upx;"></text></text>
			</view>
		</view>
		
		
		
		<view style="background-color: #FFFFFF;margin: 30upx;padding: 30upx 20upx;border-radius:8upx;margin-top: 20upx;">
			
			<view style="height: 80upx;padding-top: 20upx;background-color: #FFFFFF;width: 300upx;" >
				<view class="flex">
					<view :class="[current==0?'liss':'lis']" @tap="change(0)" ><text style="font-size: 28upx;">在线充值</text></view>
					<view :class="[current==1?'liss':'lis']" @tap="change(1)"><text style="font-size: 28upx;">充值卡充值</text></view>
				</view>
				<view class="flex">
					<view class="flex justify-center" style="flex: 1;margin-right: 60upx;"><view class="xian" :style="{transform:`translateX(${current * 160}rpx)`}"></view></view>
					<view class="flex justify-center" style="flex: 1;"></view>
				</view>
			</view>
			
			<view style="margin-top: 30upx;" v-if="current==0">
				<scroll-view scroll-x="true" class="scroll">
					<view v-for="(czJe,index) in czJe" :key="index" class="" 
					:class="index === selectedAmountIndex ? 'boxs' : 'box'" @tap="changeItem(index)" style="background-image: url(https://img.huaxuapp.com/czkl_03.png);
						background-repeat: no-repeat;background-size: cover;padding: 20upx;">
						<view style="margin-top: 6upx;position: relative;" >
							<text style="font-weight: 600;font-size: 48upx;">{{czJe}}</text>
							<text style="font-size: 24upx;margin-left: 2upx;">元</text>
							<text :class="index === selectedAmountIndex ? 'hxIcon-gou' : ''" style="position: absolute;right: 0;color:#ff5b2e;font-size: 38upx;"></text>
						</view>
						<view class=""  style="margin-top: 26upx;font-size: 24upx;">
							<text>充值{{czJe}}余额到账{{Jine[index]}}</text>
						</view>
					</view>       
				</scroll-view>
			</view>
			
			<view style="margin-top: 30upx;" v-if="current==1">
				<view class="hx-card  bg-white" style="margin-left: 20upx;margin-right: 20upx;">
					<view class="flex" style="margin-top: 70upx;">
						<view>
							<text>卡号:</text>
						</view>
						
						<view class="amount-field margin-left flex " style="width: 510upx;" :class="focus || active ? 'active' : ''">
							<input type="number" v-model="amount"  @focus="f" @blur="b" @input="changeMoney(amount)" class="flex-sub input text-bold text-lg" />
						</view>
					</view>
				
					<view class="flex" style="margin-top: 60upx;">
						<text>密码:</text>
						<view class="amount-field margin-left flex " style="width: 510upx;"  :class="focus_ || active_ ? 'active' : ''">
							<input type="number" v-model="amount_"  @focus="f_" @blur="b_" @input="changeMoney(amount)" class="flex-sub input text-bold text-lg" :password="password" />
							<text :class="password?'hxIcon-yanjing1':'hxIcon-yanjing'" @tap="seeMima"></text>
						</view>
					</view>
					
				</view>
				<view class="cu-modal bottom-modal " :class="inputPassWord?'show':''">
					<view class="cu-dialog">
						<uni-grid @close="hidePassModal" @fullclose="fullclose" />
					</view>
				</view>
			</view>
			
			<!-- #ifdef MP-WEIXIN || H5-->
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 36upx;" v-if="current==0" @tap="rechargeWx">
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 60upx;" @tap="pay" v-if="current==1 && isLogin" >
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-ALIPAY -->
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 36upx;" v-if="current==0"  @tap="alipayAppletsPays">
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 60upx;" @tap="pay" v-if="current==1 && isLogin" >
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef APP-PLUS -->
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 36upx;" v-if="current==0" @tap="APPcz">
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 60upx;" @tap="pay" v-if="current==1 && isLogin" >
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			<!-- #endif -->
			
			<u-popup mode="bottom" v-model="shows" border-radius="40" height="600upx" :mask="true" :safe-area-inset-bottom="true">
				<view class="margin text-bold text-lg"> 
					请选择充值方式
				</view>
				<view>
					<payradio @getRadio="getRadio" :radio='radio' :yue="false"></payradio>
				</view> 
				<view class="sure" @tap="APPczs">确认充值</view> 
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment,
		decrypt,
		wxAppletsJFPay,
		wxAppletsRechargePay,
		alipayAppletsPays,
		alipayPay,
		wxAppletsRechargePays,
		alipayPays
	} from '../../common/handle.js'
	import uniGrid from '../../components/uni-grid/uni-grid.vue'
	import payradio from '@/components/payRadio/payRadio.vue'
	let WXBizDataCrypt = require('common/WXBizDataCrypt.js');
		
	export default {
		data() {
			return {
				czJe:[],
				Jine:[],
				JineId:[],
				selectedAmountIndex: 0,// 当前选中的充值金额序号，默认为 1 , 即 10
				// #ifdef APP-PLUS || H5
				rechargeWayList: ['微信', '支付宝'],// 支付方式 (仅支持 APP 和 H5)
				rechargeWay: 0,// 选中的支付方式，默认为 0 , 即微信支付 (仅支持 APP 和 H5)
				// #endif
				KeTiXian:0,
				XiaoFeiScore:0,
				current: 0,
				isLogin:true,
				showGetUserInfo:true,
				disableBtn:[false,false],
				disabled:false,
				amount: '',
				active: false,
				active_:false,
				focus_:false,
				focus: false,
				isRecharge: true,
				isShow: false,
				inputPassWord: false,
				amount_:'',
				password:true,
				getData:{
					userid:'',
					pwd:'',
					cardno:'',
					cardpwd:''
				},
				js_code:'',
				WXuserInfo:{},
				session_key:'',
				openid:'',
				unionid:'',
				radio: 3,
				shows: false,
			}
		},
		async onShow() {
			await this.getBalance();
		},
		components: {
			uniGrid,
			payradio
		},
		onLoad() {
			
			this.$http.czList().then(res => {
					console.log(res);
					res.forEach(r => {
						this.czJe.push(r.RealMoney)
						this.Jine.push(r.HasMoney)
						this.JineId.push(r.ID)
					})
				})
				.catch(err => {
					console.log(err);
				})
			
		},
		methods: {
			APPcz() {
				this.shows = true
			},
			getRadio(e) {
				console.log(e);
				this.radio = e.radio;
			},
			APPczs() {
				if(this.radio == 3){
					let amount = this.czJe[this.selectedAmountIndex]  * 100,
					out_trade_no = new Date().getTime()
					
					wxAppletsRechargePays(out_trade_no,amount,'余额充值',this.JineId[this.selectedAmountIndex],this.$store.state.userInfo.ID)
						.then(res => {
							uni.showModal({
								title: '充值成功',
								content: `已将${this.Jine[this.selectedAmountIndex]}元充值到您的余额`,
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										uni.navigateBack()
									}
								}
							})
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					let amount = this.czJe[this.selectedAmountIndex],
					out_trade_no = new Date().getTime()
					 
						alipayPays(amount,'余额充值', this.userInfo_.ID,this.JineId[this.selectedAmountIndex])
						.then(res => {
							uni.showModal({
								title: '充值成功',
								content: `已将${this.Jine[this.selectedAmountIndex]}元充值到您的余额`,
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										uni.navigateBack()
									}
								}
							})
						})
						.catch(err => {
							console.log(err);
						})
				}
			},
			async change(index) {
				this.current = index;
			},
			showTips() {
				uni.showToast({
					icon:'none',
				    title: '余额可通过充值或赠送的方式获得，仅可在VIP商家消费使用！',
				    duration: 5000
				});
			},
			czZd(){
				uni.navigateTo({
					url:'./czZd'
				})
			},
			czHb(){
				uni.navigateTo({
					url:'./czHb'
				})
			},
			keTi(){
				uni.navigateTo({
					url:'./balance'
				})
			},
			async getBalance() {
				if (this.userInfo_.ID) {
					let data = await this.$http.getUserBalance(this.userInfo_.ID);
					console.log(data);
					this.KeTiXian = this.$api.formatAmount(data.Data.KeTiXian);
					this.XiaoFeiScore = this.$store.state.userInfo.XiaoFeiScore;
				} else {
					this.KeTiXian = 0
					this.XiaoFeiScore = 0;
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.selectedAmountIndex = 0
			},
			/**
			 * @description 选择充值金额
			 * 
			 * @param {Object} index 选中的充值金额的序号
			 * 
			 */
			changeItem(index) {
			    this.selectedAmountIndex = index
				
			},
			// ======================= 选择充值金额结束 ======================= >>
			
			/**
			 * @description 选择充值方式 (仅支持 APP 和 H5 ）
			 * 
			 * @param {Object} index 选中的支付方式的序号
			 * 
			 */
			// #ifdef APP-PLUS || H5
			selectRechageWay(index) {
			    this.rechargeWay = index
			},
			// #endif
			// ======================= 选择充值方式结束 ========================== >>
			
			/**
			 * @description 发起支付 （仅支持 APP 和 H5 ）
			 */
			// #ifdef APP-PLUS || H5
			recharge() {
					switch (this.rechargeWay){
					    case 0:                             // 微信支付
					        appPayment(this.czJe[this.selectedAmountIndex], '账号充值', this.userInfo_.ID)
					        .then(res => {
								console.log('111')
					            this.$api.msg('充值成功!',2000)
					        })
					        .catch(err => {
								console.log('111')
					            this.$api.msg('充值失败!',2000)
					        })
					        break;
					    case 1:                             // 支付宝支付
					        appPayment(this.amountList[this.selectedAmountIndex], '账号充值', this.userInfo_.ID, '支付宝')
					        .then(res => {
								console.log('充值成功')
					            this.$api.msg('充值成功!',2000)
					        })
					        .catch(err => {
								console.log('111')
					            this.$api.msg('充值失败!',2000)
					        })
					        break;
					    default:
					        break;
					}
			},
			// #endif
			// ========================== 发起支付 （仅支持 APP 和 H5 ）结束 ========== >>
			
			// #ifdef MP-WEIXIN
			async rechargeWx() {
				let amount = this.czJe[this.selectedAmountIndex]  * 100,
				out_trade_no = new Date().getTime()
				//   wxAppletsJFPay(this.czJe[this.selectedAmountIndex], '账号充值')
				//   .then(res => {
									// console.log('111')
				//       this.$api.msg('充值成功!',2000)
				//   })
				//   .catch(err => {
									// console.log('充值失败')
				//       this.$api.msg('充值失败!',2000)
				//   }) 
				// wxAppletsRechargePay(out_trade_no,amount,'余额充值',this.Jine[this.selectedAmountIndex],this.$store.state.userInfo.ID)
				// 	.then(res => {
				// 		uni.showModal({
				// 			title: '充值成功',
				// 			content: `已将${this.Jine[this.selectedAmountIndex]}元充值到您的余额`,
				// 			showCancel: false,
				// 			success: (res) => {
				// 				if (res.confirm) {
				// 					uni.navigateBack()
				// 				}
				// 			}
				// 		})
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	})
				wxAppletsRechargePay(out_trade_no,amount,'余额充值',this.JineId[this.selectedAmountIndex],this.$store.state.userInfo.ID)
					.then(res => {
						uni.showModal({
							title: '充值成功',
							content: `已将${this.Jine[this.selectedAmountIndex]}元充值到您的余额`,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					})
					.catch(err => {
						console.log(err);
					})
			},
			// #endif
			
			// #ifdef MP-ALIPAY
			rechargeAlipays() {
				alipayAppletsPay(this.amountList[this.selectedAmountIndex], '账号充值', this.userInfo_.ID)
				.then(res => {
					console.log('111')
				    this.$api.msg('充值成功!',2000)
				})
				.catch(err => {
					console.log('充值失败')
				    this.$api.msg('充值失败!',2000)
				})
			},
			// #endif
			
			// #ifdef MP-ALIPAY
			alipayAppletsPays() {
				
				let amount = this.czJe[this.selectedAmountIndex],
				out_trade_no = new Date().getTime()
				 
					alipayPay(amount,'余额充值', this.userInfo_.ID,this.JineId[this.selectedAmountIndex])
					.then(res => {
						uni.showModal({
							title: '充值成功',
							content: `已将${this.Jine[this.selectedAmountIndex]}元充值到您的余额`,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					})
					.catch(err => {
						console.log(err);
					})
			    
			},
			// #endif
			
			// #ifdef MP-ALIPAY 
			rechargeAlipay() {
					alipayAppletsPay(this.amountList[this.selectedAmountIndex], '账号充值', this.userInfo_.ID)
					.then(res => {
						console.log('111')
					    this.$api.msg('充值成功!',2000)
					})
					.catch(err => {
						console.log('充值失败')
					    this.$api.msg('充值失败!',2000)
					})
			    
			},
			// #endif
			
			zouWei(){
				uni.navigateTo({
					url:'./tranSfers'
				})
			},
			async wxLogin(){
				console.log(1)
				if(this.$store.state.hasLogin){
					console.log(2)
					 this.isLogin=true
					 console.log(this.$store.state.userInfo)
				}else{
					console.log(3)
					this.isLogin=false
					let [err1,res1] =await uni.login({provider: 'weixin'});
					this.js_code = res1.code;
					let res =  await this.$Request.get(this.$store.state.getopenidUrl,{js_code:this.js_code},false)
					let res_ = JSON.parse(res.Data)
					this.session_key = res_.session_key
					this.openid = res_.openid		
					let [err2,res2] =await uni.getSetting({})		
					let authSetting = res2.authSetting
					if(authSetting['scope.userInfo']){//已授权
						this.showGetUserInfo=false
						console.log(4)
						let [err3,res3] =await uni.getUserInfo({provider: 'weixin'})
						this.WXuserInfo = res3.userInfo
						let iv = res3.iv
						let encryptedData = res3.encryptedData
						let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
						let data = pc.decryptData(encryptedData,iv)
						this.unionid = data.unionId
						console.log(this.unionid)
					}else{//未授权
						
					}
					//authSetting['scope.userInfo']		
				}
			},
			seeMima(){
				if(this.password){
					this.password= false
				}else{
					this.password = true
				}
			},
			changeMoney(e) {
				
			},
			f(res) {
				this.focus = true
			},
			b(res) {
				this.focus = false
			},
			f_(res){
				this.focus_ = true
			},
			b_(res){
				this.focus_ = false
			},
			hidePassModal(res) {
				this.inputPassWord = false
			},
			async fullclose(res) {
				this.getData.userid =  this.$store.state.userInfo.ID
				this.getData.pwd = this.$store.state.userInfo.PwdAnswer
				let pwd = res.pwd
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd)
				if (pwd != '' && IsSuccess) {
					this.getData.cardno = this.amount
					this.getData.cardpwd = this.amount_
					let res = await this.$Request.get(this.$store.state.getCard,this.getData)
					console.log(res)
					this.inputPassWord = false
					if(res.IsSuccess){
						// uni.navigateTo({
						// 	url:`/pages/prestoreDetail/isSuccess?type=card&allMoney=${res.Data}&money=${res.Data}`
						// })
						uni.showModal({
							title: '充值成功',
							content: `已充值${res.Data}元到您的余额`,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					}else{
						this.$api.msg(res.Msg)
					}
				} else{
					this.inputPassWord = false
					console.log(this.$store.state.userInfo,this.getData)
					setTimeout(()=>{
						this.$api.msg('交易密码错误')
					})
				}
				
			},
			async pay(){
				if(this.active_){
					this.inputPassWord = true
				}
				// this.getData.userid =  this.$store.state.userInfo.ID
				// this.getData.cardno = this.amount
				// this.getData.cardpwd = this.amount_
				// let res = await this.$Request.get(this.$store.state.getCard,this.getData)
				// this.inputPassWord = false
				// if(res.IsSuccess){
				// 	uni.navigateTo({
				// 		url:`/pages/prestoreDetail/isSuccess?type=card&allMoney=${res.Data}&money=${res.Data}`
				// 	})
				// }else{
				// 	this.$api.msg(res.Msg)
				// }
			},
			async userinfo(obj){
				console.log(obj)
				let iv= obj.detail.iv
				let encryptedData = obj.detail.encryptedData
				this.WXuserInfo = obj.detail.userInfo
				let flag = obj.detail.errMsg
				if(flag === 'getUserInfo:ok'){
					let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
					let data = pc.decryptData(encryptedData,iv)
					this.unionid = data.unionId
					console.log(this.unionid)
					let res = await this.$api.showModal({content: "获取用户信息成功，需要再次点击【微信登录】授权获取手机号",showCancel: false})
					if(res){
						this.disableBtn[0]=true
						this.showGetUserInfo=false
					}
				}else{
					console.log('取消授权')
					this.$api.msg('取消授权')
				}
			},
			async phonenumber(phonObj){
				console.log(phonObj)
				let flag = phonObj.detail.errMsg
				if(flag === 'getPhoneNumber:ok'){
					console.log(3349)
					let phoneEncryptedData = phonObj.detail.encryptedData
					let phoneIv = phonObj.detail.iv
					let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
					let tmpPhone = pc.decryptData(phoneEncryptedData,phoneIv)
					console.log(tmpPhone)
					let phone = tmpPhone.phoneNumber
					console.log(this.WXuserInfo)
					let getLogin ={
						phone,
						nickname:this.WXuserInfo.nickName,
						headimgurl:this.WXuserInfo.avatarUrl,
						openid:this.openid,
						unionid:this.unionid,
						pid:0,//店铺id
						yyyid:0//推荐人id
					}
					this.$api.showLoading_()
					let data = await this.$http.loginWithWx(getLogin.phone,getLogin.nickname,getLogin.headimgurl,getLogin.openid,getLogin.unionid,getLogin.pid,getLogin.yyyid)
					if(data.IsSuccess){
						this.isLogin=true
						this.$api.msg(data.Msg)
						this.$store.commit('login', data.Data)
						this.$api.hidLoading_()
					}else{
						this.$api.msg(data.Msg)
					}
				}else if(flag === 'getPhoneNumber:fail user deny'){
					console.log('取消授权')
					this.$api.msg('取消授权')
				}
				
			}
		},
		onUnload() {
			
		},
		//注册滚动到底部的事件,用于上拉加载
		onReachBottom() {
			
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			
		},
		watch: {
			amount_(newValue) {
				if (newValue !== '') {
					this.active_ = true
				} else {
					this.active_ = false
				}
			},
			amount(newValue) {
				if (newValue !== '') {
					this.active = true
				} else {
					this.active = false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.xian {
		margin-top: 12upx;
		width: 45upx;
		height: 8upx;
		background-color: rgb(254, 78, 1);
		transform: translateX(0);
		transition: transform .3s ease-in-out; 
	}
	
	.xians {
		width: 40upx;
		height: 26upx;
		background-color: rgb(255, 255, 255);
	}
	
	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	 
	.box {
		display: inline-block;
		width: 290upx;
		height: 164upx;
		margin-right: 16upx;
		border-radius: 15upx;
	}
	 
	.boxs {
		display: inline-block;
		width: 290upx;
		height: 164upx;
		margin-right: 16upx;
		border-radius: 15upx;
	}
	
	.box:last-child {
		margin-right: 0;
	}
	
	.lis {
		flex: 1;
		text-align: left;
		font-size: 28upx;
	}
	
	.liss {
		flex: 1;
		text-align: left;
		font-size: 28upx;
		font-weight: 600;
	}
	
	.hx-card {
	
		&-title {
			background: #f8f8f8;
		}
	
		.amount-field {
			border-bottom: 1px solid #ddd;
			transition: all .3s ease-in-out;
	
			&.active {
				border-bottom: 1px solid #eb5245;
			}
	
			.input {
				letter-spacing: 3upx;
				height: 1em;
				line-height: 1em;
			}
		}
	}
	
	.hx-btn {
		color: #fff;
		background: #eb5245;
		opacity: .3;
	
		&.active {
			opacity: 1;
		}
	}
	
	.sure {
		height: 70upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #f88160, #ff5b2e);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
		position: absolute;
		bottom: 100upx;
		width: 690upx;
		margin-left: 30upx;
	}
</style>
