<template>
	<view class="setting-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">设置中心</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">设置中心</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<!-- 基础设置 -->
		<view class="base-setting little-shadow">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-red"></text>
					基础设置
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<navigator class="cu-item arrow" url="/pages/person/setting/userInfo">
					<view class="content"><text class="text-black">个人信息</text></view>
				</navigator>
				<navigator class="cu-item arrow" url="/pages/person/setting/pass">
					<view class="content"><text class="text-black">设置密码</text></view>
				</navigator>
				<navigator class="cu-item arrow" url="/pages/person/setting/payPass">
					<view class="content"><text class="text-black">设置交易密码</text></view>
				</navigator>
			</view>
		</view>

		<view class="advance-setting little-shadow">
			<!-- 高级设置 -->
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-red"></text>
					高级设置
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<!-- #ifndef MP-WEIXIN -->
				<navigator class="cu-item arrow" url="/pages/person/myAlipay">
					<view class="content"><text class="text-black">绑定支付宝</text></view>
				</navigator>
				<!-- #endif -->
		<!-- 		<navigator class="cu-item arrow" url="/pages/person/bindBank">
					<view class="content"><text class="text-black">绑定银行卡</text></view>
				</navigator> -->
				<view class="cu-item arrow" @tap="clearCache">
					<view class="content"><text class="text-black">清除缓存</text></view>
					<view class="action">
						<text>{{ cacheSize }}M</text>
					</view>
				</view>
			</view>
		</view>

		<view class="other-setting little-shadow">
			<!-- 其他设置 -->
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-red"></text>
					其他设置
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<!-- 
				<navigator class="cu-item arrow" url="/pages/person/assistantDetail?id=1063">
					<view class="content"><text class="text-black">花蓄助手</text></view>
				</navigator>
				
				<navigator class="cu-item arrow" url="/pages/person/aboutUs">
					<view class="content"><text class="text-black">关于我们</text></view>
				</navigator> -->

				<!-- #ifdef APP-PLUS -->
				<view class="cu-item arrow" @tap="outBtn">
					<view class="content"><text class="text-black">重置引导页</text></view>
				</view>
				
				
				<view class="cu-item arrow" @tap="getUpdate">
					<view class="content"><text class="text-black">检查更新</text></view>
					<view class="action  text-gray">
						<text>V {{ version }}</text>
					</view>
				</view>
				
				<!-- #endif -->
				<!-- <view class="cu-item arrow" @tap="zhuXiaoZhangHao">
					<view class="content"><text class="text-red">注销账号</text></view>
				</view> -->
				
				<view class="cu-item arrow" @tap="logout">
					<view class="content"><text class="text-black">退出登录</text></view>
				</view>
				
			</view>
		</view>

		<view class="cu-modal" :class="isShow?'show':''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog">
				<view class="bg-img" style="height: 820upx;background-size: 92%;" :style="'background-image: url(' +imgUrl+ ');'">
					<view class="cu-bar justify-end text-white">
						<view class="action">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-red" >
					<view class="action margin-0 flex-sub solid-left" @tap="close">关闭</view>
				</view>
			</view>
		</view>
		
		
		<!-- 弹窗 -->
		<tui-modal :show="false" @cancel="closeTips" :custom="true">
			<view class="flex align-center flex-direction justify-center">
				<view class="margin-top-sm   flex flex-direction" style="color: #999999;font-size: 36upx;font-weight: 600;">
					<text>设置密码，方便提现！</text>
				</view>
		
				<view @tap="closeTips" class="margin-top padding-lr-lg  bg-hx-red" style="border-radius: 1000upx;padding-top: 12upx; padding-bottom: 12upx;">
					<text class="text-white">我知道了</text>
				</view>
			</view>
		</tui-modal>
	</view>
