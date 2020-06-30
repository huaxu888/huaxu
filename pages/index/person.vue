<template>
	<view class="person-page">
		<view class=" flex align-end justify-start" style="width: 100%;height: 380upx;background: url('https://img.huaxuapp.com/personBg.png') no-repeat; background-size: cover; position: relative;overflow: hidden;">
			<view class="flex align-start justify-center margin-bottom " style="">
				<image :src="userInfo.FaceURL ? userInfo.FaceURL : 'https://img.huaxuapp.com/mrtx.png'" mode="aspectFill" class="touxiang" @tap="personRouter('/pages/person/setting/userInfo')"></image>
				
				
				<!-- <view class="touxiang" @tap="personRouter('/pages/person/setting/userInfo')" style="background-size: cover;" :style="{background: userInfo ? 'url('+userInfo.FaceURL+')' :'url(https://img.huaxuapp.com/mrtx.png) no-repeat' , backgroundSize : 'cover'}"></view> -->
				<view class="flex flex-direction align-start justify-end margin-left-sm" v-if="userInfo.Phone">
					<!-- 会员姓名 -->
					<view class="margin-bottom-xs  flex align-center margin-top-xs  ">
						<text class="text-white text-bold " style="font-size: 36upx; max-width: 330upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{ userInfo.Nick }}
						</text>
					</view>
					<!-- 会员等级 -->
					<view class="flex justify-center align-center " style="position: relative;">
						<view class="flex align-center justify-center" style="height: 46upx;width: 46upx;border: 1.8px solid #f1b556;border-radius: 50%;background: #FFFFFF;position: relative; z-index: 14; ">
							<!-- <text :class="userInfo.IsMK ? 'hxIcon-shangpu':'hxIcon-personTag' " style="font-size: 26upx;color: #f1b556;"></text> -->
							<text :class="userInfo.IsMK ? 'hxIcon-personTag':'hxIcon-personTag' " style="font-size: 26upx;color: #f1b556;"></text>
						</view>
						<!-- <view class="flex align-center justify-center" style="height: 36upx;width: 140upx; padding-left: 13upx; border-radius:1000upx;background: #f1b556;position: absolute;left: 20upx; z-index: 10;">
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;">{{ userInfo.IsMK ? '联盟商家' : '普通会员' }}</text>
						</view> -->
						<view class="flex align-center justify-center" style="height: 36upx;width: 140upx; padding-left: 13upx; border-radius:1000upx;background: #f1b556;position: absolute;left: 20upx; z-index: 10;">
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;">{{ '普通会员' }}</text>
							<!-- <text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "MLLevel == 1">{{ '一级会员' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "MLLevel == 2">{{ '二级会员' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "MLLevel == 3">{{ '三级会员' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "MLLevel == 4">{{ '四级会员' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "MLLevel == 5">{{ '五级会员' }}</text> -->
						</view>
					</view>
				</view>
				<!-- 未登录用户显示登录按钮 -->
				<view class="flex flex-direction align-start justify-end margin-left-sm" v-else @tap="toLogin()">
					<!-- 会员姓名 -->
					<view class="margin-bottom-xs flex align-center margin-top-xs  ">
						<text class="text-white text-bold " style="font-size: 40upx; max-width: 330upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">点击登录</text>
					</view>
					<!-- 会员等级 -->

					<view class="flex justify-center align-center ">
						<text style="font-size: 24upx; color: #EEEEEE;">登录更精彩</text>
					</view>
				</view>
				<!-- <view class="margin-left-sm margin-top-xs" v-else>
						<navigator class="text-white text-xl"  hover-class="none" url="/pages/common/login">
							注册/登录
						</navigator>
					</view> -->
			</view>
			
			<image style="margin-top: 20px;" @tap="toShop()" class="topStoreCard tran " v-if="userInfo.ID" :class="[cardImgIsLoad?'opacity-show':'opacity-hidden', cardFloat?'heart':''] " @load="picLoad" :src="sqdpFlag?'https://img.huaxuapp.com/dianpuguanli.png':'https://img.huaxuapp.com/zhuanshangjia.png'" ></image>

		</view>

		<view style="position:relative;top: -75upx;">
			<view class=" margin padding-sm  flex align-center justify-between" style=" border-radius: 20upx;background: #FFFFFF; margin-bottom: 20upx;">
				<view class="flex align-center justify-between padding-sm" style="width: 75%;min-height:110upx;">
					<view class="flex align-center justify-between flex-direction">
						<text style="font-size: 36upx;font-weight: bold;color: #333333;">{{changeMoney(mainInfo.MySy)}}</text>
						<text class="margin-top-xs" style="font-size: 24upx;color: #444444;">推广收益</text>
					</view>
					<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/balance')">
						<text style="font-size: 36upx;font-weight: bold;color: #333333;">{{changeMoney(mainInfo.consumable)}}</text>
						<text class="margin-top-xs" style="font-size: 24upx;color: #444444;">我的余额</text>
					</view>
					<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/myCoupon/myCouponPage')">
						<text style="font-size: 36upx;font-weight: bold;color: #333333;">{{mainInfo.ClipCouponsCount}}</text>
						<text class="margin-top-xs" style="font-size: 24upx;color: #444444;">优惠券</text>
					</view>
				</view>
				<view class="margin-left-xs" style="background: url('https://img.huaxuapp.com/dakuohao_03.png') no-repeat; background-size: 100% 100%;  width: 16upx; min-height: 110upx;"></view>

				<view class="flex align-center justify-between flex-direction padding-sm " style="min-height:110upx;padding-left: 10upx;padding-right: 10upx;"
				 @tap="personRouter('/pages/person/balance')">
					<view style="background: url('https://img.huaxuapp.com/wodeqianbao_03.png') no-repeat; background-size: 100% 100%;  width: 51upx; height: 39upx;"></view>
					<text style="font-size: 24upx;margin-top: 15upx;color: #444444;">我的钱包</text>
				</view>
			</view>


			<view class="margin" @tap="personRouter('/pages/person/strategy/help')" style="margin-bottom: 30upx; margin-top: 30upx; height: 180upx;border-radius: 20upx; background: url('https://img.huaxuapp.com/sygl_03.png') no-repeat; background-size: cover;">

			</view>
			<!-- 消费总额 -->
			<!-- <view class=" margin" style="border-radius: 10px; background: rgb(255, 255, 255); padding:15upx 40upx;" >
				<view class="padding flex" style=" justify-content:space-between; border-bottom: 0.7px solid #e4e4e4;;padding:15upx 20upx;padding-bottom: 14upx;margin-bottom: 18upx;padding-left: 0;">
					<text class="hxIcon-gerenzhongxin" style="color: rgb(255,65,48);font-size: 36upx;"><text style="font-size: 30upx;font-weight: 700;color: #333333;margin-left: 14upx;">消费总额</text></text>
					<text style="color: red;font-size: 40upx;font-weight: 600;"><text style="font-size: 24upx;">￥</text>{{changeMoney(TotalXiaoFei || 0)}}</text>
				</view>
				<view class="flex" style="justify-content:space-between;text-align: center;">
					<view>
						<view class="yangshi" style="color: rgb(255,65,48);">奖励类型</view>
						<view  class="yangshi" style="color: #999999">消费奖励</view>
						<view class="yangshi" style="color: #999999">推广奖励</view>
					</view>
					<view>
						<view class="bgys"><view class="yangshi">累计收益</view></view>
						<view  class="yangshi yangshis" style="font-weight:600;">{{changeMoney(SavePoints || 0)}}</view>
						<view class="yangshi yangshis" style="font-weight:600; ">{{changeMoney(SpreadPoints || 0)}}</view>
					</view>
					<view>
						<view class="bgys"><view class="yangshi" >当日收益</view></view>
						<view class="yangshi yangshis" style="font-weight:600;color: rgb(191, 0, 0);">{{changeMoney(JrChuXu || 0)}}</view>
						<view class="yangshi yangshis" style="font-weight:600;color: rgb(191, 0, 0);">{{changeMoney(JrTuiGuang || 0)}}</view>
					</view>
					<view>
						<view class="bgys"><view class="yangshi">可用余额</view></view>
						<view class="yangshi yangshis" style="font-weight:600;">{{changeMoney(ChuXu || 0)}}</view>
						<view class="yangshi yangshis" style="font-weight:600;" @tap="withdrawal('promotion')">{{changeMoney(TuiGuang || 0)}}</view>
					</view>
				</view>	
			</view> -->
			
			<!-- 营业总额 -->
			<!-- <view class=" margin" style="border-radius: 10px; background: rgb(255, 255, 255); padding:15upx 40upx;" >
				<view class="padding flex" style=" justify-content:space-between;border-bottom: 1upx solid #d4d4d4;padding:15upx 20upx;padding-bottom: 14upx; margin-bottom: 18upx;padding-left: 0;">
					<text class="hxIcon-shangjia" style="color: rgb(241,181,86); font-size: 36upx;"><text style="font-size: 30upx;font-weight: 700;color: #333333;margin-left: 14upx;">自营总额</text></text>
					<text style="color: rgb(255, 0, 0); font-size: 40upx;font-weight: 600;"><text style="font-size: 24upx;">￥</text>{{changeMoney(StoreToatl || 0)}}</text>
				</view>
				<view class="flex" style="justify-content:space-between;text-align: center;">
					<view>
						<view class="yangshi" style="color: rgb(255,65,48);">奖励类型</view>
						<view class="yangshi" style="color: #999999">分润奖励</view>
						<view class="yangshi" style="color: #999999">自营店铺</view>
					</view>
					<view>
						<view class="bgys"><view class="yangshi">净利润</view></view>
						<view class="yangshi yangshis" style="font-weight:600;">{{changeMoney(ProfitPoints || 0)}}</view>
						<view class="yangshi yangshis" style="font-weight:600;">{{changeMoney(StoreTotallr || 0)}}</view>
					</view>
					<view>
						<view class="bgys"><view class="yangshi">当日收益</view></view>
						<view class="yangshi yangshis" style="font-weight:600;color: rgb(191, 0, 0);">{{changeMoney(JrFenRun || 0) }}</view>
						<view class="yangshi yangshis" style="font-weight:600;color: rgb(191, 0, 0);">{{changeMoney(JrStoreToatl || 0)}}</view>
					</view>
					<view>
						<view class="bgys"><view class="yangshi">可用余额</view></view>
						<view class="yangshi yangshis" style="font-weight:600;" @tap="withdrawal('earnings')">{{changeMoney(FenRun || 0)}}</view>
						<view class="yangshi yangshis" style="font-weight:600;" @tap="withdrawal('store')">{{changeMoney(StorePoint || 0)}}</view>
					</view>
				</view>
			</view> -->
			
			<!-- 我的订单 -->
			<view class=" margin" style="border-radius: 10px; background: rgb(255, 255, 255); padding:15upx 40upx;padding-bottom:38upx" >
				<view class="padding flex" style=" justify-content:space-between; border-bottom: 0.7px solid #e4e4e4;;padding:15upx 20upx;padding-bottom: 20upx;padding-left: 0;margin-bottom: 30upx;padding-right: 0;" @tap="tiaozhuan(0)">
					<text style="font-size: 30upx;font-weight: 700;color: #333333;">我的订单</text>
					<text style="font-size: 24upx;color: #999999;">查看全部订单<text class="cuIcon-right"></text></text>
				</view>

				<view class=" flex align-center justify-between" style="height: 100%;padding: 0 26upx;">
					<view class="flex align-center justify-between flex-direction" v-for="(centerItem, centerIndex) of centerCardList"
					 :key="centerIndex" @tap="tiaozhuan(centerIndex+1)">
						<view style="height: 58upx; width: 58upx;"
						 :style="{background :  'url('+centerItem.picUrl+') no-repeat' , backgroundSize : 'cover'} "></view>
						<text class="margin-top-sm" style="font-size: 24upx;">{{centerItem.title}}</text>
					</view>
				</view>
			</view>
			
			
			<!-- 常用工具 -->
			<view class=" margin" style="border-radius: 10px; background: rgb(255, 255, 255); padding:15upx 0;padding-bottom:38upx" >
				<view class="padding flex" style=" justify-content:space-between; padding:15upx 20upx;padding-bottom: 18upx;padding-left: 40upx;">
					<text style="font-size: 30upx;font-weight: 700;color: #333333;">常用工具</text>
				</view>
			
			
			
				<view class="bg-white " v-for="(items, index) of cardList" :key="index" >
						
					<view class="flex align-center justify-start flex-wrap " style="position: relative; padding: 0 20upx;">
						<view class="flex flex-direction align-center "  v-for="(i, j) of items.list" :key="j" @tap="personRouter(i.navigate)" style="position: relative;width: 25%;">
							<!-- <image :src="i.picUrl" style="width: 45upx; height: 45upx; margin-top: 36upx;" v-if="i.picUrl"></image> -->
							<text :class="i.icon" style="font-size: 65upx; margin-top: 35upx;color:#f34e2d;"></text>
							<!-- <view  style="height: 26upx;width: 87upx;position: absolute;top: 14upx;right: -10upx;background: url('https://img.huaxuapp.com/zhuan10yuan_03.png') no-repeat; background-size: cover;" v-if="j==0">
							</view> -->
							<view  style="height: 26upx;width: 87upx;position: absolute;top: 14upx;right: -10upx;background: url('https://img.huaxuapp.com/hdhdh.png') no-repeat; background-size: cover;" v-if="j==0">
							</view>
							<view style="width:45upx;height: 6upx;border-radius: 50%;background: #f9c7c7;"></view>
							<text style="font-size: 24upx;margin-top:15upx ;color: #333333;">{{ i.title }}</text>
						</view>
					</view>
				</view>
				
			</view>
			
			
			
			
			
			<!-- 弹窗 -->
			<tui-modal :show="isShowTips" @cancel="closeTips" :custom="true">
				<view class="flex align-center flex-direction justify-center">
					<view class="margin-top-sm   flex flex-direction" style="color: #999999;font-size: 36upx;font-weight: 600;">
						<text>购物成功，账户激活！</text>
					</view>
			
					<view @tap="closeTips" class="margin-top padding-lr-lg  bg-hx-red" style="border-radius: 1000upx;padding-top: 12upx; padding-bottom: 12upx;">
						<text class="text-white">我知道了</text>
					</view>
				</view>
			</tui-modal>
			
			
			
			<!-- <view class="margin" @tap="personRouter('/pages/person/strategy/help')" style="margin-bottom: 20upx; margin-top: 20upx; height: 180upx;border-radius: 20upx; background: url('https://img.huaxuapp.com/sygl_03.png') no-repeat; background-size: cover;">

			</view> -->

			<!-- <view class="margin padding" style="margin-top: 20upx; margin-bottom: 20upx; padding-left: 50upx; padding-right: 50upx;  border-radius: 20upx; background: url('https://img.huaxuapp.com/wodegn_03.png') no-repeat; background-size: 100% 100%;">

				<view class=" flex align-center justify-between" style="height: 100%;">
					<view class="flex align-center justify-between flex-direction" v-for="(centerItem, centerIndex) of centerCardList"
					 :key="centerIndex" @tap="personRouter(centerItem.navigate)">
						<view style="height: 58upx; width: 58upx; background-size: 100% 100%;"
						 :style="{background :  'url('+centerItem.picUrl+') no-repeat' , backgroundSize : 'cover'} "></view>
						<text class="margin-top-sm" style="font-size: 24upx;">{{centerItem.title}}</text>
					</view>
				</view>
			</view>
 -->

			<!-- <view class="bg-white margin" style="padding: 30upx;margin-top: 20upx; border-radius: 20upx;" v-for="(items, index) of cardList"
			 :key="index">
				<view style="font-size: 28upx; font-weight: 700;color: #333333;">{{ items.title }}</view>
				<view class="flex align-center justify-start flex-wrap ">
					<view class="flex flex-direction align-center " style="width: 25%;position: relative;" v-for="(i, j) of items.list" :key="j" @tap="personRouter(i.navigate)"> -->
						<!-- <image :src="i.picUrl" style="width: 45upx; height: 45upx; margin-top: 36upx;" v-if="i.picUrl"></image> -->
						<!-- <text :class="i.icon" style="font-size: 65upx; margin-top: 35upx;color:#f34e2d;"></text>
						<view  style="height: 26upx;width: 87upx;position: absolute;top: 14upx;right: -10upx;background: url('https://img.huaxuapp.com/zhuan10yuan_03.png') no-repeat; background-size: cover;" v-if="j==0">
						</view>
						<view style="width:45upx;height: 6upx;border-radius: 50%;background: #f9c7c7;"></view>
						<text style="font-size: 24upx;margin-top:15upx ;color: #333333;">{{ i.title }}</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import tuiModal from "@/components/modal/modal"
	export default {
		components:{
			tuiModal
		},
		data() {
			return {
				centerCardList: [
					{
						picUrl: 'https://img.huaxuapp.com/wdddd_10.png',
						title: '预约订单',
						navigate: '/pages/shopManagement/sonPage/orderManagers'
					},
					{
						picUrl: 'https://img.huaxuapp.com/wdddd_03.png',
						title: '待评价',
						navigate: '/pages/shopManagement/sonPage/orderManagers'
					},
					{
						picUrl: 'https://img.huaxuapp.com/wdddd_07.png',
						title: '已取消',
						navigate: '/pages/shopManagement/sonPage/orderManagers'
					},
					{
						picUrl: 'https://img.huaxuapp.com/wdddd_05.png',
						title: '售后',
						navigate: '/pages/shopManagement/sonPage/orderManagers'
					},
				],
				string: 'cover',
				cardList: [{
					title: '常用工具',
					list: [{
							icon: 'hxIcon-tuijianyoujiang',
							title: '推荐有奖',
							navigate: '/pages/person/share'
						},
						{
							icon: 'hxIcon-jifen1',
							title: '消费历史',
							navigate: '/pages/person/historyConsumption'
						},
						{
							icon: 'hxIcon-zhaoshangdaili1',
							title: '招商代理',
							navigate: 'agent'
						},
						{
							icon: 'hxIcon-tuandui1',
							title: '我的粉丝',
							navigate: '/pages/person/myTeam'
						},
						{
							icon: 'hxIcon-shoucangjia',
							title: '店铺收藏', 
							navigate: '/pages/person/collectStore'
						},
						{
							icon: 'hxIcon-kefuzhongxin',
							title: '客服中心', 
							navigate: 'customerService'
						},
						{
							icon: 'hxIcon-guanyuwomen',
							title: '关于我们',
							navigate: '/pages/person/aboutUs'
						},
						{
							icon: 'hxIcon-bangdingyinhangka',
							title: '绑银行卡',
							navigate: '/pages/person/bindBank'
						},
						{
							icon: 'hxIcon-chongzhika',
							title: '充值卡',
							navigate: '/pages/person/rechargeCard'
						},
						{
							icon: 'hxIcon-shezhi2',
							title: '设置',
							navigate: '/pages/person/setting/setting'
						},
					]
				}],
				mainInfo: {
					// MyZz: 0, //我的预存
					MySy: 0, //我的总收益
					consumable: 0, //我的余额
					ClipCouponsCount: 0 //优惠券的数量
				},
				sqdpFlag: false, //判断 是true商铺管理还是 false转商家  
				userInfo: '',
				HBJS: '0.00',
				shopData: '',
				agentState: 4,
				adcode:''  ,//区划码
				cardImgIsLoad:false,
				cardFloat:false,
				isShowTips: false,  		//展示提示框	
				ChuXu:0,					//储蓄积分
				FenRun:0,					//分润
				JrChuXu:0,					//今日储蓄
				JrFenRun:0,					//今日分润
				JrStoreToatl:0,				//自营店铺今日利润
				JrTuiGuang:0,				//今日推广					
				StorePoint:0,             	//自营店铺剩余   
				StoreToatl:0,             	//自营店铺总营业额
				Total:0,
				TotalXiaoFei:0,				//总消费
				TuiGuang:0,					//推广
				StoreTotallr:0,           	//自营店铺总利润 
				SavePoints:0,				//总储蓄积分
				SpreadPoints:0,				//总推广积分
				ProfitPoints:0,             //总分润积分
				MLLevel:0					//等级
			}
		},
		async onLoad() {
			console.log(this.$store.state.userInfo, '用户信息');
			if (this.$store.state.userInfo.ID) {
				this.userInfo = this.$store.state.userInfo;
			}
			// #ifdef H5 || MP-ALIPAY
				await this.getSite();
			// #endif
			
			// #ifndef H5 || MP-ALIPAY
			//获取行政区划码
				await this.getRegeo();
				// 通过行政区划获取站点
				await this.newGetSite();
			// #endif
			let _this = this;
			uni.request({
				url:'https://newsapp.huaxuapp.com/api/menber/myinfo?userId='+  this.$store.state.userInfo.ID,
				success(e) {
					console.log(e);
					_this.ChuXu = e.data.ChuXu;
					_this.FenRun = e.data.FenRun;
					_this.JrChuXu = e.data.JrChuXu;
					_this.JrFenRun = e.data.JrFenRun;
					_this.JrStoreToatl = e.data.JrStoreToatl;;
					_this.JrTuiGuang = e.data.JrTuiGuang;
					_this.StorePoint = e.data.StorePoint;
					_this.StoreToatl = e.data.StoreToatl;
					_this.Total = e.data.Total;
					_this.TotalXiaoFei = e.data.TotalXiaoFei;
					_this.TuiGuang = e.data.TuiGuang;
					_this.StoreTotallr = e.data.StoreTotallr;
					
					_this.SpreadPoints = e.data.User.SpreadPoints;
					_this.ProfitPoints = e.data.User.ProfitPoints;
					_this.MLLevel = e.data.User.MLLevel;
				}
			});
			
		},
		onShow() {
			//XXX 留下 userinfo 赋值
			let self = this;
			if (this.$store.state.userInfo.ID) {
				self.userInfo = this.$store.state.userInfo;
				this.agentState = 4;
				
				this.cardFloat = false;
				
				setTimeout(() => {
					this.cardFloat = true;
				}, 100);
				
				this.isSqdp();
				//余额，收益的展示
				this.getMyinfo();
				//收益 余额 优惠券个数
				this.getIsAgent();
				//是否为代理
			} else {
				self.userInfo = '';
				self.mainInfo.ClipCouponsCount = 0
				// self.mainInfo.MyZz = 0;
				self.mainInfo.MySy = 0;
				self.mainInfo.consumable = 0;
			}
			
			
			uni.request({
				url:'https://newsapp.huaxuapp.com/api/menber/myinfo?userId='+  this.$store.state.userInfo.ID,
				success(e) {
					console.log(e);
					self.ChuXu = e.data.ChuXu;
					self.FenRun = e.data.FenRun;
					self.JrChuXu = e.data.JrChuXu;
					self.JrFenRun = e.data.JrFenRun;
					self.JrStoreToatl = e.data.JrStoreToatl;;
					self.JrTuiGuang = e.data.JrTuiGuang;
					self.StorePoint = e.data.StorePoint;
					self.StoreToatl = e.data.StoreToatl;
					self.Total = e.data.Total;
					self.TotalXiaoFei = e.data.TotalXiaoFei;
					self.TuiGuang = e.data.TuiGuang;
					self.StoreTotallr = e.data.StoreTotallr;
					
					self.SpreadPoints = e.data.User.SpreadPoints;
					self.ProfitPoints = e.data.User.ProfitPoints;
					self.MLLevel = e.data.User.MLLevel;
				}
			});
		},
		methods: {
			tiaozhuan(e) {
				uni.navigateTo({
					url:'/pages/shopManagement/sonPage/orderManagers?index=' + e,
					success() {
						console.log("1")
					}
				})
			},
			showTips() {
				this.isShowTips = true;
			},
			closeTips() {
				this.isShowTips = false;
			},
			picLoad(){
				this.cardImgIsLoad = true;
				// this.cardFloat = true;
			},
			withdrawal: function (type) {
				uni.navigateTo({
					url: `/pages/person/withdrawal?type=${type}`
				})
			},
			async newGetSite() {
				//站点
				await this.$http.newGetSite({
					citycode : this.adcode
				}).then(res => {
					this.$store.commit('setSiteList', res) //登陆后在person页面没有站点信息，直接进店铺是没有的，所以需要获取一下
					// this.siteList = res;
					// this.$store.commit('setSite', this.siteList[0]);
				}).catch(res => {
			
				});
			},
			async getSite() {
				//站点
				await this.$http.getSite().then(res => {
					this.$store.commit('setSiteList', res) //登陆后在person页面没有站点信息，直接进店铺是没有的，所以需要获取一下
				}).catch(res => {
			
				});
			
			},
			async getRegeo() {
				let res = await this.adcodePromise().then(res=>{
					this.adcode = res.replace(/\"/g, "");
				}).catch(err =>{
					
				});
				
			},
			adcodePromise() {
				return  new Promise((resolve, reject) => {
					new amap.AMapWX({
						key: this.key
					}).getRegeo({
						success: (data) => {
							let addressName = JSON.stringify(data[0].regeocodeData.addressComponent.adcode);
							resolve(addressName)
						},fail: (err) => { 
						}
					});
				})
			},
			getIsAgent() {
				let self = this;
				uni.request({
					url: 'https://newsapp.huaxuapp.com/api/agent/isagent',
					data: {
						userid: self.$store.state.userInfo.ID
					},
					success: (res) => {
						self.agentState = res.data.Data.state
						//  0 申请代理 3 驳回 1 审核中 2 代理管理页面
					}
				})
			},
			getMyinfo() {
				let self = this;
				uni.request({
					url: 'https://newsapp.huaxuapp.com/api/menber/myinfo',
					data: {
						userId: self.userInfo.ID
					},
					success: function(res) {
						if (res.data.IsSuccess) {
							// self.mainInfo.MyZz = res.data.MyZz 
							self.mainInfo.ClipCouponsCount = res.data.ClipCouponsCount; //优惠券的数量
							self.mainInfo.MySy = res.data.MySy; //我的收益
							self.mainInfo.consumable = res.data.User.Score;
						} else {
							self.mainInfo.MySy = 0;
							self.mainInfo.consumable = 0;
						}
					},
					fail: function() {
						self.mainInfo.ClipCouponsCount = 0;
						self.mainInfo.MySy = 0;
						self.mainInfo.consumable = 0;
					}
				});
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			help() {
				uni.navigateTo({
					url: '/pages/person/strategy/help',
				})
			},
			toLogin(){
				uni.navigateTo({
					url: '/pages/common/login'
				})
			},
			personRouter: function(path) {
				if (path == 'customerService') {
					setTimeout(() => {
						this.$api.showModal({
							title: '客服电话',
							content: '400-6688-352',
							confirmText: '我知道了',
							confirmColor: "#333333",
							cancelColor: '#f34e2d',
							cancelText: '拨打电话',
							showCancel: true
						}).then(res => {
							if (!res) {
								uni.makePhoneCall({
									phoneNumber: '400-6688-352'
								})
							}
						});
					})
					return
				}

				if (this.$store.state.userInfo.ID) {
					if (path == 'agent') {
						//  0 申请代理 3 驳回 1 审核中 2 代理管理页面
						if (this.agentState == 1 || 3) {
							this.getIsAgent();
						}
						if (this.agentState == 1) {
							setTimeout(() => {
								this.$api.showModal({
									title: '申请信息',
									content: '代理申请正在审核中，请耐心等待',
									showCancel: false
								})
							})
							return
						}

						if (this.agentState == 3) {
							setTimeout(() => {
								this.$api.showModal({
									title: '申请信息',
									content: '申请代理被驳回，请重新申请',
									showCancel: false
								})
							}, 900)
							uni.navigateTo({
								url: '/pages/agency/applicationAgency'
							})
							return
						}

						if (this.agentState == 0) {
							uni.navigateTo({
								url: '/pages/agency/applicationAgency'
							})
							return
						}

						if (this.agentState == 2) {
							uni.navigateTo({
								url: '/pages/personalAgent/personalAgentPage'
							})
							return
						}
						return
					}

					uni.navigateTo({
						url: path
					})

				} else {
					this.$api.msg('请先登录');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/common/login'
						})
					}, 1200);
				}
			},
			isSqdp: function() {
				let userId = this.$store.state.userInfo.ID;
				this.$Request.get(this.$store.state.isSqdpUrl, {
					userid: userId
				}, false).then(res => {
					this.sqdpFlag = res.IsSuccess;
					this.shopData = res
				})
			},
			toShop: function() {
				if(!this.shopData){
					return
				}
				
				if (this.shopData.IsYYY ) {
					let url  =`/pages/shopManagement/shopManagmentPage?StoreID=${this.shopData.Data.StoreID}&IsLock=${this.shopData.Data.IsLock}&state=${this.shopData.SortTag}`
					if(this.shopData.SortTag == 1){
						//收银员
						url = url + `&isShopowner=false`
					}
					
					if(this.shopData.SortTag == 2){
						//店长
						url = url + `&isShopowner=true`
					}
					
					uni.navigateTo({
						url
					})
					return
				} else {
					if (!this.shopData.IsYYY ) {
						uni.navigateTo({
							url: '/pages/changeBusiness/changeBusinessList/changeBusinPage'
						})
					}
				}
			},
			// goToDetail() {
			// 	if (this.$store.state.hasLogin) {
			// 		uni.navigateTo({
			// 			url: '/pages/myStorage/myStoragepage'
			// 		})
			// 	} else {
			// 		this.$api.msg('请先登录');
			// 		setTimeout(() => {
			// 			uni.navigateTo({
			// 				url: '/pages/common/login'
			// 			})
			// 		}, 1200);
			// 	}
			// }
		}
	};
</script>

<style>
	page {
		background-color: #F8F8F8 !important;
	}
</style>

<style scoped lang="scss">
	.yangshi {
		height: 46upx;
		margin:15upx 0;
		line-height: 46upx;
		font-size: 24upx;
	}
	
	.yangshis {
		font-size: 28upx;
	}
	
	.bgys {
		background-color: #EEEEEE;
		border-radius: 30upx;
		padding: 0 15upx;
	}
	
	.b {
		border: 2px solid #1CBBB4;
	}
	
	.heart{
		animation: heart 0.9s ease-in-out 0s 10 alternate ;
	}
	
	//用transform就流畅了
	@keyframes heart{
	from{transform:translate(0,0)}
	to{transform:translate(0,9px)}
	}
	
	.tran{
		transition: all .5s  ease-in-out;
	}
	
	.opacity-show{
		opacity: 1;
	}
	.opacity-hidden{
		opacity: 0;
	}

	.touxiang {
		width: 136upx;
		height: 136upx;
		border-radius: 10upx;
		margin-left: 30upx;
		margin-bottom: 35upx;
	}


	.topStoreCard {
		width: 176upx;
		height: 252upx;
		position: absolute;
		right: 0;
		bottom: -70upx;
	}
	
	.shopManag{
		background: url('https://img.huaxuapp.com/dianpuguanli.png') no-repeat;
		background-size:cover; 
	}
	
	.becomeShop{
		background: url('https://img.huaxuapp.com/zhuanshangjia.png') no-repeat;
		background-size:cover; 
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.gradien-hongbao1 {
		background-image: linear-gradient(top left, #f9a163, #ec6203);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}


	.person-page {

		[class*='hxIcon-'] {
			font-size: 44upx;
		}

		.person-info {
			position: relative;
			background-image: url(../../static/bgimg.png);
			background-size: 100%;
			background-repeat: no-repeat;

			.hx-avatar {
				width: 136upx;
				height: 136upx;
				background-size: cover;
				border-radius: 10upx;
				border: 5upx solid #d4343f;
				margin: 30upx;
			}

			.nickname_ {
				.nick_Name {
					max-width: 330upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.shop {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 160upx;
				height: 60upx;
				border-radius: 10000upx 0 0 10000upx;
				color: #333;
				background: #facd89;
			}
		}

		.data-board {
			margin: 30upx;
			border-radius: 10upx;
			height: 180upx;

			.data-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 0 30upx;
				

				&:nth-child(2) {
					border-left: solid #e5e5e5 1px;
					border-right: solid #e5e5e5 1px;
				}

				.data-amount {
					font-size: 38upx;
					font-weight: bold;
					color: #ec3a46;
					margin-bottom: 10upx;
				}
			}
		}

		.ad {
			margin: 30upx;
			width: 690upx;
			height: 180upx;

			.img {
				width: 690upx;
				display: block;
				height: auto;
			}
		}
	}
</style>
