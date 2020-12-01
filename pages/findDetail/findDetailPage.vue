<template>
	<view>
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		<view v-if="!showLoading">
		
			<!-- <cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black">
				<block slot="left">返回</block>
				<block slot="content">发现详情</block>
					<block slot="right"><text class="hxIcon-s padding-right" style="font-size:40upx" @tap="share"></text></block>
			</cu-custom> -->
		
			<view style="overflow: hidden;width: 100%;" class="flex justify-center padding animate">
				<view class="bg-white">
					<rich-text :nodes="Content"></rich-text>
				</view>
			</view>
		</view>
		
		
		<uni-popup ref="popup" type="bottom">
			<view style="min-height: 300upx;"> 
				<view class="flex justify-center">
					<text>分享到</text>
				</view>
				<view class="flex">
					<view class="flex align-center flex-direction" @tap="share_">
						<text class="hxIcon-pengyouquan" style="font-size: 80upx;color: #39B54A;"></text>
						<text class="text-sm">朋友圈</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				Content: '',
				shareData: {
					href: 'https://newsapp.huaxuapp.com/home/detail/',
					scene: 'WXSenceTimeline' //分享到朋友圈
				},
				shareId: 0,
				showLoading:true,//控制加载中的flag
			}
		},
		onLoad(option) {
			this.shareId = option.id
			this.getDetail()
		},
		onShow(){
			this.getDetail()
			// #ifdef MP-WEIXIN
			this.showShare()
			// #endif
		},
		methods: {
			getDetail(option) {
				return this.$Request.get(this.$store.state.findDetailUrl, {
					id:this.shareId
				},false).then(res => {
					console.log(res);
					var richtext = res.Content //取出富文本字符串
					const regex = new RegExp('<img', 'gi'); //找到找对img标签
					richtext = richtext.replace(regex, `<img style="max-width: 100%;"`) //正则替换
					this.Content =htmlParser(richtext) //重新赋值
					this.shareData.imageUrl = res.PicURL
					this.shareData.title = res.Title
					this.showLoading = false
				})
			},
			share() {
				console.log(3349)
				this.$refs.popup.open()
			},
			share_(){
				// #ifdef APP-PLUS				
					this.shareData.href = `${this.shareData.href}${this.shareId}`
					//this.$api.showLoading_()
					this.$api.share(this.shareData).then(data => {})
				// #endif
			},
			showShare(){
				uni.showShareMenu()
			}
		}, 
		components:{
			uniPopup
		},
		onShareAppMessage(obj) {
			return {
				title: '在家吃遍美食，领红包还赚收益！',
				imageUrl: '',
				path: '/pages/findDetail/findDetailPage?id=' + this.shareId
			}
		},
		onShareTimeline(obj) {
			return {
				title: '在家吃遍美食，领红包还赚收益！',
				imageUrl: 'https://img.huaxuapp.com/glnglue.jpg',
				path: '/pages/findDetail/findDetailPage?id=' + this.shareId
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped>
	.animate{animation:fadeIn 1s 1;}
</style>
