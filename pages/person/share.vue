<template>
	<view style="position: relative;">
		
		<!-- #ifdef MP-ALIPAY || MP-WEIXIN -->
			<view class="text-lg back_btn flex justify-center align-center" @tap="back">
				<text class="cuIcon-back text-white" style="font-size: 45upx;"></text>
			</view>
		<!-- #endif -->
		
		<view style="" v-show="!showFlag">
			<view class="flex align-center flex-direction bg" >
				<!-- <view class="flex justify-center align-center bg-orange text-white Card-banner" @tap="save">
				<text class="hxIcon-s margin-right-xs" style="font-size: 36upx;"></text><text>分享</text>
			</view> -->
				<view style="margin-top: 396upx;" v-show="false">
					<text class="text-white">分享人:</text> 
					<text class="text-white ">{{Phone}}</text>
				</view>
				<view class="flex align-center flex-direction margin-bottom">
					
					<!-- #ifdef MP-WEIXIN || APP-PLUS -->
						<image :src="ewmLink" mode="scaleToFill" style="width:340rpx;height:380rpx;margin-top: 457rpx;"></image>
					<!-- #endif -->
					
				</view>
				
				<view style="margin-top:480upx; font-size: 32upx;font-weight: 600;color: #665A5A;" v-show="false">
					<!-- <text>平台已有</text>	<text style="color: #f63629;font-size: 40upx;">{{pepoleNum}}</text>	<text>位用户赚到了红包</text> -->
				</view>
				<image src="https://img.huaxuapp.com/shareBotton.png" style="width:590upx;height: 90upx;margin-top:74upx;" @tap="save" v-show="false"></image> 
			
			
			</view>
			
		</view>
		
		<view v-show="showFlag">
			<load-ing></load-ing>
		</view>
	</view>
</template>

<script>
	import qiniuUploader from '../../common/qiniuUploader.js'
	export default {
		data() {
			return {
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
		onLoad() {
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
		methods: {
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
				title: '百日促消费，百店大促销，惠民消费券等你来领！',
				// imageUrl: 'https://img.huaxuapp.com/xcxfm.jpg',
				path: `/pages/index/index?tjrid=${this.$store.state.userInfo.ID || 0}`
			}
		 }
	}
</script>

<style>
	.bg {
		background-image: url('https://img.huaxuapp.com/622ctggg.png') ;
		background-repeat: no-repeat;
		background-size: cover;
		width: 750rpx;
		height: 4600rpx;
	}

	.Card-banner {
		border: 2upx solid #FFFFFF;
		position: absolute;
		top: 100upx;
		right: 0upx;
		height: 70upx;
		width: 120upx;
		border-top-left-radius: 20upx;
		border-bottom-left-radius: 20upx;

	}
	.back_btn{
		width:80upx;
		height: 80upx;
		background: rgba(36,36,36,0.7);
		border-radius: 50%;
		position: absolute;
		top:40upx;
		left:40upx;
	}
</style>