</template>
<script>
	import tuiModal from "@/components/modal/modal"
	export default {
		components:{
			tuiModal
		},
		data() {
			return {
				isShow: false,
				cacheSize: 0,
				version: 0,
				imgUrl: '',
				userInfo: '',
				isShowTips:true
			};
		},
		onShow() {
			let self = this;
			uni.getStorage({
				key: 'cache',
				success: function(res) {
					self.cacheSize = res.data.size;
					self.cacheSize = self.cacheSize + 1;
				},
				fail: function(res) {
					self.cacheSize = 0;
				}
			});
			self.$store.commit('setCache', self.cacheSize);
			// #ifdef APP-PLUS
			// 获取版本号
			plus.runtime.getProperty(plus.runtime.appid, function(res) {
				self.version = res.version
			})
			// #endif
		},
		methods: {
			moveHandle() {

			},
			showTips() {
				this.isShowTips = true;
			},
			closeTips() {
				this.isShowTips = false;
			},
			showEWM() {
				this.$api.showLoading_();
				if (this.$store.state.hasLogin === true) {
					this.userInfo = this.$store.state.userInfo;
					uni.request({
						url: "https://newsapp.huaxuapp.com/api/getewm/getwxacode",
						method: "GET",
						data: {
							pid: this.userInfo.ID,
							path:'/pages/common/login'
						},
						success: (res) => {
							console.log('succ', res);
							this.imgUrl = res.data.Data;
							this.isShow = true;
						},
						fail: (res) => {
							console.log('未知错误');
						},
						complete: () => {
							this.$api.hidLoading_();
						}
					});
				} else {
					this.userInfo = '';
				}
			},
			close() {
				this.isShow = false;
			},
			async zhuXiaoZhangHao(){
				let resolve =await this.$api.showModal({
					title: '您确定要注销账号？',
					content: '注销账号后再无法找回',
					showCancel:true,
					confirmText:'确定',
					cancelText:'取消',
					cancelColor:'#DC143C'
				})
				console.log(resolve)
				if(resolve){
					let resolve =await this.$api.showModal({
						title: '再次确认!!',
						content: '注销账号后再无法找回',
						showCancel:true,
						confirmText:'确定',
						cancelText:'取消',
						cancelColor:'#DC143C'
					})
					if(resolve){
						let userid = this.userInfo_.ID
						this.$store.commit('logout');//先退出登录
						let res = await this.$Request.get(this.$store.state.cancel,{
							userid
						})
						if(res.IsSuccess){
							this.$api.msg(res.Msg,1500)
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}, 1000);
						}else{
							this.$api.msg(res.Msg,1500)
						}
					}
				}
			},
			
			clearCache: function(res) {
				this.cacheSize = 0;
				uni.removeStorage({
					key: 'cache'
				});
				this.$api.msg('清除缓存完成');
			},
			logout: function(res) {
				this.$store.commit('logout');
				this.$api.msg('退出登录');
				setTimeout(function() {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}, 1200);
			},
			// #ifdef APP-PLUS
			getUpdate: function() {
				let self = this
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/update/isnewwgt',
						data: {
							version: widgetInfo.version,
						},
						success: (res) => {
							let data = res.data
							new Promise((resovle, reject) => {
								let download
								if (data.data.wgtUrl && data.code === 200) { // 返回了增量更新链接，进行增量更新
									uni.showModal({
										title: '版本更新',
										content: data.data.info,
										confirmText: '下载更新',
										success: (res) => {
											if (res.confirm) {
												download = uni.downloadFile({
													url: data.data.wgtUrl,
													success: (res) => {
														console.log('下载增量更新：', res)
														resovle(download)
													},
													fail: (res) => {
														console.log('下载文件出错', res);
														reject(res)
													}
												})
											}
										}
									})
								} else if (data.data.apkurl && data.code === 200) { // 全量更新
									uni.showModal({
										title: '版本更新',
										content: data.data.info,
										confirmText: '下载更新',
										success: (res) => {
											if (res.confirm) {
												plus.runtime.openURL(data.data.apkurl);
												resovle(true)
											} else {
												reject(false)
											}
										}
									})
								} else {
									self.$api.msg('当前已经是最新版本了')
									reject(false)
								}
							}).then((res) => {
								console.log('下载完成：', res);
								if (res.statusCode === 200) {
									plus.runtime.install(res.tempFilePath)
								}
							}).catch((err) => {
								console.log('下载出错：', res);
							})
						}
					})
				})
			},
			// #endif
			outBtn: function() {
				uni.showModal({
					title: '是否重置引导页？',
					content: '确定要重置，进行重启测试？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// 清除缓存
							uni.clearStorage();
							// 两秒后重启
							// #ifdef APP-PLUS
							uni.showToast({
								icon: 'none',
								duration: 3000,
								title: '清除成功2秒后重启'
							});
							setTimeout(function() {
								uni.hideToast();
								plus.runtime.restart();
							}, 2000);
							// #endif
							// 两秒后跳转
							// #ifdef H5 || MP-WEIXIN
							uni.showToast({
								icon: 'none',
								duration: 3000,
								title: '清除成功2秒后刷新'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 2000);

							// #endif
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.little-shadow {
		.cu-bar {
			border-top: 1px solid #e0e0e0;
			border-bottom: 1px solid #e0e0e0;
		}
	}
</style>
