<template>
	<view>
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		<view v-if="!showLoading">
			<cu-custom bgColor="bg-whitesss" :isBack="true" class="">
				<block slot="content">{{storename}}</block>
			</cu-custom>
			
			<view class="flex" style="border-bottom: 1.5upx solid #e4e4e4;margin: 0 30upx;padding-top: 30upx;padding-bottom: 30upx;">
				<view style="">
					<image :src="inObj.Logo" mode="scaleToFill" style="width: 180upx;height: 180upx;border-radius: 10upx;"></image>
				</view>
				<view style="margin-left: 25upx;">
					<view style="font-size: 28upx;">
						<text>{{yinHangs(inObj.Title)}}</text>
					</view>
					<view class="flex " style="font-size: 24upx;color: #999999;">
						<view v-if="inObj.IsRefund" class="flex" style="height: 40upx;line-height: 40upx;">
							<text>可退款</text>
						</view>
						<view  v-if="inObj.IsGive" style="margin-left: 20upx;height: 40upx;line-height: 40upx;">
							<text>|</text>
						</view>
						<view v-if="inObj.IsGive" style="margin-left: 20upx;height: 40upx;line-height: 40upx;">
							<text>可转赠</text>
						</view>
						<view v-if="inObj.IsLimit" style="margin-left: 20upx;height: 40upx;line-height: 40upx;">
							<text>|</text>
						</view>
						<view v-if="inObj.IsLimit" style="margin-left: 20upx;height: 40upx;line-height: 40upx;">
							<text>不限购</text>
						</view>
					</view>
					<view style="color: #fe4e01;margin-top: 30upx;">
						<text style="font-size: 30upx;">￥</text>
						<text style="font-size: 40upx;font-weight: 600;">{{changeMoney(inObj.DiscountedPrice)}}</text>
					</view>
				</view>
			</view>
			
			<view class="flex justify-between padding align-center" style="padding-top: 40upx;padding-bottom: 40upx;">
				<view class="flex align-center">
					<view>
						<text style="color: #333333;">
							数量选择
						</text>
					</view>
					<view>
						<text style="color: #999999;font-size: 24upx;">
							(剩{{suns}}件)
						</text>
					</view>
				</view>
				<view class="flex align-center justify-end menu-operate">
					<text class="hxIcon-orderSub sub-Dish" style="font-size: 64upx; color: #dddddd;"  @tap="subDish()"></text>
					<text class="margin-lr-sm" style="font-size:36upx;color: #666666;" >{{nums}}</text>
					<text class="hxIcon-orderAdd add-Dish" style="font-size: 64upx; color: #fed942;"  @tap="addDish()"></text>
				</view>
				
			</view>
			
			
			<view style="background-color: #f2f2f2;height: 20upx;">
				
			</view>
			
			<view style="padding: 30upx;">
				<view class="flex justify-between" style="border-bottom: 1.5upx solid #e4e4e4;margin-top: 10upx;padding-bottom: 30upx;">
					<view>
						<text>姓名</text>
					</view>
					<view>
						<text>{{nickName}}</text>
					</view>
				</view>
				<view class="flex justify-between" style="border-bottom: 1.5upx solid #e4e4e4;margin-top: 40upx;padding-bottom: 30upx;">
					<view>
						<text>手机</text>
					</view>
					<view>
						<text>{{IDs}}</text>
					</view>
				</view>
				<!-- <view style="border: 1.5upx solid #e4e4e4;border-radius: 10upx;padding: 30upx;margin-top: 30upx;height: 240upx;">
					<textarea value="" placeholder="填写备注" placeholder-style="font-size:24upx;" />
				</view> -->
			</view>
			
			<view style="position: absolute;bottom: 30upx;height: 100upx;line-height: 100upx;" class="flex">
				<view style="width: 375upx;padding-left: 30upx;">
					<text>合计:</text>
					<text style="color: #fe4e01;font-size: 30upx;margin-left: 10upx;">￥</text>
					<text style="color: #fe4e01;font-size: 42upx;font-weight: 600;">{{changeMoney(zongHe)}}</text>
				</view>
				
				<view style="width: 375upx;background-color: #fe4e01;color: #ffffff;text-align: center;font-size: 32upx;" @tap="zhiFu">
					<text>确认支付</text>
				</view>
				
				<view class="cu-modal" style="width: 750upx;" :class="modalName==true?'show':''">
					<view class="cu-dialogs" style="width: 524upx;border-radius: 20upx;">
						<view class="bg-img" style="background-image: url('https://img.huaxuapp.com/wzftc_03.png');height:534upx;width: 524upx;background-repeat: no-repeat;background-size: cover;">
							<view class="cu-bar justify-end text-white">
								<view class="action" @tap="hideModal"></view>
							</view>
						</view>
						<view>
							<view @tap="detailOrder" style="z-index: 9;font-size: 26upx;position: absolute;bottom: 60upx;width: 170upx;left: 60upx; border-radius: 50upx; height: 70upx;color: #333333; border: 1.5upx solid #777777;text-align: center;line-height: 70upx;">
								<text>取消订单</text>
							</view>
							<view @tap="gotoBuy" style="font-size: 26upx;position: absolute;width: 170upx;bottom: 60upx;right: 60upx; border-radius: 50upx; height: 70upx;color: #FFFFFF; background-color: #fe4e01;text-align: center;line-height: 70upx;">
								<text>立即支付</text>
							</view>
						</view>
					</view>
					<!-- <view class="cu-bar action margin-0 flex-sub  solid-left" style="position: absolute;bottom: 170upx;left: 320upx;z-index: 2;">
						<view @click.native.stop="hideModal">
							<text class="cuIcon-roundclosefill" style="font-size: 80upx;color: #ffffff;"></text>
						</view>
					</view> -->
				</view>
			</view>
			
			<u-popup mode="bottom" v-model="shows" border-radius="40" height="600upx" :mask="true" :safe-area-inset-bottom="true">
				<view class="margin text-bold text-lg"> 
					请选择支付方式
				</view>
				<view>
					<payradio @getRadio="getRadio" :radio='radio' :yue="false"></payradio>
				</view>
				<view class="sure" @tap="Apppay">确认支付</view> 
			</u-popup>
		</view>
	</view>
