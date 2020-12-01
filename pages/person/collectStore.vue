<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的收藏</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的收藏</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="flex " style="justify-content: center;align-items: center;margin-top: 20upx;padding-bottom: 10upx;">
			<view style="background-color: #f6f6f6;width: 304upx;border-radius: 50upx;text-align: center;" class="flex align-center">
				<view @tap="qiHu" class="flex justify-center" style="align-items: center;width: 152upx;height: 54upx;font-size: 24upx;border-radius: 50upx;" :style="inx == 1 ? 'color: #ffffff;background-color: #fe4e01;' : 'background-color: #f8f8f8;'">
					商品收藏
				</view>
				<view @tap="qiHus" class="flex justify-center" style="align-items: center;width: 152upx;height: 54upx;font-size: 24upx;background-color: #fe4e01;border-radius: 50upx;" :style="inx == 2 ? 'color: #ffffff;background-color: #fe4e01;' : 'background-color: #f8f8f8;'">
					店铺收藏
				</view>
			</view>
		</view>

		<view @tap="gotoShops(item)" v-for="(item,index) in shopList" :key="index" class="flex" style="margin: 0 30upx;margin-top: 30upx; padding-top: 10upx;padding-bottom: 30upx;border-bottom: 1.2upx solid #e4e4e4;" v-if="inx == 1">
			<view style="">
				<image :src="item.Logo" mode="aspectFill" style="width: 160upx;height: 160upx;border-radius: 10upx;"></image>
			</view>
			<view style="margin-left: 25upx;position: relative;margin-top: 6upx;">
				<view class="shengLv" style="font-size: 28upx;">
					<text>{{item.Title}}</text>
				</view>
				
				<view style="color: #999999;margin-top:40upx;">
						<text style="font-size: 26upx;font-weight: 600;color: #fe4e01;">￥</text>
						<text style="font-size: 32upx;font-weight: 600;color: #fe4e01;">{{changeMoney(item.DiscountedPrice)}}</text>
					<text style="font-size: 24upx;text-decoration: line-through;margin-left: 12upx;">{{changeMoney(item.OrderPrice)}}</text>
				</view>
			</view>
		</view>
		
		<view @tap="gotoShop(item.c.ShopID)" v-for="(item,index) in StoreList" :key="index" class="flex justify-between align-center" style="margin: 0 30upx;margin-top: 30upx;padding-top: 10upx;padding-bottom: 30upx;border-bottom: 1.2upx solid #e4e4e4;" v-if="inx == 2">
			<view class="flex">
				<view style="">
					<image :src="item.LogoPic || 'https://img.huaxuapp.com/huaxulogo1008.png'" mode="aspectFill" style="width: 100upx;height: 100upx;border-radius: 100upx;"></image>
				</view>
				<view style="margin-left: 25upx;position: relative;margin-top: 6upx;">
					<view style="font-size: 30upx;font-weight: 600;">
						<text>{{item.StoreName}}</text>
					</view>
					<view class="flex" style="color: #999999;margin-top:20upx;">
						<view class="flex align-center">
							<view class="hxIcon-tubiaozhizuomoban  start-red " v-for="(redStartItem,redStartIndex) in item.StoreStart"
							 :key="redStartIndex" style="margin-right: 4upx; line-height: 1em;font-size: 24upx;" v-if="item.StoreStart>0"></view>
						</view>
						<view class="flex align-center">
							<view class="hxIcon-tubiaozhizuomoban  " v-for="(grayStartItem,grayStartIndex) in (5-item.StoreStart)"
							 :key="grayStartIndex" style="margin-right: 4upx; font-size: 24upx;line-height: 1em;color: #cccccc;"  v-if="(5-item.StoreStart)>0"></view>
						</view>
					</view>
				</view>
			</view>
			<view style="color: #666666;">
				<text  style="font-size: 24upx;margin-right: 20upx;">去逛逛</text>
				<text class="hxIcon-rightArrow" style="font-size: 26upx;"></text>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;background-color: #ffffff;" v-if="inx == 1 && shopList == false">
			<image src="https://img.huaxuapp.com/shoucang.png" mode="aspectFill" style="width: 332upx;height: 232upx;"></image>
			<view style="margin-top: 30upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有收藏感兴趣的商品哦~</text>
			</view>
			<view class="flex justify-center" style="margin-top:80upx;" @tap="goGon">
				<view class="flex justify-center align-center" style="border: 2upx solid #b9b9b9;width: 164upx;height: 54upx;background-color: #ffffff;border-radius: 50upx;color: #333333;font-size: 26upx;">
					<text>去逛逛</text>
				</view>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;background-color: #ffffff;"  v-if="inx == 2 && StoreList == false">
			<image src="https://img.huaxuapp.com/shoucang.png" mode="aspectFill" style="width: 332upx;height: 232upx;"></image>
			<view style="margin-top: 30upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有收藏感兴趣的店铺哦~</text>
			</view>
			<view class="flex justify-center" style="margin-top:80upx;" @tap="goGon">
				<view class="flex justify-center align-center" style="border: 2upx solid #b9b9b9;width: 164upx;height: 54upx;background-color: #ffffff;border-radius: 50upx;color: #333333;font-size: 26upx;">
					<text>去逛逛</text>
				</view>
			</view>
		</view>

		<!-- <mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<view class="margin flex" v-for="(item,index) in StoreList" :key="index" v-if="item.StoreName" @tap="goToDetail(item.c.ShopID)">
				<view style="width: 220upx; height:150upx;">
					<image :src="item.StorePic" style="height: 100%;" class="radius log_img_df"></image>
				</view>
				<view class="margin-left" style="width: 100%;">
					
					<view class="text-cut" style=" width: 340upx; ">
						<text class="text-lg text-bold">{{item.StoreName}}</text>
					</view>
					
					<text style="font-size: 22upx;color: #999999; float: right;position: relative; bottom:25upx;">{{setDis(item.distance)}}</text>
					
					<view class="flex margin-top-xs">
						<view class="hxIcon-xingxing margin-right-xs text-red" v-for="(item,index) in item.StoreStart" :key="index" style="font-size: 27upx;"></view>
					</view>
					
					<view class=" margin-top-xs text-sm  text-cut" style="width:440upx; height: 34upx;">
						<text class="text-cut">
							{{item.StoreDesc}}
						</text>
					</view>
					<view class="margin-top-xs flex" style=" color: #999999; height: 65upx; line-height:32upx;">
						<text class="cuIcon-location text-red" style="font-size: 24upx;"></text>
						<text class="text-sm margin-left-xs">
							{{item.StoreAddress}}
						</text>
					</view>
				</view>
			</view>
		</mescroll-uni> -->
	</view>
