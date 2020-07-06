<template>
	<view class="order-managment-page">
		<cu-custom bgColor="bg-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>我的订单</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText"><text>我的订单</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
			<scroll-view scroll-x class="bg-white nav shadow" style="position: fixed; z-index: 99;" v-if="storeSort != 1">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)"  style="margin: 0">
						{{item}}
					</view>
				</view>
			</scroll-view>
		<!-- #endif -->
		
		<!-- #ifdef MP-ALIPAY -->
			<scroll-view scroll-x class="bg-white nav shadow" style="z-index: 99;" v-if="storeSort != 1">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'tab-active' : ''"
					 v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)"  style="margin: 0">
						{{item}}
					</view>
				</view>
			</scroll-view>
		<!-- #endif -->
		
		
		
		<view class="reservation-list-page" style="margin-top: 80upx;">
			
			<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index" @tap="navList(item)"> -->
			<view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index" v-if="item.State == 7 && TabCur == 3">
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
								<!-- <text class="margin-left-xs sm cu-tag round bg-yellow" v-if="item.ConsumedWay == 1">外卖</text> -->
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
							<!-- <view class="reservation-info" v-if="item.sum <= 0"></view> -->
							<view class="reservation-btn flex align-center justify-center cancle" @tap.stop="reservationCancle(item.YYID, index)"
							 v-if="item.State == 5">
								<text class="">取消预约</text>
							</view>
							<!-- <view v-if="getType(item) === '点餐'" class="reservation-btn flex align-center justify-center toPay">
								<text>查看详情</text>
							</view>
							<view  v-if="getType(item) === '预点餐' && item.State == 0 " class="reservation-btn flex align-center justify-center toPay" @tap.stop="toPay(item.StoreID,item.StoreName,item.LogoPic)">
								<text class="">去支付</text>
							</view> -->
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index"  v-if="TabCur==1 && item.State == 5 ">
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
								<!-- <text class="margin-left-xs sm cu-tag round bg-yellow" v-if="item.ConsumedWay == 1">外卖</text> -->
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
							<!-- <view class="reservation-info" v-if="item.sum <= 0"></view> -->
							<view class="reservation-btn flex align-center justify-center cancle" @tap.stop="reservationCancle(item.YYID, index)"
							 v-if="item.State == 5">
								<text class="">取消预约</text>
							</view>
							<!-- <view v-if="getType(item) === '点餐'" class="reservation-btn flex align-center justify-center toPay">
								<text>查看详情</text>
							</view>
							<view  v-if="getType(item) === '预点餐' && item.State == 0 " class="reservation-btn flex align-center justify-center toPay" @tap.stop="toPay(item.StoreID,item.StoreName,item.LogoPic)">
								<text class="">去支付</text>
							</view> -->
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index"  v-if="TabCur==0">
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
								<!-- <text class="margin-left-xs sm cu-tag round bg-yellow" v-if="item.ConsumedWay == 1">外卖</text> -->
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
							<!-- <view class="reservation-info" v-if="item.sum <= 0"></view> -->
							<view class="reservation-btn flex align-center justify-center cancle" @tap.stop="reservationCancle(item.YYID, index)"
							 v-if="item.State == 5">
								<text class="">取消预约</text>
							</view>
							<!-- <view v-if="getType(item) === '点餐'" class="reservation-btn flex align-center justify-center toPay">
								<text>查看详情</text>
							</view>
							<view  v-if="getType(item) === '预点餐' && item.State == 0 " class="reservation-btn flex align-center justify-center toPay" @tap.stop="toPay(item.StoreID,item.StoreName,item.LogoPic)">
								<text class="">去支付</text>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
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
				'全部',
				'预约订单',
				'待评价',
				'已取消',
				'售后'
			],
			storeSort: 0,
			tulist:[],
			state:[],
		};
	},
	onLoad(option) {
		this.TabCur = parseInt(option.index) 
		this.currentPage = 1
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
	},
	onShow() {
		
	},
	methods: {
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
			// this.currentPage = 1
			// this.$http.getAllOrdersList(this.storeid, this.TabCur, this.currentPage)
			// 	.then( res => {
			// 		if ( res.IsSuccess ) {
			// 			this.ordersList = res.Data
			// 		}
			// 		uni.hideLoading()
			// 	})
			// 	.catch( err => {
			// 		console.log(err);
			// 		uni.hideLoading()
			// 	})
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
			};
			if(this.TabCur == 1){
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
			};
			if(this.TabCur == 2){
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
			};
			if(this.TabCur == 3){
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
			};
			if(this.TabCur == 4){
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
		this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur + 1,this.currentPage).then(res => {
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
	},
	onPullDownRefresh() {
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
		uni.stopPullDownRefresh()
		uni.hideLoading()
	}
};
</script>

<style scoped lang="scss">
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
			color: #333333;
			font-weight: bold;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 2.2em;
				height: 10upx;
				left: 50%;
				transform: translateX(-50%);
				width: 20%;
				border-radius: 100upx;
				background-color: #f04921;
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
			color: #f04921;
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
	$reservation-red: #f34e2d;
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
			box-shadow: 0 0 14upx rgba($color: #000000, $alpha: .1);

			.content-title {
				margin: 0 30upx;
				padding: 20upx 0;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid rgba($color: #e4e4e4, $alpha: .5);

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
</style>