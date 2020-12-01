<template>
	<view style="height: 100%;position: relative;">
		<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 || MP-ALIPAY -->
			<cu-custom  bgColor="bg-white" :isBack="false" class="text-black bgclo"  style="height: 100%;">
				<block slot="content" class="text-bold bgclo" style="width: 100%;">抢券</block>
			</cu-custom>
		<!-- #endif -->
		<view class="coupon-redemption-page"  style="height: 100%;">
		
			<view class="search-field">
				<view class="flex align-center">
					<input type="text" v-model="keyword" placeholder="请输入店铺名称搜索" placeholder-class="placeholder" class="search" />
					<view class="search-btn" @tap="search">
						<text>搜索</text>
					</view>
				</view>
				<view class="sort-list">
					<scroll-view scroll-x class="sort-scroll">
						<view class="sort-item" v-for="(item, index) in sortList" :key="index" @tap="selectSort(index)"
							:class="[index === currentSort ? 'sort-item-active' : '']">
							<text>{{ item }}</text>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<view class="coupon-list">
				<view class="coupon-item" v-for="(item, index) in couponList" :key="index" @tap="shopDetail(item.StoreID)">
					<view class="padding-bottom-xs flex align-center justify-between solid-bottom">
						<text>
							<text class="cuIcon-shop"></text>
							<text> {{ ' ' + item.StoreName }}</text>
						</text>
						<text style="background-color: #f2f2f2; padding: 5rpx 10rpx 0 10rpx; flex-shrink: 0; border-radius: 8rpx; color: #e93a27;">
							{{ item.youhuiquan.Num }} / {{ item.youhuiquan.Num3 || item.youhuiquan.Num }}
						</text>
					</view>
					<view class="coupon-content">
						<view class="bg-color flex align-center flex-sub">
							<view>
								<image :src="item.StorePic" mode="aspectFill" class="avatar"></image>
							</view>
							<view class="flex margin-left justify-center" style="width: 100%; height: 100%;">
								<view class="flex flex-direction align-center">
									<text class="text-xl text-bold" style="color: #e93a27;">
										￥{{item.youhuiquan.Num2}}
										<text class="text-sm margin-left-xs" style="color: #333; font-weight: 200;" v-if="item.youhuiquan.Num1">满{{item.youhuiquan.Num1}}可用</text>
										<text class="text-sm margin-left-xs" style="color: #333; font-weight: 200;" v-else>代金券</text>
									</text>
									<text class="margin-tb-xs">有效期{{ item.youhuiquan.YXQDate }}小时</text>
									<text class="text-gray text-sm">* 自领取之时计算</text>
								</view>
							</view>
						</view>
						<view class="bg-color btn" @tap.stop="getCoupon(item.youhuiquan)" >
							<text :style="{background: getStatus(item.youhuiquan) ? '#eee' : 'linear-gradient(to right, #efa13b, #ea662e)', color: getStatus(item.youhuiquan) ? '#333' : '#fff' }">
							{{ getStatus(item.youhuiquan) ? '已领光' : '领取' }}
						</text>
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
				couponList: [],
				currentPage: 1,
				keyword: '',
				sortList: ['全部'],
				sortIds: [0],
				currentSort: 0
			};
		},
		onShow() {
			this.queryCoupons()
		},
		methods: {
			queryCoupons: function () {
				uni.showLoading({
					title: '加载中……'
				})
				this.$http.searchCoupon(this.keyword || '0', this.sortIds[this.currentSort], this.currentPage)
					.then(res => {
						if (res.IsSuccess) {
							if (this.currentPage === 1) {
								this.couponList = res.Data
							} else {
								if (res.Data.length !== 0) {
									this.couponList.push(...res.Data)
								} else {
									this.$api.msg('没有更多了')
									this.currentPage -= 1
								}
							}
							res.Data.forEach(item => {
								if (!this.sortList.includes(item.SortName)) {
									this.sortList.push(item.SortName)
									this.sortIds.push(item.SortID)
								}
							})
							console.log(this.sortList, this.sortIds);
						} else {
							this.$api.msg('当前没有优惠券')
						}
						uni.hideLoading()
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading()
					})
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
					this.$http.getCoupon(this.$store.state.userInfo.ID, item.YHQID)
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
		onReachBottom() {
			this.currentPage += 1
			this.queryCoupons()
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
			this.currentPage = 1
			this.queryCoupons()
		}
	}
</script>

<style lang="scss" scoped>
	.bgclo {
		background-color: #FFFFFF;
	}
	
	.coupon-redemption-page {
		
		.search-field {
			position: fixed;
			z-index: 9;
			width: 750rpx;
			background-color: #FFFFFF;
			/* #ifdef H5 || MP-ALIPAY */
			top: 106rpx;
			margin-top: 40upx;
			/* #endif */
			/* #ifndef H5 || MP-ALIPAY*/
			top: 88rpx;
			margin-top: 64upx;
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
			margin: 230rpx 30rpx 30rpx 30rpx;
			
			.coupon-item {
				background-color: #FFFFFF;
				padding: 30rpx;
				border-radius: 8rpx;
				margin-bottom: 30rpx;
				
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

