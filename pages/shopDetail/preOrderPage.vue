<template>
	<view>
		<view class="pageBg ">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-transparent" class="text-white" :isBack="true">
				<block slot="content"><text class="text-bold">{{storeName}}</text></block>
			</cu-custom>
			<!-- #endif -->

			<view class="flex align-center justify-center flex-direction welcome-card ">
				<view class="welcome"></view>
				<text class="text-white margin-top welcome-text">Hi&nbsp;&nbsp;{{username}}，欢迎光临</text>
			</view>

			<view class="leftCard">
				<!-- <view class="leftCard-one animation-fade" @tap="navTo(1)"></view> -->
				<view class="margin-top-xl leftCard-two animation-fade" @tap="navTo(2)"></view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeId: '',
				storeName: '',
				username:'',
				isHaveGoods:true
			}
		},
		async onLoad(option) {
			this.storeId = option.storeId;
			this.storeName = option.storeName;
		 	this.username = this.$store.state.userInfo.Nick;
			await this.selectGoods(this.storeId);
		},
		methods: {
			async selectGoods(storeId){
				await this.$http.isHaveGoods(storeId).then(res => {
					console.log(res);
					this.isHaveGoods =res.IsSuccess
				});
			},
			navTo(index){
				if(index == 1){
					uni.navigateTo({
						url: '/pages/shopDetail/reservation?storeId=' + this.storeId +'&storeName=' +  this.storeName+'&needRes=false&isHaveGoods='+this.isHaveGoods 
					})
				}else{
					uni.navigateTo({
						url: '/pages/shopDetail/orderFood/newOrderFood?storeId=' + this.storeId +'&storeName='+this.storeName +'&needRes=true&isHaveGoods='+this.isHaveGoods + '&type=pay'
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	.leftCard {
		position: fixed;
		right: 0;
		bottom: 200upx;
	}
	
	.welcome-text{
		font-size: 30upx;
	}

	.leftCard .leftCard-one {
		width: 404upx;
		height: 128upx;
		background: url('https://img.huaxuapp.com/zxyytj_03.png') no-repeat;
		background-size: 100% 100%;
	}

	.leftCard .leftCard-two {
		width: 404upx;
		height: 128upx;
		background: url('https://img.huaxuapp.com/splb_03.png') no-repeat;
		background-size: 100% 100%;
	}

	.pageBg {
		background: url('https://img.huaxuapp.com/yybg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}

	.welcome-card {
		margin-top: 180upx;
	}

	.pageBg .welcome-card .welcome {
		width: 420upx;
		height: 180upx;
		background: url('https://img.huaxuapp.com/hygl_03.png') no-repeat;
		background-size: 100% 100%;

	}
</style>
