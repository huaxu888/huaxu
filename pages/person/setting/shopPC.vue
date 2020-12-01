<template>
	<view style="background: #ffffff;">
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black" style="border-bottom: 1upx solid #e4e4e4;">
			<block slot="content">商家PC版</block>
		</cu-custom>
		
		<view class="flex justify-center" style="margin-top: 150upx;">
			<view style="width: 602upx;height: 612upx;margin-top: 0upx;border-radius: 20upx;-moz-box-shadow:0px 0px 4px 0px #dddddd;-webkit-box-shadow:0px 0px 4px 0px #dddddd;box-shadow:0px 0px 4px 0px #dddddd;">
				<view class="flex justify-center">
					<view style="margin-top: 100upx;font-size: 30upx;color: #333333;width: 420upx;line-height: 50upx;text-align: center;">
						<text>点击复制链接，并打开电脑端浏览器，粘贴至地址窗口，登录账户/密码，即可以使用。</text>
					</view>
				</view>
				<view class="flex justify-center" style="margin-top: 150upx;" @tap="copyBtn">
					<view class="flex sure justify-center">
						<text class="" style="font-size: 36upx;font-weight: 600;">
							复制链接
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components:{
			
		},
		data() {
			return {
				
			};
		},
		onShow() {
			
		},
		methods: {
			copyBtn(){
				uni.setClipboardData({
					data: 'http://shop.huaxuapp.com',
					success: function() {
						uni.showToast({
							title: '复制成功！',
							duration: 3000,
							icon: 'none'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 3000,
							icon: 'none'
						})
					}
				})
			},
		}
	};
</script>
<style lang="scss">
	page {
		background: #ffffff;
	}
	
	.sure {
		width: 480upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #f88160, #ff5b2e);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	}
</style>
