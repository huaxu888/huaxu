<template>
	<view>
		<view style="background:white">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
			<cu-custom bgColor="bg-hx-white" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">新手必看</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
				<block slot="content">新手必看</block>
				<!-- #endif -->
			</cu-custom>
			<view style="width: 100%;border:2upx solid #F0F0F0"></view>
			<!-- #endif -->
			<view>
				<view class="padding margin-tb flex align-center" v-for="(item,i) of infoList" :key="i" @tap="goToDetail(item)">
					
					<view class="image_left" :style="{'background-image':`url(${item.PicURL})`}">
						
					</view>
					
					<view class="margin-left-sm flex flex-direction justify-between" style="height: 160upx;width:60%">
						
						<view class="text-bold" style="width:100%">{{item.Title}}</view>
						
						<view class="flex text-sm text-gray justify-between" style="width:100%">
							<view>浏览{{item.ReadCount}}次</view>
							<view>{{beTime(item.AddDateTime)}}</view>
						</view>
					</view>
				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				infoList:[],
				getData:{
					siteid:0
				}
			}
		},
		onLoad(){
			this.getCurryInfo()
		},
		methods: {
			getCurryInfo(){
				return this.$Request.get(this.$store.state.huaxumustseeUrl,this.getData,false).then(res=>{//新手问题
					this.infoList = res
					return true	
				})
			},
			goToDetail(obj) {
				uni.navigateTo({
					url:`/pages/person/strategy/sonPage/strategyDetail?nid=${obj.ID}`
				})
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.getCurryInfo().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //上拉加载
		},
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.image_left{
		width:40%;
		height: 160upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border-radius: 10upx;
	}
</style>
