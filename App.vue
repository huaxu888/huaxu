<script>
	import Vue from 'vue';
	export default {
		globalData: {
			buyNowList:{},
			isAudit:true,
			showRechargePage: false
		},
		onLaunch: async function(options) {
			// #ifdef APP-PLUS
			    // 页面加载时触发  
			    var pinf = plus.push.getClientInfo();  
			    var cid = pinf.clientid;//客户端标识  
			// #endif

			this.getSystemInfo()
			// #ifdef MP-ALIPAY
			if (options.query) {
				this.$store.commit('setQrQuery', options.query.qrCode)
			}
			// #endif

			// #ifdef APP-PLUS
			// 监听设备网络状态变化事件
			plus.globalEvent.addEventListener('netchange', function() {});
			// #endif
			let self = this
			// this.getLatitudeAndLongitude() //获取地理位置
			this.getAllShopAry()
			uni.getStorage({
				key: 'userInfo',
				success: async function(res) {
					if (res.data) {
						console.log('从缓存登录成功')
						self.$store.commit('login', res.data)
						let userID = res.data.ID
						try {
							let res_ = await self.$api.refreshUserInfo(userID, self)
						} catch (e) {
							//TODO handle the exception
						}

					} else {
						console.log('不存在缓存信息')
					}
				},
				fail: function(res) {
					console.log('不存在缓存信息')
				}
			})

			// #ifdef APP-PLUS
			// APP 检测升级
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
									showCancel: false,
									confirmText: '下载更新',
									success: (res) => {
										if (res.confirm) {
											plus.runtime.openURL(data.data.apkurl);
											resovle(true)
										} else {
											resovle(false)
										}
									}
								})
							} else {
								reject(false)
							}
						}).then((res) => {
							if (res.statusCode === 200) {
								plus.runtime.install(res.tempFilePath)
							}
						}).catch((err) => {
							console.log('下载出错：', res);
						})
					}
				})
			})
			// #endif
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					console.log('onCheckForUpdate====', res)
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						console.log('res.hasUpdate====')
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									console.log('success====', res)
									// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
										self.getSystemInfo()
										console.log('over=======================')
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							wx.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							})
						})
					}
				})
			}
			// #endif
			// #ifdef MP-ALIPAY
			const updateManager = my.getUpdateManager()

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate)
			})

			updateManager.onUpdateReady(function() {
				my.confirm({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: function(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						}
					}
				})
			})

			updateManager.onUpdateFailed(function() {
				// 新版本下载失败
			})
			// #endif		
			
			this.$store.commit('setShowGL', true)
		},
		onShow: async function() {
			let { IsSuccess, Data, IsCharge } = await this.$http.getGlobalConfig()
			console.log('配置参数：', Data, IsCharge);
			if (IsSuccess) {
				getApp().globalData.isAudit = Data
				getApp().globalData.showRechargePage = IsCharge
			}
		},
		onHide: function() {
			console.log('App Hide');
		},
		onUniNViewMessage: function(e) {
			var _self = this;
			const subNVue = uni.getSubNVueById(e.data.value);
			subNVue.hide('zoom-in', 200);

			if (e.data.value == 'hb' || e.data.value == 'hb5' || e.data.value == 'hb7') {
				//如果红包为 下级消费红包 或者 消费红包 或者 分享红包 或者 登录红包
				//查询指针是否到底
				if (_self.$store.state.HBindex + 1 <= _self.$store.state.HBList.length) {
					//说明红包的指针 的下一跳 
					//如果没有到底 判断打开动画
					if (this.$store.state.HBList[this.$store.state.HBindex].Sort == 1) {
						console.log("我查到了推荐红包");
						//推荐红包
						// #ifdef APP-PLUS
						//获取窗体id
						const subNVue = uni.getSubNVueById('hb5');
						//传入红包的金额
						plus.webview.postMessageToUniNView({
							Scores: this.$store.state.HBList[this.$store.state.HBindex].Scores
						}, 'hb5');
						//打开原生子窗体
						subNVue.show('zoom-out', 800, function() {});
						// #endif
						//如果不是app的环境就打开遮罩
					} else if (this.$store.state.HBList[this.$store.state.HBindex].Sort == 4) {
						//下级消费红包
						console.log("我查到了下级消费红包");
						//个人消费红包
						// #ifdef APP-PLUS
						//获取窗体id
						let info = this.$store.state.HBList[this.$store.state.HBindex].Info;
						let list = info.split('*');
						plus.webview.postMessageToUniNView({
							Scores: this.$api.formatAmount(this.$store.state.HBList[this.$store.state.HBindex].Scores),
							XFUser: list[0],
							XFStore: list[1]
						}, 'hb');
						const subNVue = uni.getSubNVueById('hb');
						//传入红包的金额
						//打开原生子窗体
						subNVue.show('zoom-out', 800, function() {});
						// #endif
						//如果不是app的环境就打开遮罩
					} else if (this.$store.state.HBList[this.$store.state.HBindex].Sort == 6) {
						//下级消费红包
						console.log("我查到新人红包");
						//个人消费红包
						// #ifdef APP-PLUS
						//获取窗体id
						plus.webview.postMessageToUniNView({
							Scores: this.$store.state.HBList[this.$store.state.HBindex].Scores
						}, 'hb7');
						const subNVue = uni.getSubNVueById('hb7');
						//传入红包的金额
						//打开原生子窗体
						subNVue.show('zoom-out', 800, function() {});
						// #endif
						//如果不是app的环境就打开遮罩
					}
					let index = this.$store.state.HBindex;
					index++;
					this.$store.commit('setHBindex', index);
				} else {
					//如果到底了 说明没有红包 清除list 归还index
					console.log('没有红包了');
					this.$store.commit('setHBindex', 0);
					this.$store.commit('setHBList', []);

				}
			}
		},
		methods: {
			getSystemInfo() {
				console.log('getSystemInfo,getSystemInfo')
				uni.getSystemInfo({
					success: function(e) {
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						}
						// #endif
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				});
			},
			// getLatitudeAndLongitude() {
			// 	uni.getLocation({
			// 		type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			// 		success: (res) => {
			// 			var latitude = res.latitude;
			// 			var longitude = res.longitude;
			// 			console.log(latitude, longitude)
			// 			this.$store.commit('setLatitudeAndLongitude', {
			// 				latitude,
			// 				longitude
			// 			})
			// 			this.getAllShopAry()
			// 		},
			// 		fail: (e) => {
			// 			console.log(e)
			// 			this.$api.msg('请开启app位置权限', 2000)
			// 			this.getAllShopAry()
			// 		},
			// 		complete: () => {
			// 			//this.getAllShopAry() //获取所有的店铺
			// 		}
			// 	})
			// },
			getAllShopAry() {
				// var Location = `${this.$store.state.longitude},${this.$store.state.latitude}`
				var data = {
					siteid: 0,
					Location: '0,0'
				}
				this.$Request.get(this.$store.state.shopListUrl, data, false).then(data => {
					if (data.IsSuccess) {
						// let index = 0
						// data.Data.forEach((it)=>{
						// 	it.Store.forEach((item)=>{
						// 		index += 1
						// 	})
						// })
						// console.log(index)
						this.$store.commit('setAllShopAry', data.Data)
					}
				})
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import url('colorui/main.css');
	@import url("common/hx.css");
	@import url('colorui/icon.css');
	@import url("common/hxicon.css");
	@import url("common/animate.css");
</style>
