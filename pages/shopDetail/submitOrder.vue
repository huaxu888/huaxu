<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="submitOrder-bg-black" class="text-white" :isBack="true">
			<block slot="content"><text class="text-bold">确认订单</text></block>
		</cu-custom>
		<!-- #endif -->

		<view class="bg-white padding margin-bottom" v-if="!buyNowList.IsSpecial && !buyNowList.IsSyPoint">
			<view class="flex justify-between">
				<text class=" text-black text-bold">选择提货点</text>
				<view class="">
					<text class="text-gray marghin-right-sm">自提</text>
					<switch class="red" :checked="takeTheir" :class="takeTheir ? 'checked' : ''" @change="takeTheirHandle"
					style="transform: scale(.7);" color="#F8F8F8" />
				</view>
			</view>
			<view class=" padding  margin-top flex align-center justify-between text-sm" @tap="selectPoint" v-if="takeTheir"
				style="background-color: #F6F7F9; height: 190upx;color: #333333; padding-left: 60upx;">
				<view v-if="Object.keys(toPoint).length == 0">
					<text>请选择自提点</text>
				</view>
				<view v-else>
					<text class="text-bold">{{ toPoint.StoreName }}</text>
					<view class="flex flex-direction margin-top-xs">
						<text class="text-cut" style="position: relative;width: 500upx;">{{ toPoint.StoreAddress }}</text>
						<text style="position: absolute;left:50upx" class="hxIcon-dingwei"></text>
						<text class="margin-top-xs">联系电话： {{ toPoint.Phone }}</text>
						<text class="margin-top-xs">距离：{{ getDistance(toPoint.distance) }}</text>
					</view>
				</view>
				<text class="hxIcon-rightArrow text-gray " style="font-size: 24upx;"></text>
			</view>
		</view>

		<view class="order-list">
			<view class="top-title ">
				<text class="text-bold">商品信息</text>
			</view>
			<view class="center-list ">
				<view v-for="(order, key) in orderList" :key="key">
					<view class="flex justify-between align-center solid-bottom" v-show="order.storeInfo">
						<view class="flex align-center">
							<view class="shop-image" :style="{backgroundImage: 'url(' + order.storeInfo.LogoPic + ')'}"></view>
							<text class="margin-left">
								{{ order.storeInfo.StoreName }}
							</text>
						</view>
						<view class="text-lg text-bold">
							&yen;{{ order.price }}
						</view>
					</view>
					<view v-for="(item,index) of order.shopContent" :key="index" class="flex align-center justify-between margin-tb-sm margin-lr">
						<image :src="retrunPicUrl(item.PicUrl || 'default')" style="height: 80upx; width: 80upx;"></image>
						<view class="flex align-start justify-between flex-direction margin-left-sm" style="width: 40%;height: 80upx;">
							<text class="text-cut ">{{item.WMInfoTitle}}</text>
					
							<view>
								<text style="margin-left: 5upx; margin-right: 15upx; font-size: 24upx;color: #999999;" v-if="item.Tags.title">{{item.Tags.title}}
								</text>
								<text style="font-size: 24upx;color: #999999;">x</text><text style="margin-left: 5upx;font-size: 24upx;color: #999999;">{{item.selectCount}}</text>
							</view>
						</view>
						<view class="flex align-end justify-end" style="width: 50%;">
							<text>&yen;</text><text class="margin-left-xxs">{{ caculatePrice(item) }}</text>
						</view>
					
					</view>
				</view>
			</view>
			<view class="bottom-total">
				<view class="flex align-center justify-end">
					<text class="bottom-total-text">总共{{sumTag}}件商品</text>
					<text class="bottom-total-text margin-left">总价</text>
					<text class="symbol margin-left-sm">&yen;</text><text class=" text-bold text-xl margin-left-xxs">{{sumMoney}}</text>
				</view>

			</view>
		</view>

		<view class="bg-white margin-top" v-if="!takeTheir">
			<view class="cu-form-group">
				<textarea maxlength="-1" @input="textareaAInput" placeholder="如需配送,请填写收货人信息"></textarea>
			</view>
		</view>

		<view class="margin-sm flex align-start justify-center flex-direction tips">
			<text class="title">友情提示</text>
			<text class="content">配送服务由商家提供；用餐高峰期可能出现配送延迟的情况，请及时与商家联系。</text>
		</view>

		<view style="height: 160upx; width: 100%;">
			<!-- //撑起地下页面的 -->
		</view>

		<view class="padding-lr bottom-fixed" @touchmove.stop.prevent>
			<view class="flex align-center justify-between padding padding-lr-xl bottom-fixed-card">
				<view class="flex justify-center align-center gwl-relative">
					<text style="font-size: 34upx;">合计</text>
					<view class="flex align-end justify-start margin-left-sm margin-left-lg calculate">
						<text lass="text-df calculate-symbol">&yen;</text>
						<text class="margin-left-xs calculate-money">{{sumMoney}}</text>
					</view>
				</view>

				<view @tap="submit" class="flex align-center justify-center bg-orderYellow submit">
					<text class="text-bold">{{ buyNowList.IsSyPoint ? '兑换' : '下单' }}</text>
				</view>
			</view>
		</view>

		<tui-modal :show="showTips" @cancel="hiedModel" :custom="true" :isPadding="true" :maskClosable="false">
			<view class="flex align-center justify-center flex-direction">
				<view class="margin-top" style="background: url(https://img.huaxuapp.com/xdcg_03.png) no-repeat; background-size: 100% 100%; width: 387upx;height: 285upx;"></view>
				<text class="text-xxl text-bold margin-top-lg">{{ buyNowList.IsSyPoint ? '兑换成功' : '下单成功' }}</text>
				<text class=" margin-top-lg text-gray" style="white-space: nowrap;font-size: 26upx;">请至【我的—在线订单】中查看详情</text>
				<view @tap="hiedModel" class=" flex align-center justify-center  margin-top-xl" style="border-radius: 1000upx; width: 500upx;height: 88upx;background: #F8CD18;">
					<text class="text-white" style="font-size: 33upx;">我知道了</text>
				</view>
			</view>
		</tui-modal>

	</view>
