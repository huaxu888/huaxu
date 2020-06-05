<template>
	<view class="phone-page">
		<cu-custom bgColor="bg-white" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">修改手机号码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">修改手机号码</block>
			<!-- #endif -->
		</cu-custom>
		<view class="padding-left padding-right bg-white">
			<hx-input title="新手机号" v-model="phone"></hx-input>
		</view>
		<view class="code-field padding-left padding-right padding-bottom-xs bg-white">
			<hx-input title="验证码" class="input" v-model="code"></hx-input>
			<text class="cu-btn bg-red radius" @tap="getCode">{{ codeBtn }}</text>
		</view>
		<view class="action-bar">
			<view :class="['flex-twice radius text-center shadow', active ? 'submit-btn-active' : 'submit-btn']"
				@tap="submit">
				确定
			</view>
		</view>
	</view>
</template>

<script>
import hxInput from '../../../components/inputField';
import { validatePhone, genarateCode, sendCode } from '../../../common/handle.js'

export default {
	components: {
		hxInput
	},
	data() {
		return {
			active: false,
			phone: '',
			code: '',
			codeGenrater: '',
			codeBtn: '获取验证码',
			userInfo: this.$store.state.userInfo
		}
	},
	methods: {
		getCode: function () {
			let self = this
			if (self.codeBtn === '获取验证码') {
				if (!validatePhone(self.phone, self, false)) {
					self.$api.msg('请输入正确的电话号码')
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
			if (validatePhone(self.phone, self)) {
				if (self.code.length === 6) {
					if (self.code = self.codeGenrater) {
						self.active = true
					} else {
						self.$api.msg('验证码错误')
						self.active = false
					}
				}
			} 
		},
		submit: function () {
			let self = this
			if (this.active) {
				console.log(self.$store.state.userInfo.ID)
				uni.request({
					url:'https://newsapp.huaxuapp.com/api/menber/editphone',
					data: {
						userid: self.$store.state.userInfo.ID,
						phone: self.phone,
						picurl: self.$store.state.userInfo.FaceURL
					},
					success :function (res){
						if (res.data.IsSuccess) {
							self.userInfo.Phone = self.phone
							self.$store.commit('refresh', self.userInfo)
							setTimeout( function () {
								uni.navigateBack({
									delta: 1
								})
							}, 1200)
						}
					},
					fail: function(res){
						console.log('fali', res)
					},
					complete: function (res){
						self.$api.msg(res.data.Msg)
					}
				})
			}
		}
	},
	watch: {
		phone() {
			this.validate()
		},
		code () {
			this.validate()
		}
	},
}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	
.action-bar {
	display: flex;
	padding: 30upx;
	background-color: #ffffff;

	.back-btn {
		background: #f0f0f0;
		color: #333;
		height: 80upx;
		line-height: 80upx;
		margin-right: 15upx;
	}

	.submit-btn-active {
		color: #fff;
		height: 80upx;
		line-height: 80upx;
		background: #eb5245; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #ec3a46, #eb5245); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #ec3a46, #eb5245); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		transition: all 0.3s ease-in-out;
	}

	.submit-btn {
		color: #333;
		height: 80upx;
		line-height: 80upx;
		background: #f0f0f0;
		transition: all 0.3s ease-in-out;
	}
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
