<template>
	<view class="swiper_top">
		<view class="seckill-section m-t">
			<scroll-view class="floor-list" scroll-x :scroll-left="scrollLeft" :scroll-with-animation="true">
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in inconListAll " :key="index"
						@tap="iconTap(item,index)"
						class="padding-lr"
						style="position: relative;padding-bottom: 20upx;"
					>
						
						<view :class="(index+1)%2==0 ?'text-orange ':'text-red'" class="shadow-override flex align-center" style="flex-direction: column;">
							<view class="flex justify-center align-center icon_item">
								<image :src="item.StoreTitlePic" style="width: 70upx; height: 70upx;"  :lazy-load="lazyLoad"></image>
							</view>
							
							<view  class="text-sm text-black" :style="{color:index===judge?'red':'black'}">
								{{item.StoreSortName}}
							</view>
						</view>
						
						<view  class="before_oth" :class="index===judge?'before_':''"></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				lazyLoad:true
			}
		},
		props:{
			inconListAll:{//图标数组				
				type:Array,
				default:()=>[]
			},
			judge:{//具体响应图标的标记
				type:Number,
				default:0
			},
			scrollLeft:{//响应图标的移动位置
				type:Number,
				default:0
			}
		},
		methods:{//发生点击的时候的事件
			iconTap(item,index){
				this.$emit('iconTap',{item,index})
			}
		}
	}
</script>

<style scoped>
	
	.floor-list{
		white-space: nowrap;
	}
	.scoll-wrapper{
		display:flex;
		align-items: flex-start;
	}
	.icon_item{
		width:70upx;
		height:70upx;
		background: white;
		border-radius: 50%;
		box-shadow: 4upx 4upx 4upx 4upx #EEEEEE;
	}
	.before_oth{
		left:45%;
		right:45%;
		width:10%;
		height:4%;
		border-radius: 10upx;
		bottom:5%;
		transition:background-color 1s ease,position 1s ease
	}
	.before_oth:hover{
		background-color: red;
		position: absolute;
	}
	.before_{
		position: absolute;
		left:45%;
		right:45%;
		width:10%;
		height:5%;
		border-radius: 10upx;
		bottom:4%;
		background-color: red;
		z-index: 1000;
	}
	
</style>
