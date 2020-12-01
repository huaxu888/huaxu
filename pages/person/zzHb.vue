<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">增值</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">增值</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view style="background-color: #FFFFFF;margin-top: 20upx;text-align: center;padding-top: 30upx;margin-left: 30upx;margin-right: 30upx;border-radius:8upx;padding-bottom: 20upx;">
			<view >
				<text style="font-size: 28upx;" @click="showTips">待释放金额(元)</text><text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;" @click="showTips"></text>
			</view>
			<view style="margin-top: 30upx;">
				<text style="font-size: 64upx;font-weight: 600;">{{KeTiXian}}</text>
			</view>
			<view style="height: 40upx;line-height: 40upx;" @tap="zzZd()">
				<text style="font-size: 24upx;color: #999999;">账单 <text class="hxIcon-rightArrow" style="font-size: 24upx;"></text></text>
			</view>
		</view>
		
		<view style="background-color: #FFFFFF;margin: 30upx;padding: 30upx 20upx;border-radius:8upx;margin-top: 20upx;">
			<text style="font-weight: 600;font-size: 28upx;">增值有好礼</text>
			<view style="margin-top: 30upx;">
				<scroll-view scroll-x="true" class="scroll">
					<view v-for="(czJes,index) in czJes" :key="index" class="" 
					:class="index === selectedAmountIndex ? 'boxs' : 'box'" @tap="changeItem(index)" style="background-image: url(https://img.huaxuapp.com/czkl_03.png);
						background-repeat: no-repeat;background-size: cover;padding: 20upx;">
						<view style="margin-top: 6upx;position: relative;" >
							<text style="font-weight: 600;font-size: 48upx;">{{czJes}}</text>
							<text style="font-size: 24upx;margin-left: 2upx;">元</text>
							<text :class="index === selectedAmountIndex ? 'hxIcon-gou' : ''" style="position: absolute;right: 0;color:#ff5b2e;font-size: 38upx;"></text>
						</view>
						<view class=""  style="margin-top: 26upx;font-size: 24upx;">
							<text>充值{{czJes}}到账{{Jines[index]}}</text>
						</view>
					</view>       
				</scroll-view>
			</view>
			
			<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 50upx;"  @tap="open">
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-ALIPAY -->
			<view style="height: 70upx;line-height: 70upx;text-align: center;border: 1upx solid #CCCCCC;border-radius: 5upx;margin-top: 50upx;"  @tap="open">
				<text style="font-size: 28upx;">
					立即充值
				</text>
			</view>
			<!-- #endif -->
			
			<view style="margin-top: 30upx;text-align: center;" @tap="gotoXY">
				<text style="color: #999999;font-size: 22upx;">充值即表示同意</text>
				<text style="color: #f34e2d;font-size: 22upx;">《花蓄增值服务协议》</text>
			</view>
			
			<uni-popup ref="popup" :maskClick="true" type="center">
				<view style="width: 500upx;height: 320upx;" class="text-center">
					<view style="height: 80upx;margin-top: 20upx;font-size: 32upx;">请输入推荐人手机号:</view>
					<input style="border-bottom: 1upx solid #e4e4e4;height: 100upx;" type="text" value="" @input="changes" placeholder="(选填)"/>
					<view style="text-align: center;background-color:#fe4e01;margin-top: 60upx;color: #ffffff;height: 70upx;font-size: 28upx;width: 300upx;
					border-radius: 50upx;margin-left: 100upx;line-height: 70upx;" 
					@click="close"><text>确定</text></view>
				</view>
			</uni-popup>
			
			<u-popup mode="bottom" v-model="shows" border-radius="40" height="600upx" :mask="true" :safe-area-inset-bottom="true">
				<view class="margin text-bold text-lg"> 
					请选择充值方式
				</view>
				<view>
					<payradio @getRadio="getRadio" :radio='radio' :yue="false"></payradio>
				</view> 
				<view class="sure" @tap="Apppay">确认充值</view> 
			</u-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import payradio from '@/components/payRadio/payRadio.vue'
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment,
		decrypt,
		wxAppletsJFPay,
		wxAppletsRechargePay,
		alipayAppletsPays,
		zzhbalipayApp,
		wxAppJFPays
	} from '../../common/handle.js'
	export default {
		components: {
			payradio
		},
		data() {
			return {
				czJes:[],
				Jines:[],
				selectedAmountIndex: 0,// 当前选中的充值金额序号，默认为 1 , 即 10
				// #ifdef H5
				rechargeWayList: ['微信', '支付宝'],// 支付方式 (仅支持 APP 和 H5)
				rechargeWay: 0,// 选中的支付方式，默认为 0 , 即微信支付 (仅支持 APP 和 H5)
				// #endif
				KeTiXian:0,
				XiaoFeiScore:0,
				parentid: "",
				modalName: null,
				shows: false,
				radio: 3,
			}
		},
		async onShow() {
			await this.getBalance();
		},
		onLoad() {
			
			this.$http.jfList().then(res => {
				console.log(res);
					res.forEach(r=>{
						this.czJes.push(r.RealMoney)
						this.Jines.push(r.HasMoney)
					})
				})
				.catch(err => {
					console.log(err);
				})
			
		},
		methods: {
			Apppay(){ 
				if(this.radio == 3) { 
					let amount = this.czJes[this.selectedAmountIndex] * 100,
					out_trade_no = new Date().getTime()
					wxAppJFPays(this.$store.state.userInfo.ID, amount, '待释放金额充值',  this.parentid, out_trade_no)
					.then(res => {
						uni.showModal({
							title: '充值成功',
							content: `已将${this.Jines[this.selectedAmountIndex]}元充值到您的待释放金额`,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					})
					.catch(err => {
						console.log(err);
					})
				} else {
					let amount = this.czJes[this.selectedAmountIndex],
					out_trade_no = new Date().getTime()
						zzhbalipayApp(amount,'待释放金额充值', this.userInfo_.ID, out_trade_no, this.parentid)
						.then(res => {
							uni.showModal({
								title: '充值成功',
								content: `已将${this.Jines[this.selectedAmountIndex]}元充值到您的待释放金额`,
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										uni.navigateBack()
									}
								}
							})
						})
						.catch(err => {
							console.log(err);
						})
				}
			},
			getRadio(e) {
				console.log(e);
				this.radio = e.radio;
			},
			gotoXY() {
				uni.navigateTo({
					url:'/pages/personalAgent/persons/huaXuzzxy'
				})
			},
			showTips() {
				uni.showToast({
					icon:'none',
				    title: '指您参与的“增值”活动，我们赠予您的权益金。',
				    duration: 5000
				});
			},
			close(){
				if (Object.keys(this.$store.state.userInfo).length > 0) {
					// #ifdef MP-WEIXIN
					this.rechargeWx() 
					// #endif
					// #ifdef MP-ALIPAY
					this.alipayAppletsPays()
					// #endif
					// #ifdef APP-PLUS || H5
					this.shows = true
					this.$refs.popup.close()
					// #endif
				} else {
					uni.showModal({
						content: '您还没有登录，请登录后再试！',
						confirmText: '去登录',
						success: res => {
							this.$refs.popup.close()
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/login'
								})
							}
						}
					})
				}
			},
			hideModal(e) {
				this.modalName = null
				this.$refs.popup.close()
			},
			changes(e){
				console.log(e);
				this.parentid = e.detail.value
			},
			open(){
				this.$refs.popup.open()
			},
			zzZd(){
				uni.navigateTo({
					url:'./zzZd'
				})
			},
			czHb(){
				uni.navigateTo({
					url:'./czHb'
				})
			},
			keTi(){
				uni.navigateTo({
					url:'./balance'
				})
			},
			async getBalance() {
				if (this.userInfo_.ID) {
					let data = await this.$http.getUserBalance(this.userInfo_.ID);
					console.log(data);
					this.KeTiXian = this.$api.formatAmount(data.Data.XFHB);
					
				} else {
					this.KeTiXian = 0
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.selectedAmountIndex = 0
			},
			/**
			 * @description 选择充值金额
			 * 
			 * @param {Object} index 选中的充值金额的序号
			 * 
			 */
			changeItem(index) {
			    this.selectedAmountIndex = index
				
			},
			// ======================= 选择充值金额结束 ======================= >>
			
			/**
			 * @description 选择充值方式 (仅支持 APP 和 H5 ）
			 * 
			 * @param {Object} index 选中的支付方式的序号
			 * 
			 */
			// #ifdef H5
			selectRechageWay(index) {
			    this.rechargeWay = index
			},
			// #endif
			// ======================= 选择充值方式结束 ========================== >>
			
			/**
			 * @description 发起支付 （仅支持 APP 和 H5 ）
			 */
			// #ifdef H5
			recharge() {
					switch (this.rechargeWay){
					    case 0:                             // 微信支付
					        appPayment(this.czJes[this.selectedAmountIndex], '账号充值', this.userInfo_.ID)
					        .then(res => {
								console.log('111')
					            this.$api.msg('充值成功!',2000)
					        })
					        .catch(err => {
								console.log('111')
					            this.$api.msg('充值失败!',2000)
					        })
					        break;
					    case 1:                             // 支付宝支付
					        appPayment(this.amountList[this.selectedAmountIndex], '账号充值', this.userInfo_.ID, '支付宝')
					        .then(res => {
								console.log('充值成功')
					            this.$api.msg('充值成功!',2000)
					        })
					        .catch(err => {
								console.log('111')
					            this.$api.msg('充值失败!',2000)
					        })
					        break;
					    default:
					        break;
					}
			},
			// #endif
			// ========================== 发起支付 （仅支持 APP 和 H5 ）结束 ========== >>
			
			// #ifdef MP-WEIXIN
			async rechargeWx() {
				let amount = this.czJes[this.selectedAmountIndex] * 100,
				out_trade_no = new Date().getTime()
				
				wxAppletsJFPay(this.$store.state.userInfo.ID,out_trade_no, amount, '收益充值',  this.parentid)
					.then(res => {
						uni.showModal({
							title: '充值成功',
							content: `已将${this.Jines[this.selectedAmountIndex]}元充值到您的待释放金额`,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					})
					.catch(err => {
						console.log(err);
					})
			
			},
			// #endif
			
			// #ifdef MP-ALIPAY
			alipayAppletsPays() {
				console.log('1111165165161');
				let amount = this.czJes[this.selectedAmountIndex],
				out_trade_no = new Date().getTime()
				 
					alipayAppletsPays(amount,'待释放金额充值', this.userInfo_.ID, out_trade_no, this.parentid)
					.then(res => {
						uni.showModal({
							title: '充值成功',
							content: `已将${this.Jines[this.selectedAmountIndex]}元充值到您的待释放金额`,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					})
					.catch(err => {
						console.log(err);
					})
			    
			},
			// #endif
			
			
			// #ifdef MP-ALIPAY 
			rechargeAlipay() {
					alipayAppletsPay(this.amountList[this.selectedAmountIndex], '账号充值', this.userInfo_.ID)
					.then(res => {
						console.log('111')
					    this.$api.msg('充值成功!',2000)
					})
					.catch(err => {
						console.log('充值失败')
					    this.$api.msg('充值失败!',2000)
					})
			    
			},
			// #endif
			
			zouWei(){
				uni.navigateTo({
					url:'./tranSfers'
				})
			}
		},
		onUnload() {
			
		},
		//注册滚动到底部的事件,用于上拉加载
		onReachBottom() {
			
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			
		}
	}
</script>

<style scoped lang="scss">
	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	 
	.box {
		display: inline-block;
		width: 290upx;
		height: 164upx;
		margin-right: 16upx;
		border-radius: 15upx;
	}
	 
	.boxs {
		display: inline-block;
		width: 290upx;
		height: 164upx;
		margin-right: 16upx;
		border-radius: 15upx;
	}
	
	.box:last-child {
		margin-right: 0;
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
