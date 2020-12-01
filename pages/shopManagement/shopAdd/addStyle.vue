<template>
	<view class="bg-white" >
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>添加分类</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>添加分类</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="flex justify-center" style="margin-top: 300upx;">
			<input placeholder="请输入新的商品分类(最长8个字)" style="width: 528upx;height: 80upx;background-color: #f4f4f4;border-radius: 10upx;padding: 0 40upx;color: #777777;font-size: 30upx;" ></input>
		</view>
		<view class="flex justify-center" style="margin-top: 80upx;" @tap="sureAdd">
			<view class="sure" style="font-size: 36upx;font-weight: 600;width: 540upx;height: 100upx;">确定添加</view>
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
		sureAdd(){
			
		}
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
	.sure {
		margin-top: 20upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fe5479;
		color: #fff;
		border-radius: 100upx;
		/* box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10); */
	}
</style>