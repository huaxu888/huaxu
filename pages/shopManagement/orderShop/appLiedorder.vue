<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">订单核销</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">订单核销</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="padding: 30upx;font-size: 36upx;background-color: #fe4e01;color: #ffffff;height: 200upx;padding-top: 50upx;">
			花蓄商城
		</view>
		
		<view class="reservation-list-item" style="border-radius: 8upx;margin-top: 50upx;position: absolute;top: 230upx;width: 690upx;background-color: #ffffff;margin: 0 30upx;">
			<view style="padding-left: 30upx;font-size: 26upx;color: #333333;margin-top: 30upx;">订单号：5961561561561565</view>
			<view class="" style="margin: 0 30upx;padding-bottom: 30upx;margin-top: 40upx;">
				<view class="flex" style="padding-top: 32upx;padding-bottom: 40upx;">
					<view style="">
						<image src="https://img.huaxuapp.com/huaxulogo70px.png" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
					</view>
					<view style="margin-left: 25upx;width: 100%;">
						<view style="font-size: 28upx;color: #333333;height: 70upx;">
							<text>一过热套餐</text>
						</view>
						
						<view class="flex justify-between">
							<view style="color: #fe4e01;margin-top: 30upx;">
								<text style="color: #333333;">总额：</text>
								<text style="font-size: 30upx;">￥</text>
								<text style="font-size: 30upx;font-weight: 600;">11</text>
							</view>
							<view style="margin-top: 30upx;color: #666666;margin-left: 30upx;">
								<text>数量：</text>
								<text>10</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 30upx;padding-bottom: 0;font-size: 32upx;padding-top: 0;">
			订单信息
		</view>
		<view style="padding: 30upx;padding-bottom: 0;font-size: 26upx;color: #666666;">
			用户姓名：
			<text style="color: #333333;">啊啊</text>
		</view>
		<view style="padding: 30upx;font-size: 26upx;color: #666666;">
			用户手机：
			<text style="color: #333333;">132448545848</text>
		</view>
		
		
		<view style="position: fixed;bottom: 0;background-color: #fe4e01;width: 100%;z-index: 9;-moz-box-shadow:0px -3px 9px 0px #e9e9e9;-webkit-box-shadow:0px -3px 9px 0px #e9e9e9;box-shadow:0px -3px 9px 0px #e9e9e9;">
			<view style="display: flex;height:120upx;line-height:120upx;text-align: center;justify-content:space-around;">
				<text style="font-size: 31upx;color: #ffffff;">
					确认核销
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	
</script>

<style>
	page {
		background-color: #ffffff;
	}
</style>

<style lang="scss">
	page {
		background-color: #ffffff;
	}
			
	/* #ifdef H5 */
	uni-checkbox .uni-checkbox-input {
	  border-radius: 50% !important;
	  color: #ffffff !important;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	  border: none !important;
	  background: #fe4e01;
		border-color: #fe4e01;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before {
		width: 20rpx;
		height: 20rpx;
		line-height: 20rpx;
		text-align: center;
		font-size: 18rpx;
		color: #fe4e01;
		background: transparent;
		// transform: translate(-70%, -50%) scale(1);
		// -webkit-transform: translate(-70%, -50%) scale(1);
	}
	
	/* #endif */
	
</style>
