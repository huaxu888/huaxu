<template>
	<view class="rob-stamps-page">
		<view class="bg">
			<view class="qiangquan">
				<view class="qiang"></view>
				
			</view>
		</view>
		<view class="zouWei" @click="open">
			<text class="sure">立即领取</text>
		</view>
		
		<uni-popup ref="popup" :maskClick="false" type="center" >
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
				请选择领取方式
			</view>
			<view>
				<payradio @getRadio="getRadio" :radio='radio' :yue="false"></payradio>
			</view> 
			<view class="sures" @tap="Apppay">确认领取</view> 
		</u-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import payradio from '@/components/payRadio/payRadio.vue'
	import { chexianFu} from '@/common/handle.js'
	export default {
		components: {
			uniPopup,
			payradio
		},
		data() {
			return {
				conpons30: {},
				canTap: true,
				parentid: "",
				userid: 0,
				IDs: 0,
				getData: {
					StoreID: 0,
					userId: this.$store.state.userInfo.ID
				},
				shows: false,
				radio: 3,
			};
		},
		methods: {
			changes(e){
				console.log(e);
				this.parentid = e.detail.value
			},
			open(){
				this.$refs.popup.open()
			},
			getRadio(e) {
				console.log(e);
				this.radio = e.radio;
			},
			Apppay(){
				if(this.radio == 3) { 
					chexianFu(100, '车险预存', this.$store.state.userInfo.ID, this.conpons30.YHQID, this.parentid).then(res => {
						console.log(res);
						uni.showModal({
							title: '恭喜您~',
							content: "您抢到优惠券啦，快去使用吧！",
							confirmText: '去看看',
							cancelText: '知道了',
							success: res => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/person/myCoupon/myCouponPage'
									})
								}
							}
						})
					})
				} else {
					chexianFu(100, '车险预存', this.$store.state.userInfo.ID, this.conpons30.YHQID, this.parentid).then(res => {
						console.log(res);
						uni.showModal({
							title: '恭喜您~',
							content: "您抢到优惠券啦，快去使用吧！",
							confirmText: '去看看',
							cancelText: '知道了',
							success: res => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/person/myCoupon/myCouponPage'
									})
								}
							}
						})
					})
				}
			},
			close(){
				if (Object.keys(this.$store.state.userInfo).length > 0) {
					// #ifdef APP-PLUS || H5
					this.shows = true
					this.$refs.popup.close()
					// #endif
					
					// #ifndef APP-PLUS
					chexianFu(100, '车险预存', this.$store.state.userInfo.ID, this.conpons30.YHQID, this.parentid).then(res => {
							console.log(res);
							this.$refs.popup.close()
							uni.showModal({
								title: '恭喜您~',
								content: "您抢到优惠券啦，快去使用吧！",
								confirmText: '去看看',
								cancelText: '知道了',
								success: res => {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/person/myCoupon/myCouponPage'
										})
									}
								}
							})
							// this.$http.getCoupon(this.$store.state.userInfo.ID, this.conpons30.YHQID, this.parentid)
							// 	.then(res => {
							// 		console.log(res);
							// 		this.$refs.popup.close()
							// 		if (res.IsSuccess) {
							// 			uni.showModal({
							// 				title: '恭喜您~',
							// 				content: "您抢到优惠券啦，快去使用吧！",
							// 				confirmText: '去看看',
							// 				cancelText: '知道了',
							// 				success: res => {
							// 					if (res.confirm) {
							// 						uni.navigateTo({
							// 							url: '/pages/person/myCoupon/myCouponPage'
							// 						})
							// 					}
							// 				}
							// 			})
							// 		} else {
							// 			this.$api.msg(res.Msg)
							// 		}
							// 	})
							// 	.catch(err => {
							// 		this.$refs.popup.close()
							// 		console.log(err);
							// 		this.$api.msg(res.Msg)
							// 	})
						
					})
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
			sanshi: function () {
				
			}
		},
		onShow() {
			this.$http.cxcheXian().then(res => {
				console.log('查找优惠券', res);
				if (res.IsSuccess) {
					this.conpons30 = res.Data
				}
				
			})
			.catch(err => {
				console.log(err);
			})
			
		},
		onLoad() {
			this.userid = this.$store.state.userInfo.ID
		},
		onShareTimeline: function () {
			let title = '买车险用花蓄，满3000立减500！'
			let imageUrl = 'https://img.huaxuapp.com/qwfuli.jpg'
			let path =
				`/pages/ad/cheXian?`
			return {
				title,
				imageUrl,
				path
			}
		},
		onShareAppMessage() {
			let title = '买车险用花蓄，满3000立减500！'
			let imageUrl = ''
			let path =
				`/pages/ad/cheXian`
			return {
				title,
				imageUrl,
				path
			}
		},
	}
</script>

<style lang="scss" scoped>
	.rob-stamps-page {
		position: relative;
		
		.bg {
			width: 750upx;
			height: 1850upx;
			background: url(https://img.huaxuapp.com/chexian100.jpg) no-repeat;
			background-position: center;
			background-size: cover;
		}
		
		.qiangquan {
			position: absolute;
			top: 650upx;
			left: 104upx;
			padding: 160upx;
		}
		
		.sure {
			height: 90upx;
			width: 504upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to right, #f9eccc, #f7cca1);
			color: #dc632c;
			border-radius: 50upx;
			font-size: 42upx;
		}
		
		.sures {
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
		
		.zouWei {
			position: fixed;
			bottom: 110upx;
			left: 140upx;
		}
	}
	
</style>
