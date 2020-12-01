<template>
	<view style="min-height:100vh;background:white;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">黑卡会员</block>
		</cu-custom>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;background-color: #ffffff;">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您暂时还不是黑卡会员哦~</text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(e){
		
			
		},
		onShow() {
	
		},
		methods:{
			
		},
		onPullDownRefresh(){//下拉时刷新

		},
		onReachBottom(){//上拉加载

		},
	}
</script>

<style>
	page{
		background: #F2F2F2;
	}
</style>
<style scoped>
	
</style>
