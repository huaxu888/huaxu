<template>
	<view>
		<view v-if="showLoading">
			<load-ing></load-ing>
		</view>
		
		<view style="position: relative;" v-if="!showLoading">
			<!-- #ifndef MP-ALIPAY -->
			<cu-custom bgColor="bg-whitesss" :isBack="true" class="">
				<block slot="content">花蓄优选 - 限时抢购</block>
			</cu-custom>
			<!-- #endif -->
			
			<view class="text-center">
				<view style="font-size: 28upx;margin-top: 80upx;">
					<text>剩余时间</text>
				</view>
				
				<view style="font-size: 70upx;font-weight: 600;margin-top: 40upx;margin-bottom: 40upx;">
					<text>{{countdown}}</text>
				</view>
				<view class="flex justify-center" @tap="detailOrder" v-if="!detailOrdershow">
					<view style="width: 170upx;height: 64upx;line-height: 64upx;border: 2upx solid #EEEEEE;border-radius: 50upx;font-size: 24upx;color: #999999;">
						<text style="">取消订单</text>
					</view>
				</view>
				
				<view class="flex justify-center" v-if="detailOrdershow">
					<view style="width: 320upx;height: 64upx;line-height: 64upx;border: 1upx solid #fe4e01;border-radius: 50upx;font-size: 24upx;color: #fe4e01;">
						<text style="">订单已过期，请重新下单</text>
					</view>
				</view>
			</view>
			
			<view class="flex" style="border-bottom: 1upx solid #eeeeee;margin: 0 30upx;padding-top: 70upx;padding-bottom: 30upx;">
				<view style="">
					<image :src="tcList.Imge" mode="scaleToFill" style="width: 180upx;height: 180upx;border-radius: 10upx;"></image>
				</view>
				<view style="margin-left: 25upx;">
					<view style="font-size: 28upx;">
						<text>{{yinHangs(tcList.SetMealName)}}</text>
					</view>
				</view>
			</view>
			
			<view style="background-color: #f2f2f2;height: 20upx;">
				
			</view>
			
			<view style="padding: 30upx;padding-bottom: 200upx;">
				<view class="flex justify-between" style="border-bottom: 1upx solid #eeeeee;margin-top: 10upx;padding-bottom: 30upx;">
					<view>
						<text>数量选择</text>
					</view>
					<view>
						<text>x{{objects.Data.Num}}</text>
					</view>
				</view>
				<view class="flex justify-between" style="border-bottom: 1upx solid #eeeeee;margin-top: 40upx;padding-bottom: 30upx;">
					<view>
						<text>小计</text>
					</view>
					<view>
						<text>￥{{changeMoney(objects.Data.TotalPrice)}}</text>
					</view>
				</view>
				<view class="flex justify-between" style="border-bottom: 1upx solid #eeeeee;margin-top: 40upx;padding-bottom: 30upx;">
					<view>
						<text>实付金额</text>
					</view>
					<view>
						<text style="color: #fe4e01;">￥{{changeMoney(objects.Data.TotalPrice)}}</text>
					</view>
				</view>
				<view class="flex justify-between" style="border-bottom: 1upx solid #eeeeee;margin-top: 40upx;padding-bottom: 30upx;">
					<view>
						<text>姓名</text>
					</view>
					<view>
						<text>{{objects.name}}</text>
					</view>
				</view>
				<view class="flex justify-between" style="border-bottom: 1upx solid #eeeeee;margin-top: 40upx;padding-bottom: 30upx;">
					<view>
						<text>手机</text>
					</view>
					<view>
						<text>{{objects.phone}}</text>
					</view>
				</view>
				<!-- <view class="flex justify-between" style="border-bottom: 1upx solid #eeeeee;margin-top: 40upx;padding-bottom: 30upx;">
					<view>
						<text>备注</text>
					</view>
					<view>
						<text>{{nickName}}</text>
					</view>
				</view> -->
			</view>
			
			<view style="position: fixed;bottom: 0;height: 100upx;line-height: 100upx;background-color: #FFFFFF;z-index: 2;" class="flex">
				<view style="width: 375upx;padding-left: 30upx;">
					<text>合计:</text>
					<text style="color: #fe4e01;font-size: 30upx;margin-left: 10upx;">￥</text>
					<text style="color: #fe4e01;font-size: 42upx;font-weight: 600;">{{zongHe}}</text>
				</view>
				<view style="width: 375upx;background-color: #fe4e01;color: #ffffff;text-align: center;font-size: 30upx;" @tap="zhiFu">
					<text>确认支付</text>
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
				h:14,
				m:59,
				s:59,
				countdown: '',
				day: '',
				time: '',
				minute: '',
				second: '',
				timer: null ,//重复执行	
				Ids:0,
				objects:{},
				tcList:{},
				storeid:0,
				tcId:0,
				dates:'',
				detailOrdershow:false,
				zongHe:0,
				showLoading: true, //控制加载中的flag
				radio: 3,
			}
		},
		onLoad(option) {
			this.timer = setInterval(()=>{
				this.showtime()
			},30)
			
			this.Ids = option.Ids
			this.storeid = option.storeid
			this.tcId = option.tcId
			
			this.$http.cxuserTc(this.$store.state.userInfo.ID,option.Ids).then(res => {
				console.log(res);
				this.getTime(res.Data.EndDate)
				if(res.IsSuccess){
					this.objects = res
					this.tcList = res.Data.BLI[0]
					console.log(this.objects);
					this.zongHe = this.changeMoney(res.Data.TotalPrice)
					this.showLoading = false
				} else {
					this.showLoading = true
				}
			})
		},
		onShow() {
			
		},
		onReady() {
			
		},
		methods: {
			getRadio(e) {
				console.log(e);
				this.radio = e.radio;
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
				
				this.dates = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + se
				
			},
			checkAddZone(num) {
				return num < 10 ? '0' + num.toString() : num
			},
			detailOrder() {
				uni.showModal({
					content: '是否确认取消该订单',
					cancelText: '再想想',
					confirmText: '确定',
					confirmColor:'#fe4e01',
					success: res => {
						if (res.confirm) {
							this.$http.detailOrder(this.Ids).then(res => {
								if(res.IsSuccess){
									uni.redirectTo({
										url:'/pages/shopDetail/shopDetailsorder?storeId=' + this.storeid + '&tcID=' + this.tcId
									})
									this.$api.msg(res.Msg,2000)
								}
							})
						}
					},
				});
			},
			yinHangs(bankNumber){
				if(bankNumber.length > 34){
					return bankNumber.substr(0,34)+"...";
				} else {
					return bankNumber;
				}
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			showtime () {
				var nowtime = new Date(),  //获取当前时间
					endtime = new Date(this.dates);  //定义结束时间
	
				var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
					leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
					lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
					leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
					lefts = Math.floor(lefttime/1000%60);  //计算秒数
					
				if(lefttime <= 0){
					this.detailOrdershow = true
					this.countdown = '00:00:00'
				} else {
					if(lefth<10){
						lefth='0'+lefth;
					}
					if(leftm<10){
						leftm='0'+leftm;
					}
					if(lefts<10){
						lefts='0'+lefts;
					}
					this.countdown =  lefth + ":" + leftm + ":" + lefts;  //返回倒计时的字符串
					this.detailOrdershow = false
				}
			},
			functionS() {
				setInterval(() => {
					this.s>0?this.s--:this.s=59;
					if(this.s==59){
						if(this.m=="00")
							this.h--;
						this.m--;
					}
					this.m>=0?this.m=this.m-0:this.m=59;
					this.s>=0?this.s=this.s-0:this.s=59;
					this.h=this.h-0;
					if(this.s<10)
						this.s='0'+this.s;
					if(this.m<10)
						this.m='0'+this.m;
					if(this.h<10)
						this.h='0'+this.h;	
					this.time=this.h+":"+this.m+":"+this.s;
				},1000)
			},
			zhiFu(){
				// #ifndef APP-PLUS || H5
				if(this.detailOrdershow){
					this.$api.msg('支付超时，请重新下单')
				} else {
					tgPays(this.Ids, this.zongHe, '团购套餐',this.storeid,this.tcId).then(res => {
						console.log(res);
						uni.redirectTo({
							url:'/pages/shopDetail/successPay?Ids=' + this.Ids
						})
					}).catch( err => {
						console.log('微信支付失败：', err);
					})
				}
				// #endif
				
				// #ifdef APP-PLUS || H5
				this.shows = true
				// #endif
			},
			Apppay(){
				if(this.detailOrdershow){
					this.$api.msg('支付超时，请重新下单')
				} else {
					if(this.radio == 3) {
						tgAppPays(this.Ids, this.zongHe, '花蓄限时抢购',this.storeid,this.tcId).then(res => {
							console.log(res);
							uni.redirectTo({
								url:'/pages/shopDetail/successPay?Ids=' + this.Ids
							})
						}).catch( err => {
							console.log('支付失败：', err);
						}) 
					} else {
						tgAlipays(this.Ids, this.zongHe, '花蓄限时抢购',this.storeid,this.tcId).then(res => {
							console.log(res);
							uni.redirectTo({
								url:'/pages/shopDetail/successPay?Ids=' + this.Ids
							})
						}).catch( err => {
							console.log('支付失败：', err);
						})
					}
				}
			},
			addDish(e, dishItem) {
				if (this.isAnimation) {
					return
				}
			
				this.isAnimation = true;
			
				if (!this.basketList.shopContent) {
					this.basketList.storeId = this.storeId
					this.basketList.price = this.sumMoney
					this.basketList.shopContent = []
				}
				let isFind = false
				isFind = this.basketList.shopContent.some((item, index) => {
					if (item.WMInfoID == dishItem.WMInfoID) {
						item.selectCount++;
						return true
					}
				})
			
				if (!isFind) {
					dishItem.selectCount = 1
					this.basketList.shopContent = [...this.basketList.shopContent, dishItem]
				}
			
				this.sumMoney = this.$api.accAdd(this.sumMoney, dishItem.Price ? dishItem.Price : 0)
				this.basketList.price = this.sumMoney
				// this.sumMoney += dishItem.Price
			
				this.$refs.inCart.addToCart(e, dishItem.WMInfoID);
				this.cuteTagsum += 1;
				this.$store.commit('setOrderList', this.basketList)
				setTimeout(() => {
					this.isAnimation = false;
				}, 400);
			
			},
			subDish(dishItem) {
				if (this.cuteTagsum >= 0) {
					this.cuteTagsum -= 1;
					if (this.basketList.shopContent.length > 0) {
						let isFind = false
						isFind = this.basketList.shopContent.some((item, index) => {
							if (!this.chooseGGobj.title && item.Tags.title && item.Tags.title == dishItem.Tags.title) {
								item.selectCount--;
								dishItem.selectCount = item.selectCount;
								if (item.selectCount == 0) {
									this.showOption = false; //关闭加减的操作
									this.basketList.shopContent.splice(index, 1); //删除对象
								}
								return true
							}
							if (this.chooseGGobj.title && item.Tags.title && this.chooseGGobj.title == item.Tags.title) {
								//这个操作是在规格详情操作
								item.selectCount--;
								dishItem.selectCount = item.selectCount;
								if (item.selectCount == 0) {
									this.showOption = false; //关闭加减的操作
									this.basketList.shopContent.splice(index, 1)
			
								}
								return true
							}
							if (!this.chooseGGobj.title && !dishItem.Tags.title && item.WMInfoID == dishItem.WMInfoID) {
								item.selectCount--;
								if (item.selectCount == 0) {
									this.showOption = false; //关闭加减的操作
									this.basketList.shopContent.splice(index, 1)
			
								}
								return true
							}
			
						});
			
						if (this.basketList.shopContent.length <= 0) {
							this.popupShow = false
						}
			
						if (this.chooseGGobj.title) {
							this.sumMoney = this.$api.accSub(this.sumMoney, this.chooseGGobj.price ? this.chooseGGobj.price : 0);
						} else if (dishItem.Tags.title) {
							this.sumMoney = this.$api.accSub(this.sumMoney, dishItem.Tags.price ? dishItem.Tags.price : 0);
						} else {
							this.sumMoney = this.$api.accSub(this.sumMoney, dishItem.Price ? dishItem.Price : 0);
						}
			
						if (this.sumMoney <= 0) {
							this.sumMoney = 0;
						}
						this.basketList.price = this.sumMoney
						this.$store.commit('setOrderList', this.basketList)
						// this.sumMoney -= dishItem.Price
					}
				}
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
