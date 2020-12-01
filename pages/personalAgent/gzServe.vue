<template>
	<view style="background-image: url(https://img.huaxuapp.com/gzfh.png);background-repeat: no-repeat;width: 750upx;height: 1630upx;background-size: cover;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">关注服务号</block>
		</cu-custom>
		
		<view class="" style="position: absolute;top: 920upx;left: 70upx;text-align: center;" @tap="copyBtn">
			<view  style="width: 620upx;height: 90upx;background-color: #fb513f;font-size: 33upx;border-radius: 60upx;line-height: 90upx;color: #ffffff;">
				复制服务号，去微信搜索
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			
		},
		
		methods: {
			copyBtn(){
				uni.setClipboardData({
					data: '花蓄',
					success: function() {
						uni.showToast({
							title: '公众号已复制，请粘贴至微信搜索添加',
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
		},
		onPullDownRefresh() {
		
		},
		onReachBottom() {
			
		},
	}
</script>


<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped>
	.start-red{
		color: #fe4e01;
	}
	
	.shengLv{
		color: #333333;
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>
