<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" style="color: #ffffff;" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">核销使用</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">核销使用</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<view class="margin flex justify-between" style="font-size: 30upx;padding-bottom: 30upx; border-bottom: 1.5upx solid #e4e4e4">
			<view>
				<text>订单详情</text>
			</view>
			<view style="color: #07903a;" v-if="objects.Data.Sort == 5">
				{{getStatus(objects.Data.Sort)}}
			</view>
			
			<view style="color: #fe4e01;" v-if="objects.Data.Sort != 5">
				{{getStatus(objects.Data.Sort)}}
			</view>
		</view>
		
		<view class="align-center" style="text-align: center;padding-bottom: 50upx;" v-if="objects.Data.Sort == 5">
			<view class="flex  justify-center" style="padding-top: 40upx;">
				<tki-qrcode  ref="qrcode" :val="val" :size="qrcode.size" :unit="qrcode.unit" :pdground="qrcode.pdground" @result="qrR"   style="width: 240upx;height: 240upx;" />	
			</view>
			<view style="font-size: 26upx;color: #fe4e01;padding-top: 30upx;">
				<text>
					有效期：{{getTime(objects.Data.AddDate)}} 一 {{getTime(objects.Data.EndDate)}}
				</text>
			</view>
		</view>
		
		<view class="align-center" style="text-align: center;padding-bottom: 50upx;" v-if="objects.Data.Sort == 6">
			<view class="flex  justify-center" style="padding-top: 40upx;position: relative;">
				<image src="https://img.huaxuapp.com/7321604990418_.pic_03.png" mode="scaleToFill" style="width: 260upx;height: 260upx;"></image>
				<view style="background-color: #eeeeee;position: absolute;z-index: 99;width: 260upx;height: 260upx;opacity: 0.8;"></view>
			</view>
			<!-- <view style="font-size: 26upx;color: #fe4e01;padding-top: 30upx;">
				<text>
					已使用
				</text>
			</view> -->
		</view>
		
		<view class="align-center" style="text-align: center;padding-bottom: 50upx;" v-if="objects.Data.Sort == 7">
			<view class="flex  justify-center" style="padding-top: 40upx;position: relative;">
				<image src="https://img.huaxuapp.com/7321604990418_.pic_03.png" mode="scaleToFill" style="width: 260upx;height: 260upx;"></image>
				<view style="background-color: #eeeeee;position: absolute;z-index: 99;width: 260upx;height: 260upx;opacity: 0.8;"></view>
			</view>
			<!-- <view style="font-size: 26upx;color: #fe4e01;padding-top: 30upx;">
				<text>
					退款中
				</text>
			</view> -->
		</view>
		
		<view class="align-center" style="text-align: center;padding-bottom: 50upx;" v-if="objects.Data.Sort == 8">
			<view class="flex  justify-center" style="padding-top: 40upx;position: relative;">
				<image src="https://img.huaxuapp.com/7321604990418_.pic_03.png" mode="scaleToFill" style="width: 260upx;height: 260upx;"></image>
				<view style="background-color: #eeeeee;position: absolute;z-index: 99;width: 260upx;height: 260upx;opacity: 0.8;"></view>
			</view>
			<!-- <view style="font-size: 26upx;color: #fe4e01;padding-top: 30upx;">
				<text>
					已退款
				</text>
			</view> -->
		</view>
		<!-- <view style="padding: 30upx;margin: 13upx; width: 724upx;height: 286upx;background-image: url(https://img.huaxuapp.com/hxk_03.png);background-repeat: no-repeat;background-size: cover;">
			<view class="margin flex justify-between align-center" style="font-size: 28upx;padding-bottom: 30upx;">
				<view>
					<text>核销码</text>
				</view>
				<view class="align-center" style="color: #999999;border: 1upx solid #666666;border-radius: 10upx;padding: 6upx 16upx;font-size: 24upx;text-align: center;">
					<text>申请退款</text>
				</view>
			</view>
			<view class="margin flex justify-between" style="padding-bottom: 30upx;margin-top: 50upx;">
				<view>
					<text style="font-size: 26upx;">核销码：</text>
					<text>59151551</text>
				</view>
				<view style="color: #07903a;">
					待消费
				</view>
			</view>
		</view> -->
		<view class="flex justify-center" style="margin: 30upx;-moz-box-shadow:0px 0px 2px #e4e4e4;-webkit-box-shadow:0px 0px 2px #e4e4e4; box-shadow:0px 0px 2px #e4e4e4;">
			<view style="width: 724upx;position: relative;padding-bottom: 14upx;">
				<view style="">
					<view style="background-color: #ffffff;position: absolute;left: -2upx;top: 95upx;">
						<view class="banY"></view>
					</view>
					<view style="background-color: #ffffff;position: absolute;left: -4upx;top: 95upx;">
						<view class="banX"></view>
					</view>
					<view style="border:2upx dashed #e4e4e4;height: 1upx;position: absolute;top: 115upx;left: 20upx; width: 650upx;"></view>
					<view style="background-color: #ffffff;position: absolute;right: -1upx;top: 95upx;">
						<view class="banYs"></view>
					</view>
					<view style="background-color: #ffffff;position: absolute;right: -4upx;top: 95upx;">
						<view class="banXs"></view>
					</view>
				</view>
				
				<view style="padding-bottom: 26upx;">
					<view class="margin flex justify-between align-center" style="font-size: 28upx;">
						<view>
							<text>核销码</text>
						</view>
						<view @tap="gotoTuikuan(objects.Data.Id)" v-if="objects.Data.Sort == 5" class="align-center" style="color: #999999;border: 2upx solid #666666;border-radius: 10upx;padding: 6upx 16upx;font-size: 24upx;text-align: center;">
							<text>申请退款</text>
						</view>
					</view>
				</view>
				
				<view class="margin flex justify-between" style="margin-top: 30upx;font-size: 26upx;" v-for="(item,i) in tcList" :key="i">
					<view>
						<text v-if="item.Sort == 1" style="font-size: 26upx;">核销码：</text>
						<text v-if="item.Sort == 1">{{item.Code}}</text>
						
						<text v-if="item.Sort != 1" style="color: #b5b5b5;font-size: 26upx;text-decoration: line-through;">核销码：</text>
						<text v-if="item.Sort != 1" style="color: #b5b5b5;text-decoration: line-through;">{{item.Code}}</text>
					</view>
					<view style="color: #07903a;" v-if="item.Sort == 1">
						{{getStatuss(item.Sort)}}
					</view>
					<view style="color: #b5b5b5;" v-if="item.Sort != 1">
						{{getStatuss(item.Sort)}}
					</view>
				</view>
				
			</view>
		</view>
		
		<view  v-if="objects.Data.Sort == 5 && objects.IsSend == 0" class="" style="text-align: center;display: flex;justify-content: center;align-items: center;margin-top: 20upx;">
			<button class="share-btn" open-type="share" style="border: none;background-color: rgba(0,0,0,0);outline: none;padding: 0;width: 500upx;height: 100upx;border-radius: 50upx;background: linear-gradient(to right, #f4cd55, #f7d859);font-size: 32upx;line-height: 100upx;">
				<text>转赠给好友</text>
			</button>
		</view>
		
		<view  v-if="objects.Data.Sort == 5 && objects.IsSend == 0" style="text-align: center;display: flex;justify-content: center;align-items: center;">
			<view style="font-size: 24upx;color: #999999;margin-top: 25upx;">
				<text>好友接收成功后，该订单可在【我的】 一 【我的转赠】中查看</text>
			</view>
		</view>
		
		
		<view class="flex" style="justify-content: center;text-align: center;margin-top: 70upx;"> 
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
		
		<view class="flex" style="margin: 0 30upx;padding-top: 30upx;padding-bottom: 30upx;">
			<view style="">
				<image :src="tcList[0].Imge" mode="scaleToFill" style="width: 160upx;height: 160upx;border-radius: 10upx;"></image>
			</view>
			<view style="margin-left: 25upx;position: relative;">
				<view style="font-size: 28upx;" class="shengLv">
					<text>{{tcList[0].SetMealName}}</text>
				</view>
				<view class="flex justify-between align-center" style="color: #999999;margin-top:60upx;">
					<view><text style="font-size: 24upx;text-decoration: line-through;">原价：￥{{changeMoney(tcList[0].Price)}}</text></view>
					<view style="color: #fe4e01;margin-left: 10upx;">
						<text style="font-size: 30upx;font-weight: 600;">实付款：</text>
						<text style="font-size: 30upx;font-weight: 600;">{{changeMoney(tcList[0].TotalPrice)}}</text>
					</view>
				</view>
				
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
			<image :src="objects.infoimg" mode="widthFix" style="width: 750upx;"></image>
		</view>
		
		<view class="flex padding align-center" style="padding-bottom: 10upx;margin-top: 20upx;">
			<view style="width: 12upx;height: 30upx;background-color: #f4cd55;border-radius: 20upx;">
				
			</view>
			<view style="font-size: 30upx;font-weight: 600;margin-left: 20upx;">
				<text>商家信息</text>
			</view>
		</view>
		
		<view style="padding: 30upx;">
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
		
		<view class="flex padding align-center" style="padding-bottom: 0;margin-top: 20upx;">
				<view style="width: 12upx;height: 30upx;background-color: #f4cd55;border-radius: 20upx;">
					
				</view>
			<view style="font-size: 30upx;font-weight: 600;margin-left: 20upx;">
				<text>订单信息</text>
			</view>
		</view>
		
		<view style="padding: 30upx;">
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">订单编号</text>
				<text style="color: #333333;">{{objects.Data.OrderNO}}</text>
			</view>
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">购买时间</text>
				<text style="color: #333333;">{{changeBeTime(objects.Data.AddDate)}}</text>
			</view>
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">商品数量</text>
				<text style="color: #333333;">{{objects.Data.Num}}</text>
			</view>
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">商品总价</text>
				<text style="color: #333333;">{{changeMoney(objects.Data.TotalPrice)}}</text>
			</view>
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">实付金额</text>
				<text style="color: #333333;">{{changeMoney(objects.Data.TotalPrice)}}</text>
			</view>
		</view>
		
		<view class="flex padding align-center" style="padding-bottom: 0;">
			<view style="width: 12upx;height: 30upx;background-color: #f4cd55;border-radius: 20upx;">
				
			</view>
			<view style="font-size: 30upx;font-weight: 600;margin-left: 20upx;">
				<text>用户信息</text>
			</view>
		</view>
		
		<view style="padding: 30upx;">
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">姓名</text>
				<text style="color: #333333;">{{objects.name}}</text>
			</view>
			<view class="flex justify-between aligen-center" style="font-size: 28upx;padding: 20upx 0;">
				<text style="color: #777777;">电话</text>
				<text style="color: #333333;">{{objects.phone}}</text>
			</view>
		</view>
		
		<view class="couponss flex " style="color: #ffffff;flex-direction: column;text-align: center;" @tap="gotos">
			<view class="hxIcon-shouye2" style="height: 30upx;font-size: 46upx;position: absolute;top: -16upx;left: 28upx;">
				
			</view>
			<view style="margin-top: 22upx;">
				<text style="font-size: 22upx;">首页</text>
			</view>
		</view>
	</view>
