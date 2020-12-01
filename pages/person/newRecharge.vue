<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">充值</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">充值</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="margin">
		<view class="text-bold text-lg">请选择充值金额</view>
		<view class="amount-list">
			<view class="amount-item" :class="currentTab === index ? 'active' : ''" v-for="(item, index) in amontList" :key="index" @tap="selectTab(index)">
				<text class="text-bold">{{ item.HasMoney }}元</text>
				<text class="text-xs margin-top-xs">售价：{{ item.RealMoney }}元</text>
			</view>
		</view>
			
		</view>
		<view class=" margin text-bold text-lg">支付方式</view>
		<view>
			<payradio @getRadio="getRadio" :radio='radio' :yue="false"></payradio>
		</view>
		<view class="flex justify-center margin-lr" style="transition: all .3s ease-in-out;">
			<button class="cu-btn bg-red shadow text-lg" style="width: 100%;height: 40px;" @tap="toRecharge()">
				确认支付
			</button>
		</view>

		<view class="cu-modal bottom-modal " :class="modalNameShow ? 'show' : ''">
			<view class="cu-dialog">
				<uni-grid @close="hideModal" @fullclose="fullclose" />
			</view>
		</view>
	</view>
</template>

<script>
	import payradio from '@/components/payRadio/payRadio.vue'
	import {
		alipayAppletsPay,
		wxAppletsRechargePay,
		appRechargePayment
	} from '../../common/handle.js'
	import uniGrid from '@/components/uni-grid/uni-grid.vue';

	export default {
		components: {
			payradio,
			uniGrid
		},
		data() {
			return {
				radio: 2,
				modalNameShow: false,
				amontList: [],
				currentTab: 0,
				storeId: 0
			}
		},
		onLoad(option) {
			if ('storeId' in option) {
				this.storeId = option.storeId
			}
		},
		onShow() {
			if (!this.userInfo_.ID) {
				//如果userInfo为空，则退回
				uni.navigateBack();
			}
			
			// #ifdef MP-WEIXIN || H5 || APP-PLUS
			this.radio = 3
			// #endif
			
			this.$http.getPrepaidPhoneList()
				.then(res => {
					switch (parseInt(this.storeId)) {
						case 0:
							this.amontList = res.filter(item => {
								if (!item.IsOfficialShop && !item.IsGeneralStore) {
									return item
								}
							})
							break
						case 3180:
							this.amontList = res.filter(item => {
								if (item.IsOfficialShop && !item.IsGeneralStore) {
									return item
								}
							})
							break
						default:
							this.amontList = res.filter(item => {
								if (!item.IsOfficialShop && item.IsGeneralStore) {
									return item
								}
							})
					}
				})
				.catch(err => {
					console.log(err);
					this.$api.msg('获取充值列表失败，请退出重试')
				})
		},
		methods: {
			getRadio(e) {
				this.radio = e.radio;
			},
			hideModal(e) {
				//当点击关闭
				this.modalNameShow = false;
			},
			async fullclose(e) {
				this.modalNameShow = false;
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, e.pwd)
				var self = this;
				
				if (e.pwd != '' && IsSuccess ) {
					return this.toRecharge();
				} else {
					this.$api.msg('请输入正确的密码')
					return
				}
			},
			selectTab: function (index) {
				this.currentTab = index
			},
			toRecharge() {
				if (Object.keys(this.$store.state.userInfo).length > 0 && !this.$store.state.userInfo.Phone) {
					uni.showModal({
						title: '信息不完整',
						content: '为了保障您的权益，请在付款之前完善您的联系方式',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/chagePhone'
								})
							}
						}
					})
					return
				}
				let amount = this.amontList[this.currentTab].RealMoney,
					rechargeAmount = this.amontList[this.currentTab].HasMoney,
					out_trade_no = new Date().getTime()
				switch (Number(this.radio)) {
					/* 支付宝充值 */
					case 2:
						// #ifdef MP-ALIPAY
						
						// #endif
						// #ifdef APP-PLUS
						appRechargePayment(this.$store.state.userInfo.ID, out_trade_no, amount, '余额充值', this.storeId, rechargeAmount, '支付宝')
							.then(res => {
								uni.showModal({
									title: '充值成功',
									content: `已将${rechargeAmount}元充值到您的账户余额`,
									showCancel: false,
									success: (res) => {
										if (res.confirm) {
											uni.navigateBack()
										}
									}
								})
							})
							.catch(err => {
								if (err.err.errMsg.includes('客户端未安装')) {
									uni.showToast({
										title: '未安装微信客户端',
										icon: 'none'
									})
								}
							})
						// #endif
						break
					/* 微信充值 */
					case 3:
						// #ifdef MP-WEIXIN
						wxAppletsRechargePay(out_trade_no, amount, '余额充值', this.$store.state.userInfo.UnionID, this.storeId, rechargeAmount)
							.then(res => {
								uni.showModal({
									title: '充值成功',
									content: `已将${rechargeAmount}元充值到您的账户余额`,
									showCancel: false,
									success: (res) => {
										if (res.confirm) {
											uni.navigateBack()
										}
									}
								})
							})
							.catch(err => {
								console.log(err);
							})
						// #endif
						// #ifdef APP-PLUS
						appRechargePayment(this.$store.state.userInfo.ID, out_trade_no, amount, '余额充值', this.storeId, rechargeAmount, '微信')
							.then(res => {
								uni.showModal({
									title: '充值成功',
									content: `已将${rechargeAmount}元充值到您的账户余额`,
									showCancel: false,
									success: (res) => {
										if (res.confirm) {
											uni.navigateBack()
										}
									}
								})
							})
							.catch(err => {
								if (err.err.errMsg.includes('客户端未安装')) {
									uni.showToast({
										title: '未安装微信客户端',
										icon: 'none'
									})
								}
							})
						// #endif
						break
					default:
						this.$api.msg('未知的充值方式')
				}
			}
		}
	}
</script>



<style>
	page {
		background-color: #FFFFFF;
	}
	
</style>

<style scoped lang="scss">
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
	
	.amount-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.amount-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 210rpx;
		padding: 30rpx 0;
		margin-top: 30rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		border: 1rpx solid #fa7142;
		color: #fa7142;
		transition: all .1s ease-in-out;
		
		@at-root .active {
			background: linear-gradient(to right, #fa7142, #fe4e01);
			color: #FFFFFF;
		}
	}
</style>
