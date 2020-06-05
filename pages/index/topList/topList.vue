<!-- 
* @file message.vue
* @descripteon 头条
* @author 张阳
* @date 2019-6-16
* @version: V1.0.0
* @email:1103992447@qq.com
-->
<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄头条</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">花蓄头条</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="margin flex bg-white radius"   v-for="(item,index) in topList" :key="index" @tap="toDetailed(item.ID)">
			<view class="margin flex justify-between" style="width: 100%;">
				<view class="flex flex-direction justify-between">
					<view class="text-lg" style="color: #333">{{item.Title}}</view>
					<view class="flex align-center">
						<image src="https://img.huaxuapp.com/logo.png" style="width:30upx; height:30upx;" class="radius"></image>
						<text class="margin-left-xs text-sm text-gray">花蓄</text>
						<text class="margin-left-xl text-sm text-gray" >{{item.AddDateTime}}</text>
					</view>
				</view>
				<view class="margin-left">
					<image :src="item.PicURL" style="width: 184upx; height:154upx;" class="radius"></image>
				</view>
			</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				topList: []
			}
		},
		onLoad() {
			uni.request({
				//获取site
				url: "https://newsapp.huaxuapp.com/api/news/listtttop",
				method: "GET",
				success: (res) => {
					this.topList = res.data;
					console.log(this.topList)
				},
			});
		},
		onPullDownRefresh() {
			uni.request({
				//获取site
				url: "https://newsapp.huaxuapp.com/api/news/listtttop",
				method: "GET",
				success: (res) => {
					this.topList = res.data;
				},
			});
			uni.stopPullDownRefresh();
		},
		methods: {
			toDetailed(ID) {
				uni.navigateTo({
					url: `/pages/index/topList/topListDetailed?ID=` + ID
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f0f0f0;
	}

	.bg-img {
		height: 480upx;
		width: 100%;
		background-size: 100% 100%;
	}

	.bg-shadeBottom {
		background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.7));
		color: #ffffff;
	}
</style>
