<template>
	<view class="order-managment-page">
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>订单详情</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>订单详情</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="flex justify-center align-center" style="height: 160upx;background-color: #FFFFFF;border-top: 1.5upx solid #e4e4e4;">
			<view class="cuIcon-roundcheck" style="font-size: 56upx;color: #fe4e01;"></view>
			<view style="font-size: 36upx;margin-left: 20upx;">支付成功</view>
		</view>
		
		<view class="reservation-list-page" style="margin-top: 30upx;">
			<view class="reservation-list-item" style="">
				<view class="reservation-cotent" style="">
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;" @tap="gotoShop(xfXqList.StoreID)">
						<view class="flex justify-end align-center">
							<view class="hxIcon-dianpu1 " style="font-size: 36upx;color: #aaaaaa;"></view>
							<view style="margin-left: 10upx;font-weight: 600;font-size: 30upx;color: #333333;">
								<text>{{xfXqList.StoreName}}</text>
							</view>
						</view>
						<view class="hxIcon-rightArrow" style="font-size: 30upx;color: #999999;"></view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 32upx;">
						<view style="width: 100%;">
							<view class="content-title-name flex align-center" style="">
								<view class="content-name-text flex align-center justify-center" style="font-size: 26upx;color: #777777;">
									<text>下单时间：{{changeBeTime(xfXqList.AddDate)}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">订单编号：</text>
									<text style="font-size: 26upx;color: #777777;">{{xfXqList.No}}</text>
									<text style="font-size: 26upx;color: #333333;margin-left: 30upx;" @tap="copyBtn">复制</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">消费：</text>
									<text style="font-size: 26upx;color: #777777;">￥</text>
									<text style="font-size: 28upx;color: #777777;">{{xfXqList.XFJE}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;" v-if="xfXqList.YHQNum != 0">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">{{xfXqList.YHQSName}}：</text>
									<text style="font-size: 26upx;color: #fe4e01;font-weight: 600;">-￥</text>
									<text style="font-size: 28upx;color: #fe4e01;font-weight: 600;">{{xfXqList.YHQNum}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">实付：</text>
									<text style="font-size: 26upx;color: #777777;">￥</text>
									<text style="font-size: 28upx;color: #777777;">{{xfXqList.SJXFJE}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">付款方式：</text>
									<text style="font-size: 26upx;color: #777777;">{{xfXqList.ZFSortName}}</text>
								</view>
							</view>
							
							<view class="flex align-center justify-between" style="margin-top: 40upx;">
								<view class="flex align-center" style="color: #777777;">
									<text style="color: #777777;">手机号：</text>
									<text style="font-size: 26upx;color: #777777;">{{xfXqList.Phone}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			xfXqList: [],
			storeid: 0,
			currentPage: 1,
			ordersList: [],
			TabCur: 0,
			storeSort: 0,
			tulist:[],
			state:[],
			inx: 1,
			Inx:2,
			StoreID: 0,
			IsLock:false,
			isShopowner:{},
		};
	},
	onLoad(option) {
		this.xfid = option.xfid;
		
		
		this.currentPage = 1
		console.log(this.TabCur);
		console.log(this.TabCur + 1)
		this.$http.getxq(this.xfid).then(res => {
			console.log(res);
			if (res.IsSuccess) {
				this.xfXqList = res.Data[0]
			}
		})
		.catch(err => {
			console.log(err);
		})
	},
	onShow() {
		
	},
	methods: {
		
		gotoShop(e){
			uni.navigateTo({
				url:'/pages/shopDetail/shopDetailPage?StoreID=' + e
			})
		},
		copyBtn(e){
			let _this = this
			uni.setClipboardData({
				data: _this.xfXqList.No,
				success: function() {
					uni.showToast({
						title: '已复制到剪贴板',
						duration: 3000,
						icon: 'none'
					});
				},
				fail: function(err) {
					uni.showToast({
						title: '复制失败',
						duration: 3000,
						icon: 'none'
					})
				}
			})
		},
		callShop(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		qiHu(e){
			this.inx = e
		},
		changeBeTime(date) {
			if(date){
				return this.beTime(date)	
			}
		},
		call: function (phone) {
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
		}
	},
	onReachBottom() {
		
	},
	onPullDownRefresh() {
		
	}
}
</script>

<style scoped lang="scss">
	page{
		background-color: #f8f8f8;
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
</style>