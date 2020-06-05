<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">交易成功</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">交易成功</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view >
			<view class="flex justify-center align-center margin-top-xl" style="width: 100%;">
				<text class="hxIcon-zhifuchenggong margin-right text-red" style="font-size: 150upx;"></text>
				<text class="text-gray" style="font-size:60upx">{{title}}</text>
			</view>
			<view class="flex justify-center margin-top">
				<text class="text-lg">{{type==='tx'?'提现':type==='card'?'充值':'预存'}}金额：{{money}}元</text>
			</view>
			<view class="flex justify-center margin-top" v-if="type!='tx'">
				<text class="text-lg">可获得消费额：{{allMoney}}元</text>
			</view>
			<!-- <view class="flex justify-center margin-top" v-if="type==='card'">
				<text class="text-lg">{{time}}</text>
			</view> -->
			<view class="flex justify-center align-center" style="width: 100%;margin-top:40%">
				<view class="padding flex flex-direction align-center justify-center" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" style="width:60%" @tap="submit">完 成</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.type = route.type
			this.money = route.money
			this.allMoney=route.allMoney
		},
		data(){
			return {
				type:'',
				money:0,
				allMoney:0
			}
		},
		methods:{
			submit(){
				if(this.type==='tx'){
					uni.navigateBack({
						delta:2
					})
					return 
				}else if(this.type==='card'){
					console.log(33333333333333333)
					uni.switchTab({
						url:'/pages/index/person'
					})
				}else{				
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			}
		},
		onBackPress() {
			if(this.type==='tx'){
				uni.navigateBack({})
				return 
			}else if(this.type==='card'){
				console.log(33333333333333333)
				uni.switchTab({
					url:'/pages/index/person'
				})
			}else{				
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		computed:{
			title(){
				if(this.type==='tx'){
					return '提现成功'
				}else if(this.type==='card'){
					return '充值卡充值成功'
				}else{
					return '预存成功'
				}
			}
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.page__{
		width:1005;
		height:100vh
	}
</style>
