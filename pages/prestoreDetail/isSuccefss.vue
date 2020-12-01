<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<view>
			<cu-custom bgColor="bg-jingying" style="color: #ffffff;" backColor="bg-jingying" :isBack="false">
				<block slot="content"></text></block>
			</cu-custom>
		</view>
		<!-- #endif -->
		
		<view>
			<view>
				
			</view>
			<view>
				提现成功
			</view>
			<view>
				
			</view>
		</view>
		
		<view style="height: 330upx;background-color: #ffffff;border-radius: 15upx;margin: 36upx;color: #808080;">
			<view class="" style="padding: 0 30upx;">
				<view class="flex justify-between" style="border-bottom: 1upx solid #e4e4e4;height: 110upx;line-height: 110upx;font-size: 26upx;">
					<text>提现金额</text>
					<text>{{Custom.TXScores}}</text>
				</view>
				<view class="flex justify-between" style="border-bottom: 1upx solid #e4e4e4;height: 110upx;line-height: 110upx;font-size: 26upx;">
					<text>到账金额</text>
					<text>{{Custom.Scores}}</text>
				</view>
				<view class="flex justify-between" style="height: 110upx;line-height: 110upx;font-size: 26upx;">
					<text>账户余额</text>
					<text>{{Custom.YE}}</text>
				</view>
			</view>
		</view>
		
		<view class="flex justify-center" @tap="fanhui">
			<view class="sure">返回</view>
		</view>
		<!-- <view >
			<view class="flex justify-center align-center margin-top-xl" style="width: 100%;">
				<text class="hxIcon-zhifuchenggong margin-right text-red" style="font-size: 150upx;"></text>
				<text class="text-gray" style="font-size:60upx">{{title}}</text>
			</view>
			<view class="flex justify-center margin-top">
				<text class="text-lg">{{type==='tx'?'提现':type==='card'?'充值':'预存'}}金额：{{money}}元</text>
			</view>
			<view class="flex justify-center margin-top" v-if="type!='tx'">
				<text class="text-lg">可获得消费额：{{allMoney}}元</text>
			</view> -->
			<!-- <view class="flex justify-center margin-top" v-if="type==='card'">
				<text class="text-lg">{{time}}</text>
			</view> -->
			<!-- <view class="flex justify-center align-center" style="width: 100%;margin-top:40%">
				<view class="padding flex flex-direction align-center justify-center" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" style="width:60%" @tap="submit">完 成</button>
				</view>
			</view>
		</view> -->
		
		
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.type = route.type
			this.money = route.money
			this.allMoney = route.allMoney
			console.log(route);
			this.StoreID = route.StoreID
			this.sorts = route.sort 
			this.userid = route.userid
			
			this.$http.txXQ(this.userid,this.StoreID,this.sorts).then(res => {
				console.log(res);
				this.Custom = res
			})
		},
		data(){
			return {
				type:'',
				money:0,
				allMoney:0,
				StoreID:0,
				sorts:0,
				userid:0,
				Custom:[]
			}
		},
		methods:{
			fanhui(){
				uni.switchTab({
					url:'/pages/index/person'
				})
			},
			chuLi(name){
				let newStr;
				if (name.length >= 6) {
					newStr = name.substr(0, 6);
				} else {
					return name;
				}
				return newStr;
			},	
			submit(){
				if(this.type==='tx'){
					uni.navigateBack({
						delta:4
					})
					return 
				}else if(this.type==='card'){
					console.log(33333333333333333)
					uni.switchTab({
						url:'/pages/index/person'
					})
				}else{				
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			}
		},
		onBackPress() {
			if(this.type==='tx'){
				uni.navigateBack({})
				return 
			}else if(this.type==='card'){
				console.log(33333333333333333)
				uni.switchTab({
					url:'/pages/index/person'
				})
			}else{				
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		computed:{
			title(){
				if(this.type==='tx'){
					return '提现成功'
				}else if(this.type==='card'){
					return '充值卡充值成功'
				}else{
					return '预存成功'
				}
			}
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.page__{
		width:1005;
		height:100vh
	}
	
	.sure {
		margin-top: 20upx;
		height: 94upx;
		width: 584upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fe5479;
		color: #ffffff;
		font-size: 30upx;
		border-radius: 60upx;
	}
</style>
