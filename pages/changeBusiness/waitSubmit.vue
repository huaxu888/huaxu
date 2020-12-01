<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-transparent" class="text-white" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">信息审核</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">信息审核</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="flex text-gray justify-between align-between flex-direction">
			<view class="flex justify-between align-between flex-direction" style="margin-top:30%">
				<view class="flex justify-center" style="align-items: flex-end;">
					<text style="font-size: 150upx;" class="hxIcon-shenhe1"></text>
					<text class="margin-left-sm" style="font-size: 60upx;">
						正在审核中
					</text>
				</view>
 
				<view class="margin-top flex justify-center flex-direction align-center" style="font-size: 40uxp;">
					<view>
						审核通过后会在首页消息中提示
					</view>
					<view class="margin-top-sm">
						请耐心等待...
					</view>
				</view>
			</view>


			<view class="margin-top flex justify-center align-center flex-direction text-black" style="font-size: 40uxp;" v-if="type==='prestore'">
				<view>您好，当您该店铺预存审核成功后</view>
				<view class="margin-top-sm">系统将自动把您审核完成前的可提现金额转入您的余额中</view>
				<view class="margin-top-sm">审核完成后您的可提现金额将清零</view>
			</view>

			<view class="flex justify-center align-center" style="width: 100%;margin-top:50%">
				<view class="padding flex flex-direction align-center justify-center" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" style="width:60%" @tap="submit">完 成</button>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				myStoreID: '',
				type:''
			}
		},
		onLoad(route) {
			this.myStoreID = route.myStoreID
			if (route.type === 'dl') {
				this.type = route.type
			}
			if (route.type === 'prestore') {
				this.type = route.type
			}
		},
		// onBackPress() {
		// 	if (!this.myStoreID || this.type === 'dl') {
		// 		uni.switchTab({ //跳去首页
		// 			url: '/pages/index/person'
		// 		})
		// 		return
		// 	}
		// 	if (this.type === 'prestore') {
		// 		var isZZ = this.$store.state.isZZ
		// 		if(isZZ){
		// 			uni.navigateBack({
		// 				delta:2
		// 			})
		// 		}else{
		// 			uni.navigateBack({
		// 				delta:4
		// 			})
		// 		}
		// 		return
		// 	}
		// },
		methods: {
			submit() {
				if (!this.myStoreID) {
					console.log(1)
					uni.switchTab({ //跳去首页
						url: '/pages/index/person'
					})
					return 
				}
				if(this.myStoreID){
					console.log(2)
					uni.navigateBack({
						delta:3
					})
				}
				if (this.type === 'prestore') {
					console.log(3)
					var isZZ = this.$store.state.isZZ
					if(isZZ){
						uni.navigateBack({
							delta:2
						})
					}else{
						uni.navigateBack({
							delta:4
						})
					}
					return
				}
			}
		}
	}
</script>

<style scoped>
</style>
