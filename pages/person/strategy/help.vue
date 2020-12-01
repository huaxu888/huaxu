<template>
	<view >
		<view class="margin topBanner" @tap="Invitation()">
 
		</view>

		<view class="margin flex align-center justify-between" style="margin-top: 45upx;" @tap="gongLv">
			<view class="centerBox flex flex-direction">
				<text style="font-size: 30upx;">新手指南</text>
				<text style="font-size: 22upx;color: #7e7e7e;margin-top: 5upx;">1分钟了解花蓄</text>
				<view class="flex align-center justify-end" style="margin-top: 10upx;">
					<text class="hxIcon-xszn" style="font-size: 50upx;color: #f47605;"></text>
				</view>
			</view>
			<view class="centerBox flex flex-direction">
				<text style="font-size: 30upx;">常见问题</text>
				<text style="font-size: 22upx;color: #7e7e7e;margin-top: 5upx;">全方位解答</text>
				<view class="flex align-center justify-end" style="margin-top: 10upx;">
					<text class="hxIcon-changjianwenti" style="font-size: 50upx;color: #f47605;"></text>
				</view>
			</view>
			<view class="centerBox flex flex-direction">
				<text style="font-size: 30upx;">玩转花蓄</text>
				<text style="font-size: 22upx;color: #7e7e7e;margin-top: 5upx;">解密花式捞金</text>
				<view class="flex align-center justify-end" style="margin-top: 1aupx;">
					<text class="hxIcon-qiandai" style="font-size: 50upx;color: #f47605;"></text>
				</view>
			</view>
		</view>

		<view class="padding-lr flex align-end justify-between margin-tb" @tap="gongLv">
			<view class=" text-bold" style="font-size: 32upx;">精选攻略</view>
			<view  style="font-size: 28upx;">更多<text class="margin-left-xs cuIcon-right"></text></view>
		</view>


		<view class="margin flex align-center justify-between " style=" padding: 30upx;border-radius: 10upx;box-shadow:-3px 3px 18px #EEEEEE; ">
			<view class="flex justify-between align-center flex-direction" style="width: 55%; height: 146upx;">
				<text style="font-size: 30upx; width:100%;font-weight: 600;">
					使用花蓄给我带来什么好处商家福利、用户福利...
				</text>
				<view class="flex justify-between align-center" style=" width: 100%;">
					<view>
							<text style="font-size: 22upx;color: #999999;">阅读量</text>
							<text style="font-size: 22upx;color: #999999;margin-left: 10upx;">232</text>
					</view>
				
					<text style="font-size: 22upx;color: #999999;margin-right: 10upx;">2019-09-20</text>
				</view>
			</view>

			<view style="border-radius: 10upx; width: 37%; height: 146upx; 	background: url('https://img.huaxuapp.com/ljhx1.jpg') no-repeat; background-size: cover; ">

			</view>
		</view>

	
	<view class="margin flex align-center justify-between" style=" padding: 30upx;border-radius: 10upx;box-shadow:-3px 3px 18px #EEEEEE; ">
		<view class="flex justify-between align-center flex-direction" style="width: 55%; height: 146upx;">
			<text style="font-size: 30upx; width:100%;font-weight: 600;">
				订单和收益的来龙去脉，原来是这样！
			</text>
			<view class="flex justify-between align-center" style=" width: 100%;">
				<view>
					<text style="font-size: 22upx;color: #999999;">阅读量</text>
					<text style="font-size: 22upx;color: #999999;margin-left: 10upx;">232</text>
				</view>
			
				<text style="font-size: 22upx;color: #999999;margin-right: 10upx;">2019-09-20</text>
			</view>
		</view>
	
		<view style="border-radius: 10upx; width: 37%; height: 146upx; 	background: url('https://img.huaxuapp.com/wzhx1.jpg') no-repeat; background-size: cover; ">
	
		</view>
	</view>
	
	<view class="margin flex align-center justify-between" style=" padding: 30upx;border-radius: 10upx;box-shadow:-3px 3px 18px #EEEEEE; ">
		<view class="flex justify-between align-center flex-direction" style="width: 55%; height: 146upx;">
			<text style="font-size: 30upx; width:100%;font-weight: 600;">
				持家有道！解析花蓄花式捞金秘诀！
			</text>
			<view class="flex justify-between align-center" style=" width: 100%;">
				<view>
						<text style="font-size: 22upx;color: #999999;">阅读量</text>
						<text style="font-size: 22upx;color: #999999;margin-left: 10upx;">232</text>
				</view>
			
				<text style="font-size: 22upx;color: #999999;margin-right: 10upx;">2019-09-20</text>
			</view>
		</view>
	
		<view style="border-radius: 10upx; width: 38%; height: 146upx; 	background: url('https://img.huaxuapp.com/sjfb.jpg') no-repeat; background-size: cover; ">
	
		</view>
	</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods:{
			gongLv(){
				uni.navigateTo({
					url:'/pages/person/strategy/helps'
				})
			},
			Invitation(){
				if(this.$store.state.userInfo.ID){
					// #ifdef APP-PLUS || H5
					uni.navigateTo({
						url:'/pages/person/share'
					})
					// #endif
					// #ifdef MP-WEIXIN
					this.$api.msg('请点击右上角的转发按钮,分享给你的朋友们哦~',2000)
					// #endif
				}else{
					uni.navigateTo({
						url:'/pages/common/loginWithPass'
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	
	.topBanner {
		height: 274upx;
		border-radius: 10upx;
		background: url('https://img.huaxuapp.com/help.png') no-repeat;
		background-size: cover;
	}

	.centerBox {
		height: 172upx;
		border-radius: 10upx;
		width: 31%;
		background: #F9F9F9;
		padding: 20upx;
		padding-bottom: 0upx;
	}
</style>
