<template>
	<view>
		<view class="bill_details">
			<load-ing ref="loading"></load-ing>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-white" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">{{billType==='daili'?'提现':'账单'}}明细</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">{{billType==='daili'?'提现':'账单'}}明细</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<view>
			<view class="flex  align-center justify-between  "  style="background: #ffffff;padding: 30upx 30upx; border-top: 1upx solid #dfdfdf;" :class="billType==='daili'?'padding-lr':''">
				<view style="width: 280upx;">
					<u-subsection :list="list" mode="subsection" :current="curNow" @change="sectionChange"  button-color="#e8b87f" 
					active-color="#e8b87f"  inactive-color="#e8b87f" style="color: #e8b87f;"></u-subsection>
				</view>
				
				<view style="width:280upx;height:56upx;border-radius: 50upx;" class="flex justify-center align-center padding-sm">
					<text class="cuIcon-back" style="margin-right: 24upx;margin-top: 2upx;"></text>
					<text class="" @tap="toggleTab">{{days}}</text>
					<text class="cuIcon-right" style="margin-left: 24upx;margin-top: 2upx;"></text>
				</view>
			
				<view style="width:150upx;height:56upx;border-radius: 50upx;" class="flex justify-center align-center padding-sm"
				 v-if="billType==='daili'?false:yyyState===2?true:false">
					<view class="text-df">
						<picker @change="classPickerChange" :value="classIndex" range-key="info" :range="yYyList" mode="selector">
							<view class="flex flex-wrap ">
								<view class="flex justify-between">
									<view>{{yYyList[classIndex].Nick}}</view>
									<text class="cuIcon-triangledownfill"></text>
								</view>
							</view>
						</picker>
					</view>
				</view>
			</view>
				
			<view style="background-color: #f2f2f2;height: 30upx;">
				
			</view>
			
			<view style="width:100%;padding: 0 30upx;">
				<view class="flex  align-center justify-between" style="background-color: #e8b87f;padding: 30upx 30upx;border-radius: 18upx;margin-top: 30upx;">
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center">
							<text class="text-gray text-df" style="color: #f8e1c8;">{{billType==='daili'?'当月提现总额(元)':'本月营业总额'}}</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff">{{billType==='daili'?infoObj.agentperson:infoObj.jryye}}</text>
					</view>
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center">
							<text class="text-gray text-df" style="color: #f8e1c8;">收款笔数</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff">{{billType==='daili'?infoObj.agentperson:infoObj.jryye}}</text>
					</view>
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center">
							<text class="text-gray text-df" style="color: #f8e1c8;">同比</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff">{{billType==='daili'?infoObj.agentperson:infoObj.jryye}}</text>
					</view>
				</view>
			</view>

			<u-time-line style="margin: 30upx 30upx;">
					<u-time-line-item nodeTop="0">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<template v-slot:node>
							<view class="u-node" style="color: #e8b87f;background-color: #FFFFFF;">
								<!-- 此处为uView的icon组件 -->
								<view class="hxIcon-shijian1" :size="28"></view>
							</view>
						</template>
						<template v-slot:content>
							<view style="height: 40upx;background-color: #FFFFFF">
								
							</view>
						</template>
					</u-time-line-item>
					
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
								<view class="u-order-time">2019-12-06 22:30</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
								<view class="u-order-time">2019-12-06 22:30</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
								<view class="u-order-time">2019-12-06 22:30</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			
			<w-picker :mode="billTimeData.mode" :defaultVal="billTimeData.value" @confirm="onConfirm" themeColor="#f00" :ref="billTimeData.picker"
			 :current="true">
			</w-picker>
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
				list: [
					{
						name: '日报'
					}, 
					{
						name: '月报'
					}
				],
				curNow: 0,
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
					Nick: '筛选',
					ID: 0,
					FaceURL: 'https://img.huaxuapp.com/pig.png',
					shouyingyuan: {
						UserID: 0
					},
					Phone: 'xxxxxx'
				}],
				classIndex: 0,
				yearMonthPath: `/pages/shopManagement/sonPage/yearMonthBillDetails`,
			}
		},
		onShow() {
			this.curNow = 0
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
			sectionChange(index) {
				this.curNow = index;
				// if(index == 1){
				// 	uni.navigateTo({
				// 		url: this.yearMonthPath
				// 	})
				// }
			},
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
	
	.u-node {
			width: 44rpx;
			height: 44rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #d0d0d0;
		}
		
		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}
		
		.u-order-desc {
			color: rgb(150, 150, 150);
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}
		
		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
		}
</style>
