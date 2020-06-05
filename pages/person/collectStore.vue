<!-- 
* @file index.vue
* @descripteon 收藏页面
* @author 张阳
* @date 2019-6-4
* @version: V1.0.0
* @email:1103992447@qq.com
-->
<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">店铺收藏</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">店铺收藏</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
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
		</mescroll-uni>
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
				recordList: []
			}
		},
		onLoad() {
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
	
</style>
