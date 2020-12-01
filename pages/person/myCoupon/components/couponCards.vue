<template>
	<view>
		<view style="background-image: url(https://img.huaxuapp.com/yhqbg.png);background-repeat: no-repeat;width: 690upx;height: 184upx;background-size: cover;
		padding: 30upx 30upx;padding-top: 20upx; position: relative;" v-if="type === 'noShop'&& itemObj.Title !== '留坝通用券'&&itemObj.StoreId !== 1129">
			<view class="flex" style="" @tap="goToDetail">
				<view style="position: absolute;left:0;top: 0; background-color: #ffa946;color: #ffffff;border-radius: 13upx 13upx 13upx 0;
					text-align: center;" v-if="itemObj.IsOutTime">
					<text style="font-size: 19upx;width: 88upx;height: 16upx;line-height: 16upx;padding: 0 10upx;">即将过期</text>
				</view>
				<view style="color: #fd542c;text-align: center;width: 110upx;margin-top: 10upx;">
					<text style="font-size: 28upx;">￥</text>
					<text style="font-size: 48upx;font-weight: 600;" >
						{{itemObj.MianE}}
					</text>
					
					<view style="line-height: 20upx;">
						<text style="font-size: 22upx;" v-if="itemObj.CouponSort == 6  && type === 'noShop'">代金券</text>
						<text style="font-size: 22upx;" v-if="itemObj.CouponSort == 1 || itemObj.CouponSort == 2 && type === 'noShop'">满减券</text>
						<text style="font-size: 22upx;" v-if="itemObj.CouponSort == 7 && type === 'noShop'">满赠券</text>
					</view>
				</view>
				<view style="margin-left: 70upx;width: 320upx;">
					<text style="font-weight: 600;font-size: 30upx;margin-top: 10upx;">{{yinHang(itemObj.Title)}}</text>
					<view style="color: #fd542c;margin-top: 10upx; ">
						<text style="border: 1upx solid #fd542c;padding: 0 10upx;font-size: 20upx;border-radius: 5upx;height: 34upx; " v-if="itemObj.CouponSort == 1 ||  itemObj.CouponSort == 2 && type === 'noShop'">
							<text v-if="itemObj.MinMoney == 0">
								无门槛使用
							</text>
							<text v-if="itemObj.MinMoney > 0 && itemObj.CouponSort == 1 || itemObj.CouponSort == 2">
								满{{itemObj.MinMoney}}立减
							</text>
							<text v-if="itemObj.MinMoney > 0 && itemObj.CouponSort !== 1 && itemObj.CouponSort !== 2">
								满{{moneys}}立减
							</text>
						</text>
						<text style="border: 1upx solid #fd542c;padding: 0 10upx;font-size: 20upx;border-radius: 5upx;height: 34upx; "
							v-if="itemObj.CouponSort == 6 && type === 'noShop'">￥{{itemObj.MinMoney}}</text>
						<text style="border: 1upx solid #fd542c;padding: 0 10upx;font-size: 20upx;border-radius: 5upx;height: 34upx; " 
							v-if="itemObj.CouponSort == 7 && type === 'noShop'">满{{itemObj.MinMoney}}赠送</text>
					</view>
				</view>
				<view style="margin-left: 60upx; background: #fd542c;color: #ffffff;width: 130upx; height: 52upx;line-height: 52upx;border-radius: 40upx;
					margin-top: 14upx;text-align: center;" @tap="goToDetail">
					<text style="font-size: 22upx;">
						立即使用
					</text>
				</view>
			</view>
			<view style="margin-top: 14px;justify-content:space-between;position: relative;" class="flex">
				<text style="font-size: 20upx;margin-left: 4upx;margin-top: 2upx;">
					有效期: <text style="margin-left: 10upx;"><text style="">{{years}}/</text>{{BDate}} - {{EDate}}</text>
				</text>
				<view @tap="usRe">
					<text style="font-size: 20upx;color: #999999;">
						使用规则 <text :class="ShowHidden ? 'cuIcon-unfold' : 'hxIcon-rightArrow'" style="font-size: 20upx;"></text>
					</text>
				</view>
			</view>
		</view>
		<view  style="font-size:24upx;color: #666666;background-color: #fffaf9;height: 70upx;line-height: 70upx;padding-left: 40upx;border-radius: 0 0 15upx 15upx;" v-if="ShowHidden">
			<text>{{itemObj.Iofo}}</text>
			<text style="margin: 0 14upx;">|</text>
			<text>不可叠加</text>
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
		    <image src="https://img.huaxuapp.com/jyzxq622_03.png" style="width: 696rpx ;height: 236rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<text class="padding-lr-sm padding-tb-xs btn_coupon"  style="font-size: 24upx;" :class="state.class"   @tap="goToDetail">{{state.text}}</text>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx; overflow: hidden;" v-if="itemObj.CouponSort == 2 && itemObj.MianE == 30 && type === 'noShop' && itemObj.SiteID == 9" @tap="goToDetail">
		    <image src="https://img.huaxuapp.com/0707ty_03.png" style="width: 699rpx ;height: 255rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<view style="background: #fd542c;color: #ffffff;width: 130upx; height: 52upx;line-height: 52upx;border-radius: 40upx;
					margin-top: 14upx;text-align: center;margin-right: 20upx; " @tap="goToDetail">
					<text style="font-size: 24upx;">
						立即使用
					</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx; overflow: hidden;" v-if="itemObj.SortID == 21 && type === 'noShop' ">
		    <image src="https://img.huaxuapp.com/jdmp20_03.png" style="width: 699rpx ;height: 255rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<text class="padding-lr-sm padding-tb-xs btn_coupon"  style="font-size: 24upx;" :class="state.class"   @tap="goToDetail">{{state.text}}</text>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx; overflow: hidden;"    v-if="itemObj.CouponSort == 1 && itemObj.StoreId == 1129 && itemObj.MianE == 1 &&type === 'noShop' " @tap="goToDetail">
		    <image src="https://img.huaxuapp.com/qczhq1_03.png" style="width: 699rpx ;height: 255rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<view style="background: #fd542c;color: #ffffff;width: 130upx; height: 52upx;line-height: 52upx;border-radius: 40upx;
					margin-top: 14upx;text-align: center;margin-right: 20upx; " @tap="goToDetail">
					<text style="font-size: 24upx;">
						立即使用
					</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-direction align-center justify-between" style="border-radius: 10upx 10upx 20upx 20upx;width: 696upx; overflow: hidden;"  v-if="itemObj.CouponSort == 7 && itemObj.StoreId == 1129 && itemObj.MianE == 500 &&type === 'noShop' " @tap="goToDetail">
		    <image src="https://img.huaxuapp.com/cxdkq100_03.png" style="width: 699rpx ;height: 184rpx;"  mode="widthFix"></image>
			<view class="flex align-center justify-between padding-tb-sm padding-lr-xs bg-white" style="width: 100%;" >
				<view class="text-sm text-gray">使用期限：{{BDate}} - {{EDate}}</view>
				<view style="background: #fd542c;color: #ffffff;width: 130upx; height: 52upx;line-height: 52upx;border-radius: 40upx;
					margin-top: 14upx;text-align: center;margin-right: 20upx; " @tap="goToDetail">
					<text style="font-size: 24upx;">
						立即使用
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		mame: 'itemCard',
		data(){
			return {
				 ShowHidden: false,
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
					// return this.itemObj.SortName ? `政府惠民消费券 (${this.itemObj.SortName}可用)` : '政府惠民消费券 (指定商家专用)'
					return this.itemObj.SortName ? `花蓄联合商家红包专区优惠券` : '花蓄联合商家红包专区优惠券'
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
				return this.type==='shop'?this.time(this.itemObj.BDate):this.time(this.itemObj.BDate)
			},
			EDate(){
				return this.type==='shop'?this.time(this.itemObj.EDate):this.time(this.itemObj.EDate)
			},
			years(){
				return this.type==='shop'?this.times(this.itemObj.BDate):this.times(this.itemObj.BDate)
			},
			moneys(){
				return Number(this.itemObj.MinMoney) - Number(this.itemObj.MianE)
			},
		},
		methods:{
			yinHang(bankNumber){
				console.log(bankNumber);
				if(bankNumber.length > 9){
					return bankNumber.substr(0,9)+"...";
				} else {
					return bankNumber;
				}
			},
			usRe(){
				this.ShowHidden = !this.ShowHidden
			},
			time(timeDate){
				var date = new Date((timeDate.split('(')[1].split(")")[0])*1),//计算出时间				//转换成 xxx-xx-xx
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
					hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
					minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
					seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
					
					month = month > 9 ? month : '0' + month
					
				return `${month}/${day} ${hours}:${minutes}`
			},
			times(timeDate){
				var date = new Date((timeDate.split('(')[1].split(")")[0])*1),
				year = date.getFullYear()
				return `${year}`
			},
			goToDetail(){
				if (this.itemObj.StoreId) {
					uni.navigateTo({
						url:`/pages/shopDetail/shopDetailPage?StoreID=${this.itemObj.StoreId}`
					});
				} else {
					if(this.itemObj.SiteID == 0){
						uni.navigateTo({
							url:`/pages/menuSort/hongBao?StoreSortID=23&StoreSortName=全部分类`,
						});
					} else {
						uni.navigateTo({
							url:`/pages/menuSort/sort?StoreSortID=${this.itemObj.SortID || 23}&StoreSortName=${ this.itemObj.
							Name ||'特色美食'}`,
						});
					}
				}
			}
		}
	}
</script>

<style scoped>
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
		background:#fd542c;
		color:white
	}
	.success-djq {
		background:rgb(0,146,255);
		color:white
	}
	.success-zd {
		background-color: #fd542c;
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
