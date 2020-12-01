<template>
	<view class="hx-input flex align-center" :style="{borderBottom: focused ? `${borderBottomHeight}px solid ${focusColor}` :
		`${borderBottomHeight}px solid ${blurColor}` }"
	 :class="[hasLRPadding ? 'lr-padding' : '', getPadding]">
		<input :type="type === 'password' ? 'text' : type" :password="type === 'password'" :focus="focused" :placeholder="placeholder"
		 :disabled="disable" :placeholder-style="`color:${blurColor}`" class="flex-sub" @focus="hxFocus" @blur="hxBlur"
		 @input="hxInput" :value="model">
		<view class="code" v-if="hasCode && type !== 'password'">
			<text class="cu-btn hx-btn radius" :class="{active: canGetCode}" @tap="getCode">{{ codeBth }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'hxInput',
		props: {
			// 设置 input 类型，默认为 text
			type: {
				type: String,
				default: 'text',
				validator: function(value) {
					return ['text', 'password', 'number', 'digit', 'idcard'].indexOf(value) !== -1
				}
			},
			model: {
				type: String,
				default: '',
			},
			// 提示
			disable: {
				type: Boolean,
				default: false
			},
			// 提示文本
			placeholder: {
				type: String,
				default: '请输入'
			},
			// 底部线条的宽度
			borderBottomHeight: {
				type: [String, Number],
				default: 1
			},
			// blur 状态下的颜色
			blurColor: {
				type: String,
				default: '#ddd'
			},
			// foucs 状态下的颜色
			focusColor: {
				type: String,
				default: '#EC3B46'
			},
			// 是否有左右边距，无边距则与底部线条左对齐，左边距只有 0 和 20upx 两个值
			hasLRPadding: {
				type: Boolean,
				default: false
			},
			// 输入区域与底部线条的距离，默认为 20upx
			paddingSize: {
				type: String,
				default: 'df',
				validator: function(value) {
					return ['sm', 'df', 'lg', 'none'].indexOf(value) !== -1
				}
			},
			// 是否显示【获取验证码】按钮
			hasCode: {
				type: Boolean,
				default: false
			},
			// 获取验证码功能需要传入电话号码
			phone: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				inputValue: '',
				focused: false,
				codeBth: '获取验证码',
				canGetCode: true
			}
		},
		methods: {
			hxInput: function(res) {
				this.inputValue = res.detail.value
				this.$emit('input', this.inputValue)
			},
			hxFocus: function(res) {
			},
			hxBlur: function(res) {
			},
			getCode: function(res) {
				let self = this
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.phone))) {
					self.$api.msg("手机号码有误，请重填");
				} else {
					if (self.codeBth === '获取验证码') {
						uni.request({
							url: 'https://newsapp.huaxuapp.com/api/sms/getyzm',
							data: {
								mobile: self.phone
							},
							success: (res) => {
								if (res.data.IsSuccess) {
									self.canGetCode = false
									let timer = 60
									self.codeBth = `${timer}s`;
									self.$store.commit('setTimer', (new Date()).getTime());
									let interval = setInterval(function() {
										timer--
										self.codeBth = `${timer}s`
										if (timer === 0) {
											clearInterval(interval)
											self.codeBth = '获取验证码'
											self.canGetCode = true
										}
									}, 1000)
								}
							},
							complete: function(res) {
								self.$api.msg(res.data.Msg)
							}
						})
					}
				}
			}
		},
		computed: {
			getPadding() {
				switch (this.paddingSize) {
					case 'sm':
						return 'sm-padding'
						break
					case 'df':
						return 'df-padding'
						break
					case 'lg':
						return 'lg-padding'
						break
					default:
						return ''
						break
				}
			},
			getRequired() {
				return this.hasCode
			}
		},
	}
</script>

<style scoped lang="scss">
	.hx-input {
		transition: all .3s ease-in-out;
	}

	.lr-padding {
		padding-left: 20upx;
		padding-right: 20upx;
	}

	.df-padding {
		padding-top: 20upx;
		padding-bottom: 20upx;
	}

	.sm-padding {
		padding-top: 10upx;
		padding-bottom: 10upx;
	}

	.lg-padding {
		padding-top: 30upx;
		padding-bottom: 30upx;
	}

	.cu-btn {
		background: #ffffff;
		opacity: .3;
		color: #fc6660;
		width: 200upx;
		font-size: 26upx;
		&.active {
			opacity: 1;
		}
	}
</style>
