<template>
	<view class="changeBusiness_List_page">
	
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">店铺管理</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">店铺管理</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
	
		
		<view class="margin" style="margin-top: 50upx;">
			<view class="flex margin-top-xl align-center justify-between">
				<view class="flex align-center justify-center" >
					<view style="width: 115upx;height: 115upx;border-radius: 50%;">
						<image style="width: 115upx;height: 115upx;border-radius: 50%;" :src="userInfo.FaceURL"></image>
					</view>
					<view class="margin-left" style="width: 320upx;">
						<view style="font-size: 30upx;color: #333333;" class="text-bold text-cut">{{userInfo.Nick}}</view>
						<view class="margin-top-xs" style="font-size: 24upx;color: #666666;">
							<text v-if="infoList.length>0">Hi, 欢迎来到您的店铺!</text>
							<text v-if="infoList.length==0">您还不是商家，请添加商铺 </text> 
						
							</view>
					</view>
				</view>
				<view class=" flex align-center justify-center" style="border: 1px solid #fe5479;  border-radius: 1000upx;padding: 12upx;padding-left: 0; padding-right: 0; width: 180upx;" @tap="switchAndAdd">
					<view v-if="infoList.length>0">
						<text style="line-height: 1em;font-size: 28upx;color: #fe5479;">切换</text>
						<text class="margin-lr-xs" style="font-size: 28upx;color: #fe5479;">/</text>
					</view>
					<text style="line-height: 1em;font-size: 28upx;color: #fe5479;">添加</text>
				</view>
			</view>
		</view>

		<view style="margin-top: 60upx;margin-left: 30upx;"  v-if="infoList.length>0">
			<view class="items flex flex-direction" style="height: 460upx; width: 442upx;margin-top: 40upx;" v-for="(item,i) of infoList" :key="i" @tap="goToDetail(item)">
				<view class="flex align-center justify-start">
					<text class="hxIcon-dianpu1 " style="font-size: 45upx; color: #fe5479;"></text>
					<text class="text-bold" style="margin-left: 15upx;color: #333333;font-size: 30upx;">
						{{item.StoreName}}
						<text class="cu-tag bg-red round sm margin-left-xs" v-if="item.StoreSort == 1">电商</text>
					</text>
					<text class="hxIcon-fanhui" style="font-size: 24upx;margin-left: 15upx; transform: rotate(180deg);"> </text>
				</view>
				
				<view class="margin-top-sm" style="border: 1px solid #e5eced; border-radius: 10upx;width: 690upx;">
					<!-- <image :src="item.GGpics" mode="aspectFit" class="StorePic"></image> -->
					<view class="StorePic" style="position: relative;" :style="{background : item.LogoPic ? 'url('+item.LogoPic+') no-repeat' :'url(https://img.huaxuapp.com/zwtp.png) no-repeat',backgroundSize:'100% 100%'}" > 
						<view class="flex align-center justify-center"  v-if="item.IsLock" style="position: absolute;bottom: 15upx; right: 15upx;background: rgba(0,0,0,0.4); width: 150upx; height: 45upx;border-radius: 1000upx;">
							<text class="hxIcon-suoding text-white" style="font-size: 24upx;" ></text> <text class="text-white margin-left-xs" style="font-size: 24upx;">已锁定</text>
						</view>
					</view>
					
					<view class=" flex align-start  justify-start" style="height: 102upx; width:690upx;white-space: normal;padding: 16upx;">
						<view class="flex align-start justify-center" >
							<text class="hxIcon-dingwei1" style="color: #677785;margin-top: 4upx;"></text>
						</view>
						<view class="flex align-center" style="margin-left: 8upx;margin-top: 4upx; margin-bottom: 8upx; margin-right: 10upx;">
							<text style="color: #677785; line-height: 33upx; white-space: normal;font-size: 24upx;-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">{{item.StoreAddress ? item.StoreAddress : '暂无地址'}}</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<view v-if="infoList.length===0"  class="noShops flex align-center justify-center">
			<view class="tipsImg">
				
			</view>
			
		</view>

		<!-- <view class="flex flex-direction padding">
			<view v-for="(item,i) of infoList" :key="i" class="margin-tb-xs">
				<list-item :itemObj="item"></list-item>
			</view>
			<view class="flex flex-direction align-center " style="margin-top:60upx" @tap="addShop">
				<text class="hxIcon-dianputianjia text-red" style="font-size: 120upx;"></text>
				<text>请添加商铺</text>
			</view>
		</view>
		 -->
		<modal :showModal="showModal" @hidden="hidden" @success="success" :Content="Content" :Title="Title"></modal>
	</view>
