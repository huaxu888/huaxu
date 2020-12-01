<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">短信充值</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">短信充值</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="padding" style="margin-top: 10upx;">
			<text style="font-size: 28upx;color: #666666;">
				短信充值活动
			</text>
		</view>
		
		<view class="bg-white "  style="height: 606upx;margin-top: 5upx;">
			<view style="height: 606upx;">
				<view v-for="(item,i) in duanList" :key="i" >
					<view style="border-bottom: 1upx solid #e4e4e4;height: 202upx;padding:30upx;">
						<view>
							￥<text style="font-size: 50upx;font-weight: 600;color: #333333;">{{changeMoney(item.Scores)}}</text>
						</view>
						<view style="margin-top: 6upx;">
							<text style="font-size: 24upx;color: #999999;">可获得短信：<text style="color: #333333;">{{item.Nums}}条</text></text>
						</view>
						<view>
							<text style="font-size: 24upx;color: #999999;">覆盖范围：<text style="color: #333333;">{{item.Info}}</text></text>
						</view>
					</view>
				</view>
				<radio-group @change="radioChange" style="position: absolute;right: 30upx;top: 140upx;">
					<label v-for="(item, index) in items" :key="item.value" >
						<view style="margin-top: 150upx;">
							<radio :value="item.value" :checked="index === current" />
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		
		<view style="margin-top: 60upx;">
			<view class="flex justify-center">
				<text style="color: #333333;font-size: 26upx;">可获得短信数(条)</text>
			</view>
			<view class="flex justify-center" style="margin-top: 20upx;">
				<text style="color: #fe5479;font-size: 80upx;font-weight: 600;">{{dNum}}</text>
			</view>
		</view>
		
		<view style="padding: 30upx;" @tap="zFu">
			<view class="sure">立即支付￥{{changeMoney(zhiFu)}}</view>
		</view>
	</view>
</template>

<script>
	import { duanPayment} from '@/common/handle.js'
	export default {
		data() {
			return {
				items: [{
					value: '0',
					name: '美国',
					checked: 'true'
				},
				{
					value: '1',
					name: '中国',
				},
				{
					value: '2',
					name: '巴西'
				}],
				current: 0,
				duanList:[],
				dNum:0,
				zhiFu:0,
				StoreID:0
			}
		},
		onLoad(option) {
			 this.StoreID = option.StoreID

		},
		onShow() {
			this.$http.cxDlist().then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.duanList = res.Data
					this.dNum = res.Data[0].Nums
					this.zhiFu = res.Data[0].Scores
				} else {
					this.duanList = []
				}
				
			})
			
		},
		watch: {
			
		},
		methods: {
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			radioChange: function(evt) {
				console.log(evt.target.value);
				console.log(this.duanList);
				this.dNum = this.duanList[evt.target.value].Nums
				this.zhiFu = this.duanList[evt.target.value].Scores
				
			},
			zFu(){
				duanPayment(this.$store.state.userInfo.ID,this.zhiFu, '短信充值', this.StoreID, this.dNum).then(res => {
					console.log(res);
					uni.navigateTo({
						url:'/pages/shopManagement/sonPage/witHdraw/dxSuccess?dNum=' + this.dNum + '&zhiFu=' + this.zhiFu
					})
				})
			}
		},
		components: {}
	}
</script>

<style scoped lang="scss">
	page{
		background: #f8f8f8;
	}
	
	.sure {
		margin-top: 80upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fe5479;
		color: #fff;
		border-radius: 100upx;
		// box-shadow: 2upx 2upx 14upx lighten($color: #fa7b7b, $amount: 10);
	}
</style>

