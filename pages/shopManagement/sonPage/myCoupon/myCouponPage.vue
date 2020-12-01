<template>
	<view>
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的优惠券</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的优惠券</block>
			<!-- #endif -->
		</cu-custom>
		<view>
			<view class="flex flex-direction align-center justify-center margin-top" @tap="addMyCoupon">
				<text class="hxIcon-tianjiayouhuiquan text-red" style="font-size:120upx;"></text>
				<text>添加优惠券</text>
			</view>
			<view v-for="(item,i) of couponList" :key="i" class="padding-lr margin-tb">
				<item-card :itemObj = "item" type="shop"></item-card>
			</view>
		</view>
	</view>  
		
	</view>
</template>

<script>
	import itemCard from '../../../person/myCoupon/components/couponCard.vue'
	
	export default{
		components: { itemCard },
		data(){
			return {
				couponList:[],
				getData:{
					StoreID:'',
					page:1,
					pagesize:10
				}
			}
		},
		onLoad(route){
			this.getData.StoreID=route.StoreID
			this.getCurryInfo()
		},
		created(){
			this.getCurryInfo()
		},
		onShow(){
			console.log(3349)
			this.getCurryInfo()
		},
		methods:{
			addMyCoupon(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/myCoupon/addMyCouponPage?StoreID=${this.getData.StoreID}`
				})
			},
			getCurryInfo(){
				return this.$Request.get(this.$store.state.couponsListUrl,this.getData,false).then(res=>{
					if(res.IsSuccess){
						if(this.getData.page===1){
							this.couponList=res.Data
							if(this.couponList.length===0){
							}
						}else{
							if(res.Data.length===0){
							}else{
								this.couponList=[...this.couponList,res.Data]
							}
						}
						return this.couponList
					}else{
						this.$api.msg(res.Msg,2000)
						return this.couponList
					}
				})
			},
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
	page{
		background: #F0F0F0;
	}
</style>
