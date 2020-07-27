<template>
	<view class="rob-stamps-page">
		<view class="bg">
			<view class="qiangquan">
				<view class="qiang" @tap="sanshi"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conpons30: {},
				canTap: true
			};
		},
		onShareAppMessage() {
			return {
				title:'留坝消费券，点击领取！',
				path:'/pages/ad/lbThree',
				imageUrl:''
			}
		},
		methods: {
// 			wushi: function () {
// 				if (this.canTap) {
// 					this.canTap = false
// 					setTimeout( () => {
// 						this.canTap = true
// 					}, 3000)
// 				} else {
// 					this.$api.msg('您点的太快啦，稍后再点吧~')
// 					return
// 				}
				
// 				if (Object.keys(this.$store.state.userInfo).length > 0) {
// 					this.$http.robCoupons(this.$store.state.userInfo.ID, this.conpons50.YHQID)
// 						.then(res => {
// 							console.log(res);
// 							if (res.IsSuccess) {
// 								uni.showModal({
// 									title: '恭喜您~',
// 									content: "您抢到优惠券啦，快去使用吧！",
// 									confirmText: '去看看',
// 									cancelText: '知道了',
// 									success: res => {
// 										if (res.confirm) {
// 											uni.navigateTo({
// 												url: '/pages/person/myCoupon/myCouponPage'
// 											})
// 										}
// 									}
// 								})
// 							} else {
// 								this.$api.msg(res.Msg)
// 							}
// 						})
// 						.catch(err => {
// 							console.log(err);
// 							this.$api.msg(res.Msg)
// 						})
// 				} else {
// 					uni.showModal({
// 						content: '您还没有登录，请登录后再试！',
// 						confirmText: '去登录',
// 						success: res => {
// 							if (res.confirm) {
// 								uni.navigateTo({
// 									url: '/pages/common/login'
// 								})
// 							}
// 						}
// 					})
// 				}
// 			},
			sanshi: function () {
				if (this.canTap) {
					this.canTap = false
					setTimeout( () => {
						this.canTap = true
					}, 3000)
				} else {
					this.$api.msg('您点的太快啦，稍后再点吧~')
					return
				}
				
				if (Object.keys(this.$store.state.userInfo).length > 0) {
					this.$http.robCoupons(this.$store.state.userInfo.ID, this.conpons30.YHQID)
						.then(res => {
							console.log(res);
							if (res.IsSuccess) {
								uni.showModal({
									title: '恭喜您~',
									content: "您抢到优惠券啦，快去使用吧！",
									confirmText: '去看看',
									cancelText: '知道了',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/person/myCoupon/myCouponPage'
											})
										}
									}
								})
							} else {
								this.$api.msg(res.Msg)
							}
						})
						.catch(err => {
							console.log(err);
							this.$api.msg(res.Msg)
						})
				} else {
					uni.showModal({
						content: '您还没有登录，请登录后再试！',
						confirmText: '去登录',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/login'
								})
							}
						}
					})
				}
			}
		},
		onShow() {
			this.$http.liubaqiangquanThree()
				.then(res => {
					console.log('查找优惠券', res);
					if (res.IsSuccess) {
						this.conpons30 = res.Data	
					}
				})
				.catch(err => {
					console.log(err);
				})
		}
	}
</script>

<style lang="scss" scoped>
	.rob-stamps-page {
		position: relative;
		
		.bg {
			width: 750upx;
			height: 1800upx;
			background: url(https://img.huaxuapp.com/santongyong.png) no-repeat;
			background-position: center;
			background-size: cover;
		}

		.qiang {
			width: 218upx;
			height: 218upx;
			background: url(https://img.huaxuapp.com/qanlb_03.png) no-repeat;
			background-position: center;
			background-size: cover;
		}
		
		.qiangquan {
			position: absolute;
			top: 650upx;
			left: 104upx;
			padding: 160upx;
		}
	}
</style>
