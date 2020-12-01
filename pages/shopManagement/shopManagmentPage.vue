<template>
	<view>
		<view v-if="!showLoading"  style="padding-bottom: 150upx;">

			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-creamsss" class="text-black" :isBack="false" style="position: absolute;top: 0;">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content"><text class="text-bold" style="line-height: 1em;color: #333333;" v-if="showTitle">{{StoreName}}</text> </block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content"><text class="text-bold" style="line-height: 1em;color: #333333;"  v-if="showTitle">{{StoreName}}</text></block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			
			<view class="flex justify-center flex-direction" style="background-image: url(https://img.huaxuapp.com/dpgl474_01.png);background-size: cover;
			background-repeat: no-repeat;width: 750upx;height: 474upx;">
				<view class="padding-lr padding-bottom-sm padding-top-xs flex align-center justify-between" style="margin-top: 30upx;">
					<view class="flex align-center justify-center" style="">
						<view class="flex align-center justify-center" style="position: relative;">
							<image :src="LogoPic || 'https://img.huaxuapp.com/huaxulogo.jpg'" mode="scaleToFill" class="touxiang"  @tap="personRouter('/pages/shopManagement/sonPage/addShopInfo/addShopInfoPage?StoreID='+StoreID)"></image>
							<view style="position: absolute;bottom: -20upx; width: 70upx;height: 40upx;border-radius: 50upx;background-color: #252b41;border: 1upx solid #ffead7;text-align: center;"  @tap="personRouter('/pages/shopManagement/sonPage/addShopInfo/addShopInfoPage?StoreID='+StoreID)">
								<text style="color: #ffd7d7;font-size: 22upx;">编辑</text>
							</view>
						</view>
						<view class="margin-left">
							<view class="flex align-center text-bold" @tap="switchAndAdd">
								<view style="font-size: 38upx;color: #333333; max-width: 370upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
									{{StoreName}}
									<!-- <text class="cu-tag round sm bg-red margin-left-xs" v-if="storeObj.StoreSort == 1">电商</text> -->
								</view>
								<view style="margin-left: 10upx;color: #333333;font-size: 28upx;">
									<text class="text-bold hxIcon-rightArrow" style=""></text>
								</view>
							</view>
							
							<view class="flex align-center" @tap="switchAndAdd" style="margin-top: 10upx;">
								<text style="font-size: 24upx;color: #666666;">营业时间：{{StartWorkDate}}-{{EndWorkDate}}</text>
							</view>
							
							<!-- <view class="flex justify-center align-center" style="position: absolute;right: 30upx;">
								<view>
									<text style="font-size: 24upx;margin-right: 14upx;">预览</text>
								</view>
								<view>
									<text class="hxIcon-rightArrow" style="font-size: 28upx;"></text>
								</view>
							</view> -->
						</view>
						<view class="" style="text-align: center;margin-left: 20upx;position: absolute;right: 40upx;" @tap="personRouter('/pages/shopManagement/sonPage/gongMaBand?StoreID=' + StoreID + '&SqSort=' + SqSort)">
							<view class="hxIcon-erweima3" style="font-size: 56upx;"></view>
							<view style="font-size: 22upx;">公码绑定</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 营收概览 -->
			<view style="position: absolute;top: 350upx;width: 690upx;">
				<image src="https://img.huaxuapp.com/6901011_03.png" mode="aspectFit" style="width: 692upx;height: 104upx;margin: 0 30upx;"  @tap="personRouter('/pages/shopManagement/sonPage/vipGuan?StoreID=' + StoreID)"></image>
				<view class=" margin-lr  margin-tb-sm-big padding-lr-sm padding-tb-xs  flex align-center justify-between revenue-block" style="position: absolute;top: 102upx;width: 690upx;padding-top: 10upx;padding-bottom: 20upx;margin-top: 0;">
					
					<view class="flex align-center justify-between padding-tb-xs revenue-block-lefts" >
						<view class="flex align-center justify-center flex-direction" style="width: 25%;" @tap="personRouter('/pages/shopManagement/sonPage/acCount?StoreID=' + StoreID + '&SqSort=' + SqSort)">
							<image src="https://img.huaxuapp.com/pink1012tub-03.png" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
							<text class="revenue-block-leftTitle" style="margin-top: 16upx;">商户结算</text>
						</view>
						<view class="flex align-center justify-center flex-direction" style="width: 25%;" @tap="personRouter('/pages/shopManagement/sonPage/receivablesCodePage?StoreID=' + StoreID)">
							<image src="https://img.huaxuapp.com/pink1012tub-04.png" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
							<text class="revenue-block-leftTitle" style="margin-top: 16upx;">收款码</text>
						</view>
						<view class="flex align-center justify-center flex-direction" style="width: 25%;" @tap="personRouter('/pages/shopManagement/sonPage/shujuFenxi/shuJu?StoreID=' + StoreID)">
							<image src="https://img.huaxuapp.com/pink1012tub-05.png" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
							<text class="revenue-block-leftTitle" style="margin-top: 16upx;">经营分析</text>
						</view>
						<view class="flex align-center justify-center flex-direction" style="width: 25%;" @tap="personRouter('/pages/shopManagement/sonPage/bindingCashier/bindingCashierPage?StoreID=' + StoreID + '&SqSort=' + SqSort)">
							<image src="https://img.huaxuapp.com/pink1012tub-06.png" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
							<text class="revenue-block-leftTitle" style="margin-top: 16upx;">员工管理</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 今日数据 -->
			<view class="margin-lr margin-tb-sm-big padding bg-white" style="margin-top: 180upx;padding-bottom:0upx;border-radius: 15upx;padding-top: 30upx;">
				<view class="flex justify-between" @tap="personRouter('/pages/shopManagement/sonPage/shuShou?StoreID=' + StoreID)">
					<text class="heading ">今日收款</text>
					<text style="font-size: 24upx;color: #999999;">查看更多<text class="hxIcon-rightArrow" style="font-size: 24upx;margin-left: 8upx;"></text></text>
				</view>
				<view class="padding-lr-sm padding-tb-xs  flex align-center justify-between revenue-block">
					<view class="flex align-center justify-between padding-tb-xs revenue-block-lefts">
						<view class="flex align-center justify-center flex-direction" @tap="personRouter('/pages/shopManagement/sonPage/zkShou?StoreID=' + StoreID)">
							<text class="revenue-block-leftAmount" style="color: #202020;">{{rounding(jrxf)}}</text>
							<text class="revenue-block-leftTitle">买单收款(元)</text>
						</view>
						<view class="flex align-center justify-center flex-direction" @tap="personRouter('/pages/shopManagement/sonPage/zfShou?StoreID=' + StoreID)">
							<text class="revenue-block-leftAmount" style="color: #202020;">{{rounding(jryhqxf)}}</text>
							<text class="revenue-block-leftTitle">自发券收款(元)</text>
						</view>
						<view class="flex align-center justify-center flex-direction" @tap="personRouter('/pages/shopManagement/sonPage/tgShou?StoreID=' + StoreID)">
							<text class="revenue-block-leftAmount" style="color: #202020;">{{rounding(tgxf)}}</text>
							<text class="revenue-block-leftTitle">团购收款(元)</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 门店管理 -->
			<view class="margin-lr margin-tb-sm-big padding bg-white" style="border-radius: 20upx;" v-if="state == 2">
				<view class="heading">
					营销推广
				</view>
				<view class="margin-top flex align-center justify-between">
					<view class="flex align-center justify-center flex-direction padding-bottom-sm Shop-Manager-block" @tap="personRouter('/pages/shopManagement/sonPage/msgAllSend/dxGuanli?StoreID='+StoreID)">
						<view style="margin: 11upx; width: 100upx; height: 100upx;background: url(https://img.huaxuapp.com/dxyxtb_03.png) ;background-size: 100% 100%;background-repeat: no-repeat;">
					
						</view>
						<text class=" Shop-Manager-Title">短信营销</text>
						<text class="Shop-Manager-GrayTitle">商家营销好利器</text>
						<view class="flex align-center justify-center margin-top-xs Shop-Manager-button">
							<text class="button-text">去发布</text>
						</view>
					</view>
					<view class="flex align-center justify-center flex-direction padding-bottom-sm  Shop-Manager-block " @tap="personRouter('/pages/shopManagement/shopCou?StoreID='+StoreID)">
						<view style="margin: 11rpx; width: 100rpx; height: 100rpx; background: url(https://img.huaxuapp.com/qmlq.png);background-size: cover">
						</view>
						<text class=" Shop-Manager-Title">自发券</text>
						<text class="Shop-Manager-GrayTitle">消费满额立减</text>
						<view class="flex align-center justify-center margin-top-xs Shop-Manager-button">
							<text class="button-text">去发券</text>
						</view>
					</view>
					<view class="flex align-center justify-center flex-direction padding-bottom-sm Shop-Manager-block" @tap="personRouter('/pages/shopManagement/shopManage?StoreID='+StoreID)">
						<view style="margin:11upx;  width: 100upx; height: 100upx; background: url(https://img.huaxuapp.com/mdgl_05.jpg);background-size: 100% 100%;">
						</view>
						<text class=" Shop-Manager-Title">商品管理</text>
						<text class="Shop-Manager-GrayTitle">展示店铺热卖品</text>
						<view class="flex align-center justify-center margin-top-xs Shop-Manager-button">
							<text class="button-text">去添加</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<!-- <view  @tap="personRouter('/pages/shopManagement/sonPage/orderManager?storeid=' + StoreID + '&sort=' + storeObj.StoreSort)">
			<view class="couponss shake text_center" style="font-size:32upx;color: #ffffff;">订单</view>
		</view> -->
		
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		<view >
			<phone-buttom :StoreID="StoreID" :IsLock="IsLock" :isShopowner="routObj.isShopowner" :Inx="Inx" style="z-index: 99;">
			</phone-buttom>
		</view>
	</view>
