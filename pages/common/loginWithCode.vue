<template>
	<view class="login-with-code-page">
		<cu-custom bgColor='bg-transparent' :isBack="true"></cu-custom>
		<view class="flex flex-direction align-center margin-top">
			<text class="text-xl text-bold">
				输入验证码
			</text>
			<text class="margin-top-sm">短信已发送至 +86 {{phone}}</text>
			<view class="flex justify-between" style="position: relative;" @tap="setFocus">
				<view class="input-window bg-white text-center text-xl text-bold"
					:class="focusList[index] ? 'active' : ''" v-for="(item, index) in 6" :key="index" >
					{{ codeChar[index] === undefined ? '' : codeChar[index] }}
				</view>
				<input type="number" class="hidden-input" @blur="handleBlur" @focus="handleFocues"
					auto-focus="true" v-model="code" :focus="focus" maxlength="6" />
			</view>
			<view class="notice flex">
				<text v-if="timer !== 0">
					{{ timer }}S 后可重新获取验证码
				</text>
				<view class="cu-btn lg radius" v-else @tap="getCode">
					重新获取验证码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '',
				phone: '',
				code: '',
				focus: true,
				codeChar:[],
				focusList: [
					false, false, false, false, false, false,
				],
				timer: 60,
				way: '',
				avatar: '',
				nickName: ''
			}
		},
		onLoad (option) {
			this.way = option.way
			this.phone = option.phone
			if (option.avatar) {
				this.avatar = option.avatar
				console.log("option.avatar: " + JSON.stringify(option.avatar));
			}
			if (option.nickName) {
				this.nickName = option.nickName
				console.log("option.nickName: " + JSON.stringify(option.nickName));
			}
		},
		onShow () {
			this.$set(this.focusList, 0, true)
			let self = this
			let t = setInterval( function () {
				if (self.timer === 0) {
					clearInterval(t)
				} else {
					self.timer --
				}
			}, 1000)
		},
		methods: {
			setFocus: function (res) {
				this.focus = true
			},
			handleFocues: function (res) {
				this.focus = true
			},
			handleBlur: function (res) {
				this.focus = false
			},
			chageFocus: function (index){
				for (let i = 0; i < this.focusList.length; i++) {
					if (i === index) {
						this.$set(this.focusList, index, true)
					} else {
						this.$set(this.focusList, index, false)
					}
				}
			},
			getCode: function (res) {
				let self = this
				uni.request({
					url: 'https://newsapp.huaxuapp.com/api/sms/getyzm',
					data: {
						mobile: self.phone
					},
					success:function(res){
						if (res.data.IsSuccess) {
							self.$store.commit('setTimer', (new Date()).getTime())
							self.code = ''
							self.timer = 60
							let t = setInterval( function () {
								if (self.timer === 0) {
									clearInterval(t)
								} else {
									self.timer --
								}
							}, 1000)
						}
					},
					fail:function(res){
						self.$api.msg(res.data.Msg())
					}
				})
			}
		},
		watch: {
			code(newValue, oldVaule) {
				let self = this
				let nlength = newValue.length, olength = oldVaule.length
				self.codeChar = newValue.split('')
				if (nlength > olength) {
					self.$set(self.focusList, nlength, true)
				} else {
					self.$set(self.focusList, olength, false)
				}
				if (nlength === 6) {
					let startTime = self.$store.state.timer, endTime = (new Date()).getTime()
					if ((endTime - startTime) >= 1000 * 60 * 3) {
						self.$api.msg('验证码超时')
					} else {
						switch (self.way){
							case 'forgetPass':
								uni.request({
									url: 'https://newsapp.huaxuapp.com/api/menber/yzmislost',
									data: {
										phone: self.phone,
										yzm: newValue,
										dt: self.$store.state.timer
									},
									success:function(res){
										if (res.data.IsSuccess) {
											uni.navigateTo({
												url: `/pages/person/setting/pass?cate=pass&phone=${self.phone}`
											})
										}
									},
									fail:function(res){
										self.$api.msg(res.data.Msg)
										console.log('验证验证码出错', res)
									}
								})
								break;
							case 'bindAlipay':
								uni.request({
									url: 'https://newsapp.huaxuapp.com/api/menber/yzmislost',
									data: {
										phone: self.phone,
										yzm: newValue,
										dt: self.$store.state.timer
									},
									success:function(res){
										if (res.data.IsSuccess) {
											// 开始绑定操作
											uni.request({
												url: 'https://newsapp.huaxuapp.com/api/menber/newloginbyphone',
												data: {
													phone: self.phone,
													yzm: newValue,
													dt: (new Date()).getTime()
												},
												success:function(res){
													let userInfo = res.data.Data
													if (res.data.IsSuccess) {
														uni.request({
															url: 'https://newsapp.huaxuapp.com/api/menber/bdzfb',
															data: {
																userid: userInfo.ID,
																zfbname: self.nickName,
															},
															success:function(res){
																console.log('绑定支付宝完成', res);
																if (res.data.IsSuccess) {
																	self.$api.msg('绑定完成')
																	setTimeout( function () {
																		uni.switchTab({
																			url: '/pages/index/person'
																		})
																	}, 1200)
																}
															},
															fail: function (res) {
																console.log('绑定支付宝失败', res);
																self.$api.msg('绑定支付宝失败')
															}
														})
													}
												}
											})
										}
										self.$api.msg(res.data.Msg)
									},
									fail:function(res){
										self.$api.msg(res.data.Msg)
										console.log('验证验证码出错', res)
									}
								})
								break;
							default:
								uni.request({
									url: 'https://newsapp.huaxuapp.com/api/menber/newloginbyphone',
									data: {
										phone: self.phone,
										yzm: newValue,
										dt: self.$store.state.timer,
                                        userid: self.$store.state.tjrid
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
										}
									},
									fail:function(res){
										console.log('注册登录出错', res)
									},
									complete:function(res){
										self.$api.msg(res.data.Msg)
									}
								})
								break;
						}
						
					}
				}	
			}
		},
	}
</script>

<style scoped lang="scss">
	.input-window {
		width: 60upx;
		height: 60upx;
		margin: 70upx 10upx;
		border-bottom: solid 2px #333;
		transition: all 0.3s ease-in-out;
		z-index: 9;
		position: relative;
        
		&.active {
			border-bottom: solid 2px #ec3a46;
		}
	}
	
	.hidden-input {
		position: absolute;
		left: -1000upx;
		top: 70upx;
		z-index: 0;
	}
</style>
