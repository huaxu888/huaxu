<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"></block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<image src="https://img.huaxuapp.com/bannceDetail.jpg" mode="widthFix" style="width: 100%;"></image>
		
	</view>
</template>

<script>
</script>

<style>
	
</style>
