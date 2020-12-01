<template>
	<view style="height: 100%;position: relative;background-color: #ffffff;">
		<cu-custom bgColor="bg-shop" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄优选 - 限时抢购</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">花蓄优选 - 限时抢购</block>
			<!-- #endif -->
		</cu-custom>
		
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		<view v-if="!showLoading">
			<view style="height:600upx;background-color: #f3553b;position: relative;">
				<view style="font-size: 40upx;color: #ffffff;padding: 30upx;font-weight: 600;">
					大家都在买
				</view>
			</view>
			
			
			<view style="position: absolute;top: 255upx;width: 100%;border-radius: 40upx 40upx 0 0;background-color: #ffffff;padding-top: 20upx;"  offset-top="0" >
				<view class="flex justify-between align-center padding" style="padding-bottom: 20upx;background-color: #ffffff;padding-top: 25upx;" :class="isSticky?'fixed-top':'fixed-tops'" :style="{top:isSticky?CustomBar+'px':''}">
					<view class="flex align-center">
						<view @tap="actQ(1)" :class="[actInx==1?'act':'acts']">
							推荐
						</view>
						<view @tap="actQ(2)" :class="[actInx==2?'act':'acts']" style="margin: 0 20upx;">
							人气
						</view>
						<view @tap="actQ(3)" :class="[actInx==3?'act':'acts']">
							价格
						</view>
					</view>
					<view @tap="actQ(4)" :class="[actInx==4?'actbig':'actsbig']">
						附近活动
					</view>
				</view>
				<view class="padding" style="background-color: #ffffff;padding-top: 0;">
					<view v-for="(item,index) in centerLBLlit" :key="index" class=""  @tap="gotoDetils(item.StoreID,item.ID)" style="border-radius: 10upx;width: 690upx;margin-top: 20upx;padding-top: 0upx;background-color: #ffffff;-moz-box-shadow:0px 0px 4px 0px #E4E4E4;-webkit-box-shadow:0px 0px 4px 0px #E4E4E4;box-shadow:0px 0px 4px 0px #E4E4E4;">
						<view class="" style="background-color: #ffffff;padding-bottom: 0upx;">
							<image  :src="item.Imgs" mode="scaleToFill" style="width: 690upx;height: 390upx;border-radius: 10upx;"></image>
						</view>
					
						<view class="" style="padding-bottom: 30upx;border-radius:0 0 10upx 10upx;background-color: #ffffff;margin-top: 0upx;padding-top: 10upx; ">
							<view class="flex justify-between align-center" style="padding-top: 4upx;">
								<view class="flex align-center" style="color: #999999;font-size: 24upx;">
									<view style="width: 6upx;height:24upx;background-color: rgb(254, 217, 66);"></view>
									<view style="margin-left: 20upx;">
										{{item.StoreName}}
									</view>
								</view>
								<view style="color: #999999;font-size: 24upx;margin-right: 20upx;">
									{{item.SortName}} | {{getDistance(item.distance)}}
								</view>
							</view>
							
							<view class="flex justify-between align-center" style="padding: 15upx;margin-top: 4upx;">
								<view class="flex justify-between align-center" style="">
									<text class="flex align-center" style="">
										<text class="shengLv" style="line-height: 50upx;align-self: center ;">
											<text style="height: 36upx; border-radius: 5upx;background-color: rgb(254, 217, 66);font-size: 22upx;padding: 4upx 8upx;">
												{{item.Tags}}
											</text>
											<text class="" style="line-height: 36upx;background-color: #ffffff;font-size: 31upx;">
												{{item.Title}}
											</text>
										</text>
									</text>
								</view>
							</view>
							
							<view class="flex justify-between align-center" style="padding: 12upx;padding-top: 0upx;">
								<view style="font-weight: 600;">
									<text style="font-size: 26upx;color: #fe4e01;">￥</text>
									<text style="font-size: 44upx;color: #fe4e01;">{{changeMoney(item.DiscountedPrice)}}</text>
								</view>
								<view class="flex justify-center align-center" style="width: 160upx;height: 60upx;background-color: #f85144;border-radius: 12upx;color: #ffffff;">
									马上抢
								</view>
							</view>
							
							<view class="flex align-center justify-between" style="margin-top: 6upx;padding: 0 10upx;">
								<view class="flex align-center">
									<view  class="flex align-center" style="font-size: 24upx;text-decoration: line-through;color: #999999;">
										<text>原价￥{{changeMoney(item.OrderPrice)}}</text>
									</view>
									<view class="flex align-center" style="font-size: 24upx;color: #fe4e01;background-color: #fbf0ea;padding: 0 12upx;border-radius: 50upx;margin-left: 6upx;">
										<text>{{jiSuan(item.ZK)}}折</text>
									</view>
								</view>
								<view  class="flex align-center" style="font-size: 24upx;color: #999999;margin-right: 20upx;">
									<text>{{item.GetNum}}人购买</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="scrollTop > 600"  @tap="backtops" class="flex align-center justify-center flex-direction huiqu">
				<text class="hxIcon-shangla" style="font-size: 90upx;color: rgba(0,0,0,0.2);"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				location: '',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702',//区划码  默认是汉台
				modalName: null,
				actInx:1,
				baoPin:[
					'https://img.huaxuapp.com/290174_05.png',
					'https://img.huaxuapp.com/290174_03.png',
					'https://img.huaxuapp.com/2901741_03.png',
					'https://img.huaxuapp.com/290174_05.png',
					'https://img.huaxuapp.com/290174_03.png',
					'https://img.huaxuapp.com/2901741_03.png',
					'https://img.huaxuapp.com/2901741_03.png',
				],
				scrollTop: 0,
				isSticky: false,
				CustomBar:this.CustomBar,
				sorts:1,
				centerLBLlit:[],
				pages:1,
				showLoading:true
			}
		},
		onShow() {
			
			uni.getLocation({
				success: res => {
					this.location = `${res.longitude},${res.latitude}`
					this.$store.commit('setLatitudeAndLongitude', {
						latitude:res.latitude,
						longitude:res.longitude
					})
					this.$http.userBuy(1,this.location,1,10).then(res => {
						console.log(res);
						this.centerLBLlit = res.SetDataMeal
						this.showLoading = false
					})
				},
				fail: err => {
					this.location =  '107.02,33.07'
					this.$http.userBuy(1,this.location,1,10).then(res => {
						console.log(res);
						this.centerLBLlit = res.SetDataMeal
						this.showLoading = false
					})
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
			this.scrollTop = e.scrollTop
			if (e.scrollTop >= 115) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
		},
		onShareAppMessage() {
			
		},
		methods: {
			backtops(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			jiSuan(number){
				return Math.round(number * 100) / 10
			},
			gotoDetils(a,b){
				this.$http.xhAdd(this.$store.state.userInfo.ID,b).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailsorder?storeId=' + a + '&tcID=' + b
				})
			},
			actQ(e){
				this.actInx = e 
				this.sorts = e
				this.$http.userBuy(this.sorts,this.location,1,10).then(res => {
					console.log(res);
					this.centerLBLlit = res.SetDataMeal
				})
			},
			getDistance(distance) {
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} km`
				}
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
		},
		onPullDownRefresh() {
			this.pages = 1
			this.$http.userBuy(this.sorts,this.location,this.pages,10).then(res => {
				console.log(res);
				this.centerLBLlit = res.SetDataMeal
			})
		},
		onReachBottom(){//上拉加载
			this.pages+=1
			this.$http.userBuy(this.sorts,this.location,this.pages,10).then(res => {
				if (res.SetDataMeal.length > 0) {
					this.centerLBLlit = this.centerLBLlit.concat(res.SetDataMeal);
				} else {
					this.$api.msg('已经到最底啦~')
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
	.act {
		background-color: rgb(254, 217, 66);
		width: 90upx;
		height: 46upx;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.acts {
		background-color: #f8f8f8;
		width: 90upx;
		height: 46upx;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999999;
		
	}
	
	.actbig {
		background-color: rgb(254, 217, 66);
		width: 140upx;
		height: 46upx;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.actsbig {
		background-color: #f8f8f8;
		width: 140upx;
		height: 46upx;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999999;
	}
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 99990;
		border-radius: 0;
	}
	
	.fixed-tops {
		border-radius: 40upx 40upx 0 0;
	}
	
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
	
	.huiqu {
		position: fixed;
		right: 30upx;
		bottom:140upx;
		z-index: 66;
		width: 90upx; 
		height:90upx;
		 -webkit-transition: all 0.5s;
	}
</style>

