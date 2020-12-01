<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">转账</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">转账</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="margin padding-top-xs" style="position: relative">
			<view class="text-bold margin-bottom">转账类型</view>
			<view class=" margin-top-sm flex padding-sm margin-bottom align-center justify-between" style="position: relative; border-bottom: 1px solid #F0F0F0;background: #FFFFFF;border-radius: 10upx;"
			 @tap="showPanel()">
				<view class="flex align-center justify-center">
					<text class=" " :class="TransferSort==2?'hxIcon-hongbao hx-text-red':'hxIcon-yue text-yellow'" style="font-size: 50upx;"></text>
					<text style="font-size: 32upx;margin-left: 24upx;line-height: 1em;"> {{TransferSort==2?'红包':'余额'}}</text>
				</view>
				<view class="flex align-center justify-center">
					<text>&yen;{{ TransferSort==2?XiaoFeiScore:KeTiXian}}</text>
					<text class="hxIcon-fanhui margin-left-xs income-way-btn" :class="isshowPanel?'tobottom':'toright'"></text>
				</view>
			</view>

			<view class="flex justify-center align-start flex-direction income-way-btn" @tap="changTransferType" :class="isshowPanel?'panelShow':'panelHidden'"
			 style="background: #F8F8F8;position: relative;width: 100%; top: -32upx;z-index: 9999;border-bottom-right-radius: 10upx; border-bottom-left-radius: 10upx;">
				<view class="flex align-center justify-center margin-lr-sm margin-tb-sm">
					<text class=" " :class="TransferSort==2?'hxIcon-yue text-yellow':'hxIcon-hongbao hx-text-red'" style="font-size: 50upx;"></text>
					<text style="font-size: 32upx;margin-left: 24upx;line-height: 1em;"> {{TransferSort==2?'余额':'红包'}} </text>
				</view>
			</view>

			
		</view>
		
		<view class="margin padding-bottom" style="margin-top: 0;">
			<view class="text-bold   margin-bottom">收款账号</view>
			<view class="align-center justify-center margin-top-sm flex padding-sm margin-bottom" style="border-bottom: 1px solid #F0F0F0;background: #FFFFFF;line-height: 1em;border-radius: 10upx">
				<input type="number" v-model="phone" class="flex-sub input  " placeholder="请输入到账方的手机号码" placeholder-style="color: #ddd;line-height: 1em;"
				 maxlength="11" />
				<text class="text-lg text-gray" style="line-height: 1em;">{{ phoneName }}</text>
			</view>
			
			<view class="text-bold  margin-top">转账金额</view>
			<view class=" margin-top  flex align-center padding" style=" border-bottom: 1px solid #F0F0F0; background: #FFFFFF;border-radius: 10upx">
				<text style="font-size: 50upx;" class="margin-right-xs">&yen;</text>
				<input type="digit" placeholder-style="font-size: 17px;color: #ddd;" v-model="money" maxlength="11" :adjust-position="false"
				 confirm-type="done" placeholder="请输入转账金额" @input="changeMoney(money)" style="font-size: 65upx;height: 80upx; " />
			</view>
			<view class="text-gray margin-top-xs" style="margin-bottom: 140upx;">请确认对方的手机号码无误，避免损失</view>
			
			<view class="flex sure text-center"  @tap="toTransfer()">
				<text class="" style="font-size: 32upx;">
					确认转账
				</text>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal " :class="inputPassWord ? 'show' : ''">
			<view class="cu-dialog">
				<uni-grid @close="hidePassModal" @fullclose="fullclose" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		validatePhone
	} from '../../common/handle.js';
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				money: '', //充值金额
				phone: '',
				phoneName: '',
				inputPassWord: false,
				isshowPanel: false,
				TransferSort: 1,
				KeTiXian: 0,
				XiaoFeiScore :0
			}
		},
		async onShow() {
			await this.getBalance();
		},
		methods: {
			async getBalance() {
				if (this.userInfo_.ID) {
					let data = await this.$http.getUserBalance(this.userInfo_.ID);
					console.log(data);
					this.KeTiXian = this.$api.formatAmount(data.Data.KeTiXian);
					this.XiaoFeiScore = this.$store.state.userInfo.XiaoFeiScore;
				} else {
					this.KeTiXian = 0
					this.XiaoFeiScore = 0;
				}
			},
			changTransferType() {
				this.isshowPanel = false;
				if (this.TransferSort == 1) {
					this.TransferSort = 2;
				} else {
					this.TransferSort = 1;
				}
			},
			showPanel() {
				this.isshowPanel = !this.isshowPanel
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
			toTransfer() {
					console.log(this.TransferSort);
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					this.$api.msg("手机号码有误");
				} else {
					//手机号正常
					if (this.money != '' && this.money != null) {
						this.inputPassWord = true;
					} else {
						this.$api.msg("输入金额有误");
					}
				}
			},
			hidePassModal: function(res) {
				this.inputPassWord = false;
			},
			fullclose: async function(res) {
				console.log(res);
				this.inputPassWord = false;
				let self = this;
				let pwd2 = res.pwd;
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd2)
				if (IsSuccess) {
					
						//余额转账
						uni.request({
							url: 'https://newsapp.huaxuapp.com/api/scores/zhuangscores',
							data: {
								userid: self.$store.state.userInfo.ID,
								phone: self.phone,
								num: self.money,
								pwd2: pwd2,
								checksort: self.TransferSort
							},
							success: function(res) {
								if (res.data.IsSuccess) {
									let oddDate = new Date().toLocaleString('chinese', {
										hour12: false
									});
									let opf
									if(self.TransferSort == 1){
										opf = '余额';
									}else{
										opf = '红包';
									}
									
									setTimeout(function() {
										uni.navigateTo({
											url: `/pages/scan/paySuccess?dealType=转账成功&money=${self.money}&opeFunction=${opf}&oddDate=${oddDate}&phoneName=` +
												self.phoneName
										});
									}, 1200);
								}
							},
							fail: function(res) {
								console.log('转账出错', res);
							},
							complete: function(res) {
								self.$api.msg(res.data.Msg);
							}
						});
				} else {
					this.$api.msg('支付密码错误');
				}
			}
		},
		watch: {
			phone(newValue) {
				let self = this;
				if (validatePhone(newValue, this)) {
					this.correctPhone = true;
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/menber/getnamebyphone',
						data: {
							phone: newValue
						},
						success: function(res) {
							self.phoneName = res.data.Data;
							if (self.phoneName == null || self.phoneName == '') {
								self.phoneName = '用户不存在';
							}
						}
					});
				} else {
					self.phoneName = '';
					this.correctPhone = false;
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

	.income-way-btn {
		transition: all .3s ease-in-out;
	}

	.panelShow {
		height: 96upx;
		overflow: hidden;
	}

	.panelHidden {
		height: 0upx;
		overflow: hidden;
	}

	.toright {
		transform: rotate(180deg);
	}

	.tobottom {
		transform: rotate(270deg);
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
		height: 180upx;
		border-radius: 10upx;

	}

	.grayborder {
		border: 1px solid #DDDDDD;
	}

	.hoverborder {
		border: 1px solid #EC3B46;
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
	
	.sure {
		margin-top: 20upx;
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
