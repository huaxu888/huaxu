<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBacks="true" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"> {{ title }}</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">{{ title }}</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="padding-lr hx-bg-gray" style="padding-top: 25upx;">
			<view class="flex flex-direction  padding-tb justify-center  bg-white " style="border-radius: 20upx;">
				<view class="flex align-center justify-center flex-direction " style="width: 100%;margin-top: 10upx;">
					<view style="border-radius: 50%; width: 130upx; height: 130upx;">
						<image  :src="LogoPic == '' ? 'https://img.huaxuapp.com/PNG%E7%89%88.png' : LogoPic" style=" width: 130upx; height: 130upx;border-radius: 10upx;"
						 class="log_img_sm"></image>
					</view>
					<text class="margin text-lg " style="font-weight:bold;">{{ StoreName == '' ? '花蓄' : StoreName }}</text>
				</view>

				<view class="margin-lr "><text>付款金额</text></view>

				<view class="margin margin-top-sm  flex align-center padding-bottom-xs" style="border-bottom: 1px solid #F0F0F0; margin-bottom: 0upx;">
					<text style="font-size: 40upx;" class="margin-right-xs align-start">&yen;</text>
					<input type="digit" placeholder-style="font-size: 45upx;" maxlength="11" :adjust-position="false"
					 confirm-type="done" @input="changeMoney" @blur="closeIn" style="font-size: 65upx;height: 80upx;" :value="money" />
				</view>
			</view>
		</view>

		<view class="padding-lr hx-bg-gray" style="padding-top: 25upx;">
			<view class=" padding-tb-sm bg-white" style="border-radius: 20upx;">
				<view class="cu-form-group-switch padding" v-if="YHQlist.length > 1">
					<view class="title">优惠券</view>
					<picker @change="bindPickerChange" :value="pickerIndex" :range="YHQlist" mode="selector" range-key="info" :disabled="disabled[0]">
						<view class="picker text-gray" style="font-size: 26upx;" v-if="YHQlist[pickerIndex].info">
							{{ YHQlist[pickerIndex].info}} <text class="cuIcon-right margin-left-xs"></text>
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group-switch padding" v-if="DJQList.length > 1">
					<view class="title">代金券</view>
					<picker @change="selectDJQ" :value="CurrentDJQ" :range="DJQList" mode="selector" range-key="info" :disabled="disabled[1]">
						<view class="picker text-gray" style="font-size: 26upx;" v-if="DJQList[CurrentDJQ].info">
							{{ DJQList[CurrentDJQ].info}} <text class="cuIcon-right margin-left-xs"></text>
						</view>
					</picker>
				</view>

				<view class="cu-form-group-switch padding">
					<view class="title">优惠额<text class="hxIcon-tishi margin-left-sm" style="font-size: 32upx;" @tap="showTips"></text></view>
					<view class="text-gray" style="font-size: 26upx;">{{toformatAmount(discountPay)}}元</view>
				</view>
				<block v-if="hbXs">
				<view class="cu-form-group-switch padding" v-if="isSy">
					
					<view class="title">余额 <text class="text-gray margin-left" style="font-size: 24upx;">共{{KTXbalance}}元</text></view>
					<!-- #ifdef MP-ALIPAY -->
					<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"
					 style="transform:scale(0.8)"></switch>
					<!-- #endif -->

					<!-- #ifndef MP-ALIPAY -->
					<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" style="transform:scale(0.8)"></switch>
					<!-- #endif -->
				</view>
				
				<view class="cu-form-group-switch padding" v-if="!isSy">
					
					<view class="title">可用余额 <text class="text-gray margin-left" style="font-size: 24upx;">共{{kyYE}}元</text></view>
					<!-- #ifdef MP-ALIPAY -->
					<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"
					 style="transform:scale(0.8)"></switch>
					<!-- #endif -->
				
					<!-- #ifndef MP-ALIPAY -->
					<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" style="transform:scale(0.8)"></switch>
					<!-- #endif -->
				</view>
				</block>
			</view>
		</view>

		<view style="padding-top: 25upx;" class="padding-lr padding-top hx-bg-gray">
			<view class="text-lg bg-white flex align-center justify-start padding  " sty le="padding-top: 60upx;  font-weight: 600;height: 44upx;  border-top-right-radius:20upx ; border-top-left-radius:20upx ;">
				<!-- <text style="line-height: 1em; font-size: 28upx;" v-if="needPay <= 0">支付方式:</text> -->
				<text style="line-height: 1em; font-size: 28upx;" v-if="!switchB">现金支付:</text>
				<text style="line-height: 1em; font-size: 28upx;" v-if="switchB && radio == 1 ">余额支付:</text>
				<text style="line-height: 1em; font-size: 28upx;" v-if="switchB && radio != 1">还需现金支付:</text>

				<text style="color: #eb5245;font-size: 40upx;line-height: 1em;margin-left: 10upx;" v-if="needPay > 0"> <text style="font-size: 28upx;font-weight: 600;">￥</text>
					{{ needPay }} </text>
			</view>
			
			<!-- #ifdef APP-PLUS -->
			<view class="bg-white padding-bottom" style="border-bottom-left-radius: 20upx; border-bottom-right-radius: 20upx;">
				<payradio @getRadio="getRadio" :radio='radio' :yue="false"></payradio>
				<text class="padding text-red">{{ info }}</text>
			</view>
			<!-- #endif -->
			
			<!-- #ifndef APP-PLUS -->
			<view class="bg-white padding-bottom" style="border-bottom-left-radius: 20upx; border-bottom-right-radius: 20upx;">
				<payradio @getRadio="getRadio" :radio='radio' :yue="false" :disabled="!canSelectPaymentWay"></payradio>
				<text class="padding text-red">{{ info }}</text>
			</view>
			<!-- #endif -->
		
			<view class="flex justify-center padding margin-top">
				<button @tap="preNewToPay()" class="cu-btn bg-red shadow text-xl sure" style="width: 100%;height: 100upx;">
					确认支付
				</button>
			</view>
			
			<!-- #ifdef H5 -->
			<!-- <view class="flex justify-center padding-lr margin-bottom">
				<button @tap="gotoHome" class="cu-btn bg-gray goto-home" style="width: 100%;height: 40px;">
					去首页逛逛
				</button>
			</view> -->
			<!-- #endif -->
			
		</view>

		 <!-- 输入密码的支付窗口 -->
		<view class="cu-modal bottom-modal" :class="modalNameShow ? 'show' : ''">
			<view class="cu-dialog">
				<uni-grid @close="hideModal" @fullclose="fullclose" />
			</view>
		</view>

		<!-- 登录 -->
		<view class="login-panel" :style="{transform: loginPanle ? 'scale(1)' : 'scale(0)',  background: loginPanle ? 'rgba(0, 0, 0, .8)' : 'transparent'}">
			<view class="login">
				<view class="login-notice">
					<view style="text-align: center;position: relative;font-size: 34upx;" >
						<text>请先登录</text> 
						<view style="position: absolute;right: 0upx;top: 0;">
							<text class="cuIcon-close" @tap="loginPanle = false" style="font-size: 40upx;"></text>
						</view>
					</view> 
				</view>

				<view class="flex flex-direction" style="overflow: hidden; height: 500upx;">
					<view style="height: 430upx;margin-top: 70upx;transition: all 0.3s ease-in-out;" v-if="!loginbyPhone" :style="{ transform : !loginbyPhone? 'translateX(0)': 'translateX(-100%)'}">

						<view style="margin-top: 30upx;">
							<text>
								<text class="sign">1</text>
								获取您的微信
							</text>
							<button class="phone-login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo" style="margin-top: 10upx;"
							 :disabled="getWxUserInfo">
								微信授权
								<text class="cuIcon-check margin-left" v-if="getWxUserInfo"></text>
							</button>
						</view>

						<view style="margin-bottom: -20upx; margin-top: 60upx;" v-if="getWxUserInfo">
							<text>
								<text class="sign">2</text>
								选择您的账号
							</text>
						</view>
						<view style="margin-bottom: -20upx; margin-top: 60upx;color: #999999;" v-if="!getWxUserInfo">
							<text>
								<text class="signs">2</text>
								选择您的账号
							</text>
						</view>
						<button class="phone-login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :disabled="!getWxUserInfo">
							账号登录
						</button>
					</view>

					<view style="height: 430upx;margin-top: 70upx;transition: all 0.3s ease-in-out;" :style="{ transform : loginbyPhone? 'translateX(0)': 'translateX(-100%)'}"
					 v-if="loginbyPhone">
						<view class="input-field text-lg flex align-center" :class=" isFouces[0] || vilidate[0] ? 'active': ''">
							<view class="flex align-center flex-sub">
								<input type="number" v-model="phone" placeholder-style="color: #CCCCCC" maxlength="11" placeholder="请输入手机号"
								 @focus="focus(1)" @blur="blur" :disabled="codeText != '获取验证码'" />
							</view>
							<text class="code vlide" @tap="getCode" v-if="loginWithCode" style="font-size: 26upx;color: #fe4e01;">
								{{ codeText }}
							</text>
						</view>
						<view class="with-code">
							<view class="item" :style="{marginLeft: loginWithCode ? '0' : '-100vw'}">
								<view class="input-field text-lg flex align-center" :class=" isFouces[1] || vilidate[1] ? 'active': ''">
									<view class="flex align-center flex-sub">
										<input type="number" v-model="code" class="flex align-center" placeholder-style="color: #CCCCCC" maxlength="6"
										 placeholder="请输入验证码" @focus="focus(2)" @blur="blur" />
									</view>
								</view>
							</view>
							<view class="item">
								<view class="input-field text-lg flex align-center" :class=" isFouces[1] || vilidate[1] ? 'active': ''">
									<view class="flex align-center flex-sub">
										<input type="text" password="true" v-model="pwd" class="flex align-center" placeholder-style="color: #CCCCCC"
										 placeholder="请输入密码" @focus="focus(2)" @blur="blur" />
									</view>
								</view>
							</view>
						</view>
						<!-- <text style="font-size: 26upx;" class="pass margin-top" @tap="loginWay">{{ loginWithCode ? '密码登录' : '验证码登录' }}</text> -->
						<view class="hx-btn">
							<button class="cu-btn lg flex" :class="vilidate[0] && vilidate[1] ? 'active' : ''" @tap="login" style="font-size: 30upx;border-radius: 60upx;">登录</button>
						</view>
					</view>


				</view>

				<view v-if="showChangeFunc">
					<view class="liner">
						<text class="info">
							切换登录方式
						</text>
					</view>
					<view class="flex align-center justify-center margin-top" @tap="loginPage">
						<view class="flex align-center justify-center bg-white" style="height: 100upx;width: 200upx;" v-if="!loginbyPhone">
							<text class="hxIcon-shouji1" style="font-size: 40upx;color: gray;"></text> <text class="margin-left-xs">验证码登录</text>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<view class="flex align-center justify-center bg-white" style="height: 100upx;width: 200upx;" v-if="loginbyPhone">
							<text class="hxIcon-weixin1" style="font-size: 50upx;color: #39B54A;"></text><text class="margin-left-xs">微信登录</text>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import payradio from '../../components/payRadio/payRadio.vue'
	import tuiModal from "@/components/modal/modal"
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment,
		decrypt
	} from '../../common/handle.js'
	export default {
		components: {
			uniGrid,
			tuiModal,
			payradio
		},
		watch: {
			phone(newValue, oldValue) {
				if (newValue.length === 11) {
					if ((/^1[3456789]\d{9}$/.test(newValue))) {
						this.$set(this.vilidate, 0, true)
					} else {
						this.$api.msg('您输入的电话号码有误')
					}
				} else {
					this.$set(this.vilidate, 0, false)
				}
			},
			code(newValue, oldValue) {
				if (newValue.length >= 6) {
					this.$set(this.vilidate, 1, true)
				} else {
					this.$set(this.vilidate, 1, false)
				}
			},
			pwd(newValue, oldValue) {
				if (newValue.length >= 6) {
					this.$set(this.vilidate, 1, true)
				} else {
					this.$set(this.vilidate, 1, false)
				}
			},
			money(n,o){
				this.pickerIndex = 0
			}
		},
		data() {
			return {
				yhqList_:[],//优惠券备用数据
				money: '', //金额
				discountPay: 0,
				radio: 1,
				Showmoney: 0, //实际付款金额
				userInfo: {}, //用户信息
				LogoPic: '',		 //店铺logo
				StoreName: '', 		//店铺名称
				StoreID: '',
				modalNameShow: false, //是否弹出支付窗口
				shopDetailData: {},
				Num1: 0, //满多少钱
				Num2: 0, //减多少元
				CCouponsID: 0, //优惠券ID
				CCouponsIDStore: 0,
				isSY: false, //是否可以使用
				yhqList: [], //优惠券李斯特
				title: '扫码支付',
				openid: '',
				unionid: '',
				YHQlist: [{
					CCouponsIDStore: 0,
					Num1: 0,
					Num2: 0,
					info: '不使用'
				}], //优惠券list
				DJQList: [
					{
						CCouponsIDStore: 0,
						Num1: 0,
						Num2: 0,
						info: '不使用'
					}
				],
				pickerIndex: 0,
				CurrentDJQ: 0,
				disabled: [false, false],
				userid: 0,
				wxInfo: {
					openId: '',
					unionId: '',
					nickName: '',
					purePhoneNumber: ''
				},
				yyyid: 0,
				getWxUserInfo: false,
				disableBtn: [false, false],
				out_trade_no: '',
				balance: 0, //可抵扣
				KTXbalance: 0, //可提现金额
				loginPanle: false,
				needPay: 0,
				needWxVerify: false,
				isFouces: [false, false], // ↓以下开始是登录所用属性 获取焦点的状态
				vilidate: [false, false], // 电话号码、验证码、密码是否正确
				codeText: '获取验证码', // 获取验证码倒计时
				phone: '', // 电话号码
				code: '', // 验证码
				pwd: '', // 密码
				loginWithCode: true, 		// 是否采用验证码登录
				loginbyPhone: false,
				showChangeFunc: true,
				discount: 1,      		 	// 折扣 
				switchB: false,    		    //余额开关 
				isShowTips: false,  		//展示提示框
				info: '',
				zk: 1,
				isSy: false,				// 是否是指定店铺
				canSelectPaymentWay: true,
				SortID: 0,
				hbXs: true,
				cxIndex: 0,
				sorts:0,
				kyYE:0,
				inx:0,
				storeids:''
			};
		},
		async onShow() {
			var _self = this
			
			// #ifdef MP-WEIXIN
			_self.userInfo = uni.getStorageSync('userInfo')
			uni.getSetting({
				success: (res) => {
					if (res.authSetting['scope.userInfo']) {
						_self.getWxUserInfo = true
						uni.getUserInfo({
							provider: 'weixin',
							success: (res) => {
								decrypt(res)
									.then(res => {
										Object.assign(this.wxInfo, this.wxInfo, res.data)
									})
									.catch(err => {
										_self.getWxUserInfo = false
									})
							},
							fail: (err) => {
								console.log('获取用户信息失败', err);
								_self.getWxUserInfo = false
							}
						})
					} else {
						_self.getWxUserInfo = false
						console.log('没授权');
					}
				},
				fail: (err) => {
					_self.getWxUserInfo = false
				}
			})
			// #endif
			
			if (_self.StoreID) {
				_self.$http.getStore(_self.StoreID)
					.then(async res => {
						console.log('店铺信息：', res);
						if (res.IsSuccess) {
							_self.info = res.Data.Info
							_self.StoreName = res.Data.StoreName
							_self.LogoPic = res.Data.LogoPic
							_self.zk = res.Data.zk
							_self.isSY = res.Data.IsSY
							_self.SortID = res.Data.SortID
							_self.isSy = res.Data.IsSY
							await _self.getBalance()
							await _self.getCoupons()
						}
					})
					.catch(err => {
						console.log('店铺信息出错：', err);
					})
			} else {
				setTimeout(() => {
					_self.$http.getStore(_self.StoreID)
						.then(async res => {
							if (res.IsSuccess) {
								_self.StoreName = res.Data.StoreName
								_self.LogoPic = res.Data.LogoPic
								_self.zk = res.Data.zk
								await _self.getBalance()
								await _self.getCoupons()
							}
						})
						.catch(err => {
							console.log('店铺信息出错：', err);
						})
				}, 1500)
			}
		},
		onLoad(option) {
			this.inx = 0
			// #ifdef MP-ALIPAY
			// 获取支付宝扫码参数，并赋值给 option.q ，方便后边统一处理
			this.needWxVerify = false
			option.q = this.$store.state.qrQuery
			// #endif
			
			var _self = this;
			_self.userInfo = uni.getStorageSync('userInfo')

			// #ifdef MP-WEIXIN
			if (_self.userInfo.ID) {
				//如果用户登录的，那就不需要授权
				
				_self.needWxVerify = false;
				
			} else {
				_self.needWxVerify = true
				//如果用户没有登录，所以需要微信授权
				// uni.navigateTo({
				// 	url:`/pages/common/login?isBack=back`
					
				// })
			}
			// #endif

			// 获取扫描二维码参数
			if (option.q) {
				console.log(option.q);
				let t = option.q
				t = decodeURIComponent(t)
				let arr = t.split('?')
				let param = arr[1].split('&')
				let params = param[0].split('=')
				console.log(params);
				this.storeids = params[1]
				if (param[0].includes('ewmid')) {
					param = param[0].split('=')
					this.$http.getStoreByEWM(param[1])
						.then(res => {
							if (res.IsSuccess) {
								console.log(res);
								_self.StoreID = res.Data.StoreID
								_self.userid = res.Data.yyyid
								_self.yyyid = _self.userid
								 _self.$store.commit('setTjrid', _self.yyyid*1 || _self.StoreID*1)
							} else {
								uni.showModal({
									content: res.Msg,
									cancelText: '返回首页',
									success: (res) => {
										if (res.cancel) {
											uni.switchTab({
												url: '/pages/index/index'
											})
										}
									}
								})
							}
						})
						.catch(err => {
							console.log('店铺信息失败', err);
						})
				} else {
					_self.StoreID = (param[0].split('='))[1]
					_self.userid = (param[1].split('='))[1]
					_self.yyyid = _self.userid
					_self.$store.commit('setTjrid', _self.yyyid*1 || _self.StoreID*1)
				}
				// _self.$store.commit('setTjrid', _self.yyyid || _self.StoreID)
			}

			if (option.StoreID) {
				_self.StoreID = option.StoreID
			} else if (option.storeid) {
				_self.StoreID = option.storeid
			}
			
			// #ifdef APP-PLUS
			this.radio = 3
			// #endif
		},
		methods: {
			async getBalance() {
				if (this.userInfo.ID) {
					let data = await this.$http.getUserBalance(this.userInfo.ID);
					this.balance = this.$api.formatAmount(data.Data.Total);
					this.KTXbalance = this.$api.formatAmount(data.Data.KeTiXian);
					await this.$http.getDiscount(this.userInfo.ID, this.StoreID)
						.then(res => {
							if (res.IsSuccess) {
								this.discount = res.Data
							} else {
								this.discount = 1
							}
						})
				} else {
					this.balance = 0
				}
			},
			async userinfo(userinfo) {
				if (userinfo.detail.errMsg === 'getUserInfo:fail auth deny') {
					uni.showModal({
						content: '授权取消，请重新授权',
						showCancel: false
					})
					this.$set(this.disableBtn, 0, false)
					return false
				}
				await new Promise((resovle, reject) => {
					this.wxInfo.userInfoEncryptedData = userinfo.detail.encryptedData
					this.wxInfo.userInfoIv = userinfo.detail.iv
					resovle(true)
				})
			},
			loginWay() {
				this.loginWithCode = !this.loginWithCode
			},
			SwitchB(e) {
				console.log(this.switchB);
				if(this.switchB){
					this.switchB = false
				} else {
					this.switchB = true
				}
				console.log(this.switchB);
				let inputMoney = this.money //输入的金额
				if (Number(inputMoney) > 0) {
					//说明里面输入的有值
					this.changeMoney();
				}
				
				if(this.switchB == false) {
					// #ifdef MP-WEIXIN || H5 || APP-PLUS
					this.radio = 3
					// #endif
					// #ifdef MP-ALIPAY
					this.radio = 2
					// #endif
				}
				
			},
			focus(index) {
				if (index === 1) {
					this.$set(this.isFouces, 0, true)
					this.$set(this.isFouces, 1, false)
				} else if (index === 2) {
					this.$set(this.isFouces, 1, true)
					this.$set(this.isFouces, 0, false)
				}
			},
			blur() {
				this.$set(this.isFouces, 1, false)
				this.$set(this.isFouces, 0, false)
			},
			gotoHome: function () {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			getCode() {
				let self = this
				if (this.vilidate[0] && this.codeText == '获取验证码') {
					this.$store.commit('setTimer', (new Date()).getTime())
					let timer = 60
					self.codeText = timer + 'S'
					let t = setInterval(function() {
						timer--
						self.codeText = timer + 'S'
						if (timer === 0) {
							clearInterval(t)
							self.codeText = '获取验证码'
						}
					}, 1000)
					this.$http.getVerifyCode(this.phone)
						.then(res => {
							self.$api.msg('验证码已经发送到手机，请注意查收')
						})
						.catch(err => {
							this.$api.msg('服务器连接超时，请稍后重试')
							console.log('获取验证码失败：', err);
						})
				}
			},
			login() {
				let self = this
				if (this.loginWithCode) {
					let startTime = this.$store.state.timer,
						endTime = (new Date()).getTime()
					if (endTime - startTime >= 1000 * 60 * 3) {
						this.$api.msg('验证码超时')
					} else {
						this.$http.loginWithCode(this.phone, this.code, endTime,0,this.$store.state.userInfo.ID || 0,this.storeids || 0)
							.then(async res => { 
								if (res.IsSuccess) {
									self.$store.commit('login', res.Data)
									self.userInfo = res.Data;
									self.loginPanle = false; //弹窗关闭
									await self.getBalance();
									await self.changeMoney();
								} else {
									self.$api.msg(res.Msg)
								}
							})
							.catch(err => {
								this.$api.msg('服务器连接超时，请稍后重试')
								console.log('验证码登录出错', err);
							})
					}
				} else {
					this.$http.loginWithPass(this.phone, this.pwd)
						.then(async res => {
							if (res.IsSuccess) {
								self.$store.commit('login', res.Data)
								self.userInfo = res.Data;
								console.log(res)
								self.loginPanle = false; //弹窗关闭
								await self.getBalance();
								await self.changeMoney();
							} else {
								self.$api.msg(res.Msg)
							}
						})
						.catch(err => {
							this.$api.msg('服务器连接超时，请稍后重试')
							console.log('密码登录出错', err);
						})
				}
			},
			preNewToPay() {
				//支付前判断用户信息
				//判断USERID
				if (Object.keys(this.$store.state.userInfo).length > 0 && !this.$store.state.userInfo.Phone) {
					uni.showModal({
						title: '信息不完整',
						content: '为了保障您的权益，请在付款之前完善您的联系方式',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/chagePhone'
								})
							}
						}
					})
					return
				}
				if (this.userInfo.ID) {
					//如果不为空
					//判断是否是微信支付 或者含有微信混合支付
					if (this.radio == 3) {
						//有微信参与支付
						// #ifdef MP-WEIXIN
						//如果在小程序端 判断有没有授权
						console.log(this.userInfo.UnionID);
						if (this.userInfo.UnionID) {
							//授权了。可以正常支付
							console.log('授权了。可以正常支付');
							this.newToPay();
						} else {
							//未授权，弹窗进行授权
							console.log('未授权，弹窗进行授权');
							// this.loginPanle = true;
							// this.loginbyPhone = false;
							// //授权时候将账号密码登录进行屏蔽
							// this.showChangeFunc = false;
							// return
							this.newToPay();
						}
						// #endif

						// #ifdef APP-PLUS || H5
						//直接支付
						this.newToPay();
						// #endif

					} else {
						//没有微信参与的混合支付，正常支付
						this.newToPay();
					}
				} else {
					//如果为空	
					this.loginPanle = true;
					this.loginbyPhone = true;
					//授权时候将账号密码登录进行屏蔽
					this.showChangeFunc = true;
					//进行登录，可以授权登录，或者账号密码登录  弹窗
				}
			},
			newToPay() {
				
				if (this.money >= 0.1) {
					
					if (this.radio == 1) {
						if (Number(this.needPay) > Number(this.KTXbalance)) {
							uni.showModal({
								title: '支付失败',
								content: '可用余额不足，请选择其他支付方式',
								showCancel: false
							})
							return

						} else {
							this.modalNameShow = true
							return
						}
					} else if (this.radio == 2) {
						this.newMixPay('支付宝', this.needPay);

					} else if (this.radio == 3) {
						this.newMixPay('微信', this.needPay);

					}
				} else {
					this.$api.msg('支付金额不能小于0.1元')
				}
			},
			loginPage() {
				this.loginbyPhone = !this.loginbyPhone
			},
			homePage() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			disableTab(index) {
				this.$set(this.disableBtn, index, true)
			},
			newMixPay(paymentWay, paynum) {
				this.out_trade_no = (new Date()).getTime();
				let dkmoney = this.switchB ? this.KTXbalance : 0
				if (this.CurrentDJQ > 0 && this.Showmoney === this.money) {
					this.modalNameShow = true
					this.radio = 1
					return
				}
				switch (paymentWay) {
					case '微信':
					console.log(this.CCouponsIDStore);
						// #ifdef MP-WEIXIN
						wxAppletsPay(this.toformatAmount(this.needPay), `付款给${this.StoreName}`, this.out_trade_no, this.StoreID, this.yyyid, this.CCouponsIDStore, dkmoney, this.toformatAmount(this.money))
							.then(res => {
								this.radio = 5
								this.hxPay()
								this.$http.sendSMS(this.userInfo.ID, this.yyyid, this.StoreID, this.money)
							})
							.catch(err => {
								console.log('微信小程序支付出错：', err)
								this.$api.msg(err.Msg)
								this.needPay = 0
								this.discountPay = 0
							})
						// #endif

						// #ifdef APP-PLUS
						appPayment(this.needPay, `付款给${this.StoreName}`, this.userInfo.ID, paymentWay, this.out_trade_no, this.StoreID, this.yyyid, this.CCouponsIDStore, this.switchB ? this.KTXbalance : 0, this.toformatAmount(this.money))
							.then(res => {
								this.radio = 5 
								this.hxPay();
								this.$http.sendSMS(this.userInfo.ID, this.yyyid, this.StoreID, this.money)
							}).catch(err => {
								console.log(`${paymentWay}支付失败:`, err);
								this.$api.msg(err.Msg)
							})
						// #endif
						break;

					case '支付宝':
						// 支付宝小程序支付
						// #ifdef MP-ALIPAY
						alipayAppletsPay(this.needPay, `付款给${this.StoreName}`, this.userInfo.ID, this.out_trade_no, this.StoreID, this.yyyid, this.CCouponsIDStore, this.switchB ? this.KTXbalance : 0, this.toformatAmount(this.money))
							.then(res => {
								console.log('支付宝小程序支付完成：', res)
								this.radio = 6;
								this.hxPay();
								this.$http.sendSMS(this.userInfo.ID, this.yyyid, this.StoreID, this.money)
							})
							.catch(err => {
								console.log('支付宝小程序支付出错：', err)
								this.$api.msg(err.Msg)
							})
						// #endif

						// #ifdef APP-PLUS
						appPayment(this.needPay, `付款给${this.StoreName}`, this.userInfo.ID, paymentWay, this.out_trade_no, this.StoreID, this.yyyid, this.CCouponsIDStore, this.switchB ? this.KTXbalance : 0, this.toformatAmount(this.money))
							.then(res => {
								console.log(`${paymentWay}支付成功:`, res);
								this.radio = 6
								this.hxPay();
								this.$http.sendSMS(this.userInfo.ID, this.yyyid, this.StoreID, this.money)
							})
							.catch(err => {
								console.log(`${paymentWay}支付失败:`, err);
								this.$api.msg(err.Msg)
							})
						// #endif
						break;
					default:
						break;
				}
			},
			getUserInfo(userInfo) {
				decrypt(userInfo)
					.then(res => {
						Object.assign(this.wxInfo, this.wxInfo, res.data)
						this.getWxUserInfo = true
					})
					.catch(err => {
						console.log('获取用户信息失败', err);
						this.$api.msg('获取用户信息失败，请稍后重试')
					})
			},
			phonenumber(phonenumber) {
				this.$set(this.disableBtn, 1, false)
				if (phonenumber.detail.errMsg === 'getPhoneNumber:fail:user deny') {
					uni.showModal({
						content: '授权取消，请重新授权',
						showCancel: false
					})
					return false
				}
				this.wxInfo.phoneEncryptedData = phonenumber.detail.encryptedData
				this.wxInfo.phoneIv = phonenumber.detail.iv
				new Promise((resovle, reject) => {
						if (!this.wxInfo.js_code) {
							uni.login({
								provider: 'weixin',
								success: (res) => {
									this.wxInfo.js_code = res.code
								}
							})
						}
						this.$http.getOpenid(this.wxInfo.js_code)
							.then(res => {
								try {
									let t = JSON.parse(res.Data)
									this.wxInfo.session_key = t.session_key
								} catch (e) {
									reject({
										status: false,
										msg: '参数解析出错',
										err: e
									})
								}
								if (this.wxInfo.session_key) {
									let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.wxInfo.session_key)
									let tmpPhone = pc.decryptData(this.wxInfo.phoneEncryptedData, this.wxInfo.phoneIv)
									let tmpUser = pc.decryptData(this.wxInfo.userInfoEncryptedData, this.wxInfo.userInfoIv)
									this.wxInfo.phone = tmpPhone.purePhoneNumber
									this.wxInfo.unionid = tmpUser.unionId
									this.wxInfo.openid = tmpUser.openId
									this.wxInfo.nickName = tmpUser.nickName
									this.wxInfo.avatar = tmpUser.avatarUrl
									console.log(this.wxInfo, '537');
									resovle({
										status: true,
										msg: '获取信息成功',
										params: this.wxInfo
									})
								} else {
									reject({
										status: false,
										msg: 'session_key 为空'
									})
								}

							})
							.catch(err => {
								reject({
									status: false,
									msg: '服务器错误',
									err: err
								})
							})
					})
					.then(res => {
						console.log(this.wxInfo, '560');
						this.$http.loginWithWx(this.wxInfo.phone, this.wxInfo.nickName, this.wxInfo.avatar,
								this.wxInfo.openid, this.wxInfo.unionid, 0, this.yyyid, this.storeids || 0)
							.then(res => {
								if (res.IsSuccess) {
									this.$store.commit('login', res.Data)
									this.userInfo = res.Data
									this.$api.hidLoading_
									this.needWxVerify = false
									this.getCoupons()
								} else {
									this.$api.hidLoading_
									this.$api.msg(res.Msg)
								}
							})
							.catch(err => {
								console.log(err, '登录出错')
								this.$api.msg(err)
							})
					})
					.catch(res => {
						console.log('获取电话号码出错：', res)
						this.$api.msg(res.msg)
					})
			},
			getPhoneNumber(phoneNumber) {
				decrypt(phoneNumber).then(res => {
					Object.assign(this.wxInfo, this.wxInfo, res.data)
					this.$http.loginWithWx(this.wxInfo.purePhoneNumber, this.wxInfo.nickName,
							this.wxInfo.avatarUrl, this.wxInfo.unionId, this.wxInfo.openId,
							0, this.yyyid || 0, this.storeids || 0)
						.then(async res => {
							if (res.IsSuccess) {
								console.log('登录', res);
								this.$store.commit('login', res.Data)
								this.userInfo = res.Data
								await this.getBalance()
								await this.changeMoney()
								await this.getCoupons()
								this.loginPanle = false
							} else { 
								this.$api.msg('登录出错，请稍后再试')
								console.log('登录之后的 res', res);
							}
						})
						.catch(err => {
							this.$api.msg('登录出错，请稍后再试')
							console.log('登录出错', err);
						})
					})
					.catch(err => {
						this.$api.msg('获取电话号码失败，请稍后重试')
						console.log('整个出错', err);
					})
			},
			getCoupons() {
				var _self = this;
				if (_self.userInfo != null) {
					if (this.StoreID != '') {
						uni.request({
							url: "https://newsapp.huaxuapp.com/api/mymember/MyNewClipCoupons",
							data: {
								userid: this.userInfo.ID || 0,
								storeid: this.StoreID || 0
							},
							method: "GET",
							success: (res) => {
								if (res.data.IsSuccess) {
									_self.yhqList_ = res.data.Data
									_self.yhqList = res.data.Data;
									
									_self.YHQlist = [{
										CCouponsIDStore: 0,
										Num1: 0,
										Num2: 0,
										info: '不使用'
									}]
									
									_self.DJQList = [{
											CCouponsIDStore: 0,
											Num1: 0,
											Num2: 0,
											info: '不使用'
									}]
									
									_self.yhqList.forEach(item => {
										let dataNum = parseInt(item.EDate.replace("/Date(", "").replace(")/", ""));

										if ( (item.StoreID == this.StoreID || item.StoreID === 0 )  && (dataNum - (new Date().getTime())) > 0) {
											
											let obj = {
												CCouponsIDStore: item.youhuiquan.CCouponsID,
												Num1: 0,
												Num2: 0,
												info: ''
											}
											
											let tmp = item.StoreID === 0 ? '[指定通用]' : '[店铺专用]'
											
											switch (item.Sort) {
												case 1:
													
													if(item.Num1){
														obj.Num1 = item.Num1
														obj.Num2 = item.Num2
														obj.info = '满' + item.Num1 + '减' + item.Num2 
													} else {
														obj.Num1 = item.Num2
														obj.Num2 = item.Num2
														obj.info = '消费立减' + item.Num2 
													}
													
													
													console.log('优惠券', obj);
													if (this.SortID == 3 && item.Num2 === 50) {
														
													} else {
														_self.YHQlist.push(obj);
													}
													break
												case 2:
													obj.Num2 = item.Num2
													obj.info = item.Num2 + '元代金券' 
													console.log('代金券', obj)
													_self.DJQList.push(obj);
													break
												case 3:
													obj.Num2 = item.Num2
													obj.info = item.Num2 + '元代金券' 
													console.log('代金券', obj)
													_self.DJQList.push(obj);
													break
												case 7:
													obj.Num1 = item.Num1
													obj.Num2 = 0
													obj.info = '满' + item.Num1 + '元赠' + item.Num2 + '元余额'
													console.log('优惠券', obj);
													if (this.SortID == 3 && item.Num2 === 50) {
														
													} else {
														_self.YHQlist.push(obj);
													}
													break
												default:
											}

										}
									})

									if (_self.YHQlist.length > 0) {
										//456
										// this.CCouponsIDStore = this.YHQlist[this.pickerIndex].CCouponsIDStore
										_self.Num1 = _self.YHQlist[this.pickerIndex].Num1;
										_self.Num2 = _self.YHQlist[this.pickerIndex].Num2;
										_self.CCouponsIDStore = _self.YHQlist[this.pickerIndex].CCouponsIDStore;

									} else {
										_self.Num1 = 0;
										_self.Num2 = 0;
										_self.CCouponsIDStore = 0;

									}
								} else {
									this.Num1 = 0;
									this.Num2 = 0;
									this.CCouponsIDStore = 0;
								}
							},
							fail: () => {
								this.Num1 = 0;
								this.Num2 = 0;
								this.CCouponsIDStore = 0;
							}
						});
					}
				} else {
					_self.$api.msg('用户信息获取失败，请重新登录')
				}
			},
			getFloat(num, n) {
				n = n ? parseInt(n) : 0;
				if(n <= 0) {
					return Math.round(num);
				}
				num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
				num = Number(num).toFixed(n); //补足位数
				return num;
			},
			bindPickerChange(e) {
				console.log(e);
				// #ifdef MP-WEIXIN || H5 || APP-PLUS
				this.radio = 3
				// #endif
				// #ifdef MP-ALIPAY
				this.radio = 2
				// #endif
				this.inx = e.target.value
				let Num1 = this.YHQlist[e.target.value].Num1;
				if(this.money>=Num1){
					this.switchB = false
					this.pickerIndex = e.target.value
					if (e.target.value != 0) {
						this.$set(this.disabled, 1, true)
						this.$set(this.DJQList[0], 'info', '不可使用')
					} else {
						this.$set(this.disabled, 1, false)
						this.$set(this.DJQList[0], 'info', '不使用')
					}
					this.Num1 = this.YHQlist[this.pickerIndex].Num1;
					this.Num2 = this.YHQlist[this.pickerIndex].Num2;
					this.CCouponsIDStore = this.YHQlist[this.pickerIndex].CCouponsIDStore;
					this.Showmoney = this.Num2
					this.changeMoney();
					
					if(this.discountPay > 0){
						if(this.zk){
							if(this.pickerIndex == 0){
								this.hbXs = true
								this.switchB = false
							} else {
								this.needPay = this.getFloat(this.money - this.Showmoney, 2)
								this.discountPay = this.Num2
								this.hbXs = false
								this.switchB = false
							}
							this.cxIndex = this.pickerIndex
						} else {
							this.hbXs = false
							this.switchB = false
							console.log(this.pickerIndex);
							this.cxIndex = this.pickerIndex
						}
						
					} 
					if(this.discountPay <= 0){
						if(this.Num1){
							console.log('1596666666666666666666666666666895189418');
							this.hbXs = false
							this.switchB = false
							console.log(this.pickerIndex);
							this.cxIndex = this.pickerIndex
							this.needPay = this.money
						} else {
							console.log('12121212122121212121212121212122121');
							this.hbXs = true
							this.switchB = false
						}
					}
					// #ifdef MP-WEIXIN || H5 || APP-PLUS
					this.radio = 3
					// #endif
					// #ifdef MP-ALIPAY
					this.radio = 2
					// #endif
				}else{
					// #ifdef MP-WEIXIN || H5 || APP-PLUS
					this.radio = 3
					// #endif
					// #ifdef MP-ALIPAY
					this.radio = 2
					// #endif
					this.pickerIndex = this.cxIndex
					this.$api.msg('您支付的金额不满足优惠条件',2000)
					console.log(this.discountPay);
					if(this.discountPay > 0){
						this.hbXs = false
						this.switchB = false
						console.log(this.pickerIndex);
					} 
					if(this.discountPay == 0){
						
						if(this.switchB){
							this.hbXs = true
							this.pickerIndex = 0
							this.switchB = true
							console.log('1651446848664864');
						}  else {
							this.hbXs = true
							this.pickerIndex = 0
							this.switchB = false
							console.log('2222222222222222222222');
						}
					}
					
				}
			},
			selectDJQ: function (e) {
				this.CurrentDJQ = e.detail.value
				this.inx = e.detail.value
				if (e.target.value != 0) {
					this.$set(this.disabled, 0, true)
					this.$set(this.YHQlist[0], 'info', '不可使用')
				} else {
					this.$set(this.disabled, 0, false)
					this.$set(this.YHQlist[0], 'info', '不使用')
				}
				this.Num2 = this.DJQList[this.CurrentDJQ].Num2
				this.CCouponsIDStore = this.DJQList[this.CurrentDJQ].CCouponsIDStore
				console.log('选中的代金券', this.DJQList[this.CurrentDJQ]);
				this.changeMoney()
			},
			getRadio(e) {
				console.log(e);
				this.radio = e.radio;

				if (Number(this.needPay) <= 0) {
					this.switchB = false;
					this.changeMoney();
				}

			},
			hideModal(e) {
				//当点击关闭
				this.modalNameShow = e.modalNameShow;
			},
			async showModal() {
				if (!this.StoreID) {
					uni.showModal({
						content: '获取店铺信息失败，请重试',
						showCancel: false
					})
					return
				}
				if (this.Showmoney <= 0) {
					uni.showModal({
						content: '请核对支付金额',
						showCancel: false
					})
					return
				}
			},
			showTips() {
				this.isShowTips = true;
			},
			closeTips() {
				this.isShowTips = false;
			},
			fullclose(e) {
				this.modalNameShow = e.modalNameShow;
				this.toPay(e.pwd);
			},
			toformatAmount(money) {
				return this.$api.formatAmount(money);
			},
			closeIn(){
				this.pickerIndex = 0
				
				if(!this.isSy){
					if(this.inx == 0){
						if(this.zk){
							if(this.switchB){
								console.log(this.money,'我在这里');
								this.needPay = this.getFloat(this.money * this.zk,2) - this.kyYE
								this.switchB = true
							} else {
								this.needPay = this.getFloat(this.money * this.zk,2)
								this.switchB = false
							}
							console.log(this.needPay);
							this.discountPay = this.getFloat( this.money - this.money * this.zk,2) 
						} else {
							if(this.switchB){
								this.needPay = this.money - this.kyYE
								this.switchB = true
							} else {
								this.needPay = this.money
								this.switchB = false
							}
							this.discountPay = 0
							console.log(this.needPay);
						}
					} else {
						if(this.zk){
							this.needPay = this.getFloat(this.money * this.zk,2)
							this.discountPay = this.getFloat( this.money - this.money * this.zk,2) 
						} else {
							this.needPay = this.money
							this.discountPay = 0
						}
					}
					
				} else {
					if(this.inx > 0){
						if(this.zk){
							this.needPay = this.getFloat(this.money * this.zk,2)
							this.discountPay = this.getFloat( this.money - this.money * this.zk,2) 
						} else {
							this.needPay = this.money
							this.discountPay = 0
						}
					}
				}
				
				this.hbXs = true
				
				
				// // #ifdef MP-WEIXIN || H5
				// this.radio = 3
				// // #endif
				// // #ifdef MP-ALIPAY
				// this.radio = 2
				// // #endif
				
			},
			changeMoney(e) {
				this.hbXs = true
				console.log(e,'1515151515151515151515');
				
				this.canSelectPaymentWay = true
				
				// #ifdef MP-WEIXIN || H5 || APP-PLUS
				this.radio = 3
				// #endif
				// #ifdef MP-ALIPAY
				this.radio = 2
				// #endif
				if (e) {
					e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
					console.log(e.detail.value);
					this.money = e.detail.value
					if (!e.detail.value) {
						this.pickerIndex = 0
						this.Showmoney = 0
					}
					this.Num2 = 0
					
					this.$http.scanPayafter(this.userInfo.ID,Number(this.money)).then(res => {
						console.log(res,'普通商家可用余额');
						if(res.IsSuccess){
							this.kyYE = this.toformatAmount(Number(res.Data.UseScore))
						}
					})
				}

				if (this.CurrentDJQ !== 0) {
					this.Showmoney = this.money >= this.Num2 ? this.Num2 : this.money
				} else if (this.pickerIndex !== 0) {
					this.Showmoney = this.Num2
				} else {
					this.Showmoney = 0
				}

				this.needPay = ((this.money *10000 - this.Showmoney * 10000) / 10000 * this.zk).toFixed(2)
				if(this.needPay <= 0 ) {
				     this.switchB = true
				     this.radio = 1
				     this.canSelectPaymentWay = false
				}
				this.discountPay = (this.money * 10000 - this.needPay * 10000) / 10000
				
				if(!this.isSy){
					if(this.inx == 0){
						this.$http.scanPayafter(this.userInfo.ID,Number(this.money)).then(res => {
							console.log(res,'普通商家可用余额');
							if(res.IsSuccess){
								this.kyYE = this.toformatAmount(Number(res.Data.UseScore))
								this.canSelectPaymentWay = false
								// #ifdef MP-ALIPAY
								this.radio = 2
								// #endif
								// #ifdef MP-WEIXIN || H5 || APP-PLUS
								this.radio = 3
								// #endif
								if (this.switchB) {
									this.needPay = this.toformatAmount((this.money * 10000 - this.kyYE * 10000 ) / 10000)
								} else {
									this.needPay = (this.money * 10000 ) / 10000
								}
							}
						})
					}
				}
				
				if(this.isSy){
					if (this.switchB) {
						/* 选了余额支付 */
						if (Number(this.KTXbalance) >= Number(this.needPay)) {
							this.canSelectPaymentWay = false
							this.radio = 1
						} else {
							this.canSelectPaymentWay = false
							// #ifdef MP-ALIPAY
							this.radio = 2
							// #endif
							// #ifdef MP-WEIXIN || H5 || APP-PLUS
							this.radio = 3
							// #endif
							
							if(((this.needPay * 10000 - this.KTXbalance * 10000 )) / 10000 < 0.01){
								this.needPay = this.changeTwoDecimal((this.needPay * 10000 - this.KTXbalance * 10000 ) / 10000)
							} else {
								this.needPay = (this.needPay * 10000 - this.KTXbalance * 10000 ) / 10000
							}
						}
					} else { 
						if (Number(this.KTXbalance) >= Number(this.needPay)) {
							this.canSelectPaymentWay = false
							this.radio = 1
						} else {
							this.canSelectPaymentWay = false
							// #ifdef MP-ALIPAY
							this.radio = 2
							// #endif
							// #ifdef MP-WEIXIN || H5 || APP-PLUS
							this.radio = 3
							// #endif
							this.needPay = (this.needPay * 10000 ) / 10000
							if(((this.needPay * 10000 ) / 10000) < 0.01){
								this.needPay = this.changeTwoDecimal((this.needPay * 10000 ) / 10000)
							} else {
								this.needPay = (this.needPay * 10000 ) / 10000
							}
						}
					}
				}
				return
				setTimeout(() => {
					var index = this.money.indexOf(".");
					//判断是否输入小数点
					if (index != -1) {
						//有小数点
						var count = this.money.length - (index + 1);
						if (count > 2) {
							//如果有小数点且输入到小数点的后三位，进行格式化
							this.money = this.$api.formatAmount(this.money);

						}
					}
					var balance = this.balance; //可消费余额
					var ktx = this.KTXbalance; //可提现余额
					let inputMoney = this.money //输入的金额
					let realPay = this.$api.accMul(inputMoney, this.discount); //还需要支付多少钱
					let discountPay = this.$api.accSub(inputMoney, realPay); //折扣掉的金额(减法)
					if (this.pickerIndex > 0) {
						this.discountPay = 0;
						//说明选中了优惠券，那么计算消费额  
						
						if (Number(this.money) >= this.Num1) {
							//说明输入金钱大于达到减免的金额时候，使用优惠券
							realPay = Number(this.$api.formatAmount(this.$api.accSub(this.money, this.Num2)));
							if (realPay <= 0) {
								//如果优惠券捡去的金额小于等于0
								realPay = 0;
							}
							this.CCouponsID = this.CCouponsIDStore;
							console.log(this.CCouponsID);
						} else {
							this.CCouponsID = 0;
							realPay = this.money;
						}
					} else {
						realPay = Number(realPay); //实际支付的金额
						discountPay = Number(discountPay); //折扣掉的金额

						if (Number(this.balance) > 0) {
							//如果可抵扣额大于0
							if (this.balance < discountPay) {
								//如果可抵扣额小于这个折扣掉的金额
								discountPay = this.balance; //省所有的消费额
								realPay = this.$api.accSub(inputMoney, discountPay); // 还需支付  输入金额-所剩全部可抵扣
							} else {
								realPay = this.$api.accSub(inputMoney, discountPay); // 还需支付  输入金额-可抵扣
							}
						} else {
							realPay = inputMoney
							discountPay = 0
						}
						this.discountPay = discountPay;
					}
					/*判断余额是否充足
					 */

					if (Number(ktx) >= Number(realPay)) {
						//余额充足
						if (!this.switchB) { //666
							if (this.pickerIndex > 0) {
								//使用优惠券
								this.needPay = realPay.toFixed(2);
								
							} else {
								 let fixedMoney = Number(this.$api.accSub(inputMoney, discountPay)).toFixed(2);
								 this.needPay = fixedMoney;
								 this.discountPay = this.$api.accSub(inputMoney, fixedMoney);
							}
						} else {
							
							if (this.pickerIndex > 0) {
								//使用优惠券
								this.discountPay = this.Num2;
							}
							this.needPay = 0;
						}

						//这时候无论支付从哪里走，实际支付金额为 money
					} else {
						//可提现不够时候 
						if (this.switchB) { //666 
							//判断余额是否充足   可提现 - 实际需要的金额
						 let haveMonye = this.$api.accSub(ktx, realPay);
							if (this.pickerIndex > 0) {
								//使用优惠券
								this.discountPay = this.Num2;
								this.needPay =  (Number(haveMonye) * -1).toFixed(2);
							} else {
								 if (Number(haveMonye) > 0) {
								 	//说明余额充足
								 	this.needPay = 0;
								 } else {
								 	//说明余额不足 需要第三方补充支付
									this.needPay = this.money * zk
									this.discountPay = this.money - this.needPay
								 	// let fixedMoney =  (Number(haveMonye) * -1).toFixed(2);
								 	// this.needPay = fixedMoney;
								 	// let storeMoney  = this.$api.accSub(inputMoney, ktx);
								 	// this.discountPay = this.$api.accSub(storeMoney, fixedMoney);
								 }
							}
						} else {
							if (this.pickerIndex > 0) {
								this.discountPay = this.Num2;
							}
							this.needPay = realPay.toFixed(2);
						}

					}

					if (Number(this.needPay) > 0) {
						if (this.radio == 1) {
							// #ifdef MP-ALIPAY
							this.radio = 2;
							// #endif

							// #ifdef MP-WEIXIN || H5 || APP-PLUS
							this.radio = 3;
							// #endif
						}
					} else {
						this.radio = 1;
					}
				}, 0);
			},
			changeTwoDecimal(x){
				var f_x = parseFloat(x);
				if (isNaN(f_x)){
					return false;
				}
				f_x = Math.round(f_x *100)/100;
				return f_x;
			},
			async toPay(pwd) {
				//判断密码
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd)
				var self = this;
				if (pwd != '' && IsSuccess) {
					if (this.radio == 1) { //余额
						this.$Request_.get("https://newsapp.huaxuapp.com/api/scores/newapplejs", {
							userid: self.userInfo.ID,
							yyyid: self.yyyid,
							storeid: self.StoreID,
							num: self.needPay,
							CCouponsID: this.CCouponsIDStore,
							price: self.money
						})
						.then( res => {
							console.log(res);
							if (res.IsSuccess) {
								let xfMoney = '0.00';
								xfMoney = res.Data;
								uni.navigateTo({
									url: `/pages/scan/paySuccess?dealType=交易成功&StoreName=${self.StoreName}&opeFunction=` + self.radio +
										`&money=` + self.toformatAmount(self.money) + `&retrunMoney=` + xfMoney
								})
							} else {
								self.$api.msg(`支付失败,${res.Msg}`)
							}
						})
						.catch( err => {
							self.$api.msg(`支付失败,${res.Msg}`)
						})
					}
				} else {
					this.$api.msg('请输入正确的密码')
					return
				}
			},
			hxPay() {
				let self = this;
				console.log('sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf');
				uni.navigateTo({
					url: `/pages/scan/paySuccess?dealType=交易成功&StoreName=${self.StoreName}&opeFunction=` + self.radio +
						`&money=` + self.toformatAmount(self.money) + `&retrunMoney=0` 
				})
			}


		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #F4F4F4;
	}
