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
			<view class="cuIcon-roundcheck" style="font-size: 56upx;color: #fe5479;"></view>
			<view style="font-size: 36upx;margin-left: 20upx;">收款成功</view>
		</view>
		
		<view class="reservation-list-page" style="margin-top: 30upx;">
			<view class="reservation-list-item" style="">
				<view class="reservation-cotent" style="">
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;">
						<view class="flex justify-end align-center">
							<image :src="ordList.UserPoto" mode="scaleToFill" style="width: 46upx;height: 46upx;border-radius: 46upx;"></image>
							<view style="margin-left: 20upx;font-weight: 600;">
								<text>{{ordList.UserNeme}}</text>
							</view>
						</view>
						<view class="flex align-center" style="color: #999999;" @tap="callShop(userPhones)">
							<view class="hxIcon-dianhua2" style="font-size: 42upx;margin-right: 14upx;"></view>
							<view style="font-size: 28upx;color: #333333;">{{userPhones}}</view>
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 32upx;">
						<view style="width: 100%;">
							<view class="content-title-name flex align-center" style="">
								<view class="content-name-text flex align-center justify-center" style="font-size: 26upx;color: #777777;">
									<text>下单时间：{{beTime(ordList.AddDate)}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">订单编号：</text>
									<text style="font-size: 26upx;color: #777777;">{{ordList.No}}</text>
									<text style="font-size: 26upx;color: #333333;margin-left: 30upx;" @tap="copyBtn()">复制</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">消费：</text>
									<text style="font-size: 26upx;color: #777777;">￥</text>
									<text style="font-size: 28upx;color: #777777;">{{ordList.XFJE}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">实收：</text>
									<text style="font-size: 26upx;color: #777777;">￥</text>
									<text style="font-size: 28upx;color: #777777;">{{ordList.SJXFJE}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 40upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">收款方式：</text>
									<text style="font-size: 26upx;color: #777777;">{{ordList.ZFSortName}}</text>
								</view>
							</view>
							
							<!-- <view class="flex align-center justify-between" style="margin-top: 30upx;">
								<view class="flex align-center" style="color: #777777;">
									<text style="color: #777777;">手机号：</text>
									<text style="font-size: 26upx;color: #777777;">1564561530</text>
								</view>
								<view  @tap="callShop(121121)" class="flex align-center justify-center"  style="width: 146upx;height: 60upx;border-radius: 60upx;font-size: 24upx;color: #777777;border: 1upx solid #999999;line-height: 60upx;text-align: center;">
									联系他
								</view>
							</view> -->
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
			reservationList: [],
			storeid: 0,
			currentPage: 1,
			ordersList: [],
			TabCur: 0,
			tabList: [
				'全部订单',
				'已付款',
				'待评价',
				'退款/售后',
			],
			tabLists: [
				'全部订单',
				'待付款',
				'待使用',
				'待评价',
				'退款/售后'
			],
			tabListss: [
				'全部订单',
				'待付款',
				'待评价',
				'退款/售后'
			],
			storeSort: 0,
			tulist:[],
			state:[],
			inx: 1,
			Inx:2,
			StoreID: 0,
			IsLock:false,
			isShopowner:{},
			Ids:'',
			ordList:{},
			userPhones:''
		};
	},
	onLoad(option) {
		this.Ids = option.Ids
		
		this.$http.getxq(option.Ids).then(res => {
			console.log(res);
			if(res.IsSuccess){
				this.ordList = res.Data[0]
				this.userPhones = res.Data[0].Phone
			}
		})
		
	},
	onShow() {
		
	},
	methods: {
		copyBtn(){
			let _this = this
			uni.setClipboardData({
				data: _this.ordList.No,
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
		navList(item) {
			console.log(item)
			let addDate = item.BookAddDate|| item.AddDate
			if( item.BookID || item.DDID){
				uni.navigateTo({
					url: "/pages/person/bookOrderList?bookid=" + item.BookID + "&ddid=" + item.DDID + "&StoreId=" + item.StoreID
				})
			}else{
				uni.navigateTo({
					url: "/pages/person/bookOrderList?ycdate=" + item.YCDate+"&yctime="+ item.YCTime + "&num="+ item.Num+ "&phone="+ item.Phone + "&addDate="+addDate + "&state="+ item.State + "&StoreId=" + item.StoreID
				})
			}
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
		toPay(storeid,StoreName,LogoPic){
			if (this.$store.state.userInfo.ID) {
				uni.navigateTo({
					url:`/pages/scan/pay?type=shopDetail&storeid=${storeid}&StoreName=${encodeURIComponent(StoreName)}&LogoPic=${encodeURIComponent(LogoPic)}`
				})
			} else {
				this.$api.msg('请先登录');
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/common/login'
					})
				}, 1500);
			}
		},
		getType: function (item) {
			let BookID = item.BookID,
				DeskNo = item.DeskNO
			let DDID =  item.DDID
			if(!DDID){
				return '预约'
			}else{
				if(DeskNo == 0){
					return '预点餐'
				}else{
					return '点餐'
				}
			}
		},
		reservationCancle: function(id, index) {console.log(id)
			uni.showModal({
				title: '取消预约',
				content: '您将取消预约，取消后将无法恢复',
				cancelText: '我再想想',
				confirmText: '确定取消',
				success: res => {
					if (res.confirm) {
						this.$http.cancleReservition(this.$store.state.userInfo.ID, id)
							.then(res => {
								if (res.IsSuccess) {
									this.$set(this.reservationList[index], 'State', 7)
								}
							})
							.catch(err => {
								console.log(err);
							})
					}
				}
			})
		},
		gotoEvaluation: function(id) {
		    uni.navigateTo({
		        url: `/pages/person/orderEvaluation?storeid=${id}`
		    })
		},
		call: function (phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		checkAddZone(num) {
			return num < 10 ? '0' + num.toString() : num
		},
		getMoney: function (money) {
			return this.$api.formatAmount(money)
		},
		tabSelect: function (index) {
			this.TabCur = index
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			uni.showLoading({
				title: '数据加载中'
			})
			// this.currentPage = 1
			// this.$http.getAllOrdersList(this.storeid, this.TabCur, this.currentPage)
			// 	.then( res => {
			// 		if ( res.IsSuccess ) {
			// 			this.ordersList = res.Data
			// 		}
			// 		uni.hideLoading()
			// 	})
			// 	.catch( err => {
			// 		console.log(err);
			// 		uni.hideLoading()
			// 	})
			this.currentPage = 1
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur).then(res => {
				if (res.IsSuccess) {
					uni.hideLoading()
					this.ordersList = res.Data
					
					this.ordersList.forEach(item => {
						
						let tulists = JSON.parse(item.ShopContent)
						this.tulist.push(tulists[0].PicUrl)
						
						let DDList = item.ShopContent;
						let sum = 0;
						if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
								sum += dditem.selectCount;
							});
						}
							this.$set(item, 'sum', sum)
					})
				}
				})
				.catch(err => {
					console.log(err);
			})
			
			if(this.TabCur == 0){
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				.catch(err => {
					console.log(err);
				})
			};
			if(this.TabCur == 1){
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				.catch(err => {
					console.log(err);
				})
			};
			if(this.TabCur == 2){
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				.catch(err => {
					console.log(err);
				})
			};
			if(this.TabCur == 3){
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				.catch(err => {
					console.log(err);
				})
			};
			if(this.TabCur == 4){
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
				this.tulist = [];
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
		uni.showLoading({
			title: '加载中',
		});
		this.currentPage += 1
		this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
				if (res.IsSuccess) {
					this.reservationList = this.reservationList.concat(res.Data)
					if(res.Data.length == 0){
						this.currentPage --
					}
				}
				uni.hideLoading()
			})
			.catch(err => {
				console.log(err);
			})
	},
	onPullDownRefresh() {
		this.currentPage = 1
		this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
				if (res.IsSuccess) {
					this.reservationList = res.Data
					console.log(this.reservationList)
					this.reservationList.forEach(item => {
						let DDList = item.ShopContent;
						let sum = 0;
						if (DDList) {
							let list = JSON.parse(DDList);
							list.forEach(dditem => {
								sum += dditem.selectCount;
							});
						}
						this.$set(item, 'sum', sum)
					})
				}
			})
			.catch(err => {
				console.log(err);
			})
		uni.stopPullDownRefresh()
		uni.hideLoading()
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