<template>
	<view class="login-page">
		<view class="content">
			
			<view class="cuIcon-close" style="font-size: 56upx;position: absolute;top: 100upx;left: 50upx;" @tap="backHui"></view>
			<view class="login-field">
				<!-- #ifdef MP-WEIXIN || H5-->
				<button class="login-btn" open-type="getPhoneNumber" @getphonenumber="phonenumber">
					<text class=" margin-right-xs" style="font-size: 1.3em;"></text>
					微信登录
				</button>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN || H5 ||MP-ALIPAY || APP-PLUS-->
				<view class="info">
					<view class="input-field text-lg flex align-center" :class=" isFouces[0] || vilidate[0] ? 'active': ''">
						<view class="flex align-center flex-sub">
							<input type="number" v-model="phone" placeholder-style="color: #f0f0f0" maxlength="11" placeholder="请输入电话号码"
							 @focus="focus(1)" @blur="blur" :disabled="codeText != '获取验证码'" />
						</view>
						<text class="code vlide" @tap="getCode" v-if="loginWithCode">
							{{ codeText }}
						</text>
					</view>
					<view class="with-code">
						<view class="item" :style="{marginLeft: loginWithCode ? '0' : '-100%'}">
							<view class="input-field text-lg flex align-center" :class=" isFouces[1] || vilidate[1] ? 'active': ''">
								<view class="flex align-center flex-sub">
									<input type="number" v-model="code" class="flex align-center" placeholder-style="color: #f0f0f0" maxlength="6"
									 placeholder="请输入验证码" @focus="focus(2)" @blur="blur" />
								</view>
							</view>
						</view>
						<view class="item">
							<view class="input-field text-lg flex align-center" :class=" isFouces[1] || vilidate[1] ? 'active': ''">
								<view class="flex align-center flex-sub">
									<input type="text" password="true" v-model="pwd" class="flex align-center" placeholder-style="color: #f0f0f0"
									 placeholder="请输入密码" @focus="focus(2)" @blur="blur" />
								</view>
							</view>
						</view>
					</view>
					<view class="hx-btn">
						<button class="cu-btn lg flex" :class="vilidate[0] && vilidate[1] ? 'active' : ''" @tap="login">登录</button>
					</view>
					<text class="pass" @tap="loginWay">{{ loginWithCode ? '账号密码登录' : '验证码登录' }}</text>
				</view>
				
				<!-- #endif -->
				
				<navigator class="phone-btn" hover-class="none" url="/pages/common/chagePhone">
					手机验证登录
				</navigator>
				
				<!-- #ifndef MP-WEIXIN -->
				<!-- <view class="action-bar" style="margin-bottom: 0; margin-top: 100upx;">
					<view class="text-sm margin-top flex align-center justify-center" style="color: #fff;">
						<view style="transform: scale(.6);">
							<checkbox-group @change="agree">
								<checkbox class="red" :value="isAgree" :class="isAgree == 1 ? 'checked' : ''" /><text></text>
							</checkbox-group>
						</view>
						同意<text class="i" @tap="toWebview('zc')"> 《用户注册协议》 </text>和<text class="i" @tap="toWebview('ys')"> 《隐私协议》
						</text>
					</view>
				</view> -->
				<!-- #endif -->
			</view>
			<view style="color: #999999;font-size: 24upx;position: fixed;bottom: 100upx;width: 100%;">
				<view class="flex justify-center">
					登录注册即代表您已同意<text style="color: #fe4e01;" @tap="toWebview('zc')">注册协议</text>和<text style="color: #fe4e01;" @tap="toWebview('ys')">隐私协议</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiModal from "@/components/modal/modal"
		
	// #ifdef MP-WEIXIN
	let WXBizDataCrypt = require('common/WXBizDataCrypt.js');
	// #endif
    import { decrypt } from '../../common/handle.js'
	export default {
		components:{
			tuiModal
		},
		data() {
			return {
				move: 0,
				timer: '',
				pdTop: 0,
				isAgree: '1',
				wxInfo: {
					openid: '',
					unionid: '',
					nickName: '',
					avatar: '',
				},
				vilidate: [false, false], // 电话号码、验证码、密码是否正确
				isCode: false, // 使用验证码还是密码登录
				isFouces: [false, false], // 获取焦点的状态
				codeText: '获取验证码', // 获取验证码倒计时
				loginWithCode: false, // 是否采用验证码登录
				phone: '', // 电话号码
				code: '', // 验证码
				pwd: '', // 密码
                indexPage: false,
				isBack: 'back'
			}
		},
		onShow() {
			let self = this;
			/**
			 * 背景运动和速度设置，每 100 毫秒 background-position Y 轴方向向上移动 3 
			 */
			// #ifndef MP-ALIPAY
			this.timer = setInterval(function() {
				self.move -= 3
			}, 100)
			this.pdTop = this.CustomBar
			// #endif
		},
        onLoad(option) {
            if (option.tjrid) {
            	this.$store.commit('setTjrid', option.tjrid)
            	console.log(this.$store.state.tjrid, '推荐人ID');
            }
			if( option.isBack) {
				this.isBack = 'back'
			} else {
				this.isBack = ''
			}
            if(option.q) {
                let params = decodeURIComponent(option.q)
                if(params.includes('?')) {
                    params = params.split('?')
                    let cardid = params[1].split('=')[1]
                    this.$http.getTjrByCardID(cardid)
                    .then( res => {
                        if(res.IsSuccess) {
                    		this.$store.commit('setTjrid', res.Data)
                    	} else {
                    		uni.showModal({
                    			content: res.Msg,
                    			cancelText: '返回首页',
                    			success: (res) => {
                    				if(res.cancel) {
                    					uni.switchTab({
                    						url: '/pages/index/index'
                    					})
                    				}
                    			}
                    		})
                    	}
                    })
                }
                this.indexPage = true
            } else {
                this.indexPage = false
            }
        },
		onHide() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		methods: {
			backHui() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			agree() {
				// if (this.isAgree == '0') {
				// 	this.isAgree = '1'
				// } else {
				// 	this.isAgree = '0'
				// }
				this.isAgree = '1'
			},
            toWebview(url) {
                switch (url){
                    case 'ys':
                        uni.navigateTo({
                            url: '/pages/common/webview/webview?url=https://newsapp.huaxuapp.com/ys.html'
                        })
                        break;
                    case 'zc':
                        uni.navigateTo({
                            url: '/pages/common/webview/webview?url=https://newsapp.huaxuapp.com/zc.html'
                        })
                        break;
                }
            },
            // #ifdef MP-WEIXIN
            async userinfo(userinfo) {
                if (userinfo.detail.errMsg.includes('deny')) {
                	uni.showModal({
                		content: '授权取消，请重新授权',
                		showCancel: false
                	})
                	return false
                } else {
					uni.login({
						provider: 'weixin',
						success: res => {
							console.log('获取用户信息：', res);
							this.$api.showLoading_
							this.$http.getOpenid(res.code)
								.then(res => {
									let data = JSON.parse(res.Data)
									this.wxInfo.openid = data.openid
									this.wxInfo.unionid = data.unionid
									this.wxInfo.avatar = userinfo.mp.detail.userInfo.avatarUrl
									this.wxInfo.nickName = userinfo.mp.detail.userInfo.nickName
									this.$http.loginWithWx(this.wxInfo.nickName, this.wxInfo.avatar, this.wxInfo.openid, this.wxInfo.unionid, 0, this.$store.state.tjrid || 0)
										.then(res => {
											if (res.IsSuccess) {
											    // res.Data.Total = res.Total
											    // res.Data.Num = res.Num
											    // res.Data.IsCoupons = res.IsCoupons
											    this.$store.commit('login', res.Data)
											    this.$api.hidLoading_
											    if ( !this.$store.state.tjrid && !this.indexPage || this.isBack === 'back') {
											        uni.navigateBack()
											    } else {
											        this.$store.commit('setTjrid', 0)
											        uni.switchTab({
											            url: '/pages/index/index'
											        })
											    }
											} else {
											    this.$api.hidLoading_
											    this.$api.msg(res.Msg)
											}
										})
										.catch(err => {
											console.log(err);
										})
								})
						},
						complete: (res) => {
							console.log(res);
						}
					})
				}
            },
            phonenumber(phonenumber) {
                if (phonenumber.detail.errMsg.includes('deny')) {
                	uni.showModal({
                		content: '授权取消，请重新授权',
                		showCancel: false
                	})
                	return
                } 
				this.$api.showLoading_()
                this.wxInfo.phoneEncryptedData = phonenumber.detail.encryptedData
                this.wxInfo.phoneIv = phonenumber.detail.iv
				
				uni.login({
					provider: 'weixin',
					success: res => {
						this.wxInfo.js_code = res.code
						this.$http.getOpenid(this.wxInfo.js_code)
							.then(res => {
								try{
									let t = JSON.parse(res.Data)
									this.wxInfo.session_key = t.session_key
									this.wxInfo.unionid = t.openid
									this.wxInfo.openid = t.unionid || ''
								} catch(e){
									console.log(e);
									uni.showToast({
										icon: 'none',
										title: '获取电话号码失败，请稍后重试！'
									})
								}
								
								let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.wxInfo.session_key),
									tmpPhone = pc.decryptData(this.wxInfo.phoneEncryptedData, this.wxInfo.phoneIv)
								this.wxInfo.phone = tmpPhone.purePhoneNumber
								
								this.$http.loginWithWxNew(this.wxInfo.phone,this.wxInfo.unionid, this.wxInfo.openid, 0, this.$store.state.tjrid || 0)
									.then(res => {
										if (res.IsSuccess) {
										    this.$store.commit('login', res.Data)
										    this.$api.hidLoading_
										    if ( !this.$store.state.tjrid && !this.indexPage || this.isBack === 'back') {
										        uni.navigateBack()
										    } else {
										        this.$store.commit('setTjrid', 0)
										        uni.switchTab({
										            url: '/pages/index/index'
										        })
										    }
										} else {
										    this.$api.hidLoading_
										    this.$api.msg(res.Msg)
										}
									})
									.catch(err => {
										console.log(err, '登录出错')
										this.$api.hidLoading_
										this.$api.msg(err)
									})
							})
							.catch(err => {
								console.log(err);
								uni.showToast({
									icon: 'none',
									title: '获取电话号码失败，请稍后重试！'
								})
							})
					}
				})
				return
				
                new Promise((resovle, reject) => {
                    if (!this.wxInfo.js_code) {
                        uni.login({
                            provider: 'weixin',
                            success: (res) => {
                               this.wxInfo.js_code = res.code
							   this.$http.getOpenid(this.wxInfo.js_code)
							   .then(res => {
							       console.log(res);
							       try{
							           let t = JSON.parse(res.Data)
							           this.wxInfo.session_key = t.session_key
							       } catch(e){
							           reject({
							               status: false,
							               msg: '参数解析出错',
							               err: e
							           })
							       }
							       if(this.wxInfo.session_key) {
							           let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.wxInfo.session_key)
							           let tmpPhone = pc.decryptData(this.wxInfo.phoneEncryptedData, this.wxInfo.phoneIv)
							           let tmpUser = pc.decryptData(this.wxInfo.userInfoEncryptedData, this.wxInfo.userInfoIv)
							           this.wxInfo.phone = tmpPhone.purePhoneNumber
							           this.wxInfo.unionid = tmpUser.unionId
							           this.wxInfo.openid = tmpUser.openId
							           this.wxInfo.nickName = tmpUser.nickName
							           this.wxInfo.avatar = tmpUser.avatarUrl
							           resovle({
							               status: true,
							               msg: '获取信息成功',
							               params: this.wxInfo
							           })
							       } else {
							           reject({
							               status: false,
							               msg: '网络异常，请检查网络环境'
							           })
							       }
							       
							   })
							   .catch( err => {
							       reject({
							           status: false,
							           msg: '服务器错误',
							           err: err
							       })
							   })
                            }
                        })
                    }
                })
                .then( res => {
                    this.$http.loginWithWx(this.wxInfo.phone, this.wxInfo.nickName, this.wxInfo.avatar, 
                                            this.wxInfo.openid, this.wxInfo.unionid, 0, this.$store.state.tjrid || 0)
                    .then( res => {
                        if (res.IsSuccess) {
                            res.Data.Total = res.Total
                            res.Data.Num = res.Num
                            res.Data.IsCoupons = res.IsCoupons
                            this.$store.commit('login', res.Data)
                            this.$api.hidLoading_
                            if ( !this.$store.state.tjrid && !this.indexPage || this.isBack === 'back') {
                                uni.navigateBack()
                            } else {
                                this.$store.commit('setTjrid', 0)
                                uni.switchTab({
                                    url: '/pages/index/index'
                                })
                            }
                        } else {
                            this.$api.hidLoading_
                            this.$api.msg(res.Msg)
                        }
                    })
                    .catch( err => {
                        console.log(err, '登录出错')
                        this.$api.hidLoading_
                        this.$api.msg(err)
                    })
                })
                .catch( res => {
                    console.log('获取电话号码出错：', res)
                    this.$api.msg(res.msg)
                })
            },
            getPhoneNumber(phone) {
                this.$set(this.disableBtn, 0, false)
                if (phone.detail.errMsg === 'getPhoneNumber:fail:user deny') {
                	uni.showModal({
                		content: '授权取消，请重新授权',
                		showCancel: false
                	})
                	return false
                }
				
                new Promise((resovle, reject) => {
                    if (!this.wxInfo.js_code) {
                        uni.login({
                            provider: 'weixin',
                            success: (res) => {
                               this.wxInfo.js_code = res.code
                            }
                        })
                    }
                    this.$http.getOpenid(this.wxInfo.js_code)
                    .then( res => {
                        try{
                            let t = JSON.parse(res.Data)
                            this.wxInfo.session_key = t.session_key
                        } catch(e){
                            reject({
                                status: false,
                                msg: '参数解析出错',
                                err: e
                            })
                        }
                        
                        if (this.wxInfo.session_key) {
                            let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.wxInfo.session_key)
                            let tmpPhone = pc.decryptData(phone.detail.encryptedData, phone.detail.iv)
                            this.wxInfo.phone = tmpPhone.purePhoneNumber
                            resovle({
                                status: true,
                                msg: '获取信息成功',
                                params: this.wxInfo
                            })
                        } else {
                            reject({
                                status: false,
                                msg: '网络异常，请检查网络环境'
                            })
                        }
                    })
                    .catch( err => {
                        reject({
                            status: false,
                            msg: '服务器错误',
                            err: err
                        })
                    })
                })
                .then( res => {
                    uni.navigateTo({
                        url: `/pages/common/confirmPhone?phone=${this.wxInfo.phone}`
                    })
                })
                .catch( err => {
                    console.log(err, '登录出错')
                    this.$api.msg(err.msg)
                })
            },
            // #endif
            // #ifndef MP-WEIXIN
            focus(index) {
                if (index === 1) {
                    this.$set(this.isFouces, 0, true)
                    this.$set(this.isFouces, 1, false)
                } else if (index === 2) {
                    this.$set(this.isFouces, 1, true)
                    this.$set(this.isFouces, 0, false)
                }
            },
            blur() {
                this.$set(this.isFouces, 1, false)
                this.$set(this.isFouces, 0, false)
            },
            getCode(){
                let self = this
                if (this.vilidate[0] && this.codeText == '获取验证码') {
                    this.$store.commit('setTimer', (new Date()).getTime())
                    let timer = 60
                    self.codeText = timer + 'S'
                    let t = setInterval(function () {
                        timer --
                        self.codeText = timer + 'S'
                        if (timer === 0) {
                            clearInterval(t)
                            self.codeText = '获取验证码'
                        }
                    }, 1000)
                    this.$http.getVerifyCode(this.phone)
                    .then(res => {
						console.log(res);
                        self.$api.msg('验证码已经发送到手机，请注意查收')
                    })
                    .catch(err => {
                        this.$api.msg('服务器连接超时，请稍后重试')
                        console.log('获取验证码失败：', err);
                    })
                }
            },
            loginWay() {
                this.loginWithCode = !this.loginWithCode
            },
            login() {
				if (this.isAgree == 0) {
					// uni.showModal({
					// 	title: '注册须知',
					// 	content: '请您详细阅读《用户注册协议》和《隐私协议》，并勾选同意才能继续注册',
					// 	cancelText: '去阅读',
					// 	confirmText: '已经阅读',
					// 	success: (res) => {
					// 		if (res.confirm) {
								
					// 		} else {
					// 			return
					// 		}
							
					// 	}
					// })
					this.isAgree = '1'
					this.login()
				} else {
					let self = this
					if (this.loginWithCode) {
					    let startTime = this.$store.state.timer, endTime = (new Date()).getTime()
					    if (endTime - startTime >= 1000 * 60 *3) {
					        this.$api.msg('验证码超时')
					    } else {
					        this.$http.loginWithCode(this.phone, this.code, endTime, 
								Object.keys(this.$store.state.userInfo).length == 0 ? 0 : this.$store.state.userInfo.ID, this.$store.state.tjrid || 0)
					        .then( res => {
								console.log(res);
					            if (res.IsSuccess) {
					                res.Data.Total = res.Total
					                res.Data.Num = res.Num
					                res.Data.IsCoupons = res.IsCoupons
					                self.$store.commit('login', res.Data)
					                uni.navigateBack({
					                    delta: 3
					                })
					            } else {
					                self.$api.msg(res.Msg)
					            }
					        })
					        .catch( err => {
					            this.$api.msg('服务器连接超时，请稍后重试')
					            console.log('验证码登录出错', err);
					        })
					    }
					} else {
					    this.$http.loginWithPass(this.phone, this.pwd)
					    .then( res => {
					        if (res.IsSuccess) {
								self.$store.commit('login', res.Data)
								uni.navigateBack({
								    delta: 3
								})
					           
					        } else {
					            self.$api.msg(res.Msg)
					        }
					    })
					    .catch( err => {
					        this.$api.msg('服务器连接超时，请稍后重试')
					        console.log('密码登录出错', err);
					    })
					}
				}
            }
            // #endif
		},
        // #ifndef MP-WEIXIN
        watch: {
            phone(newValue, oldValue) {
                if (newValue.length === 11) {
                    if ((/^1[3456789]\d{9}$/.test(newValue))){
                        this.$set(this.vilidate, 0, true)
                    } else {
                        this.$api.msg('您输入的电话号码有误')
                    }
                } else {
                    this.$set(this.vilidate, 0, false)
                }
            },
            code(newValue, oldValue) {
                if (newValue.length >= 6) {
                    this.$set(this.vilidate, 1, true)
                } else {
                    this.$set(this.vilidate, 1, false)
                }
            },
            pwd(newValue, oldValue) {
                if (newValue.length >= 6) {
                    this.$set(this.vilidate, 1, true)
                } else {
                    this.$set(this.vilidate, 1, false)
                }
            }
        }
        // #endif
	};
</script>

<style lang="scss" scoped>
	.login-page {
		
		.content {
			width: 100vw;
			height: 100vh;
			background: url(https://img.huaxuapp.com/dengluy.jpg) no-repeat;
			background-position: 0 0;
			background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		
		.login-field {
			margin-top: 350upx;
			display: flex;
			flex-direction: column;
			font-size: 33rpx;
			
			.login-btn {
				width: 528upx;
				margin: 0 110rpx;
				height: 96rpx;
				background-color: #fe4e01;
				border-radius: 100rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				// box-shadow: 0 1rpx 6rpx lighten($color: #eb5b2a, $amount: 20);
			}
			
			.phone-btn {
				margin-top: 40rpx;
				text-align: center;
				font-size: 28upx;
			}
		}
	}
</style>
