<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<view>
			<cu-custom bgColor="bg-jingying" style="color: #ffffff;" backColor="bg-jingying" :isBack="false">
				<block slot="content"></text></block>
			</cu-custom>
		</view>
		<!-- #endif -->
		
		<view class="padding-bottom-sm  bg-jingying" style="padding-top:50upx;padding-bottom: 0upx;height: 332upx;">
			<view class="flex justify-center align-center">
				<text class="cuIcon-roundcheck" style="font-size: 108upx;color: #ffffff;"></text>
			</view>
			<view class="flex justify-center align-center" style="margin-top: 40upx;">
				<text style="font-size: 36upx;color: #ffffff;">短信充值成功！</text>
			</view>
		</view>
		
		<view style="margin-top: 80upx;">
			<view class="flex justify-center">
				<text style="font-size: 28upx;color: #999999;">您已充值(元)</text>
			</view>
			<view class="flex justify-center" style="margin-top: 30upx;">
				<text style="font-size: 26upx;">￥</text>
				<text style="font-size: 54upx;font-weight: 600;">{{zhiFu}}</text>
			</view>
			<view class="flex justify-center" style="margin-top: 18upx;">
				<text>获得短信<text style="font-size: 28upx;color: #fe4e01;">{{dNum}}</text>条</text>
			</view>
		</view>
		
		<view class="flex justify-center" @tap="fanhui">
			<view class="sure">完成</view>
		</view>
		<!-- <view >
			<view class="flex justify-center align-center margin-top-xl" style="width: 100%;">
				<text class="hxIcon-zhifuchenggong margin-right text-red" style="font-size: 150upx;"></text>
				<text class="text-gray" style="font-size:60upx">{{title}}</text>
			</view>
			<view class="flex justify-center margin-top">
				<text class="text-lg">{{type==='tx'?'提现':type==='card'?'充值':'预存'}}金额：{{money}}元</text>
			</view>
			<view class="flex justify-center margin-top" v-if="type!='tx'">
				<text class="text-lg">可获得消费额：{{allMoney}}元</text>
			</view> -->
			<!-- <view class="flex justify-center margin-top" v-if="type==='card'">
				<text class="text-lg">{{time}}</text>
			</view> -->
			<!-- <view class="flex justify-center align-center" style="width: 100%;margin-top:40%">
				<view class="padding flex flex-direction align-center justify-center" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" style="width:60%" @tap="submit">完 成</button>
				</view>
			</view>
		</view> -->
		
		
	</view>
</template>

<script>
	export default{
		onLoad(route){
			console.log(route);
			this.dNum = route.dNum
			this.zhiFu = route.zhiFu 
			
		},
		data(){
			return {
				zhiFu:0,
				dNum:[]
			}
		},
		methods:{
			fanhui(){
				uni.switchTab({
					url:'/pages/index/person'
				})
			},
		}
	}
</script>

<style>
	page{
		background: #ffffff;
	}
	.page__{
		width:1005;
		height:100vh
	}
	
	.sure {
		margin-top: 60upx;
		height: 94upx;
		width: 584upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(233, 165, 85);
		color: #ffffff;
		font-size: 30upx;
		border-radius: 60upx;
	}
</style>
