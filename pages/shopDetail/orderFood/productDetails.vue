<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				商品详情
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<!--header-->

		<!--banner-->
		<view class="tui-banner-swiper">
			<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{height:scrollH + 'px'}" @change="bannerChange">
				<block v-for="(item,index) in banner" :key="index">
					<swiper-item :data-index="index" @tap.stop="previewImage">
						<image :src="item" class="tui-slide-image" :style="{height:scrollH+'px'}" />
					</swiper-item>
				</block>
			</swiper>
			<!-- <tui-tag type="translucent" shape="circleLeft" size="small" style="position: absolute;color: #fff;bottom: 30rpx;right: 0;">{{bannerIndex+1}}/{{banner.length}}</tui-tag> -->
		</view>

		<!--banner-->

		<view class="tui-pro-detail">
			<view class="tui-product-title" style="border-radius: 0 0 15upx 15upx;">
				
				<view class="tui-pro-titbox">
					<view class="tui-pro-title" style="font-weight: 600;font-size: 32upx;">{{WMInfo.WMInfoTitle}}</view>
				
					<view style="color: #8D5B20;position: absolute;right: 0; top: 0upx; margin-right: 20upx;padding-left: 30upx;border-left: 1px solid #dedede;text-align: center;" >
						<text style="color: red;">{{chakan}}</text>
						<view style="color: #999999;font-size: 24upx;">浏览人数</view>
					</view>
					
					
					<!-- #ifdef APP-PLUS -->
						<view class="tui-share-btn tui-share-position" @tap="share" >
							<tui-tag type="gray" tui-tag-class="tui-tag-share tui-size" shape="circleLeft" size="small" style="margin: 0;margin-right:0;">
								<view class="tui-icon tui-icon-partake" style="color:#999;font-size:30upx;color: red;"></view>
								<text class="tui-share-text tui-gray" style="font-size: 28upx;color: red;font-weight:600;">分享</text>
							</tui-tag>
						</view>
						<!-- #endif -->
					
						<!-- #ifndef APP-PLUS -->
						<button open-type="share" plain="false" class="tui-share-btn tui-share-position" style="border: none;">
							<tui-tag type="gray" tui-tag-class="tui-tag-share tui-size" shape="circleLeft" size="small" style="margin-right:0;">
								<view class="tui-icon tui-icon-partake" style="color:#999;font-size:30upx;color: red;"></view>
								<!-- <tui-icon name="partake" color="#999" size="15"></tui-icon> -->
								<text class="tui-share-text tui-gray" style="font-size: 28upx;color: red;font-weight:600;">分享</text>
							</tui-tag>
						</button>
					<!-- #endif -->
					
					
					
				</view>
				
				<view class="tui-padding" style="width: 85%;">
					<view class="tui-sub-title tui-size tui-gray" style="padding-top: 8upx;">{{WMInfo.WMinfoDesc}}</view>
				</view>

				<view class="tui-pro-pricebox tui-padding">
					<view class="tui-pro-price" >
						<!-- <view>￥<text class="tui-price">{{prePrice}}</text>{{subPrice}}</view> -->
						
						<view class="tui-popup-price">
							<view class="tui-amount tui-bold"  style="font-size: 50upx;"><text style="font-size: 24upx;">￥</text>{{currentPrice ? currentPrice : WMInfo.Price}}</view>
						</view>
						<view class="tui-popup-price" style="text-decoration:line-through; color: #999999;" v-if="SalePrice != null">
							<view class="tui-amount tui-bold" style="color: #999999;margin-left: 8upx;" ><text style="font-size: 24upx;">￥</text>{{SalePrice}}</view>
						</view>
						<!-- <tui-tag size="small" :plain="true" type="high-green" shape="circle">新品</tui-tag> -->
					</view>
				</view>
				
				
				<!-- 限量 -->
				<view class="flex" style="margin-left: 30upx;font-size: 24upx;" v-if="SalePrice != null">
					<view style="color: #999999;letter-spacing:3upx;">剩余<text>{{shengyu || 0}}件</text></view>
					<!-- <view>限量<text style="color: #C39053;">{{xianliang}}</text></view> -->
					<view style="color: #999999;margin:0 8upx;">|</view>
					<view  style="color: #999999;letter-spacing:3upx;">已售<text>{{xianliang - shengyu || 0}}件</text></view>
				</view>
				
				<view class="flex" style="margin-left: 30upx;font-size: 24upx;" v-else>
					<view  style="color: #999999;letter-spacing:3upx;">剩余<text>{{shengyus || 0}}件</text></view>
					<!-- <view>限量<text style="color: #C39053;">{{xianliang}}</text></view> -->
					<view style="color: #999999;margin:0 8upx;">|</view>
					<view style="color: #999999;letter-spacing:3upx;">已售<text>{{xianliangs - shengyus || 0}}件</text></view>
				</view>
			</view>

			<view class="tui-basic-info tui-mtop"  style="border-radius: 15upx">
				<view class="tui-list-cell" @tap="showPopup">
					<view class="tui-bold tui-cell-title">规格</view>
					<view class="tui-selected-box">{{currentSelect}}</view>
					<tui-icon name="more-fill" :size="20" class="tui-right" color="#666"></tui-icon>
				</view>
			</view>

			<view class="tui-cmt-box tui-mtop"  style="border-radius: 15upx">
				<view class="tui-list-cell tui-last tui-between">
					<view class="tui-bold tui-cell-title">评价</view>
					<view @tap="common">
						<view class="tui-icon tui-icon-more-fill" style="color:#666; font-size: 20px;"></view>
					</view>
				</view>

				<view class="tui-cmt-content tui-padding">
					<view class="tui-cmt">暂无评论</view>
				</view>
			</view>

			<view class="tui-nomore-box">
				<tui-nomore text="宝贝详情" :visible="true" bgcolor="#f7f7f7" margin="0.5" style="font-size: 30upx;"></tui-nomore>
			</view>
			<rich-text :nodes="htmlNodes"></rich-text>
			<tui-nomore text="我是有底线的" :visible="true" bgcolor="#f7f7f7"></tui-nomore>
			<view class="tui-safearea-bottom"></view>
		</view>

		<!--底部操作栏-->

		<view class="padding-lr bottom-fixed">
			
			<view class="flex align-center justify-between   bottom-fixed-rightCard" v-show="!WMInfo.IsSpecial && !WMInfo.IsSyPoint">
				<view class="flex justify-center align-center gwl-relative" @click="popup">
					<text id="cart" class="hxIcon-gwl gwl" style="font-size: 68upx;"></text>
					<view class="flex align-center justify-center cuteTag" v-if="basketList.shopContent.length>0">
						<text class="text-black" style="font-size: 24upx;">{{sunmSelectCount}}</text>
					</view>

					<view class="flex align-end justify-start margin-left-sm margin-left-lg calculate">
						<text lass="text-df calculate-symbol">&yen;</text>
						<text class="margin-left-xs calculate-money">{{basketList.price || 0}}</text>
					</view>
				</view>

				<view class="flex">
					<view class="flex align-center justify-center bg-orderYellow submit" @tap="submit">
						<text>加入购物车</text>
					</view>
				</view>
			</view>
			
			<view class="margin-left-sm bg-orderRed submit" @tap="buyNowHandle">
				<text>{{ WMInfo.IsSyPoint ? '立即兑换' : '立即购买' }}</text> 
			</view>
		</view>

		<tui-modal :show="cleanTips" @click="handleClick5" @cancel="hideTips" content="是否清空购物车" color="#333" :size="32" shape="circle"
		 :button="tipBotton"></tui-modal>

		<tui-bottom-popup :show="gwlModel" @close="popupgwl">
			<view class="padding bg-order-yellow" style="border-top-right-radius:30upx;border-top-left-radius: 30upx; ">
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

				<scroll-view scroll-y :scroll-with-animation="true" style="height: 560upx; margin-bottom: 110upx;">
					<view class="flex align-center justify-between padding-sm bg-white margin-tb-sm-big gwl-card" v-for="(item,index) of basketList.shopContent"
					 :key="index" style="border-radius: 20upx; margin-top: 0;">
						<view class="flex align-center justify-center ">
							<image :src="retrunPicUrl(item.PicUrl || 'default')" style="width:130upx; height: 130upx;border-radius: 10upx;"></image>
							<view class="flex align-start justify-between flex-direction margin-left" style="height: 130upx;width: 300upx;">
								<view class="flex align-start justify-center flex-direction">
									<text class="text-black text-cut" style="font-size: 28upx;white-space: nowrap;width: 280upx;">{{item.WMInfoTitle}}</text>
									<text class="text-sm" style="margin-top: 5upx;line-height: 25upx; color: #de6503;-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;height: 50upx;">{{item.Tags.title?item.Tags.title:item.WMinfoDesc}}</text>
								</view>
								<view class="flex align-end justify-start" style="margin-top: 5upx;">
									<text class="text-sm text-black text-bold">&yen;</text> <text class=" text-black text-bold" style="font-size: 32upx;line-height: 1em;margin-left: 5upx;">{{item.Tags.price?item.Tags.price:item.Price}}</text>
								</view>
							</view>
						</view>
						<view class="flex align-center justify-end " style="height: 130upx;width: 180upx;">
							<text class="hxIcon-orderSub sub-Dish" v-if="item.selectCount>0" @tap="subDish(item)"></text>
							<text class="margin-lr-xs" style="font-size: 36upx;margin-top:20upx ;" v-if="item.selectCount>0">{{item.selectCount}}</text>
							<text class="hxIcon-orderAdd " style="font-size: 64upx;margin-top:20upx;color: #f8cd18;" @tap="addDish(item)"></text>
						</view>
					</view>
				</scroll-view>
			</view>
		</tui-bottom-popup>

		<!--底部选择层-->
		<tui-bottom-popup :show="popupShow" @close="hidePopup" bgcolor="#FFFFFF" :zIndex="222222">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding">
					<image :src="banner[0]" class="tui-popup-img"></image>
					<view class="tui-popup-price">
						<view class="tui-amount tui-bold">￥{{currentPrice ? currentPrice : WMInfo.Price}}</view>
						<view class="tui-number">{{WMInfo.WMInfoTitle}}</view>
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<view class="tui-scrollview-box">

						<view class="tui-bold tui-attr-title" v-if="specifications.length>0">规格</view>
						<view class="tui-attr-box">
							<view class="tui-attr-item" :class="selectGGid == index ? 'tui-attr-active' :'' " @tap="toSelectGGid(index,item)"
							 v-for="(item,index) in specifications" :key="index">
								{{item.title}}
							</view>
						</view>

						<view class="tui-number-box tui-bold tui-attr-title">
							<view class="tui-attr-title">数量</view>
							<tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox>
						</view>

					</view>
				</scroll-view>
				<view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
					<view class="tui-flex-1">
						<tui-button type="red" shape="circle" size="mini" @click="submitGG" displayStyle="block">确定</tui-button>
					</view>
				</view>
				<view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>
			</view>
		</tui-bottom-popup>
		<!--底部选择层-->

	</view>
