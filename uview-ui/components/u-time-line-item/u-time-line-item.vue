<template>
	<view class="u-time-axis-item">
		<slot name="content" />
		<view class="u-time-axis-node" :style="[nodeStyle]">
			<slot name="node">
				<view class="u-dots">
					<view class="u-dot">
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	/**
	 * timeLineItem 时间轴Item
	 * @description 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。(搭配u-time-line使用)
	 * @tutorial https://www.uviewui.com/components/timeLine.html
	 * @property {String} bg-color 左边节点的背景颜色，一般通过slot内容自定义背景颜色即可（默认#ffffff）
	 * @property {String Number} node-top 节点左边图标绝对定位的top值，单位rpx
	 * @example <u-time-line-item node-top="2">...</u-time-line-item>
	 */
	export default {
		name: "u-time-line-item",
		props: {
			// 节点的背景颜色
			bgColor: {
				type: String,
				default: "#ffffff"
			},
			// 节点左边图标绝对定位的top值
			nodeTop: {
				type: [String, Number],
				default: ""
			}
		},
		data() {
			return {

			}
		},
		computed: {
			nodeStyle() {
				let style = {
					backgroundColor: this.bgColor,
				};
				if (this.nodeTop != "") style.top = this.nodeTop + 'rpx';
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-time-axis-item {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
		margin-bottom: 32rpx;
		background-color: rgb(242, 242, 242); ;
		border-radius: 8upx;
		padding: 30upx;
	}
	
	

	.u-time-axis-node {
		position: absolute;
		top: 12rpx;
		left: -40rpx;
		transform-origin: 0;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		font-size: 24rpx;
	}

	.u-dot {
		height: 12rpx;
		width: 12rpx;
		border-radius: 100rpx;
		background: #e8b87f;
		position: absolute;
		top: 8upx;
		left: 8upx;
	}
	
	.u-dots {
		text-align: center;
		height:26rpx;
		width: 26rpx;
		border-radius: 200rpx;
		border: 1upx solid #e8b87f;
	}
</style>
