<template>
	<view>
		<cu-custom bgColor="bg-whitesss"  backColor="text-black" :isBack="true">
			<block slot="content">全部收款数据</block>
		</cu-custom>
		
		<view style="height: 20upx;background-color: #ffffff;">
			
		</view>
		
		<view style="padding: 30upx;height: 50upx;line-height: 50upx;margin-top: 30upx;">
			<view class="flex justify-between">
				<text style="font-size: 36upx;font-weight: 600;">
					合作数据
				</text>
				<view style="font-size: 24upx;">
					<text @tap="jTian" :class="[inx == 1 ? 'sts' : 'stss']">今天</text>
					<text style="margin: 0 20upx;color: #999999;">|</text>
					<text @tap="bZhou" :class="[inx == 2 ? 'sts' : 'stss']">本周</text>
					<text style="margin: 0 20upx;color: #999999;">|</text>
					<text @tap="bYue" :class="[inx == 3 ? 'sts' : 'stss']">本月</text>
				</view>
			</view>
		</view>
		
		<view class="margin-lr margin-tb-sm-big padding bg-white" style="border-radius: 15upx;margin-top: 60upx;" @tap="zkShou">
			<view class="flex justify-between" style="height: 60upx;line-height: 60upx;">
				<text class="heading">买单收款</text><text style="color: #999999;">查看明细
				<text style="font-size: 24upx;color: #999999;"><text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;"></text></text></text>
			</view>
			
			<view class="flex  justify-between" style="margin-top: 40upx;">
				<view class="flex align-center flex-direction">
					<view style="position: relative;">
						<text class="zi" @click.stop="showTips">订单金额</text>
						<text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;position: absolute;" @click.stop="showTips"></text>
					</view>
					<text class="shu" style="margin-top: 20upx;">￥{{changeMoney(ToalMoney1)}}</text>
				</view>
				<view class="flex align-center flex-direction">
					<text class="zi" v-if="inx == 1">较昨天</text>
					<text class="zi" v-if="inx == 2">较上周</text>
					<text class="zi" v-if="inx == 3">较上月</text>
					<text :class="[ Compare1 >= 0 ? 'shus' : 'shuss']" style="margin-top: 20upx;">
						<text v-if="Compare1 >= 0">+￥{{changeMoney(Compare1)}}</text>
						<text v-if="Compare1 < 0">-￥{{changeMoney(-Compare1)}}</text>
					</text>
					
				</view>
				<view class="flex align-center flex-direction">
					<text class="zi">订单数</text>
					<text class="shu" style="margin-top: 20upx;">{{TotalOrder1}}</text>
				</view>
			</view>
		</view>
		
		<view class="margin-lr margin-tb-sm-big padding bg-white" style="border-radius: 15upx;margin-top: 30upx;" @tap="zfShou">
			<view class="flex justify-between" style="height: 60upx;line-height: 60upx;">
				<text class="heading">自发券</text>
				<text style="color: #999999;"><text style="color: #999999;">查看明细<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;"></text></text></text>
			</view>
			
			<view class="flex  justify-between" style="margin-top: 40upx;">
				<view class="flex align-center flex-direction">
					<view>
						<text class="zi" @click.stop="showTip">实收金额</text>
						<text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;" @click.stop="showTip"></text>
					</view>
					<text class="shu" style="margin-top: 20upx;">￥{{changeMoney(ToalMoney2)}}</text>
				</view>
				<view class="flex align-center flex-direction">
					<text class="zi" v-if="inx == 1">较昨天</text>
					<text class="zi" v-if="inx == 2">较上周</text>
					<text class="zi" v-if="inx == 3">较上月</text>
					<text :class="[ Compare2 >= 0 ? 'shus' : 'shuss']" style="margin-top: 20upx;">
						<text v-if="Compare2 >= 0">+￥{{changeMoney(Compare2)}}</text>
						<text v-if="Compare2 < 0">-￥{{changeMoney(-Compare2)}}</text>
					</text>
				</view>
				<view class="flex align-center flex-direction">
					<text class="zi">验券数</text>
					<text class="shu" style="margin-top: 20upx;">{{TotalOrder2}}</text>
				</view>
			</view>
		</view>
		
		<view class="margin-lr margin-tb-sm-big padding bg-white" style="border-radius: 15upx;margin-top: 30upx;" @tap="tgShou">
			<view class="flex justify-between" style="height: 60upx;line-height: 60upx;">
				<text class="heading">团购套餐</text>
				<text style="color: #999999;"><text style='color: #999999;'>查看明细<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;"></text></text></text>
			</view>
			
			<view class="flex  justify-between" style="margin-top: 40upx;">
				<view class="flex align-center flex-direction">
					<view>
						<text class="zi" @click.stop="showTi">实收金额</text>
						<text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;"  @click.stop="showTi"></text>
					</view>
					<text class="shu" style="margin-top: 20upx;">￥{{changeMoney(ToalMoney3)}}</text>
				</view>
				<view class="flex align-center flex-direction">
					<text class="zi" v-if="inx == 1">较昨天</text>
					<text class="zi" v-if="inx == 2">较上周</text>
					<text class="zi" v-if="inx == 3">较上月</text>
					<text :class="[ Compare3 >= 0 ? 'shus' : 'shuss']" style="margin-top: 20upx;">
						<text v-if="Compare3 >= 0">+￥{{changeMoney(Compare3)}}</text>
						<text v-if="Compare3 < 0">-￥{{changeMoney(-Compare3)}}</text>
					</text>
				</view>
				<view class="flex align-center flex-direction">
					<text class="zi">验券数</text>
					<text class="shu" style="margin-top: 20upx;">{{TotalOrder3}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				inx:1,
				StoreID: '',
				sorts: 1,
				ToalMoney1:0,
				Compare1:0,
				TotalOrder1:0,
				ToalMoney2:0,
				Compare2:0,
				TotalOrder2:0,
				ToalMoney3:0,
				Compare3:0,
				TotalOrder3:0
			}
		},
		onShow() {
			this.inx = 1
			this.sorts = 1
			this.getShu()
		},
		onLoad(route) {
			this.StoreID = route.StoreID
		},
		methods: {
			getnum(e){
				return ( Math.round(e*100)/100)
			},
			jTian(){
				this.inx = 1
				this.sorts = 1
				this.getShu()
			},
			bZhou(){
				this.inx = 2
				this.sorts = 2
				this.getShu()
			},
			bYue(){
				this.inx = 3
				this.sorts = 3
				this.getShu()
			},
			showTips(){
				uni.showToast({
					icon:'none',
				    title: '商品售出的订单价格',
				    duration: 5000
				});
			},
			showTip(){
				uni.showToast({
					icon:'none',
				    title: '商品扣减优惠券后用户支付的实际金额',
				    duration: 5000
				});
			},
			showTi(){
				uni.showToast({
					icon:'none',
				    title: '套餐的实际金额',
				    duration: 5000
				});
			},
			zkShou(){
				uni.navigateTo({
					url: '/pages/shopManagement/sonPage/zkShou?StoreID=' + this.StoreID
				})
			},
			zfShou(){
				uni.navigateTo({
					url: '/pages/shopManagement/sonPage/zfShou?StoreID=' + this.StoreID
				})
			},
			tgShou(){
				uni.navigateTo({
					url: '/pages/shopManagement/sonPage/tgShou?StoreID=' + this.StoreID
				})
			},
			getShu(){
				var day2 = new Date();
				day2.setTime(day2.getTime());
				var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
				
				this.$http.shuShous(this.StoreID,s2,this.sorts).then(res => {
					console.log(res.Data);
					this.ToalMoney1 = res.Data[0].ToalMoney
					this.Compare1 = res.Data[0].Compare
					this.TotalOrder1 = res.Data[0].TotalOrder
					this.ToalMoney2 = res.Data[1].ToalMoney
					this.Compare2 = res.Data[1].Compare
					this.TotalOrder2 = res.Data[1].TotalOrder
					this.ToalMoney3 = res.Data[2].ToalMoney
					this.Compare3 = res.Data[2].Compare
					this.TotalOrder3 = res.Data[2].TotalOrder
				})
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
		},
		onPullDownRefresh() { //下拉时刷新
			
		},
		onReachBottom() { //上拉加载
			
		},
		components: {
			
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	.heading {
		font-size: 32upx;
		font-weight: 700;
		color: #333333;
	}
	
	.sts{
		color: #333333;
		font-weight: 600;
	}
	
	.stss{
		color: #999999;
	}
	
	.zi{
		font-size: 24upx;
		color: #666666;
	}
	
	.shu{
		font-size: 36upx;
		color: #333333;
		font-weight: 600;
	}
	
	.shus{
		font-size: 36upx;
		font-weight: 600;
		color: #349f97;
	}
	
	.shuss{
		font-size: 36upx;
		color: #fe5479;
		font-weight: 600;
	}
</style>
