<template>
	<view>
		<view style="border-bottom: 0.5px solid rgba(180,180,180,0.5);">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" backColor="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">创建营销短信</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">创建营销短信</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>

		<view class="padding bg-white" @tap="yifa">
			<view style="font-size: 28upx;color: #333333;">
				已群发短信
			</view>
			
			<view class="flex justify-between margin-top">
				<view class="" style="font-size: 28upx;">
					{{infoObj.SendSms}}
				</view>
				<view class="hxIcon-rightArrow">
					
				</view>
			</view>
		</view>
		
		<view class="listItems" style="font-size: 28upx;">
			<view>
				人群定向营销
			</view>
		</view>
		
		<view class="padding bg-white flex justify-between" @tap="zdhy">
			<view style="font-size: 28upx;color: #333333;">
				指定用户
				<view class="flex justify-between" style="margin-top: 10upx;">
					<view class="" style="font-size: 24upx;color: #999999;">
						非平台用户的精准短信营销工具
					</view>
				</view>
			</view>
			
			<view class="" style="border-radius: 50upx;border: 1upx solid #fe5479;width: 140upx;height: 52upx;line-height: 52upx;text-align: center;color: #fe5479;
			margin-top: 18upx;">
				发送短信
			</view>
		</view>
		
		<view class="listItems" style="font-size: 28upx;">
			<view>
				自动营销
			</view>
		</view>
		
		<view class="padding bg-white flex justify-between" @tap="qbhy">
			<view style="font-size: 28upx;color: #333333;">
				店铺全部客户
				<view class="flex justify-between" style="margin-top: 10upx;">
					<view class="" style="font-size: 26upx;color: #999999;">
						{{infoObj.TotalPeople}}人
					</view>
				</view>
			</view>
			
			<view class="" style="border-radius: 50upx;border: 1upx solid #fe5479;width: 140upx;height: 52upx;line-height: 52upx;text-align: center;color: #fe5479;
			margin-top: 18upx;">
				发送短信
			</view>
		</view>
		
		<view class="padding bg-white flex justify-between" style="margin-top: 10upx;" @tap="xfhy">
			<view style="font-size: 28upx;color: #333333;">
				消费客户
				<view class="flex justify-between" style="margin-top: 10upx;">
					<view class="" style="font-size: 26upx;color: #999999;">
						{{ infoObj.XFCount }}人
					</view>
				</view>
			</view>
			
			<view class="" style="border-radius: 50upx;border: 1upx solid #fe5479;width: 140upx;height: 52upx;line-height: 52upx;text-align: center;color: #fe5479;
			margin-top: 18upx;">
				发送短信
			</view>
		</view>
		
		<view class="padding bg-white flex justify-between" style="margin-top: 10upx;" @tap="zthy">
			<view style="font-size: 28upx;color: #333333;">
				直推客户
				<view class="flex justify-between" style="margin-top: 10upx;">
					<view class="" style="font-size: 26upx;color: #999999;">
						{{ infoObj.ZhiTuicount }}人
					</view>
				</view>
			</view>
			
			<view class="" style="border-radius: 50upx;border: 1upx solid #fe5479;width: 140upx;height: 52upx;line-height: 52upx;text-align: center;color: #fe5479;
			margin-top: 18upx;">
				发送短信
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		onLoad(route) {
			this.StoreID = route.StoreID
			
			this.getCurryInfo()
			this.getData.StoreID = route.StoreID
			
			
		},
		onShow() {

		},
		data() {
			return {
				infoObj: {},
				StoreName: '', //店铺名称
				ziShu: 0,
				StoreID: 0,
				msgSort: 0,
				huiyuanLei: '全部',
				msgContent: '',
				mubanTitle: '',
				timeValue: '',
				phones: '',
				muBanList: [], //短信模板列表
				muBanIndex: 0, //vuex中选中的模板
				keyWord:'',
				getData: {
					StoreID: '',
					page: 1,
					pagesize: 10,
					sort: 1,
					type:1
				},
				zt:0,
				xf:0,
				qb:0,
			}
		},
		methods: {
			getCurryInfo() {
				return this.$Request.get(this.$store.state.mymemberUrl, this.getData,false).then(res => {
					this.showLoading=true
					if (res.IsSuccess) {
						this.infoObj = res
						console.log(res);
						this.qb = res.TotalPeople
						this.xf = res.XFCount
						this.zt = res.ZhiTuicount
						this.HasSmsCount = res.HasSmsCount
					}
				})
			},
			yifa(){
				uni.navigateTo({
					url:'/pages/shopManagement/sonPage/msgAllSend/yiDuanxin?StoreID=' + this.StoreID
				})
			},
			zdhy(){
				this.$http.qzDuan(this.StoreID,this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					
					if(res.IsSuccess){
						if(this.HasSmsCount > 0){
							uni.navigateTo({
								url:'/pages/shopManagement/sonPage/msgAllSend/zdDuanxin?StoreID=' + this.StoreID + '&HasSmsCount=' + this.HasSmsCount
							})
						} else {
							uni.showModal({
								content: '您的短信余量不足，请前去充值！',
								showCancel:true,
								confirmText: '去充值',
								success: (res) => {
									if (res.confirm) {
										console.log('点击确定');
										uni.navigateTo({
											url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
										})
									}
								}
							})
						}
					} else {
						this.$api.msg(res.Msg)
					}
				})
				
			},
			qbhy(){
				// uni.showToast({
				// 	icon:'none',
				//     title: '功能正在开发，敬请期待',
				//     duration: 3000
				// });
				this.$http.qzDuan(this.StoreID,this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					
					if(res.IsSuccess){
						if(this.qb > 0){
							if(this.qb > this.HasSmsCount){
								uni.showModal({
									content: '您的短信余量不足，请前去充值！',
									showCancel:true,
									confirmText: '去充值',
									success: (res) => {
										if (res.confirm) {
											console.log('点击确定');
											uni.navigateTo({
												url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
											})
										}
									}
								})
							} else {
								uni.navigateTo({
									url:'/pages/shopManagement/sonPage/msgAllSend/qbDuanxin?StoreID=' + this.StoreID
								})
							}
						} else {
							uni.showToast({
								icon:'none',
							    title: '您暂无客户，无法发送短信',
							    duration: 3000
							});
						}
					} else {
						this.$api.msg(res.Msg)
					}
				})
				
			},
			xfhy(){
				// uni.showToast({
				// 	icon:'none',
				//     title: '功能正在开发，敬请期待',
				//     duration: 3000
				// });
				this.$http.qzDuan(this.StoreID,this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					
					if(res.IsSuccess){
						if(this.xf > 0){
							if(this.xf > this.HasSmsCount){
								uni.showModal({
									content: '您的短信余量不足，请前去充值！',
									showCancel:true,
									confirmText: '去充值',
									success: (res) => {
										if (res.confirm) {
											console.log('点击确定');
											uni.navigateTo({
												url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
											})
										}
									}
								})
							} else {
								uni.navigateTo({
									url:'/pages/shopManagement/sonPage/msgAllSend/xfDuanxin?StoreID=' + this.StoreID
								})
							}
						} else {
							uni.showToast({
								icon:'none',
							    title: '您暂无消费客户，无法发送短信',
							    duration: 3000
							});
						}
					} else {
						this.$api.msg(res.Msg)
					}
				})
				
			},
			zthy(){
				// uni.showToast({
				// 	icon:'none',
				//     title: '功能正在开发，敬请期待',
				//     duration: 3000
				// });
				this.$http.qzDuan(this.StoreID,this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					
					if(res.IsSuccess){
						if(this.zt > 0){
							if(this.zt > this.HasSmsCount){
								uni.showModal({
									content: '您的短信余量不足，请前去充值！',
									showCancel:true,
									confirmText: '去充值',
									success: (res) => {
										if (res.confirm) {
											console.log('点击确定');
											uni.navigateTo({
												url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
											})
										}
									}
								})
							} else {
								uni.navigateTo({
									url:'/pages/shopManagement/sonPage/msgAllSend/ztDuanxin?StoreID=' + this.StoreID
								})
							}
							
						} else {
							uni.showToast({
								icon:'none',
							    title: '您暂无直推客户，无法发送短信',
							    duration: 3000
							});
						}
					} else {
						this.$api.msg(res.Msg)
					}
				})
				
			},
		}
	}
</script>

<style scoped>
	.listItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2upx solid rgba(180, 180, 180, 0.2);
		padding: 30upx;
	}
	
	.listItems {
		padding: 30upx;
		
	}

	.msgContent {
		background: #fff2ee;
		padding: 30upx;
	}
	
	.sure {
		margin-top: 80upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #fb9c67, #fc6660);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	}
</style>
