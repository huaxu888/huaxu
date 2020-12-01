<template>
	<view style="padding-bottom: 300upx;">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">过期优惠券</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content" class="text-black">过期优惠券</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view>
			<!-- <view class="flex justify-center" style="width: 100%" v-if="showFlag">
				<view class="bg_conent" style="margin-top:400upx">		
				</view>
			</view> -->
			<view style="text-align: center;height: 400upx;margin-top: 180upx;"  v-if="showFlag">
				<image src="https://img.huaxuapp.com/5cad402bbc803_03.png" mode="aspectFill" style="width: 200upx;height: 200upx;"></image>
				<view style="margin-top: 20upx;">
					<text style="font-size: 28upx;color: #333333;">暂时没有相关优惠券</text>
				</view>
			</view>
			
			<view v-if="!showFlag">
				<view v-for="(item,i) of couponList" :key="i" class="padding-lr margin-tb">
					<item-cardgq :itemObj = "item" type="noShop"></item-cardgq>
				</view>
			</view>
		</view>
		
		<view style="position: fixed;bottom: 0;background-color: #ffffff;width: 100%;z-index: 3;">
			<view style="display: flex;height:160upx;line-height:160upx;text-align: center;justify-content:space-around;
				" @tap="goCou">
				<text style="font-size: 31upx;font-weight: 600;">抢购更多花蓄好券
					<text class="hxIcon-rightArrow" style="font-size: 28upx;margin-left: 4upx;color: #999999;"></text>
				</text>
				<view style="position: absolute;left: 508upx;top: 40upx; width: 110upx;height: 30upx;background-color: #fd542c;color: #ffffff;border-radius: 30upx 30upx 30upx 0;
					text-align: center;line-height: 29upx;">
					<text style="font-size: 20upx;">低至1折起</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import itemCardgq from './components/couponCardgq'
	import couponCardused from './components/couponCardused'
	
	export default{
		data(){
			return {
				isList:true,
				couponList:[],
				getData:{
					page:1,
					pagesize:10,
					userID:this.$store.state.userInfo.ID
				},
				showFlag:true,
				showModal: false,
				list: [{
					cate_name: `未使用(${this.weiShu})`
				}, {
					cate_name: `已使用(${this.yiShu})`
				}],
				current: 0,
				weiShu: 0,
				yiShu: 0
			}
		},
		onShow(){
			this.getData.page = 1
			this.showFlag = false
			this.getCurryInfo()
		},
		onLoad(option) {
			if(option.has == 0) {
				this.showModal = true
			}
		},
		methods:{
			goCou() {
				uni.switchTab({
					url:'/pages/index/qiangQuan'
				})
			},
			ckLast() {
				uni.navigateTo({
					url:'/pages/person/myCoupon/couponCardlast'
				})
			},
			tabsChange(a) {
				this.current = a;
			},
			getCurryInfo() {
				// return this.$Request.get(this.$store.state.clipCouponsListUrl,this.getData).then(res=>{
					
				// 	if(res.IsSuccess){
				// 		if(this.getData.page===1){
				// 			if(res.Data.length===0){
				// 				this.showFlag=true
				// 				return 
				// 			}
				// 			this.couponList=res.Data
				// 			this.showFlag=false
				// 		}else{
				// 			this.showFlag=false
				// 			if(res.Data.length===0){
				// 				this.$api.msg('已经到底啦',1500)
				// 			}else{
				// 				this.couponList=[...this.couponList,...res.Data]
				// 			}
				// 		}
						
				// 	}
				// })
				return this.$http.myCoulist(this.$store.state.userInfo.ID,3,this.getData.page,this.getData.pagesize).then(res => {
					console.log(res);
					if(res.IsSuccess){
						if(this.getData.page===1){
							if(res.Data.length===0){
								this.showFlag=true
								return 
							}
							this.couponList=res.Data
							this.showFlag=false
						}else{
							this.showFlag=false
							if(res.Data.length===0){
								this.$api.msg('已经到底啦',1500)
							}else{
								this.couponList=[...this.couponList,...res.Data]
							}
						}
					} else {
						this.showFlag = true
						this.couponList=[]
					}
				})
			},
			hideModal: function () {
				this.showModal = false
			}
		},
		onPullDownRefresh(){//下拉时刷新
			this.getData.page=1
			this.getCurryInfo().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {//上拉加载
			this.getData.page+=1
			this.getCurryInfo()
		},
		components:{
			itemCardgq,
		}
	}
</script>

<style scoped>
	page{
		background: #f8f8f8;
	}
	.bg_conent{
		background-image:url('https://img.huaxuapp.com/暂无优惠券_03.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width:50%;
		height:400upx;
	}
</style>
