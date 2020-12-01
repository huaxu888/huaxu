<template>
	<view>
		<view style="position: fixed; z-index:30;width: 100%; ">
			<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
			<cu-custom class="cu-custom text-white" style="background: rgb(58,59,61);" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">
					<view style="font-size: 36upx;font-weight: 800;color: #FFFFFF;">{{Store.StoreName}}</view>
				</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">
					<view style="font-size: 36upx;font-weight: 800;color: #FFFFFF;">{{Store.StoreName}}</view>
				</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->

			<view class="bg-gray flex padding" style="background: rgb(58,59,61);width: 100%; padding-bottom: 16upx;">
				<view style="border-radius: 10upx;">
					<image :src="Store.LogoPic" style="height: 140upx; width:140upx;border-radius: 10upx;"></image>
				</view>
				<view class="margin-left" style="width: 73%;">
					<view class="text-white">
						<text class="ygIcon-time" style="color:#FF9100 ; font-size: 26upx;"></text>
						<text class="margin-left-xs" style="font-size: 24upx;">配送约30分钟</text>
					</view>

					<view class="margin-top-sm flex align-center justify-center">
						<view class="text-white" style="font-size: 24upx;">地址：</view>
						<view class="tui-scorll-view " style="font-size: 24upx;" @tap='detail'>
							<view class="tui-notice tui-animation" style="color: #FFFFFF;font-size: 24upx;">{{Store.StoreAddress}}</view>
						</view>
					</view>

				</view>

				<view class="flex align-center justify-center margin-left" style="width: 22%;">
					<view style="border-left: 1px solid gray; height: 80upx;"></view>
					<view class="flex align-center justify-end" style="width: 100%;padding-left: 10upx;">
						<view class="flex align-center justify-center flex-direction" @tap="collection" style="width:88upx;">
							<text class="ygIcon-shoucang2 " :class="tap?'animatetap text-or':'text-white'" style="font-size: 55upx;"></text>
							<view class=" margin-top-xs" :class="tap?'text-or':'text-white'">{{tap ?'已收藏':'收藏'}} </view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- #ifdef H5 -->
		<view style="height: 355upx;" class="bg-white"></view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<view style="height: 380upx;" class="bg-white"></view>
		<!-- #endif -->
		
		<!-- #ifdef APP-PLUS -->
		<view style="height: 390upx;" class="bg-white"></view>
		<!-- #endif -->


		<view class="animate2 bg-white" >

			<view style="margin-left: 15upx; " v-if="recommendList.length>0">
				<view style="font-size: 32upx;font-weight: bold;padding-top:26upx;padding-bottom: 26upx;padding-left: 15upx;">商家推荐</view>
				<scroll-view class="grace-scroll-x" scroll-x>
					<view class="items flex flex-direction bg-white shadowStore" v-for="(item,index) in recommendList" :key="index"
					 style="margin-bottom: 15upx;">
						<view style="border-radius: 15upx;">
							<image :src="item.PicUrl" mode="aspectFill" style="height: 200upx;border-radius: 12upx;border-bottom-left-radius: 0; border-bottom-right-radius: 0; "></image>
						</view>
						<view class="margin-top-xs margin-left-sm text-cut">
							{{item.WMInfoTitle}}
						</view>
						<view class="margin-top-xs margin-left-sm margin-right-xs flex justify-between align-center">
							<view class="text-lg" style="color: #FF5B2E;"> <text style="font-size:24upx;color: #FF5B2E;">￥</text>{{item.Price}}</view>
							<view class="flex align-center justify-center">
								<text class="ygIcon-jian2 " style="font-size: 45upx;color: #DDDDDD;" v-if="item.selectCount>0" @tap="topDec(index)"></text>
								<text style="margin-left: 10upx; margin-right: 10upx;" v-if="item.selectCount>0">{{item.selectCount}}</text>
								<text class="ygIcon-jiahao" style="font-size: 45upx;color: #FF5B2E;" @tap="topAdd(index)"></text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>


			<view class="VerticalBox margin-top-xs swipeShadow">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 445upx);background: #f8f8f8;">
					<view class="cu-item" :class="index==tabCur?'text-red cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
					 :data-id="index">
						{{item.TagName}}
					</view>
					<view style="height: 150upx; background: #f8f8f8;"></view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 445upx);"
				 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
					<view class=" bg-white" v-for="(item,index) in list" :key="index" :id="'main-'+index">
						<view class="cu-bar bg-white">
							<view class="action flex justify-center align-center" style="min-height: 10upx;">
								<text class="cuIcon-titles text-red" style="font-size: 30upx;"></text> <text>{{item.TagName}}</text>
							</view>
						</view>
						<view>
							<view class="flex padding bg-white" v-for="(item2,index2) in item.WMInfo" :key="index2">
								<view class="img">
									<image :src="item2.PicUrl" mode="aspectFill" style="width: 130upx;height: 130upx;border-radius: 10upx;"></image>
								</view>
								<view class="flex margin-left-sm">
									<view style="width: 100%;">
										<view class="text-lg">
											{{item2.WMInfoTitle}}</view>
										<view class="text-gray text-xs margin-top-xs">
											<text>{{item2.DanWeiNum}}{{item2.DanWei}}</text>
											<text class="margin-left-sm">月售{{item2.SalesNumMonth == null? 0 :item2.SalesNumMonth}} </text>
										</view>
										<view class=" flex align-center justify-between" style="width: 350upx;">
											<text style="color: #FF5B2E;" class="text-lg"> <text style="font-size:24upx;color: #FF5B2E;">￥</text>{{item2.Price}}</text>
											<view class="flex align-center justify-center">
												<text class="ygIcon-jian2 " style="font-size: 54upx;color: #DDDDDD;" v-if="item2.selectCount>0" @tap="dec(index,index2)"></text>
												<text style="margin-left: 15upx; margin-right: 15upx;" v-if="item2.selectCount>0">{{item2.selectCount}}</text>
												<text class="ygIcon-jiahao" style="font-size: 54upx;color: #FF5B2E;" @tap="add(index,index2)"></text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="height: 150upx;background: #FFFFFF;"></view>
				</scroll-view>
			</view>

			<view style="height:100vh; width: 100%; z-index: 1000; position: fixed;bottom: 90upx;background:rgba(0,0,0,0.4);"
			 class="animate2" v-if="showSelecbox">
				<view style="position: absolute; height: 100vh ; width: 100%;top:0;" @tap="modelHide">

				</view>

				<view style="position: absolute; max-height: 800upx; width: 100%;background: #FFFFFF;bottom: 0;" class="animate1">
					<view class="padding-lr flex align-center justify-end" style="background:#F2F2F2;padding-top: 30upx; padding-bottom: 30upx;">
						<!-- <view style="color: #a1a1a1;">包装费 ￥2</view> -->
						<view style="color: #a1a1a1;" @tap="clear"><text class="ygIcon-shanchu"></text><text class="margin-left-xs">清空购物车</text></view>
					</view>
					<view>
						<scroll-view scroll-y style="max-height:600upx;">
							<view v-for="(item,index) in selectList" :key="index" class="padding-lr-sm  padding-tb flex align-center justify-between "
							 style="height: 120upx; background: #FFFFFF;border-bottom: 1px solid #F8F8F8;">
								<view style="width: 200upx;">
									<text>{{item.WMInfoTitle}}</text>
								</view>
								<view style=" width: 100upx;">
									<text style="font-size: 30upx;"><text style="font-size:22upx;">￥</text>{{item.Price}}</text>
								</view>
								<view>
									<view class="flex align-center justify-center">
										<text class="ygIcon-jian2 " style="font-size: 54upx;color: #DDDDDD;" @tap="boxDec(index)"></text>
										<text style="margin-left: 15upx; margin-right: 15upx;">{{item.selectCount}}</text>
										<text class="ygIcon-jiahao" style="font-size: 54upx;color: #FF5B2E;" @tap="boxAdd(index)"></text>
									</view>
								</view>
							</view>
							<view style="height: 20upx;"></view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between padding-lr" style="height: 100upx;position: fixed;z-index: 2000; bottom: 0;background: rgba(58,59,61,1);width: 100%;">
				<view class="flex align-center justify-center" style="position: absolute;bottom: 42upx; z-index: 2000;">
					<view class="tag-position flex align-center justify-center" v-if="selectCuteTag > 0" style="height:40upx;width:40upx;background:#FFFFFF;border-radius: 50%;">
						<view class="flex align-center justify-center" style="height:35upx;width:35upx;background: #FF9100;border-radius: 50%">
							<text class="text-white" style="font-size: 24upx;">{{selectCuteTag}}</text>
						</view>
					</view>
					<image v-if="selectList.length>0" src="https://img.91goodluck.com/gouwuche_03.png" style="height: 80upx;width: 80upx;"
					 @tap="showSelectList()"></image>
					<image v-if="selectList.length<=0" src="https://img.91goodluck.com/gwc_03.png" style="height: 80upx;width: 80upx;"
					 @tap="showSelectList()"></image>
				</view>

				<view class="flex align-center justify-between" style="margin-left: 110upx;width: 100%;">
					<view class="flex flex-direction align-start" style="font-size:40upx;color: #FFFFFF;">
						<view v-if="selectList.length >0">
							<text style="font-size:24upx;color: #FFFFFF;">￥</text>
							<text style="font-size:42upx;color: #FFFFFF;">{{sumMoney}}</text>
						</view>
						<text class="text-white" style="font-size: 24upx;color: #999999;">另需配送费￥{{Store.PeiSongNum}}</text>
					</view>
					<text class="text-white" style="font-size: 24upx;color: #999999;" v-if="selectList.length<=0">￥{{Store.PeiSongStartNum}}起送</text>
					<text class="text-white" style="font-size: 24upx;color: #999999;" v-if="selectList.length > 0 && sumMoney< Store.PeiSongStartNum ">还差￥{{Store.PeiSongStartNum - sumMoney}}</text>
					<view v-if="selectList.length>0 && Store.PeiSongStartNum  <= sumMoney" class="flex align-center justify-center"
					 style="height: 100%; width: 150upx; background: #FF5B2E;height: 80upx;border-radius: 10upx;">
						<text class="text-white" style="font-size: 28upx;color: #FFFFFF;" @tap="toPay()">去结算</text>
					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				tap: false,
				showSelecbox: false,
				selectIndex: 0,
				selectList: [],
				selectCuteTag: 0,
				navItems2: ['菜单', '评价', '商家'],
				storeInfo: {
					pic: [
						'http://hxapi.huaxuapp.com/Content/Upload/image/20190612/20190612144912_1841.jpg',
						'http://hxapi.huaxuapp.com/Content/Upload/image/20190612/20190612144623_9321.jpg',
						'https://newsapp.huaxuapp.com/Content/Upload/image/20190831/20190831172316_2151.jpg',
						'http://hxapi.huaxuapp.com/Content/Upload/image/20190627/20190627154009_9147.jpg'
					],
					qualifications: [
						'http://hxapi.huaxuapp.com/Content/Upload/image/20190612/20190612144912_1841.jpg',
						'http://hxapi.huaxuapp.com/Content/Upload/image/20190612/20190612144623_9321.jpg'
					],
					address: '吉林建筑大学城建学院学府路学府楼五楼左侧',
					tel: '1899267067',
					saleTime: '8:00-22:00',
					remarks: '新用户立减5元，首次使用用过支付最高再减3元（在线支付专享）'
				},
				taskList: [],
				navIndex: 0,
				list: [],
				sumMoney: 0,
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				flList: [], //分类list
				Store: '', //店铺信息
				WMInfoList: '', //店铺菜品list
				recommendList: '',
				StoreInfoList: '',
				DPHJList: '', //店铺环境
				YYZZList: '', //营业资质
				shoppingCart: []		// 购物车
			};
		},
		onLoad(option) {
			var _self = this;
			var storeID = option.StoreID;
			storeID= 1144
			console.log(storeID);
			this.$http.getWmList(storeID).then(res => {
				console.log(res);
				var list = res.Data;
				_self.flList = res.Data.SortList; //分类list
				_self.Store = res.Data.Store; //店铺信息
				this.StoreInfoList = _self.Store.Info.split(',');
				_self.WMInfoList = res.Data.WMInfoList; //店铺信息
				_self.flList.forEach((t, i) => {
					t.WMInfo = list.WMInfoList.filter((value, key) => {
						return value.Tags == t.TagName;
					})
				});
				_self.list = _self.flList; //处理过的list
				this.DPHJList = _self.Store.SFZPic1.split(',');
				this.YYZZList = _self.Store.SFZPic2.split(',');
				var recommendList = [];
				_self.WMInfoList.forEach((item, index) => {
					if (item.IsTj) {
						recommendList.push(item);
					}
				});
				this.recommendList = recommendList;
			});
		},
		onShow() {
			// setTimeout(() => {
			// 	if (this.$store.state.shoppingCart.id == this.Store.StoreID) {
			// 		this.sumMoney = 0
			// 		this.selectList = this.$store.state.shoppingCart.data
			// 		this.selectList.forEach(item => {
			// 			this.sumMoney += item.selectCount * item.Price
			// 			this.selectCuteTag += item.selectCount
			// 		})
			// 	}
			// }, 500)
		},
		components: {
			
		},
		methods: {
			chooseGGDetail(item, isbanner) {
				if (item) {
			
					if (typeof(item.Spec) == 'string') {
						let Spec = JSON.parse(item.Spec);
						item.Spec = Spec;
						this.chooseGGobj.title = Spec[0].title
						this.chooseGGobj.price = Spec[0].price
					} else {
						this.chooseGGobj.title = item.Spec[0].title
						this.chooseGGobj.price = item.Spec[0].price
					}
					this.chooseGGItem = item;
					let isFind = false;
					isFind = this.basketList.shopContent.some((Listitem, index) => {
						if (item.Spec && Listitem.Tags.title && item.Spec[0].title == Listitem.Tags.title) {
							this.chooseGGItem = Listitem;
							return true;
						}
					})
			
					if (!isFind) {
						this.chooseGGItem = item;
						this.showOption = false;
					}
			
					//这里可以处理一下吧 规格重新存储到一个变量里
			
					if (isbanner) {
						this.dishModel = false;
					}
					this.selectGGModel = true;
				}
			
			},
			changeStarInfo(star) {
				var info;
				switch (star) {
					case 1:
						info = '吐槽'
						break;
					case 2:
						info = '一般'
						break;
					case 3:
						info = '凑合'
						break;
					case 4:
						info = '给力'
						break;
					case 5:
						info = '棒棒哒'
						break;
					default:
						break;
				}
				return info;
			},
			previewImag(index, urls) {
				uni.previewImage({
					current: index,
					urls: urls,
					indicator: "default"
				})

			},
			callShop(Phone) {
				uni.makePhoneCall({
					phoneNumber: Phone
				});
			},
			toPay() {
				console.log(this.selectList)
				this.$store.commit('clearShoppingCart')
				this.$store.commit('setShopping', {id: this.Store.StoreID, data: this.selectList})
				uni.navigateTo({
					url: `/pages/Index/indexTable/song/pay?StoreName=${this.Store.StoreName}&StoreID=${this.Store.StoreID}&PeiSongNum=${this.Store.PeiSongNum}`
				})
			},
			collection() {
				this.tap = !this.tap;
			},
			clear() {
				//另一种方法是用字段记录添加的索引 然后通过索引进行删除
				this.list.forEach((item, i) => {
					item.WMInfo.forEach((item, i) => {
						if (item.selectCount > 0) {
							item.selectCount = 0;
						}
					});
				});

				this.taskList.forEach((item, i) => {
					if (item.selectCount > 0) {
						item.selectCount = 0;
					}
				});
				this.showSelecbox = false;
				this.selectCuteTag = 0;
				this.selectList = [];

				this.sumMoney = 0;
				this.$store.commit('clearShoppingCart')
			},
			modelHide() {
				this.showSelecbox = false;
			},
			boxAdd(index) {

				this.selectList[index].selectCount += 1;
				this.sumMoney += this.selectList[index].Price;
				this.selectCuteTag -= 1;
			},
			boxDec(index) {
				if (this.selectList[index].selectCount - 1 >= 0) {
					//如果减后的count还大于等于0 我就让你减
					this.selectList[index].selectCount -= 1;
					if (this.selectCuteTag - 1 >= 0) {
						this.selectCuteTag -= 1;
					}
					this.sumMoney -= this.selectList[index].Price;
					//如果减完后为0了就移除这个对象
					if (this.selectList[index].selectCount == 0) {
						this.selectList.splice(index, 1);
					}

					if (this.selectList.length == 0) {
						this.showSelecbox = false;
					}
				}
			},
			showSelectList() {
				if (this.selectList.length > 0) {
					this.showSelecbox = !this.showSelecbox;
				}
			},
			topAdd(index) {
				var flag = false;
				if (this.selectList.length > 0) {
					//如果这个里面有东西的话就查找有没有类似的
					this.selectList.some((item, i) => {
						if (item.WMInfoID == this.recommendList[index].WMInfoID) {
							//查找到的有的话
							item.selectCount += 1
							this.selectCuteTag += 1;
							this.sumMoney += this.recommendList[index].Price;
							flag = true; //有东西
							return true
						}
					})

					if (!flag) {
						//添加
						this.recommendList[index].selectCount += 1;
						this.selectCuteTag += 1;
						this.selectList.push(this.recommendList[index]);
						this.sumMoney += this.recommendList[index].Price;
					}

				} else {
					//直接添加
					this.recommendList[index].selectCount += 1;
					this.selectCuteTag += 1;
					this.selectList.push(this.recommendList[index]);
					this.sumMoney += this.recommendList[index].Price;
				}
			},
			topDec(index) {
				if (this.selectList.length > 0) {
					//判断这个东西的
					this.selectList.some((item, i) => {
						if (item.WMInfoID == this.recommendList[index].WMInfoID) {
							//查找到的有的话
							if (item.selectCount - 1 >= 0) {
								item.selectCount -= 1

								if (this.selectCuteTag - 1 >= 0) {
									this.selectCuteTag -= 1;
								}

								if (item.selectCount == 0) {
									this.selectList.splice(i, 1);
								}
								this.sumMoney -= this.recommendList[index].Price;
							}
							return true
						}
					})
				}
			},
			add(index, index2) {
				var flag = false;
				if (this.selectList.length > 0) {
					//如果这个里面有东西的话就查找有没有类似的
					this.selectList.some((item, i) => {
						if (item.WMInfoID == this.list[index].WMInfo[index2].WMInfoID) {
							//查找到的有的话
							item.selectCount += 1
							this.selectCuteTag += 1;
							this.sumMoney += this.list[index].WMInfo[index2].Price;
							flag = true; //有东西
							return true
						}
					})

					if (!flag) {
						//添加
						this.list[index].WMInfo[index2].selectCount += 1;
						this.selectCuteTag += 1;
						this.selectList.push(this.list[index].WMInfo[index2]);
						this.sumMoney += this.list[index].WMInfo[index2].Price;
					}

				} else {
					//直接添加
					this.list[index].WMInfo[index2].selectCount += 1;
					this.selectCuteTag += 1;
					this.selectList.push(this.list[index].WMInfo[index2]);
					this.sumMoney += this.list[index].WMInfo[index2].Price;
				}
				// this.list[index].foodList[index2].selectCount += 1;

				//如果没有对象就把对象put进去

				//否则就是修改对象的值
			},
			dec(index, index2) {
				if (this.selectList.length > 0) {
					//判断这个东西的
					this.selectList.some((item, i) => {
						if (item.foodid == this.list[index].WMInfo[index2].foodid) {
							//查找到的有的话
							if (item.selectCount - 1 >= 0) {
								item.selectCount -= 1

								if (this.selectCuteTag - 1 >= 0) {
									this.selectCuteTag -= 1;
								}

								if (item.selectCount == 0) {
									this.selectList.splice(i, 1);
								}
								this.sumMoney -= this.list[index].WMInfo[index2].Price;
							}
							return true
						}
					})
				}

			},
			changeSelect(index) {
				this.selectIndex = index;
			},
			navChange: function(index) {
				this.aa = !this.aa
				this.navIndex = index;
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;

						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				//577
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (i - 1) * 50
						this.tabCur = i
						return false
					}
				}
			}
		}
	}