</template>

<script>
	import phoneButtom from './components/poWers'
	export default {
		data() {
			return {
				marketingTools: [
					{
						title: '常用功能',
						list: [
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_03.jpg',
								title: '收款码',
								navigate: '/pages/shopManagement/sonPage/receivablesCodePage', //StoreID StoreName LogoPic StoreAddress
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_05.jpg',
								title: '亲密用户',
								navigate: '/pages/shopManagement/sonPage/myMember', //StoreID
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_18.png',
								title: '公码绑定',
								navigate: '/pages/shopManagement/sonPage/gongMaBand',  // StoreID
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_16.jpg',
								title: '结算明细',
								navigate: '-1',
								size:74
							},			
						]
					}
				],
				showLoading: true,
				isTx: false,
				infoObj: {},
				getData: {
					userid: this.$store.state.userInfo.ID
				},
				StoreID: '',
				StoreName: '',
				LogoPic: '',
				routObj: {},
				storeObj: {},
				IsLock: '',
				state: 1, //1是收银员，2店长
				switchB: false,
				jrxf: 0, //今日营业额
				jrdd: 0, //今日订单数
				xfze: 0 ,//消费总额
				showTitle:false ,//是否展示标题
				StartWorkDate:'',
				EndWorkDate:'',
				money:'',
				StoreLevel:'',
				wxf: 0,
				SqSort: 0,
				jryhqxf:0,
				tgxf:0,
				Inx:1
			}
		},
		onLoad(routObj) {
			this.StoreID = routObj.StoreID;
			this.IsLock = routObj.IsLock
			this.routObj = routObj;
			
			// this.getCurryInfo();
			if (this.routObj.isShopowner == 'true') {
					this.state = 2
			}
			this.$store.commit('changeYyyState', this.state);
			
		},
		onShow() {
			if (this.StoreID != '' && this.StoreID != undefined && this.$store.state.userInfo.ID) {
				this.getCurryInfo()
			} else {
				this.$api.msg('数据异常，请重新登录');
				setTimeout(() => {
					uni.switchTab({ //跳去首页
						url: '/pages/index/person'
					})
				}, 1000);
			}
			
		},
		methods: {
			tishi() {
				this.$api.msg('功能即将上线，敬请期待')
			},
			switchAndAdd(){
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetailPage?StoreID=' + this.StoreID
				})
			},
			tiaozhuan(e) {
				uni.navigateTo({
					url:'/pages/shopManagement/sonPage/orderManager?storeid=' + this.StoreID + '&sort='+ e,
					success() {
						console.log("1")
					}
				})
			},
			rounding(amount) {
				return amount.toFixed(2);
			},
			getUpx (px) {
				return uni.upx2px(px) + 'px'
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
			},
			tx: function(res) {
				this.isTx = !this.isTx
			},
			getCurryInfo() {
				// let self = this;
				// return self.$Request.get(self.$store.state.mystoreUrl, {
				// 	userid: self.$store.state.userInfo.ID,
				// 	storeid: self.StoreID
				// }, false).then(res => {
				// 	if (res.IsSuccess) {
				// 		self.infoObj = res
				// 		self.showLoading = false;
				// 		self.jrxf = res.Jrxf; //今日营业额
				// 		self.jrdd = res.jrdd; //今日订单数
				// 		self.xfze = res.xfze; //消费总额
				// 		self.StoreID = res.Store.StoreID;
				// 		self.storeObj = res.Store;
				// 		self.StoreName = self.storeObj.StoreName;
				// 		this.StartWorkDate = self.storeObj.StartWorkDate;
				// 		this.EndWorkDate = self.storeObj.EndWorkDate;
				// 		self.LogoPic = self.storeObj.LogoPic;
				// 		this.StoreLevel = res.Store.StoreLevel;
				// 		this.wxf = res.Wxf
				// 		this.SqSort = res.SqSort
				// 	} else if (!res.IsSuccess) {
				// 		self.$api.msg(res.Msg, 2000)
				// 		uni.switchTab({ //跳去首页
				// 			url: '/pages/index/person'
				// 		})
				// 	}
				// 	return
				// })
				let self = this;
				return self.$Request.get(this.$store.state.myShop, {
					userid: self.$store.state.userInfo.ID,
					storeid: self.StoreID
				}, false).then(res => {
					if (res.IsSuccess) {
						console.log(res);
						self.infoObj = res
						self.showLoading = false;
						self.jrxf = res.Jrxf; //今日营业额
						self.jrdd = res.jrdd; //今日订单数
						self.xfze = res.xfze; //消费总额
						self.StoreID = res.Store.StoreID;
						self.storeObj = res.Store;
						self.StoreName = self.storeObj.StoreName;
						this.StartWorkDate = self.storeObj.StartWorkDate;
						this.EndWorkDate = self.storeObj.EndWorkDate;
						self.LogoPic = self.storeObj.LogoPic;
						this.StoreLevel = res.Store.StoreLevel;
						this.wxf = res.Wxf
						this.SqSort = res.SqSort
						this.jryhqxf = res.jryhqxf
						this.tgxf = res.tgxf
					} else if (!res.IsSuccess) {
						self.$api.msg(res.Msg, 2000)
						uni.switchTab({ //跳去首页
							url: '/pages/index/person'
						})
					}
					return
				})
			},
			personRouter(url,title) {
				let blacklist = [
					'/pages/shopManagement/sonPage/balanceWithdrawal',
					// '/pages/shopManagement/sonPage/bindingCashier/bindingCashierPage',
					'/pages/shopManagement/sonPage/gongMaBand',
				]
				
				for (let i = 0; i < blacklist.length; i++) {
					if (url.includes(blacklist[i])) {
						if (this.SqSort == 1) {
							uni.showModal({
								title: '权限不足',
								content: '您没有相关权限，请联系相关人员进行操作',
								showCancel: false
							})
							return
							break
						}
					}
				}
				
				if (url === '-1') {
					this.$api.msg('功能即将上线，敬请期待')
					return;
				}

				if (url === 'scan') {
					uni.scanCode({
						onlyFromCamera: true,
						success: (res) => {
							let result = JSON.parse(res.result)
							if (Object.keys(result).length != 0) {
								this.$http.verifyOrder(result.StoreID, 0, result.ddid, result.ddno, result.isspecial ? 1 : 0)
									.then(res => {
										if (res.IsSuccess) {
											uni.showModal({
												title: '核销成功',
												content: '订单核销完成',
												showCancel: false
											})
										} else {
											uni.showModal({
												title: '核销失败',
												content: '请确认订单是否有效',
												showCancel: false
											})
										}
									})
									.catch(err => {
										uni.showModal({
											title: '核销失败',
											content: '请确认订单是否有效',
											showCancel: false
										})
										console.log(err);
									})
							} else {
								uni.showModal({
									title: '核销失败',
									content: '请确认二维码是否正确',
									showCancel: false
								})
							}
						}
					})
				}

				if (url === 'msgAllSendOne') {
					setTimeout(() => {
						this.$api.showModal({
							title: '提示',
							content: '群发信息将会扣除您的信息费用，单条费用：0.1元/条',
							confirmText: '取消',
							confirmColor: "#333333",
							cancelColor: '#fe4e01',
							cancelText: '确定',
							showCancel: true
						}).then(res => {
							if (!res) {
								uni.navigateTo({
									url: '/pages/shopManagement/sonPage/msgAllSend/msgAllSendOne?StoreID='+this.storeObj.StoreID
								})
							}
						});
					})
					return
				}
				
				if(title){
					url = url + '?StoreID='+this.storeObj.StoreID + '&SqSort=' + this.SqSort;
					
					switch (title){
						case '收款码':
								url = url + '&StoreName='+this.storeObj.StoreName+'&LogoPic='+this.LogoPic+'&StoreAddress='+this.storeObj.StoreAddress
							break;
						case '营收概览':
								// url = url + '&billType=zhangdan'
							break;
						default:
							break;
					}
				}
				
				uni.navigateTo({
					url: url
				})
			},
			back() {
				uni.navigateBack({})
			},
			goToOtherPage(route, text) {
				var StoreID = this.StoreID
				var sqZZThree = '/pages/shopManagement/sonPage/jionrunscores/jionrunscoresOnepage'
				var StoreName = this.infoObj.Store.StoreName
				var LogoPic = this.infoObj.Store.LogoPic
				var myStoreID = this.getData.storeid
				var faRenId = this.infoObj.Store.UserID
				var IsBank = this.infoObj.IsBank
				if (route === sqZZThree && this.infoObj.Store.IsZZ) {
					uni.navigateTo({
						url: `/pages/shopManagement/sonPage/jionrunscores/jionrunscoresThreePage?StoreID=${StoreID}&StoreName=${StoreName}`
					})
					return
				}

				var goToRoute =
					`${route}?StoreID=${StoreID}&StoreName=${StoreName}&myStoreID=${myStoreID}&faRenId=${faRenId}&IsBank=${IsBank}`

				if (route === '/pages/shopManagement/sonPage/receivablesCodePage') {
					goToRoute = `${goToRoute}&LogoPic=${LogoPic}`
				}

				if (route === '/pages/shopManagement/sonPage/msgAllSend/msgAllSendOne') {
					this.$api.showModal({
						title: '您确定要群发信息吗？',
						content: '群发信息将会扣除您的信息费用，单条费用：0.1元/条'
					}).then(res => {
						if (res) {
							uni.navigateTo({
								url: goToRoute,
							})
							return
						} else {
							this.$api.msg('取消群发', 2000)
							return
						}
					})
				} else {
					if (route === '') {
						this.$api.msg('该页面还没写出来，莫慌', 1500)
						return
					} else {
						if (route === '/pages/shopManagement/sonPage/balanceWithdrawal') {
							if (text === '预存提现') {
								goToRoute = `${goToRoute}&type=yucunTX&YcKtxNum=${this.infoObj.YcKtxNum}`
							} else {
								let FanHuanBL = 1
								if (this.infoObj.Store.FanHuanBL != null) {
									FanHuanBL = this.infoObj.Store.FanHuanBL * 1
								}
								goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${FanHuanBL}`
								// if(this.infoObj.Wxf <= 0){
								// 	this.$api.msg('您当前没有可提现金额',2000)
								// 	return 
								// }else{
								// 	goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${this.infoObj.Store.FanHuanBL}`
								// }
							}
						}
						if (route === '/pages/shopManagement/sonPage/receivablesCodePage') {
							let StoreAddress = this.infoObj.Store.StoreAddress
							goToRoute = `${goToRoute}&StoreAddress=${StoreAddress}`
							// if(this.IsLock === 'true'){
							// 	this.$api.msg('您的店铺已被锁定',2000)
							// 	return 
							// }
						}
						if (route === '/pages/shopManagement/sonPage/bindingCashier/bindingCashierPage') {
							// if(this.IsLock === 'true'){
							// 	this.$api.msg('您的店铺已被锁定',2000)
							// 	return  
							// }	
						}
						uni.navigateTo({
							url: goToRoute
						})
					}
				}
			},
			goToBillDetail() {
				if (this.yyyState === 2) {
					var StoreID = this.StoreID
					//var StoreName=this.infoObj.Store.StoreName
					let url = `/pages/shopManagement/sonPage/billDetails?StoreID=${StoreID}&billType=zhangdan `
					uni.navigateTo({
						url
					})
				} else {
					//this.$api.msg('您当前没有权限')
				}
			},
			goToBalanceWithdrawal(type) {
				if (this.yyyState === 2) {
					// #ifndef  APP-PLUS || MP-ALIPAY
					// this.isTx = true
					// return false
					// #endif
					let StoreID = this.StoreID
					let StoreName = this.infoObj.Store.StoreName
					let myStoreID = this.getData.storeid
					let route = `/pages/shopManagement/sonPage/balanceWithdrawal`
					let goToRoute = `${route}?StoreID=${StoreID}&StoreName=${StoreName}&myStoreID=${myStoreID}`
					if (type != 'yc') {
						goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${this.infoObj.Store.FanHuanBL}`
						// if(this.infoObj.Wxf <= 0){
						// 	this.$api.msg('您当前没有可提现金额',2000)
						// 	return 
						// }else{
						// 	goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${this.infoObj.Store.FanHuanBL}`
						// }
					} else {
						goToRoute = `${goToRoute}&type=yucunTX&YcKtxNum=${this.infoObj.YcKtxNum}`
						// if(this.infoObj.YcKtxNum <= 0){
						// 	this.$api.msg('您当前没有可提现金额',2000)
						// 	return 
						// }else{
						// 	goToRoute = `${goToRoute}&type=yucunTX&YcKtxNum=${this.infoObj.YcKtxNum}`
						// }
					}

					uni.navigateTo({
						url: goToRoute
					})
				} else {
					//this.$api.msg('您当前没有权限')
				}
			}
		},
		onPageScroll(e) {
			this.money = '';
			if(e.scrollTop >=80){
				this.showTitle = true;
			}else{
				this.showTitle = false;
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.getCurryInfo().then(res => {
				uni.stopPullDownRefresh()
			})
		},
		components: {
			phoneButtom,
		}
	}
