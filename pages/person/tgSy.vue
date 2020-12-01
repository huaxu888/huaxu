<template>
	<view class="balance-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">推广收益</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">推广收益</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="background-color: #FFFFFF;margin-top: 20upx;text-align: center;padding-top: 30upx;margin-left: 30upx;margin-right: 30upx;border-radius:8upx;padding-bottom: 20upx;">
			<view >
				<text style="font-size: 28upx;" @click="showTips">收益(元)</text><text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;" @click="showTips"></text>
			</view>
			<view style="margin-top: 30upx;">
				<text style="font-size: 64upx;font-weight: 600;">{{XiaoFeiScore}}</text>
			</view>
			<view style="height: 40upx;line-height: 40upx;" @tap="navTo('/pages/person/withdrawals')" :class="active3?'active':''"
				 @touchstart="doTouchstart(3)" @touchend="doTouchend(3)">
				<text style="font-size: 24upx;color: #999999;">提现 <text class="hxIcon-rightArrow" style="font-size: 24upx;"></text></text>
			</view>
		</view>
		
		<view style="background-color: #FFFFFF;margin: 30upx;margin-top: 20upx;border-radius: 8upx;">
			<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
				<view class="detail " >
					<view class="cu-list menu sm-border" style="border-radius: 8upx;justify-content: space-around;">
						<view class="cu-item" style="padding-top: 20upx;padding-bottom: 20upx;" v-for="(item, index) in recordList" :key="index">
							<view class="content">
								<text>{{ editInfo(item.Info) }}</text>
								<view class="text-gray text-sm">
									<text>{{ getLocalTime(item.AddDate) }}</text>
								</view>
							</view>
							<view :class="['action', item.IsZC ? 'transfer-text' : 'recharge-text']">
								{{ changeMoney(item.Score) }}
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
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
				mescroll: null, // mesroll实例对象
				consumable: '0',
				withdraw: '0',
				recordList: [],
				userName: '',
				isTx: false,
				active1: false,
				active2: false,
				active3: false,
				upOption: {
					noMoreSize: 10
				},
				isR: true,
				showRecharge: getApp().globalData.showRechargePage,
				KeTiXian:0,
				XiaoFeiScore:0
			}
		},
		async onShow() {
			this.init()
			this.$http.getRecharge()
				.then( res => {
					if (res.IsSuccess) {
						this.isR = res.Data
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
		methods: {
			showTips() {
				uni.showToast({
					icon:'none',
				    title: '您推广的好友在花蓄平台上的任意一家商户使用，您都将获得一笔推广收益。',
				    duration: 5000
				});
			},
			doTouchstart(index) {
				switch (index) {
					case 1:
						this.active1 = true;
						break;
					case 2:
						this.active2 = true;
						break;
					case 3:
						this.active3 = true;
						break;
					default:
						break;
				}
			},
			doTouchend(index) {
				switch (index) {
					case 1:
						this.active1 = false;
						break;
					case 2:
						this.active2 = false;
						break;
					case 3:
						this.active3 = false;
						break;
					default:
						break;
				}
			},
			navTo(url) {
				console.log(url);
				uni.navigateTo({
					url: url
				})
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			changeMoney2(money) {
				return this.$api.formatAmount(money);
			},
			editInfo(info) {
				let list
				if (info.indexOf('*') > 0) {
					list = info.split('*');
					// return '您的推荐用户【' + list[0] + '】在' + list[1] + '进行了一笔消费'
					return '您的推荐用户在' + list[1] + '进行了一笔消费'
				} else {
					return info === '转账给' ? '转账' : info;
				}
			},
			moveHandle: () => {},
			mescrollInit: function(mescroll) {
				this.mescroll = mescroll
			},
			downCallback: function(mescroll) {
				mescroll.resetUpScroll()
			},
			tx: function(res) {
				this.isTx = !this.isTx
			},
			downloadApp: function(res) {
				this.isTx = !this.isTx
				// 跳转到外部链接
				uni.setClipboardData({
					data: 'http://hxapi.huaxuapp.com/download/viewewm'
				})
			},
			upCallback: function(mescroll) {
				let self = this
				uni.request({
					url: 'https://newsapp.huaxuapp.com/api/scores/myzdrest',
					data: {
						userid: self.$store.state.userInfo.ID,
						sort: 2,
						page: mescroll.num,
						pagesize: 10
					},
					success: function(res) {
						console.log(res);
						if (res.data.IsSuccess) {
							mescroll.endSuccess(res.data.Data.List.length)
							if (mescroll.num === 1) {
								self.recordList = []
							}
							self.recordList = self.recordList.concat(res.data.Data.List)
							self.XiaoFeiScore = self.$api.formatAmount(res.data.Data.Total)
						} else {
							mescroll.endSuccess(0)
						}
					},
					fail: function(res) {
						mescroll.endErr()
					}
				})
			},
			init: function(res) {
				let self = this
				uni.request({
					// url: 'https://newsapp.huaxuapp.com/api/scores/newmyrest',
					// data: {
					// 	userid: self.$store.state.userInfo.ID
					// },
					url: 'https://newsapp.huaxuapp.com/api/scores/myzdrest',
					data: {
						userid: self.$store.state.userInfo.ID,
						sort: 2,
						page: mescroll.num,
						pagesize: 10
					},
					success: function(res) {
						self.consumable = res.data.Data.Total
						self.withdraw = res.data.Data.KeTiXian
						self.recordList = res.data.Data.List
					},
					fail: function(res) {
						console.log('err', res)
					}
				})
			},
			getLocalTime(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
                hour = hour < 10 ? '0' + hour : hour
                minutes = minutes < 10 ? '0' + minutes : minutes
				seconds = seconds < 10 ? '0' + seconds : seconds
				date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
				return date;
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

<style scoped lang="scss">
	page {
		background: #f8f8f8 !important
	}

	@keyframes s {
		from {
			transform: scale(0);
		}

		to {
			transform: scale(50);
		}
	}

	@-webkit-keyframes s {
		from {
			transform: scale(0);
		}

		to {
			transform: scale(10);
		}
	}

	.active {
		transition: all .5s ;
		background: rgba(255, 255, 255, 0.2);
	}

	.balance-nav {
		background: #ec3a46;
	}

    .balance-tab {
        
    }

	.banner {
		position: fixed;
		width: 750upx;
		height: 500upx;
		top: 0;
		z-index: 7;
		background-image: url('http://img.huaxuapp.com/%E6%88%91%E7%9A%84%E4%BD%99%E9%A2%9D_03.png');
		background-repeat: no-repeat;
		background-size: cover;
		box-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2);

		.staus-bar-holder {
			height: 100upx;
			/* #ifdef MP-ALIPAY */
			height: 50upx;
			/* #endif */
		}
	}

	.holder {
		height: 485upx;
	}

	.data-area {
		display: flex;
		padding: 50upx;
		position: relative;
		z-index: 9;

		.consumable,
		.withdraw {
			display: flex;
			/*flex-direction: column;*/
			flex: auto;
			justify-content: center;
			align-items: center;
		}

		.data {
			font-size: 60rpx;
			margin-top: 10rpx;
		}
	}

	.action-bar {
		position: ra;
		bottom: 0;
		display: flex;
		width: 750upx;
		min-height: 120upx;
		border-top: 1px solid rgba(255, 255, 255, .3);

		.recharge-btn,
		.transfer-btn,
		.withdraw-btn {
			font-size: 32upx;
			flex: auto;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.recharge-btn,
		.transfer-btn {
			border-right: 1px solid rgba(255, 255, 255, .3);
		}
	}

	.detail {
		width: 690upx;
		border-radius: 8upx;
	}

	.recharge-text {
		color: #43c088;
		font-weight: 600;

		&::before {
			content: '+';
			padding-right: 10upx;
		}
	}

	.transfer-text {
		color: #ec3a46;
		font-weight: 600;

		&::before {
			content: '-';
			padding-right: 10upx;
		}
	}

	.btn_ {
		background: #ec3a46;
		padding: 10upx;
		color: white;
		border-radius: 10upx
	}
	
</style>