</template>

<script>
	import { tgPays } from '@/common/handle.js'
	import { tgAppPays } from '@/common/handle.js'
	import { tgAlipays } from '@/common/handle.js'
	import payradio from '@/components/payRadio/payRadio.vue'
	export default {
		components: {
			payradio
		},
		data() {
			return {
				nickName:this.$store.state.userInfo.Nick ,
				IDs:this.$store.state.userInfo.No,
				inObj:[],
				storename:'',
				suns:0,
				nums:1,
				zongHe:0,
				tcId: 0,
				shows: false,
				modalName: null,
				Ids: 0,
				storeid:0,
				showLoading: true, //控制加载中的flag
				CustomBar:this.CustomBar,
				radio: 3,
			}
		},
		onLoad(option) {
			this.tcId = option.tcId
			this.storeid = option.storeid
			this.$http.tcXq(option.tcId).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.inObj = res.SetDataMeal
					this.suns = Number(res.SetDataMeal.TotalNum) - Number(res.SetDataMeal.GetNum)
					this.zongHe = res.SetDataMeal.DiscountedPrice
					this.showLoading = false
				} else {
					this.showLoading = true
				}
			})
			
			this.$http.shangjia(option.storeid, this.$store.state.userInfo.ID).then(resa => {
				console.log(resa);
				this.storename = resa.StoreName
			})
			
		},
		onShow() {
			this.$http.cxWzf(this.$store.state.userInfo.ID, this.tcId).then(res => {
				if(res.IsSuccess){
					this.Ids = res.Data.Id
					this.showModals(true)
				} else {
					return
				}
			})
		},
		methods: {
			getRadio(e) {
				console.log(e);
				this.radio = e.radio;
			},
			detailOrder() {
				console.log('145156');
				this.$http.detailOrder(this.Ids).then(res => {
					
					if(res.IsSuccess){
						this.$api.msg(res.Msg,2000)
						this.hideModal()
						this.$http.tcXq(this.tcId).then(res => {
							if(res.IsSuccess){
								this.inObj = res.SetDataMeal
								this.suns = Number(res.SetDataMeal.TotalNum) - Number(res.SetDataMeal.GetNum)
								this.zongHe = res.SetDataMeal.DiscountedPrice
								this.$http.shangjia(res.SetDataMeal.StoreID, this.$store.state.userInfo.ID).then(res => {
									console.log(res);
									this.storename = res.StoreName
								})
							}
						})
					}
				})
			},
			gotoBuy() {
				uni.navigateTo({
					url:'/pages/shopDetail/orderDtime?Ids=' + this.Ids + '&storeid=' + this.storeid + '&tcId=' + this.tcId
				})
			},
			showModals(e) {
				this.modalName = e
			},
			hideModal(e) {
				this.modalName = null
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			yinHangs(bankNumber){
				if(bankNumber.length > 34){
					return bankNumber.substr(0,34)+"...";
				} else {
					return bankNumber;
				}
			},
			zhiFu(){
				// #ifndef APP-PLUS || H5
				this.$http.giveOrder(this.$store.state.userInfo.ID,this.tcId,this.nums,this.zongHe,this.IDs).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.Ids = res.Data.Id
						this.$http.tcXq(this.tcId).then(res => {
							if(res.IsSuccess){
								console.log(res);
								this.inObj = res.SetDataMeal
								this.suns = Number(res.SetDataMeal.TotalNum) - Number(res.SetDataMeal.GetNum)
								
								this.$http.shangjia(res.SetDataMeal.StoreID, this.$store.state.userInfo.ID).then(res => {
									console.log(res);
									this.storename = res.StoreName
								})
								
								tgPays(this.Ids, this.zongHe, '团购套餐',this.storeid,this.tcId).then(res => {
									console.log(res);
									uni.redirectTo({
										url:'/pages/shopDetail/successPay?Ids=' + this.Ids
									})
								}).catch( err => {
									console.log('微信支付失败：', err);
								})
							}
						})
					} else {
						this.Ids = res.Data.Id
					}
				})
				// #endif
				
				// #ifdef APP-PLUS || H5
				this.shows = true
				// #endif
			},
			Apppay(){
				if(this.radio == 3) {
					this.$http.giveOrder(this.$store.state.userInfo.ID,this.tcId,this.nums,this.zongHe,this.IDs).then(res => {
						console.log(res);
						if(res.IsSuccess){
							this.Ids = res.Data.Id
							this.$http.tcXq(this.tcId).then(res => {
								if(res.IsSuccess){
									console.log(res);
									this.inObj = res.SetDataMeal
									this.suns = Number(res.SetDataMeal.TotalNum) - Number(res.SetDataMeal.GetNum)
									
									this.$http.shangjia(res.SetDataMeal.StoreID, this.$store.state.userInfo.ID).then(res => {
										console.log(res);
										this.storename = res.StoreName
									})
									tgAppPays(this.Ids, this.zongHe, '花蓄限时抢购',this.storeid,this.tcId).then(res => {
										console.log(res);
										uni.redirectTo({
											url:'/pages/shopDetail/successPay?Ids=' + this.Ids
										})
									}).catch( err => {
										console.log('支付失败：', err);
									})
								}
							})
						} else {
							this.Ids = res.Data.Id
						}
					})
				} else {
					this.$http.giveOrder(this.$store.state.userInfo.ID,this.tcId,this.nums,this.zongHe,this.IDs).then(res => {
						console.log(res);
						if(res.IsSuccess){
							this.Ids = res.Data.Id
							this.$http.tcXq(this.tcId).then(res => {
								if(res.IsSuccess){
									console.log(res);
									this.inObj = res.SetDataMeal
									this.suns = Number(res.SetDataMeal.TotalNum) - Number(res.SetDataMeal.GetNum)
									
									this.$http.shangjia(res.SetDataMeal.StoreID, this.$store.state.userInfo.ID).then(res => {
										console.log(res);
										this.storename = res.StoreName
									})
									tgAlipays(this.Ids, this.zongHe, '花蓄限时抢购',this.storeid,this.tcId).then(res => {
										console.log(res);
										uni.redirectTo({
											url:'/pages/shopDetail/successPay?Ids=' + this.Ids
										})
									}).catch( err => {
										console.log('支付失败：', err);
									})
								}
							})
						} else {
							this.Ids = res.Data.Id
						}
					})
				}
			},
			addDish() {
				if(this.suns > 1 && this.nums < this.suns){
					this.nums++
				}
				this.zongHe = Number(this.nums) * Number(this.inObj.DiscountedPrice)
			},
			subDish() {
				this.nums--
				if(this.nums <= 0){
					this.nums = 1
				}
				this.zongHe = Number(this.nums) * Number(this.inObj.DiscountedPrice)
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	page {
		background: #FFFFFF;
	}
	
	.cu-dialogs{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		border-radius: 10upx;
		overflow: hidden;
	}
	
	.sure {
		height: 70upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #f88160, #ff5b2e);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
		position: absolute;
		bottom: 100upx;
		width: 690upx;
		margin-left: 30upx;
	}
</style>
