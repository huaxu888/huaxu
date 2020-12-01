<template>
	<view style="height: 100%;position: relative;">
		<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 || MP-ALIPAY -->
			<cu-custom  bgColor="bg-whitesss" :isBack="true" class="text-black bgclo"  style="height: 100%;">
				<block slot="content" class="text-bold bgclo" style="width: 100%;">超值秒杀</block>
			</cu-custom>
		<!-- #endif -->
		<view class="coupon-redemption-page"  style="height: 100%;"  v-if="couponList">
			<view class="coupon-list" >
				<view class="coupon-item" v-for="(item, index) in couponList" :key="index">
					<view class="padding-bottom-xs flex"  @tap="shopDetail(item.StoreID)">
						<image :src="item.Logo ==''?'https://img.huaxuapp.com/huaxulogo70px.png':item.Logo" mode="aspectFill" class="avatar" style="width: 68upx;height: 68upx;border: 1upx solid #BCBABB;"></image>
						<view style="margin-left: 20upx;">
							<view>
								<text style="font-weight: 600;"> {{ ' ' + item.StoreName }}</text>
							</view>
							<view style="color: #999999;margin-top: 4upx;font-size: 22upx;">
								<text>{{item.StoreStar}}分</text>
								<text style="margin-left: 4upx;margin-right: 4upx;">|</text>
								<text>￥{{item.RenJunXiaoFei || '/'}}人均</text>
								<text style="margin-left: 4upx;margin-right: 4upx;">|</text>
								<text>{{item.StoreSortName}}</text>
								<text style="position: absolute;right: 30upx;">{{item.StoreSiteName}}
									<text style="margin-left: 4upx;margin-right: 4upx;">|</text>
									<text>{{getDistance(item.Distandce)}}</text>
								</text>
							</view>
						</view>
					</view>
					<view style="margin-top: 12upx;">
						<view style="background-image: url(https://img.huaxuapp.com/690-216qq.png);
						background-repeat: no-repeat;width: 690upx;height: 216upx;background-size: cover;padding: 30upx 30upx;padding-top: 20upx; position: relative;">
							<view  @tap="shopDetail(item.StoreID)">
								<text style="font-weight: 600;font-size: 36upx;">
									{{yinHang(daiJin[index])}}
								</text>
							</view>
							<view style="margin-top: 18upx;"  @tap="shopDetail(item.StoreID)">
								<text style="font-size: 24upx;">{{item.Info}}<text style="margin:  0 10upx;">|</text>不可叠加</text>
							</view>
							<view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 1">
								<text style="color: rgb(254, 78, 1);">￥</text>
								<text style="color: rgb(254, 78, 1);font-size: 46upx;font-weight: 600;">{{item.CouponNum2}}</text>
								<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;" v-if="item.CouponNum1 !== 0">{{jieQu(item.ZheKou)}}折
								</text>
								<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;" v-if="item.CouponNum1 == 0">无门槛
								</text>
								<text style="font-size: 100;color: #999999;font-size: 24upx;margin-left: 8upx;" v-if="item.CouponNum1 !== 0">
									满{{item.CouponNum1}}可用
								</text>
								<view style="position: absolute;right: 0upx;top: 18upx;">
									<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
								</view>
							</view>
							<!-- <view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 6">
								<text style="color: rgb(254, 78, 1);">￥</text>
								<text style="color: rgb(254, 78, 1);font-size: 42upx;font-weight: 600;">{{item.CouponNum1}}</text>
								<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;">{{jieQu(item.ZheKou)}}折
								</text>
								<text style="font-size: 100;color: #999999;font-size: 24upx;text-decoration: line-through;margin-left: 8upx;">
									原价：{{item.CouponNum2}}
								</text>
								<view style="position: absolute;right: 0upx;top: 10upx;">
									<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
								</view>
							</view> -->
							<view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 7">
								<text style="color: rgb(254, 78, 1);">￥</text>
								<text style="color: rgb(254, 78, 1);font-size: 46upx;font-weight: 600;">{{item.CouponNum2}}</text>
								<text style="font-size:22upx;background-color: rgb(254, 78, 1);color: #FFFFFF;border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;">满赠
								</text>
								<text style="font-size: 100;color: #999999;font-size: 24upx;margin-left: 8upx;">
									实付满{{item.CouponNum1}}送
								</text>
								<view style="position: absolute;right: 0upx;top: 18upx;">
									<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
								</view>
							</view>
							<view style="padding: 8upx 30upx;position: absolute;right: 30upx;top: 86upx;background-color: rgb(254, 78, 1);color: #FFFFFF;border-radius: 50upx;" @tap="getCoupon(item)">
								抢券
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;height: 400upx;margin-top:160upx;" v-if="couponList == false">
			<image src="https://img.huaxuapp.com/5cad402bbc803_03.png" mode="aspectFill" style="width: 200upx;height: 200upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">暂时没有相关优惠券</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponList: [],
				currentPage: 1,
				keyword: '',
				sortList: ['全部'],
				sortIds: [0],
				currentSort: 0,
				hotSou:[],
				centerLBLlit:[],
				indexs:5,
				scrollTop: 0,
				isSticky: false,
				CustomBar: this.CustomBar,
				StoreSortID:0,
				sortid: 0,
				siteId: 0,
				paixu: 0,
				CouponType: 0,
				pagesize: 10,
				daiJin: [],
				location: '',
			};
		},
		onShow() {
			uni.getLocation({
				success: res => {
					this.location = `${res.longitude},${res.latitude}`
					this.$store.commit('setLatitudeAndLongitude', {
						latitude:res.latitude,
						longitude:res.longitude
					})
					this.currentPage = 1
					
					this.$http.fivCou(0.2,this.currentPage,this.pagesize,this.location || '107.02,33.07').then(res => {
						this.couponList = res.Data
						if(res.Data){
							res.Data.forEach((item,i) => {
								if(item.CouponType == 1){
									// this.daiJin[i] = `${item.CouponNum1}元购「${item.StoreName}」${item.CouponNum2}元代金券`
									if(item.CouponNum1 == 0){
										this.daiJin[i] = `「${item.StoreName}」消费立减${item.CouponNum2}`
									} else {
										this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}减${item.CouponNum2}`
									}
								} else {
									this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}立送${item.CouponNum2}`
								}
							})
						} else {
							this.couponList = []
						}
					})
				},
				fail: err => {
					this.location = []
					uni.showModal({
						title: '拒绝授权',
						content: '您拒绝花蓄使用的位置权限，我们将无法为您提供基于位置的服务',
						showCancel: false
					})
				}
			})
			// <param name="page"></param>
			        /// <param name="pagesize"></param>
			        /// <param name="location">用户定位</param>
			
		},
		onLoad() {
			
			this.currentPage = 1
			this.$http.fivCou(0.2,this.currentPage,this.pagesize,this.location || '107.02,33.07').then(res => {
				this.couponList = res.Data
				if(res.Data){
					res.Data.forEach((item,i) => {
						if(item.CouponType == 1){
							// this.daiJin[i] = `${item.CouponNum1}元购「${item.StoreName}」${item.CouponNum2}元代金券`
							if(item.CouponNum1 == 0){
								this.daiJin[i] = `「${item.StoreName}」消费立减${item.CouponNum2}`
							} else {
								this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}减${item.CouponNum2}`
							}
						} else {
							this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}立送${item.CouponNum2}`
						}
					})
				} else {
					this.couponList = []
				}
			})
		},
		// onPageScroll: function(Object) {
		// 	this.scrollTop = Object.scrollTop;
		// 	console.log(Object.scrollTop);
		// },
		onPageScroll(e) {
			if (e.scrollTop >= 320) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
		},
		methods: {
			hotSous(e){
				console.log(e.StoreSortID)
				this.$http.twoQuan(e.StoreSortID,1,10).then(res => {
					console.log(res);
					this.couponList = res.Data
					res.Data.forEach((item,i) => {
						if(item.CouponType == 1){
							// this.daiJin[i] = `${item.CouponNum1}元购「${item.StoreName}」${item.CouponNum2}元代金券`
							if(item.CouponNum1 == 0){
								this.daiJin[i] = `「${item.StoreName}」消费立减${item.CouponNum2}`
							} else {
								this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}减${item.CouponNum2}`
							}
						} else {
							this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}立送${item.CouponNum2}`
						}
					})
				})
			},
			jieQu(num){
				return( Math.round(num*100)/10);
			},
			yinHang(bankNumber){
				if(bankNumber.length > 16){
					return bankNumber.substr(0,16)+"...";
				} else {
					return bankNumber;
				}
			},
			getDistance(distance) {
				console.log(distance);
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} Km`
				}
			},
			getCou(){
				// this.$http.qianQuan(this.keyword || 0,sortid,siteId,paixu,CouponType,page,pagesize,location).then(res => {
				// 	console.log(res);
				// })
			},
			goGod(e){
				
			},
			backtop(){
				uni.pageScrollTo({
				    scrollTop: 306,
				    duration: 300
				});
			},
			selectIndex: function(item){
				
				if(this.indexs == item.id){
					this.indexs = 5
				} else {
					this.indexs = item.id
				}
			},
			queryCoupons: function () {
				// uni.showLoading({
				// 	title: '加载中……'
				// })
				// this.$http.searchCoupon(this.keyword || '0', this.sortIds[this.currentSort], this.currentPage)
				// 	.then(res => {
				// 		if (res.IsSuccess) {
				// 			if (this.currentPage === 1) {
				// 				this.couponList = res.Data
				// 			} else {
				// 				if (res.Data.length !== 0) {
				// 					this.couponList.push(...res.Data)
				// 				} else {
				// 					this.$api.msg('没有更多了')
				// 					this.currentPage -= 1
				// 				}
				// 			}
				// 			res.Data.forEach(item => {
				// 				if (!this.sortList.includes(item.SortName)) {
				// 					this.sortList.push(item.SortName)
				// 					this.sortIds.push(item.SortID)
				// 				}
				// 			})
							
				// 		} else {
				// 			this.$api.msg('当前没有优惠券')
				// 		}
				// 		uni.hideLoading()
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 		uni.hideLoading()
				// 	})
			},
			getCoupon: function (item) {
				if (this.getStatus(item)) {
					uni.showModal({
						content: '您来晚啦，优惠券被领光啦~',
						showCancel:false
					})
					return
				}
				if (this.$store.state.userInfo) {
					this.$http.getCoupon(this.$store.state.userInfo.ID, item.CouponId)
						.then(res => {
							if (res.IsSuccess) {
								uni.showModal({
									title: '领取优惠券',
									content: '恭喜您，领到优惠券一张，快去使用吧！',
									confirmText: '去用券',
									cancelText: '去看看',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/shopDetail/shopDetailPage?StoreID=' + item.StoreID
											})
										} else {
											uni.navigateTo({
												url: '/pages/person/myCoupon/myCouponPage'
											})
										}
									}
								})
								this.queryCoupons()
							} else {
								uni.showModal({
									title: '领取优惠券',
									content: res.Msg,
									confirmText: '去看看',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/person/myCoupon/myCouponPage'
											})
										}
									}
								})
							}
						})
						.catch(err => {
							console.log(err);
							this.$api.msg(err.Msg)
							this.couponList = []
						})
				} else {
					uni.showModal({
						title: '您还没有登陆',
						content: '请您先登录，再领取优惠券',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/login'
								})
							}
						}
					})
				}
			},
			getStatus: function (item) {
				return item.Num <= 0
			},
			search: function () {
				this.currentPage = 1
				this.$http.searchCoupon(this.keyword, this.currentSort, this.currentPage)
					.then(res => {
						console.log(res);
						if (res.IsSuccess) {
							this.couponList = res.Data
						}
					})
			},
			selectSort: function (index) {
				this.currentSort = index
				this.queryCoupons()
			},
			shopDetail: function (storeID) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetailPage?StoreID=' + storeID
				})
			}
		},
		async onReachBottom() {
			this.currentPage += 1
			uni.showLoading({
				title: '加载中',
				mask: false
			});
				
			await this.$http.fivCou(0.2,this.currentPage,this.pagesize,this.location || '107.02,33.07').then(res => {
				if (res.Data.length > 0) {
					this.couponList = this.couponList.concat(res.Data);
					this.couponList.forEach((item,i) => {
						if(item.CouponType == 1){
							// this.daiJin[i] = `${item.CouponNum1}元购「${item.StoreName}」${item.CouponNum2}元代金券`
							if(item.CouponNum1 == 0){
								this.daiJin[i] = `「${item.StoreName}」消费立减${item.CouponNum2}`
							} else {
								this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}减${item.CouponNum2}`
							}
							uni.hideLoading()
						} else {
							this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}立送${item.CouponNum2}`
							uni.hideLoading()
						}
					})
				} else {
					this.$api.msg('已经到最底啦~')
					uni.hideLoading()
				}
			}).catch(err => {
				console.log(err);
				uni.hideLoading()
			})
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
			this.currentPage = 1
			this.$http.fivCou(0.2,this.currentPage,this.pagesize,this.location || '107.02,33.07').then(res => {
				this.couponList = res.Data
				if(res.Data){
					res.Data.forEach((item,i) => {
						if(item.CouponType == 1){
							// this.daiJin[i] = `${item.CouponNum1}元购「${item.StoreName}」${item.CouponNum2}元代金券`
							if(item.CouponNum1 == 0){
								this.daiJin[i] = `「${item.StoreName}」消费立减${item.CouponNum2}`
							} else {
								this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}减${item.CouponNum2}`
							}
						} else {
							this.daiJin[i] = `「${item.StoreName}」满${item.CouponNum1}立送${item.CouponNum2}`
						}
					})
				} else {
					this.couponList = []
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.bgclo {
		background-color: #FFFFFF;
	}
	
	
		
	.san {
		margin-left: 10px;
		float: left;
		width: 0; 
		height: 0;
		border-width: 12upx;
		border-style: solid;
		border-color:#999999 transparent transparent transparent;
		margin-top: 16upx;
	}
	
	.sans {
		margin-left: 10px;
		float: left;
		width: 0; 
		height: 0;
		border-width: 12upx;
		border-style: solid;
		border-color:#999999 transparent transparent transparent;
		transform:rotate(180deg)
	}
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 99990;
	}
	
	.coupon-redemption-page {
		padding-top: 20upx;
		.search-field {
			// position: fixed;
			z-index: 9;
			width: 750rpx;
			background-color: #FFFFFF;
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			/* #ifndef MP-ALIPAY || H5*/
			top: 88rpx;
			margin-top: 0upx;
			/* #endif */
			
			height: 200rpx;
			display: flex;
			flex-direction: column;
			
			.search {
				background-color: #F2F2F2;
				border-radius: 60rpx;
				text-align: center;
				height: 60rpx;
				margin: 30rpx;
				flex: 1;
			}
			
			.search-btn {
				background: linear-gradient(to right, #efa13b, #ea662e);
				color: #FFFFFF;
				height: 60rpx;
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				border-radius: 60rpx;
				margin-right: 30rpx;
			}
			
			.placeholder {
				font-size: 28rpx;
				color: #999;
			}
			
			.sort-list {
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				height: 80rpx;
				padding: 30rpx;
				
				text {
					white-space: nowrap;
				}
				
				.sort-scroll {
					white-space: nowrap;
				}
				
				.sort-item {
					display: inline-flex;
					margin: 0 10rpx;
					align-items: center;
					justify-content: center;
					color: #666;
				}
				
				.sort-item-active {
					color: #333;
					font-weight: bolder;
					font-size: 32rpx;
				}
				
				.sort-item:first-child {
					margin-left: 0;
				}
			}
		}
		
		.coupon-list {
			margin: 50rpx 30rpx 30rpx 30rpx;
			
			.coupon-item {
				// padding: 30rpx;
				border-radius: 8rpx;
				margin-bottom: 60rpx;
				
				.coupon-content {
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					
					.bg-color {
						background-color: #fef6f3;
						padding: 20rpx;
						border-radius: 8rpx;
						height: 200rpx;
						max-height: 200rpx;
					}
					
					.avatar {
						width: 140rpx;
						height: 140rpx;
						border-radius: 8rpx;
					}
				}
			}
			
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				border-left: 1rpx dotted #e93a27;
				font-size: 24rpx;
				
				text {
					color: #FFFFFF;
					border-radius: 100rpx;
					padding: 10rpx 0;
					width: 120rpx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		
	}
</style>

