<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">营业员详情</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">营业员详情</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="padding-xl">
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
					size:340
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
</style>
