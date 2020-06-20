<template>
	<view :class="showAnm?'animate':''" style="position: relative;">
		<view class="shop_detail " v-if="!showLoading">

			<!-- #ifdef MP-WEIXIN -->
			<view class="text-lg back_btn flex justify-center align-center" @tap="back">
				<text class="cuIcon-back text-white" style="font-size: 45upx;"></text>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="scrollTop < 600" class="animate flex align-center justify-center flex-direction fenxiang">
				<button open-type="share" class="no-btn">
					<text class="hxIcon-xinbanshangchuan-"  style="color: #FFFFFF; font-size: 44upx;line-height: 1.3em;"></text>
				</button>
			</view>
			
			<view v-if="scrollTop > 600" class="animate flex align-center justify-center flex-direction fenxiangs">
				<button open-type="share" class="no-btn">
					<text class="hxIcon-xinbanshangchuan-"  style="color: #FFFFFF; font-size: 44upx;line-height: 1.3em;"></text>
				</button>
			</view>
			<!-- #endif -->


			<view  v-if="scrollTop > 600" @tap="backtop" class="flex align-center justify-center flex-direction huiqu">
				<text class="cuIcon-top"  style="color: #FFFFFF; font-size: 44upx;line-height: 1.3em;"></text>
			</view>

			<!--<cu-custom bgColor="bg-gradual-red" :isBack="true">
				<block slot="left">返回</block>
				<block slot="content">{{infoObject.StoreName}}</block>
			</cu-custom>-->
			<view class="swiper_">
				<shop-swiper :swiperList="swiperList" @share="share"></shop-swiper>
			</view>

			<!-- style="position: relative;top:-380upx" -->
			<view>
				<!-- bottom: -210upx; -->
				<view class="title_ padding bg-white" style="position: relative;bottom:00upx;">

					<view class="flex align-start" style="margin-bottom: 26upx;">
						<view class="shop_img margin-right" style="position: relative;">
							<image :lazy-load="lazyLoad" class="logo_img" :src="infoObject.LogoPic===''?'https://img.huaxuapp.com/pig.png':infoObject.LogoPic"
							 mode="aspectFill"></image>
							 <image src="https://img.huaxuapp.com/200-200.png" mode="aspectFit" v-if="infoObject.IsSY"
								style="position: absolute;width: 200rpx;height: 200rpx;top: 0;left: 0;"></image>
						</view>
						<view style="line-height:40upx;">
							<view class="shop_name text-lg text-bold text-cut">{{infoObject.StoreName}}</view>

							<view class="star_">
								<text class="hxIcon-tubiaozhizuomoban start-red" style="font-size: 28upx;" v-for="(item,i) in infoObject.StoreStart"
								 :key="i"></text>
								<!-- <text class="cuIcon-favorfill text-red marghin-right-sm" v-for="(item,i) in infoObject.StoreStart" :key="i"></text> -->
							</view>

							<view class="mianji_ text-sm" v-if="infoObject.MianJi">
								<text class="cuIcon-shopfill marghin-right-sm"></text>商铺面积：{{infoObject.MianJi}}m²
							</view>

							<view class="phone_nums text-sm">
								<text class="cuIcon-phone marghin-right-sm"></text>{{infoObject.Phone}}
							</view>

							<view class="cuIcon-attention text-sm marghin-right-sm">
								<text class="text-sm">{{infoObject.ReadCount}}人看过</text>
							</view>

						</view>
					</view>
					
					<!-- 花蓄超市入口 -->
					<view v-if="showRecharge">
						<view v-if="getData.StoreID != 3180">
							<image src="https://img.huaxuapp.com/ptyhcz_03.gif" class="imgs" @tap="toRecharge"></image>
						</view>
						<view v-else>
							<image src="https://img.huaxuapp.com/hxgfcz_03.gif" class="imgs" @tap="toRecharge"></image>
						</view>
					</view>

					<view class="map_ margin-top  flex justify-between align-center">

						<view class="text-df map_info flex" @tap="openMap">
							<text class="cuIcon-locationfill marghin-right-sm"></text>
							<view class="margin-right-sx">
								{{infoObject.StoreAddress}}
								<text style="font-size:20upx;" class="margin-left-xs">(点击打开地图导航)</text>
							</view>
						</view>

						<view style="width:10%;" class="flex justify-center align-center">
							<view style="border-left:1px gray solid; width:2upx;height:2em">

							</view>
						</view>

						<view style="width:10%" class="justify-center " @tap="callShop">
							<text class="text-red hxIcon-dianhua1" style="font-size:50upx;"></text>
						</view>
					</view>
				</view>

				<view style="position: relative;bottom:0upx;" class="padding-lr">
					<view class="margin-top padding-top padding-lr bg-white" style="border-radius:25upx 25upx 0px 0px">
						<view class="text-xl text-bold" style="width:50%;margin:auto;text-align: center;">-商铺介绍-</view>
					</view>
					<view style="width: 100%;height:60upx;" class="bg-white flex kg_">
						<view class="hr_"></view>
					</view>
					<view style="overflow: hidden;width: 100%;border-radius:0upx 0upx 25upx 25upx; padding-bottom: 130rpx;" class="flex justify-center padding-bottom-xs">
						<view class="bg-white" style="width: 100%;">
							<rich-text :nodes="htmlNodes"></rich-text>
						</view>
					</view>
				</view>


				<view>
					<phone-buttom :infoObject="infoObject" :goToPerstoreFlag="goToPerstoreFlag" :goToprestoreFlag="goToprestoreFlag"
					 @beCollection="beCollectionHandle" :collectionFlag="collectionFlag" @share="share" @gotoReservation="gotoReservation">
					</phone-buttom>
				</view>
			</view>
		</view>
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>




		<uni-popup ref="popup" type="bottom">
			<view style="min-height: 300upx;">
				<view class="flex justify-center">
					<text>更多选项</text>
				</view>
				<view class="flex">
					<view class="flex align-center flex-direction" @tap="callService">
						<view class="cuIcon-service text-green" style="font-size:60upx">
						</view>
						<text class="text-sm">客服电话</text>
					</view>

					<view class="flex align-center margin-left flex-direction" @tap="share">
						<view class="hxIcon-dianpushoukuanma" style="font-size:60upx;color: #FDCB51;">
						</view>
						<text class="text-sm">店铺二维码</text>
					</view>

					<!-- #ifdef MP-WEIXIN -->
					<button open-type="contact" class="contact margin-left">
						<view class="cuIcon-profile text-red" style="font-size:60upx">
						</view>
						<text class="text-sm">在线客服</text>
					</button>
					<!-- #endif -->
				</view>
			</view>
		</uni-popup>

		<view v-if="showModal">

			<hai-bao :showModal="showModal" :infoObj="infoObject" @hidden="hiddenModal" :imgUrl="imgUrl" @success="success"
			 @shareWx="shareWx" @downLoadImage="downLoadImage"></hai-bao>

		</view>
	</view>
