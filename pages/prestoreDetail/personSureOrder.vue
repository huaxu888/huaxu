<template>
	<view>
		<view v-if="!showFlag" style="background-color: #ffffff;">
			<view class="align-center" style="text-align: center;padding-bottom: 50upx;">
				<view class="flex  justify-center" style="padding-top: 40upx;">
					<image :src="objects.OldUserPoto" mode="" style="width: 140upx;height: 140upx;border-radius: 70upx;"></image>
				</view>
				<view style="font-size: 30upx;color: #000000;margin-top: 30upx;">
					{{objects.OldUserName}}
				</view>
				<view style="font-size: 28upx;color: #777777;margin-top: 20upx;">
					“我在【花蓄】购买了活动商品，赠送给你”
				</view>
			</view>
			
			<view class="padding" style="background-color: #ffffff;padding-top: 0;padding-top: 20upx;">
				<view style="padding-bottom: 50upx;border-radius: 10upx;width: 690upx;padding-top: 0upx;background-color: #ffffff;-moz-box-shadow:0px 0px 4px 0px #E4E4E4;-webkit-box-shadow:0px 0px 4px 0px #E4E4E4;box-shadow:0px 0px 4px 0px #E4E4E4;">
					<view class="" style="background-color: #ffffff;padding-bottom: 0upx;">
						<image :src="tcList.Imgs" mode="scaleToFill" style="width: 690upx;height: 390upx;border-radius: 10upx;"></image>
					</view>
				
					<view class="" style="padding-bottom: 30upx;border-radius:0 0 10upx 10upx;background-color: #ffffff;margin-top: 0upx;padding-top: 10upx; ">
						<view class="flex justify-between align-center" style="padding-top: 4upx;">
							<view class="flex align-center" style="color: #999999;font-size: 24upx;">
								<view style="width: 6upx;height:24upx;background-color: rgb(254, 217, 66);"></view>
								
							</view>
							
						</view>
						
						<view class="flex justify-between align-center" style="padding: 15upx;margin-top: 4upx;">
							<view class="flex justify-between align-center" style="">
								<text class="flex align-center" style="">
									<text class="shengLv" style="line-height: 50upx;align-self: center ;">
										<text class="" style="line-height: 36upx;background-color: #ffffff;font-size: 31upx;">
											{{tcList.Title}}
										</text>
									</text>
								</text>
							</view>
						</view>
						
						<view class="flex align-center justify-between" style="margin-top: 3upx;padding: 0 10upx;">
							<view class="flex align-center">
								<view  class="flex align-center" style="font-size: 26upx;color: #999999;">
									<text>总价：</text><text style="color: #f34e2d;font-size: 32upx;">￥{{changeMoney(objects.TotalMoney)}}</text>
								</view>
							</view>
							<view  class="flex align-center" style="font-size: 26upx;color: #999999;margin-right: 20upx;">
								<text>赠送份数：</text><text  style="color: #f34e2d;">{{objects.Nun}}</text>
							</view>
						</view>
					</view>
					<view v-if="IsZZ == 0 &&  ZZstate == 0" @tap="shouOrder" style="text-align: center;display: flex;justify-content: center;align-items: center;margin-top: 20upx;">
						<view style="border: none;background-color: rgba(0,0,0,0);outline: none;padding: 0;width: 500upx;height: 100upx;border-radius: 10upx;background: linear-gradient(to right, #f4cd55, #f7d859);font-size: 32upx;line-height: 100upx;">
							<text>立即收下</text>
						</view>
					</view>
					<view v-if="IsZZ == 0 && ZZstate == 1" @tap="shouOrder" style="text-align: center;display: flex;justify-content: center;align-items: center;margin-top: 20upx;">
						<view style="border: none;background-color: rgba(0,0,0,0);outline: none;padding: 0;width: 500upx;height: 100upx;border-radius: 10upx;background: linear-gradient(to right, #f4cd55, #f7d859);font-size: 32upx;line-height: 100upx;">
							<text>接收成功</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="flex" style="justify-content: center;text-align: center;margin-top: 20upx;"> 
				<view class="flex align-center" style="text-align: center;">
					<view style="height: 2upx;width: 100upx;background-color: #000;margin-right: 30upx;"></view>
					<view>
						<text>使用方法</text>
					</view>
					<view style="height: 2upx;width: 100upx;background-color: #000;margin-left: 30upx;"></view>
				</view>
			</view>
			
			<view class="flex" style="justify-content: center;text-align: center;margin-top: 10upx;padding-bottom: 40upx;">
				<view style="font-size: 24upx;color: #999999;margin-top: 30upx;">
					<text>向商家出示二维码。扫码后核销成功，不支持截图</text>
				</view>
			</view>
			
			<view style="height: 20upx;background-color: #f2f2f2;"></view>

			
			<view class="flex padding align-center">
				<view style="width: 12upx;height: 30upx;background-color: #f4cd55;border-radius: 20upx;">
					
				</view>
				<view style="font-size: 30upx;font-weight: 600;margin-left: 20upx;">
					<text>注意事项</text>
				</view>
			</view>
			
			<view style="width: 750upx;">
				<image :src="tcList.Notice" mode="widthFix" style="width: 750upx;"></image>
			</view>
			
			<view class="flex padding align-center" style="padding-bottom: 10upx;margin-top: 20upx;">
				<view style="width: 12upx;height: 30upx;background-color: #f4cd55;border-radius: 20upx;">
					
				</view>
				<view style="font-size: 30upx;font-weight: 600;margin-left: 20upx;">
					<text>商家信息</text>
				</view>
			</view>
			
			<view style="padding: 30upx;padding-bottom: 100upx;">
				<view class="" style="color: #202020;font-size: 36upx;font-weight: 600;">{{infoObject.StoreName}}</view>
				
				<view style="margin-top: 20upx;">
					<text class="hxIcon-tubiaozhizuomoban start-red" style="font-size:26upx;margin-left: 4upx" v-for="(it,i) in infoObject.StoreStart" :key="i"  v-if="(infoObject.StoreStart)>0"></text>
					<text class="hxIcon-tubiaozhizuomoban " style="font-size:26upx;color: #cccccc;margin-left: 4upx" v-for="(it,i) in (5-infoObject.StoreStart)" :key="i"  v-if="(5-infoObject.StoreStart)>0"></text>
				</view>
				<view style="font-size: 24upx;">
					<view class="flex" style="margin-top: 30upx;position: relative;">
						<view style="height: 50upx;line-height: 50upx;">
							<text class="hxIcon-shizhongnaolingjishixianshi" style="color: #333333;"></text>
							<text style="margin-left: 20upx;color: #777777;font-size: 26upx;">{{infoObject.StartWorkDate}} - {{infoObject.EndWorkDate}}</text>
							<text style="margin-left: 5upx;color: #777777;font-size: 26upx;">;</text>
							<text style="margin-left: 5upx;color: #777777;font-size: 26upx;"> {{infoObject.Phone}}</text>
							<view class="flex justify-center align-center"  @tap="callShop()" style="border: 2upx solid #fe4e01;position: absolute;right: 0;top: 0;width: 120upx;height: 48upx;line-height: 48upx;border-radius: 30upx;background-color: #ffffff;">
								<view style="font-size: 36upx;color: #fe4e01;">
									<text  class="hxIcon-tel-s" style="font-size: 36upx;"></text>
								</view>
								<view style="font-size: 20upx;">
									<text style="color: #fe4e01;">拨打</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex" style="margin-top: 20upx;position: relative;" @tap="openMap">
						<view class="flex" >
							<text class="hxIcon-dianpu3" style="color: #333333;"></text>
							<view style="width: 440upx;margin-left: 20upx;">
								<text style="color: #777777;font-size: 26upx;">{{infoObject.StoreAddress}}</text>
							</view>
							<view class="flex justify-center align-center" style="border: 2upx solid #fe4e01; position: absolute;right: 0;top: 0;width: 120upx;height: 48upx;line-height: 48upx;border-radius: 30upx;background-color: #ffffff;">
								<view style="font-size: 36upx;color: #fe4e01">
									<text  class="hxIcon-daohang" style="font-size: 36upx;"></text>
								</view>
								<view style="font-size: 20upx;">
									<text style="color: #fe4e01;">导航</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showFlag">
			<load-ing></load-ing>
		</view>
	</view>
