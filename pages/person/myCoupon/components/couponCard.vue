<template>
	<view>
		<view class="padding-lr padding-tb-sm flex-direction align-center bg-white" style="border-radius: 10upx;" v-if="itemObj.Sort == 1 && type === 'noShop' && itemObj.SortID == 0">
			<view style="width:100%" class="flex align-center" v-if="itemObj.Sort == 1 && type === 'noShop'">
				<view style="padding-left:2upx;padding-right: 2upx;border-radius: 5upx;" class="margin-lr-sm" :style="{background: color}">
					<text class="text-sm text-white" v-if="!StoreName" >{{SortName}}</text>
				</view>
				<text class="text-bold text-lg" style="margin-left: -30rpx;" v-if="StoreName">
					<text class="cuIcon-shop" style="font-weight: 300;"></text>
					{{ ' ' + StoreName}}
				</text>
			</view>
			
			<view style="width:100%" class="flex align-center" v-if="itemObj.Sort == 2 && type === 'noShop'">
				<view style="padding-left:2upx;padding-right: 2upx;border-radius: 5upx;" class="margin-lr-sm" :style="{background: color}">
					<text class="text-sm text-white" >政府专属消费券(指定商家专用)</text>
				</view>
				<!-- <text class="text-bold text-lg" v-if="StoreName">{{StoreName}}</text> -->
			</view>
			
			<view style="width:100%;" class="flex  margin-top-sm align-center justify-between">
				<view class="flex padding-sm align-center" style="border-radius:15upx;flex-grow: 2;" :style="{background: background}">
					<view :style="{backgroundImage:`url(${StorePic})`}"  radius class="touxiang_ margin-right-sm" >
					</view>
					
					<view class="flex flex-direction align-center justify-center" style="height: 106upx;">
						<text class="text-xl margin-bottom-xs" :style="{color:color}">
							<text v-if="(itemObj.Sort == 1 && type === 'noShop') || (itemObj.youhuiquan.Sort == 1 && type === 'shop')">满{{Num1}}减{{Num2}}</text>
							<text v-if="(itemObj.Sort == 2 && type === 'noShop') || (itemObj.youhuiquan.Sort == 2 && type === 'shop')">代金券{{Num2}}元</text>
						</text>
						<!-- <text class="text-xl margin-bottom-xs" style="color:rgb(236,64,76)" v-if="itemObj.Sort == 2">代金券{{Num2}}元</text> -->
						<view class="flex flex-direction justify-center">
							<text class="text-sm text-gray">有效期至 {{EDate}}</text>
						</view>
					</view>	
				</view>
				
				<view class="flex padding-sm align-center justify-between dashed_" style="border-radius:8upx;" @tap="goToDetail" :style="{background: background}">
					<view style="height: 106upx;" class="flex justify-center align-center" >
						<text class="padding-lr-sm padding-tb-xs btn_coupon" :class="state.class">{{state.text}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between bg-white" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx;" v-if="itemObj.Sort == 3 && type === 'noShop'">
		    <image src="https://img.huaxuapp.com/zsxf_03.png" style="height: 256upx;width: 100%;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs " style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<text class="padding-lr-sm padding-tb-xs btn_coupon"  style="font-size: 24upx;" :class="state.class"   @tap="goToDetail">{{state.text}}</text>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx; overflow: hidden;" v-if="itemObj.SortID == 26 && type === 'noShop'">
		    <image src="https://img.huaxuapp.com/canyin.png" style="width: 696rpx ;height: 236rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<text class="padding-lr-sm padding-tb-xs btn_coupon"  style="font-size: 24upx;" :class="state.class"   @tap="goToDetail">{{state.text}}</text>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx; overflow: hidden;" v-if="itemObj.SortID == 3 && type === 'noShop'">
		    <image src="https://img.huaxuapp.com/zsyzxq_03new.png" style="width: 696rpx ;height: 236rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<text class="padding-lr-sm padding-tb-xs btn_coupon"  style="font-size: 24upx;" :class="state.class"   @tap="goToDetail">{{state.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		mame: 'itemCard',
		data(){
			return {

			}
		},
		props:{
			itemObj:{
				type:Object,
				default:()=>{}
			},
			type:{//判断是个人的优惠券还是店铺的优惠券
				type:String,
				default:'shop'
			},
		},
		mounted() {
			console.log(this.itemObj, this.type);
		},
		computed:{
			SortName(){
				if (this.itemObj.StoreName) {
					return this.itemObj.SortName
				} else {
					return this.itemObj.SortName ? `政府惠民消费券 (${this.itemObj.SortName}可用)` : '政府惠民消费券 (指定商家专用)'
				}
			},
			StoreName(){
				return this.itemObj.StoreName
			},
			StorePic(){
				return this.itemObj.StorePic || this.$store.state.dfLogImg
			},
			Num1(){
				return this.type==='shop'?this.itemObj.youhuiquan.Num1:this.itemObj.Num1
			},
			Num2(){
				return this.type==='shop'?this.itemObj.youhuiquan.Num2:this.itemObj.Num2
			},
			BDate(){
				return this.type==='shop'?this.time(this.itemObj.youhuiquan.BDate):this.time(this.itemObj.BDate)
			},
			EDate(){
				return this.type==='shop'?this.time(this.itemObj.youhuiquan.EDate):this.time(this.itemObj.EDate)
			},
			state(){
				let timestamp = (new Date()).valueOf()
				if(this.type==='shop'){//商铺默认
					return {text:'优惠券',class:'over'}
				}else{
					if(!this.itemObj.youhuiquan.IsGQ){
						console.log(3349)
						var selfEndTime = (new Date()).valueOf()
						var EDate =this.itemObj.EDate.split('(')[1].split(')')[0]*1
						console.log(selfEndTime,EDate)
						if(selfEndTime<EDate){
							let result = {}
							if(this.itemObj.youhuiquan.IsSY){
								result.text = '已使用'
								result.class = this.itemObj.Sort === 1 ? 'fail' : 'fail-djq'
								
								return result//已使用
							}else{
								result.text = '去使用'
								result.class = this.itemObj.Sort === 1 ? this.itemObj.SortID === 0 ? 'success' : 'success-zd' : 'success-djq'
								
								return result//未使用
							}
						}else{
							return {text:'已过期',class:'over'}
						}
					}else{
						return {text:'已过期',class:'over'}
					}
					
				}
			},
			color () {
				return (this.itemObj.Sort === 1 && this.type === 'noShop') || (this.itemObj.youhuiquan.Sort === 1 && this.type === 'shop') ? '#f8656f' : '#dca146'
			},
			background () {
				return (this.itemObj.Sort === 1 && this.type === 'noShop') || (this.itemObj.youhuiquan.Sort === 1 && this.type === 'shop') ? '#fcf3f4' : '#faf8f5'
			}
		},
		methods:{
			time(timeDate){
				var date = new Date((timeDate.split('(')[1].split(")")[0])*1),//计算出时间				//转换成 xxx-xx-xx
					month = date.getMonth() + 1,
					day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
					hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
					minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
					seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
					
					month = month > 9 ? month : '0' + month
					
				return `${month}-${day} ${hours}:${minutes}:${seconds}`
			},
			goToDetail(){
				if(this.state.class.includes('success')){
					if (this.StoreName) {
						uni.navigateTo({
							url:`/pages/shopDetail/shopDetailPage?StoreID=${this.itemObj.StoreID}`
						});
					} else {
						uni.navigateTo({
							url:`/pages/menuSort/sort?StoreSortID=${this.itemObj.SortID || 23}&StoreSortName=${ this.itemObj.SortName ||'特色美食'}`
						});
					}
				}else{
					return 
				}
			}
		}
	}
</script>

<style>
	.touxiang_{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width:200upx;
		height:200upx;
		border-radius: 10upx;
		width:106upx;
		height:106upx;
	}
	.btn_coupon{
		border-radius: 50upx;
	}
	.success{/*未使用*/
		background:red;
		color:white
	}
	.success-djq {
		background:rgb(0,146,255);
		color:white
	}
	.success-zd {
		background-color: #feab47;
		color: white;
	}
	.fail{
		background:white;
		border:2upx solid rgb(220,161,70);
		color: rgb(220,161,70);
	}
	.fail-djq {
		background:white;
		border:2upx solid rgb(220,161,70);
		color: rgb(220,161,70);
	}
	.over{
		background:rgb(216,210,211);
		color:white;
	}
	.dashed_{
		position: relative;
	}
	.dashed_:after{
		position: absolute;
		content: '';
		width:2upx;
		border-left: 2upx dashed rgb(240,186,198);
		top:10%;
		bottom:10%;
		left:-2upx;
	}
</style>
