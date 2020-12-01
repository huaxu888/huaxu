<template>
	<view class="">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 1upx solid #e4e4e4;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">短信账户</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">短信账户</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="background-color: #FFFFFF;text-align: center;padding-top: 30upx;border-radius:8upx;padding-bottom: 40upx;">
			<view style="margin-top: 20upx;">
				<text style="font-size: 26upx;">可用短信(条)</text>
			</view>
			<view style="margin-top: 30upx;">
				<text style="font-size: 64upx;font-weight: 600;" v-if="SmsCount"><text style="font-size: 32upx;font-weight: 0;"></text>{{SmsCount}}</text>
				<text style="font-size: 64upx;font-weight: 600;" v-else><text style="font-size: 32upx;font-weight: 0;"></text>{{SmsCount}}</text>
				
				<form style="margin-left: 10upx;">
					<text formType="submit" data-target="Image" class="hxIcon-wenhao3" style="" @click.stop="showModal"></text>
				</form>
				
				<view class="cu-modal" style="width: 750upx;" :class="modalName=='Image'?'show':''">
					<view class="cu-dialog" style="width:602upx; height:544upx;border-radius: 20upx;">
						<view class="bg-img" style="background-image: url('https://img.huaxuapp.com/dxsm.png');width:602upx; height:544upx;background-repeat: no-repeat;
							background-size: cover;">
							<view class="cu-bar justify-end text-white">
								<view class="action" @tap="hideModal">
									
								</view>
							</view>
						</view>
						<!-- <view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
						</view> -->
					</view>
					<view class="cu-bar action margin-0 flex-sub  solid-left" style="position: absolute;bottom: 180upx;left: 320upx;z-index: 2;">
						<view class="" @tap="hideModal">
							<text class="cuIcon-roundclosefill" style="font-size: 80upx;color: #ffffff;"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
			
		<view style="margin-top: 10upx;width: 100%;z-index: 2;padding-top: 32upx;padding-bottom: 28upx;display: flex;justify-content:space-around;">
			<view style="position: relative;" @tap="tabsChanges" :class="[current == 1 ? 'stas' : '']">
				充值记录
				<text style="margin-top: 22upx;" :class="[current == 0 ? 'sta' : '']"></text>
			</view>
			<view style="position: relative;" @tap="tabsChange" :class="[current == 0 ? 'stas' : '']">
				消费记录
				<text style="margin-top: 22upx;":class="[current == 1 ? 'sta' : '']"></text>
			</view>
		</view>
		
		
		<view style="text-align: center;margin-top: 200upx;" v-if="conList.length == 0 && current == 0">
			<view>
				<text style="font-size: 100upx;color: #666666;" class="hxIcon-tixian-"></text>
			</view>
			<view style="margin-top: 20upx;">
				<text style="font-size: 26upx;color: #999999;">暂无记录</text>
			</view>
		</view>
		
		<view style="text-align: center;margin-top: 200upx;" v-if="conLists.length == 0 && current == 1">
			<view>
				<text style="font-size: 100upx;color: #666666;" class="hxIcon-tixian-"></text>
			</view>
			<view style="margin-top: 20upx;">
				<text style="font-size: 26upx;color: #999999;">暂无记录</text>
			</view>
		</view>
		
		
		<view style="background-color: #ffffff;padding-bottom: 260upx;" class="padding" v-if="current == 0 && conList.length > 0">
			<view class="flex" style="border-bottom: 1upx solid #eeeeee;padding: 28upx 0;" v-for="(item,i) in conList" :key="i">
				<view style="margin-left: 20upx;">
					<view style="">
						<view style="width: 400upx;">
							<text style="font-size: 26upx;" v-if="item.Type==4">微信充值</text>
							<text style="font-size: 26upx;" v-if="item.Type==5">支付宝</text>
						</view>
						<view  style="margin-top: 20upx;font-size: 24upx;">
							<text>{{getLocalTimes(item.AddDate)}} </text>
						</view>
					</view>
				</view>
				<view style="text-align: right;position: absolute;right: 30upx;width: 100%;">
					<text style="font-size: 32upx;font-weight: 600;">
						￥{{item.Scores}}
					</text>
					<view style="color: #999999;margin-top: 10upx;">
						<text style="font-size: 24upx;">到账短信:<text>{{item.Nums}}条</text></text>
					</view>
				</view>
			</view>
		</view>
		
		<view style="background-color: #ffffff;padding-bottom: 260upx;" class="padding" v-if="current == 1 && conLists.length > 0">
			<view class="flex" style="border-bottom: 1upx solid #eeeeee;padding: 28upx 0;" v-for="(item,i) in conLists" :key="i">
				<view style="margin-left: 20upx;">
					<view style="">
						<view style="width: 400upx;">
							<text style="font-size: 26upx;">{{item.MneberSortName}}</text>
						</view>
						<view  style="margin-top: 20upx;font-size: 24upx;">
							<text>{{getLocalTimes(item.AddDate)}} </text>
						</view>
					</view>
				</view>
				<view style="text-align: right;position: absolute;right: 30upx;width: 100%;margin-top: 20upx;">
					<text style="font-size: 32upx;font-weight: 600;">
						-{{item.Nums}}
					</text>
				</view>
			</view>
		</view>
		
		
		<view style="background-color: #ffffff;position: fixed;bottom: 0upx;height: 170upx;text-align: center;width: 100%;padding: 45upx 30upx;z-index: 9;
		-moz-box-shadow:0px -3px 9px 0px #e9e9e9;-webkit-box-shadow:0px -3px 9px 0px #e9e9e9;box-shadow:0px -3px 9px 0px #e9e9e9;">
			<view style="text-align: center;line-height: 80upx;width: 690upx;height: 80upx;background-color: #fe5479;
				color: #ffffff;border-radius: 15upx;" @tap="tiXian">
				<text>充值</text>
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
				XiaoFeiScore:0,
				tgJin: 0,
				StoreID: 0,
				TotalTX: 0,
				timeValue:'',
				yue: '',
				TotalOrdersCount:0,
				SJTotalMoney:0,
				TotalTX:0,
				zdList:[],
				modalName: null,
				current:0,
				conList:[],
				page:1,
				conLists:[],
				SmsCount:0
			}
		},
		async onShow() {
			
		},
		onLoad(router) {
			this.StoreID = router.StoreID
			this.SmsCount = router.SmsCount
			this.page = 1
			this.$http.cxDxjl(this.$store.state.userInfo.ID,this.StoreID,this.page,10).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.conList = res.Data
				} else {
					this.conList = []
				}
			})
			
		},
		methods: {
			tabsChange() {
				this.current = 1;
				this.page = 1
				this.$http.xfDxjl(this.$store.state.userInfo.ID,this.StoreID,this.page,10).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.conLists = res.Data
					} else {
						this.conLists = []
					}
				})
			},
			tabsChanges() {
				this.current = 0;
				this.page = 1
				this.$http.cxDxjl(this.$store.state.userInfo.ID,this.StoreID,this.page,10).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.conList = res.Data
					} else {
						this.conList = []
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			getLocalTimes: function(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				month = month < 10 ? "0" + month : month;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				day = day < 10 ? "0" + day : day;
				seconds = seconds < 10 ? '0' + seconds : seconds
				date = `${year}/${month}/${day} ${hour}:${minutes}`;
				return date;
			},
			getTimes() {
				let day = (new Date()).Format("yyyy-MM")
				return day
			},
			times() {
				var date = new Date();
				date.setDate(date.getDate());
				return date.getFullYear() +"-"+ (date.getMonth()+1)
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			tiXian() {
				uni.navigateTo({
					url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID + '&tgJin=' + this.tgJin
				})
			},
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			this.page += 1
			
			this.$http.cxDxjl(this.$store.state.userInfo.ID,this.StoreID,this.page,10).then(res => {
				if (res.Data.length > 0) {
					this.conList = this.conList.concat(res.Data);
					uni.hideLoading()
				} else {
					this.$api.msg('到底了~',3000)
					uni.hideLoading()
				}
			});
			
			this.$http.xfDxjl(this.$store.state.userInfo.ID,this.StoreID,this.page,10).then(res => {
				console.log(res);
				if (res.Data.length > 0) {
					this.conLists = this.conLists.concat(res.Data)
					uni.hideLoading()
				} else {
					this.$api.msg('到底了~',3000)
					uni.hideLoading()
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f2f2f2 !important
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
	
	.couponss {
		width: 140rpx;
		height: 214rpx;
		background: url(https://img.huaxuapp.com/sjhz_03.png) no-repeat;
		background-position: center;
		background-size: cover;
		position: fixed;
		/* #ifdef H5 */
		bottom: 150rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 20rpx;
		/* #endif */
		right: 10rpx;
	}
	
	.sta {
		background-color: #333333;
		position: absolute;
		left: 1upx;
		top: 44upx;
		width: 110upx;
		height: 5upx;
	}
	
	.stas {
		color: #b1b1b1;
	}
</style>

