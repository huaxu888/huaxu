<template>
	<view class="order-managment-page">
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>我的订单</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>我的订单</text></block>
			<!-- #endif -->
		</cu-custom>
	
		<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
			<view  class="bg-white nav " style="position: fixed;justify-content: space-between; z-index: 99;padding-top: 0;padding-bottom: 0;width: 100%; font-size: 26upx;-moz-box-shadow:0px 0px 4px #DDDDDD; -webkit-box-shadow:0px 0px 4px #DDDDDD; box-shadow:0px 0px 4px #DDDDDD;" v-if="storeSort != 1">
				<view class="flex " style="justify-content: center;align-items: center;margin-top: 20upx;">
					<view style="background-color: #f6f6f6;width: 429upx;border-radius: 50upx;text-align: center;" class="flex align-center">
						<view @tap="qiHu(1)" class="flex justify-center" style="align-items: center;width: 143upx;height: 68upx;font-size: 24upx;border-radius: 50upx;" :style="inx == 1 ? 'color: #ffffff;background-color: #fe4e01;' : 'background-color: #f8f8f8;'">
							付款订单
						</view>
						<view @tap="qiHu(2)" class="flex justify-center" style="align-items: center;width: 143upx;height: 68upx;font-size: 24upx;background-color: #fe4e01;border-radius: 50upx;" :style="inx == 2 ? 'color: #ffffff;background-color: #fe4e01;' : 'background-color: #f8f8f8;'">
							团购订单
						</view>
						<view @tap="qiHu(3)" class="flex justify-center" style="align-items: center;width: 143upx;height: 68upx;font-size: 24upx;background-color: #fe4e01;border-radius: 50upx;" :style="inx == 3 ? 'color: #ffffff;background-color: #fe4e01;' : 'background-color: #f8f8f8;'">
							预约订单
						</view>
					</view>
				</view>
				<view class="flex " style="justify-content: space-between;padding: 0 30upx;padding-top: 20upx;" v-if="inx==1">
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
		
		<view class="reservation-list-page" style="margin-top: 230upx;padding-bottom: 120upx;">
			
			<view class="reservation-list-item" style="margin-top: 30upx;" v-if="inx == 1" @tap="goOrderdetails(item)" v-for="(item, index) in getList">
				<view class="reservation-cotent" style="margin: 0 30upx;padding-bottom: 0upx;">
					<view class="content-title flex align-center" style="border-bottom: 1.5upx solid #e4e4e4;padding: 30upx 0;">
						<view class="flex justify-end align-center">
							<view class="hxIcon-dianpu1 " style="font-size: 36upx;color: #aaaaaa;"></view>
							<view style="margin-left: 10upx;font-weight: 600;font-size: 30upx;color: #333333;">
								<text>{{item.StoreName}}</text>
							</view>
						</view>
						<view class="state-text state-text-success" style="">
							<text class="">已支付</text>
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 30upx;">
						<view style="">
							<image :src="item.LogoPic || 'https://img.huaxuapp.com/huaxulogo70px.png' " mode="scaleToFill" style="width: 124upx;height: 124upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;">
							<view style="font-size:26upx;color: #333333;">
								<text style="color: #777777;">下单时间：</text>
								<text style="font-size: 26upx;color: #777777;">{{changeBeTime(item.AddDate)}}</text>
							</view>
							
							<view class="flex justify-between" style="margin: 10upx 0;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">消费：</text>
									<text style="font-size: 26upx;">￥</text>
									<text style="font-size: 26upx;">{{changeMoney(item.XFJE)}}</text>
								</view>
							</view>
							
							<view class="flex justify-between">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">实付：</text>
									<text style="font-size: 26upx;">￥</text>
									<text style="font-size: 26upx;">{{changeMoney(item.SJXFJE)}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="reservation-list-item" style="margin-top: 30upx;" v-if="inx == 2" v-for="(item, index) in tgList">
				<view class="reservation-cotent" style="margin: 0 30upx;padding-bottom: 30upx;">
					<view @tap="gotoTc(item.StoreID,item.BLI[0].SetMealId)" class="content-title flex align-center" style="position: relative;border-bottom: 1.5upx solid #e4e4e4;">
						<view class="content-title-name flex align-center" style="padding-bottom: 14upx;padding-top: 10upx;">
							<view class="content-title-name flex align-center" style="">
								<view class="content-name-text flex align-center justify-center" style="font-size: 26upx;">
									<text>下单时间：{{changeBeTime(item.AddDate)}}</text>
								</view>
							</view>
							<view v-if="successChange(item.EndDate) > 0 && item.Sort == 5" class="flex align-center justify-center" style="text-align: center;margin-left: 8upx;font-size: 18upx;width: 108upx;
							height: 42upx;line-height: 42upx; background-color: rgb(254, 217, 66);border-radius: 0 30upx 0 30upx;">
								<text>{{getDistanceTime(item.EndDate)}}</text>
							</view>
							<view class="state-text state-text-success" style="position: absolute;right: 0upx;top: 34upx;" v-if="item.Sort == 5" >
								<text class="">{{getStatus(item.Sort)}}</text>
							</view>
							<view class="" style="position: absolute;right: 0upx;top: 34upx;font-size: 26upx;"v-if="item.Sort != 5">
								<text class="">{{getStatus(item.Sort)}}</text>
							</view>
						</view>
					</view>
					
					<view @tap="gotoTc(item.StoreID,item.BLI[0].SetMealId)" class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 20upx;">
						<view style="">
							<image :src="item.BLI[0].Imge || 'https://img.huaxuapp.com/huaxulogo70px.png'" style="width: 142upx;height: 142upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;width: 100%;">
							<view class="shengLv" style="font-size: 28upx;color: #333333;height: 72upx;">
								<text>{{item.BLI[0].SetMealName}}</text>
							</view>
							
							<view class="flex justify-between">
								<view style="color: #fe4e01;margin-top: 30upx;">
									<text style="color: #333333;">总额：</text>
									<text style="font-size: 30upx;">￥</text>
									<text style="font-size: 30upx;font-weight: 600;">{{changeMoney(item.TotalPrice)}}</text>
								</view>
								<view style="margin-top: 30upx;color: #666666;margin-left: 30upx;">
									<text>数量：</text>
									<text>{{item.Num}}</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex justify-end" style="padding-bottom: 10upx;margin-right: 30upx;" v-if="item.Sort == 5 || item.Sort == 6 || item.Sort == 1 ||  item.Sort == 7 || item.Sort == 8 || item.Sort == 9">
						<view v-if="item.Sort == 5" class=" flex align-center justify-center" style="margin-right: 30upx;width: 140upx;height: 60upx;border-radius: 60upx;
						font-size: 24upx;color: #777777;border: 2upx solid #999999;line-height: 60upx;text-align: center;" @tap="gotos(item.Id)">
							申请退款
						</view>
						<view v-if="item.Sort == 5"  class=" flex align-center justify-center" style="width: 140upx;height: 60upx;border-radius: 60upx;
						font-size: 24upx;color: #fe4e01;border: 2upx solid #fe4e01;line-height: 60upx;text-align: center;" @tap="gotoVer(item.Id)">
							立即使用
						</view>
						<view v-if="item.Sort == 7 || item.Sort == 8"  class=" flex align-center justify-center" style="margin-right: 30upx;width: 140upx;height: 60upx;border-radius: 60upx;
						font-size: 24upx;color: #777777;border: 2upx solid #999999;line-height: 60upx;text-align: center;" @tap="gotoVerDetail(item.Id)">
							退款详情
						</view>
						<view v-if="item.Sort == 6 || item.Sort == 7 || item.Sort == 8 || item.Sort == 9"  class=" flex align-center justify-center" style="width: 140upx;height: 60upx;border-radius: 60upx;
						font-size: 24upx;color: #777777;border: 2upx solid #999999;line-height: 60upx;text-align: center;" @tap="gotoVer(item.Id)">
							查看详情
						</view>
						
						<view v-if="item.Sort == 1"  class=" flex align-center justify-center" style="width: 140upx;height: 60upx;border-radius: 60upx;
						font-size: 24upx;color: #fe4e01;border: 2upx solid #fe4e01;line-height: 60upx;text-align: center;" @tap="gotoZhifu(item)">
							立即支付
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="reservation-list-item" style="margin: 30upx 0;" v-for="(item, index) in reservationList" :key="index"  v-if="TabCur==0 && inx==3">
				<view class="reservation-cotent" style="margin: 0 30upx;padding-bottom: 0upx;">
					<view class="content-title flex align-center" style="border-bottom: 1.5upx solid #e4e4e4;padding: 30upx 0;">
						<view class="flex justify-end align-center">
							<view class="hxIcon-dianpu1 " style="font-size: 36upx;color: #aaaaaa;"></view>
							<view style="margin-left: 10upx;font-weight: 600;font-size: 30upx;color: #333333;">
								<text>{{item.StoreName}}</text>
							</view>
						</view>
						<view class="state-text state-text-success" style="" v-if="!item.IsCheck">
							<text class="">{{getStatuss(item.State)}}</text>
						</view>
								
						<view class="state-text" v-else>
							<text>预约被拒绝</text>
						</view>
					</view>
					
					<view class="flex" style="margin: 0 30upx;padding-top: 32upx;padding-bottom: 30upx;">
						<view style="">
							<image  :src="item.LogoPic || 'https://img.huaxuapp.com/huaxulogo70px.png'" mode="scaleToFill" style="width: 124upx;height: 124upx;border-radius: 10upx;"></image>
						</view>
						<view style="margin-left: 25upx;">
							<view style="font-size:26upx;">
								<text style="color: #777777;">预约时间：</text>
								<text style="font-size: 26upx;color: #777777;">{{item.YCDate}}</text>
							</view>
							
							<view class="flex justify-between" style="margin: 10upx 0;">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">联系人：</text>
									<text style="font-size: 26upx;">{{ item.Contacts }}{{ item.Sex == 0 ? '先生' : '女士' }}</text>
								</view>
							</view>

							<view class="flex justify-between">
								<view style="color: #777777;">
									<text style="color: #777777;font-size: 26upx;">手机号：</text>
									<text style="font-size: 26upx;">{{item.Phone}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex align-center margin-left: 30upx;" v-if="getType(item) != '点餐' && item.Info">
						<text class="hxIcon-pingjia margin-left-xss"></text>
						<text class="margin-left-xss " style="font-size: 26upx;color: #777777;">备注：</text>
						<text class="flexs" style="font-size: 26upx;color: #777777;">{{ item.Info }}</text>
					</view>
					<view class="flex justify-between align-center" style="font-size:24upx;margin-left: 30upx;padding-bottom: 30upx;">
						<view>
							<text style="color: #777777;">下单时间：</text>
							<text style="color: #777777;">{{changeBeTime(item.AddDate)}}</text>
						</view>
						
						<view class="flex justify-end" style="padding-bottom: 10upx;margin-right: 30upx;"  @tap.stop="reservationCancle(item.YYID, index)" v-if="item.State == 5">
							<view class=" flex align-center justify-center"  style="width: 140upx;height: 60upx;border-radius: 60upx;font-size: 24upx;color: #fe4e01;border: 1upx solid #fe4e01;line-height: 60upx;text-align: center;">
								取消预约
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view style="text-align: center;height: 400upx;margin-top: 180upx;background-color: #ffffff;" v-if="getList==false || tgList==false || reservationList==false">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您暂时还没有交订单哦~</text>
			</view>
			<view class="flex justify-center" style="margin-top:80upx;" @tap="goGon">
				<view class="flex justify-center align-center" style="border: 2upx solid #b9b9b9;width: 164upx;height: 54upx;background-color: #ffffff;border-radius: 50upx;color: #333333;font-size: 26upx;">
					<text>去逛逛</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	components:{
	},
	data() {
		return {
			reservationList: [],
			storeid: 0,
			currentPage: 1,
			ordersList: [],
			TabCur: 0,
			tabList: [
				'全部订单',
				'待支付',
				'待评价',
				'退款/售后',
			],
			tabLists: [
				'全部订单',
				'待支付',
				'待使用',
				'待评价',
				'退款/售后'
			],
			tabListss: [
				'全部订单',
				'待支付',
				'待评价',
				'退款/售后'
			],
			storeSort: 0,
			tulist:[],
			state:[],
			inx: 1,
			tgList:[],
			pages: 1,
			getList:[],
			shows:0,
			Sortx:0,
			pagge:1
		};
	},
	onLoad(option) {
		this.inx = 1
		this.currentPage = 1
		this.TabCur = 0
		console.log(this.TabCur);
		console.log(this.TabCur + 1)
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
		
		this.getShu()
		
		this.pagge = 1
		this.Sortx = 0
		this.$http.selectOrder(this.$store.state.userInfo.ID,this.Sortx,this.pagge,10).then(res => {
			console.log(res,'套餐');
			this.tgList = res.Data
		})
	},
	onShow() {
		this.TabCur = 0
		this.pagge = 1
		this.Sortx = 0
		this.$http.selectOrder(this.$store.state.userInfo.ID,this.Sortx,this.pagge,10).then(res => {
			console.log(res,'套餐');
			this.tgList = res.Data
		})
	},
	methods: {
		gotoTc(a,b){
			this.$http.xhAdd(this.$store.state.userInfo.ID,b).then(res => {
				console.log(res);
			})
			uni.navigateTo({
				url:'/pages/shopDetail/shopDetailsorder?storeId=' + a + '&tcID=' + b
			})
		},
		gotoZhifu(item) {
			console.log(item);
			this.$http.tcXq(item.BLI[0].SetMealId).then(res => {
				uni.navigateTo({
					url:'/pages/shopDetail/orderDtime?Ids=' + item.Id + '&storeid=' + res.SetDataMeal.StoreID + '&tcId=' + item.BLI[0].SetMealId
				})
			})
		},
		successChange(dateTime){
			let EndTime = new Date(this.changeBeTime(dateTime));
			let NowTime = new Date();
			let t = EndTime.getTime() - NowTime.getTime();
			let d = Math.floor(t / 1000 / 60 / 60 / 24);
			let h = Math.floor(t / 1000 / 60 / 60 % 24);
			let m = Math.floor(t / 1000 / 60 % 60);
			let s = Math.floor(t / 1000 % 60);
			return d
		},
		getDistanceTime(dateTime) {
		    let EndTime = new Date(this.changeBeTime(dateTime));
		    let NowTime = new Date();
		    let t = EndTime.getTime() - NowTime.getTime();
		    let d = Math.floor(t / 1000 / 60 / 60 / 24);
		    let h = Math.floor(t / 1000 / 60 / 60 % 24);
		    let m = Math.floor(t / 1000 / 60 % 60);
		    let s = Math.floor(t / 1000 % 60);
		    // let html = d + " 天" + h + " 时" + m + " 分" + s + " 秒";
			let html = d + "天后到期"
			
			if(d > 0) {
				this.shows = true
				if(d <= 1){
					return '即将过期'
				} else {
					return html
				}	
			} else {
				this.shows = 0
			}
			
		},
		changeMoney(money) {
			if (money < 0.01) {
				return money;
			} else {
				return this.$api.formatAmount(money);
			}
		},
		gotoStore: function (storeId) {
			uni.navigateTo({
				url: '/pages/shopDetail/shopDetailPage?StoreID=' + storeId
			})
		},
		getShu(){
			this.$http.getConsumptionList(this.$store.state.userInfo.ID, this.pages,10).then(res => {
				if (res.IsSuccess) {
					this.getList = res.Data
					console.log(this.getList);
				} else {
					this.$api.msg(res.Msg)
				}
			})
			.catch(err => {
				console.log(err);
				this.$api.msg(res.Msg)
			})
		},
		details(){
			this.$http.detailOrder(this.OrderNOs).then(res => {
				
			})
		},
		goOrderdetails(item){
			console.log(item);
			uni.navigateTo({
				url:'/pages/shopManagement/userOrderdetails/userOrder?xfid=' + item.XFID
			})
		},
		qiHu(e){
			uni.pageScrollTo({
				scrollTop:0,
				duration:0
			})
			this.inx = e
			this.pages = 1
			this.pagge = 1
			this.currentPage = 1
			this.TabCur = 0
			
			this.getShu()
			
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
			
			this.$http.selectOrder(this.$store.state.userInfo.ID,0,this.pagge,10).then(res => {
				console.log(res,'套餐');
				this.tgList = res.Data
			})
		},
		gotos(e){
			uni.navigateTo({
				url:'/pages/shopDetail/refundTrade?orderid=' + e 
			})
		},
		gotoVer(e){
			uni.navigateTo({
				url:'/pages/shopDetail/verifiCations?Ids=' + e
			})
		},
		gotoVerDetail(e){
			uni.navigateTo({
				url:'/pages/shopDetail/tuiKuan?orderid=' + e 
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
				/// 默认为0:全部 1:待支付  2:支付超时 3:已取消  4:已删除 5:待使用 6:已完成 7:退款中 8:已退款
				case 1: 
					result = '待支付'
					break
				case 2:
					result = '支付超时'
					break;
				case 3:
					result = '已取消'
					break;
				case 4:
					result = '已删除'
					break;
				case 5:
					result = '待使用'
					break;
				case 6:
					result = '已完成'
					break;
				case 7:
					result = '退款中'
					break;
				case 8:
					result = '退款成功'
					break;
				case 9:
					result = '已过期'
					break;
				default:
					result = '未知状态'
			}
			return result
		},
		getStatuss: function (status) {
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
				title: '取消预约',
				content: '您将取消预约，取消后将无法恢复',
				cancelText: '我再想想',
				confirmText: '确定取消',
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
			uni.showLoading({
				title: '数据加载中'
			})
			if(index == 0){
				this.pages = 1
				this.getShu()
			} else {
				this.getList = []
			}
			
			this.currentPage = 1
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur).then(res => {
				if (res.IsSuccess) {
					uni.hideLoading()
					this.ordersList = res.Data
					
					this.ordersList.forEach(item => {
						
						let tulists = JSON.parse(item.ShopContent)
						this.tulist.push(tulists[0].PicUrl)
						
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
			
			if(this.TabCur == 0){
				this.Sortx =  0
			}
			if(this.TabCur == 1){
				this.Sortx = 1
			}
			if(this.TabCur == 2){
				this.Sortx = 5
			}
			if(this.TabCur == 3){
				this.Sortx = 6
			}
			if(this.TabCur == 4){
				this.Sortx = 8
			}
			this.pagge = 1
			this.$http.selectOrder(this.$store.state.userInfo.ID,this.Sortx,this.pagge,10).then(res => {
				console.log(res,'套餐');
				this.tgList = res.Data
			})
			
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
		if(this.inx == 1){
			this.pages += 1
			this.$http.getConsumptionList(this.$store.state.userInfo.ID, this.pages,10).then(res => {
				if (res.Data.length > 0) {
					this.getList = this.getList.concat(res.Data);
				} else {
					this.$api.msg('到底了~',3000)
				}
				uni.hideLoading()
			})
			.catch(err => {
				console.log(err);
			})
		}
		
		if(this.inx == 2){
			this.pagge += 1
			this.$http.selectOrder(this.$store.state.userInfo.ID,this.Sortx,this.pagge,10).then(res => {
				if (res.Data.length > 0) {
					this.tgList = this.tgList.concat(res.Data)
				} else {
					this.$api.msg('到底了~',3000)
				}
				uni.hideLoading()
			})
			.catch(err => {
				console.log(err);
			})
		}
			
		if(this.inx == 3){
			this.currentPage += 1
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage,10).then(res => {
				if (res.IsSuccess) {
					this.reservationList = this.reservationList.concat(res.Data)
					if(res.Data.length == 0){
						this.currentPage --
					}
				}
				uni.hideLoading()
			})
			.catch(err => {
				console.log(err);
			})
		}
	},
	onPullDownRefresh() {
		this.inx = 1
		this.TabCur = 0
		this.pages = 1
		this.getShu()
		
		uni.stopPullDownRefresh()
		
		// this.pagge = 1
		// this.$http.selectOrder(this.$store.state.userInfo.ID,0,this.pagge,10).then(res => {
		// 	console.log(res,'套餐');
		// 	this.tgList = res.Data
		// })
		// uni.hideLoading()
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
			color: #fe4e01;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 86upx;
				height: 6upx;
				left: 50%;
				transform: translateX(-50%);
				width: 40upx;
				background-color: #fe4e01;
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
				padding: 20upx 0;
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

			.toPay {
				color: #FFFFFF;
				background: #f3982d;
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
</style>