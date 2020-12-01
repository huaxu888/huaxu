<template>
	<view :class="showAnm?'animate':''" style="position: relative;">
		
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
			<block slot="content">花蓄</block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="shop_detail " v-if="!showLoading">

			<!-- #ifdef MP-WEIXIN -->
			<!-- <view class="text-lg back_btn flex justify-center align-center" @tap="back">
				<text class="cuIcon-back text-white" style="font-size: 45upx;"></text>
			</view> -->
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="scrollTop < 600" class="animate flex align-center justify-center flex-direction fenxiang">
				<button open-type="share" class="no-btn">
					<text class="hxIcon-xinbaniconshangchuan-"  style="color: #FFFFFF; font-size: 44upx;line-height: 1.3em;"></text>
				</button>
			</view>
			
			<view v-if="scrollTop > 600" class="animate flex align-center justify-center flex-direction fenxiangs">
				<button open-type="share" class="no-btn">
					<text class="hxIcon-xinbaniconshangchuan-"  style="color: #FFFFFF; font-size: 44upx;line-height: 1.3em;"></text>
				</button>
			</view>
			<!-- #endif -->


			<view  v-if="scrollTop > 600" @tap="backtop" class="flex align-center justify-center flex-direction huiqu">
				<text class="cuIcon-top"  style="color: #FFFFFF; font-size: 44upx;line-height: 1.3em;"></text>
			</view>

			
			<view class="swiper_">
				<shop-swiper :indicator-dots="false" :swiperList="swiperList" @share="share"></shop-swiper>
			</view>
			
			<view style="background-color: #ffffff;">
				<view class="title_ padding bg-white" style="position: relative;bottom:0upx;">
					<view style="margin-top: 10upx;">
						<view class="" style="color: #202020;font-size: 40upx;font-weight: 600;">{{chuli(infoObject.StoreName)}}</view>
						<view style="font-size: 26upx;color: #808080;margin-top: 10upx;">店铺综合评分：<text>{{infoObject.StoreStart}}</text>分</view>
						<!-- <view class="zk flex  align-center justify-center" style="position: absolute;right: 30upx;top: 50upx;" v-if="defaultDiscount != 1 || infoObject.IsZK">
							<view class="zkBgi"></view>
							<view style="font-size: 24upx;">
								<view class="text-orange">
									<text>{{infoObject.IsZK ? infoObject.zk * 10000 / 1000 : defaultDiscount * 10 }}折</text> 
								</view>
							</view>
						</view> -->
						<view class="zk flex  align-center justify-center" style="position: absolute;right: 30upx;top: 50upx;">
							<view class="hxIcon-xihuancopy" style="font-size: 42upx;color: #fe4e01;margin-right: 20upx;"></view>
							<view style="font-size: 24upx;">
								<view class="text-orange">
									<text>{{infoObject.ReadCount}}喜欢</text> 
								</view>
							</view>
						</view>
						<view style="font-size: 24upx;">
						<!-- <view class="flex" style="margin-top: 40upx;">
								<view style="margin-top: 0upx;color: #333333;">
									<text class="hxIcon-shizhongnaolingjishixianshi"></text>
								</view>
								<view style="width: 440upx;margin-left: 20upx;margin-top: 4upx;color: #333333;">
									<text>{{infoObject.StartWorkDate}} - {{infoObject.EndWorkDate}}</text>
								</view>
								<view class="flex justify-center" style="margin-left: 100upx;width: 112upx;height: 48upx;line-height: 48upx;text-align: center; border-radius: 30upx;background-color: #eeeeee;" @tap="callShop">
									<text  class="hxIcon-tel-s" style="color: #000000;font-size: 36upx;"></text>
									<view style="font-size: 20upx;">
										<text style="color: #808080;">拨打</text>
									</view>
								</view>
							</view>
							
							<view class="flex" style="margin-top: 20upx;" @tap="openMap">
								<text class="hxIcon-dianpu3" style="color: #333333;"></text>
								<view style="width: 440upx;margin-left: 20upx;color: #333333;">
									<text>{{infoObject.StoreAddress}}</text>
								</view>
								<view style="margin-left: 100upx; width: 112upx;height: 48upx;line-height: 48upx;text-align: center; border-radius: 30upx;background-color: #eeeeee;" >
									<text class="hxIcon-daohang" style="color: #000000;"><text style="font-size: 20upx;color: #808080;">导航</text></text>
								</view>
							</view> -->
							<view class="flex" style="margin-top: 30upx;position: relative;">
								<view style="height: 50upx;line-height: 50upx;">
									<text class="hxIcon-shizhongnaolingjishixianshi" style="color: #333333;"></text>
									<text style="margin-left: 20upx;color: #333333;font-size: 26upx;">{{infoObject.StartWorkDate}} - {{infoObject.EndWorkDate}}</text>
									<text style="margin-left: 5upx;color: #333333;font-size: 26upx;">;</text>
									<text style="margin-left: 5upx;color: #333333;font-size: 26upx;"> {{infoObject.Phone}}</text>
									<view class="flex justify-center  "  @tap="callShop" style="position: absolute;right: 0;top: 0;width: 112upx;height: 48upx;line-height: 48upx;border-radius: 30upx;background-color: #eeeeee;">
										<view style="font-size: 36upx;color: #000000;">
											<text  class="hxIcon-tel-s" style="font-size: 36upx;"></text>
										</view>
										<view style="font-size: 20upx;">
											<text style="color: #808080;">拨打</text>
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
									<view class="flex justify-center" style="position: absolute;right: 0;top: 0;width: 112upx;height: 48upx;line-height: 48upx;border-radius: 30upx;background-color: #eeeeee;">
										<view style="font-size: 36upx;color: #000000;">
											<text  class="hxIcon-daohang" style="font-size: 36upx;"></text>
										</view>
										<view style="font-size: 20upx;">
											<text style="color: #808080;">导航</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<view style="background-color: #FFFFFF;padding-top: 40upx;height: 230upx;"  v-if="cLeng > 0">
						<scroll-view class="scroll-view_H" scroll-x="true" :scroll-with-animation="true" style="margin-left: 0;border-radius: 10upx;" v-if="cLeng > 0">
							<view style="padding-right: 0upx;" :style="{width:cLeng * 300 + 40 +'upx'}">
								<view class="yin" style="height: 260upx;":style="{width:cLeng * 300 + 40 + 'upx'}">
									<view class="scroll-view-item_H"  v-for="(baoPin,index) in baoPin" :key="index" style="margin: 0 8upx;" @tap="yuLan">
										<view style="position: relative;width: 302upx;height: 212upx;">
											<image :src="baoPin" mode="" style="width: 302upx;height: 212upx;border-radius: 5upx;">
											</image>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<!-- <view style="height: 240upx;" v-else>
							<image src="https://img.huaxuapp.com/zwtp_03.png" style="width: 302upx;height: 212upx;border-radius: 5upx;" mode=""></image>
						</view> -->
					</view>
					
					<!-- <view style="padding: 30upx; width: 690upx;height: 344upx;border: 1upx solid #eeeeee;-moz-box-shadow:-4px 1px 20px #eeeeee; -webkit-box-shadow:-4px 1px 20px #eeeeee; 
					box-shadow:-4px 1px 20px #eeeeee;border-radius: 10upx;">
						<view class="flex justify-between" style="margin-top: 30upx;border-bottom: 1upx solid #e4e4e4;padding-bottom: 40upx;">
							<view style="font-size: 24upx;">
								<text style="color: #333333;">已参与</text>
								<view style="color: #333333;">{{VisitCount}}人</view>
							</view>
							<view >
								<image :src="touList[0]" style="position: absolute;left: 200upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 6;" mode=""></image>
								<image :src="touList[1]" style="position: absolute;left: 246upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 5;" mode=""></image>
								<image :src="touList[2]" style="position: absolute;left: 292upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 4;" mode=""></image>
								<image :src="touList[3]" style="position: absolute;left: 336upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 3;" mode=""></image>
								<image v-if="touList.length >= 4" src="https://img.huaxuapp.com/slh.png" style="position: absolute;left: 382upx; width: 60upx;height: 60upx;border-radius: 60upx;z-index: 1;" mode=""></image>
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
					</view> -->
					
					<!-- 花蓄超市入口 -->
					<!-- <view v-if="showRecharge">
						<view v-if="getData.StoreID != 3180">
							<image src="https://img.huaxuapp.com/ptyhcz_03.gif" class="imgs" @tap="toRecharge"></image>
						</view>
						<view v-else>
							<image src="https://img.huaxuapp.com/hxgfcz_03.gif" class="imgs" @tap="toRecharge"></image>
						</view>
					</view> -->

					<!-- <view class="map_ margin-top  flex justify-between align-center">

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
					</view> -->
				</view>

				<view style="position: relative;background-color: #FFFFFF;" class="">
					<!-- <view style="height: 80upx;padding-top: 26upx;background-color: #FFFFFF;"   >
						<view class="flex">
							<view :class="[current==0?'liss':'lis']" @tap="change(0)" v-if="couponList.length > 0 || tcList.length > 0"><text>店内活动</text></view>
							<view :class="[current==1?'liss':'lis']" @tap="change(1)"><text>店铺详情</text></view>
						</view>
						
						<view class="flex" :class="isSticky?'':'fixed-tops'"  v-if="couponList.length > 0 || tcList.length > 0">
							<view class="flex justify-center" style="flex: 1;"><view class="xian" :style="{transform:`translateX(${current * 375}rpx)`}"></view></view>
							<view class="flex justify-center" style="flex: 1;"></view>
						</view>
						<view class="flex" :class="isSticky?'':'fixed-tops'" v-if="couponList.length == 0 && tcList.length == 0">
							<view class="flex justify-center" style="flex: 1;"><view class="xian" :style="{transform:`translateX(${1 * 188}rpx)`}"></view></view>
							<view class="flex justify-center" style="flex: 1;"></view>
						</view>
					</view> -->
					
					<!-- <view class="flex align-center" style="padding: 30upx;background-color: #FFFFFF;padding-top: 40upx;padding-bottom: 0;">
						<view style="width: 30upx;height: 30upx;color: #ffffff;font-size: 22upx;background-color: #fe4e01;line-height: 30upx;text-align: center;">
							<text>买</text>
						</view>
						<text style="margin-left: 10upx;font-weight: 600;font-size: 26upx;">买单</text>
						<text  v-if="defaultDiscount != 1 || infoObject.IsZK" style="margin-left: 20upx;font-size: 26upx;color: #fe4e01;">{{infoObject.IsZK ? infoObject.zk * 10000 / 1000 : defaultDiscount * 10 }}折</text>
					</view>
					<view class="padding" style="font-size: 26upx;color: #333333;background-color: #ffffff;position: relative;">
						<text>手机买单更便捷</text>
						<view style="position: absolute;text-align: center;line-height: 52upx;top: 130upx;top: 20upx; right: 60upx;font-size: 24upx; color: #FFFFFF;width: 140upx;height: 52upx;border-radius: 10upx;background-color: #fe4e01;">
							<text>消费买单</text>
						</view>
					</view> -->
					
					
					<view class="flex align-center" style="margin-top: 20upx;padding: 30upx;background-color: #FFFFFF;padding-bottom: 0;padding-left: 0;padding-top: 40upx;" v-if="couponList.length > 0">
						<!-- <view style="width: 30upx;height: 30upx;color: #ffffff;font-size: 22upx;background-color: #febf3b;line-height: 30upx;text-align: center;">
							<text>券</text>
						</view> -->
						<text style="margin-left: 30upx;font-weight: 600;font-size: 26upx;color: #010101;font-size: 40upx;">抢代金券</text>
					</view>
					<view class="" style="background-color: #ffffff;padding-left: 30upx;padding-right: 30upx;" v-if="couponList.length > 0">
						<view class="coupon-item" v-for="(item, index) in couponList" :key="index" style="padding-top: 20upx;">
							<view style="margin-top: 12upx;">
								<view style="background-image: url(https://img.huaxuapp.com/690-216qq.png);
								background-repeat: no-repeat;width: 690upx;height: 216upx;background-size: cover;padding: 30upx 30upx;padding-top: 20upx; position: relative;">
									<view>
										<text style="font-weight: 600;font-size: 36upx;">
											{{yinHang(daiJin[index])}}
										</text>
									</view>
									<view style="margin-top: 18upx;">
										<text style="font-size: 24upx;">{{item.Info}}<text style="margin:  0 10upx;">|</text>不可叠加</text>
									</view>
									<view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 1">
										<text style="color: rgb(254, 78, 1);">￥</text>
										<text style="color: rgb(254, 78, 1);font-size: 46upx;font-weight: 600;">{{item.CouponNum2}}</text>
										<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
											margin-left: 8upx;" v-if="item.CouponNum1 !== 0">{{jieQu(item.ZheKou)}}折
										</text>
										<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
											margin-left: 8upx;" v-if="item.CouponNum1 == 0">无门槛
										</text>
										<text style="font-size: 100;color: #999999;font-size: 24upx;margin-left: 8upx;" v-if="item.CouponNum1 !== 0">
											满{{item.CouponNum1}}可用
										</text>
										<view style="position: absolute;right: 0upx;top: 18upx;">
											<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
										</view>
									</view>
									
									<view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 7">
										<text style="color: rgb(254, 78, 1);">￥</text>
										<text style="color: rgb(254, 78, 1);font-size: 46upx;font-weight: 600;">{{item.CouponNum2}}</text>
										<text style="font-size:22upx;background-color: rgb(254, 78, 1);color: #FFFFFF;border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
											margin-left: 8upx;">满赠
										</text>
										<text style="font-size: 100;color: #999999;font-size: 24upx;margin-left: 8upx;">
											实付满{{item.CouponNum1}}送
										</text>
										<view style="position: absolute;right: 0upx;top: 18upx;">
											<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
										</view>
									</view>
									<view style="padding: 8upx 30upx;position: absolute;right: 30upx;top: 86upx;background-color: rgb(254, 78, 1);color: #FFFFFF;border-radius: 50upx;" @tap="getCoupon(item)">
										抢券
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex align-center" style="margin-top: 20upx;padding: 30upx;background-color: #FFFFFF;text-align: center;padding-left: 0;padding-top: 30upx;padding-bottom: 30upx;" v-if="tcList.length > 0">
						<!-- <view style="width: 30upx;height: 30upx;color: #ffffff;font-size: 22upx;background-color: #f9683c;">
							<text>团</text>
						</view> -->
						<text style="margin-left: 30upx;font-weight: 600;font-size: 26upx;color: #010101;font-size: 40upx;">套餐推荐</text>
					</view>
					
					<view class="flex" style="padding: 30upx;background-color: #FFFFFF;padding-top: 0;" v-for="(item,i) in tcList" :key="i"  v-if="tcList.length > 0" @tap="gotoDetil(item)">
						<view>
							<image :src="item.c.Logo" style="width: 180upx;height: 180upx;border-radius: 10upx;" mode=""></image>
						</view>
						<view style="position: relative;margin-left: 20upx;">
							<view style="width: 460upx;height: 70upx;">
								<text style="font-weight: 600;font-size: 28upx;">{{yinHangs(item.c.Title)}}</text>
							</view>
							<view style="margin-top: 20upx;">
								<text style="color: #999999;font-size: 24upx;">{{item.c.GetNum}}份已售</text>
							</view>
							<view style="margin-top: 16upx;">
								<text style="color: #fe4e01;font-size: 36upx;"><text style="font-size: 24upx;">￥</text>{{changeMoney(item.c.DiscountedPrice)}}</text>
								<text style="color: #999999;text-decoration:line-through;font-size: 24upx;margin-left: 10upx;">￥{{changeMoney(item.c.OrderPrice)}}</text>
							</view>
							<view style="position: absolute;text-align: center;line-height: 52upx;top: 130upx;right: 0upx;font-size: 24upx; color: #FFFFFF;width: 140upx;height: 52upx;border-radius: 10upx;background-color: #fe4e01;">
								<text>立即抢购</text>
							</view>
						</view>
					</view>
					
				</view>

				<view id="editor " style="background-color: #ffffff;">
					<view class="padding-top  bg-white"  style="border-radius:25upx 25upx 0px 0px;padding-top: 20upx;">
						<view class="text-xl text-bold" style="margin-left: 30upx;width:50%;text-align: left;color: #010101;font-size: 40upx;">店铺详情</view>
					</view>
					<view style="width: 100%;height:40upx;" class="bg-white flex kg_">
						<!-- <view class="hr_"></view> -->
					</view>
					<view style="overflow: hidden;width: 100%;border-radius:0upx 0upx 25upx 25upx; padding-bottom: 130rpx;padding-left: 30upx;padding-right: 30upx;" class="flex justify-center padding-bottom-xs">
						<view class="bg-white" style="width: 100%;">
							<rich-text :nodes="htmlNodes"></rich-text>
						</view>
					</view>
					</view>

				<view >
					<phone-buttom :infoObject="infoObject" :goToPerstoreFlag="goToPerstoreFlag" :goToprestoreFlag="goToprestoreFlag"
					 @beCollection="beCollectionHandle" :collectionFlag="collectionFlag" @share="share" @gotoReservation="gotoReservation" style="z-index: 99;">
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
		
		<navigator url="/pages/ad/cheXian">
			<view class="couponss shake"></view>
		</navigator>
		
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
				showRecharge: getApp().globalData.showRechargePage,
				xXing:0,
				baoPin:[
		
				],
				current: 0,
				couponList:[],
				tcList:[],
				daiJin:[],
				isSticky: false,
				gao: 0,
				touList:[],
				VisitCount: 0,
				cLeng: 0,
				CustomBar:this.CustomBar,
				modalName: null,
				GetNum:0
			}
		},
		onPageScroll: function(Object) {
			this.scrollTop = Object.scrollTop;
			
			if (Object.scrollTop >= 750) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
			this.gao = 706 + this.couponList.length * 124 + 50 + this.tcList.length * 108 + 40
			
			if(Object.scrollTop >= this.gao){
				this.current = 1
			} else {
				this.current = 0
			}
		},
		onShow() {
			
		},
		mounted() {
			
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
					this.$http.shangjia(this.getData.StoreID, this.$store.state.userInfo.ID)
						.then(res => {
							console.log(res);
							this.infoObject = res
							this.xXing = 5 - Number(this.infoObject.StoreStart)
							console.log(this.infoObject);
							
							this.baoPin = this.infoObject.Arg.split(',')
							
							this.cLeng = Number(this.baoPin.length)
							if(this.baoPin[0] == ""){
								this.cLeng = 0
							}
							console.log(this.cLeng);
						})
				} else {
					this.collectionFlag = false
					this.$http.shangjia(this.getData.StoreID, this.$store.state.userInfo.ID).then(res => {
						console.log(res);
						this.infoObject = res
						this.xXing = 5 - Number(this.infoObject.StoreStart)
						console.log(this.infoObject);
						
						this.baoPin = this.infoObject.Arg.split(',')
						console.log(this.baoPin);
						this.cLeng = Number(this.baoPin.length)
						if(this.baoPin[0] == ""){
							this.cLeng = 0
						}
						console.log(this.cLeng);
					})
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
				
			this.$http.cxDandian(option.StoreID,1,50).then(res => {
				console.log(res);
				
				if(res.Data){
					this.couponList = res.Data
					res.Data.forEach((item,i) => {
						if(item.CouponType == 1){
							if(item.CouponNum1 == 0){
								this.daiJin[i] = `${item.CouponNum2}元代金券`
							} else {
								this.daiJin[i] = `${item.CouponNum2}元代金券`
							}
						} else {
							this.daiJin[i] = `${item.CouponNum2}元红包`
						}
					})
					
				} else {
					this.couponList = []
				}
			})
			
			this.$http.tcList(option.StoreID,1,50).then(res => {
				console.log(res);
				if(res.Data){
					this.tcList = res.Data
				} else {
					this.tcList = []
				}
				
			})
			
			if(this.tcList.length > 0 || this.couponList.length > 0){
				this.current = 0
			} else {
				this.current = 1
			}
			
			this.$http.tcList(option.StoreID,1,50).then(res => {
				console.log(res);
				if(res.Data){
					this.tcList = res.Data
				} else {
					this.tcList = []
				}
			})
			
			this.$http.fwJkou(option.StoreID).then(res => {
				console.log(res);
				this.VisitCount = res.VisitCount
					
				res.Date.forEach((item,i) => {
					console.log(item);
					this.touList[i] = item.HeadPic
					console.log(this.touList[i]);
				})
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
			chuli(bankNumber){
				console.log(bankNumber);
				if(bankNumber.length > 9){
					return bankNumber.substr(0,9)+"...";
				} else {
					return bankNumber;
				}
			},
			showModals(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			gotoDetil(e){
				console.log(e.c.ID);
				this.$http.xhAdd(this.$store.state.userInfo.ID,e.c.ID).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailsorder?storeId=' + this.storeInfo.StoreID + '&tcID=' + e.c.ID
				})
			},
			toShare() {
				this.showModal = true
				this.share()
			},
			getStatus: function (item) {
				return item.Num <= 0
			},
			getCoupon: function (item) {
				console.log(item);
				if (this.getStatus(item)) {
					uni.showModal({
						content: '您来晚啦，优惠券被领光啦~',
						showCancel:false
					})
					return
				}
				if (this.$store.state.userInfo) {
					this.$http.getCoupon(this.$store.state.userInfo.ID, item.CouponId)
						.then(res => {
							if (res.IsSuccess) {
								uni.showModal({
									title: '领取优惠券',
									content: '恭喜您，领到优惠券一张，快去使用吧！',
									confirmText: '去用券',
									cancelText: '去看看',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/shopDetail/shopDetailPage?StoreID=' + item.StoreID
											})
										} else {
											uni.navigateTo({
												url: '/pages/person/myCoupon/myCouponPage'
											})
										}
									}
								})
								this.queryCoupons()
							} else {
								uni.showModal({
									title: '领取优惠券',
									content: res.Msg,
									confirmText: '去看看',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/person/myCoupon/myCouponPage'
											})
										}
									}
								})
							}
						})
						.catch(err => {
							console.log(err);
							this.$api.msg(err.Msg)
							this.couponList = []
						})
				} else {
					uni.showModal({
						title: '您还没有登陆',
						content: '请您先登录，再领取优惠券',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/login'
								})
							}
						}
					})
				}
			},
			jieQu(num){
				return( Math.round(num*100)/10);
			},
			yinHangs(bankNumber){
				if(bankNumber.length > 32){
					return bankNumber.substr(0,32)+"...";
				} else {
					return bankNumber;
				}
			},
			yinHang(bankNumber){
				if(bankNumber.length > 16){
					return bankNumber.substr(0,16)+"...";
				} else {
					return bankNumber;
				}
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			yuLan(){
				uni.previewImage({
					urls: this.baoPin,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},	
			async change(index) {
				this.current = index;
				// console.log(index);
				// if(index == 0){
				// 	uni.pageScrollTo({
				// 	    scrollTop: 720,
				// 	    duration: 200
				// 	});
				// } else {
				// 	let a = this.gao = 706 + this.couponList.length * 124 + 50 + this.tcList.length * 108 + 40
				// 	uni.pageScrollTo({
				// 	    scrollTop: a,
				// 	    duration: 200
				// 	});
				// }
			},
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
		onShareTimeline: function () {
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
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
		
	.btn-submit {
		background-color: #1C2A86;
		margin: 100upx 20upx;
		color: #fff;
	}

	.shop_detail {
		background: #F8F8F8;
	}
	
	.couponss {
		width: 184rpx;
		height: 182rpx;
		background: url(https://img.huaxuapp.com/yjdbf.png) no-repeat;
		background-position: center;
		background-size: cover;
		position: fixed;
		bottom: 150rpx;
		right: 30rpx;
	}

	p {
		background: white !important;
	}

	.start-red {
		color: #fe4e01;
	}


	.logo_img {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}

	.title_ {
		border-radius: 30upx 30upx 0 0;
		position: absolute;
		width: 100%;
		top: -43upx;
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
		width: 40upx;
		height: 40upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.huaxuapp.com/huobao.png');
		margin-right: 10upx;
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
	
	.scroll-view_H {
		/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		
		height: 280upx;
		text-align: center;
		font-size: 36upx;
		/* margin: 2%  1% 2% 1%; */
	}
	.scroll-view-item_H view{
		box-sizing: border-box;
	}
	.scroll-view-item_H view:nth-child(1){
		width: 100%;
		text-align: right;
	}
	.scroll-view-item_H view:nth-child(2){
		width: 100%;
		height: 120upx;
	}
	.scroll-view-item_H view:nth-child(2) image{
		width: 100upx;
		height: 100upx;
	}
	.scroll-view-item_H view:nth-child(3){
		width: 100%;
		height: 50upx;
	}
	.scroll-view-item_H view:nth-child(4){
		width: 100%;
		height: 50upx;
	}
	
	.lis {
		flex: 1;
		text-align: center;
		font-size: 30upx;
		color: #999999;
	}
	
	.liss {
		flex: 1;
		text-align: center;
		font-size: 30upx;
		font-weight: 600;
	}
	
	.solids {
		width: 750upx;
		height: 0.5upx;
		background-color: #e4e4e4;
	}
	
	.xian {
		margin-top: 10upx;
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
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 99990;
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
	
	.fixed-tops {
		border-bottom: 2upx solid #e4e4e4;
	}
</style>
