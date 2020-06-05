<template>
	<view style="height: 100vh;background: #eb5245;">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">个人付款码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">个人付款码</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="padding">
			<view class="bg-white" style="border-radius:10upx;">
				<view class="padding-lr padding-tb-sm align-center flex" style="background: #F0F0F0;border-radius: 10upx 10upx 0upx 0upx;">
					<text class="hxIcon-wodeyue" style="color:#eb5245">
						
					</text>
					
					<text style="color:#eb5245" class="margin-left-sm">
						二维码付款
					</text>
				</view>
				<view class="padding">
					<view class="flex justify-center">
						<image :src="userInfo_.FaceURL" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
					</view>
					
					<view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	/* page{
		
	} */
</style>
