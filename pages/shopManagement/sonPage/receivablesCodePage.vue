<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">店铺收款码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">店铺收款码</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->


		<!-- :style="[{height:  'calc(100vh - '+CustomBar+'px)'}]" -->
		<view class="flex align-center justify-center margin-top" style="padding-top: 20upx;">
			<view class="flex align-center justify-center topCard">
				<view class="cardImg"></view>

			</view>
		</view>

		<view class="flex align-center justify-center flex-direction"  style="margin-top: 0upx;">
			<text class="text-bold margin-top-xl storeName" >{{StoreName}}</text>
			<view class="flex align-center justify-center margin-top-xl ewmBorder" >
				<tki-qrcode ref="qrcode" :val="val" :size="qrcode.size" :unit="qrcode.unit" :pdground="qrcode.pdground" @result="qrR" />
			</view>
			<text class="text-bold margin-top-lg text-xxxl text-darkBlack text-title-scan">在此扫码付款</text>
			<view class="margin-top dashedLine"></view>

			<view class="flex align-center justify-center margin-top-lg">
				<view class="callPhone"></view>
				<text class="margin-lr-sm text-lg text-darkBlack">400-6688-352</text>
				<view class="iconlist"></view>
			</view>
		</view>


		<!-- 		<view class="flex align-center justify-center"  style="background: url('https://img.huaxuapp.com/hxshouqianm.png') no-repeat; background-size: cover;" >
			<view style="margin-top: 240upx;">
					<tki-qrcode  ref="qrcode" :val="val" :size="qrcode.size" :unit="qrcode.unit"  :pdground="qrcode.pdground" @result="qrR" />
			</view>
		</view> -->

		<!-- 	<view class="padding-lr bg-white" style="padding-top:45upx;padding-bottom: 45upx;">
			<view class="flex align-center" style="border-radius: 10upx;">
				<view class="shop_log" :style="{backgroundImage: 'url(' + logPic + ')', border: '5upx solid #e54d42'}">
				</view>
				
				<view class="margin-left">
					<view class="text-xl text-bold text-wx-blue">
						{{StoreName}}
					</view>
					 
					<view class="margin-top-sm">
						{{StoreAddress}}
					</view>
				</view>			
			</view>
			
			<view style="margin-top:45upx; margin-bottom: 45upx;">
				<view class="justify-center flex align-center" style="width: 100%;">
					<view style="border:20upx solid #F2F2F2;height: 500upx;width: 500upx;" class="justify-center flex align-center">
						<view>
							<tki-qrcode  ref="qrcode" :val="val" :size="qrcode.size" :unit="qrcode.unit"  :pdground="qrcode.pdground" @result="qrR" />
						</view>
					</view>
				</view>
			</view> -->




	</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				logPic: '',
				EwmImageUrl: '',
				getData: {
					storeid: ''
				},
				StoreName: '',
				val: '', //二维码的值
				qrcode: { //二维码插件配置
					unit: 'upx',
					size: 490,
					pdground: '#EE4B47'
				},
				StoreAddress: ''
			}
		},
		onLoad(route) {

			this.getData.storeid = route.StoreID
			this.StoreName = route.StoreName
			this.logPic = route.LogoPic
			this.StoreAddress = route.StoreAddress
			this.getCurryInfo()
		},
		methods: {
			getCurryInfo() {
				this.$Request.get(this.$store.state.storeskewmUrl, this.getData).then(res => {
					if (res.IsSuccess) {
						console.log(res);
						this.val = res.Data // 赋值
					}
				})
			},
			qrR(e) {
				console.log(e)
			},
			back() {
				uni.navigateBack()
			}
		},
		onUnload() {},
		onHide() {}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
	
	.text-darkBlack{
		color: #333333;
	}
	.text-title-scan{
		letter-spacing:16upx;
	}
	.topCard {
		width: 668upx; 
		height: 254upx;
		border-radius: 25upx;
		background: #ffd7d7; 
		box-shadow:2px 2px 3px -2px #333333;
	}
	
	.dashedLine{
		width: 490upx ;
		height: 2upx;
		border-top: 1px  dashed  #CCCCCC;
	}
	
	.topCard .cardImg{
		height: 136upx;
		 width: 246upx;
		 background: url('https://img.huaxuapp.com/sqm1011_03.png') no-repeat;
		  background-size: 100% 100%;
	}
	
	.ewmBorder{
		width: 550upx;
		height: 550upx;
		border: 2upx solid #ffd7d7;
		border-radius: 10upx;
	}
	
	.storeName{
		font-size: 40upx;
		 color: #586994;
	}

	.callPhone {
		height: 36upx;
		width: 36upx;
		background: url('https://img.huaxuapp.com/rexiandianhua_10.png') no-repeat;
		background-size: 100% 100%;
	}

	.topSanjiao {
		position: absolute;
		top: -50upx
	}

	.diandiandian {
		height: 12upx;
		width: 12upx;
		background: #556890;
		border-radius: 50%;
	}

	.text-wx-blue {
		color: #556890;
	}

	.text-wx-gray {
		color: rgb(180, 180, 180)
	}

	.shoukuanBg {
		background: #F2F2F2;
	}

	.receivables_code {
		border-radius: 10upx;
		background-image: url('https://img.huaxuapp.com/BGROUND.png');
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}

	.shop_log {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 120upx;
		height: 120upx;
		border-radius: 20upx;
	}


	.iconlist {
		height: 55upx;
		width: 206upx;
		background: url('https://img.huaxuapp.com/rexiandianhua_07.png') no-repeat;
		background-size: 100% 100%;
	}

	.rece_code {
		background-image: url('https://img.huaxuapp.com/fangkuang.png');
		width: 502upx;
		height: 524upx;
		background-repeat: no-repeat;
		background-size: contain;
	}
</style>
