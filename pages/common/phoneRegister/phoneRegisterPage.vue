<template>
	<view class="login-page flex flex-direction justify-between">
		<view class="panel">
			
			<cu-custom bgColor="bg-white" :leftAction="true">
				<!-- #ifdef APP-PLUS || H5 -->
				<block slot="left">
					<text class="cuIcon-close" style="color: #ec3a46;font-size: 48upx;" @tap="closeLogin"></text>
				</block>
				<!-- #endif -->
			</cu-custom>
 
			<view class="login-panel">
				<view class="flex justify-center">
					<image src="https://img.huaxuapp.com/huaxulogo.jpg" 
						mode="aspectFit" class="hx-avatar shadow bg-white"></image>
				</view>
			</view>

			<view class="login-field text-lg" 
				:class="phoneFocus || isPhone ? 'login-field-bottom-active' : 'login-field-bottom-normal'">
				<view class="phone-filed flex justify-between align-center">
					<text>+86</text>
					<input type="number" placeholder="请输入手机号" v-model="phone" 
					class="flex-sub padding-lr" @focus="fouces" @blur="blur" 
					:focus="phoneFocus" auto-focus="true" placeholder-style="color: #ddd"/>
					<view class="cuIcon-close text-white close-btn" v-if="clear" @tap="clearPhone"></view>
				</view>
			</view>
			<view class="get-code" @tap="getCode">
				<view class="cu-btn lg flex-sub radius text-white hx-btn" :class="isPhone ? '' : 'normal'">
					获取验证码
				</view>
			</view>
			<view class="notice">
				<text class="text-sm text-gray">未注册手机验证后将自动登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { validatePhone, sendCode } from '../../../common/handle.js'
	export default {
		data() {
			return {
				phoneFocus: true,
				canInput: false,
				phone: '',
				isPhone: false,
				code: '',
				clear: false,
				getData:{//发送数据需要的信息
					nickname:'',
					headimgurl:'',
					openid:'',
					phone:''
				},
				lastTime:0
			}
		},
		onShow () {
			this.lastTime = Date.now()
			// uni.getStorage({
			// 	key: 'userInfo',
			// 	success: function(res){
			// 		uni.switchTab({
			// 			url: '/pages/index/person'
			// 		})
			// 	}
			// })
		},
		onLoad(route) {
			this.lastTime = Date.now()
			this.getRoute(route)
		},
		methods: {
			getRoute(obj){//获取路由信息
				this.getData.nickname=obj.nickname
				this.getData.headimgurl=obj.headimgurl
				this.getData.openid=obj.openid
				this.getData.unionid=obj.unionid
			},
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
				var newTime = Date.now()
				var timeFlag = newTime - this.lastTime
				if(timeFlag >= 900){
					this.lastTime = newTime
					let self = this
					if (this.isPhone) {
						this.getData.phone=this.phone
						this.$Request.get(this.$store.state.getyzmUrl,
							{
								mobile: this.phone
							}
						).then(res=>{
							if(res.IsSuccess){
								self.$store.commit('setTimer', (new Date()).getTime())
								console.log(this.getData)
								uni.navigateTo({
									url: `/pages/common/phoneRegister/phoneRegisterPageTwo?phone=${self.phone}&nickname=${this.getData.nickname}&headimgurl=${this.getData.headimgurl}&openid=${this.getData.openid}&unionid=${self.getData.unionid}`
								})
							}else{
								self.$api.msg(res.Msg,2000)
							}
						})
					}
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
		border-bottom: 3upx solid #ec3a46;
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
		background-color: #ec3a46;
		
		&.normal {
			opacity: .3
		}
	}
</style>
