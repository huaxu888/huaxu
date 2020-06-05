<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-transparent" class="text-white" style="position: fixed; z-index: 9;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">支付详情</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">支付详情</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view style="position: fixed;z-index: 0;background-image: url('https://img.huaxuapp.com/sucess@2x.png'); width: 100%; background-size: contain;background-repeat: no-repeat; height: 420upx;"></view>

		<!-- <view class="cu-modal" :class="showModel?'show':''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog" style="width:65%; height: 750upx;border-radius: 4%;background: transparent;">
				<view class="cu-bar flex flex-direction justify-start" style="background-image: url('https://img.huaxuapp.com/%E8%87%AA%E5%B7%B1%E6%B6%88%E8%B4%B9%E5%A5%96%E5%8A%B1%E7%BA%A2%E5%8C%85_03.png');background-repeat: no-repeat; background-size:contain; background-position: center;width:520upx;height:700upx">
					<view class="text-sl" style="margin-top: 400upx;font-weight: 600; color: #F43F3B;position: relative;">
						{{HBmoney}}元
					</view>
					<view style="font-weight: 600; color: #F43F3B;">消费奖励</view>
					<image @tap="hideCHBModal" src="http://img.huaxuapp.com/%E8%87%AA%E5%B7%B1%E6%B6%88%E8%B4%B9%E5%A5%96%E5%8A%B1%E6%8C%89%E9%92%AE_03.png"
					 mode="scaleToFill " style="width:200upx; height:70upx;margin-top: 60upx; "></image>
				</view>
			</view>
		</view> -->


		<view class="flex align-center justify-center flex-direction" style="width: 100%;position: relative; z-index: 5; top:90upx;">
			<view class="hxIcon-zhifuchenggong text-white margin-top" style="font-size: 110upx;"></view>
			<view class="text-white text-sm margin-top-sm text-xl">{{infor.dealType}}</view>
			<view class="flex align-center flex-direction" style="width: 98%;padding-left: 40upx; padding-right: 40upx;margin-top: 40upx;">

				<view class="flex align-center flex-direction" style="background-color: #FFFFFF; width: 100%; height: 630upx;">
					<view class="text-lg" style="margin-top:75upx ;" v-if="infor.StoreName != null">{{infor.StoreName}}</view>
					<view style="font-size: 60upx;margin-top:50upx ;">&yen;{{infor.money}}</view>
					<view style="width: 99%; border: 1px dashed #DDDDDD;margin-top:50upx;"></view>

					<view class="text-gray margin-top" style="width: 90%;">
						<view class="margin-top-xl text-df " v-if="infor.phoneName != null">收款对象：{{infor.phoneName}}</view>
						<view class="margin-top-xl text-df ">交易方式：{{infor.opeFunction}}</view>
						<view class="margin-top-xl text-df ">交易时间：{{infor.oddDate}}</view>
					</view>
				</view>
				<button class="cu-btn  bg-red shadow margin-top-xl text-xl" style="width: 70%;height: 40px; margin-top:100upx;"
				 @tap="toIndex">返回首页</button>
			</view>
		</view>
		
		
		<view class="cu-modal" :class="showModel ?'show':''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog" style="width:65%; background: transparent;" @tap="toActive">
				<view class="cu-bar flex flex-direction justify-start box " :style="{background:hid?'transparent':''}"   :class="active?'hover':''" style="position: relative; z-index: 0;">
					<view class="cu-bar flex flex-direction justify-start box1 " :class="!active?'hover':''" style="position: absolute;top: 0px;left: 0px;left: 0px;right: 0px;z-index: 999;">
						<view style="margin-top: 270upx;color: #F43F3B;position: relative;font-size: 65upx;">
							{{HBmoney}} <text style="font-size: 20upx;margin-left: 10upx;">元</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		

		<!-- <view class="flex justify-center flex-direction align-center margin-top-xl ">
			<button class="cu-btn bg-white shadow b text-xl" style="width: 70%;height: 40px;">查看订单</button>
			<button class="cu-btn  bg-red shadow margin-top-xl text-xl" style="width: 70%;height: 40px;" @tap="toIndex">返回首页</button>
		</view> -->

		<!-- 
		<view class="flex align-center justify-center flex-direction text-red">
			<view class="hxIcon-zhifuchenggong  margin-top-xl" style="font-size: 140upx;"></view>
			<view class="margin-top text-xxl">{{infor.dealType}}</view>
			<view class="line margin-lr margin-top-xl"></view>
			<view class="flex  flex-direction padding-lr justify-between text-black text-lg" style="width: 100%;">

				<view class="margin-top-xl flex justify-between">
					<text>实付金额：</text><text class="text-red">&yen;{{infor.money}}</text>
				</view>
				<view v-if="infor.phoneName != null" class="margin-top-xl flex justify-between">
					<text>收款对象：</text><text>{{infor.phoneName}}</text>
				</view>
				<view v-if="infor.StoreName != null" class="margin-top-xl flex justify-between">
					<text>支付商家：</text><text>{{infor.StoreName}}</text>
				</view>
				<view class="margin-top-xl flex justify-between">
					<text>支付方式：</text><text>{{infor.opeFunction}}</text>
				</view>
				<view class="margin-top-xl flex justify-between">
					<text>交易时间：</text><text>{{ infor.oddDate }}</text>
				</view>
			</view>
			<view class="line margin-lr margin-top-xl"></view>
		</view>
		<view class="flex justify-center flex-direction align-center margin-top-xl ">
			<button class="cu-btn bg-white shadow b text-xl" style="width: 70%;height: 40px;">查看订单</button>
			<button class="cu-btn  bg-red shadow margin-top-xl text-xl" style="width: 70%;height: 40px;" @tap="toIndex">
                {{ isScan ? '返回首页领取支付红包' : '返回首页' }}
            </button>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				infor: {
					dealType: "", //交易状态
					oddNum: 0, //交易单号
					money: 0, //交易金额
					opeFunction: '', //交易方式 1.余额支付 2.支付宝支付 3.微信支付 4.银行卡
					oddDate: '', //交易时间
					phoneName: null,
					storeName: null,
				},
				isScan: this.$store.state.isScan,
				showModel: false,
				HBmoney: '0.00',
				active: false,
				hid: false
			}
		},
		onShow() {

		},
		onLoad(option) {
			var _self = this;
			this.getLocalTime();
			console.log(option);
			this.infor.dealType = option.dealType
			this.infor.money = this.$api.formatAmount(option.money);

			this.infor.StoreName = option.StoreName;

			switch (option.opeFunction) {
				case '1':
					this.infor.opeFunction = "余额";
					break;
				case '2':
					this.infor.opeFunction = "支付宝";
					break;
				case '3':
					this.infor.opeFunction = "微信";
					break;
				case '4':
					this.infor.opeFunction = "银行卡";
					break;
                case '5':
                    this.infor.opeFunction = '余额、微信混合支付'
                    break
                case '6':
                    this.infor.opeFunction = '余额、支付宝混合支付'
                    break
				default:
					this.infor.opeFunction = option.opeFunction;
					this.infor.phoneName = option.phoneName;
					break;
			}
			setTimeout(() => {
				let money = _self.changeMoney(option.retrunMoney)
				console.log(money);
				if (money > 0) {
					_self.showModel = true;
					_self.HBmoney = money;
					console.log('_self.showModel');
				}
			}, 800)
		},
		methods: {
			toActive() {
				if (this.active == false) {
					this.active = true;
					setTimeout(() => {
						this.hid = true;
					}, 400);
				} else {
					this.showModel = false;
					setTimeout(() => {
						this.hid = false;
						this.active = false;
					}, 1000);
				}
			},
			moveHandle() {
				//阻止默认行为

			},
			hideCHBModal() {
				this.showModel = false;
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			toIndex() {
				uni.switchTab({
					url: '../index/index'
				});
			},
			getLocalTime() {
				var date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours();
				let minutes = date.getMinutes();
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				date = year + '-' + month + '-' + day + " " + hours + ":" + minutes;
				this.infor.oddDate = date;
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.line {
		border-top: 1px solid #CCCCCC;
		width: 90%;
	}

	.b {
		border: 1px solid #999999;
	}

	.box {
		position: relative;
		width: 100%;
		height: 684upx;
		background: url('https://img.huaxuapp.com/xfhb1.png') no-repeat;
		background-size: contain;
		background-position: center;
		/*上面是基础样式，根据需求修改，下面的代码实现3d翻转效果*/
		transform-style: preserve-3d;
		transition: all .8s;
		z-index: ;
	}
	
	.box1 {
		content: '';
		z-index: 999;
		position: absolute;
		width: 100%;
		height: 684upx;
		/*牌背面的图片*/
		background: url('https://img.huaxuapp.com/xfhb3.png') no-repeat;
		background-size: contain;
		background-position: center;
		/*将after伪类折叠到box的背面，作为牌的反面*/
		transform: rotateY(180deg);
	}
	
	.hover {
		transform: rotateY(180deg);
	}
</style>
