<template>
	<view>
		<view v-if="!showLoading">
			<load-ing></load-ing>
		</view>
		
		<view v-if="showLoading">
			
			<view>
				<cu-custom bgColor="bg-creams" style="color: #ffffff;" backColor="bg-creams" :isBack="true">
					<block slot="content">客户管理</text></block>
				</cu-custom>
			</view>
			
			
			<view class="padding-bottom-sm flex justify-between padding-top bg-creams" style="padding-top:50upx;padding-bottom: 0upx;">
				<view class="flex flex-direction align-center item">
					<text class="golden text-xxl" style="color: #ffffff;">{{infoObj.TotalPeople}}</text>
					<text class="text-gray margin-top-xs" style="font-size: 26upx;color: #ffffff;">店铺客户</text>
				</view>
				<view class="flex flex-direction align-center item">
					<text class="golden text-xxl" style="color: #ffffff;" >{{ infoObj.XFCount }}</text>
					<text class="text-gray margin-top-xs" style="font-size: 26upx;color: #ffffff;">消费客户</text>
				</view>
				<view class="flex flex-direction align-center item">
					<text class="golden text-xxl" style="color: #ffffff;" >{{ infoObj.ZhiTuicount }}</text>
					<text class="text-gray margin-top-xs" style="font-size: 26upx;color: #ffffff;">直推客户</text>
				</view>
			</view>
			
			<view class="margin-lr bg-white radius" style="margin-top: -150upx;">
				<view class="flex padding padding-top-xl  align-center justify-between">
					<text class="text-lg text-bold margin-left-xs" style="color: #555;">消费明细</text>
					<view class="text-gray" style="position: relative; z-index: 200;">
						<text @tap.stop="togglePanel(false)" style="background: #f8f8f8; padding: 10upx 20upx;border-radius: 8upx;width: 194upx;color: #666;">
							{{ tabList[index].text }}
							<text class="hxIcon-xiala margin-left-xs income-way-btn" :class="showPanel?'totop':'tobottom'" style="color: #666;display: inline-block; "></text>
							<text :class="showPanel? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'" style="font-size: 36upx;" @tap.stop="togglePanel(false)"></text>
						</text>
						
						<view class="select-panel" :class="showPanel ? 'select-panel-active' : ''">
							<text v-for="(item, index) in tabList" :key="index" class="select-item" style="color: #666;" @tap.stop="selectedSort(index)">
								{{ item.text }}
							</text>
							
						</view>
						
						
					</view>
					<view class="panel-cover" v-if="showPanel" @tap="togglePanel(false)"></view>
				</view>
				<view class="action-bar flex justify-center">
					<text class="action-item" @tap="changeSortKey(index)"
					v-for="(item, index) in sortKey" :key="index" :class="sortKeySelected === index ? 'action-item-action' : ''">
						{{ item.text }}
					</text>
				</view>
				<view class="info-list padding-left-xs margin-top">
					<view class="info-item flex padding-left  " style="padding-bottom: 40upx;" v-for="(item, index) in infoList" :key="index" @tap="goToDetail(item)">
						<view class="img margin-right" :style="{backgroundImage: `url(${item.FaceURL})`}"></view>
						<view class="flex flex-sub  align-center info-border" style="padding-bottom: 40upx;">
							<view class="detail flex flex-direction flex-sub justify-between" style="height: 80upx;">
								<text class="text-bold text-lg" style="color: #555555;">{{ item.Nick }}</text>
								<text class="gray-dark" style="font-size: 24upx;">{{ item.Phone }}</text>
							</view>
							<view class="info-btn">
								查看详情
							</view>
							<view style="width: 30upx;">
								
							</view>
						</view>
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
				showLoading:false,
				sortKey: [
					{
						text: '消费时间',
						type: 1
					},
					{
						text: '消费次数',
						type: 2
					},
					{
						text: '消费金额',
						type: 3
					}
				],
				sortKeySelected: 0,
				showPanel: false,
				infoObj: {},
				getData: {
					StoreID: '',
					page: 1,
					pagesize: 10,
					sort: 1,
					type:1
				},
				index: 0,
				infoList: [],
				tabList: [
					// {
					// 	text: '全部会员',
					// 	icon: 'hxIcon-hongbao',
					// 	sort:0
						
					// },
					{
						text: '消费客户',
						icon: 'hxIcon-yue1',
						sort:1
					},{
						text: '直推客户',
						icon: 'hxIcon-jiantou',
						sort:2
					}
				],
				zt:0,
				xf:0,
				qb:0,
				HasSmsCount:0
			}
		},
		onLoad(route) {
			this.getData.StoreID = route.StoreID
			this.getCurryInfo()
		},
		methods: {
			qbhy(){
				// uni.showToast({
				// 	icon:'none',
				//     title: '功能正在开发，敬请期待',
				//     duration: 3000
				// });
				if(this.qb > 0){
					if(this.qb > this.HasSmsCount){
						uni.showModal({
							content: '您的短信余量不足，请前去充值！',
							showCancel:true,
							confirmText: '去充值',
							success: (res) => {
								if (res.confirm) {
									console.log('点击确定');
									uni.navigateTo({
										url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
									})
								}
							}
						})
					} else {
						uni.navigateTo({
							url:'/pages/shopManagement/sonPage/msgAllSend/qbDuanxin?StoreID=' + this.StoreID
						})
					}
				} else {
					uni.showToast({
						icon:'none',
					    title: '您暂无客户，无法发送短信',
					    duration: 3000
					});
				}
			},
			xfhy(){
				// uni.showToast({
				// 	icon:'none',
				//     title: '功能正在开发，敬请期待',
				//     duration: 3000
				// });
				if(this.xf > 0){
					if(this.xf > this.HasSmsCount){
						uni.showModal({
							content: '您的短信余量不足，请前去充值！',
							showCancel:true,
							confirmText: '去充值',
							success: (res) => {
								if (res.confirm) {
									console.log('点击确定');
									uni.navigateTo({
										url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
									})
								}
							}
						})
					} else {
						uni.navigateTo({
							url:'/pages/shopManagement/sonPage/msgAllSend/xfDuanxin?StoreID=' + this.StoreID
						})
					}
				} else {
					uni.showToast({
						icon:'none',
					    title: '您暂无消费客户，无法发送短信',
					    duration: 3000
					});
				}
				
			},
			zthy(){
				// uni.showToast({
				// 	icon:'none',
				//     title: '功能正在开发，敬请期待',
				//     duration: 3000
				// });
				if(this.zt > 0){
					if(this.zt > this.HasSmsCount){
						uni.showModal({
							content: '您的短信余量不足，请前去充值！',
							showCancel:true,
							confirmText: '去充值',
							success: (res) => {
								if (res.confirm) {
									console.log('点击确定');
									uni.navigateTo({
										url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
									})
								}
							}
						})
					} else {
						uni.navigateTo({
							url:'/pages/shopManagement/sonPage/msgAllSend/ztDuanxin?StoreID=' + this.StoreID
						})
					}
				} else {
					uni.showToast({
						icon:'none',
					    title: '您暂无直推客户，无法发送短信',
					    duration: 3000
					});
				}
				
			},
			getCurryInfo() {
				return this.$Request.get(this.$store.state.mymemberUrl, this.getData,false).then(res => {
					this.showLoading=true
					if (res.IsSuccess) {
						this.infoObj = res
						this.qb = res.TotalPeople
						this.xf = res.XFCount
						this.zt = res.ZhiTuicount
						this.HasSmsCount = res.HasSmsCount
						console.log(res);
						// this.tabList.forEach(it => {
						// 	if (it.text === res.Sname) {
						// 		it.value = res.Number
						// 	}
						// })
						res.Data.forEach(it => {
							it.type = this.infoObj.Sname
						})
						if (this.getData.page === 1) {
							this.infoList = res.Data
							if(this.infoList.length===0){
								//this.$api.msg('暂无数据',2000)
							}
						} else {
							if(res.Data.length===0){
								//this.$api.msg('已经到底啦',1500)
							}else{
								this.infoList = [...this.infoList, ...res.Data]
							}
						}
					}
				})
			},
			chosse(item) {
				this.getData.type = 0
				this.titleFlag = 0
				let {index,sort}  = item
				console.log(index,sort)
				this.index = index
				this.getData.sort = sort
				this.getData.page = 1
				this.getCurryInfo()
			},
			time(timeDate){
				var date = new Date((timeDate.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
			},
			changeName(name){
				let nick = name*1
				if(nick===nick){
					if(name.length!=11){
						return name
					}else{
						return this.changePhone(name)
					}
				}else{
					return name
				}
			},
			changePhone(phone){
				//return phone.substr(0, 3) + '****' + phone.substr(phone.length - 4);
				return phone
			},
			goToDetail(item){
				console.log(item)
				let ID = item.ID
				let Nick = item.Nick
				let FaceURL = item.FaceURL
				let Phone = item.Phone
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/myMemberDetail/myMemberDetails?ID=${ID}&Nick=${Nick}&FaceURL=${FaceURL}&Phone=${Phone}&StoreID=${this.getData.StoreID}`
				})
			},
			scrolltolower(e){
				this.getData.page += 1
				this.getCurryInfo()
			},
			chooseTitle(item){
				this.titleFlag = item.typeSort
				this.getData.type = item.typeSort
				this.getData.page = 1
				this.getCurryInfo()
			},
			changeSortKey(index) {
				this.sortKeySelected = index
				this.getData.type = this.sortKey[index].type
				
				this.getData.page = 1
				this.getCurryInfo()
			},
			togglePanel (status) {
				this.showPanel = ! this.showPanel
				if (status) {
					this.showPanel = status
				}
			},
			selectedSort(index) {
				this.index = index
				this.showPanel = false
				this.getData.sort = this.tabList[index].sort
				
				this.getData.page = 1
				this.getCurryInfo()
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
	}
</script>

<style>
	page {
		background:#F8F8F8;
	}
</style>

<style scoped lang="scss">
	
	$gray: #666;
	$gray-lighten: #e4e4e4;
	$gray-dark: #999;
	$golden: #ffffff;
	
	.golden {
		color: $golden;
	}
	
	.text-gary {
		color: $gray;
	}
	
	.gray-dark{
		color:$gray-dark;
	}
	
	.text-gray-lighten {
		color: $gray-lighten;
	}
	
	.text-xxl {
		font-size: 48upx;
	}
	
	.income-way-btn {
		transition: all .3s ease-in-out;
	}
	
	.totop {
		transform: rotate(180deg);
	}
	
	.tobottom {
		transform: rotate(0deg);
	}
	
	
	.item {
		flex: 1;
		white-space: nowrap;
		height: 300upx;
		margin-top: 40upx;
	}
	
	.action-bar {
		padding: 30upx;
	}
	
	.action-item{
		border: 1px solid $gray-lighten;
		padding: 10upx 20upx;
		color: $gray-dark;
		
		&:first-child {
			padding-left: 40upx;
			border-radius: 100upx 0 0 100upx;
		}
		
		&:nth-child(2) {
			border-left: none;
			border-right: none;
		}
		
		&:last-child {
			padding-right: 40upx;
			border-radius: 0 100upx 100upx 0;
		}
	}
	
	.action-item-action {
		background: #fe5479;
		color: #ffffff;
	}
	
	.info-item {
		.img {
			width: 80upx;
			height: 80upx;
			border-radius: 8upx;
			background-size: cover;
			background-position: center;
		}
		
		&:last-child {
			.info-border {
				border: none;
			}
		}
	}
	
	.info-btn {
		padding: 10upx 20upx;
		background: #ffe6e8;
		border-radius: 100upx;
		color: #fe5479;
		font-size: .8em;
	}
	
	.info-border {
		border-bottom: 0.1px solid #e4e4e4;
	}
	
	.panel-cover {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 6;
	}
	
	.select-panel {
		position: absolute;
		left: 0;
		right: 0;
		height: 0;
		display: flex;
		flex-direction: column;
		background: #F8F8F8;
		overflow: hidden;
		z-index: 9;
		transition: all .3s ease-in-out;
	}
	
	.select-panel-active {
		height: 200upx;
	}
	
	.select-item {
		text-align: center;
		padding: 30upx;
		white-space: nowrap;
	}
	
	.animate{animation:fadeIn 0.8s 1;}
	
	.animate2{animation:slideInRight   0.5s 1;}
	
	.animate3{animation:  slideInLeft 0.5s 1 }
</style>