<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<block slot="content"><text class="text-bold">订单详情</text></block>
		</cu-custom>
		<!-- #endif -->

		<view class="order-list margin-top-sm" v-if="orderItme">
			<view class="top-title ">
				<text class="text-bold">预约信息</text>
			</view>
			<view class="padding-sm">
				<view class="flex align-center margin-top-lg">
					<text class="hxIcon-renshu margin-left-sm"></text>
					<text class="margin-left-sm text-bold">{{orderItme.Contacts || num}}{{ orderItme.Sex == 0 ? '先生' : '女士' }}</text>
				</view>
				<view class="flex align-center margin-top-sm">
					<text class="hxIcon-yuyue margin-left-sm"></text>
					<text class="margin-left-sm text-bold">{{ orderItme.YCDate || ycdate}} {{ orderItme.YCTime || yctime}}</text>
				</view>
				<view class="flex align-center margin-top-lg">
					<text class="hxIcon-renshu margin-left-sm"></text>
					<text class="margin-left-sm text-bold">{{orderItme.Num || num}}人</text>
				</view>
				<view class="flex align-center margin-top-lg margin-bottom-sm">
					<text class="hxIcon-shouji2 margin-left-sm"></text>
					<text class="margin-left-sm text-black text-bold">手机号：</text>
					<text class="text-bold phone-text">{{orderItme.Phone || phone}}</text>
				</view>
				<view class="flex align-center margin-top-lg margin-bottom-sm" v-if="orderItme.Info">
					<text class="hxIcon-pingjia margin-left-xss"></text>
					<text class="margin-left-xss text-bold flexss">备注信息：</text>
					<text class="flexs text-bold">{{orderItme.Info || info}}</text>
				</view>
			</view>
		</view>

		<view class="order-list margin-top-sm" v-if="type == 1 || storeSort == 1">
			<view class="top-title ">
				<text class="text-bold">收货地址</text>
			</view>
			<view class="padding-sm">
				<view class="flex align-center">
					<text class="hxIcon-renshu margin-left-sm"></text>
					<text class="margin-left-sm text-black text-bold">联系人：</text>
					<text class="text-bold">{{ addr.UserName }}</text>
				</view>
				<view class="flex align-center margin-top-lg margin-bottom-sm ">
					<text class="hxIcon-shouji2 margin-left-sm"></text>
					<text class="margin-left-sm text-black text-bold">手机号：</text>
					<text class="text-bold phone-text">{{ addr.UserPhone }}</text>
				</view>
				<view class="flex align-center margin-top-lg margin-bottom-sm ">
					<text class="hxIcon-dingwei1 margin-left-sm"></text>
					<text class="margin-left-sm text-black text-bold">收货地址：</text>
					<text class="text-bold phone-text">{{ addr.Address }}</text>
				</view>
			</view>
		</view>

		<view class="order-list  margin-top-sm " v-if="ShopContent.length>0">
			<view class="top-title ">
				<text class="text-bold">商品信息</text>
			</view>
			<view class="center-list " v-for="(item,index) of ShopContent" :key="index">
				<view class="flex align-center justify-between margin-tb-sm">
					<image :src="item.PicUrl" style="height: 80upx; width: 80upx;"></image>
					<view class="flex align-start justify-between flex-direction margin-left-sm" style="width: 40%;height: 80upx;">
						<text class="text-cut ">{{item.WMInfoTitle}}</text>
						<view>
							<text style="font-size: 24upx;color: #999999;">{{ item.Tags ? item.Tags.title : '' }} x</text><text style="margin-left: 5upx;font-size: 24upx;color: #999999;">{{item.selectCount}}</text>
						</view>
					</view>
					<view class="flex align-end justify-end" style="width: 50%;">
						<text>&yen;</text><text class="margin-left-xxs">{{ accMul(item.selectCount, item.Tags ? item.Tags.price : item.Price) }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-total">
				<view class="flex align-center justify-end">
					<text class="bottom-total-text">总共{{sum}}件商品</text>
					<text class="bottom-total-text margin-left">总价</text>
					<text class="symbol margin-left-sm">&yen;</text><text class=" text-bold text-xl margin-left-xxs">{{sumMoney}}</text>
				</view>

			</view>
		</view>

		<view class="order-list  margin-top-sm">
			<view class="top-title ">
				<text class="text-bold">订单信息</text>
			</view>
			<view class="center-list ">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">订单状态</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ DDState }}
					</view>
				</view>
			</view>

			<view class="center-list ">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">下单时间</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ changeBeTime(AddDate) }}
					</view>
				</view>
			</view>

			<view class="center-list">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">订单编号</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ DDNO }}
					</view>
				</view>
			</view>
			
			<view class="center-list" v-if="DDState == 10">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">快递公司</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ com }}
					</view>
				</view>
			</view>
			
			<view class="center-list" v-if="DDState == 10">
				<view class="flex align-center justify-between margin-tb">
					<text class="text-cut" style="width: 50%;">快递单号</text>
					<view class="flex align-end justify-end" style="width: 50%;">
						{{ code }}
					</view>
				</view>
			</view>
		</view>
		
		<view class="order-list margin-top-sm padding-bottom-sm" v-if="DDState == '已发货' || ( DDState == '已完成' && code ) ">
			<view class="top-title ">
				<text class="text-bold">物流信息</text>
			</view>
			
			<tui-time-axis class="margin" v-for="(item, index) in logisticsInfo" :key="index">
				<tui-time-axis-item bgcolor="none">
					<template v-slot:node>
						<view>
							<text class="cuIcon-magic text-yellow text-lg"></text>
						</view>
					</template>

					<template v-slot:content>
						<view>
							<view class="text-bold text-lg" v-if="index == 0">{{ logisticsState }}</view>
							<view class="margin-tb-xs">{{item.context}}</view>
							<view class="text-gray text-sm">{{ item.time }}</view>
						</view>
					</template>
				</tui-time-axis-item>
			</tui-time-axis>
		</view>
		
		<view class="holderplace"></view>
		
		<view class="verify-btn" @tap="verify" v-if="DDState == '已预约' && entrance != 'list'">
			<text>核销</text>
		</view>
		
		<view class="verify-btn" @tap="confirm" v-if="(DDState == '已预约' || DDState == '已点单' || DDState == '已支付') && entrance == 'list'">
			<text>完成订单</text>
		</view>
		
		<view class="verify-btn" @tap="ship(true)" v-if="DDState == '待发货'">
			<text>发货</text>
		</view>
		
		<tui-modal :show="showTips" @click="handleClick" :button="actionBtn"
			:maskClosable="false" title="确定完成吗?" content="订单完成后不可修改, 请确认订单已完成再执行该操作, 以免引起不必要的纠纷!"></tui-modal>
			
		<tui-modal :show="showShipModal" :custom="true" :fadein="true">
			<view class="tui-modal-custom">
				<view class="text-lg text-bold margin-bottom flex justify-between"  @tap="ship(false)">
					<text>发货</text>
					<text class="hxIcon-cha"></text>
				</view>
				<input placeholder="前请输入运单号" class="ship-input" v-model="code" />
				<view class="ship-btn" @tap="shipCode">
					<text>发货</text>
				</view>
			</view>
		</tui-modal>		
	</view>
</template>

<script>
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	import tuiModal from '@/components/modal/modal.vue'
	import { shipList } from '@/common/shipList.js'
	import tuiTimeAxis from '@/components/time-axis/time-axis.vue'
	import tuiTimeAxisItem from '@/components/timeaxis-item/timeaxis-item.vue'
	export default {
		components: { tuiModal, tuiTimeAxis, tuiTimeAxisItem },
		data() {
			return {
				bookid: '',
				orderItme: '',
				sumMoney: 0,
				sum: 0, //个数
				DDState: '',
				AddDate: '',
				DDID: '',
				ShopContent: [],
				ycdate: '',
				yctime: '',
				num: '',
				phone: '',
				StoreId: 0,
				entrance: '',
				showTips: false,
				DDNO: '',
				storeSort: 0,
				actionBtn: [
					{
						text: '取消',
						type: 'gray',
						plain: true
					},
					{
						text: '确定',
						type: 'red'
					}
				],
				type: 0,
				addr: {},
				showShipModal: false,
				code: '',
				com: '',
				logisticsInfo: '',
				logisticsState: 2
			}
		},
		async onLoad(option) {
			if (option.StoreID) {
				this.StoreId = option.StoreID
			}
			if(option.entrance) {
				this.entrance = option.entrance
			}
			if(option.state) {
				this.DDState = option.state
			}
			if(option.bookid && option.bookid != 0){
				this.bookid = option.bookid	;
				await this.getOrderItembyBookid()
				await this.getAddr()
			}else if(option.ddid){
				this.DDID = option.ddid;
				await this.getOrderItembyDdid();
				await this.getAddr()
			}else if(option.ycdate){
				this.ycdate = option.ycdate;
				this.yctime = option.yctime;
				this.num = option.num;
				this.phone = option.phone;
				this.AddDate =option.addDate;
			} else{
				uni.navigateBack({
					delta: 1
				})
			}
		},
		methods: {
			accMul(arg1,arg2){
				return this.$api.accMul(arg1,arg2)
			},
			ship: function (state) {
				this.showShipModal = state
			},
			shipCode: function () {
				this.$http.ship(this.DDID, this.StoreId, this.code)
					.then(res => {
						if (res.IsSuccess) {
							this.DDState = 10
						}
						this.showShipModal = false
						this.getLogisticsInfo()
						uni.showToast({
							title: res.Msg
						})
					})
					.catch(err => {
						this.showShipModal = false
						console.log(err);
					})
			},
			getLogisticsInfo: async function () {
				let comCode, tmp
				tmp = await this.$http.getExpress(this.code)
				comCode = tmp[0].comCode
				this.com = shipList.filter(item => {
					return item.code === comCode
				})[0].name
				let params = {
					"com": comCode,
					"num": this.code,
					// "phone": this.$store.state.userInfo.Phone
					"phone": "15291644921"
				}
				this.$http.getLogisticsInformation(params)
					.then(res => {
						if (res.message == 'ok') {
							this.logisticsInfo = res.data
							this.logisticsState = this.getLogisticsState(Number(res.state))
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			confirm: function () {
				this.showTips = true
			},
			handleClick: function (e) {
				let index = e.index
				switch (index) {
					case 0:
						this.showTips = false
						break
					case 1:
						this.verify()
						this.showTips = false
						break
					default:
				}
			},
			getAddr: async function () {
				let { IsSuccess, Data } = await this.$http.getAddr(this.UserAddressID)
				if ( IsSuccess ) {
					this.addr = Data
					this.addr.Address = Data.Sheng + Data.Shi + Data.Xian + Data.Address
				}
			},
			getStatus: function (status) {
				let result
				switch (Number(status)) {
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
			getLogisticsState: function (status) {
				let result
				switch (Number(status)) {
					case 0:
						result = '在途'
						break
					case 1: 
						result = '揽收'
						break
					case 2:
						result = '疑难'
						break;
					case 3:
						result = '签收'
						break;
					case 4:
						result = '退签'
						break;
					case 5:
						result = '派件'
						break;
					case 6:
						result = '退回'
						break;
					case 7:
						result = '转投'
						break;
					default:
						result = '未知状态'
				}
				return result
			},
			changeBeTime(date) {
				if (date) {
					return this.beTime(date)
				}
			},
			verify: function () {
				this.showTips = false
				this.$http.verifyOrder(this.StoreId, this.DDID || 0, this.bookid || 0)
					.then( res => {
						if (res.IsSuccess) {
							uni.showToast({
								title: res.Msg,
								duration: 1500
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1500)
						} else {
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
			async getOrderItembyDdid() {
				this.$api.showLoading_();
				await this.$http.getOrderByid(this.DDID).then(res => {
					if (res.IsSuccess) {
						this.orderItme = ''
						this.AddDate = res.Data.AddDate
						this.sumMoney = res.Data.DDMoney
						// this.DDState = res.Data.DDState
						this.DDID = res.Data.DDID
						this.DDNO = res.Data.DDNO
						this.code = res.Data.OrderNumber
						this.UserAddressID = res.Data.UserAddressID
						let ShopContent = res.Data.ShopContent
						this.storeSort = res.StoreSort
						let sum = 0;
						let sumMoney = 0;
						if (ShopContent) {
							
							this.ShopContent = JSON.parse(ShopContent);
							this.ShopContent.forEach(item => {
								sum += item.selectCount;
							});
						}
						if (this.DDState == 10 || this.DDState == 8) {
							this.getLogisticsInfo()
						}
						this.sum = sum;
						this.$api.hidLoading_();	
					}
				});
			},
			async getOrderItembyBookid() {
				this.$api.showLoading_();
				await this.$http.getOrderByBookid(this.bookid).then(res => {
					if (res.IsSuccess) {
						this.orderItme = res.Data[0]
						this.AddDate = res.Data[0].AddDate
						this.sumMoney = res.Data[0].DDMoney
						// this.DDState = res.Data[0].State
						this.DDID = res.Data[0].DDID
						this.DDNO = 'DD20200101000000' + res.Data[0].DDID
						let ShopContent = res.Data[0].ShopContent
						this.type = res.Data[0].ConsumedWay
						this.UserAddressID = res.Data[0].UserAddressID
						let sum = 0;
						let sumMoney = 0;
						if (ShopContent) {
							this.ShopContent = JSON.parse(ShopContent);
							this.ShopContent.forEach(item => {
								sum += item.selectCount;
							});
						}
						this.sum = sum;
						this.$api.hidLoading_();		
					}
				});
			}
		}
	}
</script>



<style>
	page {
		background: #F2F2F2;
	}
</style>

<style scoped>
	.margin-top-xxxs {
		margin-top: 2upx;
	}

	.tips {
		color: #999999;
		font-size: 28upx;
		letter-spacing: 2upx;
	}

	.order-list {
		border-radius: 15upx;
		background: #FFFFFF;
	}
	
	.holderplace {
		width: 750upx;
		height: 140upx;
		background: transparent;
	}

	.order-list .top-title {
		padding: 25upx;
		font-size: 30upx;
		border-bottom: 0.7px solid #E4E4E4;
	}

	.order-list .center-list {
		padding: 0 25upx;
		border-bottom: 0.7px solid #E4E4E4;
	}

	.order-list .bottom-total {
		padding: 25upx;
	}


	.order-list .bottom-total .symbol {
		font-size: 24upx;
	}

	.order-list .bottom-total .bottom-total-text {
		font-size: 24upx;
		color: #9A9A9A;
	}
	
	.verify-btn {
		position: fixed;
		width: 690upx;
		bottom: 20upx;
		left: 30upx;
		padding: 30upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #f8d1a3;
		box-shadow: 0 4upx 8upx rgba(248, 209, 163, .3);
		border-radius: 100upx;
	}
	
	.ship-btn {
		margin-top: 30upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #f8d1a3;
		box-shadow: 0 4upx 8upx rgba(248, 209, 163, .3);
		border-radius: 100upx;
		padding: 20upx 50upx;
	}
	
	.ship-input {
		border-bottom: 1upx solid #E6E6E6;
		text-align: center;
		padding-bottom: 10upx;
	}
</style>
