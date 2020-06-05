<template>
	<view class="assistant-detail-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄助手</block>
			<block slot="right" @tap="share"><text class="hxIcon-fenxiang padding-right"></text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">花蓄助手</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="shadow-around ">
			<!-- #ifndef MP-ALIPAY -->
			<rich-text :nodes="detail.Content"></rich-text>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<image :src="detail.alipayImg[0]" mode="aspectFit" style="width: 750upx; height: 1400upx;"></image>
			<!-- #endif -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				assistantId: '',
				shareData: {
					href: '',
					scene: 'WXSenceTimeline',
					imageUrl: '',
					title: ''
				}
			}
		},
		onLoad(option) {
			this.assistantId = option.id
		},
		onShow() {
			let self = this
			uni.request({
				url: 'https://newsapp.huaxuapp.com/api/news/detail',
				data: {
					id: self.assistantId
				},
				success: function(res) {
					console.log(res, 'assiant');
					self.detail = res.data
					let tmp = res.data.Content
					const regex = new RegExp('<img', 'gi')
					tmp = tmp.replace(regex, '<img style="width: 100%;"')
					self.detail.Content = tmp
					// #ifdef MP-ALIPAY
					self.detail.alipayImg = self.detail.Content.match(/((https|http):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?/)
					// #endif
				}
			})
		},
		methods: {
			share: function(res) {
				this.shareData.href = 'https://newsapp.huaxuapp.com/api/news/detail?id' + this.assistantId
				this.shareData.title = this.detail.Title
				this.shareData.imageUrl = this.detail.PicURL
				this.$api.share(this.shareData)
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}
</style>
