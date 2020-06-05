<template>
	<view>
		<view class="cu-list menu flex align-center flex-direction margin-lr-sm radius bg-white margin-top" v-for="(item,index) in MsgList"
		 :key="index">
			<view class="margin-lr margin-top flex justify-between">
				<text class="text-lg" style="font-weight: 600;">{{item.Title}}</text>
				<text>{{item.AddDate}}</text>
			</view>
			<view class="cu-item" style="line-height: 1.5;">
				<text class="padding-tb-sm ">{{item.Content}}</text>
				<!-- <text class="padding-tb-sm ">您已在汉台区安琪蛋糕店通过花蓄成功消费金额1.00元，可消费余额为23.00元</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			MsgList: {
				type: Array,
			}
		},
		data() {
			return {
				
			}
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style>
	
</style>