</template>

<script>
	import wmPoster from "@/components/wm-poster/wm-poster.vue"
	import haiBao from './components/haibao.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		getPageAllInfo as shopDetailMixins
	} from '../../mixins/qymMixins.js'
	import phoneButtom from './components/phoneAndfixed'
	import shopSwiper from './components/shopDetSwper'
	import htmlParser from '@/common/html-parser'
	import ShopCart from '@/common/ShopCart.js'
	let userScData = {}
	export default {
		mixins: [shopDetailMixins],
		data() {
			return {
				showAnm: false,
				showModal: false,
				infoUrl: this.$store.state.shopDetailUrl,
				getData: {
					StoreID: 0,
					userId: this.$store.state.userInfo.ID
				},
				infoObject: {},
				goToPerstoreFlag: true,
				swiperList: [], //轮播图的照片
				goToprestoreFlag: true,
				collectionFlag: false, //是否收藏
				showLoading: true, //控制加载中的flag
				htmlNodes: [],
				lazyLoad: true,
				imgUrl: 'https://img.huaxuapp.com/moneypig666.gif',
				userInfo: {},
				canvasUrl: '',
				shareBtnType: "",
				defaultDiscount: 1,
				storeInfo: '',
				scrollTop: 0,
				showRecharge: getApp().globalData.showRechargePage
			}
		},
		onPageScroll: function(Object) {

			this.scrollTop = Object.scrollTop;
		},
		onLoad(option) {
			this.getRouterInfo(option).then(res => {
				console.log(res);
				// console.log(res.Data)
				if (res.IsSuccess) {
					if (res.Data.State === 2) {
						this.goToprestoreFlag = false
					}
				} else if (!res.IsSuccess) {
					this.goToPerstoreFlag = false

				}
				return
			}).then(res => {
				this.getShopDetailInfo(option)
				return
			}).then(res => {
				let UserID = this.$store.state.userInfo.ID
				if (UserID) {
					userScData = {
						StoreID: this.getData.StoreID,
						UserID
					}
				} else {
					userScData = {
						StoreID: this.getData.StoreID,
						UserID: 0
					}
				}

				return this.$Request.get(this.$store.state.isGetscUrl, userScData, false) //查看当前用户是否收藏了当前店铺
			}).then(res => {
				if (res.IsSuccess) {
					this.collectionFlag = res.IsSuccess

				} else {
					this.collectionFlag = false
				}
			})
			this.$http.getDefaultDiscount()
				.then(res => {
					console.log(res);
					if (res.IsSuccess) {
						this.defaultDiscount = res.Data
					} else {
						this.defaultDiscount = 1
					}
				})
				.catch(err => {
					this.defaultDiscount = 1
				})
		},
		onPullDownRefresh() {
			this.refresGetInfo(false, true).then(res => {
				this.swiperList = res.StorePics.split(',')
				// this.swiperList.unshift(res.StorePic)
				var richtext = this.infoObject.StoreContent //取出富文本字符串
				const regex = new RegExp('<img', 'gi'); //找到找对img标签
				richtext = richtext.replace(regex, `<img style="max-width: 100%;"`) //正则替换
				this.infoObject.StoreContent = richtext //重新赋值
				this.htmlNodes = htmlParser(this.infoObject.StoreContent);
				/*uni.setNavigationBarTitle({//修改标题
					title:infoObject.StoreName
				})*/
			})
		},
		methods: {
			back() {
				uni.navigateBack({})
			},
			backtop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			async downLoadImage() {
				this.showAnm = true
				let [err, res] = await uni.downloadFile({
					url: this.imgUrl,
				})
				if (err) {
					this.$api.msg('下载失败，请稍后再试', 2000)
				} else {
					let filePath = res.tempFilePath
					console.log(filePath)
					uni.saveImageToPhotosAlbum({
						filePath: filePath,
						success: (res) => {
							console.log(res);
							uni.showToast({
								title: '图片保存成功',
								icon: 'none'
							})
						},
						fail: (err) => {
							console.log(err);
							uni.showToast({
								title: '图片保存失败',
								icon: 'none'
							})
						},
						complete: (e) => {
							setTimeout(() => {
								this.showAnm = false
							}, 1500)
						}
					})
				}
			},
			shareWx(type) {
				this.shareBtnType = type

				// #ifdef APP-PLUS
				console.log(12456)
				// #endif
				// #ifdef MP-WEIXIN
				console.log(3349)
				// #endif

			},
			async share() {
				this.$refs.popup.close()
				if (this.$store.state.hasLogin) {
					let success = true
					let data = {
						stroreid: this.getData.StoreID * 1,
						userid: this.userInfo_.ID * 1
					}

					let res = await this.$Request.get(this.$store.state.getHbUrl, data)
					if (res.status === 500) {
						this.$api.msg('生成二维码失败，请稍后再试')
						return
					} else {
						if (res.IsSuccess) {
							this.imgUrl = res.Data
							this.showModal = true
						} else {
							this.$api.msg(res.Msg)
						}
					}
				} else {
					uni.navigateTo({
						url: '/pages/common/login'
					})
				}
			},
			hiddenModal() {
				this.showModal = false
			},
			callService() {
				uni.makePhoneCall({
					phoneNumber: '400-6688-352'
				})
			},
			beCollectionHandle(flag) {
				if (this.$store.state.hasLogin) {
					if (flag) { //已经收藏
						this.$Request.get(this.$store.state.qxScUrl, userScData, false).then(res => {
							if (res.IsSuccess) {
								this.collectionFlag = false //取消收藏
								this.$api.msg('取消收藏', 1000, false, 'success')
							}
							return res
						})
					} else { //没有收藏
						this.$Request.get(this.$store.state.scUrl, userScData, false).then(res => {
							if (res.IsSuccess) {
								this.collectionFlag = true //收藏
								this.$api.msg('收藏成功', 1000, false, 'success')
							}
							return res
						})
					}
				} else {
					this.$api.msg('请先登录', 1500)
				}
			},
			getRouterInfo(router) {
				var data = {}
				if ('StoreID' in router) {
					data.storeid = router.StoreID
				} else if ('storeid' in router) {
					data.storeid = router.storeid
				}
				if ('tjrid' in router) {
					this.$store.commit('setTjrid', router.tjrid)
					console.log(this.$store.state.tjrid, '推荐人ID');
				}
				return this.$Request.get(this.$store.state.wyzzUrl, data, false)
			},
			getShopDetailInfo(option) {
				this.getData.StoreID = option.StoreID
				this.getCurrentPageInfo(false, true).then(res => {
					// this.getEwm()
					this.storeInfo = res;
					this.swiperList = res.StorePics.split(',')
					// this.swiperList.unshift(res.StorePic)
					var richtext = this.infoObject.StoreContent //取出富文本字符串
					const regex = new RegExp('<img', 'gi'); //找到找对img标签
					richtext = richtext.replace(regex, `<img style="max-width: 100%;"`) //正则替换
					this.infoObject.StoreContent = richtext //重新赋值
					this.htmlNodes = htmlParser(this.infoObject.StoreContent);
					this.showLoading = false
				})
			},
			callShop() {
				this.$refs.popup.close()
				uni.makePhoneCall({
					phoneNumber: this.infoObject.Phone
				})
			},
			openMap() {
				this.$api.openMap(this.infoObject)
			},
			toRecharge: function () {
				uni.navigateTo({
					url: '/pages/person/newRecharge?storeId=' + this.storeInfo.StoreID
				})
			},
			gotoReservation() {
				if (this.$store.state.userInfo.ID) {
					// uni.navigateTo({
					// 	url: '/pages/shopDetail/preOrderPage?storeId=' + this.storeInfo.StoreID + '&storeName=' + this.storeInfo.StoreName
					// })
					uni.navigateTo({
						url: '/pages/shopDetail/orderFood/newOrderFood?storeId=' + this.storeInfo.StoreID +'&storeName='+this.storeInfo.StoreName +'&needRes=true&isHaveGoods=true&type=pay'
					})
				} else {
					this.$api.msg('请先登录');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/common/login'
						})
					}, 1500);
				}
			}
			// async getEwm(){
			// 	if (this.$store.state.hasLogin === true) {
			// 		this.userInfo = this.$store.state.userInfo;
			// 	} else {
			// 		this.userInfo.ID=0
			// 	}
			// 	console.log(this.infoObject.StoreID)
			// 	let data = {
			// 		storeid:this.infoObject.StoreID,
			// 		pid: this.userInfo.ID,
			// 		path:'pages/shopDetail/shopDetailPage'
			// 	}
			// 	console.log('first')
			// 	let Data = await this.$Request.get(this.$store.state.getewm,data,false)
			// 	
			// 	 this.imgUrl = Data.Data
			// 	 console.log(this.imgUrl) 
			// 	 // this.showCanvas=true
			// },
		},
		onShareAppMessage(e) {
			this.showAnm = true
			let title = this.infoObject.StoreName
			let imageUrl = this.infoObject.LogoPic
			let path =
				`/pages/shopDetail/shopDetailPage?StoreID=${this.infoObject.StoreID}&tjrid=${this.$store.state.userInfo.ID || 0}`
			return {
				title,
				imageUrl,
				path,
				success: () => {
					setTimeout(() => {
						this.showAnm = false
					}, 1500)
				}
			}
		},
		components: {
			shopSwiper,
			phoneButtom,
			uniPopup,
			wmPoster,
			haiBao
		}
	}
