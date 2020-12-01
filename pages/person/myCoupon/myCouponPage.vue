<template>
	<view style="padding-bottom: 300upx;">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的优惠劵</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content" class="text-black">我的优惠劵</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="position: fixed;width: 100%;z-index: 2;padding-top: 32upx;padding-bottom: 28upx;background-color: #ffffff;display: flex;justify-content:space-around;">
			<!-- <u-tabs name="cate_name" :list="list" :is-scroll="false" :current="current" font-size="26" @change="tabsChange" inactive-color="#999999" active-color="#333333"></u-tabs> -->
			<view style="position: relative;" @tap="tabsChanges" :class="[current == 1 ? 'stas' : '']">
				未使用({{Nums}})
				<text style="margin-top: 22upx;" :class="[current == 0 ? 'sta' : '']"></text>
			</view>
			<view style="position: relative;" @tap="tabsChange" :class="[current == 0 ? 'stas' : '']">
				已使用({{NumsY}})
				<text style="margin-top: 22upx;":class="[current == 1 ? 'sta' : '']"></text>
			</view>
		</view>
		
		<view  style="margin-top:128upx">
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
				<view v-for="(item,i) of couponList" :key="i" class="padding-lr margin-tb" v-if="current==0">
					<item-card :itemObj = "item" type="noShop"></item-card>
				</view>
				
				<view v-for="(item,i) of couponList" :key="i" class="padding-lr margin-tb"  v-if="current==1">
					<coupon-cardused :itemObj = "item" type="noShop" ></coupon-cardused>
				</view>
				
			</view>
		</view>
		
		<view class="flex" style="justify-content:space-around;padding: 0 100upx;color: #666666;font-size: 24upx;margin-top: 38upx;"  v-if="current == 0">
			<text>没有更多有效券了</text>
			<text style="color: #999999;">|</text>
			<text @tap="ckLast">查看过期券<text class="hxIcon-rightArrow" style="font-size: 24upx;"></text></text>
		</view>
		
		<view style="position: fixed;bottom: 0;background-color: #ffffff;width: 100%;z-index: 9;-moz-box-shadow:0px -3px 9px 0px #e9e9e9;-webkit-box-shadow:0px -3px 9px 0px #e9e9e9;box-shadow:0px -3px 9px 0px #e9e9e9;">
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
		
		
		<tui-modal :show="showModal" @click="hideModal" @cancle="hideModal" title="没抢到优惠券" content="您来晚了,优惠券被抢光了! 下一次一定要早点来!"></tui-modal>
	</view>
</template>

<script>
	import itemCard from './components/couponCards'
	import couponCardused from './components/couponCardused'
	import tuiModal from "@/components/modal/modal"
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
					cate_name: `未使用(${this.Nums})`
				}, {
					cate_name: `已使用(${this.yiShu})`
				}],
				current: 0,
				weiShu: 0,
				yiShu: 0,
				Nums: 0,
				NumsY: 0,
			}
		},
		onShow(){
			this.getData.page = 1
			this.current = 0
			this.getCurryInfo()
		},
		onLoad(option) {
			if(option.has == 0) {
				this.showModal = true
			}
			this.$http.myCoulist(this.$store.state.userInfo.ID,2,this.getData.page,this.getData.pagesize).then(res => {
				this.NumsY = res.Num
			})
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
			tabsChange() {
				this.current = 1;
				this.getData.page = 1
				this.couponList = []
				this.showFlag = false
				this.getCurryInfo()
			},
			tabsChanges() {
				this.current = 0;
				this.getData.page = 1
				this.couponList = []
				this.showFlag = false
				this.getCurryInfo()
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
				if(this.current == 0){
					this.$http.myCoulist(this.$store.state.userInfo.ID,this.current+1,this.getData.page,this.getData.pagesize).then(res => {
						console.log(res);
						
						console.log(this.current);
						if(this.current == 0){
							this.Nums = res.Num
						} else {
							this.NumsY = res.Num
						}
						
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
							
							if(this.current == 0){
								this.Nums = 0
							} else {
								this.NumsY = 0
							}
						}
						
					})
					
				} else {
					this.$http.myCoulist(this.$store.state.userInfo.ID,this.current+1,this.getData.page,this.getData.pagesize).then(res => {
						console.log(res);
						
						console.log(this.current);
						if(this.current == 0){
							this.Nums = res.Num
						} else {
							this.NumsY = res.Num
						}
						
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
							
							if(this.current == 0){
								this.Nums = 0
							} else {
								this.NumsY = 0
							}
						}
						
					})
				}
				
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
			itemCard,
			couponCardused,
			tuiModal
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
	
	.sta {
		background-color: #333333;
		position: absolute;
		width: 50upx;
		height: 5upx;
		top: 40upx;
		left: 20upx;
	}
	
	.stas {
		color: #b1b1b1;
	}
</style>
