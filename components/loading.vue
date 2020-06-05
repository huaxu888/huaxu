<template>
	<view class="loading_img" v-if="showFlag" @touchmove.stop="touchmove" @tap.stop="tap">
		<!-- #ifdef MP-WEIXIN -->
		<view class="text-lg back_btn flex justify-center align-center" @tap="back" >
			<text class="cuIcon-back text-white" style="font-size: 45upx;"></text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		// onShow(){
		// 	setTimeout(()=>{
		// 		this.showFlag =true
		// 	},)
		// },
		data(){
			return {
				showFlag:true
			}
		},
		methods: {
			touchmove(){
				
			},
			tap(){
				
			},
			hidden(){
				this.showFlag = false
			},
			show(){
				this.showFlag = true
			},
			back(){
				uni.navigateBack({})
			}
		},
	}
</script>



<style scoped >
	page{
		background: #FFFFFF ;
	}
	.loading_img{
		background-color: #FFFFFF;
		position:fixed;
		height:100vh;
		width:100%;
		top:0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-image: url('http://img.huaxuapp.com/moneypig666.gif');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		pointer-events:auto;
		overflow: hidden;
		z-index: 10000;
	}
	.back_btn{
		width:80upx;
		height: 80upx;
		background: rgba(36,36,36,0.7);
		border-radius: 50%;
		position: absolute;
		top:60upx;
		left:40upx;
	}
</style>
