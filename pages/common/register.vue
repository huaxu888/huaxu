<template>
	<view class="register-page">
		<cu-custom bgColor="bg-transparent" :leftAction="true" style="align-self: flex-start;">
			<block slot="left">
				<text class="cuIcon-close" style="color: #d94f52;font-size: 48upx;" @tap="closeLogin"></text>
			</block>
		</cu-custom>
		<view class="login-panel">
			<view class="hx-avatar flex flex-direction justify-center align-center">
				<view class="cu-avatar round" 
				style="background-image: url('https://img.huaxuapp.com/PNG%E7%89%88.png'); border: #FFFFFF solid 7upx;"></view>
				<text class="margin-top text-xxl">花蓄</text>
			</view>
			<view class="input-filed flex flex-direction justify-center">
				<view class="phone-filed">
					<hx-input v-model="phone" title="手机号" normalColor="#bbb" top="60"></hx-input>
				</view>
				<view class="phone-filed" v-if="isForgotPass == 0">
					<hx-input v-model="recPhone" title="推荐人手机号" normalColor="#bbb"></hx-input>
				</view>
				<view class="code-field">
					<hx-input title="验证码" class="input" v-model="code" normalColor="#bbb"></hx-input>
					<text class="cu-btn bg-red radius" @tap="getCode">{{ codeBtn }}</text>
				</view>
				<view class="pass-filed">
					<hx-input title="验证码" class="input" v-model="pwd" :password="true" normalColor="#bbb"
					:title="isForgotPass === '1' ? '新密码' : '6-20位登录密码'" placeholder="请设置"></hx-input>
				</view>
				<view class="repass-filed margin-bottom">
					<hx-input title="验证码" class="input" v-model="rePwd" :password="true" normalColor="#bbb"
					:title="isForgotPass === '1' ? '新密码' : '6-20位登录密码'" placeholder="请确认"></hx-input>
				</view>
				
				<view :class="redBg ? 'submit-red-bg' : '' + ' submit'" @tap="login" 
					class="flex cu-btn lg radius margin-top">
					<text class="login-btn">{{ isForgotPass === '0' ? '注册' : '完成' }}</text>
				</view>
				
				<view class="margin-tb flex justify-end" v-if="isForgotPass === '0'">
					<text @tap="loginPage" style="color: #ec404c;text-decoration: underline;">已有账号？去登录</text>
				</view>
				
			</view>
		</view>
		<!-- <third-login style="background-color: red;padding-top: 50upx;margin-bottom: 0;"></third-login> -->
	</view>
</template>

<script>
	import thirdLogin from '../../components/login/thirdLogin.vue'
	import hxInput from '../../components/inputField.vue'
	import { validatePhone, sendCode, genarateCode } from '../../common/handle.js'
	export default {
		components: { thirdLogin, hxInput },
		data() {
			return {
				redBg: false,
				canInput: false,
				phone: '',
				recPhone: '',
				pwd: '',
				rePwd: '',
				code: '',
				codeGenrater: '',
				isForgotPass: '0',
				codeBtn: '获取验证码'
			}
		},
		onLoad(option) {
			this.isForgotPass = option.isForgotPass
		},
		methods: {
			getCode: function () {
				let self = this
				if (self.codeBtn === '获取验证码') {
					if (self.phone.length !== 11) {
						self.$api.msg('您输入的电话号码无效，请输入的正确电话号码')
						return
					}
					self.canInput = false
					self.genarateCode = genarateCode()
					sendCode(self.phone, self.genarateCode, self)
					let time = 60
					self.codeBtn = time + 's'
					let timer = setInterval(function(){
						self.codeBtn =  -- time + 's'
						 if ( time === 0 ) {
							 self.codeBtn = '获取验证码'
							 self.canInput = false
							 clearInterval(timer)
						 }
					}, 1000)
				}
			},
			closeLogin: function () {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			loginPage: function () {
				uni.navigateBack({
					delta: 1
				})
			},
			login: function () {
				console.log(33493349)
				let self = this
				if (this.redBg) {
					if (self.code == self.genarateCode) {
						console.log(self.isForgotPass)
						switch (self.isForgotPass) {
							case '1':
								uni.request({
									url: 'https://newsapp.huaxuapp.com/api/menber/findpwd',
									data: {
										no: self.phone,
										pwd: self.pwd
									},
									success:function(res){
										uni.navigateBack({
											delta: 1
										})
									},
									complete:function(res){
										self.$api.msg(res.data.Mag)
									}
								})
								break
							case '0':
							 	return false
								uni.request({
									url: 'https://newsapp.huaxuapp.com/api/menber/newregister',
									data: {
										phone: this.phone,
										pwd: this.pwd,
										SiteId: 0
									},
									success: function (res) {
										if (res.data.IsSuccess) {
											uni.navigateBack({
												delta: 1
											})
										} else {
											return false
										}
									},
									complete: function (res) {
										self.$api.msg(res.data.Msg)
									}
								})
								break
							default: break
						}
					} else {
						self.$api.msg('验证码错误')
					}
				}
			}
		},
		watch: {
			phone (val) {
				if (validatePhone(val, this) && this.code !== '' && this.pwd !== '' && this.rePwd !== '') {
					this.redBg = true
				} else {
					this.redBg = false
				}
			},
			recPhone (val) {
				validatePhone(val, this)
			},
			code (oldValue) {
				if (oldValue !== '' && validatePhone(this.phone, this, true) && this.pwd !== '' && this.rePwd !== '') {
					this.redBg = true
				} else {
					this.redBg = false
				}
			},
			pwd (oldValue) {
				if (oldValue !== '' && validatePhone(this.phone, this, true) && this.code !== '' && this.rePwd !== '') {
					this.redBg = true
				} else {
					this.redBg = false
				}
			},
			rePwd (oldValue) {
				if (oldValue.length === this.pwd.length) {
					if (oldValue !== this.pwd) {
						this.$api.msg('两次输入的密码不匹配，请重新输入')
					} else if (validatePhone(this.phone, this, true) && this.code !== '' && this.pwd !== '') {
						this.redBg = true
					} else {
						this.redBg =false
					}
				} else {	
					this.redBg = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.register-page {
	height: 100%;
	width: 100%;
	background-image: url('https://img.huaxuapp.com/%E8%83%8C%E6%99%AF1.jpg');
	background-size: cover;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
}

.login-panel {
	border-radius: 20upx;
	width: 650upx;
	
	.cu-avatar {
		width: 180upx;
		height: 180upx;
	}
	
	.cu-avatar + text {
		color: #d94f52;
	}
}

.input-filed {
	padding: 30upx 60upx;
}

.submit {
	text-align: center;
	background-color: #f0f0f0;
	transition: background-color .5s ease-in-out;
	
	.login-btn {
		color: #999;
	}
}

.submit-red-bg {
	text-align: center;
	background-color: #ec404c;
	transition: background-color .5s ease-in-out;
	
	.login-btn {
		color: #FFFFFF;
	}
}

.code-field {
		display: flex;
		align-items: baseline;
		
		.input {
			flex: auto;
			margin-right: 10upx;
		}
		
		.cu-btn {
			min-width:  210upx;
		}
	}
</style>
