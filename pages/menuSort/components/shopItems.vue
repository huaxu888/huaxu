<template>
	<!-- 	<view class="show_list_item "  @tap="goToDetails">
			<view class="shop_img" style="position: relative;">
				<image :lazy-load="lazyLoad" :src="itemObj.StorePic===''?'https://img.huaxuapp.com/huaxulogo70px.png':itemObj.StorePic"  class="shop_image" ></image> -->
				<!-- <image src="https://img.huaxuapp.com/zdsj.png" mode="aspectFit" class="cover-img" v-if="itemObj.IsSY"></image> -->
				<!-- <image src="https://img.huaxuapp.com/zdsj-gai.png" mode="aspectFit" class="cover-img" v-if="itemObj.IsSY"></image>
			</view>  -->
			
			
			<!-- <view class="info_ padding-lr-sm" style="padding-bottom: 20upx;">
				<view class="shop_name text-df text-bold padding-sx">
					<text style="font-size: 26upx;color: #333333;">{{itemObj.StoreName}}</text> -->
					
					<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
						<!-- <text v-if="defaultDiscount != 1 || itemObj.IsZK" class="text-white bg-orange radius" style="margin-left: 4upx;font-size: 6upx; padding: 4upx;font-size: .6rem;">{{ itemObj.IsZK && itemObj.zk != 1 ? itemObj.zk * 10000/1000 : defaultDiscount * 10 }}折</text> -->
					<!-- #endif -->
					
					<!-- #ifdef MP-ALIPAY -->
