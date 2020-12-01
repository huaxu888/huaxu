<template>
	<view style="background: #fd5960;">
		<cu-custom bgColor="bg-daili" class="text-white" :isBack="true" style="">
			<block slot="content">代理推广码</block>
		</cu-custom>
		
		<view class="margin">
			<view style="background-color: #ffffff;border-radius: 10upx;padding-bottom: 80upx;">
				<view class="flex justify-center" style="font-size: 30upx;padding-top: 80upx;">推荐注册，享受高额代理收益</view>
				<view class="flex justify-center" >
					<view style="" v-show="!showFlag">
						<view class="flex align-center  ">
							<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
								<image :src="ewmLink" mode="scaleToFill" style="width:360rpx;height:400rpx;margin-top: 50rpx;margin-left: 10upx;"></image>
							<!-- #endif -->
						</view>
					</view>
				</view>
				
				<view class="flex justify-center" style="margin-top: 60upx;">
					<button open-type="share" style="background-color: #ffffff;font-weight: 600;text-align: center;line-height: 96upx;width: 540upx;height: 100upx;border-radius: 50upx;border: 2upx solid #000000;color: #000000;font-size: 30upx;">
					一键分享
					</button>
				</view>
				
				<view class="flex justify-center" style="margin-top: 40upx;">
					<view  v-if="openSettingBtnHidden" @tap="saveEwm" style="font-weight: 600;text-align: center;line-height: 96upx;width: 540upx;height: 100upx;border-radius: 50upx;border: 2upx solid #fd5960;background-color: #fd5960;color: #ffffff;font-size: 30upx;">
						保存推广码
					</view>
					<button v-else hover-class="none" open-type="openSetting" @opensetting='handleSetting' style="font-weight: 600;text-align: center;line-height: 96upx;width: 540upx;height: 100upx;border-radius: 50upx;border: 2upx solid #fd5960;background-color: #fd5960;color: #ffffff;font-size: 30upx;">
						保存推广码
					</button>
				</view>
				
				<view style="padding: 0 75upx;margin-top: 80upx;font-size: 26upx;">
					<view style="font-weight: 600;color: #000000;">
						店铺开发奖励：
						<text style="color: #b9b9b9;font-weight: normal;">商户通过上述二维码或代理分享的链接注册成为平台商户，并签订有效协议，该商户发生交易时，代理获得分润奖励。</text>
					</view>
				</view>
				
				<view style="padding: 0 75upx;margin-top: 40upx;font-size: 26upx;">
					<view style="font-weight: 600;color: #000000;">代理推广奖励：
						<text style="color: #b9b9b9;font-weight: normal;">个人代理推广开发个人代理，即可获得奖励。</text>
					</view>
				</view>
				
				<view style="padding: 0 75upx;margin-top: 40upx;font-size: 26upx;">
					<view style="font-weight: 600;color: #000000;">唯一性：
						<text style="color: #b9b9b9;font-weight: normal;">个人代理是平台开发商铺的唯一身份。</text>
					</view>
				</view>
				
				<view style="padding: 0 75upx;margin-top: 40upx;font-size: 26upx;">
					<view style="font-weight: 600;color: #000000;">代理属性：
						<text style="color: #b9b9b9;font-weight: normal;">一个商户只能拥有一个代理属性。</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import qiniuUploader from '@/common/qiniuUploader.js'
	export default {
		components: {
			
		},
		data() {
			return {
				openSettingBtnHidden: true,//是否授权
				ewmImg:this.ewmLink,//这是要保存的图片
				showFlag: true,
				ewmLink: '',
				Uname: '',
				Phone: '',
				id: '',
				shareData: {
					scene: '',
					//分享的类型 WXSceneSession 分享到聊天界面 WXSenceTimeline  分享到朋友圈 WXSceneFavorite 分享到微信收藏
					title: '', //标题
					imageUrl: '', //图片链接
					href: '',
				},
				pepoleNum:7285
			}
		},
		onLoad(option) {
			 if (this.$store.state.hasLogin) {
			 	this.id = this.$store.state.userInfo.ID
			 	this.Uname = this.$store.state.userInfo.Name
			 	if (this.Uname === '' || this.Uname == null) {
			 		this.Uname = '木有名称';
			 	} else {
			 		if (this.Uname.length === 2) {
			 			this.Uname = this.Uname.substr(0, 1) + '*';
			 		} else if (this.Uname.length > 2) {
			 			let fistName = this.Uname.substr(0, 1)
			 			let endName = this.Uname.substr(this.Uname.length - 1, 1)
			 			let hidden = '';
			 			for (var i = 0; i < this.Uname.length - 2; i++) {
			 				hidden = hidden + '*';
			 			}
			 			this.Uname = fistName + hidden + endName;
			 		}
			 	}
			 	var str1 = this.$store.state.userInfo.Phone
			 	var reg = /^(\d{3})\d*(\d{4})$/;
			 	this.Phone = str1.replace(reg, '$1****$2')
			 	
			 	// #ifdef APP-PLUS || H5 || MP-ALIPAY
			 	let text = 'https://newsapp.huaxuapp.com/download/down?userid=' + this.id + '&phone=' + this.Phone;
			 	//vUaSBVzmzpohMHcpKtdQMa4
			 	let mhid = 'vUaSBVzmzpohMHcpKtdQMa4';
			 	this.$api.getEwm(text, mhid).then(res => {
			 		this.ewmLink = `https:${res}`;
			 	});
			 	// #endif
			 	
			 	
			 	// #ifdef MP-WEIXIN 
			 		uni.request({
			 			url: "https://newsapp.huaxuapp.com/api/getewm/getwxacode",
			 			method: "GET",
			 			data: {
			 				pid: this.id,
			 				path:'pages/common/login'
			 			},
			 			success: (res) => {
			 				console.log(res)
			 				this.ewmLink = res.data.Data;
			 			}
			 		});
			 	// #endif
			 	
			 	this.$http.getTotalnums().then( res =>{
			 		this.pepoleNum = res.Data;
			 		
			 	})
			 
			 	setTimeout(() => {
			 		this.showFlag = false;
			 	}, 1500);
			 }
			
		},
		onReady() {

		},
		onShow() {


		},
		onPullDownRefresh() {

		},
		onReachBottom() {

				
		},
		methods: {
			handleSetting(e){
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					  this.openSettingBtnHidden = false;
				} else {
					 this.openSettingBtnHidden = true;
				}
			},
			saveEwm(e){
				let _this = this
				//获取相册授权
				   uni.getSetting({
					 success(res) {
					   if (!res.authSetting['scope.writePhotosAlbum']) {
						 uni.authorize({
						   scope: 'scope.writePhotosAlbum',
						   success() {
							 //这里是用户同意授权后的回调
							 _this.saveImgToLocal();
						   },
						   fail() {//这里是用户拒绝授权后的回调
							   _this.openSettingBtnHidden=false
						   }
						 })
					   } else {//用户已经授权过了
						 _this.saveImgToLocal();
					   }
					 }
				   })
			},
			saveImgToLocal(e){
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: function (res) {
						if (res.confirm) {
							
							uni.downloadFile({
									url: _this.ewmLink,//图片地址
									success: (res) =>{
										if (res.statusCode === 200){
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function() {
													uni.showToast({
														title: "保存成功",
														icon: "none"
													});
												},
												fail: function() {
													uni.showToast({
														title: "保存失败",
														icon: "none"
													});
												}
											});
										} 
									}
								})
							
							
						} else if (res.cancel) {
							
						}
					}
				});
			},
			save() {
				// #ifdef APP-PLUS
				var _self = this;
				this.$api.showLoading_({
					title: '正在分享...',
					mask: false
				});
				setTimeout(() => {
					let ws = this.$mp.page.$getAppWebview();
					let bitmap = new plus.nativeObj.Bitmap();
					this.$nextTick(function() {
						ws.draw(bitmap, (e) => {
							bitmap.save("_doc/HxShare" + this.id + ".jpg", {
								overwrite: true,
								quality: 100
							}, (i) => {
								plus.gallery.save(i.target, (e) => {
									_self.shareData.scene = 'WXSceneSession';
									_self.shareData.title = '';
									_self.shareData.imageUrl = i.target;
									// _self.shareData.imageUrl = 'https://img.huaxuapp.com/logoSquire.png';
									_self.shareData.href = '';
									uni.getProvider({ //取出用户信息
										service: 'share'
									}).then(data => {
										console.log("4");
										var [err, res] = data
										var shareWhat
										console.log(res.errMsg);
										if (res.errMsg === 'getProvider:ok') {
											res.provider.forEach(it => { //判断是否支持微信分享
												if (it === 'weixin') {
													shareWhat = 'weixin'
												}
											})
										}
										return shareWhat
									}).then(res => {
										return new Promise((resolve, rej) => { //便于链式调用
											_self.$api.hidLoading_();
											uni.share({
												type: 2,
												provider: res,
												scene: _self.shareData.scene,
												//分享的类型 WXSceneSession 分享到聊天界面 WXSenceTimeline  分享到朋友圈 WXSceneFavorite 分享到微信收藏
												title: _self.shareData.title, //标题
												imageUrl: _self.shareData.imageUrl, //图片链接
												href: _self.shareData.href,
												success: function(res) {
			
			
												},
												fail: function(err) {
													_self.$api.hidLoading_();
													_self.$api.msg('请下载微信分享');
			
												}
											})
										})
									})
			
									bitmap.clear(); //销毁
								}, (e) => {
									bitmap.clear(); //销毁
								});
							}, (e) => {
								console.log('保存图片失败：' + JSON.stringify(e));
							});
						}, (e) => {
							console.log('bitmap绘制图片失败：' + JSON.stringify(e));
						});
					}, 200)
				})
				// #endif
				// #ifdef MP-WEIXIN || MP-ALIPAY
				this.$api.msg('请点击右上角的转发按钮,分享给你的朋友们哦~',2000)
				// #endif
			},
			back(){
				uni.navigateBack({})
			}
		},
		onShareAppMessage(obj) {
			return {
				title: '邀您加入花蓄代理，享永久收益！',
				imageUrl: 'https://img.huaxuapp.com/dailijm.png',
				path: `/pages/common/login?tjrid=${this.$store.state.userInfo.ID || 0}`
			}
		},
		onShareTimeline: function () {
			return {
				title: '邀您加入花蓄代理，享永久收益！',
				imageUrl: 'https://img.huaxuapp.com/dailijm.png',
				path: `/pages/common/login?tjrid=${this.$store.state.userInfo.ID || 0}`
			}
		},
	}
</script>


<style>
	page{
		background: #fd5960;
	}
</style>

<style scoped>
	button::after {
		border: none;
	}
</style>
