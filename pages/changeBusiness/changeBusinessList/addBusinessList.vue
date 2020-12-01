<template>
	<view>
		<view style="border-bottom:  0.6px solid #E4E4E4;">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">切换店铺</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">切换店铺</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		<view class="bg-white ">
		
			<view class=" flex align-center justify-start padding-tb-sm" style="border-bottom: 0.2px solid  #e4e4e4;" :class="activeIndex === index ?'active':''" @touchstart="doTouchstart(index)" @touchend="doTouchend(index)" @tap="goToDetail(item)" v-for="(item,index) of infoList" :key="index">
				<image :src="item.LogoPic"  @error="imgErr(index)" class="logo margin-left">  </image>
				<text class="margin-left" style="font-size: 30upx;line-height: 1em;">
					{{item.StoreName}}
					<text class="cu-tag sm round bg-red margin-left-xs" v-if="item.StoreSort">电商</text>
				</text>
			</view>
			<view class=" flex align-center justify-start padding-tb-sm" :class="activeIndex === -1?'active':''"  @tap="addShop" @touchstart="doTouchstart(-1)" @touchend="doTouchend(-1)">
				<view >
					<image src="https://img.huaxuapp.com/tianjiadianpu_03.png" class="logo margin-left">  </image>
				</view>
				
				<text class="margin-left" style="font-size: 30upx;line-height: 1em;">
					添加店铺
				</text>
			</view>
		</view>
		<modal :showModal="showModal" @hidden="hidden" @success="hidden" :Content="Content" :Title="Title"></modal>
	</view>
</template>

<script>
	import modal from '@/components/modal.vue'
	export default {
		components:{
			modal
		},
		data() {
			return {
				getData: {
					page: 1,
					pagesize: 10,
					userid: this.$store.state.userInfo.ID
				}, //请求数据
				infoList: [],
				showModal: false,
				Content: '',
				Title: '',
				activeIndex:-3
			}
		},
		onLoad() {
			this.getInfoList()
			
		},
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
		},
		methods:{
		imgErr(index){
			this.infoList[index].LogoPic =  'https://img.huaxuapp.com/FgbvKJECxYFSktotFfozfjFD2wvr'
		},
		doTouchstart(index) {
			this.activeIndex = index;
		},
		doTouchend(index) {
			this.activeIndex = -3;
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
					this.$api.msg('取消添加店铺', 2000)
				}
			},
			goToDetail(item){
					if(item.IsCheck){
						uni.navigateTo({
							url:`/pages/shopManagement/shopManagmentPage?StoreID=${item.StoreID}&IsLock=${item.IsLock}&isShopowner=true`
						})
					}else {
						this.$api.msg('您申请的店铺暂时还未通过，请稍等',2000)
					}
					return 
			},
			addShop() {
				// this.showModal = true
				uni.navigateTo({
					url: '/pages/changeBusiness/changeBusinessPage'
				})
				return
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
			},
			getInfoList() {
				return this.$Request.get(this.$store.state.myStoreListUrl, this.getData).then(res => {
					if (res.IsSuccess) {
						if (this.getData.page === 1) {
							this.infoList = res.Data
						} else {
							this.infoList = [...this.infoList, ...res.Data]
						}
						if (res.Data.length != 0) {
							for (let value of res.Data) {
								if (!value.IsLock) {
									if (value.IsCheck) {
										this.$api.refreshUserInfo(this.$store.state.userInfo.ID, this)
										break
									}
								}
							}
						}
			
						return this.infoList
					}
				})
			}
		}
	}
</script>


<style>
	page{
		background: #F2F2F2;
	}
	
</style>
<style>
	
	.logo{
		width: 60upx;
		height: 60upx;
		border-radius: 10upx;
	}
	
	.active {
		transition: all .8s ;
		background: rgba(118, 118, 118, 0.2);
	}
	
</style>