</template>

<script>
	import tuiIcon from "@/components/productComponets/icon/icon"
	import tuiTag from "@/components/productComponets/tag/tag"
	import tuiBadge from "@/components/productComponets/badge/badge"
	import tuiNomore from "@/components/productComponets/nomore/nomore"
	import tuiButton from "@/components/productComponets/button/button"
	import tuiTopDropdown from "@/components/productComponets/top-dropdown/top-dropdown"
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiNumberbox from "@/components/productComponets/numberbox/numberbox"
	import tuiModal from "@/components/modal-change/modal" //魔改后的model
	import htmlParser from '@/common/html-parser'
	import ShopCart from '@/common/ShopCart.js'
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiBadge,
			tuiNomore,
			tuiButton,
			tuiTopDropdown,
			tuiBottomPopup,
			tuiNumberbox,
			tuiModal
		},
		data() {
			return {
				SalePrice:null,
				Price:'',
				shengyu:'',
				xianliang:'',
				shengyus:'',
				xianliangs:'',
				chakan:'',
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				storeId: 0,
				currentSelect: '请选择规格和数量',
				selectGGid: -1, //选择规格的ID
				specifications: [],
				// detail:[],
				gwlChooseGG: false, //用来判断控制是否为购物篮出发的选择规格
				banner: [],
				bannerIndex: 0,
				menuShow: false,
				popupShow: false,
				cleanTips: false,
				gwlModel: false,
				value: 1, //商品数量
				WMInfo: '', //外卖信息
				currentPrice: '',
				prePrice: '',
				subPrice: '',
				orderList: [], //购物车数组
				sunmSelectCount: this.$store.state.tagsum, //总共选了多少   
				sumMoney: this.$store.state.sumMoney,
				basketList: {},
				productItem: this.$store.state.currentDetails,
				tipBotton: [{
					text: "否",
					type: 'gray'
				}, {
					text: "是",
					type: 'yellow'
				}],
				tjrid:'',
				htmlNodes: [],
				buyNowList: {},
				buyNow: false,
				storeName: ''
			}
		},
		watch:{
			// basketList(newList,oldList){
			// 	this.$store.commit('setOrderList', newList);
			// },
			sumMoney(newdata,olddata){
				this.$store.commit('setSumMoney', newdata);
			},
			sunmSelectCount(newdata,olddata){
				this.$store.commit('setTagsum', newdata);
			}
		},
		onLoad: async function(options) {
			let _this = this;
			// 看的人数
			uni.request({
				url:'https://newsapp.huaxuapp.com/api/wm/goodinfo?WMInfoID= '+ options.productId,
				success(e) {
					
					uni.request({
						url:'https://newsapp.huaxuapp.com/api/wm/goodinfo?WMInfoID= '+ e.data.Data.WMInfoID,
						success(a) {
							_this.chakan = a.data.Data.ReadCount;
							var ccc = JSON.parse(e.data.Data.Spec);

							let sum = 0;
							let sums = 0;
							ccc.forEach( item => {
								sum += Number(item.num)
								sums += Number(item.hasnum)
							})
							
							_this.shengyus = sums;
							_this.xianliangs = sum;

						}
					});
				}
			});
			
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif

			await setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
						this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
						this.scrollH = res.windowWidth
					}
				})
			}, 50);
			
			if(options.tjrid){
				this.tjrid = options.tjrid;
			}
			this.storeName = options.storeName
			if(options.storeId) {
				this.storeId = options.storeId
				let tmp = this.$store.state.orderList;
				tmp = tmp.filter( item => {
					return item.storeId == this.storeId
				})
				if (tmp.length > 0) {
					this.basketList = tmp[0]
					this.sumMoney = this.basketList.price
				} else {
					this.basketList = {
						storeId: this.storeId,
						price: this.sumMoney,
						shopContent: []
					}
				}
				this.buyNowList = {
					storeId: this.storeId,
					price: 0,
					shopContent: [],
					IsSpecial: false,
					AssignStoreID: 0,
					SortInStore: ''
				}
			}
			await this.getDetailByid(options.productId);
			//遍历计算金额
			// this.$store.state.orderList.forEach((item, index) => {
			// 	this.sunmSelectCount = this.$api.accAdd(this.sunmSelectCount, item.selectCount);
			// 	if (item.Tags.title) {
			// 		this.sumMoney = this.$api.accAdd(this.$api.accMul(item.selectCount, item.Tags.price), this.sumMoney);
			// 	} else {
			// 		this.sumMoney = this.$api.accAdd(this.$api.accMul(item.selectCount, item.Price), this.sumMoney);
			// 	}
			// })
		},
		methods: {
			async getDetailByid(productId) {
				await this.$http.getDetailByid(productId).then(res => {
					if (res.IsSuccess) {
						this.WMInfo = res.Data;
						this.banner = this.WMInfo.PicUrl.split(',');
						if (this.WMInfo.Spec) {
							this.specifications = JSON.parse(this.WMInfo.Spec);
							let newList = this.specifications.sort(this.compare("price", true));
							this.currentPrice = this.$api.formatAmount(newList[0].price) + " - " + this.$api.formatAmount(newList[newList
								.length - 1].price);
							let formatMoney = this.$api.formatAmount(newList[0].price)
							this.prePrice = formatMoney.substring(0, formatMoney.indexOf('.'));
							let subPrice = formatMoney.substr(formatMoney.indexOf('.'), 3);
							this.subPrice =   subPrice + '-' +this.$api.formatAmount(newList[newList.length - 1].price);
						} else {
							let price = this.WMInfo.Price;
							if (price) {
								let formatMoney = this.$api.formatAmount(price);
								this.prePrice = formatMoney.substring(0, formatMoney.indexOf('.'));
								this.subPrice = formatMoney.substr(formatMoney.indexOf('.'), 3);
							}
						}
						var richtext = this.WMInfo.Info; //取出富文本字符串
						const regex = new RegExp('<img', 'gi'); //找到找对img标签
						richtext = richtext.replace(regex, `<img style="max-width: 100%;"`) //正则替换
						this.htmlNodes = htmlParser(richtext);

					}
				}).catch(err => {

				});

			},
			backhome() {
				uni.navigateTo({
					url: '/pages/shopDetail/orderFood/newOrderFood?storeId=' + ' 3187 ' + ' &storeName=' + '花蓄体验馆' + '&needRes=true&isHaveGoods=true&onlyShow=true&entrance=shop',
				})
				
			},
			backhomes() {
				uni.navigateTo({
					url:'/pages/shopDetail/orderFood/newOrderFood?storeId=' + ' 3180 ' + ' &storeName=' + '花蓄商城' + '&needRes=true&isHaveGoods=true&type=pay'
				})
			},
			// tipCall() {
			// 	if(!this.hasLogin()){
			// 		return
			// 	};
			// 	this.$api.showModal({
			// 		title: '商家电话',
			// 		content: '400-6688-352',
			// 		confirmText: '我知道了',
			// 		confirmColor: "#333333",
			// 		cancelColor: '#f34e2d',
			// 		cancelText: '拨打电话',
			// 		showCancel: true
			// 	}).then(res => {
			// 		if (!res) {
			// 			uni.makePhoneCall({
			// 				phoneNumber: this.WMInfo.Phone
			// 			})
			// 		}
			// 	});
			// },
			toSelectGGid: function(ggid, item) {

				this.selectGGid = ggid;
				this.currentSelect = item.title;
				this.currentPrice = item.price;
				
				
				let _this = this;
				uni.request({
					url:'https://newsapp.huaxuapp.com/api/wm/goodinfo?WMInfoID= '+ this.WMInfo.WMInfoID,
					success(e) {
						
						let bbb = JSON.parse(e.data.Data.Spec)
						
						_this.SalePrice = bbb[ggid].saleprice;
						_this.Price = bbb[ggid].price;
						
						_this.shengyu = bbb[ggid].hasnum
						_this.xianliang = bbb[ggid].num

					}
				});
			},
			submitGG: function() {

				if (this.specifications.length > 0 && this.currentSelect.includes('请选择')) {
					this.$api.msg('请选择规格')
					this.hidePopup()
					return
				}
				
				if (this.productItem.Spec && this.selectGGid == -1) {
					//选择了规格 ，关闭
					this.$api.msg("请选择规格");
				}
				//需要解决提示框的层级问题
				this.popupShow = false;
				// if (this.gwlChooseGG) {
				// 	this.submit();
				// }
				if (this.buyNow) {
					this.buyNowList.shopContent = []
					this.buyNowList.IsSpecial = this.WMInfo.IsSpecial
					this.buyNowList.IsSyPoint = this.WMInfo.IsSyPoint
					this.buyNowList.AssignStoreID = this.WMInfo.AssignStoreID
					this.buyNowList.SortInStore = this.WMInfo.SortInStore
					this.productItem.selectCount = this.value
					if (this.specifications.length > 0) {
						this.productItem.Tags = this.specifications[this.selectGGid]
						this.buyNowList.price = this.$api.accMul(this.value, this.productItem.Tags.price)
						this.buyNowList.shopContent.push(this.productItem)
					} else {
						this.buyNowList.price = this.$api.accMul(this.value, this.productItem.Price)
						this.buyNowList.shopContent.push(this.productItem)
					}
					getApp().globalData.buyNowList = this.buyNowList
					uni.navigateTo({
						url: `/pages/shopDetail/submitOrder?storeId=${this.storeId}&storeName=${this.storeName}`
					})
				} else {
					this.submit()
				}
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				})
			},
			retrunPicUrl: function(url) {
				if (!url) {
					return 'http://img.huaxuapp.com/zwf112_03.png';
				}
				// let url = geturl;
				if (url.indexOf(',') > 0) {
					return url.split(',')[0]
				} else if (url) {
					return url;
				} else {
					return 'http://img.huaxuapp.com/zwf112_03.png';
				}
			},
			back: function() {
				uni.navigateBack()
			},
			buyNowHandle: function () {
				if ( !this.hasLogin() ) return
				this.buyNow = true
				this.showPopup()
			},
			subDish: function(dishItem) {

				if (dishItem.Spec) {
					//有规格
					console.log("有规格");
					this.basketList.shopContent.some((item, index) => {
						if (item.Tags.title == dishItem.Tags.title) {
							item.selectCount--;
							this.sunmSelectCount--;
							this.sumMoney = this.$api.accSub(this.sumMoney, dishItem.Tags.price ? dishItem.Tags.price : 0);
							if (item.selectCount == 0) {
								this.basketList.shopContent.splice(index, 1); //删除对象
							}
							if(this.sunmSelectCount==0){
								this.gwlModel=false;
								this.basketList.shopContent.length = 0;
								this.sumMoney = 0;
							}
							return true
						}
					});

				} else {
					console.log("无规格");
					this.basketList.shopContent.some((item, index) => {
						if (item.WMInfoID == dishItem.WMInfoID) {
							item.selectCount--;
							this.sunmSelectCount--;
							this.sumMoney = this.$api.accSub(this.sumMoney, dishItem.Price ? dishItem.Price : 0);
							if (item.selectCount == 0) {
								this.basketList.shopContent.splice(index, 1); //删除对象
							}
							if(this.sunmSelectCount==0){
								this.gwlModel=false;
								this.basketList.shopContent.length = 0;
								this.sumMoney = 0;
							}
							return true
						}
					});

				}
				this.$store.commit('setOrderList', this.basketList)
			},
			handleClick5: function(e) {
				let index = e.index;
				if (index > 0) {
					this.basketList.shopContent.forEach((item, index) => {
						item.selectCount = 0;
					})

					this.basketList.shopContent.length = 0; //清除数组
					this.sunmSelectCount = 0;
					this.basketList.price = 0;
					this.sumMoney = 0
					this.gwlModel = false;
					this.$store.commit('clearOrderList')
				}
				this.popup();
				this.hideTips();
			},
			openMenu: function() {
				this.menuShow = true
			},
			closeMenu: function() {
				this.menuShow = false
			},
			showPopup: function() {
				this.gwlChooseGG = false;
				this.popupShow = true
			},
			hidePopup: function() {
				this.popupShow = false;
			},
			popupgwl: function() {
				//关闭购物篮
				this.gwlModel = false;
			},
			showTips: function() {
				this.cleanTips = true
			},
			hideTips: function() {
				this.cleanTips = false
			},
			popup: function() {
				if (this.basketList.shopContent.length > 0) {
					this.gwlModel = !this.gwlModel;
				}
			},
			change: function(e) {
				this.value = e.value
			},
			// collecting: function() {
			// 	this.collected = !this.collected
			// },
			common: function() {
				// this.tui.toast("功能开发中~")
			},
			compare: function(property, desc) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					if (desc == true) {
						// 升序排列
						return value1 - value2;
					} else {
						// 降序排列
						return value2 - value1;
					}
				}
			},
			addDish: function(dishItem) {
				//找这个标题一致的，
				//如果找到了，那么就增加他的count
				console.log(dishItem);
				return
				if (dishItem.Spec) {
					//有规格
					//找规格相同的 进行count++
					this.basketList.shopContent.some((item, index) => {
						if (item.Tags.title == dishItem.Tags.title) {
							item.selectCount++;
							this.sunmSelectCount ++;
							this.sumMoney = this.$api.accAdd(dishItem.Tags.price ? dishItem.Tags.price : 0,this.sumMoney);
							return true
						}
					});

				} else {
					//找id相同的count++
					this.basketList.shopContent.some((item, index) => {
						if (item.WMInfoID == dishItem.WMInfoID) {
							item.selectCount++;
							this.sunmSelectCount ++;
							this.sumMoney = this.$api.accAdd( dishItem.Price ? dishItem.Price : 0, this.sumMoney);
							return true
						}
					});
				}
				this.basketList.price = this.sumMoney
				this.$store.commit('setOrderList', this.basketList)
			},
			submit: function() {

				if(!this.hasLogin()){
					return
				}
				
				/**
				 * 	有规格却没有选择规格，直接加入购物车，提示用户去选择规格
				 */
				if (this.specifications.length > 0 && this.currentSelect.includes('请选择')) {
					this.$api.msg('请选择规格')
					setTimeout( () => {
						this.showPopup()
					}, 1000)
					return
				}
				
				//如果选择了规格 那么就找有没有东西
				if (!this.productItem.Spec ||  (this.productItem.Spec && this.selectGGid >= 0)  ) {
					let isFind = false
					if (this.basketList.shopContent.length > 0) {
						//如果有东西的话 ，那就找
						isFind = this.basketList.shopContent.some((item, index) => {
							if (this.specifications.length > 0) {
								if (item.Tags.title == this.specifications[this.selectGGid].title) {
									item.selectCount = this.$api.accAdd(item.selectCount, this.value);
									this.sunmSelectCount = this.$api.accAdd(this.sunmSelectCount, this.value);
									this.sumMoney = this.$api.accAdd(this.sumMoney, this.$api.accMul(item.Tags.price, this.value));
									return true;
								}

							} else {
								if (item.WMInfoID == this.productItem.WMInfoID) {
									item.selectCount = this.$api.accAdd(item.selectCount, this.value);
									this.sunmSelectCount = this.$api.accAdd(this.sunmSelectCount, this.value);
									this.sumMoney = this.$api.accAdd(this.$api.accMul(this.value, item.Price), this.sumMoney);
									return true;
								}
							}


						});
					}


					if (!isFind) {
						//如果没有找到商品的话就执行添加
						this.productItem.selectCount = this.value;
						if (this.specifications.length > 0) {
							//如果这个商品有规格的话，那么久需要把规格加入到tags里然后 加入数组，
							this.productItem.Tags = this.specifications[this.selectGGid];
							this.sumMoney = this.$api.accAdd(this.$api.accMul(this.value,this.productItem.Tags.price), this.sumMoney);
							var DItem = JSON.stringify(this.productItem);
							this.basketList.shopContent = [...this.basketList.shopContent, JSON.parse(DItem)];
						
						} else {
							//如果这个商品没有规格我们把tags清空（可以有这个步骤），然后加入数组
							this.productItem.Tags = '';
							this.sumMoney=this.$api.accAdd(this.$api.accMul(this.value, this.productItem.Price), this.sumMoney);
							this.basketList.shopContent = [...this.basketList.shopContent, this.productItem];
						}
						
						this.sunmSelectCount = this.$api.accAdd(this.sunmSelectCount, this.value);

					}
				} else {
					//没有选择规格那么就是直接弹出，让用户选择规格
					// this.popupShow = false;
					// this.gwlChooseGG = true;
					this.showPopup()
						//选择了规格 ，关闭
					this.$api.msg("请选择规格");
				}
				this.basketList.price = this.sumMoney
				this.$store.commit('setOrderList', this.basketList)

			},
			share() {
				if(!this.hasLogin()){
					return
				};
				uni.share({
					provider: 'weixin',
					scene: "WXSceneSession",
					type: 5,
					imageUrl: this.banner[0],
					title: '我有个好东西要分享给你',
					miniProgram: {
						id: 'gh_adfa4ed99a42',
						path: 'pages/shopDetail/orderFood/productDetails?id=' + this.WMInfo.WMInfoID,
						type: 1,
						webUrl: ''
					},
					success: ret => {
						console.log(JSON.stringify(ret));
					}
				});
			},
			hasLogin(){
				if (!this.$store.state.userInfo.ID) {
					this.$api.msg("请先登录");
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/common/login?tjrid='+this.tjrid
						})
					}, 800);
					return  false
				}else{
					return true
				}
			}
			

		},
		onShareAppMessage(e) {
			return {
				title:"我有一个东西要分享给你",
				imageUrl:this.banner[0],
				path:`/pages/shopDetail/orderFood/productDetails?productId=${this.WMInfo.WMInfoID}&tjrid=${this.$store.state.userInfo.ID}`,
				success: () => {
					this.$api.msg("分享成功");
				}
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		}
	}
