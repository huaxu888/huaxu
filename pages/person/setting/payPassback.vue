<template>
	<view class="pass-page">
		<cu-custom bgColor="bg-white" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">设置交易密码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">设置交易密码</block>
			<!-- #endif -->
		</cu-custom>
		<view class="input-field bg-white">
			<hx-input :password="true" title="新交易密码" class="input" v-model="newPass"></hx-input>
			<hx-input :password="true" title="确认新交易密码" placeholder="请" class="input" 
				v-model="confirmPass">
			</hx-input>
			<view class="code-field">
				<hx-input title="验证码" class="input" v-model="code"></hx-input>
				<text class="cu-btn bg-red radius" @tap="getCode">{{ codeBtn }}</text>
			</view>
		</view>
		<view class="padding flex flex-direction margin-tb-sm bg-white" style="margin-top: 0;">
			<button @tap="confirm"
				:class="['cu-btn', active ? 'active-btn' : 'normal-btn', 'lg']">
				确认修改
			</button>
		</view>
	</view>
</template>

<script>
	import hxInput from '../../../components/inputField.vue'
	import { validatePass, genarateCode, sendCode } from '../../../common/handle.js'
	export default {
		components: {
			hxInput
		},
		data() {
			return {
				newPass: '',
				confirmPass: '',
				active: false,
				phone: '',
				code: '',
				codeGenrater: '',
				codeBtn: '获取验证码'
			}
		},
		onShow() {
			let self = this
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					self.localPass = res.data.Pwd
					self.phone = res.data.Phone
				}
			})
		},
		methods: {
			getCode: function () {
				let self = this
				if (self.codeBtn === '获取验证码') {
					if (self.phone.length !== 11) {
						self.$api.msg('没有登录，请登录后重试')
						setTimeout( function () {
							uni.navigateBack({
								delta: 2
							})
						}, 1200)
						return
					}
					let time = 60
					self.codeGenrater = genarateCode()
					sendCode(self.phone, self.codeGenrater, self)
					self.codeBtn = time + 's'
					let timer = setInterval(function(){
						self.codeBtn =  -- time + 's'
						 if ( time === 0 ) {
							 self.codeBtn = '获取验证码'
							 clearInterval(timer)
						 }
					}, 1000)
				}
			},
			validate: function () {
				let self = this
				if (self.code.length === 6) {
					if (self.code === self.codeGenrater) {
						if (self.newPass === self.confirmPass) {
							self.active = true
						} else {
							self.$api.msg('两次输入的密码不匹配')
							self.active = false
						}
					} else {
						self.$api.msg('验证码不正确')
						self.active = false
					}
				}
			},
			confirm: function () {
				let self = this
				if (self.active) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/menber/findjypwd',
						data: {
							no: self.phone,
							pwd: self.newPass
						},
						success: function (res) {
							setTimeout( function () {
								uni.navigateBack({
									delta: 1
								})
							}, 1200)
						},
						complete: function (res) {
							if (res.data.IsSuccess) {
								self.$api.msg('修改交易密码成功')
							}
						}
					})
				}
			}
		},
		watch: {
			newPass(oldValue) {
				this.validate()
			},
			confirmPass(oldValue) {
				this.validate()
			},
			code(oldValue) {
				this.validate()
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	
	.input-field {
		padding: 0 30upx;
	}
	
	.normal-btn {
		background-color: #f8f8f8;
		color: #333;
		transition: all 0.3s ease-in-out
	}
	
	.active-btn {
		background-color: #EC3B46;
		color: #fff;
		transition: all 0.3s ease-in-out
	}
	.code-field {
		display: flex;
		align-items: baseline;
		
		.input {
			flex: auto;
			padding-right: 10upx;
		}
		
		.cu-btn {
			width:  200upx;
		}
	}
</style>
