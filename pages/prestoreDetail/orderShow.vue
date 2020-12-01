<template>
	<view style="background: #ffffff;">
		
		<view class="" style="background-color: #FFFFFF;text-align: center;padding-top: 80upx;">
			<view class="cuIcon-roundcheckfill" style="font-size: 120upx;color: #2bba12;"></view>
			<view style="font-size: 40upx;font-weight: 600;margin-top: 15upx;color: #000000;">订单接收成功</view>
		</view>
		
		<view class="flex align-center justify-center" style="margin-top: 100upx;">
			<view @tap="gotoPage" class="flex align-center justify-center" style="width: 248upx;height: 76upx;border: 1.5upx solid #999999; color: #999999;border-radius: 50upx;">再去逛逛</view>
			<view style="width: 30upx;"></view>
			<view  @tap="gotoTc" class="flex align-center justify-center" style="width: 248upx;height: 76upx;border: 1.5upx solid rgb(248, 81, 68);background-color: rgb(248, 81, 68);color: #ffffff;border-radius: 50upx;">立即使用</view>
		</view>
		
		<view style="text-align: center;font-size: 36upx;margin-top: 80upx;margin-bottom: 40upx;color: #000000;font-weight: 600;position: relative;">
			<text>推荐活动</text>
			<image src="https://img.huaxuapp.com/dpxqtb_03.png" mode="" style="position: absolute;width: 216upx;height: 26upx;left: 268upx;top: 12upx;"></image>
		</view>
		
		<view class="flex " style="" v-for="(item,indexq) in userAllsale" :key="indexq">
			<view @tap="baoPingoto(item[0].StoreID,item[0].ID)" style="border-radius: 10upx;width: 336upx;margin:30upx;margin-top: 20upx;background-color: #ffffff;margin-bottom: 11upx;margin-right: 10upx;padding-bottom: 20upx;">
				<view style="width: 336upx;height: 184upx;">
					<image :src="item[0].Imgs" style="border-radius: 10upx;width: 336upx;height: 184upx;"  mode="scaleToFill"></image>
				</view>
				<view class="shengLv" style="padding:12upx 14upx;font-size: 26upx;width: 336upx;height: 80upx;">
					<text>{{item[0].Title}}</text>
				</view>
				
				<view style="color: #fe4e01;margin-top: 6upx;margin-left: 10upx;">
					<text style="font-size: 24upx;">￥</text>
					<text style="font-size: 36upx;font-weight: 600;">{{changeMoney(item[0].DiscountedPrice)}}</text>
				</view>
				<view class="flex align-center justify-between" style="margin-top: 10upx;padding: 0 10upx;">
					<view class="flex align-center">
						<view class="flex align-center" style="font-size: 24upx;text-decoration: line-through;color: #999999;">
							<text>{{changeMoney(item[0].OrderPrice)}}</text>
						</view>
						<view class="flex align-center" style="font-size: 24upx;color: #fe4e01;background-color: #fbf0ea;padding: 0 12upx;border-radius: 50upx;margin-left: 6upx;">
							<text>{{jiSuan(item[0].ZK)}}折</text>
						</view>
					</view>
					<view  class="flex align-center" style="font-size: 24upx;color: #999999;">
						<text>{{item[0].GetNum}}人购买</text>
					</view>
				</view>
			</view>
			
			<view v-if="item[1]" @tap="baoPingoto(item[1].StoreID,item[1].ID)" style="border-radius: 10upx;width: 336upx;margin:30upx;margin-top: 20upx;background-color: #ffffff;margin-bottom: 11upx;margin-left: 10upx;padding-bottom: 20upx;">
				<view style="width: 336upx;height: 184upx;">
					<image :src="item[1].Imgs" style="border-radius: 10upx;width: 336upx;height: 184upx;"  mode="scaleToFill"></image>
				</view>
				<view class="shengLv" style="padding:12upx 14upx;font-size: 26upx;width: 336upx;height: 80upx;">
					<text>{{item[1].Title}}</text>
				</view>
				
				<view style="color: #fe4e01;margin-top: 6upx;margin-left: 10upx;">
					<text style="font-size: 24upx;">￥</text>
					<text style="font-size: 36upx;font-weight: 600;">{{changeMoney(item[1].DiscountedPrice)}}</text>
				</view>
				<view class="flex align-center justify-between" style="margin-top: 10upx;padding: 0 10upx;">
					<view class="flex align-center">
						<view class="flex align-center" style="font-size: 24upx;text-decoration: line-through;color: #999999;">
							<text>{{changeMoney(item[1].OrderPrice)}}</text>
						</view>
						<view class="flex align-center" style="font-size: 24upx;color: #fe4e01;background-color: #fbf0ea;padding: 0 12upx;border-radius: 50upx;margin-left: 6upx;">
							<text>{{jiSuan(item[1].ZK)}}折</text>
						</view>
					</view>
					<view  class="flex align-center" style="font-size: 24upx;color: #999999;">
						<text>{{item[1].GetNum}}人购买</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userAllsale:[],
			Ids:'',
			location: '107.02,33.07',
			amapPlugin: null, //高德的配置
			key: '2b60666c9954c824e769604cbeb61457',
			adcode: '610702',//区划码  默认是汉台
			userAllsales:[]
		};
	},
	onLoad(option) {
		this.Ids = option.Ids
		
		this.currentPage = 1
		uni.getLocation({
			success: res => {
				this.location = `${res.longitude},${res.latitude}`
				
				this.$store.commit('setLatitudeAndLongitude', {
					latitude:res.latitude,
					longitude:res.longitude
				})
				this.$http.paySuccess(this.site_.SiteID || 0,this.location || '107.02,33.07').then(res => {
					console.log(res);
					this.userAllsales = res
					var arr = [];
					for(var i=0;i<res.length;i+=2){
						arr.push(res.slice(i,i+2));
					}
					this.userAllsale = arr
				})
			},
			fail: err => {
				this.location = []
				uni.showModal({
					title: '拒绝授权',
					content: '您拒绝花蓄使用的位置权限，我们将无法为您提供基于位置的服务',
					showCancel: false
				})
				this.$http.paySuccess(0,'107.02,33.07').then(res => {
					console.log(res);
					this.userAllsales = res
					var arr = [];
					for(var i=0;i<res.length;i+=2){
						arr.push(res.slice(i,i+2));
					}
					this.userAllsale = arr
				})
			}
		})
		
	},
	onShow() {
		
	},
	methods: {
		gotoPage() {
			uni.redirectTo({
				url:'/pages/hotSale/hotSale'
			})
		},
		gotoTc() {
			uni.redirectTo({
				url:'/pages/shopDetail/verifiCations?Ids=' + this.Ids
			})
		},
		changeMoney(money) {
			return this.$api.formatAmount(money);
		},
		jiSuan(number){
			return Math.round(number * 100) / 10
		},
		baoPingoto(a,b){
			this.$http.xhAdd(this.$store.state.userInfo.ID,b).then(res => {
				console.log(res);
			})
			uni.navigateTo({
				url:'/pages/shopDetail/shopDetailsorder?storeId=' + a + '&tcID=' + b
			})
		},
	},
	onReachBottom() {
		
	},
	onPullDownRefresh() {
		
	}
}
</script>

<style scoped lang="scss">
	page{
		background: #ffffff;
	}
</style>

<style scoped lang="scss">
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