</style>

<style lang="scss">
	.b {
		border: 1px solid #39b54a;
	}
	
	.sure {
		margin-top: 20upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #fb9c67, #fc6660);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	}
		
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #F4F4F4;
	}

	view {
		font-size: 28upx;
		line-height: inherit;
	}



	.tui-modal-custom {
		text-align: left;
	}

	.tui-tips-img {
		width: 80upx;
		height: 80upx;
		margin-top: 20upx;
	}

	.tui-modal-custom-text {
		font-size: 30upx;
		color: #333;
		padding: 20upx 0
	}

	.input-field {
		margin: 35upx 10upx;
		padding-bottom: 5upx;
		border-bottom: 1px solid #CCCCCC;
		transition: border-bottom .3s ease-in-out;
	}


	.cu-form-group {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		min-height: 128upx;
		justify-content: space-between;

	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}


	.cu-form-group-switch {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		min-height: 70upx;
		justify-content: space-between;
	}

	.cu-form-group-switch .title {
		min-width: calc(4em + 15px);
	}


	.cu-form-group-switch picker {
		flex: 1;
		overflow: hidden;
		position: relative;
	}


	.cu-form-group-switch picker .picker {
		font-size: 28upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}

	.cu-form-group-switch picker::after {
		font-family: cuIcon;
		display: block;
		content: "\e6a3";
		position: absolute;
		font-size: 34upx;
		color: #8799a3;
		line-height: 100upx;
		width: 60upx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -20upx;
		margin: auto;
	}


	.line {
		border-top: 1px solid #cccccc;
		width: 100upx;
		margin: 25upx;
	}

	.notice {
		margin-top: 10upx;
		display: flex;
		width: 70%;
		color: #999;
	}

	.cover {
		height: 100vh;
		width: 100%;
		position: absolute;
		top: 0;
		background: rgba($color: #000000, $alpha: .3);
		z-index: 99;
	}


	.close-btn {
		height: 40upx;
		width: 40upx;
		border: 1px solid #333;
		display: inline-block;
		text-align: center;
		border-radius: 100upx;

		text {
			vertical-align: middle;
		}
	}


	.hx-btn {
		margin: 30upx 0;

		.cu-btn {
			margin: 0 60upx;
			color: #ffffff;
			background: #fe4e01;;
			transition: all .3s ease-in-out;
			opacity: .5;
		}

		.active {
			opacity: 1;
			// box-shadow: 6upx 6upx 8upx #333;
		}
	}

	.with-code {
		display: flex;
		flex-wrap: none;
		overflow: hidden;

		.item {
			width: 100vw;
			flex-shrink: 0;
			transition: margin-left .5s ease-in-out;
		}
	}

	.vlide {
		color: #eb5245;
	}

	.goto-home {
		background: transparent;
		border: 1px solid #ddd;
		color: #999;
	}

	.select-payment-panel {
		z-index: 100;
		width: 100vw;
		position: fixed;
		bottom: 0;
		transition: bottom .3s ease-in-out;
		padding: 20upx 0 50upx 0;
		background: #fff;

		.pay-btn {
			display: flex;
			margin: 30upx;

			.mix,
			.wx,
			.alipay {
				padding: 30upx;
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				border-radius: 10upx;
				box-shadow: 2upx 4upx 8upx rgba(0, 0, 0, .3);

				text {
					padding: 0 5upx;
					vertical-align: middle;
				}
			}

			.mix {
				background: linear-gradient(to right bottom, lighten(#eb5245, 10), #eb5245);
				flex-direction: column;
				justify-content: center;
				align-content: center;
			}

			.wx {
				background: linear-gradient(to right bottom, lighten(#39B54A, 10), #39B54A);
			}

			.alipay {
				background: linear-gradient(to right bottom, lighten(#0081FF, 10), #0081FF);
			}
		}
	}

	.login-panel {

		z-index: 101;
		position: absolute;
		top: 0;
		height: 100vh;
		width: 750upx;
		padding: 0 70upx;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: scale(1);
		transition: transform .3s ease-in-out;
		background: rgba($color: #000000, $alpha: .5);

		.liner {
			position: relative;
			height: 1px;
			background: rgba($color: #000000, $alpha: .1);
			display: flex;
			justify-content: center;
			align-items: center;

			.info {
				background: #fff;
				position: absolute;
				padding: 10upx 30upx;
				font-size: 24upx;
				color: #ccc;
			}
		}

		.sign {
			display: inline-flex;
			width: 28upx;
			align-items: center;
			justify-content: center;
			height: 28upx;
			// background: linear-gradient(to right, lighten(#eb5245, 10), #eb5245);
			border: 2upx solid #333333;
			border-radius: 100upx;
			margin-right: 10upx;
			color: #333333;
			font-size: 24upx;
		}
		
		.signs {
			display: inline-flex;
			width: 28upx;
			align-items: center;
			justify-content: center;
			height: 28upx;
			// background: linear-gradient(to right, lighten(#eb5245, 10), #eb5245);
			border: 2upx solid #b5b5b5;
			border-radius: 100upx;
			margin-right: 10upx;
			color: #999999;
			font-size: 24upx;
		}

		.login {
			background: #fff;
			width: 100%;
			padding: 30upx 40upx;
			border-radius: 10upx;
		}

		.login-notice {
			font-size: 36upx;
			font-weight: bold;
		}

		.phone-login-btn {
			margin: 30upx 0;
			background: #39B54A;
			border-radius: 10upx;
			text-align: center;
			color: #fff;
			font-size: 30upx;
		}
	}
</style>
