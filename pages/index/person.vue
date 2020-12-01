<template>
	<view class="person-page" v-if="IDs">
		<view class=" flex justify-start" style="width: 750upx;height: 505upx;background: url('https://img.huaxuapp.com/personal_02.png') no-repeat; background-size: cover; position: relative;overflow: hidden;">
			<view class="" style="margin-top: 198upx;" v-if="userInfo.Phone">
				<view class="flex align-center justify-between" style="width: 690upx;margin-left: 30upx;" :class="isSticky?'fixed-tops':'fixed-topsx'">
					<view class="flex align-center justify-center">
						<view style="width: 100upx;height: 100upx;border-radius: 50%;" @tap="personRouter('/pages/person/setting/userInfo')">
							<image style="width: 100upx;height: 100upx;border-radius: 50%;" :src="userInfo.FaceURL ? userInfo.FaceURL : 'https://img.huaxuapp.com/6454608_.pic.jpg'" mode="aspectFill"></image>
						</view>
						<view class="margin-left" style="width: 320upx;">
							<view style="font-size: 32upx;color: #333333;" class="text-bold text-cut">{{userInfo.Nick}}</view>
							<view class="margin-top-xs" style="font-size: 24upx;color: #666666;">
								<text class="hxIcon-shouji3" style="font-size: 26upx;"></text><text>{{clPhone(userInfo.Phone)}}</text>
							</view>
						</view>
					</view>
					<view @tap="toShop()" v-if="userInfo.ID" class="flex align-center justify-center" style="background-color: #fcefe1;border: 1px solid #fbbb87;  border-radius: 1000upx;width: 160upx;height: 56upx;line-height: 56upx;">
						<text style="line-height: 1em;font-size: 26upx;color: #333333;margin-left: 12upx;" v-if="sqdpFlag">商家端<text class="cuIcon-right" style="margin-left: 10upx;"></text></text>
						<text style="line-height: 1em;font-size: 26upx;color: #333333;margin-left: 12upx;" v-if="!sqdpFlag">转商家<text class="cuIcon-right" style="margin-left: 10upx;"></text></text>
					</view>
				</view>
				
				
				<view class="flex align-center justify-between" style="width: 750upx;background-color: #fff4e9;height: 100upx;" :class="isSticky?'fixed-top':''"  :style="{top:isSticky?'0px':''}"  v-if="isSticky == true">
					<view class="flex align-center justify-center" style="margin-left: 30upx;">
						<view style="width: 48upx;height: 48upx;border-radius: 50%;" @tap="personRouter('/pages/person/setting/userInfo')">
							<image style="width: 48upx;height: 48upx;border-radius: 50%;" :src="userInfo.FaceURL ? userInfo.FaceURL : 'https://img.huaxuapp.com/6454608_.pic.jpg'" mode="aspectFill"></image>
						</view>
						<view class="margin-left" style="width: 320upx;">
							<view style="font-size: 28upx;color: #333333;" class="text-bold text-cut">{{userInfo.Nick}}</view>
						</view>
					</view>
				</view>
				
				<view class="flex align-center justify-between" style="padding: 0 30upx;margin-top: 14upx;margin-left: 30upx;">
					<view class="flex align-center justify-between padding-sm" style="width: 100%;">
						<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/collectStore?inx=1')">
							<text style="font-size: 32upx;color: #000000;">{{thingNums}}</text>
							<text class="margin-top-xs" style="margin-top: 2upx;font-size: 24upx;color: #333333;">商品收藏</text>
						</view>
						<view style="width: 2upx;background-color: #d2d2d2;height: 26upx;margin-top: 50upx;"></view>
						<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/collectStore?inx=2')">
							<text style="font-size: 32upx;color: #000000;">{{StoreSC}}</text>
							<text class="margin-top-xs" style="margin-top: 2upx;font-size: 24upx;color: #333333;">店铺收藏</text>
						</view>
						<view style="width: 2upx;background-color: #d2d2d2;height: 26upx;margin-top: 50upx;"></view>
						<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/personalAgent/perSonage')">
							<text style="font-size: 32upx;color: #000000;">{{shopListNum}}</text>
							<text class="margin-top-xs" style="margin-top: 2upx;font-size: 24upx;color: #333333;">我的足迹</text>
						</view>
					</view>
				</view>
				<view @tap="gotoVIP" style="width: 710upx;height: 71upx;position: relative;margin-left: 20upx;margin-top: 6upx;">
					<image src="https://img.huaxuapp.com/hkhy1102_03.png" mode="scaleToFill" style="width: 710upx;height: 71upx;"></image>
					<view style="font-size: 22upx;color: #fceee0;position: absolute;top: 22upx;left: 85upx;">
						<text>开通黑卡会员，平均可省680元/年</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view style="position:relative;">
			<view @tap="personRouter('/pages/person/recharges')" class=" margin padding-sm  flex align-center justify-between" style="margin-top: 20upx ;padding-top: 24upx;border-radius: 20upx 20upx 0 0;background: #FFFFFF;margin-bottom: 0;padding-bottom: 0;">
				<view style="font-size: 30upx;color: #000000;font-weight: 600;margin-left: 10upx;">
					我的钱包
				</view>
			</view>
			<view class=" margin padding-sm  flex align-center justify-between" style=" margin-top: 0;border-radius:0 0 20upx 20upx;background: #FFFFFF; margin-bottom: 20upx;padding-bottom: 12upx;">
				<view class="flex align-center justify-between padding-sm" style="width: 100%;min-height:110upx;">
					<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/recharges')">
						<text style="font-size: 32upx;font-weight: bold;color: #000000;">{{changeMoney(mainInfo.consumable)}}<text style="font-size: 22upx;color:#333333;"> 元</text></text>
						<view class="flex align-center margin-top-xs">
							<text class="" style="font-size:24upx;color: #333333;">余额</text>
							<view style="margin-left: 4upx;text-align: center;line-height: 32upx;width: 64upx;height: 32upx;font-size: 20upx;border-radius: 40upx;color: #f8eed0;background: linear-gradient(to right, #4d4d4d, #363636);">充值</view>
						</view>
						
					</view>
					<view style="position: relative;" class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/myCoupon/myCouponPage')">
						<text style="font-size: 32upx;font-weight: bold;color: #000000;">{{Nums}}<text style="font-size: 22upx;color:#333333;"> 张</text></text>
						<text class="margin-top-xs" style="font-size: 24upx;color: #333333;">优惠券</text>
						<view v-if="Nums > 0" style="position: absolute;width: 14upx;height: 14upx;border-radius: 14upx;background-color: #ee3126;left: 66upx;top: -3upx;"></view>
					</view>
					<view @tap="jifen" class="flex align-center justify-between flex-direction">
						<text style="font-size: 32upx;font-weight: bold;color: #000000;">{{changeMoney(HBTotal)}}<text style="font-size: 22upx;color:#333333;">元</text></text>
						<text class="margin-top-xs" style="font-size: 24upx;color: #333333;">待释放金额</text>
					</view>
					<view class="flex align-center justify-between flex-direction" @tap="personRouter('/pages/person/tgSy')">
						<text style="font-size: 32upx;font-weight: bold;color: #000000;">{{changeMoney(mainInfo.MySy)}}<text style="font-size: 22upx;color:#333333;"> 元</text></text>
						
						<view class="flex align-center margin-top-xs">
							<text class="" style="font-size: 24upx;color: #333333;">收益</text>
							<view style="text-align: center;line-height: 28upx;margin-left: 4upx;width: 64upx;height: 32upx;font-size: 20upx;border-radius: 40upx;color: #f23e3a; border: 2upx solid #f89b86;background: #fefaf9;">提现</view>
						</view>
					</view>
				</view>
			</view>

			<view class="" style="border-radius: 10px 10upx 0 0; background: rgb(255, 255, 255);padding-bottom:30upx;margin: 20upx 30upx;margin-top: 0upx;padding-bottom: 0;margin-bottom: 0;" >
				<view class="padding-sm  flex align-center justify-between" style="padding-bottom: 0;padding-top: 14upx;border-radius: 20upx 20upx 0 0;background: #FFFFFF;margin-bottom: 0;">
					<view style="font-size: 30upx;color: #000000;font-weight: 600;margin-left: 10upx;">
						我的服务
					</view>
				</view>
				<view class="bg-white " v-for="(item, ind) of cardList" :key="ind" >
					<view class="flex align-center justify-start flex-wrap " style="position: relative; padding: 0 15upx;">
						<view class="flex flex-direction align-center "  v-for="(is, js) of item.list" :key="js" @tap="personRouter(is.navigate)" style="position: relative;width: 20%;">
							<text :class="is.icon" style="font-size: 50upx; margin-top: 30upx;color:#e87f5d;"></text>
							<text style="font-size: 24upx;margin-top:15upx ;color: #333333;">{{ is.title }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="border-radius: 0 0 10px 10upx; background: rgb(255, 255, 255); padding:15upx 0;padding-bottom:30upx;margin: 20upx 30upx;margin-top: 0upx;padding-top: 0;" >
				<view class="bg-white " v-for="(items, indexs) of tubiao" :key="indexs" >
					<view class="flex align-center justify-start flex-wrap " style="position: relative; padding: 0 15upx;">
						<view class="flex flex-direction align-center "  v-for="(i, j) of items.lists" :key="j" @tap="personRouter(i.navigate)" style="position: relative;width: 20%;">
							<text :class="i.icon" style="font-size: 50upx; margin-top: 30upx;color:#eba53f;"></text>
							<text style="font-size: 24upx;margin-top:15upx ;color: #333333;">{{ i.title }}</text>
						</view>
					</view>
				</view>
			</view>
				
			
			
			<view class=" margin" style="border-radius: 10px; background: rgb(255, 255, 255); padding: 30upx 18upx;padding-bottom:38upx;margin-top: 20upx ;" >
				<view class=" flex align-center justify-between" style="height: 100%;padding: 0 10upx;">
					<view class="flex align-center justify-between flex-direction" v-for="(centerItem, centerIndex) of centerCardList"
					 :key="centerIndex" @tap="personRouter(centerItem.navigate)">
						<view style="height: 80upx; width: 80upx;"
						 :style="{background :  'url('+centerItem.picUrl+') no-repeat' , backgroundSize : 'cover'} "></view>
						<text class="" style="font-size: 24upx;margin-top: 10upx;">{{centerItem.title}}</text>
					</view>
				</view>
			</view>
			
			<swiper style="height: 170upx;width: 710upx;border-radius: 20upx;margin-left: 20upx;margin-top: 20upx ;" :indicator-dots="false" :circular="true" :autoplay="true" interval="3000"
			 duration="1000">
				<swiper-item v-for="(topSwiperItem,topSwiperIndex) in topLBLlit" :key="topSwiperIndex" @tap="LBTnavigate(topSwiperItem.GGContent)">
					<image :src="topSwiperItem.GGPicUrl" mode="scaleToFill" style="height: 170upx;width: 710upx;border-radius: 20upx;"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="flex justify-center" style="width: 100%;color: #333333;font-size: 30upx;">
			<image src="https://img.huaxuapp.com/27460jx_03.png" mode="scaleToFill" style="width: 274upx;height: 60upx;margin-top: 40upx;margin-bottom: 10upx ;"></image>
		</view>
		
		<view class="flex " style="" v-for="(item,indexq) in userAllsale" :key="indexq">
			<view @tap="baoPingoto(item[0].StoreID,item[0].ID)" style="border-radius: 10upx;width: 336upx;margin:30upx;margin-top: 20upx;background-color: #ffffff;margin-bottom: 11upx;margin-right: 10upx;padding-bottom: 20upx;">
				<view style="width: 336upx;height: 184upx;">
					<image :src="item[0].Imgs" style="border-radius: 10upx;width: 336upx;height: 184upx;"  mode="scaleToFill"></image>
				</view>
				<view class="shengLv" style="padding:12upx 14upx;font-size: 26upx;width: 336upx;height: 80upx;">
					<text>{{item[0].Title}}</text>
				</view>
				
				<view style="color: #fe4e01;margin-top: 6upx;margin-left: 10upx;">
					<text style="font-size: 24upx;">￥</text>
					<text style="font-size: 36upx;font-weight: 600;">{{changeMoney(item[0].DiscountedPrice)}}</text>
				</view>
				<view class="flex align-center justify-between" style="margin-top: 10upx;padding: 0 10upx;">
					<view class="flex align-center">
						<view class="flex align-center" style="font-size: 24upx;text-decoration: line-through;color: #999999;">
							<text>{{changeMoney(item[0].OrderPrice)}}</text>
						</view>
						<view class="flex align-center" style="font-size: 24upx;color: #fe4e01;background-color: #fbf0ea;padding: 0 12upx;border-radius: 50upx;margin-left: 6upx;">
							<text>{{jiSuan(item[0].ZK)}}折</text>
						</view>
					</view>
					<view  class="flex align-center" style="font-size: 24upx;color: #999999;">
						<text>{{item[0].GetNum}}人购买</text>
					</view>
				</view>
			</view>
			
			<view v-if="item[1]" @tap="baoPingoto(item[1].StoreID,item[1].ID)" style="border-radius: 10upx;width: 336upx;margin:30upx;margin-top: 20upx;background-color: #ffffff;margin-bottom: 11upx;margin-left: 10upx;padding-bottom: 20upx;">
				<view style="width: 336upx;height: 184upx;">
					<image :src="item[1].Imgs" style="border-radius: 10upx;width: 336upx;height: 184upx;"  mode="scaleToFill"></image>
				</view>
				<view class="shengLv" style="padding:12upx 14upx;font-size: 26upx;width: 336upx;height: 80upx;">
					<text>{{item[1].Title}}</text>
				</view>
				
				<view style="color: #fe4e01;margin-top: 6upx;margin-left: 10upx;">
					<text style="font-size: 24upx;">￥</text>
					<text style="font-size: 36upx;font-weight: 600;">{{changeMoney(item[1].DiscountedPrice)}}</text>
				</view>
				<view class="flex align-center justify-between" style="margin-top: 10upx;padding: 0 10upx;">
					<view class="flex align-center">
						<view class="flex align-center" style="font-size: 24upx;text-decoration: line-through;color: #999999;">
							<text>{{changeMoney(item[1].OrderPrice)}}</text>
						</view>
						<view class="flex align-center" style="font-size: 24upx;color: #fe4e01;background-color: #fbf0ea;padding: 0 12upx;border-radius: 50upx;margin-left: 6upx;">
							<text>{{jiSuan(item[1].ZK)}}折</text>
						</view>
					</view>
					<view  class="flex align-center" style="font-size: 24upx;color: #999999;">
						<text>{{item[1].GetNum}}人购买</text>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="scrollTop > 600"  @tap="backtops" class="flex align-center justify-center flex-direction huiqu">
			<text class="hxIcon-shangla" style="font-size: 90upx;color: rgba(0,0,0,0.2);"></text>
		</view>
		<!-- <navigator url="/pages/ad/cheXian">
			<view class="couponss shake"></view>
		</navigator> -->
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
						picUrl: 'https://img.huaxuapp.com/fwutb_03.jpg',
						title: '推荐有奖',
						navigate: '/pages/person/share'
					},
					{
						picUrl: 'https://img.huaxuapp.com/fwutb_05.jpg',
						title: '兑换中心',
						navigate: '/pages/personalAgent/persons/personChange'
					},
					{
						picUrl: 'https://img.huaxuapp.com/fwutb_07.jpg',
						title: '招商代理',
						navigate: 'agent'
					},
					{
						picUrl: 'https://img.huaxuapp.com/fwutb_09.jpg',
						title: '关于我们',
						navigate: '/pages/person/aboutUs'
					},
					{
						picUrl: 'https://img.huaxuapp.com/fwutb_11.png',
						title: '每日签到',
						navigate: '/pages/personalAgent/persons/personQianDao'
					},
				],
				string: 'cover',
				cardList: [{
					list: [{
							icon: 'hxIcon-dingdan2',
							title: '我的订单',
							navigate:'/pages/shopManagement/sonPage/orderManagerss?index=0'
						},
						// {
						// 	icon: 'hxIcon-jifen1',
						// 	title: '消费历史',
						// 	navigate: '/pages/person/historyConsumption'
						// },
						{
							icon: 'hxIcon-zengsong',
							title: '我的转赠',
							navigate: '/pages/person/giveOne'
						},
						{
							icon: 'hxIcon-tuanduijianshe',
							title: '我的粉丝',
							navigate: '/pages/person/myTeam'
						},
						{
							icon: 'hxIcon-kefu2',
							title: '官方客服', 
							navigate: 'customerService'
						},
						{
							icon: 'hxIcon-zhiyin1',
							title: '新手指引',
							navigate: '/pages/person/strategy/help'
						}
					]
				}],
				tubiao: [{
					lists: [
						{
							icon: 'hxIcon-zhangdan',
							title: '交易记录', 
							navigate: '/pages/prestoreDetail/transactionDetail'
						},
						{
							icon: 'hxIcon-weixin5',
							title: '关注服务号',
							navigate: '/pages/personalAgent/gzServe'
						},
						{
							icon: 'hxIcon-icon-test',
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
				MLLevel:0, 				//等级
				Nums:0,
				topLBLlit:[],
				userAllsale:[],
				currentPage:1,
				userAllsales:[],
				scrollTop:0,
				thingNums:0,
				isSticky: false,
				CustomBar:this.CustomBar,
				key:'',
				StoreSC:0,
				shopListNum:0,
				IDs:false,
				HBTotal:0
			}
		},
		computed:{
		},
		async onLoad() {
			
			if(this.$store.state.userInfo.ID){
				
				this.currentPage = 1
				await this.$http.personTj(this.currentPage,10).then(res => {
					console.log(res);
					this.userAllsales = res.SetDataMeal
					if(res.IsSuccess){
						var arr = [];
						for(var i=0;i<res.SetDataMeal.length;i+=2){
						    arr.push(res.SetDataMeal.slice(i,i+2));
						}
						this.userAllsale = arr
					}
				})
				
				console.log(this.$store.state.userInfo, '用户信息');
				if (this.$store.state.userInfo.ID) {
					this.userInfo = this.$store.state.userInfo;
				}
				// #ifdef H5 || MP-ALIPAY
					await this.getSite();
				// #endif
				
				// #ifndef H5 || MP-ALIPAY
				//获取行政区划码
					// await this.getRegeo();
					// 通过行政区划获取站点
					await this.newGetSite();
				// #endif
				this.IDs = true
			}
		},
		onShow() {
			
			if(this.$store.state.userInfo.ID){
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
						_this.HBTotal = e.data.HBTotal
					}
				});
				
				this.$http.shoppingLove(this.$store.state.userInfo.ID,1,10).then(res => {
					console.log(res);
					this.thingNums = res.Num
				})
				
				this.$http.getCenterLBLlit(0).then(res => {
					console.log('轮播图', res);
					if (res.IsSuccess) {
						this.topLBLlit = res.Data;
					}
				});
				this.currentPage = 1
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
				
				this.$http.myCoulist(this.$store.state.userInfo.ID,1,1,10).then(res => {
					this.Nums = res.Num
				})
				
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
						self.StoreSC = e.data.StoreSC
					}
				});
				
				this.$http.userSlot(this.$store.state.userInfo.ID,1,10).then(res => {
					this.shopListNum = res.Num
				})
				
				this.IDs = true
			} else {
				this.IDs = false
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/common/chagePhone'
				})
				// #endif
				// #ifndef APP-PLUS
				uni.navigateTo({
					url: '/pages/common/login'
				})
				// #endif
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
			if (e.scrollTop >= 90) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
			console.log(this.isSticky);
		},
		methods: {
			Qiandao(){
				uni.navigateTo({
					url:'/pages/personalAgent/persons/personQianDao'
				})
			},
			jifen(){
				// uni.navigateTo({
				// 	url:'/pages/personalAgent/persons/personJifen'
				// })
				uni.navigateTo({
					url:'/pages/prestoreDetail/zzhbRecord'
				})
			},
			gotoVIP(){
				uni.navigateTo({
					url:'/pages/personalAgent/persons/personVIP'
				})
			},
			gotoChange(){
				uni.navigateTo({
					url:'/pages/personalAgent/persons/personChange'
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
			backtops(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			jiSuan(number){
				return Math.round(number * 100) / 10
			},
			baoPingoto(a,b){
				this.$http.xhAdd(this.$store.state.userInfo.ID,b).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailsorder?storeId=' + a + '&tcID=' + b
				})
			},
			clPhone(e){
				return e.replace(/^(1[34578]\d)(\d{4})(\d{4})$/, "$1 **** $3")
			},
			tiaozhuan(e) {
				console.log(e);
				uni.navigateTo({
					url:'/pages/shopManagement/sonPage/orderManagerss?index=' + e,
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
							cancelColor: '#fe4e01',
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
							this.$http.puanDuan(this.$store.state.userInfo.ID).then(res => {
								console.log(res);
								if(res.Data == 4){
									uni.navigateTo({
										url: '/pages/personalAgent/araeAgentPage'
									})
								} else {
									uni.navigateTo({
										url: '/pages/personalAgent/personalAgentPage'
									})
								}
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
		},
		onReachBottom() {
			this.currentPage += 1
			this.$http.personTj(this.currentPage,10).then(res => {
				console.log(res);
				if (res.SetDataMeal.length > 0) {
					this.userAllsales = this.userAllsales.concat(res.SetDataMeal)
					var arr = [];
					for(var i=0;i<this.userAllsales.length;i+=2){
					    arr.push(this.userAllsales.slice(i,i+2));
					}
					this.userAllsale = arr
				} else {
					this.$api.msg('到底了~')
				}
				
				uni.hideLoading()
			})
		}
	};
</script>

<style>
	page {
		background-color: #F8F8F8 !important;
	}
</style>

<style scoped lang="scss">
	.couponss {
		width: 184rpx;
		height: 182rpx;
		background: url(https://img.huaxuapp.com/yjdbf.png) no-repeat;
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
	}
	
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
		padding-bottom: 120upx;
		[class*='hxIcon-'] {
			font-size: 44upx;
		}

		.person-info {
			position: relative;
			
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
	
	.shengLv{
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
	
	.huiqu{
		position: fixed;
		right: 30upx;
		bottom:170upx;
		z-index: 66;
		width: 90upx; 
		height:90upx;
		 -webkit-transition: all 0.5s;
	}
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 99990;
		padding-top: 120upx;
		padding-bottom: 40upx;
	}
	
	.fixed-tops {
		opacity: 0;
	}
	
	.fixed-topsx {
		opacity: 1;
	}
</style>
