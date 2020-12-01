<template>
	<view class="">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 1upx solid #e4e4e4;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">买单收款账户</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">买单收款账户</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="background-color: #FFFFFF;text-align: center;padding-top: 30upx;border-radius:8upx;padding-bottom: 40upx;">
			<view style="margin-top: 20upx;">
				<text style="font-size: 26upx;" @click="showTips">可提现金额</text>
			</view>
			<view style="margin-top: 30upx;">
				<text style="font-size: 64upx;font-weight: 600;" v-if="zkJin"><text style="font-size: 32upx;font-weight: 0;">￥</text>{{changeMoney(zkJin)}}</text>
				<text style="font-size: 64upx;font-weight: 600;" v-else><text style="font-size: 32upx;font-weight: 0;">￥</text>{{changeMoney(zkJin)}}</text>
			</view>
		</view>
			
		<view class="margin flex justify-between">
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;">提现明细</text>
			</view>
			<view class="flex align-center" style="background-color: #ffffff;border-radius: 40upx;width: 180upx;height: 60upx;margin-top: 10upx;" @tap="changeDayss">
				<view style="margin-left: 20upx;">
					<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDayss"  style="color: #333333;">
						<text >
							{{yue}}
						</text>
					</picker>
				</view>
				<text class="cuIcon-triangledownfill" style="font-size: 36upx;margin-left: 6upx;" @change="changeDayss" ></text>
			</view>
		</view>
		
		<view style="background-color: #ffffff;padding-bottom: 0upx;padding-top:50upx;" class="padding" v-if="zdList.length > 0">
			<view class="flex justify-between padding" style="background-color: rgba(255,230,232,0.1);font-size: 26upx;border-radius: 10upx;">
				<text style="color: #333333;">共{{TotalOrdersCount}}笔</text>
				<text style="color: #999999;">提现<text style="color: #333333;font-size: 26upx;">￥<text style="font-size: 28upx;">{{changeMoney(TotalTX)}}</text></text></text>
				<text style="color: #999999;">实到<text style="color: #333333;font-size: 26upx;">￥<text style="font-size: 28upx;">{{changeMoney(SJTotalMoney)}}</text></text></text>
			</view>
		</view>
		
		<view style="background-color: #ffffff;padding-bottom: 260upx;" class="padding" v-if="zdList.length > 0">
			<view class="flex" style="border-bottom: 1upx solid #eeeeee;padding: 28upx 0;" v-for="(item,i) in zdList" :key="i">
				<view v-if="!item.State">
					<text class="hxIcon-tixianjilu" style="font-size: 40upx;color: rgba(254,84,121,0.3);"></text>
				</view>
				<view v-if="item.State" style="">
					<text class="hxIcon-gou" style="font-size: 36upx;color: #fe5479;"></text>
				</view>
				<view style="margin-left: 20upx;">
					<view style="">
						<view style="width: 400upx;">
							<text style="font-size: 26upx;">提现一{{yinHang(item.BankName)}}({{after4(item.BankNo)}})</text>
						</view>
						<view  style="margin-top: 20upx;font-size: 24upx;">
							<text>{{getLocalTimes(item.AddDate)}} </text>
						</view>
					</view>
				</view>
				<view style="text-align: right;position: absolute;right: 30upx;width: 100%;">
					<text style="font-size: 32upx;font-weight: 600;">
						￥{{changeMoney(item.RealScore)}}
					</text>
					<view style="color: #999999;margin-top: 10upx;" v-if="item.State">
						<text style="font-size: 24upx;">到账￥</text><text>{{changeMoney(item.Score)}}</text>
					</view>
					
					<view style="color: #fe5479;margin-top: 10upx;" v-if="!item.State">
						<text style="font-size: 24upx;" v-if="">审核中</text>
					</view>
					
				</view>
			</view>
		</view>
		
		
		<view style="text-align: center;margin-top: 200upx;" v-if="zdList.length == 0">
			<view>
				<text style="font-size: 100upx;color: #666666;" class="hxIcon-tixian-"></text>
			</view>
			<view style="margin-top: 20upx;">
				<text style="font-size: 26upx;color: #999999;">暂无提现记录</text>
			</view>
		</view>
		
		
			
		<view style="background-color: #ffffff;position: fixed;bottom: 0upx;height: 170upx;text-align: center;width: 100%;padding: 45upx 30upx;
		z-index: 9;-moz-box-shadow:0px -3px 9px 0px #e9e9e9;-webkit-box-shadow:0px -3px 9px 0px #e9e9e9;box-shadow:0px -3px 9px 0px #e9e9e9;" v-if="zkJin>=100">
			<view style="text-align: center;line-height: 80upx;width: 690upx;height: 80upx;background-color: #fe5479;
				color: #ffffff;border-radius: 15upx;" @tap="tiXian">
				<text>提现</text>
			</view>
		</view>
		
		<view style="background-color: #ffffff;position: fixed;bottom: 0upx;height: 170upx;text-align: center;width: 100%;padding: 45upx 30upx;
		z-index: 9;-moz-box-shadow:0px -3px 9px 0px #e9e9e9;-webkit-box-shadow:0px -3px 9px 0px #e9e9e9;box-shadow:0px -3px 9px 0px #e9e9e9;" v-if="zkJin<100">
			<view style="text-align: center;line-height: 80upx;width: 690upx;height: 80upx;background-color: rgba(254, 84, 121,0.6);
				color: #ffffff;border-radius: 15upx;"  @tap="tiXiantx">
				<text>可提现金额小于100元，无法提现</text>
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
				zkJin: 0,
				StoreID: 0,
				TotalTX: 0,
				timeValue:'',
				yue: '',
				TotalOrdersCount:0,
				SJTotalMoney:0,
				TotalTX:0,
				zdList:[]
			}
		},
		async onShow() {
			this.yue = this.getTimes()
		},
		onLoad(router) {
			console.log(router);
			this.zkJin = router.zkJin
			this.StoreID = router.StoreID
			this.$http.ziJin(this.$store.state.userInfo.ID,router.StoreID).then(res => {
				console.log(res);
				this.zkJin = res.wxf
			})
			this.yue = this.getTimes()
			this.$http.txMx(this.StoreID,this.yue,1,1,200).then(res => {
				console.log(res);
				this.TotalTX = res.TotalTX
				this.zdList = res.Data
				this.TotalOrdersCount = res.TotalOrdersCount
				this.SJTotalMoney = res.SJTotalMoney
			})
			.catch(err => {
				console.log(err);
			}) 
		},
		methods: {
			tiXiantx(){
				uni.showToast({
					icon:'none',
				    title: '可提现金额小于100元，无法提现',
				    duration: 3000
				});
			},
			yinHang(bankNumber){
				if(bankNumber.length > 6){
					return bankNumber.substr(0,6);
				} else {
					return bankNumber;
				}
			},
			after4(str){//截取银行卡后四位
				let strAry = str.split(' ')
				let newStr = ''
				strAry.forEach((it,i)=>{
					newStr += it
			    })
				let flag = 0
				let str_ = ''
				for(let i = newStr.length-1 ; i >=0 ; i--){
					flag +=1 
					if(flag<5){
			            str_ += newStr[i]
					}else{
			            break
			        }
					
			    }
				return str_.split('').reverse().join('')
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
				date = `${month}/${day} ${hour}:${minutes}`;
				return date;
			},
			changeDayss(e) {
				console.log(e)
				let dt = e.detail.value
				dt = dt.split('-')
				dt = `${dt[0]}-${dt[1]}`
				this.yue = dt
				
				this.$http.txMx(this.StoreID,this.yue,1,1,200).then(res => {
					console.log(res);
					this.TotalTX = res.TotalTX
					this.TotalOrdersCount = res.TotalOrdersCount
					this.SJTotalMoney = res.SJTotalMoney
					this.TotalTX = res.TotalTX
					this.zdList = res.Data
				})
				.catch(err => {
					console.log(err);
				})
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
					url:'/pages/shopManagement/sonPage/witHdraw/zkwitHdraw?StoreID=' + this.StoreID + '&zkJin=' + this.zkJin
				})
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
		},
		onPullDownRefresh() {
			this.yue = this.getTimes()
			this.$http.txMx(this.StoreID,this.yue,1,1,200).then(res => {
				console.log(res);
				this.TotalTX = res.TotalTX
			})
			.catch(err => {
				console.log(err);
			}) 
		},
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

