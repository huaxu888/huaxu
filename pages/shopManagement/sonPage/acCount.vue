<template>
	<view>
		
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-white" style="border-bottom: 1upx solid #e4e4e4;" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">商户结算</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">商户结算</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view style="position: absolute;height: 800upx;width: 100%;" @tap="tiShi" v-if="SqSort == 1">
			
		</view>
		<view style="padding: 30upx;background-color: #ffffff;" >
			<view class="flex justify-between"style="margin-top: 20upx;">
				<view @tap="zkZh">
					<text class="hxIcon-dazhehuodong"></text>
					<text style="font-size: 28upx;margin-left: 16upx;color: #666666;">买单收款账户</text>
				</view>
				<view @tap="showTips">
					<text style="font-size: 26upx;color: #fe5479;">提现说明</text>
				</view>
			</view>
			
			<view class="flex justify-between" style="margin-top: 30upx;height: 70upx;line-height: 70upx;" @tap="zkZh">
				<view>
					<text>￥</text>
					<text style="font-size:48upx;font-weight: 600;">{{changeMoney(zkJin)}}</text>
				</view>
				<view>
					<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;"></text>
				</view>
			</view>
		</view>
		
		<view style="padding: 30upx;background-color: #ffffff;margin-top: 15upx;" >
			<view class="flex justify-between"style="margin-top: 20upx;">
				<view  @tap="zfZh">
					<text class="hxIcon-dazhehuodong"></text>
					<text style="font-size: 28upx;margin-left: 16upx;color: #666666;">自发券账户</text>
				</view>
			</view>
			
			<view class="flex justify-between" style="margin-top: 30upx;height: 70upx;line-height: 70upx;"  @tap="zfZh">
				<view>
					<text>￥</text>
					<text style="font-size:48upx;font-weight: 600;">{{changeMoney(zfJin)}}</text>
				</view>
				<view>
					<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;"></text>
				</view>
			</view>
		</view>
		
		<view style="padding: 30upx;background-color: #ffffff;margin-top: 15upx;" class="flex justify-center">
			<view style="width: 50%;margin-top: 14upx;" @tap="tgZh">
				<view>
					<view>
						<text style="font-size: 26upx;color: #666666;">团购账户</text>
					</view>
				</view>
				<view class="flex justify-between" style="margin-top: 30upx;height: 50upx;line-height: 50upx;">
					<view>
						<text>￥</text>
						<text style="font-size: 42upx;font-weight: 600;">{{changeMoney(tgJin)}}</text>
					</view>
					<view >
						<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;"></text>
					</view>
				</view>
			</view>
			
			<view style="width: 50%;margin-top: 14upx;margin-left: 40upx;" @tap="dxZh">
				<view>
					<view>
						<text style="font-size: 26upx;color: #666666;">短信账户</text>
					</view>
				</view>
				<view class="flex justify-between" style="margin-top: 30upx;height:50upx;line-height:50upx;">
					<view>
						<text style="font-size: 42upx;font-weight: 600;">{{SmsCount}}</text>
					</view>
					<view>
						<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;"></text>
					</view>
				</view>
			</view>
		</view>
		
		<view style="padding: 30upx;background-color: #ffffff;margin-top: 15upx;" class="flex justify-between" @tap="blank" v-if="SqSort != 1">
			<text style="font-size: 28upx;color: #666666;">银行卡管理</text>
			<text style="font-size: 26upx;color: #999999;" v-if="BankNo == false">
				暂未绑定<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;"></text>
			</text>
			<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;" v-if="BankNo"></text>
		</view>
		
		<view style="padding: 30upx;background-color: #ffffff;margin-top: 15upx;" class="flex justify-between" @tap="zhiFu" v-if="SqSort != 1">
			<text style="font-size: 28upx;color: #666666;">支付宝管理</text>
			<text style="font-size: 26upx;color: #999999;" v-if="ZhiFuBaoNo == false">
				暂未绑定<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;"></text>
			</text>
			<text class="hxIcon-rightArrow" style="font-size: 26upx;margin-left: 8upx;color: #bbb;" v-if="ZhiFuBaoNo"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ZhiFuBaoNo:this.$store.state.userInfo.ZhiFuBaoNo,
				tgJin:0,
				zfJin:0,
				zkJin:0,
				StoreID: 0,
				SqSort:0,
				BankName:'',
				BankNo:'',
				BankUserName:'',
				SmsCount:0
			}
		},
		onShow() {
			
		},
		onLoad(route) {
			console.log(route);
			this.SqSort = route.SqSort
			this.StoreID = route.StoreID
			this.$http.ziJin(this.$store.state.userInfo.ID,route.StoreID).then(res => {
				console.log(res);
				this.zkJin = res.wxf
				this.zfJin = res.yhqwxf
				this.tgJin = res.tgwxf
				this.SmsCount = res.SmsCount
			})
			
			this.$Request.get(this.$store.state.getShopBankList,{StoreID: this.StoreID}).then(res=>{
				console.log(res);
				this.BankName = res.Data[0].BankName
				this.BankNo = res.Data[0].BankNo
				this.BankUserName = res.Data[0].BankUserName
			})
				
		},
		methods: {
			sss(){
				uni.showToast({
					icon:'none',
				    title: `功能暂未开放，敬请期待！`,
				    duration: 5000
				});
			},
			times() {
				var date = new Date();
				date.setDate(date.getDate() + 3);
				return date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate()
			},
			showTips() {
				uni.showToast({
					icon:'none',
				    title: `当前提现到账时间为${this.times()}，周末及节假日顺延`,
				    duration: 5000
				});
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			zkZh(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/accountNum/zkZh?zkJin=${this.zkJin}&StoreID=${this.StoreID}`
				})
			},
			zfZh(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/accountNum/zfZh?zfJin=${this.zfJin}&StoreID=${this.StoreID}`
				})
			},
			tgZh(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/accountNum/tgZh?tgJin=${this.tgJin}&StoreID=${this.StoreID}`
				})
			},
			dxZh(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/accountNum/dxZh?SmsCount=${this.SmsCount}&StoreID=${this.StoreID}`
				})
			},
			blank(){
				uni.navigateTo({
					url:`/pages/person/bankCards?StoreID=${this.StoreID}`
				})
			},
			zhiFu(){
				uni.navigateTo({
					url:'/pages/person/bindzhiFu'
				})
			},
			tiShi(){
				uni.showToast({
					icon:'none',
				    title: `您是收营员，暂无查看此功能的权限！`,
				    duration: 5000
				});
			}
		},
		onPullDownRefresh() { //下拉时刷新
			
		},
		onReachBottom() { //上拉加载
			
		},
		components: {
			
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	page{
		background-color: #f2f2f2;
	}
</style>
