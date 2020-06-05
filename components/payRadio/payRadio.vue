<template>
	<view>
		<radio-group class="block " @change="RadioChange">
			<!-- #ifndef MP-WEIXIN -->
			<view class="cu-form-group" style="margin: 0 30upx;" v-if="zfb">
				<view class="flex  align-center justify-center">
					<view class="hxIcon-zhifubao2" style="font-size:50upx; color: #108ee9;"></view>
					<view class="margin-left-xs">支付宝支付</view>
				</view>
				<radio class='red margin-left-sm' :disabled="disabled" :class="radio==2?'checked':''" :checked="radio==2?true:false" value="2" style="transform:scale(0.8)"></radio>
			</view>
			<!-- #endif -->

			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group" style="margin: 0 30upx;" v-if="wx">
				<view class="flex align-center  justify-center">
					<view class="hxIcon-weixin2 text-green" style="font-size:50upx;"></view>
					<view class="margin-left-sm ">微信支付</view>
				</view>
				<view>
					<radio class='red margin-left-sm' :disabled="disabled" :class="radio==3?'checked':''" :checked="radio==3?true:false" value="3" style="transform:scale(0.8)"></radio>
				</view>
			</view>
			<!-- #endif -->

			<view class="cu-form-group" v-if="yue">
				<view class="flex justify-between align-center " style="flex: 1;">
					<view class="flex align-center ">
						<view class="hxIcon-yue1 text-yellow" style="font-size:50upx;"></view>
						<view class="margin-left-sm">余额支付</view>
					</view>
				</view>
				<radio class='red margin-left-sm' :disabled="disabled" :class="radio==1?'checked':''" :checked="radio==1?true:false" value="1" style="transform:scale(0.8)"></radio>
			</view>
			
			<view class="flex align-center justify-center">
				<view style="border-top: 0.5upx solid #EEE;height:20upx; width: 91%;margin-bottom: 20upx; ">
				</view>
			</view>

		</radio-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ammount: 0
			}
		},
		props: {
			radio: {
				type: [String, Number],
				default: '1'
			},
			yue: {
				type: Boolean,
				default: true
			},
			zfb: {
				type: Boolean,
				default: true
			},
			wx: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			let Score = this.$store.state.userInfo.Score
			let FanLiScore = this.$store.state.userInfo.FanLiScore
			let tmp = Math.floor(Score * 100 + FanLiScore * 100) / 100
			if (isNaN(tmp)) {
				this.ammount = 0
			} else {
				this.ammount = tmp.toFixed(2)
			}
		},
		methods: {
			RadioChange(e) {
				let radio = e.detail.value;
				this.$emit('getRadio', {
					radio: radio,
				})
			},
		}
	}
</script>

<style>



</style>
