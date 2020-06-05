<template>
	<view class="common-page">
		<image :src="imgUrl" mode="widthFix" class="img"></image>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imgUrl: ''
			};
		},
		onLoad (options) {
			this.imgUrl = options.img ? `https://img.huaxuapp.com/${options.img}` : ''
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.common-page {
		.img {
			width: 750rpx;
		}
	}
</style>
