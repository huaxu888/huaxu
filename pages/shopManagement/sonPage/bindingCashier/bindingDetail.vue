<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-colorss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">店长收款码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">店长收款码</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<!-- <view class="padding-xl">
			<view class="margin-bottom flex justify-center">
				<view class="shop_log" 
					:style="{backgroundImage:`url(${infoObj.PicUrl})`,}"
					>
				</view>
			</view>
			<view class="padding-sm flex justify-center">
				<text>{{infoObj.Name}}</text>
			</view>
			<view class="flex justify-center">
				<text>{{infoObj.Phone}}</text>
			</view>
			<view class="margin-top-xl flex  justify-center">
				<tki-qrcode  :size="qrcode.size" :unit="qrcode.unit" ref="qrcode" :val="val"  />		
			</view>
			<view class="margin-top-sm text-gray padding-top-sm flex justify-center">
				<text>扫一扫上面的二维码，向我付款</text>
			</view>
		</view> -->
		<view>
			<view class="margin-xl" style="background-color: #FFFFFF;border-radius: 30upx;padding-bottom: 10upx;padding-top: 20upx;margin-bottom: 0;">
				<view class="flex padding-xl">
					<view class="margin-bottom">
						<image :src="infoObj.PicUrl" mode="aspectFit" class="touxiang" style=" margin-left: 30upx; "></image>
					</view>
					<view class="padding-sm">
						<view style="margin-top: 4upx;font-weight: 600;font-size: 36upx;">{{infoObj.Name}}</view>
						<view style="margin-top: 14upx;color: #9a9a9a;">{{infoObj.Phone}}</view>
					</view>
				</view>
				
				<view class="flex justify-center">
					<tki-qrcode  :size="qrcode.size" :unit="qrcode.unit" ref="qrcode" :val="val"  style="border: 1px solid #fae0a6;padding: 30upx;" />		
				</view>
				<view class="margin-top-sm text-gray padding-top-sm flex justify-center  padding-xl">
					<text style="font-size: 32upx;margin-top: 20upx;">扫一扫上面的二维码，向我付款</text>
				</view>
				
			</view>
			<view class="">
				<image src="https://img.huaxuapp.com/ygskm.png" mode="" style="width: 750upx;height: 220upx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(route){
			console.log(route)
			for(var key of Object.keys(route)){
				if(key === 'PicUrl'){
					this.infoObj.PicUrl=route.PicUrl
				}
				if(key === 'Name'){
					this.infoObj.Name=route.Name
				}
				if(key === 'Phone'){
					this.infoObj.Phone=route.Phone
				}
				if(key === 'UserID'){
					this.getData.UserID=route.UserID
				}
				if(key === 'storeid'){
					this.getData.storeid = route.storeid
				}
			}
			this.getCurryInfo()
		},
		data(){
			return {
				infoObj:{},
				getData:{},
				url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=627258962,269174819&fm=11&gp=0.jpg",
				val:'',//二维码的值
				qrcode:{//二维码插件配置
					unit:'upx',
					size:440
				}
			}
		},
		methods:{
			getCurryInfo(){
				return this.$Request.get(this.$store.state.yyyskewmUrl,this.getData).then(res=>{
					if(res.IsSuccess){
						this.val= res.Data
					}
				})
			}
		}
	}
</script>

<style>
	.shop_log{
		background-repeat: no-repeat;
		background-size: cover;
		width:180upx;
		height:180upx;
		border-radius: 50%;
	}
	
	.touxiang {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin-top: 20upx;
	}
</style>
