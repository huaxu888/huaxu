<template>
	<view class="bill_details">
		<load-ing ref="loading"></load-ing>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">账单明细</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">账单明细</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="bill_title flex justify-center align-center margin-top " style="width:100%">
			<view class="bg_title flex flex-direction align-center justify-center">
				<view class="flex align-center">
					<text class="hxIcon-yue1 margin-right-sm" style="color:rgb(254,155,5);font-size: 50upx;"></text>
					<text class="text-gray text-df">账单总额（元）</text>
				</view>
				<text class="padding-top-sm" style="font-size:60upx">{{changeMoney(infoObj.ZongShouRu)}}</text>
			</view>
		</view>
		<!--style="margin-top:80upx"-->

		<view class="bill_contetn">
			<view class="flex  padding-lr align-center justify-between  margin-bottom-sm">
				<view style="width:240upx;height:56upx;border-radius: 50upx;" class="bg-white flex justify-center align-center padding-sm"
				 @tap="toggleTab">
					<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDays">
						<text>
							{{timeValue}}
						</text>
					</picker>

					<text class="cuIcon-triangledownfill" style="font-size: 40upx;"></text>
				</view>


				<view style="width:220upx;height:56upx;border-radius: 50upx;" class="bg-white flex justify-center align-center padding-sm"
				 v-if="yyyState===2">
					<view class="text-df">
						<!--分类的筛选-->
						<picker @change="classPickerChange" :value="classIndex" range-key="info" :range="yYyList" mode="selector">
							<view class="flex flex-wrap ">
								<view class="flex justify-between">
									<view>营业员:</view>
									<view class="yyyName">{{yYyList[classIndex].Name}}</view>
									<text class="cuIcon-triangledownfill"></text>
								</view>
							</view>
						</picker>
					</view>
				</view>


				<view class="flex flex-direction align-end text-sm">
					<text>当月收入：{{infoObj.TotalOrder}} 笔</text>
					<text>共计：{{changeMoney(infoObj.YueShouRu)}} 元</text>
				</view>
			</view>

			<view class="bill_list padding-lr bg-white" style="min-height:780upx;">

				<view class="padding-tb-sm flex align-center justify-between border_bottom" @tap="goToDetail(item)" v-for="(item,i) of infoList"
				 :key="i">

					<view class="flex flex-direction align-start " style="width:25%">
						<text class="margin-bottom-xs">{{phoneMosaic(item.Phone)}}</text>
						<text class="text-sm ">{{beTime(item.AddDate)}}</text>
					</view>

					<view style="width:34%" class="flex flex-direction align-center">
						<text class="margin-bottom-xs">{{'收款人'}}</text>
						<text class="text-sm">{{item.Name}}</text>
					</view>



					<view style="width:33%" class="flex justify-end ">
						<text class="text-bold" :class="item.Sort===2?'text-black':'text-red'">{{item.Sort===2?'+':'-'}}{{item.XFJE}}</text>
					</view>

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		getPageAllInfo as mixins
	} from '../../../mixins/qymMixins.js'
	export default {
		mixins: [mixins],
		data() {
			return {
				timeValue: '',
				billTimeData: {
					mode: "yearMonth",
					value: [20, 6],
					picker: "yearMonth"
				},
				getData: {
					StoreID: '',
					page: 1,
					pagesize: 10,
					day: '',
					yyyid: 0
				},
				getDaiLidata: {
					userid: this.$store.state.userInfo.ID,
					page: 1,
					pagesize: 10,
					day: ''
				},
				infoList: [],
				infoObj: {},
				billType: 'zhangdan',
				state: 0,
				yYyList: [{
					Name: '全部',
					ID: 0,
					FaceURL: 'https://img.huaxuapp.com/pig.png',
					shouyingyuan: {
						UserID: 0
					},
					Phone: 0
				}],
				classIndex: 0
			}
		},
		onLoad(route) {
			this.timeValue = this.getTime()
			if (this.yyyState === 1) {
				this.getData.yyyid = this.$store.state.userInfo.ID
			}

			if ('billType' in route) {
				this.billType = route.billType
				this.state = route.state
			} else {
				this.getData.StoreID = route.StoreID
			}

			this.getCurryInfo(false).then(res => {
				if (res === 'zhangdan') {
					this.getYyY()
					return 1
				} else {
					return 2
				}
			})
		},
		methods: {
			changeDays(e) {

				let time = e.detail.value
				time = time.split('-')
				time = `${time[0]}-${time[1]}`
				this.timeValue = time;
				this.getData.day = time
				this.getData.page = 1
				this.getCurryInfo()
			},
			classPickerChange(e) {
				console.log(e)
				this.classIndex = e.detail.value
				let value = this.yYyList[this.classIndex]
				if ('ID' in value) {
					this.getData.yyyid = value.ID
				} else {
					this.getData.yyyid = value.UserID
				}
				this.getData.page = 1
				this.getData.pagesize = 10
				this.getCurryInfo()
			},
			getYyY() {
				let data = {
					StoreID: this.getData.StoreID
				}
				return this.$Request.get(this.$store.state.getsyylistUrl, data, false).then(res => {
					if (res.IsSuccess) {
						this.yYyList = [...this.yYyList, ...res.Data]
						this.yYyList.forEach((it, i) => {
							let info = ''
							if (i === 0) {
								it.info = '全部'
							} else {
								it.info = `昵称:${it.Name};电话:${it.Phone}`
							}
						})
						return this.yYyList
					}
				})
			},
			getTime() {
				let day = (new Date()).Format("yyyy-M")
				this.getData.day = day
				this.getDaiLidata.day = day
				return day
			},
			goToDetail(itemObj) {
				uni.navigateTo({
					url: `/pages/shopManagement/sonPage/transactionDetailsPage?XFID=${itemObj.XFID}&Sort=${itemObj.Sort}&XFJE=${itemObj.XFJE}&UserID=${itemObj.UserID}&userName=${itemObj.UserName}&yyyPhone=${itemObj.Name}`
				})
				return
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			getCurryInfo(showFlag = true) {
				let url = ''
				let data = {}
				data = this.getData
				url = this.$store.state.storexxjeUrl
				return this.$Request.get(url, data, showFlag).then(res => {
					if (res.IsSuccess) {
						this.$refs.loading.hidden()
						this.infoObj = res
						if (this.getData.page === 1) {
							this.infoList = res.Data
							if (this.infoList.length === 0) {
								this.$api.msg('暂无数据', 2000)
							}
						} else {
							if (res.Data.length === 0) {
								this.$api.msg('已经到底啦', 1500)
							} else {
								this.infoList = [...this.infoList, ...res.Data]
							}
						}
						return this.billType
					} else {
						this.$refs.loading.hidden()
					}
				})
			},
			back() {
				uni.navigateBack()
			},
			onConfirm(e) { //选择时间
				var time = e.checkArr
				time = `${time[0]}-${time[1]}`
				console.log(time)
				this.getData.day = time
				this.getData.page = 1
				this.getCurryInfo()
			},
			toggleTab(index) {
				// this.$refs.yearMonth.show();
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.getData.page = 1
			this.getCurryInfo().then(res => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //上拉加载
			this.getData.page += 1
			this.getCurryInfo()
		},
		components: {
			wPicker
		},
		computed: {}
	}
</script>

<style scoped>
	.bill_details {
		min-height: 100vh;
		background: #F0F0F0;
	}

	.bill_details {
		background-image: url('https://img.huaxuapp.com/BG.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-size: 100vh 382upx;
	}

	.bg_title {
		width: 690upx;
		height: 276upx;
		background-image: url('https://img.huaxuapp.com/zhangdanPNG.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
		top: 20upx;
	}

	.border_bottom {
		position: relative;
		border-bottom: 2upx solid #DDDDDD;
	}

	.bill_contetn {
		margin-top: 20upx;
	}

	.yyyName {
		width: 60upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
