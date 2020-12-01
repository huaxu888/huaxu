<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-order-yellow" class="text-black" :isBack="true">
			<block slot="content"><text class="text-bold">{{storeName}}</text></block>
		</cu-custom>
		<!-- #endif -->

		<view v-if="storeMenuList.length < 1">
			<view @tap="toRecharge">
				<image style="width: 690rpx; margin-left: 30rpx; margin-top: 30rpx;" src="https://img.huaxuapp.com/gfmb_03.png" mode="widthFix"></image>
			</view>
			<view style="position: fixed; bottom: 30rpx; right: 30rpx; display: flex; justify-content: flex-end; width: 750rpx;">
				<view style="background: linear-gradient(to right, #f8805e, #ff5c2f); width: 100rpx; height: 100rpx; border-radius: 100rpx; display: flex; justify-content: center; align-items: center;">
					<text class="text-white cuIcon-shopfill" style="font-size: 60rpx;" @tap="enterStore"></text>
				</view>
			</view>
		</view>
		
		<view v-else>
			<view class="bg-order-yellow padding-top-xs all-bg-card ">
				<swiper class="card-swiper round-dot " :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#f8cd18">
					<swiper-item v-for="(item,index) in TJmenuList" :key="index" :class="cardCur==index?'cur':''" @click="toDetails(item)">
						<view class="swiper-item">
							<image :src="item.PicUrl"></image>
						</view>
					</swiper-item>
				</swiper>

				<view class="margin-tb flex" v-if="storeId != 3180" style="color: #FFFFFF;" @tap="toRecharge">
					<view class="flex margin-left flex-sub">
						<view class="flex align-center padding-lr-xs" style="background-color: #333; border-radius: 10rpx 0 0 10rpx;">
							<text class="text-sm">全场<br />通用</text>
						</view>
						<view class="flex padding-tb-xs flex-direction flex-sub justify-center align-center" style="border-radius:0 10rpx 10rpx 0; background: linear-gradient(to right, #f8805e, #ff5c2f);">
							<text class="text-lg">
								<text class="text-sm">￥</text>
								1000
								<text class="text-xs">.00</text>
							</text>
							<text class="text-sm margin-top-xs">
								<text class="text-xs">售价:</text>
								<text class="text-xs">￥</text>
								900
							</text>
						</view>
					</view>
					<view class="flex margin-lr flex-sub">
						<view class="flex align-center padding-lr-xs" style="background-color: #333; border-radius: 10rpx 0 0 10rpx;">
							<text class="text-sm">全场<br />通用</text>
						</view>
						<view class="flex padding-tb-xs flex-direction align-center justify-center flex-sub" style="border-radius:0 10rpx 10rpx 0; background: linear-gradient(to right, #f8805e, #ff5c2f);">
							<text class="text-lg">
								<text class="text-sm">￥</text>
								2000
								<text class="text-xs">.00</text>
							</text>
							<text class="text-sm margin-top-xs">
								<text class="text-xs">售价:</text>
								<text class="text-xs">￥</text>
								1800
							</text>
						</view>
					</view>
					<view class="flex margin-right flex-sub">
						<view class="flex align-center padding-lr-xs" style="background-color: #333; border-radius: 10rpx 0 0 10rpx;">
							<text class="text-sm">全场<br />通用</text>
						</view>
						<view class="flex padding-tb-xs flex-direction align-center justify-center flex-sub" style="border-radius:0 10rpx 10rpx 0; background: linear-gradient(to right, #f8805e, #ff5c2f);">
							<text class="text-lg">
								<text class="text-sm">￥</text>
								5000
								<text class="text-xs">.00</text>
							</text>
							<text class="text-sm margin-top-xs">
								<text class="text-xs">售价:</text>
								<text class="text-xs">￥</text>
								4250
							</text>
						</view>
					</view>
				</view>
				
				<view class="margin-tb flex" v-if="storeId == 3180" style="color: #FFFFFF;" @tap="toRecharge">
					<view class="flex margin-left-xs flex-sub">
						<view class="flex align-center padding-lr-xs" style="background-color: #333; border-radius: 10rpx 0 0 10rpx;">
							<text class="text-sm">全场<br />通用</text>
						</view>
						<view class="flex padding-tb-xs flex-direction flex-sub justify-center align-center" style="border-radius:0 10rpx 10rpx 0; background: linear-gradient(to right, #f8805e, #ff5c2f);">
							<text class="text-lg">
								<text class="text-sm">￥</text>
								1000
								<text class="text-xs">.00</text>
							</text>
							<text class="text-sm margin-top-xs">
								<text class="text-xs">售价:</text>
								<text class="text-xs">￥</text>
								950
							</text>
						</view>
					</view>
					<view class="flex margin-lr-xs flex-sub">
						<view class="flex align-center padding-lr-xs" style="background-color: #333; border-radius: 10rpx 0 0 10rpx;">
							<text class="text-sm">全场<br />通用</text>
						</view>
						<view class="flex padding-tb-xs flex-direction align-center justify-center flex-sub" style="border-radius:0 10rpx 10rpx 0; background: linear-gradient(to right, #f8805e, #ff5c2f);">
							<text class="text-lg">
								<text class="text-sm">￥</text>
								2000
								<text class="text-xs">.00</text>
							</text>
							<text class="text-sm margin-top-xs">
								<text class="text-xs">售价:</text>
								<text class="text-xs">￥</text>
								1880
							</text>
						</view>
					</view>
					<view class="flex margin-right-xs flex-sub">
						<view class="flex align-center padding-lr-xs" style="background-color: #333; border-radius: 10rpx 0 0 10rpx;">
							<text class="text-sm">全场<br />通用</text>
						</view>
						<view class="flex padding-tb-xs flex-direction align-center justify-center flex-sub" style="border-radius:0 10rpx 10rpx 0; background: linear-gradient(to right, #f8805e, #ff5c2f);">
							<text class="text-lg">
								<text class="text-sm">￥</text>
								5000
								<text class="text-xs">.00</text>
							</text>
							<text class="text-sm margin-top-xs">
								<text class="text-xs">售价:</text>
								<text class="text-xs">￥</text>
								4500
							</text>
						</view>
					</view>
				</view>

				<view class="flex align-center justify-end margin-bottom-xs">
					<view class="padding-tb-xs padding-lr-sm flex align-center justify-between sacn-card">
						<input placeholder="搜一搜" @confirm="goTosearch" v-model="searchText" placeholder-style="font-size:28upx"
						 :adjust-position="false" confirm-type="search" type="text" maxlength="20" class="input-content" />
						<text class="hxIcon-orderScan" @tap="goTosearch"></text>
					</view>
				</view>
