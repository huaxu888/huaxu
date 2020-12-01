<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">代理支付</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">代理支付</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="flex flex-direction  justify-center margin-top-lg ">
			<view class="margin-lr text-gray"><text>代理金额</text></view>
			<view class="margin margin-top-sm  flex align-center padding-bottom-xs" style="border-bottom: 1px solid #F0F0F0;">
				<text style="font-size: 60upx;" class="margin-right-xs">&yen;</text>
				<input type="digit" placeholder-style="font-size: 45upx;" :value="money" maxlength="11" adjust-position="false"
				 disabled="disabled" confirm-type="done" style="font-size: 65upx;height: 80upx; " />
			</view>
		</view>

		<view class="bg-gray" style="height: 20upx;"></view>
		<view class="text-lg margin-left-xl margin-top" style="font-weight: 600;">选择支付方式</view>
		<view>
			<view>
				<radio-group class="block margin-top-sm" @change="RadioChange">
					<!-- <view class="cu-form-group">
						<view class="flex  align-center  margin-left-sm">
							<view class="hxIcon-yue1 text-yellow" style="font-size:50upx;"></view>
							<view class="margin-left-sm">余额支付</view>
						</view>
						<radio class='red margin-left-sm ' :class="radio==3?'checked':''" :checked="radio==3?true:false" value="3"></radio>
					</view> -->
					<!-- #ifndef MP-WEIXIN -->
					<view class="cu-form-group">
						<view class="flex align-center margin-left-sm">
							<view class="hxIcon-zhifubao2 text-blue" style="font-size:50upx;"></view>
							<view class="margin-left-sm">支付宝支付</view>
						</view>
						<radio class='red margin-left-sm ' :class="radio==1?'checked':''" :checked="radio==1?true:false" value="1"></radio>
					</view>
					<!-- #endif -->

					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="flex  align-center margin-left-sm ">
							<view class="hxIcon-weixin2 text-green" style="font-size:50upx;"></view>
							<view class="margin-left-sm ">微信支付</view>
						</view>
						<view>
							<radio class='red margin-left-sm ' :class="radio==2?'checked':''" :checked="radio==2?true:false" value="2"></radio>
						</view>
					</view>
					<!-- #endif -->
					<view class="cu-form-group"></view>
				</radio-group>
			</view>
		</view>

		<view class="flex justify-center">
			<button @tap="topay" class="cu-btn  bg-red shadow text-xl sure" style="width: 690upx;">
				确认支付
				<text>&yen;</text>
				<text class="text-xxl">{{money}}</text>
			</button>
		</view>

		<view class="cu-modal bottom-modal " :class="modalNameShow ? 'show' : ''">
			<view class="cu-dialog">
				<uni-grid @close="hideModal" @fullclose="fullclose" />
			</view>
		</view>
	</view>
</template>

