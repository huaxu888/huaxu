<template>
	<view style="padding-bottom: 90upx;">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">订单核销</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">订单核销</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="padding: 30upx;font-size: 36upx;background-color: rgb(248, 81, 68);color: #ffffff;height: 200upx;padding-top: 50upx;">
			{{infoObject.StoreName}}
		</view>
		
		<view class="reservation-list-item" style="margin-top: 20upx;">
			<view class="reservation-list-item" style="margin: 0 30upx;border-radius: 8upx;margin-top: 50upx;position: absolute;top: 260upx;width: 690upx;background-color: #ffffff;">
				<view style="padding-left: 30upx;font-size: 28upx;color: #333333;margin-top: 30upx;">订单号：{{objects.Data.OrderNO}}</view>
				<view class="" style="margin: 0 30upx;padding-bottom: 30upx;margin-top: 26upx;">
					<view class="flex" style="padding-top: 32upx;padding-bottom: 40upx;border-bottom: 2upx solid #e4e4e4;">
						<view style="">
							<image :src="Imges" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;width: 100%;">
							<view style="font-size: 28upx;color: #333333;height: 76upx;" class="shengLv">
								<text>{{SetMealNames}}</text>
							</view>
						
							<view class="flex justify-between">
								<view style="color: #fe4e01;margin-top: 30upx;">
									<text style="color: #333333;">总额：</text>
									<text style="font-size: 30upx;">￥</text>
									<text style="font-size: 30upx;font-weight: 600;">{{zongHe}}</text>
								</view>
								<view style="margin-top: 30upx;color: #666666;margin-left: 30upx;">
									<text>数量：</text>
									<text>{{objects.Data.Num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding: 30upx;padding-bottom: 0;font-size: 32upx;padding-top: 0;">
					订单信息
				</view>
				<view style="padding: 30upx;padding-bottom: 0;font-size: 28upx;color: #666666;">
					用户姓名：
					<text style="color: #333333;">{{objects.name}}</text>
				</view>
				<view style="padding: 30upx;font-size: 28upx;color: #666666;">
					用户手机：
					<text style="color: #333333;">{{objects.phone}}</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 20upx;background-color: #f8f8f8;margin-top: 570upx;"></view>
			
		<view class="flex justify-between align-center" style="margin: 0 60upx;padding: 30upx 0;padding-bottom: 20upx;font-size: 30upx;color: #333333;border-bottom: 2upx solid #e4e4e4;">
			<view style="font-size: 32upx;">
				核销码
			</view>
			<view>
				<checkbox-group @change="allChoose">
					<label>
						<text style="margin-right: 10upx;font-size: 28upx;">全选</text>
						<checkbox color="#fe4e01" value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox>
					</label>
				</checkbox-group>
			</view>
		</view>
		
		<view class="padding" style="padding-top: 10upx;padding-left: 60upx;padding-right: 60upx;">
			<checkbox-group class="block" @change="changeCheckbox">
				<view  v-if="item.Sort == 1" v-for="(item,i) in checkboxData" :key="i" class="flex justify-between align-center" style="margin-top: 30upx;padding-bottom: 30upx;border-bottom: 2upx solid #e4e4e4;">		
					<view style="color: #777777;">
						<text>{{item.Code}}</text>
					</view>
					<view>
						<checkbox color="#fe4e01" :value="item.Code" :checked="checkedArr.includes(String(i))" :class="{'checked':checkedArr.includes(String(i))}"></checkbox>
					</view>
				</view>
			</checkbox-group>
		</view>
		
		<view  @tap="gotoHe" style="position: fixed;bottom: 0;background-color: rgb(248, 81, 68);width: 100%;z-index: 9;-moz-box-shadow:0px -3px 9px 0px #e9e9e9;-webkit-box-shadow:0px -3px 9px 0px #e9e9e9;box-shadow:0px -3px 9px 0px #e9e9e9;">
			<view style="display: flex;height:120upx;line-height:120upx;text-align: center;justify-content:space-around;">
				<text style="font-size: 31upx;color: #ffffff;">
					确认核销
				</text>
			</view>
		</view>
		
		<u-popup mode="center" :closeable="true" v-model="show" close-icon-pos="top-right">
			<view class="content">
				<scroll-view scroll-y="true" style="height:534upx;width: 524upx;border-radius: 15upx;">
					<view class="flex justify-center" style="font-size: 34upx;margin-top: 50upx;">订单核销</view>
					<view class="" style="margin-left: 22upx;margin-top: 26upx;width: 480upx;height: 188upx;border-radius: 10upx;background-color: #fcf9ea;">
						<view class="flex " style="padding-top: 32upx;padding-bottom: 40upx;">
							<view style="margin-left: 18upx;">
								<image :src="Imges" style="width: 134upx;height: 134upx;border-radius: 10upx;"></image>
							</view>
							<view style="margin-left: 25upx;width: 100%;">
								<view style="font-size: 28upx;color: #333333;height: 76upx;width: 300upx;" class="shengLv">
									<text>{{SetMealNames}}</text>
								</view>
							
								<view class="flex justify-between shengLvs">
									<view style="font-size: 24upx;color: #999999;margin-top: 30upx;width: 300upx;">订单号：{{objects.Data.OrderNO}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center" style="margin-top: 40upx;">
						<view style="font-size: 28upx;color: #333333;font-weight: 600;margin-left: 22upx;">核销数量</view>
						<view style="font-size: 36upx;color: #f34e2d;font-weight: 600;margin-right: 22upx;">{{shuZi}}</view>
					</view>
					<view  @tap="sureShop" class="flex justify-center align-center" style="margin-top: 30upx;">
						<view class="flex justify-center align-center" style="color: #ffffff;width: 300upx;height: 80upx;line-height: 80upx;background-color: #fe4e01;border-radius: 50upx;">
							<view>确认核销</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import payradio from '@/components/payRadio/payRadio.vue'
	import tuiModal from "@/components/modal/modal"
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment,
		decrypt
	} from '@/common/handle.js'
	export default {
		components: {
			uniGrid,
			tuiModal,
			payradio
		},
		watch: {
			
		},
		data() {
			return {
				isChecked:false,
				checkboxData:[
					
				],
				checkedArr:[], //复选框选中的值
				allChecked:false ,//是否全选
				params:'',
				infoObject: {},
				objects:{},
				Ids:0,
				tcList:[],
				OrderNOs:0,
				SetMealNames:'',
				zongHe:0,
				Imges:'',
				SetMeaIds:0,
				codeList:[],
				codeSort:'',
				Ids:'',
				show: false,
				shuZi:0
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

		},
		onLoad(option) {
			var _self = this;
			_self.userInfo = uni.getStorageSync('userInfo')
			
			// #ifdef MP-WEIXIN
			if (_self.userInfo.ID) {
				//如果用户登录的，那就不需要授权
				
				_self.needWxVerify = false;
				
			} else {
				_self.needWxVerify = true
				//如果用户没有登录，所以需要微信授权
				uni.navigateTo({
					url:`/pages/common/login?isBack=back`
					
				})
			}
			// #endif
			
			
			// 获取扫描二维码参数
			if (option.q) {
				console.log(option.q);
				let t = option.q
				t = decodeURIComponent(t)
				let arr = t.split('?')
				let param = arr[1].split('&')
				let params = arr[1].split('&')
				param = param[0].split('=')
				params = params[1].split('=')
				console.log(param);
				console.log(params);
				this.params = params[1]
				
				this.$http.scanId(params[1],this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.objects = res
						this.tcList = res.Data.BLI
						this.SetMealNames = res.Data.BLI[0].SetMealName
						this.SetMeaIds = res.Data.BLI[0].SetMealId
						this.Imges = res.Data.BLI[0].Imge
						this.OrderNOs = res.Data.OrderNO
						console.log(this.objects);
						this.zongHe = this.changeMoney(res.Data.TotalPrice)
						this.checkboxData = res.Data.BLI
						this.Ids = res.Data.Id
						
						res.Data.BLI.forEach((item,i) => {
							console.log(item);
							this.codeList[i] = item.Code
							console.log(this.codeList[i]);
						})
						
						this.$http.tcXq(this.SetMeaIds).then(resa => {
							if(resa.IsSuccess){
								console.log(resa,'获取');
								this.$http.shangjia(resa.SetDataMeal.StoreID, this.$store.state.userInfo.ID).then(resb => {
									console.log(resb,'成功');
									this.infoObject = resb
								})
							} else {
								this.$api.msg(res.Msg,2000)
							}
						})
					} else {
						this.$api.msg(res.Msg,2000)
					}
				})
			} else {
				console.log(option);
				console.log(option.list,option.lists);
				// let t = _this.urls
				// let arr = t.split('?')
				// let param = list[1].split('&')
				// let params = list[1].split('&')
				// param = param[0].split('=')
				// params = params[1].split('=')
				// console.log(param);
				// console.log(params);
				// this.params = params[1]
				this.list = option.list
				this.lists = option.lists
				this.$http.scanId(option.lists,this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.objects = res
						this.tcList = res.Data.BLI
						this.SetMealNames = res.Data.BLI[0].SetMealName
						this.SetMeaIds = res.Data.BLI[0].SetMealId
						this.Imges = res.Data.BLI[0].Imge
						this.OrderNOs = res.Data.OrderNO
						console.log(this.objects);
						this.zongHe = this.changeMoney(res.Data.TotalPrice)
						this.checkboxData = res.Data.BLI
						this.Ids = res.Data.Id
						
						res.Data.BLI.forEach((item,i) => {
							console.log(item);
							this.codeList[i] = item.Code
							console.log(this.codeList[i]);
						})
						
						this.$http.tcXq(this.SetMeaIds).then(resa => {
							if(resa.IsSuccess){
								console.log(resa,'获取');
								this.$http.shangjia(resa.SetDataMeal.StoreID, this.$store.state.userInfo.ID).then(resb => {
									console.log(resb,'成功');
									this.infoObject = resb
								})
							} else {
								this.$api.msg(res.Msg,2000)
							}
						})
					} else {
						this.$api.msg(res.Msg,2000)
					}
				})
			}
		},
		methods: {
			gotoHe(){
				if(this.codeSort.length > 0){
					this.show = true
				} else {
					this.$api.msg('请选择核销码')
				}
				 
			},
			sureShop(){
				this.$http.tcApplied(this.Ids,this.codeSort, this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.show = false
						this.$api.msg('核销成功')
						uni.navigateTo({
							url:'/pages/shopDetail/successVer?Ids=' + this.Ids + '&codeSort=' + this.codeSort
						})
					} else {
						this.show = false
						this.$api.msg('核销失败')
					}
				})
				
			},
			checkboxChange(e) {
				let values = e.detail.value;
				if(values[0]==1){
					this.isChecked=true;
				}else{
					this.isChecked=false;
				}
			},
			// 多选复选框改变事件
			changeCheckbox(e){
				console.log(e);
				this.checkedArr = e.detail.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				
				this.codeSort = e.detail.value
				this.codeSort = this.codeSort.join(",")
				console.log(this.codeSort);
				
				if(this.checkedArr.length>0 && this.checkedArr.length==this.checkboxData.length){
					this.allChecked=true;
					this.shuZi = Number(this.codeSort.split(',').length)
					console.log(this.shuZi,'逻辑1');
					
				}else{
					this.allChecked = false;
					this.shuZi = Number(this.codeSort.split(',').length)
					if(this.codeSort.length == 0){
						this.shuZi = 0
					}
					
					console.log(this.shuZi,'逻辑2');
				}
			},
			// 全选事件
			allChoose(e){
				console.log(e);
				let chooseItem = e.detail.value;
				// 全选
				if(chooseItem[0]=='all'){
					this.allChecked=true;
					this.checkboxData.forEach((res,i) => {
						let itemVal=String(i);
						if(!this.checkedArr.includes(itemVal)){
							this.checkedArr.push(itemVal);
						}
					})
					
					this.codeSort = this.codeList.join(",")
					console.log(this.codeSort);
					this.shuZi = Number(this.codeSort.split(',').length)
					console.log(this.shuZi,'逻辑3');
				}else{
					// 取消全选
					this.allChecked=false;
					this.checkedArr=[];
					this.codeSort = ''
					this.shuZi = 0
					console.log(this.shuZi,'逻辑4');
				}
			},
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
				this.switchB = !this.switchB;

				let inputMoney = this.money //输入的金额
				if (Number(inputMoney) > 0) {
					//说明里面输入的有值
					this.changeMoney();
				}
				
				if(this.switchB == false) {
					// #ifdef MP-WEIXIN || H5
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
						this.$http.loginWithCode(this.phone, this.code, endTime, this.StoreID ||  this.$store.state.tjrid)
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
								this.wxInfo.openid, this.wxInfo.unionid, this.StoreID, this.yyyid)
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
							this.StoreID || 0, this.yyyid || 0)
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
				// #ifdef MP-WEIXIN || H5
				this.radio = 3
				// #endif
				// #ifdef MP-ALIPAY
				this.radio = 2
				// #endif
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
					// #ifdef MP-WEIXIN || H5
					this.radio = 3
					// #endif
					// #ifdef MP-ALIPAY
					this.radio = 2
					// #endif
				}else{
					// #ifdef MP-WEIXIN || H5
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
				
				if(this.zk){
					this.needPay = this.getFloat(this.money * this.zk,2) 
					console.log(this.needPay);
					this.discountPay = this.getFloat( this.money - this.money * this.zk,2) 
					
				} else {
					this.needPay = this.money
					this.discountPay = 0
					console.log(this.needPay);
				}
				
				
				this.hbXs = true
				this.switchB = false
				
				// #ifdef MP-WEIXIN || H5
				this.radio = 3
				// #endif
				// #ifdef MP-ALIPAY
				this.radio = 2
				// #endif
				
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			yinHangs(bankNumber){
				if(bankNumber.length > 34){
					return bankNumber.substr(0,34)+"...";
				} else {
					return bankNumber;
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #ffffff;
	}
</style>

<style lang="scss">
	page {
		background-color: #ffffff;
	}
			
	/* #ifdef H5 */
	uni-checkbox .uni-checkbox-input {
	  border-radius: 50% !important;
	  color: #ffffff !important;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	  border: none !important;
	  background: #fe4e01;
		border-color: #fe4e01;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before {
		width: 20rpx;
		height: 20rpx;
		line-height: 20rpx;
		text-align: center;
		font-size: 18rpx;
		color: #fe4e01;
		background: transparent;
		// transform: translate(-70%, -50%) scale(1);
		// -webkit-transform: translate(-70%, -50%) scale(1);
	}
	
	/* #endif */
	/* 微信样式 */
	/* #ifdef APP-PLUS ||MP-WEIXIN */
	checkbox .wx-checkbox-input {
	  border-radius: 50% !important;
	  color: #ffffff !important;
	  transform:scale(0.7,0.7);
	}
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  color: #fe4e01;
	  background: #ffffff;
	  transform:scale(0.7,0.7);
	}
	
	.wx-checkbox-input.wx-checkbox-input-checked {
	  // border: none !important;
	}
	
	/* #endif */
	
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
	
	.shengLvs{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow:hidden;
	}
</style>
