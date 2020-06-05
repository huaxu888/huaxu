<template>
	<view class="swiper_">
		<swiper  class="screen-swiper" style="min-height:500upx;position: relative;" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
	 :autoplay="true" interval="3000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item" mode="aspectFill" :lazy-load="lazyLoad"></image>					
			</swiper-item>
		</swiper>
		<!-- #ifdef MP-WEIXIN -->
		<!-- <view @tap="share" class="flex align-center justify-center flex-direction" style="position: absolute;left: 648upx;top:399upx;z-index: 2;width: 80upx; height: 80upx;border-radius: 50%;background: rgba(255,255,255,1);">
			<text style="font-size: 24upx;line-height: 1.3em;">生成</text>
			<text style="font-size: 24upx;line-height: 1.3em;">海报</text>
		</view> -->
		<!-- #endif -->
		
		

	</view>
</template>

<script>
	export default{
		props:{
			swiperList:{
				type:Array,
				default:()=>[]
			},
			
		},
		data(){
			return {
				dotStyle:false,
				lazyLoad:true
			}
		},
		methods:{
			share(){
				this.$emit('share')
			},
		}
	}
</script>

<style scoped>
	.swiper_{
		z-index: -100;
		/* position: relative; */
	}
</style>
