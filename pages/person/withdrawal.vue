<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">提现</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">提现</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="margin " style="background: #FFFFFF;padding-bottom: 6upx;">
			<view class="padding" style="background: #F8F8F8;">
				<view class="flex align-center justify-between ">
					<view class="text-bold margin-bottom-xl">提现方式</view>
					<view class="text-sm margin-bottom-xl" style="color: #CCCCCC;">所提现的金额必须为100的整数倍</view>
				</view>

				<view class="flex align-center ">

					<!-- <view class="margin-right-sm selectRadio" :class="withdrawalType == 1 ? 'hoverborder' : 'grayborder' " @tap="selectType(1)">
						<view class="checkBorder">
							<view class="text-white flex align-center justify-start " :class="withdrawalType == 1 ? 'checkTriangle' : '' ">
								<view style="transform: rotate(315deg);margin-left: 4upx;">
									<text class="hxIcon-gouxuan text-white"></text>
								</view>
							</view>
						</view>
						<view class="flex align-center justify-center " style="height: 160upx;">
							<text class="hxIcon-zhifubao" style="font-size: 55upx; color: #4eb3f7;"></text> <text class="text-bold margin-left-sm">支付宝</text>
						</view>
					</view> -->

					<view class="selectRadio" :class="withdrawalType == 3 ? 'hoverborder' : 'grayborder' " @tap="selectType(3)">
						<view class="checkBorder">
							<view class="text-white flex align-center justify-start " :class="withdrawalType == 3 ? 'checkTriangle' : '' ">
								<view style="transform: rotate(315deg);margin-left: 4upx;">
									<text class="hxIcon-gouxuan text-white"></text>
								</view>
							</view>
						</view>
						<view class="flex align-center justify-center" style="height: 160upx; ">
							<text class="hxIcon-yhksqre" style="font-size: 55upx; color: #ea9518;"></text> <text class="text-bold margin-left-sm">银行卡</text>
						</view>

					</view>
				</view>
			</view>
			<view class="padding" style="padding-bottom: 0;">
				<view class="text-bold margin-top-sm">提现金额</view>
				<view class=" margin-top  flex align-center " style="border-bottom: 1px solid #F0F0F0; margin-bottom: 0upx;">
					<text style="font-size: 50upx;" class="margin-right-xs">&yen;</text>
					<input type="digit" placeholder-style="font-size: 14px;color: #ddd;" v-model="money" maxlength="11"
					 :adjust-position="false" confirm-type="done" placeholder="单次提现最少提现100元" @input="changeMoney(money)" style="font-size: 65upx;height: 80upx; " />
					<text style="font-size: 30upx;white-space:nowrap; color: #EC3B46;font-size: 28upx;" class="margin-right-xs" @tap="allWithDrawal()">全部提现</text>
				</view>
				<view class="margin-tb  text-sm" style="color: #CCCCCC;">当前可提现 <text style="color:#EC3B46;">{{Score}}</text>元</view>
			</view>
		</view>


		<!-- <view class="margin">
			<picker @change="PickerChange" :value="index" :range="picker" range-key="msg">
				<view class=" padding-sm flex align-center justify-between" style="background:#FFFFFF;">
					<view>
						{{isSelect ? picker[index].msg:'选择提现到账时间'}}
					</view>
					<view class="cuIcon-right"></view>
				</view>
			</picker>
		</view> -->

		<view class="flex justify-center margin-lr" style="transition: all .3s ease-in-out;">
			<button class="cu-btn bg-red shadow text-lg" style="width: 100%;height: 40px;" @tap="toWithdrawal()">
				提交申请
			</button>
		</view>

		<view class="flex align-center justify-center margin-top  text-gray" style="color: #CCCCCC;" @tap="navigateTo('/pages/person/txProgress')">
			提现明细&gt;&gt;
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
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment
	} from '../../common/handle.js'
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				picker: [{
					type: 1,
					msg: 'T1到账时间1日 手续费7%'
				}, {
					type: 3,
					msg: 'T3到账时间3日 手续费5%'
				}, {
					type: 5,
					msg: 'T5到账时间5日 手续费3%'
				}, {
					type: 7,
					msg: 'T7到账时间7日 手续费1%'
				}],
				isSelect: false,
				index: 0,
				withdrawalType: 3,
				money: '', //充值金额
				showYue: false,
				radio: 1,
				inputPassWord: false,
				Score: 0, //可提现金额
				type: ''
			}
		},
		onLoad(options) {
			this.type = options.type || ''
			this.getBalance(options.type || '');
		},
		methods: {
			async getBalance(type) {
				if (this.userInfo_.ID) {
					let data = await this.$http.getUserInfo(this.userInfo_.ID);
					console.log(data);
					if (type === 'promotion') { // 推广积分
						this.Score = data.TuiGuang
					} else if (type === 'earnings') {	// 分润积分
						this.Score = data.FenRun
					} else if (type === 'store') {
						this.Score = data.StorePoint
					}
					this.Score = this.$api.formatAmount(this.Score);
				} else {
					this.Score = 0
				}
			},
			PickerChange(e) {
				this.index = e.detail.value;
				if (!this.isSelect) {
					this.isSelect = true;
				}
				this.type = this.picker[this.index].type;
			},
			selectType(type) {
				this.withdrawalType = type;
			},
			changeMoney(e) {
				setTimeout(() => {
					var index = this.money.indexOf(".");
					if (index != -1) {
						//没有小数点
						var count = this.money.length - (index + 1);
						if (count > 2) {
							this.money = this.$api.formatAmount(this.money);
						}
					}
				}, 0);
			},
			formatmoney(money) {
				return this.$api.formatAmount(money);
			},
			navigateTo(route) {
				uni.navigateTo({
					url: route
				});
			},
			allWithDrawal() {
				if (this.Score < 100) {
					this.$api.msg('提现金额必须大于100');
					return;
				}
				let currentMoney = this.$api.formatAmount(this.Score);
				this.money = parseInt(Number(currentMoney) / 100) * 100;
			},
			toWithdrawal() {
				if (  Number(this.money) > 0 && Number(this.money) <= this.Score) {
					// if (this.isSelect) {
						if (Number(this.money) % 100 == 0) {
							var self = this;
							switch (self.withdrawalType) {
								case 1:
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
								case 3:
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
						} else {
							this.$api.msg('提现金额必须为100的倍数');
						}
					// } else {
					// 	this.$api.msg('请选择提现到账时间');
					// }
				} else {
					this.$api.msg('输入的提现金额错误');
				}
			},
			hidePassModal: function(res) {
				this.inputPassWord = false;
			},
			fullclose: async function(res) {
				let self = this,
					pwd2 = res.pwd
				this.inputPassWord = false;
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd2)
				if (IsSuccess) {
					if (this.type === 'store') {
						this.$http.profitsWithdrawal(this.$store.state.userInfo.ID, this.money)
							.then(res => {
								this.$api.msg('提现申请已提交，请等待审核通过')
								let oddDate = new Date().toLocaleString('chinese', {
									hour12: false
								})
								setTimeout(function() {
									uni.navigateTo({
										url: `/pages/scan/paySuccess?dealType=提现到${self.withdrawalType = 1 ? '支付宝' : '银行卡'}成功&money=${self.money}&opeFunction=${self.withdrawalType = 1 ? 2 : 4}&oddDate=${oddDate}`
									})
								}, 1200);
							})
							.catch(err => {
								console.log(err);
							})
						return
					}
					
					this.$http.withdrawalIntegral(this.$store.state.userInfo.ID, this.money, this.type === 'promotion' ? 1 : 2)
						.then(res => {
							if (res.IsSuccess) {
								this.$api.msg('提现申请已提交，请等待审核通过')
								let oddDate = new Date().toLocaleString('chinese', {
									hour12: false
								})
								setTimeout(function() {
									uni.navigateTo({
										url: `/pages/scan/paySuccess?dealType=提现到${self.withdrawalType = 1 ? '支付宝' : '银行卡'}成功&money=${self.money}&opeFunction=${self.withdrawalType = 1 ? 2 : 4}&oddDate=${oddDate}`
									})
								}, 1200);
							}
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					this.$api.msg('支付密码不正确')
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #EEEEEE;
	}
	
</style>

<style scoped lang="scss">
	page {
		background-color: #EEEEEE;
	}

	.checkBorder {
		position: absolute;
		right: 0upx;
		bottom: 0upx;
		height: 80upx;
		width: 80upx;
		overflow: hidden;
	}

	.checkTriangle {
		position: absolute;
		transform: rotate(45deg);
		right: -60upx;
		bottom: -60upx;
		background: #EC3B46;
		height: 113upx;
		width: 113upx;
	}

	.cuteTag {
		position: absolute;
		left: -20upx;
		top: -15upx;
		font-size: 24upx;
		padding: 8upx 18upx;
		border-top-left-radius: 1000upx;
		border-bottom-left-radius: 1000upx;
		border-top-right-radius: 1000upx;
	}

	.selectRadio {
		position: relative;
		width: 50%;
		height: 160upx;
		border-radius: 10upx;

	}

	// .grayborder {
	// 	border: 1px solid #DDDDDD;
	// }

	.hoverborder {
		border: 1px solid #EC3B46;
	}

	.hx-card {
		border: 1px #f3f3f3 solid;
		box-shadow: 1px 1px 3px #ddd, -1px -1px 3px #ddd;

		&-title {
			background: #f8f8f8;
		}

		.money-field {
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
