<template>
	<view class="login-with-pass-page flex flex-direction justify-between">
		<view class="panle">
			<cu-custom bgColor="bg-transparent" :isBack="true">
				<!-- #ifdef APP-PLUS || H5 -->
					<block slot="right">
						<text class="padding-right" @tap="loginWithPhone">免密码登录</text>
					</block>
				<!-- #endif -->
			</cu-custom>
			
			<view class="login-panel">
				<view class="flex justify-center">
					<image src="http://img.huaxuapp.com/huaxulogo.jpg" 
						mode="aspectFit" class="hx-avatar shadow bg-white"></image>
				</view>
			</view>
			
			<view>
				<view class="login-field text-lg" 
					:class="pFocus || correctPhone ? 'login-field-bottom-active' : 'login-field-bottom-normal'">
					<view class="phone-filed flex justify-between align-center">
						<input type="number" placeholder="请输入手机号" v-model="phone" maxlength="11"
						class="flex-sub" @focus="phoneFocu" @blur="phoneBlur" 
						:focus="pFocus" auto-focus="true" placeholder-style="color: #ddd"/>
						<view class="cuIcon-close text-white close-btn" 
							v-if="pClear" @tap="clearPhone"></view>
					</view>
				</view>
				<view class="login-field text-lg" style="margin-top: 30upx;"
					:class="cFocus || correctCode ? 'login-field-bottom-active' : 'login-field-bottom-normal'">
					<view class="phone-filed flex justify-between align-center">
						<input type="text" placeholder="请输入密码" 
						v-model="pass" :password="isPassword" class="flex-sub" @focus="codeFocu" @blur="codeBlur" 
						:focus="cFocus" placeholder-style="color: #ddd"/>
						<view class="text-white close-btn margin-right-xs" v-if="cClear" @tap="chagePwd"
						:class="isPassword ? 'hxIcon-yanjing': 'hxIcon-yanjing1' " ></view>
						<view class="cuIcon-close text-white close-btn" 
							v-if="cClear" @tap="clearPass"></view>
					</view>
				</view>
			</view>
			
			<view class="get-code">
				<view class="cu-btn lg flex-sub radius text-white hx-btn"  @tap="login"
					:class="correctPhone && correctCode ? '' : 'normal'">
					登录
				</view>
			</view>
			<view class="notice flex justify-between">
				<navigator url="/pages/common/login" hover-class="none">
					<text class="text-red">免密登录/登录注册</text>
				</navigator>
				
				<navigator url="/pages/common/forgetPass" hover-class="none">
					<text class="text-red">忘记密码?</text>
				</navigator>
			</view>
		</view>
		
		<view class="footer">
			<thrid-login :showmima="false"></thrid-login>
		</view>
	</view>
</template>

<script>
	import thridLogin from '../../components/login/thirdLogin.vue'
	import { validatePhone } from '../../common/handle.js'
	export default {
		components: { thridLogin },
		data() {
			return {
				phone: '',
				pFocus: true,
				cFocus: false,
				correctPhone: false,
				correctCode: false,
				pass: '',
				pClear: false,
				cClear: false,
				isPassword: true,
			}
		},
		onShow(){
			// #ifdef MP-WEIXIN
				this.wxLogin()
			// #endif
		},
		methods: {
			wxLogin(){
				uni.login({//登陆接口
					provider:'weixin',
					scopes:'auth_base',
					timeout:20000,
				}).then(res=>{
					console.log(res)
				})
			},
			loginWithPhone: function () {
				uni.navigateTo(
					{
						url:'/pages/common/login'
					}
				)
			},
			chagePwd: function () {
				this.isPassword = !this.isPassword
			},
			forgetPass: function () {
				uni.navigateTo({
					url: '/pages/common/register?isForgotPass=1'
				})
			},
			phoneFocu: function (res) {
				this.pFocus = true
				this.cClear = false
			},
			phoneBlur: function (res) {
				this.pFocus = false
			},
			clearPhone: function (res) {
				this.pClear = false
				this.phone = ''
				this.pFocus = true
			},
			clearPass: function (res) {
				this.cClear = false
				this.pass = ''
				this.cFocus = true
			},
			codeFocu: function (res) {
				this.cFocus = true
				this.pClear = false
			},
			codeBlur: function (res) {
				this.cFocus = false
			},
			login: function () {
				let self = this
				if (self.correctPhone && self.correctCode) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/menber/login',
						data: {
							no: self.phone,
							pwd: self.pass
						},
						success:function(res){
							let userInfo = res.data.Data
							if (res.data.IsSuccess) {
								uni.getStorage({
									key: 'userInfo',
									success:function(res){
										self.$store.commit('refresh', userInfo)
									},
									fail:function(res){
										self.$store.commit('login', userInfo)
									}
								})
								setTimeout(function() {
									uni.switchTab({
										url:'/pages/index/index'
									})
								}, 1200);
							} else {
								self.$api.msg(res.data.Msg)
							}
						},
						fail:function(res){
							console.log('登录出错', res);
							self.$api.msg(res.data.Msg)
						},
						complete: function (res) {
							console.log('登录', res);
						}
					})
				}
			}
		},
		watch: {
			phone(newValue) {
				let nlength = newValue.length
				if (nlength !== 0) {
					this.pClear = true
					if (nlength === 11) {
						if (validatePhone(newValue, this)) {
							this.correctPhone = true
						} else {
							this.correctPhone = false
						}
					} else {
						this.correctPhone = false
					}
				}
			},
			pass(newValue) {
				let nlength = newValue.length
				if (nlength !== 0) {
					if (nlength >= 6) {
						this.correctCode = true
						if (this.phone.length !== 11) {
							this.$api.msg('您输入的电话号码无效')
							this.correctPhone = false
							this.pFocus = true
						}
					} else {
						this.correctCode = false
					}
					this.cClear = true
				} else {
					this.correctCode = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-with-pass-page {
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
	
	.hx-btn {
		background-color: #ec3a46;
		
		&.normal {
			opacity: .3
		}
	}
	
	.notice {
		margin: 30upx 70upx 0 70upx;
	}
</style>