<!-- 						<text v-if="defaultDiscount != 1 || itemObj.IsZK" class="text-white bg-orange radius" style="margin-left: 4upx;font-size: 6upx; padding: 4upx;font-size: .2rem;">{{ itemObj.IsZK && itemObj.zk != 1 ? itemObj.zk * 10000/1000 : defaultDiscount * 10 }}折</text> -->
					<!-- #endif -->
					
					
				<!-- </view>
				
				<view>
					<text class="hxIcon-tubiaozhizuomoban start-red" style="font-size: 24upx;margin-left: 4upx" v-for="(it,i) in itemObj.StoreStart" :key="i"  v-if="(itemObj.StoreStart)>0"></text>
					<text class="hxIcon-tubiaozhizuomoban " style="font-size: 24upx;color: #bbbbbb;margin-left: 4upx" v-for="(it,i) in (5-itemObj.StoreStart)" :key="i"  v-if="(5-itemObj.StoreStart)>0"></text>
				</view>
	
				<view class="text-cut padding-sx" v-show="itemObj.StoreDesc">
					<text class="shop_Info text-cut"  style="font-size: 22upx;">{{itemObj.StoreDesc}}</text>
				</view>				
			
				<view class="shop_map  text-sm " style="line-height: 1.5em;margin-top: 10upx;"> 
					<text class="hxIcon-dingwei3 " style="color: #ff5b2e;font-size: 24upx;margin-right: 4upx;"></text>
					<text style="font-size: 24upx;">{{changeAddress(itemObj.StoreAddress)}}</text>   
				</view>
			</view>
		</view> -->
		
		<view style="margin-top: 0;margin-bottom: 8upx;"  @tap="goToDetails">
			<view class="flex flex-wrap">
				<view style=" width: 750rpx; overflow: hidden;" >
					<view class="" style="position: relative;">
					
						<!-- <view style="position: relative;" >
							<view class="" style="border-radius: 80upx; background: url('https://img.huaxuapp.com/ydjxsjj_03.png') no-repeat; background-size: cover;position: relative;top: 30upx;width: 200upx;height: 50upx;"></view>
						</view> -->
					
						<view  class="flex" style="width: 750rpx;background: #FFFFFF; padding-top: 30upx; padding-bottom:30upx; padding-left: 30upx; padding-right: 30upx;">
							<view style="position: relative;">
								<image :src="itemObj.StorePic" mode="aspectFill" style="width: 170upx;height:170upx;border-radius: 8upx;"></image>
								<!-- <view v-if="isChristmas && !isYD" style="position: absolute;width: 100%;height:300upx;top: 0;background: url('https://img.huaxuapp.com/merrychristmas_03.png') no-repeat; background-size: cover;z-index: 7;"></view> -->
								<image v-if="itemObj.IsSY" src="https://img.huaxuapp.com/170170gai.png" mode="aspectFit" style="position: absolute; width: 170upx; height: 170upx; top: 0; left: 0;"></image>
								<!-- <view v-if="isChristmas && !isYD"  style="position: absolute;width: 282upx;height:154upx;bottom:-28upx; left: -30upx; background: url('https://img.huaxuapp.com/shengdanlaoren_03.png') no-repeat; background-size: cover;z-index: 8;"></view> -->
							</view>
							
							<view class="" style="margin-left:20upx;width:80%;">
								<view class="flex text-bold text-cut align-center" style="color: #333333;font-size: 30upx;">{{itemObj.StoreName}}
									<view class="flex justify-center align-center" style="margin-left: 10upx;width: 60upx;height: 30upx;
									background-color: #fe4e01;color: #ffffff;font-size: 20upx;border-radius: 50upx 50upx 50upx 0upx;">
										买单
									</view>
								</view>
								
								<!-- <text class="text-gray text-xs">{{itemObj.GGContent}}</text> -->
								<view class="flex align-center justify-between" style="margin-top:12upx">
									<view class="flex align-center justify-start">
										<view class="flex align-center">
											<view class="flex align-center">
												<view class="hxIcon-tubiaozhizuomoban cur-text-red " v-for="(redStartItem,redStartIndex) in itemObj.StoreStart"
												 :key="redStartIndex" style="margin-right: 4upx; line-height: 1em;font-size: 24upx;" v-if="itemObj.StoreStart>0"></view>
											</view>
											<view class="flex align-center">
												<view class="hxIcon-tubiaozhizuomoban  " v-for="(grayStartItem,grayStartIndex) in (5-itemObj.StoreStart)"
												 :key="grayStartIndex" style="margin-right: 4upx; font-size: 24upx;line-height: 1em;color: #cccccc;"  v-if="(5-itemObj.StoreStart)>0"></view>
											</view>
											<view style="color: red;margin-left: 8upx;font-size: 24upx;">{{itemObj.StoreStart}}.0</view>
										</view>
										<!-- 月售 -->
										<!-- <view style="margin-left: 15upx;font-size: 26upx;color: #5e5e5e;"><text style="color: #c7c7c7;margin-right: 15upx;">|</text>月售123</view> -->
										<!-- 距离   -->
										<view style="position: absolute;right: 30upx;color: #999999;font-size: 22upx;" v-if="itemObj.distance != 0">{{getDistance(itemObj.distance)}}</view>
									</view>
									<!-- <view style="line-height: 1em;color: #999999;font-size: 24upx;">
										<text class="hxIcon-huo"></text> <text class="margin-left-xs" style="font-size: 26upx;">{{itemObj.ReadCount==null?0:itemObj.ReadCount}}</text>
									</view> -->
								</view>
								
								<!-- 商圈 -->
								<!-- <view class="flex" style="color: #999999;font-size: 24upx;line-height: 1em;margin-top: 12upx;">
									<text style="color:#f50b0b;line-height: 1em;">{{itemObj.StoreSortName}}</text>
									<text style="margin-left: 5upx;margin-right: 5upx;line-height: 1em;">·</text>
									<text>{{itemObj.BusinessName}}</text>
								</view> -->
								<view class="flex" style="margin-top: 12upx;font-size: 20upx;" v-if="Object.keys(itemObj.StoreDesc).length > 0">
									<text style="background-color: #fbf0ea;color: #fe4e01;padding: 2upx 10upx;">{{yinhang(itemObj.StoreDesc)}}</text>
								</view>
								
								<view class="flex" style="margin-top: 12upx;font-size: 20upx;height: 36upx;" v-if="Object.keys(itemObj.StoreDesc).length == 0">
									<text style="background-color: #ffffff;"></text>
								</view>
								<!-- <view class="flex" style="color: #999999;font-size: 24upx;line-height: 1em;margin-top: 12upx;">
									<text style="color:#f50b0b;line-height: 1em;">{{itemObj.StoreSortName}}</text>
									<text style="margin-left: 5upx;margin-right: 5upx;line-height: 1em;">·</text>
									<text>{{itemObj.BusinessName}}</text>
								</view> -->
								<!-- 地址 -->
								<view style="">
									<view class="text-df map_info flex align-center" style="margin-top: 15upx;">
										<view class=" flex align-center" style="color: #999999;margin-top: 6upx;font-size: 24upx;"><text class="cuIcon-locationfill marghin-right-sm"></text></view>
										<view class="align-center" style="width:800upx;text-overflow :ellipsis;white-space :nowrap; overflow : hidden;font-size: 24upx; ">
											{{dizhiff(itemObj.StoreAddress)}}
										</view>
									</view>
								</view>
								
								<view style="height: 1.5upx;background-color: #e4e4e4;margin-top: 24upx;" v-if="itemObj.Coupons.length > 0 || itemObj.SeatMeal.length > 0"></view>
								<view>
									<view  v-if="itemObj.Coupons.length > 0" class="flex align-center" style="margin-top: 24upx;background-color: #FFFFFF;padding-bottom: 0;">
										<view style="width: 30upx;height: 30upx;color: #ffffff;font-size: 22upx;background-color: #febf3b;line-height: 30upx;text-align: center;">
											<text>券</text>
										</view>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length == 1">{{changG(itemObj.Coupons[0],0)}}</text>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length > 1">{{changG(itemObj.Coupons[0],0)}},</text>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length == 2">{{changG(itemObj.Coupons[1],1)}}</text>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length > 2">{{changG(itemObj.Coupons[1],1)}},</text>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length == 3">{{changG(itemObj.Coupons[2],2)}}</text>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length > 3">{{changG(itemObj.Coupons[2],2)}},</text>
										<text style="margin-left: 10upx;font-size: 24upx;color: #777777;" v-if="itemObj.Coupons.length == 4">{{changG(itemObj.Coupons[3],3)}}</text>
									</view>
									<view v-if="itemObj.SeatMeal.length > 0" class="flex align-center" style="padding-bottom: 0;background-color: #FFFFFF;line-height: 30upx;margin-top: 20upx;padding-right: 20upx;">
										<view style="width: 30upx;height: 30upx;color: #ffffff;font-size: 22upx;background-color: #f9683c;text-align: center;">
											<text>团</text>
										</view>
										<text class="shengLv" style="margin-left: 10upx;font-size: 24upx;color: #777777;width: 500upx;">{{itemObj.SeatMeal[0].Title}}</text>
									</view>
								</view>
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
		return{
			lazyLoad:true,
			defaultDiscount: 1,
			xXing:0
		}
	},
	props:{
		itemObj:{//传进来的店铺对象，一些列单个店铺信息
			type:Object,
			default:()=>{}
		},
		SeatMealList:{
			options: {
				type: Object,
				default:()=>{}
			},
		}
	},
	mounted() {
		
		this.xXing  = 5 - this.itemObj.StoreStart
		
		this.$http.getDefaultDiscount()
		.then( res => {
			if(res.IsSuccess) {
				this.defaultDiscount = res.Data
			} else {
				this.defaultDiscount = 1
			}
		})
		.catch( err => {
			this.defaultDiscount = 1
		})
	},
	methods:{
		changG(item,i){
			console.log(item,i);
			if(item.Sort == 1){
				if(item.Num1 == 0){
					return `消费立减${item.Num2}`
				} else {
					return `满${item.Num1}减${item.Num2}`
				}
			} else {
				return `满${item.Num1}立送${item.Num2}`
			}
		},
		jieQu(basic){
			basic = basic.substring(0, basic.length - 1);
			
			return basic
		},
		yinhang(bankNumber){
			if(bankNumber.length > 20){
				return bankNumber.substr(0,20)+"...";
			} else {
				return bankNumber;
			}
		},
		dizhiff(e){
			var a = parseInt(e.indexOf(";"));
			var c = parseInt(e.indexOf("；"))
			if(e.indexOf(";")!=-1){
			    var b = e.substring(0,a);
				return b;
			}
			
			if(e.indexOf("；")!=-1){
			    var c = e.slice(0,c);
				return c;
			}
			return e;
		},
		getDistance(distance) {
			let km = Math.floor(distance / 1000)
			if (km < 1) {
				return distance.toFixed(2) + 'm'
			} else {
				return `${km}.${(distance % 1000).toString().substr(0, 2)}km`
			}
		},
		goToDetails(){//发生点击时的事件
			this.$emit('goToDetails',this.itemObj)
		}
	}
}
</script>

<style scoped>
	
	.start-red{
		color: #fe4e01;
	}
	
	.show_list_item{
		border-radius:10upx;
		width:100%;
		background-color: #FFFFFF;
		
	}
	.shop_image{
		border-radius:10upx 10upx 0 0;
		height:240upx;
	}
	
	.cover-img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 240rpx;
	}
	.info_{
		line-height: 40upx;
	}
	.shop_map{
		white-space:normal;
        word-break:break-all;
        word-wrap:break-word; 
	}
	.shop_Info{
		color:rgb(102,102,102);
		background: rgb(230,229,229);
		padding:1upx;
		font-size: 20upx;
		line-height:1em;
	}
	.cur-text-red {
		color: #fe4e01;
		font-size: 28upx;
	}
	
	
	.shengLv{
		color: #333333;
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

 
 