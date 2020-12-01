<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" style="color: #ffffff;" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">退款进度</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">退款进度</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			
			<view style="width: 750upx;height: 246upx;" v-if="object.OrderSort == 7">
				<image src="https://img.huaxuapp.com/tkclz_02.png" mode="" style="width: 750upx;height: 246upx;"></image>
			</view>
			
			<view style="width: 750upx;height: 246upx;" v-if="object.OrderSort == 8">
				<image src="https://img.huaxuapp.com/tkcg_02.png" mode="" style="width: 750upx;height: 246upx;"></image>
			</view>
			
			<view class="flex padding align-center " style="padding-bottom: 20upx;border-bottom: 1.5upx solid #e4e4e4;">
				<view class="title" style="padding: 30upx 0;">
					<text style="font-size: 28upx;color: #000000;">
						数量
					</text>
				</view>
				<view style="position: absolute;right:30upx;">
					<text style="font-size: 30upx;color: #333333;">{{object.Count}}</text>
				</view>
			</view>
			<view class="flex padding align-center " style="padding-bottom: 20upx;border-bottom: 1.5upx solid #e4e4e4;">
				<view class="title" style="padding: 30upx 0;">
					<text style="font-size: 28upx;color: #000000;">
						退款金额
					</text>
				</view>
				<view style="font-size: 32upx;position: absolute;right:30upx;">
					<view style="font-size: 30upx;color: #fe4e01;">
						￥<text style="font-size: 42upx;color: #fe4e01;">{{moneys}}</text>
					</view>
				</view>
			</view>
			
			<view class="flex padding align-center " style="">
				<view class="title" style="padding: 20upx 0;">
					<text style="font-size: 28upx;color: #000000;">
						退回账户
					</text>
				</view>
				<view style="font-size: 32upx;position: absolute;right:30upx;">
					<view style="font-size: 28upx;color: #000000;">
						<text>花蓄余额</text>
					</view>
				</view>
			</view>
			
			<view style="height: 20upx;background-color: #f2f2f2;">
				
			</view>
			
			<view style="padding:0 30upx;padding-left: 40upx;">
				<u-time-line style="margin: 30upx 30upx;">
					<u-time-line-item>
						<template v-slot:content>
							<view class="flex">
								<!-- <view class="triangle"></view> -->
								<view class=" flex flex-direction" style="margin-left: 10upx;">
									<text style="font-size: 30upx;color: #333333;">退款申请已提交</text>
									<text style="margin-top: 12upx;font-size: 26upx;color: #777777;">{{(beTime(object.RefundSubmitDate))}}</text>
								</view>
							</view>
						</template>
					</u-time-line-item>
					
					<u-time-line-item style="margin-top: 60upx;">
						<template v-slot:content>
							<view class="flex">
								<!-- <view class="triangle"></view> -->
								<view class=" flex flex-direction" style="margin-left: 10upx;">
									<text style="font-size: 30upx;color: #333333;">花蓄后台处理中</text>
									<text style="margin-top: 12upx;font-size: 26upx;color: #777777;">您的退款申请已被花蓄后台受理，审核通过后，款项预计在1-7个工作日内退款至您的花蓄余额，具体到账时间以余额到账时间为准。</text>
								</view>
							</view>
						</template>
					</u-time-line-item>
					
					<u-time-line-item style="margin-top: 60upx;" v-if="object.OrderSort == 8">
						<template v-slot:content>
							<view class="flex">
								<!-- <view class="triangle"></view> -->
								<view class=" flex flex-direction" style="margin-left: 10upx;">
									<text style="font-size: 30upx;color: #333333;">退款成功</text>
									<view class=" flex flex-direction" style="">
										<text style="margin-top: 12upx;font-size: 26upx;color: #777777;">您的退款{{changeMoney(object.Money)}}元已退至您的花蓄余额账户，请前往个人中心-余额账户查收</text>
										<text style="margin-top: 12upx;font-size: 26upx;color: #777777;">{{(beTime(object.RefundSuccessDate))}}</text>
									</view>
								</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
			
			<view class="flex "  v-if="object.OrderSort == 7">
				<view class="flex align-center justify-between" style="margin-left: 88upx;padding-left: 10upx;padding-right: 10upx;background-color: #f6f6f6;width: 618upx;height: 90upx;border-radius: 5upx;">
					<view class="flex align-center justify-center" style="font-size: 24upx;color: #777777;">
						*发起退款审核期间可撤销退款申请 
					</view>
					<view @tap="refundCancels" class="flex align-center justify-center" style="border:2upx solid #999999;color: #a5a5a5;width: 140upx;height: 48upx;border-radius: 50upx;font-size: 24upx;">
						撤销退款
					</view>
				</view>
			</view>
		</view>
		
		<view class="couponss flex " style="color: #ffffff;flex-direction: column;text-align: center;" @tap="gotos">
			<view class="hxIcon-shouye2" style="height: 30upx;font-size: 46upx;position: absolute;top: -16upx;left: 28upx;">
				
			</view>
			<view style="margin-top: 22upx;">
				<text style="font-size: 22upx;">首页</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{		
				object:{},
				orderid:'',
				moneys:0
			}
		},
		onShow(){
			
		},
		onLoad(route){
			this.orderid = route.orderid
			this.$http.refundDetail(route.orderid).then(res => {
				console.log(res);
				this.object = res
				this.moneys = this.changeMoney(res.Money)
			})
		},
		methods:{
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			refundCancels(){
				uni.showModal({
					title: '撤销退款申请',
					content: '确定撤销该退款申请吗？',
					confirmText: '确定',
					cancelText: '取消',
					success: res => {
						if (res.confirm) {
							this.$http.refundCancel(this.orderid).then(res => {
								console.log(res);
								this.$api.msg('撤销退款申请成功',2000)
								setTimeout(function(){
									uni.redirectTo({
										url: '/pages/shopManagement/sonPage/orderManagerss?index=0'
									})
								},2000)
							})
						} else {
							return
						}
					}
				})
			},
			gotos(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
	
	.triangle {
	    width: 0;
	    height: 0;
	    border-top: 10px solid transparent ;
	    border-right: 10px solid rgb(242, 242, 242);
	    border-bottom: 10px solid transparent;
	    border-left: 10px solid transparent;
		position: absolute;
		left: -30upx;
		top: 10upx;
	}
	
	.u-nodes {
		width: 25upx;
		height: 25upx;
		border-radius: 25upx;
	}
	
	.couponss {
		background-color: rgba(51,51,51,0.5);
		line-height: 100upx;
		border-radius: 100upx;
		position: fixed;
		/* #ifdef H5 */
		bottom: 130rpx;
		/* #endif */
		/* #ifndef H5 */
		bottom: 200rpx;
		/* #endif */
		right: 60upx;
		width: 100upx;
		height: 100upx;
	}
	
	.u-time-axis-item {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
		margin-bottom: 32rpx;
		background-color: #ffffff;
		border-radius: 8upx;
		padding-top: 10upx;
	}
</style>
