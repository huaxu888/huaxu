<!-- 
* @file index.vue
* @descripteon 首页
* @author 张阳
* @date 2019-6-4
* @version: V1.0.0
* @email:1103992447@qq.com
-->
<template>
	<view>
		<view v-if="showKaiPing"></view>
		<view v-if="!showKaiPing">
			<view class="fixed_top" style="z-index: 9;">

				<!-- #ifdef APP-PLUS -->
				<view class="status_bar">
				</view>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<cu-custom bgColor="bg-transparent" :leftAction="true">
					<block slot="content">
						<text class="text-black text-xl"></text>
					</block>
				</cu-custom>
				<!-- #endif -->

				<view class="cu-bar search">
					<!-- 选择器 -->
					<view class="" style="margin-left: 36upx;">
						<picker @change="bindPickerChange" :value="index" range-key="SiteName" :range="siteList" mode="selector" @cancel="animationControl()">
							<view class="flex align-center " @tap="animationControl()">
								<view class="uni-input" style="font-weight:bold;font-size: 34upx;">{{siteList[index].SiteName}}</view>
								<text class="cuIcon-triangledownfill income-way-icon" :class="showIncomeWayPanel ? 'income-way-icon-active' : ''"></text>
							</view>
						</picker>
					</view>
					<!-- 输入框 -->
					<!-- #ifdef MP-ALIPAY -->
					<navigator url="/pages/searchResult/searchRouter/searchRouterPage" class="search-form round" style=" height: 60upx; ">
						<!-- <view class="search-form round" style=" height: 60upx; "> -->
							<text class="cuIcon-search"></text>
							<input @tap="goTosearch" :adjust-position="false" type="text" placeholder="输入商家或者关键词" disabled="disabled"
							 confirm-type="search"></input>
						<!-- </view> -->
					</navigator>
					<!-- #endif -->
					<!-- #ifndef MP-ALIPAY -->
					<view class="search-form round" style=" height: 60upx; ">
						<text class="cuIcon-search"></text>
						<input @tap="goTosearch" :adjust-position="false" type="text" placeholder="输入商家或者关键词" disabled="disabled"
						 confirm-type="search"></input>
					</view>
					<!-- #endif -->
					<!-- <text class="hxIcon-saoyisao1 margin-right-xs" style="font-size: 50upx; color: #808080;" @tap="toScan()"></text> -->
					<view class="flex" style="margin-left: 10upx;margin-right:20upx;" @tap="showMsg">
						<text class="hxIcon-xiaoxi3 " style="font-size: 50upx;color: #ffffff;">
							
						</text>
						 <view class=" cu-tag badge " v-if="tagID > 0 " style="background: #f34e2d;color:#FFFFFF; display: flex; justify-content: center; align-items: center; border-radius: 50%; width:28upx; height: 28upx;font-size: 18upx;position: absolute; z-index: 50; top: 22upx; right: 14upx;">{{tagID}}</view>
						<!--tagID > 0  -->
						
					</view>
				</view>
			</view>
			<view style="height: 90upx;"></view>
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar ">
				<view class="top_view"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<cu-custom bgColor="bg-transparent"></cu-custom>
			<!-- #endif -->
			<!-- 签到 -->
			<!-- <view class="signin cake" v-if="showSignInTag && !isChristmas && !isYD && !isXN" @tap="toSignIn"></view> -->

			<!-- <view class="christmasSignin cake" v-if="showSignInTag && isChristmas && !isYD" @tap="toSignIn"></view> -->

			<view class="YDSignin cake" v-if="showSignInTag && (isXN || isYD)" @tap="toSignIn"></view>

			<!-- QDhb-->
			<view class="cu-modal" :class="QDhb?'show':''" @touchmove.stop.prevent="moveHandle">
				<view class="cu-dialog" style="width:95%; border-radius: 4%;background: transparent;">
					<view class="cu-bar flex  justify-center align-center" style="background-image: url('https://img.huaxuapp.com/qdhb1.png');background-repeat: no-repeat; background-size:contain; background-position: center;height:670upx">
						<view class="flex align-center" style="position: absolute;top: 356upx;">
							<view style="position: relative;left: -65upx;">
								<text style="color:#e34c36;font-size:38upx;font-weight: bold;">&yen;</text>
								<text style="color:#e34c36;font-size:88upx;margin-left: 5upx;">{{QDMoney}}</text>
							</view>
							<view class="flex align-start justify-start flex-direction" style="position: relative;left: 46upx;">
								<view class="text-bold" style="color: #333333;font-size: 38upx;">全场可消费红包</view>
								<view style="color: #555555;font-size: 24upx;margin-top: 13upx;">已放入【我的余额-可消费余额】</view>
							</view>
						</view>
						<view class="flex align-center justify-center " @tap="HiddenQDhb" style="position: absolute;bottom: 40upx;width: 500upx; height: 90upx;background: #fcf17b;  border-radius: 10upx;">
							<text style="font-size: 34upx;color: #6b470f;">立即收下</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 抵扣额红包 XRhb -->
			<view class="cu-modal" :class="XRhb?'show':''" @touchmove.stop.prevent="moveHandle">
				<view class="cu-dialog " style="width:65%; border-radius: 4%; background: transparent;">
					<view class="cu-bar flex flex-direction justify-start" style="">
						<image :src="XRHBurl" mode="aspectFit" style="width:420upx;height:510upx;margin-left: 40upx;"></image>
						<image @tap="hideCHBModal" src="https://img.huaxuapp.com/xrhb_lq.png" mode="aspectFit" style="width: 400upx; height: 80upx;"></image>
					</view>
				</view>
			</view>

			<!-- //显示优惠券红包 YHQhb -->
			<!-- <view class="cu-modal" :class="[isCos ? 'show' : '']" @touchmove.stop.prevent="moveHandle">
				<view class="cu-dialog" style="width:65%; border-radius: 4%;background: transparent;">
					<view @tap="hideYHQ" class="cu-bar flex flex-direction justify-start" style="background-image: url('https://img.huaxuapp.com/qcyhq.png');background-repeat: no-repeat; background-size:contain; background-position: center;width:480upx;height:658upx">
					</view>
				</view>
			</view> -->

			<!-- 推荐红包遮罩 ShowTJHB-->
			<view class="cu-modal" :class="ShowTJHB ?'show':''" @touchmove.stop.prevent="moveHandle">
				<view class="cu-dialog" style="width:65%; height: 750upx;border-radius: 4%;background: transparent;">
					<view class="cu-bar flex flex-direction justify-start" style="background-image: url('https://img.huaxuapp.com/tjhb_kek1.png');background-repeat: no-repeat; background-size:contain; background-position: center;width:100%;height:700upx">
						<view class="text-sl" style="margin-top: 250upx;font-weight: 300; color: #F43F3B;">&yen;{{ changeMoney(TJMoney)}}</view>
						<image @tap="hideCHBModal" src="http://img.huaxuapp.com/%E6%8E%A8%E8%8D%90%E7%BA%A2%E5%8C%85%E6%8C%89%E9%92%AE_03.png"
						 mode="scaleToFill " style="width:300upx; height:70upx;margin-top: 220upx; "></image>
					</view>
				</view>
			</view>

			<!-- 下级消费红包的遮罩 ShowXJXFHB -->
			<view class="cu-modal" :class="ShowXJXFHB ? 'show' : ''" @touchmove.stop.prevent="moveHandle">
				<view class="cu-dialog" style="width:80%;border-radius: 4%;background: transparent;">
					<view class="cu-bar flex flex-direction justify-start" style="background-image: url('https://img.huaxuapp.com/xfjl.png');background-repeat: no-repeat; background-size:contain; background-position:center;height: 715upx;  width: 600upx;">
						<view style="color:yellow;margin-top:425upx;">
							<text class="text-sl">{{ changeMoney(XJXFMoney)}}</text><text>元</text>
						</view>
						<view class="text-red" style="margin-top: 100upx;color:#de1a27;">
							<text class="text-lg text-red" style="font-weight: 600;">{{XFStore}}</text>
						</view>
					</view>
					<view>
						<image @tap="hideCHBModal" src="http://img.huaxuapp.com/xfjllq.png" mode="aspectFit" style="margin-top: 50upx; height: 60upx;"></image>
					</view>
				</view>
			</view>

			<!--  =======================页面的开始==上面是红包=========================== -->
			<view style="position: relative;">
				<scroll-view scroll-x class=" nav text-bold" scroll-with-animation style="background-color: #fa5837;">
					<view class="lastmargin cur-text-red text-bold" style="color: #ffffff;font-weight: 600;font-size: 32upx;">
						<text style="position: absolute;top:20upx;left: 50upx;color: #FFFFFF;">__</text>
						精选
					</view>
					<view class="cur-text-black lastmargin" v-for="(topSliderItem,topSliderIndex) in tradingAreaList" :key="topSliderIndex"
					 @tap="topTabSelect(topSliderItem)"  style="margin-left: 16upx;margin-right: 16upx;color: #FFFFFF;">
						{{topSliderItem.BusName}}
					</view>
				</scroll-view>
				<view class="flex align-center justify-center" style="width: 90upx; height: 87upx; background:#FFFFFF; position: absolute;right: 0;top: 0;background-color: #fa5837;"
				 @tap="toBusineCssList()">
					<text class="hxIcon-fenlei1 " style="line-height: 1em; font-size: 32upx;color: #FFFFFF;"></text>
				</view>
			</view>
			<!-- 上方轮播图 -->
			<view class=" bg-white" style="width: 750upx;background-color: #fa5837;">
				<swiper style="height: 310upx;width: 100%" :indicator-dots="false" :circular="true" :autoplay="true" interval="3000"
				 duration="1000">
				 <!-- #ifdef MP-ALIPAY -->
				 <swiper-item v-for="(topSwiperItem,topSwiperIndex) in topLBLlit" :key="topSwiperIndex">
				 	<navigator :url="topSwiperItem.GGContent">
						<image :src="topSwiperItem.GGPicUrl" mode="scaleToFill" style="width: 100%; height: 310upx;"></image>
					</navigator>
				 </swiper-item>
				 <!-- #endif -->
					<!-- #ifndef MP-ALIPAY -->
					<swiper-item v-for="(topSwiperItem,topSwiperIndex) in topLBLlit" :key="topSwiperIndex" @tap="LBTnavigate(topSwiperItem.GGContent)">
						<image :src="topSwiperItem.GGPicUrl" mode="scaleToFill" style="width: 100%; height: 310upx;"></image>
					</swiper-item>
					<!-- #endif -->
				</swiper>
			</view>
			<view style="background-color: #FFFFFF;width: 750upx;">
				<image src="https://img.huaxuapp.com/sybanner_02.png" mode="" style="height: 90upx;width: 750upx;" ></image>
			</view>
			<view class="padding-lr padding-bottom-xs flex align-center bg-white " style="padding-top: 40upx;">
				<text style="white-space: nowrap;margin-right: 15upx;margin-left: 20upx;line-height: 1em;">花蓄</text>
				<image src="https://img.huaxuapp.com/notice.png" style="width:90upx; height:30upx;"></image>
				<swiper class="padding-lr-sm text-sm flex justify-center align-center" style="height:33upx;width:100%; " vertical="true"
				 circular="true" autoplay="autoplay" interval="3000">
					<swiper-item class="flex align-center" v-for="(newsItem,newsIndex) in topList" :key="newsIndex" @tap="toTopLsit">
						<text class="text-cut" style="line-height: 1em;">{{newsItem.Title}}</text>
					</swiper-item>
				</swiper>
				<view style="width:2upx; height:30upx;background: #CACACA; border-radius: 1upx;"></view>
				<text style="white-space: nowrap;margin-right: 15upx;margin-left: 20upx;line-height: 1em;color: #f34e2d;font-size: 24upx;"
				 @tap="toTopLsit">详情</text>
			</view>
			<!-- 表格菜单 -->
			<view class="cu-list grid  no-border " :class="['col-' + gridCol]">
				<view class="cu-item" v-for="(tableItem,tableIndex) in cuIconList.length > 0 ? cuIconList : 10" :key="tableIndex" 
						v-if="tableIndex < gridCol * 2">
					<view @tap="jumpSort(tableIndex)">
						
						<!-- 矢量图替换为图片 -->
						<!-- <view :class="item.icon" style="font-size: 55upx;"> </view> -->
						<image :src="tableItem.StoreTitlePic" style="width: 98upx; height: 98upx;" class="tran"  :class="imgIsLoad?'opacity-show'  :'opacity-hidden'" @load="imgLoad()"></image>
						<text class="text-sm" style="line-height: 1em;margin-top: 0;height: 24upx;">{{tableItem.StoreSortName}}</text>
					</view>
				</view>
			</view>
				
			<!-- 商圈轮播图	 -->
			<!-- <view class="padding-lr margin-top" style="width: 100%;background-color: #FFFFFF;margin-top: 0;padding-bottom: 30upx;">
				<swiper style="height: 200upx;width: 100%" :indicator-dots="false" :circular="true" :autoplay="true" interval="6000"
				 duration="800"  display-multiple-items="3" @change="big" class="imgs" >
					<swiper-item v-for="(centerSwiperItem,centerSwiperIndex) in centerLBLlit" :key="centerSwiperIndex">
						<image :class="kfindex+1 == centerSwiperIndex?'active':''" :src="centerSwiperItem.GGPicUrl" 
						style="padding: 20upx; height: 200upx;border-radius: 15upx;width: 240upx;"></image>
					</swiper-item>
				</swiper>
			</view> -->	
				
			<!-- 轮播图 -->
			<view class="padding-lr margin-top" style="width: 100%;background-color: #FFFFFF;margin-top: 0;padding-bottom: 30upx;">
				<swiper style="height: 200upx;width: 100%" :indicator-dots="false" :circular="true" :autoplay="true" interval="6000"
				 duration="800">
					<!-- #ifdef MP-ALIPAY -->
					<swiper-item v-for="(centerSwiperItem,centerSwiperIndex) in centerLBLlit" :key="centerSwiperIndex">
						<navigator :url="centerSwiperItem.GGContent">
							<image :src="centerSwiperItem.GGPicUrl" mode="scaleToFill" style="width: 100%; height: 200upx;border-radius: 15upx;"></image>
						</navigator>
					</swiper-item>
					<!-- #endif -->
					<!-- #ifndef MP-ALIPAY -->
					<swiper-item v-for="(centerSwiperItem,centerSwiperIndex) in centerLBLlit" :key="centerSwiperIndex" @tap="navTo(centerSwiperItem.GGContent)">
						<image :src="centerSwiperItem.GGPicUrl" mode="scaleToFill" style="width: 100%; height: 200upx;border-radius: 15upx;"></image>
					</swiper-item>
					<!-- #endif -->
				</swiper>
			</view>
			
			<!-- <view class="wrap">
				<u-swiper :list="lists" mode="none" :effect3d="true" img-mode="aspectFit"></u-swiper>
			</view> -->
			
			<!-- 精选商家标题 -->
			<view class="" style="height: 30upx;padding-top: 30upx;padding-bottom: 50upx;background-color: #FFFFFF;" v-if="!isChristmas && !isYD && !isXN">
				<view class=" padding-lr align-center justify-center">
					<view class="text-bold" style="font-size: 40upx;">附近商家</view>
				</view>
			</view>
			<view v-if="isChristmas && !isYD" class="margin-lr margin-top" style="height: 80upx;background: url('https://img.huaxuapp.com/huaxujingxuanshangjia_03.png') no-repeat; background-size: cover;">
			</view>
			<view style="position: relative;" v-if="isYD">
				<view class="margin-top" style="height: 80upx;background: url('https://img.huaxuapp.com/ydjxsj_03.png') no-repeat; background-size: cover;position: relative;top: 0;"></view>
			</view>

			<view style="position: relative;" v-if="isXN">
				<view class="margin-top" style="height: 80upx;background: url('https://img.huaxuapp.com/nyjxsj.png') no-repeat; background-size: cover;position: relative;top: 0;"></view>
			</view>
			<!-- 精选商铺list -->
					
			<!-- <scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center" >
					<view class="cu-item flex-sub " @tap="tabSelect" v-for="(item,index) in kexuan" :key="index" :data-id="index" >
						<view  :class="index==TabCurs?'text-orange cur':''">
							<text :class="index==TabCurs?'borders':''" style="padding-bottom: 20upx;">
							{{ item.title }}
							</text>
						</view>
					</view>
				</view>
			</scroll-view> -->
			
			<!-- <u-tabs name="cate_name" :list="list" :is-scroll="false" :current="current" @change="change" :duration="0.1" inactive-color="rgb(51, 51, 51)" active-color="rgb(243, 78, 45)" 
			style="margin-bottom: 20upx;" bar-width="35" bar-height="8"></u-tabs> -->
			<view style="height: 80upx;padding-top: 26upx;background-color: #FFFFFF;">
				<view class="flex">
					<view :class="[current==0?'liss':'lis']" @tap="change(0)"><text>综合排序</text></view>
					<view :class="[current==1?'liss':'lis']" @tap="change(1)"><text>距离最近</text></view>
					<view :class="[current==2?'liss':'lis']" @tap="change(2)"><text>销量最高</text></view>
					<view :class="[current==3?'liss':'lis']" @tap="change(3)"><text>新店推荐</text></view>
				</view>
				<view class="flex">
					<view class="flex justify-center" style="flex: 1;"><view class="xian" :style="{transform:`translateX(${current * 187.5}rpx)`}"></view></view>
					<view class="flex justify-center" style="flex: 1;"></view>
					<view class="flex justify-center" style="flex: 1;"></view>
					<view class="flex justify-center" style="flex: 1;"></view>
				</view>
			</view>
			
			<view class="flex flex-wrap">
				<view style=" width: 750rpx; overflow: hidden;" >
					<view class="shadow" style="position: relative;" v-for="(item,index) in StoreList" :key="index"  @tap="goToDetail(item)">
					
						<view style="position: relative;" v-if="index != 0 && (isYD || isXN)">
							<view class="margin-top" style="border-radius: 80upx;  height: 80upx;background: url('https://img.huaxuapp.com/ydjxsjj_03.png') no-repeat; background-size: cover;position: relative;top: 0;"></view>
						</view>
					
						<view  class="flex" style="border-radius: 8upx;background: #FFFFFF; padding-top: 20upx; padding-bottom:20upx; padding-left: 30upx; padding-right: 30upx;">
							<view style="position: relative;">
								<image :src="item.GGpics || item.StorePic" mode="aspectFill" style="width: 160rpx;height:160rpx;border-radius: 8upx;"></image>
								<!-- <view v-if="isChristmas && !isYD" style="position: absolute;width: 100%;height:300upx;top: 0;background: url('https://img.huaxuapp.com/merrychristmas_03.png') no-repeat; background-size: cover;z-index: 7;"></view> -->
								<image v-if="item.IsSY" src="https://img.huaxuapp.com/160-160.png" mode="aspectFit" style="position: absolute; width: 160rpx; height: 160rpx; top: 0; left: 0;"></image>
								<!-- <view v-if="isChristmas && !isYD"  style="position: absolute;width: 282upx;height:154upx;bottom:-28upx; left: -30upx; background: url('https://img.huaxuapp.com/shengdanlaoren_03.png') no-repeat; background-size: cover;z-index: 8;"></view> -->
								<view v-if="isYD || isXN" style="position: absolute;width:132upx;height:110upx;bottom:-42upx; left: -18upx; background: url('https://img.huaxuapp.com/jiaozi_03.png') no-repeat; background-size: cover;z-index: 8;"></view>
							</view>
							
							<view class="" style="margin-left:20upx;width:80%; border-bottom:0.5upx solid #eeeeee;">
								<view class="text-bold text-cut" style="color: #333333;font-size: 30upx;">{{item.StoreName}}</view>
								
								<!-- <text class="text-gray text-xs">{{item.GGContent}}</text> -->
								<view class="flex align-center justify-between" style="margin-top:12upx">
									<view class="flex align-center justify-start">
										<view class="flex align-center">
											<view class="flex align-center">
												<view class="hxIcon-tubiaozhizuomoban cur-text-red " v-for="(redStartItem,redStartIndex) in item.StoreStart"
												 :key="redStartIndex" style="margin-right: 4upx; line-height: 1em;" v-if="item.StoreStart>0"></view>
											</view>
											<view class="flex align-center">
												<view class="hxIcon-tubiaozhizuomoban text-gray " v-for="(grayStartItem,grayStartIndex) in (5-item.StoreStart)"
												 :key="grayStartIndex" style="margin-right: 4upx; font-size: 27upx;line-height: 1em;"  v-if="(5-item.StoreStart)>0"></view>
											</view>
											<view style="color: red;margin-left: 8upx;">{{item.StoreStart}}.0</view>
										</view>
										<!-- 月售 -->
										<!-- <view style="margin-left: 15upx;font-size: 26upx;color: #5e5e5e;"><text style="color: #c7c7c7;margin-right: 15upx;">|</text>月售123</view> -->
										<!-- 距离   -->
										<view style="position: absolute;right: 30upx;color: #999999;font-size: 20upx;" v-if="item.distance != 0">{{getDistance(item.distance)}}</view>
									</view>
									<!-- <view style="line-height: 1em;color: #999999;font-size: 24upx;">
										<text class="hxIcon-huo"></text> <text class="margin-left-xs" style="font-size: 26upx;">{{item.ReadCount==null?0:item.ReadCount}}</text>
									</view> -->
								</view>
								
								<!-- 商圈 -->
								<view class="flex" style="color: #999999;font-size: 24upx;line-height: 1em;margin-top: 12upx;">
									<text style="color:#f50b0b;line-height: 1em;">{{item.StoreSortName}}</text><text style="margin-left: 5upx;margin-right: 5upx;line-height: 1em;">·</text><text>{{item.BusinessName}}</text>
								</view>
								
								<!-- 地址 -->
								<view style="padding-bottom: 20upx;">
									<view class="text-df map_info flex" style="margin-top: 15upx;">
										<view  style="color: #999999;margin-top: 6upx;font-size: 24upx;"><text class="cuIcon-locationfill marghin-right-sm"></text></view>
										<view style="width:800upx;text-overflow :ellipsis;white-space :nowrap; overflow : hidden;font-size: 24upx; ">
											{{dizhiff(item.StoreAddress)}}
										</view>
									</view>
								</view>
								
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="gl" @touchmove.stop.prevent="moveHandle" v-if="showGL" @tap="hideGL">
			<view class="gl-content">
				<view class="gl-img" style="background-image: url(https://img.huaxuapp.com/yszc);"></view>
				<view class="text-xs margin-top">点击同意即表示已阅读<text class="xy-text" @tap="toWebview('zc')">《花蓄用户注册服务协议》</text>和<text class="xy-text" @tap="toWebview('ys')">《花蓄用户隐私服务协议》</text></view>
				<view class="flex justify-around">
					<view class="refuse-btn" @tap.stop="quitApp">
						<text>不同意</text>
					</view>
					<view class="agree-btn" @tap.stop="hideGL">
						<text>同意</text>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		 
		
		<navigator url="/pages/ad/couponRedemption">
			<view class="coupons shake"></view>
		</navigator>
		
		<!-- #ifdef APP-PLUS -->
		<navigator url="/pages/ad/couponRedemption">
			<view class="dong shake" style="width: 170rpx;height: 166rpx;background: url(https://img.huaxuapp.com/qyhq_03.png) no-repeat;background-position: center;
			background-size: cover;position: fixed;bottom: 50upx;right: 30rpx;animation-timing-function: ease-in-out;animation-iteration-count: infinite;animation-duration: 3s;
		"></view>
		</navigator>
		<!-- #endif -->
	</view>

