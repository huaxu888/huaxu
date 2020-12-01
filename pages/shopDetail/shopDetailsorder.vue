<template>
	
	<view style="position: relative; background-color: #ffffff;padding-bottom: 150upx;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄优选 - 限时抢购</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">花蓄优选 - 限时抢购</block>
			<!-- #endif -->
		</cu-custom>
		
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		<view v-if="!showLoading">
			<image :src="inObj.Imgs" mode="scaleToFill" style="width: 750upx;height: 422upx;position: relative;">
				<view style="position: absolute;top: 190upx;right: 30upx; background-color: rgba(255,255,255,0.7);color: #f84d57;font-size: 26upx;line-height: 58upx; height: 58upx;text-align: center;border-radius: 50upx;padding: 0 20upx;">
					<text class="hxIcon-shoucang2" style="font-size: 28upx;"></text>
					<text style="margin-left: 10upx;font-size: 26upx;">{{inObj.LikeNum || 0}}</text>
					<text style="font-size: 24upx;">人喜欢</text>
				</view>
			</image>
			
			<view class="padding" style="padding-top: 22upx;padding-bottom: 22upx;">
				<view class="flex" style="justify-content: space-between;line-height: 50upx;height: 50upx;">
					<view>
						<text style="font-size: 46upx;color: #fe4e01;font-weight: 600;">{{changeMoney(inObj.DiscountedPrice)}}</text>
						<text style="font-size: 24upx;color: #fe4e01;">元</text>
						<text style="text-decoration:line-through;color: #999999;margin-left: 20upx;">{{changeMoney(inObj.OrderPrice)}}元</text>
					</view>
					<view>
						<text style="color: #999999;font-size: 24upx;">已售{{yiShou}}份</text>
					</view>
				</view>
				<view class="flex justify-between" style="margin-top: 18upx;">
					<view class="flex">
						<view style="border-radius: 10upx;width: 54upx;height: 30upx;line-height: 30upx;background-color: #333;color: #faf3d5;text-align: center;font-size: 20upx;">
							<text style=" ">黑卡</text>
						</view>
						<view style="font-size: 24upx;margin-left: 10upx;height: 30upx;line-height: 30upx;">
							<text >优惠10.00元</text>
						</view>
					</view>
					
					<view style="font-size: 24upx;color: #fe4e01;height: 30upx;line-height: 30upx;">
						<text>距结束剩{{showTime}}</text>
					</view>
				</view>
				<view class="flex justify-between" style="margin-top: 30upx;padding: 0 30upx;font-size: 20upx;color: #faf2ce;background: linear-gradient(to right, #353535, #636363);;width: 690upx;height: 60upx;border-radius: 10upx;line-height: 60upx;">
					<view>
						<text>加入花蓄黑卡会员，下单立减10.00元</text>
					</view>
					<view>
						<text style="margin-right: 10upx;">立即加入</text>
						<text class="hxIcon-rightArrow" style="font-size: 20upx;"></text>
					</view>
				</view>
				
				<view class="shengLv" style="font-size: 32upx;font-weight: 600;margin-top: 30upx;color: #000000;">
					<text>{{inObj.Title}}</text>
				</view>
				<!-- <view>
					仅剩{{inObj.TotalNum}} - {{inObj.GetNum}}
				</view> -->
			</view>
			
			<view class="flex padding-lr" style="font-size: 24upx;flex-wrap:wrap;">
				<view v-if="inObj.IsRefund"  class="flex align-center" style="height: 40upx;line-height: 40upx;margin-left: 20upx;margin-top: 6upx;">
					<!-- <text class="cuIcon-roundcheckfill" style="color: rgb(254, 217, 66);margin-right: 8upx;font-size:36upx;"></text> -->
					<image src="https://img.huaxuapp.com/gouxuan-01.png" mode="" style="width: 30upx;height: 30upx;"></image>
					<text style="margin-left:10upx;">可退款</text>
				</view>
				<view v-if="inObj.IsGive" style="height: 40upx;line-height: 40upx;margin-top: 6upx;" class="flex align-center">
					<!-- <text class="cuIcon-roundcheckfill" style="color: rgb(254, 217, 66);margin-right: 8upx;font-size:36upx;"></text> -->
					<image src="https://img.huaxuapp.com/gouxuan-01.png" mode="" style="width: 30upx;height: 30upx;margin-left: 20upx;"></image>
					<text style="margin-left:10upx;">可转赠</text>
				</view>
				<view v-if="inObj.IsLimit" style="height: 40upx;line-height: 40upx;margin-top: 6upx;" class="flex align-center">
					<!-- <text class="cuIcon-roundcheckfill" style="color: rgb(254, 217, 66);margin-right: 8upx;font-size:36upx;"></text> -->
					<image src="https://img.huaxuapp.com/gouxuan-01.png" mode="" style="width: 30upx;height: 30upx;margin-left: 20upx;"></image>
					<text style="margin-left:10upx;">不限购</text>
				</view>
				<view v-for="(items,is) in inObjs" :key="is" style="height: 40upx;line-height: 40upx;margin-top: 6upx;" class="flex align-center">
					<image src="https://img.huaxuapp.com/gouxuan-01.png" mode="" style="width: 30upx;height: 30upx;margin-left: 20upx;"></image>
					<text style="margin-left:10upx;">{{items}}</text>
				</view>
			</view>
			
			<view class="padding-lr margin-top" style="width: 100%;background-color: #FFFFFF;margin-top: 30upx;padding-bottom: 30upx;">
				<swiper style="height: 180upx;width: 100%" :indicator-dots="false" :circular="true" :autoplay="true" interval="6000"
				 duration="800">
					<swiper-item v-for="(item,centerSwiperIndex) in centerLBLlit" :key="centerSwiperIndex" @tap="goShop(item)">
						<image :src="item.Img" mode="scaleToFill" style="width: 100%; height: 180upx;border-radius: 15upx;"></image>
					</swiper-item>
				</swiper>
			</view>
			
			<view style="padding: 30upx;padding-top: 10upx;">
				<view style="padding: 30upx; width: 690upx;height: 344upx;border: 1upx solid #eeeeee;-moz-box-shadow:-4px 1px 20px #eeeeee; -webkit-box-shadow:-4px 1px 20px #eeeeee;
				box-shadow:-4px 1px 20px #eeeeee;border-radius: 10upx;">
					<view class="flex justify-between" style="margin-top: 30upx;border-bottom: 1upx solid #e4e4e4;padding-bottom: 40upx;">
						<view style="font-size: 24upx;" v-if="VisitCount > 0">
							<text style="color: #333333;">已参与</text>
							<view style="color: #333333;">{{VisitCount}}人</view>
						</view>
						<view v-if="VisitCount > 0">
							<image :src="touList[0] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 200upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 6;" mode=""></image>
							<image :src="touList[1] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 246upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 5;" mode=""></image>
							<image :src="touList[2] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 292upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 4;" mode=""></image>
							<image :src="touList[3] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 336upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 3;" mode=""></image>
							<image src="https://img.huaxuapp.com/slh.png" style="position: absolute;left: 382upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 1;" mode=""></image>
						</view>
						<view v-if="VisitCount == 0">
							<image :src="touList[0] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 100upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 6;" mode=""></image>
							<image :src="touList[1] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 146upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 5;" mode=""></image>
							<image :src="touList[2] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 192upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 4;" mode=""></image>
							<image :src="touList[3] || 'https://img.huaxuapp.com/huaxulogo1008.png'" style="position: absolute;left: 234upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 3;" mode=""></image>
							<image src="https://img.huaxuapp.com/slh.png" style="position: absolute;left: 280upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 1;" mode=""></image>
						</view>
						<view @tap="toShare" style="width: 200upx;height: 60upx;background-color: #fed942;line-height: 60upx;font-size: 24upx;text-align: center;color: #333333;border-radius: 50upx;">
							<text>邀请好友一起抢</text>
						</view>
					</view>
					
					<view class="flex justify-between" style="margin-top: 36upx;">
						<view class="flex">
							<view>
								<image src="https://img.huaxuapp.com/huaxuqun_03.png" style="width: 94upx;height: 94upx;" mode=""></image>
							</view>
							<view style="margin-left: 14upx;">
								<view style="margin-top: 4upx;">
									<text style="font-size: 30upx;color: #333333;">加入【花蓄优惠福利群】</text>
								</view>
								<view style="font-size: 24upx;color: #999999;margin-top: 10upx;">
									[微信红包]恭喜发财，大吉大利
								</view>
							</view>
						</view>
						<view>
							<form>
								<button @tap="showModals" data-target="Image"  type="primary" formType="submit" style="font-size: 24upx;width: 156upx;height: 60upx;background-color: #fe4e01;line-height: 60upx;text-align: center;color: #ffffff;border-radius: 10upx;margin-top: 16upx;">
									点我添加
								</button>
							</form>
						</view>
						<button class="cu-modal" open-type="contact" style="width: 750upx;" :class="modalName=='Image'?'show':''">
							<view class="cu-dialogs" style="width: 524upx;border-radius: 20upx;">
								<view class="bg-img" style="background-image: url('https://img.huaxuapp.com/quhuifu_05_03.png');height:534upx;width: 524upx;background-repeat: no-repeat;background-size: cover;">
									<view class="cu-bar justify-end text-white">
										<view class="action" @tap="hideModal"></view>
									</view>
								</view>
								<view  style="font-size: 26upx;position: absolute;bottom: 60upx;left: 80upx; border-radius: 50upx; width: 360upx;height: 70upx;color: #FFFFFF; background-color: #fe4e01;text-align: center;line-height: 70upx;">
									<text>去回复</text>
								</view>
							</view>
							<view class="cu-bar action margin-0 flex-sub  solid-left" style="position: absolute;bottom: 160upx;left: 320upx;z-index: 2;">
								<view @click.native.stop="hideModal">
									<text class="cuIcon-roundclosefill" style="font-size: 80upx;color: #ffffff;"></text>
								</view>
							</view>
						</button>
					</view>
				</view>
			</view>
			
			<!-- <view class="sss">
				<view style="text-align: center;font-size: 36upx;">
					<text>推荐活动</text>
				</view>
				
				<view class="flex" style="padding: 30upx;background-color: #FFFFFF;padding-top: 0;" v-for="(item,i) in tcList" :key="i"  v-if="tcList.length > 0" @tap="gotoDetil(item)">
					<view>
						<image :src="item.Logo" style="width: 180upx;height: 180upx;border-radius: 15upx;" mode=""></image>
					</view>
					<view style="position: relative;margin-left: 30upx;">
						<view style="width: 460upx;height: 70upx;">
							<text style="font-weight: 600;font-size: 28upx;">{{yinHangs(item.Title)}}</text>
						</view>
						<view style="margin-top: 20upx;">
							<text style="color: #999999;font-size: 24upx;">{{item.GetNum}}份已售</text>
						</view>
						<view style="margin-top: 16upx;">
							<text style="color: #fe4e01;font-size: 36upx;"><text style="font-size: 24upx;">￥</text>{{changeMoney(item.DiscountedPrice)}}</text>
							<text style="color: #999999;text-decoration:line-through;font-size: 24upx;margin-left: 10upx;">￥{{changeMoney(item.OrderPrice)}}</text>
						</view>
						<view style="position: absolute;text-align: center;line-height: 52upx;top: 130upx;right: 0upx;font-size: 24upx; color: #FFFFFF;width: 140upx;height: 52upx;border-radius: 10upx;background-color: #fe4e01;">
							<text>立即抢购</text>
						</view>
					</view>
				</view>
				
			</view> -->
			
			<view style="background-color: #FFFFFF;height: 20upx;">
				
			</view>
			
			<view style="height: 80upx;padding-top: 26upx;background-color: #FFFFFF;"  :class="isSticky?'fixed-top showS':'showD'" :style="{top:isSticky?CustomBar+'px':''}" >
				<view class="flex">
					<view :class="[current==0?'liss':'lis']" @tap="change(0)"><text>商家</text></view>
					<view :class="[current==1?'liss':'lis']" @tap="change(1)"><text>购买须知</text></view>
					<view :class="[current==2?'liss':'lis']" @tap="change(2)"><text>套餐详情</text></view>
					<view :class="[current==3?'liss':'lis']" @tap="change(3)"><text>商品详情</text></view>
				</view>
				<view class="flex">
					<view class="flex justify-center" style="flex: 1;"><view class="xian" :style="{transform:`translateX(${current * 188}rpx)`}"></view></view>
					<view class="flex justify-center" style="flex: 3;"></view>
				</view>
				<!-- <view class="flex" v-if="couponList.length == 0 && tcList.length == 0">
					<view class="flex justify-center" style="flex: 1;"><view class="xian" :style="{transform:`translateX(${1 * 188}rpx)`}"></view></view>
					<view class="flex justify-center" style="flex: 1;"></view>
				</view> -->
			</view>
			
			
			<view style="margin-top: 10upx;padding: 30upx;">
				<view class="flex justify-between" style="color: #202020;font-size: 36upx;font-weight: 600;" @tap="gotoShop(infoObject.StoreID)">{{infoObject.StoreName}}
					<view class="flex align-center" style="color: #666666;">
						<view class="" style="color: #808080;font-size: 26upx;margin-right: 10upx;font-weight: normal;">去逛逛</view>
						<text class="hxIcon-rightArrow" style="font-size: 24upx;font-weight: normal;"></text>
					</view>
				</view>
				<view style="font-size: 26upx;color: #808080;margin-top: 10upx;">店铺综合评分：<text>{{infoObject.StoreStart}}</text>分</view>
				<view style="font-size: 24upx;">
					<view class="flex" style="margin-top: 30upx;position: relative;">
						<view style="height: 50upx;line-height: 50upx;">
							<text class="hxIcon-shizhongnaolingjishixianshi" style="color: #333333;"></text>
							<text style="margin-left: 20upx;color: #333333;font-size: 26upx;">{{infoObject.StartWorkDate}} - {{infoObject.EndWorkDate}}</text>
							<text style="margin-left: 5upx;color: #333333;font-size: 26upx;">;</text>
							<text style="margin-left: 5upx;color: #333333;font-size: 26upx;"> {{infoObject.Phone}}</text>
							<view class="flex justify-center" @tap="callShop" style="border: 2upx solid #fe4e01;position: absolute;right: 0;top: 0;width: 120upx;height: 48upx;line-height: 48upx;border-radius: 30upx;background-color: #ffffff;">
								<view style="font-size: 36upx;color: #fe4e01;">
									<text  class="hxIcon-tel-s" style="font-size: 36upx;"></text>
								</view>
								<view style="font-size: 20upx;">
									<text style="color: #fe4e01;">拨打</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex" style="margin-top: 20upx;position: relative;" @tap="openMap">
						<view class="flex" >
							<text class="hxIcon-dianpu3" style="color: #333333;"></text>
							<view style="width: 440upx;margin-left: 20upx;">
								<text style="color: #333333;font-size: 26upx;">{{infoObject.StoreAddress}}</text>
							</view>
							<view class="flex justify-center" style="border: 2upx solid #fe4e01; position: absolute;right: 0;top: 0;width: 120upx;height: 48upx;line-height: 48upx;border-radius: 30upx;background-color: #ffffff;">
								<view style="font-size: 36upx;color: #fe4e01">
									<text  class="hxIcon-daohang" style="font-size: 36upx;"></text>
								</view>
								<view style="font-size: 20upx;">
									<text style="color: #fe4e01;">导航</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="text-align: center;font-size: 36upx;margin-top: 80upx;margin-bottom: 40upx;color: #000000;font-weight: 600;position: relative;" v-if="inObj.Notice">
				<text>购买须知</text>
				<image src="https://img.huaxuapp.com/dpxqtb_03.png" mode="" style="position: absolute;width: 216upx;height: 26upx;left: 268upx;top: 12upx;"></image>
			</view>
			<view class="buy" v-if="inObj.Notice" style="width: 750upx;">
				<image :src="item" mode="widthFix" style="width: 750upx;" v-for="(item,is) in Notices"  :key="is"></image>
			</view>
			
			<view  style="text-align: center;font-size: 36upx;margin-top: 80upx;margin-bottom: 40upx;color: #000000;font-weight: 600;position: relative;" v-if="inObj.Info">
				<text>套餐详情</text>
				<image src="https://img.huaxuapp.com/dpxqtb_03.png" mode="" style="position: absolute;width: 216upx;height: 26upx;left: 268upx;top: 12upx;"></image>
			</view>
			<view class="buyN" v-if="inObj.Info" style="width: 750upx;">
				<image :src="item" mode="widthFix" style="width: 750upx;" v-for="(item,id) in Infos" :key="id"></image>
			</view>
			
			<view style="text-align: center;font-size: 36upx;margin-top: 80upx;margin-bottom: 40upx;color: #000000;font-weight: 600;position: relative;" v-if="inObj.GoodsDetail">
				<text>商品详情</text>
				<image src="https://img.huaxuapp.com/dpxqtb_03.png" mode="" style="position: absolute;width: 216upx;height: 26upx;left: 268upx;top: 12upx;"></image>
			</view>
			<view class="shopDetil" v-if="inObj.GoodsDetail" style="width: 750upx;">
				<image :src="item" mode="widthFix"  style="width: 750upx;" v-if="inObj.GoodsDetail" v-for="(item,ip) in GoodsDetails" :key="ip" ></image>
			</view>
			
			<!-- <view>
				{{Info}}
			</view> -->
			
			
			<view>
				<phone-buttom :infoObject="infoObject" :goToPerstoreFlag="goToPerstoreFlag" :goToprestoreFlag="goToprestoreFlag" :tcId=tcId
				 @beCollection="beCollectionHandle" :collectionFlags="collectionFlags" @share="share" @gotoReservation="gotoReservation" style="z-index: 99;">
				</phone-buttom>
			</view>
			
			<!-- <view v-if="showModal">
				<hai-bao :showModal="showModal" :infoObj="infoObject" @hidden="hiddenModal" :imgUrl="imgUrl" @success="success"
				 @shareWx="shareWx" @downLoadImage="downLoadImage"></hai-bao>
			</view> -->
			
			<view class="">
				
				<u-popup mode="center" v-model="show" >
					<image :src="imgUrl" mode="scaleToFill" style="width:450upx;height:800upx;">
						
					</image>
				</u-popup>
				<u-popup mode="bottom" v-model="show" border-radius="40" height="300upx" :mask="false" :safe-area-inset-bottom="true">
					<view class="flex justify-around algin-center" style="margin-top: 50upx;">
						<view>
							<button class="share-btn" open-type="share" style="border: none;background-color: rgba(0,0,0,0);outline: none;padding: 0;">
								<view style="width: 100upx;height: 100upx;border-radius: 50upx;background-color: #eeeeee;" class="flex align-center justify-center">
									<view style="font-size: 56upx;" class="hxIcon-wechat"></view>
								</view>
								<view style="font-size: 26upx;font-weight: normal;color: #333333;">分享好友</view>
							</button>
						</view>
						<view @tap="downLoadImage">
							<button class="share-btn" style="border: none;background-color: rgba(0,0,0,0);outline: none;padding: 0;">
								<view style="width: 100upx;height: 100upx;border-radius: 50upx;background-color: #eeeeee;" class="flex align-center justify-center">
									<view style="font-size: 56upx;" class="hxIcon-download"></view>
								</view>
								<view style="font-size: 26upx;font-weight: normal;color: #333333;">保存海报</view>
							</button>
						</view>
					</view>
				</u-popup>
			</view>
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
	import phoneButtom from './components/phoneAndfixeds'
	import shopSwiper from './components/shopDetSwper'
	import htmlParser from '@/common/html-parser'
	import ShopCart from '@/common/ShopCart.js' 
	let userScData = {}
	export default {
		mixins: [shopDetailMixins],
		data() {
			return {
				tcId: 0,
				inObj: {},
				showTime: '',
				VisitCount: 0,
				touList:[],
				showModal: false,
				infoObject: {},
				imgUrl: 'https://img.huaxuapp.com/moneypig666.gif',
				centerLBLlit:[],
				tcList:[],
				goToPerstoreFlag: true,
				goToprestoreFlag: true,
				collectionFlags: true, //是否收藏
				modalName: null,
				GoodsDetails:[],
				Infos:[],
				Notices:[],
				CustomBar:this.CustomBar,
				current: 0,
				isSticky: false,
				scrollTop:0,
				gao:0,
				buys:0,
				buyN:0,
				shopDetil:0,
				inObjs:[],
				yiShou:0,
				storeId:'',
				show: false,
				userID:'',
				showLoading:true
			}
		},
		
		onShow() {
			if(this.tjrid) {
				this.$http.tcShare(this.tjrid,this.$store.state.userInfo.ID,this.tcId).then(res => {
					console.log(res);
				})
			}
			
			this.$http.cxShoucang(this.$store.state.userInfo.ID, this.tcId).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.collectionFlags = false
				} else {
					this.collectionFlags = true
				}
			})
		},
		onReady() {
			
		},
		onLoad(option) {
			
			console.log(option);
			this.tcId = option.tcID
			this.storeId = option.storeId
			if (option.tjrid) {
				this.tjrid = option.tjrid
				
			} else {
				this.tjrid = 0
			}
			
			
			this.$http.cxShoucang(this.$store.state.userInfo.ID, option.tcId).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.collectionFlags = false
				} else {
					this.collectionFlags = true
				}
			})
			
			this.$http.tcXq(this.tcId).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.infoObject = res.SetDataMeal
					this.inObj = res.SetDataMeal
					this.timeago((this.beTime(this.inObj.EndDate)))
					this.yiShou = res.SetDataMeal.GetNum
					this.Notices = res.SetDataMeal.Notice.split(",")
					this.Infos = res.SetDataMeal.Info.split(",")
					this.GoodsDetails = res.SetDataMeal.GoodsDetail.split(",")
					console.log(res.SetMealTags[0]);
					if(res.SetMealTags[0]){
						this.inObjs = this.qieHuan(res.SetMealTags[0].TagName)
					} else {
						this.inObjs = []
					}
				}
				this.showLoading = false
			})
			
			this.getCenterLBLlit()
			
			this.$http.shopDetils(option.tcID).then(res => {
				console.log(res);
				this.VisitCount = res.VisitCount
				
				res.Date.forEach((item,i) => {
					this.touList[i] = item.HeadPic
				})
				
			})
			this.userID = this.$store.state.userInfo.ID
			// this.$http.shangjia(option.storeId, this.$store.state.userInfo.ID)
			// 	.then(res => {
			// 		console.log(res);
			// 		this.infoObject = res
			// 	})
				
			this.current = 0
			
		},
		onPullDownRefresh() {
			
		},
		onReady() {
			this.scrollToBottom()
		},
		onPageScroll: function(Object) {
			this.scrollTop = Object.scrollTop;
			console.log(this.scrollTop);
			if (Object.scrollTop >= 740) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
			
			setTimeout(() => {
				this.scrollToBottom()
				
				if(this.buys > 0) {
					if(this.scrollTop > 820){
						this.current = 1
						if(this.scrollTop >= 820 + 84 + this.buys){
							this.current = 2
							if(this.scrollTop >= 820 + 84 + 84 + this.buys + this.buyN){
								this.current = 3
							}
						}
					} else {
						this.current = 0
					}
				}
			}, 100)
		},
		methods: {
			goShop(e){
				console.log(e);
				this.$http.tcXq(e.SetMealID).then(res => {
					if(res.IsSuccess){
						uni.navigateTo({
							url:'/pages/shopDetail/shopDetailsorder?storeId=' + res.SetDataMeal.StoreID + '&tcID=' + e.SetMealID
						})
					} else {
						return
					}
				})
			},
			qieHuan(item){
				if(item.split('，').length <= 1){
					return item.split(',')
				} else {
					return item.split('，')
				}
				
			},
			gotoShop(e){
				uni.redirectTo({
					url:'/pages/shopDetail/shopDetailPage?StoreID=' + e
				})
			},
			yinHangs(bankNumber){
				if(bankNumber.length > 30){
					return bankNumber.substr(0,30)+"...";
				} else {
					return bankNumber;
				}
			},
			scrollToBottom(){
				let that = this
				let info = uni.createSelectorQuery().select(".buy");
				info.boundingClientRect(function(data) { //data - 各种参数
					that.buys = data.height
					console.log(that.buys);
				}).exec()
				
				let infos = uni.createSelectorQuery().select(".buyN");
				infos.boundingClientRect(function(data) { //data - 各种参数
					that.buyN = data.height
				}).exec()
				
				let infoss = uni.createSelectorQuery().select(".shopDetil");
				infos.boundingClientRect(function(data) { //data - 各种参数
					that.shopDetil = data.height
				}).exec()
				console.log(this.buys);
			},
			change(index) {
				this.current = index;
				console.log(index);
				if(index == 0){
					uni.pageScrollTo({
					    scrollTop: 720,
					    duration: 200
					});
				}
				if(index == 1){
					uni.pageScrollTo({
					    scrollTop: 821,
					    duration: 200
					});
				}
				
				if(index == 2){
					let a = 821 + 84 + this.buys
					uni.pageScrollTo({
					    scrollTop: a,
					    duration: 200
					});
				}
				
				if(index == 3){
					let a = 821 + 84 + 84 + this.buys + this.buyN
					uni.pageScrollTo({
					    scrollTop: a,
					    duration: 200
					});
				}
			},
			showModals(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
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
			},
			beCollectionHandle(flag) {
				if (this.$store.state.hasLogin) {
					this.$http.userLove(this.$store.state.userInfo.ID,this.tcId).then(res => {
						if (res.IsSuccess) {
							this.collectionFlags = !this.collectionFlags //取消收藏
							this.$api.msg(res.Msg, 1000, false, 'success')
						}
					})
				} else {
					this.$api.msg('请先登录', 1500)
				}
			},
			callShop() {
				
				uni.makePhoneCall({
					phoneNumber: this.infoObject.Phone
				})
			},
			openMap() {
				this.$api.openMap(this.infoObject)
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
				if (this.$store.state.hasLogin) {
					let success = true
					let data = {
						stroreid: this.storeId,
						userid: this.$store.state.userInfo.ID,
						setmealid: this.tcId
					}
			
					let res = await this.$Request.get(this.$store.state.getHbUrls, data)
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
			toShare() {
				this.show = true
				this.showModal = true
				this.share()
			},
			async getCenterLBLlit() {
				await this.$http.tjtcList(2).then(res => {
					console.log('轮播图', res);
					if (res.IsSuccess) {
						this.centerLBLlit = res.Data;
					}
				});
			},
			beTime(time){
				var date = new Date((time.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			},
			timeago(time){
				console.log(time);
				var  tagDate = new Date(time);
				
				console.log(tagDate);
				// 获取目标跟 1970.1.1 的时间差
				var  tagGetTime = tagDate.getTime();
				var timeGoFun = ()=>{
					var  now = new Date();
					var  disTime = Math.abs( tagGetTime - now.getTime());
					
					if( disTime===0 ){
						this.showTime = '时间到~！'
						clearInterval(myset);
						return false;
					}
					var disTime = Math.floor( disTime/1000 );  // 把毫秒，转为秒
					var miao =  disTime % 60 ;  // 秒
					var fen = Math.floor( disTime / 60 % 60 );  // 分
					var xiaoshi = Math.floor( disTime / 60 / 60  ) % 24;  // 小时
					var tian = Math.floor( disTime / 60 / 60 / 24 );  // 天
					this.showTime = `${tian}天${xiaoshi}时${fen}分${miao}秒`
				};
			 
			   var myset =  setInterval(()=>{
					timeGoFun();
				},1000);
				
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
		},
		components: {
			shopSwiper,
			phoneButtom,
			uniPopup,
			wmPoster,
			haiBao
		},
		onShareAppMessage() {
			console.log(this.storeId);
			console.log(this.tcId);
			console.log(this.userID);
			return {
				title:this.inObj.Title,
				path:'/pages/shopDetail/shopDetailsorder?storeId=' + this.storeId + '&tcID=' + this.tcId + '&tjrid=' + this.userID,
				imageUrl:this.inObj.Imgs,
				success: function (shareTickets) {
					this.$api.msg('转发成功')
					console.log(res + '成功')
				},
				fail: function (res) {
					this.$api.msg('转发失败，请重试')
					console.log(res + '失败')
				}
			}
		}
	}
</script>



<style>
	page {
		background-color: #ffffff;
	}
</style>

<style scoped>
	.cu-dialogs {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		border-radius: 10upx;
		overflow: hidden;
	}
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 999;
	}
	
	.lis {
		flex: 1;
		text-align: center;
		font-size: 28upx;
	}
	
	.liss {
		flex: 1;
		text-align: center;
		font-size: 28upx;
		font-weight: 600;
	}
	
	.xian {
		margin-top: 12upx;
		width: 45upx;
		height: 8upx;
		background-color: rgb(254, 78, 1);
		transform: translateX(0);
		transition: transform .3s ease-in-out; 
	}
	
	.xians {
		width: 40upx;
		height: 26upx;
		background-color: rgb(255, 255, 255);
	}
	
	.showS {
		display: block;
	}
	
	.showD {
		display: none;
	}
	
	.shengLv {
		color: #333333;
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
	
	.share-btn::after {
		border: none;
	}
</style>
