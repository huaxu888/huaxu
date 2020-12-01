<template>
	<view class="reservation-page" v-if="sureTuikuan">
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="solid-bottom">
			<block slot="content">申请退款</block>
		</cu-custom>
		
		<view class="flex margin align-center " style="border-bottom: 1.5upx solid #e4e4e4;padding-bottom: 20upx;">
			<view class="title">
				<view class="shengLv" style="font-size: 26upx;width: 540upx;">
					<text style="color: #777777;">
						{{SetMealName}}
					</text>
				</view>
				
				<view style="font-size: 30upx;margin-top: 10upx;">
					<text>￥{{TotalPrice}}</text>
				</view>
			</view>
			<view style="font-size: 32upx;position: absolute;right:30upx;">
				<text>x</text>
				<text>1</text>
			</view>
		</view>
		
		<view class="flex margin align-center " style="padding-bottom: 20upx;border-bottom: 1.5upx solid #e4e4e4;">
			<view class="title">
				<text style="font-size: 26upx;color: #777777;">
					订单金额
				</text>
			</view>
			<view style="font-size: 32upx;position: absolute;right:30upx;">
				<view style="font-size: 30upx;color: #333333;">
					<text>￥{{TotalPrice * Nums}}</text>
				</view>
			</view>
		</view>
		
		<view class="flex margin align-center " style="">
			<view class="title">
				<text style="font-size: 26upx;color: #777777;">
					实到金额 
				</text>
			</view>
			<view style="font-size: 32upx;position: absolute;right:30upx;">
				<view style="font-size: 30upx;color: #fe4e01;">
					<text>￥{{TotalPrice * Nums}}</text>
				</view>
			</view>
		</view>
		
		<view style="height: 20upx;background-color: #f2f2f2;">
			
		</view>
		
		<view class="margin align-center " style="">
			<view class="title">
				<text style="font-size: 28upx;color: #777777;">
					退款方式
				</text>
			</view>
			<view class="align-center" style="margin-top: 30upx;display: flex;">
				<text class="hxIcon-yue" style="color: #fe4e01;font-size: 40upx;"></text>
				<text style="font-size: 28upx;margin-left: 16upx;" @tap="gotoxy">
					退回余额
					<text style="color: #fe4e01;font-size: 24upx;">(查看余额使用规则)</text>
				</text>
				<view style="position: absolute;right: 30upx;" @tap="gotoxy">
					<label class="radio">
						<radio color="#fe4e01" value="" checked/><text></text>
					</label>
				</view>
			</view>
		</view>
		
		<view style="height: 20upx;background-color: #f2f2f2;">
			
		</view>
		
		<view style="font-size: 28upx;color: #777777;padding: 30upx;padding-bottom: 0upx;">退款原因</view>
		<radio-group @change="radioChange" style="padding-bottom: 150upx;">
			<view class="flex margin align-center " style="border-bottom: 1.5upx solid #e4e4e4;width: 690upx;padding-bottom: 30upx;" v-for= "(item, index) in fankuan" :key="item.value">
				<view class="title">
					<text style="font-size: 28upx;color: #333333;">
						{{item.name}}
					</text>
				</view>
				<view style="font-size: 32upx;position: absolute;right:30upx;">
					<label class="radio">
						<radio style="width: 100upx;text-align: right;" color="#fe4e01" :value="item.value" :checked="item.value === current" />
					</label>
				</view>
			</view>
			<view style="border: 1.5upx solid #e4e4e4;border-radius: 10upx;padding: 30upx;margin-top: 30upx;height: 240upx;margin-left: 30upx;" v-if="current == 8">
				<textarea value="" placeholder="请输入内容" placeholder-style="font-size:24upx;" />
			</view>
			</radio>
		</radio-group>

		<view style="position: fixed;bottom: 0upx;background-color: #FFFFFF;z-index: 2;padding-bottom: 30upx;" class="flex" @tap="gotos">
			<view style="width: 750upx;background-color: #fe4e01;color: #ffffff;text-align: center;font-size: 30upx;height: 100upx;line-height: 100upx;">
				<text>立即退款</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				fankuan:[
					{value: '1',name:'买多了'},
					{value: '2',name:'计划有变，没时间消费'},
					{value: '3',name:'预约不到'},
					{value: '4',name:'评价不好'},
					{value: '5',name:'商家停业/转让/装修'},
					{value: '6',name:'联系不上商家'},
					{value: '7',name:'别的平台更实惠'},
					{value: '8',name:'其他原因'}
				],
				 current: 0,
				 Nums:0,
				 SetMealName:'',
				 TotalPrice:0,
				 sureTuikuan:false
			}
		},
		onLoad(option) {
			/// 进入退款页面
			this.orderid = option.orderid
			this.$http.refundPage(option.orderid).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.Nums = res.Num
					this.SetMealName = res.Data.SetMealName
					this.TotalPrice = res.Data.TotalPrice
					this.sureTuikuan = true
				} else {
					this.$api.msg(res.Msg,2000)
					this.sureTuikuan = false
				}
				
			})
			
			/// 取消订单退款                                  
			// this.$http.refundCancel(this.orderid).then(res => {
			// 	console.log(res);
			// })
			
		},
		onShow() {
		
		},
		methods: {
			gotoxy(){
				uni.navigateTo({
					url:'/pages/personalAgent/persons/YuExy'
				})
			},
			radioChange: function(evt) {
				
				this.current = evt.detail.value
				console.log(this.current);
			},
			gotos(){
				/// 确认订单退款
				this.$http.refundSure(this.orderid,this.Nums).then(res => {
					console.log(res);
					if(res.IsSuccess){
						uni.redirectTo({
							url:'/pages/shopDetail/tuiKuan?orderid=' + this.orderid
						})
					} else {
						this.$api.msg(res.Msg,2000)
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	radio {
		transform: scale(0.9);
	}
</style>

<style scoped lang="scss">
	page {
		background: #FFFFFF;
	}

	.aligen-right {
		text-align: right;
	}
	
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>
