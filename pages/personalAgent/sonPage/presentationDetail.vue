<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true" >
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">提现明细</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">提现明细</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view>
			
			<view>
				<view v-for="(its,i) of infoList" :key="i">
					<view class="flex padding-lr padding-tb-sm align-center justify-between">
						<text>{{its.time}}</text>
						<text class="margin-left text-red">￥{{its.allmoney}}</text>
					</view>
					
					<view class="padding flex justify-between bg-white" v-for="(item,j) of its.list" :key="j" style="border-bottom: 2upx solid #F0F0F0;">
						<view class="flex flex-direction">
							<text>提现到余额</text>
							<text class="margin-top-sm text-gray text-sm">{{item.time}}</text>
						</view>
						
						<view class="flex flex-direction align-end">
							<text class="text-gray">￥{{item.money}}</text>
							<text class="margin-top-sm text-gray text-sm">提现成功</text>
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
				infoList:[
					{
						time:'2019-10',
						allmoney:550,
						list:[
							{
								time:'2019-10-12',
								money:500,	
							},{
								time:'2019-10-12',
								money:500,	
							},{
								time:'2019-10-12',
								money:500,	
							}
						]
					},
					{
						time:'2019-10',
						allmoney:550,
						list:[
							{
								time:'2019-10-12',
								money:500,	
							}
						]
					}
				]
			}
		},
		onPullDownRefresh(){//下拉时刷新
			// this.getData.page=1
			// this.getCurryInfo().then(res=>{
			// 	uni.stopPullDownRefresh()
			// })
		},
		onReachBottom(){//上拉加载
			// this.getData.page+=1
			// this.getCurryInfo()
		},
	}
</script>

<style>
	page{
		background:#F8F8F8;
	}
</style>
