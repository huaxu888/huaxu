<template>
	<view class="btn_  text-df " style="z-index: 99;">
		<view class="tui-operation tui-top40">
		  <view class="tui-operation-left tui-col-5">
		    <view class="tui-operation-item"  @tap="backIndex" >
		      	<view style="font-size:44upx;color: #777777;" class="hxIcon-shouye1"  hover-class="tui-opcity" :hover-stay-time="150"></view>
		      <view class=" " style="font-size: 22upx;">首页</view>
		    </view>
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" class="contact tui-operation-item" style="height: 100%;">
					<view style="font-size:44upx;color: #777777;" class="hxIcon-zhinengkefu1" hover-class="tui-opcity" :hover-stay-time="150"></view>
					<view class=" " style="font-size: 22upx;margin-top: 8upx;">客服</view>
			</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<!-- <view class="tui-operation-item"  @tap="toShare" >
			  	<view style="font-size:50upx" class="hxIcon-xinbaniconshangchuan-"  hover-class="tui-opcity" :hover-stay-time="150"></view>
			  <view class=" " style="font-size: 22upx;">分享</view>
			</view> -->
			<!-- #endif -->
		    <view class="tui-operation-item"  @tap="beCollection">
		      	<view style="font-size:44upx;" :class="collectionFlag?'hxIcon-shoucang3-fill shouchang':'hxIcon-shoucang2 shoucs'" hover-class="tui-opcity" :hover-stay-time="150"></view>
		      <view class=" " style="font-size: 22upx;">收藏</view>
		    </view>
		  </view>
		  <view class="flex align-center justify-center " >
				<view class="flex align-center justify-center bg-red padding-lr-sm margin-lr-xs" style="width: 190upx;height: 70upx;border-radius: 300upx;background: linear-gradient(to right, #fdbb00, #fea900);" @tap="gotoreservation">
					 <text>预约订单</text>
				</view>
		  </view>
		 <view class="flex align-center justify-center " >
			 <view @tap="goToShopping" class="flex align-center justify-center bg-blue margin-lr-xs padding-lr-sm"  style="width: 190upx;height: 70upx;border-radius: 300upx;background:  linear-gradient(to right, #fe4e01, #f12400);">
			 	 <text>消费买单</text>
			 </view>
		 </view>
		</view>
		
		<!-- <view style="width: 374upx;border-right: 1upx solid #999999;">
					  <button open-type="contact" class="contact tui-operation-item flex align-center justify-center" style="height: 100%;display: flex;flex-direction: row;">
					  	<view style="font-size:44upx" class="hxIcon-zhinengkefu1" hover-class="tui-opcity" :hover-stay-time="150"></view>
					  	<view class=" " style="font-size: 22upx;margin-left: 20upx;">在线客服</view>
					  </button>
		</view>
		
		<view style="width: 375upx;">
					  <view class="contact tui-operation-item flex align-center justify-center" style="height: 100%;display: flex;flex-direction: row;" @tap="gotoreservation">
						<view style="font-size:44upx;position: relative;" class="hxIcon-yuyue1" hover-class="tui-opcity" :hover-stay-time="150">
							<view style="position: absolute;top: -10upx;left: 20upx; width: 38upx;height: 20upx;background-color: #fe4e01;border-radius: 40upx;font-size: 16upx;">
								<text style="color: #ffffff;">免费</text>
							</view>
						</view>
						<view class=" " style="font-size: 22upx;margin-left: 20upx;position: relative">
							预约到店
						</view>
					  </view>
		</view> -->
	<!-- 	<view @tap="backIndex" class="padding-lr-xs flex justify-center  align-center" style="width:20%">
			<view class="flex justify-center flex-direction align-center" style="width:100%">
				<view style="font- size:50upx" class="cuIcon-home"></view>
				<text style="font-size:24upx">首页</text>
			</view>
		</view>
		

		<view @tap="callService" class="padding-lr-xs flex justify-cent  align-center" style="width:20%">
			<view class="flex justify-center align-center" style="width:100%">

				<text style="font-size:50upx">···</text>
			</view>
		</view>

		<view @tap="beCollection" :style="{color:collectionFlag?'orange':'gray'}" class="padding-lr-xs flex justify-cent  align-center"
		 style="width:20%">
			<view class="flex justify-center align-center" style="width:100%">
				<view :class="collectionFlag?'cuIcon-favorfill':'hxIcon-shoucang'" style="font-size:32upx"></view>
				<text style="font-size:24upx">{{isCollection}}</text>
			</view>
		</view>


		<view class="bg-yellow submit_ padding-tb-sm" style="width:30%;height: 100%;">
			<view style="font-size: 32upx;text-align: center;height: 100%;" class="text-white" @tap="goToShopping">消费买单</view>
		</view> -->


	</view>
