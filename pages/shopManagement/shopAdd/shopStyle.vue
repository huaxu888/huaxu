<template>
	<view class="bg-white" >
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>分类管理</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>分类管理</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view style="padding: 0 30upx;font-weight: 600;">
			<view @tap="addShop" class="flex align-center" style="height: 140upx;border-bottom: 1.5upx solid #e4e4e4;color: rgb(253, 89, 96);">
				<view class="hxIcon-tianjia"></view>
				<view style="margin-left: 20upx;font-size: 30upx;">添加分类</view>
			</view>
			<view class="flex align-center justify-between" style="height: 140upx;border-bottom: 1.5upx solid #e4e4e4;color: #b5b5b5;">
				<view style="font-size: 26upx;">已有商品分类</view>
			</view>
			<view @tap="changeShop" class="flex align-center justify-between" style="height: 140upx;border-bottom: 1.5upx solid #e4e4e4;">
				<view>默认分类(点击可修改)</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad(option) {

	},
	onShow() {
		
	},
	methods: {
		addShop(){
			uni.navigateTo({
				url:'/pages/shopManagement/shopAdd/addStyle'
			})
		},
		changeShop(){
			uni.navigateTo({
				url:'/pages/shopManagement/shopAdd/changgeStyle'
			})
		},
	},
	onPullDownRefresh() {
		
	},
	components: {

	}
};
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	
</style>