</template>

<script>
	var has = 0
	import {
		appPayment
	} from '../../common/handle.js'
	import amap from '../../common/amap-wx.js';
	export default {
		data() {
			return {
				showIncomeWayPanel: false,
				page: 1,
				tradingAreaList: [], //商圈列表
				siteList: [{
					SiteName: "获取中..."
				}],
				index: 0, //picker的index
				gridCol: 5, //一行多少列
				TabCur: 0,
				cuIconList: [],
				topList: null, //头条数组
				StoreList: [],
				userInfo: {},
				ShowXJXFHB: false, //下级红包
				XJXFMoney: 0, //下级消费红包金额
				XRhb: false, //新人红包
				YHQhb: false, //优惠券红包
				XRMoney: 0, //新人红包金额
				XFUser: '',
				XFStore: '',
				ShowTJHB: false, //推荐红包
				TJMoney: 0, //推荐红包金额
				QDMoney: 0, //登录红包总金额
				topLBLlit: [],
				centerLBLlit: [],
				tagID: 0,
				showKaiPing: false,
				Total: 0, //领取优惠券总额
				XRHBurl: '',
				showSignInTag: false,
				QDhb: false,
				showGL: true,
				isChristmas: false,
				isYD: false,
				isXN: false,
				location: '107.02,33.07',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702' ,//区划码  默认是汉台
				imgIsLoad: false,
				imgLoadSum: 0,
				isCos: false,// 是否有新优惠券
				TabCurs: 0,
				scrollLeft: 0,
				list: [{
					cate_name: '综合排序'
				}, 
				{
					cate_name: '距离最近'
				}, 
				{
					cate_name: '销量最高'
				},
				{
					cate_name: '新店推荐'
				}],
				current: 0,
				lists: [{
						image: '../../static/logo.png',
						title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
					},
					{
						image: '../../static/gl.png',
						title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
					},
					{
						image: '../../static/logo.png',
						title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
					}
				],
				kfindex: 0,
				getsort: 1
			}
		},
		async onShow() {
			setTimeout(() => {
				if (this.$store.state.userInfo.ID) {
					this.selectHB();
				}
				// #ifdef MP-WEIXIN
				this.showShare();
				// #endif
				if (this.$store.state.userInfo.ID) {
					this.$http.isMrhb(this.$store.state.userInfo.ID).then(res => {
						if (res.IsSuccess) {
							this.showSignInTag = true;
						}
					}).catch(res => {

					});
				}
				let timestamp = new Date().getTime();
				// if(timestamp < 1577289599000){
				// 	this.isChristmas = true;
				// 	// this.isYD = true;
				// }

				if (timestamp >= 1577289600000 && timestamp < 1577894399000) {
					this.isXN = false;
					this.isYD = true;
					// this.isChristmas = false;
				}

				if (timestamp >= 1577894400000 && timestamp < 1581782399000) {
					this.isXN = true;
					this.isYD = false;
					// this.isChristmas = false;
				}

			}, 500)
			if (this.$store.state.userInfo.ID) {
				await this.getMsgCount()
			}
		},
		async onLoad(options) {
			
			// this.showKaiPing = true
			// this.loadExecution()
			if (options.tjrid) {
				this.$store.commit('setTjrid', options.tjrid)
			}
			//获取地址 接着获取站点
			// await this.getSiteLocation();
			// #ifdef H5 || MP-ALIPAY  || APP-PLUS
				await this.getSite();
			// #endif
			
			// #ifndef H5 || MP-ALIPAY
			//获取行政区划码
				await this.getRegeo();
				// 通过行政区划获取站点
				await this.newGetSite();
			// #endif

			
			//  获取站点 ,没有传参的
			// await this.getSite();
			// 获取顶部部轮播图
			await this.getTopBanner();
			// 获取中部轮播图
			await this.getCenterLBLlit();
			/*获取商圈列表*/
			await this.getBusinessCircleList();
			/*获取精选商圈列表*/
			this.page = 1;
			await this.getJXBusiness(this.site_.SiteID);
			//获取表格菜单
			await this.getStoreSortList();
			//头条
			await this.getTopList();
			
			if (this.$store.state.userInfo.ID) {
				//以下是登录后的赋值
				this.userInfo = this.$store.state.userInfo;
				//登录后才能进行的请求
				//获取通知的个数
				await this.getMsgCount();
				await this.findConpons()
			} else {
				this.userInfo = null;
			}
		},
		async onPullDownRefresh() {
			//下拉刷新
			
			//获取地址 接着获取站点
			// #ifdef H5 || MP-ALIPAY || APP-PLUS
				await this.getSite();
			// #endif
			
			// #ifndef H5 || MP-ALIPAY
			//获取行政区划码
				await this.getRegeo();
				// 通过行政区划获取站点
				await this.newGetSite();
			// #endif

			await this.findConpons()
			// 获取顶部部轮播图
			await this.getTopBanner();
			// 获取中部轮播图
			await this.getCenterLBLlit();
			/*获取商圈列表*/
			await this.getBusinessCircleList();
			/*获取精选商圈列表*/
			this.page = 1;
			await this.getJXBusiness(this.site_.SiteID);
			//获取表格菜单
			await this.getStoreSortList();
			//头条
			await this.getTopList();
			uni.stopPullDownRefresh();
			this.current = 0
			this.getsort = 1
		},
		async onReachBottom() {
			this.page += 1;
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			await this.$http.getNewJXBusiness(this.site_.SiteID,this.location,this.page, 10, this.getsort).then(res => {
				
				if (res.length > 0) {
					this.StoreList = this.StoreList.concat(res);
					console.log(this.StoreList);
				} else {
					this.$api.msg('已经到最底啦~')
				}
				uni.hideLoading()
			});
		},
		methods: {
			big(e) {
				console.log(e);
				console.log(e.detail.current);
				if(e.detail.current == 3) {
					this.kfindex = -1
				} else {
					this.kfindex = e.detail.current
				}
			},
			async change(index) {
				this.current = index;
				this.getsort = this.current + 1
				this.page = 1
				await this.$http.getNewJXBusiness(this.site_.SiteID,this.location,this.page,10,this.getsort).then(res => {
					this.StoreList = res;
					console.log(this.StoreList);
				});
			},
			tabSelect(e) {
				this.TabCurs = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			dizhiff(e){
				var a = parseInt(e.indexOf(";"));
				var c = parseInt(e.indexOf("；"))
				if(e.indexOf(";")!=-1){
				    var b = e.substring(0,a);
					return b;
				}
				
				if(e.indexOf("；")!=-1){
				    var c = e.slice(0,c);
					return c;
				}
				return e;
			},
			findConpons: async function () {
				console.log(this.userInfo.ID, '用户id');
				await this.$http.findConpons(this.userInfo.ID)
					.then(res => {
						if (res.IsSuccess) {
							this.isCos = true
							has = res.Data.length === 0 ? 0 : 1
						} else {
							this.isCos = false
						}
					}).catch(err => {
						console.log(err);
						this.isCos = false
					});
			},
			quitApp: function () {
				uni.showModal({
					content: '花蓄即将退出',
					success: (res) => {
						if (res.confirm) {
							plus.runtime.quit()
						}
					}
				})
			},
			getDistance(distance) {
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} Km`
				}
			},
			imgLoad(){
				this.imgIsLoad =true;
			},
			hideGL() {
				this.showGL = false
				this.$store.commit('setShowGL', false)
			},
			animationControl() {
				this.showIncomeWayPanel = !this.showIncomeWayPanel
			},
			async getRegeo() {
				console.log('44444444444444444444444444444444445454');
				let res = await this.adcodePromise().then(res=>{
					console.log(res);
					this.location = res.location;
					let r = this.location.split(',')
					this.$store.commit('setLocation', {longitude: r[0], latitude: r[1]})
					this.adcode = res.addressName.replace(/\"/g, "");
				}).catch(err =>{
				});
			},
			adcodePromise() {
				return  new Promise((resolve, reject) => {
					new amap.AMapWX({ 
						key: this.key
					}).getRegeo({
						success: (data) => {
							let locathinData = {
								location : data[0].longitude+','+data[0].latitude,
								addressName : data[0].regeocodeData.addressComponent.adcode
							}
							resolve(locathinData)
						},fail: (err) => { 
							console.log(err);
						}
					});
				})
			},
			async getMsgCount() {
				await this.$http.getMsgCount(this.userInfo.ID).then(res => {
					if (res.IsSuccess) {
						console.log(res,709);
						this.tagID = res.Data;
					} else {
						this.tagID = 0;
					}
				}).catch(res => {
					this.tagID = 0;
				});
			},
			async getTopList() {
				await this.$http.getTopList().then(res => {
					this.topList = res;
				}).catch(res => {

				});
			},
			async getStoreSortList() {
				await this.$http.getStoreSortList().then(res => {
					this.cuIconList = res
					var storeList = [];
					//把所有的图标都替换了
					// this.cuIconList.forEach((item, i) => {
					// 	item.StoreTitlePic = this.testList[i];
					// });
					//遍历数组在每个数组对象加入字段icon
					this.$store.commit('setIconInfo', this.cuIconList)
				}).catch(res => {

				});
			},
			async getBusinessCircleList() {
				await this.$http.getBusinessCircleList(this.site_.SiteID).then(res => {
					if (res.IsSuccess) {
						this.tradingAreaList = res.Data;
					}
				});
			},
			async getCenterLBLlit() {
				await this.$http.getCenterLBLlit(this.site_.SiteID).then(res => {
					console.log('轮播图', res);
					if (res.IsSuccess) {
						this.centerLBLlit = res.Data;
					}
				});
			},
			async getTopBanner() {
				await this.$http.getTopBanner(this.site_.SiteID).then(res => {
					if (res.IsSuccess) {
						this.topLBLlit = res.Data;
					}
				});
			},
			async getSite() {
				//站点
				await this.$http.getSite().then(res => {
					this.$store.commit('setSiteList', res) //！！！！！很重要，把站点列表存到vuex里面
					this.$store.commit('setSite', res[0]);
					this.siteList = res;
					for (let i = 0; i < this.siteList.length; i++) {
						let val = this.siteList[i]
						let SiteID = val.SiteID
						if (SiteID === this.site_.SiteID) {
							this.index = i
							break
						} else {
							this.index = 0
						}
					}
				}).catch(res => {

				});

			},
			async newGetSite() {
				//站点
				await this.$http.newGetSite({
					adcode : this.adcode
				}).then(res => {
					this.$store.commit('setSiteList', res) //！！！！！很重要，把站点列表存到vuex里面
					this.siteList = res;
					this.index = 0;
					this.$store.commit('setSite', this.siteList[0]);
				}).catch(res => {

				});
			},
			async getJXBusiness(siteid) {
				await this.$http.getNewJXBusiness(siteid,this.location,this.page).then(res => {
					console.log(res)
					this.StoreList = res;
				});
			},
			topTabSelect(item) {
				// let bid = item.BID
				// let BusPics = item.BusPics
				uni.navigateTo({
					url: `/pages/busineCssircleShopList/busineCssircleShopList?busid=${item.BID}&BusPics=${item.BusPics}`
				})
			},
			toSignIn() {
				if (this.$store.state.userInfo.ID) {
					this.$http.toQD(this.$store.state.userInfo.ID).then(res => {
						this.showSignInTag = false;
						if (res.IsSuccess) {
							// #ifdef APP-PLUS
							//获取窗体id
							plus.webview.postMessageToUniNView({
								Total: res.Data
							}, 'hb4');
							const subNVue = uni.getSubNVueById('hb4');
							subNVue.show('zoom-out', 500, function() {});
							// #endif

							// #ifndef APP-PLUS
							this.QDMoney = res.Data;
							this.QDhb = true;
							// #endif
						} else {
							this.$api.msg(res.Msg);
						}
					}).catch(res => {

					});

				} else {
					this.$api.msg('用户信息异常')
				}
			},
			HiddenQDhb() {
				this.QDhb = false;
			},
			toWebview(url) {
			    switch (url){
			        case 'ys':
			            uni.navigateTo({
			                url: '/pages/common/webview/webview?url=https://newsapp.huaxuapp.com/ys.html'
			            })
			            break;
			        case 'zc':
			            uni.navigateTo({
			                url: '/pages/common/webview/webview?url=https://newsapp.huaxuapp.com/zc.html'
			            })
			            break;
			    }
			},
			navTo(url){
				console.log('跳转', url);
				uni.navigateTo({
					url:url
				})
			},
			LBTnavigate(content) {
				if (content.indexOf('/') >= 0) {
					if (content.indexOf('share') != -1) {
						if (this.userInfo != null && this.userInfo != '') {
							uni.navigateTo({
								url: content
							});
						} else {
							this.$api.msg("分享请先登录");
						}
					} else {
						if (content.indexOf('applicationAgency') != -1) {
							//说明有代理
							if (this.userInfo != null && this.userInfo != '') {
								if (this.userInfo.ManagerType == 1) {
									uni.request({
										url: "https://newsapp.huaxuapp.com/api/agent/isagenttype",
										//不依据类别获得商铺列表
										data: {
											userid: this.userInfo.ID
										},
										method: "GET",
										success: (res) => {
											console.log(res);
											if (res.data.IsSuccess) {
												uni.navigateTo({
													url: '/pages/personalAgent/personalAgentPage'
												});

											} else {
												//不是代理
												uni.navigateTo({
													url: '/pages/agency/applicationAgency'
												});
											}
										},
										fail: () => {
											this.$api.msg('网络异常');
										}
									})
								} else {
									uni.navigateTo({
										url: '/pages/personalAgent/personalAgentPage'
									});
								}
							} else {
								this.$api.msg("请先登录");
							}
						} else {
							uni.navigateTo({
								url: content
							});
						}
					}
				}
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			scanPay(ctype, myArry) {
				//判断二维码是否是我们需要的二维码需要做修改
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/scores/sys",
					method: "GET",
					data: {
						userid: this.userInfo.ID,
						content: myArry ? myArry[1] : ctype
					},
					success: (res) => {
						console.log('是我需要的二维码')
						let Store = null;
						Store = res.data.Data.Store;
						this.LogoPic = Store.LogoPic;
						this.StoreName = Store.StoreName;
						this.StoreID = Store.StoreID;
						if (Store != null) {
							uni.navigateTo({
								url: '/pages/scan/pay?type=scan' + '&StoreID=' + this.StoreID + '&StoreName=' + this.StoreName +
									'&LogoPic=' + this.LogoPic
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: '扫码失败',
							icon: 'none',
						})
					}
				});
			},
			async bindPickerChange(e) { //选择站点
				this.showIncomeWayPanel = !this.showIncomeWayPanel
				this.index = e.target.value
				//改版后将下标为0的是站点对象
				this.$store.commit('setSite', this.siteList[this.index]);
				/*获取精选商圈列表*/
				this.page = 1;
				await this.getJXBusiness(this.site_.SiteID);
				/*获取商圈列表*/
				await this.getBusinessCircleList();
				// 插眼 在选择站点时候要刷新 商圈列表 以及 精选商家  记得轮播图给上siteid
				this.current = 0
				this.getsort = 1 
				// 获取顶部部轮播图
				await this.getTopBanner();
				// 获取中部轮播图
				await this.getCenterLBLlit();
			},
			toScan() {
				//二维码
				var _self = this;
				if (this.userInfo != null) {
					uni.scanCode({
						success: function(res) {
							if (res.result.indexOf('https') != -1) {
								if (res.result.indexOf('ewmid') == -1) {
									//说明没有二维码id
									// 新版本手机扫描处理
									let t = decodeURIComponent(res.result)
									let arr = t.split('?')
									let params = arr[1].split('&')
									let storeid = params[0].split('=')[1]
									let userid = params[1].split('=')[1]
									if (userid == '0') {
										// 店铺收款码
										uni.request({
											url: 'https://newsapp.huaxuapp.com/api/mystore/getstore',
											data: {
												storeid: storeid
											},
											success: (res) => {
												if (res.data.IsSuccess) {
													let d = res.data.Data
													uni.navigateTo({
														url: `/pages/scan/pay?type=scan&StoreID=${d.StoreID}&StoreName=${d.StoreName}&LogoPic=${d.LogoPic}`
													})
												} else {
													_self.$api.msg('二维码失效')
												}

											},
											fail: (res) => {
												console.log('扫码失败', res);
												_self.$api.msg('二维码失效')
											}
										})
									} else if (userid == '0') {
										// 用户付款码

									} else {
										console.log('营业员');
										// 营业员收款码
										uni.navigateTo({
											url: `/pages/scan/pay?StoreID=${storeid}&yyyid=${userid}`
										})
									}
								} else {
									var ewmid = res.result.substring(res.result.indexOf('ewmid=') + 6, res.result.length);
									_self.$http.getStoreByEWM(ewmid).then(res => {
										uni.navigateTo({
											url: `/pages/scan/pay?StoreID=` + res.Data.StoreID + `&yyyid=` + res.Data.yyyid
										})
									});
								}
							} else {
								// 旧版本二维码扫描处理
								console.log('旧版本')
								var myArry = res.result.split(",");
								if (myArry.length == 1) {
									//只传加密字符串
									_self.scanPay(myArry[0]);
								} else {
									//传入前缀，加密字符串
									var ctype = myArry[0];
									if (ctype == "store") {
										_self.scanPay(ctype, myArry);
									}
									if (ctype == "yyy") {
										_self.scanPay(ctype, myArry);
									}
								}
							}
						}
					})
				} else {
					//没登录，返回
					uni.showToast({
						title: '没有登录',
						icon: 'none',
					})
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/common/login`
						})
					}, 2000);
				}
			},
			goTosearch() { //点击搜索的时候
				uni.navigateTo({
					url: `/pages/searchResult/searchRouter/searchRouterPage`
				})
			},
			showMsg() {
				if (this.userInfo != null) {
					this.tagID = 0;
					uni.navigateTo({
						url: `/pages/messageList/message`
					})
				} else {
					//没登录，返回
					uni.showToast({
						title: '没有登录',
						icon: 'none',
					});
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/common/login`
						})
					}, 2000);
				}
			},
			hideYHQ: function () {
				this.isCos = false
				uni.navigateTo({
					url: '/pages/person/myCoupon/myCouponPage?has=' + has
				})
				this.$http.updateConpons(this.userInfo.ID)
			},
			hideCHBModal() {
				var _self = this;
				this.ShowTJHB = false;
				this.ShowXFHB = false;
				this.ShowXJXFHB = false;
				this.loginHB = false;
				this.YHQhb = false;
				if (this.XRhb == true) {
					this.XRhb = false;
					if (this.userInfo.IsCoupons) {
						this.Total = this.userInfo.Total;
						setTimeout(() => {
							// #ifndef APP-PLUS
							this.YHQhb = true;
							// #endif

							// #ifdef APP-PLUS
							//获取窗体id
							plus.webview.postMessageToUniNView({
								Total: this.userInfo.Total
							}, 'hb9');
							const subNVue = uni.getSubNVueById('hb9');
							subNVue.show('zoom-out', 500, function() {});
							// #endif

						}, 1000);
					}
				}
				if (_self.$store.state.HBindex + 1 <= _self.$store.state.HBList.length) {
					//说明红包的指针 的下一跳 
					console.log("this.$store.state.HBindex=" + this.$store.state.HBindex);
					console.log(_self.$store.state.HBList[_self.$store.state.HBindex]);
					//如果没有到底 判断打开动画
					if (_self.$store.state.HBList[_self.$store.state.HBindex].Sort == 1) {
						setTimeout(() => {
							_self.ShowTJHB = true;
						}, 800);
					} else if (_self.$store.state.HBList[_self.$store.state.HBindex].Sort == 4) {
						let XJXFMoney = _self.$store.state.HBList[_self.$store.state.HBindex].Scores;
						let info = this.$store.state.HBList[this.$store.state.HBindex].Info;
						let list = info.split('*');
						setTimeout(() => {
							_self.ShowXJXFHB = true;
							_self.XFUser = list[0];
							_self.XFStore = list[1];
							_self.XJXFMoney = XJXFMoney;
						}, 800);
					} else if (_self.$store.state.HBList[_self.$store.state.HBindex].Sort == 6) {
						console.log('我又查到新人红包');
						let XRMoney = _self.$store.state.HBList[_self.$store.state.HBindex].Scores;
						setTimeout(() => {
							_self.XRHBurl = 'https://img.huaxuapp.com/xrhb_' + XRMoney + '.png';
							_self.XRhb = true;
						}, 800);
					}
					let index = _self.$store.state.HBindex;
					index++;
					_self.$store.commit('setHBindex', index);
				} else {
					//如果到底了 说明没有红包 清除list 归还index
					this.$store.commit('setHBindex', 0);
					this.$store.commit('setHBList', []);
				}
			},
			selectHB() {
				this.userInfo = this.userInfo_
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/scores/chbbt",
					method: "GET",
					data: {
						userid: this.userInfo.ID
					},
					success: (res) => {
						console.log(res);
						if (res.data.IsSuccess) {
							var HBdata = res.data.Data;
							if (HBdata.length > 0) {
								this.$store.commit('setHBList', HBdata);
								this.$store.commit('setHBindex', 0);
								console.log(this.$store.state.HBList);
								console.log('this.$store.state.HBindex=' + this.$store.state.HBindex);
								if (this.$store.state.HBList[this.$store.state.HBindex].Sort == 1) {
									console.log("我查到了推荐红包");
									//推荐红包
									// #ifdef APP-PLUS
									//获取窗体id
									const subNVue = uni.getSubNVueById('hb5');
									//传入红包的金额
									plus.webview.postMessageToUniNView({
										Scores: this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores)
									}, 'hb5');
									//打开原生子窗体
									subNVue.show('zoom-out', 500, function() {});
									// #endif
									//如果不是app的环境就打开遮罩
									// #ifndef APP-PLUS
									console.log("调用H5展示红包");
									this.ShowTJHB = true;
									this.TJMoney = this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores);
									// #endif
								} else if (this.$store.state.HBList[this.$store.state.HBindex].Sort == 4) {
									//下级消费红包
									console.log("我查到下级消费了个人红包");
									console.log(this.$store.state.HBList[this.$store.state.HBindex].Info);
									let info = this.$store.state.HBList[this.$store.state.HBindex].Info;
									let list = info.split('*');
									//个人消费红包
									// #ifdef APP-PLUS
									//获取窗体id
									if (this.$store.state.HBList[this.$store.state.HBindex].Scores >= 0.01) {
										plus.webview.postMessageToUniNView({
											Scores: this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores),
											XFUser: list[0],
											XFStore: list[1]
										}, 'hb');
										const subNVue = uni.getSubNVueById('hb');
										subNVue.show('zoom-out', 500, function() {});
									}
									//传入红包的金额

									//打开原生子窗体
									// #endif
									//如果不是app的环境就打开遮罩
									// #ifndef APP-PLUS
									this.ShowXJXFHB = true;
									this.XJXFMoney = this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores);
									this.XFUser = list[0];
									this.XFStore = list[1];
									// #endif
								} else if (this.$store.state.HBList[this.$store.state.HBindex].Sort == 6) {
									console.log("我查到了新人红包");
									//个人消费红包
									// #ifdef APP-PLUS
									//获取窗体id
									plus.webview.postMessageToUniNView({
										Scores: this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores)
									}, 'hb7');
									const subNVue = uni.getSubNVueById('hb7');
									//传入红包的金额
									//打开原生子窗体
									subNVue.show('zoom-out', 500, function() {});
									// #endif
									//如果不是app的环境就打开遮罩
									// #ifndef APP-PLUS
									console.log("调用H5展示新人红包");

									let XRMoney = this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores);

									this.XRHBurl = 'https://img.huaxuapp.com/xrhb_' + Number(XRMoney) + '.png';
									this.XRhb = true;
									// #endif
								}
								let index = this.$store.state.HBindex;
								index++;
								this.$store.commit('setHBindex', index);
							}
						}
					},
					fail: () => {
						console.log('请求失败');
					}
				});

			},
			getCurrentWebview(support) {
				// 手动配置下拉刷新
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({
					pullToRefresh: {
						support: support,
						style: plus.os.name === 'Android' ? 'circle' : 'default',
						"color": "#ec3a46",
						"offset": "70px"
					}
				})
			},
			moveHandle() {
				//阻止默认行为

			},
			toTopLsit() {
				//进入头条页面
				uni.navigateTo({
					url: `/pages/index/topList/topList`,
				})
			},
			toBusineCssList() {
				//进入商圈列表
				uni.navigateTo({
					url: `/pages/busineCssircleShopList/busineCssList`,
				})
			},
			jumpSort(index) {
				let item = this.cuIconList[index]
				if (item.IsLock == false) {
					if (item.StoreSortID == 0) {
						uni.navigateTo({
							url: '/pages/menuSort/classIfication/classIficationPage'
						})
					} else {
						uni.navigateTo({
							url: `/pages/menuSort/sort?StoreSortID=` + item.StoreSortID + "&StoreSortName=" + item.StoreSortName
						})
					}
				} else {
					uni.showToast({
						title: '功能占时无法使用',
						icon: 'none',
					})
				}
			},
			goToDetail(item) {
				console.log(getApp().globalData.isAudit);
				if (getApp().globalData.isAudit) {
					uni.navigateTo({
						url: `/pages/shopDetail/shopDetailPage?StoreID=${item.StoreID}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/shopDetail/orderFood/newOrderFood?storeId=${item.StoreID}&storeName=${item.StoreName}`
					})
				}
			},
			showShare() {
				uni.showShareMenu()
			},
			loadExecution() {
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					const value = uni.getStorageSync('launchFlag');
					if (value) {
						this.showKaiPing = false
						if (value == true) {
							this.showKaiPing = false
						} else {
							uni.redirectTo({
								url: '/pages/index/guide'
							});
						}
					} else {
						uni.setStorage({
							key: 'launchFlag',
							data: true,
							success: function() {
								console.log('存储launchFlag');
								uni.redirectTo({
									url: '/pages/index/guide'
								});
							}
						});
					}
				} catch (e) {
					// error 
					uni.setStorage({
						key: 'launchFlag',
						data: true,
						success: function() {
							console.log('error时存储launchFlag');
						}
					});
					uni.redirectTo({
						url: '/pages/index/guide'
					});
				}
				return;
				this.showKaiPing = false
			},
		},
		components: {
			
		},
		onShareAppMessage(obj) {
			return {
				title: '您有一个VIP待领取，注册有惊喜！',
				imageUrl: 'https://img.huaxuapp.com/xcxfm.jpg',
				path: `/pages/common/login?tjrid=${this.$store.state.userInfo.ID || 0}`
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #F8F8F8;
		width: 750rpx;
		overflow: hidden;
	}
	
	/* 领取优惠券 */
	.coupons {
		width: 170rpx;
		height: 166rpx;
		background: url(https://img.huaxuapp.com/qyhq_03.png) no-repeat;
		background-position: center;
		background-size: cover;
		position: fixed;
		/* #ifdef H5 */
		bottom: 150rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 20rpx;
		/* #endif */
		right: 30rpx;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-duration: 3s;
	}
	
	.tran{
		transition: all .8s  ease-in-out;
	}
	
	.opacity-show{
		opacity: 1;
	}
	.opacity-hidden{
		opacity: 0;
	}
	
	.income-way-icon {
		font-size: 1.5em;
		transform: rotate(0deg);
		transition: all .3s ease-in-out;
	}

	.income-way-icon-active {
		transform: rotate(180deg);
	}

	.lastmargin {
		height: 90upx;
		display: inline-block;
		line-height: 90upx;
		margin: 0 20upx;
		padding: 0 6upx;
	}

	.lastmargin:first-child {
		margin-left: 30upx;
	}

	.lastmargin:last-child {
		margin-right: 100upx !important;
	}

	.cur-text-red {
		color: #f34e2d;
		font-size: 28upx;
	}

	.cur-text-black {
		color: #666666;
		font-size: 28upx;
	}

	.signin {
		height: 170upx;
		width: 170upx;
		position: fixed;
		bottom: calc(var(--window-bottom) + 10px);
		right: 0upx;
		transition: all .3s ease-in-out;
		z-index: 998;
		background: url('https://img.huaxuapp.com/hbdps_03.png') no-repeat;
		background-size: cover;
	}

	.christmasSignin {
		height: 140upx;
		width: 132upx;
		position: fixed;
		bottom: calc(var(--window-bottom) + 10px);
		right: 0upx;
		transition: all .3s ease-in-out;
		z-index: 998;
		background: url('https://img.huaxuapp.com/xuerenqiandao_03.png') no-repeat;
		background-size: cover;
	}

	.YDSignin {
		height: 140upx;
		width: 132upx;
		position: fixed;
		bottom: calc(var(--window-bottom) + 10px);
		right: 0upx;
		transition: all .3s ease-in-out;
		z-index: 998;
		background: url('https://img.huaxuapp.com/caishenqiandao_07.png') no-repeat;
		background-size: 100% 100%;
	}

	.box {
		position: relative;
		width: 100%;
		height: 684upx;
		background: url('https://img.huaxuapp.com/xfhb1.png') no-repeat;
		background-size: contain;
		background-position: center;
		/*上面是基础样式，根据需求修改，下面的代码实现3d翻转效果*/
		transform-style: preserve-3d;
		transition: all .8s;
		z-index: ;
	}

	.box1 {
		content: '';
		z-index: 999;
		position: absolute;
		width: 100%;
		height: 684upx;
		/*牌背面的图片*/
		background: url('https://img.huaxuapp.com/xfhb3.png') no-repeat;
		background-size: contain;
		background-position: center;
		/*将after伪类折叠到box的背面，作为牌的反面*/
		transform: rotateY(180deg);
	}

	.hover {
		transform: rotateY(180deg);
	}

	.b {
		border: 1px solid #8DC63F;
	}

	/*chat*/
	.chat {
		width: 350upx;
		background: rgba(0, 0, 0, 0.5);
		margin-left: 60upx;
		border-radius: 8upx;
		padding: 10upx;
		position: relative;
	}

	.chat:before {
		content: "";
		position: absolute;
		left: -10px;
		top: 8px;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-right: 10px solid rgba(0, 0, 0, 0.5);
	}


	.grace-scroll-x {
		width: 100%;
		display: flex;
		white-space: nowrap;
		height: auto;
	}

	.grace-scroll-x .items {
		height: 228upx;
		width: 344upx;
		vertical-align: top;
		margin: 0 10rpx;
		display: inline-flex;
	}


	/*chat*/
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.fixed_top {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		background: white;
		z-index: 1;
		background-color: #fa5837;
		color: #FFFFFF;
	}

	.before {
		position: absolute;
		left: 32%;
		right: 32%;
		width: 35%;
		height: 10%;
		border-radius: 20upx;
		bottom: 2%;
	}

	.shadow-blur {
		position: relative;
	}

	.shadow-blur::before {
		content: "";
		display: block;
		background: inherit;
		filter: blur(8upx);
		position: absolute;
		width: 96%;
		height: 100%;
		top: 7upx;
		left: 10upx;
		z-index: -1;
		opacity: 0.4;
		transform-origin: 0 0;
		border-radius: inherit;
		transform: scale(1, 1);
	}

	.shadow-override {
		position: relative;
	}

	.shadow-override::before {
		content: "";
		display: block;
		background: #DD514C;
		filter: blur(9upx);
		position: absolute;
		width: 20upx;
		height: 20upx;
		top: 40upx;
		left: 65upx;
		z-index: -1;
		opacity: 0.4;
		transform-origin: 0 0;
		border-radius: inherit;
		transform: scale(1, 1);
	}

	.index-top-bg {
		background: url('https://img.huaxuapp.com/banner.png');
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 10px;
	}

	.cu-bar .search-form {
		background-color: #ffffff;
		height: 64upx;
		width: 5upx;
		font-size: 24upx;
		color: #999999;
		flex: 1;
		display: flex;
		align-items: center;
		margin: 0 20upx;
	}

	.text_hid {
		width: 100%;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* top */
	.tag {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 28upx;
		height: 28upx;
		font-size: 22upx;
		position: absolute;
		z-index: 50;
		top: 22upx;
		right: 25upx;
		border: 1px solid #007AFF;
	}

	.tras {
		display: none;
		transition: all 0.8s ease-in-out;

	}

	.tras2 {
		width: 50upx;
		transition: all 0.8s ease-in-out;

	}

	.uni-picker {
		position: relative;
		z-index: 9999;
		background: #1CBBB4;

	}


	.uni-picker-toggle {
		position: relative;
		z-index: 9999;
	}

	.cu-btn {
		position: relative;
		border: 0upx;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 30upx;
		font-size: 28upx;
		height: 55upx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin-left: initial;
		transform: translate(0upx, 0upx);
		margin-right: initial;
	}



	.cake {
		animation: move 3s 0s infinite;
		-webkit-animation: move 3s 0s infinite;
		transform-origin: bottom;
		-webkit-transform-origin: bottom;
	}

	@keyframes move {

		0%,
		65% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		70% {
			-webkit-transform: rotate(6deg);
			transform: rotate(6deg);
		}

		75% {
			-webkit-transform: rotate(-6deg);
			transform: rotate(-6deg);
		}

		80% {
			-webkit-transform: rotate(6deg);
			transform: rotate(6deg);
		}

		85% {
			-webkit-transform: rotate(-6deg);
			transform: rotate(-6deg);
		}

		90% {
			-webkit-transform: rotate(6deg);
			transform: rotate(6deg);
		}

		95% {
			-webkit-transform: rotate(-6deg);
			transform: rotate(-6deg);
		}

		100% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
	}

	@-webkit-keyframes move {

		0%,
		65% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		70% {
			-webkit-transform: rotate(6deg);
			transform: rotate(6deg);
		}

		75% {
			-webkit-transform: rotate(-6deg);
			transform: rotate(-6deg);
		}

		80% {
			-webkit-transform: rotate(6deg);
			transform: rotate(6deg);
		}

		85% {
			-webkit-transform: rotate(-6deg);
			transform: rotate(-6deg);
		}

		90% {
			-webkit-transform: rotate(6deg);
			transform: rotate(6deg);
		}

		95% {
			-webkit-transform: rotate(-6deg);
			transform: rotate(-6deg);
		}

		100% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
	}

	.gl {
		position: absolute;
		z-index: 100;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .1);
	}

	.gl-content {
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 100upx 50upx;
		padding: 80upx 50upx;
		/* #ifdef APP-PLUS */
		margin-top: 180rpx;
		/* #endif */
	}

	.gl-img {
		width: 550upx;
		height: 665upx;
		background-size: contain;
		background-position: top center;
		background-repeat: no-repeat;
	}
	
	.refuse-btn {
		background-color: #F0F0F0;
		color: #9c9c9c;
		padding: 15upx 30upx;
		border-radius: 50upx;
		width: 250upx;
		text-align: center;
		margin-top: 50upx;
	}
	
	.agree-btn {
		background-color: #ef5028;
		color: #FFFFFF;
		padding: 15upx 30upx;
		border-radius: 50upx;
		width: 250upx;
		text-align: center;
		margin-top: 50upx;
	}
	
	.xy-text {
		color: #ef5028;
	}
	
	.borders {
		height: 10upx;
		border-bottom: 3px solid #ffaa00;
	}
	
	.wrap {
		padding: 40rpx;
	}
	
	.imgs {
		transform: none;
		transition: all 0.2s ease-in 0s;
		/* transform: scale(0.5);
		transition: all .2s ease 0s;
		border-radius: 4px; */
	}
	
	.active {
		/* transform: none;
		transition: all 0.2s ease-in 0s; */
		transform: scale(1.5);
		transition: all .2s ease 0s;
		border-radius: 4px;
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
		color: rgb(243, 78, 45);
	}
	
	.xian {
		margin-top: 12upx;
		width: 45upx;
		height: 8upx;
		background-color: rgb(243, 78, 45);
		transform: translateX(0);
		transition: transform .3s ease-in-out; 
	}
	
	.xians {
		width: 40upx;
		height: 26upx;
		background-color: rgb(255, 255, 255);
	}
</style>
