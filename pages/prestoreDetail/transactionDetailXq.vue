<template>
	<view style="background:#ffffff;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">交易详情</block>
		</cu-custom>
		
		<view style="text-align: center;padding: 30upx 0;padding-bottom: 40upx;">
			<view style="text-align: center;">
				<image :src="infoList.FaceUrl || 'https://img.huaxuapp.com/6454608_.pic.jpg'" mode="" style="border-radius: 76upx;width: 90upx;height: 90upx;"></image>
			</view>
			<view style="margin: 30upx 0;font-size: 30upx;color: #000000;">{{infoList.StoreName}}</view>
			
			<view class="text-bold text-black flex justify-center">
				<view v-if="!infoList.IsZC" style="color: #f34e2d;font-weight: 600;font-size: 54upx;">+</view>
				<view v-if="!infoList.IsZC" style="color: #f34e2d;font-weight: 600;font-size: 54upx;">{{infoList.Score}}</view>
				<view v-if="infoList.IsZC" style="font-weight: 600;font-size: 54upx;">-</view>
				<view v-if="infoList.IsZC" style="font-weight: 600;font-size: 54upx;">{{infoList.Score}}</view>
			</view>
		</view>
		
		<view class="" style="border-top: 2upx solid #e4e4e4;margin-left: 30upx;margin-right: 30upx;padding:30upx 0 ">
			<view class="flex">
				<view style="color: #777777;width:160upx;">
					当前状态
				</view>
				<view style="color: #333333;">
					{{infoList.ZFState}}
				</view>
			</view>
			<view class="flex" style="margin-top:20upx;" v-if="infoList.Goods">
				<view style="color: #777777;width:160upx;">
					商品
				</view>
				<view style="color: #333333;">
					{{infoList.Goods}}
				</view>
			</view>
			<view class="flex" style="margin-top:20upx;" v-if="infoList.GoodsDetail">
				<view style="color: #777777;width:160upx;">
					商品全称
				</view>
				<view style="color: #333333;width: 500upx;" class="shengLv">
					{{infoList.GoodsDetail}}
				</view>
			</view>
			<view class="flex" style="margin-top:20upx;">
				<view style="color: #777777;width:160upx;">
					支付时间
				</view>
				<view style="color: #333333;">
					{{beTime(infoList.AddDate)}}
				</view>
			</view>
			<view class="flex" style="margin-top:20upx;">
				<view style="color: #777777;width:160upx;">
					支付方式
				</view>
				<view style="color: #333333;">
					{{infoList.ZFName}}
				</view>
			</view>
			<view class="flex" style="margin-top:20upx;" v-if="infoList.OrderNo">
				<view style="color: #777777;width:160upx;">
					交易单号
				</view>
				<view style="color: #333333;">
					{{infoList.OrderNo}}
				</view>
			</view>
			<view class="flex" style="margin-top:20upx;" v-if="infoList.No">
				<view style="color: #777777;width:160upx;">
					商户单号
				</view>
				<view style="color: #333333;">
					{{infoList.No}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				Ids:'',
				sorts:'',
				infoList:[]
			}
		},
		onLoad(route){
			this.Ids =  route.Ids
			this.sorts = route.sorts
			this.$http.personTransactionDetail(route.Ids,route.sorts).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.infoList = res.Data
				} else {
					this.$api.msg('请重试')
				}
				
			})
			
		},
		onShow() {
			
		},
		methods:{
			
		},
		onPullDownRefresh(){//下拉时刷新
			
			
		},
		onReachBottom(){
			
		}
	}
</script>
	
<style>
	page{
		background:#ffffff;
	}
</style>
<style scoped>
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow:hidden;
	}
</style>