</template>

<script>
	import MescrollUni from 'mescroll-uni/mescroll-uni.vue'
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				StoreList: [],
				Location: '',
				data: {
					page: 1,
					pagesize: 10,
					UserID: null,
					location: null
				},
				longitude: this.$store.state.longitude,
				latitude: this.$store.state.latitude,
				buttomAlert: false,
				haveData: false,
				upOption: {
					noMoreSize: 10
				},
				recordList: [],
				inx: 1,
				shopList:[]
			}
		},
		onLoad(option) {
			this.inx = option.inx
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.data.UserID = res.data.ID;
				},
				fail: (res) => {
					this.data.UserID = null;
				}
			});
			this.data.location = `${this.longitude},${this.latitude}`;
		},
		onReady() {

		},
		onShow() {
			this.haveData = true;
			if (this.data.UserID != null) {
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/store/sclist",
					//不依据类别获得商铺列表
					data: this.data,
					method: "GET",
					success: (res) => {
						console.log(res);
						if (res.data.IsSuccess === true) {
							this.StoreList = res.data.Data;
							this.haveData = true;
						}
						if (res.data.IsSuccess === false) {
							this.haveData = false;
							this.StoreList = [];
						}
					},
				});
			}
			this.$http.shoppingLove(this.$store.state.userInfo.ID,1,100).then(res => {
				console.log(res);
				this.shopList = res.Data
			})

		},
		onPullDownRefresh() {
			//下拉刷新
			//刷新商铺列表
			this.data.location = this.Location;
			this.data.page = 1;
			uni.request({
				url: "https://newsapp.huaxuapp.com/api/store/sclist",
				//不依据类别获得商铺列表
				data: this.data,
				method: "GET",
				success: (res) => {
					this.StoreList = res.data;
					if (res != null) {
						this.buttomAlert = false;
						uni.stopPullDownRefresh();
					}
				},
				fail: () => {
					uni.showToast({
						title: '刷新请求失败',
						icon: 'none',
					})
					uni.stopPullDownRefresh();
				}
			});
		},
		onReachBottom() {
			//上拉加载
			if (this.buttomAlert == false) {
				if (this.StoreList.length <= 0) {
					this.data.page = 1;
				} else {
					this.data.page++;
				}
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/store/sclist",
					//不依据类别获得商铺列表
					data: this.data,
					method: "GET",
					success: (res) => {
						if (res.data.length > 0) {
							this.StoreList = this.StoreList.concat(res.data);
						} else {
							uni.showToast({
								title: '已经到最底啦',
								icon: 'none',
							})
							this.buttomAlert = true;
						}
					},
				});
			} else {
				uni.showToast({
					title: '已经到最底啦',
					icon: 'none',
				})
			}
		},
		methods: {
			goGon() {
				uni.navigateTo({
					url:'/pages/hotSale/hotSale'
				})
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			gotoShops(item){
				this.$http.xhAdd(this.$store.state.userInfo.ID,item.ID).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailsorder?storeId=' + item.StoreID + '&tcID=' + item.ID
				})
			},
			gotoShop(e){
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailPage?StoreID=' + e
				})
			},
			qiHu(){
				if(this.inx == 2){
					this.inx = 1
				}
			},
			qiHus(){
				if(this.inx == 1){
					this.inx = 2
				}
			},
			upCallback: function(mescroll) {
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/store/sclist",
					//不依据类别获得商铺列表
					data: this.data,
					method: "GET",
					success: (res) => {
						console.log("success");
						console.log(res);
						if (res.data.IsSuccess === true) {
							this.StoreList = res.data.Data;
							mescroll.endSuccess(this.StoreList.length)
							this.haveData = true;
						} else {
							this.haveData = false;
							this.StoreList = [];
							mescroll.endSuccess(0)
						}
					},
					fail: function(res) {
						console.log("err");
						console.log(res);
						mescroll.endErr()
					}
				});
			},
			mescrollInit: function(mescroll) {
				console.log("mescrollInit");
				this.mescroll = mescroll
			},
			downCallback: function(mescroll) {
				console.log("downCallback");
				mescroll.resetUpScroll()
			},
			goToDetail(StoreID) {
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetailPage?StoreID=` + StoreID
				})
			},
			goTosearch() { //点击搜索的时候
				uni.navigateTo({
					url: `/pages/searchResult/searchRouter/searchRouterPage`
				})
			},
			setDis(num) {
				if (num > 1000) {
					return ((num / 1000).toFixed(2)) + "km"
				} else {
					return num.toFixed(2) + 'm'
				}
			},
		},
	}
</script>


<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped>
	.start-red{
		color: #fe4e01;
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
</style>
