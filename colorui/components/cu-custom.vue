<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack" :style="[{fontWeight:600}]">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				
				<view class="action" v-if="isBacks" :style="[{fontWeight:600}]">
					<text class="cuIcon-back" @tap="BackPage"></text>
					<text class="hxIcon-shouye6"  @tap="BackPages" style="font-size: 42upx;margin-left: 20upx;"></text>
					<slot name="backText"></slot>
				</view>
				
				<view class="action" v-if="leftAction">
					<slot name="left"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px',fontWeight:600}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var shadow = 'box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, .1)'
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				if (this.shadow) {
					style += shadow
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isBacks: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			leftAction: {
				type: [Boolean, String],
				default: false
			},
			shadow: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			BackPages() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>

</style>
