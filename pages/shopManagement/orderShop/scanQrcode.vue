<template>
	<view class="order-managment-page bg-white" >
		<cu-custom bgColor="bg-whitesss" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text></text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text></text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="dinW" style="z-index: 99;background-color: #ffffff;">
			<view class="flex buGardlist">
				<view class="buGard">
					<view style="text-align: center;">
						<view style="font-weight: 600;font-size: 32upx;color: #000000;">0</view>
						<text style="color: #666666;">今日核销</text><text class="hxIcon-arrow_right_fat" style="color: #fe5479;font-size: 24upx;"></text>
					</view>
				</view>
				<view class="buGard">
					<view style="text-align: center;">
						<view style="font-weight: 600;font-size: 32upx;color: #000000;">0</view>
						<text style="color: #666666;">昨日核销</text><text class="hxIcon-arrow_right_fat" style="color: #fe5479;font-size: 24upx;"></text>
					</view>
				</view>
				<view class="buGard">
					<view style="text-align: center;">
						<view style="font-weight: 600;font-size: 32upx;color: #000000;">0</view>
						<text style="color: #666666;">总计核销</text><text class="hxIcon-arrow_right_fat" style="color: #fe5479;font-size: 24upx;"></text>
					</view>
				</view>
			</view>
			<view style="padding: 30upx;padding-top: 15upx;" @tap="saoMa">
				<view class="flex justify-center align-center" style="width: 690upx;height: 140upx;background-color: #ffe6e8;border-radius: 15upx;">
					<view class="flex" style="margin-left: 80upx;">
						<text class="hxIcon-saoyisao3" style="font-size:80upx;color: #fe5479;"></text>
					</view>
					<view class="" style="margin-left: 20upx;">
						<view style="font-size: 32upx;font-weight: 600;color: #fe5479;">扫码核销</view>
						<view style="color: #fa8da5;font-size: 24upx;">用户出示订单二维码，不可截图</view>
					</view>
				</view>
			</view>
			<view style="color: #000000;text-align: center;margin-top: 80upx;" @tap="backs">
				<text class="hxIcon-cha" style="font-size: 55upx;"></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			urls:''
		};
	},
	onLoad(option) {

	},
	onShow() {
		
	},
	methods: {
		backs() {
			uni.navigateBack({
				delta:1
			})
		},
		saoMa() {
			let _this = this
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
					_this.urls = res.result
					
					let t = _this.urls
					let arr = t.split('?')
					let param = arr[1].split('&')
					let para = param[0].split('=')
					let params = param[1].split('=') 
					
					uni.navigateTo({
						url:'/pages/shopDetail/verifiCation?list=' + para[1] + '&lists=' + params[1]
					})
			    }
			});
		},
		upper: function(e) {
		            console.log(e)
		        },
		        lower: function(e) {
		            console.log(e)
		        },
		        scroll: function(e) {
		            console.log(e)
		            this.old.scrollTop = e.detail.scrollTop
		        },
		        goTop: function(e) {
		            this.scrollTop = this.old.scrollTop
		            this.$nextTick(function() {
		                this.scrollTop = 0
		            });
		            uni.showToast({
		                icon:"none",
		                title:"纵向滚动 scrollTop 值已被修改为 0"
		            })
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
	.buGardlist {
		justify-content: space-between;
		padding: 30upx;
	}
	
	.buGard {
		width: 220upx;
		height: 124upx;
		background-color: #f8f8f8;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.dinW {
		position: fixed;
		bottom: 150upx;
	}
	
</style>