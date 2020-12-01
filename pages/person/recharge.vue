<template>
	<view class="recharge-page">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">{{ isRecharge ? '充值' : '提现' }}</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">{{ isRecharge ? '充值' : '提现' }}</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="hx-card margin bg-white">
			<view class="hx-card-title padding flex align-center">
				<text class="margin-right" style="margin-right: 100upx;width: 130upx;">{{ isRecharge ? '充值方式' : '提现方式' }}</text>
				<view class="text-gray text-sm light" v-if="!isRecharge">
					提现将收取提现金额 1% 的手续费，请悉知
				</view>
				<view class="text-gray text-sm light" v-else>
					{{paymentWay}}充值
				</view>
			</view>

			<radio-group class="block" @change="paymentChange">
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group" v-if="isRecharge">
					<view class="title flex align-center">
						<text class="hxIcon-weixin text-green margin-right-sm" style="font-size: 32upx;"></text>{{ isRecharge ? '微信支付' : '提现到微信' }}
					</view>
					<radio class="red" :class="paymentWay ==='微信' ? 'checked' : ''" :checked="paymentWay === '微信' ? true : false"
					 value="微信">
					</radio>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="cu-form-group" style="border-bottom: 1upx solid #ddd;border-top: 1upx solid #ddd;">
					<view class="title flex align-center">
						<text class="hxIcon-zhifubao text-blue margin-right-sm" style="font-size: 32upx;"></text>{{ isRecharge ? '支付宝支付' : '提现到支付宝' }}
					</view>
					<radio class="red" :class="paymentWay ==='支付宝' ? 'checked' : ''" :checked="paymentWay === '支付宝' ? true : false"
					 value="支付宝">
					</radio>
				</view>
				<!-- #endif -->

				<view class="cu-form-group" style="border-bottom: 1upx solid #ddd;border-top: 1upx solid #ddd;" v-if="!isRecharge">
					<view class="title flex align-center">
						<text class="hxIcon-weibiaoti3  margin-right-sm" style="font-size: 32upx;color: #59a79e;"></text>提现到银行卡
					</view>
					<radio class="red" :class="paymentWay ==='银行卡' ? 'checked' : ''" :checked="paymentWay === '银行卡' ? true : false"
					 value="银行卡">
					</radio>
				</view>
			</radio-group>

			<view class="hx-card-content padding">
				<text>{{ isRecharge ? '充值金额' : '提现金额' }}</text>
				<view class="amount-field margin-top-sm flex padding-bottom-sm" :class="focus || active ? 'active' : ''">
					<text class="text-bold text-xxl padding-right-sm">￥</text>
					<input type="digit" v-model="amount" :focus="focus" @focus="f" @blur="b" @input="changeMoney(amount)" class="flex-sub input text-bold text-sl" />
				</view>
			</view>


			<view class="flex padding-lr " :class="isRecharge ?'padding-tb':''">
				<text class="cu-btn lg radius flex-sub hx-btn" :class="active ? 'active' : ''" @tap="pay">
					下一步
				</text>
			</view>
			
			<view class="flex padding " v-if="!isRecharge">
				<text class="cu-btn round lg radius flex-sub" 
				style="border: 1px solid  #0081FF;background: transparent;color: #0081FF;"  @tap="navigateTo('/pages/person/txProgress')">
					提现明细
				</text>
			</view>
			<view class="flex padding-bottom padding-right align-center justify-end" v-else>
				<text class="text-gray" @tap="navigateTo('/pages/person/transactionRecord')">
					充值记录
					<text class="cuIcon-right margin-left-xs"></text>
				</text>
			</view>
			<!-- <view class="flex justify-center margin-bottom">
			<view >-</view><text style="font-size: 26upx;color: #BBBBBB;">提现进度</text><view >-</view>
			</view> -->
		</view>
		<view class="cu-modal bottom-modal " :class="inputPassWord?'show':''">
			<view class="cu-dialog">
				<uni-grid @close="hidePassModal" @fullclose="fullclose" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '../../components/uni-grid/uni-grid.vue'
    import {alipayAppletsPay, wxAppletsPay, appPayment} from '../../common/handle.js'
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				amount: '',
				active: false,
				focus: false,
				isRecharge: true,
				isShow: false,
				paymentWay: '微信',
				inputPassWord: false,
			}
		},
		onLoad(option) {
			if (option.isRecharge === 'true') {
				this.isRecharge = true
			} else {
				this.isRecharge = false
				this.paymentWay = "支付宝"
			}
			// #ifdef APP-PLUS || H5 || MP-ALIPAY
				this.paymentWay = '支付宝'
			// #endif
			
			// #ifdef MP-WEIXIN
			
			if(this.isRecharge){
				//说明是微信充值
				this.paymentWay = '微信'
			}else{
				//说明是微信提现
				this.paymentWay = '银行卡'
			}
		
			// #endif

		},
		methods: {
			navigateTo(route){
			 uni.navigateTo({
				 url: route
			 });
			},
			changeMoney(e) {
				setTimeout(() => {
					var index = this.amount.indexOf(".");
					if (index != -1) {
						//没有小数点
						var count = this.amount.length - (index + 1);
						if (count > 2) {
							this.amount = this.$api.formatAmount(this.amount);
						}
					}
				}, 0)
			},
			paymentChange: function(res) {
				console.log(res)
				this.paymentWay = res.detail.value
			},
			selectPaymentWay: function(res) {
				this.isShow = true
			},
			f: function(res) {
				this.focus = true
			},
			b: function(res) {
				this.focus = false
			},
			pay: function(res) {
				let self = this
				if (this.active) {
					if (this.isRecharge) {
						// 充值功能
						if (self.paymentWay === '微信') {
							// #ifdef MP-WEIXIN
							wxAppletsPay(self.amount, '余额充值')
                            .then( res => {
                                uni.showModal({
                                    title: '充值成功',
                                    content: `充值${self.amount}元`,
                                    showCancel: false,
                                    success: (res) => {
                                        if (res.confirm) {
                                            uni.navigateBack()
                                        }
                                    }
                                })
                            })
                            .catch( err => {
                                console.log('微信支付失败：', err);
                            })
							// #endif
                            // #ifdef APP-PLUS
                            appPayment(self.amount, '余额充值', self.$store.state.userInfo.ID)
                            .then( res => {
								console.log(res);
                                uni.showModal({
                                    title: '充值成功',
                                    content: `充值${self.amount}元`,
                                    showCancel: false,
                                    success: (res) => {
                                        if (res.confirm) {
                                            uni.navigateBack()
                                        }
                                    }
                                })
                            })
                            .catch( err => {
                                console.log('微信支付失败：', err);
                            })
                            // #endif
						} else {
                            // #ifdef MP-ALIPAY
                            alipayAppletsPay(self.amount, '余额充值', self.$store.state.userInfo.ID)
                            .then( res => {
                                uni.showModal({
                                    title: '充值成功',
                                    content: `充值${self.amount}元`,
                                    showCancel: false,
                                    success: (res) => {
                                        if (res.confirm) {
                                            uni.navigateBack()
                                        }
                                    }
                                })
                            })
                            .catch( err => {
                                console.log('支付宝支付失败：', err);
                            })
                            // #endif
                            // #ifdef APP-PLUS
                            appPayment(self.amount, '余额充值', self.$store.state.userInfo.ID, '支付宝')
                            .then( res => {
								console.log(res);
                                uni.showModal({
                                    title: '充值成功',
                                    content: `充值${self.amount}元`,
                                    showCancel: false,
                                    success: (res) => {
                                        if (res.confirm) {
                                            uni.navigateBack()
                                        }
                                    }
                                })
                            })
                            .catch( err => {
                                console.log('支付宝支付失败：', err);
                            })
                            // #endif
                        }
					} else {
						switch (self.paymentWay) {
							case '支付宝':
								if (self.$store.state.userInfo.ZhiFuBaoNo) {
									// 绑定了支付宝直接提现
									this.inputPassWord = true
								} else {
									uni.showModal({
										content: '提现到支付宝需要绑定支付宝账号',
										cancelText: '知道了',
										confirmText: '去绑定',
										success: res => {
											if (res.confirm) {
												uni.navigateTo({
													url: '/pages/person/myAlipay'
												})
											}
										},
									});
								}
								break;
							case '银行卡':
								if (self.$store.state.userInfo.BankNo) {
									this.inputPassWord = true
								} else {
									uni.showModal({
										content: '提现到银行卡需要绑定银行卡',
										cancelText: '知道了',
										confirmText: '去绑定',
										success: res => {
											if (res.confirm) {
												uni.navigateTo({
													url: '/pages/person/bindBank'
												})
											}
										},
									});
								}
								break;
							default:
								break;
						}
					}
				}
			},
			hidePassModal: function(res) {
				this.inputPassWord = false
			},
			fullclose: function(res) {
				let self = this,
					pwd2 = res.pwd
				this.inputPassWord = false;



				if (pwd2 === this.$store.state.userInfo.PwdAnswer) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/scores/tx',
						data: {
							userid: self.$store.state.userInfo.ID,
							num: self.amount,
							pwd: pwd2,
							sort: this.paymentWay === '支付宝' ? 1 : 3,
							openid: this.paymentWay === '支付宝' ? self.$store.state.userInfo.ZhiFuBaoNo : self.$store.state.userInfo.BankNo
						},
						success: function(res) {
							if (res.data.IsSuccess) {
								let func
								switch (self.paymentWay) {
									case '微信':
										func = 3
										break;
									case '银行卡':
										func = 4
										break;
									default:
										func = 2
										break;
								}
								let oddDate = new Date().toLocaleString('chinese', {
									hour12: false
								})
								setTimeout(function() {
									uni.navigateTo({
										url: `/pages/scan/paySuccess?dealType=交易成功&money=${self.amount}&opeFunction=${func}&oddDate=${oddDate}`
									})
								}, 1200);
							}
						},
						fail: function(res) {
							console.log('提现出错', res)
						},
						complete: function(res) {
							self.$api.msg(res.data.Msg)
						}
					})
				} else {
					this.$api.msg('支付密码不正确')
				}
			},
		},
		watch: {
			amount(newValue) {
				if (newValue !== '') {
					this.active = true
				} else {
					this.active = false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.hx-card {
		border: 1px #f3f3f3 solid;
		box-shadow: 1px 1px 3px #ddd, -1px -1px 3px #ddd;

		&-title {
			background: #f8f8f8;
		}

		.amount-field {
			border-bottom: 1px solid #ddd;
			transition: all .3s ease-in-out;

			&.active {
				border-bottom: 1px solid #eb5245;
			}

			.input {
				letter-spacing: 3upx;
				height: 1em;
				line-height: 1em;
			}
		}
	}

	.hx-btn {
		color: #fff;
		background: #eb5245;
		opacity: .3;

		&.active {
			opacity: 1;
		}
	}
</style>