</template>

<script>


	export default{
		data(){
			return{		
				infoObject: {},
				objects:{},
				Ids:'',
				tcList:[],
				scans:'',
				val:'',//二维码的值
				qrcode:{//二维码插件配置
					unit:'upx',
					size:240
				},
				olduserid:'',
				tcId:'',
				IsZZ:'',
				ZZstate:'',
				showFlag:true
			}
		},
		onLoad(route){
			
			console.log(route);
			this.Ids = route.buylistid
			this.olduserid = route.olduserid
			this.tcId = route.tcId
			this.$http.sureOrder(route.olduserid,route.buylistid).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.objects = res
					this.tcList = res.SetMeal
					console.log(this.objects);
					this.infoObject = res.Store
					console.log(this.infoObject);
					this.IsZZ = res.IsZZ
					this.ZZstate = res.ZZstate
					this.showFlag = false
				} else {
					this.$api.msg(res.Msg)
					this.showFlag = true
				}
			})
		},
		onShow(){
			
		},
		methods:{
			shouOrder(){
				if (this.$store.state.userInfo.ID) {
					this.$http.sureOrderchange(this.$store.state.userInfo.ID,this.olduserid,this.Ids).then(res => {
						if(res.IsSuccess){
							uni.redirectTo({
								url:'/pages/prestoreDetail/orderShow?Ids=' + this.Ids
							})
						} else {
							this.$api.msg(res.Msg,3000)
						}
					})
				} else {
					this.$api.msg('请先登录');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/common/login'
						})
					}, 1000);
				}
				
			},
			gotoTuikuan(e){
				console.log(e);
				uni.navigateTo({
					url:'/pages/shopDetail/refundTrade?orderid=' + e 
				})
			},
			callShop() {
				uni.makePhoneCall({
					phoneNumber: this.infoObject.Phone
				})
			},
			openMap() {
				this.$api.openMap(this.infoObject)
			},
			getTime: function (time) {
				let date = (time.split('(')[1].split(")")[0]) * 1
				return this.dateTimeFormatter(date)
			},
			dateTimeFormatter(t) {
				if (!t) return ''
				t = new Date(t).getTime()
				t = new Date(t)
				var year = t.getFullYear()
				var month = (t.getMonth() + 1)
				month = this.checkAddZone(month)
			
				var date = t.getDate()
				date = this.checkAddZone(date)
			
				var hour = t.getHours()
				hour = this.checkAddZone(hour)
			
				var min = t.getMinutes()
				min = this.checkAddZone(min)
			
				var se = t.getSeconds()
				se = this.checkAddZone(se)
				
				return year + '/' + month + '/' + date + ' ' + hour + ':' + min
				
			},
			checkAddZone(num) {
				return num < 10 ? '0' + num.toString() : num
			},
			qrR(e) {
				
			},
			changeBeTime(date) {
				if(date){
					return this.beTime(date)	
				}
			},
			gotos(){
				uni.switchTab({
					url:'/pages/index/index'
				})
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
			getStatus: function (status) {
				let result
				switch (status) {
					/// 默认为0:全部 1:待支付  2:支付超时 3:已取消  4:已删除 5:待使用 6:已完成 7:退款中 8:已退款
					case 1: 
						result = '待支付'
						break
					case 2:
						result = '支付超时'
						break;
					case 3:
						result = '已取消'
						break;
					case 4:
						result = '已删除'
						break;
					case 5:
						result = '待使用'
						break;
					case 6:
						result = '已完成'
						break;
					case 7:
						result = '退款中'
						break;
					case 8:
						result = '退款成功'
						break;
					case 9:
						result = '已过期'
						break;
					default:
						result = '未支付'
				}
				return result
			},
			getStatuss: function (status) {
				let result
				switch (status) {
					case 1: 
						result = '待核销'
						break
					case 2:
						result = '已核销'
						break;
					case 3:
						result = '退款中'
						break;
					case 4:
						result = '退款成功'
						break;
					case 5:
						result = '已过期'
						break;
				}
				return result
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
	
	.start-red{
		color: #fe4e01;
	}
	
	.couponss {
		background-color: rgba(51,51,51,0.5);
		line-height: 100upx;
		border-radius: 100upx;
		position: fixed;
		/* #ifdef H5 */
		bottom: 130rpx;
		/* #endif */
		/* #ifndef H5 */
		bottom: 200rpx;
		/* #endif */
		right: 60upx;
		width: 100upx;
		height: 100upx;
	}
	
	.banY {
		width:20upx;
		height:40upx; 
		background-color:#ffffff;
		border-radius:0 50upx 50upx 0; /* 左上、右上、右下、左下 */
		-moz-box-shadow:0px 0px 2px #e4e4e4; 
		-webkit-box-shadow:0px 0px 2px #e4e4e4; 
		box-shadow:0px 0px 2px #e4e4e4;
	}
	
	.banYs {
		width:20upx;
		height:40upx; 
		background-color:#ffffff;
		border-radius:50upx 0 0 50upx; /* 左上、右上、右下、左下 */
		-moz-box-shadow:0px 0px 2px #e4e4e4;
		-webkit-box-shadow:0px 0px 2px #e4e4e4; 
		box-shadow:0px 0px 2px #e4e4e4;
	}
	
	.banX {
		width:10upx;
		height:40upx; 
		background-color:#ffffff;
		border-radius:0 50upx 50upx 0; /* 左上、右上、右下、左下 */
	}
	
	.banXs {
		width:10upx;
		height:40upx; 
		background-color:#ffffff;
		border-radius:50upx 0 0 50upx; /* 左上、右上、右下、左下 */
	}
	
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>
