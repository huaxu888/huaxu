<template>
	<view class="bind-alipay">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定支付宝</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">绑定支付宝</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="panel">
			<cu-custom bgColor="bg-white" :isBack="true"></cu-custom>
			<view class="login-panel">
				<view class="flex justify-center">
					<image :src="alipayUser.avatar" 
						mode="aspectFit" class="hx-avatar shadow bg-white"></image>
				</view>
				<view class="text-bold justify-center flex padding">{{ alipayUser.nickName }}</view>
			</view>
			
			<view class="login-field text-lg"  :class="phoneFocus || isPhone ? 'login-field-bottom-active' : 'login-field-bottom-normal'">
				<view class="phone-filed flex justify-between align-center">
					<text>+86</text>
					<input type="number" placeholder="请输入手机号" v-model="phone" 
					class="flex-sub padding-lr" @focus="fouces" @blur="blur" 
					:focus="phoneFocus" placeholder-style="color: #ddd"/>
					<view class="cuIcon-close text-white close-btn" v-if="clear" @tap="clearPhone"></view>
				</view>
			</view>
			<view class="get-code" @tap="getCode">
				<view class="cu-btn lg flex-sub radius text-white hx-btn" :class="isPhone ? '' : 'normal'">
					绑定支付宝
				</view>
			</view>
	</view>
	</view>
</template>

<script>
	import { validatePhone } from '../../common/handle.js'
	export default {
		onLoad(option) {
			this.alipayUser.nickName = option.nickName
			this.alipayUser.avatar = option.avatar
		},
		data() {
			return {
				alipayUser: {
					nickName: '',
					avatar: ''
				},
				phoneFocus: true,
				canInput: false,
				phone: '',
				isPhone: false,
				code: '',
				clear: false,
			}
		},
		methods: {
			fouces: function (res) {
				this.phoneFocus = true
			},
			blur: function (res) {
				this.phoneFocus = false
			},
			clearPhone: function (res) {
				this.phone = ''
				this.clear = false
				this.phoneFocus = true
			},
			getCode: function () {
				let self = this
				if (this.isPhone) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/sms/getyzm',
						data: {
							mobile: this.phone
						},
						success:function(res){
							if (res.data.IsSuccess) {
								self.$store.commit('setTimer', (new Date()).getTime())
								uni.navigateTo({
									url: `/pages/common/loginWithCode?phone=${self.phone}&way=bindAlipay&avatar=${self.alipayUser.avatar}&nickName=${self.alipayUser.nickName}`
								})
							}
						},
						fail:function(res){
							console.log("支付宝登录res: " + JSON.stringify(res));
							self.$api.msg(res.data.Msg())
						},
					})
				}
			},
			closeLogin: function () {
				uni.navigateBack({
					delta: 1
				})
			},
			loginWithPass: function () {
				uni.navigateTo({
					url: '/pages/common/loginWithPass'
				})
			}
		},
		watch: {
			phone(value) {
				let self = this
				if (value.length === 11) {
					if (validatePhone(value, self)) {
						self.isPhone = true
					} else {
						setTimeout(function() {
							self.isPhone = false
							self.phone = ''
							self.phoneFocus = true
						}, 1500);
					}
				} else if (value.length === 0) {
					self.clear = false
					self.isPhone = false
				} else {
					self.clear = true
					self.isPhone = false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.login-page {
		height: 100vh;
	}
	
	.login-panel {
		margin-top: 70upx;
	}
	
	.hx-avatar {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 5upx solid #fff;
	}
	
	.login-field {
		margin: 70upx 70upx 0 70upx;
		padding-bottom: 20upx;
		transition: all 0.3s ease-in-out;
	}
	
	.login-field-bottom-normal {
		border-bottom: 3upx solid #ddd;
	}
	
	.login-field-bottom-active {
		border-bottom: 3upx solid #0081ff;
	}
	
	.close-btn {
		background: #999;
		padding: 7upx 6upx 5upx 6upx;
		border-radius: 50%;
	}
	
	.get-code {
		display: flex;
		margin: 70upx 70upx 0 70upx;
	}
	
	.notice {
		margin: 30upx 70upx 0 70upx;
	}
	
	.hx-btn {
		background-color: #0081ff;
		
		&.normal {
			opacity: .3
		}
	}
</style>
