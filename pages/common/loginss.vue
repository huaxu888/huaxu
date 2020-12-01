<template>
	<view class="login-page" :style="{ backgroundPosition: `center ${move}px` }">
		<cu-custom bgColor="bg-transparent" :isBack="true" class="text-white"></cu-custom>
		<view class="cover flex-direction" :style="{ paddingTop: `${pdTop}px` }">
			<view class="info">
				<view class="hx-avatar" style="background-image: url(https://img.huaxuapp.com/huaxulogo0830.png);"></view>
				<text class="text-xxl text-white" style="display: flex; justify-content: center;">实体企业O2O</text>
				<text class="text-xxl text-white" style="display: flex; justify-content: center;">会员营销体系平台</text>
			</view>
			<view class="action-bar" style="margin-top: 180upx;">
				<!-- #ifdef MP-WEIXIN-->
				<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap="disableTab(0)" :disabled="disableBtn[0]"
                class="cu-btn radius flex shadow large bg-white">
					<text class="hxIcon-shouji margin-right-xs" style="font-size: 1.1em;"></text>
					手机号登录
				</button> -->
				<view class="">
					<!-- <button class="cu-btn radius flex shadow large text-white" style="background: rgba(63, 179, 79, .8);"
					 open-type="getUserInfo" @getuserinfo="userinfo">
						<text class="hxIcon-weixin margin-right-xs" style="font-size: 1.3em;"></text>
						微信登录
					</button> -->
					<button class="cu-btn radius flex shadow large text-white" style="background: rgba(63, 179, 79, .9); "
					 open-type="getPhoneNumber" @getphonenumber="phonenumber">
						<text class="hxIcon-weixin margin-right-xs" style="font-size: 1.3em;"></text>
						微信登录
					</button>
				</view>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
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

				<!-- #ifdef MP-WEIXIN -->
				<navigator class="change-phone cu-btn radius flex shadow large text-white" hover-class="none" url="/pages/common/chagePhone">
					使用手机号登陆
				</navigator>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
				<view class="action-bar" style="margin-bottom: 0; margin-top: 100upx;">
					<view class="text-sm margin-top flex align-center justify-center" style="color: #fff;">
						<view style="transform: scale(.6);">
							<checkbox-group @change="agree">
								<checkbox class="red" :value="isAgree" :class="isAgree == 1 ? 'checked' : ''" /><text></text>
							</checkbox-group>
						</view>
						同意<text class="i" @tap="toWebview('zc')"> 《用户注册协议》 </text>和<text class="i" @tap="toWebview('ys')"> 《隐私协议》
						</text>
					</view>
				</view>
				<!-- #endif -->
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
				isAgree: '0',
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
			agree() {
				if (this.isAgree == '0') {
					this.isAgree = '1'
				} else {
					this.isAgree = '0'
				}
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
					uni.showModal({
						title: '注册须知',
						content: '请您详细阅读《用户注册协议》和《隐私协议》，并勾选同意才能继续注册',
						cancelText: '去阅读',
						confirmText: '已经阅读',
						success: (res) => {
							if (res.confirm) {
								this.isAgree = '1'
								this.login()
							} else {
								return
							}
							
						}
					})
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

<style scoped lang="scss">
	.login-page {
		width: 100vw;
		height: 100vh;
		background: url(https://img.huaxuapp.com/4545_02.jpg);
		background-size: cover;
		background-position: 0;
		transition: all 0.1s linear;
	}

	.flex-direction {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.action-bar {
		margin-bottom: 300upx;

		.cu-btn {
			height: 80upx;
			margin: 30upx 60upx;
		}
	}

	.cover {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.hx-avatar {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 5upx solid #fff;
		background-size: cover;
		margin: 100upx auto 30upx auto;
	}

	.change-phone {
		margin: 0 60upx 0 60upx;
		background: transparent;
		border: 1px solid #f8f8f8;
	}

	.notice {
		display: flex;
		margin: 0 60upx;
		font-size: 20upx;
		margin-bottom: -20upx;
		color: #f8f8f8;
	}

	/* #ifndef MP-ALIPAY */
	.input-field {
		margin: 30upx 60upx 30upx 60upx;
		padding-bottom: 30upx;
		border-bottom: 1px solid #f0f0f0;
		transition: border-bottom .3s ease-in-out;
	}

	/* #endif */

	.with-code {
		display: flex;
		flex-wrap: none;
		overflow: hidden;

		.item {
			width: 100vw;
			flex-shrink: 0;
			transition: margin-left .5s ease-in-out;
		}
	}

	.i {
		color: #FF3000;
	}

	.action-bar {
		margin-bottom: 300upx;
		text-align: center;
	}

	.active {
		border-bottom: 1px solid #eb5245;
	}

	.code {
		color: #FFFFFF;
		width: 200upx;
		text-align: right;
		transition: all .5s ease-in-out;
	}

	.vlide {
		color: #ff3000;
	}

	.hx-swiper {
		display: flex;
		overflow: hidden;
		flex-wrap: nowrap;
	}

	.hx-btn {
		margin: 30upx 0;

		.cu-btn {
			margin: 0 60upx;
			color: #ffffff;
			background: #FF3000;
			transition: all .3s ease-in-out;
			opacity: .9;
		}

		.active {
			opacity: 1;
			box-shadow: 6upx 6upx 8upx #333;
		}
	}

	.pass {
		color: #F8F8F8;
		margin: 0 60upx;
		display: flex;
		text-align: left;
	}

	/* #ifndef MP-WEIXIN */
	.info {
		input {
			text-align: left;
			color: #fff;
			background: transparent;
		}
	}

	.input-field {
		margin: 30upx 60upx 30upx 60upx;
		padding-bottom: 5upx;
		border-bottom: 1px solid #f0f0f0;
		transition: border-bottom .3s ease-in-out;
	}

	/* #endif */
</style>
