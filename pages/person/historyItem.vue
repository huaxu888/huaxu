<template>
	<view class="history-item-component" @tap="gotoStore(item.StoreID)">
		<image :src="item.StorePic || 'https://img.huaxuapp.com/huaxulogo70px.png' " mode="aspectFill" class="store-avatar"></image>
		<view class="store-info">
			<view class="name">
				<text>{{ item.StoreName }}</text>
			</view>
			<view class="price">
				<text>{{ formatAmount(item.SJXFJE) }}</text>
				<text class="xfje">{{ formatAmount(item.XFJE) }}</text>
			</view>
			<view class="time">
				{{ beTime(item.AddDate) }}
			</view>
		</view>
		<view class="action">
			<text>已完成</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'historyItem',
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			formatAmount: function (money) {
				return this.$api.formatAmount(money)
			},
			gotoStore: function (storeId) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetailPage?StoreID=' + storeId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history-item-component {
		padding: 30rpx;
		background-color: #FFFFFF;
		box-shadow: 2rpx 4rpx 10rpx rgba($color: #000000, $alpha: .1);
		border-radius: 10rpx;
		display: flex;
		
		.store-avatar {
			height: 120rpx;
			width: 120rpx;
			border-radius: 10rpx;
		}
		
		.store-info {
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			justify-content: space-between;
			flex: 1;
			
			.name {
				font-size: 32rpx;
			}
			
			.price {
				text {
					margin-right: 10rpx;
				}
				
				.xfje {
					font-size: 24rpx;
					text-decoration: line-through;
				}
				
				text:before {
					content: '￥';
					font-size: 20rpx;
				}
			}
			
			.time {
				font-size: 24rpx;
				color: #666;
			}
		}
		
		.action {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666;
			
			text {
				border-radius: 50rpx;
				border: 1px solid #666;
				padding: 10rpx 20rpx;
			}
		}
	}
</style>
