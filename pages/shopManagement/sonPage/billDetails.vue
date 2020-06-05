<template>
	<view>
		<view class="bill_details">
			<load-ing ref="loading"></load-ing>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">{{billType==='daili'?'提现':'账单'}}明细</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">{{billType==='daili'?'提现':'账单'}}明细</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		<view class=" flex justify-center align-center margin-top " style="width:100%;position: absolute;top: 60upx;">
			<view class="bg_title flex flex-direction align-center justify-center">
				<view class="flex align-center">
					<text class="hxIcon-yue1 margin-right-sm" style="color:rgb(254,155,5);font-size: 50upx;"></text>
					<text class="text-gray text-df">{{billType==='daili'?'当月提现总额(元)':'今日账单总额（元）'}}</text>
				</view>
				<text class="padding-top-sm" style="font-size:60upx">{{billType==='daili'?infoObj.agentperson:infoObj.jryye}}</text>
			</view>
		</view>
		<!--style="margin-top:80upx"-->

		<view class=" " >
			<view class="flex  align-center justify-between  "  style="background: #F0F0F0;padding-top: 30upx;padding-bottom: 30upx;" :class="billType==='daili'?'padding-lr':''">
				<view style="width:240upx;height:56upx;border-radius: 50upx;" class="bg-white flex justify-center align-center padding-sm"
				 @tap="toggleTab">
					<text class="margin-right-xs">{{days}}</text>
					<text class="cuIcon-triangledownfill" style="font-size: 40upx;"></text>
				</view>


				<view style="width:220upx;height:56upx;border-radius: 50upx;" class="bg-white flex justify-center align-center padding-sm"
				 v-if="billType==='daili'?false:yyyState===2?true:false">
					<view class="text-df">
						<!--分类的筛选-->
						<picker @change="classPickerChange" :value="classIndex" range-key="info" :range="yYyList" mode="selector">
							<view class="flex flex-wrap ">
								<view class="flex justify-between">
									<!-- <view>营业员:</view> -->
									<!-- <view class="yyyName">{{yYyList[classIndex].Nick}}</view> -->
									<view>{{yYyList[classIndex].Nick}}</view>
									<text class="cuIcon-triangledownfill"></text>
								</view>
							</view>
						</picker>
					</view>
				</view>


				<view class="flex flex-direction align-end text-sm">
					<view style="width:220upx;height:56upx;border-radius: 50upx;" class="bg-white flex justify-center align-center padding-sm"
					 @tap="goToMonthDetail" v-if="billType==='daili'?false:true">
						查看当月收入
					</view>
					<!-- <text v-if="billType==='daili'?false:true">当月收入：{{infoObj.TotalOrder}} 笔</text> -->
					<text v-if="billType==='daili'?true:false">共计：{{billType==='daili'?infoObj.agentperson:''}} 元</text>
				</view>
			</view>

			<view class="bill_list padding-lr bg-white" style="min-height:780upx;">

				<view class="padding-tb-sm flex align-center justify-between border_bottom" @tap="goToDetail(item)" v-for="(item,i) of infoList"
				 :key="i">

					<view class="flex flex-direction align-start " style="width:25%">
						<text class="margin-bottom-xs text-cut" style="width: 100%;">{{billType==='daili'?`提现到账`:phoneMosaic(item.Phone)}}</text>
						<text class="text-sm ">{{beTime(item.AddDate)}}</text>
					</view>

					<view style="width:34%" class="flex flex-direction align-center">
						<text class="margin-bottom-xs" v-if="billType==='daili'?false:true">收款人:{{ item.Name }}</text>
						<text class="text-sm text-cut" v-if="billType==='daili'?false:true">{{showName(item)}}</text>
						<text v-if="billType==='daili'?true:false">实际到账:{{item.Score}}元</text>
					</view>


					<!-- <view style="width:33%" class="flex justify-center">
						<text class="margin-bottom-xs" v-if="billType==='daili'?false:true">{{item.Phone}}</text>
					</view> -->

					<view style="width:33%" class="flex justify-end ">
						<text v-if="billType==='daili'?false:true" class="text-bold" :class="item.Sort===2?'text-black':'text-red'">{{item.Sort===2?'+':'-'}}{{item.XFJE}}</text>
						<text v-if="billType==='daili'?true:true">{{item.TargetName}}</text>
					</view>

				</view>

			</view>
		</view>
		<w-picker :mode="billTimeData.mode" :defaultVal="billTimeData.value" @confirm="onConfirm" themeColor="#f00" :ref="billTimeData.picker"
		 :current="true">
		</w-picker>
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
					Nick: '全部',
					ID: 0,
					FaceURL: 'https://img.huaxuapp.com/pig.png',
					shouyingyuan: {
						UserID: 0
					},
					Phone: 'xxxxxx'
				}],
				classIndex: 0,
				yearMonthPath: `/pages/shopManagement/sonPage/yearMonthBillDetail`,
			}
		},
		onLoad(route) {
			console.log(this.yyyState);
			if (this.yyyState === 1) {
				this.getData.yyyid = this.$store.state.userInfo.ID
			}
			this.getTime();
			if ('billType' in route) {
				this.billType = route.billType
				this.state = route.state
				this.getCurryInfo(false)
			} else {
				console.log(this.billType);
				this.billTimeData.mode = 'date'
				this.getData.StoreID = route.StoreID
				this.yearMonthPath = `${this.yearMonthPath}?StoreID=${route.StoreID}`
				this.getYyY().then(res => {
					this.getCurryInfo(false)
				})
			}
		},
		methods: {
			showName(it) {
				let id = it.CZYID
				for (let val of this.yYyList) {
					let ID
					if ('ID' in val) {
						console.log(id, val)
						ID = val.ID
					} else {
						ID = val.UserID
					}
					if (id === ID) {
						return val.Name
					}
				}
			},
			classPickerChange(e) {
				console.log(3349)
				this.classIndex = e.detail.value
				let value = this.yYyList[this.classIndex]
				if ('ID' in value) {
					this.getData.yyyid = value.ID
				} else {
					this.getData.yyyid = value.UserID
				}
				console.log(3349)
				this.getData.page = 1
				this.getData.pagesize = 10
				this.getCurryInfo()
			},
			goToMonthDetail() {
				uni.navigateTo({
					url: this.yearMonthPath
				})
			},
			getYyY() {
				let data = {
					StoreID: this.getData.StoreID
				}
				return this.$Request.get(this.$store.state.getsyylistUrl, data, false).then(res => {
					console.log(res);
					if (res.IsSuccess) {
						this.yYyList = [...this.yYyList, ...res.Data]
						this.yYyList.forEach((it, i) => {
							let info = ''
							if (i === 0) {
								it.info = '全部'
							} else {
								it.info = `${it.Nick}(${it.Phone})`
							}
						})
						return this.yYyList
					}
				})
			},
			getTime() {
				let day = (new Date()).Format("yyyy-M")
				let day_ = (new Date()).Format("yyyy-M-d")
				console.log(day_)
				console.log(this.getDaiLidata)
				this.getData.day = day_
				this.getDaiLidata.day = day
			},
			goToDetail(itemObj) {
				if (this.billType === 'daili') {
					console.log('dosomeThing')
					return
				} else {
					console.log(itemObj)
					uni.navigateTo({
						url: `/pages/shopManagement/sonPage/transactionDetailsPage?XFID=${itemObj.XFID}&Sort=${itemObj.Sort}&XFJE=${itemObj.XFJE}&UserID=${itemObj.UserID}&userName=${itemObj.UserName}&yyyPhone=${itemObj.Name}`
					})
					return
				}
			},
			getCurryInfo(showFlag = true) {
				let url = ''
				let data = {}
				if (this.billType != 'daili') {
					data = this.getData
					url = this.$store.state.storexxjlUrl
				} else {
					console.log('代理112233445566')
					if (this.state === '2' || this.state === '3') { //2,3是个人提现代理
						url = this.$store.state.agentPoutDetail
					} else if (this.state === '4') { //4是区域代理
						url = this.$store.state.agentareaOutDetailUrl
					}
					data = this.getDaiLidata
				}
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
						//
					}
				})
			},
			back() {
				uni.navigateBack()
			},
			onConfirm(e) { //选择时间
				var time = e.checkArr
				if (this.billType === 'daili') {
					time = `${time[0]}-${time[1]}`
				} else {
					time = `${time[0]}-${time[1]}-${time[2]}`
				}
				console.log(time)
				if (this.billType === 'daili') {
					this.getDaiLidata.day = time
					this.getDaiLidata.page = 1
				} else {
					this.getData.day = time
					this.getData.page = 1
				}
				this.getCurryInfo()
			},
			toggleTab(index) {
				this.$refs.yearMonth.show();
			}
		},
		onPullDownRefresh() { //下拉时刷新
			if (this.billType === 'daili') {
				this.getDaiLidata.page = 1
			} else {
				this.getData.page = 1
			}
			this.getCurryInfo(false).then(res => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //上拉加载
			if (this.billType === 'daili') {
				this.getDaiLidata.page += 1
			} else {
				this.getData.page += 1
			}
			this.getCurryInfo()
		},
		components: {
			wPicker
		},
		computed: {
			days() {
				if (this.billType === 'daili') {
					return this.getDaiLidata.day
				} else {
					return this.getData.day
				}
			}
		}
	}
</script>

<style scoped>
	/* #ifdef MP-WEIXIN || MP-ALIPAY */
	/* .bill_details{
		background:#F0F0F0;
		min-height: 100vh;
	} */
	/* #endif */

	page {
		background: #FFFFFF;
	}

	.bill_details {
		background-image: url('https://img.huaxuapp.com/BG.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 382upx;
		position: relative;
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