</template>

<script>
	import listItem from './components/changeBusListItem'
	import {
		getPageAllInfo as mixins
	} from '../../../mixins/qymMixins.js'
	import modal from '@/components/modal.vue'
	export default {
		mixins: [mixins],
		data() { 
			return {
				infoUrl: this.$store.state.myStoreListUrl, //请求连接
				getData: {
					page: 1,
					pagesize: 10, 
					userid: this.$store.state.userInfo.ID
				}, //请求数据
				infoList: [],
				showModal: false,
				Content: '',
				Title: '',
				userInfo:''
			}
		},
		onLoad() {
			this.getInfoList()
		},
		onShow() {
			if(this.$store.state.userInfo){
				this.userInfo = this.$store.state.userInfo;
			}
			this.getInfoList();
			
		},
		onPullDownRefresh() { //下拉时刷新
			// this.getData.classId=0
			// this.getData.rateId=0
			// this.getData.reserveId=0
			this.getData.page = 1
			this.getInfoList().then(res => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //上拉加载
			this.getData.page += 1
			this.getInfoList()
		},
		components: {
			listItem,
			modal
		},
		methods: {
			goToDetail(item){
					if(item.IsCheck){
						uni.navigateTo({
							url:`/pages/shopManagement/shopManagmentPage?StoreID=${item.StoreID}&IsLock=${item.IsLock}&isShopowner=true`
						})
						// uni.navigateTo({
						// 	url:`/pages/shopManagement/beifen?StoreID=${item.StoreID}&IsLock=${item.IsLock}&isShopowner=true`
						// })
					}else {
						this.$api.msg('您申请的店铺暂时还未通过，请稍等',2000)
					}
					return 
			},
			switchAndAdd(){
				uni.navigateTo({
					url: '/pages/changeBusiness/changeBusinessList/addBusinessList'
				})
			},
			hidden(res) {
				this.showModal = false
				if (res) {
					if (res) {
						uni.navigateTo({
							url: '/pages/changeBusiness/changeBusinessPage'
						})
					}
				} else {
					this.$api.msg('取消转商家', 2000)
				}
			},
			getInfoList() {
				return this.$Request.get(this.infoUrl, this.getData).then(res => {
					if (res.IsSuccess) {
						if (this.getData.page === 1) {
							this.infoList = res.Data
						} else {
							this.infoList = [...this.infoList, ...res.Data]
						}
						if (res.Data.length != 0) {
							for (let value of res.Data) {
								console.log(value)
								if (!value.IsLock) {
									if (value.IsCheck) {
										this.$api.refreshUserInfo(this.$store.state.userInfo.ID, this)
										break
									}
								}
							}
						}
						console.log(this.infoList);
						return this.infoList
					}
				})
			},
			addShop() {
				this.showModal = true
				this.$Request.get(this.$store.state.storeagreeUrl, {}).then(res => {
					if (Object.prototype.toString.call(res) === "[object Null]") {
						this.showModal = false
						uni.navigateTo({
							url: '/pages/changeBusiness/changeBusinessPage'
						})
					} else {
						this.Content = res.Content
						this.Title = res.Title
					}
				})
			}
		},
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}
</style>

<style>
	
	
	.noShops{
		height:558upx;
	}
	
	 .noShops .tipsImg{
		
		width: 258upx;
		height:258upx;
		background: url('https://img.huaxuapp.com/zwsj_03.png') no-repeat;
		background-size: cover;
	}
	
	
	.changeBusiness_List_page {
		min-height: 100vh;
		background-color: #FFFFFF;
	}
	
	.StorePic{
		height:300upx;
		width: 690upx;
		border-top-right-radius: 10upx; 
		border-top-left-radius: 10upx;
	}


	.grace-scroll-x {
		width: 100%;
		display: flex;
		white-space: nowrap;
		height: auto;
	}

	.grace-scroll-x .items {
		height: 228upx;
		width: 344upx;
		vertical-align: top;
		margin: 0 20upx;
		display: inline-flex;
	}
</style>
