<template>
	<view>
		<view class="TDlist flex justify-center align-center" v-for="(item,index) in Data" :key="index" @tap="gotoChild(index,Data)">
			<view class="flex justify-between" style="height: 100%; width: 95%; border-bottom: 1upx solid #DDDDDD;">
				<view class="flex justify-start">
					<view class="flex align-center" style=" height: 100%;">
						<image :src="item.FaceURL" mode="aspectFit" style="width: 90upx;height: 90upx;border-radius: 100%;"></image>
					</view>
					<view class="flex align-start justify-center flex-direction padding-left-sm">
						<view>{{item.Phone}}</view>
						<view class="margin-top-xs text-sm text-gray">注册时间：{{item.AddDate}}</view>
					</view>
				</view> 
				<view class="flex justify-start">
					<view class="flex align-end justify-center flex-direction">
						<view v-show="isOperate">团队：{{item.Child.length}}人</view>
						<view v-show="isOperate" class="margin-top-xs text-sm text-gray">
							<text>已消费：&yen;{{tofixed(item.XiaoFeiScore)}}</text>
						</view>
					</view>
					<view v-show="isOperate" class="flex align-end justify-center flex-direction " style="width:38upx; ">
						<view class="arrow"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			Data: {
				type: Array,
			},
			isOperate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				people: 0,
			}
		},
		methods: {
			tofixed(num){
				return this.$api.formatAmount(num);
			},
			getMoney(index) {
				//传入是一级用户的数组坐标
				let sum = 0;
				if (this.isOperate == true) {
					this.Child = this.Data[index].Child;
					this.Child.forEach(item => {
						sum += parseFloat(item.XiaoFeiScore);
					})
				} else {
					sum = this.Data[index].XiaoFeiScore;
				}
				sum = this.$api.formatAmount(sum);
				return sum;
			},
			gotoChild(index,data) {
				if (this.isOperate == true) {
					this.$emit('gotoChild', index);
				}
			},
		}
	}
</script>

<style>
	.arrow:before {
		color: #8799a3;
		content: "\e6a3";
		text-align: center;
		font-size: 34upx;
		font-family: cuIcon;
	}

	.TDlist {
		margin-left: 30upx;
		margin-right: 30upx;
		background: #FFFFFF;
		height: 140upx;
		box-shadow: 0 2upx 3upx #aaa;
		position: relative;
		z-index: 9;
	}
</style>
