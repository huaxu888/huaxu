<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<block slot="content"><text class="text-bold">订单详情</text></block>
		</cu-custom>
		<!-- #endif -->



		<view class="order-list margin-top-sm" v-if="orderItme">
			<view class="top-title ">
				<text class="text-bold">预约信息</text>
			</view>
			<view class="padding-sm">
				<view class="flex align-center margin-top-sm">
					<text class="hxIcon-yuyue margin-left-sm"></text>
					<text class="margin-left-sm text-bold">{{ orderItme.YCDate || ycdate}} {{ orderItme.YCTime || yctime}}</text>
				</view>
				<view class="flex align-center margin-top-lg">
					<text class="hxIcon-renshu margin-left-sm"></text>
					<text class="margin-left-sm text-bold">{{orderItme.Num || num}}人</text>
				</view>
				<view class="flex align-center margin-top-lg margin-bottom-sm ">
					<text class="hxIcon-shouji2 margin-left-sm"></text>
					<text class="margin-left-sm text-black text-bold">手机号：</text>
					<text class="text-bold phone-text">{{orderItme.Phone || phone}}</text>
				</view>
			</view>
		</view>


		<view class="order-list  margin-top-sm " v-if="ShopContent.length>0">
			<view class="top-title ">
				<text class="text-bold">商品信息</text>
			</view>
			<view class="center-list " v-for="(item,index) of ShopContent" :key="index">
				<view class="flex align-center justify-between margin-tb-sm">
					<image :src="item.PicUrl" style="height: 80upx; width: 80upx;"></image>
					<view class="flex align-start justify-between flex-direction margin-left-sm" style="width: 40%;height: 80upx;">
						<text class="text-cut ">{{item.WMInfoTitle}}</text>
						<view>
							<text style="font-size: 24upx;color: #999999;">x</text><text style="margin-left: 5upx;font-size: 24upx;color: #999999;">{{item.selectCount}}</text>
						</view>
					</view>
					<view class="flex align-end justify-end" style="width: 50%;">
						<text>&yen;</text><text class="margin-left-xxs">{{ accMul(item.selectCount,item.Price) }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-total">
				<view class="flex align-center justify-end">
					<text class="bottom-total-text">总共{{sum}}件商品</text>
					<text class="bottom-total-text margin-left">总价</text>
					<text class="symbol margin-left-sm">&yen;</text><text class=" text-bold text-xl margin-left-xxs">{{sumMoney}}</text>
				</view>

			</view>
		</view>

		<view class="order-list  margin-top-sm" v-if="AddDate">
			<view class="top-title ">
				<text class="text-bold">订单信息</text>
			</view>
			<view class="center-list ">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">订单状态</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{getStatus(DDState)}}
					</view>
				</view>
			</view>

			<view class="center-list ">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">下单时间</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ changeBeTime(AddDate) }}
					</view>
				</view>
			</view>

			<view class="center-list">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">订单编号</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						 {{DDNO}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="holderplace"></view>
		
		<view class="verify-btn" @tap="verify" v-if="DDState == 5 || DDState == 2">
			<text>核销</text>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	export default {
		data() {
			return {
				bookid: '',
				orderItme: '',
				ddid: '',
				sumMoney: 0,
				sum: 0, //个数
				DDState: '',
				AddDate: '',
				DDID: '',
				DDNO: '',
				ShopContent: [],
				ycdate: '',
				yctime: '',
				num: '',
				phone: '',
				StoreId: 0,
				type: ''
			}
		},
		async onLoad(option) {
			if (option.StoreID) {
				this.StoreId = option.StoreID
			}
			if(option.bookid && option.bookid != 0){
				this.bookid = option.bookid	;
				await this.getOrderItembyBookid();
				if (this.DDState != 5) {
					uni.showModal({
						title: '订单状态异常',
						content: '订单已取消、超时或完成',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateBack()
							}
						}
					})
				}
			}else if(option.ddid){
				this.DDID = option.ddid;
				await this.getOrderItembyDdid();
				if ( ! [2, 5].includes(this.DDState) ) {
					uni.showModal({
						title: '订单状态异常',
						content: '订单已取消、超时或完成',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateBack()
							}
						}
					})
				}
			}else if(option.ycdate){
				this.ycdate = option.ycdate;
				this.yctime = option.yctime;
				this.num = option.num;
				this.phone = option.phone;
				this.AddDate =option.addDate;
				this.DDState = option.state;
			} else{
				uni.navigateBack({
					delta: 1
				})
			}
		},
		methods: {
			accMul(arg1,arg2){
				return this.$api.accMul(arg1,arg2)
			},
			getStatus: function (status) {
				let result
				switch (status) {
					case 1: 
						result = '待支付'
						break
					case 2:
						result = '已支付'
						break;
					case 3:
						result = '已点单'
						break;
					case 4:
						result = '已结算'
						break;
					case 5:
						result = '已预约'
						break;
					case 6:
						result = '已拒绝'
						break;
					case 7:
						result = '已取消'
						break;
					case 8:
						result = '已完成'
						break;
					case 9:
						result = '已超时'
						break;
					case 10:
						result = '已发货'
						break;
					case 11:
						result = '待发货'
						break;
					default:
						result = '未知状态'
				}
				return result
			},
			changeBeTime(date) {
				if (date) {
					return this.beTime(date)
				}
			},
			verify: function () {
				this.$http.verifyOrder(this.StoreId, this.DDID)
					.then( res => {
						if (res.IsSuccess) {
							uni.showToast({
								title: res.Msg,
								duration: 1500
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1500)
						} else {
							uni.showToast({
								title: res.Msg,
								duration: 1500
							})
						}
					})
					.catch( err => {
						console.log(err);
					})
			},
			async getOrderItembyDdid() {
				this.$api.showLoading_();
				await this.$http.getOrderByid(this.DDID).then(res => {
					if (res.IsSuccess) {
						this.orderItme = ''
						this.AddDate = res.Data.AddDate
						this.sumMoney = res.Data.DDMoney
						this.DDState = res.Data.DDState
						this.DDID = res.Data.DDID
						this.DDNO = res.Data.DDNO
						let ShopContent = res.Data.ShopContent
						let sum = 0;
						let sumMoney = 0;
						if (ShopContent) {
							
							this.ShopContent = JSON.parse(ShopContent);
							this.ShopContent.forEach(item => {
								sum += item.selectCount;
							});
						}
						this.sum = sum;
						this.$api.hidLoading_();	
					}
				});
			},
			async getOrderItembyBookid() {
				this.$api.showLoading_();
				await this.$http.getOrderByBookid(this.bookid).then(res => {
					if (res.IsSuccess) {
						this.orderItme = res.Data[0]
						this.AddDate = res.Data[0].AddDate
						this.sumMoney = res.Data[0].DDMoney
						this.DDState = res.Data[0].State
						this.DDID = res.Data[0].DDID
						let ShopContent = res.Data[0].ShopContent
						let sum = 0;
						let sumMoney = 0;
						if (ShopContent) {
							this.ShopContent = JSON.parse(ShopContent);
							this.ShopContent.forEach(item => {
								sum += item.selectCount;
							});
						}
						this.sum = sum;
						this.$api.hidLoading_();		
					}
				});
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
	.margin-top-xxxs {
		margin-top: 2upx;
	}

	.tips {
		color: #999999;
		font-size: 28upx;
		letter-spacing: 2upx;
	}

	.order-list {
		border-radius: 15upx;
		background: #FFFFFF;
	}
	
	.holderplace {
		width: 750upx;
		height: 140upx;
		background: transparent;
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
	
	.verify-btn {
		position: fixed;
		width: 690upx;
		bottom: 20upx;
		left: 30upx;
		padding: 30upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #f8d1a3;
		box-shadow: 0 4upx 8upx rgba(248, 209, 163, .3);
		border-radius: 100upx;
	}
</style>
