<!-- <template>
	<view class="reservation-page">
		<cu-custom bgColor="bg-white" :isBack="true" class="solid-bottom">
			<block slot="content">在线预约</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">
					预约人数
				</view>
				<input type="number" v-model="number" name="number" placeholder="请输入人数" class="aligen-right">
			</view>
			<view class="cu-form-group">
				<view class="title">预约日期</view>
				<picker mode="date" :value="date" :start="dateRange[0]" :end="dateRange[1]" @change="selectDate">
					<view class="picker">
						{{ date }}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预约时间</view>
				<picker mode="time" :value="time" start="11:30" end="22:00" @change="selectTime">
					<view class="picker">
						{{ time }}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					联系人
				</view>
				<input type="text" v-model="name" name="phone" placeholder="请输入联系人姓名" class="aligen-right">
				<view class="cu-capsule margin-left">
					<radio-group @change="selectSex">
						<label class="radio">
							<radio value="0" class="yellow" :class="sex === '0' ? 'checked': ''" :checked="sex === '0'" /><text class="margin-left-xs">先生</text>
						</label>
						<label class="radio margin-left-sm">
							<radio value="1" class="yellow" :class="sex === '1' ? 'checked': ''" :checked="sex === '1'" /><text class="margin-left-xs">女士</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">
					联系电话
				</view>
				<input type="number" v-model="phone" name="phone" placeholder="请输入联系电话" maxlength="11" class="aligen-right">
			</view>
			<view class="cu-form-group" style="height:175upx;" >
				<textarea v-if="showTextarea()"  maxlength="-1" v-model="notice"  placeholder="备注信息" style="border-bottom: 1upx solid rgba(0, 0, 0, .1);"></textarea>
			</view>
			<view class=" lg shadow margin flex align-center justify-center" style="background: linear-gradient(to right, #fdbb00, #fea900);height: 88upx;border-radius: 1000upx;"
			 @tap="showconfirmTips()">
				<text style="font-size: 33upx;color: #FFFFFF">提交预约信息</text>
			</view>
		</form>



		<tui-modal :show="confirmTips" @click="toReservation" @cancel="hideconfirmTips" content="您也可以在预约的同时选购好商品" color="#333"
		 :size="32" shape="circle" :button="tipBotton"></tui-modal>

		<tui-modal :show="showTips" @cancel="hiedModel" :custom="true" :isPadding="true" :maskClosable="false">
			<view class="flex align-center justify-center flex-direction">
				<view class="margin-top" style="background: url(https://img.huaxuapp.com/xdcg_03.png) no-repeat; background-size: 100% 100%; width: 387upx;height: 285upx;"></view>
				<text class="text-xxl text-bold margin-top-lg">预约成功</text>
				<text class=" margin-top-lg text-gray" style="white-space: nowrap;font-size: 26upx;">请至【我的—在线订单】中查看详情</text>
				<view @tap="hiedModel" class=" flex align-center justify-center  margin-top-xl" style="border-radius: 1000upx; width: 500upx;height: 88upx;background: #F8CD18;">
					<text class="text-white" style="font-size: 33upx;">我知道了</text>
				</view>
			</view>
		</tui-modal>
	</view>
</template> -->

