<template>
	<view>
		<view v-if="!showLoading">

			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-cream" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content"><text class="text-bold" style="line-height: 1em;color: #8d5b20;" v-if="showTitle">{{StoreName}}</text> </block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText"><text class="text-bold" style="line-height: 1em;color: #8d5b20;"  v-if="showTitle">{{StoreName}}</text></block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			
			<view class="flex justify-center flex-direction" style="background: #f8d1a3;">
				<view class="padding-lr padding-bottom-sm padding-top-xs flex align-center justify-between">
					<view class="flex align-center justify-center" style="height: 130upx">
						<view class="flex align-center justify-center">
							<image :src="LogoPic" mode="scaleToFill" class="touxiang"  @tap="personRouter('/pages/shopManagement/sonPage/addShopInfo/addShopInfoPage?StoreID='+StoreID)"></image>
						</view>
						<view class="flex flex-direction align-start justify-end margin-left">
							<view class=" flex align-center margin-top-xs">
								<text class="text-bold" style="font-size: 36upx;color: #b9792e; max-width: 330upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
									<text>{{StoreName}}</text>
									<text class="cu-tag round sm bg-red margin-left-xs" v-if="storeObj.StoreSort == 1">电商</text>
								</text>
							</view>
							<view class="flex align-center">
								<text style="font-size: 24upx;color: #b9792e;">营业时间：{{StartWorkDate}}-{{EndWorkDate}}</text>
							</view>
						</view>
					</view>
					<!-- <view style="height: 130upx;position: absolute;right: 120upx;">
						<view class="flex justify-center align-center " style="position: relative;">
							<view class="flex align-center justify-center" style="height: 46upx;width: 46upx;border: 1.8px solid #f1b556;border-radius: 50%;background: #FFFFFF;position: relative; z-index: 14; ">
								<text :class="'hxIcon-shangpu' " style="font-size: 26upx;color: #f1b556;"></text>
							</view> -->
						<!-- <switch class='brown switch-status' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"
						 style="margin-top: 23upx;"></switch> -->
						 <!-- <view class="flex align-center justify-center" style="height: 36upx;width: 140upx; padding-left: 13upx; border-radius:1000upx;background: #f1b556;position: absolute;left: 20upx; z-index: 10;"> -->
						 	<!-- <text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;">{{ '联盟商家' }}</text> -->
						 	<!-- <text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 0">{{ '一级商家' }}</text>
						 	<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 1">{{ '二级商家' }}</text>
						 	<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 2">{{ '三级商家' }}</text>
						 	<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 3">{{ '四级商家' }}</text>
						 	<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 4">{{ '五级商家' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 5">{{ '六级商家' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 6">{{ '七级商家' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 7">{{ '八级商家' }}</text>
							<text style="line-height: 1em;color: #FFFFFF;font-size: 24upx;" v-if = "StoreLevel == 8">{{ '九级商家' }}</text> -->
						 <!-- </view> -->
						 <!-- </view>
					</view> -->
				</view>
				<view class="flex align-center justify-center margin-top-sm" style="background: url('https://img.huaxuapp.com/sjxym.png') no-repeat; height: 150upx;  background-size: 100% 100%;">
					<view class=" flex align-center" style="width: 100%;height: 120upx;margin-bottom: 28upx; margin-left: 60upx; margin-right: 60upx;">
						<view class="flex align-center justify-center flex-direction" style="width: 25%;">
							<view style="background:url('https://img.huaxuapp.com/xxts_03.png') no-repeat ; background-size: 100% 100%; width: 48upx; height: 48upx;"></view>
							<text style="color: #edd7bd;font-size: 24upx;">消息推送</text>
						</view>
						<view style="border-right: 1px solid #edd7bd; width: 2upx; height: 60upx;"></view>
						<view class="flex align-center justify-center  padding-lr" style="width: 75%;">
							<swiper class=" text-sm flex justify-center align-center" style="height:33upx;width:85%;" vertical="true"
							 circular="true" autoplay="autoplay" interval="3000">
								<swiper-item class="flex align-center">
									<text class="text-cut" style="color: #edd7bd;line-height: 1em;font-size: 28upx;">预约功能已上线</text>
								</swiper-item>
								<swiper-item class="flex align-center">
									<text class="text-cut" style="color: #edd7bd;line-height: 1em;font-size: 28upx;">欢迎商家使用！</text>
								</swiper-item>
							</swiper>

							<view style="background:url('https://img.huaxuapp.com/ydxx_06.png') no-repeat ; background-size: 100% 100%; width: 48upx; height: 48upx;"></view>
						</view>
					</view>
				</view>
			</view>

			<view class=" margin-lr margin-tb-sm-big  margin-bottom padding-lr-sm padding-tb-xs flex align-center justify-between revenue-block">
				<view class="flex align-center justify-between padding-tb-xs  revenue-block-left">
					<view class="flex align-center justify-between flex-direction" style="width: 25%;"  @tap="tiaozhuan(1)">
						<text class="hxIcon-daifukuan" style="font-size: 54upx;color: #4a4a4a;">

						</text>
						<text class="margin-top-sm" style="font-size: 24upx;color: #444444;">预约订单</text>
					</view>
					<view class="flex align-center justify-between flex-direction" style="width: 25%; position: relative;"  @tap="tiaozhuan(2)">
						<!-- <view style="height: 28upx;width: 92upx;position: absolute;top: -20upx;right: -34upx;background: url('https://img.huaxuapp.com/jxxx_03.png') no-repeat; background-size: cover;">
						</view> -->
						<text class="hxIcon-yuding" style="font-size: 54upx;color: #4a4a4a;">

						</text>
						<!-- <text class="margin-top-sm" style="font-size: 24upx;color: #444444;">{{ storeObj.StoreSort == 1 ? '待发货' : '预定' }}</text> -->
						<text class="margin-top-sm" style="font-size: 24upx;color: #444444;">待评价</text>
					</view>
					<view class="flex align-center justify-between flex-direction" style="width: 25%;"   @tap="tiaozhuan(3)">
						<text class="hxIcon-pingjia" style="font-size: 54upx;color: #4a4a4a;">

						</text>
						<text class="margin-top-sm" style="font-size: 24upx;color: #444444;">已取消</text>
					</view>
					<view class="flex align-center justify-between flex-direction" style="width: 25%;" @tap="tiaozhuan(4)">
						<text class="hxIcon-tuikuan" style="font-size: 54upx;color: #4a4a4a;">

						</text>
						<text class="margin-top-sm" style="font-size: 24upx;color: #444444;">售后</text>
					</view>
				</view>
				<view class="margin-left-xs" style="background: url('https://img.huaxuapp.com/dakuohao_03.png') no-repeat; background-size: 100% 100%;  width: 16upx; min-height: 110upx;"></view>

				<view class="flex align-center justify-between flex-direction padding-sm " style="min-height:110upx;padding-left: 10upx;padding-right: 10upx;"
				 @tap="personRouter('/pages/shopManagement/sonPage/orderManager?storeid=' + StoreID + '&sort=' + storeObj.StoreSort)">
					<view style="background: url('https://img.huaxuapp.com/ddys_03.png') no-repeat; background-size: 100% 100%;  width: 54upx; height: 62upx;"></view>
					<text style="font-size: 24upx;margin-top: 15upx;color: #444444;">订单管理</text>
				</view>
			</view>

			<!-- 营收概览 -->
			<view class=" margin-lr  margin-tb-sm-big padding-lr-sm padding-tb-xs  flex align-center justify-between revenue-block">
				<view class="flex align-center justify-between padding-tb-xs revenue-block-left">
					<view class="flex align-center justify-center flex-direction" style="width: 33%;" @tap="personRouter()">
						<text class="revenue-block-leftAmount">{{rounding(jrxf)}}</text>
						<text class="revenue-block-leftTitle">今日营业额</text>
					</view>
					<view class="flex align-center justify-center flex-direction" style="width: 33%;" @tap="personRouter()">
						<text class="revenue-block-leftAmount">{{jrdd}}</text>
						<text class="revenue-block-leftTitle">今日订单</text>
					</view>
					<view class="flex align-center justify-center flex-direction" style="width: 33%;" @tap="personRouter()">
						<text class="revenue-block-leftAmount">{{rounding(xfze)}}</text>
						<text class="revenue-block-leftTitle">总营业额</text>
					</view>
				</view>
				<view class="margin-left-xs" style="background: url('https://img.huaxuapp.com/dakuohao_03.png') no-repeat; background-size: 100% 100%;  width: 16upx; min-height: 110upx;"></view>

				<view class="flex align-center justify-center flex-direction padding-sm " style="min-height:110upx;padding-left: 10upx;padding-right: 10upx;"
				 @tap="personRouter('/pages/shopManagement/sonPage/billDetailss','营收概览')">
					<view style="background: url('https://img.huaxuapp.com/ysgailan_07.png') no-repeat; background-size: 100% 100%;  width: 54upx; height: 54upx;"></view>
					<text style="font-size: 24upx;margin-top: 10upx;color: #444444;">营收明细</text>
				</view>
			</view>

			<!-- 提现 -->
			<view class=" margin-lr margin-tb-sm-big padding-left flex align-center justify-between" style=" padding-top: 45upx; padding-bottom: 45upx; border-radius: 10upx; background-image: linear-gradient(to right, #fba15a, #fc821b);">
				<view class="flex align-center justify-center" style="height: 80upx;">
					<!-- <text>&yen;</text> -->
					<text class="text-white">当前可提现
						<text class="margin-left-sm cu-tag round text-white bg-red text-bold">{{ wxf }}</text>
					</text>
					<!-- <text class="margin-left-sm" style=" font-size: 26upx;line-height: 1em;color: #FFFFFF;">全部提现</text> -->
				</view>
				<view @tap="personRouter('/pages/shopManagement/sonPage/balanceWithdrawal?storeid=' + StoreID)" class="padding-lr flex align-center justify-center " style="padding-top: 18upx; padding-bottom: 18upx; border-radius:  50upx 0 0 50upx;background: #fc6f24;">
					<text style="font-size: 26upx; line-height: 1em;color: #FFFFFF;">提现到银行卡</text>
				</view>
			</view>

			<!-- 门店管理 -->
			<view class="margin-lr margin-tb-sm-big padding bg-white" style="border-radius: 20upx;" v-if="state == 2">
				<view class="heading">
					门店管理
				</view>
				<view class="margin-top flex align-center justify-between">
					<view class="flex align-center justify-center flex-direction padding-bottom-sm  Shop-Manager-block " @tap="personRouter('/pages/person/share')">
						<view style="margin: 11rpx; width: 100rpx; height: 100rpx; background: url(https://img.huaxuapp.com/qmlq.png);background-size: cover">
						</view>
						<text class=" Shop-Manager-Title">全民领现金</text>
						<text class="Shop-Manager-GrayTitle">锁客好工具</text>
						<view class="flex align-center justify-center margin-top-xs Shop-Manager-button">
							<text class="button-text">去邀请</text>
						</view>
					</view>
					<view class="flex align-center justify-center flex-direction padding-bottom-sm Shop-Manager-block" @tap="personRouter('/pages/shopManagement/sonPage/goodsManagmentPage?StoreID=' + StoreID)">
						<view style="margin:11upx;  width: 100upx; height: 100upx; background: url(https://img.huaxuapp.com/mdgl_05.jpg);background-size: 100% 100%;">
						</view>
						<text class=" Shop-Manager-Title">商品管理</text>
						<text class="Shop-Manager-GrayTitle">优/快/好/省</text>
						<view class="flex align-center justify-center margin-top-xs Shop-Manager-button">
							<text class="button-text">去添加</text>
						</view>
					</view>
					<view class="flex align-center justify-center flex-direction padding-bottom-sm Shop-Manager-block" @tap="personRouter('/pages/shopManagement/sonPage/addShopInfo/addShopInfoPage?StoreID='+StoreID)">
						<view style="margin: 11upx; width: 100upx; height: 100upx;background: url(https://img.huaxuapp.com/mdgl_07.png) ;background-size: 100% 100%;">

						</view>
						<text class=" Shop-Manager-Title">门店推广</text>
						<text class="Shop-Manager-GrayTitle">展示店铺风采</text>
						<view class="flex align-center justify-center margin-top-xs Shop-Manager-button">
							<text class="button-text">去设置</text>
						</view>
					</view>
				</view>
			</view>
				<!-- //1是收银员，2店长 -->
			<view class="bg-white margin-lr margin-tb-sm-big " style="padding: 30upx;margin-top: 20upx; border-radius: 20upx;"
			 v-for="(item, index) of marketingTools" :key="index" v-if="(state == 1 && index == 1) || state == 2" >  
				<view class="heading">{{ item.title }}</view>
				<view class="flex align-center justify-start flex-wrap ">
					<view class="flex flex-direction align-center " style="width: 25%;position: relative;" v-for="(tool_i, tool_j) of item.list"  v-if="(state == 1 && tool_j != 8) || state == 2" 
					 :key="tool_j" @tap="personRouter(tool_i.navigate,tool_i.title)" >
						<image :src="tool_i.picUrl" :style="{width:getUpx(tool_i.size),height:getUpx(tool_i.size)}" 
							style="margin-top: 36upx;" v-if="tool_i.picUrl"></image>
						<text style="font-size: 24upx;margin-top:15upx ;color: #333333;">{{ tool_i.title }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- showLoading -->
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				marketingTools: [{
						title: '营销工具',
						list: [{
								picUrl: 'https://img.huaxuapp.com/mdglx_06.png',
								title: '优惠券包 ',
								navigate: '/pages/shopManagement/sonPage/myCoupon/myCouponPage', //StoreID
								size:96
							},
							{
								picUrl: 'https://img.huaxuapp.com/mdglx_08.png',
								title: '海报设计',
								navigate: '/pages/shopManagement/sonPage/poster/posterPage',
								size:96
							},
							{
								picUrl: 'https://img.huaxuapp.com/dxyxg.png',
								title: '短信营销',
								navigate: 'msgAllSendOne',
								size:96
							},
							{
								picUrl: 'https://img.huaxuapp.com/mdglx_03.png',
								title: '趣味拼团',
								navigate: '-1',
								size:96
							}
						]
					},
					{
						title: '我的服务',
						list: [
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_03.jpg',
								title: '收款码',
								navigate: '/pages/shopManagement/sonPage/receivablesCodePage', //StoreID StoreName LogoPic StoreAddress
								size:74
							},
							// {
							// 	picUrl: 'https://img.huaxuapp.com/hexiao-02.png',
							// 	title: '扫码核销',
							// 	navigate: 'scan', //StoreID StoreName LogoPic StoreAddress
							// 	size:74
							// },
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_05.jpg',
								title: '亲密用户',
								navigate: '/pages/shopManagement/sonPage/myMember', //StoreID
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_15.jpg',
								title: '员工管理',
								navigate: '/pages/shopManagement/sonPage/bindingCashier/bindingCashierPage', // StoreID
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_18.png',
								title: '公码绑定',
								navigate: '/pages/shopManagement/sonPage/gongMaBand',  // StoreID
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_07.jpg',
								title: '经营分析',
								navigate: '/pages/shopManagement/sonPage/shujuFenxi/shuJu', //billType state StoreID myStoreID
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_16.jpg',
								title: '结算明细',
								navigate: '-1',
								size:74
							},
							{
								picUrl: 'https://img.huaxuapp.com/wdfw_21.jpg',
								title: '菜品销量',
								navigate: '-1',
								size:74
							},
							// {
							// 	picUrl: 'https://img.huaxuapp.com/wdfw_09.jpg',
							// 	title: '营收报表',
							// 	navigate: '/pages/shopManagement/sonPage/shujuFenxi/shujuFenxi', //StoreID
							// 	size:74
							// },
							{
								picUrl: 'https://img.huaxuapp.com/czjl_03.png',
								title: '充值奖励',
								navigate: '-1',  // StoreID
								size:74
							}
							
						]
					}
				],
				showLoading: true,
				isTx: false,
				infoObj: {},
				getData: {
					userid: this.$store.state.userInfo.ID
				},
				StoreID: '',
				StoreName: '',
				LogoPic: '',
				routObj: {},
				storeObj: {},
				IsLock: '',
				state: 1, //1是收银员，2店长
				switchB: false,
				jrxf: 0, //今日营业额
				jrdd: 0, //今日订单数
				xfze: 0 ,//消费总额
				showTitle:false ,//是否展示标题
				StartWorkDate:'',
				EndWorkDate:'',
				money:'',
				StoreLevel:'',
				wxf: 0,
				SqSort: 0
			}
		},
		onLoad(routObj) {
			this.StoreID = routObj.StoreID;
			this.IsLock = routObj.IsLock
			this.routObj = routObj;
		
			// this.getCurryInfo();
			if (this.routObj.isShopowner == 'true') {
					this.state = 2
			}
			this.$store.commit('changeYyyState', this.state);
			
		},
		onShow() {
			if (this.StoreID != '' && this.StoreID != undefined && this.$store.state.userInfo.ID) {
				this.getCurryInfo()
			} else {
				this.$api.msg('数据异常，请重新登录');
				setTimeout(() => {
					uni.switchTab({ //跳去首页
						url: '/pages/index/person'
					})
				}, 1000);
			}
		},
		methods: {
			tiaozhuan(e) {
				uni.navigateTo({
					url:'/pages/shopManagement/sonPage/orderManager?storeid=' + this.StoreID + '&sort='+ e,
					success() {
						console.log("1")
					}
				})
			},
			rounding(amount) {
				return amount.toFixed(2);
			},
			getUpx (px) {
				return uni.upx2px(px) + 'px'
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
			},
			tx: function(res) {
				this.isTx = !this.isTx
			},
			getCurryInfo() {
				let self = this;
				return self.$Request.get(self.$store.state.mystoreUrl, {
					userid: self.$store.state.userInfo.ID,
					storeid: self.StoreID
				}, false).then(res => {
					if (res.IsSuccess) {
						self.infoObj = res
						self.showLoading = false;
						self.jrxf = res.Jrxf; //今日营业额
						self.jrdd = res.jrdd; //今日订单数
						self.xfze = res.xfze; //消费总额
						self.StoreID = res.Store.StoreID;
						self.storeObj = res.Store;
						self.StoreName = self.storeObj.StoreName;
						this.StartWorkDate = self.storeObj.StartWorkDate;
						this.EndWorkDate = self.storeObj.EndWorkDate;
						self.LogoPic = self.storeObj.LogoPic;
						this.StoreLevel = res.Store.StoreLevel;
						this.wxf = res.Wxf
						this.SqSort = res.SqSort
					} else if (!res.IsSuccess) {
						self.$api.msg(res.Msg, 2000)
						uni.switchTab({ //跳去首页
							url: '/pages/index/person'
						})
					}
					return
				})
			},
			personRouter(url,title) {
				let blacklist = [
					'/pages/shopManagement/sonPage/balanceWithdrawal',
					// '/pages/shopManagement/sonPage/bindingCashier/bindingCashierPage',
					'/pages/shopManagement/sonPage/gongMaBand',
				]
				
				for (let i = 0; i < blacklist.length; i++) {
					if (url.includes(blacklist[i])) {
						if (this.SqSort == 1) {
							uni.showModal({
								title: '权限不足',
								content: '您没有相关权限，请联系相关人员进行操作',
								showCancel: false
							})
							return
							break
						}
					}
				}
				
				if (url === '-1') {
					this.$api.msg('功能即将上线，敬请期待')
					return;
				}

				if (url === 'scan') {
					uni.scanCode({
						onlyFromCamera: true,
						success: (res) => {
							let result = JSON.parse(res.result)
							if (Object.keys(result).length != 0) {
								this.$http.verifyOrder(result.StoreID, 0, result.ddid, result.ddno, result.isspecial ? 1 : 0)
									.then(res => {
										if (res.IsSuccess) {
											uni.showModal({
												title: '核销成功',
												content: '订单核销完成',
												showCancel: false
											})
										} else {
											uni.showModal({
												title: '核销失败',
												content: '请确认订单是否有效',
												showCancel: false
											})
										}
									})
									.catch(err => {
										uni.showModal({
											title: '核销失败',
											content: '请确认订单是否有效',
											showCancel: false
										})
										console.log(err);
									})
							} else {
								uni.showModal({
									title: '核销失败',
									content: '请确认二维码是否正确',
									showCancel: false
								})
							}
						}
					})
				}

				if (url === 'msgAllSendOne') {
					setTimeout(() => {
						this.$api.showModal({
							title: '提示',
							content: '群发信息将会扣除您的信息费用，单条费用：0.1元/条',
							confirmText: '取消',
							confirmColor: "#333333",
							cancelColor: '#f34e2d',
							cancelText: '确定',
							showCancel: true
						}).then(res => {
							if (!res) {
								uni.navigateTo({
									url: '/pages/shopManagement/sonPage/msgAllSend/msgAllSendOne?StoreID='+this.storeObj.StoreID
								})
							}
						});
					})
					return
				}
				
				if(title){
					url = url + '?StoreID='+this.storeObj.StoreID + '&SqSort=' + this.SqSort;
					
					switch (title){
						case '收款码':
								url = url + '&StoreName='+this.storeObj.StoreName+'&LogoPic='+this.LogoPic+'&StoreAddress='+this.storeObj.StoreAddress
							break;
						case '营收概览':
								// url = url + '&billType=zhangdan'
							break;
						default:
							break;
					}
				}
				
					
					
					
					
				uni.navigateTo({
					url: url
				})
			},
			back() {
				uni.navigateBack({})
			},
			goToOtherPage(route, text) {
				var StoreID = this.StoreID
				var sqZZThree = '/pages/shopManagement/sonPage/jionrunscores/jionrunscoresOnepage'
				var StoreName = this.infoObj.Store.StoreName
				var LogoPic = this.infoObj.Store.LogoPic
				var myStoreID = this.getData.storeid
				var faRenId = this.infoObj.Store.UserID
				var IsBank = this.infoObj.IsBank
				if (route === sqZZThree && this.infoObj.Store.IsZZ) {
					uni.navigateTo({
						url: `/pages/shopManagement/sonPage/jionrunscores/jionrunscoresThreePage?StoreID=${StoreID}&StoreName=${StoreName}`
					})
					return
				}

				var goToRoute =
					`${route}?StoreID=${StoreID}&StoreName=${StoreName}&myStoreID=${myStoreID}&faRenId=${faRenId}&IsBank=${IsBank}`

				if (route === '/pages/shopManagement/sonPage/receivablesCodePage') {
					goToRoute = `${goToRoute}&LogoPic=${LogoPic}`
				}

				if (route === '/pages/shopManagement/sonPage/msgAllSend/msgAllSendOne') {
					this.$api.showModal({
						title: '您确定要群发信息吗？',
						content: '群发信息将会扣除您的信息费用，单条费用：0.1元/条'
					}).then(res => {
						if (res) {
							uni.navigateTo({
								url: goToRoute,
							})
							return
						} else {
							this.$api.msg('取消群发', 2000)
							return
						}
					})
				} else {
					if (route === '') {
						this.$api.msg('该页面还没写出来，莫慌', 1500)
						return
					} else {
						if (route === '/pages/shopManagement/sonPage/balanceWithdrawal') {
							if (text === '预存提现') {
								goToRoute = `${goToRoute}&type=yucunTX&YcKtxNum=${this.infoObj.YcKtxNum}`
							} else {
								let FanHuanBL = 1
								if (this.infoObj.Store.FanHuanBL != null) {
									FanHuanBL = this.infoObj.Store.FanHuanBL * 1
								}
								goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${FanHuanBL}`
								// if(this.infoObj.Wxf <= 0){
								// 	this.$api.msg('您当前没有可提现金额',2000)
								// 	return 
								// }else{
								// 	goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${this.infoObj.Store.FanHuanBL}`
								// }
							}
						}
						if (route === '/pages/shopManagement/sonPage/receivablesCodePage') {
							let StoreAddress = this.infoObj.Store.StoreAddress
							goToRoute = `${goToRoute}&StoreAddress=${StoreAddress}`
							// if(this.IsLock === 'true'){
							// 	this.$api.msg('您的店铺已被锁定',2000)
							// 	return 
							// }
						}
						if (route === '/pages/shopManagement/sonPage/bindingCashier/bindingCashierPage') {
							// if(this.IsLock === 'true'){
							// 	this.$api.msg('您的店铺已被锁定',2000)
							// 	return  
							// }	
						}
						uni.navigateTo({
							url: goToRoute
						})
					}
				}
			},
			goToBillDetail() {
				if (this.yyyState === 2) {
					var StoreID = this.StoreID
					//var StoreName=this.infoObj.Store.StoreName
					let url = `/pages/shopManagement/sonPage/billDetails?StoreID=${StoreID}&billType=zhangdan `
					uni.navigateTo({
						url
					})
				} else {
					//this.$api.msg('您当前没有权限')
				}
			},
			goToBalanceWithdrawal(type) {
				if (this.yyyState === 2) {
					// #ifndef  APP-PLUS || MP-ALIPAY
					// this.isTx = true
					// return false
					// #endif
					let StoreID = this.StoreID
					let StoreName = this.infoObj.Store.StoreName
					let myStoreID = this.getData.storeid
					let route = `/pages/shopManagement/sonPage/balanceWithdrawal`
					let goToRoute = `${route}?StoreID=${StoreID}&StoreName=${StoreName}&myStoreID=${myStoreID}`
					if (type != 'yc') {
						goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${this.infoObj.Store.FanHuanBL}`
						// if(this.infoObj.Wxf <= 0){
						// 	this.$api.msg('您当前没有可提现金额',2000)
						// 	return 
						// }else{
						// 	goToRoute = `${goToRoute}&StoreRest=${this.infoObj.Wxf}&fhBL=${this.infoObj.Store.FanHuanBL}`
						// }
					} else {
						goToRoute = `${goToRoute}&type=yucunTX&YcKtxNum=${this.infoObj.YcKtxNum}`
						// if(this.infoObj.YcKtxNum <= 0){
						// 	this.$api.msg('您当前没有可提现金额',2000)
						// 	return 
						// }else{
						// 	goToRoute = `${goToRoute}&type=yucunTX&YcKtxNum=${this.infoObj.YcKtxNum}`
						// }
					}

					uni.navigateTo({
						url: goToRoute
					})
				} else {
					//this.$api.msg('您当前没有权限')
				}
			}
		},
		onPageScroll(e) {
			this.money = '';
			if(e.scrollTop >=80){
				this.showTitle = true;
			}else{
				this.showTitle = false;
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.getCurryInfo().then(res => {
				uni.stopPullDownRefresh()
			})
		},
	}
</script>

<style>
	page {
		background: #f2f2f2 !important;
	}
</style>

<style scoped>
	page {
		background: #f2f2f2 !important;
	}
	.touxiang {
		width: 130upx;
		height: 130upx;
		border-radius: 50%;
	}


	.heading {
		font-size: 28upx;
		font-weight: 700;
		color: #333333;
	}


	.revenue-block {
		border-radius: 20upx;
		background: #FFFFFF;
		margin-bottom: 20upx;
	}

	.revenue-block .revenue-block-left {
		width: 75%;
		min-height: 110upx;
	}

	.revenue-block .revenue-block-left .revenue-block-leftAmount {
		font-size: 36upx;
		font-weight: bold;
		color: #333333;
		white-space: nowrap;
		margin-top: 10upx;
	}

	.revenue-block .revenue-block-left .revenue-block-leftTitle {
		font-size: 24upx;
		color: #444444;
		margin-top: 10upx;
	}

	.Shop-Manager-block {
		border: 0.8px solid #f6be7b;
		border-radius: 10upx;
		width: 202upx;
	}



	.Shop-Manager-block .Shop-Manager-Title {
		color: #ff5b2e;
		font-size: 28upx;
	}



	.Shop-Manager-block .Shop-Manager-GrayTitle {
		font-size: 24upx;
		color: #999999;
	}


	.Shop-Manager-block .Shop-Manager-button {
		border: 0.5px solid #f6be7b;
		width: 118upx;
		height: 40upx;
		background: #fbede9;
		border-radius: 100upx;
	}

	.Shop-Manager-block .Shop-Manager-button .button-text {
		color: #ff5b2e;
		font-size: 24upx;
		line-height: 1em;
	}


	.icontoRight {
		display: inline-block;
		transform: rotate(180deg);
		font-size: 24upx;
	}

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
		-webkit-animation: tui-rolling 6s linear infinite;
		animation: tui-rolling 6s linear infinite;
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

	.shopManag_ment {
		background-image: url('https://img.huaxuapp.com/sjbg_02.png');
		background-repeat: no-repeat;
		background-size: cover;
		border: 0.1px solid white;
	}

	.shopM_icon_list {
		background: white;
		flex-wrap: wrap;
	}

	.shopM_icon_item {
		width: 25%;
		height: 180upx;
	}

	.br_border {
		border-right: 2upx solid #DDDDDD;
		border-bottom: 2upx solid #DDDDDD;
	}

	.b_border {
		border-bottom: 2upx solid #DDDDDD;
	}

	.text_center {
		text-align: center;
		font-size: 23upx;
		color: rgb(225, 225, 225, 0.9);
	}

	.red_box_item {
		width: 47%;
		height: 100%;
		background: #F75A64;
		border-radius: 10upx;
	}

	.shop_log {
		background-repeat: no-repeat;
		background-size: cover;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
</style>