</script>

<style>
	page {
		background: #f2f2f2 !important;
	}
</style>

<style scoped>
	page {
		background: #f2f2f2 !important;
	}
	.touxiang {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	
	.couponss {
		line-height: 120upx;
		background-color: #f9745a;
		width: 120upx;
		height: 120upx;
		border-radius: 100upx;
		-moz-box-shadow:0px 0px 5px #f9745a; 
		-webkit-box-shadow:0px 0px 5px #f9745a; 
		box-shadow:0px 0px 5px #f9745a;
		position: fixed;
		/* #ifdef H5 */
		bottom: 150rpx;
		/* #endif */
		/* #ifndef H5 */
		bottom: 140rpx;
		/* #endif */
		right: 60upx;
	}

	.heading {
		font-size: 30upx;
		font-weight: 700;
		color: #333333;
	}


	.revenue-block {
		border-radius: 0 0 20upx 20upx;
		background: #FFFFFF;
		margin-bottom: 20upx;
	}

	.revenue-block .revenue-block-left {
		width: 75%;
		min-height: 110upx;
	}

	.revenue-block .revenue-block-lefts {
		width: 100%;
		min-height: 150upx;
	}
	
	.revenue-block .revenue-block-left .revenue-block-leftAmount {
		font-size: 36upx;
		font-weight: bold;
		color: #333333;
		white-space: nowrap;
		margin-top: 10upx;
	}
	.revenue-block .revenue-block-lefts .revenue-block-leftAmount {
		font-size: 36upx;
		font-weight: bold;
		color: #333333;
		white-space: nowrap;
		margin-top: 10upx;
	}
	.revenue-block .revenue-block-left .revenue-block-leftTitle {
		font-size: 24upx;
		color: #444444;
		margin-top: 10upx;
	}

	.revenue-block .revenue-block-lefts .revenue-block-leftTitle {
		font-size: 24upx;
		color: #444444;
		margin-top: 10upx;
	}

	.Shop-Manager-block {
		border: 0.8px solid #ffd7d7;
		border-radius: 10upx;
		width: 202upx;
	}



	.Shop-Manager-block .Shop-Manager-Title {
		color: #fe5479;
		font-size: 28upx;
	}



	.Shop-Manager-block .Shop-Manager-GrayTitle {
		font-size: 24upx;
		color: #333333;
	}


	.Shop-Manager-block .Shop-Manager-button {
		border: 0.5px solid #fe5479;
		width: 118upx;
		height: 40upx;
		background: #ffe6e8;
		border-radius: 100upx;
	}

	.Shop-Manager-block .Shop-Manager-button .button-text {
		color: #fe5479;
		font-size: 24upx;
		line-height: 1em;
	}


	.icontoRight {
		display: inline-block;
		transform: rotate(180deg);
		font-size: 24upx;
	}

	.tui-scorll-view {
		flex: 1;
		line-height: 1;
		white-space: nowrap;
		overflow: hidden;
		color: #FFFFFF;
		width: 350upx;
	}


	.tui-notice {
		transform: translateX(100%);
	}

	.tui-animation {
		-webkit-animation: tui-rolling 6s linear infinite;
		animation: tui-rolling 6s linear infinite;
	}


	@-webkit-keyframes tui-rolling {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-170%);
		}
	}

	@keyframes tui-rolling {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-170%);
		}
	}

	.shopManag_ment {
		background-image: url('https://img.huaxuapp.com/sjbg_02.png');
		background-repeat: no-repeat;
		background-size: cover;
		border: 0.1px solid white;
	}

	.shopM_icon_list {
		background: white;
		flex-wrap: wrap;
	}

	.shopM_icon_item {
		width: 25%;
		height: 180upx;
	}

	.br_border {
		border-right: 2upx solid #DDDDDD;
		border-bottom: 2upx solid #DDDDDD;
	}

	.b_border {
		border-bottom: 2upx solid #DDDDDD;
	}

	.text_center {
		text-align: center;
		font-size: 23upx;
		color: rgb(225, 225, 225, 0.9);
	}

	.red_box_item {
		width: 47%;
		height: 100%;
		background: #F75A64;
		border-radius: 10upx;
	}

	.shop_log {
		background-repeat: no-repeat;
		background-size: cover;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
</style>
