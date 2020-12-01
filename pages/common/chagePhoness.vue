<template>
    <view class="change-phone-page bg-white">
        <cu-custom bgColor="bg-transparent" :isBack="true"></cu-custom>
        <view class="cover flex-direction" :style="{ paddingTop: `${pdTop}px` }">
            <view class="info">
                <text class="text-xxl" style="display: flex; justify-content: center;margin: 100upx;">{{bind ? '绑定手机号码' : '手机号码登录'}}</text>
                <view class="input-field text-lg flex align-center" :class=" isFouces[0] || vilidate[0] ? 'active': ''">
                    <view class="flex align-center flex-sub">
                        <input type="number" v-model="phone" class="flex align-center" placeholder-style="color: #f0f0f0"
                        maxlength="11" placeholder="请输入电话号码" @focus="focus(1)" @blur="blur" :disabled="codeText != '获取验证码'"/>
                    </view>
                    <text class="code vlide" @tap="getCode" v-if="loginWithCode">
                        {{ codeText }}
                    </text>
                </view>
                <view class="with-code">
                    <view class="item" :style="{marginLeft: loginWithCode ? '0' : '-100%'}">
                        <view class="input-field text-lg flex align-center" :class=" isFouces[1] || vilidate[1] ? 'active': ''">
                            <view class="flex align-center flex-sub">
                                <input type="number" v-model="code" class="flex align-center" placeholder-style="color: #f0f0f0"
                                maxlength="6" placeholder="请输入验证码" @focus="focus(2)" @blur="blur"/>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="input-field text-lg flex align-center" :class=" isFouces[1] || vilidate[1] ? 'active': ''">
                            <view class="flex align-center flex-sub">
                                <input type="text" password="true" v-model="pwd" class="flex align-center" placeholder-style="color: #f0f0f0"
                                placeholder="请输入密码" @focus="focus(2)" @blur="blur"/>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="hx-btn">
                    <button class="cu-btn lg flex" :class="vilidate[0] && vilidate[1] ? 'active' : ''" @tap="login">{{ bind ? '绑定' : '登录' }}</button>
                </view>
                <text class="pass" @tap="loginWay" v-if="!bind">{{ loginWithCode ? '账号密码登录' : '验证码登录' }}</text>
            </view>
            
            <view class="action-bar" v-if="!bind">
                <view class="text-sm flex align-center justify-center">
                    <view style="transform: scale(.6);">
                    	<checkbox-group @change="agree">
                    		<checkbox class="red" :value="isAgree" :class="isAgree == 1 ? 'checked' : ''" /><text></text>
                    	</checkbox-group>
                    </view>
                    同意<text class="i" @tap="toWebview('zc')"> 《用户注册协议》 </text>和<text class="i" @tap="toWebview('ys')"> 《隐私协议》
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script> 
export default {
    data() {
        return {
            pdTop: this.CustomBar,      // 状态栏加导航栏的高度
            isFouces: [false, false],   // 获取焦点的状态
            phone: '',                  // 电话号码
            code: '',                   // 验证码
            pwd: '',                    // 密码
            vilidate: [false, false],   // 电话号码、验证码、密码是否正确
            isCode: false,              // 使用验证码还是密码登录
            codeText: '获取验证码',      // 获取验证码倒计时
            loginWithCode: false,         // 是否采用验证码登录
			isAgree: 0,
			bind: false,
			userInfo: this.$store.state.userInfo
        };
    },
	onShow() {
		if (Object.keys(this.userInfo).length > 1) {
			this.loginWithCode = true
			this.bind = true
		} else {
			this.loginWithCode = false
			this.bind = false
		}
		
	},
    methods: {
        focus(index) {
            if (index === 1) {
                this.$set(this.isFouces, 0, true)
                this.$set(this.isFouces, 1, false)
            } else if (index === 2) {
                this.$set(this.isFouces, 1, true)
                this.$set(this.isFouces, 0, false)
            }
        },
		agree() {
			if (this.isAgree == '0') {
				this.isAgree = '1'
			} else {
				this.isAgree = '0'
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
                    self.$api.msg('验证码已经发送到手机，请注意查收')
                })
                .catch(err => {
                    this.$api.msg('服务器连接超时，请稍后重试')
                    console.log('获取验证码失败：', err);
                })
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
        loginWay() {
            this.loginWithCode = !this.loginWithCode
        },
        login() {
			if (this.isAgree == 0 && !this.bind) {
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
						console.log('获取到用户信息', this.userInfo);
				        this.$http.loginWithCode(this.phone, this.code, endTime, Object.keys(this.userInfo).length > 0 ? this.userInfo.ID : 0, this.$store.state.tjrid)
				        .then( res => {
				            if (res.IsSuccess) {
				                res.Data.Total = res.Total
				                res.Data.Num = res.Num
				                res.Data.IsCoupons = res.IsCoupons
				                self.$store.commit('login', res.Data)
				                if(!this.$store.state.tjrid) {
				                    if(this.bind) {
										uni.navigateBack()
									} else {
										uni.navigateBack({
										    delta: 3
										})
									}
				                } else {
				                    this.$store.commit('setTjrid', 0)
				                    uni.switchTab({
				                        url: '/pages/index/index'
				                    })
				                }
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
    },
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
};
</script>

<style>
    page {
        width: 100vw;
        height: 100vh;
    }
</style>

<style scoped lang="scss">
.change-phone-page {
    width: 100vw;
    height: 100vh;
}

.flex-direction {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.input-field {
    margin: 30upx 60upx 30upx 60upx;
    padding-bottom: 30upx;
    border-bottom: 1px solid #f0f0f0;
    transition: border-bottom .3s ease-in-out;
}

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
    color: #eb5245;
}

.action-bar {
    margin-bottom: 100upx;
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
    color: #eb5245;
}
.hx-swiper {
    display: flex;
    overflow: hidden;
    flex-wrap: nowrap;
}
.hx-btn {
    margin: 60upx 0;
    
    .cu-btn {
        margin: 0 60upx;
        color: #ffffff;
        background: #eb5245;
        transition: all .3s ease-in-out;
        opacity: .5;
    }
    
    .active {
        opacity: 1;
        box-shadow: 6upx 6upx 8upx #ddd;
    }
}

.pass {
    color: #999;
    margin: 0 60upx;
}
</style>
