<template>
	<view class="order-list-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的订单</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的订单</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<scroll-view scroll-x class="bg-white nav shadow" style="position: fixed;z-index: 9;">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'hx-text-red hx-cur' : ''" v-for="(item, index) in navList"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{ item }}
				</view>
			</view>
		</scroll-view>

		<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" @emptyclick="empty" :up="upOption">
			<view class="holder flex"></view>
			<view class="cu-card case" v-for="(item, index) in orderList" :key="index">
				<view class="cu-item">
					<view class="flex justify-between card-title">
						<text class="store-name">{{ item.StoreName }}</text>
						<text class="text-right">{{ getSort(item.Sort) }} </text>
					</view>
					<view class="card-body flex"    @tap="goTosp(item.XFID)">
						<view class="cu-avatar radius lg" :style="{backgroundImage: item.StorePic === '' ? 
						'url(https://img.huaxuapp.com/huaxulogo.jpg)': `url(${item.StorePic})` }">
						</view>
						<view class="flex-sub flex flex-direction justify-end margin-left text-sm">
							<text class="padding-bottom-xs">下单时间：{{ getLocalTime(item.AddDate) }}</text>
							<text>总价：￥{{ item.XFJE.toFixed(2) }}</text>
						</view>
					</view>
					<view class="card-footer flex justify-end">
						<view class="cu-btn" @tap="goToDetil(item.StoreID)">
							再来一单
						</view>
                        <view class="cu-btn" v-if="item.Sort === 2" @tap="gotoEvaluation(item.StoreID)">
                            去评价
                        </view>
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
		onLoad(options){
			this.TabCur = options.index
		},
		data() {
			return {
				mescroll: null, // mesroll实例对象
				TabCur: 0,
				// navList: ['全部订单', '已付款', '待评价', '已退款', '已取消'],
				navList: ['全部', '待核销', '待评价', '退款/售后', '已取消'],
				orderList: [],
				upOption: {
					empty: {
						btnText: '去逛逛'
					}
				}
			};
		},
		methods: {
			tabSelect: function(res) {
				this.TabCur = res.currentTarget.dataset.id
				this.mescroll.resetUpScroll()
			},
			goToDetil: function (index){	
				uni.navigateTo({
					url:`/pages/shopDetail/shopDetailPage?StoreID=${index}`
				})
			},
			goTosp: function (xfid){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/orderManager`
				})
			},
			mescrollInit: function(mescroll) {
				this.mescroll = mescroll
			},
			downCallback: function(mescroll) {
				mescroll.resetUpScroll()
			},
			upCallback: function(mescroll) {
				console.log('上拉加载更多', mescroll);
				let self = this
				uni.request({
					url: 'https://newsapp.huaxuapp.com/api/scores/mydd',
					data: {
						userid: self.$store.state.userInfo.ID,
						sort: self.TabCur,
						page: mescroll.num,
						pagesize: mescroll.size
					},
					success: function(res) { 
						console.log(res.data.Data);
						if (res.data.IsSuccess) {
							mescroll.endSuccess(res.data.Data.length)
							if (mescroll.num === 1) {
								self.orderList = []
							}
							self.orderList = self.orderList.concat(res.data.Data)
						} else {
							mescroll.endSuccess(0)
						}
					},
					fail: function(res) {
						mescroll.endErr()
					}
				})
			},
			getSort: function(sortId) {
				let sort
				switch (sortId) {
					case 0:
						sort = '已完成'
						break;
					case 1:
						sort = '已核销'
						break;
					case 2:
						sort = '待评价'
						break;
					case 3:
						sort = '退款/售后'
						break;
					case 4:
						sort = '已取消'
						break;
					default:
						break;
				}
				return sort
			},
			getLocalTime: function(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				seconds = seconds < 10 ? '0' + seconds : seconds
				date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
				return date;
			},
            gotoEvaluation: function(id) {
                uni.navigateTo({
                    url: `/pages/person/orderEvaluation?storeid=${id}`
                })
            },
			empty: function(res) {
				uni.navigateTo({
					url: '/pages/menuSort/classIfication/classIficationPage'
				})
			},
		},
		onUnload() {
			this.mescroll = null
		},
		//注册滚动到底部的事件,用于上拉加载
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8
	}

	.holder {
		height: 90upx;
	}

	.cu-card {
		.cu-item {
			margin: 30upx 30upx 0 30upx;
		}
	}

	.card {
		&-title {
			border-bottom: 1px solid #f0f0f0;
			padding: 15upx 30upx;
		}

		&-body {
			padding: 15upx 30upx;
		}

		&-footer {
			.cu-btn {
				background: #ffffff;
				margin: 15upx;
				border: 1px solid #f0f0f0;
				border-radius: 5upx;
			}
		}
	}

	.store-name {
		&::after {
			padding-left: 10upx;
		}
	}
</style>
