<template>
	<view class="" style="background: #FFFFFF;">
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>我的转赠</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>我的转赠</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view v-if="objList.length > 0" v-for="(item,index) in objList" :key="index" class="reservation-list-page margin" style="margin-top: 30upx;border-radius: 15upx;-moz-box-shadow:0px 0px 4px 0px #E4E4E4;-webkit-box-shadow:0px 0px 4px 0px #E4E4E4;box-shadow:0px 0px 4px 0px #E4E4E4;">
			<view class="reservation-list-item">
				<view class="reservation-cotent" style="padding-bottom: 30upx;">
					<view class="content-title flex align-center" style="position: relative;border-bottom: 1.5upx solid #e4e4e4;">
						<view class="content-title-name flex align-center" style="padding-bottom: 14upx;padding-top: 10upx;">
							<view class="content-title-name flex align-center" style="">
								<view class="content-name-text flex align-center justify-center" style="font-size: 26upx;">
									<text>转赠时间：{{beTime(item.buy.RefundSubmitDate)}}</text>
								</view>
							</view>
							<view class="state-text state-text-success" style="position: absolute;right: 0upx;top: 34upx;color: #fe4e01;">
								<text class="">转赠成功</text>
							</view>
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 10upx;">
						<view style="">
							<image :src="item.buy.Logo" mode="scaleToFill" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;">
							<view style="font-size: 28upx;color: #333333;" class="shengLv">
								<text>{{item.buy.Title}}</text>
							</view>
							
							<view class="flex justify-between">
								<view style="color: #fe4e01;margin-top: 30upx;">
									<text style="color: #333333;">总额：</text>
									<text style="font-size: 30upx;">￥</text>
									<text style="font-size: 30upx;font-weight: 600;">{{item.buy.TotalPrice}}</text>
								</view>
								<view style="margin-top: 30upx;color: #666666;">
									<text>数量：</text>
									<text>{{item.buy.Num}}</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;">
						<view class="flex justify-end align-center">
							<image :src="item.newuserpoto" mode="" style="width: 50upx;height: 50upx;border-radius: 50upx;"></image>
							<view style="margin-left: 20upx;">
								<text>接收人：{{item.newusername}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-divider v-if="objList.length > 0" color="#999999" half-width="120" border-color="#777777" margin-top="50">我是有底线的~</u-divider>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;" v-if="objList.length == 0">
			<image src="https://img.huaxuapp.com/5cad402bbc803_03.png" mode="aspectFill" style="width: 200upx;height: 200upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">没有转赠商品~</text>
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
export default {
	components:{
		
	},
	data() {
		return {
			currentPage:1,
			objList:[]
		};
	},
	onLoad(option) {
		this.$http.giveOrderList(this.$store.state.userInfo.ID,1,10).then(res => {
			console.log(res);
			if(res.IsSuccess){
				this.objList = res.Data
			} else {
				this.objList = []
			}
		})
	},
	onShow() {
		
	},
	methods: {
		goGon(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		}
	},
	onReachBottom() {
		uni.showLoading({
			title: '加载中',
		});
		this.currentPage += 1
		this.$http.giveOrderList(this.$store.state.userInfo.ID,this.currentPage,10).then(res => {
			if (res.length > 0) {
				this.objList = this.objList.concat(res);
				console.log(this.objList);
			} else {
				this.$api.msg('已经到最底啦~')
			}
			uni.hideLoading()
		})
	},
	onPullDownRefresh() {
		this.currentPage = 1
		this.$http.giveOrderList(this.$store.state.userInfo.ID,1,10).then(res => {
			if(res.IsSuccess){
				this.objList = res.Data
			} else {
				this.objList = []
			}
		})
	}
};
</script>

<style scoped lang="scss">
	.cu-btn {
		background: #ffffff;
		margin: 15upx;
		border: 1px solid #f0f0f0;
		border-radius: 5upx;
	}
	$base-color: #f8d1a3;  //基准背景色
	
	.order-managment-page {
		.order-list {
			margin-top: 90upx;
		}
		
		.order-item {
			&:last-child {
				margin-bottom: 30upx;
			}
		}
		
		.order-date {
			color: #999999;
			padding: 30upx;
			
			.hxIcon-rili {
				color: #f5ccc3;
			}
		}
		
		.tab-active {
			color: #fe4e01;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 86upx;
				height: 6upx;
				left: 50%;
				transform: translateX(-50%);
				width: 40upx;
				background-color: #fe4e01;
			}
		}
		
		.order-item-buyer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 10upx;
			border-bottom: 2upx solid rgba($color: #000000, $alpha: .1);
		}
		
		.state-text {
			color: #fe4e01;
		}
		
		.text-black {
			color: #666666;
		}
		
		.order-img {
			width: 70upx;
			height: 70upx;
			min-width: 70upx;
			min-height: 70upx;
			border-radius: 100upx;
			margin-right: 20upx;
		}
		
		.order-info {
			padding: 30upx;
			position: relative;
		}
		
		.pay-icon {
			position: absolute;
			top: -50px;
			right: 30px;
			transform: scale(5);
			color: #aaa;
		}
		
		.order-btns {
			display: flex;
			flex-direction: row;
			
			.btn {
				border-radius: 100upx;
				border: 1px solid #333;
				margin-left: 20upx;
				padding: 5upx 20upx;
				color: #FFFFFF;
			}
			
			.cancle-btn {
				@extend .btn;
				border: 1px solid #f04921;
				background-color: #f04921;
			}
			
			.ship-btn {
				@extend .btn;
				border: 1px solid #ffdc9d;
				background-color: #ffdc9d;
			}
		}
	}
</style>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	$reservation-red: #fe4e01;
	$reservation-pink: #fae6e1;
	$content-title-img-size: 64upx;

	.reservation-list-page {

		.icon-calendar {
			color: lighten($reservation-red, 30);
			font-size: 40upx;
			margin-right: 20upx;
		}

		.reservation-cotent {
			background: #FFFFFF;
			border-radius: 10upx;
			// box-shadow: 0 0 14upx rgba($color: #000000, $alpha: .1);

			.content-title {
				margin: 0 30upx;
				padding: 20upx 0;
				display: flex;
				justify-content: space-between;
				border-bottom: 1.4upx solid  solid rgb(228, 228, 228);

				.content-name-text {
					color: #666666;
					font-size: 28upx;
				}

				.content-name-img {
					width: $content-title-img-size;
					height: $content-title-img-size;
					border-radius: 8upx;
					background-position: center;
					background-size: cover;
					margin-right: 20upx;
				}

				.state-text-success {
					color: $reservation-red;
				}

				.state-text {
					font-size: 26upx;
				}
			}

			.content-content {
				padding: 30upx;
				
				.bottom-content{
					height: 54upx;
				}
				
				.phone-text {
					color: $reservation-red;
				}
			}

			.reservation-info {
				width: 48%;
			}

			.reservation-btn {
				border-radius: 1000upx;
				// padding: 10upx 25upx;
				width: 150upx;
				height: 54upx;
				font-size: 26upx;
			}

			.cancle {
				color: $reservation-red;
				background: $reservation-pink;
			}

			.toPay {
				color: #FFFFFF;
				background: #f3982d;
			}
		}
	}
	.shengLv{
		color: #333333;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>