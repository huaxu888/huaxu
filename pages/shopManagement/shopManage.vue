<template>
	<view class="bg-white" >
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>商品展示</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>商品展示</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view style="margin: 30upx;margin-bottom: 30upx;border-top: 1.5upx solid #e4e4e4;margin-top: 0;padding-top: 40upx;" class="flex align-center">
			<view style="font-weight: 600;color: #333333;font-size: 30upx;">商品列表</view>
			<view style="color: #999999;margin-left: 8upx;margin-right: 8upx;"> | </view> 
			<view style="color: #999999;font-size: 26upx;">共3个</view>
		</view>
		
		<view class="">
			<view class="flex" style="margin: 0 30upx;padding-top: 20upx;padding-bottom: 32upx;border-bottom: 1upx solid #e4e4e4;">
				<view style="width: 130upx;height: 130upx;">
					<image src="https://img.huaxuapp.com/cpzs_10.png" mode="scaleToFill" style="width: 130upx;height: 130upx;border-radius: 10upx;"></image>
				</view>
				<view style="margin-left: 25upx;">
					<view class="shengLv" style="font-size: 28upx;color: #333333;width: 100%;">
						十大啊啊啊啊啊啊啊啊a撒大大实打实的撒旦
					</view>
				
					<view class="flex justify-between align-center" style="margin-top: 50upx;">
						<view style="color: #fe4e01;">
							<text style="font-size: 30upx;color: #fe5479;">￥</text>
							<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">69.00</text>
							<text style="font-size: 26upx;color: #999999;text-decoration: line-through;margin-left: 10upx;">￥251.00</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="flex" style="margin: 0 30upx;padding-top: 20upx;padding-bottom: 32upx;border-bottom: 1upx solid #e4e4e4;">
				<view style="width: 130upx;height: 130upx;">
					<image src="https://img.huaxuapp.com/cpzs_10.png" mode="scaleToFill" style="width: 130upx;height: 130upx;border-radius: 10upx;"></image>
				</view>
				<view style="margin-left: 25upx;">
					<view class="shengLv" style="font-size: 28upx;color: #333333;width: 100%;">
						十大啊啊啊啊啊啊啊啊a撒大大实打实的撒旦
					</view>
				
					<view class="flex justify-between align-center" style="margin-top: 50upx;">
						<view style="color: #fe4e01;">
							<text style="font-size: 30upx;color: #fe5479;">￥</text>
							<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">69.00</text>
							<text style="font-size: 26upx;color: #999999;text-decoration: line-through;margin-left: 10upx;">￥251.00</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="flex" style="margin: 0 30upx;padding-top: 20upx;padding-bottom: 32upx;border-bottom: 1upx solid #e4e4e4;">
				<view style="width: 130upx;height: 130upx;">
					<image src="https://img.huaxuapp.com/cpzs_10.png" mode="scaleToFill" style="width: 130upx;height: 130upx;border-radius: 10upx;"></image>
				</view>
				<view style="margin-left: 25upx;">
					<view class="shengLv" style="font-size: 28upx;color: #333333;width: 100%;">
						十大啊啊啊啊啊啊啊啊a撒大大实打实的撒旦
					</view>
				
					<view class="flex justify-between align-center" style="margin-top: 50upx;">
						<view style="color: #fe4e01;">
							<text style="font-size: 30upx;color: #fe5479;">￥</text>
							<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">69.00</text>
							<text style="font-size: 26upx;color: #999999;text-decoration: line-through;margin-left: 10upx;">￥251.00</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="dinW flex justify-between">
			<view @tap="shopStyle" class="flex justify-center align-center" style="margin-left: 60upx;width: 262upx;height: 80upx;border: 2upx solid #000000;border-radius: 10upx;font-size: 30upx;color: #000000;">
				商品分类
			</view>
			<view @tap="addShop" class="flex justify-center align-center" style="margin-right: 60upx;background-color: #fe5479;width: 262upx;height: 80upx;border: 2upx solid #fe5479;border-radius: 10upx;font-size: 30upx;color: #ffffff;">
				添加商品
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
			}
		};
	},
	onLoad(option) {

	},
	onShow() {
		
	},
	methods: {
		shopStyle() {
			uni.navigateTo({
				url:'/pages/shopManagement/shopAdd/shopStyle'
			})
		},
		addShop() {
			uni.navigateTo({
				url:'/pages/shopManagement/shopAdd/addShop'
			})
		},
		backs() {
			uni.navigateBack({
				delta:1
			})
		},
		saoMa() {
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
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
		bottom: 100upx;
		width: 750upx;
	}
	
	.shengLv {
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow:hidden;
	}
</style>