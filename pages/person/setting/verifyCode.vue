<template>
	<view class="login-with-code-page">
		<cu-custom bgColor='bg-transparent' :isBack="true"></cu-custom>
		<view class="flex flex-direction align-center margin-top">
			<text class="text-xl text-bold">
				输入验证码
			</text>
			<text class="margin-top-sm">短信已发送至 +86 {{phone}}</text>
			<view class="flex justify-between" style="position: relative;" @tap="setFocus">
				<view class="input-window bg-white text-center text-xl text-bold" :class="focusList[index] ? 'active' : ''" v-for="(item, index) in 6"
				 :key="index">
					{{ codeChar[index] === undefined ? '' : codeChar[index] }}
				</view>
				<input type="number" class="hidden-input" @blur="handleBlur" @focus="handleFocues" auto-focus="true" v-model="code"
				 :focus="focus" maxlength="6" />
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
				codeChar: [],
				focusList: [
					false, false, false, false, false, false,
				],
				timer: 60,
				cate: ''
			}
		},
		onLoad(option) {
			this.cate = option.cate
			this.phone = option.phone
			console.log(option);
		},
		onShow() {
			this.$set(this.focusList, 0, true)
			let self = this
			let t = setInterval(function() {
				if (self.timer === 0) {
					clearInterval(t)
				} else {
					self.timer--
				}
			}, 1000)
		},
		methods: {
			setFocus: function(res) {
				this.focus = true
			},
			handleFocues: function(res) {
				this.focus = true
			},
			handleBlur: function(res) {
				this.focus = false
			},
			chageFocus: function(index) {
				for (let i = 0; i < this.focusList.length; i++) {
					if (i === index) {
						this.$set(this.focusList, index, true)
					} else {
						this.$set(this.focusList, index, false)
					}
				}
			},
			getCode: function(res) {
				let self = this
				uni.request({
					url: 'https://newsapp.huaxuapp.com/api/sms/getyzm',
					data: {
						mobile: self.phone
					},
					success: function(res) {
						if (res.data.IsSuccess) {
							self.$store.commit('setTimer', (new Date()).getTime())
							self.code = ''
							self.timer = 60
							let t = setInterval(function() {
								if (self.timer === 0) {
									clearInterval(t)
								} else {
									self.timer--
								}
							}, 1000)
						}
					},
					fail: function(res) {
						self.$api.msg(res.data.Msg())
					}
				})
			}
		},
		watch: {
			code(newValue, oldVaule) {
				let self = this
				let nlength = newValue.length,
					olength = oldVaule.length
				self.codeChar = newValue.split('')
				if (nlength > olength) {
					self.$set(self.focusList, nlength, true)
				} else {
					self.$set(self.focusList, olength, false)
				}
				if (nlength === 6) {
					let startTime = self.$store.state.timer,
						endTime = (new Date()).getTime()
					if ((endTime - startTime) >= 1000 * 60 * 3) {
						self.$api.msg('验证码超时')
					} else {
						console.log('进入到else');
						uni.request({
							url: 'https://newsapp.huaxuapp.com/api/menber/yzmislost',
							data: {
								phone: self.phone,
								yzm: newValue,
								dt: self.$store.state.timer
							},
							success: function(res) {
								console.log("IsSuccess？")
								console.log(res);
								if (res.data.IsSuccess) {
									console.log("IsSuccess");
									switch (self.cate) {
										case 'payPass':
											uni.navigateTo({
												url: `/pages/person/setting/pass?cate=pay`
											})
											break;
										case 'phone':
											console.log("userid=" + self.$store.state.userInfo.ID + "&" + "phone=" + self.phone + "&" + "picurl=" +
												self.$store.state.userInfo.FaceURL);

											uni.request({
												url: 'https://newsapp.huaxuapp.com/api/menber/editphone',
												data: {
													userid: self.$store.state.userInfo.ID,
													phone: self.phone,
													picurl: encodeURIComponent(self.$store.state.userInfo.FaceURL)
												},
												success: function(res) {

													console.log(res.data.Msg);
													
													if (res.data.IsSuccess) {
														self.$api.refreshUserInfo(self.userInfo.ID, self);
														self.$api.msg('修改成功', 1500);
														setTimeout(() => {
															uni.switchTab({
																url: '/pages/index/index'
															});
														}, 2000);
													}else{
														self.$api.msg(res.data.Msg, 1500);
														
														setTimeout(() => {
															uni.switchTab({
																url: '/pages/index/person'
															});
														}, 2000);
													
														
													}
												},
												fail: function(res) {
													console.log(res);

												},
												complete: function(res) {


												}
											})
											break;
										default:
                                            uni.navigateTo({
                                                url: `/pages/person/setting/pass?cate=pass&phone=${self.phone}`
                                            })
											break;
									}

								}else{
									console.log("err");
								}
							},
							fail: function(res) {
								self.$api.msg(res.data.Msg)
								console.log('验证验证码出错', res)
							}
						})
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
