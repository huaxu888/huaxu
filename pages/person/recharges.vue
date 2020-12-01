<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的钱包</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的钱包</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view  class="balance-page">
			<view class="Top" style="position: relative;">
				<view class="redHb">
					
					<view class="redHb_1">
						<text  @click="showTips">
							我的余额(元)
						</text>
						
						<text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;margin-top: 4upx;" @click="showTips"></text>
						<view style="margin-top: 30upx;"  @tap="keTi">
							<text style="font-size: 50upx;">
								{{qBhb || 0}}
							</text>
						</view>
					</view>
					<view class="redHb_2" @tap="zouWei">
						<text style="font-size: 26upx;">
							转账
						</text>
					</view>
				</view>
				<view style="width: 630upx;height: 2upx;background-color:  #fbb6a2;position: absolute;left: 30upx;top: 202upx;">
					
				</view>
				<view class="yuEe" style="position: relative;" @tap="gotoDetails">
					<view class="yuEe_1">
						已领取收益(元)
						<view style="margin-top: 15upx;">
							<text style="font-size: 30upx;color: #FFFFFF;">
								{{KeTiXian || 0}}
							</text>
						</view>
					</view>
					<view style="width: 2upx;height: 62upx;background-color:  #fbb6a2;position: absolute;top: 30upx;left: 350upx;">
						
					</view>
					<view class="yuEe_2">
						待释放金额(元)
						<view style="margin-top: 15upx;">
							<text style="font-size: 30upx;color: #FFFFFF;">
								{{XiaoFeiScore || 0}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
        
		<view class="kdCz">
			<view class="xzZh">
				我的服务
			</view>
			
			<view class="flex justify-between">
				<view style="background-image: url(https://img.huaxuapp.com/334208_03.png);background-repeat: no-repeat;background-size: cover;
				width: 334upx;height: 208upx;padding: 30upx;position: relative;padding-top: 20upx;" @tap="czHb">
					<view>
						<view>
							<text style="font-size: 26upx;">充值</text>
						</view>
						<view style="margin-top: 20upx;">
							<text style="font-size: 32upx;font-weight: 600;">即充即用</text>
						</view>
					</view>
					<view class="reds" style="background-color: #feaa14;position: absolute;right: 30upx;margin-top: 16upx;text-align: center;">
						<text style="color: #FFFFFF;font-size: 24upx;">充值</text>
					</view>
				</view>
				<view  style="background-image: url(https://img.huaxuapp.com/334208red_03.png);background-repeat: no-repeat;background-size: cover;
				width: 334upx;height: 208upx;padding: 30upx;position: relative;padding-top: 20upx;"  @tap="zzHb">
					<view>
						<view class="flex">
							<text style="font-size: 26upx;">增值</text>
							<!-- #ifdef MP-ALIPAY -->
								<view>
									<image src="https://img.huaxuapp.com/zsy_03.png" mode="aspectFit" style="width: 76upx;height: 36upx;margin-right: 16upx;"></image>
								</view>
							<!-- #endif -->
							<!-- #ifndef MP-ALIPAY -->
								<view style="margin-top: 2upx;">
									<image src="https://img.huaxuapp.com/zsy_03.png" mode="" style="width: 76upx;height: 36upx;margin-right: 16upx;"></image>
								</view>
							<!-- #endif -->
						</view>
						<view style="margin-top: 15upx;">
							<text style="font-size: 32upx;font-weight: 600;">5倍收益天天返</text>
						</view>
					</view>
					<view class="reds" style="background-color: #ff5b2e;position: absolute;right: 30upx;margin-top: 16upx;text-align: center;">
						<text style="color: #FFFFFF;font-size: 24upx;">增值</text>
					</view>
				</view>
			</view>
			
		</view>
		<!-- <view class="kdCz">
			<view class="xzZh">
				请选择账户
			</view>
			<view class="xzZh_1">
				<radio-group class="block " @change="RadioChange">
					<view class="flex justify-between">
						<view>
							<text class="hxIcon-yue" style="color: rgb(254,156,1);"></text>
							<text style="margin-left: 20upx;margin-right: 16upx;font-size: 30upx;font-weight: 600;">余额</text>
							<text style="font-size: 24upx;color: #999999;">即充即送</text>
						</view>
						<radio class='red margin-left-sm'  :class="radio==1?'checked':''"  checked color="#ff5b2e"
							value="1" style="transform:scale(0.8)"></radio>
					</view>
					<view class="flex justify-between" style="margin-top: 40upx;">
						<view class="flex">
							<view style="margin-top: 2upx;">
								<text class="hxIcon-hongbao" style="color: rgb(234,78,45);"></text>
							</view>
							<text style="margin-left: 20upx;font-size: 30upx;font-weight: 600;">余额</text>
							<view style="margin-top: 2upx;">
								<image src="https://img.huaxuapp.com/zsy_03.png" mode="" style="width: 76upx;height: 36upx;margin-right: 16upx;"></image>
							</view>
							<text style="font-size: 24upx;color: #999999;">5倍收益天天算</text>
						</view>
						<radio class='red margin-left-sm'  :class="radio==3?'checked':''" color="#ff5b2e"
							value="3" style="transform:scale(0.8)"></radio>
					</view>
				</radio-group>
			</view>
		</view>
		
		<view class="kdCz" v-if="radio==1">
			<view class="xzZh">
				充值金额
			</view>
			<view class="">
				<scroll-view scroll-x="true" class="scroll">
					<view v-for="(czJe,index) in czJe" :key="index" class="" 
					:class="index === selectedAmountIndex ? 'boxs' : 'box'" @tap="changeItem(index)">
						<view class="yeJe" style="text-align: center;line-height: 164upx;">
							<text style="font-weight: 600;font-size: 32upx;">{{czJe}}</text>
							<text style="font-size: 24upx;">元</text>
						</view>
					</view>       
				</scroll-view>
				<view style="margin-top: 20upx;position: absolute;right: 30upx;font-size: 30upx;">
					<text style="font-size: 26upx;">余额到账：</text>
					<text style="color: red;font-weight: 600;font-size: 32upx;">{{Jine[selectedAmountIndex]}}元</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="kdCz" v-if="radio==3">
			<view class="xzZh">
				充值金额
			</view>
			<view class="">
				<scroll-view scroll-x="true" class="scroll">
					<view v-for="(czJes,index) in czJes" :key="index" class="" 
					:class="index === selectedAmountIndex ? 'boxs' : 'box'" @tap="changeItem(index)">
						<view class="yeJe" style="text-align: center;line-height: 164upx;">
							<text style="font-weight: 600;font-size: 32upx;">{{czJes}}</text>
							<text style="font-size: 24upx;">元</text>
						</view>
					</view>       
				</scroll-view>
				<view style="margin-top: 20upx;position: absolute;right: 30upx;font-size: 30upx;">
					<text style="font-size: 26upx;">余额到账：</text>
					<text style="color: red;font-weight: 600;font-size: 32upx;">{{Jines[selectedAmountIndex]}}元</text>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="recharge-page"> -->
		    
		    <!-- #ifdef APP-PLUS || H5 -->
		    <!-- <view class="select-recharge-way  padding" style="margin-top: 40upx;">
		        <text class="xzZh">支付方式</text>
		        <view class="rechage-way-card">
		            <view class="rechage-way-item" v-for="(item, index) in rechargeWayList" :key="index"
		             @tap="selectRechageWay(index)" :class="[index === rechargeWay ? 'avtive-recharge-way' : '']">
		                <text :class="[index === 0 ? 'hxIcon-weixin text-green' : 'hxIcon-zhifubao text-blue']" 
		                class="margin-right-xs  " style="font-size: 42upx;margin-top: 5upx;"></text>
						<text>{{ item }}支付</text> 
		            </view>
		        </view>
		    </view> -->
		    <!-- #endif -->
			<!-- <view style="padding: 0 30upx;margin-top: 200upx;">
				<view class="" style="text-align: center;font-size: 24upx;">
					充值即表示同意
					<text style="color: red;">
						《充值章程及余额协议》
					</text>
				</view> -->
				<!-- #ifdef APP-PLUS -->
				<!-- <view class="recharge-btn " @tap="recharge">
					<text style="font-size: 30upx;">确认充值</text> 
				</view> -->
				<!-- #endif -->
				
				<!-- #ifdef MP-WEIXIN  || H5-->
				<!-- <view class="recharge-btn " @tap="rechargeWx" v-if="radio == 1">
					<text style="font-size: 30upx;">微信支付{{czJe[selectedAmountIndex]}}元</text> 
				</view>
				<view class="recharge-btn " @tap="rechargeWx" v-if="radio == 3">
					<text style="font-size: 30upx;">微信支付{{czJes[selectedAmountIndex]}}元</text> 
				</view> -->
				<!-- #endif -->
			<!-- </view>
		</view> -->
		
	</view>
</template>

<script>
	import {
		alipayAppletsPay,
		wxAppletsPay,
		appPayment,
		decrypt,
		wxAppletsJFPay,
		wxAppletsRechargePay
	} from '../../common/handle.js'
	export default {
		data() {
			return {
				radio:1,
				czJe:[],
				czJes:[],
				Jine:[],
				Jines:[],
				selectedAmountIndex: 0,// 当前选中的充值金额序号，默认为 1 , 即 10
				// #ifdef APP-PLUS || H5
				rechargeWayList: ['微信', '支付宝'],// 支付方式 (仅支持 APP 和 H5)
				rechargeWay: 0,// 选中的支付方式，默认为 0 , 即微信支付 (仅支持 APP 和 H5)
				// #endif
				KeTiXian:0,
				XiaoFeiScore:0,
				qBhb:0
			}
		},
		async onShow() {
			this.radio = 1
			await this.getBalance();
			
		},
		onLoad() {
			
			this.$http.czList().then(res => {
					console.log(res);
					res.forEach(r => {
						this.czJe.push(r.RealMoney)
						this.Jine.push(r.HasMoney)
					})
				})
				.catch(err => {
					console.log(err);
				})
			this.$http.jfList().then(res => {
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
			gotoDetails(){
				uni.navigateTo({
					url:'/pages/prestoreDetail/zzhbRecord'
				})
			},
			showTips() {
				uni.showToast({
					icon:'none',
				    title: '余额可通过充值或赠送的方式获得，仅可在VIP商家消费使用！',
				    duration: 5000
				});
			},
			czHb(){
				uni.navigateTo({
					url:'./czHb'
				})
			},
			zzHb(){
				this.$http.zzKg().then(res => {
					console.log(res)
					// this.$api.msg('功能即将上线，敬请期待')
					if(res.Data){
						uni.navigateTo({
							url:'./zzHb'
						})
					}
				})
				// uni.navigateTo({
				// 	url:'./zzHb'
				// })
			},
			keTi(){
				uni.navigateTo({
					url:'./qbHb'
				})
			},
			async getBalance() {
				if (this.userInfo_.ID) {
					let data = await this.$http.getQb(this.userInfo_.ID);
					console.log(data);
					this.qBhb = this.toformatAmount(data.Scores);
					this.KeTiXian = this.toformatAmount(data.MyHB);
					this.XiaoFeiScore = this.toformatAmount(data.Total);
				} else {
					this.qBhb = 0
					this.KeTiXian = 0
					this.XiaoFeiScore = 0;
				}
			},
			toformatAmount(money) {
				return this.$api.formatAmount(money);
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
			// #ifdef APP-PLUS || H5
			selectRechageWay(index) {
			    this.rechargeWay = index
			},
			// #endif
			// ======================= 选择充值方式结束 ========================== >>
			
			/**
			 * @description 发起支付 （仅支持 APP 和 H5 ）
			 */
			// #ifdef APP-PLUS || H5
			recharge() {
					switch (this.rechargeWay){
					    case 0:                             // 微信支付
					        appPayment(this.czJe[this.selectedAmountIndex], '账号充值', this.userInfo_.ID)
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
				if(this.radio == 1) {
					let amount = this.czJe[this.selectedAmountIndex]  * 100,
					out_trade_no = new Date().getTime()
					//   wxAppletsJFPay(this.czJe[this.selectedAmountIndex], '账号充值')
					//   .then(res => {
										// console.log('111')
					//       this.$api.msg('充值成功!',2000)
					//   })
					//   .catch(err => {
										// console.log('充值失败')
					//       this.$api.msg('充值失败!',2000)
					//   }) 
					wxAppletsRechargePay(out_trade_no,amount,'余额充值',this.Jine[this.selectedAmountIndex],this.$store.state.userInfo.ID)
						.then(res => {
							uni.showModal({
								title: '充值成功',
								content: `已将${this.Jine[this.selectedAmountIndex]}元充值到您的账户余额`,
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
				
				if(this.radio == 3) {
					let amount = this.czJes[this.selectedAmountIndex] * 100,
					out_trade_no = new Date().getTime()
					
					wxAppletsJFPay(this.$store.state.userInfo.ID,out_trade_no, amount, '余额充值')
						.then(res => {
							uni.showModal({
								title: '充值成功',
								content: `已将${this.Jines[this.selectedAmountIndex]}元充值到您的余额金额`,
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
					url:'./newTransfers'
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

<style>
    /* ↓↓↓ 页面默认背景颜色 ↓↓↓ */
    page {
        background: #FFFFFF;
    }
    /* ↑↑↑ 页面默认背景颜色 ↑↑↑ */
</style>

<style scoped lang="scss">
	.balance-page {
		padding: 0 30upx;
		color: #FFFFFF;
	}
	
	.Top {
		margin: 30upx 0;
		width: 690upx;
		height: 328upx;
	}
	
	.redHb {
		width: 100%;
		height: 204upx;
		border-radius: 20upx 20upx 0 0;
		background: linear-gradient(to bottom, #f88160, #ff5b2e);
		display: flex;
		justify-content:space-between;
		padding: 0 60upx;
		text-align: center;
	}
	
	.redHb_1 {
		margin-top: 42upx;
		font-size: 24upx;
	}
	
	.redHb_2 {
		line-height: 52upx;
		background-color: #FFFFFF;
		border-radius: 50upx;
		height: 52upx;
		padding: 0upx 36upx;
		margin-top: 50upx;
	}
	
	.redHb_2 text{
		color: #ff5b2e;
	}
	
	.yuEe {
		text-align: center;
		width: 100%;
		height: 124upx;
		border-radius: 0 0 20upx 20upx;
		background: #ff5b2e;
		display: flex;
		justify-content:space-around;
		padding: 20upx 0;
		font-size: 24upx;
	}
	
	.yuEe_1 {
		color: #FFFFFF;
		
	}
	
	.yuEe_2 {
		color: #FFFFFF;
	}
	
	.kdCz {
		padding: 0 30upx;
		margin-top: 70upx;
	}
	
	.xzZh {
		font-size: 32upx;
		font-weight: 600;
		margin-bottom: 30upx;
	}
	
	.xzZh_1 {
		background-color: #F7F7F7;
		height: 200upx;
		border-radius: 16upx;
		padding: 30upx;
	}
	
	.gou {
		color: rgb(254,95,51);	
	}
	
	.yeJe {
		
	}
	
	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
 
	.box {
		display: inline-block;
		width: 176upx;
		height: 164upx;
		margin-right: 16upx;
		border-radius: 15upx;
		background-color: #f2f2f2;
	}
 
	.boxs {
		display: inline-block;
		width: 176upx;
		height: 164upx;
		margin-right: 16upx;
		border-radius: 15upx;
		background: linear-gradient(to right, #ff5b2e, #fa7d5a);
		color: #fff;
		box-shadow: 2upx 2upx 14upx lighten($color: #fa7d5a, $amount: 10);
	}
	
	.box:last-child {
		margin-right: 0;
	}
 
	.images {
		width: 520upx;
		height: 360upx;
		border-radius: 16upx;
	}
	
	.recharge-page {
	    .cu-custom {
	        box-shadow: 0 4upx 4upx #ddd;
	    }
	    
	    .select-amount {
	        background: #fff;
	        padding: 30upx;
	        
	        .amount-card {
	            display: flex;
	            justify-content: space-between;
	            flex-wrap: wrap;
	            
	            .amount-item {
	                display: inline-flex;
	                height: 100upx;
	                width: 200upx;
	                justify-content: center;
	                flex-shrink: 0;
	                align-items: center;
	                border-radius: 16upx;
	                background: #f2f2f2;
	                margin-top: 30upx;
	                color: #333;
	            }
	            
	            .active {
	                background: linear-gradient(to right, #ff5b2e, #fa7d5a);
	                color: #fff;
	                box-shadow: 2upx 2upx 14upx lighten($color: #fa7d5a, $amount: 10);
	            }
	        }
	    }
	    
	    .recharge-btn {
	        margin-top: 20upx;
	        height: 88upx;
	        display: flex;
	        justify-content: center;
	        align-items: center;
	        background: linear-gradient(to right, #fb9c67, #fc6660);
	        color: #fff;
	        border-radius: 100upx;
	        box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	    }
	    
	    /* #ifdef APP-PLUS || H5 */
	    .select-recharge-way {
	        background: #fff;
	        
	        .rechage-way-card {
	            display: flex;
	    
	            .rechage-way-item {
	                display: inline-flex;
	                justify-content: center;
	                align-items: center;
	                height: 100upx;
	                margin-top: 30upx;
	                background: #f2f2f2;
	                border-radius: 16upx;
	                flex:1;
	                color: #333;
	                transition: all .3s ease-in-out;
	                
	                &:first-child {
	                    margin-right: 20upx;
	                }
	                
	                &:last-child {
	                    margin-left: 20upx;
	                }
	            } 
	            
	            .avtive-recharge-way {
	                background: transparent;
	                border: 1px solid #ff5b2e;
	                flex: 2;
	            }
	        }
	        
	    }
	    /* #endif */
	}
	
	.reds {
		line-height: 50upx;
		border-radius: 50upx;
		height: 50upx;
		padding: 0upx 36upx;
		width: 120upx;
	}
</style>