<!-- 				<swiper :autoplay="true" interval="6000" :circular="true" style="height: 102rpx;" class="margin-tb" v-if="storeId == 3180" @tap="toRecharge">
					
				</swiper> -->

				<scroll-view scroll-x :scroll-into-view="'main-'+sortIndex" class=" nav bg-white  padding-top-xs" :class="isSticky?'fixed-top':''"
				 :style="{top:isSticky?CustomBar+'px':''}" scroll-with-animation>
					<view v-for="(item,index) of sortList" :key="index" :id="'main-'+index" @tap="changeSort(index,item.TagName.wmSortID)"
					 class="cu-item text-cut" :class="sortIndex == index ? 'bg-orderYellow': 'bg-lightGray'">
						{{item.TagName.wmSortName}}
					</view>
				</scroll-view>

				<view class="sticky-block" v-if="isSticky"></view>

				<!--内容 start-->
				<view class="">
					<view class="flex align-center justify-between margin-lr paddingb bottom-line animation-slide-right" v-for="(item,index) of menuList"
					 :key="index" v-if="menuList.length > 0" :style="[{animationDelay: (index + 1)*0.1 + 's'}]">
						<!-- item.WMSortID == sortList[sortIndex].TagName.wmSortID -->
						<view class="flex align-center justify-center " @tap="toDetails(item)">
							<!-- item.PicUrl -->
							<image :src="retrunPicUrl(item.PicUrl)" class="menu-img" v-once></image>
							<view class="flex align-start justify-between flex-direction margin-left menu-info">
								<view class="flex align-start justify-center flex-direction">
									<text class="text-black  text-bold text-cut menu-info-title">{{item.WMInfoTitle}}</text>
									<text v-if="item.WMinfoDesc" class=" text-sm menu-info-desc" style="margin: 10upx 0;color:#999999;">{{item.WMinfoDesc}}</text>
									
									<view  style="font-size: 24upx;display: flex;line-height: 32upx;">
										<view style="letter-spacing:3upx;background-color: #fbece7;padding: 1upx 8upx;margin-right: 10upx;border-radius: 5upx;"><text style="color: #f7493c;">已售{{ item.num ? item.num - item.hasnum : 0}}</text></view>
										<view style="letter-spacing:3upx;background-color: #f0eeed;padding: 1upx 8upx;border-radius: 5upx;"><text style="color: #808080;">库存{{item.num ? Number(item.hasnum) : 0}}</text></view>			
									</view>
									
									<view class="flex justify-start flex-direction" style="margin-top: 30upx;position: relative;">
										<view>
											<text class="text-bold"  style="color: #fe4e01;margin-right: 2upx;">&yen;</text> <text class="text-bold menu-info-money" style="color: #fe4e01;font-size: 38upx;">{{item.Price}}</text>
											<text class="margin-left-xs menu-info-sale-money" v-if="item.SalePrice">&yen;&nbsp;{{item.SalePrice}}</text>	
										</view>
									</view>
								</view>

							</view>
						</view>
						<view class="flex align-center justify-end menu-operate">
							<text class="hxIcon-orderSub sub-Dish" v-if="item.selectCount > 0 && !item.Spec && ! item.IsSpecial && !item.IsSyPoint" @tap="subDish(item)"></text>
							<text class="margin-lr-xs" style="font-size: 36upx;margin-top:20upx ;" v-if="item.selectCount>0 && !item.Spec">{{item.selectCount}}</text>
							<text class="hxIcon-orderAdd add-Dish" v-if="!item.Spec && ! item.IsSpecial && !item.IsSyPoint" @tap="addDish($event,item)"></text>
							<tui-tag shape="circle" size="default" type="high-yellow" v-if="item.Spec && ! item.IsSpecial && !item.IsSyPoint" @tagClick="chooseGGDetail(item,false)">选规格</tui-tag>
						</view>
					</view>
				</view>
				<view class="margin-bottom-xl" style="height: 160upx; width: 100%; ">

				</view>


				<flyInCart ref="inCart" :cartBasketRect="cartBasketRect"></flyInCart>

				<!-- 底部 -->
				<!-- <view class="padding-lr bottom-fixed" @touchmove.stop.prevent :class="ishidden?'isHidden':''" v-if="showBottom || basketList.length>0"> -->
				<view class="padding-lr bottom-fixed" @touchmove.stop.prevent :class="ishidden?'isHidden':''">
					<view class="flex align-center justify-between padding padding-lr-xl bottom-fixed-card" style="flex: auto;">
						<view class="flex justify-center align-center gwl-relative">
							<text id="cart" class="hxIcon-gwl gwl" style="font-size: 68upx;" @click="popup"></text>
							<view class="flex align-center justify-center cuteTag" v-if="basketList.shopContent.length>0">
								<text class="text-black" style="font-size: 24upx;">{{cuteTagsum}}</text>
							</view>


							<view class="flex align-end justify-start margin-left-sm margin-left-lg calculate">
								<text lass="text-df calculate-symbol">&yen;</text>
								<text class="margin-left-xs calculate-money">{{basketList.price || 0}}</text>
							</view>
						</view>

						<view @tap="submit" class="flex align-center justify-center bg-orderYellow submit">
							<text>选好了</text>
						</view>
					</view>
					<view class="to-home-btn"  @tap="enterStore">
						<text class="cuIcon-shopfill" style="font-size: 56rpx;"></text><text style="font-size: 24upx;"></text>
					</view>
				</view>


				<!-- 购物篮 -->
				<tui-bottom-popup :show="popupShow" @close="popup">
					<view class="padding bg-order-yellow" style="border-top-right-radius:30upx;border-top-left-radius: 30upx; ">
						<!-- 顶部 -->
						<view class="flex align-center justify-between margin-bottom-sm margin-lr-xs">
							<view class="flex align-center justify-center">
								<text class="hxIcon-yixuan" style="font-size: 40upx;"></text>
								<text class="text-black text-sm margin-left-xs">已选商品</text>
							</view>

							<view class="flex align-center justify-center" @click="showTips">
								<text class="hxIcon-orderDel" style="font-size: 32upx;"></text>
								<text class="text-black text-sm margin-left-xs">清空</text>
							</view>
						</view>
						<!-- 购物篮 -->
						<scroll-view scroll-y :scroll-with-animation="true" style="height: 560upx; margin-bottom: 110upx;">
							<view class="flex align-center justify-between padding-sm bg-white margin-tb-sm-big gwl-card" v-for="(item,index) of basketList.shopContent"
							 :key="index" style="border-radius: 20upx; margin-top: 0;">
								<view class="flex align-center justify-center ">
									<image :src="retrunPicUrl(item.PicUrl)" style="width:130upx; height: 130upx;border-radius: 10upx;" v-once
									 :lazy-load="true"></image>
									<view class="flex align-start justify-between flex-direction margin-left" style="height: 130upx;width: 300upx;">
										<view class="flex align-start justify-center flex-direction">
											<text class="text-black text-cut" style="font-size: 28upx;white-space: nowrap;width: 280upx;">{{ item.WMInfoTitle}}</text>
											<text class="text-sm" style="margin-top: 5upx;line-height: 25upx; color: #de6503;-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;height: 50upx;">{{item.Tags.title?item.Tags.title:item.WMinfoDesc}}</text>
										</view>
										<view class="flex align-end justify-start" style="margin-top: 5upx;">
											<text class="menu-info-sale-money" v-if="item.SalePrice">&yen;&nbsp;{{item.SalePrice}}</text>
											<text class="text-sm text-black text-bold">&yen;</text> <text class=" text-black text-bold" style="font-size: 32upx;line-height: 1em;margin-left: 5upx;">{{ item.Tags.price?item.Tags.price:item.Price}}</text>
										</view>

									</view>
								</view>
								<view class="flex align-center justify-end " style="height: 130upx;width: 180upx;">
									<text class="hxIcon-orderSub sub-Dish" v-if="item.selectCount>0" @tap="subDish(item)"></text>
									<text class="margin-lr-xs" style="font-size: 36upx;margin-top:20upx ;" v-if="item.selectCount>0">{{item.selectCount}}</text>
									<text class="hxIcon-orderAdd " style="font-size: 64upx;margin-top:20upx;color: #f8cd18;"
									 @tap="addDishNone(item)"></text>
								</view>
							</view>
						</scroll-view>
					</view>
				</tui-bottom-popup>

				<!-- 轮播图的详情图 -->
				<custom-modal :show="dishModel" @cancel="hideDishModel" :custom="true" :isPadding="false">
					<view>
						<image :src="TJdishItem.PicUrl" style="width: 100%;height: 476upx;border-top-right-radius: 24upx;border-top-left-radius: 24upx; position: relative; "></image>
						<view class="flex align-center justify-center" style="position: absolute;width: 38px;height: 38px;top:10px;right:10px;background: rgba(0,0,0,0.5);border-radius: 50%;"
						 @tap="hideDishModel">
							<text class="hxIcon-cha" style="color: #FFFFFF; "></text>
						</view>

						<view>
							<view class="flex align-center justify-between  padding-tb margin-right-sm">
								<view class="flex align-center justify-center ">
									<view class="flex align-start justify-between flex-direction margin-left" style="width: 300upx;">
										<view class="flex align-start justify-center flex-direction">
											<text class="text-black  text-bold text-cut" style="font-size: 50upx;white-space: nowrap;width: 400upx;">{{TJdishItem.WMInfoTitle}}</text>
											<text class="margin-top-xs text-sm" style="color: #de6503;-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;height: 64upx;">{{TJdishItem.WMinfoDesc}}</text>
										</view>
										<view class="flex align-end justify-start margin-top-sm">
											<text lass="text-sm text-bold">&yen;</text> <text class="margin-left-xs text-bold" style="font-size: 40upx;line-height: 1em;">{{TJdishItem.Price}}</text>
										</view>

									</view>
								</view>
								<view class="flex align-center justify-end " style="width: 180upx;" v-if="!TJdishItem.Spec">
									<text class="hxIcon-orderSub sub-Dish" style="font-size: 64upx;margin-top:20upx;color: #8b95ae; " v-if="TJdishItem.selectCount>0"
									 @tap="subDish(TJdishItem)"></text>
									<text class="margin-lr-xs" style="font-size: 36upx;margin-top:20upx ;" v-if="TJdishItem.selectCount>0">{{TJdishItem.selectCount}}</text>
									<text class="hxIcon-orderAdd" style="font-size: 64upx;margin-top:20upx;color: #f8cd18;"
									 @tap="addDishNone(TJdishItem)"></text>
								</view>

								<tui-tag shape="circle" size="default" type="high-yellow" v-if="TJdishItem.Spec" @tagClick="chooseGGDetail(TJdishItem,true)">选规格</tui-tag>

							</view>
						</view>
					</view>
				</custom-modal>

				<tui-modal :show="cleanTips" @click="handleClick5" @cancel="hideTips" content="是否清空购物车" color="#333" :size="32"
				 shape="circle" :button="tipBotton"></tui-modal>

				<centerModal :show="selectGGModel" @cancel="hideGGModel" :isPadding="false" :custom="true" :fadein="true">
					<view style="display: flex; flex-direction: column;">
						<text class="padding-lr margin-top" style="font-size: 40upx;font-weight: bold;color: #333333;">{{chooseGGItem.WMInfoTitle}}</text>
						<text style="font-size: 25upx;color: #777777;" class="margin-tb-sm  padding-lr">规格</text>
						<scroll-view scroll-y class="tui-popup-scroll padding-lr">
							<view class="flex-box">
								<tui-tag :plain="true" :type="chooseGGobj.index == index ?'choose-yellow':'gray'" v-for="(item,index) of chooseGGItem.Spec"
								 :key="index" @tagClick="chooseGG(index,item)">{{item.title}}</tui-tag>
							</view>
						</scroll-view>
						<view class="padding-tb-xs  padding-lr margin-top flex justify-start text-xs" style="background: #F4F4F4;">
							<text style="color: #777777;white-space: nowrap;">已选规格：</text><text style="color: #333333;" class="text-cut">{{chooseGGobj.title}}</text>
						</view>

						<view class="flex align-center justify-between padding-lr margin-tb-sm" style="height: 65upx;">
							<view class="flex align-end justify-center text-red">
								<text style="font-size: 32upx;margin-bottom: 4upx;">￥</text>
								<text style="font-size: 50upx;">{{chooseGGobj.price}}</text>
							</view>

							<view class="flex align-center justify-center  " v-if="showOption">
								<text class="hxIcon-orderSub " style="font-size: 50upx;color: #8b95ae;" v-if="chooseGGItem.selectCount>0" @tap="subDish(chooseGGItem)"></text>
								<text class="margin-lr-xs" style="font-size: 34upx;" v-if="chooseGGItem.selectCount>0">{{chooseGGItem.selectCount}}</text>
								<text class="hxIcon-orderAdd" @tap="addDishNone(chooseGGItem)" style="font-size: 50upx;color: #f8cd18;"></text>
							</view>

							<tui-tag shape="circle" size="default" type="high-yellow" @tagClick="addDishNone(chooseGGItem)" v-if="!showOption">+
								加入购物车</tui-tag>
						</view>

					</view>
				</centerModal>


			</view>
		</view>
	</view>
