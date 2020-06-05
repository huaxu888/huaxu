<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<block slot="content"><text class="text-bold">订单详情</text></block>
		</cu-custom>
		<!-- #endif -->

		<view class="order-list  margin-top-sm ">
			<view class="top-title ">
				<text class="text-bold">商品信息</text>
			</view>
			<view class="center-list " v-for="(item,index) of ShopContent" :key="index">
				<view class="flex align-center justify-between margin-tb-sm">
					<image :src="item.PicUrl" style="height: 80upx; width: 80upx;"></image>
					<view class="flex align-start justify-between flex-direction margin-left-sm" style="width: 40%;height: 80upx;">
						<text class="text-cut ">{{item.WMInfoTitle}}</text>
						<view>
							<text style="font-size: 24upx;color: #999999;"> {{ item.Tags ? item.Tags.title : '' }} x</text><text style="margin-left: 5upx;font-size: 24upx;color: #999999;">{{item.selectCount}}</text>
						</view>
					</view>
					<view class="flex align-end justify-end" style="width: 50%;">
						<text>&yen;</text><text class="margin-left-xxs">{{ accMul(item.selectCount, item.Tags ? item.Tags.price : item.Price) }}</text>
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
						{{ DDNO }}
					</view>
				</view>
			</view>
			
		</view>
		
		
		<!-- 自提点 -->
		
		<view class="order-list  margin-top-sm" v-if="DDpic">
			<view class="top-title ">
				<text class="text-bold">备注信息</text>
			</view>
			<view class="center-list ">
				<view class="flex align-center justify-between margin-tb">
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ DDpic }}
					</view>
				</view>
			</view>
		</view>

		<view class="flex align-center justify-center margin-tb">
			<text class="hxIcon-tishi"></text> <text class="tips margin-left-xs">如有问题请您<text class="margin-lr-xs text-blue light" @tap="call()">联系店铺</text>进行沟通</text>
		</view>

	</view>
</template>

<script>
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	import shipList from '@/common/shipList.js'
	import tuiTimeAxis from '@/components/time-axis/time-axis.vue'
	import tuiTimeAxisItem from '@/components/timeaxis-item/timeaxis-item.vue'
	export default {
		components: { tuiTimeAxis, tuiTimeAxisItem },
		data() {
			return {
				bookid: '',
				orderItme: '',
				sumMoney: 0,
				sum: 0, //个数
				DDState: '',
				AddDate: '',
				DDID: '',
				ShopContent: [],
				ycdate: '',
				yctime: '',
				num: '',
				phone: '',
				StoreId: 0,
				type: 0,
				addr: {},
				DDNO: '',
				storeSort: 0,
				logisticsInfo: '',
				logisticsState: 2,
				code: '',
				bookOrderList: '',
				isSpecial:'',
				isSyPoint:'',
				userid:'',
				DDpic: ''
			}
		},

		async onLoad(option) {
			
			// this.$http.getToPoint().then(res => {
			// 		console.log(res)
			// 	}).catch(err => {
					
			// })
			// this.$http.getxq(option.xfid).then(res => {
			// 	console.log(res)
			// 	this.storeName = res.StoreName
			// 	this.info = res.Info
			// 	this.AddDate = res.AddDate;
			// 	this.DDState = res.Sort;
			// }).catch(err => {
				
			// })
			if (option.StoreId) {
				this.StoreId = option.StoreId
			}
			if(option.bookid && option.bookid != 0){
				this.bookid = option.bookid	;
				
				await this.getOrderItembyBookid();
			}else if(option.ddid){
				this.DDID = option.ddid;
				await this.getOrderItembyDdid();
			}
			// else if(option.ycdate){
			// 	this.info = option.info
			// 	this.ycdate = option.ycdate;
			// 	this.yctime = option.yctime;
			// 	this.num = option.num;
			// 	this.phone = option.phone;
			// 	this.AddDate =option.addDate;
			// 	this.DDState = option.state;
			// } 
			// else{
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// }
		},
		methods: {
			accMul(arg1,arg2){
				return this.$api.accMul(arg1,arg2)
			},
			call: function () {
				uni.makePhoneCall({
					phoneNumber: this.storePhone
				})
			},
			clickhandle: function (e) {
				
			},
			getStatus: function (status) {
				let result
				switch (status) {
					case 1:
						result = '待付款'
						break;
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
						result = '发货'
						break;			
					case 11:
						result = '待发货'
						break;	
					case 12:
						result = '确认收货'
						break;	
					
					default:
						break;
				}
				return result
			},
			getLogisticsState: function (status) {
				let result
				switch (Number(status)) {
					case 0:
						result = '在途'
						break
					case 1: 
						result = '揽收'
						break
					case 2:
						result = '疑难'
						break;
					case 3:
						result = '签收'
						break;
					case 4:
						result = '退签'
						break;
					case 5:
						result = '派件'
						break;
					case 6:
						result = '退回'
						break;
					case 7:
						result = '转投'
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
						this.storeSort = res.StoreSort
						this.UserAddressID = res.Data.UserAddressID
						this.storePhone = res.Data.StorePhone
						this.isSpecial = res.Data.IsSpecial
						this.isSyPoint = res.Data.IsSyPoint
						this.SelfAdressID = res.Data.SelfAdressID
						this.DDpic = res.Data.DDPic
						
						this.ShopContent = JSON.parse(res.Data.ShopContent)
						
						let sum = 0;
						let sumMoney = 0;
						if (this.ShopContent) {
							
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
						this.type = res.Data[0].ConsumedWay
						this.UserAddressID = res.Data[0].UserAddressID
						this.DDNO = 'DD20200101000000' + res.Data[0].DDID
						this.storePhone = res.Data[0].StorePhone
						this.DDpic = red.Data[0].DDPic
						this.userid = res.Data[0].UserID
						
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
						this.getQRcode()
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
	
	.qrcode {
		width: 400upx;
		height: 400upx;
	}
</style>
