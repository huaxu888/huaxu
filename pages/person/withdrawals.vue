<template>
	<view style="background-color: #FFFFFF;padding-bottom: 800upx;">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">提现</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">提现</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view style="background-color: #FFFFFF;padding-bottom: 6upx;">
			<!-- <view class="padding" style="background: #F8F8F8;">
				<view class="flex align-center justify-between ">
					<view class="text-bold margin-bottom-xl">提现方式</view>
					<view class="text-sm margin-bottom-xl" style="color: #CCCCCC;">所提现的金额必须为100的整数倍</view>
				</view>

				<view class="flex align-center ">

					<view class="margin-right-sm selectRadio" :class="withdrawalType == 1 ? 'hoverborder' : 'grayborder' " @tap="selectType(1)">
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
					</view>

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
			</view> -->
			<view style="padding: 30upx;" v-if="BankNos"  @tap="bankCard()">
				<view class="flex" style="background: linear-gradient(to right, #646464, #262626);height: 160upx;padding: 30upx;position: relative;border-radius: 12upx;">
					<view style="width: 80upx;height: 80upx;border-radius: 80upx;background-color: #fdd5a2;text-align: center;line-height: 80upx;margin-top: 10upx;">
						<text style="color: #000000;font-size: 26upx;">{{chuLi(name)}}</text>
					</view>
					<view style="color: #eeeeee;font-size: 30upx;margin-top: 8upx;margin-left: 20upx;">
						<view>
							<text>{{title}}</text>
						</view>
						<view style="margin-top: 20upx;">
							<text>{{yinHang(BankNo)}}</text>
						</view>
					</view>
					<view style="position: absolute;right: 30upx;top: 56upx;">
						<text class="hxIcon-bianji" style="font-size: 42upx;color: #FFFFFF;"></text>
					</view>
				</view>
			</view>
			
			<view class="padding" style="padding-bottom: 0;">
				<view class="text-bold margin-top-sm" style="font-size: 28upx;">提现金额</view>
				<view class=" margin-top  flex align-center " style="border-bottom: 1px solid #F0F0F0; margin-bottom: 0upx;">
					<text style="font-size: 50upx;" class="margin-right-xs">&yen;</text>
					<input type="digit" placeholder-style="font-size: 14px;color: #ddd;" v-model="money" maxlength="11"
					 :adjust-position="false" confirm-type="done" placeholder="提现金额必须为整数且为100的倍数" @input="changeMoney(money)" style="font-size: 65upx;height: 80upx; " />
					<!-- <text style="font-size: 30upx;white-space:nowrap; color: #EC3B46;font-size: 28upx;" class="margin-right-xs" @tap="allWithDrawal()">全部提现</text> -->
				</view>
				<view class="margin-tb  text-sm flex justify-between" style="color:#333333;"><view>当前推广收益 <text style="color:#fe4e01;">{{Total}}</text>元</view>
					<text  style="color:#fe4e01;" @tap="navigateTo('/pages/person/txProgresss')">提现明细</text>
				</view>
				
			</view>
			
			<view class="flex justify-center margin-lr" style="transition: all .3s ease-in-out;background-color: #FFFFFF;">
				<button class="cu-btn shadow text-lg sure" style="width: 100%;" @tap="toWithdrawal()">
					立即提现
				</button>
			</view>
			
			<!-- <view style="padding:0 30upx;border-radius: 10upx;background-color: #f8f8f8;margin: 30upx;margin-top: 50upx;">
				<view class="text-center flex justify-between" style="padding:30upx;" @tap="navigateTo('/pages/person/txProgresss')">
					<view>
						<text style="font-size: 28upx;font-weight: 600;">提现明细</text>
					</view>
					<view>
						<text class="hxIcon-rightArrow" style="font-size: 24upx;color: #999999;"></text>
					</view>
				</view>
			</view> -->
			
			<view class="cu-modal bottom-modal " :class="inputPassWord?'show':''">
				<view class="cu-dialog">
					<uni-grid @close="hidePassModal" @fullclose="fullclose" />
				</view>
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
				Total: 0, //可提现金额
				type: '',
				title: this.$store.state.userInfo.BankName,
				name: this.$store.state.userInfo.BankUserName,
				BankNo:this.$store.state.userInfo.BankNo,
				BankNos:''
			}
		},
		onLoad(options) {
			this.type = options.type || ''
			this.getBalance(options.type || '');
			this.title = this.$store.state.userInfo.BankName,
			this.name = this.$store.state.userInfo.BankUserName,
			this.BankNo = this.$store.state.userInfo.BankNo,
			this.BankNos = this.$store.state.userInfo.BankNo
		},
		onShow() {
			this.title = this.$store.state.userInfo.BankName,
			this.name = this.$store.state.userInfo.BankUserName,
			this.BankNo = this.$store.state.userInfo.BankNo,
			this.BankNos = this.$store.state.userInfo.BankNo
			let self = this
			uni.request({
				url: 'https://newsapp.huaxuapp.com/api/scores/myzdrest',
				data: {
					userid: self.$store.state.userInfo.ID,
					sort: 2,
					page: 1,
					pagesize: 10
				},
				success: function(res) {
					console.log(res);
					if (res.data.IsSuccess) {
						self.Total = self.$api.formatAmount(res.data.Data.Total)
					} else {
						self.Total = 0
					}
				},
				fail: function(res) {
					mescroll.endErr()
				}
			})
		},
		methods: {
			chuLi(name){
				let newStr;
				if (name.length >= 2) {
					newStr = name.substr(0, 1) + '*';
				}
				// } else if (name.length > 2) {
				//   let char = '';
				//   for (let i = 0, len = name.length - 2; i < len; i++) {
				// 	char += '*';
				//   }
				//   newStr = name.substr(0, 1) + char + name.substr(-1, 1);
				// } else {
				//   newStr = name;
				// }
				return newStr;
			},	
			yinHang(bankNumber){
				return bankNumber.substr(0,4)+"********"+bankNumber.substr(-4);
			},
			bankCard() {
				uni.navigateTo({
					url: './bankCard'
				});
			},
			async getBalance(type) {
				if (this.userInfo_.ID) {
					let data = await this.$http.getUserInfo(this.userInfo_.ID);
					console.log(data);
					if (type === 'promotion') { // 推广积分
						this.Total = data.TuiGuang
					} else if (type === 'earnings') {	// 分润积分
						this.Total = data.FenRun
					} else if (type === 'store') {
						this.Total = data.StorePoint
					}
					this.Total = this.$api.formatAmount(this.Total);
				} else {
					this.Total = 0
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
				if (this.Total < 100) {
					this.$api.msg('提现金额必须大于100');
					return;
				}
				let currentMoney = this.$api.formatAmount(this.Total);
				this.money = parseInt(Number(currentMoney) / 100) * 100;
			},
			toWithdrawal() {
				if(this.BankNos){
					if (  Number(this.money) > 0 && Number(this.money) <= Number(this.Total)) {
							if (Number(this.money) % 100 == 0) {
								var self = this;
								
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
														url: '/pages/person/bankCard'
													})
												}
											},
										});
									}
								// switch (self.withdrawalType) {
								// 	case 1:
								// 		if (self.$store.state.userInfo.ZhiFuBaoNo) {
								// 			// 绑定了支付宝直接提现
								// 			this.inputPassWord = true
								// 		} else {
								// 			uni.showModal({
								// 				content: '提现到支付宝需要绑定支付宝账号',
								// 				cancelText: '知道了',
								// 				confirmText: '去绑定',
								// 				success: res => {
								// 					if (res.confirm) {
								// 						uni.navigateTo({
								// 							url: '/pages/person/myAlipay'
								// 						})
								// 					}
								// 				},
								// 			});
								// 		}
								// 		break;
								// 	case 3:
										// if (self.$store.state.userInfo.BankNo) {
										// 	this.inputPassWord = true
										// } else {
										// 	uni.showModal({
										// 		content: '提现到银行卡需要绑定银行卡',
										// 		cancelText: '知道了',
										// 		confirmText: '去绑定',
										// 		success: res => {
										// 			if (res.confirm) {
										// 				uni.navigateTo({
										// 					url: '/pages/person/bindBank'
										// 				})
										// 			}
										// 		},
										// 	});
										// }
										// break;
								// 	default:
								// 		break;
								// }
							} else {
								this.$api.msg('提现金额必须为100的倍数');
							}
						
					} else {
						this.$api.msg('输入的提现金额错误');
					}
				} else {
					this.$api.msg('请您先绑定银行卡,再进行提现!');
					this.bankCard()
				}
			},
			hidePassModal: function(res) {
				this.inputPassWord = false;
			},
			fullclose: async function(res) {
				console.log(this.money);
				let self = this,
					pwd2 = res.pwd
				this.inputPassWord = false;
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd2)
				if (IsSuccess) {
				this.$http.tiXian(this.$store.state.userInfo.ID, this.money, pwd2, 1).then(res=>{
					console.log(res);
					this.$api.msg('提现申请已提交，请等待审核通过')
					let self = this
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/scores/myzdrest',
						data: {
							userid: self.$store.state.userInfo.ID,
							sort: 2,
							page: 1,
							pagesize: 10
						},
						success: function(res) {
							console.log(res);
							if (res.data.IsSuccess) {
								self.Total = self.$api.formatAmount(res.data.Data.Total)
							} else {
								self.Total = 0
							}
							
						},
						fail: function(res) {
							mescroll.endErr()
						}
					})
					})
					.catch(err => {
						console.log(err);
					})
				} else {
					this.$api.msg('支付密码不正确')
				}
						
				// if (IsSuccess) {
				// 	if (this.type === 'store') {
				// 		this.$http.profitsWithdrawal(this.$store.state.userInfo.ID, this.money)
				// 			.then(res => {
				// 				this.$api.msg('提现申请已提交，请等待审核通过')
				// 				let oddDate = new Date().toLocaleString('chinese', {
				// 					hour12: false
				// 				})
				// 				setTimeout(function() {
				// 					uni.navigateTo({
				// 						url: `/pages/scan/paySuccess?dealType=提现到${'银行卡'}成功&money=${self.money}&opeFunction=${self.withdrawalType = 1 ? 2 : 4}&oddDate=${oddDate}`
				// 					})
				// 				}, 1200);
				// 			})
				// 			.catch(err => {
				// 				console.log(err);
				// 			})
				// 		return
				// 	}
					
				// 	this.$http.withdrawalIntegral(this.$store.state.userInfo.ID, this.money, this.type === 'promotion' ? 1 : 2)
				// 		.then(res => {
				// 			if (res.IsSuccess) {
				// 				this.$api.msg('提现申请已提交，请等待审核通过')
				// 				let oddDate = new Date().toLocaleString('chinese', {
				// 					hour12: false
				// 				})
				// 				setTimeout(function() {
				// 					uni.navigateTo({
				// 						url: `/pages/scan/paySuccess?dealType=提现到${'银行卡'}成功&money=${self.money}&opeFunction=${self.withdrawalType = 1 ? 2 : 4}&oddDate=${oddDate}`
				// 					})
				// 				}, 1200);
				// 			}
				// 		})
				// 		.catch(err => {
				// 			console.log(err);
				// 		})
				// } else {
				// 	this.$api.msg('支付密码不正确')
				// }
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #FFFFFF;
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
	
	.sure {
		margin-top: 40upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #fb9c67, #fc6660);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	}
</style>