</template>

<script>
	export default {
		props: {
			goToPerstoreFlag: {
				type: [Boolean, String],
				default: true
			},
			infoObject: { //商铺的所有信息
				type: Object,
				default: () => {}
			},
			goToprestoreFlag: {
				type: [Boolean, String],
				default: false
			},
			collectionFlag: { //收藏
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			isCollection() {
				if (this.collectionFlag) {
					return '已收藏'
				} else {
					return '收藏'
				}
			}
		},
		methods: {
			async goToShopping() {
				if (this.$store.state.userInfo.ID) {
					// if( this.infoObject.StoreSort == 1 ) {
					// 	///pages/shopDetail/orderFood/newOrderFood?storeId=3180&storeName=花蓄官方旗舰店&needRes=true&isHaveGoods=true&onlyShow=true
					// 	uni.navigateTo({
					// 		url: `/pages/shopDetail/orderFood/newOrderFood?storeId=${this.infoObject.StoreID}&storeName=${this.infoObject.StoreName}&needRes=true&isHaveGoods=true&onlyShow=true&entrance=shop`
					// 	})
					// 	return
					// }
					uni.navigateTo({
						url:`/pages/scan/pay?type=shopDetail&storeid=${this.infoObject.StoreID}&StoreName=${encodeURIComponent(this.infoObject.StoreName)}&LogoPic=${encodeURIComponent(this.infoObject.LogoPic)}`
					})
				} else {
					this.$api.msg('请先登录');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/common/login'
						})
					}, 1500);
				}
				// if (this.$store.state.hasLogin) {
				// 	let ID = this.userInfo_.ID
				// 	if(ID===5684 || ID===3773 || ID===1240 || ID===4952 || ID===5024 || ID===5825){
				// 		uni.navigateTo({
				// 			url:`/pages/scan/pay?type=shopDetail&storeid=${this.infoObject.StoreID}&StoreName=${encodeURIComponent(this.infoObject.StoreName)}&LogoPic=${encodeURIComponent(this.infoObject.LogoPic)}`
				// 		})
				// 	}else{
				// 		let [scanErr,res] = await uni.scanCode({
				// 			onlyFromCamera: false,
				// 			scanType: ['qrCode'],
				// 		})
				// 		if(res){
				// 			if (res.result.indexOf('https') != -1) {
				// 				if (res.result.indexOf('ewmid') == -1) {
				// 					//说明没有二维码id
				// 					// 新版本手机扫描处理
				// 					let t = decodeURIComponent(res.result)
				// 					let arr = t.split('?')
				// 					let params = arr[1].split('&')
				// 					let storeid = params[0].split('=')[1]
				// 					let userid = params[1].split('=')[1]
				// 					if (userid == '0') {
				// 						// 店铺收款码
				// 						try{
				// 							let resolve = await this.$Request.get(this.$store.state.getStore,{
				// 								storeid: storeid
				// 							})
				// 							if(resolve.IsSuccess){
				// 								let d = resolve.Data
				// 								uni.navigateTo({
				// 									url: `/pages/scan/pay?type=scan&StoreID=${d.StoreID}&StoreName=${d.StoreName}&LogoPic=${d.LogoPic}`
				// 								})
				// 							}else{
				// 								this.$api.msg('二维码失效')
				// 							}
				// 						}catch(e){
				// 							//TODO handle the exception
				// 							this.$api.msg('扫码失败，请稍后再试')
				// 						}
				// 					} else {
				// 						console.log('营业员');
				// 						// 营业员收款码
				// 						uni.navigateTo({
				// 							url: `/pages/scan/pay?StoreID=${storeid}&yyyid=${userid}`
				// 						})
				// 					}
				// 				} else {
				// 					var ewmid = res.result.substring(res.result.indexOf('ewmid=') + 6, res.result.length);
				// 					this.$http.getStoreByEWM(ewmid).then(res => {
				// 						uni.navigateTo({
				// 							url: `/pages/scan/pay?StoreID=` + res.Data.StoreID + `&yyyid=` + res.Data.yyyid
				// 						})
				// 					});
				// 				}
				// 			} else {
				// 				// 旧版本二维码扫描处理
				// 				console.log('旧版本')
				// 				var myArry = res.result.split(",");
				// 				if (myArry.length == 1) {
				// 					//只传加密字符串
				// 					this.scanPay(myArry[0]);
				// 				} else {
				// 					//传入前缀，加密字符串
				// 					var ctype = myArry[0];
				// 					if (ctype == "store") {
				// 						this.scanPay(ctype, myArry);
				// 					}
				// 					if (ctype == "yyy") {
				// 						this.scanPay(ctype, myArry);
				// 					}
				// 				}
				// 			}
				// 		}else{
				// 			this.$api.msg('扫码失败')
				// 		}
				// 	}
				// } else {
				// 	//没登录，返回
				// 	uni.showToast({
				// 		title: '没有登录',
				// 		icon: 'none',
				// 	})
				// 	setTimeout(() => {
				// 		uni.navigateTo({
				// 			url: `/pages/common/login`
				// 		})
				// 	}, 2000);
				// }
			},
			async scanPay(ctype, myArry) {
				//判断二维码是否是我们需要的二维码需要做修改
				let data = {
					userid: this.userInfo_.ID,
					content: myArry ? myArry[1] : ctype
				}
				let res = await this.$Request.get(this.$store.state.getSys, data)
				if (res) {
					console.log('是我需要的二维码')
					let Store = null;
					Store = res.Data.Store;
					console.log(Store);
					this.LogoPic = Store.LogoPic;
					this.StoreName = Store.StoreName;
					this.StoreID = Store.StoreID;
					if (Store != null) {
						uni.navigateTo({
							url: '/pages/scan/pay?type=scan' + '&StoreID=' + this.StoreID + '&StoreName=' + this.StoreName +
								'&LogoPic=' + this.LogoPic
						})
					}
				} else {
					uni.showToast({
						title: '扫码失败',
						icon: 'none',
					})
				}
			},
			gotoReservation: function (event) {
				this.$emit('gotoReservation', event)
			},
			gotoreservation() {
				uni.navigateTo({
					url:`/pages/shopDetail/reservation?storeid=${this.infoObject.StoreID}`
				})
			},
			beCollection() {
				this.$emit('beCollection', this.collectionFlag)
			},
			callService() {
				// uni.makePhoneCall({
				// 	phoneNumber:'400-6688-352'
				// })
				// this.$emit('share')
			},
			toShare() {
				// uni.makePhoneCall({
				// 	phoneNumber:'400-6688-352'
				// })
				this.$emit('share')
			},
			backIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.btn_ {
		position: fixed;
		bottom: 0upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.contact {
		padding: 0;
		margin: 0 30upx;
		background: transparent;
		border: none;
		line-height: 1;
		color: #333;
	}
	
	.contact::after {
		background: transparent;
		border: none;
	}

	.submit_ {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.shouchang{
		color: #fe4e01;
	}
	
	.tui-top40 {
	  margin-top: 40upx;
	}
	
	
	.tui-operation {
		width: 100%;
		height: 130upx;
		padding-bottom: 8upx;
		box-sizing: border-box;
		overflow: hidden;
		background: #FFFFFF;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0px;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	
	.tui-opcity {
		opacity: 0.5;
	}
	
	.tui-col-5 {
		width: 41.66666667%;
	}
	
	.tui-operation-left {
		display: flex;
		align-items: center;
	}
	
	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}
	
	.tui-operation-right {
		height: 100rpx;
		box-sizing: border-box;
		padding-top: 0;
	}
	
	.shoucs {
		color: #777777;
	}
</style>
