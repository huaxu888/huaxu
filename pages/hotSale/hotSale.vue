<template>
	<view style="height: 100%;position: relative;background-color: #ffffff;">
		
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">热卖爆品</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
			<block slot="content">热卖爆品</block>
			<!-- #endif -->
		</cu-custom>
		
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		
		<view v-if="!showLoading">
			<view class="coupon-redemption-page"  style="height: 100%;padding-bottom: 0upx;">
			
				<view class="search-field">
					<view class="flex align-center">
						<input type="text" v-model="keyword" placeholder="找吃喝玩乐,上花蓄~" placeholder-class="placeholder" class="search" confirm-type="search" @blur="search"/>
					</view>
				</view>
			</view>
			
			<view style="padding: 10upx 30upx;padding-top: 0upx;background-color: #ffffff;">
				<view style="height: 204upx;width: 692upx">
					<image src="https://img.huaxuapp.com/rmst_03.png" mode="scaleToFill" style="width: 692upx; height: 204upx;border-radius: 10upx;"></image>
				</view>
			</view>
			
			<view style="padding-bottom: 0upx;margin: 30upx;margin-top: 15upx;margin-bottom: 0;" class="flex justify-between align-center">
				<view style="padding: 20upx 0;">
					<view style="font-size: 32upx;font-weight: 600;color: #444444;">热卖商品</view>
				</view>
				
				<view class="flex" style="width: 360upx;">
					<view @tap="actQ(1)" :class="[actInx==1?'act':'acts']" class="flex justify-center align-center" style="border: 2upx solid #fed942;">
						推荐
					</view>
					<view @tap="actQ(2)" :class="[actInx==2?'dbact':'dbacts']" class="flex justify-center align-center" style="border-top: 2upx solid #fed942;border-bottom: 2upx solid #fed942;">
						附近
					</view>
					<view @tap="actQ(3)" :class="[actInx==3?'thact':'thacts']" class="flex justify-center align-center" style="border: 2upx solid #fed942;">
						最新
					</view>
				</view>
			</view>
			
			<view style="padding: 30upx;background-color: #FFFFFF;padding-bottom: 0;padding-top: 1upx;">
				<view v-for="(item,index) in centerLBLlit" :key="index" style="margin-top: 30upx;-moz-box-shadow:0px 0px 4px 0px #E4E4E4;-webkit-box-shadow:0px 0px 4px 0px #E4E4E4;box-shadow:0px 0px 4px 0px #E4E4E4;border-radius: 20upx;">
					<view class="flex" @tap="gotoDetils(item.StoreID,item.ID)">
						<view style="width: 272upx;height: 272upx;">
							<image :src="item.Logo" mode="scaleToFill" style="width: 272upx;height: 272upx;border-radius: 20upx;"></image>
						</view>
						<view style="position: relative;margin-left: 20upx;">
							<view style="width: 390upx;height: 70upx;align-items: center;display: flex;margin-top: 20upx;">
								<text  class="shengLv" style="font-size: 28upx;">{{item.Title}}</text>
							</view>
							<view style="margin-top: 20upx;" class="flex align-center justify-between">
								<view>
									<text style="color: #a5a5a5;font-size: 24upx;">{{item.StoreName}}</text>
								</view>
								<view style="font-size: 24upx; color: #b9b9b9;margin-right: 10upx;">
									<text>{{getDistance(item.distance)}}</text>
								</view>
							</view>
							<view class="flex align-center" style="margin-top:20upx;">
								<text style="color: #fe4e01;font-size: 28upx;margin-left: 0upx;">￥</text><text style="color: #fe4e01;font-size: 36upx;font-weight: 600;"><text style="font-size: 38upx;">{{changeMoney(item.DiscountedPrice)}}</text></text>
								<text style="color: #999999;text-decoration:line-through;font-size: 24upx;margin-left: 10upx;">{{changeMoney(item.OrderPrice)}}</text>
								<view class="flex align-center justify-center" style="border-radius: 10upx;margin-left: 10upx;width: 72upx;height: 28upx;background-color: #ffffff;border: 2upx solid #fe4e01; color: #fe4e01;font-size: 22upx;">
									<text>{{jiSuan(item.ZK)}}折</text>
								</view>
							</view>
							<view style="margin-top: 20upx;" class="flex align-center justify-between">
								<view>
									<text style="color: #b9b9b9;font-size: 24upx;">已抢{{item.GetNum}}份</text>
								</view>
								<view style="font-size: 24upx; color: #ffffff;background: linear-gradient(to right, #fc6b2b, #fe4e01);;border-radius: 50upx;width: 140upx;height: 50upx;line-height: 50upx;text-align: center;">
									<text>立即抢购</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex align-center" style="margin-top: 30upx;">
						<view style="width: 100upx;margin-left: 20upx;">
							<image src="https://img.huaxuapp.com/rmbptj.png" mode="scaleToFill" style="width: 60upx;height: 32upx;"></image>
						</view>
						<view class="flex justify-center align-center" style="color: #444444;border-radius: 10upx;font-size: 26upx;background-color: #f8f8f8;width: 100%;font-weight: 600;height: 48upx;line-height: 48upx;margin-right: 10upx;">
							{{item.Info1}}
						</view>
					</view>
					
					<view class="flex align-center" style="margin-top: 20upx;" v-if="item.StoreDesc.length > 0">
						<view style="margin-left: 10upx;">
							<image :src="item.LogoPic" style="width:50upx;height:50upx;border-radius: 50upx;" mode="scaleToFill"></image>
						</view>
						<view style="font-size: 24upx;margin-left: 20upx;color: #999999;" >
							{{item.StoreDesc}}
						</view>
					</view>
					
					<view style="background-color: #FFFFFF;padding-top: 20upx;height: 150upx;border-radius: 20upx;" v-if="item.Arg.length > 0">
						<scroll-view class="scroll-view_H" scroll-x="true" :scroll-with-animation="true" style="margin-left: 0;border-radius: 10upx;">
							<view style="padding-right: 0upx;" :style="{width:7 * 170 + 40 +'upx'}">
								<view class="yin" style="height: 120upx;":style="{width:7 * 170 + 40 + 'upx'}">
									<view class="scroll-view-item_H"  style="margin: 0 8upx;" @tap="yuLan(qieHuan(item.Arg))" v-for="(items,i) in qieHuan(item.Arg)">
										<view style="position: relative;width: 172upx;height: 118upx;">
											<image :src="items" mode="scaleToFill" style="width: 172upx;height: 118upx;border-radius: 10upx;">
											</image>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<!-- <view style="height: 240upx;" v-else> v-if="cLeng > 0"
							<image src="https://img.huaxuapp.com/zwtp_03.png" style="width: 302upx;height: 212upx;border-radius: 5upx;" mode=""></image>
						</view> -->
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
				centerLBLlit:[],
				CustomBar:this.CustomBar,
				location: '',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702',//区划码  默认是汉台
				modalName: null,
				actInx:1,
				baoPin:[
				],
				sorts: 1,
				page: 1,
				pagesize: 10,
				scrollTop:0,
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
					this.$http.hotSalelist(1,[],this.location,1,10).then(res => {
						console.log(res);
						if (res.IsSuccess) {
							this.centerLBLlit = res.SetDataMeal;
							this.showLoading = false
						}
					})
				},
				fail: err => {
					this.location =  '107.02,33.07'
					this.$http.hotSalelist(1,[],this.location,1,10).then(res => {
						console.log(res);
						if (res.IsSuccess) {
							this.centerLBLlit = res.SetDataMeal;
							this.showLoading = false
						}
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
			qieHuan(item){
				return item.split(',')
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
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			getDistance(distance) {
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} km`
				}
			},
			search: function () {
				this.$http.hotSalelist(1,this.keyword || [],this.location,1,10).then(res => {
					console.log(res);
					if (res.IsSuccess) {
						this.centerLBLlit = res.SetDataMeal;
					}
				})
			},
			actQ(e){
				this.actInx = e
				this.sorts = e
				this.page = 1
				this.$http.hotSalelist(this.sorts,this.keyword || [],this.location || '107.02,33.07',this.page,10).then(res => {
					this.centerLBLlit = res.SetDataMeal;
				})
			},
			yuLan(e){
				console.log(e);
				uni.previewImage({
					urls: e,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},	
		},
		onPullDownRefresh() {
			this.page = 1
			this.$http.hotSalelist(1,[],this.location,1,10).then(res => {
				console.log(res);
				if (res.IsSuccess) {
					this.centerLBLlit = res.SetDataMeal;
				}
			})
		},
		onReachBottom(){//上拉加载
			this.page+=1
			
			this.$http.hotSalelist(this.sorts,this.keyword || [],this.location,this.page,this.pagesize = 10).then(res => {
				console.log(res);
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
	.scroll-view_H {
			/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
			white-space: nowrap;
			width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		
		height: 120upx;
		text-align: center;
		font-size: 36upx;
		/* margin: 2%  1% 2% 1%; */
	}
	.scroll-view-item_H view{
		box-sizing: border-box;
	}
	.scroll-view-item_H view:nth-child(1){
		width: 100%;
		text-align: right;
	}
	.scroll-view-item_H view:nth-child(2){
		width: 100%;
		height: 120upx;
	}
	.scroll-view-item_H view:nth-child(2) image{
		width: 100upx;
		height: 100upx;
	}
	.scroll-view-item_H view:nth-child(3){
		width: 100%;
		height: 50upx;
	}
	.scroll-view-item_H view:nth-child(4){
		width: 100%;
		height: 50upx;
	}
	
	.cu-form-group .title {
	     min-width: calc(4em + 15px);
	}
	
	.bgclo {
		background-color: #FFFFFF;
	}
	
	.act{
		background: #fed942;
		color:#333333;
		height: 50upx; 
		font-size: 24upx;
		width: 120upx;
		border-radius: 15upx 0 0 15upx;
		
	}
	
	.acts{
		background: #ffffff;
		color:#333333;
		height: 50upx; 
		font-size: 24upx;
		width: 120upx;
		border-radius: 15upx 0 0 15upx;
		
	}
	
	.dbact{
		background: #fed942;
		color:#333333;
		height: 50upx; 
		font-size: 24upx;
		width: 120upx;
		border-radius: 0;
		
	}
	
	.dbacts{
		background: #ffffff;
		color:#333333;
		height: 50upx; 
		font-size: 24upx;
		width: 120upx;
		border-radius: 0;
		border-top: 1upx solid #fed942;
		border-bottom: 1upx solid #fed942;
	}
	
	.thact{
		background: #fed942;
		color:#333333;
		height: 50upx; 
		font-size: 24upx;
		width: 120upx;
		border-radius:  0 15upx 15upx 0;
		border: 1upx solid #fed942;
	}
	
	.thacts{
		background: #ffffff;
		color:#333333;
		height: 50upx; 
		font-size: 24upx;
		width: 120upx;
		border-radius: 0 15upx 15upx 0;
		border: 1upx solid #fed942;
	}
	
	.coupon-redemption-page {
		.search-field {
			// position: fixed;
			z-index: 9;
			width: 750rpx;
			background-color: #FFFFFF;
			/* #ifdef H5 */
			top: 86rpx;
			/* #endif */
			/* #ifndef MP-ALIPAY || H5*/
			top: 66rpx;
			margin-top: 0upx;
			/* #endif */
			
			height: 126rpx;
			display: flex;
			flex-direction: column;
			.search {
				background-color: #F2F2F2;
				border-radius: 60rpx;
				text-align: center;
				height: 60rpx;
				margin: 30rpx;
				flex: 1;
			}
		}
	}
	
	.shengLv{
		color: #333333;
		font-size: 28upx;
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