</script>



<style>
	.shop_detail {
		background: #F8F8F8;
	}

	p {
		background: white !important;
	}

	.start-red {
		color: #f34e2d;
	}


	.logo_img {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}

	.title_ {
		width: 93%;
		margin: auto;
		border-radius: 25upx;
		margin-top: 20upx
	}

	.map_info {
		width: 90%;
	}

	.kg_ {
		align-items: center;
		justify-content: center;
	}

	.hr_ {
		width: 50%;
		height: 2upx;
		border-bottom: 1px solid gray;
	}

	.shop_name {
		white-space: initial;
	}

	.xx {
		position: absolute;
	}

	.xx:before {}

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

	.back_btn {
		width: 80upx;
		height: 80upx;
		background: rgba(36, 36, 36, 0.7);
		border-radius: 50%;
		position: absolute;
		top: 60upx;
		left: 40upx;
		z-index: 1000;
	}

	.zk {
		position: absolute;
		right: 20upx;
		top: 80upx;
	}

	.zkBgi {
		width: 50upx;
		height: 50upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.huaxuapp.com/huobao.png');
	}

	.animate {
		animation: fadeIn 1s 1;
	}
	
	.fenxiang{
		border:1px solid rgba(76,76,76,1);
		border-radius:10upx 0  0 10upx;  
		position: fixed;
		right: 0upx;
		top:1000upx;
		z-index: 2;
		width: 82upx; 
		height: 80upx;
		background: rgba(76,76,76,.8);
		transition: all 0.5s;
	}

	.fenxiangs{
		border:1px solid rgba(76,76,76,1);
		border-radius:10upx 0  0 10upx;  
		position: fixed;
		right: 0upx;
		top:910upx;
		z-index: 2;
		width: 82upx; 
		height: 80upx;
		background: rgba(76,76,76,.9);
		 -webkit-transition: all 0.5s;
	}
	
	.huiqu{
		border:1px solid rgba(76,76,76,1);
		border-radius:10upx 0  0 10upx;  
		position: fixed;
		right: 0upx;
		top:1000upx;
		z-index: 2;
		width: 82upx; 
		height: 80upx;
		background: rgba(76,76,76,.9);
		 -webkit-transition: all 0.5s;
	}
	

	.imgs{
		width: 640upx;
		height: 86upx;
	}
	
	.no-btn {
		margin:0;
		padding:0;
		background-color:transparent;
		line-height:inherit;
		border-radius:0;
		border:none;
		font-size:60rpx;
		display:flex;
		justify-content:center;
		align-items:center;
	}
	
	.no-btn::after {
		border: none;
	}
</style>
