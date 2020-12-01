<template>
	<view class="order-managment-page">
		<cu-custom bgColor="bg-whitesss" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>商家订单</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>商家订单</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
			<view  class="bg-white nav " style="position: fixed;justify-content: space-between; z-index: 99;padding-top: 0;padding-bottom: 0;width: 100%; font-size: 26upx;-moz-box-shadow:0px 0px 4px #DDDDDD; -webkit-box-shadow:0px 0px 4px #DDDDDD; box-shadow:0px 0px 4px #DDDDDD;" v-if="storeSort != 1">
				<view class="flex " style="justify-content: center;align-items: center;margin-top: 20upx;">
					<view style="background-color: #f6f6f6;width: 429upx;border-radius: 50upx;text-align: center;" class="flex align-center">
						<view @tap="qiHu(1)" class="flex justify-center" style="align-items: center;width: 143upx;height: 68upx;font-size: 24upx;border-radius: 50upx;" :style="inx == 1 ? 'color: #fe5479;background-color: #ffe6e8;' : 'background-color: #f8f8f8;'">
							买单订单
						</view>
						<view @tap="qiHu(2)" class="flex justify-center" style="align-items: center;width: 143upx;height: 68upx;font-size: 24upx;background-color: #ffe6e8;border-radius: 50upx;" :style="inx == 2 ? 'color: #fe5479;background-color: #ffe6e8;' : 'background-color: #f8f8f8;'">
							团购订单
						</view>
						<view @tap="qiHu(3)" class="flex justify-center" style="align-items: center;width: 143upx;height: 68upx;font-size: 24upx;background-color: #ffe6e8;border-radius: 50upx;" :style="inx == 3 ? 'color: #fe5479;background-color: #ffe6e8;' : 'background-color: #f8f8f8;'">
							预约订单
						</view>
					</view>
				</view>
				<view class="flex" style="justify-content: space-between;padding: 0 30upx;padding-top: 20upx;" v-if="inx==1">
					<view class="cu-item " :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)"  style="margin: 0;padding: 0;display: flex;justify-content: space-between;">
						<text>
							{{item}}
						</text>
					</view>
				</view>
				<view class="flex " style="justify-content: space-between;padding: 0 30upx;padding-top: 20upx;" v-if="inx==2">
					<view class="cu-item " :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabLists" :key="index" @tap="tabSelect(index)"  style="margin: 0;padding: 0;display: flex;justify-content: space-between;">
						<text>
							{{item}}
						</text>
					</view>
				</view>
				<view class="flex " style="justify-content: space-between;padding: 0 30upx;padding-top: 20upx;" v-if="inx==3">
					<view class="cu-item " :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabListss" :key="index" @tap="tabSelect(index)"  style="margin: 0;padding: 0;display: flex;justify-content: space-between;">
						<text>
							{{item}}
						</text>
					</view>
				</view>
			</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-ALIPAY -->
			<scroll-view scroll-x class="bg-white nav " style="font-size: 26upx;z-index: 99;-moz-box-shadow:0px 0px 4px #DDDDDD; -webkit-box-shadow:0px 0px 4px #DDDDDD; box-shadow:0px 0px 4px #DDDDDD;" v-if="storeSort != 1">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)"  style="margin: 0">
						{{item}}
					</view>
				</view>
			</scroll-view>
		<!-- #endif -->
		
		<view class="reservation-list-page" style="margin-top: 230upx;padding-bottom: 200upx;">
			
			<view class="reservation-list-item" style="" v-for="(item, index) in payList" :key="index" v-if="inx == 1">
				<view class="reservation-cotent" style="margin: 0 30upx;" @tap="gotoDetails(item)">
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;">
						<view class="flex justify-end align-center">
							<image :src="item.UserPoto" mode="scaleToFill" style="width: 46upx;height: 46upx;border-radius: 46upx;"></image>
							<view style="margin-left: 20upx;font-weight: 600;">
								<text>{{item.UserNeme}}</text>
							</view>
						</view>
						<view class=" flex align-center justify-center"  style="font-size: 26upx;color: #777777;">
							已支付
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 32upx;">
						<view style="width: 100%;">
							<view class="content-title-name flex align-center" style="">
								<view class="content-name-text flex align-center justify-center" style="font-size: 26upx;color: #777777;">
									<text>下单时间：{{beTime(item.AddDate)}}</text>
								</view>
							</view>
							<view class="flex" style="margin-top: 18upx;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">消费：</text>
									<text style="font-size: 26upx;color: #777777;">￥</text>
									<text style="font-size: 28upx;color: #777777;">{{item.XFJE}}</text>
								</view>
							</view>
							
							<view class="flex align-center justify-between" style="margin-top: 8upx;">
								<view class="flex align-center" style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">实收：</text>
									<text style="font-size: 26upx;color: #fe5479;">￥</text>
									<text style="font-size: 28upx;font-weight: 600;color: #fe5479;">{{item.SJXFJE}}</text>
								</view>
								<view class="flex align-center justify-center"  style="width: 146upx;height:60upx;border-radius:60upx;font-size: 24upx;color: #777777;border: 1upx solid #999999;line-height: 60upx;text-align: center;">
									查看详情
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index" @tap="navList(item)"> -->
			<view class="reservation-list-item" v-for="(item, index) in tgList" :key="index" v-if="inx == 2">
				
				<view class="reservation-cotent" style="margin: 0 30upx;"  @tap="gotoshopApplied(item)">
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;">
						<view class="flex justify-end align-center">
							<view style="font-weight: 600;">
								<text style="color: #333333;">核销码：<text style="font-size: 30upx;">{{item.b.Code}}</text></text>
							</view>
						</view>
						<view class="flex align-center justify-center"  style="width: 146upx;height:60upx;border-radius:60upx;font-size: 24upx;color: #777777;border: 1upx solid #999999;line-height: 60upx;text-align: center;">
							查看详情
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 32upx;">
						<view style="">
							<image :src="item.b.Imge" mode="scaleToFill" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;">
							<view class="shengLv" style="font-size: 28upx;color: #333333;">
								<text>{{item.b.SetMealName}}</text>
							</view>
							
							<view class="flex justify-between">
								<view style="color: #fe4e01;margin-top: 30upx;">
									<text style="color: #333333;">实收：</text>
									<text style="font-size: 30upx;color: #fe5479;">￥</text>
									<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">{{changeMoney(item.b.TotalPrice)}}</text>
								</view>
								<view style="margin-top: 30upx;color: #666666;">
									<text>数量：</text>
									<text>{{item.b.Num}}</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex justify-between align-center" style="margin: 0 30upx;margin-bottom: 0;border-top: 1.5upx solid #e4e4e4;padding:30upx 0;">
						<view class="flex justify-end align-center">
							<view style="font-size: 24upx;color: #777777;">
								<text>核销时间：{{beTime(item.b.HxDate)}}</text>
							</view>
						</view>
						<view class="flex justify-end" style="">
							<view class=" flex align-center justify-center"  style="font-size: 24upx;color: #777777;text-align: center;">
								核销人：{{item.HXname}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index"  v-if="inx==3">
				<view class="reservation-cotent" style="margin: 0 30upx;padding-bottom: 0upx;" @tap="gotoYuyue">
					<view class="flex justify-between align-center" style="margin: 30upx;margin-bottom: 0;border-bottom: 1.5upx solid #e4e4e4;padding:30upx 0;">
						<view class="flex justify-end align-center">
							<image src="https://img.huaxuapp.com/cpzs_10.png" mode="scaleToFill" style="width: 46upx;height: 46upx;border-radius: 46upx;"></image>
							<view style="margin-left: 20upx;font-weight: 600;">
								<text>一个小可爱</text>
							</view>
						</view>
						<view class=" flex align-center justify-center"  style="font-size: 26upx;color: #fe5479;">
							等待商家确认
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 30upx;">
						<view style="">
							<image src="https://img.huaxuapp.com/cpzs_10.png" mode="scaleToFill" style="width: 124upx;height: 124upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;">
							<view style="font-size:26upx;">
								<text style="color: #777777;">预约时间：</text>
								<text style="font-size: 26upx;color: #777777;">2020-12-12 10:20:33</text>
							</view>
							
							<view class="flex justify-between" style="margin: 10upx 0;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">联系人：</text>
									<text style="font-size: 26upx;">一个小可爱</text>
								</view>
							</view>
			
							<view class="flex justify-between">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">手机号：</text>
									<text style="font-size: 26upx;">156956156</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex align-center margin-left: 30upx;" v-if="getType(item) != '点餐' && item.Info">
						<text class="hxIcon-pingjia margin-left-xss"></text>
						<text class="margin-left-xss " style="font-size: 26upx;color: #777777;">备注：</text>
						<text class="flexs" style="font-size: 26upx;color: #777777;">{{ item.Info }}</text>
					</view>
					<view class="flex justify-between align-center" style="font-size:24upx;margin-left: 30upx;padding-bottom: 30upx;margin-top: 20upx;margin-right: 30upx;">
						<view>
							<text style="color: #777777;">下单时间：</text>
							<text style="color: #777777;">2020-12-12 10:20:33</text>
						</view>
						<view @tap.stop="reservationCancle(item.YYID, index)" class="flex align-center justify-center"  style="width: 146upx;height:60upx;border-radius:60upx;font-size: 24upx;color: #777777;border: 1upx solid #999999;line-height: 60upx;text-align: center;">
							拒绝预约
						</view>
					</view>
				</view>
			</view> -->
		</view>
		
			<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index" v-if="item.State == 7 && TabCur == 3 && inx==3">
				<view class="flex align-center  padding-lr padding-tb-big-xs">
					<text class="hxIcon-rili icon-calendar"></text>
					<text class="text-gray text-sm">{{ changeBeTime(item.BookAddDate || item.AddDate) }}</text>
				</view>
				<view class="reservation-cotent" style="margin: 0 30upx;">
					<view class="content-title flex align-center">
						<view class="content-title-name flex align-center">
							<view class="content-name-img" :style="{backgroundImage: 'url(' + item.LogoPic + ')'}"></view>
							<view class="content-name-text">
								{{ item.StoreName }}
							</view>
						</view>
						<view class="state-text" :class="item.State == 5?'state-text-success':'text-black'" v-if="!item.IsCheck">
							<text class="text-bold">{{ getStatus(item.State) }}</text>
						</view>
		
						<view class="state-text" v-else>
							<text>预约被拒绝</text>
						</view>
					</view>
					<view class="content-content">
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Num">
							<text class="hxIcon-renshu margin-left-sm"></text>
							<text class="margin-left-sm text-black text-bold">联系人：</text>
							<text class="margin-left-sm text-bold">{{ item.Contacts }}{{ item.Sex == 0 ? '先生' : '女士' }}</text>
						</view>
						<view class="flex align-center margin-top-sm" v-if="getType(item) != '点餐' && item.YCDate">
							<text class="hxIcon-yuyue margin-left-sm"></text>
							<text class="margin-left-sm text-bold">{{ item.YCDate }} {{ item.YCTime }}</text>
						</view>
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Num">
							<text class="hxIcon-renshu margin-left-sm"></text>
							<text class="margin-left-sm text-bold">{{ item.Num }}人</text>
						</view>
						<view class="flex align-center margin-top-sm" v-if="getType(item) != '点餐' && item.Phone">
							<text class="hxIcon-shouji2 margin-left-sm"></text>
							<text class="margin-left-sm text-black text-bold">手机号：</text>
							<text class="text-bold phone-text">{{ item.Phone }}</text>
						</view>
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Info">
							<text class="hxIcon-pingjia margin-left-xss"></text>
							<text class="margin-left-xss  text-bold flexss">备注信息：</text>
							<text class="flexs text-bold">{{ item.Info }}</text>
						</view>
						<view class="flex align-center margin-top bottom-content" :class="[getType(item) === '预约' ? 'justify-end' : 'justify-between']">
							<view class="reservation-info" v-if="getType(item) !== '预约'" >
								<text class="text-gray margin-right-sm">共{{item.sum}}件商品</text>
								<text class="text-gray">合计</text>
								<text class="text-black text-sm margin-left-xs">&yen;</text>
								<text class="text-bold text-lg margin-left-xxs">{{item.SalePrice?item.SalePrice:0}}</text>
							</view>
							<view class="reservation-btn flex align-center justify-center cancle" @tap.stop="reservationCancle(item.YYID, index)"
							 v-if="item.State == 5">
								<text class="">取消预约</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			
			
			<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index"  v-if="TabCur==1 && item.State == 5  && inx==3">
				<view class="flex align-center  padding-lr padding-tb-big-xs">
					<text class="hxIcon-rili icon-calendar"></text>
					<text class="text-gray text-sm">{{ changeBeTime(item.BookAddDate || item.AddDate) }}</text>
				</view>
				<view class="reservation-cotent"  style="margin: 0 30upx;">
					<view class="content-title flex align-center">
						<view class="content-title-name flex align-center">
							<view class="content-name-img" :style="{backgroundImage: 'url(' + item.LogoPic + ')'}"></view>
							<view class="content-name-text">
								{{ item.StoreName }}
							</view>
						</view>
						<view class="state-text" :class="item.State == 5?'state-text-success':'text-black'" v-if="!item.IsCheck">
							<text class="text-bold">{{ getStatus(item.State) }}</text>
						</view>
			
						<view class="state-text" v-else>
							<text>预约被拒绝</text>
						</view>
					</view>
					<view class="content-content">
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Num">
							<text class="hxIcon-renshu margin-left-sm"></text>
							<text class="margin-left-sm text-black text-bold">联系人：</text>
							<text class="margin-left-sm text-bold">{{ item.Contacts }}{{ item.Sex == 0 ? '先生' : '女士' }}</text>
						</view>
						<view class="flex align-center margin-top-sm" v-if="getType(item) != '点餐' && item.YCDate">
							<text class="hxIcon-yuyue margin-left-sm"></text>
							<text class="margin-left-sm text-bold">{{ item.YCDate }} {{ item.YCTime }}</text>
						</view>
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Num">
							<text class="hxIcon-renshu margin-left-sm"></text>
							<text class="margin-left-sm text-bold">{{ item.Num }}人</text>
						</view>
						<view class="flex align-center margin-top-sm" v-if="getType(item) != '点餐' && item.Phone">
							<text class="hxIcon-shouji2 margin-left-sm"></text>
							<text class="margin-left-sm text-black text-bold">手机号：</text>
							<text class="text-bold phone-text">{{ item.Phone }}</text>
						</view>
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Info">
							<text class="hxIcon-pingjia margin-left-xss"></text>
							<text class="margin-left-xss  text-bold flexss">备注信息：</text>
							<text class="flexs text-bold">{{ item.Info }}</text>
						</view>
						<view class="flex align-center margin-top bottom-content" :class="[getType(item) === '预约' ? 'justify-end' : 'justify-between']">
							<view class="reservation-info" v-if="getType(item) !== '预约'" >
								<text class="text-gray margin-right-sm">共{{item.sum}}件商品</text>
								<text class="text-gray">合计</text>
								<text class="text-black text-sm margin-left-xs">&yen;</text>
								<text class="text-bold text-lg margin-left-xxs">{{item.SalePrice?item.SalePrice:0}}</text>
							</view>
							<view class="reservation-btn flex align-center justify-center cancle" @tap.stop="reservationCancle(item.YYID, index)"
							 v-if="item.State == 5">
								<text class="">取消预约</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			
			
			<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index"  v-if="TabCur==0 && inx==3">
				<view class="flex align-center  padding-lr padding-tb-big-xs">
					<text class="hxIcon-rili icon-calendar"></text>
					<text class="text-gray text-sm">{{ changeBeTime(item.BookAddDate || item.AddDate) }}</text>
				</view>
				<view class="reservation-cotent"  style="margin: 0 30upx;">
					<view class="content-title flex align-center">
						<view class="content-title-name flex align-center">
							<view class="content-name-img" :style="{backgroundImage: 'url(' + item.LogoPic + ')'}"></view>
							<view class="content-name-text">
								{{ item.StoreName }}
							</view>
						</view>
						<view class="state-text" :class="item.State == 5?'state-text-success':'text-black'" v-if="!item.IsCheck">
							<text class="text-bold">{{ getStatus(item.State) }}</text>
						</view>
			
						<view class="state-text" v-else>
							<text>预约被拒绝</text>
						</view>
					</view>
					<view class="content-content">
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Num">
							<text class="hxIcon-renshu margin-left-sm"></text>
							<text class="margin-left-sm text-black text-bold">联系人：</text>
							<text class="margin-left-sm text-bold">{{ item.Contacts }}{{ item.Sex == 0 ? '先生' : '女士' }}</text>
						</view>
						<view class="flex align-center margin-top-sm" v-if="getType(item) != '点餐' && item.YCDate">
							<text class="hxIcon-yuyue margin-left-sm"></text>
							<text class="margin-left-sm text-bold">{{ item.YCDate }} {{ item.YCTime }}</text>
						</view>
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Num">
							<text class="hxIcon-renshu margin-left-sm"></text>
							<text class="margin-left-sm text-bold">{{ item.Num }}人</text>
						</view>
						<view class="flex align-center margin-top-sm" v-if="getType(item) != '点餐' && item.Phone">
							<text class="hxIcon-shouji2 margin-left-sm"></text>
							<text class="margin-left-sm text-black text-bold">手机号：</text>
							<text class="text-bold phone-text">{{ item.Phone }}</text>
						</view>
						<view class="flex align-center margin-tb-sm" v-if="getType(item) != '点餐' && item.Info">
							<text class="hxIcon-pingjia margin-left-xss"></text>
							<text class="margin-left-xss  text-bold flexss">备注信息：</text>
							<text class="flexs text-bold">{{ item.Info }}</text>
						</view>
						<view class="flex align-center margin-top bottom-content" :class="[getType(item) === '预约' ? 'justify-end' : 'justify-between']">
							<view class="reservation-info" v-if="getType(item) !== '预约'" >
								<text class="text-gray margin-right-sm">共{{item.sum}}件商品</text>
								<text class="text-gray">合计</text>
								<text class="text-black text-sm margin-left-xs">&yen;</text>
								<text class="text-bold text-lg margin-left-xxs">{{item.SalePrice?item.SalePrice:0}}</text>
							</view>
							<view class="reservation-btn flex align-center justify-center cancle" @tap.stop="reservationCancle(item.YYID, index)"
							 v-if="item.State == 5">
								<text class="">取消预约</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		<view >
			<phone-buttom :StoreID="StoreID" :IsLock="IsLock" :isShopowner="isShopowner" :Inx="Inx" style="z-index: 99;">
			</phone-buttom>
		</view>
	</view>
</template>

<script>
import phoneButtom from '../components/poWers'
export default {
	data() {
		return {
			reservationList: [],
			storeid: 0,
			currentPage: 1,
			ordersList: [],
			TabCur: 0,
			tabList: [
				'今日订单',
				'昨日订单',
				'本周订单',
				'全部订单',
				// '退款/售后'
			],
			tabLists: [
				'今日核销',
				'昨日核销',
				'本周核销',
				'总计核销',
				// '退款/售后'
			],
			tabListss: [
				'全部订单',
				'待付款',
				'待评价',
				'退款/售后'
			],
			storeSort: 0,
			tulist:[],
			state:[],
			inx: 1,
			Inx:2,
			StoreID: 0,
			IsLock:false,
			isShopowner:{},
			tgList:[],
			payList:[]
		};
	},
	onLoad(option) {
		this.StoreID = option.StoreID;
		this.IsLock = option.IsLock
		this.isShopowner = option.isShopowner;
		
		// this.$http.storeTg(option.StoreID,0,1,10).then(res => {
		// 	console.log(res);
		// 	if(res.IsSuccess){
		// 		this.tgList = res.Data
		// 	} else {
		// 		this.tgList = []
		// 	}
		// })
		
		this.$http.payOrder(option.StoreID,0,1,10).then(res => {
			console.log(res);
			if(res.IsSuccess){
				this.payList = res.Data
			} else {
				this.payList = []
			}
		})
		
		// this.getCurryInfo();
		if (this.isShopowner == 'true') {
			this.state = 2
		}
		this.$store.commit('changeYyyState', this.state);
			
		this.TabCur = 0
		this.currentPage = 1
		// this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
		// 	if (res.IsSuccess) {
		// 		this.reservationList = res.Data
		// 		console.log(this.reservationList)
		// 		this.reservationList.forEach(item => {
		// 			let DDList = item.ShopContent;
		// 			let sum = 0;
		// 			if (DDList) {
		// 				let list = JSON.parse(DDList);
		// 				list.forEach(dditem => {
		// 					sum += dditem.selectCount;
		// 				});
		// 			}
		// 			this.$set(item, 'sum', sum)
		// 		})
		// 	}
		// })
		// .catch(err => {
		// 	console.log(err);
		// })
	},
	onShow() {
		
	},
	methods: {
		changeMoney(money) {
			if (money < 0.01) {
				return money;
			} else {
				return this.$api.formatAmount(money);
			}
		},
		gotoshopApplied(e){
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/shopApplied?Ids=' + e.b.ID
			})
		},
		gotoDetails(e){
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/shopOrderdetails?Ids=' + e.XFID
			})
		},
		gotoYuyue(e){
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/yuyueDetail'
			})
		},
		qiHu(e){
			this.currentPage = 1
			this.inx = e
			this.TabCur = 0
			if(this.inx == 1) {
				this.$http.payOrder(this.StoreID,this.TabCur,1,10).then(res => {
					if(res.IsSuccess){
						console.log(res);
						this.payList = res.Data
					} else {
						this.payList = []
					}
				})
			}
			
			if(this.inx == 2) {
				this.$http.storeTg(this.StoreID,this.TabCur,1,10).then(res => {
					if(res.IsSuccess){
						console.log(res);
						this.tgList = res.Data
					} else {
						this.tgList = []
					}
				})
			}
			
			if(this.inx == 3) {
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				uni.stopPullDownRefresh()
				uni.hideLoading()
			}
		},
		gotos(){
			uni.navigateTo({
				url:'/pages/shopDetail/refundTrade'
			})
		},
		gotoss(){
			uni.navigateTo({
				url:'/pages/shopDetail/verifiCation'
			})
		},
		navList(item) {
			console.log(item)
			let addDate = item.BookAddDate|| item.AddDate
			if( item.BookID || item.DDID){
				uni.navigateTo({
					url: "/pages/person/bookOrderList?bookid=" + item.BookID + "&ddid=" + item.DDID + "&StoreId=" + item.StoreID
				})
			}else{
				uni.navigateTo({
					url: "/pages/person/bookOrderList?ycdate=" + item.YCDate+"&yctime="+ item.YCTime + "&num="+ item.Num+ "&phone="+ item.Phone + "&addDate="+addDate + "&state="+ item.State + "&StoreId=" + item.StoreID
				})
			}
		},
		changeBeTime(date) {
			if(date){
				return this.beTime(date)	
			}
		},
		getStatus: function (status) {
			let result
			switch (status) {
				case 1: 
					result = '待支付'
					break
				case 2:
					result = '已支付'
					break;
				case 3:
					result = '已点单'
					break;
				case 4:
					result = '已结算'
					break;
				case 5:
					result = '已预约'
					break;
				case 6:
					result = '已拒绝'
					break;
				case 7:
					result = '已取消'
					break;
				case 8:
					result = '已完成'
					break;
				case 9:
					result = '已超时'
					break;
				case 10:
					result = '已发货'
					break;
				case 11:
					result = '待发货'
					break;
				default:
					result = '未知状态'
			}
			return result
		},
		toPay(storeid,StoreName,LogoPic){
			if (this.$store.state.userInfo.ID) {
				uni.navigateTo({
					url:`/pages/scan/pay?type=shopDetail&storeid=${storeid}&StoreName=${encodeURIComponent(StoreName)}&LogoPic=${encodeURIComponent(LogoPic)}`
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
		getType: function (item) {
			let BookID = item.BookID,
				DeskNo = item.DeskNO
			let DDID =  item.DDID
			if(!DDID){
				return '预约'
			}else{
				if(DeskNo == 0){
					return '预点餐'
				}else{
					return '点餐'
				}
			}
		},
		reservationCancle: function(id, index) {console.log(id)
			uni.showModal({
				title: '拒绝预约',
				content: '您将拒绝预约，拒绝后将无法恢复',
				cancelText: '我再想想',
				confirmText: '确定拒绝',
				success: res => {
					if (res.confirm) {
						this.$http.cancleReservition(this.$store.state.userInfo.ID, id)
							.then(res => {
								if (res.IsSuccess) {
									this.$set(this.reservationList[index], 'State', 7)
								}
							})
							.catch(err => {
								console.log(err);
							})
					}
				}
			})
		},
		gotoEvaluation: function(id) {
		    uni.navigateTo({
		        url: `/pages/person/orderEvaluation?storeid=${id}`
		    })
		},
		call: function ( phone ) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		getTime: function (time) {
			let date = (time.split('(')[1].split(")")[0]) * 1
			return this.dateTimeFormatter(date)
		},
		dateTimeFormatter(t) {
			if (!t) return ''
			t = new Date(t).getTime()
			t = new Date(t)
			var year = t.getFullYear()
			var month = (t.getMonth() + 1)
			month = this.checkAddZone(month)
		
			var date = t.getDate()
			date = this.checkAddZone(date)
		
			var hour = t.getHours()
			hour = this.checkAddZone(hour)
		
			var min = t.getMinutes()
			min = this.checkAddZone(min)
		
			var se = t.getSeconds()
			se = this.checkAddZone(se)
		
			return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + se
		},
		checkAddZone(num) {
			return num < 10 ? '0' + num.toString() : num
		},
		getMoney: function (money) {
			return this.$api.formatAmount(money)
		},
		tabSelect: function (index) {
			this.TabCur = index
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			this.currentPage = 1
			if(this.inx == 1) {
				this.$http.payOrder(this.StoreID,this.TabCur,1,10).then(res => {
					if(res.IsSuccess){
						console.log(res);
						this.payList = res.Data
					} else {
						this.payList = []
					}
				})
			}
			
			if(this.inx == 2) {
				this.$http.storeTg(this.StoreID,this.TabCur,1,10).then(res => {
					if(res.IsSuccess){
						console.log(res);
						this.tgList = res.Data
					} else {
						this.tgList = []
					}
				})
			}
			
			if(this.inx == 3) {
				this.currentPage = 1
				this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
					if (res.IsSuccess) {
						this.reservationList = res.Data
						console.log(this.reservationList)
						this.reservationList.forEach(item => {
							let DDList = item.ShopContent;
							let sum = 0;
							if (DDList) {
								let list = JSON.parse(DDList);
								list.forEach(dditem => {
									sum += dditem.selectCount;
								});
							}
							this.$set(item, 'sum', sum)
						})
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
			this.tulist = [];
		},
		paraseContent: function (ShopContent) {
			let shop = JSON.parse(ShopContent)
			let count = 0
			shop.forEach( item => {
				count += item.selectCount
			})
			return count
		},
		refuseBook: function (item) {
			this.$http.refuseBook(item.Book.StoreID, item.Book.YYID)
			.then( res => {
				if (res.IsSuccess) {
					uni.showToast({
						title: res.Msg,
						duration: 1500
					})
				}
			})
			.catch( err => {
				console.log(err);
			})
		},
	},
	onReachBottom() {
		uni.showLoading({
			title: '加载中',
		});
		this.currentPage += 1
		
		if(this.inx == 1) {
			this.$http.payOrder(this.StoreID,this.TabCur,this.currentPage,10).then(res => {
				if (res.Data.length > 0) {
					this.payList = this.payList.concat(res.Data);
				} else {
					this.$api.msg('到底了~')
				}
			})
			uni.hideLoading()
		}
		
		if(this.inx == 2) {
			this.$http.storeTg(this.StoreID,this.TabCur,this.currentPage,10).then(res => {
				if (res.Data.length > 0) {
					this.tgList = this.tgList.concat(res.Data);
				} else {
					this.$api.msg('到底了~')
				}
			})
			uni.hideLoading()
		}
		
		if(this.inx == 3){
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
				if (res.IsSuccess) {
					this.reservationList = this.reservationList.concat(res.Data)
					if(res.Data.length == 0){
						this.currentPage --
					}
				}
			})
			uni.hideLoading()
		}
		
	},
	onPullDownRefresh() {
		this.currentPage = 1
		if(this.inx == 1) {
			this.$http.payOrder(this.StoreID,this.TabCur,1,10).then(res => {
				if(res.IsSuccess){
					console.log(res);
					this.payList = res.Data
				} else {
					this.payList = []
				}
			})
			uni.stopPullDownRefresh()
			uni.hideLoading()
		}
		
		if(this.inx == 2) {
			this.$http.storeTg(this.StoreID,this.TabCur,1,10).then(res => {
				if(res.IsSuccess){
					console.log(res);
					this.tgList = res.Data
				} else {
					this.tgList = []
				}
			})
			uni.stopPullDownRefresh()
			uni.hideLoading()
		}
		
		if(this.inx == 3) {
			this.currentPage = 1
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
				if (res.IsSuccess) {
					this.reservationList = res.Data
					console.log(this.reservationList)
					this.reservationList.forEach(item => {
						let DDList = item.ShopContent;
						let sum = 0;
						if (DDList) {
							let list = JSON.parse(DDList);
							list.forEach(dditem => {
								sum += dditem.selectCount;
							});
						}
						this.$set(item, 'sum', sum)
					})
				}
			})
			uni.stopPullDownRefresh()
			uni.hideLoading()
		}
	},
	components: {
		phoneButtom,
	}
};
</script>

