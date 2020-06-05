<template>
	<view>
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定收款码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">绑定收款码</block>
			<!-- #endif -->
		</cu-custom>
		<view class="animate">
			<view class="flex justify-center align-center margin-top-xl" style="width: 100%;">
				<text class="hxIcon-zhifuchenggong margin-right text-red" style="font-size: 150upx;"></text>
				<text class="text-gray" style="font-size:60upx">扫码绑定成功</text>
			</view>
			<view class="flex justify-center padding margin-top">
				<text class="text-lg" style="font-weight: 600;">{{shopName}}</text>
			</view>
			<view class="flex justify-center margin-top-xl padding-top-xl">
				<text class="text-lg">该码绑定为:</text>
				<text class="text-lg margin-left">{{bandName}}</text>
			</view>
			<view class="flex justify-center align-center" style="width: 100%;margin-top:40%">
				<view class="padding flex flex-direction align-center justify-center" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" style="width:60%" @tap="submit">确 认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.bandName = route.bandName
			this.shopName = route.shopName
		},
		data(){
			return{
				bandName:'店铺主收款码',
				shopName:'一个火锅店'
			}
		},
		methods:{
			submit(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.animate{animation:fadeInDown  0.8s 1;}
</style>
