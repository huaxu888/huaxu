<!-- <template>
	<view>
		<cu-custom bgColor="bg-whitesss"  backColor="text-black" :isBack="false">
			<block slot="content">消费订单</block>
		</cu-custom>
		<view class="history-consumption-page">
			<view class="history-list">
				<view v-for="(item,index) in list" :key="index" class="history-item">
					<view class="history-item-component" @tap="gotoStore(item.StoreID)">
						<image :src="item.LogoPic || 'https://img.huaxuapp.com/huaxulogo70px.png' " mode="aspectFill" class="store-avatar"></image>
						<view class="store-info">
							<view class="name">
								<text>{{ item.StoreName }}</text>
							</view>
							<view class="price">
								<text>{{ formatAmount(item.SJXFJE) }}</text>
								<text class="xfje">{{ formatAmount(item.XFJE) }}</text>
							</view>
							<view class="time">
								{{ beTime(item.AddDate) }}
							</view>
						</view>
						<view class="action">
							<text>已完成</text>
						</view>
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
				list: [],
				currentPage: 1
			};
		},
		onShow() {
			this.currentPage = 1
			this.getShu()
		},
		methods:{
			formatAmount: function (money) {
				return this.$api.formatAmount(money)
			},
			gotoStore: function (storeId) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetailPage?StoreID=' + storeId
				})
			},
			getShu(){
				this.$http.getConsumptionList(this.$store.state.userInfo.ID, this.currentPage,10).then(res => {
					if (res.IsSuccess) {
						this.list = res.Data
						console.log(this.list);
					} else {
						this.$api.msg(res.Msg)
					}
				})
				.catch(err => {
					console.log(err);
					this.$api.msg(res.Msg)
				})
			}
		},
		onReachBottom() {
			this.currentPage += 1
			this.$http.getConsumptionList(this.$store.state.userInfo.ID, this.currentPage,10).then(res => {
				if (res.Data.length > 0) {
					this.list = this.list.concat(res.Data);
				} else {
					this.$api.msg('到底了~')
				}
				uni.hideLoading()
			});
		}
	}
</script>

