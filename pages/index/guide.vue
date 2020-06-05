<template>
	<view class="content">
		
		<swiper class="swiper"
		:autoplay="autoplay" 
		:duration="duration">
		
			<swiper-item v-for="(item,index) of kaiImgAry" :key ="index" >
				<view class="swiper-item" @tap="launchFlag(index)"
					:style="{backgroundImage: `url(${item})`}"
				>
					<!-- <view class="swiper-item-img"><image src="../../static/guide/title_01.png" mode="aspectFit"></image></view> -->
					<!-- <view ><image :src="item" mode="aspectFit" style="height: 100vh;"></image></view> -->
				</view>
			</swiper-item>
		
		
			<!-- :style="{backgroundImage: `url(${item})`}" -->
			<!-- <swiper-item  >
				
				<view  @tap="launchFlag(index)" class="swiper-item-img" >
					<image :src="item" mode="aspectFit" style="width:100;height:100%"></image>
				</view>	
			</swiper-item> -->
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kaiImgAry:[
					'http://img.huaxuapp.com/K1.jpg',
					'http://img.huaxuapp.com/k2.jpg',
					'http://img.huaxuapp.com/K3.jpg',
					'http://img.huaxuapp.com/K4.jpg',
				],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(i){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				let num = this.kaiImgAry.length-1
				if(i=== num){
					uni.setStorageSync(
						{
							key: 'launchFlag',
							data: true,
						}
					)
					uni.switchTab({
						url:'/pages/index/index'
					})
					// let kaiPingFlag = this.$store.state.kaiPingflag
					// if(kaiPingFlag===0){	
					// 	this.$store.commit('changekaiPingflag',1)
					// 	uni.switchTab({
					// 		url:'/pages/index/index'
					// 	})
					// }
					return 
				}
			}
		}
	}
</script>
<style>
	.content{
		width: 100%;
		height: 100vh;
	}
	.swiper{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.swiper-item{
		width: 100%;
		height: 100vh;
		background-repeat: no-repeat;
		background-size: 100% 100% ;
	}
</style>

