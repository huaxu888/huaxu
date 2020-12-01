<template>
	<view style="background-color: #f2f2f2;">
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>核销记录</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>核销记录</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="flex align-center " style="width: 750upx;background-color: #ffffff;padding: 30upx;">
			<view style="font-weight: 600;width: 150upx;">
				<text style="color: #333333;">核销记录</text>
			</view>
			<view class="search flex align-center" style="">
				<text class="cuIcon-search" style="color: #999999;"></text>
				<input type="text" v-model="keyword" placeholder="查找" style="font-size: 26upx;margin-left: 10upx;color: #999999;" placeholder-class="placeholder" confirm-type="search" @blur="search"/>
			</view>
		</view>
		
		<view style="background-color: #eeeeee;height: 2upx;"></view>
		<view class="padding" style="width: 750upx;background-color: #ffffff;padding: 40upx 30upx;">
			<text style="color: #333333;font-weight: 600;">核销总计</text>
			<view class="flex justify-around" style="margin-top: 20upx;">
				<view class="text-center">
					<view style="font-size: 24upx;color: #999999;">合计(元)</view>
					<view style="font-weight: 600;font-size: 42upx;margin-top: 20upx;color: rgb(254, 84, 121);">{{changeMoney(HXTotalSum)}}</view>
				</view>
				<view class="text-center">
					<view style="font-size: 24upx;color: #999999;">核销数(份)</view>
					<view style="font-weight: 600;font-size: 42upx;margin-top: 20upx;">{{HXCount}}</view>
				</view>
			</view>
		</view>
		
		<view class="reservation-list-item" style="background-color: #ffffff;margin: 0;margin: 0 20upx;border-radius: 10upx;" v-for="(item, index) in tgList" :key="index">
			
			<view class="reservation-cotent" style="margin: 0 5upx;"  @tap="gotoshopApplied(item)">
				<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;">
					<view class="flex justify-end align-center">
						<view style="font-weight: 600;">
							<text style="color: #333333;">核销码：<text style="font-size: 30upx;">{{item.b.Code}}</text></text>
						</view>
					</view>
					<view class="flex align-center justify-center"  style="width: 146upx;height:60upx;border-radius:60upx;font-size: 24upx;color: #777777;border: 1.5upx solid #999999;line-height: 60upx;text-align: center;">
						查看详情
					</view>
				</view>
				
				<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 32upx;">
					<view style="">
						<image :src="item.b.Imge" mode="scaleToFill" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
					</view>
					<view style="margin-left: 25upx;">
						<view class="shengLv" style="font-size: 28upx;color: #333333;">
							<text>{{item.b.SetMealName}}</text>
						</view>
						
						<view class="flex justify-between">
							<view style="color: #fe4e01;margin-top: 30upx;">
								<text style="color: #333333;">实收：</text>
								<text style="font-size: 30upx;color: #fe5479;">￥</text>
								<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">{{changeMoney(item.b.TotalPrice)}}</text>
							</view>
							<view style="margin-top: 30upx;color: #666666;">
								<text>数量：</text>
								<text>{{item.b.Num}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex justify-between align-center" style="margin: 0 30upx;margin-bottom: 0;border-top: 1.5upx solid #e4e4e4;padding:30upx 0;">
					<view class="flex justify-end align-center">
						<view style="font-size: 24upx;color: #777777;">
							<text>核销时间：{{beTime(item.b.HxDate)}}</text>
						</view>
					</view>
					<view class="flex justify-end" style="">
						<view class=" flex align-center justify-center"  style="font-size: 24upx;color: #777777;text-align: center;">
							核销人：{{item.HXname}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import phoneButtom from '../components/poWers'
export default {
	data() {
		return {
			reservationList: [],
			storeid: 0,
			currentPage: 1,
			ordersList: [],
			TabCur: 0,
			storeSort: 0,
			tulist:[],
			state:[],
			StoreID: 0,
			IsLock:false,
			isShopowner:{},
			keyword:'',
			HXTotalSum:0,
			HXCount:0,
			tgList:[]
		};
	},
	onLoad(option) {
		this.Ids = option.Ids;
		
		this.$http.onSaleVer(option.Ids,[],1,10).then(res => {
			console.log(res);
			this.HXTotalSum = res.HXTotalSum
			this.HXCount = res.HXCount
			this.tgList = res.Data
		})
		
	},
	onShow() {
		
	},
	methods: {
		search: function (e) {
			this.keyword = e.detail.value
			this.$http.onSaleVer(this.Ids,this.keyword || [],1,10).then(res => {
				console.log(res);
				this.HXTotalSum = res.HXTotalSum
				this.HXCount = res.HXCount
				this.tgList = res.Data
			})
		},
		changeMoney(money) {
			if (money < 0.01) {
				return money;
			} else {
				return this.$api.formatAmount(money);
			}
		},
		gotoshopApplied(e){
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/shopApplied?Ids=' + e.b.ID
			})
		},
		gotoDetails(e){
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/shopOrderdetails?Ids=' + e.XFID
			})
		},
		gotoYuyue(e){
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/yuyueDetail'
			})
		},
		gotos(){
			uni.navigateTo({
				url:'/pages/shopDetail/refundTrade'
			})
		},
		gotoss(){
			uni.navigateTo({
				url:'/pages/shopDetail/verifiCation'
			})
		},
		changeBeTime(date) {
			if(date){
				return this.beTime(date)	
			}
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
		gotoEvaluation: function(id) {
		    uni.navigateTo({
		        url: `/pages/person/orderEvaluation?storeid=${id}`
		    })
		},
		call: function ( phone ) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		getTime: function (time) {
			let date = (time.split('(')[1].split(")")[0]) * 1
			return this.dateTimeFormatter(date)
		},
		dateTimeFormatter(t) {
			if (!t) return ''
			t = new Date(t).getTime()
			t = new Date(t)
			var year = t.getFullYear()
			var month = (t.getMonth() + 1)
			month = this.checkAddZone(month)
		
			var date = t.getDate()
			date = this.checkAddZone(date)
		
			var hour = t.getHours()
			hour = this.checkAddZone(hour)
		
			var min = t.getMinutes()
			min = this.checkAddZone(min)
		
			var se = t.getSeconds()
			se = this.checkAddZone(se)
		
			return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + se
		},
		checkAddZone(num) {
			return num < 10 ? '0' + num.toString() : num
		},
		getMoney: function (money) {
			return this.$api.formatAmount(money)
		},
		paraseContent: function (ShopContent) {
			let shop = JSON.parse(ShopContent)
			let count = 0
			shop.forEach( item => {
				count += item.selectCount
			})
			return count
		},
		refuseBook: function (item) {
			this.$http.refuseBook(item.Book.StoreID, item.Book.YYID)
			.then( res => {
				if (res.IsSuccess) {
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
	},
	onReachBottom() {
	
		this.currentPage += 1
		uni.showLoading({
			title: '加载中',
		});
		this.$http.onSaleVer(this.Ids,[],this.currentPage,10).then(res => {
			if (res.Data.length > 0) {
				this.tgList = this.tgList.concat(res.Data);
			} else {
				this.$api.msg('到底了~')
			}
			uni.hideLoading()
		})
	},
	onPullDownRefresh() {
		this.currentPage = 1
		
		this.$http.onSaleVer(this.Ids,this.keyword || [],this.currentPage,10).then(res => {
			if (res.Data.length > 0) {
				this.tgList = this.tgList.concat(res.Data);
			} else {
				this.$api.msg('到底了~')
			}
			uni.hideLoading()
		})
		
	},
	components: {
		phoneButtom,
	}
};
</script>

<style scoped lang="scss">
	.search {
		background-color: #f6f6f6;
		border-radius: 65rpx;
		text-align: left;
		height: 60rpx;
		width: 550upx;
		padding-left: 60upx;
	}
	
	page{
		background-color: #ffffff;
	}
	
	.cu-btn {
		background: #ffffff;
		margin: 15upx;
		border: 1px solid #f0f0f0;
		border-radius: 5upx;
	}
	$base-color: #f8d1a3;  //基准背景色
	
	.order-managment-page {
		.order-list {
			margin-top: 90upx;
		}
		
		.order-item {
			&:last-child {
				margin-bottom: 30upx;
			}
		}
		
		.order-date {
			color: #999999;
			padding: 30upx;
			
			.hxIcon-rili {
				color: #f5ccc3;
			}
		}
		
		.tab-active {
			color: #fe5479;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 86upx;
				height: 6upx;
				left: 50%;
				transform: translateX(-50%);
				width: 40upx;
				background-color: #fe5479;
			}
		}
		
		.order-item-buyer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 10upx;
			border-bottom: 2upx solid rgba($color: #000000, $alpha: .1);
		}
		
		.state-text {
			color: #fe4e01;
		}
		
		.text-black {
			color: #666666;
		}
		
		.order-img {
			width: 70upx;
			height: 70upx;
			min-width: 70upx;
			min-height: 70upx;
			border-radius: 100upx;
			margin-right: 20upx;
		}
		
		.order-info {
			padding: 30upx;
			position: relative;
		}
		
		.pay-icon {
			position: absolute;
			top: -50px;
			right: 30px;
			transform: scale(5);
			color: #aaa;
		}
		
		.order-btns {
			display: flex;
			flex-direction: row;
			
			.btn {
				border-radius: 100upx;
				border: 1px solid #333;
				margin-left: 20upx;
				padding: 5upx 20upx;
				color: #FFFFFF;
			}
			
			.cancle-btn {
				@extend .btn;
				border: 1px solid #f04921;
				background-color: #f04921;
			}
			
			.ship-btn {
				@extend .btn;
				border: 1px solid #ffdc9d;
				background-color: #ffdc9d;
			}
		}
	}
</style>

<style scoped lang="scss">
	$reservation-red: #fe4e01;
	$reservation-pink: #fae6e1;
	$content-title-img-size: 64upx;

	.reservation-list-page {

		.icon-calendar {
			color: lighten($reservation-red, 30);
			font-size: 40upx;
			margin-right: 20upx;
		}

		.reservation-cotent {
			background: #FFFFFF;
			border-radius: 10upx;
			// box-shadow: 0 0 14upx rgba($color: #000000, $alpha: .1);

			.content-title {
				margin: 0 30upx;
				padding: 0upx 0;
				height: 108upx;
				line-height: 108upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1.4upx solid  solid rgb(228, 228, 228);

				.content-name-text {
					color: #666666;
					font-size: 28upx;
				}

				.content-name-img {
					width: $content-title-img-size;
					height: $content-title-img-size;
					border-radius: 8upx;
					background-position: center;
					background-size: cover;
					margin-right: 20upx;
				}

				.state-text-success {
					color: $reservation-red;
				}

				.state-text {
					font-size: 26upx;
				}
			}

			.content-content {
				padding: 30upx;
				
				.bottom-content{
					height: 54upx;
				}
				
				.phone-text {
					color: $reservation-red;
				}
			}

			.reservation-info {
				width: 48%;
			}

			.reservation-btn {
				border-radius: 1000upx;
				// padding: 10upx 25upx;
				width: 150upx;
				height: 54upx;
				font-size: 26upx;
			}

			.cancle {
				color: $reservation-red;
				background: $reservation-pink;
			}
			
			.cancles {
				color: #777777;
				background: #FFFFFF;
				border: 1upx solid #e4e4e4;
			}
			
			.toPay {
				color: #FFFFFF;
				background: #f3982d;
			}
		}
	}
	
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>