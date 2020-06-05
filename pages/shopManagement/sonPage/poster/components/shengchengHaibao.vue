<template>
	<view class="padding">
		<view class="flex justify-center padding">
			<text class="text-gray">
				在线生成，实时迅速
			</text>
		</view>
		<view class="flex justify-center padding-tb-sm">
			<text class="text-gray">
				低调简约，使用方便
			</text>
		</view>
		<!-- <view class="btn_ bg-white flex justify-center">
			<view class="padding flex   flex-direction" style="width:100%;">
				<button class="cu-btn yg-bg-red margin-tb-sm lg" @tap="submit">生成海报</button>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default{
		methods:{
			submit(){
				this.$emit('shengchenghaibao')
			}
		}
	}
</script>

<style>
</style>


