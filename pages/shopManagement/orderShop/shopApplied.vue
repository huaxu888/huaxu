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
		
		<view class="flex justify-left align-center" style="height: 100upx;background-color: #fdf4f5;border-top: 1.5upx solid #e4e4e4;">
			<view style="font-size: 26upx;margin-left: 20upx;" class="flex justify-left align-center">
				<view class="hxIcon-hexiao" style="font-size: 48upx;color: #fe5479;margin-right: 14upx;"></view>
				已核销
			</view>
		</view>
		
		<view class="reservation-list-page">
			<view class="reservation-list-item">
				<view class="reservation-cotent">
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;margin-top: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;" >
						<view class="flex justify-end align-center">
							<image :src="objList.FaceUrl" mode="scaleToFill" style="width: 46upx;height: 46upx;border-radius: 46upx;"></image>
							<view style="margin-left: 20upx;font-weight: 600;">
								<text>{{objList.UserName}}</text>
							</view>
						</view>
						<view class="flex align-center" style="color: #999999;" @tap="callShop(Phones)">
							<view class="hxIcon-dianhua2" style="font-size: 42upx;margin-right: 14upx;"></view>
							<view style="font-size: 28upx;color: #333333;">{{objList.UserPhone}}</view>
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 32upx;">
						<view style="">
							<image :src="objLists.Imge" mode="scaleToFill" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;">
							<view style="font-size: 28upx;color: #333333;" class="shengLv">
								<text>{{objLists.SetMealName}}</text>
							</view>
							
							<view class="flex justify-between">
								<view style="color: #fe4e01;margin-top: 30upx;">
									<text style="color: #333333;">总额：</text>
									<text style="font-size: 30upx;color: #fe5479;">￥</text>
									<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">{{objLists.TotalPrice}}</text>
								</view>
								<view style="margin-top: 30upx;color: #666666;">
									<text>数量：</text>
									<text>{{objLists.Num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="height: 100upx;line-height: 100upx;font-weight: 600;margin-left: 30upx;">
			订单信息
		</view>
		
		<view class="" style="background-color: #ffffff;font-size: 26upx;">
			<view class="flex justify-between align-center" style="margin: 0 30upx;padding: 30upx 0;border-bottom: 1.5upx solid #e4e4e4;">
				<view style="color: #777777;font-size: 26upx;">
					订单编号：
				</view>
				<view style="color: #333333;">
					{{objList.OrderNO}}
				</view>
			</view>
			<view class="flex justify-between align-center" style="margin: 0 30upx;padding: 30upx 0;">
				<view style="color: #777777;font-size: 26upx;">
					下单时间：
				</view>
				<view>
					{{beTime(objList.AddDate)}}
				</view>
			</view>
		</view>
		
		<view style="height: 100upx;line-height: 100upx;font-weight: 600;margin-left: 30upx;">
			核销信息
		</view>
		
		<view class="" style="background-color: #ffffff;font-size: 26upx;">
			<view class="flex justify-between align-center" style="margin: 0 30upx;padding: 30upx 0;border-bottom: 1.5upx solid #e4e4e4;">
				<view style="color: #777777;font-size: 26upx;">
					核销码：
				</view>
				<view style="color: #333333;">
					{{objLists.Code}}
				</view>
			</view>
			<view class="flex justify-between align-center" style="margin: 0 30upx;padding: 30upx 0;border-bottom: 1.5upx solid #e4e4e4;">
				<view style="color: #777777;font-size: 26upx;">
					核销人：
				</view>
				<view style="color: #333333;">
					{{objList.HXname}}
				</view>
			</view>
			<view class="flex justify-between align-center" style="margin: 0 30upx;padding: 30upx 0;">
				<view style="color: #777777;font-size: 26upx;">
					核销时间：
				</view>
				<view style="color: #333333;">
					{{beTime(objLists.HxDate)}}
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
			objList:{},
			Phones:'',
			objLists:{}
		};
	},
	onLoad(option) {
		this.Ids = option.Ids;
		
		this.$http.tcDetails(option.Ids).then(res => {
			console.log(res);
			this.objList = res.Data
			this.objLists = res.Data.b
			this.Phones = this.objList.UserPhone
		})
		
	},
	onShow() {
		
	},
	methods: {
		callShop(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		gotoShop(){
			uni.navigateTo({
				
			})
		},
		copyBtn(){
			uni.setClipboardData({
				data: 'hello uniapp',
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