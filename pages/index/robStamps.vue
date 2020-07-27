<template>
	<view class="rob-stamps-page">
		<view class="bg"></view>
		<view class="ershi" @tap="ershi"></view>
		<view class="sanshi" @tap="sanshi"></view>
		<view class="wushi" @tap="wushi"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conpons50: {},
				conpons30: {},
				conpons20: {},
				canTap: true
			};
		},
		methods: {
			wushi: function () {
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
					this.$http.robCoupons(this.$store.state.userInfo.ID, this.conpons50.YHQID)
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
			},
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
			},
			ershi: function () {
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
			this.$http.findConponsGov()
				.then(res => {
					console.log('查找优惠券', res);
					if (res.IsSuccess) {
						console.log(res);
						res.Data.forEach( item => {
							if ( item.StoreID === 0 && item.Num1 === 200 && item.Num2 === 30 ) {
								this.conpons30 = item
							} else if( item.StoreID === 0 && item.Num1 === 200 && item.Num2 === 50 ) {
								this.conpons50 = item
							} else if( item.StoreID === 0 && item.Num1 === 50 && item.Num2 === 20 ) {
								this.conpons20 = item
							} 
						})
						console.log(this.conpons50, this.conpons30,this.conpons20);
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
			height: 2500rpx;
			background: url(https://img.huaxuapp.com/713hmqq.png) no-repeat;
			background-position: center;
			background-size: cover;
		}
		
		.ershi {
			width: 598rpx;
			height: 291rpx;
			background: url(https://img.huaxuapp.com/lvjdmp_03.png) no-repeat;
			background-position: center;
			background-size: cover;
			position: absolute;
			left: 76rpx;
			top: 860rpx;
		}
		
		.sanshi {
			width: 598rpx;
			height: 293rpx;
			background: url(https://img.huaxuapp.com/713yhq_06.png) no-repeat;
			background-position: center;
			background-size: cover;
			position: absolute;
			left: 76rpx;
			top: 1200rpx;
		}
		
		.wushi {
			width: 598rpx;
			height: 293rpx;
			background: url(https://img.huaxuapp.com/lq50_03.png) no-repeat;
			background-position: center;
			background-size: cover;
			position: absolute;
			left: 76rpx;
			top: 1540rpx;
		}
	}
</style>