<template>
	<view class="reservation-page">
		<cu-custom bgColor="bg-white" :isBack="true" class="solid-bottom">
			<block slot="content">在线预约</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">
					预约人数
				</view>
				<input type="number" v-model="number" name="number" placeholder="请输入人数" class="aligen-right">
			</view>
			<view class="cu-form-group">
				<view class="title">预约日期</view>
				<picker mode="date" :value="date" :start="dateRange[0]" :end="dateRange[1]" @change="selectDate">
					<view class="picker">
						{{ date }}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预约时间</view>
				<picker mode="time" :value="time" start="11:30" end="22:00" @change="selectTime">
					<view class="picker">
						{{ time }}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					联系人
				</view>
				<input type="text" v-model="name" name="phone" placeholder="请输入联系人姓名" class="aligen-right">
				<view class="cu-capsule margin-left">
					<radio-group @change="selectSex">
						<label class="radio">
							<radio value="0" class="yellow" :class="sex === '0' ? 'checked': ''" :checked="sex === '0'" /><text class="margin-left-xs">先生</text>
						</label>
						<label class="radio margin-left-sm">
							<radio value="1" class="yellow" :class="sex === '1' ? 'checked': ''" :checked="sex === '1'" /><text class="margin-left-xs">女士</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">
					联系电话
				</view>
				<input type="number" v-model="phone" name="phone" placeholder="请输入联系电话" maxlength="11" class="aligen-right">
			</view>
			<view class="cu-form-group" style="height:175upx;" >
				<textarea v-if="showTextarea()"  maxlength="-1" v-model="notice"  placeholder="备注信息" style="border-bottom: 1upx solid rgba(0, 0, 0, .1);"></textarea>
			</view>
			<view class=" lg shadow margin flex align-center justify-center" style="background: linear-gradient(to right, #fdbb00, #fea900);height: 88upx;border-radius: 1000upx;"
			 @tap="showconfirmTips()">
				<text style="font-size: 33upx;color: #FFFFFF">提交预约信息</text>
			</view>
		</form>



		<tui-modal :show="confirmTips" @click="toReservation" @cancel="hideconfirmTips" content="请确认信息是否正确" color="#333"
		 :size="32" shape="circle" :button="tipBotton"></tui-modal>

		<tui-modal :show="showTips" @cancel="hiedModel" :custom="true" :isPadding="true" :maskClosable="false">
			<view class="flex align-center justify-center flex-direction">
				<view class="margin-top" style="background: url(https://img.huaxuapp.com/xdcg_03.png) no-repeat; background-size: 100% 100%; width: 387upx;height: 285upx;"></view>
				<text class="text-xxl text-bold margin-top-lg">预约成功</text>
				<text class=" margin-top-lg text-gray" style="white-space: nowrap;font-size: 26upx;">请至【我的—预约订单】中查看详情</text>
				<view @tap="hiedModel" class=" flex align-center justify-center  margin-top-xl" style="border-radius: 1000upx; width: 500upx;height: 88upx;background: #F8CD18;">
					<text class="text-white" style="font-size: 33upx;">我知道了</text>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import tuiModal from "@/components/modal/modal"
	import { wxAppletsBookPay } from '@/common/handle.js'
	export default {
		components: {
			tuiModal
		},
		data() {
			return {
				date: '',
				dateRange: [],
				time: '',
				number: 1,
				phone: this.$store.state.userInfo.Phone || '',
				name: '',
				sex: '0',
				notice: '',
				storeId: '',
				storeName: '',
				needRes: '',
				isHaveGoods: true,
				showTips: false,
				confirmTips: false,
				tipBotton: [
				{
					text: "确定预约",
					type: 'yellow'
				}, 
				// {
				// 	text: "继续选购商品",
				// 	type: 'yellow'
				// },
				],
			}
		},
		onLoad(option) {
			console.log(option.storeid);
			this.needRes = option.needRes;
			this.storeId = option.storeid
			this.storeName = option.storeName
			this.isHaveGoods = option.isHaveGoods
		},
		onShow() {
			let cDate = new Date()
			let cYear = cDate.getFullYear()
			let cMonth = cDate.getMonth() + 1
			let cDay = cDate.getDate()
			cMonth = cMonth > 9 ? cMonth : '0' + cMonth
			cDay = cDay > 9 ? cDay : '0' + cDay
			this.date = `${cYear}-${cMonth}-${cDay}`
			this.dateRange = [`${cYear - 2}-01-01`, `${cYear + 2}-12-31`]
			let cHours = cDate.getHours()
			let cMinutes = cDate.getMinutes()
			cHours = cHours > 9 ? cHours : '0' + cHours
			cMinutes = cMinutes > 9 ? cMinutes : '0' + cMinutes
			this.time = `${cHours}:${cMinutes}`
		},
		methods: {
			showTextarea(){
				if(this.confirmTips){
					return false
				}else if(this.showTips){
					return false
				}else{
					return true
				}
			},
			hiedModel() {
				this.showTips = false
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			hideconfirmTips() {
				this.confirmTips = false
			},
			showconfirmTips() {
				this.confirmTips = true;
			},
			// handleClick5(e) {
			// 	let index = e.index;
			// 	if (index > 0) {
			// 		this.basketList.forEach((item, index) => {
			// 			item.selectCount = 0;
			// 		})

			// 		this.basketList.length = 0;
			// 		this.cuteTagsum = 0;
			// 		this.sumMoney = 0;
			// 	}
			// 	this.popup()
			// 	this.hideTips()
			// },
			selectDate: function(e) {
				this.date = e.detail.value
			},
			selectTime: function(e) {
				this.time = e.detail.value
			},
			selectSex: function(e) {
				this.sex = e.detail.value
			},
			toReservation: function(e) {
				let index = e.index;
				console.log(this.storeId)
				let obj = {
					UserID: this.$store.state.userInfo.ID,
					StoreID: Number(this.storeId),
					Num: this.number,
					YCDate: this.date,
					YCTime: this.time,
					Contacts: this.name,
					Sex: this.sex,
					Phone: this.phone,
					Info: this.notice,
					DDSort: 2
				}

				this.$store.commit('setReservationObj', obj);

				if (index > 0) {
					//去点餐
					uni.navigateTo({
						url: `/pages/shopDetail/orderFood/newOrderFood?storeId=${this.storeId}&storeName=${this.storeName}&needRes=${this.needRes}&isHaveGoods=${this.isHaveGoods}`
					})
				} else {
					this.confirmTips = false;
					this.$api.showLoading_()
					// // #ifdef MP-WEIXIN
					// uni.showModal({
					// 	title: '用户须知',
					// 	content: '预约需要支付 1 元做为保证金，除商家拒绝预约以外，其他情况均不退款',
					// 	confirmText: '去支付',
					// 	success: (res) => {
					// 		if (res.confirm) {
					// 			let out_trade_no = new Date().getTime()
					// 			wxAppletsBookPay(out_trade_no, `${this.storeName}预约手续费`, this.$store.state.userInfo.UnionID,
					// 												this.storeId, this.number, this.date, this.time, this.name, this.sex, this.phone, 0, this.notice)
					// 				.then(res => {
					// 					this.showTips = true
					// 					this.$http.sendBookSMS(this.$store.state.userInfo.ID, this.storeId)
					// 				})
					// 				.catch(err => {
					// 					console.log(err);
					// 				})
					// 		}
					// 	}
					// })
					// // #endif
					this.$api.showLoading_()
					this.$http.reservation(this.$store.state.userInfo.ID, Number(this.storeId), this.number, this.date, this.time,
							this.name, this.sex, this.phone, this.notice)
						.then(res => {
							setTimeout(() => {
								this.$api.hidLoading_();
								this.showTips = true;
							}, 1000);
						})
						.catch(err => {
							console.log(err);
						})
				}
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	radio {
		transform: scale(0.8);
	}
</style>

<style scoped lang="scss">
	page {
		background: #FFFFFF;
	}

	.aligen-right {
		text-align: right;
	}
</style>