</template>

<script>
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiModal from "@/components/modal-change/modal" //魔改后的model
	import centerModal from "@/components/modal/modal"
	import tuiTag from "@/components/productComponets/tag/tag"
	import customModal from "@/components/modal/modal"
	import flyInCart from '@/components/ar-flyCart/flyInCart.vue'
	export default {
		data() {
			return {
				sortIndex: 0,
				sortList: [],
				menuList: [],
				TJmenuList: [],
				storeMenuList: [],
				basketList:{}, //购物篮
				TJdishItem: '', //弹窗的item
				selectGGModel: false, //选规格的弹窗
				dishModel: false,
				cleanTips: false, //清空购物车弹窗
				chooseGGItem: '', //选择当前的商品的item 做个暂时存储
				searchText: '', //搜索的文本框
				cardCur: '',
				tipBotton: [{
					text: "否",
					type: 'gray'
				}, {
					text: "是",
					type: 'yellow'
				}],
				popupShow: false,
				isSticky: false,
				storeName: '',
				storeId: '',
				CustomBar: this.CustomBar,
				cartBasketRect: {}, //绑定的ref
				isAnimation: false,
				cuteTagsum: 0,
				sumMoney: 0,
				showBottom: true,
				storeInfo: '',
				ishidden: true,
				deskNo: 0,
				chooseGGobj: {
					index: 0,
					title: '',
					price: ''
				}, //选择规格的obj
				showOption: false, //用来控制加减显示
				scan: 0,				// 是否是扫码进来的，默认 0, 表示不是扫码
				adImageList: [
					'https://img.huaxuapp.com/czBanner_03.png',
					'https://img.huaxuapp.com/czBanner_06.png',
					'https://img.huaxuapp.com/czBanner_08.png'
				]
			}
		},
		onLoad(option) {
			if (option.q) {
				option = decodeURIComponent(option.q)
				option = option.split('?')[1]
				option = option.split('&')
				this.storeId = option[1].split('=')[1]
				this.storeName = option[2].split('=')[1]
				this.deskNo = option[3].split('=')[1]
				this.scan = 1
			} else {
				this.scan = 0
				this.storeName = option.storeName
				this.storeId = option.storeId;
			}

			if (this.storeId == 3180) {
				this.adImageList = [
					'https://img.huaxuapp.com/hxgfcz.png',
					'https://img.huaxuapp.com/hxgfcz_03.png',
					'https://img.huaxuapp.com/hxgfcz_06.png'
				]
			}

			this.$api.showLoading_();
			this.$http.getWmList(this.storeId).then(res => {
				this.sortList = res.Data.SortList;
				this.storeMenuList = res.Data.WMInfoList;
				this.storeInfo = res.Data.Store
				this.menuList = this.storeMenuList.filter((item) => {
					if (item.WMSortID == this.sortList[0].TagName.wmSortID) {
						return item;
					}
				});

				this.TJmenuList = this.storeMenuList.filter((item) => {
					if (item.IsTj) {
						return item;
					}
				});
				this.bindRef();
				this.$api.hidLoading_();
			});
	
			let _this = this;
			this.$http.getWmList(this.storeId)
				.then(res => {
					let wmlist, tmp
					if (res.IsSuccess) {
						wmlist = res.Data.WMInfoList
						wmlist.forEach( item => {
							console.log(item)
							let hasnum = 0, num = 0
							if (item.Spec) {
								tmp = JSON.parse(item.Spec)
								tmp.forEach( i => {
									if (i.hasnum && i.num) {
										hasnum += Number(i.hasnum)
										num += Number(i.num)
									}
								} )
							}
							item.hasnum = hasnum
							item.num = num
						})
						this.menuList = wmlist
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		watch:{
			// basketList: {
			// 	handler: function (newValue, oldValue) {
			// 		this.$store.commit('setOrderList', newValue);
			// 	},
			// 	deep: true
			// },
			sumMoney(newdata,olddata){
				this.$store.commit('setSumMoney', newdata);
			},
			cuteTagsum(newdata,olddata){
				this.$store.commit('setTagsum', newdata);
			}
		},
		onShow() {
			let tmp = this.$store.state.orderList;
			tmp = tmp.filter( item => {
				return item.storeId == this.storeId
			})
			if (tmp.length > 0) {
				this.basketList = tmp[0]
				this.sumMoney = this.basketList.price
				this.cuteTagsum = this.$store.state.tagsum
			} else {
				this.basketList = {
					storeId: this.storeId,
					price: this.sumMoney,
					shopContent: []
				}
				this.sumMoney = 0
			}
			this.cuteTagsum = this.$store.state.tagsum;
		},
		methods: {
			getArrDifference(arr1, arr2) {
				return arr1.concat(arr2).filter(function(v, i, arr) {
					return arr.indexOf(v) === arr.lastIndexOf(v);
				});
			},
			chooseGG(index, item) {
				let chooseGGobj = {
					title: item.title,
					index: index,
					price: item.price
				}
				this.chooseGGobj = chooseGGobj;

				let isFind = false
				isFind = this.basketList.shopContent.some((listItem, index) => {
					if (item.title == listItem.Tags.title) {
						if (typeof(listItem.Spec) == 'string') {
							listItem.Spec = JSON.parse(listItem.Spec);
						}
						var DItem = JSON.stringify(listItem);
						this.chooseGGItem = JSON.parse(DItem);
						this.showOption = true;
						return true
					}
				});

				if (!isFind) {
					this.showOption = false;
				}

			},
			toRecharge: function () {
				uni.navigateTo({
					url: '/pages/person/newRecharge?storeId=' + this.storeId
				})
			},
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
			submit() {
				getApp().globalData.buyNowList = {}
				if (Object.keys(this.$store.state.userInfo).length == 0) {
					uni.showModal({
						title: '需要登录',
						content: '为了保证信息的准确性，点餐需要您先登录再进行操作',
						showCancel: false,
						confirmText: '去登陆',
						success: res => {
							if (res.confirm) {
								if (this.basketList.shopContent.length > 0) {
									this.$store.commit('setOrderList', this.basketList);
									this.basketList.shopContent.forEach((item, index) => {
										item.selectCount = 0;
									})
									this.basketList.shopContent.length = 0;
									this.cuteTagsum = 0;
									this.sumMoney = 0;
								}
								uni.navigateTo({
									url: '/pages/common/login?isBack=back'
								})
							}
						}
					})
					return
				}
				if (this.basketList.shopContent.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请选择好商品再去结算'
					})
					return
				}
				this.$store.commit('setOrderList', this.basketList);
				uni.navigateTo({
					url: `/pages/shopDetail/submitOrder?storeId=${this.storeId}&deskNo=${this.deskNo}&scan=${this.scan}&storeName=${this.storeName}`
				})
			},
			enterStore: function () {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetailPage?StoreID=' + this.storeId
				})
			},
			bindRef() {
				const self = this
				let q = uni.createSelectorQuery();
				setTimeout(function() {
					q.select('#cart').boundingClientRect(data => {
						self.cartBasketRect = data
						self.showBottom = false;
						self.ishidden = false;
					}).exec();
				}, 100)
			},
			changeSort(index, wmSortID) {
				//菜品分类的切换
				this.sortIndex = index;
				this.menuList = []
				setTimeout(() => {
					this.menuList = this.storeMenuList.filter((item) => {
						if (item.WMSortID == wmSortID) {
							return item;
						}
					});
				}, 200);

			},
			goTosearch() {
				if (!this.searchText) {
					this.$api.msg('输入框不能为空')
					return
				}
				// 获取搜索到的item
				let searchItem = ''
				this.storeMenuList.some((item) => {
					if (item.WMInfoTitle.indexOf(this.searchText) >= 0) {
						searchItem = item;
						return true
					}
				});
				// 获取搜索到的 分类下标	
				this.sortList.some((item, index) => {
					if (item.TagName.wmSortID == searchItem.WMSortID) {
						this.sortIndex = index;
						return true
					}
				});
				// 更新menuList item
				this.menuList = []
				setTimeout(() => {
					this.menuList = this.storeMenuList.filter((item, index) => {
						if (item.WMSortID == this.sortList[this.sortIndex].TagName.wmSortID) {
							return item;
						}
					});

					let menuListIndex = 0; //在新坐标里的index
					this.menuList.some((item, index) => {
						if (item.WMInfoID == searchItem.WMInfoID) {
							menuListIndex = index + 1;
							return true
						}
					});

					//高度 222upx
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: menuListIndex * 111,
							duration: 100
						});
					}, 500);

				}, 200);
				//需要获取当前item在 更新的菜单里的index
			},
			addDish(e, dishItem) {
				if (this.isAnimation) {
					return
				}

				this.isAnimation = true;

				if (!this.basketList.shopContent) {
					this.basketList.storeId = this.storeId
					this.basketList.price = this.sumMoney
					this.basketList.shopContent = []
				}
				let isFind = false
				isFind = this.basketList.shopContent.some((item, index) => {
					if (item.WMInfoID == dishItem.WMInfoID) {
						item.selectCount++;
						return true
					}
				})

				if (!isFind) {
					dishItem.selectCount = 1
					this.basketList.shopContent = [...this.basketList.shopContent, dishItem]
				}

				this.sumMoney = this.$api.accAdd(this.sumMoney, dishItem.Price ? dishItem.Price : 0)
				this.basketList.price = this.sumMoney
				// this.sumMoney += dishItem.Price

				this.$refs.inCart.addToCart(e, dishItem.WMInfoID);
				this.cuteTagsum += 1;
				this.$store.commit('setOrderList', this.basketList)
				setTimeout(() => {
					this.isAnimation = false;
				}, 400);

			},
			retrunPicUrl(url) {
				if (url.indexOf(',') > 0) {
					return url.split(',')[0]
				} else if (url) {
					return url;
				} else {
					return 'http://img.huaxuapp.com/zwf112_03.png';
				}
			},
			addDishNone(dishItem) {
				//2333
				//没有动画的添加 ，代码有点冗余
				if (this.isAnimation) {
					return
				}
				this.isAnimation = true;
				let isFind = false
				isFind = this.basketList.shopContent.some((item, index) => {
					//这个操作是在购物车选择
					if (!this.chooseGGobj.title && dishItem.Tags.title && item.Tags.title == dishItem.Tags.title) {
						item.selectCount++;
						dishItem.selectCount = item.selectCount;
						return true
					}
					if (this.chooseGGobj.title && this.chooseGGobj.title == item.Tags.title) {
						//这个操作是在规格详情操作
						item.selectCount++;
						dishItem.selectCount = item.selectCount;
						return true
					}
					if (!this.chooseGGobj.title && !dishItem.Tags.title && item.WMInfoID == dishItem.WMInfoID) {
						item.selectCount++;
						return true
					}
				})
				if (!isFind) {
					if (this.chooseGGobj.title) {
						dishItem = this.chooseGGItem;
						dishItem.Tags = this.chooseGGobj;
						dishItem.selectCount = 1;
						var DItem = JSON.stringify(dishItem);
						this.basketList.shopContent = [...this.basketList.shopContent, JSON.parse(DItem)];
						this.showOption = true; //打开加减的操作	
					} else {
						dishItem.selectCount = 1;
						this.basketList.shopContent = [...this.basketList.shopContent, dishItem];
					}
				}

				if (this.chooseGGobj.title) {
					this.sumMoney = this.$api.accAdd(this.sumMoney, this.chooseGGobj.price ? this.chooseGGobj.price : 0);
				} else if (dishItem.Tags.title) {
					this.sumMoney = this.$api.accAdd(this.sumMoney, dishItem.Tags.price ? dishItem.Tags.price : 0);
				} else {
					this.sumMoney = this.$api.accAdd(this.sumMoney, dishItem.Price ? dishItem.Price : 0);
				}
				// this.sumMoney += dishItem.Price
				this.cuteTagsum += 1;

				this.basketList.price = this.sumMoney
				this.$store.commit('setOrderList', this.basketList)
				
				setTimeout(() => {
					this.isAnimation = false;
				}, 400);
			},
			subDish(dishItem) {
				if (this.cuteTagsum >= 0) {
					this.cuteTagsum -= 1;
					if (this.basketList.shopContent.length > 0) {
						let isFind = false
						isFind = this.basketList.shopContent.some((item, index) => {
							if (!this.chooseGGobj.title && item.Tags.title && item.Tags.title == dishItem.Tags.title) {
								item.selectCount--;
								dishItem.selectCount = item.selectCount;
								if (item.selectCount == 0) {
									this.showOption = false; //关闭加减的操作
									this.basketList.shopContent.splice(index, 1); //删除对象
								}
								return true
							}
							if (this.chooseGGobj.title && item.Tags.title && this.chooseGGobj.title == item.Tags.title) {
								//这个操作是在规格详情操作
								item.selectCount--;
								dishItem.selectCount = item.selectCount;
								if (item.selectCount == 0) {
									this.showOption = false; //关闭加减的操作
									this.basketList.shopContent.splice(index, 1)

								}
								return true
							}
							if (!this.chooseGGobj.title && !dishItem.Tags.title && item.WMInfoID == dishItem.WMInfoID) {
								item.selectCount--;
								if (item.selectCount == 0) {
									this.showOption = false; //关闭加减的操作
									this.basketList.shopContent.splice(index, 1)

								}
								return true
							}

						});

						if (this.basketList.shopContent.length <= 0) {
							this.popupShow = false
						}

						if (this.chooseGGobj.title) {
							this.sumMoney = this.$api.accSub(this.sumMoney, this.chooseGGobj.price ? this.chooseGGobj.price : 0);
						} else if (dishItem.Tags.title) {
							this.sumMoney = this.$api.accSub(this.sumMoney, dishItem.Tags.price ? dishItem.Tags.price : 0);
						} else {
							this.sumMoney = this.$api.accSub(this.sumMoney, dishItem.Price ? dishItem.Price : 0);
						}

						if (this.sumMoney <= 0) {
							this.sumMoney = 0;
						}
						this.basketList.price = this.sumMoney
						this.$store.commit('setOrderList', this.basketList)
						// this.sumMoney -= dishItem.Price
					}
				}
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current;

			},
			popup() {
				this.dishModel = false
				this.selectGGModel = false;
				this.chooseGGobj = {
					index: 0,
					title: '',
					price: ''
				}
				this.popupShow = !this.popupShow;
			},
			showDishModel(item) {
				this.dishModel = true;
				this.TJdishItem = item;
			},
			hideDishModel() {
				this.dishModel = false
			},
			hideTips() {
				this.cleanTips = false
			},
			hideGGModel() {
				this.selectGGModel = false;
				this.chooseGGobj = {
					index: 0,
					title: '',
					price: ''
				}
			},
			showTips() {
				this.cleanTips = true
			},
			handleClick5(e) {
				let index = e.index;
				if (index > 0) {
					this.basketList.shopContent.forEach((item, index) => {
						item.selectCount = 0;
					})

					this.basketList.shopContent.length = 0;
					this.cuteTagsum = 0;
					this.basketList.price = 0;
					this.sumMoney = 0
					this.$store.commit('clearOrderList')
					console.log('清除购物车', this.basketList);
					console.log('清除购物车 store', this.$store.state.orderList);
				}
				this.popup()
				this.hideTips()
			},
			toDetails(item) {
				this.$store.commit('setCurrentDetails', item);
				this.$store.commit('setOrderList', this.basketList);
				this.$store.commit('setSumMoney', this.sumMoney);
				this.$store.commit('setTagsum', this.cuteTagsum);
				uni.navigateTo({
					url: `/pages/shopDetail/orderFood/productDetails?productId=${item.WMInfoID}&storeId=${this.storeId}&storeName=${this.storeName}`
				})
			}
		},
		onPageScroll(e) {
			if (e.scrollTop >= 270) {
				this.isSticky = true;
			} else {
				this.isSticky = false;

			}
		},
		components: {
			tuiBottomPopup,
			tuiModal,
			tuiTag,
			centerModal,
			customModal,
			flyInCart
		}

	}
