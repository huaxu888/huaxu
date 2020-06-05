<template> <!-- 遇见楼兰，卡斯蒂亚-->
	<view>
		<image :src="`https://img.huaxuapp.com/${options.img}.jpg`" mode="aspectFit" class="img" @tap="getCou"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {}
			};
		},
		onLoad(options) {
			console.log('参数：', options);
			this.options = options
		},
		methods: {
			getCou: function () {
				if (this.$store.state.userInfo) {
					this.$http.getCou(this.$store.state.userInfo.ID, this.options.yhqid)
						.then (res => {
							if (res.IsSuccess) {
								uni.showModal({
									title: '领取优惠券',
									content: '恭喜您，领到优惠券一张，快去使用吧！',
									confirmText: '去用券',
									cancelText: '去看看',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/shopDetail/shopDetailPage?StoreID=' + this.options.storeid
											})
										} else {
											uni.navigateTo({
												url: 'pages/person/myCoupon/myCouponPage'
											})
										}
									}
								})
							} else {
								uni.showModal({
									title: '领取优惠券',
									content: res.Msg,
									showCancel: false
								})
							}
						})
						.catch(err => {
							console.log(err);
							this.$api.msg(err.Msg)
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
				
			}
		}
	}
</script>

<style lang="scss">
	.img {
		width: 750rpx;
		height: 1500rpx;
	}
</style>
