<template>
	<view class="reservation-list-page" style="margin-top: 80upx;">
		
		<!-- <view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index" @tap="navList(item)"> -->
		<view class="reservation-list-item" v-for="(item, index) in reservationList" :key="index" v-if="item.State == 7 && TabCur == 3">
			<view class="flex align-center  padding-lr padding-tb-big-xs">
				<text class="hxIcon-rili icon-calendar"></text>
				<text class="text-gray text-sm">{{ changeBeTime(item.BookAddDate || item.AddDate) }}</text>
			</view>
			<view class="reservation-cotent">
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
			<view class="reservation-cotent">
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
			<view class="reservation-cotent">
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
</template>

<script>
	export default {
		data() {
			return {
				reservationList: [],
			}
		},
		props:{
			TabCur:{
				default:0
			},
			currentPage:{
				default:0
			}
		},
		mounted() {
			this.$http.getReservitionList(this.$store.state.userInfo.ID,this.TabCur,this.currentPage).then(res => {
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
			}
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
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