</script>
<style>
	page {
		background: #FFFFFF;
	}
</style>
<style scoped>
	@import "../../../colorui/animation.css";

	.tipsText {
		color: #999999;
		font-size: 28upx;
		white-space: nowrap;
		letter-spacing: 5upx;
		margin-top: 10upx;
	}

	.enter-store-btn {
		background-color: #f8cd18;
		padding: 20rpx 40rpx;
		border-radius: 100rpx;
		color: #FFFFFF;
		margin-top: 30rpx;
	}

	.tipsBg {
		width: 648upx;
		height: 376upx;
		background: url(https://img.huaxuapp.com/5cad7ab689e8b_03.png) no-repeat;
		background-size: cover;
	}

	.bottom-fixed .bottom-fixed-card .submit {
		width: 174upx;
		height: 68upx;
		border-radius: 10upx;
	}

	.bottom-fixed .bottom-fixed-card .gwl-relative .cuteTag {
		position: absolute;
		left: 50upx;
		top: 4upx;
		height: 40upx;
		width: 40upx;
		background: #f8cd18;
		border-radius: 50%;
		border: 2upx solid #FFFFFF;
	}

	.bottom-fixed .bottom-fixed-card .gwl-relative {
		position: relative;
	}

	.bottom-fixed .bottom-fixed-card .calculate .calculate-money {
		font-size: 49upx;
		line-height: 1em;
	}

	.bottom-fixed .bottom-fixed-card .calculate .calculate-symbol {
		margin-bottom: 5upx;
	}

	.bottom-fixed .bottom-fixed-card {
		height: 120upx;
		background: #444242;
		border-radius: 1000upx;
	}

	.bottom-fixed {
		position: fixed;
		width: 750rpx;
		color: #FFFFFF;
		bottom: 10px;
		z-index: 111111;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.to-home-btn {
		background: #444242;
		margin-left: 30rpx;
		border-radius: 50%;
		width: 120rpx;
		min-width: 120rpx;
		height: 120rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sub-Dish {
		font-size: 64upx;
		margin-top: 20upx;
		color: #8b95ae;
	}

	.add-Dish {
		font-size: 64upx;
		margin-top: 20upx;
		color: #f8cd18;
	}

	.menu-operate {
		height: 163upx;
		width: 180upx;
	}

	.menu-info .menu-info-money {
		font-size: 36upx;
		line-height: 1em;
	}
	
	.menu-info-sale-money {
		font-size: 24upx;
		color: #ccc;
		text-decoration: line-through;
		margin-right: 20rpx;
	}

	.menu-info .menu-info-desc {
		margin-top: 3upx;
		color: #de6503;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		height: 40upx;
		line-height: 32upx;
		width: 200upx;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden;
	}


	.menu-info .menu-info-title {
		font-size: 34upx;
		white-space: nowrap;
		width: 280upx;
	}

	.menu-info {
		height: 163upx;
		width: 300upx;
	}

	.menu-img {
		width: 163upx;
		height: 163upx;
		border-radius: 20upx;
	}

	.sticky-block {
		height: 98upx;
	}


	.all-bg-card {
		height: 300upx;
		border-bottom-right-radius: 45%;
		border-bottom-left-radius: 45%;
		position: relative;
	}

	.all-bg-card .sacn-card {
		background: #F8F8F8;
		border-radius: 5upx;
	}

	.all-bg-card .sacn-card .input-content {
		font-size: 28upx;
		color: #999999;
		width: 440upx;
	}

	.fixed-top {
		position: fixed;
		z-index: 99990;
	}


	.card-swiper {
		height: 460upx !important;
	}

	.card-swiper swiper-item {
		width: 610upx !important;
		left: 70upx;
		box-sizing: border-box;
		padding: 10upx 0upx 70upx;
		overflow: initial;
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 32upx;
		transform: scale(0.9);
		transition: all 0.2s ease-in 0s;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item {
		transform: none;
		transition: all 0.2s ease-in 0s;
	}


	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}

	::-webkit-scrollbar {
		display: none;
	}

	.nav .cu-item {
		height: 82upx;
		display: inline-block;
		line-height: 82upx;
		margin: 0 6upx;
		width: 168upx;
		border-radius: 10upx;
		text-align: center;
		font-size: 26upx;
	}

	.bottom-line {
		border-bottom: 0.7px solid #e4e4e4;
	}

	.bottom-line:last-child {
		border: 0px;
	}

	.bg-orderYellow {
		background: #f8cd18;
		color: #333333;
	}

	.tag-position {
		position: absolute;
		top: 0upx;
		right: 0upx;
		z-index: 2001;
	}

	.bg-lightGray {
		color: #333333;
		background: #e5e5e5;
	}

	.tui-modal-custom {
		text-align: center
	}



	.isHidden {
		opacity: 0;
	}

	.tui-tag-small {
		padding: 5px 7px;
		font-size: 12px;
		border-radius: 25px;
		display: inline-block;
		line-height: 12px;
		background: #ededed;
		color: #999;
	}

	.tui-popup-scroll {
		/* border: 1px solid #000000; */
		height: 236upx;
	}

	.flex-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.paddingb {
		padding: 40upx 0upx;
		padding-bottom: 60upx;
	}
	/* ? */
</style>