<style lang="scss" scoped>
	.history-consumption-page {
		
		.history-item {
			margin: 30rpx;
		}
	}
	
	.history-item-component {
		padding: 30rpx;
		background-color: #FFFFFF;
		box-shadow: 2rpx 4rpx 10rpx rgba($color: #000000, $alpha: .1);
		border-radius: 10rpx;
		display: flex;
		
		.store-avatar {
			height: 120rpx;
			width: 120rpx;
			border-radius: 10rpx;
		}
		
		.store-info {
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			justify-content: space-between;
			flex: 1;
			
			.name {
				font-size: 32rpx;
			}
			
			.price {
				text {
					margin-right: 10rpx;
				}
				
				.xfje {
					font-size: 24rpx;
					text-decoration: line-through;
				}
				
				text:before {
					content: '￥';
					font-size: 20rpx;
				}
			}
			
			.time {
				font-size: 24rpx;
				color: #666;
			}
		}
		
		.action {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666;
			
			text {
				border-radius: 50rpx;
				border: 1px solid #666;
				padding: 10rpx 20rpx;
			}
		}
	}
</style>
 -->
 
 <template>
 	<view class="find_page " style="height: 100%;">
 		<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
 		<cu-custom  bgColor="bgclo" :isBack="true" class="text-white bgclo">
 			<block slot="content" class="text-bold">花蓄攻略</block>
 		</cu-custom>
 		<!-- #endif -->
 		
 			<scroll-view scroll-x class=" nav text-center bgclo" style="padding: 0 20upx;color: #FFFFFF;">
 				<view class="cu-item" :class="0==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="0" style="padding: 0;margin: 0 30upx;">
 					全部
 				</view>
 				<view class="cu-item" :class="1==TabCur?'text-white cur borders':''" @tap="tabSelect"  data-id="1" style="padding: 0;margin: 0 30upx;">
 					用户必看
 				</view>
 				<view class="cu-item" :class="2==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="2" style="padding: 0;margin: 0 30upx;">
 					商家必看
 				</view>
 				<view class="cu-item" :class="3==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="3" style="padding: 0;margin: 0 30upx;">
 					常见问题
 				</view>
 				<view class="cu-item" :class="4==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="4" style="padding: 0;margin: 0 30upx;">
 					招商入驻
 				</view>
 				<view class="cu-item" :class="5==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="5" style="padding: 0;margin: 0 30upx;">
 					花蓄资讯
 				</view>
 			</scroll-view>
 
 			<view class="padding-sm animate" v-if="TabCur == 0">
 				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
 					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
 				</view>
 			</view>
 			<view class="padding-sm animate" v-if="TabCur == 1">
 				<view v-for="(item,i) of itemObj " :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
 					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
 				</view>
 			</view>
 			<view class="padding-sm animate" v-if="TabCur == 2">
 				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
 					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
 				</view>
 			</view>
 			<view class="padding-sm animate" v-if="TabCur == 3">
 				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
 					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
 				</view>
 			</view>
 			<view class="padding-sm animate" v-if="TabCur == 4">
 				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
 					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
 				</view>
 			</view>
 			<view class="padding-sm animate" v-if="TabCur == 5">
 				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
 					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
 				</view>
 			</view>
 	</view>
 </template>
 
 <script>
 	import findCard from './components/findCard.vue'
 	import hxTab from '@/components/hxTab.vue'
 	import {
 		getPageAllInfo as findMixins
 	} from '@/mixins/qymMixins.js'
 	export default {
 		mixins: [findMixins],
 		name: 'findPage',
 		data() {
 			return {
 				infoUrl: this.$store.state.findListUrl,
 				getData: {
 					siteid: 0,
 					getsort: 1,
 					page: 1,
 					pagesize: 10,
 					//Location:''
 				},
 				infoList: [],
 				SiteID:0,
 				TabCur: 0,
 				scrollLeft: 0,
 				itemObj:[],
 				len:0,
 				page:1
 			}
 		},
 		components: {
 			findCard,
 			hxTab,
 		},
 		onLoad() {
 			if(this.SiteID != this.site_.SiteID){
 							 this.getCurryInfo()
 			}
 			//this.getData.Location=`${this.$store.state.longitude},${this.$store.state.latitude}`
 			this.getCurryInfo();
 			let arr = [];
 			this.$http.getTopLists(this.page,100).then(res => {
 				if (res) {
 					console.log(res)
 					this.itemObj = res
 				}
 			})
 		},
 		onShow(){
 			
 		},
 		onPullDownRefresh() { //下拉时刷新
 			this.refresGetInfo()
 		},
 		onReachBottom() { //上拉加载
 			this.getData.page += 1
 			this.getCurrentPageInfo()
 		},
 		methods: {
 			tabSelect(e) {
 				console.log(e)
 				this.TabCur = e.currentTarget.dataset.id;
 				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
 				this.page = 1
 				if(this.TabCur == 0){
 							
 					let arr = [];
 					this.$http.getTopLists(this.page,100).then(res => {
 						if (res) {
 							console.log(res)
 							this.itemObj = res
 						}
 					})
 				};
 				if(this.TabCur == 1){
 							
 					let arr = [];
 					this.$http.xinshou(this.page,100).then(res => {
 						if (res) {
 							this.itemObj = res
 						}
 					})
 				};
 				if(this.TabCur == 2){
 					
 					this.$http.changjian(this.page,100).then(res => {
 						if (res) {
 							this.itemObj = res
 						}
 					})
 				};
 				if(this.TabCur == 3){
 					
 					this.$http.gonggao(this.page,100).then(res => {
 						if (res) {
 							this.itemObj = res
 						}
 					})
 				};
 				if(this.TabCur == 4){
 					
 					this.$http.ruzhu(this.page,100).then(res => {
 						if (res) {
 							this.itemObj = res
 						}
 					})
 				};
 				if(this.TabCur == 5){
 					
 					this.$http.zixun(this.page,100).then(res => {
 						if (res) {
 							this.itemObj = res
 						}
 					})
 				};
 			},
 			goTofindDetali(e) {
 				var id = e.ID
 				uni.navigateTo({
 					url: `/pages/findDetail/findDetailPage?id=${id}`,
 				});
 			},
 			getCurryInfo() {
 				this.SiteID =  this.site_.SiteID
 				this.getData.siteid = this.SiteID
 				this.getCurrentPageInfo()
 			},
 		},
 	}
 </script>
 
 <style>
 	page {
 		background-color: #F2F2F2;
 	}
 
 	.find_content {
 		display: flex;
 		flex-wrap: wrap;
 		justify-content: space-between;
 		width: 100%;
 		align-items: stretch;
 	}
 	/* .animate{animation:bounceInUp      0.8s 1;} */
 	
 	.borders {
 		border-bottom: 2px solid #FFFFFF;
 	}
 	
 	.bgclo {
 		/* background: linear-gradient(to right, rgb(254, 177, 3), rgb(254, 129, 5)); */
 		background-color: #fa5837;
 	}
 </style>
 