</template>

<script>
	import tuiModal from "@/components/modal/modal"
	import { wxAppletsDDPay, appDDPay, wxAppletsSpecialOrderPay } from '@/common/handle.js'
	export default {
		components: {
			tuiModal
		},
		data() {
			return {
				showTips: false,
				orderList: [],
				storeId: '',
				storeName: '',
				sumMoney: 0,
				sumTag: 0,
				deskNo: 0,
				takeTheir: true,
				showAddress: false,
				// payFuncModel: false,
				addr: '',
				toPoint: {},
				buyNowList: {},
				info: ''
			}
		},
		onLoad(option) {
			this.storeId = option.storeId;
			this.deskNo = option.deskNo
			this.storeName = option.storeName
		},
		onShow() {
			this.$api.showLoading_
			this.addr = this.$store.state.addr
			this.sumMoney = 0
			this.buyNowList = getApp().globalData.buyNowList
			if (Object.keys(this.buyNowList).length == 0) {
				this.orderList = this.$store.state.orderList
				this.sumTag = this.$store.state.tagsum
			} else {
				this.orderList = []
				this.orderList.push(this.buyNowList)
				this.sumTag = this.orderList[0].shopContent[0].selectCount
			}
			
			this.orderList.forEach( (item, index) => {
				this.sumMoney += item.price
				this.$http.getStore(item.storeId).then(res => {
					if (res.IsSuccess) {
						this.$set(this.orderList[index], 'storeInfo', res.Data)
					}
				})
				
				this.$api.hidLoading_
			})
			
			if (this.takeTheir) {
				this.toPoint = this.$store.state.toPoint
			}
		},
		methods: {
			takeTheirHandle: function () {
				this.takeTheir = ! this.takeTheir
			},
			selectPoint: function () {
				uni.navigateTo({
					url: '/pages/person/setting/toPointPage'
				})
			},
			getDistance: function (distance) {
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} Km`
				}
			},
			textareaAInput: function (info) {
				this.info = info.detail.value
			},
			retrunPicUrl(url) {
				if (url.indexOf(',') > 0) {
					return url.split(',')[0]
				} else if (url) {
					return url;
				} else {
					return 'http://img.huaxuapp.com/zwf112_03.png';
				}
			},
			caculatePrice(item) {
				let price = item.Tags.title ? item.Tags.price : item.Price;
				return this.$api.accMul(item.selectCount, price)

			},
			hiedModel() {
				this.showTips = false
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			submit() {
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
				
				if(this.takeTheir && Object.keys(this.toPoint).length == 0 && !this.buyNowList.IsSpecial && !this.buyNowList.IsSyPoint) {
					uni.showModal({
						content: '请选择自提点',
						showCancel: false 
					})
					return
				}
				let out_trade_no = new Date().getTime()
				delete this.buyNowList.storeInfo
				delete this.orderList.storeInfo
				if (this.buyNowList.IsSyPoint) {
					this.$http.pointsFor(this.$store.state.userInfo.ID, this.buyNowList.storeId, JSON.stringify(this.buyNowList))
						.then(res => {
							this.showTips = true
							getApp().globalData.buyNowList = {} 
						})
						.catch(err => {
							console.log(err);
						})
					return
				}
				// #ifdef MP-WEIXIN
				if (Object.keys(this.buyNowList).length > 0 && this.buyNowList.IsSpecial) {
					wxAppletsSpecialOrderPay(out_trade_no, this.sumMoney, `付款给${this.storeName}`, this.$store.state.userInfo.UnionID, 0, JSON.stringify(this.orderList))
					.then(res => {
						this.showTips = true
						this.$store.commit('clearOrderList')
						getApp().globalData.buyNowList = {}
					})
					.catch(err => {
						console.log(err);
					})
				} else {
					console.log(this.orderList, '订单信息');
					wxAppletsDDPay(out_trade_no, this.sumMoney, `付款给${this.storeName}`, this.$store.state.userInfo.UnionID, this.toPoint.StoreID, JSON.stringify(this.orderList), this.info)
					.then(res => {
						this.showTips = true
						this.$store.commit('clearOrderList')
						getApp().globalData.buyNowList = {}
					})
					.catch(err => {
						console.log(err);
					})
				}
				return
				// #endif
				// #ifdef APP-PLUS || H5
				appDDPay(this.$store.state.userInfo.ID, out_trade_no, this.sumMoney, `${this.storeName}订餐费用`,
								 this.storeId, this.addr.UserAddressID, JSON.stringify(this.orderList), this.sumMoney, 4)
				.then(res => {
					console.log(res);
					this.showTips = true
				})
				.catch(err => {
					console.log(err);
				})
				return
				// #endif
				
				this.$api.showLoading_();
				this.orderList.Spec = ''
				wxAppletsDDPay(out_trade_no, `${this.storeName}预约手续费`, 
								this.$store.state.userInfo.UnionID, this.storeId, this.addr.UserAddressID, JSON.stringify(this.orderList), this.sumMoney)
				.then(res => {
					console.log(res);
					this.showTips = true
				})
				.catch(err => {
					console.log(err);
				})
				return
			}

		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
	}
</style>
<style scoped>
	.tips .title {
		font-size: 28upx;
		color: #333333;
		font-weight: bold;
	}

	.tips .content {
		font-size: 24upx;
		margin-top: 10upx;
		color: #666666;
		line-height: 1.5em;
	}

	.tips {
		margin-top: 30upx;
	}

	.order-list {
		background: #FFFFFF;
	}

	.order-list .top-title {
		padding: 25upx;
		font-size: 30upx;
		border-bottom: 0.7px solid #E4E4E4;
	}

	.order-list .center-list {
		padding: 0 25upx;
		border-bottom: 0.7px solid #E4E4E4;
	}

	.order-list .bottom-total {
		padding: 25upx;
	}


	.order-list .bottom-total .symbol {
		font-size: 24upx;
	}

	.order-list .bottom-total .bottom-total-text {
		font-size: 24upx;
		color: #9A9A9A;
	}


	.bottom-fixed .bottom-fixed-card .submit {
		width: 174upx;
		height: 68upx;
		border-radius: 10upx;
	}

	.bottom-fixed .bottom-fixed-card .gwl-relative .cuteTag {
		position: absolute;
		left: 50upx;
		top: 4upx;
		height: 40upx;
		width: 40upx;
		background: #f8cd18;
		border-radius: 50%;
		border: 2upx solid #FFFFFF;
	}

	.bottom-fixed .bottom-fixed-card .gwl-relative {
		position: relative;
	}

	.bottom-fixed .bottom-fixed-card .calculate .calculate-money {
		font-size: 49upx;
		line-height: 1em;
	}

	.bottom-fixed .bottom-fixed-card .calculate .calculate-symbol {
		margin-bottom: 5upx;
	}

	.bottom-fixed .bottom-fixed-card {
		height: 120upx;
		background: #444242;
		border-radius: 1000upx;
	}

	.bottom-fixed {
		position: fixed;
		width: 100%;
		color: #FFFFFF;
		bottom: 10px;
		z-index: 10000;
	}

	.bg-orderYellow {
		background: #f8cd18;
		color: #333333;
	}

	.order-function .cu-form-group {
		background-color: #ffffff;
		margin: 0;
		padding: 0upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;

	}

	.order-function {
		margin: 0 0 30upx 0;
	}
	
	.shop-image {
		width: 50rpx;
		height: 50rpx;
		margin: 10rpx 0;
		border-radius: 8rpx;
		background-position: center;
		background-size: cover;
	}
</style>
