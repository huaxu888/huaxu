<template>
	<view class="order-managment-page">
		<cu-custom bgColor="bg-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>我的订单</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText"><text>我的订单</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
			<scroll-view scroll-x class="bg-white nav shadow" style="position: fixed; z-index: 99;" v-if="storeSort != 1">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)"  style="margin: 0">
						{{item}}
					</view>
				</view>
			</scroll-view>
		<!-- #endif -->
		
		<!-- #ifdef MP-ALIPAY -->
			<scroll-view scroll-x class="bg-white nav shadow" style="z-index: 99;" v-if="storeSort != 1">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)"  style="margin: 0">
						{{item}}
					</view>
				</view>
			</scroll-view>
		<!-- #endif -->
		
		
		<view class="order-list">
			<view class="order-item" style="margin: 0 30upx;margin-top: 30upx;" v-for="(item, index) in ordersList" :key="index" @tap="detail(item)">
				<!-- <view class="order-date">
					<text class="hxIcon-rili margin-right-sm"></text>
					<text v-if="item.DingDan">{{ beTime(item.DingDan.AddDate) }}</text>
					<text v-if="item.Book && !item.DingDan">{{ beTime(item.Book.AddDate) }}</text>
					
				</view> -->
				
				<view class="bg-white padding shadow radius">
					<view class="order-item-buyer">
						<view class="flex align-center">
							
							<view class="order-img" :style="{background: 'url(' + item.LogoPic + ') 0% 0% / cover'}"></view>
							<text>{{item.StoreName}}</text>
							<!-- <text>{{ item.Nick }}</text>
							<text class="margin-left-xs cu-tag bg-yellow round sm" v-if="item.Book && item.Book.ConsumedWay == 1">外卖</text> -->
						</view>
						<text class="state-text">{{ getStatus(item.State) }}</text>
						<!-- <text class="state-text" v-if="item.Book && !item.DingDan">{{ item.Book.State }}</text> -->
					</view>
					<view class="order-info">
						<!-- <view class="flex flex-direction align-center margin" v-if="item && item.State == '待支付'">
							<text>——</text>
							<text>订单待支付</text>
						</view>
						<view class="flex flex-direction" v-if="item.Book">
							<text class="text-black text-bold flex padding-tb-sm">
								<text class="hxIcon-renshu"></text>
								<text class="margin-lr-sm">{{ item.Book.Contacts}}{{ item.Book.Sex  == 0 ? '先生' : '女士' }}</text>
							</text>
							<text class="text-black text-bold flex">
								<text class="hxIcon-yuyue"></text>
								<text class="margin-lr-sm">{{ item.Book.YCDate}}</text>
								<text>{{ item.Book.YCTime}}</text>
							</text>
							<text class="text-black text-bold flex padding-tb-sm">
								<text class="hxIcon-renshu"></text>
								<text class="margin-lr-sm">{{ item.Book.Num}}</text>
							</text>
							<text class="text-black text-bold flex">
								<text class="hxIcon-shouji2"></text>
								<text class="margin-lr-sm" @tap="call(item.Book.Phone)">{{ item.Book.Phone}}</text>
							</text>
							<view class="flex text-black align-center margin-top-sm" v-if="item.Book.Info">
								<text class="hxIcon-pingjia"></text>
								<text class="margin-left-xss text-bold flexss">备注信息：</text>
								<text class="flexs text-bold">{{item.Book.Info || info}}</text>
							</view>
						</view> -->
						<view class="card-body flex">
							<view class="cu-avatar radius lg" :style="{backgroundImage: item.LogoPic === '' ? 
							'url(https://img.huaxuapp.com/huaxulogo.jpg)': 'url(' + tulist[index] + ')'}">
							</view>
							
							<view class="flex-sub flex flex-direction justify-end margin-left text-sm">
								<text>下单时间：<text>{{ beTime(item.AddDate) }}</text></text>
								<text>总价：￥{{ item.SalePrice }}</text>
							</view>
						</view>
					</view>
					<view class="order-sum flex justify-end align-center">
						<!-- <view v-if="item" class="text-gray text-sm flex align-end flex-sub">
							<text class="margin-left-sm">
								总价：
								<text class="text-black text-bold text-lg">￥{{ item }}</text>
							</text>
						</view> -->
						<!-- <view class="order-btns" v-if="item.Book">
							<view class="cancle-btn" v-if="item.Book.State === '已预约'" @tap="refuseBook(item)">
								<text>拒绝预约</text>
							</view>
						</view> -->
						<view class="card-footer flex justify-end">
						    <view class="cu-btn"  @tap="gotoEvaluation(item.StoreID)" v-if="TabCur == 2">
						        去评价
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
			storeid: 0,
			currentPage: 1,
			ordersList: [],
			TabCur: 0,
			tabList: [
				'全部订单',
				'待评价',
				'退款/售后',
				'已取消'
			],
			storeSort: 0,
			tulist:[],
			state:[]
		};
	},
	onLoad(option) {
		this.TabCur = option.index
		if (option.storeid) {
			this.storeid = option.storeid;
		}
		if (option.sort) {
			this.storeSort = option.sort
		}
		if (option.TabCur) {
			this.TabCur = option.TabCur
		}
		uni.showLoading({
			title: '数据加载中',
		})

	},
	onShow() {
		// this.$http.getAllOrdersList(this.storeid, this.TabCur, this.currentPage)
		// 	.then(res => {
		// 		if (res.IsSuccess) {
		// 			this.ordersList = res.Data
		// 			this.ordersList.forEach(item => {
		// 				if(item.DingDan) {
		// 					item.DingDan.AddDate = this.getTime(item.DingDan.AddDate)
		// 					item.DingDan.DDState = this.getStatus(item.DingDan.DDState)
		// 					item.DingDan.Num = this.paraseContent(item.DingDan.ShopContent)
		// 					item.DingDan.DDMoney = this.$api.formatAmount(item.DingDan.DDMoney)
		// 				} else if (item.Book) {
		// 					item.Book.AddDate = this.getTime(item.Book.AddDate)
		// 					item.Book.State = this.getStatus(item.Book.State)
		// 				}
		// 			})
		// 			;
		// 			uni.hideLoading()
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
		this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1).then(res => {
			if (res.IsSuccess) {
				uni.hideLoading()
				
				res.Data.forEach(item => {
					this.state.push(item.State)
				})
				
				this.ordersList = res.Data
 				    
				console.log(this.ordersList)	
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
	},
	methods: {
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
			// if(this.TabCur == 0){
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1).then(res => {
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
			// };
			return
			if(this.TabCur == 1){

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

			};
			if(this.TabCur == 2){
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
			};
			if(this.TabCur == 3){
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
			};
			if(this.TabCur == 4){
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
			};
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
					// if (item.DingDan) {
					// 	this.$set(item.DingDan, 'DDState', 6)
					// }
					// this.$set(item.Book, 'State', 6)
				}
			})
			.catch( err => {
				console.log(err);
			})
		},
		detail: function (item) {
			console.log(item)
			uni.navigateTo({
				url: '/pages/person/bookOrderList?ddid=' + item.DDID
			})
		},
		getStatus: function (status) {
			
			let sort
			switch (status) {
				case 1:
					sort = '待付款'
					break;
				case 2:
					sort = '已支付'
					break;
				case 3:
					sort = '已点单'
					break;
				case 4:
					sort = '已结算'
					break;
				case 5:
					sort = '已预约'
					break;
				case 6:
					sort = '已拒绝'
					break;
				case 7:
					sort = '已取消'
					break;	
				case 8:
					sort = '已完成'
					break;
				case 9:
					sort = '已超时'
					break;
				case 10:
					sort = '发货'
					break;			
				case 11:
					sort = '待发货'
					break;	
				case 12:
					sort = '确认收货'
					break;	

				default:
					break;
			}
			return sort
		}
	},
	onReachBottom() {
		uni.showLoading({
			title: '数据加载中'
		})
		this.currentPage ++
		this.$http.getAllOrdersList(this.storeid, this.TabCur + 1, this.currentPage)
			.then( res => {
				if (res.IsSuccess) {
					this.ordersList.push(...res.Data)
					uni.hideLoading()
					if(res.Data.length == 0) {
						this.currentPage --
					}
				}
			})
			.catch( err => {
				console.log(err);
			})
	},
	onPullDownRefresh() {
		this.currentPage = 1
		this.$http.getAllOrdersList(this.storeid, this.TabCur + 1, this.currentPage)
			// .then( res => {
			// 	if (res.IsSuccess) {
			// 		this.ordersList = res.Data
				
			// 	}
			// 	uni.stopPullDownRefresh()
			// })
			// .catch( err => {
			// 	console.log(err);
			// 	uni.stopPullDownRefresh()
			// })
			.then( res => {
				if (res.IsSuccess) {
					this.ordersList.push(...res.Data)
					uni.hideLoading()
					if(res.Data.length == 0) {
						this.currentPage --
					}
				}
				uni.stopPullDownRefresh()
			})
			.catch( err => {
				console.log(err);
				uni.stopPullDownRefresh()
			})
	}
};
</script>

<style scoped lang="scss">
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
			color: #333333;
			font-weight: bold;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 2.2em;
				height: 10upx;
				left: 50%;
				transform: translateX(-50%);
				width: 20%;
				border-radius: 100upx;
				background-color: #f04921;
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
			color: #f04921;
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