<style scoped lang="scss">
	page{
		background-color: #f8f8f8;
	}
	
	.cu-btn {
		background: #ffffff;
		margin: 15upx;
		border: 1px solid #f0f0f0;
		border-radius: 5upx;
	}
	$base-color: #f8d1a3;  //基准背景色
	
	.order-managment-page {
		.order-list {
			margin-top: 90upx;
		}
		
		.order-item {
			&:last-child {
				margin-bottom: 30upx;
			}
		}
		
		.order-date {
			color: #999999;
			padding: 30upx;
			
			.hxIcon-rili {
				color: #f5ccc3;
			}
		}
		
		.tab-active {
			color: #fe5479;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 86upx;
				height: 6upx;
				left: 50%;
				transform: translateX(-50%);
				width: 40upx;
				background-color: #fe5479;
			}
		}
		
		.order-item-buyer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 10upx;
			border-bottom: 2upx solid rgba($color: #000000, $alpha: .1);
		}
		
		.state-text {
			color: #fe4e01;
		}
		
		.text-black {
			color: #666666;
		}
		
		.order-img {
			width: 70upx;
			height: 70upx;
			min-width: 70upx;
			min-height: 70upx;
			border-radius: 100upx;
			margin-right: 20upx;
		}
		
		.order-info {
			padding: 30upx;
			position: relative;
		}
		
		.pay-icon {
			position: absolute;
			top: -50px;
			right: 30px;
			transform: scale(5);
			color: #aaa;
		}
		
		.order-btns {
			display: flex;
			flex-direction: row;
			
			.btn {
				border-radius: 100upx;
				border: 1px solid #333;
				margin-left: 20upx;
				padding: 5upx 20upx;
				color: #FFFFFF;
			}
			
			.cancle-btn {
				@extend .btn;
				border: 1px solid #f04921;
				background-color: #f04921;
			}
			
			.ship-btn {
				@extend .btn;
				border: 1px solid #ffdc9d;
				background-color: #ffdc9d;
			}
		}
	}