</template>

<script>


	export default{
		data(){
			return{		
				infoObject: {},
				objects:{},
				Ids:0,
				tcList:[],
				scans:'',
				val:'',//二维码的值
				qrcode:{//二维码插件配置
					unit:'upx',
					size:240
				},
				OrderNOs:0,
				userID:'',
				SetMealId:''
			}
		},
		onLoad(route){
			console.log(route);
			this.Ids = route.Ids
			this.$http.cxuserTc(this.$store.state.userInfo.ID,this.Ids).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.objects = res
					this.tcList = res.Data.BLI
					this.SetMealId = res.Data.BLI[0].SetMealId
					
					this.OrderNOs = res.Data.OrderNO
					console.log(this.objects);
					this.zongHe = this.changeMoney(res.Data.TotalPrice)
					
					this.$http.shangjia(res.Data.StoreID, this.$store.state.userInfo.ID).then(res => {
						console.log(res);
						this.infoObject = res
					})
					
					this.$http.tcScan(this.$store.state.userInfo.ID, this.Ids).then(res => {
						if(res.IsSuccess){
							this.val= res.Data
						}
					})
				}
			})
			
			this.userID = this.$store.state.userInfo.ID
			
		},
		onShow(){
			this.beTime()
		},
		methods:{
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
		},
		onShareAppMessage() {
			console.log(this.Ids);
			console.log(this.SetMealId);
			console.log(this.userID);
			return {
				title:this.tcList[0].SetMealName,
				path:'/pages/prestoreDetail/personSureOrder?olduserid=' + this.userID + '&buylistid=' + this.Ids + '&tcId=' + this.SetMealId,
				imageUrl:this.tcList[0].Imge,
				success: function (shareTickets) {
					this.$api.msg('转发成功')
					console.log(res + '成功')
				},
				fail: function (res) {
					this.$api.msg('转发失败，请重试')
					console.log(res + '失败')
				}
			}
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
