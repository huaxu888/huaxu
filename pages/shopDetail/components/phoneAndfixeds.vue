<template>
	<view class="btn_  text-df " style="z-index: 99;">
		<view class="tui-operation tui-top40" style="">
		  <view class="tui-operation-left tui-col-5" style="width: 350upx;">
		    <view class="tui-operation-item" style="" @tap="backIndex" >
		      	<view style="font-size:44upx;color: #777777;" class="hxIcon-shouye1"  hover-class="tui-opcity" :hover-stay-time="150"></view>
				<view class=" " style="font-size: 22upx;">首页</view>
		    </view>
			
			<view class="tui-operation-item"  @tap="backIndexs" >
			  	<view style="font-size:44upx;color: #777777;" class="hxIcon-dianpu2"  hover-class="tui-opcity" :hover-stay-time="150"></view>
				<view class=" " style="font-size: 22upx;">店铺</view>
			</view>
			
			<button open-type="contact" class="contact tui-operation-item" style="height: 100%;">
				<view style="font-size:44upx;color: #777777;" class="hxIcon-zhinengkefu1" hover-class="tui-opcity" :hover-stay-time="150"></view>
				<view class=" " style="font-size: 22upx;margin-top: 8upx;">客服</view>
			</button>
			
		    <view class="tui-operation-item"  @tap="beCollection">
		      	<view style="font-size:44upx;" :class="!collectionFlags?'hxIcon-shoucang3-fill shouchang':'hxIcon-shoucang2 shoucs'" hover-class="tui-opcity" :hover-stay-time="150"></view>
				<view class=" " style="font-size: 22upx;">收藏</view>
		    </view>
		  </view>
		  
		 <view class="flex align-center justify-center " >
			  <form>
			 <view formType="submit" data-target="Image" @tap="showModals"  class="flex align-center justify-center bg-blue margin-lr-xs padding-lr-sm"  style="width: 380upx;height: 80upx;border-radius: 300upx;background:  linear-gradient(to right, #fe4e01, #f12400);">
			 	 <text>立即抢购</text>
			 </view>
			  </form>
			  
			  <view class="cu-modal" style="width: 750upx;" :class="modalName=='Image'?'show':''">
			  	<view class="cu-dialogs" style="width: 521upx;border-radius: 20upx;height: 641upx;">
			  		<view class="bg-img" style="background-image: url('https://img.huaxuapp.com/gmbkk_03.png');height:641upx;width: 521upx;background-repeat: no-repeat;
			  			background-size: cover;">
			  			<view class="cu-bar justify-end text-white">
			  				<view class="action" @tap="hideModal">
			  					
			  				</view>
			  			</view>
			  		</view>
			  		<view @tap="goToShopping" style="position: absolute;bottom: 60upx;left: 30upx; border-radius: 50upx; width: 460upx;height: 70upx;color: #FFFFFF; background-color: #fe4e01;text-align: center;line-height: 70upx;">
			  			<text>同意并购买</text>
			  		</view>
			  	</view>
			  	<view class="cu-bar action margin-0 flex-sub  solid-left" style="position: absolute;bottom: 190upx;left: 320upx;z-index: 2;">
			  		<view class="" @tap="hideModal">
			  			<text class="cuIcon-roundclosefill" style="font-size: 80upx;color: #ffffff;"></text>
			  		</view>
			  	</view>
			  </view>
		 </view>
		 
		
		</view>
		
		
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
			collectionFlags: { //收藏
				type: [Boolean, String],
				default: false
			},
			tcId:{
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				modalName: null,
			}
		},
		computed: {
			isCollection() {
				if (this.collectionFlags) {
					return '已收藏'
				} else {
					return '收藏'
				}
			}
		},
		methods: {
			showModals(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			async goToShopping() {
				if (this.$store.state.userInfo.ID) {
					// if( this.infoObject.StoreSort == 1 ) {
					// 	///pages/shopDetail/orderFood/newOrderFood?storeId=3180&storeName=花蓄官方旗舰店&needRes=true&isHaveGoods=true&onlyShow=true
					// 	uni.navigateTo({
					// 		url: `/pages/shopDetail/orderFood/newOrderFood?storeId=${this.infoObject.StoreID}&storeName=${this.infoObject.StoreName}&needRes=true&isHaveGoods=true&onlyShow=true&entrance=shop`
					// 	})
					// 	return
					// }
					// uni.redirectTo({
					// 	url:`/pages/shopDetail/newOrder?tcId=${this.tcId}&type=shopDetail&storeid=${this.infoObject.StoreID}&StoreName=${encodeURIComponent(this.infoObject.StoreName)}&LogoPic=${encodeURIComponent(this.infoObject.LogoPic)}`
					// })
					uni.redirectTo({
						url:`/pages/shopDetail/newOrder?tcId=${this.tcId}&storeid=${this.infoObject.StoreID}`
					})
					this.modalName = null
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
				this.$emit('beCollection', !this.collectionFlags)
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
			},
			backIndexs(){
				uni.redirectTo({
					url:'/pages/shopDetail/shopDetailPage?StoreID=' + this.infoObject.StoreID
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
		justify-content: space-between;
	}
	
	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		position: relative;
	}
	
	.tui-operation-right {
		height: 100rpx;
		box-sizing: border-box;
		padding-top: 0;
	}
	
	.cu-dialogs{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		border-radius: 10upx;
		overflow: hidden;
	}
	
	.shoucs {
		color: #777777;
	}
</style>
