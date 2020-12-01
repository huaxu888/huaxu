<template>
	<view class="btn_  text-df " style="z-index: 99;">
		<view class="tui-operation tui-top40">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item"  @tap="backIndex" >
					<view style="font-size:44upx" class="hxIcon-shouye1" hover-class="tui-opcity" :hover-stay-time="150">
					</view>
					<view class=" " style="font-size: 22upx;">首页</view>
				</view>
				<view class="tui-operation-item"  @tap="gotoZh" >
					<view style="font-size:44upx"  class="hxIcon-zjaq" :class="Inx==1?'xuanzhong':''"  hover-class="tui-opcity" :hover-stay-time="150">
					</view>
					<view class=" " style="font-size: 22upx;" :class="Inx==1?'xuanzhong':''">账户</view>
				</view>
				<view class="tui-operation-item"  @tap="toShare" >
					<view style="font-size:160upx;opacity: 0;" class="hxIcon-xinbaniconshangchuan-"  hover-class="tui-opcity" :hover-stay-time="150"></view>
					<view class=" " style="font-size: 22upx;position: absolute;left: 32upx;top: 95upx;">扫码核销</view>
				</view>
				<view class="tui-operation-item"  @tap="gotoDan" >
					<view style="font-size:44upx" class="hxIcon-dingdan1" :class="Inxs==1?'xuanzhong':''" hover-class="tui-opcity" :hover-stay-time="150"></view>
					<view class=" " style="font-size: 22upx;" :class="Inxs==1?'xuanzhong':''">订单</view>
				</view>
				<view class="tui-operation-item"  @tap="beCollection">
					<view style="font-size:44upx" :class="collectionFlag?'hxIcon-wode- shouchang':'hxIcon-wode-'" hover-class="tui-opcity" :hover-stay-time="150"></view>
					<view class=" " style="font-size: 22upx;">我的</view>
				</view>
			</view>
		</view>
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
			},
			
		},
		data() {
			return {
				Inx:0,
				Inxs:1
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
			gotoZh(){
				this.Inx = 1
				this.Inxs = 2
				uni.navigateTo({
					url:'/pages/shopManagement/shopManagmentPage?StoreID=' + this.StoreID + 'IsLock=' + this.IsLock + 'isShopowner' + this.isShopowner
				})
			},
			gotoDan(){
				this.Inxs = 1
				this.Inx = 2
				uni.navigateTo({
					url:'/pages/shopManagement/orderShop/shopOrder'
				})
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
				uni.switchTab({
					url:'/pages/index/person'
				})
			},
			callService() {
				// uni.makePhoneCall({
				// 	phoneNumber:'400-6688-352'
				// })
				// this.$emit('share')
			},
			toShare() {
				uni.redirectTo({
					url:'/pages/shopManagement/orderShop/scanQrcode'
				})
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
		background-image: url(https://img.huaxuapp.com/pink1012.png);
		background-repeat: no-repeat;
		background-size:750upx 220upx ;
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 220upx;
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
		height: 188upx;
		box-sizing: border-box;
		overflow: hidden;
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
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	
	.tui-opcity {
		opacity: 0.5;
	}
	
	.tui-col-5 {
		width: 100%;
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
	
	.xuanzhong {
		color: #fe5479;
	}
</style>
