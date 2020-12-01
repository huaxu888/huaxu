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
				<view class="margin-tb  text-sm flex justify-between" style="color:#ff5b2e;"><view>当前可提现金额为 <text style="color:#EC3B46;">{{Total}}</text>元</view>
				</view>
				
			</view>
			
			<view class="flex justify-center margin-lr" style="transition: all .3s ease-in-out;background-color: #FFFFFF;">
				<button class="cu-btn shadow text-lg sure" style="width: 100%;" @tap="toWithdrawal()">
					立即提现
				</button>
			</view>
			
			<view style="color: #b9b9b9;margin-top: 50upx;font-size: 24upx;text-align: left;margin-left: 30upx;">
				<text>*为了保证资金安全，每个账户一天仅能提现一次</text>
				<view style="margin-top: 20upx;">
					<text>*当前提现到账时间为{{times()}}，周末及节假日顺延</text>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment
	} from '@/common/handle.js'
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
				BankNos:'',
			}
		},
		onLoad(options) {
			this.type = options.type || ''
			this.title = this.$store.state.userInfo.BankName,
			this.name = this.$store.state.userInfo.BankUserName,
			this.BankNo = this.$store.state.userInfo.BankNo,
			this.BankNos = this.$store.state.userInfo.BankNo
			let self = this
			uni.request({
				url: 'https://newsapp.huaxuapp.com/api/agent/getnewsagentperson',
				data: {
					userid: self.$store.state.userInfo.ID
				},
				success: function(res) {
					console.log(res);
					if (res.data.IsSuccess) {
						self.Total = self.$api.formatAmount(res.data.Data.realsum)
					} else {
						self.Total = 0
					}
				},
				fail: function(res) {
					mescroll.endErr()
				}
			})
		},
		onShow() {
			this.title = this.$store.state.userInfo.BankName,
			this.name = this.$store.state.userInfo.BankUserName,
			this.BankNo = this.$store.state.userInfo.BankNo,
			this.BankNos = this.$store.state.userInfo.BankNo
			
			this.times()
		},
		methods: {
			times() {
				var date = new Date();
				date.setDate(date.getDate() + 1);
				return date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate()
			},
			chuLi(name){
				let newStr;
				if (name.length >= 2) {
					newStr = name.substr(0, 1) + '*';
				}
				return newStr;
			},	
			yinHang(bankNumber){
				return bankNumber.substr(0,4)+"********"+bankNumber.substr(-4);
			},
			bankCard() {
				uni.navigateTo({
					url: '/pages/person/bankCard'
				});
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
										this.$http.personAgencyTixian(this.$store.state.userInfo.ID, this.money,1).then(res=>{
											console.log(res);
											if(res.IsSuccess){
												this.$api.msg('提现申请已提交，请等待审核通过')
												let self = this
												uni.request({
													url: 'https://newsapp.huaxuapp.com/api/agent/getnewsagentperson',
													data: {
														userid: self.$store.state.userInfo.ID
													},
													success: function(res) {
														console.log(res);
														if (res.data.IsSuccess) {
															self.Total = self.$api.formatAmount(res.data.Data.realsum)
														} else {
															self.Total = 0
														}
													},
													fail: function(res) {
														mescroll.endErr()
													}
												})
											} else {
												this.$api.msg(res.Msg)
											}
										})
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
