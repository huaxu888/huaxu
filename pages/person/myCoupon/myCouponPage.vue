<template>
	<view >
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的优惠劵</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">我的优惠劵</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view>
			<view class="flex justify-center" style="width: 100%" v-if="showFlag">
				<view class="bg_conent" style="margin-top:400upx">		
				</view>
			</view>
			
			<view v-if="!showFlag">
				<view v-for="(item,i) of couponList" :key="i" class="padding-lr margin-tb">
					<item-card :itemObj = "item" type="noShop"></item-card>
				</view>
			</view>
		</view>
		<tui-modal :show="showModal" @click="hideModal" @cancle="hideModal" title="没抢到优惠券" content="您来晚了,优惠券被抢光了! 下一次一定要早点来!"></tui-modal>
	</view>
</template>

<script>
	import itemCard from './components/couponCard'
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
				showModal: false
			}
		},
		onShow(){
			this.getCurryInfo()
		},
		onLoad(option) {
			if(option.has == 0) {
				this.showModal = true
			}
		},
		methods:{
			getCurryInfo(){
				return this.$Request.get(this.$store.state.clipCouponsListUrl,this.getData).then(res=>{
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
		onReachBottom(){//上拉加载
			this.getData.page+=1
			this.getCurryInfo()
		},
		components:{
			itemCard,
			tuiModal
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.bg_conent{
		background-image:url('https://img.huaxuapp.com/暂无优惠券_03.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width:50%;
		height:400upx;
	}
</style>
