<template>
	<view>
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">我的足迹</block>
		</cu-custom>
		
		<view v-for="(item,index) in shopList" :key="index" class="flex" style="margin: 0 30upx;margin-top: 30upx; padding-top: 10upx;padding-bottom: 30upx;border-bottom: 1.2upx solid #e4e4e4;">
			<view style="" @tap="gotoShops(item)" >
				<image :src="item.Logo" mode="scaleToFill" style="width: 160upx;height: 160upx;border-radius: 10upx;"></image>
			</view>
			<view style="margin-left: 25upx;position: relative;margin-top: 6upx;width: 100%;">
				<view class="shengLv" style="font-size: 28upx;" @tap="gotoShops(item)" >
					<text>{{item.Title}}</text>
				</view>
				
				<view style="color: #999999;margin-top:40upx;" class="flex align-center justify-between">
					<view>
						<text style="font-size: 26upx;font-weight: 600;color: #fe4e01;">￥</text>
						<text style="font-size: 32upx;font-weight: 600;color: #fe4e01;">{{changeMoney(item.DiscountedPrice)}}</text>
						<text style="font-size: 24upx;text-decoration: line-through;margin-left: 12upx;">{{changeMoney(item.OrderPrice)}}</text>
					</view>
					<view class="flex align-center">
						<!-- <view style="" @tap="shouCang(item)">
							<view class=" flex align-center justify-center" style="width: 105upx;height: 40upx;border-radius: 60upx;font-size: 20upx;
							color: #333333;border: 1upx solid #999999;line-height: 40upx;text-align: center;margin-right: 70upx;">
								加收藏
							</view>
						</view> -->
						<view @tap="detilSlot(item)" style="background-color: #eeeeee;border-radius: 50upx;width: 50upx;height: 50upx;" class="flex align-center justify-center">
							<view class="hxIcon-web-icon-" style="color: #333333;font-size: 36upx;"></view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;background-color: #ffffff;" v-if="shopList == false">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有浏览过的商品哦~</text>
			</view>
			<view class="flex justify-center" style="margin-top:80upx;" @tap="goGon">
				<view class="flex justify-center align-center" style="border: 2upx solid #b9b9b9;width: 164upx;height: 54upx;background-color: #ffffff;border-radius: 50upx;color: #333333;font-size: 26upx;">
					<text>去逛逛</text>
				</view>
			</view>
		</view>
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
				shopList:[],
				currentPage:1,
				collectionFlags:true
			}
		},
		onLoad(option) {
			
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
			this.currentPage = 1
			this.$http.userSlot(this.$store.state.userInfo.ID,1,10).then(res => {
				console.log(res);
				this.shopList = res.Data
			})

		},
		onPullDownRefresh() {
			this.currentPage = 1
			this.$http.userSlot(this.$store.state.userInfo.ID,1,10).then(res => {
				console.log(res);
				this.shopList = res.Data
			})
		},
		onReachBottom() {
			this.currentPage += 1
			this.$http.userSlot(this.$store.state.userInfo.ID,this.currentPage,10).then(res => {
				if (res.Data.length > 0) {
					this.shopList = this.shopList.concat(res.Data);
				} else {
					this.$api.msg('到底了~')
				}
				uni.hideLoading()
			});
				
		},
		methods: {
			goGon() {
				uni.navigateTo({
					url:'/pages/userShopping/userShopping'
				})
			},
			detilSlot(e) {
				console.log(e);
				this.$http.userSlotDetil(this.$store.state.userInfo.ID, e.ID).then(res => {
					console.log(res);
					if(res.IsSuccess) {
						this.$api.msg('删除成功！', 2000)
						this.currentPage = 1
						this.$http.userSlot(this.$store.state.userInfo.ID,1,10).then(res => {
							console.log(res);
							this.shopList = res.Data
						})
					} else {
						this.$api.msg('删除失败，请重新删除！', 2000)
					}
				})
			},
			shouCang(e) {
				console.log(e);
				this.$http.cxShoucang(this.$store.state.userInfo.ID, e.ID).then(res => {
					console.log(res);
					if(res.IsSuccess) {
						this.$api.msg('您已添加过收藏！', 2000)
					} else {
						this.$http.userLove(this.$store.state.userInfo.ID,e.ID).then(res => {
							if (res.IsSuccess) {
								this.$api.msg('添加收藏成功！', 2000)
							}
						})
					}
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