</script>

<style>
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
		-webkit-animation: tui-rolling 12s linear infinite;
		animation: tui-rolling 12s linear infinite;
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


	/* h5 端需要动态增加 44px [ 避开默认的头部导航 ] */
	.Storeimg {
		width: 130upx;
		height: 130upx;
		border-radius: 15upx;
		margin-left: 22upx;
	}

	.remakPic {
		width: 130upx;
		height: 130upx;
		margin-top: 20upx;
		margin-left: 20upx;
	}


	.Storeimg:first-child {
		width: 130upx;
		height: 130upx;
		border-radius: 15upx;
		margin-left: 0;
	}

	.top1 {
		top: 0;
		line-height: 50px;
		height: 50px;
		text-align: center;
	}

	/* #ifdef H5 */
	.top1 {
		top: 44px;
	}

	/* #endif */

	.top2 {
		top: 55px;
		line-height: 50px;
		height: 50px;
		text-align: center;
	}

	/* #ifdef H5 */
	.top2 {
		top: 99px;
	}

	/* #endif */

	.shadowStore {
		/* box-shadow:-1px -3px 8px #DDDDDD; */
		box-shadow: 0px -1px 3px #DDDDDD
	}

	.swipeShadow {
		/* box-shadow:-1px -3px 8px #DDDDDD; */
		box-shadow: 0px 6px 17px #DDDDDD
	}

	.bg-grey-hover {
		color: #F5F5F5;
		/* background-color: #BCBABB; */
		background-color: rgba(255, 91, 46, 1);
	}

	.bg-grey-light {
		color: #F5F5F5;
		background-color: rgba(255, 91, 46, 0.5);
	}


	.bg-grey-hovergray {
		color: #F5F5F5;
		background-color: #BCBABB;
	}

	.bg-grey-lightgray {
		color: #BCBABB;
		background-color: #F5F5F5;
	}


	.bg-grey-hoverhp {
		color: #F5F5F5;
		/* background-color: #BCBABB; */
		background-color: rgba(255, 91, 46, 1);
	}

	.bg-grey-lighthp {
		color: #F5F5F5;
		background-color: rgba(255, 91, 46, 0.5);
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		z-index: 999;
	}

	.animate2 {
		animation: fadeIn 0.3s 1;
	}

	.text-or {
		color: #616263;
	}

	.animatetap {
		animation: rubberBand 1s 1;
	}

	.animate1 {
		animation: fadeInUp 0.3s 1;
	}

	.title-block {
		width: 10upx;
		height: 30upx;
		background: red;
	}


	.grace-news-list>.item>.img {
		width: 120upx;
		height: 120upx;
		flex-shrink: 0;
		font-size: 0;
	}

	.grace-news-list .price {
		line-height: 1.8em;
		color: #E2231A;
	}

	.grace-add-to-card {
		width: 45upx;
		height: 45upx;
		line-height: 45upx;
		border: 1px solid #E2231A;
		font-size: 32rpx;
		color: #FF0036;
		float: right;
		text-align: center;
		border-radius: 50upx;
	}


	.grace-scroll-x .items {
		width: 250upx;
		height: 330upx;
		vertical-align: top;
		border-radius: 10upx;
		margin: 0 10rpx;
		display: inline-flex;

	}


	.grace-cate-left .item {
		width: 100%;
		line-height: 45px;
		font-size: 28rpx;
		border-bottom: 1px solid #EEE;
		text-align: center;
	}

	.grace-filter-options .current {
		color: #F00;
		font-weight: 700;
	}

	/**/
	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 60upx;
		justify-content: space-between;
	}

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #f8f8f8;
		color: #555555;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #FFFFFF;
		color: #333333;
		font-weight: 800;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}

	.comment-list {
		padding: 30upx;
	}


	.cuttag {
		border-radius: 200upx;
		position: absolute;
		top: 0upx;
		right: -12upx;
		font-size: 20upx;
		padding: 0upx 15upx;
		height: 40upx;
		color: #ffffff;
		z-index: 2001;
	}

	.tag-position {
		position: absolute;
		top: -6upx;
		right: -18upx;
		z-index: 2001;
	}

	.cu-tag.badge {
		border-radius: 200upx;
		position: absolute;
		top: 0upx;
		right: -12upx;
		font-size: 20upx;
		padding: 0upx 15upx;
		height: 40upx;
		color: #ffffff;
		z-index: 2001;
	}

	.cu-tag.badge:not([class*="bg-"]) {
		background-color: #FF9100;
	}
</style>
