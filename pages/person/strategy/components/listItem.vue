<template>
	<view class="padding-sm flex justify-between align-center all margin-tb" @tap="goToDetailList">
		<view class="hxIcon-kefu text-gray" style="font-size:100upx">
			
		</view>
		
		<view class="margin-left flex justify-between align-center" style="width: 100%;">
			<view class="content_">
				<view class="text-bold miaoshu_">{{objItem.Title}}</view>
				<!-- <view class="text-sm margin-top-sm miaoshu_">{{objItem.Content}}</view> -->
			</view>
			<text class="cuIcon-right text-gray" style="font-size: 50upx;">
				
			</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			objItem:{
				tyepe:Object,
				default:()=>{}
			}
		},
		methods: {
			goToDetailList() {
				this.$emit('goToDetailList',this.objItem)
			}
		},
	}
</script>

<style scoped>
	.all{
		border-radius: 10upx;
		box-shadow: 4upx 4upx 2upx 2upx #F0F0F0;
		border-left: 2upx solid #F0F0F0;
		border-top: 2upx solid #F0F0F0;
	}
	.content_{
		width:480upx
	}
	.miaoshu_{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