<script>
	import { appPayment, alipayAppletsPay, wxAppletsPay } from '@/common/handle.js'
	import uniGrid from '@/components/uni-grid/uni-grid.vue';

	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				modalNameShow: false, //是否弹出支付窗口
				money: 300, //金额
				radio: '3', //支付方式
				userInfo: {}, //用户信息
				openid: '',
				userid: '',
				user_id: '',
				tips: '',
				sort: '', //代理方式
				tag:1,//个人代理类型(1：个人代理，2：高级代理)
				Uname:'',
				area:''
			};
		},
		onLoad(option) {
			var _self = this;
			
			
			_self.Uname = option.Uname;
			_self.sort = option.sort;
			
			if (_self.sort == 5) {//个人！！！！！！！！！！！！！！！！！！！
				//说明是个人代理
				_self.area = option.area
				_self.money = 300;
				_self.tag = 1;
				
			} else if (_self.sort == 6) {//高级！！！！！！！！！！！！！！！！！！！！！！！！！！
				//说明是高级
				_self.money = 3000;
				_self.tag = 2;
			}
		
			
			if (_self.$store.state.userInfo.ID) {
				_self.userInfo = _self.$store.state.userInfo;
			} else {
				_self.userInfo = null;
			}

		},
		methods: {
			async dlzf(pwd) {
				var self = this;
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd)
				if (IsSuccess) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/scores/czdl',
						data: {
							userid: self.userInfo.ID,
							sort: self.radio, //充值方式 1 支付宝 2 微信
							tag: self.tag, //个人代理类型
							name:self.Uname,
							area:self.area,
							phone:''
						},
						success: function(res) {34  
							self.tips = JSON.stringify(res);
							if (res.data.IsSuccess) {
								self.$api.refreshUserInfo(self.userInfo.ID, self);
								uni.navigateTo({
									//跳转至等待审核界面
									url: "/pages/changeBusiness/waitSubmit?type=dl"
								})
							} else {
								self.$api.msg(res.data.Msg);
							}
						},
						fail: function(res) {
							self.$api.msg('请求失败')
						}
					})
				} else {
					this.$api.msg('请输入正确的密码')
				}
			},
			fullclose(e) {
				this.modalNameShow = e.modalNameShow;
				this.dlzf(e.pwd); //代理支付
			},
			hideModal(e) {
				//当点击关闭
				this.modalNameShow = e.modalNameShow;
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			topay() {
				let self = this;
				let orderInfo = (new Date()).getTime()
				//如果金额大于0   

				if (this.radio == '3') {
					//调用密码框
					self.modalNameShow = true;
					
					
				} else if (this.radio == '1') { //支付宝
				
					// #ifdef APP-PLUS
					appPayment(self.money, '代理开通', self.$store.state.userInfo.ID, '支付宝', orderInfo)
					.then(res => {
						console.log(res);
						this.$http.getProxy(self.$store.state.userInfo.ID, self.radio, self.tag, self.Uname)
						.then(res => {
							uni.showModal({
								content: '开通代理成功',
								showCancel: false,
								success: (res) => {
									if(res.confirm) {
										uni.navigateTo({
											url: '/pages/agency/applicationAgency'
										})
									}
								}
							})
						})
					})
					.catch(err => {
						console.log(err);
					})
					// #endif
					// #ifdef MP-ALIPAY
					alipayAppletsPay(self.money, '代理开通', self.$store.state.userInfo.ID, orderInfo)
					.then(res => {
						console.log(res);
						this.$http.getProxy(self.$store.state.userInfo.ID, self.radio, self.tag, self.Uname)
						.then(res => {
							uni.showModal({
								content: '开通代理成功',
								showCancel: false,
								success: (res) => {
									if(res.confirm) {
										uni.navigateTo({
											url: '/pages/agency/applicationAgency'
										})
									}
								}
							})
						})
					})
					.catch(err => {
						console.log(err);
					})
					// #endif
				} else if (this.radio == '2') { //微信
					// #ifdef APP-PLUS
					appPayment(self.money, '代理开通', self.$store.state.userInfo.ID, '微信', orderInfo)
					.then(res => {
						console.log(res);
						this.$http.getProxy(self.$store.state.userInfo.ID, self.radio, self.tag, self.Uname)
						.then(res => {
							uni.showModal({
								content: '开通代理成功',
								showCancel: false,
								success: (res) => {
									if(res.confirm) {
										uni.navigateTo({
											url: '/pages/agency/applicationAgency'
										})
									}
								}
							})
						})
					})
					.catch(err => {
						console.log(err);
					})
					// #endif
					// #ifdef MP-WEIXIN
					wxAppletsPay(self.money, '代理开通', orderInfo)
					.then(res => {
						console.log(res);
						this.$http.getProxy(self.$store.state.userInfo.ID, self.radio, self.tag, self.Uname)
						.then(res => {
							uni.showModal({
								content: '开通代理成功',
								showCancel: false,
								success: (res) => {
									if(res.confirm) {
										uni.navigateTo({
											url: '/pages/agency/applicationAgency'
										})
									}
								}
							})
						})
					})
					.catch(err => {
						console.log(err);
					})
					// #endif
				}
			}
		}
	}
</script>

<style>
	.b {
		border: 1px solid #39b54a;
	}

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
	}

	view {
		font-size: 28upx;
		line-height: inherit;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.line {
		border-top: 1px solid #cccccc;
		width: 100upx;
		margin: 25upx;
	}
	
	.sure {
		margin-top: 40upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #fb9c67, #fc6660);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	}
</style>