</script>
<style scoped>
	/* icon 也可以使用组件*/
	@import "./style/icon.css";

	page {
		background: #f7f7f7;
	}

	uni-button:after {
		border: none;
	}

	uni-view,
	uni-scroll-view,
	uni-swiper,
	uni-button,
	uni-input,
	uni-textarea,
	uni-label,
	uni-navigator,
	uni-image {
		box-sizing: content-box;
	}

	.container {
		padding-bottom: 110upx;
	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
	}



	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20upx;
	}

	.tui-icon {
		border-radius: 16px;
	}


	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}

	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}

	.tui-banner-swiper {
		position: relative;
	}

	.tui-banner-swiper .tui-tag-class {
		position: absolute;
		color: #fff;
		bottom: 30upx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/

	.tui-menu-box {
		box-sizing: border-box;
	}

	.tui-menu-header {
		font-size: 34upx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}

	.tui-top-dropdown {
		z-index: 9999 !important;
	}

	.tui-menu-itembox {
		color: #fff;
		padding: 40upx 10upx 0 10upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26upx;
	}

	.tui-menu-item {
		width: 22%;
		height: 160upx;
		border-radius: 24upx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}

	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.tui-badge-box {
		position: relative;
	}

	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}

	.tui-msg-badge {
		top: -10px;
	}

	.tui-icon-up {
		position: relative;
		display: inline-block;
		left: 50%;
		transform: translateX(-50%);
	}

	.tui-menu-text {
		padding-top: 12upx;
	}

	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}

	/*顶部菜单*/

	/*内容 部分*/

	.tui-padding {
		padding: 0 30upx;
		box-sizing: border-box;
	}

	/* #ifdef H5 */
	.tui-ptop {
		padding-top: 44px;
	}

	/* #endif */

	.tui-size {
		font-size: 24upx;
	}

	.tui-gray {
		color: #999;
	}

	.tui-icon-red {
		color: #ff201f;
	}

	.tui-border-radius {
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
	}

	.tui-radius-all {
		border-radius: 24upx;
		overflow: hidden;
	}

	.tui-mtop {
		margin-top: 26upx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding: 30upx 0;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36upx;
		font-weight: bold;
		line-height: 44upx;
	}

	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-pro-price .tui-tag-class {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24upx;
		font-weight: normal;
	}

	.tui-price {
		font-size: 58upx;
	}

	.tui-original-price {
		font-size: 26upx;
		line-height: 26upx;
		padding: 10upx 30upx;
		box-sizing: border-box;
	}

	.tui-line-through {
		text-decoration: line-through;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 44upx;
	}

	.tui-scale {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24upx;
		font-weight: normal;
	}

	.tui-icon-collection {
		line-height: 20px !important;
		margin-bottom: 0 !important;

	}

	.tui-pro-titbox {
		font-size: 32upx;
		font-weight: 500;
		position: relative;
		padding: 0 150upx 0 30upx;
		box-sizing: border-box;
	}

	.tui-share-btn {
		display: block;
		background: none;
		margin: 0;
		padding: 0;
		border-radius: 0;
	}

	.tui-tag-share {
		display: flex;
		align-items: center;
	}

	.tui-share-position {
		position: absolute;
		right: 0;
		top: 100upx;
	}

	.tui-share-text {
		padding-left: 8upx;
	}

	.tui-sub-title {
		padding: 20upx 0;
	}

	.tui-sale-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30upx;
	}

	.tui-discount-box {
		background: #fff;
	}

	.tui-list-cell {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26upx;
		line-height: 26upx;
		padding: 36upx 30upx;
		box-sizing: border-box;
	}

	.tui-right {
		position: absolute;
		right: 30upx;
		top: 30upx;
	}

	.tui-top40 {
		top: 40upx !important;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126upx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-tag-coupon-box {
		display: flex;
		align-items: center;
	}

	.tui-tag-coupon-box .tui-tag-class {
		margin-right: 20upx;
	}


	.tui-cell-title {
		width: 66upx;
		padding-right: 30upx;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.tui-promotion-box {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 10upx 0;
		width: 74%;
	}

	.tui-promotion-box .tui-tag-class {
		display: inline-block !important;
		transform: scale(0.8);
		transform-origin: 0 center;
	}

	/* .tui-inline-block {
		display: inline-block !important;
		transform: scale(0.8);
		transform-origin: 0 center;
	} */

	.tui-basic-info {
		background: #fff;
	}

	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10upx;
		line-height: 34upx;
	}

	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20upx 30upx 30upx 30upx;
		font-size: 24upx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 30upx;
		padding-top: 10upx;
	}

	.tui-pl {
		padding-left: 4upx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt-all {
		color: #ff201f;
		padding-right: 8upx;
	}

	.tui-cmt-content {
		font-size: 26upx;
		/* 	display: flex;
		justify-content: center;
		align-items: center; */
	}

	.tui-cmt-user {
		display: flex;
		align-items: center;
	}

	.tui-acatar {
		width: 60upx;
		height: 60upx;
		border-radius: 30upx;
		display: block;
		margin-right: 16upx;
	}

	.tui-cmt {
		padding: 25upx 0 35upx 0;
	}

	.tui-attr {
		font-size: 24upx;
		color: #999;
		padding: 6upx 0;
	}

	.tui-cmt-btn {
		padding: 50upx 0 30upx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-tag-cmt {
		min-width: 130upx;
		padding: 20upx 52upx !important;
		font-size: 26upx !important;
		display: inline-block;
	}

	.tui-nomore-box {
		padding-top: 10upx;
	}

	.tui-product-img {
		transform: translateZ(0);
	}

	.tui-product-img image {
		width: 100%;
		display: block;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100upx;
		/* box-sizing: border-box; */
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
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

	.tui-operation-text {
		font-size: 22upx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100upx;
		/* box-sizing: border-box; */
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-btnbox-4 .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28upx !important;
	}

	.tui-operation .tui-badge-class {
		position: absolute;
		top: -6upx;
		/* #ifdef H5 */
		transform: translateX(50%)
			/* #endif  */
	}

	.tui-flex-1 {
		flex: 1;
	}

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-class {
		border-top-left-radius: 24upx;
		border-top-right-radius: 24upx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30upx 0 100upx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28upx !important;
	}

	.tui-icon-close {
		position: absolute;
		top: 30upx;
		right: 30upx;
	}

	.tui-product-box {
		display: flex;
		/* align-items: flex-end; */
		font-size: 24upx;
		padding-bottom: 30upx;
	}

	.tui-popup-img {
		height: 200upx;
		width: 200upx;
		border-radius: 24upx;
		display: block;
		margin-right: 16upx;
	}

	.tui-popup-price {
		padding-bottom: 8upx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36upx;
	}

	.tui-number {
		margin-left: 6upx;
		font-size: 32upx;
		font-weight: bold;
		line-height: 24upx;
		padding-top: 20upx;
		color: #333;
	}

	.tui-popup-scroll {
		height: 600upx;
		font-size: 26upx;
	}

	.tui-scrollview-box {
		padding: 0 30upx 60upx 30upx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10upx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20upx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200upx;
		height: 64upx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26upx;
		box-sizing: border-box;
		border-radius: 32upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		font-size: 26upx;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		position: relative;
	}

	.tui-attr-active::after {
		content: "";
		position: absolute;
		border: 1upx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40upx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 30upx 0;
		box-sizing: border-box;
	}

	/*底部选择弹层*/

	.bg-orderYellow {
		background: #5d5d5d;
		color: #FFFFFF;
	}
	
	.bg-orderRed {
		background: linear-gradient(to right, #fa7142, #f34e2d);
		color: #FFFFFF;
		padding: 0 30upx;
		border-radius: 100upx;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bottom-fixed .bottom-fixed-rightCard .submit {
		border-radius: 100rpx;
		padding: 0 15rpx;
		height: 90rpx;
		display: flex;
		justify-content: flex-end;
	}


	.bottom-fixed .bottom-fixed-rightCard .gwl-relative .cuteTag {
		position: absolute;
		left: 50upx;
		top: 4upx;
		height: 40upx;
		width: 40upx;
		background: #f8cd18;
		border-radius: 50%;
		border: 2upx solid #FFFFFF;
	}

	.bottom-fixed .bottom-fixed-rightCard .gwl-relative {
		position: relative;
	}

	.bottom-fixed .bottom-fixed-rightCard .calculate .calculate-money {
		font-size: 49upx;
		line-height: 1em;
	}

	.bottom-fixed .bottom-fixed-rightCard .calculate .calculate-symbol {
		margin-bottom: 5upx;
	}

	.bottom-fixed .bottom-fixed-rightCard {
		flex: 3;
		height: 90upx;
		padding-left: 40upx;
		background: #444242;
		border-radius: 100rpx;
	}

	.bottom-fixed .bottom-fixed-leftCard {
		background: #444242;
		height: 90upx;
		margin-right: 8upx;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		border-radius: 200upx 20upx 20upx 200upx;
	}


	.bottom-fixed .bottom-fixed-leftCard .phone-iconStyle {
		font-size: 48upx;
		margin-left: 16upx;
	}

	.bottom-fixed .bottom-fixed-leftCard .text {
		font-size: 26upx;
		margin-left: 16upx;
		margin-bottom: 6px;
	}

	.bottom-fixed {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		color: #FFFFFF;
		bottom: 10px;
		z-index: 111111;
	}

	.sub-Dish {
		font-size: 64upx;
		margin-top: 20upx;
		color: #8b95ae;
	}
</style>
