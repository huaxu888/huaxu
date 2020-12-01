<template>
	<view>
		<view class="margin flex" @tap="goToDetail" >
			<view style="height:150upx;width:220upx" >
				<image :src="itemObj.StorePic?itemObj.StorePic:'https://img.huaxuapp.com/huaxulogo70px.png'"  style="height: 100%;" class="radius " :lazy-load="lazyLoad"></image>
			</view>
			
			<view class="margin-left" style="width: 100%;" :style="[{width:itemObj.isSmall?'80%':'100%'}]" >
				<view class="text-cut " style=" width: 75%; ">
					<text class="text-lg text-bold ">{{itemObj.StoreName}}</text>
				</view>
				
				<text v-if="itemObj.isSmall?false:true" style="font-size: 22upx;color: #999999; float: right;position: relative; bottom:25upx;">{{setDis(itemObj.distance)}}</text>
				<view class="flex margin-top-xs">
					<view class="hxIcon-xingxing margin-right-xs text-red" v-for="(item,index) in itemObj.StoreStart" :key="index" style="font-size: 27upx;"></view>
				</view>
				<view class=" margin-top-xs text-sm  text-cut" style="width:440upx; height: 34upx;" :style="[{width:itemObj.isSmall?'150px':''}]">
					<text class="text-cut">
						{{itemObj.StoreDesc}}
					</text>
				</view>
				<view class="margin-top-xs flex" style=" color: #666666; height: 65upx; line-height:32upx;">
					<text class="hxIcon-dingwei3 " style="color: #ff5b2e;font-size: 24upx;"></text>
					<text class="text-sm margin-left-xs text_hid" style="margin-left: 2upx;">
						{{changeAddress(itemObj.StoreAddress)}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {geoDistance} from "../../../mixins/qymMixins.js"
	export default{
		data(){
			return {
				lazyLoad:true
			}
		},
		props:{
			itemObj:{
				type:Object,
				default:()=>{}
			},
			isSmall:{
				type:[Boolean,String],
				default:false
			}
		},
		methods:{
			setDis(num) {
				if (num > 1000) {
					return ((num / 1000).toFixed(2)) + "km"
				} else {
					return num.toFixed(2) + 'm'
				}
			},
			goToDetail(){
				if (getApp().globalData.isAudit) {
					uni.navigateTo({
						url: `/pages/shopDetail/shopDetailPage?StoreID=${this.itemObj.StoreID}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/shopDetail/orderFood/newOrderFood?storeId=${this.itemObj.StoreID}&storeName=${this.itemObj.StoreName}`
					})
				}
			}
		}
	}
</script>

<style >
	page{
		background: #F8F8F8;
	}
	.text_hid {
		width: 100%;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
