<template>
	<view style="height: 100%;position: relative;background-color: #ffffff;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">最新活动</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
			<block slot="content">最新活动</block>
			<!-- #endif -->
		</cu-custom>
		
		<view style="padding: 30upx 30upx;padding-bottom: 30upx;background-color: #ffffff;" class="flex justify-between text-center">
			<view v-for="(item,index) in quanList" :key="index" style="padding: 0 10upx;"  @tap="goGod(index)">
				<image :src="item.img" mode="scaleToFill" style="width: 94upx;height: 94upx;"></image>
				<view  style="margin-top: 14upx;font-size: 24upx;">
					<text>{{ item.name }}</text>
				</view>
			</view>
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
				quanList:[
					{img:'https://img.huaxuapp.com/mstd_03.png',name:'最新活动'},
					{img:'https://img.huaxuapp.com/mstd_05.png',name:'人气推荐'},
					{img:'https://img.huaxuapp.com/mstd_07.png',name:'玩乐精选'},
					{img:'https://img.huaxuapp.com/mstd_09.png',name:'精致生活'},
					{img:'https://img.huaxuapp.com/mstd_11.png',name:'约会聚餐'}
				],
				userAllsale:[],
				userAllsales:[],
				currentPage:1,
				location: '107.02,33.07',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702',//区划码  默认是汉台
			}
		},
		onShow() {
			this.currentPage = 1
			
			uni.getLocation({
				success: res => {
					this.location = `${res.longitude},${res.latitude}`
					
					this.$store.commit('setLatitudeAndLongitude', {
						latitude:res.latitude,
						longitude:res.longitude
					})
					this.$http.myselfTimelist(1,0,1,10,this.location || '107.02,33.07').then(res => {
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
				}
			})
			
			
		},
		onLoad() {
			
		},
		onPageScroll(e) {
			
		},
		onShareAppMessage() {
			
		},
		methods: {
			baoPingoto(a,b){
				this.$http.xhAdd(this.$store.state.userInfo.ID,b).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailsorder?storeId=' + a + '&tcID=' + b
				})
			},
			jiSuan(number){
				return Math.round(number * 100) / 10
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			goGod(e){
				console.log(e);
				if(e == 0){
					uni.redirectTo({
						url:'/pages/find/newAct'
					})
				}
				if(e == 1){
					uni.redirectTo({
						url:'/pages/find/hotAct'
					})
				}
				if(e == 2){
					uni.redirectTo({
						url:'/pages/find/playAct'
					})
				}
				if(e == 3){
					uni.redirectTo({
						url:'/pages/find/lifeAct'
					})
					// this.$api.msg('功能即将上线，敬请期待')
				}
				if(e == 4){
					uni.redirectTo({
						url:'/pages/find/missAct'
					})
				}
			}, 
		},
		onPullDownRefresh() {
			this.$http.myselfTimelist(1,0,1,10,this.location || '107.02,33.07').then(res => {
				console.log(res);
				this.userAllsales = res
				var arr = [];
				for(var i=0;i<res.length;i+=2){
					arr.push(res.slice(i,i+2));
				}
				this.userAllsale = arr
			})
		},
		onReachBottom() {
			this.currentPage += 1
			this.$http.myselfTimelist(1,0,this.currentPage,10,this.location || '107.02,33.07').then(res => {
				console.log(res);
				if (res.length > 0) {
					this.userAllsales = this.userAllsales.concat(res)
					var arr = [];
					for(var i=0;i<this.userAllsales.length;i+=2){
					    arr.push(this.userAllsales.slice(i,i+2));
					}
					this.userAllsale = arr
				} else {
					this.$api.msg('到底了~')
				}
				
				uni.hideLoading()
			})
		}
	}
</script>


<style>
	page {
		background-color: #ffffff;
	}
</style>
<style lang="scss" scoped>
	.shengLv{
		color: #333333;
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