</style>

<style scoped lang="scss">
	$reservation-red: #fe4e01;
	$reservation-pink: #fae6e1;
	$content-title-img-size: 64upx;

	.reservation-list-page {

		.icon-calendar {
			color: lighten($reservation-red, 30);
			font-size: 40upx;
			margin-right: 20upx;
		}

		.reservation-cotent {
			background: #FFFFFF;
			border-radius: 10upx;
			// box-shadow: 0 0 14upx rgba($color: #000000, $alpha: .1);

			.content-title {
				margin: 0 30upx;
				padding: 0upx 0;
				height: 108upx;
				line-height: 108upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1.4upx solid  solid rgb(228, 228, 228);

				.content-name-text {
					color: #666666;
					font-size: 28upx;
				}

				.content-name-img {
					width: $content-title-img-size;
					height: $content-title-img-size;
					border-radius: 8upx;
					background-position: center;
					background-size: cover;
					margin-right: 20upx;
				}

				.state-text-success {
					color: $reservation-red;
				}

				.state-text {
					font-size: 26upx;
				}
			}

			.content-content {
				padding: 30upx;
				
				.bottom-content{
					height: 54upx;
				}
				
				.phone-text {
					color: $reservation-red;
				}
			}

			.reservation-info {
				width: 48%;
			}

			.reservation-btn {
				border-radius: 1000upx;
				// padding: 10upx 25upx;
				width: 150upx;
				height: 54upx;
				font-size: 26upx;
			}

			.cancle {
				color: $reservation-red;
				background: $reservation-pink;
			}
			
			.cancles {
				color: #777777;
				background: #FFFFFF;
				border: 1upx solid #e4e4e4;
			}
			
			.toPay {
				color: #FFFFFF;
				background: #f3982d;
			}
		}
	}
	
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>