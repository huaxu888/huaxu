<template>
	<view class="rob-stamps-page">
		<view class="bg"></view>
		<view class="ershi" @tap="ershi"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conpons20: {},
				canTap: true
			};
		},
		onShareAppMessage() {
			return {
				title:'知遇烤吧券，点击领取！',
				path:'/pages/ad/kb',
				imageUrl:''
			}
		},
		methods: {
			ershi: function () {
				if (this.canTap) {
					this.canTap = false
					setTimeout( () => {
						this.canTap = true
					}, 3000)
				} else {
					return
				}
				
				if (Object.keys(this.$store.state.userInfo).length > 0) {
					this.$http.robCoupons(this.$store.state.userInfo.ID, this.conpons20.YHQID)
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
			this.$http.zykb()
				.then(res => {
					console.log('查找优惠券', res);
					if (res.IsSuccess) {
						console.log(res);
						res.Data.forEach( item => {
							this.conpons20 = item
						})
						console.log(this.conpons20);
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
			width: 750rpx;
			height: 1700rpx;
			background: url(https://img.huaxuapp.com/zhiyukaoba.png) no-repeat;
			background-position: center;
			background-size: cover;
			position: absolute;
			top: -50upx;
		}
		
		.ershi {
			width: 598rpx;
			height: 291rpx;
			background: url(https://img.huaxuapp.com/200jian40.png) no-repeat;
			background-position: center;
			background-size: cover;
			position: absolute;
			left: 76rpx;
			top: 510rpx;
		}
		
	}
</style>
