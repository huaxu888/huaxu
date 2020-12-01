<template>
	<view class="about-us-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">关于我们</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">关于我们</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
			
		<view class="shadow-around">
			<!-- #ifndef MP-ALIPAY -->
			<rich-text :nodes="about.Content"></rich-text>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<image :src="about.alipayImg[0]" mode="aspectFit" style="width: 750upx; height: 2000upx;"></image>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				about: {},
				shareData: {
					href: '',
					scene:'WXSenceTimeline',
					imageUrl: '',
					title: ''
				}
			}
		},
		onShow() {
			let self = this
			uni.request({
				url: 'https://newsapp.huaxuapp.com/api/news/about',
				data: {
					siteId: 0
				},
				success: function(res){
					console.log(res);
					console.log(res);
					self.about = res.data
					let tmp = res.data.Content
					const regex = new RegExp('<img', 'gi')
					tmp = tmp.replace(regex, '<img style="width: 100%;"')
					self.about.Content = tmp
					// #ifdef MP-ALIPAY
					self.about.alipayImg = self.about.Content.match(/((https|http):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?/)
					// #endif
				}
			})
		},
		methods: {
			share: function (res) {
				this.shareData.href = 'https://newsapp.huaxuapp.com/api/news/about?siteId' + this.about.ID
				this.shareData.title = this.about.Title
				this.shareData.imageUrl = this.about.PicURL
				this.$api.share(this.shareData)
			}
		},
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
	}
</style>
